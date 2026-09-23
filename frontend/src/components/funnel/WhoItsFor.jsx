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
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // 3-second automatic switching sequence for the 4 points
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTab((prevTab) => (prevTab + 1) % audiences.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [activeTab]);

  const activeAudience = audiences[activeTab];
  const ActiveIcon = activeAudience.icon;

  return (
    <section
      ref={sectionRef}
      className={`who-its-for-section ${isVisible ? 'is-visible' : ''}`}
      aria-labelledby="who-its-for-title"
    >
      <div className="container who-its-for-container">
        <div className="who-its-for-header">
          <div className="who-its-for-eyebrow">
            <span className="who-its-for-eyebrow-dot" aria-hidden="true">•</span>
            <span>WHO IT'S FOR</span>
          </div>
          <h2 id="who-its-for-title" className="who-its-for-title">
            Built for teams that work with financial intelligence.
          </h2>
          <p className="who-its-for-subtitle">
            SEC-Mind helps financial professionals transform complex SEC filings into structured, queryable, and actionable financial intelligence.
          </p>
        </div>

        <div className="who-its-for-tabs-wrapper">
          {/* Left: Vertical Persona Tabs */}
          <div className="who-its-for-tab-list" role="tablist" aria-label="Who It's For Personas">
            {audiences.map((audience, index) => {
              const isActive = index === activeTab;
              return (
                <button
                  type="button"
                  key={audience.number}
                  role="tab"
                  id={`who-tab-${audience.number}`}
                  aria-selected={isActive}
                  aria-controls={`who-panel-${audience.number}`}
                  tabIndex={isActive ? 0 : -1}
                  className={`who-its-for-tab-btn ${isActive ? 'is-active' : ''}`}
                  onClick={() => setActiveTab(index)}
                >
                  <span className="who-its-for-tab-number">{audience.number}</span>
                  <span className="who-its-for-tab-label">{audience.title}</span>
                </button>
              );
            })}
          </div>

          {/* Right: Active Persona Detail Card */}
          <div
            className="who-its-for-tab-panel"
            role="tabpanel"
            id={`who-panel-${activeAudience.number}`}
            aria-labelledby={`who-tab-${activeAudience.number}`}
            key={activeAudience.number}
          >
            <div className="who-its-for-panel-icon" aria-hidden="true">
              <ActiveIcon size={22} strokeWidth={1.8} />
            </div>

            <h3 className="who-its-for-panel-title">{activeAudience.title}</h3>

            <p className="who-its-for-panel-description">
              {activeAudience.description}
            </p>

            <div className="who-its-for-panel-tags" aria-label={`${activeAudience.title} capabilities`}>
              {activeAudience.capabilities.map((cap) => (
                <span key={cap} className="who-its-for-panel-tag">
                  {cap}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
