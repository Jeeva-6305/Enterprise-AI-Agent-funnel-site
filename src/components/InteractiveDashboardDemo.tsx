import React, { useState, useEffect, useRef } from 'react';
import ReactECharts from 'echarts-for-react';
import { BarChart2, PieChart, TrendingUp, Sparkles, Zap, ShieldCheck, Clock } from 'lucide-react';

export const InteractiveDashboardDemo: React.FC = () => {
  const [activePreset, setActivePreset] = useState<'revenue' | 'market' | 'growth'>('revenue');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { setIsVisible(entry.isIntersecting); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
  }, []);

  const getOption = () => {
    const base = {
      backgroundColor: 'transparent',
      grid: { left: '8%', right: '8%', top: '15%', bottom: '10%', containLabel: true },
    };

    if (activePreset === 'revenue') {
      return {
        ...base,
        tooltip: { trigger: 'axis', backgroundColor: '#FFFFFF', borderColor: '#E2E8F0', textStyle: { color: '#334155' } },
        legend: { textStyle: { color: '#64748B', fontSize: 12 } },
        xAxis: {
          type: 'category',
          data: ['Q1', 'Q2', 'Q3', 'Q4'],
          axisLine: { lineStyle: { color: '#E2E8F0' } },
          axisLabel: { color: '#64748B' }
        },
        yAxis: {
          type: 'value',
          axisLine: { lineStyle: { color: '#E2E8F0' } },
          splitLine: { lineStyle: { color: '#F1F5F9' } },
          axisLabel: { color: '#64748B', formatter: (v: number) => `$${(v / 1000).toFixed(0)}k` }
        },
        series: [
          { name: 'North America', type: 'bar', data: [420000, 580000, 720000, 890000], itemStyle: { color: '#2B2D6E', borderRadius: [4, 4, 0, 0] } },
          { name: 'APAC', type: 'bar', data: [310000, 470000, 640000, 810000], itemStyle: { color: '#E8664C', borderRadius: [4, 4, 0, 0] } }
        ]
      };
    } else if (activePreset === 'market') {
      const isMobile = window.innerWidth <= 640;
      return {
        backgroundColor: 'transparent',
        tooltip: { trigger: 'item', backgroundColor: '#FFFFFF', borderColor: '#E2E8F0', textStyle: { color: '#334155' } },
        legend: {
          orient: isMobile ? 'horizontal' : 'vertical',
          ...(isMobile ? { left: 'center', bottom: '8%' } : { left: '5%', top: 'center' }),
          textStyle: { color: '#64748B', fontSize: isMobile ? 10 : 13 },
          itemGap: 12, itemWidth: isMobile ? 12 : 14, itemHeight: isMobile ? 12 : 14
        },
        series: [{
          name: 'Regional Breakdown',
          type: 'pie',
          radius: isMobile ? ['38%', '62%'] : ['42%', '68%'],
          center: isMobile ? ['50%', '42%'] : ['58%', '50%'],
          itemStyle: { borderRadius: 8, borderColor: '#FFFFFF', borderWidth: 3 },
          label: { show: false },
          data: [
            { value: 1048, name: 'North America (42%)', itemStyle: { color: '#2B2D6E' } },
            { value: 700,  name: 'APAC (28%)',          itemStyle: { color: '#E8664C' } },
            { value: 550,  name: 'EMEA (22%)',          itemStyle: { color: '#55546B' } },
            { value: 200,  name: 'Other (8%)',          itemStyle: { color: '#4C9A7A' } }
          ]
        }]
      };
    } else {
      return {
        ...base,
        tooltip: { trigger: 'axis', backgroundColor: '#FFFFFF', borderColor: 'rgba(28,27,46,0.12)', textStyle: { color: '#1C1B2E' } },
        xAxis: {
          type: 'category',
          data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          axisLabel: { color: '#55546B' },
          axisLine: { lineStyle: { color: 'rgba(28,27,46,0.12)' } }
        },
        yAxis: {
          type: 'value',
          axisLabel: { color: '#55546B', formatter: (v: number) => `${v}%` },
          splitLine: { lineStyle: { color: 'rgba(28,27,46,0.08)' } }
        },
        series: [{
          name: 'YoY Revenue Growth',
          type: 'line',
          smooth: true,
          data: [8.2, 11.4, 14.8, 17.2, 21.6, 24.8],
          itemStyle: { color: '#2B2D6E' },
          lineStyle: { color: '#2B2D6E', width: 3 },
          areaStyle: { color: 'rgba(43,45,110,0.1)' }
        }]
      };
    }
  };

  const presets = [
    { id: 'revenue', label: 'Revenue by Region', icon: <TrendingUp size={13} /> },
    { id: 'market',  label: 'Market Breakdown',  icon: <PieChart   size={13} /> },
    { id: 'growth',  label: 'Growth Trend',       icon: <BarChart2  size={13} /> },
  ] as const;

  /* ── 3 stat cards on the right ── */
  const statCards = [
    {
      tag: 'Verified',
      tagColor: '#4C9A7A',
      tagBg: 'rgba(76,154,122,0.1)',
      label: 'Answer Accuracy Rate',
      value: '99.2%',
      sub: 'Year-over-year average across all enterprise queries',
      icon: <ShieldCheck size={15} color="#4C9A7A" />,
      accent: '#4C9A7A',
      barGradient: 'linear-gradient(90deg, #2B2D6E 0%, #4C9A7A 60%, #E8664C 100%)',
      barWidth: '93%',
      footer: ['AI-verified', 'Audited Monthly'],
    },
    {
      tag: 'Live',
      tagColor: '#E8664C',
      tagBg: 'rgba(232,102,76,0.1)',
      label: 'Business Questions Answered',
      value: '10,000+',
      sub: 'Across all connected data sources, no code required',
      icon: <Zap size={15} color="#E8664C" />,
      accent: '#E8664C',
      barGradient: 'linear-gradient(90deg, #2B2D6E 0%, #E8664C 80%)',
      barWidth: '78%',
      footer: ['50+ Enterprise Clients', 'Real-time Updates'],
    },
    {
      tag: 'Fast',
      tagColor: '#2B2D6E',
      tagBg: 'rgba(43,45,110,0.08)',
      label: 'Average Setup Time',
      value: '< 5 Min',
      sub: 'From connection to first insight, no data prep needed',
      icon: <Clock size={15} color="#2B2D6E" />,
      accent: '#2B2D6E',
      barGradient: 'linear-gradient(90deg, #2B2D6E 0%, #55546B 100%)',
      barWidth: '40%',
      footer: ['No Training Required', 'Instant Connection'],
    },
  ];

  return (
    <section
      ref={sectionRef}
      style={{
        background: 'var(--bg-alt)',
        padding: 'clamp(2rem, 5vw, 3.5rem) 0',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div className="container">

        {/* ── Section header ── */}
        <div style={{
          textAlign: 'center',
          maxWidth: '680px',
          margin: '0 auto clamp(1.5rem, 3vw, 2rem) auto',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
          transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1)'
        }}>
          <span className="badge-tag" style={{ marginBottom: '0.65rem', display: 'inline-flex' }}>
            Live Dashboard Preview
          </span>
          <h2 style={{
            fontSize: 'clamp(1.4rem, 3.5vw, 2.2rem)',
            fontWeight: 800,
            color: 'var(--text-heading)',
            marginBottom: '0.6rem',
            lineHeight: 1.2
          }}>
            See Your Business Data Come to Life
          </h2>
          <p style={{
            fontSize: 'clamp(0.875rem, 1.6vw, 1rem)',
            color: 'var(--text-muted)',
            lineHeight: 1.6
          }}>
            Ask a question. Get an instant chart, table, or trend. Share it with your team in one click. No setup. No data prep.
          </p>
        </div>

        {/* ── Two-column dashboard layout ── */}
        <div className="idd-grid">

          {/* ── LEFT: Interactive chart card ── */}
          <div
            className="idd-left-card"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
              transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s'
            }}
          >
            {/* Card header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '0.5rem',
              marginBottom: '1rem',
              paddingBottom: '0.85rem',
              borderBottom: '1px solid var(--border-default)'
            }}>
              {/* Tab buttons */}
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                {presets.map(p => (
                  <button
                    key={p.id}
                    onClick={() => setActivePreset(p.id)}
                    className="btn-secondary"
                    style={{
                      padding: '0.35rem 0.75rem',
                      fontSize: '0.78rem',
                      background: activePreset === p.id ? 'var(--color-primary-light)' : '#FFFFFF',
                      borderColor: activePreset === p.id ? 'var(--color-primary)' : 'var(--border-default)',
                      color: activePreset === p.id ? 'var(--color-primary)' : 'var(--text-muted)',
                      fontWeight: activePreset === p.id ? 700 : 600,
                      gap: '0.3rem',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {p.icon}
                    <span className="btn-label-text">{p.label}</span>
                  </button>
                ))}
              </div>
              {/* Auto-generated badge */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '0.3rem',
                fontSize: '0.75rem', fontWeight: 600, color: '#4C9A7A', whiteSpace: 'nowrap'
              }}>
                <Sparkles size={12} /> <span>Auto-generated</span>
              </div>
            </div>

            {/* ECharts */}
            <div style={{ height: 'clamp(220px, 30vw, 280px)', width: '100%', position: 'relative', overflow: 'hidden' }}>
              <ReactECharts
                key={activePreset}
                option={getOption()}
                style={{ height: '100%', width: '100%', position: 'absolute', top: 0, left: 0 }}
                notMerge={true}
              />
            </div>
          </div>

          {/* ── RIGHT: 3 stacked stat cards ── */}
          <div className="idd-right-col">
            {statCards.map((card, idx) => (
              <div
                key={idx}
                className="idd-stat-card"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateX(0)' : 'translateX(30px)',
                  transition: `all 0.65s cubic-bezier(0.16,1,0.3,1) ${0.15 + idx * 0.1}s`
                }}
              >
                {/* Card top row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <div style={{
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    letterSpacing: '0.07em',
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)'
                  }}>
                    {card.label}
                  </div>
                  <span style={{
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    color: card.tagColor,
                    background: card.tagBg,
                    borderRadius: '4px',
                    padding: '0.15rem 0.45rem',
                  }}>
                    {card.tag}
                  </span>
                </div>

                {/* Big value */}
                <div style={{
                  fontSize: 'clamp(1.4rem, 2.8vw, 1.8rem)',
                  fontWeight: 900,
                  color: 'var(--text-heading)',
                  lineHeight: 1.1,
                  marginBottom: '0.3rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}>
                  {card.icon}
                  {card.value}
                </div>

                {/* Sub text */}
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', lineHeight: 1.4, marginBottom: '0.65rem' }}>
                  {card.sub}
                </div>

                {/* Progress bar */}
                <div style={{
                  height: '4px',
                  background: 'var(--border-default)',
                  borderRadius: '9999px',
                  marginBottom: '0.55rem',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    height: '100%',
                    width: card.barWidth,
                    background: card.barGradient,
                    borderRadius: '9999px',
                    transition: 'width 1s ease'
                  }} />
                </div>

                {/* Footer pills */}
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  {card.footer.map((f, fi) => (
                    <span key={fi} style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 600 }}>{f}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Responsive styles ── */}
        <style>{`
          .idd-grid {
            display: grid;
            grid-template-columns: 1.15fr 0.85fr;
            gap: clamp(1rem, 2.5vw, 1.5rem);
            align-items: start;
          }

          .idd-left-card {
            background: var(--glass-bg-strong);
            border: 1px solid var(--border-default);
            border-radius: 16px;
            padding: clamp(1rem, 2.5vw, 1.4rem);
            box-shadow: var(--shadow-hover);
          }

          .idd-right-col {
            display: flex;
            flex-direction: column;
            gap: clamp(0.65rem, 1.5vw, 0.85rem);
          }

          .idd-stat-card {
            background: var(--glass-bg-strong);
            border: 1px solid var(--border-default);
            border-radius: 12px;
            padding: clamp(0.85rem, 2vw, 1.1rem);
            box-shadow: 0 2px 12px rgba(15,23,42,0.06);
            transition: box-shadow 0.25s ease, transform 0.25s ease;
          }

          .idd-stat-card:hover {
            box-shadow: 0 8px 24px rgba(15,23,42,0.12);
            transform: translateY(-2px);
          }

          @media (max-width: 820px) {
            .idd-grid {
              grid-template-columns: 1fr;
            }
            .idd-right-col {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 0.65rem;
            }
          }

          @media (max-width: 520px) {
            .idd-right-col {
              grid-template-columns: 1fr;
            }
            .btn-label-text { display: none; }
          }
        `}</style>

      </div>
    </section>
  );
};
