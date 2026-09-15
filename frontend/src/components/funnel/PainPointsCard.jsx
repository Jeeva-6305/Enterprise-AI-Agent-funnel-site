import React from 'react';

export default function PainPointsCard() {
  const painPoints = [
    {
      title: 'Unintegrated and Isolated Solutions',
      emoji: '🧩'
    },
    {
      title: 'Too Much Information, No Transparency',
      emoji: '🌀'
    },
    {
      title: 'Generic AI that Does Not Address Business Risks',
      emoji: '🔒'
    }
  ];

  return (
    <div className="purpose-built-container-card">
      <div className="purpose-built-header">
        <h2 className="purpose-built-title">
          Purpose-Built for This Problem
        </h2>
        <p className="purpose-built-subtitle">
          If any of this is true of your business, Enterprise AI Agents was made to solve these problems:
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


