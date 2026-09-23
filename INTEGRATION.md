# Funnel Dashboard Integration Guide

## 🔗 Overview

The Agentic Data Analyst funnel is integrated with the **Funnel Dashboard** central database system. All form submissions are stored in a shared Neon PostgreSQL database and can be viewed in the centralized dashboard.

## 📊 Database Architecture

### Shared Database: Neon PostgreSQL

**Database Name:** `funnel_central_db`  
**Host:** `ep-soft-meadow-b5vrda18-pooler.c-7.us-east-2.aws.neon.tech`  
**Port:** `5432`  
**SSL:** Required

### Leads Table Structure

All leads are stored in a unified `leads` table:

```sql
CREATE TABLE leads (
  id SERIAL PRIMARY KEY,
  funnel_id VARCHAR(100) NOT NULL,           -- 'agentic-data-analyst'
  funnel_source VARCHAR(100) NOT NULL,       -- 'Agentic Data Analyst'
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  company VARCHAR(255),
  job_title VARCHAR(255),
  use_case TEXT,                             -- Stores company size
  message TEXT,
  campaign VARCHAR(255),
  status VARCHAR(50) DEFAULT 'New',
  source_url TEXT,
  ip_address VARCHAR(45),
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  raw_payload JSONB DEFAULT '{}'::jsonb
);
```

## 🔄 Data Flow

```
┌─────────────────────┐
│   User fills form   │
│   (Frontend 9070)   │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│   POST /api/leads   │
│  (Backend 9075)     │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Neon PostgreSQL    │
│  leads table        │
│  funnel_id=         │
│  agentic-data-      │
│  analyst            │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Funnel Dashboard   │
│  (Port 9001)        │
│  View all leads     │
└─────────────────────┘
```

## 🚀 Setup Instructions

### 1. Backend Configuration

Update `backend/.env`:

```env
POSTGRES_HOST=ep-soft-meadow-b5vrda18-pooler.c-7.us-east-2.aws.neon.tech
POSTGRES_PORT=5432
POSTGRES_DB=funnel_central_db
POSTGRES_USER=neondb_owner
POSTGRES_PASSWORD=your_password
```

### 2. Frontend Configuration

Update `.env`:

```env
VITE_BACKEND_URL=http://localhost:9075
VITE_FUNNEL_API_KEY=sk_live_agenticdo_xxx
```

### 3. Start Services

```bash
# Terminal 1: Backend
cd backend
source venv/bin/activate
python main.py

# Terminal 2: Frontend
npm run dev

# Terminal 3: Funnel Dashboard (optional)
cd ../Funnel-Dashboard/backend
npm start
```

## 🧪 Testing the Integration

### 1. Test Backend Connection

```bash
curl http://localhost:9075/api/health
```

Expected response:
```json
{
  "status": "healthy",
  "database_engine": "postgresql"
}
```

### 2. Submit Test Lead

```bash
curl -X POST http://localhost:9075/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "funnel_id": "agentic-data-analyst",
    "funnel_source": "Agentic Data Analyst",
    "full_name": "Test User",
    "email": "test@example.com",
    "phone": "+1 5551234",
    "company": "Test Company",
    "job_title": "Manager",
    "use_case": "Company Size: 11-50",
    "message": ""
  }'
```

### 3. Verify in Database

Connect to Neon and query:

```sql
SELECT * FROM leads 
WHERE funnel_id = 'agentic-data-analyst' 
ORDER BY created_at DESC 
LIMIT 5;
```

### 4. Check Funnel Dashboard

1. Open `http://localhost:9001`
2. Login with dashboard credentials
3. Filter by "Agentic Data Analyst" funnel
4. Your test lead should appear

## 📡 API Endpoints

### Health Check
```
GET /api/health
```

### Submit Lead
```
POST /api/leads
POST /api/ingest/leads  (alias)
```

Both endpoints accept the same payload format.

### Request Payload

