import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Brain, ShieldCheck, BarChart2 } from 'lucide-react';

export const AgenticLoop: React.FC = () => {
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

  const steps = [
    {
      icon: <MessageSquare size={22} color="#2563EB" />,
      iconBg: 'icon-badge-blue',
      num: '01',
      title: 'You Ask',
      tagline: 'In plain English — no training required',
      description: 'Type your question exactly as you\'d ask a colleague. "What were our top 5 revenue markets last quarter?" or "Compare this month\'s sales to last year." No SQL. No dashboards. No complexity.',
      outcome: 'Your whole team can ask questions — not just analysts',
    },
    {
      icon: <Brain size={22} color="#0EA5E9" />,
      iconBg: 'icon-badge-blue',
      num: '02',
      title: 'It Understands',
      tagline: 'Your business context, your data, your metrics',
      description: 'Adople AI understands the meaning behind your question — not just the words. It knows your business definitions, data locations, and the relationships between different numbers across all your systems.',
      outcome: 'Complex questions get accurate, context-aware answers',
    },
    {
      icon: <ShieldCheck size={22} color="#10B981" />,
      iconBg: 'icon-badge-green',
      num: '03',
      title: 'It Self-Checks',
      tagline: 'Every answer verified before you see it',
      description: 'Before returning anything, Adople AI validates its own answer. If it detects a problem or inconsistency, it corrects itself automatically. If it genuinely can\'t be certain, it tells you — clearly.',
      outcome: 'You can trust every number and share it with confidence',
    },
    {
      icon: <BarChart2 size={22} color="#F59E0B" />,
      iconBg: 'icon-badge-amber',
      num: '04',
      title: 'You Act',
      tagline: 'Clear answers, ready-to-share charts',
      description: 'You receive a clean, accurate answer alongside relevant charts or tables. Share it with your team in one click, dig deeper with follow-up questions, or export to your existing tools.',
      outcome: 'From question to decision in seconds, not days',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      style={{
        background: 'var(--bg-root)',
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
            How It Works
          </span>
          <h2
            style={{
              fontSize: 'clamp(1.75rem, 4vw, 2.4rem)',
              fontWeight: 800,
              color: 'var(--text-heading)',
              marginBottom: 'clamp(0.75rem, 2vw, 1rem)',
              lineHeight: 1.2
            }}
          >
            Reliable Answers in Four Simple Steps
          </h2>
          <p style={{
            fontSize: 'clamp(1rem, 1.8vw, 1.05rem)',
            color: 'var(--text-muted)',
            lineHeight: 1.65
          }}>
            Adople AI handles all the complexity behind the scenes. You just ask your question.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
            gap: 'clamp(1.25rem, 3vw, 1.75rem)',
            marginBottom: 'clamp(2rem, 4vw, 2.5rem)'
          }}
        >
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="glass-card"
              style={{
                padding: 'clamp(1.5rem, 3vw, 1.75rem)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '100%',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                position: 'relative',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.92)',
                transitionDelay: `${idx * 0.12}s`
              }}
            >
              <div>
                {/* Step num */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <div className={`icon-badge ${step.iconBg}`} style={{ marginBottom: 0 }}>
                    {step.icon}
                  </div>
                  <span style={{
                    fontSize: '0.7rem', fontWeight: 800,
                    color: 'var(--text-placeholder)',
                    letterSpacing: '0.06em'
                  }}>
                    STEP {step.num}
                  </span>
                </div>
                <h3 style={{
                  fontSize: '1.15rem', fontWeight: 800,
                  color: 'var(--text-heading)', marginBottom: '0.2rem'
                }}>
                  {step.title}
                </h3>
                <div style={{ fontSize: '0.82rem', color: 'var(--color-primary)', fontWeight: 600, marginBottom: '0.65rem' }}>
                  {step.tagline}
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.55, marginBottom: '1.25rem' }}>
                  {step.description}
                </p>
              </div>

              {/* Outcome Box - Visible on all cards for fixed uniform layout */}
              <div style={{
                marginTop: 'auto',
                padding: '0.75rem 0.9rem',
                background: '#F8FAFC',
                border: '1px solid var(--border-default)',
                borderRadius: '8px',
                fontSize: '0.81rem', fontWeight: 700,
                color: 'var(--text-body)',
                display: 'flex', alignItems: 'center', gap: '0.4rem',
                transition: 'all 0.2s ease'
              }}>
                <span style={{ color: '#10B981', fontWeight: 800 }}>✓</span>
                <span>{step.outcome}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom outcome summary */}
        <div
          className="glass-card"
          style={{
            background: 'var(--glass-bg-teal)',
            border: '1px solid var(--color-primary-mid)',
            borderRadius: 'var(--radius-xl)',
            padding: 'clamp(1.5rem, 4vw, 2rem) clamp(1.75rem, 4vw, 2.5rem)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 'clamp(1.25rem, 3vw, 1.5rem)',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
            transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.6s'
          }}
        >
          <div style={{ flex: '1 1 300px' }}>
            <div style={{
              fontSize: 'clamp(1.05rem, 2vw, 1.2rem)',
              fontWeight: 800,
              color: 'var(--text-heading)',
              marginBottom: '0.3rem'
            }}>
              The result: your team makes better decisions, faster
            </div>
            <p style={{
              fontSize: 'clamp(0.9rem, 1.5vw, 0.95rem)',
              color: 'var(--text-muted)'
            }}>
              Without writing code, waiting for reports, or second-guessing your numbers.
            </p>
          </div>
          <div style={{
            display: 'flex',
            gap: 'clamp(1.5rem, 3vw, 2rem)',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            {[
              { val: 'Seconds', label: 'Time to answer' },
              { val: 'Verified', label: 'Every result' },
              { val: 'Any Source', label: 'One interface' },
            ].map((m, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: 'clamp(1.15rem, 2vw, 1.3rem)',
                  fontWeight: 800,
                  color: 'var(--color-primary)'
                }}>{m.val}</div>
                <div style={{
                  fontSize: 'clamp(0.75rem, 1.3vw, 0.78rem)',
                  color: 'var(--text-muted)',
                  fontWeight: 600
                }}>{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
