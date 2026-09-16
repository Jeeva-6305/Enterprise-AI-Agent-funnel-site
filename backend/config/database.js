const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const DB_PATH = process.env.DB_PATH || path.join(__dirname, '..', 'database', 'leads.db');

// Ensure database directory exists
const dbDir = path.dirname(DB_PATH);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

// Initialize SQLite database instance
const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('❌ Error opening SQLite database:', err.message);
  } else {
    console.log(`✅ Connected to SQLite database at: ${DB_PATH}`);
    initDatabaseSchema();
  }
});

/**
 * Initialize database schema from schema.sql
 */
function initDatabaseSchema() {
  const schemaPath = path.join(__dirname, '..', 'database', 'schema.sql');
  if (fs.existsSync(schemaPath)) {
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');
    db.exec(schemaSql, (err) => {
      if (err) {
        console.error('❌ Error executing database schema:', err.message);
      } else {
        console.log('✅ Database schema verified and initialized.');
      }
    });
  }
}

/**
 * Helper method for executing SQL queries returning multiple rows
 */
function queryAll(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}

/**
 * Helper method for executing SQL query returning a single row
 */
function queryOne(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });
}

/**
 * Helper method for executing INSERT, UPDATE, DELETE with lastID and changes
 */
function runQuery(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) return reject(err);
      resolve({ lastID: this.lastID, changes: this.changes });
    });
  });
}

module.exports = {
  db,
  queryAll,
  queryOne,
  runQuery
};
