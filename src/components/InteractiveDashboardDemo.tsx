import React, { useState, useEffect, useRef } from 'react';
import ReactECharts from 'echarts-for-react';
import { BarChart2, PieChart, TrendingUp, Sparkles } from 'lucide-react';

export const InteractiveDashboardDemo: React.FC = () => {
  const [activePreset, setActivePreset] = useState<'revenue' | 'market' | 'growth'>('revenue');
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

  const getOption = () => {
    const base = {
      backgroundColor: 'transparent',
      grid: {
        left: '8%',
        right: '8%',
        top: '15%',
        bottom: '10%',
        containLabel: true
      },
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
          {
            name: 'North America',
            type: 'bar',
            data: [420000, 580000, 720000, 890000],
            itemStyle: { color: '#0F766E', borderRadius: [4, 4, 0, 0] }
          },
          {
            name: 'APAC',
            type: 'bar',
            data: [310000, 470000, 640000, 810000],
            itemStyle: { color: '#F59E0B', borderRadius: [4, 4, 0, 0] }
          }
        ]
      };
    } else if (activePreset === 'market') {
      // Pie chart configuration with proper mobile/desktop layout
      const isMobile = window.innerWidth <= 640;

      return {
        backgroundColor: 'transparent',
        tooltip: { trigger: 'item', backgroundColor: '#FFFFFF', borderColor: '#E2E8F0', textStyle: { color: '#334155' } },
        legend: {
          orient: isMobile ? 'horizontal' : 'vertical',
          ...(isMobile ? {
            left: 'center',
            bottom: '8%'
          } : {
            left: '5%',
            top: 'center'
          }),
          textStyle: { color: '#64748B', fontSize: isMobile ? 10 : 13 },
          itemGap: isMobile ? 12 : 12,
          itemWidth: isMobile ? 12 : 14,
          itemHeight: isMobile ? 12 : 14
        },
        series: [
          {
            name: 'Regional Breakdown',
            type: 'pie',
            radius: isMobile ? ['38%', '62%'] : ['42%', '68%'],
            center: isMobile ? ['50%', '42%'] : ['58%', '50%'],
            itemStyle: { borderRadius: 8, borderColor: '#FFFFFF', borderWidth: 3 },
            label: { show: false },
            data: [
              { value: 1048, name: 'North America (42%)', itemStyle: { color: '#0F766E' } },
              { value: 700, name: 'APAC (28%)', itemStyle: { color: '#F59E0B' } },
              { value: 550, name: 'EMEA (22%)', itemStyle: { color: '#64748B' } },
              { value: 200, name: 'Other (8%)', itemStyle: { color: '#E2E8F0' } }
            ]
          }
        ]
      };
    } else {
      return {
        ...base,
        tooltip: { trigger: 'axis', backgroundColor: '#FFFFFF', borderColor: '#E2E8F0', textStyle: { color: '#334155' } },
        xAxis: {
          type: 'category',
          data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          axisLabel: { color: '#64748B' },
          axisLine: { lineStyle: { color: '#E2E8F0' } }
        },
        yAxis: {
          type: 'value',
          axisLabel: { color: '#64748B', formatter: (v: number) => `${v}%` },
          splitLine: { lineStyle: { color: '#F1F5F9' } }
        },
        series: [
          {
            name: 'YoY Revenue Growth',
            type: 'line',
            smooth: true,
            data: [8.2, 11.4, 14.8, 17.2, 21.6, 24.8],
            itemStyle: { color: '#0F766E' },
            lineStyle: { color: '#0F766E', width: 3 },
            areaStyle: { color: 'rgba(15,118,110,0.1)' }
          }
        ]
      };
    }
  };

  const presets = [
    { id: 'revenue', label: 'Revenue by Region', icon: <TrendingUp size={14} /> },
    { id: 'market', label: 'Market Breakdown', icon: <PieChart size={14} /> },
    { id: 'growth', label: 'Growth Trend', icon: <BarChart2 size={14} /> },
  ] as const;

  return (
    <section
      ref={sectionRef}
      style={{
        background: 'var(--bg-alt)',
        padding: 'clamp(2.5rem, 6vw, 4.5rem) 0',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div className="container">
        <div
          style={{
            textAlign: 'center',
            maxWidth: '750px',
            margin: '0 auto clamp(2rem, 4vw, 2.5rem) auto',
            padding: '0 clamp(1rem, 3vw, 1.5rem)',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          <span className="badge-tag" style={{
            marginBottom: 'clamp(0.75rem, 2vw, 1rem)',
            display: 'inline-flex'
          }}>
            Live Dashboard Preview
          </span>
          <h2 style={{
            fontSize: 'clamp(1.5rem, 4vw, 2.4rem)',
            fontWeight: 800,
            color: 'var(--text-heading)',
            marginBottom: 'clamp(0.65rem, 2vw, 1rem)',
            lineHeight: 1.25
          }}>
            See Your Business Data Come to Life
          </h2>
          <p style={{
            fontSize: 'clamp(0.9rem, 1.8vw, 1.05rem)',
            color: 'var(--text-muted)',
            lineHeight: 1.6
          }}>
            Ask a question. Get an instant chart, table, or trend. Share it with your team in one click. No setup. No data prep.
          </p>
        </div>

        {/* Chart Card with Glassmorphism */}
        <div
          className="glass-card"
          style={{
            background: 'var(--glass-bg-strong)',
            borderRadius: 'clamp(12px, 3vw, 20px)',
            padding: 'clamp(1rem, 2.5vw, 1.75rem)',
            boxShadow: 'var(--shadow-hover)',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.95)',
            transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
            marginBottom: 'clamp(1rem, 3vw, 0)', // Extra margin on mobile for CTA
            overflow: 'hidden',
            maxWidth: '100%'
          }}
        >
          {/* Chart control bar */}
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 'clamp(0.75rem, 2vw, 1rem)',
            marginBottom: 'clamp(1rem, 2.5vw, 1.5rem)',
            paddingBottom: 'clamp(0.85rem, 2vw, 1.25rem)',
            borderBottom: '1px solid var(--border-default)'
          }}>
            <div style={{
              display: 'flex',
              gap: 'clamp(0.4rem, 1vw, 0.5rem)',
              flexWrap: 'wrap',
              flex: '1 1 auto'
            }}>
              {presets.map(p => (
                <button
                  key={p.id}
                  onClick={() => setActivePreset(p.id)}
                  className="btn-secondary"
                  style={{
                    padding: 'clamp(0.35rem, 1vw, 0.4rem) clamp(0.65rem, 1.5vw, 0.85rem)',
                    fontSize: 'clamp(0.75rem, 1.5vw, 0.84rem)',
                    background: activePreset === p.id ? 'var(--color-primary-light)' : '#FFFFFF',
                    borderColor: activePreset === p.id ? 'var(--color-primary)' : 'var(--border-default)',
                    color: activePreset === p.id ? 'var(--color-primary)' : 'var(--text-muted)',
                    fontWeight: activePreset === p.id ? 700 : 600,
                    gap: 'clamp(0.25rem, 0.8vw, 0.35rem)',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {p.icon} <span className="btn-label-text">{p.label}</span>
                </button>
              ))}
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'clamp(0.25rem, 0.8vw, 0.35rem)',
              fontSize: 'clamp(0.7rem, 1.5vw, 0.8rem)',
              fontWeight: 600,
              color: '#10B981',
              whiteSpace: 'nowrap',
              flexShrink: 0
            }}>
              <Sparkles size={13} /> <span>Auto-generated</span>
            </div>
          </div>

          {/* ECharts — key forces full remount on preset change to prevent chart overlap */}
          <div style={{
            height: 'clamp(280px, 45vw, 360px)',
            width: '100%',
            minHeight: '280px',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <ReactECharts
              key={activePreset}
              option={getOption()}
              style={{
                height: '100%',
                width: '100%',
                position: 'absolute',
                top: 0,
                left: 0
              }}
              notMerge={true}
            />
          </div>
        </div>

        {/* Responsive styles */}
        <style>{`
          @media (max-width: 640px) {
            .btn-label-text {
              display: inline;
            }
          }

          @media (max-width: 480px) {
            /* Hide button labels on very small screens, show icons only */
            .btn-label-text {
              display: none;
            }
          }
        `}</style>
      </div>
    </section>
  );
};
