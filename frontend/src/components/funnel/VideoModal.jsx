import React from 'react';
import { X, ShieldCheck } from 'lucide-react';

export default function VideoModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()} 
        style={{ 
          maxWidth: '920px', 
          width: '95%',
          padding: '0', 
          overflow: 'hidden', 
          backgroundColor: '#000000', 
          color: '#ffffff',
          borderRadius: '16px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.75)'
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1rem 1.5rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          backgroundColor: '#090d16'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#0052cc' }}></div>
            <span style={{ fontWeight: 700, fontSize: '0.9375rem', letterSpacing: '0.02em', color: '#ffffff' }}>
              Enterprise AI Agents — Platform Demonstration
            </span>
          </div>
          <button 
            onClick={onClose} 
            style={{ 
              color: '#94a3b8', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              padding: '4px',
              borderRadius: '6px',
              transition: 'all 0.2s ease'
            }}
            title="Close video"
          >
            <X size={22} />
          </button>
        </div>

        {/* Video Player Display */}
        <div style={{
          backgroundColor: '#000000',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          aspectRatio: '16/9',
          maxHeight: '520px'
        }}>
          <video
            controls
            autoPlay
            playsInline
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              backgroundColor: '#000000'
            }}
          >
            <source src="/Enterprise%20AI%20Agents.mp4" type="video/mp4" />
            <source src="/demo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Footer info bar */}
        <div style={{
          padding: '1rem 1.5rem',
          backgroundColor: '#090d16',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8', fontSize: '0.8125rem' }}>
            <ShieldCheck size={16} color="#0052cc" />
            <span>Enterprise-Grade Security &amp; SOC2 Type II Architecture</span>
          </div>
          <button 
            className="btn-primary" 
            onClick={onClose} 
            style={{ width: 'auto', padding: '0.5rem 1.25rem', fontSize: '0.875rem' }}
          >
            Close Video
          </button>
        </div>
      </div>
    </div>
  );
}
