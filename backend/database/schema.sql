-- SQL Schema for Adople Funnel Leads Database (Centralized)
-- Compatible with SQLite, PostgreSQL, MySQL

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

-- Indexes for fast searching and filtering
CREATE INDEX IF NOT EXISTS idx_leads_funnel_id ON leads(funnel_id);
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at);
CREATE INDEX IF NOT EXISTS idx_leads_company ON leads(company);
