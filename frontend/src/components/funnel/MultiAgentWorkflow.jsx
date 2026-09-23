import React, { useEffect, useRef, useState } from 'react';
import {
  Search,
  Wrench,
  Database,
  FileText,
  PanelsTopLeft,
  Archive
} from 'lucide-react';

const workflowStages = [
  {
    number: '01',
    title: 'Processing of Sub-Inputs',
    description: 'Understands user’s query. Identifies requested company/ticker. Breaks down complicated questions into targeted sub questions.',
    icon: Search
  },
  {
    number: '02',
    title: 'Execute the Tool',
    description: 'Selects and arranges the correct tools — SEC data sources, financial tools or internal utilities based on query requirements.',
    icon: Wrench
  },
  {
    number: '03',
    title: 'Data Fetching',
    description: 'Pulls the relevant SEC filings, EDGAR sections, and financial data needed for analysis.',
    icon: Database
  },
  {
    number: '04',
    title: 'Summarization',
    description: 'Summarizes long filing language into short summaries and quantitative highlights.',
    icon: FileText
  },
  {
    number: '05',
    title: 'Formatting',
    description: 'Converts the output into a standard display format.',
    icon: PanelsTopLeft
  },
  {
    number: '06',
    title: 'Storage',
    description: 'Stores session state, analysis outputs and search history for future use.',
    icon: Archive
  }
];

export default function MultiAgentWorkflow() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

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

  return (
    <section
      ref={sectionRef}
      className={`multi-agent-workflow-section ${isVisible ? 'is-visible' : ''}`}
      aria-labelledby="multi-agent-workflow-title"
    >
      <div className="container multi-agent-workflow-container">
        <div className="multi-agent-workflow-header">
          <div className="multi-agent-workflow-eyebrow">MULTI-AGENT WORKFLOW</div>
          <h2 id="multi-agent-workflow-title" className="multi-agent-workflow-title">
            One Smart Workflow To Six AI Expert Agents
          </h2>
          <p className="multi-agent-workflow-subtitle">
            SEC Mind takes complex document analysis and breaks it down into a coordinated pipeline — each agent processes one stage, so nothing is missed and nothing is duplicated.
          </p>
        </div>

        <div className="multi-agent-timeline-wrap">
          {/* Connecting track line */}
          <div className="multi-agent-timeline-track" aria-hidden="true">
            <div className="multi-agent-timeline-track-progress"></div>
          </div>

          <div className="multi-agent-timeline-steps">
            {workflowStages.map(({ number, title, description, icon: Icon }, index) => (
              <div
                className="multi-agent-timeline-step"
                key={number}
                style={{ '--step-index': index }}
              >
                <div className="multi-agent-timeline-node-wrap">
                  <div className="multi-agent-timeline-node">
                    <span className="multi-agent-timeline-number">{number}</span>
                    <Icon className="multi-agent-timeline-icon" size={19} strokeWidth={2} aria-hidden="true" />
                  </div>
                </div>

                <div className="multi-agent-timeline-content">
                  <h3 className="multi-agent-timeline-title">{title}</h3>
                  <p className="multi-agent-timeline-description">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
