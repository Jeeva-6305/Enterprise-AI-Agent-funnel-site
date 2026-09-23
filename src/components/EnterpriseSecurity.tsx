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
      icon: <Users size={22} color="#2563EB" />,
      iconBg: 'icon-badge-blue',
      title: 'Everyone Sees Only What They Should',
      body: 'Fine-grained access control ensures each team member — from junior analyst to C-suite — only sees the data they are authorised to view. No accidental exposure. No manual permission sheets.',
    },
    {
      icon: <ShieldCheck size={22} color="#10B981" />,
      iconBg: 'icon-badge-green',
      title: 'Sign In With What You Already Use',
      body: 'Works seamlessly with your company\'s existing login system — Microsoft, Google Workspace, Okta, and more. No new passwords, no separate user management.',
    },
    {
      icon: <FileText size={22} color="#F59E0B" />,
      iconBg: 'icon-badge-amber',
      title: 'A Complete Record of Every Action',
      body: 'Every question asked and every answer delivered is automatically logged with a timestamp, user identity, and full audit trail — ready for compliance reviews and regulatory requirements.',
    },
    {
      icon: <Server size={22} color="#0EA5E9" />,
      iconBg: 'icon-badge-blue',
      title: 'Your Data Never Leaves Your Environment',
      body: 'Adople Agentic Data Analyst runs entirely within your own infrastructure — your cloud account, your network, your rules. Your sensitive business data stays exactly where it is today.',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="security"
      style={{
        background: 'var(--bg-surface)',
        padding: 'clamp(3rem, 6vw, 4.5rem) 0'
      }}
    >
      <div className="container">
        <div
          style={{
            textAlign: 'center',
            maxWidth: '750px',
            margin: '0 auto clamp(2.5rem, 5vw, 3.5rem) auto',
            padding: '0 1rem',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          <span className="badge-tag" style={{ marginBottom: '1rem', display: 'inline-flex' }}>
            Security & Compliance
          </span>
          <h2 style={{
            fontSize: 'clamp(1.75rem, 4vw, 2.4rem)',
            fontWeight: 800,
            color: 'var(--text-heading)',
            marginBottom: 'clamp(0.75rem, 2vw, 1rem)',
            lineHeight: 1.2
          }}>
            Built for Enterprise Teams That Can't Compromise
          </h2>
          <p style={{
            fontSize: 'clamp(1rem, 1.8vw, 1.05rem)',
            color: 'var(--text-muted)',
            lineHeight: 1.65
          }}>
            Trusted by teams in Financial Services, Healthcare, and regulated industries where data security is non-negotiable. Every aspect of Adople is designed with enterprise governance in mind.
          </p>
        </div>

        <div
          className="grid-2x2"
          style={{
            marginBottom: 'clamp(2rem, 4vw, 2.5rem)',
            gap: 'clamp(1.25rem, 3vw, 1.75rem)'
          }}
        >
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="glass-card"
              style={{
                padding: 'clamp(1.5rem, 3vw, 1.75rem)',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${0.2 + idx * 0.12}s`
              }}
            >
              <div className={`icon-badge ${card.iconBg}`}>
                {card.icon}
              </div>
              <h3 style={{
                fontSize: 'clamp(1.05rem, 2vw, 1.1rem)',
                fontWeight: 700,
                color: 'var(--text-heading)',
                marginBottom: '0.6rem'
              }}>
                {card.title}
              </h3>
              <p style={{
                fontSize: 'clamp(0.85rem, 1.5vw, 0.88rem)',
                color: 'var(--text-muted)',
                lineHeight: 1.6
              }}>
                {card.body}
              </p>
            </div>
          ))}
        </div>

        {/* Compliance badge strip */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: 'clamp(0.5rem, 1.5vw, 0.75rem)',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.6s'
          }}
        >
          {['SOC 2 Type II', 'HIPAA Ready', 'GDPR Compliant', 'ISO 27001 Aligned', 'Zero Data Retention'].map((badge, idx) => (
            <div
              key={badge}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'clamp(0.3rem, 1vw, 0.4rem)',
                padding: 'clamp(0.35rem, 1vw, 0.4rem) clamp(0.7rem, 1.5vw, 0.9rem)',
                background: 'var(--glass-bg-strong)',
                backdropFilter: 'blur(8px)',
                border: '1px solid var(--glass-border)',
                borderRadius: 'var(--radius-full)',
                fontSize: 'clamp(0.75rem, 1.3vw, 0.8rem)',
                fontWeight: 700,
                color: 'var(--text-body)',
                boxShadow: 'var(--shadow-glass)',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'scale(1)' : 'scale(0.9)',
                transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${0.7 + idx * 0.08}s`,
                whiteSpace: 'nowrap'
              }}
            >
              <ShieldCheck size={13} color="#10B981" /> {badge}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
