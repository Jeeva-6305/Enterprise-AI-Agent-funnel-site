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
import WhyChooseSection from './components/funnel/WhyChooseSection';
import HowItWorksSection from './components/funnel/HowItWorksSection';
import TrustSection from './components/funnel/TrustSection';
import FaqSection from './components/funnel/FaqSection';
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
    setSubmittedLead(null);
    setIsVideoModalOpen(true);
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

        {/* 2. Main 2-Column Section: Left (Lead Form), Right (Demo Video Player) */}
        <section className="hero-action-section">
          <div className="container">
            <div className="action-grid">
              {/* Left Column: Form */}
              <div className="action-left-col" id="lead-form-section">
                <div className="form-card-wrapper">
                  <LeadForm 
                    onSuccessLead={handleLeadSuccess} 
                    showToast={showToast} 
                  />
                </div>
              </div>

              {/* Right Column: Demo Video Player */}
              <div className="action-right-col" id="demo-video-section">
                <div className="video-card-wrapper">
                  <VideoPlayer 
                    isUnlocked={isDemoUnlocked} 
                    onPlayClick={handleAccessDemo} 
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Purpose-Built Section (Horizontal 3-Card Grid below Form + Video) */}
        <section className="purpose-built-standalone-section">
          <div className="container">
            <PainPointsCard />
          </div>
        </section>

        {/* 4. Why Teams Choose Adople AI — Asymmetric Bento Grid */}
        <section className="why-choose-standalone-section">
          <div className="container">
            <WhyChooseSection />
          </div>
        </section>

        {/* 5. How It Works — Horizontal Step Timeline */}
        <section className="hiw-standalone-section">
          <div className="container">
            <HowItWorksSection />
          </div>
        </section>

        {/* 6. Responsible AI, Security & Trust */}
        <section className="trust-standalone-section">
          <div className="container">
            <TrustSection />
          </div>
        </section>

        {/* 7. Common Questions (FAQ Section) */}
        <section className="faq-standalone-section">
          <div className="container">
            <FaqSection />
          </div>
        </section>
      </main>

      {/* Product-Specific Enterprise Footer */}
      <Footer onGetDemoClick={handleAccessDemo} />

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
