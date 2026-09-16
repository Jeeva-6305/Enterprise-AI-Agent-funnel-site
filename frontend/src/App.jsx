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
      <main className="funnel-main-content">
        {/* 1. Centered Hero Header Section (Ambient Glow & Centered Typography) */}
        <section className="hero-header-section">
          <div className="container">
            <FunnelHero />
          </div>
        </section>

        {/* 2. Main 2-Column Section: Left (Purpose-Built), Right (Video + Lead Form) */}
        <section className="hero-action-section">
          <div className="container">
            <div className="action-grid">
              {/* Left Column: Purpose-Built for This Problem (Equal Height with Right Column) */}
              <div className="action-left-col">
                <PainPointsCard />
              </div>

              {/* Right Column: Unified Card with Video seamlessly attached above Lead Form */}
              <div className="action-right-col" id="lead-form-section">
                <div className="unified-action-card">
                  {/* Demo Video Preview attached at top */}
                  <div className="attached-video-wrap">
                    <VideoPlayer 
                      isUnlocked={isDemoUnlocked} 
                      onPlayClick={handleAccessDemo} 
                    />
                  </div>

                  {/* Lead Form seamlessly attached below video */}
                  <div className="attached-form-wrap">
                    <LeadForm 
                      onSuccessLead={handleLeadSuccess} 
                      showToast={showToast} 
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer with Credentials - Kept exactly unchanged */}
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


