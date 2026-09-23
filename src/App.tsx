import React, { useState, useEffect } from 'react';
import './styles/global.css';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CustomerLogos } from './components/CustomerLogos';
import { ProblemSolution } from './components/ProblemSolution';
import { AgenticLoop } from './components/AgenticLoop';
import { InteractiveDashboardDemo } from './components/InteractiveDashboardDemo';
import { ConnectorsGrid } from './components/ConnectorsGrid';
import { EnterpriseSecurity } from './components/EnterpriseSecurity';
import { FinalCTABanner } from './components/FinalCTABanner';
import { Footer } from './components/Footer';
import { LeadModal } from './components/LeadModal';

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
        {/* Trusted By / Partnership Logos Carousel */}
        <CustomerLogos />

        {/* Stage 1: AWARENESS - Capture attention with problem + solution */}
        <Hero onOpenForm={openForm} isUnlocked={isUnlocked} />

        {/* Stage 2: CONSIDERATION - Show how it works & demonstrate value */}
        <ProblemSolution />
        <AgenticLoop />
        <InteractiveDashboardDemo />
        <ConnectorsGrid />

        {/* Stage 3: DECISION - Build trust & address concerns */}
        <EnterpriseSecurity />

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
