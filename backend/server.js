const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const leadRoutes = require('./routes/leadRoutes');
require('./config/database');

const app = express();
const PORT = process.env.PORT || 9015;

const allowedOrigins = [
  'http://13.201.92.234:9010',
  'http://13.201.92.234:9015',
  'http://localhost:9010',
  'http://localhost:9015',
  'http://127.0.0.1:9010',
  'http://127.0.0.1:9015'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin) || origin.includes('13.201.92.234')) {
      callback(null, true);
    } else {
      callback(null, true);
    }
  },
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-API-Key'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// API Key Validation Middleware for POST /api/leads
app.use('/api/leads', (req, res, next) => {
  if (req.method === 'POST') {
    const apiKey = req.headers['x-api-key'];
    const validApiKey = process.env.VITE_FUNNEL_API_KEY;

    if (!validApiKey) {
      console.error('❌ VITE_FUNNEL_API_KEY not configured in .env');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    if (!apiKey) {
      console.warn('❌ Request rejected: Missing X-API-Key header');
      return res.status(401).json({ error: 'Unauthorized: Missing X-API-Key header' });
    }

    if (apiKey !== validApiKey) {
      console.warn(`❌ Request rejected: Invalid API key received`);
      return res.status(401).json({ error: 'Unauthorized: Invalid API key' });
    }

    console.log('✅ API Key validated successfully');
  }
  next();
});

// API Routes
app.use('/api/leads', leadRoutes);

// Root Backend Info Endpoint
app.get('/', (req, res) => {
  res.json({
    service: 'Enterprise AI Agent Backend API (SQL/SQLite)',
    status: 'online',
    port: PORT,
    endpoints: {
      leads: `/api/leads`,
      health: `/api/health`,
      stats: `/api/leads/stats/overview`,
      exportCsv: `/api/leads/export/csv`
    }
  });
});

// Serve frontend build ONLY in production mode if explicitly configured
if (process.env.NODE_ENV === 'production') {
  const frontendBuildPath = path.join(__dirname, '..', 'frontend', 'dist');
  if (require('fs').existsSync(frontendBuildPath)) {
    app.use(express.static(frontendBuildPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(frontendBuildPath, 'index.html'));
    });
  }
}

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({ error: 'An unexpected internal server error occurred.' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Funnel Backend API server is running on http://localhost:${PORT}`);
  console.log(`📊 Lead API: http://localhost:${PORT}/api/leads`);
  console.log(`🩺 Health check: http://localhost:${PORT}/api/health`);
});
