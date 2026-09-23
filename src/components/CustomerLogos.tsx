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
        padding: '0.5rem 0',
        zIndex: 10
      }}
    >
      {/* Left & Right subtle edge fade gradients */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '60px',
          height: '100%',
          background: 'linear-gradient(to right, #FAFAFC, transparent)',
          zIndex: 2,
          pointerEvents: 'none'
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '60px',
          height: '100%',
          background: 'linear-gradient(to left, #FAFAFC, transparent)',
          zIndex: 2,
          pointerEvents: 'none'
        }}
      />

      <div className="logo-marquee-track">
        {duplicatedLogos.map((logo, idx) => (
          <div key={idx} className="logo-marquee-item">
            <img
              src={logo.logoUrl}
              alt={logo.name}
              loading="lazy"
            />
          </div>
        ))}
      </div>

      <style>{`
        .logo-marquee-track {
          display: flex;
          align-items: center;
          width: max-content;
          animation: logo-marquee-scroll 30s linear infinite;
        }

        .logo-marquee-track:hover {
          animation-play-state: paused;
        }

        .logo-marquee-item {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.5rem 2.25rem;
          height: 46px;
          min-width: 140px;
          border-right: 1px solid rgba(226, 232, 240, 0.85);
          flex-shrink: 0;
        }

        .logo-marquee-item img {
          max-height: 30px;
          max-width: 120px;
          object-fit: contain;
          filter: none;
          opacity: 1;
          transition: transform 0.3s ease;
        }

        .logo-marquee-item:hover img {
          transform: scale(1.08);
        }

        @keyframes logo-marquee-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
};
