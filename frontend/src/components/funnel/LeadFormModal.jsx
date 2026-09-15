import React from 'react';
import { X } from 'lucide-react';
import LeadForm from './LeadForm';

export default function LeadFormModal({ isOpen, onClose, onSuccessLead, showToast }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content lead-form-modal-content" 
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          className="modal-close-btn"
          onClick={onClose} 
          title="Close"
          aria-label="Close form"
        >
          <X size={20} />
        </button>

        <LeadForm 
          onSuccessLead={(lead) => {
            if (onSuccessLead) onSuccessLead(lead);
          }} 
          showToast={showToast} 
        />
      </div>
    </div>
  );
}
