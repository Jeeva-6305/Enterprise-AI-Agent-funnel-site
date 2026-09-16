# Policy-Driven Treasury Optimization Funnel & SQL Lead Management System

> Built for **22nd Century Technologies, Inc.** (TSCTI Payment Gateway) using **React 18**, **Node.js Express**, and **SQL (SQLite)**.

---

## 🌟 Features Overview

- **Pixel-Accurate Enterprise Funnel Page**:
  - Top navigation with 22nd Century Technologies branding & quick link to Admin Leads Portal.
  - Navy security ribbon: *"🔒 Free Treasury Process Review — Deliver financial impact in 45 days or less"*.
  - Social Proof / Enterprise client logo strip (Oracle, SAP, Johnson & Johnson, Deloitte, The World Bank).
  - High-conversion 2-column layout:
    - **Left Column**: Product badge, headline (*"Policy-Driven Treasury Optimization Platform"*), value proposition, 4-point checkmark list, and the *"Purpose-built for today's complexity"* pain point callout.
    - **Right Column**: Platform demo video preview player + 2-column lead capture form (*Full Name, Work Email, Job Title, Company Name, Company Size dropdown, International Phone with country code selector*).
  - Compliance & credentials footer (*CMMI Level 3 Dev & SVC, ISO 9001/20000/27001*).

- **Robust SQL Database Layer**:
  - Raw SQL schema definition (`schema.sql`) and automated database table initialization.
  - Parameterized SQL queries preventing SQL injection.
  - Lead indexing on email, status, timestamp, and company for high performance.
  - Starts 100% clean and empty — strictly stores only manual submissions from the Funnel page form.

- **Dedicated Admin Lead Management Portal**:
  - Live metric cards (Total Leads, New Submissions, Qualified Leads, Top Segments).
  - Searchable lead table (by name, email, company, role, phone).
  - Filters for status (*New, Contacted, Qualified, Demo Scheduled, Closed*) and company size.
  - Inline status update dropdowns and detailed lead inspection modal.
  - One-click **CSV Export** for CRM integration (Salesforce, HubSpot, Oracle ERP).

---

## 📂 Project Folder Structure

```
Enterprise-AI-Agent-funnel-site/
├── package.json                         # Root orchestration scripts (dev, build, install)
├── README.md                            # Complete technical documentation
│
├── backend/                             # Backend Express & SQL Database Layer
│   ├── package.json                     # Backend dependencies (express, sqlite3, cors, dotenv)
│   ├── server.js                        # Server entry point, middleware, routes mounting
│   ├── config/
│   │   └── database.js                  # SQL connection, schema auto-init, query helpers
│   ├── database/
│   │   ├── schema.sql                   # SQL DDL table & index definitions
│   │   └── leads.db                     # SQLite database file
│   ├── models/
│   │   └── LeadModel.js                 # SQL query methods (Parameterized queries)
│   ├── controllers/
│   │   └── leadController.js            # Input validation, business logic, CSV generation
│   └── routes/
│       └── leadRoutes.js                # REST API routes (/api/leads, /stats, /export/csv)
│
└── frontend/                            # Frontend React 18 Application
    ├── package.json                     # Frontend dependencies (react 18, lucide-react, vite)
    ├── vite.config.js                   # Vite configuration with proxy to backend port 9015
    ├── index.html                       # HTML5 template with Google Fonts (Plus Jakarta Sans, Inter)
    ├── public/
    │   └── favicon.svg                  # Vector SVG favicon
    └── src/
        ├── main.jsx                     # React 18 createRoot entry
        ├── App.jsx                      # Page switcher / Router (Funnel vs Admin portal)
        ├── api/
        │   └── leadsApi.js              # Fetch client communicating with backend SQL API
        ├── components/
        │   ├── common/
        │   │   ├── Navbar.jsx           # Top branding bar with Admin toggle
        │   │   ├── AnnouncementBar.jsx  # Navy notification banner
        │   │   ├── TrustBar.jsx         # Enterprise client logos strip
        │   │   ├── Footer.jsx           # Company footer & compliance certifications
        │   │   └── Toast.jsx            # Action notifications
        │   ├── funnel/
        │   │   ├── FunnelHero.jsx       # Left hero: Title, description, checklist
        │   │   ├── PainPointsCard.jsx   # Structural bottlenecks card
        │   │   ├── VideoPlayer.jsx      # Video preview card top
        │   │   ├── LeadForm.jsx         # 2-column form matching screenshot
        │   │   ├── SuccessModal.jsx     # Lead submission confirmation & SQL ID display
        │   │   └── VideoModal.jsx       # Interactive platform demo walkthrough
        │   └── admin/
        │       ├── AdminDashboard.jsx   # Admin management page
        │       ├── LeadStats.jsx        # Stats overview cards
        │       ├── LeadTable.jsx        # Searchable, filterable lead table
        │       └── LeadDetailModal.jsx  # Lead inspection & status update modal
        └── styles/
            ├── variables.css            # Color tokens, typography, shadows
            ├── global.css               # Base resets and utility classes
            ├── funnel.css               # Funnel layout & component styles
            └── admin.css                # Admin portal styling
```

---

## 🗄️ SQL Database Schema (`schema.sql`)

```sql
CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name VARCHAR(255) NOT NULL,
    work_email VARCHAR(255) NOT NULL,
    job_title VARCHAR(255) NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    company_size VARCHAR(100) NOT NULL,
    phone_country_code VARCHAR(10) DEFAULT '+91',
    phone_number VARCHAR(50) NOT NULL,
    source_campaign VARCHAR(255) DEFAULT 'TSCTI Treasury Optimization Funnel',
    status VARCHAR(50) DEFAULT 'New',
    notes TEXT DEFAULT NULL,
    ip_address VARCHAR(100) DEFAULT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(work_email);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at);
CREATE INDEX IF NOT EXISTS idx_leads_company ON leads(company_name);
```

---

## 🔌 REST API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/leads` | Submit new lead from Funnel page and store into SQL database |
| `GET` | `/api/leads` | Fetch leads with search, filters (status, company size), and pagination |
| `GET` | `/api/leads/stats` | Aggregated metrics (total leads, status breakdown, segment counts) |
| `GET` | `/api/leads/:id` | Fetch single lead details by ID |
| `PATCH` | `/api/leads/:id/status` | Update lead status (`New`, `Contacted`, `Qualified`, etc.) and notes |
| `DELETE` | `/api/leads/:id` | Delete lead record from SQL database |
| `GET` | `/api/leads/export/csv` | Download all stored leads as a `.csv` spreadsheet file |
| `GET` | `/api/health` | Health check endpoint |

---

## 🚀 How to Run the Project Locally

### 1. Install Dependencies
```bash
# In project root:
npm run install:all
```

### 2. Start Both Backend & Frontend Concurrently
```bash
# In project root:
npm run dev
```
- **Frontend (React 18)**: [http://localhost:9010](http://localhost:9010)
- **Backend API (SQL Database)**: [http://localhost:9015](http://localhost:9015)

### 3. Or Run Individually
```bash
# Start Backend
npm run dev:backend

# Start Frontend
npm run dev:frontend
```

### 4. Direct Links & Navigation
- **Funnel Landing Page**: [http://localhost:9010](http://localhost:9010)
- **Admin Lead Review Portal**: [http://localhost:9010/#admin](http://localhost:9010/#admin) (or click the *"Admin Leads Portal"* button in the top navigation bar).
