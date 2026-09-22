import React from 'react';
import { Clock, FileText, Check } from 'lucide-react';

export default function PainPointsCard() {
  const painPoints = [
    {
      title: 'Manual data entry',
      description: 'Stop spending hours re-keying document data by hand across systems.',
      icon: <Clock size={20} className="purpose-card-icon" />
    },
    {
      title: 'Messy documents',
      description: 'Process PDFs, scans, invoices, and forms — even low-quality faxes — without the usual hassle.',
      icon: <FileText size={20} className="purpose-card-icon" />
    },
    {
      title: 'Unreliable data',
      description: 'Get accurate, structured information you can actually trust downstream.',
      icon: <Check size={20} className="purpose-card-icon" />
    }
  ];

  return (
    <div className="purpose-built-section-container">
      {/* Section Header */}
      <div className="purpose-header-block">
        <h2 className="purpose-section-title">
          Purpose-built for today's complexity
        </h2>
        <p className="purpose-section-subtitle">
          If your organization is dealing with these structural bottlenecks, the platform is built for you.
        </p>
      </div>

      {/* 3 Horizontal Cards Grid */}
      <div className="purpose-cards-grid">
        {painPoints.map((point, index) => (
          <div key={index} className="purpose-feature-card">
            <div className="purpose-card-icon-wrap">
              {point.icon}
            </div>
            <h3 className="purpose-card-title">{point.title}</h3>
            <p className="purpose-card-desc">{point.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
