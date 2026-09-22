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
    title: 'SUBINPUT PROCESSING',
    description: 'Understands the user’s query, identifies the requested company or ticker, and breaks complex questions into targeted sub-questions.',
    icon: Search
  },
  {
    number: '02',
    title: 'TOOL EXECUTION',
    description: 'Selects and orchestrates the appropriate SEC tools, financial web tools, and internal utilities based on the analysis requirements.',
    icon: Wrench
  },
  {
    number: '03',
    title: 'DATA FETCHING',
    description: 'Retrieves the relevant SEC filings, SEC EDGAR sections, and financial data needed for the analysis.',
    icon: Database
  },
  {
    number: '04',
    title: 'SUMMARIZATION',
    description: 'Transforms lengthy SEC filing content into concise financial summaries and quantitative highlights.',
    icon: FileText
  },
  {
    number: '05',
    title: 'FORMATTING',
    description: 'Structures the generated analysis into a standardized format so the results can be presented clearly in the application.',
    icon: PanelsTopLeft
  },
  {
    number: '06',
    title: 'STORAGE',
    description: 'Manages session state, caches analysis outputs, and preserves search history for future access.',
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
      className={`multi-agent-workflow-section ${isVisible ? 'is-visible' : ''}`}
      aria-labelledby="multi-agent-workflow-title"
    >
      <div className="container multi-agent-workflow-container">
        <div className="multi-agent-workflow-header">
          <div className="multi-agent-workflow-eyebrow">08 ─ MULTI-AGENT WORKFLOW</div>
          <h2 id="multi-agent-workflow-title" className="multi-agent-workflow-title">
            One Intelligent Workflow. Multiple Specialized AI Agents.
          </h2>
          <p className="multi-agent-workflow-subtitle">
            SEC-Mind breaks complex SEC document analysis into a coordinated workflow of specialized AI agents, each responsible for a specific stage of the analysis process.
          </p>
        </div>

        <div className="multi-agent-workflow-message">
          <strong>From Question to Structured Financial Intelligence</strong>
          <span>Each specialized agent handles one part of the process, allowing SEC-Mind to transform complex SEC filings into organized, usable analysis.</span>
        </div>

        <div className="multi-agent-workflow-grid">
          {workflowStages.map(({ number, title, description, icon: Icon }, index) => (
            <React.Fragment key={number}>
              <article className="multi-agent-workflow-card" style={{ '--workflow-index': index }}>
                <div className="multi-agent-workflow-card-topline">
                  <span className="multi-agent-workflow-number">{number}</span>
                  <span className="multi-agent-workflow-status" aria-hidden="true"></span>
                </div>
                <div className="multi-agent-workflow-icon" aria-hidden="true">
                  <Icon size={20} strokeWidth={1.8} />
                </div>
                <h3 className="multi-agent-workflow-card-title">{title}</h3>
                <p className="multi-agent-workflow-card-description">{description}</p>
              </article>
              {index < workflowStages.length - 1 && <div className="multi-agent-workflow-connector" aria-hidden="true"></div>}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
