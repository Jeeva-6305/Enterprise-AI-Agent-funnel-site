import React from 'react';
import { Play } from 'lucide-react';

export default function VideoPlayer({ isUnlocked = false, onPlayClick }) {
  return (
    <div 
      className="video-preview-box-full" 
      onClick={onPlayClick} 
      title="Click to watch Platform Demo"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onPlayClick?.();
        }
      }}
    >
      {/* Actual Demo Video Preview Image */}
      <img 
        src="/video-preview.jpg" 
        alt="Document Extraction Platform Demo Preview" 
        className="video-poster-image"
      />
      
      {/* Dark Gradient Overlay */}
      <div className="video-poster-overlay"></div>
      <div className="video-ambient-glow"></div>
      <div className="video-grid-pattern"></div>

      {/* Top Video Status Ribbon */}
      <div className="video-top-ribbon">
        <span className="video-live-pill">
          <span className="live-pulse-dot"></span>
          Platform Demo
        </span>
        <span className="video-duration-pill">2:30 min</span>
      </div>
      
      {/* Centered Play Button & Caption */}
      <div className="video-center-content">
        <div className="play-btn-circle-large">
          <Play size={22} className="play-icon-triangle-svg" fill="currentColor" />
        </div>
        <div className="video-action-caption">
          <span className="video-caption-title">
            {isUnlocked ? 'Watch Full Demo' : 'Click to Watch Demo'}
          </span>
          <span className="video-caption-sub">
            {isUnlocked ? 'High-definition walkthrough' : 'Unlock with fast form submission'}
          </span>
        </div>
      </div>

      {/* Bottom Tag */}
      <div className="video-bottom-tag">
        Autonomous Document Intelligence in Action
      </div>
    </div>
  );
}
