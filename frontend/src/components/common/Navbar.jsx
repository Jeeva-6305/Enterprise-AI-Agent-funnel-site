import React from 'react';
import BrandLogo from './BrandLogo';

export default function Navbar() {
  return (
    <header className="funnel-header">
      <div className="container header-container">
        <div 
          className="header-brand" 
          style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}
        >
          {/* Adople AI Logo */}
          <BrandLogo size={36} />
          <span className="brand-title" style={{ fontSize: '1.45rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#000000' }}>
            Adople AI
          </span>
        </div>
      </div>
    </header>
  );
}
