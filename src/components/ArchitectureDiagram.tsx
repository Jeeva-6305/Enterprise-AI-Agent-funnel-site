import React, { useState } from 'react';
import { Layers, Shield, Cpu, Database, Server, Terminal, RefreshCw, Zap } from 'lucide-react';

export const ArchitectureDiagram: React.FC = () => {
  const [selectedLayer, setSelectedLayer] = useState<string>('orchestration');

  const layers = [
    {
      id: 'ui',
      name: 'User Interface Layer',
      icon: Terminal,
      color: '#2B2D6E',
      tech: ['React.js / Nuxt.js', 'ECharts Dynamic Builder', 'WebSockets / REST'],
      desc: 'Conversational data UI rendering live charts, tables, and team dashboard widgets.'
    },
    {
      id: 'gateway',
      name: 'API Gateway & Security',
      icon: Shield,
      color: '#2B2D6E',
      tech: ['FastAPI Server', 'Active Directory / OAuth SSO', 'RBAC & Rate Limiter'],
      desc: 'Authenticates enterprise users, enforces row/column permission policies, and handles query routing.'
    },
    {
      id: 'orchestration',
      name: 'Agent Orchestration & Context Engine',
      icon: Cpu,
      color: '#2B2D6E',
      tech: ['Plan-Act-Observe Loop', 'LLM Judge', 'Context Builder', 'dbt Semantic Graph'],
      desc: 'Core intelligence layer parsing natural language, building context, and executing self-repair loops.'
    },
    {
      id: 'execution',
      name: 'Async Workers & LLM Sandbox',
      icon: Server,
      color: '#E8664C',
      tech: ['Celery Workers', 'Redis Task Queue', 'Isolated SQL Execution Sandbox'],
      desc: 'Asynchronous task queue executing queries concurrently without blocking main application looper threads.'
    },
    {
      id: 'storage',
      name: 'Enterprise Persistence & Data Sources',
      icon: Database,
      color: '#4C9A7A',
      tech: ['PostgreSQL Meta Store', 'Snowflake / BigQuery', 'Postgres / MSSQL / MySQL'],
      desc: 'Stores metric definitions, user audit logs, and connects directly to cloud data warehouses.'
    }
  ];

  return (
    <section id="architecture" className="section-padding" style={{ background: '#1C1B2E', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 3.5rem auto' }}>
          <div className="badge-tag" style={{ marginBottom: '1rem' }}>
            <Layers size={14} color="#E8664C" />
            <span>ENTERPRISE SYSTEM ARCHITECTURE</span>
          </div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '1rem' }}>
            Built for Enterprise Scale, Security & Observability
          </h2>
          <p style={{ fontSize: '1.05rem', color: '#94A3B8' }}>
            Decoupled microservice architecture isolating LLM API calls from production database execution.
          </p>
        </div>

        {/* Architecture Stack Flow Diagram */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 340px',
          gap: '2rem',
          alignItems: 'start'
        }}>
          {/* Stack Layers */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {layers.map((layer) => {
              const IconComp = layer.icon;
              const isSelected = selectedLayer === layer.id;
              return (
                <div
                  key={layer.id}
                  onClick={() => setSelectedLayer(layer.id)}
                  style={{
                    background: isSelected ? 'rgba(15, 23, 42, 0.95)' : 'rgba(15, 23, 42, 0.4)',
                    border: isSelected ? `1.5px solid ${layer.color}` : '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '16px',
                    padding: '1.25rem 1.5rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: isSelected ? `0 0 20px ${layer.color}20` : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '10px',
                      background: `${layer.color}15`,
                      border: `1px solid ${layer.color}40`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <IconComp size={20} color={layer.color} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#FFFFFF' }}>
                        {layer.name}
                      </h4>
                      <div style={{ fontSize: '0.82rem', color: '#94A3B8' }}>
                        {layer.desc}
                      </div>
                    </div>
                  </div>

                  <div style={{
                    fontSize: '0.75rem',
                    padding: '0.3rem 0.75rem',
                    borderRadius: '999px',
                    background: isSelected ? `${layer.color}20` : 'rgba(255,255,255,0.05)',
                    color: isSelected ? layer.color : '#64748B',
                    fontWeight: 600
                  }}>
                    {isSelected ? 'ACTIVE VIEW' : 'INSPECT'}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Details Sidebar Panel */}
          {(() => {
            const current = layers.find(l => l.id === selectedLayer) || layers[2];
            const IconComp = current.icon;
            return (
              <div style={{
                background: 'rgba(7, 10, 16, 0.95)',
                border: `1px solid ${current.color}40`,
                borderRadius: '20px',
                padding: '1.75rem',
                position: 'sticky',
                top: '100px',
                boxShadow: `0 10px 30px rgba(0,0,0,0.5)`
              }}>
                <div style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '14px',
                  background: `${current.color}20`,
                  border: `1px solid ${current.color}50`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem'
                }}>
                  <IconComp size={26} color={current.color} />
                </div>

                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.5rem' }}>
                  {current.name}
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#94A3B8', marginBottom: '1.5rem', lineHeight: '1.5' }}>
                  {current.desc}
                </p>

                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
                    Component Tech Stack:
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    {current.tech.map((t) => (
                      <div key={t} style={{
                        fontSize: '0.85rem',
                        color: '#E2E8F0',
                        padding: '0.4rem 0.75rem',
                        background: '#0E1422',
                        borderRadius: '6px',
                        border: '1px solid rgba(255,255,255,0.06)',
                        fontFamily: 'var(--font-mono)',
                        display: 'flex', alignItems: 'center', gap: '0.35rem'
                      }}>
                        <Zap size={12} color="#E8664C" /> {t}
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{
                  padding: '0.75rem',
                  borderRadius: '8px',
                  background: 'rgba(76, 154, 122, 0.1)',
                  border: '1px solid rgba(76, 154, 122, 0.25)',
                  color: '#4C9A7A',
                  fontSize: '0.8rem',
                  fontWeight: 600
                }}>
                  ✔ Fully compliant with SOC2 & HIPAA enterprise standards
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    </section>
  );
};
