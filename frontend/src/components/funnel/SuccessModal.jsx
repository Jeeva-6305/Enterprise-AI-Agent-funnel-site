import React from 'react';
import { CheckCircle2, Play, X, Database } from 'lucide-react';

export default function SuccessModal({ lead, onClose, onOpenVideo }) {
  if (!lead) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '520px', textAlign: 'center', padding: '2.25rem 2rem' }}>
        <button 
          onClick={onClose} 
          style={{ position: 'absolute', top: '1rem', right: '1rem', color: '#94a3b8' }}
        >
          <X size={20} />
        </button>

        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          backgroundColor: '#eff6ff',
          color: '#0052cc',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.25rem'
        }}>
          <CheckCircle2 size={36} />
        </div>

        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#000000', marginBottom: '0.5rem' }}>
          Demo Access Unlocked!
        </h3>

        <p style={{ color: '#475569', fontSize: '0.9375rem', marginBottom: '1.5rem', lineHeight: '1.5' }}>
          Thank you, <strong>{lead.full_name || lead.fullName}</strong>. Your organization (<strong>{lead.company_name || lead.companyName}</strong>) has been registered. You can now watch the full Enterprise AI Agents platform demonstration.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <button 
            className="btn-primary" 
            onClick={() => {
              onClose();
              if (onOpenVideo) onOpenVideo();
            }}
          >
            <Play size={18} fill="#ffffff" />
            <span>Watch Platform Demo Now</span>
          </button>
        </div>
      </div>
    </div>
  );
}
