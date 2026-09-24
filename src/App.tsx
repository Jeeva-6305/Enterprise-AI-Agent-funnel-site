import React, { useState, useEffect } from 'react';
import './styles/global.css';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CustomerLogos } from './components/CustomerLogos';
import { ProblemSolution } from './components/ProblemSolution';
import { AgenticLoop } from './components/AgenticLoop';
import { InteractiveDashboardDemo } from './components/InteractiveDashboardDemo';
import { EnterpriseSecurity } from './components/EnterpriseSecurity';
import { FinalCTABanner } from './components/FinalCTABanner';
import { Footer } from './components/Footer';
import { LeadModal } from './components/LeadModal';
import { GatedVideoPlayer } from './components/GatedVideoPlayer';

export const App: React.FC = () => {
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [showMobileCTA, setShowMobileCTA] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem('adople_demo_access_token');
    if (token) setIsUnlocked(true);

    // Mobile sticky CTA visibility on scroll
    const handleScroll = () => {
      const scrolled = window.scrollY > 600; // Show after scrolling past hero
      setShowMobileCTA(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleUnlockSuccess = (_token: string) => {
    setIsUnlocked(true);
    setIsFormOpen(false);
  };

  const openForm = () => setIsFormOpen(true);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header onOpenForm={openForm} isUnlocked={isUnlocked} />

      <main style={{ flex: 1 }}>
        {/* Trusted By / Partnership Logos — sits directly above Hero */}
        <CustomerLogos />

        {/* Stage 1: AWARENESS — Hero fills remaining viewport */}
        <Hero onOpenForm={openForm} isUnlocked={isUnlocked} onUnlockSuccess={handleUnlockSuccess} />

        {/* 3 Product Dashboard Review — above the demo video */}
        <InteractiveDashboardDemo />


        {/* Stage 2: CONSIDERATION - Show how it works & demonstrate value */}
        <ProblemSolution />
        <AgenticLoop />

        {/* Stage 3: DECISION - Build trust & address concerns */}
        <EnterpriseSecurity />

        {/* Demo Video Section — Centered Single Column matching screenshot */}
        <section
          id="demo-video-section"
          style={{
            backgroundColor: 'var(--bg-surface)',
            backgroundImage: `
              linear-gradient(to right, rgba(43, 45, 110, 0.04) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(43, 45, 110, 0.04) 1px, transparent 1px)
            `,
            backgroundSize: '32px 32px',
            padding: 'clamp(3rem, 6vw, 4.5rem) 0',
            position: 'relative',
            overflow: 'hidden',
            borderBottom: '1px solid var(--border-default)'
          }}
        >
          <div className="container">

            {/* Section header */}
            <div
              style={{
                textAlign: 'center',
                maxWidth: '680px',
                margin: '0 auto clamp(1.75rem, 3.5vw, 2.5rem) auto',
                padding: '0 1rem'
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  background: 'rgba(43, 45, 110, 0.08)',
                  border: '1px solid rgba(43, 45, 110, 0.22)',
                  color: 'var(--brand)',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  padding: '0.3rem 1.05rem',
                  borderRadius: '9999px',
                  marginBottom: '0.75rem'
                }}
              >
                PRODUCT DEMO
              </span>
              <h2
                style={{
                  fontSize: 'clamp(1.6rem, 3.5vw, 2.35rem)',
                  fontWeight: 800,
                  color: 'var(--text-heading)',
                  marginBottom: '0.65rem',
                  lineHeight: 1.2,
                  letterSpacing: '-0.02em'
                }}
              >
                Watch the 5-Minute Product Demo
              </h2>
              <p
                style={{
                  fontSize: 'clamp(0.9rem, 1.6vw, 1.025rem)',
                  color: 'var(--text-muted)',
                  lineHeight: 1.6,
                  maxWidth: '580px',
                  margin: '0 auto'
                }}
              >
                See how Adople Agentic Data Analyst answers questions, generates live charts, and self-verifies data in real time.
              </p>
            </div>

            {/* Centered Video Card */}
            <div style={{ maxWidth: '840px', margin: '0 auto' }}>
              <GatedVideoPlayer isUnlocked={isUnlocked} onOpenForm={openForm} />
            </div>
          </div>
        </section>

        {/* Stage 4: ACTION - Convert with final CTA */}
        <FinalCTABanner onOpenForm={openForm} />
      </main>

      <Footer onOpenForm={openForm} />

      <LeadModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSuccess={handleUnlockSuccess}
      />

      {/* Mobile Sticky CTA */}
      <div className={`mobile-sticky-cta ${!showMobileCTA ? 'hidden' : ''}`}>
        <button onClick={openForm} className="btn-primary">
          {isUnlocked ? 'Watch Full Demo' : 'Get Free Demo Access'}
        </button>
      </div>
    </div>
  );
};

export default App;
