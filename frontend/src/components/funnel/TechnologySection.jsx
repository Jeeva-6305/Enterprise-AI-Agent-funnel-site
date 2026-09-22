import React, { useEffect, useRef, useState } from 'react';
import {
  Braces,
  Database,
  FileCode2,
  FileText,
  Gauge,
  GitBranch,
  KeyRound,
  Layers3,
  LockKeyhole,
  Network,
  Server,
  ShieldCheck,
  TimerReset
} from 'lucide-react';

const technologies = [
  {
    category: 'FRONTEND',
    title: 'React / Vite / MUI',
    description: 'Provides the modern web interface through which users interact with SEC-Mind and its financial analysis results.',
    icon: Layers3
  },
  {
    category: 'API',
    title: 'FastAPI',
    description: 'Acts as the API gateway connecting the frontend with SEC-Mind\'s backend analysis workflow.',
    icon: Gauge
  },
  {
    category: 'AI ORCHESTRATION',
    title: 'LangGraph / Multi-Agent Workflow',
    description: 'Orchestrates the specialized AI workflow that processes queries, retrieves filing data, summarizes information, formats results, and manages analysis state.',
    icon: Network,
    core: true
  },
  {
    category: 'STORAGE',
    title: 'PostgreSQL / MongoDB',
    description: 'Provides persistent storage for application data, session state, cached analysis outputs, and search history.',
    icon: Database
  },
  {
    category: 'DATA SOURCE',
    title: 'SEC EDGAR / External Data APIs',
    description: 'Provides the filing and financial data sources used by SEC-Mind during the analysis workflow.',
    icon: FileText
  }
];

const securityItems = [
  { label: 'Protected API Keys', icon: KeyRound },
  { label: 'Controlled CORS', icon: LockKeyhole },
  { label: 'Rate Limiting & Caching', icon: TimerReset }
];

export default function TechnologySection() {
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
    }, { threshold: 0.14 });

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`technology-section ${isVisible ? 'is-visible' : ''}`}
      aria-labelledby="technology-title"
    >
      <div className="container technology-container">
        <div className="technology-header">
          <div className="technology-eyebrow">TECHNOLOGY</div>
          <h2 id="technology-title" className="technology-title">Built on a Modern AI-Powered Architecture</h2>
          <p className="technology-subtitle">
            SEC-Mind combines a modern web interface, API-driven services, multi-agent workflow orchestration, persistent data storage, and SEC data sources to transform complex filings into structured financial intelligence.
          </p>
        </div>

        <div className="technology-flow" aria-label="SEC-Mind technology architecture flow">
          <div className="technology-flow-node technology-flow-user">
            <Braces size={17} aria-hidden="true" />
            <span>USER</span>
          </div>
          {technologies.slice(0, 2).map(({ category, title, icon: Icon }, index) => (
            <React.Fragment key={title}>
              <div className="technology-flow-connector" aria-hidden="true"><span /></div>
              <div className="technology-flow-node" style={{ '--technology-index': index }}>
                <Icon size={17} aria-hidden="true" />
                <span>{title}</span>
              </div>
            </React.Fragment>
          ))}
          <div className="technology-flow-connector" aria-hidden="true"><span /></div>
          <div className="technology-flow-node technology-flow-router">
            <Server size={17} aria-hidden="true" />
            <span>API Router &amp; Auth Middleware</span>
          </div>
        </div>

        <div className="technology-card-grid">
          {technologies.map(({ category, title, description, icon: Icon, core }, index) => (
            <article className={`technology-card ${core ? 'technology-card-core' : ''}`} key={title} style={{ '--technology-index': index }}>
              <div className="technology-card-topline">
                <span className="technology-category">{category}</span>
                {core && <span className="technology-core-label">CORE ENGINE</span>}
              </div>
              <div className="technology-icon" aria-hidden="true"><Icon size={21} /></div>
              <h3>{title}</h3>
              <p>{description}</p>
              {core && (
                <div className="technology-engine-flow" aria-label="Multi-agent engine stages">
                  <span>Subinput</span><span>Tools</span><span>Fetch</span><span>Summarize</span><span>Format</span><span>Storage</span>
                </div>
              )}
            </article>
          ))}
        </div>

        <div className="technology-source-connection" aria-hidden="true">
          <span>Multi-Agent Workflow Engine</span>
          <span className="technology-source-line" />
          <span>SEC EDGAR / External Data APIs</span>
        </div>

        <div className="technology-security">
          <div className="technology-security-heading">
            <ShieldCheck size={18} aria-hidden="true" />
            <strong>Designed for Secure, Controlled Data Access</strong>
          </div>
          <p>SEC-Mind&apos;s deployment guidance includes protecting API credentials, restricting production CORS origins, and using rate limiting and caching to manage API and SEC EDGAR usage.</p>
          <div className="technology-security-items">
            {securityItems.map(({ label, icon: Icon }) => <span key={label}><Icon size={14} aria-hidden="true" />{label}</span>)}
          </div>
        </div>
      </div>
    </section>
  );
}
