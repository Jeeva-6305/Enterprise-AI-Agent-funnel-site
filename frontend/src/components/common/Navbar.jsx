import React from 'react';
import BrandLogo from './BrandLogo';

export default function Navbar({ onGetDemoClick }) {
  return (
    <header className="funnel-header">
      <div className="container header-container">
        <div 
          className="header-brand" 
          style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}
        >
          {/* Adople AI Logo */}
          <BrandLogo size={36} />
          <span className="brand-title" style={{ fontSize: '1.45rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--color-text-primary, #1B1330)' }}>
            Adople AI
          </span>
        </div>

        {/* Right side Get a Demo action button */}
        <div className="nav-actions">
          <button 
            type="button"
            id="btn-navbar-get-demo"
            className="navbar-get-demo-btn"
            onClick={onGetDemoClick}
          >
            Get a Demo
          </button>
        </div>
      </div>
    </header>
  );
}

