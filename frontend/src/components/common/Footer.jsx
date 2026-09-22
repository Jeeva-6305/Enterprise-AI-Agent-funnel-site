import React from 'react';
import BrandLogo from './BrandLogo';
import { Shield, Lock, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

export default function Footer({ onGetDemoClick }) {
  const handleAction = (e) => {
    e.preventDefault();
    if (onGetDemoClick) {
      onGetDemoClick();
    } else {
      const el = document.getElementById('lead-form-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="product-footer">
      {/* Pre-Footer Action Banner */}
      <div className="footer-cta-banner">
        <div className="container">
          <div className="footer-cta-card">
            <div className="footer-cta-content">
              <div className="footer-cta-badge">
                <Sparkles size={13} className="cta-badge-icon" />
                <span>30-Minute Live Assessment</span>
              </div>
              <h3 className="footer-cta-title">
                Ready to turn messy documents into clean, structured data?
              </h3>
              <p className="footer-cta-desc">
                Deploy Adople AI in your existing Azure or AWS environment in 2–4 weeks. Zero manual template setup required.
              </p>
            </div>
            <div className="footer-cta-action">
              <button
                type="button"
                className="footer-primary-btn"
                onClick={handleAction}
              >
                <span>Request a Demo</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Columns */}
      <div className="footer-main-section">
        <div className="container">
          <div className="footer-grid">
            {/* Column 1: Brand & Overview */}
            <div className="footer-col footer-col-brand">
              <div className="footer-brand-header">
                <BrandLogo size={32} />
                <span className="footer-brand-title">Adople AI</span>
              </div>
              <p className="footer-brand-tagline">
                Autonomous agentic document extraction platform. Read, classify, and extract data from unstructured faxes, scans, and PDFs with 99.4% field accuracy.
              </p>
              <div className="footer-security-badges">
                <div className="footer-sec-badge">
                  <Shield size={12} className="sec-icon" />
                  <span>HIPAA Compliant</span>
                </div>
                <div className="footer-sec-badge">
                  <Lock size={12} className="sec-icon" />
                  <span>SOC2 Type II Ready</span>
                </div>
                <div className="footer-sec-badge">
                  <CheckCircle2 size={12} className="sec-icon" />
                  <span>ISO 27001 Ready</span>
                </div>
              </div>
            </div>

            {/* Column 2: Platform Capabilities */}
            <div className="footer-col">
              <h4 className="footer-col-title">Capabilities</h4>
              <ul className="footer-links-list">
                <li><a href="#lead-form-section" onClick={handleAction}>Agentic OCR &amp; Extraction</a></li>
                <li><a href="#lead-form-section" onClick={handleAction}>Automated Classification</a></li>
                <li><a href="#lead-form-section" onClick={handleAction}>Human-in-the-Loop Review</a></li>
              </ul>
            </div>

            {/* Column 3: Solutions & Integrations */}
            <div className="footer-col">
              <h4 className="footer-col-title">Integrations &amp; Formats</h4>
              <ul className="footer-links-list">
                <li><a href="#lead-form-section" onClick={handleAction}>Epic FHIR &amp; Cerner EHR</a></li>
                <li><a href="#lead-form-section" onClick={handleAction}>RightFax &amp; Cloud Storage</a></li>
                <li><a href="#lead-form-section" onClick={handleAction}>PDFs, Scans &amp; Faxes</a></li>
              </ul>
            </div>

            {/* Column 4: Security & Compliance */}
            <div className="footer-col">
              <h4 className="footer-col-title">Security &amp; Architecture</h4>
              <ul className="footer-links-list">
                <li><a href="#lead-form-section" onClick={handleAction}>In-VPC Deployment (Azure / AWS)</a></li>
                <li><a href="#lead-form-section" onClick={handleAction}>HIPAA &amp; BAA Compliant</a></li>
                <li><a href="#lead-form-section" onClick={handleAction}>SOC2 Type II &amp; ISO 27001 Ready</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar: Legal, Status & Copyright */}
          <div className="footer-bottom-bar">
            <div className="footer-copyright">
              © {new Date().getFullYear()} Adople AI Inc. All rights reserved. Built for regulated healthcare and financial data.
            </div>
            <div className="footer-legal-links">
              <a href="#privacy" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
              <span className="legal-divider">•</span>
              <a href="#terms" onClick={(e) => e.preventDefault()}>Terms of Service</a>
              <span className="legal-divider">•</span>
              <a href="#security" onClick={(e) => e.preventDefault()}>Security Statement</a>
              <span className="legal-divider">•</span>
              <a href="#hipaa" onClick={(e) => e.preventDefault()}>HIPAA Compliance</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
