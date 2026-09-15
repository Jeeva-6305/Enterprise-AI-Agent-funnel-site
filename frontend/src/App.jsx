import React, { useState } from 'react';
import Navbar from './components/common/Navbar';
import AnnouncementBar from './components/common/AnnouncementBar';
import TrustBar from './components/common/TrustBar';
import Footer from './components/common/Footer';
import Toast from './components/common/Toast';
import FunnelHero from './components/funnel/FunnelHero';
import VideoPlayer from './components/funnel/VideoPlayer';
import PainPointsCard from './components/funnel/PainPointsCard';
import LeadFormModal from './components/funnel/LeadFormModal';
import SuccessModal from './components/funnel/SuccessModal';
import VideoModal from './components/funnel/VideoModal';

import './styles/global.css';
import './styles/funnel.css';

export default function App() {
  const [submittedLead, setSubmittedLead] = useState(null);
  const [isDemoUnlocked, setIsDemoUnlocked] = useState(false);
  const [isLeadFormModalOpen, setIsLeadFormModalOpen] = useState(false);
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
   * Video-gating handler:
   * When user clicks video/play button:
   * - If locked: opens lead capture form modal.
   * - If unlocked: opens video player modal.
   */
  const handleVideoCardClick = () => {
    if (isDemoUnlocked) {
      setIsVideoModalOpen(true);
    } else {
      setIsLeadFormModalOpen(true);
    }
  };

  /**
   * Called only after successful form submission and SQL persistence:
   * Unlocks demo, closes form modal, and displays unlocked confirmation / video.
   */
  const handleLeadSuccess = (lead) => {
    setIsDemoUnlocked(true);
    setIsLeadFormModalOpen(false);
    setSubmittedLead(lead);
  };

  return (
    <div className="app-root">
      {/* Top Global Navigation */}
      <Navbar />

      {/* Announcement Ribbon */}
      <AnnouncementBar />

      {/* Enterprise Moving Logo Carousel */}
      <TrustBar />

      {/* Main Hero Funnel Section */}
      <main className="hero-section">
        <div className="container">
          <div className="hero-grid">
            {/* Left Column: Eyebrow, Headline, Subtext, Checklist */}
            <FunnelHero />

            {/* Right Column: Hero Video Preview Player with balanced height */}
            <div className="hero-video-card">
              <VideoPlayer 
                isUnlocked={isDemoUnlocked} 
                onPlayClick={handleVideoCardClick} 
              />
            </div>
          </div>

          {/* Purpose-Built for This Problem - Wide Horizontal Section */}
          <PainPointsCard />
        </div>
      </main>

      {/* Footer with Credentials */}
      <Footer />

      {/* Lead Capture Modal triggered by clicking the Video / Play button */}
      <LeadFormModal
        isOpen={isLeadFormModalOpen}
        onClose={() => setIsLeadFormModalOpen(false)}
        onSuccessLead={handleLeadSuccess}
        showToast={showToast}
      />

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

