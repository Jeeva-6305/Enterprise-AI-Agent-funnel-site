const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const leadRoutes = require('./routes/leadRoutes');
const { db } = require('./config/database');

const app = express();
const PORT = process.env.PORT || 9025;

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

// Root API Info Endpoint (Port 9025)
app.get('/', (req, res) => {
  res.json({
    service: 'Document Extraction Funnel Backend API (SQL/SQLite)',
    status: 'online',
    port: PORT,
    endpoints: {
      health: `http://localhost:${PORT}/api/health`,
      leads: `http://localhost:${PORT}/api/leads`,
      stats: `http://localhost:${PORT}/api/leads/stats`,
      exportCsv: `http://localhost:${PORT}/api/leads/export/csv`
    }
  });
});

// Serve frontend build only if explicitly in production mode
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
