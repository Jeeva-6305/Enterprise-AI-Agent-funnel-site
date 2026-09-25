import React, { useState, useEffect, useCallback } from 'react';
import { Search, Download, RefreshCw, Filter, ArrowLeft, Plus } from 'lucide-react';
import LeadStats from './LeadStats';
import LeadTable from './LeadTable';
import LeadDetailModal from './LeadDetailModal';
import { leadsApi } from '../../api/leadsApi';
import '../../styles/admin.css';

export default function AdminDashboard({ onBackToFunnel, showToast }) {
  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [companySizeFilter, setCompanySizeFilter] = useState('');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, page: 1, limit: 50, totalPages: 1 });
  const [selectedLead, setSelectedLead] = useState(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [leadsRes, statsRes] = await Promise.all([
        leadsApi.getLeads({
          search,
          status: statusFilter,
          companySize: companySizeFilter,
          page
        }),
        leadsApi.getStats()
      ]);

      setLeads(leadsRes.leads || []);
      setPagination(leadsRes.pagination || { total: 0, page: 1, limit: 50, totalPages: 1 });
      setStats(statsRes);
    } catch (err) {
      console.error('Failed to load admin leads:', err);
      if (showToast) showToast('Failed to connect to backend SQL database.', 'error');
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter, companySizeFilter, page, showToast]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await leadsApi.updateStatus(id, { status: newStatus });
      if (showToast) showToast(`Lead #${id} status updated to ${newStatus}`, 'success');
      loadData();
    } catch (err) {
      if (showToast) showToast('Failed to update status', 'error');
    }
  };

  const handleDeleteLead = async (id) => {
    if (!window.confirm(`Are you sure you want to permanently delete Lead #${id} from the SQL database?`)) {
      return;
    }
    try {
      await leadsApi.deleteLead(id);
      if (showToast) showToast(`Lead #${id} deleted from database`, 'success');
      loadData();
    } catch (err) {
      if (showToast) showToast('Failed to delete lead', 'error');
    }
  };

  const handleSaveModal = async (id, updates) => {
    await leadsApi.updateStatus(id, updates);
    if (showToast) showToast(`Lead #${id} details saved`, 'success');
    loadData();
  };

  const handleExportCsv = () => {
    window.open(leadsApi.getExportCsvUrl(), '_blank');
    if (showToast) showToast('Downloading CSV export from SQL database...', 'success');
  };

  return (
    <div className="admin-layout">
      {/* Top Admin Sub-bar */}
      <nav className="admin-nav">
        <div className="container admin-nav-container">
          <div className="admin-brand-group">
            <button 
              id="btn-admin-back"
              onClick={onBackToFunnel} 
              className="btn-secondary"
              style={{ padding: '0.4rem 0.8rem', fontSize: '0.8125rem' }}
            >
              <ArrowLeft size={16} />
              <span>Funnel Page</span>
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h2 style={{ fontSize: '1.125rem', fontWeight: 800, color: '#0f172a' }}>
                SQL Lead Management Portal
              </h2>
              <span className="admin-badge">SQLite Storage</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              id="btn-export-csv"
              className="btn-export"
              onClick={handleExportCsv}
              title="Export all leads to CSV"
            >
              <Download size={16} />
              <span>Export CSV</span>
            </button>
            <button
              id="btn-refresh-leads"
              className="btn-refresh"
              onClick={loadData}
              title="Refresh Lead Data"
            >
              <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            </button>
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <main className="admin-main">
        <div className="container">
          {/* Stats Overview */}
          <LeadStats stats={stats} />

          {/* Controls Bar: Search & Filters */}
          <div className="admin-controls-card">
            <div className="search-box">
              <Search size={16} color="#64748b" />
              <input
                type="text"
                id="search-leads-input"
                placeholder="Search by name, email, company, or job title..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
              />
            </div>

            <div className="filter-actions">
              {/* Status Filter */}
              <select
                id="filter-status-select"
                className="filter-select"
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setPage(1);
                }}
              >
                <option value="">All Statuses</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
                <option value="Demo Scheduled">Demo Scheduled</option>
                <option value="Closed">Closed</option>
              </select>

              {/* Company Size Filter */}
              <select
                id="filter-size-select"
                className="filter-select"
                value={companySizeFilter}
                onChange={(e) => {
                  setCompanySizeFilter(e.target.value);
                  setPage(1);
                }}
              >
                <option value="">All Company Sizes</option>
                <option value="1-50 employees">1-50 employees</option>
                <option value="51-200 employees">51-200 employees</option>
                <option value="201-500 employees">201-500 employees</option>
                <option value="501-1000 employees">501-1000 employees</option>
                <option value="1000+ employees">1000+ employees</option>
                <option value="Enterprise (5000+)">Enterprise (5000+)</option>
              </select>
            </div>
          </div>

          {/* Leads Table */}
          <LeadTable
            leads={leads}
            pagination={pagination}
            onPageChange={(newPage) => setPage(newPage)}
            onViewLead={(lead) => setSelectedLead(lead)}
            onDeleteLead={handleDeleteLead}
            onStatusChange={handleStatusChange}
          />
        </div>
      </main>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <LeadDetailModal
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
          onSave={handleSaveModal}
        />
      )}
    </div>
  );
}
