import os
import sqlite3
import secrets
from datetime import datetime
from typing import List, Optional
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field
from dotenv import load_dotenv

# Load .env variables
load_dotenv()
load_dotenv(os.path.join(os.path.dirname(__file__), ".env"))

app = FastAPI(
    title="Adople AI Lead Funnel API",
    description="Unified Database API for Lead Capture & Demo Access Authorization",
    version="1.0.0"
)

# CORS Setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Try importing psycopg2 for PostgreSQL support
try:
    import psycopg2
    from psycopg2.extras import RealDictCursor
    PSYCOPG2_AVAILABLE = True
except ImportError:
    PSYCOPG2_AVAILABLE = False

def is_postgres_configured() -> bool:
    db_url = os.getenv("DATABASE_URL")
    pg_host = os.getenv("POSTGRES_HOST")
    pg_db = os.getenv("POSTGRES_DB")
    pg_user = os.getenv("POSTGRES_USER")
    return bool(db_url or (pg_host and pg_db and pg_user))

def get_db():
    if is_postgres_configured() and PSYCOPG2_AVAILABLE:
        db_url = os.getenv("DATABASE_URL")
        try:
            if db_url:
                conn = psycopg2.connect(db_url, cursor_factory=RealDictCursor, connect_timeout=2)
            else:
                conn = psycopg2.connect(
                    host=os.getenv("POSTGRES_HOST"),
                    port=os.getenv("POSTGRES_PORT", "5432"),
                    database=os.getenv("POSTGRES_DB"),
                    user=os.getenv("POSTGRES_USER"),
                    password=os.getenv("POSTGRES_PASSWORD", ""),
                    cursor_factory=RealDictCursor,
                    connect_timeout=2
                )
            return conn, "postgresql"
        except Exception as e:
            print(f"PostgreSQL connection offline or refused ({e}). Using local SQLite database.")
    
    # SQLite Fallback
    db_file = os.path.join(os.path.dirname(__file__), "leads.db")
    conn = sqlite3.connect(db_file)
    conn.row_factory = sqlite3.Row
    return conn, "sqlite"

