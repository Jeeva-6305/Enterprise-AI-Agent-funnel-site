import React, { useRef, useEffect } from 'react';
import { Lock, ArrowRight, CheckCircle, Shield, Sparkles } from 'lucide-react';
import demoVideo from '../assets/Agentic Data Analyst_Demo.webm';

interface GatedVideoPlayerProps {
  isUnlocked: boolean;
  onOpenForm: () => void;
}

export const GatedVideoPlayer: React.FC<GatedVideoPlayerProps> = ({ isUnlocked, onOpenForm }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isUnlocked && videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.log('Video autoplay deferred by browser:', err);
      });
    }
  }, [isUnlocked]);

  return (
    <div
      style={{
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 20px 50px rgba(15, 23, 42, 0.12), 0 0 0 1px rgba(28, 27, 46, 0.08)',
        background: '#0B0F19',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        width: '100%',
        position: 'relative'
      }}
    >
      {!isUnlocked ? (
        /* Locked state with Agentic Data Analyst content */
        <div
          style={{
            position: 'relative',
            minHeight: 'clamp(380px, 46vw, 460px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'clamp(2.5rem, 5vw, 3.5rem) clamp(1.25rem, 3vw, 2.5rem)',
            textAlign: 'center',
            background: 'radial-gradient(ellipse at 50% 35%, rgba(43, 45, 110, 0.35) 0%, rgba(11, 15, 25, 0.98) 75%)'
          }}
        >
          {/* Top subtle status tag */}
          <div
            style={{
              position: 'absolute',
              top: 'clamp(1.25rem, 2.5vw, 1.75rem)',
              fontSize: '0.68rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(255, 255, 255, 0.45)'
            }}
          >
            DEMO LOCKED • FREE ACCESS FORM REQUIRED
          </div>

          {/* Centered Lock Icon */}
          <div
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.25rem',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.25)'
            }}
          >
            <Lock size={22} color="#FFFFFF" />
          </div>

          {/* Title */}
          <h3
            style={{
              fontSize: 'clamp(1.25rem, 3vw, 1.65rem)',
              fontWeight: 700,
              color: '#FFFFFF',
              marginBottom: '0.6rem',
              lineHeight: 1.25,
              maxWidth: '620px'
            }}
          >
            See Adople Agentic Data Analyst Answer Questions Live
          </h3>

          {/* Description */}
          <p
            style={{
              maxWidth: '540px',
              fontSize: 'clamp(0.85rem, 1.6vw, 0.95rem)',
              color: 'rgba(255, 255, 255, 0.7)',
              marginBottom: '1.75rem',
              lineHeight: 1.55
            }}
          >
            Watch a real product walkthrough — ask in plain English and get a verified answer with interactive charts in seconds.
          </p>

          {/* CTA Button */}
          <button
            onClick={onOpenForm}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.7rem 1.75rem',
              fontSize: '0.925rem',
              fontWeight: 600,
              background: '#2B2D6E',
              color: '#FFFFFF',
              borderRadius: '9999px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(43, 45, 110, 0.4)',
              transition: 'all 0.25s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(43, 45, 110, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(43, 45, 110, 0.4)';
            }}
          >
            <span>Watch the Full Demo — It's Free</span>
            <ArrowRight size={15} />
          </button>

          {/* Trust badges row */}
          <div
            style={{
              display: 'flex',
              gap: 'clamp(1rem, 3vw, 1.75rem)',
              marginTop: '1.75rem',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}
          >
            {[
              { icon: <CheckCircle size={14} color="#4C9A7A" />, label: 'Instant access' },
              { icon: <Shield size={14} color="#4C9A7A" />, label: 'No credit card required' },
              { icon: <Sparkles size={14} color="#4C9A7A" />, label: 'Full product overview' },
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  color: 'rgba(255, 255, 255, 0.75)',
                  fontSize: '0.78rem',
                  fontWeight: 500,
                  whiteSpace: 'nowrap'
                }}
              >
                {item.icon} {item.label}
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Unlocked — Video Player */
        <div
          style={{
            position: 'relative',
            width: '100%',
            paddingTop: '56.25%', /* 16:9 Aspect Ratio */
            background: '#000000'
          }}
        >
          <video
            ref={videoRef}
            src={demoVideo}
            controls
            autoPlay
            playsInline
            preload="auto"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              outline: 'none'
            }}
          >
            Your browser does not support HTML5 video.
          </video>
        </div>
      )}
    </div>
  );
};
