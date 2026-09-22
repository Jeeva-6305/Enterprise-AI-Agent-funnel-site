import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    number: "01",
    question: "How long does the implementation require?",
    answer:
      "Most teams go live in 2-4 weeks, starting with a free assessment to map your current fax formats and integration needs.",
  },
  {
    number: "02",
    question: "What file formats does it support?",
    answer:
      "Supported file formats include PDF, PNG, JPG and JPEG, with support for low quality scans and faxes all without the need for manual prep or templates.",
  },
  {
    number: "03",
    question: "Is our data HIPAA compliant and secure?",
    answer:
      "Yes. Adople AI is HIPAA compliant by design, deployed within your existing Azure or AWS environment, and logs every extraction with a full audit trail.",
  },
  {
    number: "04",
    question: "What happens when the AI is not sure about a field?",
    answer:
      "Low confidence or weird fields are flagged and automatically sent to a human reviewer, everything else goes right through. The review usually takes 2 to 5 minutes a fax as opposed to 90 minutes.",
  },
  {
    number: "05",
    question: "Which systems does it integrate with?",
    answer:
      "Structured data pushes directly into Epic FHIR, Cerner, Azure, and AWS environments no rip-and-replace of your existing workflow.",
  },
  {
    number: "06",
    question: "Do we need to change our current fax intake process?",
    answer:
      "No. Adople AI plugs into your existing fax pipeline (e.g. Open Text RightFax - Blob Storage) it replaces the manual entry and QA step, not the intake itself.",
  },
  {
    number: "07",
    question: "What kind of documents can it classify?",
    answer:
      "Referrals, prior authorizations, lab results, claims, and other clinical or administrative fax documents the AI identifies the type automatically before extracting fields.",
  },
  {
    number: "08",
    question: "Does accuracy improve over time?",
    answer:
      "Yes. Out-of-the-box accuracy immediately reduces manual data entry errors, and continues to improve as the system processes more of your document types.",
  },
];

export default function FaqSection() {
  const [openIndices, setOpenIndices] = useState([0]); // First FAQ open by default

  const toggleFaq = (index) => {
    setOpenIndices((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="faq-inner">
      {/* Centered Header */}
      <div className="faq-header-centered">
        <h2 className="faq-title">Common Questions</h2>
      </div>

      {/* Accordion List */}
      <div className="faq-list">
        {faqs.map((faq, index) => {
          const isOpen = openIndices.includes(index);
          return (
            <div
              key={index}
              className={`faq-item ${isOpen ? 'faq-item--open' : ''}`}
            >
              <button
                type="button"
                className="faq-question-btn"
                onClick={() => toggleFaq(index)}
                aria-expanded={isOpen}
              >
                <span className="faq-question-text">
                  <span className="faq-index-badge">{index + 1}.</span> {faq.question}
                </span>
                <span className={`faq-chevron ${isOpen ? 'faq-chevron--rotated' : ''}`}>
                  <ChevronDown size={19} strokeWidth={2.2} />
                </span>
              </button>

              {isOpen && (
                <div className="faq-answer-wrap">
                  <p className="faq-answer-text">{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
