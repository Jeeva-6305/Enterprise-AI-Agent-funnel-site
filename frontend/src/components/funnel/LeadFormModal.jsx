import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import LeadForm from './LeadForm';

export default function LeadFormModal({ isOpen, onClose, onSuccessLead, showToast }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content lead-form-modal-card" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-form-heading"
      >
        <button 
          className="modal-close-btn"
          onClick={onClose} 
          title="Close dialog"
          aria-label="Close form modal"
        >
          <X size={20} />
        </button>

        <div className="lead-form-modal-inner">
          <LeadForm 
            onSuccessLead={(lead) => {
              if (onSuccessLead) onSuccessLead(lead);
            }} 
            showToast={showToast} 
          />
        </div>
      </div>
    </div>
  );
}
