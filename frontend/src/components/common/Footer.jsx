import React from 'react';
import BrandLogo from './BrandLogo';
import { ShieldCheck, Lock, CheckCircle2, Mail, Sparkles } from 'lucide-react';

export default function Footer({ onGetDemoClick }) {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="funnel-footer">
      <div className="container">
        {/* Main Footer Multi-Column Grid */}
        <div className="footer-main-grid">
          {/* Column 1: Brand & Enterprise Security Mission */}
          <div className="footer-col footer-brand-col">
            <div className="footer-brand-header">
              <BrandLogo size={34} />
              <span className="footer-brand-title">Adople AI</span>
            </div>
            <p className="footer-brand-desc">
              Empowering commercial enterprises with governed, multi-agent AI intelligence that connects scattered documents, systems, and teams into one unified brain.
            </p>
            
            {/* Enterprise Security Pill Badges */}
            <div className="footer-compliance-pills">
              <span className="compliance-pill">
                <ShieldCheck size={14} className="pill-icon" />
                <span>SOC 2 Type II Ready</span>
              </span>
              <span className="compliance-pill">
                <Lock size={13} className="pill-icon" />
                <span>ISO 27001 Ready</span>
              </span>
              <span className="compliance-pill">
                <CheckCircle2 size={13} className="pill-icon" />
                <span>GDPR &amp; HIPAA Compliant</span>
              </span>
            </div>
          </div>

          {/* Column 2: Platform Capabilities */}
          <div className="footer-col">
            <h4 className="footer-col-title">Platform</h4>
            <ul className="footer-nav-list">
              <li>
                <button type="button" onClick={() => scrollToSection('what-it-does')} className="footer-link-btn">
                  Unified Search &amp; Retrieval
                </button>
              </li>
              <li>
                <button type="button" onClick={() => scrollToSection('what-it-does')} className="footer-link-btn">
                  Any-LLM Architecture
                </button>
              </li>
              <li>
                <button type="button" onClick={() => scrollToSection('purpose-built-section')} className="footer-link-btn">
                  Permission-Governed AI
                </button>
              </li>
              <li>
                <button type="button" onClick={() => scrollToSection('purpose-built-section')} className="footer-link-btn">
                  Hybrid / On-Prem Deployment
                </button>
              </li>
              <li>
                <button type="button" onClick={() => scrollToSection('what-it-does')} className="footer-link-btn">
                  Enterprise Data Connectors
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Solutions & Use Cases */}
          <div className="footer-col">
            <h4 className="footer-col-title">Solutions</h4>
            <ul className="footer-nav-list">
              <li>
                <button type="button" onClick={() => scrollToSection('use-cases')} className="footer-link-btn">
                  Engineering &amp; IT Knowledge
                </button>
              </li>
              <li>
                <button type="button" onClick={() => scrollToSection('use-cases')} className="footer-link-btn">
                  Legal &amp; Compliance Audit
                </button>
              </li>
              <li>
                <button type="button" onClick={() => scrollToSection('use-cases')} className="footer-link-btn">
                  Financial Data &amp; Reporting
                </button>
              </li>
              <li>
                <button type="button" onClick={() => scrollToSection('use-cases')} className="footer-link-btn">
                  Cross-App Operations
                </button>
              </li>
              <li>
                <button type="button" onClick={() => scrollToSection('use-cases')} className="footer-link-btn">
                  Executive Decision Support
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Get Started & Engagement */}
          <div className="footer-col footer-action-col">
            <h4 className="footer-col-title">Get Started</h4>
            <p className="footer-action-text">
              Transform your unstructured enterprise data into instant, confident decisions.
            </p>
            {onGetDemoClick && (
              <button 
                type="button" 
                className="footer-cta-btn"
                onClick={onGetDemoClick}
                id="footer-btn-get-demo"
              >
                <Sparkles size={15} />
                <span>Watch Demo</span>
              </button>
            )}
            <div className="footer-contact-item">
              <Mail size={14} className="contact-icon" />
              <a href="mailto:contact@adople.ai" className="footer-contact-link">
                contact@adople.ai
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Sub-Footer Bar */}
        <div className="footer-bottom-bar">
          <div className="footer-bottom-copy">
            &copy; {new Date().getFullYear()} Adople AI Technologies Inc. All rights reserved.
          </div>
          <div className="footer-bottom-links">
            <span className="footer-bottom-link">Privacy Policy</span>
            <span className="footer-bottom-divider">&bull;</span>
            <span className="footer-bottom-link">Terms of Service</span>
            <span className="footer-bottom-divider">&bull;</span>
            <span className="footer-bottom-link">Security &amp; Governance</span>
            <span className="footer-bottom-divider">&bull;</span>
            <span className="footer-bottom-link">System Status</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
