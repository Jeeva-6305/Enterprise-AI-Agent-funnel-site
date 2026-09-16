import React from 'react';
import { Shield, Zap, FileSpreadsheet, CheckCircle } from 'lucide-react';

export default function PainPointsCard() {
  const painPoints = [
    {
      title: 'Manual Data Entry',
      description: 'Stop spending hours entering document data manually.',
      emoji: '🕐'
    },
    {
      title: 'Messy Documents',
      description: 'Process PDFs, scans, invoices, and forms without the usual hassle.',
      emoji: '📄'
    },
    {
      title: 'Need Reliable Data',
      description: 'Get accurate, structured information you can actually use.',
      emoji: '🔍'
    }
  ];

  return (
    <div className="purpose-built-container-card">
      <div>
        <div className="purpose-built-header">
          <span className="purpose-built-badge">DOCUMENT INTELLIGENCE</span>
          <h2 className="purpose-built-title">
            Built to Make Document Processing Easier
          </h2>
          <p className="purpose-built-subtitle">
            If manual document processing is slowing you down, Adople AI can help.
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


