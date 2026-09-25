import React from 'react';

const steps = [
  {
    number: "01",
    title: "Link your apps",
    description: "Connect the tools where your knowledge already lives Slack, Google Drive, Confluence, SharePoint, and more."
  },
  {
    number: "02",
    title: "Agents read, sort",
    description: "Enterprise AI Agent Keeps Everything In Sync And Up To Date, While Processing Your Documents In The Background"
  },
  {
    number: "03",
    title: "ASK IN SIMPLE LANGUAGE",
    description: "Type a question like you'd ask a coworker. Get a straight answer, with the source docs that support it."
  }
];

export default function HowItWorksSection() {
  return (
    <div className="hiw-inner">
      {/* Section Header - centered */}
      <div className="hiw-header hiw-header--centered scroll-reveal">
        <span className="hiw-eyebrow">HOW IT WORKS</span>
        <h2 className="hiw-title">How it works</h2>
        <p className="hiw-subtitle">
          Once you connect your tools, Enterprise AI Agent does the rest. Ask a question any time, get an answer, and find the source.
        </p>
      </div>

      {/* Timeline Row */}
      <div className="hiw-timeline">
        {/* Connector line behind the bubbles */}
        <div className="hiw-connector-line" aria-hidden="true" />

        {steps.map((step, idx) => (
          <div key={step.number} className={`hiw-step scroll-reveal delay-${idx + 1}`} data-index={idx}>
            {/* Number bubble */}
            <div className="hiw-step-bubble">
              <span className="hiw-step-number">{step.number}</span>
            </div>

            {/* Step content below bubble */}
            <div className="hiw-step-content">
              <h3 className="hiw-step-title">{step.title}</h3>
              <p className="hiw-step-desc">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
