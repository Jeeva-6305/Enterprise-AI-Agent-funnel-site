import React from 'react';
import {
  ClipboardList,
  Wrench,
  Database,
  FileText,
  ListChecks,
  Archive
} from 'lucide-react';

const workflowStages = [
  {
    number: '01',
    title: 'Process Your Query',
    description: 'Your query is processed and broken into targeted questions based on the company or filing you want to analyze.',
    icon: ClipboardList
  },
  {
    number: '02',
    title: 'Select the Right Tools',
    description: 'The system selects the appropriate SEC, financial, or internal tools required for the analysis.',
    icon: Wrench
  },
  {
    number: '03',
    title: 'Fetch Filing Data',
    description: 'Relevant SEC filings, SEC EDGAR sections, and financial data are retrieved for analysis.',
    icon: Database
  },
  {
    number: '04',
    title: 'Summarize the Filing',
    description: 'Long filing content is synthesized into concise financial summaries and quantitative highlights.',
    icon: FileText
  },
  {
    number: '05',
    title: 'Structure the Results',
    description: 'Generated insights are organized into a structured format for the SEC-Mind interface.',
    icon: ListChecks
  },
  {
    number: '06',
    title: 'Store Your Analysis',
    description: 'Analysis outputs and session information are stored to support history and continued analysis.',
    icon: Archive
  }
];

export default function HowSecMindWorks() {
  return (
    <section className="how-sec-mind-works-section" aria-labelledby="how-sec-mind-works-title">
      <div className="container how-sec-mind-works-container">
        <div className="how-sec-mind-works-header">
          <div className="how-sec-mind-works-eyebrow">HOW SEC-MIND WORKS</div>
          <h2 id="how-sec-mind-works-title" className="how-sec-mind-works-title">
            From SEC Filing to Structured Intelligence
          </h2>
          <p className="how-sec-mind-works-subtitle">
            SEC-Mind breaks complex SEC document analysis into an organized workflow that processes, summarizes, structures, and stores filing information.
          </p>
        </div>

        <div className="how-sec-mind-works-grid">
          {workflowStages.map(({ number, title, description, icon: Icon }) => (
            <article className="how-sec-mind-works-card" key={number}>
              <div className="how-sec-mind-works-card-topline">
                <span className="how-sec-mind-works-number">{number}</span>
                <div className="how-sec-mind-works-icon" aria-hidden="true">
                  <Icon size={18} strokeWidth={1.9} />
                </div>
              </div>
              <h3 className="how-sec-mind-works-card-title">{title}</h3>
              <p className="how-sec-mind-works-card-description">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
