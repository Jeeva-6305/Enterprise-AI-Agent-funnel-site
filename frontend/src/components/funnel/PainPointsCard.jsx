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
    <section className="purpose-built-section" aria-labelledby="purpose-built-heading">
      <div className="purpose-built-header">
        <h2 id="purpose-built-heading" className="purpose-built-title">
          Purpose-Built for This Problem
        </h2>
        <p className="purpose-built-subtitle">
          If any of this is true of your business, Enterprise AI Agents was made to solve these problems:
        </p>
      </div>
      
      <div className="purpose-built-grid">
        {painPoints.map((point, index) => (
          <div key={index} className="purpose-built-card">
            <div className="purpose-built-icon-wrap">
              <span className="purpose-built-emoji" role="img" aria-hidden="true">{point.emoji}</span>
            </div>
            <span className="purpose-built-card-text">{point.title}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

