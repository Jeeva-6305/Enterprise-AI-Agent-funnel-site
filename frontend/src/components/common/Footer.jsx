import React from 'react';
import BrandLogo from './BrandLogo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="screenshot-footer">
      <div className="container screenshot-footer-container">
        {/* Main Footer Columns */}
        <div className="footer-main-grid">
          {/* Brand Col */}
          <div className="footer-brand-col">
            <div className="footer-brand-header">
              <BrandLogo size={32} />
              <span className="footer-brand-name">Adople AI</span>
            </div>
            <p className="footer-brand-desc">
              SEC-Mind empowers financial analysts, investors, and executives to transform complex 10-K and 10-Q disclosures into structured, queryable intelligence with cited references.
            </p>
            <div className="footer-security-badge">
              <span className="footer-security-dot" aria-hidden="true">•</span>
              <span>Enterprise-Grade Data Security</span>
            </div>
          </div>

          {/* Product Links */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">Platform</h4>
            <ul className="footer-links-list">
              <li><a href="#lead-form-section">Watch a Demo</a></li>
              <li><a href="#categories-title">10 Intelligence Categories</a></li>
              <li><a href="#interactive-qa-title">Filing Q&amp;A Engine</a></li>
              <li><a href="#workflow-title">Multi-Agent Workflow</a></li>
              <li><a href="#faq-section-title">Frequently Asked Questions</a></li>
            </ul>
          </div>

          {/* Who It's For */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">Who It's For</h4>
            <ul className="footer-links-list">
              <li><a href="#who-its-for-title">Financial Analysts</a></li>
              <li><a href="#who-its-for-title">Institutional Investors</a></li>
              <li><a href="#who-its-for-title">Auditors &amp; Accounting</a></li>
              <li><a href="#who-its-for-title">Executive Leadership</a></li>
            </ul>
          </div>

          {/* Coverage & Filings */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">Filing Coverage</h4>
            <ul className="footer-links-list">
              <li><span>SEC EDGAR Live Ingestion</span></li>
              <li><span>Form 10-K (Annual Disclosures)</span></li>
              <li><span>Form 10-Q (Quarterly Reports)</span></li>
              <li><span>Direct Source Grounding</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <p className="footer-copyright">
            &copy; {currentYear} Adople AI. All rights reserved.
          </p>
          <div className="footer-bottom-links">
            <a href="#privacy">Privacy Policy</a>
            <span className="footer-separator" aria-hidden="true">•</span>
            <a href="#terms">Terms of Service</a>
            <span className="footer-separator" aria-hidden="true">•</span>
            <a href="#security">Security Notice</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
