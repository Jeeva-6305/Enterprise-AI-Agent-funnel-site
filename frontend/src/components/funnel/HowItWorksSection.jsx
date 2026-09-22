import React from "react";

const steps = [
  {
    number: "01",
    title: "Document Received",
    description:
      "Any format goes into the pipeline: fax, scanned PDF, photo, email attachment, or form.",
  },
  {
    number: "02",
    title: "Ingestion & OCR",
    description:
      "Our engine extracts the raw text and layout from the document, regardless of image quality or format (PDF, PNG, JPG, JPEG).",
  },
  {
    number: "03",
    title: "AI Categorization",
    description:
      "The system determines what kind of document it is: invoice, referral, claim, contract, or lab report, through natural language processing.",
  },
  {
    number: "04",
    title: "Structured Extraction",
    description:
      "Extract key fields and map them to your schema: names, dates, amounts, codes, clauses, whatever your workflow needs.",
  },
  {
    number: "05",
    title: "Auto-Correction & QA",
    description:
      "The AI identifies missing or inconsistent fields, suggests fixes, and creates an audit trail before the data even hits your system.",
  },
];

export default function HowItWorksSection() {
  return (
    <div className="hiw-inner">
      {/* Section Header - centered */}
      <div className="hiw-header hiw-header--centered">
        <p className="hiw-eyebrow">How Does It Work</p>
        <h2 className="hiw-title">
          Turn Messy Documents into{" "}
          <span className="hiw-title-accent">Clean Data in 5 Steps</span>
        </h2>
        <p className="hiw-subtitle">
          Adople AI's agentic pipeline reads and understands your documents the
          way a trained analyst would, only thousands of times faster, and
          without getting tired.
        </p>
      </div>

      {/* Timeline Row */}
      <div className="hiw-timeline">
        {/* Connector line behind the bubbles */}
        <div className="hiw-connector-line" aria-hidden="true" />

        {steps.map((step, idx) => (
          <div key={step.number} className="hiw-step" data-index={idx}>
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
