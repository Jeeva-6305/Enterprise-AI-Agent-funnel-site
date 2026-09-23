import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    number: '01',
    question: 'Which SEC Filings does SEC-Mind Support?',
    answer: 'SEC-Mind currently analyzes the 10-K (annual) and 10-Q (quarterly) filings of publicly traded companies. You can search by ticker symbol or by company name.'
  },
  {
    number: '02',
    question: 'How does SEC-Mind find answers so quickly?',
    answer: 'With SEC-Mind, we use a multi-agent system that parses your question, retrieves the exact filing sections needed from SEC EDGAR and summarizes only the relevant parts instead of you having to manually scan hundreds of pages.'
  },
  {
    number: '03',
    question: 'Is it right or can it hallucinate?',
    answer: 'Each answer is directly based on the filing text, and shown with a citation back to the exact section it originated from. This means you can always check the source for yourself — we don’t just give you an answer, we show you where it came from.'
  },
  {
    number: '04',
    question: 'Can I download my analysis?',
    answer: 'Yes. Download a clean, formatted report of your analysis with just one click. (Available now as .txt report, PDF and Excel export formats are on our roadmap.)'
  },
  {
    number: '05',
    question: 'Will SEC-Mind save my previous searches?',
    answer: 'Yes. Your search history and analysis sessions are saved so you can pick up right where you left off without having to rerun the same query.'
  },
  {
    number: '06',
    question: 'Can I ask follow up questions on a filing?',
    answer: 'Yes. Once you load a filing, you can ask unlimited follow-up questions that are based on the data of that filing — no need to research or start over.'
  },
  {
    number: '07',
    question: 'For whom is SEC-Mind intended?',
    answer: 'Financial analysts, investors, auditors, and executive staff — everyone who requires immediate analysis of information from SEC documents instead of reviewing them manually.'
  },
  {
    number: '08',
    question: 'How safe is my data?',
    answer: 'Our company uses enterprise-level security measures for managing data.'
  },
  {
    number: '09',
    question: 'Do I have a chance to try the product?',
    answer: 'Yes, the site offers you a live demo of how SEC-Mind works while analyzing an actual document.'
  }
];

export default function FaqSection() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [openIndex, setOpenIndex] = useState(0); // default open first item

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const toggleFaq = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      ref={sectionRef}
      className={`faq-section ${isVisible ? 'is-visible' : ''}`}
      aria-labelledby="faq-section-title"
    >
      <div className="container faq-container">
        <div className="faq-header">
          <h2 id="faq-section-title" className="faq-title">
            Frequently Asked Questions
          </h2>
          <p className="faq-subtitle">
            Everything you need to know about SEC-Mind and how it transforms SEC filing analysis.
          </p>
        </div>

        <div className="faq-accordion" role="region" aria-label="Frequently Asked Questions list">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const faqId = `faq-item-${index}`;
            const headerId = `faq-header-${index}`;

            return (
              <div
                key={faq.number}
                className={`faq-item ${isOpen ? 'is-open' : ''}`}
              >
                <button
                  type="button"
                  id={headerId}
                  className="faq-question-btn"
                  aria-expanded={isOpen}
                  aria-controls={faqId}
                  onClick={() => toggleFaq(index)}
                >
                  <span className="faq-question-number">{faq.number}</span>
                  <span className="faq-question-text">{faq.question}</span>
                  <span className="faq-icon-wrapper" aria-hidden="true">
                    <ChevronDown size={18} strokeWidth={2.2} />
                  </span>
                </button>

                <div
                  id={faqId}
                  role="region"
                  aria-labelledby={headerId}
                  className={`faq-answer-collapse ${isOpen ? 'is-expanded' : ''}`}
                >
                  <div className="faq-answer-inner">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
