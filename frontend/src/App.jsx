import React, { useState, useEffect } from 'react';
import Navbar from './components/common/Navbar';
import AnnouncementBar from './components/common/AnnouncementBar';
import TrustBar from './components/common/TrustBar';
import Footer from './components/common/Footer';
import Toast from './components/common/Toast';
import FunnelHero from './components/funnel/FunnelHero';
import ChecklistPoints from './components/funnel/ChecklistPoints';
import VideoPlayer from './components/funnel/VideoPlayer';
import PainPointsCard from './components/funnel/PainPointsCard';
import AnalysisCategories from './components/funnel/AnalysisCategories';
import MultiAgentWorkflow from './components/funnel/MultiAgentWorkflow';
import WhoItsFor from './components/funnel/WhoItsFor';
import FinalCta from './components/funnel/FinalCta';
import InteractiveQa from './components/funnel/InteractiveQa';
import SuccessModal from './components/funnel/SuccessModal';
import VideoModal from './components/funnel/VideoModal';

import './styles/global.css';
import './styles/funnel.css';

export default function App() {
  const [submittedLead, setSubmittedLead] = useState(null);
  const [isDemoUnlocked, setIsDemoUnlocked] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const handleDismissToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  /**
   * Scroll Reveal Entrance Animations:
   * Observes landing page sections and adds .is-visible class when entering viewport.
   */
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    const sections = document.querySelectorAll(
      '.screenshot-problems-section, .analysis-categories-section, .interactive-qa-section, .demo-video-section'
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    sections.forEach((sec) => observer.observe(sec));

    return () => observer.disconnect();
  }, []);

  /**
   * Video & "Get a Demo" trigger handler:
   * - If unlocked: opens video player modal directly or scrolls to player.
   * - If locked: prompts user to complete lead form and scrolls to form.
   */
  const handleAccessDemo = () => {
    if (isDemoUnlocked) {
      const videoSection = document.getElementById('demo-video-section');
      if (videoSection) {
        videoSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        setIsVideoModalOpen(true);
      }
    } else {
      showToast('The demo video is locked. Please fill in and submit the form to unlock and watch.', 'info');
      const formInput = document.getElementById('input-full-name');
      if (formInput) {
        formInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => {
          formInput.focus();
        }, 400);
      }
    }
  };

  /**
   * Called only after successful form submission and SQL persistence
   */
  const handleLeadSuccess = (lead) => {
    setIsDemoUnlocked(true);
    setSubmittedLead(lead);
  };

  return (
    <div className="app-root">
      {/* Top Global Navigation with Brand & "Get a Demo" Button */}
      <Navbar onGetDemoClick={handleAccessDemo} />

      {/* Announcement Ribbon */}
      <AnnouncementBar />

      {/* Enterprise Moving Logo Carousel */}
      <TrustBar />

      {/* Main Funnel Page Content */}
      <main className="screenshot-template-root">
        {/* 1. Hero Section (Left Headline/CTAs | Right Lead Form matching Screenshot 1) */}
        <section className="screenshot-hero-section">
          <div className="container">
            <FunnelHero 
              onCtaClick={handleAccessDemo} 
              onSuccessLead={handleLeadSuccess} 
              showToast={showToast} 
            />
          </div>
        </section>

        {/* 2. Problem Section */}
        <section className="screenshot-problems-section">
          <PainPointsCard />
        </section>

        {/* 4. Analysis Categories Section */}
        <AnalysisCategories />

        {/* 5. Interactive Q&A Section */}
        <InteractiveQa />

        {/* 6. Multi-Agent Workflow Section */}
        <MultiAgentWorkflow />

        {/* 7. Who It's For Section */}
        <WhoItsFor />

        {/* 8. Demo Video Section directly above Final CTA matching Screenshot 2 */}
        <section className="demo-video-section" id="demo-video-section">
          <div className="container">
            <div className="demo-section-header">
              <span className="demo-section-badge">PLATFORM DEMO</span>
              <h2 className="demo-section-title">See SEC-Mind in Action</h2>
              <p className="demo-section-subtitle">
                Watch how SEC-Mind analyzes 10-K and 10-Q filings with live source grounding and automated multi-agent synthesis.
              </p>
            </div>

            <div className="demo-video-card-wrapper">
              <VideoPlayer 
                isUnlocked={isDemoUnlocked} 
                onPlayClick={handleAccessDemo} 
              />
            </div>
          </div>
        </section>

        {/* 9. Final CTA Section */}
        <FinalCta onRequestDemo={handleAccessDemo} />

      </main>

      {/* Footer */}
      <Footer />

      {/* Success Modal */}
      <SuccessModal
        lead={submittedLead}
        onClose={() => setSubmittedLead(null)}
        onOpenVideo={() => {
          setSubmittedLead(null);
          const videoSection = document.getElementById('demo-video-section');
          if (videoSection) {
            videoSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
          } else {
            setIsVideoModalOpen(true);
          }
        }}
      />

      {/* Video player modal is ONLY opened when unlocked */}
      <VideoModal
        isOpen={isVideoModalOpen && isDemoUnlocked}
        onClose={() => setIsVideoModalOpen(false)}
      />

      {/* Global Toast System */}
      <Toast toasts={toasts} onDismiss={handleDismissToast} />
    </div>
  );
}
