import os
import sqlite3
import secrets
import json
from datetime import datetime
from typing import List, Optional
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
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
        # Shared leads table structure
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
        # Auto-migrate any missing columns for PostgreSQL
        pg_cols = [
            ("video_watched", "BOOLEAN DEFAULT FALSE"),
            ("video_watched_at", "TIMESTAMPTZ"),
            ("access_count", "INT DEFAULT 0"),
            ("access_token", "VARCHAR(255)"),
            ("work_email", "VARCHAR(255)"),
            ("phone_number", "VARCHAR(50)"),
            ("company_name", "VARCHAR(255)"),
            ("company_size", "VARCHAR(255)"),
            ("country_code", "VARCHAR(10)")
        ]
        for col_name, col_def in pg_cols:
            try:
                cursor.execute(f"ALTER TABLE leads ADD COLUMN IF NOT EXISTS {col_name} {col_def}")
            except Exception:
                pass
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
        # Auto-migrate any missing columns in SQLite
        cursor.execute("PRAGMA table_info(leads)")
        existing_cols = {row[1] for row in cursor.fetchall()}
        cols_to_add = [
            ("funnel_id", "TEXT DEFAULT 'agentic-data-analyst'"),
            ("funnel_source", "TEXT DEFAULT 'Agentic Data Analyst'"),
            ("email", "TEXT"),
            ("work_email", "TEXT"),
            ("phone", "TEXT"),
            ("phone_number", "TEXT"),
            ("company", "TEXT"),
            ("company_name", "TEXT"),
            ("job_title", "TEXT"),
            ("company_size", "TEXT"),
            ("country_code", "TEXT"),
            ("use_case", "TEXT"),
            ("message", "TEXT"),
            ("campaign", "TEXT"),
            ("status", "TEXT DEFAULT 'New'"),
            ("source_url", "TEXT"),
            ("updated_at", "TIMESTAMP DEFAULT CURRENT_TIMESTAMP"),
            ("raw_payload", "TEXT DEFAULT '{}'"),
            ("access_token", "TEXT"),
            ("video_watched", "INTEGER DEFAULT 0"),
            ("video_watched_at", "TIMESTAMP"),
            ("access_count", "INTEGER DEFAULT 0")
        ]
        for col_name, col_def in cols_to_add:
            if col_name not in existing_cols:
                try:
                    cursor.execute(f"ALTER TABLE leads ADD COLUMN {col_name} {col_def}")
                except Exception:
                    pass
    conn.commit()
    conn.close()

init_db()

# Pydantic Schemas
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
    work_email: Optional[str] = None
    job_title: Optional[str] = None
    company_name: Optional[str] = None
    company_size: Optional[str] = None
    country_code: Optional[str] = None
    phone_number: Optional[str] = None
    access_token: Optional[str] = None
    video_watched: Optional[bool] = False
    access_count: Optional[int] = 0
    created_at: Optional[str] = None

class SubmitSuccessResponse(BaseModel):
    status: str
    lead_id: Optional[int] = None
    access_token: Optional[str] = None
    unlocked: bool = True
    video_watched: bool = False
    message: str
    database: Optional[str] = None

class MarkWatchedRequest(BaseModel):
    access_token: Optional[str] = None
    email: Optional[str] = None

