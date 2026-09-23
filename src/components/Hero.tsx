import React, { useState, useEffect, useRef } from 'react';
import { Play, ArrowRight, Zap, CheckCircle, Users, ShieldCheck } from 'lucide-react';
import { GatedVideoPlayer } from './GatedVideoPlayer';

interface HeroProps {
  onOpenForm: () => void;
  isUnlocked: boolean;
}

export const Hero: React.FC<HeroProps> = ({ onOpenForm, isUnlocked }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.15, rootMargin: '0px' }
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
        position: 'relative',
        padding: 'clamp(3rem, 8vw, 5rem) 0',
        background: 'var(--hero-gradient)',
        overflow: 'hidden',
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      {/* Animated decorative blobs */}
      <div style={{
        position: 'absolute', top: '-120px', right: '-80px',
        width: '520px', height: '520px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(43,45,110,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'scale(1)' : 'scale(0.8)',
        transition: 'all 1.2s ease'
      }} />
      <div style={{
        position: 'absolute', bottom: '-80px', left: '-60px',
        width: '360px', height: '360px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(232,102,76,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'scale(1)' : 'scale(0.8)',
        transition: 'all 1.2s ease 0.2s'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Top badge */}
        <div style={{
          textAlign: 'center',
          marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(-20px)',
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
          <span className="badge-tag">
            Trusted by enterprise data teams across 3 continents
          </span>
        </div>

        {/* Headline with animation */}
        <div style={{ textAlign: 'center', maxWidth: '980px', margin: '0 auto', padding: '0 1rem' }}>
          <h1
            style={{
              fontSize: 'clamp(1.75rem, 3.8vw, 2.75rem)',
              fontWeight: 700,
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
              color: 'var(--text-heading)',
              marginBottom: 'clamp(1rem, 2vw, 1.25rem)',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s'
            }}
          >
            Turn Any Business Question Into an
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #2B2D6E 0%, #E8664C 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundSize: '200% 200%',
                animation: isVisible ? 'gradient-shift 3s ease infinite' : 'none',
                display: 'inline-block',
                fontWeight: 700
              }}
            >
              Instant, Accurate Answer
            </span>
          </h1>

          <p
            style={{
              fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)',
              color: 'var(--text-muted)',
              maxWidth: '680px',
              margin: '0 auto clamp(2rem, 4vw, 2.5rem) auto',
              lineHeight: 1.65,
              padding: '0 1rem',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s'
            }}
          >
            Adople AI lets your team ask questions about your business data in plain English — and get reliable, verified answers in seconds, without waiting for analysts or writing a single line of code.
          </p>

          {/* Proof pill badges: 3 in top row, 4th centered directly below */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.75rem',
              maxWidth: '1050px',
              margin: '0 auto clamp(2.25rem, 4.5vw, 3rem) auto',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s'
            }}
          >
            {/* Top row: first 3 items in a single line */}
            <div
              className="hero-pills-top-row"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                flexWrap: 'wrap'
              }}
            >
              {[
                {
                  icon: <Zap size={17} color="#E8664C" />,
                  value: '10,000+',
                  label: 'Business Questions Answered'
                },
                {
                  icon: <CheckCircle size={17} color="#4C9A7A" />,
                  value: '99.2%',
                  label: 'Answer Accuracy Rate'
                },
                {
                  icon: <Users size={17} color="#2B2D6E" />,
                  value: '50+',
                  label: 'Enterprise Customers'
                }
              ].map((pill, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: '#FFFFFF',
                    border: '1.5px solid rgba(232, 102, 76, 0.35)',
                    borderRadius: '9999px',
                    padding: '0.6rem 1.25rem',
                    boxShadow: '0 2px 10px rgba(28, 27, 46, 0.04)',
                    fontSize: 'clamp(0.825rem, 1.3vw, 0.925rem)',
                    fontWeight: 600,
                    color: 'var(--text-heading)',
                    transition: 'all 0.3s ease',
                    whiteSpace: 'nowrap'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.borderColor = 'var(--color-primary)';
                    e.currentTarget.style.boxShadow = '0 6px 18px rgba(43, 45, 110, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = 'rgba(232, 102, 76, 0.35)';
                    e.currentTarget.style.boxShadow = '0 2px 10px rgba(28, 27, 46, 0.04)';
                  }}
                >
                  <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                    {pill.icon}
                  </span>
                  <span>
                    <strong style={{ color: 'var(--color-primary)', fontWeight: 800 }}>
                      {pill.value}
                    </strong>{' '}
                    {pill.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Bottom row: 4th item centered directly below */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: '#FFFFFF',
                  border: '1.5px solid rgba(232, 102, 76, 0.35)',
                  borderRadius: '9999px',
                  padding: '0.6rem 1.25rem',
                  boxShadow: '0 2px 10px rgba(28, 27, 46, 0.04)',
                  fontSize: 'clamp(0.825rem, 1.3vw, 0.925rem)',
                  fontWeight: 600,
                  color: 'var(--text-heading)',
                  transition: 'all 0.3s ease',
                  whiteSpace: 'nowrap'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.borderColor = 'var(--color-primary)';
                  e.currentTarget.style.boxShadow = '0 6px 18px rgba(43, 45, 110, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(232, 102, 76, 0.35)';
                  e.currentTarget.style.boxShadow = '0 2px 10px rgba(28, 27, 46, 0.04)';
                }}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                  <ShieldCheck size={17} color="#4C9A7A" />
                </span>
                <span>
                  <strong style={{ color: 'var(--color-primary)', fontWeight: 800 }}>
                    &lt; 5 min
                  </strong>{' '}
                  Average Setup Time
                </span>
              </div>
            </div>
          </div>

          {/* CTAs with staggered animation */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'clamp(0.75rem, 2vw, 1rem)',
              flexWrap: 'wrap',
              marginBottom: 'clamp(1.5rem, 3vw, 2rem)',
              padding: '0 1rem',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s'
            }}
          >
            <button
              onClick={() => {
                if (isUnlocked) {
                  document.getElementById('demo-video-section')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                } else {
                  onOpenForm();
                }
              }}
              className="btn-primary"
              style={{
                padding: 'clamp(0.75rem, 2vw, 0.95rem) clamp(1.25rem, 3vw, 2rem)',
                fontSize: 'clamp(0.95rem, 1.5vw, 1.05rem)',
                whiteSpace: 'nowrap'
              }}
            >
              {isUnlocked ? <Play size={18} /> : null}
              {isUnlocked ? 'Watch Full Demo' : 'Watch 5-Min Demo'}
              <ArrowRight size={18} />
            </button>
            <a
              href="#how-it-works"
              className="btn-secondary"
              style={{
                padding: 'clamp(0.7rem, 2vw, 0.9rem) clamp(1.25rem, 3vw, 1.75rem)',
                fontSize: 'clamp(0.9rem, 1.5vw, 0.95rem)',
                whiteSpace: 'nowrap'
              }}
            >
              See How It Works
            </a>
          </div>
        </div>

        {/* Keyframe animations */}
        <style>{`
          @keyframes gradient-shift {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }

          @media (max-width: 640px) {
            .glass-card > div {
              border-left: none !important;
              border-top: 1px solid var(--glass-border);
            }
            .glass-card > div:first-child {
              border-top: none !important;
            }
          }
        `}</style>

        {/* Gated Video */}
        <div
          id="demo-video-section"
          style={{
            maxWidth: '850px',
            margin: 'clamp(2rem, 4vw, 2.5rem) auto 0 auto',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.5s'
          }}
        >
          <GatedVideoPlayer isUnlocked={isUnlocked} onOpenForm={onOpenForm} />
        </div>
      </div>
    </section>
  );
};
