const LeadModel = require('../models/LeadModel');

class LeadController {
  /**
   * POST /api/leads
   * Submit lead data from Funnel Page form
   */
  static async createLead(req, res) {
    try {
      const {
        funnel_id,
        funnel_source,
        full_name,
        email,
        phone,
        company,
        job_title,
        use_case,
        message,
        campaign,
        status = 'New'
      } = req.body;

      // Validation
      if (!funnel_id || !funnel_id.trim()) {
        return res.status(400).json({ error: 'Funnel ID is required.' });
      }
      if (!funnel_source || !funnel_source.trim()) {
        return res.status(400).json({ error: 'Funnel source is required.' });
      }
      if (!full_name || !full_name.trim()) {
        return res.status(400).json({ error: 'Full Name is required.' });
      }
      if (!email || !email.trim()) {
        return res.status(400).json({ error: 'Email is required.' });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        return res.status(400).json({ error: 'Please provide a valid email address.' });
      }

      const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || null;
      const rawPayload = req.body;

      const newLead = await LeadModel.create({
        funnel_id,
        funnel_source,
        full_name,
        email,
        phone: phone || null,
        company: company || null,
        job_title: job_title || null,
        use_case: use_case || null,
        message: message || null,
        campaign: campaign || null,
        status,
        ip_address: clientIp,
        raw_payload: rawPayload
      });

      return res.status(201).json({
        ok: true,
        message: 'Lead submitted successfully.',
        lead: newLead
      });
    } catch (error) {
      console.error('Error creating lead:', error);
      return res.status(500).json({
        error: 'Failed to save lead to database. Please try again later.'
      });
    }
  }

  /**
   * GET /api/leads
   * Fetch leads with optional search, filter, and pagination for Admin Dashboard
   */
  static async getLeads(req, res) {
    try {
      const {
        search = '',
        status = '',
        companySize = '',
        sortBy = 'created_at',
        sortOrder = 'DESC',
        page = 1,
        limit = 50
      } = req.query;

      const result = await LeadModel.findAll({
        search,
        status,
        companySize,
        sortBy,
        sortOrder,
        page,
        limit
      });

      return res.status(200).json({
        success: true,
        ...result
      });
    } catch (error) {
      console.error('Error fetching leads:', error);
      return res.status(500).json({ error: 'Failed to retrieve leads from SQL database.' });
    }
  }

  /**
   * GET /api/leads/:id
   * Get single lead details
   */
  static async getLeadById(req, res) {
    try {
      const { id } = req.params;
      const lead = await LeadModel.findById(id);

      if (!lead) {
        return res.status(400).json({ error: 'Lead not found.' });
      }

      return res.status(200).json({
        success: true,
        lead
      });
    } catch (error) {
      console.error('Error fetching lead by id:', error);
      return res.status(500).json({ error: 'Failed to fetch lead details.' });
    }
  }

  /**
   * PATCH /api/leads/:id/status
   * Update lead status or notes from Admin Dashboard
   */
  static async updateLeadStatus(req, res) {
    try {
      const { id } = req.params;
      const { status, notes } = req.body;

      const existing = await LeadModel.findById(id);
      if (!existing) {
        return res.status(404).json({ error: 'Lead not found.' });
      }

      const updatedLead = await LeadModel.updateStatus(id, { status, notes });

      return res.status(200).json({
        success: true,
        message: 'Lead updated successfully.',
        lead: updatedLead
      });
    } catch (error) {
      console.error('Error updating lead status:', error);
      return res.status(500).json({ error: 'Failed to update lead status.' });
    }
  }

  /**
   * DELETE /api/leads/:id
   * Delete lead from SQL database
   */
  static async deleteLead(req, res) {
    try {
      const { id } = req.params;
      const deleted = await LeadModel.delete(id);

      if (!deleted) {
        return res.status(404).json({ error: 'Lead not found or already deleted.' });
      }

      return res.status(200).json({
        success: true,
        message: 'Lead deleted successfully.'
      });
    } catch (error) {
      console.error('Error deleting lead:', error);
      return res.status(500).json({ error: 'Failed to delete lead from database.' });
    }
  }

  /**
   * GET /api/leads/stats
   * Summary metrics for Admin Overview
   */
  static async getLeadStats(req, res) {
    try {
      const stats = await LeadModel.getStats();
      return res.status(200).json({
        success: true,
        stats
      });
    } catch (error) {
      console.error('Error fetching lead stats:', error);
      return res.status(500).json({ error: 'Failed to calculate lead statistics.' });
    }
  }

  /**
   * GET /api/leads/export/csv
   * Export all stored leads to CSV file format
   */
  static async exportCsv(req, res) {
    try {
      const { leads } = await LeadModel.findAll({ limit: 10000 });

      // CSV Header
      const headers = [
        'ID',
        'Funnel ID',
        'Funnel Source',
        'Full Name',
        'Email',
        'Phone',
        'Company',
        'Job Title',
        'Use Case',
        'Message',
        'Campaign',
        'Status',
        'Created At'
      ];

      const csvRows = [];
      csvRows.push(headers.map(h => `"${h}"`).join(','));

      for (const lead of leads) {
        const values = [
          lead.id,
          (lead.funnel_id || '').replace(/"/g, '""'),
          (lead.funnel_source || '').replace(/"/g, '""'),
          (lead.full_name || '').replace(/"/g, '""'),
          (lead.email || '').replace(/"/g, '""'),
          (lead.phone || '').replace(/"/g, '""'),
          (lead.company || '').replace(/"/g, '""'),
          (lead.job_title || '').replace(/"/g, '""'),
          (lead.use_case || '').replace(/"/g, '""'),
          (lead.message || '').replace(/"/g, '""'),
          (lead.campaign || '').replace(/"/g, '""'),
          (lead.status || '').replace(/"/g, '""'),
          lead.created_at
        ];
        csvRows.push(values.map(v => `"${v}"`).join(','));
      }

      const csvContent = csvRows.join('\r\n');
      const filename = `leads_export_${new Date().toISOString().slice(0, 10)}.csv`;

      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
      return res.status(200).send(csvContent);
    } catch (error) {
      console.error('Error exporting leads CSV:', error);
      return res.status(500).json({ error: 'Failed to generate CSV export.' });
    }
  }
}

module.exports = LeadController;
