import React from 'react';
import { Sparkles, Play, ArrowRight } from 'lucide-react';
import LeadForm from './LeadForm';

export default function FunnelHero({ onWatchDemo, onSeeHowItWorks, onSuccessLead, showToast }) {
  return (
    <div className="hero-editorial-grid">
      {/* Left Column: Editorial Headline, Subtext & Action CTAs */}
      <div className="hero-editorial-left">
        {/* Pill Eyebrow Badge */}
        <div className="hero-editorial-badge">
          <Sparkles size={14} className="hero-badge-icon" color="#FFFFFF" />
          <span style={{ color: '#FFFFFF' }}>ENTERPRISE AI AGENTS</span>
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

      {/* Right Column: Hero Form Card matching Screenshot 2 */}
      <div className="hero-editorial-right">
        <div className="hero-form-card" id="lead-form-section">
          <LeadForm 
            onSuccessLead={onSuccessLead} 
            showToast={showToast} 
          />
        </div>
      </div>
    </div>
  );
}
