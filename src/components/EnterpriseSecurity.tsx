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
        padding: 'clamp(3.5rem, 7vw, 5rem) 0',
        borderBottom: '1px solid var(--border-default)'
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div
          style={{
            textAlign: 'center',
            maxWidth: '900px',
            margin: '0 auto clamp(2.5rem, 5vw, 3.5rem) auto',
            padding: '0 1rem',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(25px)',
            transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          <span
            style={{
              display: 'inline-block',
              background: 'rgba(43, 45, 110, 0.08)',
              border: '1px solid rgba(43, 45, 110, 0.22)',
              color: '#2B2D6E',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              padding: '0.35rem 1.15rem',
              borderRadius: '9999px',
              marginBottom: '1rem'
            }}
          >
            SECURITY & COMPLIANCE
          </span>
          <h2
            style={{
              fontSize: 'clamp(1.6rem, 3.8vw, 2.4rem)',
              fontWeight: 800,
              color: 'var(--text-heading)',
              whiteSpace: 'nowrap',
              marginBottom: '0.75rem',
              lineHeight: 1.2,
              letterSpacing: '-0.02em'
            }}
          >
            Built for Enterprise Teams That Can't Compromise
          </h2>
          <p
            style={{
              fontSize: 'clamp(0.95rem, 1.7vw, 1.05rem)',
              color: 'var(--text-muted)',
              lineHeight: 1.6,
              maxWidth: '680px',
              margin: '0 auto'
            }}
          >
            Trusted by teams in regulated industries where data security and governance are non-negotiable.
          </p>
        </div>

        {/* 2x2 Grid Layout */}
        <div
          className="security-2x2-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 'clamp(1.25rem, 3vw, 1.75rem)',
            maxWidth: '960px',
            margin: '0 auto clamp(2.5rem, 4vw, 3rem) auto'
          }}
        >
          {cards.map((card, idx) => (
            <div
              key={idx}
              style={{
                background: '#FFFFFF',
                border: '1px solid var(--border-default)',
                borderRadius: '12px',
                padding: 'clamp(1.5rem, 3vw, 1.75rem)',
                boxShadow: '0 2px 10px rgba(15, 23, 42, 0.04)',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(35px)',
                transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${0.15 + idx * 0.1}s`,
                display: 'flex',
                flexDirection: 'column'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.borderColor = 'var(--color-primary)';
                e.currentTarget.style.boxShadow = '0 10px 24px rgba(15, 23, 42, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'var(--border-default)';
                e.currentTarget.style.boxShadow = '0 2px 10px rgba(15, 23, 42, 0.04)';
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  background: card.iconBg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem',
                  flexShrink: 0
                }}
              >
                {card.icon}
              </div>
              <h3
                style={{
                  fontSize: 'clamp(1.05rem, 1.8vw, 1.15rem)',
                  fontWeight: 800,
                  color: 'var(--text-heading)',
                  marginBottom: '0.5rem',
                  lineHeight: 1.3
                }}
              >
                {card.title}
              </h3>
              <p
                style={{
                  fontSize: '0.875rem',
                  color: 'var(--text-muted)',
                  lineHeight: 1.55,
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
            gap: '0.65rem',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.5s'
          }}
        >
          {['SOC 2 Type II', 'HIPAA Ready', 'GDPR Compliant', 'ISO 27001 Aligned', 'Zero Data Retention'].map((badge) => (
            <div
              key={badge}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.4rem 0.95rem',
                background: '#FFFFFF',
                border: '1px solid var(--border-default)',
                borderRadius: '9999px',
                fontSize: '0.78rem',
                fontWeight: 700,
                color: 'var(--text-body)',
                boxShadow: '0 2px 6px rgba(15, 23, 42, 0.03)',
                whiteSpace: 'nowrap'
              }}
            >
              <ShieldCheck size={13} color="#4C9A7A" /> {badge}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .security-2x2-grid {
            grid-template-columns: 1fr !important;
          }
          #security h2 {
            white-space: normal !important;
          }
        }
      `}</style>
    </section>
  );
};
