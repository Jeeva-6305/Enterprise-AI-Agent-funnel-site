const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const leadRoutes = require('./routes/leadRoutes');
const { db } = require('./config/database');

const app = express();
const PORT = process.env.PORT || 9035;

const allowedOrigins = [
  'http://13.201.92.234:9030',
  'http://13.201.92.234:9035',
  'http://localhost:9030',
  'http://localhost:9035',
  'http://127.0.0.1:9030',
  'http://127.0.0.1:9035'
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
  allowedHeaders: ['Content-Type', 'Authorization'],
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

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'Enterprise Funnel Backend API (SQL/SQLite)'
  });
});

// Root Backend API status route
app.get('/', (req, res) => {
  res.json({
    service: 'SEC Analyzer Backend API Server',
    status: 'running',
    port: PORT,
    endpoints: {
      health: '/api/health',
      leads: '/api/leads'
    }
  });
});

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
