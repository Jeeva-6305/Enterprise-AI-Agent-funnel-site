import React from 'react';
import { Phone, Mail, Globe, ShieldCheck, Linkedin, Twitter, Github } from 'lucide-react';
import AdopleLogo from '../assets/Adople-logo.webp';

interface FooterProps {
  onOpenForm: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenForm }) => {
  return (
    <footer style={{
      background: 'var(--bg-footer)',
      color: '#94A3B8',
      paddingTop: '4rem',
      paddingBottom: '0'
    }}>
      <div className="container">
        {/* Top Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '3rem',
          marginBottom: '3.5rem'
        }}>
          {/* Brand Column */}
          <div style={{ gridColumn: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <img
                src={AdopleLogo}
                alt="Adople AI Logo"
                style={{ height: '32px', width: 'auto', objectFit: 'contain' }}
              />
              <div>
                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.01em' }}>
                  Adople <span style={{ color: '#60A5FA' }}>AI</span>
                </div>
                <div style={{ fontSize: '0.65rem', color: '#64748B', fontWeight: 600, letterSpacing: '0.03em' }}>
                  AGENTIC DATA ANALYST
                </div>
              </div>
            </div>
            <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: '#94A3B8', marginBottom: '1.5rem', maxWidth: '260px' }}>
              Instant, verified business answers powered by agentic intelligence.
            </p>
            <div style={{ display: 'flex', gap: '0.8rem', marginTop: '1.5rem' }}>
              {[
                { icon: Linkedin, url: '#', label: 'LinkedIn' },
                { icon: Twitter, url: '#', label: 'Twitter' },
                { icon: Github, url: '#', label: 'GitHub' }
              ].map((social, i) => (
                <a key={i} href={social.url} style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  width: '36px', height: '36px',
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: '8px',
                  color: '#94A3B8',
                  transition: 'all 0.2s ease'
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(96,165,250,0.2)';
                    e.currentTarget.style.borderColor = '#60A5FA';
                    e.currentTarget.style.color = '#60A5FA';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
                    e.currentTarget.style.color = '#94A3B8';
                  }}
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Product Column */}
          <div>
            <h5 style={{
              fontSize: '0.75rem', fontWeight: 700, color: '#FFFFFF',
              marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.08em'
            }}>
              Product
            </h5>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                { label: 'Features', href: '#' },
                { label: 'How It Works', href: '#how-it-works' },
                { label: 'Dashboard', href: '#dashboard' },
                { label: 'Integrations', href: '#connectors' },
              ].map((link, i) => (
                <li key={i}>
                  <a href={link.href} style={{
                    fontSize: '0.85rem', color: '#94A3B8',
                    textDecoration: 'none', transition: 'color 0.2s ease'
                  }}
                    onMouseEnter={e => e.currentTarget.style.color = '#60A5FA'}
                    onMouseLeave={e => e.currentTarget.style.color = '#94A3B8'}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h5 style={{
              fontSize: '0.75rem', fontWeight: 700, color: '#FFFFFF',
              marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.08em'
            }}>
              Company
            </h5>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                { label: 'About', href: '#' },
                { label: 'Blog', href: '#' },
                { label: 'Careers', href: '#' },
                { label: 'Contact', href: '#' },
              ].map((link, i) => (
                <li key={i}>
                  <a href={link.href} style={{
                    fontSize: '0.85rem', color: '#94A3B8',
                    textDecoration: 'none', transition: 'color 0.2s ease'
                  }}
                    onMouseEnter={e => e.currentTarget.style.color = '#60A5FA'}
                    onMouseLeave={e => e.currentTarget.style.color = '#94A3B8'}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h5 style={{
              fontSize: '0.75rem', fontWeight: 700, color: '#FFFFFF',
              marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.08em'
            }}>
              Support
            </h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <a href="tel:+14159654065" style={{
                fontSize: '0.85rem', color: '#94A3B8',
                textDecoration: 'none', transition: 'color 0.2s ease',
                display: 'flex', alignItems: 'center', gap: '0.5rem'
              }}
                onMouseEnter={e => e.currentTarget.style.color = '#60A5FA'}
                onMouseLeave={e => e.currentTarget.style.color = '#94A3B8'}
              >
                <Phone size={14} /> +1 (415) 965-4065
              </a>
              <a href="mailto:info@adople.ai" style={{
                fontSize: '0.85rem', color: '#94A3B8',
                textDecoration: 'none', transition: 'color 0.2s ease',
                display: 'flex', alignItems: 'center', gap: '0.5rem'
              }}
                onMouseEnter={e => e.currentTarget.style.color = '#818CF8'}
                onMouseLeave={e => e.currentTarget.style.color = '#94A3B8'}
              >
                <Mail size={14} /> info@adople.ai
              </a>
              <a href="https://www.adople.com" style={{
                fontSize: '0.85rem', color: '#94A3B8',
                textDecoration: 'none', transition: 'color 0.2s ease',
                display: 'flex', alignItems: 'center', gap: '0.5rem'
              }}
                onMouseEnter={e => e.currentTarget.style.color = '#34D399'}
                onMouseLeave={e => e.currentTarget.style.color = '#94A3B8'}
              >
                <Globe size={14} /> www.adople.com
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.1)',
          marginBottom: '2rem'
        }} />

        {/* Bottom Bar */}
        <div style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap', gap: '1.5rem',
          paddingBottom: '2rem',
          fontSize: '0.8rem', color: '#64748B'
        }}>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', fontSize: '0.8rem' }}>
            <a href="#" style={{ color: '#64748B', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#94A3B8'}
              onMouseLeave={e => e.currentTarget.style.color = '#64748B'}
            >
              Privacy Policy
            </a>
            <a href="#" style={{ color: '#64748B', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#94A3B8'}
              onMouseLeave={e => e.currentTarget.style.color = '#64748B'}
            >
              Terms of Service
            </a>
            <a href="#" style={{ color: '#64748B', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#94A3B8'}
              onMouseLeave={e => e.currentTarget.style.color = '#64748B'}
            >
              Cookie Policy
            </a>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#34D399' }}>
            <ShieldCheck size={14} />
            <span>SOC 2 Type II Certified · HIPAA Ready</span>
          </div>
        </div>

        {/* Copyright */}
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          padding: '1.5rem 0',
          textAlign: 'center',
          fontSize: '0.75rem', color: '#475569',
          letterSpacing: '0.01em'
        }}>
          © {new Date().getFullYear()} Adople AI Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
