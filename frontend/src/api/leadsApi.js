/**
 * Frontend API client for Leads Backend
 */

const BASE_URL = '/api/leads';

export const leadsApi = {
  /**
   * Submit lead from Funnel Form
   */
  async submitLead(leadData) {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(leadData)
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Failed to submit lead.');
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
