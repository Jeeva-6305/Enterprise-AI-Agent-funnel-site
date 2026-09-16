import React from 'react';
import { Cpu, Layers, MessageSquareText } from 'lucide-react';

export default function PainPointsCard() {
  const solutions = [
    {
      title: 'Automated Intelligence for Filings',
      desc: 'All 10-K and 10-Q filings are automatically parsed and categorized according to standard financial classifications the moment you ask for it.',
      icon: <Cpu size={18} />
    },
    {
      title: 'Unified Work Environment',
      desc: 'Getting, summing up, and formatting all happens in the same pipeline, so no need to go from EDGAR to PDFs to Excel.',
      icon: <Layers size={18} />
    },
    {
      title: 'Real-Time Q&A Grounded in Document Sections',
      desc: 'Ask a question right from the filing and get a citation to the exact part of the document that gives an answer.',
      icon: <MessageSquareText size={18} />
    }
  ];

  return (
    <div className="screenshot-problems-wrapper">
      <div className="container">
        {/* Section Eyebrow */}
        <div className="screenshot-problem-eyebrow">
          The Solution
        </div>

        {/* Section Headline */}
        <h2 className="screenshot-problems-title">
          The SEC-Mind converts filing information into filing intelligence.
        </h2>

        {/* Purpose Statement */}
        <p className="screenshot-problems-subtitle">
          Every SEC filing holds all the information analysts require – it’s just hidden within dozens of pages of legal and financial terms. With SEC-Mind, we strive to ensure there are no important pieces of information left unattended, no wasted time moving from one tool to another, and all your questions are answered immediately with citations to the document itself.
        </p>

        {/* 3 Horizontal Solution Cards Box */}
        <div className="screenshot-problems-box">
          {solutions.map((item, idx) => (
            <div key={idx} className="screenshot-problem-card">
              <div className="screenshot-problem-icon-circle">
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

