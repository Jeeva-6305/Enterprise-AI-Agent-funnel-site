import React from 'react';
import AdopleLogo from '../assets/Adople-logo.webp';

interface FooterProps {
  onOpenForm?: () => void;
}

export const Footer: React.FC<FooterProps> = () => {
  return (
    <footer style={{
      background: 'var(--bg-footer, #0B0F19)',
      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      padding: '1.25rem 0',
      color: '#94A3B8'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        {/* Company Name & Copyright */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
          <img
            src={AdopleLogo}
            alt="Adople AI Logo"
            style={{ height: '24px', width: 'auto', objectFit: 'contain' }}
          />
          <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.01em' }}>
            Adople <span style={{ color: '#60A5FA' }}>AI</span>
          </span>
          <span style={{ fontSize: '0.78rem', color: '#64748B' }}>
            © {new Date().getFullYear()} Adople AI Inc. All rights reserved.
          </span>
        </div>

        {/* Privacy Policy */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <a
            href="#"
            style={{
              fontSize: '0.8rem',
              color: '#94A3B8',
              textDecoration: 'none',
              transition: 'color 0.2s ease'
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#FFFFFF'}
            onMouseLeave={e => e.currentTarget.style.color = '#94A3B8'}
          >
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
};