def init_db():
    conn, engine = get_db()
    cursor = conn.cursor()

    if engine == "postgresql":
        # Use Funnel Dashboard's shared leads table structure
        cursor.execute("""
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
        """)
    else:
        # SQLite fallback (for local testing)
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS leads (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                funnel_id TEXT,
                funnel_source TEXT,
                full_name TEXT,
                email TEXT,
                phone TEXT,
                company TEXT,
                job_title TEXT,
                use_case TEXT,
                message TEXT,
                campaign TEXT,
                status TEXT DEFAULT 'New',
                source_url TEXT,
                ip_address TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                raw_payload TEXT DEFAULT '{}'
            );
        """)
        # Auto-migrate any missing columns if table already existed
        cursor.execute("PRAGMA table_info(leads)")
        existing_cols = {row[1] for row in cursor.fetchall()}
        cols_to_add = [
            ("funnel_id", "TEXT DEFAULT 'agentic-data-analyst'"),
            ("funnel_source", "TEXT DEFAULT 'Agentic Data Analyst'"),
            ("email", "TEXT"),
            ("phone", "TEXT"),
            ("company", "TEXT"),
            ("use_case", "TEXT"),
            ("message", "TEXT"),
            ("campaign", "TEXT"),
            ("status", "TEXT DEFAULT 'New'"),
            ("source_url", "TEXT"),
            ("updated_at", "TIMESTAMP DEFAULT CURRENT_TIMESTAMP"),
            ("raw_payload", "TEXT DEFAULT '{}'"),
            ("access_token", "TEXT")
        ]
        for col_name, col_def in cols_to_add:
            if col_name not in existing_cols:
                try:
                    cursor.execute(f"ALTER TABLE leads ADD COLUMN {col_name} {col_def}")
                except Exception as e:
                    pass
    conn.commit()
    conn.close()

init_db()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=9075)

# Pydantic Schemas - Compatible with frontend
class LeadCreate(BaseModel):
    funnel_id: str = Field(default="agentic-data-analyst")
    funnel_source: str = Field(default="Agentic Data Analyst")
    full_name: str = Field(..., min_length=2, description="User's full name")
    email: str = Field(..., description="Email address")
    phone: Optional[str] = Field(None, description="Phone number with country code")
    company: Optional[str] = Field(None, description="Company name")
    job_title: str = Field(..., min_length=2, description="Job title")
    use_case: Optional[str] = Field(None, description="Use case or company size")
    message: Optional[str] = Field(None, description="Additional message")

class LeadResponse(BaseModel):
    id: int
    full_name: str
    work_email: str
    job_title: str
    company_name: str
    company_size: str
    country_code: str
    phone_number: str
    access_token: str
    created_at: str

class SubmitSuccessResponse(BaseModel):
    status: str
    lead_id: int
    access_token: str
    message: str
    database: str

@app.get("/api/health")
def health_check():
    conn, engine = get_db()
    conn.close()
    return {
        "status": "healthy",
        "service": "Adople AI Lead Funnel API",
        "database_engine": engine,
        "timestamp": datetime.now().isoformat()
    }

@app.post("/api/leads", response_model=SubmitSuccessResponse)
@app.post("/api/ingest/leads", response_model=SubmitSuccessResponse)
def submit_lead(lead: LeadCreate, request: Request):
    import json
    client_ip = request.client.host if request.client else "unknown"
    access_token = secrets.token_hex(16)

    # Create raw payload for tracking
    raw_payload = lead.dict()
    raw_payload["access_token"] = access_token
    raw_payload["ip_address"] = client_ip

    conn, engine = get_db()
    cursor = conn.cursor()

    try:
        if engine == "postgresql":
            cursor.execute("""
                INSERT INTO leads (
                    funnel_id, funnel_source, full_name, email, phone,
                    company, job_title, use_case, message, campaign, status,
                    source_url, ip_address, raw_payload
                ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                RETURNING id;
            """, (
                lead.funnel_id,
                lead.funnel_source,
                lead.full_name,
                lead.email,
                lead.phone or "",
                lead.company or "",
                lead.job_title,
                lead.use_case or "",
                lead.message or "",
                "Agentic Data Analyst Landing Page",
                "New",
                "http://localhost:9070",
                client_ip,
                json.dumps(raw_payload)
            ))
            lead_id = cursor.fetchone()["id"]
        else:
            cursor.execute("""
                INSERT INTO leads (
                    funnel_id, funnel_source, full_name, email, phone,
                    company, job_title, use_case, message, campaign, status,
                    source_url, ip_address, access_token, raw_payload
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                lead.funnel_id,
                lead.funnel_source,
                lead.full_name,
                lead.email,
                lead.phone or "",
                lead.company or "",
                lead.job_title,
                lead.use_case or "",
                lead.message or "",
                "Agentic Data Analyst Landing Page",
                "New",
                "http://localhost:9070",
                client_ip,
                access_token,
                json.dumps(raw_payload)
            ))
            lead_id = cursor.lastrowid

        conn.commit()
        conn.close()

        return SubmitSuccessResponse(
            status="success",
            lead_id=lead_id,
            access_token=access_token,
            message="Lead saved successfully. Demo video unlocked!",
            database=engine
        )
    except Exception as e:
        conn.close()
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

@app.get("/api/leads", response_model=List[LeadResponse])
def list_leads():
    conn, engine = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT id, full_name, work_email, job_title, company_name, company_size, country_code, phone_number, access_token, created_at FROM leads ORDER BY id DESC")
    rows = cursor.fetchall()
    conn.close()
    
    result = []
    for r in rows:
        d = dict(r)
        if isinstance(d.get("created_at"), datetime):
            d["created_at"] = d["created_at"].isoformat()
        else:
            d["created_at"] = str(d.get("created_at", ""))
        result.append(d)
    return result

@app.get("/api/leads/verify/{access_token}")
def verify_token(access_token: str):
    conn, engine = get_db()
    cursor = conn.cursor()
    placeholder = "%s" if engine == "postgresql" else "?"
    cursor.execute(f"SELECT id, full_name, work_email FROM leads WHERE access_token = {placeholder}", (access_token,))
    lead = cursor.fetchone()
    conn.close()
    
    if lead:
        return {"unlocked": True, "lead_id": lead["id"], "name": lead["full_name"], "database": engine}
    return {"unlocked": False}
