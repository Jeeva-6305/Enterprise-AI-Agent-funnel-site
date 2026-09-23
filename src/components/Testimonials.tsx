import React, { useState, useEffect, useRef } from 'react';
import { Quote, Star } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
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

  // Placeholder testimonials - replace with real customer quotes + photos
  const testimonials = [
    {
      quote: "Adople cut our reporting time by 80% and everyone on the team can now ask questions directly. No more waiting for analysts or SQL queries.",
      author: "Sarah Chen",
      title: "Head of Analytics",
      company: "TechFlow Inc",
      metric: "80% faster reports",
      rating: 5,
      // Placeholder avatar - replace with real photo
      avatarPlaceholder: "SC"
    },
    {
      quote: "The verification layer gives us confidence in the numbers we share with executives. We've eliminated the back-and-forth validation process entirely.",
      author: "Michael Rodriguez",
      title: "VP of Data",
      company: "FinanceHub",
      metric: "99.5% accuracy",
      rating: 5,
      avatarPlaceholder: "MR"
    },
    {
      quote: "Setup took 5 minutes. Within an hour, our entire revenue team was asking business questions and getting instant, accurate answers.",
      author: "Emma Thompson",
      title: "Chief Revenue Officer",
      company: "CloudScale",
      metric: "5-min setup",
      rating: 5,
      avatarPlaceholder: "ET"
    }
  ];

  return (
    <section
      ref={sectionRef}
      style={{
        background: 'var(--bg-surface)',
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
            Customer Success Stories
          </span>
          <h2 style={{
            fontSize: 'clamp(1.75rem, 4vw, 2.4rem)',
            fontWeight: 800,
            color: 'var(--text-heading)',
            marginBottom: 'clamp(0.75rem, 2vw, 1rem)',
            lineHeight: 1.2
          }}>
            Trusted by Data Teams at Leading Companies
          </h2>
          <p style={{
            fontSize: 'clamp(1rem, 1.8vw, 1.05rem)',
            color: 'var(--text-muted)',
            lineHeight: 1.65
          }}>
            See how enterprise teams are transforming their data workflows with Adople AI
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
          gap: 'clamp(1.5rem, 3vw, 2rem)'
        }}>
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="glass-card"
              style={{
                padding: 'clamp(1.5rem, 3vw, 2rem)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.95)',
                transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${0.2 + idx * 0.15}s`
              }}
            >
              {/* Quote Icon */}
              <div style={{
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                opacity: 0.1
              }}>
                <Quote size={48} color="var(--color-primary)" />
              </div>

              {/* Stars */}
              <div style={{
                display: 'flex',
                gap: '0.25rem',
                marginBottom: '1rem'
              }}>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="#F59E0B" color="#F59E0B" />
                ))}
              </div>

              {/* Quote */}
              <p style={{
                fontSize: '1rem',
                lineHeight: 1.7,
                color: 'var(--text-body)',
                marginBottom: '1.5rem',
                flex: 1
              }}>
                "{testimonial.quote}"
              </p>

              {/* Metric Badge */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '0.4rem 0.8rem',
                background: 'var(--bg-alt)',
                border: '1px solid var(--color-primary)',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.85rem',
                fontWeight: 700,
                color: 'var(--color-primary)',
                marginBottom: '1.5rem',
                alignSelf: 'flex-start'
              }}>
                ✓ {testimonial.metric}
              </div>

              {/* Author */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid var(--border-default)'
              }}>
                {/* Avatar Placeholder - replace with <img> when real photos available */}
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  fontSize: '1rem',
                  flexShrink: 0
                }}>
                  {testimonial.avatarPlaceholder}
                </div>

                <div>
                  <div style={{
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: 'var(--text-heading)',
                    marginBottom: '0.2rem'
                  }}>
                    {testimonial.author}
                  </div>
                  <div style={{
                    fontSize: '0.85rem',
                    color: 'var(--text-muted)'
                  }}>
                    {testimonial.title}
                  </div>
                  <div style={{
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: 'var(--color-primary)'
                  }}>
                    {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{
          textAlign: 'center',
          marginTop: '2rem',
          fontSize: '0.85rem',
          color: 'var(--text-muted)',
          fontStyle: 'italic'
        }}>
          Replace with real customer testimonials + photos from Sales/CS team
        </div>
      </div>
    </section>
  );
};
