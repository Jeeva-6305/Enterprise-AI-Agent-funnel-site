import React, { useState } from 'react';
import { X, Save, Building, Mail, Phone, Calendar, User, Tag, FileText, CheckCircle2 } from 'lucide-react';

export default function LeadDetailModal({ lead, onClose, onSave }) {
  if (!lead) return null;

  const [status, setStatus] = useState(lead.status || 'New');
  const [notes, setNotes] = useState(lead.notes || '');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave(lead.id, { status, notes });
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '650px' }}>
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              backgroundColor: '#fff7ed',
              color: '#ea580c',
              fontWeight: 800,
              fontSize: '0.875rem',
              padding: '2px 8px',
              borderRadius: '4px'
            }}>
              Lead #{lead.id}
            </span>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a' }}>
              {lead.full_name}
            </h3>
          </div>
          <button onClick={onClose} style={{ color: '#94a3b8' }}>
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          <div className="lead-detail-grid">
            <div>
              <div className="detail-item-label">Full Name</div>
              <div className="detail-item-value">{lead.full_name}</div>
            </div>

            <div>
              <div className="detail-item-label">Work Email</div>
              <div className="detail-item-value">
                <a href={`mailto:${lead.work_email}`} style={{ color: '#ea580c', textDecoration: 'underline' }}>
                  {lead.work_email}
                </a>
              </div>
            </div>

            <div>
              <div className="detail-item-label">Job Title</div>
              <div className="detail-item-value">{lead.job_title}</div>
            </div>

            <div>
              <div className="detail-item-label">Company Name</div>
              <div className="detail-item-value">{lead.company_name}</div>
            </div>

            <div>
              <div className="detail-item-label">Company Size</div>
              <div className="detail-item-value">{lead.company_size}</div>
            </div>

            <div>
              <div className="detail-item-label">Phone Number</div>
              <div className="detail-item-value">
                {lead.phone_country_code} {lead.phone_number}
              </div>
            </div>

            <div>
              <div className="detail-item-label">Source Campaign</div>
              <div className="detail-item-value">{lead.source_campaign || 'TSCTI Funnel'}</div>
            </div>

            <div>
              <div className="detail-item-label">Submission Timestamp</div>
              <div className="detail-item-value">{new Date(lead.created_at).toLocaleString()}</div>
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: '1.25rem 0' }} />

          {/* Status Select */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#334155', marginBottom: '0.5rem' }}>
              Lead Stage / Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              style={{ width: '100%', padding: '0.625rem 0.875rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
            >
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Demo Scheduled">Demo Scheduled</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          {/* Internal Notes */}
          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#334155', marginBottom: '0.5rem' }}>
              Admin / Sales Notes
            </label>
            <textarea
              rows={4}
              placeholder="Add qualification notes, meeting dates, or Oracle ERP deployment requirements..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', resize: 'vertical' }}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-primary" onClick={handleSave} disabled={isSaving} style={{ width: 'auto' }}>
            <Save size={16} />
            <span>{isSaving ? 'Saving Changes...' : 'Save Changes'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
