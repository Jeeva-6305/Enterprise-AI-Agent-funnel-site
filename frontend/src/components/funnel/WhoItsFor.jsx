import React, { useEffect, useRef, useState } from 'react';
import {
  BarChart3,
  BriefcaseBusiness,
  ClipboardCheck,
  Search
} from 'lucide-react';

const audiences = [
  {
    number: '01',
    title: 'Financial Analysts',
    description: 'Analyze complex SEC filings faster by turning lengthy financial disclosures into structured insights, summaries, and key metrics.',
    icon: BarChart3,
    capabilities: ['Financial Insights', 'Key Metrics', 'Filing Q&A', 'Analysis Reports']
  },
  {
    number: '02',
    title: 'Investors',
    description: 'Explore company filings through organized analysis of business operations, risks, financial performance, and other key disclosures.',
    icon: Search,
    capabilities: ['Business Analysis', 'Risk Factors', 'Financial Data', 'Filing Q&A']
  },
  {
    number: '03',
    title: 'Auditors',
    description: 'Navigate detailed SEC disclosures with structured access to financial statements, controls, procedures, audit disclosures, and supporting filing information.',
    icon: ClipboardCheck,
    capabilities: ['Financial Statements', 'Controls', 'Audit Disclosures', 'Financial Footnotes']
  },
  {
    number: '04',
    title: 'Executive Teams',
    description: 'Get organized financial intelligence from lengthy SEC filings to support faster access to important business, financial, risk, and governance information.',
    icon: BriefcaseBusiness,
    capabilities: ['Business Insights', 'Risk Analysis', 'Governance', 'Executive Compensation']
  }
];

export default function WhoItsFor() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.16 });

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`who-its-for-section ${isVisible ? 'is-visible' : ''}`}
      aria-labelledby="who-its-for-title"
    >
      <div className="container who-its-for-container">
        <div className="who-its-for-header">
          <div className="who-its-for-eyebrow">WHO IT&apos;S FOR</div>
          <h2 id="who-its-for-title" className="who-its-for-title">
            Built for Teams That Work With Financial Intelligence
          </h2>
          <p className="who-its-for-subtitle">
            SEC-Mind helps financial professionals transform complex SEC filings into structured, queryable, and actionable financial intelligence.
          </p>
        </div>

        <div className="who-its-for-grid">
          {audiences.map(({ number, title, description, icon: Icon, capabilities }, index) => (
            <article className="who-its-for-card" key={title} style={{ '--audience-index': index }}>
              <div className="who-its-for-card-topline">
                <span className="who-its-for-number">{number}</span>
                <div className="who-its-for-icon" aria-hidden="true">
                  <Icon size={21} strokeWidth={1.8} />
                </div>
              </div>
              <h3>{title}</h3>
              <p>{description}</p>
              <div className="who-its-for-tags" aria-label={`${title} capabilities`}>
                {capabilities.map((capability) => <span key={capability}>{capability}</span>)}
              </div>
            </article>
          ))}
        </div>

        <div className="who-its-for-message">
          <strong>One Platform. Different Perspectives on the Same Filing.</strong>
          <span>Whether you&apos;re analyzing financial performance, reviewing disclosures, examining risks, or accessing executive-level insights, SEC-Mind organizes complex SEC filings into a more usable format.</span>
        </div>
      </div>
    </section>
  );
}
