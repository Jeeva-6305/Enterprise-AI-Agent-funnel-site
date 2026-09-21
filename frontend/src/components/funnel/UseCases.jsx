import React from 'react';
import { Headphones, FileSearch, MessagesSquare, GitPullRequest, Landmark, HeartPulse } from 'lucide-react';

export default function UseCases() {
  const useCases = [
    {
      title: 'Customer support',
      description: 'Find customer queries, tickets, and help articles fast, so replies go out quicker.',
      icon: Headphones
    },
    {
      title: 'Document retrieval',
      description: 'Search company documents across platforms and get the right one instantly.',
      icon: FileSearch
    },
    {
      title: 'Team collaboration',
      description: 'Get answers inside Slack and other tools, right in your workflow.',
      icon: MessagesSquare
    },
    {
      title: 'Product development',
      description: "Ask \"Where's the pull request for feature X?\" and get the status right away.",
      icon: GitPullRequest
    }
  ];

  return (
    <section className="use-cases-section">
      <div className="container">
        <div className="section-header-center">
          <h2 className="section-title">Built for the teams that need answers fast</h2>
          <p className="section-subtitle">
            See how different teams use Enterprise AI Agent every day.
          </p>
        </div>

        {/* 4 Cards in 2x2 Grid */}
        <div className="use-cases-grid">
          {useCases.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="use-case-card">
                <div className="use-case-icon-box">
                  <Icon size={18} className="use-case-icon" />
                </div>
                <div className="use-case-content">
                  <h3 className="use-case-card-title">{item.title}</h3>
                  <p className="use-case-card-text">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Slim strip below the cards with two small boxes */}
        <div className="use-cases-industry-strip">
          <div className="industry-box">
            <div className="industry-tag-wrap">
              <Landmark size={15} className="industry-icon" />
              <span className="industry-tag">Banking</span>
            </div>
            <p className="industry-text">
              Search policies, KYC/AML rules, loan guidelines, and audit documents.
            </p>
          </div>

          <div className="industry-box">
            <div className="industry-tag-wrap">
              <HeartPulse size={15} className="industry-icon" />
              <span className="industry-tag">Healthcare</span>
            </div>
            <p className="industry-text">
              Search clinical documents, payer policies, and coding guidelines.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
