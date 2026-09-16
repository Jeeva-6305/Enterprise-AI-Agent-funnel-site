import React from 'react';
import { Check } from 'lucide-react';

export default function FunnelHero() {
  const bulletPoints = [
    'Extract structured data with 99%+ accuracy from complex, multi-format documents',
    'Automate ingestion of invoices, receipts, contracts, and scanned forms',
    'Enterprise-grade privacy, encryption, and strict SOC2 Type II compliance',
    'Seamlessly integrate into your existing ERP, CRM, and workflow pipelines'
  ];

  return (
    <div className="hero-left">
      {/* Eyebrow Tag */}
      <div className="hero-badge-pill">
        AI Document Extraction
      </div>

      {/* Headline */}
      <h1 className="hero-title">
        Turning Unstructured Documents into{' '}
        <span className="title-highlight">Accurate, Actionable Data</span>
      </h1>

      {/* Subheadline */}
      <p className="hero-subtext">
        Automate document processing end-to-end. Our Intelligent Document Extraction platform reads, understands, and extracts critical data points from PDFs, scanned images, and tables with unmatched speed and precision.
      </p>

      {/* 4 Bullet Points with Checkmarks */}
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

