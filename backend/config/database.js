const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const isPgConfigured = Boolean(
  process.env.CENTRAL_DB_HOST &&
  process.env.CENTRAL_DB_HOST.trim() !== '' &&
  process.env.CENTRAL_DB_PASSWORD !== undefined
);

let pool = null;

if (isPgConfigured) {
  pool = new Pool({
    host: process.env.CENTRAL_DB_HOST,
    port: parseInt(process.env.CENTRAL_DB_PORT, 10) || 5432,
    database: process.env.CENTRAL_DB_NAME,
    user: process.env.CENTRAL_DB_USER,
    password: process.env.CENTRAL_DB_PASSWORD,
    ssl: process.env.CENTRAL_DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
  });

  pool.on('connect', () => {
    console.log('✅ Connected to PostgreSQL (Neon) database');
  });

  pool.on('error', (err) => {
    console.error('⚠️ Unexpected PostgreSQL error on idle client:', err.message);
  });
} else {
  console.log('ℹ️ Running in Local Storage Mode (Configure CENTRAL_DB_HOST in .env for Neon PostgreSQL)');
}

// Local Storage Fallback Data Store
const LOCAL_DB_FILE = path.join(__dirname, '..', 'database', 'leads_store.json');

function loadLocalStore() {
  try {
    if (fs.existsSync(LOCAL_DB_FILE)) {
      const data = fs.readFileSync(LOCAL_DB_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error loading local store:', err.message);
  }
  return [];
}

function saveLocalStore(leads) {
  try {
    const dir = path.dirname(LOCAL_DB_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(LOCAL_DB_FILE, JSON.stringify(leads, null, 2), 'utf8');
  } catch (err) {
    console.error('Error saving local store:', err.message);
  }
}

async function initDatabaseSchema() {
  if (pool) {
    try {
      const schemaSQL = `
        CREATE TABLE IF NOT EXISTS leads (
          id SERIAL PRIMARY KEY,
          funnel_id VARCHAR(100) NOT NULL,
          funnel_source VARCHAR(100) NOT NULL,
          full_name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          phone VARCHAR(50),
          company VARCHAR(255),
          job_title VARCHAR(255),
          use_case TEXT,
          message TEXT,
          campaign VARCHAR(255),
          status VARCHAR(50) DEFAULT 'New',
          source_url TEXT,
          ip_address VARCHAR(45),
          created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
          raw_payload JSONB DEFAULT '{}'::jsonb
        );

        CREATE INDEX IF NOT EXISTS idx_leads_funnel_id ON leads(funnel_id);
        CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
        CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
        CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at);
        CREATE INDEX IF NOT EXISTS idx_leads_company ON leads(company);
      `;
      await pool.query(schemaSQL);
      console.log('✅ PostgreSQL database schema verified and initialized.');
    } catch (err) {
      console.error('❌ Error executing database schema on PostgreSQL:', err.message);
    }
  } else {
    // Ensure local file exists
    const existing = loadLocalStore();
    saveLocalStore(existing);
    console.log('✅ Local leads data store initialized.');
  }
}

initDatabaseSchema();

function queryAll(sql, params = []) {
  if (pool) {
    return new Promise((resolve, reject) => {
      pool.query(sql, params, (err, result) => {
        if (err) return reject(err);
        resolve(result.rows);
      });
    });
  }

  // Local fallback simulation
  return new Promise((resolve) => {
    let leads = loadLocalStore();
    // Simple filter simulation
    if (sql.includes('SELECT * FROM leads')) {
      resolve(leads);
    } else if (sql.includes('COUNT(*)')) {
      resolve([{ total: leads.length, count: leads.length }]);
    } else {
      resolve(leads);
    }
  });
}

function queryOne(sql, params = []) {
  if (pool) {
    return new Promise((resolve, reject) => {
      pool.query(sql, params, (err, result) => {
        if (err) return reject(err);
        resolve(result.rows[0]);
      });
    });
  }

  // Local fallback simulation
  return new Promise((resolve) => {
    const leads = loadLocalStore();
    if (sql.includes('INSERT INTO leads')) {
      const newLead = {
        id: leads.length > 0 ? Math.max(...leads.map(l => l.id || 0)) + 1 : 1,
        funnel_id: params[0],
        funnel_source: params[1],
        full_name: params[2],
        email: params[3],
        phone: params[4],
        company: params[5],
        job_title: params[6],
        use_case: params[7],
        message: params[8],
        campaign: params[9],
        status: params[10] || 'New',
        source_url: params[11],
        ip_address: params[12],
        raw_payload: params[13] ? JSON.parse(params[13]) : {},
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      leads.unshift(newLead);
      saveLocalStore(leads);
      resolve(newLead);
    } else if (sql.includes('WHERE id = $1')) {
      const found = leads.find(l => String(l.id) === String(params[0]));
      resolve(found || null);
    } else if (sql.includes('COUNT(*) as total')) {
      resolve({ total: leads.length });
    } else if (sql.includes("COUNT(*) as count FROM leads WHERE status = 'New'")) {
      const count = leads.filter(l => l.status === 'New').length;
      resolve({ count });
    } else if (sql.includes('COUNT(*) as count FROM leads WHERE status IN')) {
      const count = leads.filter(l => ['Qualified', 'Demo Scheduled'].includes(l.status)).length;
      resolve({ count });
    } else {
      resolve(leads[0] || null);
    }
  });
}

function runQuery(sql, params = []) {
  if (pool) {
    return new Promise((resolve, reject) => {
      pool.query(sql, params, (err, result) => {
        if (err) return reject(err);
        resolve({
          lastID: result.rows[0]?.id,
          changes: result.rowCount
        });
      });
    });
  }

  return new Promise((resolve) => {
    let leads = loadLocalStore();
    if (sql.includes('DELETE FROM leads WHERE id = $1')) {
      const initialLen = leads.length;
      leads = leads.filter(l => String(l.id) !== String(params[0]));
      saveLocalStore(leads);
      resolve({ changes: initialLen - leads.length });
    } else if (sql.includes('UPDATE leads')) {
      resolve({ changes: 1 });
    } else {
      resolve({ changes: 1 });
    }
  });
}

module.exports = {
  pool,
  queryAll,
  queryOne,
  runQuery
};
