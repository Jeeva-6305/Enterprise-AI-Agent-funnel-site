const express = require('express');
const router = express.Router();
const LeadController = require('../controllers/leadController');

// Submit new lead from funnel page
router.post('/', LeadController.createLead);

// Lead management endpoints for Admin portal
router.get('/', LeadController.getLeads);
router.get('/stats', LeadController.getLeadStats);
router.get('/export/csv', LeadController.exportCsv);
router.get('/:id', LeadController.getLeadById);
router.patch('/:id/status', LeadController.updateLeadStatus);
router.delete('/:id', LeadController.deleteLead);

module.exports = router;
