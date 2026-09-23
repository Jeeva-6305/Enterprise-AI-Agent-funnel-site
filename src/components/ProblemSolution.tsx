import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

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

  const comparisons = [
    {
      today: 'Data scattered across 10+ tools, with no single place to ask',
      adople: 'One question, searched across every connected source'
    },
    {
      today: 'Analyst reports take days to come back',
      adople: 'Answers return in seconds, no queue'
    },
    {
      today: 'Generic AI answers sound confident, but can\'t be checked',
      adople: 'Every answer verified, with the source shown'
    }
  ];

  return (
    <section
      ref={sectionRef}
      id="problem"
      style={{
        background: 'var(--bg-surface)',
        padding: 'clamp(3.5rem, 7vw, 5rem) 0',
        borderTop: '1px solid var(--border-default)',
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
              fontSize: '0.875rem',
              fontWeight: 600,
              color: 'var(--color-accent)',
              textTransform: 'none',
              letterSpacing: '0.02em',
              marginBottom: '0.65rem',
              display: 'inline-block'
            }}
          >
            Sound familiar?
          </span>
          <h2
            style={{
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              fontWeight: 700,
              color: 'var(--text-heading)',
              whiteSpace: 'nowrap',
              lineHeight: 1.25,
              letterSpacing: '-0.02em'
            }}
          >
            The old way, and the Adople way
          </h2>
        </div>

        {/* Before/After Comparison Table Layout matching Screenshot 2 */}
        <div
          style={{
            maxWidth: '850px',
            margin: '0 auto',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(35px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s'
          }}
        >
          {/* Table Column Headers */}
          <div
            className="comparison-header-row"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 40px 1fr',
              alignItems: 'center',
              paddingBottom: '0.85rem',
              borderBottom: '1px solid var(--border-default)',
              fontSize: '0.78rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase'
            }}
          >
            <div style={{ color: 'var(--text-muted)' }}>TODAY</div>
            <div></div>
            <div style={{ color: 'var(--color-primary)' }}>WITH ADOPLE AI</div>
          </div>

          {/* Comparison Rows */}
          <div className="comparison-rows">
            {comparisons.map((item, idx) => (
              <div
                key={idx}
                className="comparison-row"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 40px 1fr',
                  alignItems: 'center',
                  padding: 'clamp(1.25rem, 3vw, 1.65rem) 0',
                  borderBottom: '1px solid rgba(226, 232, 240, 0.7)',
                  transition: 'background 0.3s ease'
                }}
              >
                {/* Left: Today (Old Way) */}
                <div
                  style={{
                    fontSize: 'clamp(0.925rem, 1.6vw, 1rem)',
                    color: 'var(--text-muted)',
                    fontWeight: 400,
                    lineHeight: 1.55,
                    paddingRight: '0.5rem'
                  }}
                >
                  {item.today}
                </div>

                {/* Arrow indicator */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-placeholder)'
                  }}
                >
                  <ArrowRight size={16} opacity={0.6} />
                </div>

                {/* Right: With Adople AI (New Way) */}
                <div
                  style={{
                    fontSize: 'clamp(0.95rem, 1.6vw, 1.025rem)',
                    color: 'var(--text-heading)',
                    fontWeight: 700,
                    lineHeight: 1.5,
                    paddingLeft: '0.5rem'
                  }}
                >
                  {item.adople}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .comparison-header-row {
            grid-template-columns: 1fr 24px 1fr !important;
            font-size: 0.7rem !important;
          }
          .comparison-row {
            grid-template-columns: 1fr 24px 1fr !important;
          }
          #problem h2 {
            white-space: normal !important;
          }
        }
      `}</style>
    </section>
  );
};
