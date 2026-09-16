import React from 'react';

export default function PainPointsCard() {
  const painPoints = [
    {
      title: 'Manual Data Entry Errors & Slow Turnaround Times',
      emoji: '⏱️'
    },
    {
      title: 'Complex, Unstructured Multi-Page PDFs & Scans',
      emoji: '📄'
    },
    {
      title: 'Lack of Custom Rules, Table Parsing & Validation',
      emoji: '🔍'
    }
  ];

  return (
    <div className="purpose-built-container-card">
      <div className="purpose-built-header">
        <h2 className="purpose-built-title">
          Purpose-Built for This Problem
        </h2>
        <p className="purpose-built-subtitle">
          If any of this is true for your workflow, our Document Extraction Platform was built to solve it:
        </p>
      </div>

      <div className="purpose-built-items-list">
        {painPoints.map((point, index) => (
          <div key={index} className="purpose-built-item-row">
            <div className="purpose-built-icon-wrap">
              <span className="purpose-built-emoji" role="img" aria-hidden="true">{point.emoji}</span>
            </div>
            <span className="purpose-built-item-text">{point.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}


