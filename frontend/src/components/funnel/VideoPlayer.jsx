import React from 'react';

export default function VideoPlayer({ isUnlocked = false, onPlayClick }) {
  return (
    <div className="demo-video-inner-wrapper">
      <div 
        className="video-preview-box" 
        onClick={onPlayClick} 
        title="Click to watch Platform Demo"
        style={{ cursor: 'pointer' }}
      >
        {/* Video Thumbnail Image (UI Frame from Video) */}
        <img 
          src="/demo-video-thumbnail.jpg" 
          alt="Enterprise AI Agent Demo Preview" 
          className="video-thumbnail-img"
        />
        
        {/* Subtle Dark Gradient Overlay */}
        <div className="video-dark-overlay"></div>

        {/* Video Play Button */}
        <div className="play-btn-circle">
          <div className="play-icon-triangle"></div>
        </div>

        {/* Platform Demo Tag */}
        <div className="video-badge-tag">
          Platform Demo
        </div>
      </div>

      {/* Video Caption Bar Below Video */}
      <div className="video-caption-bar">
        <p className="video-caption-text">
          Watch an Enterprise AI Agent answer a question across your docs and apps.
        </p>
      </div>
    </div>
  );
}
