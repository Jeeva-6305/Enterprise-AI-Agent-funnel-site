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
    <section className="what-it-does-section">
      <div className="container">
        <div className="section-header-center">
          <h2 className="section-title">One assistant for everything your company knows</h2>
          <p className="section-subtitle">
            Enterprise AI Agent connects your documents, apps, and teams in one simple chat.
          </p>
        </div>

        <div className="what-it-does-grid">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="what-it-does-card">
                <div className="what-it-does-icon-box">
                  <Icon size={18} className="what-it-does-icon" />
                </div>
                <h3 className="what-it-does-card-title">{feature.title}</h3>
                <p className="what-it-does-card-text">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
