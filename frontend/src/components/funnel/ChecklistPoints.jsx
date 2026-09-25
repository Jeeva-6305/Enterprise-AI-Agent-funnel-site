import React from 'react';
import { Check } from 'lucide-react';

export default function ChecklistPoints() {
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
    <section className="screenshot-checklist-section" id="hero-checklist-points">
      <div className="container">
        <div className="hero-checklist-strip-grid">
          {checklistItems.map((item, idx) => (
            <div key={idx} className="hero-checklist-strip-item">
              <div className="hero-checklist-icon-box" aria-hidden="true">
                <Check size={16} strokeWidth={3} />
              </div>
              <div className="hero-checklist-text-wrap">
                <h3 className="hero-checklist-item-title">{item.title}</h3>
                <p className="hero-checklist-item-desc">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
