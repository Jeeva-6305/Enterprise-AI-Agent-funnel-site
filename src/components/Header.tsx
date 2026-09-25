import React from 'react';
import { Play, ShieldCheck, Lock } from 'lucide-react';
import AdopleLogo from '../assets/Adople-logo.webp';

interface HeaderProps {
  onOpenForm: () => void;
  isUnlocked: boolean;
  hasWatched?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onOpenForm, isUnlocked, hasWatched = false }) => {
  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'var(--glass-bg-strong)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--glass-border)',
      padding: 'clamp(0.7rem, 1.5vw, 0.9rem) 0',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem'
      }}>
        {/* Brand / Logo */}
        <a href="#" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.65rem',
          textDecoration: 'none',
          color: 'var(--text-heading)'
        }}>
          <img
            src={AdopleLogo}
            alt="Adople AI"
            style={{
              height: 'clamp(28px, 4vw, 36px)',
              width: 'auto',
              objectFit: 'contain'
            }}
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: 'var(--color-primary-dark)',
              lineHeight: 1.15
            }}>
              Adople AI
            </span>
            <span style={{
              fontSize: '0.65rem',
              fontWeight: 600,
              letterSpacing: '0.04em',
              color: 'var(--text-muted)',
              textTransform: 'uppercase'
            }}>
              Agentic Data Analyst
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="header-nav" style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'clamp(1rem, 2vw, 1.75rem)'
        }}>
          {[
            { label: 'Why It Works', href: '#problem-solution' },
            { label: 'Key Features', href: '#how-it-works' },
            { label: 'Security', href: '#security' },
          ].map(link => (
            <a
              key={link.label}
              href={link.href}
              style={{
                fontSize: 'clamp(0.82rem, 1.3vw, 0.88rem)',
                fontWeight: 600,
                color: 'var(--text-muted)',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-primary)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div style={{ flex: '0 0 auto' }}>
          {isUnlocked ? (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: 'clamp(0.45rem, 1vw, 0.5rem) clamp(0.85rem, 1.5vw, 1rem)',
              borderRadius: '8px',
              background: 'rgba(240, 253, 250, 0.9)',
              backdropFilter: 'blur(8px)',
              border: '1px solid #BBF7D0',
              color: '#15803D',
              fontSize: 'clamp(0.8rem, 1.3vw, 0.85rem)',
              fontWeight: 700,
              whiteSpace: 'nowrap'
            }}>
              <ShieldCheck size={15} /> Demo Unlocked (1-Time)
            </div>
          ) : hasWatched ? (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: 'clamp(0.45rem, 1vw, 0.5rem) clamp(0.85rem, 1.5vw, 1rem)',
              borderRadius: '8px',
              background: 'rgba(241, 245, 249, 0.9)',
              border: '1px solid #CBD5E1',
              color: '#475569',
              fontSize: 'clamp(0.8rem, 1.3vw, 0.85rem)',
              fontWeight: 600,
              whiteSpace: 'nowrap'
            }}>
              <Lock size={14} /> Demo Locked
            </div>
          ) : (
            <button
              onClick={onOpenForm}
              className="btn-primary"
              style={{
                padding: 'clamp(0.55rem, 1.2vw, 0.6rem) clamp(1rem, 2vw, 1.2rem)',
                fontSize: 'clamp(0.85rem, 1.5vw, 0.9rem)',
                whiteSpace: 'nowrap'
              }}
            >
              <Play size={14} /> Watch Demo
            </button>
          )}
        </div>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 900px) {
          .header-nav {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
};
