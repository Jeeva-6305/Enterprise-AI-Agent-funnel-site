import React from 'react';
import { Sparkles, Play, ArrowRight, Check } from 'lucide-react';
import LeadForm from './LeadForm';

export default function FunnelHero({ onCtaClick, onSuccessLead, showToast }) {
  return (
    <div className="hero-editorial-two-col">
      {/* Left Column: Headline, Subtext & Action CTAs */}
      <div className="hero-editorial-left-col">
        {/* Pill Eyebrow Badge */}
        <div className="screenshot-badge-pill">
          <Sparkles size={14} className="hero-badge-icon" />
          <span>TRUSTED SEC FILING INTELLIGENCE</span>
        </div>

        {/* Main Headline */}
        <h1 className="screenshot-hero-title">
          Turning SEC Documents<br />
          <span className="screenshot-highlight-accent">
            Into Decisions, Answers &amp; Insights
          </span>
        </h1>

        {/* Subtext Paragraph */}
        <p className="screenshot-hero-subtext">
          SEC-Mind uses an organized set of agents to automate the fetching, analyzing, and structuring of 10-K and 10-Q documents.
        </p>

        {/* 4 Tick Points (2x2 Pill Grid matching Screenshot 2) */}
        <div className="hero-ticks-grid">
          {[
            'Ask about any 10-K or 10-Q',
            'Every file, organized',
            'Continuous context',
            'Works alongside you'
          ].map((point, idx) => (
            <div key={idx} className="hero-tick-pill">
              <div className="hero-tick-check" aria-hidden="true">
                <Check size={13} strokeWidth={3} />
              </div>
              <span className="hero-tick-label">{point}</span>
            </div>
          ))}
        </div>

        {/* Side-by-Side CTAs */}
        <div className="hero-cta-group">
          <button 
            type="button"
            className="btn-hero-primary" 
            onClick={onCtaClick}
            id="hero-btn-watch-demo"
          >
            <Play size={16} fill="currentColor" />
            <span>Watch Demo</span>
          </button>

          <a 
            href="#categories-title" 
            className="btn-hero-secondary"
            id="hero-btn-explore"
          >
            <span>Explore Intelligence</span>
            <ArrowRight size={15} />
          </a>
        </div>
      </div>

      {/* Right Column: Lead Form Card matching Screenshot 1 */}
      <div className="hero-editorial-right-col" id="lead-form-section">
        <LeadForm 
          onSuccessLead={onSuccessLead} 
          showToast={showToast} 
        />
      </div>
    </div>
  );
}
