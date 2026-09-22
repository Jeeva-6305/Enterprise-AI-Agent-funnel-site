import React from 'react';
import { Check, Sparkles } from 'lucide-react';
import LeadForm from './LeadForm';

export default function FunnelHero({ onSuccessLead, showToast }) {
  const bulletPoints = [
    'Get precise answers immediately without wading through hundreds of documents and tabs',
    'All your knowledge base in one place and always up to date',
    'Designed with enterprise-level security and control right from the start',
    'Quick to implement and easy to integrate into existing processes'
  ];

  return (
    <div className="hero-layout-wrapper">
      {/* 1. Centered Hero Heading & Description at Top */}
      <div className="hero-top-centered">
        {/* Centered Eyebrow Tag */}
        <div className="hero-badge-pill">
          <Sparkles size={14} className="hero-badge-icon" />
          <span>Enterprise AI Agents</span>
        </div>

        {/* Centered Headline */}
        <h1 className="hero-title">
          Turning Enterprise Intelligence into{' '}
          <span className="title-highlight">Decisions, Action, and Knowledge</span>
        </h1>

        {/* Centered Subheadline */}
        <p className="hero-subtext">
          Enterprise AI Agents help you bring all your scattered documents and applications together to work as one cohesive intelligent system that thinks, searches and answers like your best employee does.
        </p>
      </div>

      {/* 2. Directly Below: Two-Column Layout (Left: 4 Checklist Points | Right: Lead Form) */}
      <div className="hero-two-column-grid">
        {/* Left Column: 4 Checklist / Benefit Points (Matching Height & Width) */}
        <div className="hero-benefits-card">
          <div className="hero-benefits-list">
            {bulletPoints.map((point, index) => (
              <div key={index} className="hero-benefit-item">
                <div className="benefit-check-icon-wrap">
                  <Check size={15} strokeWidth={3.2} />
                </div>
                <p className="benefit-item-text">{point}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Lead Form Card (Matching Height & Width) */}
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
