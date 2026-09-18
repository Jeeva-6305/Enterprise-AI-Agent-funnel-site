const { Pool } = require('pg');

const pool = new Pool({
  host: 'ep-soft-meadow-b5vrda18-pooler.c-7.us-east-2.aws.neon.tech',
  port: 5432,
  database: 'funnel_central_db',
  user: 'neondb_owner',
  password: 'npg_nOrFhKmJCc58',
  ssl: { rejectUnauthorized: false }
});

async function verify() {
  try {
    // Get the new lead
    const result = await pool.query(`
      SELECT id, full_name, email, funnel_id, funnel_source, status, created_at 
      FROM leads 
      WHERE id = 14
    `);
    
    console.log('✅ NEW LEAD FOUND IN NEON DATABASE!\n');
    if (result.rows.length > 0) {
      const lead = result.rows[0];
      console.log(`ID: ${lead.id}`);
      console.log(`Name: ${lead.full_name}`);
      console.log(`Email: ${lead.email}`);
      console.log(`Funnel: ${lead.funnel_source} (${lead.funnel_id})`);
      console.log(`Status: ${lead.status}`);
      console.log(`Created: ${lead.created_at}`);
    }
    
    // Get SEC Analysis leads
    console.log('\n\n📊 ALL SEC ANALYSIS LEADS IN DATABASE:');
    console.log('=====================================\n');
    const secLeads = await pool.query(`
      SELECT id, full_name, email, created_at 
      FROM leads 
      WHERE funnel_id = 'sec_analysis'
      ORDER BY created_at DESC
    `);
    
    console.log(`Total SEC Analysis Leads: ${secLeads.rows.length}\n`);
    secLeads.rows.forEach((lead, i) => {
      console.log(`[${i+1}] #${lead.id}: ${lead.full_name} (${lead.email})`);
      console.log(`    Created: ${lead.created_at}`);
    });
    
    pool.end();
  } catch (err) {
    console.error('Error:', err.message);
    pool.end();
  }
}

verify();
