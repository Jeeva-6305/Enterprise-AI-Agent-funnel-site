import React from 'react';
import { Shield, Zap, FileSpreadsheet, CheckCircle } from 'lucide-react';

export default function PainPointsCard() {
  const painPoints = [
    {
      title: 'Manual Data Entry Errors & Slow Turnaround',
      description: 'Replace tedious manual transcription with autonomous agentic parsing that delivers structured results in sub-seconds.',
      emoji: '⏱️'
    },
    {
      title: 'Complex, Multi-Page PDFs, Invoices & Scans',
      description: 'Handles non-standard tables, varied headers, rotated scans, and nested line items without breaking template rules.',
      emoji: '📄'
    },
    {
      title: 'Lack of Custom Rules & Verification Controls',
      description: 'Enforce mathematical checksums, schema validation, and human-in-the-loop flags on low confidence scores.',
      emoji: '🔍'
    }
  ];

  return (
    <div className="purpose-built-container-card">
      <div>
        <div className="purpose-built-header">
          <span className="purpose-built-badge">Enterprise Document Intelligence</span>
          <h2 className="purpose-built-title">
            Purpose-Built for This Problem
          </h2>
          <p className="purpose-built-subtitle">
            If any of this is true for your operations, Adople AI’s Document Extraction platform was engineered to solve it:
          </p>
        </div>

        <div className="purpose-built-items-list">
          {painPoints.map((point, index) => (
            <div key={index} className="purpose-built-item-row">
              <div className="purpose-built-icon-wrap">
                <span className="purpose-built-emoji" role="img" aria-hidden="true">{point.emoji}</span>
              </div>
              <div className="purpose-built-text-group">
                <span className="purpose-built-item-text">{point.title}</span>
                <p className="purpose-built-item-desc">{point.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Value Metrics Highlight at bottom */}
      <div className="purpose-built-footer-metrics">
        <div className="metric-pill">
          <Zap size={15} className="metric-icon" />
          <span><strong>10x</strong> Faster Turnaround</span>
        </div>
        <div className="metric-pill">
          <CheckCircle size={15} className="metric-icon" />
          <span><strong>99.4%</strong> Field Accuracy</span>
        </div>
        <div className="metric-pill">
          <Shield size={15} className="metric-icon" />
          <span><strong>SOC2</strong> Type II Ready</span>
        </div>
      </div>
    </div>
  );
}


