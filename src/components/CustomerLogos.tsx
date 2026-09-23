import React, { useState, useEffect, useRef } from 'react';

export const CustomerLogos: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const logos = [
    { name: 'AT&T', logoUrl: '/clients/AT&T.webp' },
    { name: 'Lilly', logoUrl: '/clients/Lilly.webp' },
    { name: 'Broadridge', logoUrl: '/clients/broadridge.webp' },
    { name: 'Crocs', logoUrl: '/clients/crocs.webp' },
    { name: 'Elevance Health', logoUrl: '/clients/elevance-health.webp' },
    { name: 'Vodafone', logoUrl: '/clients/vodafone.webp' },
    { name: 'Randstad', logoUrl: '/clients/randstad.webp' },
    { name: 'Syngenta', logoUrl: '/clients/syngenta.webp' },
    { name: 'NHS', logoUrl: '/clients/nhs.jpg' },
    { name: 'Confluence', logoUrl: '/clients/confluence.webp' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        background: 'var(--bg-surface)',
        padding: 'clamp(2.5rem, 5vw, 3.5rem) 0',
        borderTop: '1px solid var(--border-default)',
        borderBottom: '1px solid var(--border-default)',
        overflow: 'hidden'
      }}
    >
      <div className="container">
        <div
          style={{
            textAlign: 'center',
            marginBottom: 'clamp(2rem, 4vw, 2.5rem)',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          <p
            style={{
              fontSize: 'clamp(0.85rem, 1.5vw, 0.9rem)',
              fontWeight: 600,
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}
          >
            Trusted by enterprise data teams across 3 continents
          </p>
        </div>

        {/* Static Grid Layout */}
        <div
          className="logos-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: 'clamp(1rem, 2vw, 1.5rem)',
            alignItems: 'center',
            maxWidth: '1100px',
            margin: '0 auto'
          }}
        >
          {logos.map((logo, idx) => (
            <div
              key={idx}
              className="glass-card"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: 'clamp(70px, 10vw, 90px)',
                padding: 'clamp(0.75rem, 2vw, 1.25rem)',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.9)',
                transitionDelay: `${idx * 0.06}s`,
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-primary)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(15, 118, 110, 0.2)';
                e.currentTarget.style.transform = 'translateY(-6px) scale(1.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--glass-border)';
                e.currentTarget.style.boxShadow = 'var(--shadow-glass)';
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
              }}
            >
              <img
                src={logo.logoUrl}
                alt={logo.name}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain',
                  filter: 'grayscale(100%) opacity(0.65)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLImageElement).style.filter = 'grayscale(0%) opacity(1)';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLImageElement).style.filter = 'grayscale(100%) opacity(0.65)';
                }}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .logos-grid {
            grid-template-columns: repeat(4, 1fr) !important;
          }
        }

        @media (max-width: 768px) {
          .logos-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }

        @media (max-width: 540px) {
          .logos-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
};
