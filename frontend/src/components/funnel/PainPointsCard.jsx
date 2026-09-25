import React from 'react';
import { Clock, FileText, Check, ArrowRight } from 'lucide-react';

export default function PainPointsCard() {
  const painPoints = [
    {
      title: 'Manual data entry',
      description: 'Stop spending hours re-keying document data by hand across systems.',
      icon: <Clock size={16} className="solutions-card-icon" />
    },
    {
      title: 'Messy documents',
      description: 'Process PDFs, scans, invoices, and forms — even low-quality faxes — without the usual hassle.',
      icon: <FileText size={16} className="solutions-card-icon" />
    },
    {
      title: 'Unreliable data',
      description: 'Get accurate, structured information you can actually trust downstream.',
      icon: <Check size={16} className="solutions-card-icon" />
    }
  ];

  return (
    <div className="solutions-section-container purpose-built-section-container">
      {/* Section Header */}
      <div className="solutions-header-block purpose-header-block">
        <h2 className="solutions-section-title purpose-section-title">
          Our Solutions
        </h2>
        <p className="solutions-section-subtitle purpose-section-subtitle">
          If your organization is dealing with these structural bottlenecks, the platform is built for you.
        </p>
      </div>

      {/* Comparison Layout matching reference screenshot */}
      <div className="solutions-comparison-card">
        {/* Table Header */}
        <div className="solutions-table-header">
          <div className="solutions-col-header solutions-today-header">
            TODAY
          </div>
          <div className="solutions-col-spacer" />
          <div className="solutions-col-header solutions-future-header">
            WITH ADOPLE AI
          </div>
        </div>

        {/* Rows */}
        <div className="solutions-rows-list">
          {painPoints.map((point, index) => (
            <div key={index} className="solutions-row-item">
              <div className="solutions-row-today">
                <div className="solutions-icon-wrapper">
                  {point.icon}
                </div>
                <span className="solutions-today-text">{point.title}</span>
              </div>

              <div className="solutions-row-arrow-wrap">
                <ArrowRight size={18} className="solutions-arrow-icon" />
              </div>

              <div className="solutions-row-future">
                <p className="solutions-future-desc">{point.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

