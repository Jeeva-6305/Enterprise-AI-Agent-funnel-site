/**
 * Frontend API client for Leads Backend - Local backend on port 9015
 */

const BASE_URL = import.meta.env.VITE_API_URL || ((typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1')
  ? '/api/leads'
  : 'http://localhost:9015/api/leads');

export const leadsApi = {
  async submitLead(leadData) {
    const apiKey = import.meta.env.VITE_FUNNEL_API_KEY || 'sk_live_enterprise_d630e8b4f23695595329a6db147b0176ef25cf0f0b07db0d';

    const formattedUseCase = leadData.use_case === 'Other' && leadData.other_use_case
      ? `Other: ${leadData.other_use_case.trim()}`
      : (leadData.use_case || '');

    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': apiKey
      },
      body: JSON.stringify({
        funnel_id: "enterprise_ai",
        funnel_source: "Enterprise AI Agent",
        full_name: leadData.fullName || leadData.full_name,
        email: leadData.workEmail || leadData.work_email,
        phone: leadData.phone || leadData.phoneNumber,
        company: leadData.companyName || leadData.company_name,
        job_title: leadData.jobTitle || leadData.job_title,
        use_case: formattedUseCase,
        other_use_case: leadData.other_use_case || "",
        company_size: leadData.companySize || leadData.company_size || "",
        message: leadData.message || ""
      })
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || data.message || 'Failed to submit lead.');
    }
    return data;
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
