import React from 'react';
import { Cpu, Layers, MessageSquareText, Sparkles } from 'lucide-react';

export default function PainPointsCard() {
  const solutions = [
    {
      title: 'Automated Intelligence for Filings',
      desc: 'All 10-K and 10-Q filings are automatically parsed and categorized according to standard financial classifications the moment you ask for it.',
      icon: <Cpu size={20} strokeWidth={1.8} />
    },
    {
      title: 'Unified Work Environment',
      desc: 'Getting, summing up, and formatting all happens in the same pipeline, so no need to go from EDGAR to PDFs to Excel.',
      icon: <Layers size={20} strokeWidth={1.8} />
    },
    {
      title: 'Real-Time Q&A Grounded in Document Sections',
      desc: 'Ask a question right from the filing and get a citation to the exact part of the document that gives an answer.',
      icon: <MessageSquareText size={20} strokeWidth={1.8} />
    }
  ];

  return (
    <div className="screenshot-problems-wrapper">
      <div className="container">
        {/* Section Eyebrow with Icon */}
        <div className="screenshot-problem-eyebrow">
          <Sparkles size={13} strokeWidth={2.2} />
          <span>The Solutions</span>
        </div>

        {/* Section Headline */}
        <h2 className="screenshot-problems-title">
          SEC-Mind Transforms Filing Data into Filing Intelligence.
        </h2>

        {/* Purpose Statement */}
        <p className="screenshot-problems-subtitle">
          It takes hours for analysts to sift through hundreds of pages to find what’s already there. SEC Mind takes the search out of it, structuring every filing into organized intelligence and answering your questions instantly, with citations back to the exact section.
        </p>

        {/* 3 Horizontal Solution Cards Box */}
        <div className="screenshot-problems-box">
          {solutions.map((item, idx) => (
            <div key={idx} className="screenshot-problem-card" tabIndex={0}>
              <div className="screenshot-problem-icon-circle" aria-hidden="true">
                {item.icon}
              </div>
              <h3 className="screenshot-problem-card-title">{item.title}</h3>
              <p className="screenshot-problem-card-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
