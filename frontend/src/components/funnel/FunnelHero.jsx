import React from 'react';
import { Check } from 'lucide-react';

export default function FunnelHero() {
  const bulletPoints = [
    'Get precise answers immediately without wading through hundreds of documents and tabs',
    'All your knowledge base in one place and always up to date',
    'Designed with enterprise-level security and control right from the start',
    'Quick to implement and easy to integrate into existing processes'
  ];

  return (
    <div className="hero-left">
      {/* Eyebrow Tag */}
      <div className="hero-badge-pill">
        Enterprise AI Agents
      </div>

      {/* Headline */}
      <h1 className="hero-title">
        Turning Enterprise Intelligence into{' '}
        <span className="title-highlight">Decisions, Action, and Knowledge</span>
      </h1>

      {/* Subheadline */}
      <p className="hero-subtext">
        Enterprise AI Agents help you bring all your scattered documents and applications together to work as one cohesive intelligent system that thinks, searches and answers like your best employee does.
      </p>

      {/* 4 Bullet Points with Blue Checkmarks */}
      <div className="hero-checklist">
        {bulletPoints.map((point, index) => (
          <div key={index} className="checklist-item">
            <div className="check-icon-wrap">
              <Check size={14} strokeWidth={3.5} />
            </div>
            <span className="checklist-text">{point}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

