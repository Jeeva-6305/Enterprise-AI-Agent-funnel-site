import React from 'react';
import { Play } from 'lucide-react';

export default function VideoPlayer({ isUnlocked = false, onPlayClick }) {
  return (
    <div className="screenshot-video-card">
      <div 
        className="screenshot-video-preview-box" 
        onClick={onPlayClick} 
        title="Click to watch Platform Demo"
      >
        <div className="video-grid-pattern"></div>
        
        {/* Platform Demo Badge */}
        <div className="screenshot-video-tag">
          Platform Demo
        </div>

        {/* Video Play Button Icon */}
        <div className="screenshot-video-play-btn play-btn-circle">
          <Play size={24} className="play-icon-svg" fill="currentColor" />
        </div>
      </div>

      {/* Subtext under Video */}
      <p className="screenshot-video-caption">
        Unlock to see how SEC-Mind collects, analyzes, and categorizes an actual SEC filing in real-time.
      </p>
    </div>
  );
}

