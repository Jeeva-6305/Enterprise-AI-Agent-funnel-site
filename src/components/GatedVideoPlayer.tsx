import React, { useState, useRef } from 'react';
import { Play, Lock, CheckCircle, Shield, Sparkles } from 'lucide-react';
import { VideoChapter } from '../types';
import demoVideo from '../assets/Agentic Data Analyst_Demo.webm';

interface GatedVideoPlayerProps {
  isUnlocked: boolean;
  onOpenForm: () => void;
}

const CHAPTERS: VideoChapter[] = [
  { time: "00:10", seconds: 10, title: "Ask Any Business Question", description: "Type in plain English and watch Adople AI understand and respond instantly." },
  { time: "00:45", seconds: 45, title: "Answers That Self-Verify", description: "See how every answer is automatically checked for accuracy before you receive it." },
  { time: "01:30", seconds: 90, title: "Live Charts in Seconds", description: "Watch relevant charts and tables generate automatically from your question." },
  { time: "02:15", seconds: 135, title: "Team Collaboration & Sharing", description: "Explore how teams share, discuss, and act on data answers together." },
];

export const GatedVideoPlayer: React.FC<GatedVideoPlayerProps> = ({ isUnlocked, onOpenForm }) => {
  const [activeChapter, setActiveChapter] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const seekToChapter = (idx: number, seconds: number) => {
    setActiveChapter(idx);
    if (!isUnlocked) {
      onOpenForm();
      return;
    }
    if (videoRef.current) {
      videoRef.current.currentTime = seconds;
      videoRef.current.play();
    }
  };

  return (
    <div
      className="glass-card"
      style={{
        borderRadius: 'clamp(12px, 3vw, 20px)',
        overflow: 'hidden',
        boxShadow: '0 8px 40px rgba(15, 23, 42, 0.10)',
        maxWidth: '100%'
      }}
    >
      {/* Top control bar */}
      <div style={{
        padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1rem, 3vw, 1.5rem)',
        background: '#F8FAFC',
        borderBottom: '1px solid var(--border-default)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 'clamp(0.5rem, 1.5vw, 0.75rem)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'clamp(0.5rem, 1.5vw, 0.65rem)',
          flexWrap: 'wrap'
        }}>
          <div style={{
            width: 'clamp(7px, 1.5vw, 9px)',
            height: 'clamp(7px, 1.5vw, 9px)',
            borderRadius: '50%',
            background: isUnlocked ? '#4C9A7A' : '#E8664C',
            boxShadow: isUnlocked ? '0 0 6px #4C9A7A' : '0 0 6px #E8664C',
            flexShrink: 0
          }} />
          <span style={{
            fontWeight: 700,
            fontSize: 'clamp(0.8rem, 1.8vw, 0.95rem)',
            color: 'var(--text-heading)',
            lineHeight: 1.3
          }}>
            Adople AI — Product Demo Video
          </span>
          <span style={{
            fontSize: 'clamp(0.65rem, 1.3vw, 0.72rem)',
            padding: 'clamp(0.15rem, 0.5vw, 0.2rem) clamp(0.5rem, 1vw, 0.6rem)',
            borderRadius: 'var(--radius-full)',
            background: isUnlocked ? 'rgba(76, 154, 122, 0.12)' : 'rgba(232, 102, 76, 0.12)',
            color: isUnlocked ? '#4C9A7A' : '#E8664C',
            border: isUnlocked ? '1px solid rgba(76, 154, 122, 0.3)' : '1px solid rgba(232, 102, 76, 0.3)',
            fontWeight: 700,
            whiteSpace: 'nowrap',
            flexShrink: 0
          }}>
            {isUnlocked ? 'FULL ACCESS' : 'PREVIEW'}
          </span>
        </div>
      </div>

      {/* Main content area */}
      <div style={{
        position: 'relative',
        background: '#000000',
        overflow: 'hidden'
      }}>
        {!isUnlocked ? (
          /* Locked state preview overlay */
          <div style={{
            minHeight: 'clamp(320px, 45vw, 380px)',
            background: 'linear-gradient(180deg, rgba(28,27,46,0.85) 0%, rgba(12,11,26,0.95) 100%), url("https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop") center/cover no-repeat',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'clamp(1.5rem, 5vw, 2.5rem)',
            textAlign: 'center'
          }}>
            <div
              onClick={onOpenForm}
              style={{
                width: 'clamp(56px, 12vw, 76px)',
                height: 'clamp(56px, 12vw, 76px)',
                borderRadius: '50%',
                background: 'rgba(43,45,110,0.9)',
                border: '3px solid rgba(255,255,255,0.9)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
                cursor: 'pointer',
                boxShadow: '0 0 30px rgba(43,45,110,0.5)',
                transition: 'all 0.3s ease',
                flexShrink: 0
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <Play size={32} color="#FFFFFF" style={{ marginLeft: '4px' }} />
            </div>

            <h3 style={{
              fontSize: 'clamp(1.25rem, 4vw, 1.75rem)',
              fontWeight: 800,
              color: '#FFFFFF',
              marginBottom: 'clamp(0.5rem, 2vw, 0.65rem)',
              lineHeight: 1.2,
              maxWidth: '600px'
            }}>
              See Adople Agentic Data Analyst Answer Questions Live
            </h3>
            <p style={{
              maxWidth: '540px',
              fontSize: 'clamp(0.9rem, 2vw, 1rem)',
              color: 'rgba(255,255,255,0.85)',
              marginBottom: 'clamp(1.5rem, 4vw, 2rem)',
              lineHeight: 1.6
            }}>
              Watch a real product walkthrough — ask in plain English and get a verified answer with interactive charts in seconds.
            </p>

            <button
              onClick={onOpenForm}
              className="btn-primary"
              style={{
                padding: 'clamp(0.75rem, 2vw, 0.95rem) clamp(1.5rem, 3vw, 2rem)',
                fontSize: 'clamp(0.9rem, 2vw, 1.05rem)',
                background: '#FFFFFF',
                color: '#2B2D6E',
                boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                whiteSpace: 'nowrap'
              }}
            >
              <Lock size={16} />
              Watch the Full Demo — It's Free
            </button>

            <div style={{
              display: 'flex',
              gap: 'clamp(1rem, 3vw, 1.75rem)',
              marginTop: 'clamp(1.5rem, 4vw, 2rem)',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}>
              {[
                { icon: <CheckCircle size={14} color="#4C9A7A" />, label: 'Instant access' },
                { icon: <Shield size={14} color="#4C9A7A" />, label: 'No credit card required' },
                { icon: <Sparkles size={14} color="#4C9A7A" />, label: 'Full product overview' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'clamp(0.3rem, 1vw, 0.4rem)',
                    color: 'rgba(255,255,255,0.85)',
                    fontSize: 'clamp(0.75rem, 1.5vw, 0.85rem)',
                    fontWeight: 500,
                    whiteSpace: 'nowrap'
                  }}
                >
                  {item.icon} {item.label}
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Unlocked — Video Player */
          <div style={{
            position: 'relative',
            width: '100%',
            paddingTop: '56.25%', /* 16:9 Aspect Ratio */
            background: '#000000'
          }}>
            <video
              ref={videoRef}
              src={demoVideo}
              controls
              autoPlay
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                outline: 'none'
              }}
            >
              Your browser does not support HTML5 video.
            </video>
          </div>
        )}
      </div>
    </div>
  );
};
