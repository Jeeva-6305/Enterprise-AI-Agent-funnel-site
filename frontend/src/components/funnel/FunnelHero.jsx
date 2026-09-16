import React from 'react';
import { Check, Sparkles } from 'lucide-react';

export default function FunnelHero() {
  const bulletPoints = [
    'Enterprise Multi-Agent Orchestration',
    'Full SOC2 & HIPAA Compliant Governance',
    'Zero-Code Integration with Existing CRM & ERP',
    'Human-In-The-Loop Autonomous Execution'
  ];

  return (
    <div className="hero-centered-content">
      {/* Title Eyebrow Pill */}
      <div className="hero-badge-pill">
        <Sparkles size={13} style={{ marginRight: '6px' }} />
        Autonomous Enterprise AI Agents
      </div>

      {/* Main Heading */}
      <h1 className="hero-title-centered">
        Scale Enterprise Operations with{' '}
        <span className="title-highlight">Autonomous AI Agents</span>
      </h1>

      {/* Content / Subheadline */}
      <p className="hero-subtext-centered">
        Adople AI’s multi-agent system orchestrates complex enterprise workflows, analyzes cross-functional data, and automates high-volume business operations with complete human-in-the-loop governance and auditability.
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

