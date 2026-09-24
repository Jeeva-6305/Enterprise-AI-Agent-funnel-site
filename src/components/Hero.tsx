import React, { useState, useEffect, useRef } from 'react';
import { Play, ArrowRight, Zap, CheckCircle, Users, ShieldCheck } from 'lucide-react';
import { GatedVideoPlayer } from './GatedVideoPlayer';
import { LeadForm } from './LeadForm';

interface HeroProps {
  onOpenForm: () => void;
  isUnlocked: boolean;
  onUnlockSuccess: (token: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenForm, isUnlocked, onUnlockSuccess }) => {
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

  // Inline form success handler — properly unlocks via App state, then scrolls to video
  const handleInlineFormSuccess = (token: string) => {
    onUnlockSuccess(token);
    setTimeout(() => {
      document.getElementById('demo-video-section')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 300);
  };

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        padding: '0',
        background: 'var(--hero-gradient)',
        overflow: 'hidden',
        height: 'calc(100vh - 64px - 48px)',
        minHeight: '520px',
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

        {/* ── Two-column hero grid ── */}
        <div className="hero-two-col">

          {/* ── LEFT COLUMN: text content ── */}
          <div className="hero-left-col">

            {/* Badge */}
            <div style={{
              marginBottom: '0.6rem',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(-20px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
            }}>
              <span className="badge-tag">
                Trusted by enterprise data teams across 3 continents
              </span>
            </div>

            {/* Headline */}
            <h1
              style={{
                fontSize: 'clamp(1.5rem, 3vw, 2.4rem)',
                fontWeight: 700,
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                color: 'var(--text-heading)',
                marginBottom: '0.65rem',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s'
              }}
            >
              Turn Any Business Question Into an{' '}
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

            {/* Subheadline */}
            <p
              style={{
                fontSize: 'clamp(0.85rem, 1.4vw, 0.975rem)',
                color: 'var(--text-muted)',
                maxWidth: '520px',
                lineHeight: 1.55,
                marginBottom: '0.9rem',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s'
              }}
            >
              Adople AI lets your team ask questions about your business data in plain English — and get reliable, verified answers in seconds, without waiting for analysts or writing a single line of code.
            </p>

            {/* Proof pill badges — compact 2×2 grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '0.45rem',
                marginBottom: '1rem',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s'
              }}
            >
              {[
                { icon: <Zap size={14} color="#E8664C" />, value: '10,000+', label: 'Questions Answered' },
                { icon: <CheckCircle size={14} color="#4C9A7A" />, value: '99.2%', label: 'Accuracy Rate' },
                { icon: <Users size={14} color="#2B2D6E" />, value: '50+', label: 'Enterprise Customers' },
                { icon: <ShieldCheck size={14} color="#4C9A7A" />, value: '< 5 min', label: 'Avg Setup Time' },
              ].map((pill, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    background: '#FFFFFF',
                    border: '1.5px solid rgba(232, 102, 76, 0.3)',
                    borderRadius: '8px',
                    padding: '0.45rem 0.75rem',
                    boxShadow: '0 2px 8px rgba(28, 27, 46, 0.04)',
                    fontSize: 'clamp(0.72rem, 1.1vw, 0.8rem)',
                    fontWeight: 600,
                    color: 'var(--text-heading)',
                    transition: 'all 0.3s ease',
                    whiteSpace: 'nowrap'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.borderColor = 'var(--color-primary)';
                    e.currentTarget.style.boxShadow = '0 4px 14px rgba(43, 45, 110, 0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = 'rgba(232, 102, 76, 0.3)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(28, 27, 46, 0.04)';
                  }}
                >
                  <span style={{ display: 'inline-flex', alignItems: 'center', flexShrink: 0 }}>{pill.icon}</span>
                  <span>
                    <strong style={{ color: 'var(--color-primary)', fontWeight: 800 }}>{pill.value}</strong>{' '}{pill.label}
                  </span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                flexWrap: 'wrap',
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
                style={{ padding: '0.7rem 1.5rem', fontSize: '0.9rem', whiteSpace: 'nowrap' }}
              >
                {isUnlocked ? <Play size={16} /> : null}
                {isUnlocked ? 'Watch Full Demo' : 'Watch 5-Min Demo'}
                <ArrowRight size={16} />
              </button>
              <a
                href="#how-it-works"
                className="btn-secondary"
                style={{ padding: '0.65rem 1.25rem', fontSize: '0.875rem', whiteSpace: 'nowrap' }}
              >
                See How It Works
              </a>
            </div>
          </div>

          {/* ── RIGHT COLUMN: inline lead form card ── */}
          <div
            className="hero-right-col"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateX(0)' : 'translateX(40px)',
              transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.35s'
            }}
          >
            {isUnlocked ? (
              /* When already unlocked, show a friendly nudge card */
              <div style={{
                background: '#FFFFFF',
                borderRadius: 'clamp(12px, 3vw, 16px)',
                padding: 'clamp(2rem, 5vw, 2.75rem)',
                boxShadow: '0 24px 56px rgba(15, 23, 42, 0.14)',
                textAlign: 'center',
                border: '1.5px solid var(--color-primary-mid)'
              }}>
                <div style={{
                  width: 60, height: 60, borderRadius: '50%',
                  background: 'var(--color-primary-light)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 1.25rem auto'
                }}>
                  <Play size={26} color="var(--color-primary)" />
                </div>
                <h3 style={{
                  fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)',
                  fontWeight: 800,
                  color: 'var(--text-heading)',
                  marginBottom: '0.6rem'
                }}>
                  You're All Set!
                </h3>
                <p style={{
                  fontSize: 'clamp(0.85rem, 1.5vw, 0.92rem)',
                  color: 'var(--text-muted)',
                  lineHeight: 1.6,
                  marginBottom: '1.5rem'
                }}>
                  Your demo access is active. Scroll down to watch the full product walkthrough.
                </p>
                <button
                  onClick={() => document.getElementById('demo-video-section')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                  className="btn-primary"
                  style={{ width: '100%', justifyContent: 'center', height: '50px', fontSize: '1rem' }}
                >
                  <Play size={18} /> Watch the Demo <ArrowRight size={18} />
                </button>
              </div>
            ) : (
              <LeadForm onSuccess={handleInlineFormSuccess} />
            )}
          </div>
        </div>

        {/* Keyframe animations + layout */}
        <style>{`
          @keyframes gradient-shift {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }

          /* Two-column hero grid — fills full height */
          .hero-two-col {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: clamp(1.5rem, 3vw, 2.5rem);
            align-items: center;
            width: 100%;
            padding: 0 0;
          }

          .hero-left-col {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
          }

          .hero-right-col {
            min-width: 0;
            /* Allow right column to scroll internally if it ever overflows on a tiny screen */
            max-height: calc(100vh - 80px);
            overflow-y: auto;
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .hero-right-col::-webkit-scrollbar { display: none; }

          /* Stack on smaller screens */
          @media (max-width: 900px) {
            .hero-two-col {
              grid-template-columns: 1fr;
              gap: 1.5rem;
              overflow-y: auto;
            }
            .hero-left-col {
              align-items: center;
              text-align: center;
            }
            .hero-left-col p {
              max-width: 100% !important;
              text-align: center;
            }
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

        {/* GatedVideoPlayer is now rendered in App.tsx below the Hero section */}
      </div>
    </section>
  );
};
