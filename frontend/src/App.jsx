import React, { useState } from 'react';
import Navbar from './components/common/Navbar';
import AnnouncementBar from './components/common/AnnouncementBar';
import TrustBar from './components/common/TrustBar';
import Footer from './components/common/Footer';
import Toast from './components/common/Toast';
import FunnelHero from './components/funnel/FunnelHero';
import VideoPlayer from './components/funnel/VideoPlayer';
import LeadForm from './components/funnel/LeadForm';
import PainPointsCard from './components/funnel/PainPointsCard';
import HowSecMindWorks from './components/funnel/HowSecMindWorks';
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
   * Video & "Get a Demo" trigger handler:
   * - If unlocked: opens video player modal directly.
   * - If locked: prompts user to complete lead form and scrolls to form.
   */
  const handleAccessDemo = () => {
    if (isDemoUnlocked) {
      setIsVideoModalOpen(true);
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
        {/* 1. Hero Section */}
        <section className="screenshot-hero-section">
          <div className="container">
            <FunnelHero onCtaClick={handleAccessDemo} />
          </div>
        </section>

        {/* 2. Video Section and Lead Form */}
        <section className="screenshot-demo-form-section" id="lead-form-section">
          <div className="container">
            <div className="screenshot-action-split-grid">
              {/* Left Column: Video Box */}
              <div className="screenshot-split-left">
                <VideoPlayer 
                  isUnlocked={isDemoUnlocked} 
                  onPlayClick={handleAccessDemo} 
                />
              </div>

              {/* Right Column: Lead Form Card */}
              <div className="screenshot-split-right">
                <LeadForm 
                  onSuccessLead={handleLeadSuccess} 
                  showToast={showToast} 
                />
              </div>
            </div>
          </div>
        </section>

        {/* 3. Problem Section */}
        <section className="screenshot-problems-section">
          <PainPointsCard />
        </section>

        {/* 4. SEC-Mind Workflow Section */}
        <HowSecMindWorks />

        {/* 5. Analysis Categories Section */}
        <AnalysisCategories />

        {/* 6. Interactive Q&A Section */}
        <InteractiveQa />

        {/* 7. Multi-Agent Workflow Section */}
        <MultiAgentWorkflow />

        {/* 8. Who It's For Section */}
        <WhoItsFor />

        {/* 9. Final CTA Section */}
        <FinalCta onRequestDemo={handleAccessDemo} />

      </main>

      {/* Footer with Centered Brand */}
      <Footer />

      {/* Success Modal */}
      <SuccessModal
        lead={submittedLead}
        onClose={() => setSubmittedLead(null)}
        onOpenVideo={() => {
          setSubmittedLead(null);
          setIsVideoModalOpen(true);
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


