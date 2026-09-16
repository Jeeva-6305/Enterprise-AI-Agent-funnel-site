const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const leadRoutes = require('./routes/leadRoutes');
const { db } = require('./config/database');

const app = express();
const PORT = process.env.PORT || 9035;

// Middlewares
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
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
