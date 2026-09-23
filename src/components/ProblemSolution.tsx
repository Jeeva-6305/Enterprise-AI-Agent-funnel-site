import React, { useState, useEffect, useRef } from 'react';
import { TrendingDown, Clock, AlertCircle, CheckCircle2 } from 'lucide-react';

export const ProblemSolution: React.FC = () => {
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
  const items = [
    {
      icon: <TrendingDown size={22} color="#EF4444" />,
      iconBg: 'icon-badge-red',
      problem: 'Your data is in 10 different places',
      problemDetail: 'Your business data is scattered across databases, spreadsheets, CRMs, and cloud platforms — with no single place to ask questions and get a unified answer.',
      solutionLabel: 'How Adople AI helps:',
      solution: 'One interface connects to every source you use. Ask a single question and get an answer that draws from all your data — instantly.',
    },
    {
      icon: <Clock size={22} color="#F59E0B" />,
      iconBg: 'icon-badge-amber',
      problem: 'You wait days for analyst reports',
      problemDetail: 'Every data request means a support ticket, a queue, and a two-day wait. By the time the report arrives, the moment to act has passed.',
      solutionLabel: 'How Adople AI helps:',
      solution: 'Your team gets answers in seconds — not days. Ask follow-up questions immediately, without filing a single request.',
    },
    {
      icon: <AlertCircle size={22} color="#2563EB" />,
      iconBg: 'icon-badge-blue',
      problem: 'You can\'t fully trust AI-generated numbers',
      problemDetail: 'Generic AI tools produce answers that sound confident but are wrong. One bad number passed to a board meeting can cost credibility.',
      solutionLabel: 'How Adople AI helps:',
      solution: 'Every answer is automatically verified before you see it. If Adople AI is uncertain, it tells you — instead of guessing.',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="problem"
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
            Sound Familiar?
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
            The Problems Every Data-Driven Team Faces
          </h2>
          <p style={{
            fontSize: 'clamp(1rem, 1.8vw, 1.05rem)',
            color: 'var(--text-muted)',
            lineHeight: 1.65
          }}>
            Adople AI was built specifically to solve the bottlenecks that slow down decisions at enterprise scale.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: 'clamp(1.25rem, 3vw, 1.75rem)'
          }}
        >
          {items.map((item, idx) => (
            <div
              key={idx}
              className="glass-card"
              style={{
                padding: 'clamp(1.5rem, 3vw, 2rem)',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
                transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 0.15}s`
              }}
            >
              {/* Problem Icon */}
              <div className={`icon-badge ${item.iconBg}`}>
                {item.icon}
              </div>

              {/* Problem */}
              <h3 style={{
                fontSize: '1.2rem', fontWeight: 700,
                color: 'var(--text-heading)', marginBottom: '0.6rem'
              }}>
                {item.problem}
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                {item.problemDetail}
              </p>

              {/* Solution */}
              <div style={{
                borderTop: '1px solid var(--border-default)',
                paddingTop: '1.25rem'
              }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '0.4rem',
                  fontSize: '0.78rem', fontWeight: 700,
                  color: 'var(--color-primary)',
                  textTransform: 'uppercase', letterSpacing: '0.04em',
                  marginBottom: '0.5rem'
                }}>
                  <CheckCircle2 size={14} /> {item.solutionLabel}
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-body)', lineHeight: 1.6 }}>
                  {item.solution}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
