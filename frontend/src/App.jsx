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
        {/* 1. Hero Section (Left: Content, Right: Lead Form) */}
        <section className="hero-section">
          <div className="container">
            <div className="hero-grid">
              {/* Left Column: Hero Content & 4 Checkmarks */}
              <FunnelHero />

              {/* Right Column: Lead Form Card */}
              <div className="hero-form-card" id="lead-form-section">
                <LeadForm 
                  onSuccessLead={handleLeadSuccess} 
                  showToast={showToast} 
                />
              </div>
            </div>
          </div>
        </section>

        {/* 2. Section Below Hero (Left: Purpose-Built, Right: Demo Video - Equal Width & Height) */}
        <section className="below-hero-section">
          <div className="container">
            <div className="below-hero-grid">
              {/* Left Column: Purpose-Built for This Problem */}
              <div className="below-hero-col">
                <PainPointsCard />
              </div>

              {/* Right Column: Demo Video Preview Card */}
              <div className="below-hero-col">
                <div className="demo-video-card-container">
                  <VideoPlayer 
                    isUnlocked={isDemoUnlocked} 
                    onPlayClick={handleAccessDemo} 
                  />
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


