import React from 'react';
import BrandLogo from './BrandLogo';

export default function Footer() {
  return (
    <footer className="minimal-footer">
      <div className="container">
        {/* Top Row: Brand Logo + Compliance Badges */}
        <div className="minimal-footer-top">
          <div className="minimal-footer-brand">
            <BrandLogo size={30} />
            <span className="minimal-footer-brand-title">Adople AI</span>
          </div>

          <div className="minimal-footer-compliance">
            <span>CMMI Level 3 Dev &amp; SVC</span>
            <span className="compliance-dot">•</span>
            <span>ISO 9001, 20000, 27001</span>
            <span className="compliance-dot">•</span>
            <span>SOC 2 Type II</span>
            <span className="compliance-dot">•</span>
            <span>FedRAMP Ready</span>
          </div>
        </div>

        {/* Bottom Row: Copyright + Minimal Legal Links */}
        <div className="minimal-footer-bottom">
          <div className="minimal-footer-copyright">
            © 2026 Adople AI. All rights reserved. Serving organizations since 2016.
          </div>

          <div className="minimal-footer-links">
            <a href="#privacy" onClick={(e) => e.preventDefault()}>
              Privacy Policy
            </a>
            <a href="#terms" onClick={(e) => e.preventDefault()}>
              Terms of Service
            </a>
            <a href="#security" onClick={(e) => e.preventDefault()}>
              Security Architecture
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
