import React from 'react';

export default function VideoPlayer({ isUnlocked = false, onPlayClick }) {
  return (
    <div 
      className="video-preview-box" 
      onClick={onPlayClick} 
      title="Click to watch Platform Demo"
      style={{ cursor: 'pointer' }}
    >
      <div className="video-grid-pattern"></div>
      
      {/* Video Play Button */}
      <div className="play-btn-circle">
        <div className="play-icon-triangle"></div>
      </div>

      {/* Platform Demo Tag */}
      <div className="video-badge-tag">
        Platform Demo
      </div>
    </div>
  );
}
