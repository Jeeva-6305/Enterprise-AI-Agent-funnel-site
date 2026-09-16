import React from 'react';
import { Check, Sparkles } from 'lucide-react';

export default function FunnelHero() {
  const checklistItems = [
    'Ask about any 10-K or 10-Q and get immediate answers with references',
    'Every file is organized into 10 ready-to-analyze categories automatically',
    'The next question always relates to the report - without need for re-upload',
    'Works in parallel with your progress and saved session state'
  ];

  return (
    <div className="screenshot-hero-content">
      {/* Centered Eyebrow Pill with Sparkles */}
      <div className="screenshot-badge-pill">
        <Sparkles size={13} strokeWidth={2.2} />
        <span>SEC ANALYZER</span>
      </div>

      {/* Main Centered Headline */}
      <h1 className="screenshot-hero-title">
        Turning SEC Documents into<br />
        <span className="screenshot-highlight-accent">Decisions, Answers &amp; Insights</span>
      </h1>

      {/* Centered Subtext Paragraph */}
      <p className="screenshot-hero-subtext">
        SEC-Mind uses an organized set of AI agents to automate the fetching, analyzing, and structuring of 10-K and 10-Q documents, so that analysts can get factual information from SEC, instead of having to sift through hundreds of pages manually.
      </p>

      {/* Centered Horizontal Feature Badges / Pills */}
      <div className="hero-pill-badges-wrap">
        {checklistItems.map((text, idx) => (
          <div key={idx} className="hero-feature-pill">
            <div className="hero-pill-check-icon">
              <Check size={11} strokeWidth={3.5} />
            </div>
            <span>{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}



