import React from 'react';
import { Clock, FileText, SearchCheck, Zap, CheckCircle, Shield } from 'lucide-react';

export default function PainPointsCard() {
  const painPoints = [
    {
      title: 'Manual Data Entry',
      description: 'Stop spending hours entering document data manually.',
      icon: <Clock size={20} className="template-item-icon" />
    },
    {
      title: 'Messy Documents',
      description: 'Process PDFs, scans, invoices, and forms without the usual hassle.',
      icon: <FileText size={20} className="template-item-icon" />
    },
    {
      title: 'Need Reliable Data',
      description: 'Get accurate, structured information you can actually use.',
      icon: <SearchCheck size={20} className="template-item-icon" />
    }
  ];

  return (
    <div className="purpose-built-template-card">
      <div>
        <h3 className="template-card-title">
          Purpose-built for today's complexity
        </h3>
        <p className="template-card-subtitle">
          If your organization is dealing with these structural bottlenecks, this platform is built for you:
        </p>

        <div className="template-items-list">
          {painPoints.map((point, index) => (
            <div key={index} className="template-item-row">
              <div className="template-icon-container">
                {point.icon}
              </div>
              <div className="template-text-container">
                <p className="template-item-title">{point.title}</p>
                <p className="template-item-desc">{point.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Value Badges */}
      <div className="purpose-built-footer-metrics">
        <div className="metric-pill">
          <Zap size={14} className="metric-icon" />
          <span><strong>10x</strong> Faster Turnaround</span>
        </div>
        <div className="metric-pill">
          <CheckCircle size={14} className="metric-icon" />
          <span><strong>99.4%</strong> Field Accuracy</span>
        </div>
        <div className="metric-pill">
          <Shield size={14} className="metric-icon" />
          <span><strong>SOC2</strong> Type II Ready</span>
        </div>
      </div>
    </div>
  );
}


