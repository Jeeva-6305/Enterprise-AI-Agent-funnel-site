import React from 'react';
import { Search, MessageSquare, ShieldCheck, Server } from 'lucide-react';

export default function WhatItDoes() {
  const features = [
    {
      title: 'Unified search',
      description: 'Search Slack, Google Drive, Confluence, and more from one place.',
      icon: Search
    },
    {
      title: 'Works with any LLM',
      description: 'Use the LLM you choose, with customizable AI personas.',
      icon: MessageSquare
    },
    {
      title: 'Robust security',
      description: 'Enterprise-grade login and roles, with admin and basic user permissions.',
      icon: ShieldCheck
    },
    {
      title: 'Secure deployment',
      description: 'Run it on-premises or in the cloud. You control user data and chat histories.',
      icon: Server
    }
  ];

  return (
    <section className="what-it-does-section" id="what-it-does">
      <div className="container">
        {/* Left-Aligned Editorial Section Header */}
        <div className="what-it-does-header-left scroll-reveal">
          <h2 className="what-it-does-main-title">
            One assistant for everything your company knows
          </h2>
          <p className="what-it-does-main-subtitle">
            Enterprise AI Agent connects your documents, apps, and teams in one simple chat.
          </p>
        </div>

        {/* 4 Clean Modern Feature Cards Grid */}
        <div className="what-it-does-cards-grid">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className={`what-it-does-feature-card scroll-reveal delay-${index + 1}`}>
                <div className="feature-card-icon-box">
                  <Icon size={20} className="feature-card-icon" />
                </div>
                <h3 className="feature-card-title">{feature.title}</h3>
                <p className="feature-card-description">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