```typescript
{
  funnel_id: string;           // 'agentic-data-analyst'
  funnel_source: string;       // 'Agentic Data Analyst'
  full_name: string;
  email: string;
  phone?: string;
  company?: string;
  job_title: string;
  use_case?: string;
  message?: string;
}
```

### Response

```json
{
  "status": "success",
  "lead_id": 123,
  "access_token": "abc123...",
  "message": "Lead saved successfully. Demo video unlocked!",
  "database": "postgresql"
}
```

## 🔍 Monitoring & Debugging

### Check Backend Logs

```bash
cd backend
tail -f backend.log
```

### Common Log Messages

```
INFO: Connected to PostgreSQL database
INFO: 127.0.0.1:42172 - "POST /api/leads HTTP/1.1" 200 OK
```

### Verify Lead Count

```bash
cd backend
source venv/bin/activate
python << 'EOF'
import psycopg2
import os

conn = psycopg2.connect(
    host=os.getenv("POSTGRES_HOST"),
    database=os.getenv("POSTGRES_DB"),
    user=os.getenv("POSTGRES_USER"),
    password=os.getenv("POSTGRES_PASSWORD"),
    port=5432,
    sslmode='require'
)
cursor = conn.cursor()
cursor.execute("SELECT COUNT(*) FROM leads WHERE funnel_id = 'agentic-data-analyst'")
count = cursor.fetchone()[0]
print(f"Total leads: {count}")
conn.close()
EOF
```

## 🎯 Funnel Identification

This funnel is identified in the database by:

- **funnel_id**: `agentic-data-analyst`
- **funnel_source**: `Agentic Data Analyst`

These values are hardcoded in both:
1. Frontend: `LeadForm.tsx`
2. Backend: `main.py` (as default values)

## 🔐 Security

- Database credentials stored in `.env` (gitignored)
- SSL required for Neon PostgreSQL connections
- API key used for future authentication (optional)
- Form submissions include IP tracking

## 📈 Lead Status Lifecycle

1. **New** - Initial submission (default)
2. **Contacted** - Sales team reached out
3. **Qualified** - Lead meets criteria
4. **Converted** - Became customer
5. **Lost** - Not interested

Status can be updated in the Funnel Dashboard.

## 🔄 Sync with Other Funnels

The Funnel Dashboard aggregates leads from multiple funnels:

1. Adople Treasury
2. **Agentic Data Analyst** (this funnel)
3. Agentic Document Extraction
4. Enterprise AI Agent
5. SEC Analysis
6. TeleCalling Agent
7. Voice Agent

All use the same `leads` table with different `funnel_id` values.

## 🚨 Troubleshooting

### Problem: "Failed to connect to database"
**Solution**: Check PostgreSQL credentials in `backend/.env`

### Problem: "404 Not Found" for `/api/ingest/leads`
**Solution**: Ensure backend has both endpoint decorators on the submit function

### Problem: Leads not appearing in dashboard
**Solution**: 
1. Verify `funnel_id` matches exactly: `agentic-data-analyst`
2. Check dashboard is connected to same database
3. Refresh dashboard page

### Problem: SSL connection error
**Solution**: Ensure `sslmode='require'` for Neon PostgreSQL connections

## ✅ Integration Checklist

- [ ] Backend `.env` configured with Neon credentials
- [ ] Frontend `.env` configured with backend URL
- [ ] Backend running on port 9075
- [ ] Frontend running on port 9070
- [ ] Test lead submission successful
- [ ] Lead appears in Neon database
- [ ] Lead visible in Funnel Dashboard
- [ ] Form unlocks demo video after submission

## 📞 Support

If you encounter issues:

1. Check backend logs for errors
2. Verify database credentials
3. Test PostgreSQL connection manually
4. Ensure all services are running on correct ports
5. Check network connectivity to Neon

---

**Last Updated**: 2026-09-18  
**Integration Status**: ✅ Complete and Working
