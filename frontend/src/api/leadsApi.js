/**
 * Frontend API client for Leads Backend - Local backend on port 9025
 */

const BASE_URL = 'http://localhost:9025/api/leads';
const DEFAULT_API_KEY = 'sk_live_agenticdo_878a80ac90a06d3bb61ae527fdc59d4e24c06582ada81a70';

export const leadsApi = {
  /**
   * Submit lead from Funnel Form - Posts to local backend on port 9025
   */
  async submitLead(leadData) {
    const apiKey = import.meta.env.VITE_FUNNEL_API_KEY || DEFAULT_API_KEY;

    try {
      const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': apiKey
        },
        body: JSON.stringify({
          funnel_id: "doc_extraction",
          funnel_source: "Agentic Document Extraction",
          full_name: leadData.fullName,
          email: leadData.workEmail,
          phone: leadData.phone || leadData.phoneNumber || "",
          company: leadData.companyName,
          job_title: leadData.jobTitle,
          use_case: leadData.sourceCampaign || "",
          message: ""
        })
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      }
      
      const errData = await response.json().catch(() => ({}));
      console.warn('Backend returned non-200, unlocking demo with local capture:', errData);
    } catch (networkErr) {
      console.warn('Network / server unavailable, unlocking demo with local capture:', networkErr);
    }

    // Graceful fallback: Store locally so no prospective customer is ever locked out of the demo
    const fallbackLead = {
      id: Date.now(),
      funnel_id: "doc_extraction",
      funnel_source: "Agentic Document Extraction",
      full_name: leadData.fullName,
      email: leadData.workEmail,
      phone: leadData.phone || leadData.phoneNumber || "",
      company: leadData.companyName,
      job_title: leadData.jobTitle,
      use_case: leadData.sourceCampaign || "",
      created_at: new Date().toISOString()
    };

    try {
      const stored = JSON.parse(localStorage.getItem('adople_captured_leads') || '[]');
      stored.push(fallbackLead);
      localStorage.setItem('adople_captured_leads', JSON.stringify(stored));
    } catch (e) {
      // Ignore storage errors
    }

    return {
      ok: true,
      message: 'Demo access unlocked.',
      lead: fallbackLead
    };
  },

  /**
   * Fetch leads with search, filtering and pagination
   */
  async getLeads({ search = '', status = '', companySize = '', page = 1, limit = 50, sortBy = 'created_at', sortOrder = 'DESC' } = {}) {
    const queryParams = new URLSearchParams({
      search,
      status,
      companySize,
      page: page.toString(),
      limit: limit.toString(),
      sortBy,
      sortOrder
    });

    const response = await fetch(`${BASE_URL}?${queryParams.toString()}`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Failed to load leads.');
    }
    return data;
  },

  /**
   * Get aggregated stats for Admin Dashboard
   */
  async getStats() {
    const response = await fetch(`${BASE_URL}/stats`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Failed to load statistics.');
    }
    return data.stats;
  },

  /**
   * Update lead status or notes
   */
  async updateStatus(id, { status, notes }) {
    const response = await fetch(`${BASE_URL}/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status, notes })
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Failed to update lead.');
    }
    return data;
  },

  /**
   * Delete lead by ID
   */
  async deleteLead(id) {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE'
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Failed to delete lead.');
    }
    return data;
  },

  /**
   * Export CSV download endpoint
   */
  getExportCsvUrl() {
    return `${BASE_URL}/export/csv`;
  }
};
