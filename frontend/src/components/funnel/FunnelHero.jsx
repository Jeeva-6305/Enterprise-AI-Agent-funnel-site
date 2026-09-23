import React from 'react';
import { Check } from 'lucide-react';

export default function FunnelHero() {
  const checklistItems = [
    {
      title: 'Ask about any 10-K or 10-Q',
      description: 'Get immediate answers with references.'
    },
    {
      title: 'Every file, organized',
      description: 'Automatically sorted into ready-to-analyze categories.'
    },
    {
      title: 'Continuous context',
      description: 'The next question always relates to the report — no re-upload needed.'
    },
    {
      title: 'Works alongside you',
      description: 'Progress and saved session state, always in sync.'
    }
  ];

  return (
    <div className="screenshot-hero-content">
      {/* Main Headline */}
      <h1 className="screenshot-hero-title">
        Turning SEC Documents<br />
        <span className="screenshot-highlight-accent">
          Into Decisions, Answers<br />&amp; Insights
        </span>
      </h1>

      {/* Subtext Paragraph */}
      <p className="screenshot-hero-subtext">
        SEC-Mind uses an organized set of agents to automate the fetching, analyzing, and structuring of 10-K and 10-Q documents.
      </p>

      {/* Option 5: Icon-Left Badges Card Container */}
      <div className="hero-checklist-card">
        {checklistItems.map((item, idx) => (
          <div key={idx} className="hero-checklist-item">
            <div className="hero-checklist-icon-box" aria-hidden="true">
              <Check size={14} strokeWidth={3} />
            </div>
            <div className="hero-checklist-text-wrap">
              <h3 className="hero-checklist-item-title">{item.title}</h3>
              <p className="hero-checklist-item-desc">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
