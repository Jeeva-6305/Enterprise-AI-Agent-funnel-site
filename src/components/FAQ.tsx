import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Placeholder FAQ - replace with real content from Product/Content team
  const faqItems: FAQItem[] = [
    {
      question: "Where does my data stay?",
      answer: "Your data never leaves your infrastructure. Adople AI runs entirely within your cloud account (AWS, Azure, or GCP). We process queries in your environment and return only the results — your raw data stays exactly where it is today, under your control and governance."
    },
    {
      question: "How do you verify answer accuracy?",
      answer: "Every answer goes through our multi-stage verification process: (1) Query validation checks SQL correctness, (2) Result verification compares against known patterns, (3) Confidence scoring flags uncertain results, and (4) Citation linking shows exactly which data sources were used. If our confidence is below 95%, we explicitly tell you."
    },
    {
      question: "What databases and data sources do you support?",
      answer: "We support 50+ data sources including: all major data warehouses (Snowflake, BigQuery, Redshift, Databricks), databases (PostgreSQL, MySQL, SQL Server, Oracle, MongoDB), and SaaS tools (Salesforce, Excel, Google Sheets). Most integrations take under 5 minutes to connect."
    },
    {
      question: "How long does setup and onboarding take?",
      answer: "Technical setup takes 5-10 minutes: connect your data source, map your business terms, and you're ready. Full team onboarding typically takes 1-2 days including training, custom integrations, and governance rules. Most teams see their first value within the first hour."
    },
    {
      question: "What's the pricing model?",
      answer: "We offer flexible pricing based on your team size and query volume. Typical enterprise deployments start at $5,000/month for up to 50 users with unlimited queries. Volume discounts and annual contracts available. Contact us for a custom quote based on your specific needs."
    },
    {
      question: "What ROI can we expect?",
      answer: "Our customers typically see: 70-80% reduction in analyst backlog, 10-15 hours per week saved per business user, 50% faster decision-making cycles, and 95%+ reduction in 'simple SQL request' tickets. Most teams achieve positive ROI within 3-6 months."
    },
    {
      question: "How does the verification process work technically?",
      answer: "Our verification engine uses a three-layer approach: (1) Semantic validation ensures the query matches your intent, (2) Statistical checks flag outliers and anomalies, and (3) Historical comparison validates results against prior queries. Every answer includes a confidence score and full data lineage."
    }
  ];

  return (
    <section
      ref={sectionRef}
      id="faq"
      style={{
        background: 'var(--bg-root)',
        padding: 'clamp(3rem, 6vw, 5rem) 0'
      }}
    >
      <div className="container">
        <div
          style={{
            textAlign: 'center',
            maxWidth: '750px',
            margin: '0 auto clamp(2.5rem, 5vw, 3.5rem) auto',
            padding: '0 1rem',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          <span className="badge-tag" style={{ marginBottom: '1rem', display: 'inline-flex' }}>
            Frequently Asked Questions
          </span>
          <h2 style={{
            fontSize: 'clamp(1.75rem, 4vw, 2.4rem)',
            fontWeight: 800,
            color: 'var(--text-heading)',
            marginBottom: 'clamp(0.75rem, 2vw, 1rem)',
            lineHeight: 1.2
          }}>
            Everything You Need to Know
          </h2>
          <p style={{
            fontSize: 'clamp(1rem, 1.8vw, 1.05rem)',
            color: 'var(--text-muted)',
            lineHeight: 1.65
          }}>
            Common questions about Adople Agentic Data Analyst
          </p>
        </div>

        <div style={{
          maxWidth: '900px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(0.85rem, 2vw, 1rem)'
        }}>
          {faqItems.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="glass-card"
                style={{
                  overflow: 'hidden',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: isOpen ? 'var(--shadow-hover)' : 'var(--shadow-glass)',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                  transitionDelay: `${0.2 + idx * 0.08}s`
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  style={{
                    width: '100%',
                    padding: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (!isOpen) e.currentTarget.style.background = 'var(--bg-surface)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <span style={{
                    fontSize: '1.05rem',
                    fontWeight: 700,
                    color: isOpen ? 'var(--color-primary)' : 'var(--text-heading)',
                    transition: 'color 0.2s ease'
                  }}>
                    {item.question}
                  </span>

                  <div style={{
                    width: '28px',
                    height: '28px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    background: isOpen ? 'var(--color-primary)' : 'var(--bg-surface)',
                    flexShrink: 0,
                    transition: 'all 0.2s ease'
                  }}>
                    <ChevronDown
                      size={18}
                      color={isOpen ? '#FFFFFF' : 'var(--text-muted)'}
                      style={{
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s ease'
                      }}
                    />
                  </div>
                </button>

                <div
                  style={{
                    maxHeight: isOpen ? '500px' : '0',
                    overflow: 'hidden',
                    transition: 'max-height 0.3s ease'
                  }}
                >
                  <div style={{
                    padding: '0 1.5rem 1.5rem 1.5rem',
                    fontSize: '0.95rem',
                    lineHeight: 1.7,
                    color: 'var(--text-body)',
                    borderTop: '1px solid var(--border-default)'
                  }}>
                    <div style={{ paddingTop: '1.5rem' }}>
                      {item.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div
          style={{
            textAlign: 'center',
            marginTop: 'clamp(2.5rem, 5vw, 3rem)',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.8s'
          }}
        >
          <p style={{
            fontSize: 'clamp(0.95rem, 1.6vw, 1rem)',
            color: 'var(--text-muted)',
            marginBottom: 'clamp(0.85rem, 2vw, 1rem)'
          }}>
            Still have questions?
          </p>
          <button
            className="btn-secondary"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{
              padding: 'clamp(0.75rem, 1.5vw, 0.85rem) clamp(1.5rem, 3vw, 1.75rem)'
            }}
          >
            Schedule a Demo
          </button>
        </div>
      </div>
    </section>
  );
};
