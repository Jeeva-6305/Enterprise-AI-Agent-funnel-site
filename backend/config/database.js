const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.CENTRAL_DB_HOST,
  port: process.env.CENTRAL_DB_PORT || 5432,
  database: process.env.CENTRAL_DB_NAME,
  user: process.env.CENTRAL_DB_USER,
  password: process.env.CENTRAL_DB_PASSWORD,
  ssl: process.env.CENTRAL_DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pool.on('connect', () => {
  console.log('✅ Connected to PostgreSQL (Neon) database');
});

pool.on('error', (err) => {
  console.error('❌ Unexpected error on idle client', err);
  process.exit(-1);
});

async function initDatabaseSchema() {
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
    console.log('✅ Database schema verified and initialized.');
  } catch (err) {
    console.error('❌ Error executing database schema:', err.message);
  }
}

initDatabaseSchema();

function queryAll(sql, params = []) {
  return new Promise((resolve, reject) => {
    pool.query(sql, params, (err, result) => {
      if (err) return reject(err);
      resolve(result.rows);
    });
  });
}

function queryOne(sql, params = []) {
  return new Promise((resolve, reject) => {
    pool.query(sql, params, (err, result) => {
      if (err) return reject(err);
      resolve(result.rows[0]);
    });
  });
}

function runQuery(sql, params = []) {
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

module.exports = {
  pool,
  queryAll,
  queryOne,
  runQuery
};
