import React, { useState } from 'react';
import Navbar from './components/common/Navbar';
import AnnouncementBar from './components/common/AnnouncementBar';
import TrustBar from './components/common/TrustBar';
import Footer from './components/common/Footer';
import Toast from './components/common/Toast';
import FunnelHero from './components/funnel/FunnelHero';
import PainPointsCard from './components/funnel/PainPointsCard';
import LeadForm from './components/funnel/LeadForm';
import LeadFormModal from './components/funnel/LeadFormModal';
import SuccessModal from './components/funnel/SuccessModal';
import VideoModal from './components/funnel/VideoModal';
import WhatItDoes from './components/funnel/WhatItDoes';
import UseCases from './components/funnel/UseCases';
import { Check } from 'lucide-react';

import './styles/global.css';
import './styles/funnel.css';

export default function App() {
  const [submittedLead, setSubmittedLead] = useState(null);
  const [isDemoUnlocked, setIsDemoUnlocked] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  const bulletPoints = [
    'Get precise answers immediately without wading through hundreds of documents and tabs',
    'All your knowledge base in one place and always up to date',
    'Designed with enterprise-level security and control right from the start',
    'Quick to implement and easy to integrate into existing processes'
  ];

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
   * - If locked: scrolls to lead form on page or opens modal.
   */
  const handleAccessDemo = () => {
    if (isDemoUnlocked) {
      setIsVideoModalOpen(true);
    } else {
      const formInput = document.getElementById('input-full-name');
      if (formInput) {
        formInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => {
          formInput.focus();
        }, 400);
      } else {
        setIsLeadModalOpen(true);
      }
    }
  };

  const handleSeeHowItWorks = () => {
    const section = document.getElementById('purpose-built-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  /**
   * Called only after successful form submission and SQL persistence
   */
  const handleLeadSuccess = (lead) => {
    setIsDemoUnlocked(true);
    setIsLeadModalOpen(false);
    setSubmittedLead(lead);
  };

  return (
    <div className="app-root" data-theme="enterprise">
      {/* Top Global Navigation with Brand & "Get a Demo" Button */}
      <Navbar onGetDemoClick={handleAccessDemo} />

      {/* Announcement Ribbon */}
      <AnnouncementBar />

      {/* Enterprise Moving Logo Carousel */}
      <TrustBar />

      {/* Main Funnel Page Content */}
      <main className="funnel-main-content">
        {/* 1. Hero Section (Editorial 2-Column Grid: Headline & CTAs | Interactive Video Mockup Window) */}
        <section className="hero-section">
          <div className="container">
            <FunnelHero 
              onWatchDemo={handleAccessDemo}
              onSeeHowItWorks={handleSeeHowItWorks}
            />
          </div>
        </section>

        {/* 2. Bottlenecks / Pain Points Section */}
        <section className="pain-points-section">
          <div className="container">
            <PainPointsCard />
          </div>
        </section>

        {/* 3. Section: Left "Why Enterprise AI Agent?" (4 Value Points) | Right: Lead Form */}
        <section className="below-hero-section" id="purpose-built-section">
          <div className="container">
            <div className="below-hero-grid">
              {/* Left Column: Why Enterprise AI Agent? (4 Checklist Feature Cards) */}
              <div className="below-hero-col">
                <div className="hero-benefits-card">
                  <div className="benefits-card-header">
                    <h3 className="benefits-card-title">Why Enterprise AI Agent?</h3>
                    <p className="benefits-card-subtitle">Engineered to transform messy enterprise unstructured data into confident action.</p>
                  </div>
                  <div className="hero-benefits-list">
                    {bulletPoints.map((point, index) => (
                      <div key={index} className="hero-benefit-item">
                        <div className="benefit-check-icon-wrap">
                          <Check size={15} strokeWidth={3.2} />
                        </div>
                        <p className="benefit-item-text">{point}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Lead Form Card */}
              <div className="below-hero-col">
                <div className="hero-form-card" id="lead-form-section">
                  <LeadForm 
                    onSuccessLead={handleLeadSuccess} 
                    showToast={showToast} 
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Section: What It Does */}
        <WhatItDoes />

        {/* 5. Section: Use Cases */}
        <UseCases />
      </main>

      {/* Enterprise Product Funnel Footer */}
      <Footer onGetDemoClick={handleAccessDemo} />

      {/* Slide-over / Popup Lead Form Modal */}
      <LeadFormModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
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
