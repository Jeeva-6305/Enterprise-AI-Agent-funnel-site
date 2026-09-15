import React from 'react';

const COMPANIES = [
  {
    name: 'Lilly',
    fullName: 'Eli Lilly and Company',
    renderLogo: () => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{
          fontFamily: "'Brush Script MT', 'Segoe Script', cursive, sans-serif",
          color: '#e1251b',
          fontSize: '1.65rem',
          fontWeight: 'bold',
          lineHeight: 1,
          letterSpacing: '-1px'
        }}>
          Lilly
        </span>
        <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1e293b' }}>Eli Lilly</span>
      </div>
    )
  },
  {
    name: 'Broadridge',
    fullName: 'Broadridge Financial Solutions',
    renderLogo: () => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="14" stroke="#0052cc" strokeWidth="2.5" fill="none" strokeDasharray="18 6" />
          <circle cx="16" cy="16" r="7" fill="#0052cc" />
        </svg>
        <span style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
          Broadridge<span style={{ color: '#0052cc' }}>.</span>
        </span>
      </div>
    )
  },
  {
    name: 'Confluence',
    fullName: 'Confluence (Atlassian)',
    renderLogo: () => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M4 17 C4 11 9 6 15 6 L15 10 C11 10 8 13 8 17 Z" fill="#0052cc" />
          <path d="M20 7 C20 13 15 18 9 18 L9 14 C13 14 16 11 16 7 Z" fill="#2684ff" />
        </svg>
        <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#172b4d', letterSpacing: '-0.01em' }}>
          Confluence
        </span>
      </div>
    )
  },
  {
    name: 'Syngenta',
    fullName: 'Syngenta Group',
    renderLogo: () => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
          <path d="M16 4 C10 12 6 18 6 24 C6 28 10 30 16 30 C22 30 26 28 26 24 C26 18 22 12 16 4 Z" fill="#008850" />
          <path d="M16 10 C18 16 22 20 22 24 C22 26 19 28 16 28 Z" fill="#84bd00" />
        </svg>
        <span style={{ fontSize: '1rem', fontWeight: 700, color: '#004831', letterSpacing: '-0.02em' }}>
          syngenta
        </span>
      </div>
    )
  },
  {
    name: 'Crocs',
    fullName: 'Crocs, Inc.',
    renderLogo: () => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{
          width: '26px',
          height: '26px',
          borderRadius: '50%',
          backgroundColor: '#000000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          fontWeight: 900,
          fontSize: '0.85rem'
        }}>
          🐊
        </div>
        <span style={{ fontSize: '1.05rem', fontWeight: 900, color: '#000000', letterSpacing: '-0.03em', textTransform: 'lowercase' }}>
          crocs™
        </span>
      </div>
    )
  },
  {
    name: 'NHS',
    fullName: 'National Health Service',
    renderLogo: () => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{
          backgroundColor: '#005EB8',
          padding: '2px 8px',
          borderRadius: '3px',
          color: '#ffffff',
          fontWeight: 900,
          fontSize: '1rem',
          letterSpacing: '0.04em',
          lineHeight: 1.2
        }}>
          NHS
        </div>
        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#005EB8' }}>
          Health Service
        </span>
      </div>
    )
  },
  {
    name: 'Randstad',
    fullName: 'Randstad N.V.',
    renderLogo: () => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <svg width="24" height="22" viewBox="0 0 32 28" fill="none">
          <path d="M4 24 L12 4 L16 12 L12 24 Z" fill="#001a9c" />
          <path d="M16 12 L20 4 L28 24 L20 24 Z" fill="#2962ff" />
        </svg>
        <span style={{ fontSize: '1rem', fontWeight: 700, color: '#001a9c', letterSpacing: '-0.01em' }}>
          randstad
        </span>
      </div>
    )
  },
  {
    name: 'Elevance Health',
    fullName: 'Elevance Health, Inc.',
    renderLogo: () => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
          <rect x="4" y="4" width="10" height="24" rx="2" fill="#0052cc" />
          <rect x="18" y="4" width="10" height="10" rx="2" fill="#0ea5e9" />
          <rect x="18" y="18" width="10" height="10" rx="2" fill="#22c55e" />
        </svg>
        <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0a192f', letterSpacing: '-0.02em' }}>
          Elevance <span style={{ fontWeight: 500, color: '#0052cc' }}>Health</span>
        </span>
      </div>
    )
  },
  {
    name: 'Vodafone',
    fullName: 'Vodafone Group',
    renderLogo: () => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          backgroundColor: '#e60000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          fontSize: '0.9rem',
          fontWeight: 900
        }}>
          ’
        </div>
        <span style={{ fontSize: '1rem', fontWeight: 800, color: '#e60000', letterSpacing: '-0.02em' }}>
          vodafone
        </span>
      </div>
    )
  },
  {
    name: 'AT&T',
    fullName: 'AT&T Inc.',
    renderLogo: () => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="14" fill="#0057B8" />
          <path d="M6 16 H26" stroke="#ffffff" strokeWidth="2" />
          <path d="M8 10 H24" stroke="#ffffff" strokeWidth="1.5" />
          <path d="M8 22 H24" stroke="#ffffff" strokeWidth="1.5" />
        </svg>
        <span style={{ fontSize: '1.05rem', fontWeight: 900, color: '#0057B8', letterSpacing: '0.02em' }}>
          AT&amp;T
        </span>
      </div>
    )
  },
  {
    name: 'SyraHealth',
    fullName: 'Syra Health Corp',
    renderLogo: () => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="14" fill="#0284c7" opacity="0.15" />
          <path d="M16 8 V24 M8 16 H24" stroke="#0284c7" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="16" cy="16" r="4" fill="#0ea5e9" />
        </svg>
        <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0369a1', letterSpacing: '-0.01em' }}>
          Syra<span style={{ color: '#0284c7', fontWeight: 600 }}>Health</span>
        </span>
      </div>
    )
  }
];

export default function TrustBar() {
  return (
    <section className="trust-bar-carousel-section">
      <div className="trust-carousel-viewport">
        {/* Track with dual sets of logos to create seamless infinite continuous loop */}
        <div className="trust-carousel-track">
          {/* Set 1 */}
          {COMPANIES.map((company, index) => (
            <div key={`logo-1-${index}`} className="carousel-logo-card" title={company.fullName}>
              {company.renderLogo()}
            </div>
          ))}

          {/* Set 2 (Duplicate for seamless continuous loop from right to left) */}
          {COMPANIES.map((company, index) => (
            <div key={`logo-2-${index}`} className="carousel-logo-card" title={company.fullName}>
              {company.renderLogo()}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
