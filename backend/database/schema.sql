-- SQL Schema for 22nd Century Technologies Funnel Leads Database
-- Compatible with SQLite, PostgreSQL, MySQL

CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name VARCHAR(255) NOT NULL,
    work_email VARCHAR(255) NOT NULL,
    job_title VARCHAR(255) NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    company_size VARCHAR(100) NOT NULL,
    phone_country_code VARCHAR(10) DEFAULT '+91',
    phone_number VARCHAR(50) NOT NULL,
    source_campaign VARCHAR(255) DEFAULT 'Enterprise-AI Agents Funnel',
    status VARCHAR(50) DEFAULT 'New', -- 'New', 'Contacted', 'Qualified', 'Demo Scheduled', 'Closed'
    notes TEXT DEFAULT NULL,
    ip_address VARCHAR(100) DEFAULT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Index for fast searching and filtering
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(work_email);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at);
CREATE INDEX IF NOT EXISTS idx_leads_company ON leads(company_name);
