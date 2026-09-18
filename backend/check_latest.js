const { Pool } = require('pg');

const pool = new Pool({
  host: 'ep-soft-meadow-b5vrda18-pooler.c-7.us-east-2.aws.neon.tech',
  port: 5432,
  database: 'funnel_central_db',
  user: 'neondb_owner',
  password: 'npg_nOrFhKmJCc58',
  ssl: { rejectUnauthorized: false }
});

async function checkLatest() {
  try {
    // Check latest lead
    const result = await pool.query(`
      SELECT * FROM leads 
      ORDER BY created_at DESC 
      LIMIT 1;
    `);
    
    // Also check SEC Analysis leads
    const secLeads = await pool.query(`
      SELECT * FROM leads 
      WHERE funnel_id = 'sec_analysis'
      ORDER BY created_at DESC 
      LIMIT 5;
    `);
    
    console.log('✅ LATEST LEAD IN DATABASE:');
    console.log('================================\n');
    if (result.rows.length > 0) {
      const lead = result.rows[0];
      console.log(`ID: ${lead.id}`);
      console.log(`Name: ${lead.full_name}`);
      console.log(`Email: ${lead.email}`);
      console.log(`Funnel: ${lead.funnel_source}`);
      console.log(`Created: ${lead.created_at}`);
      console.log(`Status: ${lead.status}`);
    }
    
    console.log('\n\n✅ LATEST SEC ANALYSIS LEADS:');
    console.log('================================\n');
    if (secLeads.rows.length > 0) {
      secLeads.rows.forEach((lead, i) => {
        console.log(`[${i+1}] ${lead.full_name} (${lead.email})`);
        console.log(`    Created: ${lead.created_at}`);
      });
    } else {
      console.log('No SEC Analysis leads found');
    }
    
    pool.end();
  } catch (err) {
    console.error('❌ Error:', err.message);
    pool.end();
  }
}

checkLatest();
