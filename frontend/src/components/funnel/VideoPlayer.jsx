import React from 'react';
import { Lock, ArrowRight, CheckCircle, Shield, Sparkles } from 'lucide-react';

export default function VideoPlayer({ isUnlocked = false, onPlayClick }) {
  return (
    <div className="demo-video-player-container">
      {!isUnlocked ? (
        /* State 1: Locked — Free Access Form Required (Matching Screenshot 2) */
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
            See SEC-Mind Analyze Filings Live
          </h3>

          {/* Description */}
          <p className="demo-locked-description">
            Watch a real product walkthrough — ask in plain English and get verified answers with cited references across 10-K and 10-Q disclosures in seconds.
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
              <CheckCircle size={14} color="#B8476B" />
              <span>One-time instant access</span>
            </div>
            <div className="demo-trust-badge-item">
              <Shield size={14} color="#B8476B" />
              <span>No credit card required</span>
            </div>
            <div className="demo-trust-badge-item">
              <Sparkles size={14} color="#B8476B" />
              <span>Full filing coverage</span>
            </div>
          </div>
        </div>
      ) : (
        /* State 2: Unlocked — Active Video Player (No autoplay) */
        <div className="demo-unlocked-player-box">
          {/* Subtle One-time status pill over video */}
          <div className="demo-unlocked-status-pill">
            <span className="demo-unlocked-status-dot"></span>
            <span>One-Time Access Active</span>
          </div>

          <video
            controls
            playsInline
            preload="metadata"
            className="demo-unlocked-video-elem"
          >
            <source src="/Sec%20Analyzer%20Demo.mp4" type="video/mp4" />
            <source src="/demo.mp4" type="video/mp4" />
            <source src="/sec-demo.mp4" type="video/mp4" />
            Your browser does not support HTML5 video.
          </video>
        </div>
      )}
    </div>
  );
}
