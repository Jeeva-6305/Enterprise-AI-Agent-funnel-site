import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, Users, FileText, Server } from 'lucide-react';

export const EnterpriseSecurity: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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

  const cards = [
    {
      icon: <Users size={22} color="#2B2D6E" />,
      iconBg: 'rgba(43, 45, 110, 0.08)',
      title: 'Everyone Sees Only What They Should',
      body: 'Fine-grained access control ensures team members only view data they are authorized to access.'
    },
    {
      icon: <ShieldCheck size={22} color="#4C9A7A" />,
      iconBg: 'rgba(76, 154, 122, 0.08)',
      title: 'Sign In With What You Already Use',
      body: 'Seamless integration with Okta, Google Workspace, Microsoft, and your existing SSO providers.'
    },
    {
      icon: <FileText size={22} color="#E8664C" />,
      iconBg: 'rgba(232, 102, 76, 0.08)',
      title: 'A Complete Record of Every Action',
      body: 'Automated audit logs track every query, timestamp, and user identity for full regulatory compliance.'
    },
    {
      icon: <Server size={22} color="#2B2D6E" />,
      iconBg: 'rgba(43, 45, 110, 0.08)',
      title: 'Your Data Never Leaves Your Environment',
      body: 'Runs entirely inside your private cloud or infrastructure. Your sensitive data stays under your control.'
    }
  ];

  return (
    <section
      ref={sectionRef}
      id="security"
      style={{
        background: 'var(--bg-surface)',
        padding: 'clamp(2rem, 3.5vw, 2.75rem) 0',
        borderBottom: '1px solid var(--border-default)'
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div
          style={{
            textAlign: 'center',
            maxWidth: '800px',
            margin: '0 auto clamp(1.25rem, 2.5vw, 1.6rem) auto',
            padding: '0 1rem',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          <span
            style={{
              display: 'inline-block',
              background: 'rgba(43, 45, 110, 0.08)',
              border: '1px solid rgba(43, 45, 110, 0.22)',
              color: '#2B2D6E',
              fontSize: '0.7rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              padding: '0.22rem 0.85rem',
              borderRadius: '9999px',
              marginBottom: '0.5rem'
            }}
          >
            SECURITY & COMPLIANCE
          </span>
          <h2
            style={{
              fontSize: 'clamp(1.35rem, 2.6vw, 1.85rem)',
              fontWeight: 800,
              color: 'var(--text-heading)',
              marginBottom: '0.4rem',
              lineHeight: 1.25,
              letterSpacing: '-0.02em'
            }}
          >
            Built for Enterprise Teams That Can't Compromise
          </h2>
          <p
            style={{
              fontSize: 'clamp(0.85rem, 1.3vw, 0.925rem)',
              color: 'var(--text-muted)',
              lineHeight: 1.5,
              maxWidth: '620px',
              margin: '0 auto'
            }}
          >
            Trusted by teams in regulated industries where data security and governance are non-negotiable.
          </p>
        </div>

        {/* 4-column compact Grid Layout */}
        <div
          className="security-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '0.875rem',
            maxWidth: '1120px',
            margin: '0 auto clamp(1.25rem, 2.2vw, 1.6rem) auto'
          }}
        >
          {cards.map((card, idx) => (
            <div
              key={idx}
              style={{
                background: '#FFFFFF',
                border: '1px solid var(--border-default)',
                borderRadius: '10px',
                padding: '1rem 1.05rem',
                boxShadow: '0 2px 8px rgba(15, 23, 42, 0.03)',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(25px)',
                transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + idx * 0.08}s`,
                display: 'flex',
                flexDirection: 'column'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.borderColor = 'var(--color-primary)';
                e.currentTarget.style.boxShadow = '0 8px 18px rgba(15, 23, 42, 0.06)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'var(--border-default)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(15, 23, 42, 0.03)';
              }}
            >
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  background: card.iconBg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '0.65rem',
                  flexShrink: 0
                }}
              >
                {React.cloneElement(card.icon as React.ReactElement, { size: 18 })}
              </div>
              <h3
                style={{
                  fontSize: '0.92rem',
                  fontWeight: 700,
                  color: 'var(--text-heading)',
                  marginBottom: '0.35rem',
                  lineHeight: 1.3
                }}
              >
                {card.title}
              </h3>
              <p
                style={{
                  fontSize: '0.8rem',
                  color: 'var(--text-muted)',
                  lineHeight: 1.45,
                  margin: 0
                }}
              >
                {card.body}
              </p>
            </div>
          ))}
        </div>

        {/* Compliance Badges */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '0.5rem',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(15px)',
            transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.4s'
          }}
        >
          {['SOC 2 Type II', 'HIPAA Ready', 'GDPR Compliant', 'ISO 27001 Aligned', 'Zero Data Retention'].map((badge) => (
            <div
              key={badge}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.3rem 0.75rem',
                background: '#FFFFFF',
                border: '1px solid var(--border-default)',
                borderRadius: '9999px',
                fontSize: '0.74rem',
                fontWeight: 600,
                color: 'var(--text-body)',
                boxShadow: '0 1px 4px rgba(15, 23, 42, 0.03)',
                whiteSpace: 'nowrap'
              }}
            >
              <ShieldCheck size={12} color="#4C9A7A" /> {badge}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) and (min-width: 601px) {
          .security-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 600px) {
          .security-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
