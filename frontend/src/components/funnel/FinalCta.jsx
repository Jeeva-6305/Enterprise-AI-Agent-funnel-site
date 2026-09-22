import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function FinalCta({ onRequestDemo }) {
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
    }, { threshold: 0.2 });

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`final-cta-section ${isVisible ? 'is-visible' : ''}`}
      aria-labelledby="final-cta-title"
    >
      <div className="container final-cta-container">
        <div className="final-cta-grid" aria-hidden="true">
          <span></span><span></span><span></span>
          <span></span><span></span><span></span>
        </div>
        <div className="final-cta-content">
          <div className="final-cta-eyebrow">READY TO EXPLORE SEC-MIND?</div>
          <h2 id="final-cta-title">Turn Complex SEC Filings Into Actionable Financial Intelligence</h2>
          <p>See how SEC-Mind transforms complex 10-K and 10-Q filings into structured analysis, interactive insights, and organized financial intelligence.</p>

          <button type="button" className="final-cta-button" onClick={onRequestDemo}>
            <span>Request a Demo</span>
            <ArrowUpRight size={18} strokeWidth={2.4} />
          </button>
          <span className="final-cta-microcopy">Explore SEC-Mind with your own filing analysis workflow.</span>
        </div>
      </div>
    </section>
  );
}
