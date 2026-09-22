import React from 'react';
import { ArrowDown, FileText, MessageCircleQuestion, Quote, Sparkles } from 'lucide-react';

const contextSteps = [
  'Filing Context',
  'User Question',
  'Grounded Answer',
  'SEC Section Citation'
];

export default function InteractiveQa() {
  return (
    <section className="interactive-qa-section" aria-labelledby="interactive-qa-title">
      <div className="container interactive-qa-container">
        <div className="interactive-qa-copy">
          <div className="interactive-qa-eyebrow">INTELLIGENT Q&amp;A</div>
          <h2 id="interactive-qa-title" className="interactive-qa-title">
            Ask Questions Directly From the Filing
          </h2>
          <p className="interactive-qa-subtitle">
            Ask follow-up questions against retrieved filing data and get grounded answers with citations to the relevant SEC sections.
          </p>

          <div className="interactive-qa-context-explainer" aria-label="Your filing stays in context">
            <p className="interactive-qa-context-title">Your filing stays in context.</p>
            <div className="interactive-qa-context-flow">
              {contextSteps.map((step, index) => (
                <React.Fragment key={step}>
                  <div className="interactive-qa-context-step">
                    <span>{step}</span>
                  </div>
                  {index < contextSteps.length - 1 && <ArrowDown size={15} aria-hidden="true" />}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        <div className="interactive-qa-preview-wrap">
          <div className="interactive-qa-preview" aria-label="SEC-Mind Q&A product preview">
            <div className="interactive-qa-preview-header">
              <div className="interactive-qa-preview-brand">
                <div className="interactive-qa-preview-brand-icon" aria-hidden="true">
                  <MessageCircleQuestion size={17} />
                </div>
                <strong>SEC-Mind Q&amp;A</strong>
              </div>
              <div className="interactive-qa-status">
                <span className="interactive-qa-status-dot" aria-hidden="true"></span>
                <span>Filing context active</span>
              </div>
            </div>

            <div className="interactive-qa-question">
              <span className="interactive-qa-message-label">Question</span>
              <p>What are the major risk factors mentioned in this filing?</p>
            </div>

            <div className="interactive-qa-answer">
              <div className="interactive-qa-answer-label">
                <span className="interactive-qa-answer-icon" aria-hidden="true">
                  <Sparkles size={14} />
                </span>
                <span>SEC-Mind</span>
              </div>
              <p>
                The filing identifies several risk factors that may affect the company's operations and financial performance. Review the cited filing section for the underlying disclosures.
              </p>
            </div>

            <div className="interactive-qa-preview-footer">
              <div className="interactive-qa-citation">
                <FileText size={15} aria-hidden="true" />
                <span>Source: Risk Factors</span>
                <Quote size={13} aria-hidden="true" />
              </div>
              <span className="interactive-qa-grounded-label">Grounded in filing context</span>
            </div>
          </div>
          <p className="interactive-qa-preview-note">Follow-up questions stay connected to the retrieved filing context.</p>
        </div>
      </div>
    </section>
  );
}
