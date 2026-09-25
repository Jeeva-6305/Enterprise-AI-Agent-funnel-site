import React from 'react';
import { X } from 'lucide-react';
import { LeadForm } from './LeadForm';

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (token: string, email?: string) => void;
  onAlreadyWatched?: () => void;
}

export const LeadModal: React.FC<LeadModalProps> = ({ isOpen, onClose, onSuccess, onAlreadyWatched }) => {
  // Prevent body scroll when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(1rem, 3vw, 2rem)',
        overflowY: 'auto'
      }}
      // Removed onClick - clicking outside won't close the modal
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 'clamp(320px, 95vw, 680px)',
          margin: 'auto',
          animation: 'modalFadeIn 0.3s ease-out'
        }}
      >
        {/* Close button - ONLY way to close the modal */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          style={{
            position: 'absolute',
            top: 'clamp(-12px, -2vw, -14px)',
            right: 'clamp(-12px, -2vw, -14px)',
            width: 'clamp(32px, 6vw, 40px)',
            height: 'clamp(32px, 6vw, 40px)',
            borderRadius: '50%',
            background: '#FFFFFF',
            border: '2px solid var(--border-default)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10,
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)',
            color: 'var(--text-muted)',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = '#F1F5F9';
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.borderColor = 'var(--color-primary)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = '#FFFFFF';
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.borderColor = 'var(--border-default)';
          }}
        >
          <X size={18} />
        </button>
        <LeadForm onSuccess={onSuccess} onAlreadyWatched={onAlreadyWatched} />
      </div>

      <style>{`
        @keyframes modalFadeIn {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(30px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @media (max-width: 768px) {
          /* Mobile optimization */
          .form-input,
          .form-select {
            font-size: 16px !important; /* Prevents iOS zoom on focus */
          }
        }

        @media (max-width: 480px) {
          /* Small mobile optimization */
          .lead-form-grid {
            gap: 0.85rem !important;
          }
        }
      `}</style>
    </div>
  );
};
