import React from 'react';
import {
  Building2,
  ShieldAlert,
  ChartNoAxesCombined,
  Presentation,
  Table2,
  BarChart3,
  UsersRound,
  Scale,
  ShieldCheck,
  StickyNote
} from 'lucide-react';

const categories = [
  {
    number: '01',
    title: 'Business Overview & Operations',
    description: 'Core business model, product lines, revenue drivers, and operating segments.',
    icon: Building2
  },
  {
    number: '02',
    title: 'Risk factors',
    description: 'Item 1A risk exposures, macroeconomic threats, and operational vulnerabilities.',
    icon: ShieldAlert
  },
  {
    number: '03',
    title: 'Selected Financial Data & Key Metrics',
    description: 'Five-year historical trends, margin performance, and vital capital metrics.',
    icon: ChartNoAxesCombined
  },
  {
    number: '04',
    title: 'Management Discussion & Analysis',
    description: 'Executive analysis of liquidity, forward outlook, margins, and capital resources.',
    icon: Presentation
  },
  {
    number: '05',
    title: 'Consolidated Financial Statements',
    description: 'Audited balance sheets, income statements, and statement of cash flows.',
    icon: Table2
  },
  {
    number: '06',
    title: 'Segment Performance Reporting',
    description: 'Breakdown of revenue, operating profits, and assets by division and geography.',
    icon: BarChart3
  },
  {
    number: '07',
    title: 'Executive Compensation & Governance',
    description: 'Leadership pay structure, equity awards, proxy data, and board oversight.',
    icon: UsersRound
  },
  {
    number: '08',
    title: 'Regulatory Compliance',
    description: 'Pending litigation, material regulatory investigations, and compliance oversight.',
    icon: Scale
  },
  {
    number: '09',
    title: 'Audit Disclosures',
    description: 'Internal control evaluations, Sarbanes-Oxley assessments, and auditor opinions.',
    icon: ShieldCheck
  },
  {
    number: '10',
    title: 'Accounting Policies',
    description: 'Critical revenue recognition rules, lease liabilities, debt terms, and commitments.',
    icon: StickyNote
  }
];

export default function AnalysisCategories() {
  return (
    <section
      className="analysis-categories-section"
      aria-labelledby="analysis-categories-title"
    >
      <div className="container analysis-categories-container">
        <div className="analysis-categories-header">
          <div className="analysis-categories-eyebrow">WHAT SEC-MIND ANALYZES</div>
          <h2 id="analysis-categories-title" className="analysis-categories-title">
            One Filing Ten Intelligence Categories
          </h2>
          <p className="analysis-categories-subtitle">
            SEC-Mind organizes financial disclosures into structured categories, making complex SEC filings easier to analyze and explore.
          </p>
        </div>

        <div className="analysis-categories-grid" role="list">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <article
                className="analysis-category-card"
                key={cat.number}
              >
                <span className="analysis-category-number">{cat.number}</span>
                <div className="analysis-category-icon" aria-hidden="true">
                  <Icon size={20} strokeWidth={1.8} />
                </div>
                <h3 className="analysis-category-title">{cat.title}</h3>
                <p className="analysis-category-description">{cat.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
