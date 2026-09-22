import React from 'react';
import { Sparkles, Play, ArrowRight } from 'lucide-react';

export default function FunnelHero({ onWatchDemo, onSeeHowItWorks }) {
  return (
    <div className="hero-editorial-grid">
      {/* Left Column: Editorial Headline, Subtext & Action CTAs */}
      <div className="hero-editorial-left">
        {/* Pill Eyebrow Badge */}
        <div className="hero-editorial-badge">
          <Sparkles size={14} className="hero-badge-icon" />
          <span>ENTERPRISE AI AGENTS</span>
        </div>

        {/* Headline with Brand Blue Emphasis */}
        <h1 className="hero-editorial-title">
          Turning Enterprise Intelligence into{' '}
          <span className="title-highlight">Decisions, Action, and Knowledge</span>
        </h1>

        {/* Original Subheadline Copy */}
        <p className="hero-editorial-subtext">
          Enterprise AI Agents help you bring all your scattered documents and applications together to work as one cohesive intelligent system that thinks, searches and answers like your best employee does.
        </p>

        {/* Side-by-Side CTAs */}
        <div className="hero-cta-group">
          <button 
            type="button"
            className="btn-hero-primary" 
            onClick={onWatchDemo}
            id="hero-btn-watch-demo"
          >
            <Play size={16} fill="currentColor" />
            <span>Watch a Demo</span>
          </button>

          <button 
            type="button"
            className="btn-hero-secondary" 
            onClick={onSeeHowItWorks}
            id="hero-btn-see-how-it-works"
          >
            <span>See how it works</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>

      {/* Right Column: Sleek Interactive Window Card with Real Original Video Preview Image */}
      <div className="hero-editorial-right">
        <div 
          className="hero-mockup-window"
          onClick={onWatchDemo}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onWatchDemo();
            }
          }}
          title="Click to watch Platform Demo (90 seconds)"
        >
          {/* Top Window Bar with 3 Window Controls */}
          <div className="mockup-window-header">
            <div className="mockup-window-dots">
              <span className="mockup-dot dot-red"></span>
              <span className="mockup-dot dot-yellow"></span>
              <span className="mockup-dot dot-green"></span>
            </div>
            <div className="mockup-window-title">
              <span>Adople AI — Platform Demo</span>
            </div>
          </div>

          {/* Window Body with Original Video Preview Image */}
          <div className="mockup-video-preview-wrapper">
            <img 
              src="/demo-video-thumbnail.jpg" 
              alt="Adople AI Enterprise Agent Platform Demo Preview" 
              className="mockup-video-img"
            />
            <div className="mockup-video-overlay"></div>

            {/* Center Glowing Pulse Play Button */}
            <div className="mockup-center-play-wrapper">
              <div className="mockup-play-pulse-btn">
                <div className="mockup-play-icon-triangle"></div>
              </div>
            </div>

            {/* Bottom Status Badge */}
            <div className="mockup-bottom-status-bar">
              <div className="mockup-status-badge">
                <span className="mockup-status-dot"></span>
                <span>Platform demo — 90 seconds</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
