import React from 'react';

export const CustomerLogos: React.FC = () => {
  const logos = [
    { name: 'Vodafone', logoUrl: '/clients/vodafone.webp' },
    { name: 'AT&T', logoUrl: '/clients/AT&T.webp' },
    { name: 'Lilly', logoUrl: '/clients/Lilly.webp' },
    { name: 'Broadridge', logoUrl: '/clients/broadridge.webp' },
    { name: 'Confluence', logoUrl: '/clients/confluence.webp' },
    { name: 'Syngenta', logoUrl: '/clients/syngenta.webp' },
    { name: 'Crocs', logoUrl: '/clients/crocs.webp' },
    { name: 'NHS', logoUrl: '/clients/nhs.jpg' },
    { name: 'Elevance Health', logoUrl: '/clients/elevance-health.webp' },
    { name: 'Randstad', logoUrl: '/clients/randstad.webp' },
  ];

  // Double the array for seamless infinite marquee loop
  const duplicatedLogos = [...logos, ...logos];

  return (
    <div
      style={{
        background: '#FAFAFC',
        borderBottom: '1px solid var(--border-default)',
        borderTop: '1px solid var(--border-default)',
        overflow: 'hidden',
        position: 'relative',
        width: '100%',
        height: '48px',
        zIndex: 10
      }}
    >
      {/* Left edge fade */}
      <div style={{
        position: 'absolute', top: 0, left: 0,
        width: '60px', height: '100%',
        background: 'linear-gradient(to right, #FAFAFC, transparent)',
        zIndex: 2, pointerEvents: 'none'
      }} />
      {/* Right edge fade */}
      <div style={{
        position: 'absolute', top: 0, right: 0,
        width: '60px', height: '100%',
        background: 'linear-gradient(to left, #FAFAFC, transparent)',
        zIndex: 2, pointerEvents: 'none'
      }} />

      <div className="logo-marquee-track">
        {duplicatedLogos.map((logo, idx) => (
          <div key={idx} className="logo-marquee-item">
            <img src={logo.logoUrl} alt={logo.name} loading="lazy" />
          </div>
        ))}
      </div>

      <style>{`
        .logo-marquee-track {
          display: flex;
          align-items: center;
          width: max-content;
          height: 48px;
          animation: logo-marquee-scroll 28s linear infinite;
        }
        .logo-marquee-track:hover {
          animation-play-state: paused;
        }
        .logo-marquee-item {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 1.5rem;
          height: 48px;
          min-width: 110px;
          border-right: 1px solid rgba(226, 232, 240, 0.7);
          flex-shrink: 0;
        }
        .logo-marquee-item img {
          max-height: 22px;
          max-width: 100px;
          object-fit: contain;
          opacity: 0.85;
          transition: opacity 0.2s ease, transform 0.2s ease;
        }
        .logo-marquee-item:hover img {
          opacity: 1;
          transform: scale(1.06);
        }
        @keyframes logo-marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

