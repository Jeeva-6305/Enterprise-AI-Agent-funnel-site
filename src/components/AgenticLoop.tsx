import React, { useState, useEffect, useRef } from 'react';

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
      num: '01',
      title: 'You Ask',
      description: 'Ask any question in plain English — no SQL, code, or analyst queue required.'
    },
    {
      num: '02',
      title: 'It Understands',
      description: 'Understands your business context, metrics, and data across all connected sources.'
    },
    {
      num: '03',
      title: 'It Self-Checks',
      description: 'Validates and double-checks every answer automatically before displaying it.'
    },
    {
      num: '04',
      title: 'You Act',
      description: 'Receive clean answers, ready-to-share charts, and actionable insights in seconds.'
    }
  ];

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      style={{
        background: 'var(--bg-root)',
        padding: 'clamp(3.5rem, 7vw, 5rem) 0',
        borderBottom: '1px solid var(--border-default)'
      }}
    >
      <div className="container">
        {/* Header section matching screenshot */}
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
              background: 'rgba(232, 102, 76, 0.08)',
              border: '1px solid rgba(232, 102, 76, 0.25)',
              color: '#E8664C',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              padding: '0.35rem 1.15rem',
              borderRadius: '9999px',
              marginBottom: '1rem'
            }}
          >
            HOW DOES IT WORK
          </span>
          <h2
            style={{
              fontSize: 'clamp(1.6rem, 3.8vw, 2.5rem)',
              fontWeight: 800,
              color: 'var(--text-heading)',
              whiteSpace: 'nowrap',
              marginBottom: '0.75rem',
              lineHeight: 1.2,
              letterSpacing: '-0.02em'
            }}
          >
            Turn Any Question into Verified Answers in 4 Steps
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
            Adople AI's agentic pipeline handles all the complexity behind the scenes so your team gets reliable, audit-ready data in seconds.
          </p>
        </div>

        {/* Stepper Timeline Container matching screenshot */}
        <div
          style={{
            maxWidth: '1100px',
            margin: '0 auto',
            position: 'relative',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(35px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s'
          }}
        >
          {/* Connecting Horizontal Line */}
          <div
            className="stepper-line"
            style={{
              position: 'absolute',
              top: '21px',
              left: '12%',
              right: '12%',
              height: '2px',
              background: 'linear-gradient(to right, #E8664C 0%, #2B2D6E 50%, #4C9A7A 100%)',
              zIndex: 1
            }}
          />

          {/* Stepper Grid (4 Columns) */}
          <div
            className="stepper-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 'clamp(1rem, 2.5vw, 1.75rem)',
              position: 'relative',
              zIndex: 2
            }}
          >
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="step-item"
                style={{
                  textAlign: 'center',
                  padding: '0 0.5rem'
                }}
              >
                {/* Numbered Circle */}
                <div
                  className="step-circle"
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    background: '#FFFFFF',
                    border: '2px solid var(--color-primary)',
                    color: 'var(--color-primary)',
                    fontSize: '0.875rem',
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.25rem auto',
                    boxShadow: '0 2px 8px rgba(15, 23, 42, 0.08)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {step.num}
                </div>

                {/* Step Title */}
                <h3
                  style={{
                    fontSize: 'clamp(1rem, 1.6vw, 1.1rem)',
                    fontWeight: 800,
                    color: 'var(--text-heading)',
                    marginBottom: '0.5rem',
                    lineHeight: 1.3
                  }}
                >
                  {step.title}
                </h3>

                {/* Step Description */}
                <p
                  style={{
                    fontSize: '0.875rem',
                    color: 'var(--text-muted)',
                    lineHeight: 1.55,
                    margin: 0
                  }}
                >
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .step-circle:hover {
          transform: scale(1.12);
          border-color: var(--color-accent) !important;
          color: var(--color-accent) !important;
          box-shadow: 0 4px 14px rgba(245, 158, 11, 0.3) !important;
        }

        @media (max-width: 768px) {
          .stepper-line {
            display: none !important;
          }
          .stepper-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 2rem 1rem !important;
          }
          #how-it-works h2 {
            white-space: normal !important;
          }
        }

        @media (max-width: 480px) {
          .stepper-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </section>
  );
};