class MarkWatchedResponse(BaseModel):
    status: str
    video_watched: bool
    unlocked: bool
    message: str

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
    client_ip = request.client.host if request.client else "unknown"
    clean_email = lead.email.strip().lower()

    conn, engine = get_db()
    cursor = conn.cursor()
    placeholder = "%s" if engine == "postgresql" else "?"

    try:
        # Check if existing lead exists with this email
        cursor.execute(f"""
            SELECT id, full_name, email, COALESCE(video_watched, 0) as video_watched, 
                   COALESCE(access_count, 0) as access_count, access_token 
            FROM leads 
            WHERE LOWER(COALESCE(email, '')) = {placeholder} 
               OR LOWER(COALESCE(work_email, '')) = {placeholder}
            ORDER BY id DESC LIMIT 1
        """, (clean_email, clean_email))
        existing = cursor.fetchone()

        if existing:
            lead_id = existing["id"]
            has_watched = bool(existing["video_watched"]) or existing["access_count"] >= 1

            if has_watched:
                # User has already watched the demo video! Keep it locked!
                conn.close()
                return SubmitSuccessResponse(
                    status="already_watched",
                    lead_id=lead_id,
                    access_token="",
                    unlocked=False,
                    video_watched=True,
                    message="You have already watched the demo video with this email. Your one-time demo access has expired, and the video is locked.",
                    database=engine
                )
            else:
                # Existing user who hasn't watched yet — issue a fresh token for one-time access
                new_token = secrets.token_hex(16)
                raw_payload = lead.dict()
                raw_payload["access_token"] = new_token
                raw_payload["ip_address"] = client_ip

                cursor.execute(f"""
                    UPDATE leads 
                    SET full_name = {placeholder},
                        phone = {placeholder},
                        phone_number = {placeholder},
                        company = {placeholder},
                        company_name = {placeholder},
                        job_title = {placeholder},
                        use_case = {placeholder},
                        access_token = {placeholder},
                        updated_at = CURRENT_TIMESTAMP,
                        raw_payload = {placeholder}
                    WHERE id = {placeholder}
                """, (
                    lead.full_name,
                    lead.phone or "",
                    lead.phone or "",
                    lead.company or "",
                    lead.company or "",
                    lead.job_title,
                    lead.use_case or "",
                    new_token,
                    json.dumps(raw_payload),
                    lead_id
                ))
                conn.commit()
                conn.close()

                return SubmitSuccessResponse(
                    status="success",
                    lead_id=lead_id,
                    access_token=new_token,
                    unlocked=True,
                    video_watched=False,
                    message="Welcome back! Demo video unlocked for your one-time viewing.",
                    database=engine
                )

        # Brand New Lead
        access_token = secrets.token_hex(16)
        raw_payload = lead.dict()
        raw_payload["access_token"] = access_token
        raw_payload["ip_address"] = client_ip

        if engine == "postgresql":
            cursor.execute("""
                INSERT INTO leads (
                    funnel_id, funnel_source, full_name, email, work_email, phone,
                    phone_number, company, company_name, job_title, use_case, message,
                    campaign, status, source_url, ip_address, access_token, video_watched,
                    access_count, raw_payload
                ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                RETURNING id;
            """, (
                lead.funnel_id,
                lead.funnel_source,
                lead.full_name,
                clean_email,
                clean_email,
                lead.phone or "",
                lead.phone or "",
                lead.company or "",
                lead.company or "",
                lead.job_title,
                lead.use_case or "",
                lead.message or "",
                "Agentic Data Analyst Landing Page",
                "New",
                "http://localhost:9070",
                client_ip,
                access_token,
                False,
                0,
                json.dumps(raw_payload)
            ))
            lead_id = cursor.fetchone()["id"]
        else:
            cursor.execute("""
                INSERT INTO leads (
                    funnel_id, funnel_source, full_name, email, work_email, phone,
                    phone_number, company, company_name, job_title, use_case, message,
                    campaign, status, source_url, ip_address, access_token, video_watched,
                    access_count, raw_payload
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                lead.funnel_id,
                lead.funnel_source,
                lead.full_name,
                clean_email,
                clean_email,
                lead.phone or "",
                lead.phone or "",
                lead.company or "",
                lead.company or "",
                lead.job_title,
                lead.use_case or "",
                lead.message or "",
                "Agentic Data Analyst Landing Page",
                "New",
                "http://localhost:9070",
                client_ip,
                access_token,
                0,
                0,
                json.dumps(raw_payload)
            ))
            lead_id = cursor.lastrowid

        conn.commit()
        conn.close()

        return SubmitSuccessResponse(
            status="success",
            lead_id=lead_id,
            access_token=access_token,
            unlocked=True,
            video_watched=False,
            message="Lead saved successfully. Demo video unlocked for your one-time viewing.",
            database=engine
        )
    except Exception as e:
        conn.close()
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

@app.post("/api/leads/mark-watched", response_model=MarkWatchedResponse)
@app.post("/api/leads/lock", response_model=MarkWatchedResponse)
def mark_video_watched(payload: MarkWatchedRequest):
    conn, engine = get_db()
    cursor = conn.cursor()
    placeholder = "%s" if engine == "postgresql" else "?"

    clean_email = (payload.email or "").strip().lower()
    token = (payload.access_token or "").strip()

    try:
        # Mark video as watched and increment access count
        if token and clean_email:
            cursor.execute(f"""
                UPDATE leads 
                SET video_watched = {1 if engine == 'sqlite' else 'TRUE'}, 
                    video_watched_at = CURRENT_TIMESTAMP, 
                    access_count = COALESCE(access_count, 0) + 1,
                    status = 'Demo Watched'
                WHERE access_token = {placeholder}
                   OR LOWER(COALESCE(email, '')) = {placeholder}
                   OR LOWER(COALESCE(work_email, '')) = {placeholder}
            """, (token, clean_email, clean_email))
        elif token:
            cursor.execute(f"""
                UPDATE leads 
                SET video_watched = {1 if engine == 'sqlite' else 'TRUE'}, 
                    video_watched_at = CURRENT_TIMESTAMP, 
                    access_count = COALESCE(access_count, 0) + 1,
                    status = 'Demo Watched'
                WHERE access_token = {placeholder}
            """, (token,))
        elif clean_email:
            cursor.execute(f"""
                UPDATE leads 
                SET video_watched = {1 if engine == 'sqlite' else 'TRUE'}, 
                    video_watched_at = CURRENT_TIMESTAMP, 
                    access_count = COALESCE(access_count, 0) + 1,
                    status = 'Demo Watched'
                WHERE LOWER(COALESCE(email, '')) = {placeholder}
                   OR LOWER(COALESCE(work_email, '')) = {placeholder}
            """, (clean_email, clean_email))

        conn.commit()
        conn.close()

        return MarkWatchedResponse(
            status="success",
            video_watched=True,
            unlocked=False,
            message="Video marked as watched. Demo is now locked."
        )
    except Exception as e:
        conn.close()
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

@app.get("/api/leads/verify/{access_token}")
def verify_token(access_token: str):
    conn, engine = get_db()
    cursor = conn.cursor()
    placeholder = "%s" if engine == "postgresql" else "?"

    cursor.execute(f"""
        SELECT id, full_name, email, COALESCE(video_watched, 0) as video_watched, 
               COALESCE(access_count, 0) as access_count 
        FROM leads 
        WHERE access_token = {placeholder}
        ORDER BY id DESC LIMIT 1
    """, (access_token,))
    lead = cursor.fetchone()
    conn.close()

    if lead:
        has_watched = bool(lead["video_watched"]) or lead["access_count"] >= 1
        if has_watched:
            return {
                "unlocked": False,
                "video_watched": True,
                "lead_id": lead["id"],
                "name": lead["full_name"],
                "database": engine,
                "message": "Demo video has already been watched and is now locked."
            }
        return {
            "unlocked": True,
            "video_watched": False,
            "lead_id": lead["id"],
            "name": lead["full_name"],
            "database": engine
        }
    return {"unlocked": False, "video_watched": False, "message": "Token not found"}

@app.get("/api/leads/check-email/{email}")
def check_email_status(email: str):
    clean_email = email.strip().lower()
    conn, engine = get_db()
    cursor = conn.cursor()
    placeholder = "%s" if engine == "postgresql" else "?"

    cursor.execute(f"""
        SELECT id, full_name, email, COALESCE(video_watched, 0) as video_watched, 
               COALESCE(access_count, 0) as access_count 
        FROM leads 
        WHERE LOWER(COALESCE(email, '')) = {placeholder}
           OR LOWER(COALESCE(work_email, '')) = {placeholder}
        ORDER BY id DESC LIMIT 1
    """, (clean_email, clean_email))
    lead = cursor.fetchone()
    conn.close()

    if lead:
        has_watched = bool(lead["video_watched"]) or lead["access_count"] >= 1
        return {"exists": True, "video_watched": has_watched, "lead_id": lead["id"]}
    return {"exists": False, "video_watched": False}

@app.get("/api/leads", response_model=List[LeadResponse])
def list_leads():
    conn, engine = get_db()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT id, full_name, COALESCE(work_email, email) as work_email, job_title, 
               COALESCE(company_name, company) as company_name, company_size, country_code, 
               COALESCE(phone_number, phone) as phone_number, access_token, 
               COALESCE(video_watched, 0) as video_watched, COALESCE(access_count, 0) as access_count, 
               created_at 
        FROM leads ORDER BY id DESC
    """)
    rows = cursor.fetchall()
    conn.close()

    result = []
    for r in rows:
        d = dict(r)
        d["video_watched"] = bool(d.get("video_watched", 0))
        if isinstance(d.get("created_at"), datetime):
            d["created_at"] = d["created_at"].isoformat()
        else:
            d["created_at"] = str(d.get("created_at", ""))
        result.append(d)
    return result

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=9075)
