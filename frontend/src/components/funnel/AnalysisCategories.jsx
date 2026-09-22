import React, { useEffect, useRef, useState } from 'react';
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
  { number: '01', title: 'Business Overview & Operations', icon: Building2 },
  { number: '02', title: 'Risk Factors & Market Uncertainties', icon: ShieldAlert },
  { number: '03', title: 'Selected Financial Data & Key Metrics', icon: ChartNoAxesCombined },
  { number: '04', title: 'Management Discussion & Analysis (MD&A)', icon: Presentation },
  { number: '05', title: 'Consolidated Financial Statements', icon: Table2 },
  { number: '06', title: 'Segment Performance Reporting', icon: BarChart3 },
  { number: '07', title: 'Executive Compensation & Governance', icon: UsersRound },
  { number: '08', title: 'Legal Proceedings & Regulatory Compliance', icon: Scale },
  { number: '09', title: 'Controls, Procedures & Audit Disclosures', icon: ShieldCheck },
  { number: '10', title: 'Financial Footnotes & Accounting Policies', icon: StickyNote }
];

export default function AnalysisCategories() {
  const sectionRef = useRef(null);
  const [visibleCards, setVisibleCards] = useState(new Set());

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll('.analysis-category-card');
    if (!cards || !('IntersectionObserver' in window)) {
      setVisibleCards(new Set(categories.map((_, i) => i)));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.dataset.index);
            setVisibleCards((prev) => new Set([...prev, idx]));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="analysis-categories-section"
      aria-labelledby="analysis-categories-title"
    >
      <div className="container analysis-categories-container">
        <div className="analysis-categories-header">
          <div className="analysis-categories-eyebrow">WHAT SEC-MIND ANALYZES</div>
          <h2 id="analysis-categories-title" className="analysis-categories-title">
            One Filing. Ten Intelligence Categories.
          </h2>
          <p className="analysis-categories-subtitle">
            SEC-Mind organizes financial disclosures into structured categories, making complex SEC filings easier to analyze and explore.
          </p>
        </div>

        <div className="analysis-categories-grid" aria-live="polite">
          {categories.map(({ number, title, icon: Icon }, index) => (
            <article
              className={`analysis-category-card${visibleCards.has(index) ? ' is-visible' : ''}`}
              key={number}
              data-index={index}
              style={{ '--card-delay': `${index * 65}ms` }}
            >
              <span className="analysis-category-number">{number}</span>
              <div className="analysis-category-icon" aria-hidden="true">
                <Icon size={20} strokeWidth={1.8} />
              </div>
              <h3 className="analysis-category-title">{title}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
