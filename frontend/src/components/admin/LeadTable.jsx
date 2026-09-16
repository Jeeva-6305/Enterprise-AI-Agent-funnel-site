import React from 'react';
import { Eye, Trash2, Edit3, Phone, Mail, Building, Calendar, Inbox } from 'lucide-react';

const STATUS_CLASS_MAP = {
  'New': 'status-new',
  'Qualified': 'status-qualified',
  'Demo Scheduled': 'status-demo',
  'Contacted': 'status-contacted',
  'Closed': 'status-closed'
};

export default function LeadTable({
  leads = [],
  pagination = {},
  onPageChange,
  onViewLead,
  onDeleteLead,
  onStatusChange
}) {
  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateStr;
    }
  };

  if (leads.length === 0) {
    return (
      <div className="table-card">
        <div className="table-empty-state">
          <Inbox className="empty-state-icon" />
          <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.5rem', color: '#1e293b' }}>
            No Leads Found
          </h3>
          <p style={{ fontSize: '0.875rem', color: '#64748b' }}>
            No submitted leads matched your search or filter criteria. Submit the form on the Funnel page to add leads to SQL!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="table-card">
      <div className="table-wrapper">
        <table className="leads-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Lead / Contact</th>
              <th>Company &amp; Role</th>
              <th>Company Size</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Submitted Date</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => {
              const statusClass = STATUS_CLASS_MAP[lead.status] || 'status-new';
              return (
                <tr key={lead.id}>
                  <td>
                    <span style={{ fontWeight: 700, color: '#64748b' }}>#{lead.id}</span>
                  </td>

                  <td>
                    <div className="lead-name-cell">
                      <span className="lead-name">{lead.full_name}</span>
                      <span className="lead-email">
                        <Mail size={12} style={{ display: 'inline', marginRight: '4px' }} />
                        {lead.work_email}
                      </span>
                    </div>
                  </td>

                  <td>
                    <div className="lead-company-cell">
                      <span className="lead-company">{lead.company_name}</span>
                      <span className="lead-title">{lead.job_title}</span>
                    </div>
                  </td>

                  <td>
                    <span style={{
                      backgroundColor: '#f1f5f9',
                      padding: '3px 8px',
                      borderRadius: '4px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: '#475569'
                    }}>
                      {lead.company_size}
                    </span>
                  </td>

                  <td>
                    <span style={{ fontSize: '0.8125rem', color: '#334155', fontWeight: 500 }}>
                      {lead.phone_country_code} {lead.phone_number}
                    </span>
                  </td>

                  <td>
                    <select
                      value={lead.status}
                      onChange={(e) => onStatusChange(lead.id, e.target.value)}
                      className={`status-pill ${statusClass}`}
                      style={{ border: 'none', cursor: 'pointer', outline: 'none' }}
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Qualified">Qualified</option>
                      <option value="Demo Scheduled">Demo Scheduled</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </td>

                  <td>
                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                      {formatDate(lead.created_at)}
                    </span>
                  </td>

                  <td>
                    <div className="table-actions" style={{ justifyContent: 'flex-end' }}>
                      <button
                        className="btn-action-icon"
                        onClick={() => onViewLead(lead)}
                        title="View Full Lead Details"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        className="btn-action-icon delete"
                        onClick={() => onDeleteLead(lead.id)}
                        title="Delete Lead from SQL"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="pagination-bar">
          <span>
            Showing Page <strong>{pagination.page}</strong> of <strong>{pagination.totalPages}</strong> ({pagination.total} Total Leads)
          </span>
          <div className="pagination-btns">
            <button
              className="btn-page"
              disabled={pagination.page <= 1}
              onClick={() => onPageChange(pagination.page - 1)}
            >
              Previous
            </button>
            <button
              className="btn-page"
              disabled={pagination.page >= pagination.totalPages}
              onClick={() => onPageChange(pagination.page + 1)}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
