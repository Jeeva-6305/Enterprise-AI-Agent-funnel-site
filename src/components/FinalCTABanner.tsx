import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

interface FinalCTABannerProps {
  onOpenForm: () => void;
}

export const FinalCTABanner: React.FC<FinalCTABannerProps> = ({ onOpenForm }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
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
        background: 'linear-gradient(135deg, #042F2E 0%, #0F766E 50%, #115E59 100%)',
        padding: 'clamp(3.5rem, 7vw, 5rem) 0',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Animated decorative blobs */}
      <div style={{
        position: 'absolute',
        top: '-60px',
        right: '-80px',
        width: 'clamp(280px, 40vw, 360px)',
        height: 'clamp(280px, 40vw, 360px)',
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.08)',
        pointerEvents: 'none',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'scale(1)' : 'scale(0.8)',
        transition: 'all 1s ease'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-80px',
        left: '-40px',
        width: 'clamp(220px, 35vw, 280px)',
        height: 'clamp(220px, 35vw, 280px)',
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.06)',
        pointerEvents: 'none',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'scale(1)' : 'scale(0.8)',
        transition: 'all 1s ease 0.2s'
      }} />

      <div className="container" style={{
        textAlign: 'center',
        position: 'relative',
        zIndex: 1,
        padding: '0 1rem'
      }}>
        <h2 style={{
          fontSize: 'clamp(1.75rem, 4.5vw, 2.75rem)',
          fontWeight: 800,
          color: '#FFFFFF',
          marginBottom: 'clamp(0.85rem, 2vw, 1rem)',
          lineHeight: 1.2,
          letterSpacing: '-0.02em',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s'
        }}>
          Ready to See It in Action?
        </h2>
        <p style={{
          fontSize: 'clamp(1rem, 2vw, 1.1rem)',
          color: 'rgba(255,255,255,0.85)',
          maxWidth: '600px',
          margin: '0 auto clamp(2rem, 4vw, 2.5rem) auto',
          lineHeight: 1.65,
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s'
        }}>
          Watch our 5-minute product demo and see how Adople Agentic Data Analyst works with your actual data — no setup, no commitment.
        </p>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'clamp(0.75rem, 2vw, 1rem)',
            flexWrap: 'wrap',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s'
          }}
        >
          <button
            onClick={onOpenForm}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'clamp(0.5rem, 1.5vw, 0.6rem)',
              padding: 'clamp(0.85rem, 2vw, 1rem) clamp(1.75rem, 3vw, 2.25rem)',
              background: 'rgba(255, 255, 255, 0.98)',
              backdropFilter: 'blur(10px)',
              color: '#0F766E',
              fontSize: 'clamp(0.95rem, 1.8vw, 1.05rem)',
              fontWeight: 800,
              borderRadius: 'clamp(8px, 2vw, 10px)',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-4px) scale(1.05)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.35)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.25)';
            }}
          >
            Watch the Demo Video <ArrowRight size={18} />
          </button>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'clamp(1rem, 3vw, 1.5rem)',
            marginTop: 'clamp(1.5rem, 3vw, 1.75rem)',
            flexWrap: 'wrap',
            opacity: isVisible ? 1 : 0,
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s'
          }}
        >
          {['Free to watch', 'No credit card', 'Instant access'].map((item, idx) => (
            <div
              key={item}
              style={{
                fontSize: 'clamp(0.8rem, 1.5vw, 0.85rem)',
                fontWeight: 600,
                color: 'rgba(255,255,255,0.85)',
                display: 'flex',
                alignItems: 'center',
                gap: 'clamp(0.25rem, 1vw, 0.35rem)',
                whiteSpace: 'nowrap',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
                transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.5 + idx * 0.1}s`
              }}
            >
              <span style={{ color: '#A7F3D0', fontSize: 'clamp(0.95rem, 1.8vw, 1rem)' }}>✓</span> {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
