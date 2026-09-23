import React, { useState, useEffect, useRef } from 'react';
import { Play, ArrowRight } from 'lucide-react';
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
        background: 'radial-gradient(circle, rgba(15,118,110,0.1) 0%, transparent 70%)',
        pointerEvents: 'none',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'scale(1)' : 'scale(0.8)',
        transition: 'all 1.2s ease'
      }} />
      <div style={{
        position: 'absolute', bottom: '-80px', left: '-60px',
        width: '360px', height: '360px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)',
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
        <div style={{ textAlign: 'center', maxWidth: '1000px', margin: '0 auto', padding: '0 1rem' }}>
          <h1
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.75rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
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
                background: 'linear-gradient(135deg, #0F766E 0%, #F59E0B 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundSize: '200% 200%',
                animation: isVisible ? 'gradient-shift 3s ease infinite' : 'none',
                display: 'inline-block'
              }}
            >
              Instant, Accurate Answer
            </span>
          </h1>

          <p
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              color: 'var(--text-muted)',
              maxWidth: '700px',
              margin: '0 auto clamp(2rem, 4vw, 2.5rem) auto',
              lineHeight: 1.7,
              padding: '0 1rem',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s'
            }}
          >
            Adople AI lets your team ask questions about your business data in plain English — and get reliable, verified answers in seconds, without waiting for analysts or writing a single line of code.
          </p>

          {/* CTAs with staggered animation */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'clamp(0.75rem, 2vw, 1rem)',
              flexWrap: 'wrap',
              marginBottom: 'clamp(2.5rem, 5vw, 3.5rem)',
              padding: '0 1rem',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s'
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

          {/* Glass trust metric strip */}
          <div
            className="glass-card"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '0',
              maxWidth: '800px',
              margin: '0 auto',
              overflow: 'hidden',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s'
            }}
          >
            {[
              { value: 'Instant Answers', label: 'No more analyst backlogs' },
              { value: 'Always Verified', label: 'Every answer double-checked' },
              { value: 'Works Today', label: 'Connects in minutes, not months' }
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  padding: 'clamp(1rem, 3vw, 1.4rem) clamp(0.75rem, 2vw, 1.25rem)',
                  textAlign: 'center',
                  borderLeft: idx > 0 ? '1px solid var(--glass-border)' : 'none',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(15, 118, 110, 0.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <div
                  style={{
                    fontSize: 'clamp(1rem, 2vw, 1.15rem)',
                    fontWeight: 800,
                    color: 'var(--color-primary)',
                    marginBottom: '0.2rem'
                  }}
                >
                  {item.value}
                </div>
                <div style={{
                  fontSize: 'clamp(0.75rem, 1.5vw, 0.8rem)',
                  color: 'var(--text-muted)',
                  fontWeight: 500
                }}>
                  {item.label}
                </div>
              </div>
            ))}
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
            marginTop: 'clamp(3rem, 6vw, 4rem)',
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
