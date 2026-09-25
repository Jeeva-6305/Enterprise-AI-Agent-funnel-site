import React, { useRef, useEffect } from 'react';
import { Lock, ArrowRight, CheckCircle, Shield, Sparkles } from 'lucide-react';

export default function VideoPlayer({ isUnlocked = false, onPlayClick }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (isUnlocked && videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.log('Video autoplay deferred by browser:', err);
      });
    }
  }, [isUnlocked]);

  return (
    <div className="demo-video-player-container">
      {!isUnlocked ? (
        /* State 1: Locked — Free Access Form Required (Matching Screenshot 1) */
        <div 
          className="demo-gated-locked-card"
          onClick={onPlayClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onPlayClick();
            }
          }}
          title="Click to unlock demo video"
        >
          {/* Top subtle status tag */}
          <div className="demo-locked-top-tag">
            DEMO LOCKED • ONE-TIME FREE ACCESS FORM REQUIRED
          </div>

          {/* Centered Lock Icon */}
          <div className="demo-locked-icon-badge">
            <Lock size={22} color="#FFFFFF" />
          </div>

          {/* Title */}
          <h3 className="demo-locked-title">
            See Adople Enterprise AI Agent Answer Questions Live
          </h3>

          {/* Description */}
          <p className="demo-locked-description">
            Watch a real product walkthrough — ask in plain English and get a verified answer across your enterprise docs and apps in seconds.
          </p>

          {/* CTA Button */}
          <button
            type="button"
            className="demo-locked-cta-btn"
            onClick={(e) => {
              e.stopPropagation();
              onPlayClick();
            }}
          >
            <span>Watch the Full Demo — It's Free</span>
            <ArrowRight size={15} />
          </button>

          {/* Trust badges row */}
          <div className="demo-locked-trust-badges">
            <div className="demo-trust-badge-item">
              <CheckCircle size={14} color="#34D399" />
              <span>One-time instant access</span>
            </div>
            <div className="demo-trust-badge-item">
              <Shield size={14} color="#34D399" />
              <span>No credit card required</span>
            </div>
            <div className="demo-trust-badge-item">
              <Sparkles size={14} color="#34D399" />
              <span>Full product overview</span>
            </div>
          </div>
        </div>
      ) : (
        /* State 2: Unlocked — Active Video Player */
        <div className="demo-unlocked-player-box">
          {/* Subtle One-time status pill over video */}
          <div className="demo-unlocked-status-pill">
            <span className="demo-unlocked-status-dot"></span>
            <span>One-Time Access Active</span>
          </div>

          <video
            ref={videoRef}
            controls
            autoPlay
            playsInline
            preload="auto"
            className="demo-unlocked-video-elem"
          >
            <source src="/Enterprise%20AI%20Agents.mp4" type="video/mp4" />
            <source src="/demo.mp4" type="video/mp4" />
            Your browser does not support HTML5 video.
          </video>
        </div>
      )}
    </div>
  );
}
