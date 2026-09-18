const { Pool } = require('pg');

const pool = new Pool({
  host: 'ep-soft-meadow-b5vrda18-pooler.c-7.us-east-2.aws.neon.tech',
  port: 5432,
  database: 'funnel_central_db',
  user: 'neondb_owner',
  password: 'npg_nOrFhKmJCc58',
  ssl: { rejectUnauthorized: false }
});

async function checkLeads() {
  try {
    const result = await pool.query('SELECT * FROM leads ORDER BY created_at DESC LIMIT 10;');
    
    console.log('✅ Connected to Neon DB Successfully!\n');
    console.log('📊 Recent Leads from Neon Database:');
    console.log('=====================================\n');
    
    if (result.rows.length === 0) {
      console.log('⚠️  No leads found in database yet');
    } else {
      console.log(`Total leads found: ${result.rows.length}\n`);
      result.rows.forEach((lead, index) => {
        console.log(`[${index + 1}] ID: ${lead.id}`);
        console.log(`    Name: ${lead.full_name}`);
        console.log(`    Email: ${lead.email}`);
        console.log(`    Funnel: ${lead.funnel_source} (${lead.funnel_id})`);
        console.log(`    Company: ${lead.company || 'N/A'}`);
        console.log(`    Status: ${lead.status}`);
        console.log(`    Created: ${lead.created_at}`);
        console.log('');
      });
    }
    
    pool.end();
  } catch (err) {
    console.error('❌ Error connecting to Neon DB:', err.message);
    pool.end();
  }
}

checkLeads();
