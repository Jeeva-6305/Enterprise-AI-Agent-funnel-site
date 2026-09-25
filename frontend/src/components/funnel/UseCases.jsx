import React, { useState } from 'react';
import { Headphones, FileSearch, MessagesSquare, GitPullRequest, Landmark, HeartPulse } from 'lucide-react';

export default function UseCases() {
  const [activeTab, setActiveTab] = useState(0);

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

  const activeItem = useCases[activeTab];
  const ActiveIcon = activeItem.icon;

  return (
    <section className="use-cases-section">
      <div className="container">
        {/* Section Heading */}
        <div className="section-header-center">
          <h2 className="section-title">Built for the teams that need answers fast</h2>
          <p className="section-subtitle">
            See how different teams use Enterprise AI Agent every day.
          </p>
        </div>

        <div className="use-cases-tabbed-wrapper">
          {/* 4 Pill-Shaped Tabs in a Row */}
          <div className="use-case-tabs-bar" role="tablist" aria-label="Use Case Tabs">
            {useCases.map((item, index) => {
              const TabIcon = item.icon;
              const isActive = activeTab === index;
              return (
                <button
                  key={index}
                  role="tab"
                  aria-selected={isActive}
                  className={`use-case-tab-btn ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveTab(index)}
                >
                  <TabIcon size={16} className="use-case-tab-icon" />
                  <span>{item.title}</span>
                </button>
              );
            })}
          </div>

          {/* Substantial Content Panel for Active Tab with Smooth Transition */}
          <div className="use-case-panel" role="tabpanel">
            <div key={activeTab} className="use-case-panel-inner">
              <div className="use-case-panel-icon-wrap">
                <ActiveIcon size={34} className="use-case-panel-icon" />
              </div>
              <div className="use-case-panel-text">
                <h3 className="use-case-panel-title">{activeItem.title}</h3>
                <p className="use-case-panel-desc">{activeItem.description}</p>
              </div>
            </div>
          </div>

          {/* Two Smaller Highlight Strips Side by Side for Banking and Healthcare */}
          <div className="use-case-industry-row">
            <div className="use-case-industry-strip">
              <div className="industry-tag-pill">
                <Landmark size={15} className="industry-icon" />
                <span>Banking</span>
              </div>
              <p className="industry-strip-text">
                Search policies, KYC/AML rules, loan guidelines, and audit documents.
              </p>
            </div>

            <div className="use-case-industry-strip">
              <div className="industry-tag-pill">
                <HeartPulse size={15} className="industry-icon" />
                <span>Healthcare</span>
              </div>
              <p className="industry-strip-text">
                Search clinical documents, payer policies, and coding guidelines.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
