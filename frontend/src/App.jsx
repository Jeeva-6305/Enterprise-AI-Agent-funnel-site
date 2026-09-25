import React, { useState, useEffect } from 'react';
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
import VideoPlayer from './components/funnel/VideoPlayer';
import WhatItDoes from './components/funnel/WhatItDoes';
import UseCases from './components/funnel/UseCases';
import WhyEnterpriseSection from './components/funnel/WhyEnterpriseSection';
import HowItWorksSection from './components/funnel/HowItWorksSection';
import AdminDashboard from './components/admin/AdminDashboard';

import './styles/global.css';
import './styles/funnel.css';

export default function App() {
  const [currentView, setCurrentView] = useState(() => {
    return window.location.hash === '#admin' ? 'admin' : 'funnel';
  });
  const [submittedLead, setSubmittedLead] = useState(null);
  const [isDemoUnlocked, setIsDemoUnlocked] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentView(window.location.hash === '#admin' ? 'admin' : 'funnel');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Smooth lightweight scroll reveal entrance animations
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

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
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    const elements = document.querySelectorAll('.scroll-reveal');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [currentView]);

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

  if (currentView === 'admin') {
    return (
      <div className="app-root" data-theme="enterprise">
        <AdminDashboard 
          onBackToFunnel={() => {
            window.location.hash = '';
            setCurrentView('funnel');
          }}
          showToast={showToast}
        />
        <Toast toasts={toasts} onDismiss={handleDismissToast} />
      </div>
    );
  }

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
        {/* 1. Hero Section (Editorial 2-Column Grid: Headline & CTAs | Hero Form on Right matching Screenshot 2) */}
        <section className="hero-section">
          <div className="container">
            <FunnelHero 
              onWatchDemo={handleAccessDemo}
              onSeeHowItWorks={handleSeeHowItWorks}
              onSuccessLead={handleLeadSuccess}
              showToast={showToast}
            />
          </div>
        </section>

        {/* 2. Bottlenecks / Pain Points Section */}
        <section className="pain-points-section">
          <div className="container scroll-reveal">
            <PainPointsCard />
          </div>
        </section>

        {/* 3. Section: Why Enterprise AI Agent? (Comparison Table Layout) */}
        <section className="below-hero-section" id="purpose-built-section">
          <div className="container scroll-reveal">
            <WhyEnterpriseSection />
          </div>
        </section>

        {/* 4. Section: How It Works (Timeline Stepper Layout matching Screenshot) */}
        <section className="hiw-standalone-section" id="how-it-works-section">
          <div className="container scroll-reveal">
            <HowItWorksSection />
          </div>
        </section>

        {/* 5. Section: What It Does */}
        <WhatItDoes />

        {/* 5. Section: Use Cases */}
        <UseCases />

        {/* 6. Demo Video Section (Just above the footer, matching Screenshot 1 layout) */}
        <section className="demo-video-section" id="demo-video-section">
          <div className="container">
            <div className="demo-section-header scroll-reveal">
              <span className="demo-section-badge">PLATFORM DEMO</span>
              <h2 className="demo-section-title">See Enterprise AI Agent in Action</h2>
              <p className="demo-section-subtitle">
                Watch an Enterprise AI Agent answer questions across your docs and apps in real time.
              </p>
            </div>

            <div className="demo-video-card-wrapper scroll-reveal delay-1">
              <VideoPlayer 
                isUnlocked={isDemoUnlocked} 
                onPlayClick={handleAccessDemo} 
              />
            </div>
          </div>
        </section>
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
