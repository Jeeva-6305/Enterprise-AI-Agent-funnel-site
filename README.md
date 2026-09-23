# Agentic Data Analyst Funnel

Lead generation funnel site for the Agentic Data Analyst product, integrated with the Funnel Dashboard's central database.

## 🎯 Overview

This funnel site captures leads and stores them in a shared Neon PostgreSQL database, making all leads visible in the centralized Funnel Dashboard.

## 🏗️ Architecture

- **Frontend**: React + TypeScript + Vite (Port 9070)
- **Backend**: Python FastAPI (Port 9075)
- **Database**: Shared Neon PostgreSQL (same as Funnel Dashboard)
- **Funnel ID**: `agentic-data-analyst`

## 📊 Database Integration

All form submissions are saved to the central `leads` table with:
- `funnel_id`: `"agentic-data-analyst"`
- `funnel_source`: `"Agentic Data Analyst"`
- `status`: `"New"`

The leads can be viewed in the Funnel Dashboard at `http://localhost:9001`

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Python 3.8+
- Access to Neon PostgreSQL database

### 1. Setup Frontend

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Update .env with your values:
# VITE_BACKEND_URL=http://localhost:9075
# VITE_FUNNEL_API_KEY=your_api_key

# Start development server
npm run dev
```

Frontend will be available at: **http://localhost:9070**

### 2. Setup Backend

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Copy environment file
cp .env.example .env

# Update .env with Neon database credentials:
# POSTGRES_HOST=your_neon_host.neon.tech
# POSTGRES_PORT=5432
# POSTGRES_DB=funnel_central_db
# POSTGRES_USER=your_db_user
# POSTGRES_PASSWORD=your_db_password

# Start backend server
python main.py
# or with auto-reload:
# uvicorn main:app --reload --port 9075
```

Backend API will be available at: **http://localhost:9075**

## 🔧 Configuration

### Environment Variables

#### Frontend (`.env`)

```env
VITE_FUNNEL_API_KEY=sk_live_agenticdo_xxx
VITE_BACKEND_URL=http://localhost:9075
```

**Note**: Vite requires the `VITE_` prefix for environment variables to be accessible in the browser.

#### Backend (`backend/.env`)

```env
# PostgreSQL Connection (Shared with Funnel Dashboard)
POSTGRES_HOST=ep-soft-meadow-b5vrda18-pooler.c-7.us-east-2.aws.neon.tech
POSTGRES_PORT=5432
POSTGRES_DB=funnel_central_db
POSTGRES_USER=neondb_owner
POSTGRES_PASSWORD=your_password
```

## 📡 API Endpoints

### Health Check
```bash
GET http://localhost:9075/api/health
```

Response:
```json
{
  "status": "healthy",
  "service": "Adople AI Lead Funnel API",
  "database_engine": "postgresql",
  "timestamp": "2026-09-18T10:50:13.113108"
}
```

### Submit Lead
```bash
POST http://localhost:9075/api/leads
# or
POST http://localhost:9075/api/ingest/leads
```

Request Body:
```json
{
  "funnel_id": "agentic-data-analyst",
  "funnel_source": "Agentic Data Analyst",
  "full_name": "John Doe",
  "email": "john@example.com",
  "phone": "+1 5551234",
  "company": "Acme Corp",
  "job_title": "Data Analyst",
  "use_case": "Company Size: 51-200 employees",
  "message": ""
}
```

Response:
```json
{
  "status": "success",
  "lead_id": 123,
  "access_token": "abc123...",
  "message": "Lead saved successfully. Demo video unlocked!",
  "database": "postgresql"
}
```

## 🧪 Testing

### Test Backend Connection
```bash
curl http://localhost:9075/api/health
```

### Test Lead Submission
```bash
curl -X POST http://localhost:9075/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "funnel_id": "agentic-data-analyst",
    "funnel_source": "Agentic Data Analyst",
    "full_name": "Test User",
    "email": "test@example.com",
    "phone": "+1 5551234",
    "company": "Test Co",
    "job_title": "Developer",
    "use_case": "Testing",
    "message": ""
  }'
```

### Verify in Database
Check the Funnel Dashboard at `http://localhost:9001` to see your leads.

## 📁 Project Structure

```
Agentic-Data-Analyst-Funnel/
├── src/                          # Frontend React code
│   ├── components/               # React components
│   │   ├── LeadForm.tsx         # Main form component
│   │   ├── LeadModal.tsx        # Modal wrapper
│   │   └── ...
│   ├── App.tsx                  # Main app component
│   └── main.tsx                 # Entry point
├── backend/                      # Python FastAPI backend
│   ├── main.py                  # API server
│   ├── .env                     # Backend config (gitignored)
│   ├── .env.example             # Example config
│   ├── requirements.txt         # Python dependencies
│   └── leads.db                 # SQLite fallback (if PostgreSQL fails)
├── .env                         # Frontend config (gitignored)
├── .env.example                 # Example frontend config
├── package.json                 # Frontend dependencies
└── README.md                    # This file
```

## 🔐 Security Notes

- API keys and database credentials are stored in `.env` files (gitignored)
- Never commit `.env` files to version control
- Use `.env.example` as a template for required variables
- PostgreSQL connection uses SSL by default for Neon

## 🔗 Integration with Funnel Dashboard

This funnel is part of a multi-funnel lead tracking system. All leads are aggregated in:

**Funnel Dashboard**: `http://localhost:9001`

The dashboard shows:
- All leads across all funnels
- Lead statistics and charts
- Lead filtering and search
- Export functionality

## 🐛 Troubleshooting

### Issue: "process is not defined" error in browser
**Solution**: Make sure you're using `VITE_` prefix for environment variables, not `REACT_APP_`

### Issue: Backend returns 404 for `/api/ingest/leads`
**Solution**: Both endpoints are now supported: `/api/leads` and `/api/ingest/leads`

### Issue: "Failed to connect to database"
**Solution**: Check your `POSTGRES_*` environment variables in `backend/.env`

### Issue: Form submission fails
**Solution**: 
1. Ensure backend is running on port 9075
2. Check `VITE_BACKEND_URL` in frontend `.env`
3. Verify backend logs for errors

## 📞 Support

For issues or questions, check the backend logs:
```bash
# If running with uvicorn --reload
tail -f backend.log
```

## 🎉 Success!

When everything is working:
1. Form submissions save to the shared database
2. Leads appear in Funnel Dashboard
3. Demo video unlocks for users
4. Access tokens are generated for tracking
