/**
 * CLI Helper to quickly view all leads stored in the SQL Database
 */
const path = require('path');
const sqlite3Path = path.join(__dirname, 'backend', 'node_modules', 'sqlite3');
const sqlite3 = require(sqlite3Path).verbose();

const dbPath = path.join(__dirname, 'backend', 'database', 'leads.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Could not open database file:', err.message);
    process.exit(1);
  }
});

console.log('\n📊 === STORED SQL DATABASE LEADS ===');
console.log(`📁 Database Location: ${dbPath}\n`);

db.all(
  `SELECT 
    id AS "ID",
    full_name AS "Full Name",
    work_email AS "Work Email",
    job_title AS "Job Title",
    company_name AS "Company",
    company_size AS "Size",
    phone_country_code || ' ' || phone_number AS "Phone",
    status AS "Status",
    datetime(created_at, 'localtime') AS "Submitted At"
  FROM leads 
  ORDER BY id DESC`,
  [],
  (err, rows) => {
    if (err) {
      console.error('❌ Error querying leads:', err.message);
    } else if (!rows || rows.length === 0) {
      console.log('ℹ️  The database is currently empty (0 leads). Submit the form on the website to add leads!');
    } else {
      console.table(rows);
      console.log(`Total Stored Leads: ${rows.length}\n`);
    }
    db.close();
  }
);
