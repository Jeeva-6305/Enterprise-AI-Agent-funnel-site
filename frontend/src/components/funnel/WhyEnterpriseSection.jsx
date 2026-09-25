import React from 'react';
import { Clock, FileText, ShieldCheck, Check, ArrowRight } from 'lucide-react';

export default function WhyEnterpriseSection() {
  const comparisonItems = [
    {
      today: 'Wading through hundreds of tabs & docs',
      withAi: 'Get precise answers immediately without wading through hundreds of documents and tabs.',
      icon: Clock
    },
    {
      today: 'Scattered, outdated knowledge base',
      withAi: 'All your knowledge base in one place and always up to date.',
      icon: FileText
    },
    {
      today: 'Security & compliance risks',
      withAi: 'Designed with enterprise-level security and control right from the start.',
      icon: ShieldCheck
    },
    {
      today: 'Slow, disruptive implementation',
      withAi: 'Quick to implement and easy to integrate into existing processes.',
      icon: Check
    }
  ];

  return (
    <div className="solutions-section-container">
      {/* Section Header */}
      <div className="solutions-header-block">
        <span className="benefits-badge-pill">ENTERPRISE ADVANTAGE</span>
        <h2 className="solutions-section-title">
          Why Enterprise AI Agent?
        </h2>
        <p className="solutions-section-subtitle">
          Engineered to transform messy enterprise unstructured data into confident action.
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
          {comparisonItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="solutions-row-item">
                <div className="solutions-row-today">
                  <div className="solutions-icon-wrapper">
                    <Icon size={18} className="solutions-card-icon" />
                  </div>
                  <span className="solutions-today-text">{item.today}</span>
                </div>

                <div className="solutions-row-arrow-wrap">
                  <ArrowRight size={18} className="solutions-arrow-icon" />
                </div>

                <div className="solutions-row-future">
                  <p className="solutions-future-desc">{item.withAi}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
