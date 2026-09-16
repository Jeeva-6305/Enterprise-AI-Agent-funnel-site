import React from 'react';
import { Check, Sparkles } from 'lucide-react';

export default function FunnelHero() {
  const bulletPoints = [
    '99%+ Field-Level Extraction Accuracy',
    'Automated PDFs, Scans, Invoices & Faxes',
    'SOC2 Type II Governed & Encrypted',
    'Instant Integration with ERP / CRM / SQL'
  ];

  return (
    <div className="hero-centered-content">
      {/* Title Eyebrow Pill */}
      <div className="hero-badge-pill">
        <Sparkles size={13} style={{ marginRight: '6px' }} />
        Agentic Document Extraction
      </div>

      {/* Main Heading */}
      <h1 className="hero-title-centered">
        Automatically Convert Any Document to{' '}
        <span className="title-highlight">Clean, Structured Data</span>
      </h1>

      {/* Content / Subheadline */}
      <p className="hero-subtext-centered">
        Adople AI’s autonomous agents read, understand, and extract data from even your messiest documents — faxes, scans, PDFs, and forms — and convert them into audit-ready structured data in seconds.
      </p>

      {/* 4 Feature Badges in Balanced Horizontal Grid */}
      <div className="hero-checklist-horizontal">
        {bulletPoints.map((point, index) => (
          <div key={index} className="checklist-pill-item">
            <div className="check-icon-wrap-sm">
              <Check size={12} strokeWidth={3.5} />
            </div>
            <span className="checklist-pill-text">{point}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

