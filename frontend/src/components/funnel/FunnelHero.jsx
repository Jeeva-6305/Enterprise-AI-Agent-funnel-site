import React from 'react';
import { Sparkles, Zap, CheckCircle2, Shield } from 'lucide-react';

const metrics = [
  { icon: Zap,          stat: '10x',   label: 'Faster Turnaround' },
  { icon: CheckCircle2, stat: '99.4%', label: 'Field Accuracy' },
  { icon: Shield,       stat: 'SOC2',  label: 'Type II Ready' },
];

export default function FunnelHero() {
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
        Adople AI's autonomous agents read, understand, and extract data from even your messiest documents, faxes, scans, PDFs, and forms, and convert them into audit ready structured data in seconds.
      </p>

      {/* 3 Metric Stat Pills */}
      <div className="hero-metrics-row">
        {metrics.map(({ icon: Icon, stat, label }) => (
          <div key={stat} className="hero-metric-pill">
            <Icon size={15} strokeWidth={2} className="hero-metric-icon" />
            <span className="hero-metric-text">
              <strong>{stat}</strong> {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
