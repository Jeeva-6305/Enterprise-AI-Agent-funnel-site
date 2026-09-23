import React, { useState, useEffect, useRef } from 'react';
import { TrendingUp, CheckCircle, Users, Zap } from 'lucide-react';

interface Stat {
  icon: React.ReactNode;
  value: string;
  endValue?: number;
  label: string;
  description: string;
  suffix?: string;
}

export const ProofStats: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedValues, setAnimatedValues] = useState<{ [key: number]: number }>({});
  const sectionRef = useRef<HTMLDivElement>(null);

  const stats: Stat[] = [
    {
      icon: <TrendingUp size={28} color="#2B2D6E" />,
      value: '10,000+',
      endValue: 10000,
      suffix: '+',
      label: 'Business Questions Answered',
      description: 'Daily queries processed'
    },
    {
      icon: <CheckCircle size={28} color="#4C9A7A" />,
      value: '99.2%',
      endValue: 99.2,
      suffix: '%',
      label: 'Answer Accuracy Rate',
      description: 'Verified and validated'
    },
    {
      icon: <Users size={28} color="#E8664C" />,
      value: '50+',
      endValue: 50,
      suffix: '+',
      label: 'Enterprise Customers',
      description: 'Across 3 continents'
    },
    {
      icon: <Zap size={28} color="#2B2D6E" />,
      value: '< 5 min',
      endValue: 5,
      label: 'Average Setup Time',
      description: 'From connection to first query'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (!entry.isIntersecting) {
          setAnimatedValues({});
        }
      },
      { threshold: 0.25 }
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

  // Animate numbers when visible
  useEffect(() => {
    if (!isVisible) return;

    stats.forEach((stat, idx) => {
      if (!stat.endValue) return;

      let startValue = 0;
      const endValue = stat.endValue;
      const duration = 1800;
      const increment = endValue / (duration / 16);

      const timer = setInterval(() => {
        startValue += increment;
        if (startValue >= endValue) {
          setAnimatedValues((prev) => ({ ...prev, [idx]: endValue }));
          clearInterval(timer);
        } else {
          setAnimatedValues((prev) => ({ ...prev, [idx]: startValue }));
        }
      }, 16);

      return () => clearInterval(timer);
    });
  }, [isVisible]);

  const formatValue = (idx: number) => {
    const stat = stats[idx];
    const animValue = animatedValues[idx] || 0;

    if (idx === 0) {
      return `${Math.floor(animValue).toLocaleString()}${stat.suffix || ''}`;
    } else if (idx === 1) {
      return `${animValue.toFixed(1)}${stat.suffix || ''}`;
    } else if (idx === 2) {
      return `${Math.floor(animValue)}${stat.suffix || ''}`;
    } else if (idx === 3) {
      return `< ${Math.floor(animValue)} min`;
    }
    return stat.value;
  };

  return (
    <section
      ref={sectionRef}
      style={{
        background: 'var(--bg-root)',
        padding: 'clamp(3rem, 6vw, 4.5rem) 0',
        position: 'relative'
      }}
    >
      <div className="container">
        <div
          className="stats-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 'clamp(1.25rem, 3vw, 2rem)',
            maxWidth: '1200px',
            margin: '0 auto'
          }}
        >
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="glass-card"
              style={{
                padding: 'clamp(1.75rem, 3vw, 2.25rem) clamp(1.25rem, 2vw, 1.5rem)',
                textAlign: 'center',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.95)',
                transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 0.12}s`,
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '60px',
                  height: '60px',
                  margin: '0 auto 1.25rem auto',
                  borderRadius: '14px',
                  background: 'var(--bg-alt)',
                  position: 'relative'
                }}
              >
                {stat.icon}
              </div>

              <div
                style={{
                  fontSize: 'clamp(1.85rem, 3.5vw, 2.5rem)',
                  fontWeight: 800,
                  color: 'var(--color-primary)',
                  marginBottom: '0.5rem',
                  lineHeight: 1,
                  fontVariantNumeric: 'tabular-nums'
                }}
              >
                {isVisible ? formatValue(idx) : '0'}
              </div>

              <div
                style={{
                  fontSize: 'clamp(0.95rem, 1.5vw, 1.05rem)',
                  fontWeight: 700,
                  color: 'var(--text-heading)',
                  marginBottom: '0.35rem',
                  lineHeight: 1.3
                }}
              >
                {stat.label}
              </div>

              <div
                style={{
                  fontSize: '0.875rem',
                  color: 'var(--text-muted)',
                  lineHeight: 1.4
                }}
              >
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
