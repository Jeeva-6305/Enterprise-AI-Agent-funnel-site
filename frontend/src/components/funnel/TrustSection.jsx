import React from "react";

const trustCards = [
  {
    id: "data-security",
    emoji: "🔒",
    title: "Data security",
    description:
      "Encrypted at transit and rest. Runs in your existing Azure or AWS environment, so data never leaves infra you control.",
  },
  {
    id: "compliance",
    emoji: "🛡️",
    title: "Compliance",
    description:
      "HIPAA compliant by design, ready for SOC2 Type II & ISO 27001 architecture.",
  },
  {
    id: "responsible-ai",
    emoji: "⚖️",
    title: "Responsible AI",
    description:
      "Every extraction explainable, logged, contestable never black box. Low-confidence output is routed to a human before proceeding.",
  },
];

export default function TrustSection() {
  return (
    <div className="trust-inner">
      {/* Section Header */}
      <div className="trust-header">
        <h2 className="trust-title">Responsible AI, Security &amp; Trust</h2>
        <p className="trust-subtitle">
          Every document and every extraction is handled to the same governed, auditable standard built for regulated healthcare and financial data.
        </p>
      </div>

      {/* 3-Card Grid */}
      <div className="trust-cards-grid">
        {trustCards.map((card) => (
          <div key={card.id} className="trust-card">
            <div className="trust-card-icon">
              <span className="trust-card-emoji" role="img" aria-label={card.title}>
                {card.emoji}
              </span>
            </div>
            <h3 className="trust-card-title">{card.title}</h3>
            <p className="trust-card-desc">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

