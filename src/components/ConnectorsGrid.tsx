import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { ConnectorItem } from '../types';

import snowflakeLogo from '../assets/logos/Snowflake-logo.png';
import bigqueryLogo from '../assets/logos/google-bigquery.png';
import redshiftLogo from '../assets/logos/amazon-redshift.webp';
import databricksLogo from '../assets/logos/databricks.svg';
import msfabricLogo from '../assets/logos/ms-fabric.png';
import clickhouseLogo from '../assets/logos/clickhouse.svg';
import athenaLogo from '../assets/logos/aws-athena.png';
import postgresqlLogo from '../assets/logos/postgres.webp';
import mysqlLogo from '../assets/logos/mysql.png';
import mssqlLogo from '../assets/logos/ms-sql-server.jpg';
import oracleLogo from '../assets/logos/Oracle-Logo.png';
import mongodbLogo from '../assets/logos/mongodb.svg';
import duckdbLogo from '../assets/logos/duck-db.png';
import salesforceLogo from '../assets/logos/salesforce.png';
import excelLogo from '../assets/logos/ms-excel.webp';
import jiraLogo from '../assets/logos/jira.jpg';
import dbtLogo from '../assets/logos/dbt.png';

const CONNECTORS: ConnectorItem[] = [
  // Warehouses
  { id: 'snowflake', name: 'Snowflake', category: 'warehouse', logoUrl: snowflakeLogo, badge: 'Data Warehouse', description: 'Ask questions across your Snowflake data instantly — no code required.' },
  { id: 'bigquery', name: 'Google BigQuery', category: 'warehouse', logoUrl: bigqueryLogo, badge: 'Data Warehouse', description: 'Get instant answers from your Google BigQuery datasets in plain English.' },
  { id: 'redshift', name: 'Amazon Redshift', category: 'warehouse', logoUrl: redshiftLogo, badge: 'Data Warehouse', description: 'Query your AWS Redshift data without SQL knowledge or analyst support.' },
  { id: 'databricks', name: 'Databricks', category: 'warehouse', logoUrl: databricksLogo, badge: 'Data Warehouse', description: 'Ask business questions on your Databricks data assets and Delta Lake tables.' },
  { id: 'msfabric', name: 'Microsoft Fabric', category: 'warehouse', logoUrl: msfabricLogo, badge: 'Enterprise', description: 'Bring your Microsoft Fabric analytics into one conversational interface.' },
  { id: 'clickhouse', name: 'ClickHouse', category: 'warehouse', logoUrl: clickhouseLogo, badge: 'Real-Time Data', description: 'Get fast answers from high-volume event and analytics data in real time.' },
  { id: 'athena', name: 'AWS Athena', category: 'warehouse', logoUrl: athenaLogo, badge: 'Cloud Data', description: 'Query your data lake on S3 without writing a single line of SQL.' },
  // Databases
  { id: 'postgresql', name: 'PostgreSQL', category: 'database', logoUrl: postgresqlLogo, badge: 'Database', description: 'Get answers from your company database without touching SQL.' },
  { id: 'mysql', name: 'MySQL', category: 'database', logoUrl: mysqlLogo, badge: 'Database', description: 'Ask questions directly against your MySQL production database.' },
  { id: 'mssql', name: 'Microsoft SQL Server', category: 'database', logoUrl: mssqlLogo, badge: 'Enterprise DB', description: 'Connect your SQL Server data and start querying in plain English.' },
  { id: 'oracle', name: 'Oracle Database', category: 'database', logoUrl: oracleLogo, badge: 'Enterprise DB', description: 'Unlock insights from your Oracle enterprise data with simple questions.' },
  { id: 'mongodb', name: 'MongoDB', category: 'database', logoUrl: mongodbLogo, badge: 'Document DB', description: 'Ask questions about your document data as if talking to a colleague.' },
  { id: 'duckdb', name: 'DuckDB', category: 'database', logoUrl: duckdbLogo, badge: 'Embedded DB', description: 'Fast analytical queries on local or embedded data — no infrastructure needed.' },
  // SaaS & Files
  { id: 'salesforce', name: 'Salesforce', category: 'saas', logoUrl: salesforceLogo, badge: 'CRM', description: 'Query your pipeline, leads, and revenue data directly from Salesforce.' },
  { id: 'excel', name: 'Excel & CSV Files', category: 'saas', logoUrl: excelLogo, badge: 'Spreadsheets', description: 'Upload any spreadsheet and start asking questions immediately.' },
  { id: 'jira', name: 'Jira', category: 'saas', logoUrl: jiraLogo, badge: 'Project Tool', description: 'Ask questions about team output, sprint velocity, and delivery timelines.' },
  { id: 'dbt', name: 'dbt', category: 'saas', logoUrl: dbtLogo, badge: 'Data Model', description: 'Your business metric definitions automatically understood and applied.' },
];

export const ConnectorsGrid: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'warehouse' | 'database' | 'saas'>('all');
  const [search, setSearch] = useState('');
  const [showAll, setShowAll] = useState(false);
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

  // Featured connectors (8-10 most important ones)
  const featuredIds = [
    'snowflake', 'bigquery', 'redshift',
    'postgresql', 'mysql', 'mssql',
    'salesforce', 'excel', 'dbt'
  ];

  const filtered = CONNECTORS.filter(c => {
    const matchTab = activeTab === 'all' || c.category === activeTab;
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
                        c.description.toLowerCase().includes(search.toLowerCase());
    const matchFeatured = showAll || search.length > 0 || featuredIds.includes(c.id);
    return matchTab && matchSearch && matchFeatured;
  });

  const tabs: { id: typeof activeTab; label: string }[] = [
    { id: 'all', label: `All (${CONNECTORS.length})` },
    { id: 'warehouse', label: 'Data Warehouses' },
    { id: 'database', label: 'Databases' },
    { id: 'saas', label: 'SaaS & Files' },
  ];

  return (
    <section
      ref={sectionRef}
      id="connectors"
      style={{
        background: 'var(--bg-root)',
        padding: 'clamp(3rem, 6vw, 4.5rem) 0'
      }}
    >
      <div className="container">
        <div
          style={{
            textAlign: 'center',
            maxWidth: '750px',
            margin: '0 auto clamp(2.5rem, 5vw, 3rem) auto',
            padding: '0 1rem',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          <span className="badge-tag" style={{ marginBottom: '1rem', display: 'inline-flex' }}>
            Integrations
          </span>
          <h2 style={{
            fontSize: 'clamp(1.75rem, 4vw, 2.4rem)',
            fontWeight: 800,
            color: 'var(--text-heading)',
            marginBottom: 'clamp(0.75rem, 2vw, 1rem)',
            lineHeight: 1.2
          }}>
            Works With the Tools You Already Use
          </h2>
          <p style={{
            fontSize: 'clamp(1rem, 1.8vw, 1.05rem)',
            color: 'var(--text-muted)',
            lineHeight: 1.65
          }}>
            Adople Agentic Data Analyst connects to your existing data sources — no migrations, no new infrastructure. Just plug in and start asking questions.
          </p>
        </div>

        {/* Filter bar with Glass effect */}
        <div
          className="glass-card"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 'clamp(0.75rem, 2vw, 1rem)',
            marginBottom: 'clamp(1.5rem, 3vw, 2rem)',
            padding: 'clamp(0.65rem, 1.5vw, 0.85rem) clamp(1rem, 2vw, 1.25rem)',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s'
          }}
        >
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="btn-secondary"
                style={{
                  padding: '0.4rem 0.9rem', fontSize: '0.85rem',
                  background: activeTab === tab.id ? 'var(--color-primary-light)' : '#FFFFFF',
                  borderColor: activeTab === tab.id ? 'var(--color-primary)' : 'var(--border-default)',
                  color: activeTab === tab.id ? 'var(--color-primary)' : 'var(--text-muted)',
                  fontWeight: activeTab === tab.id ? 700 : 600
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div style={{ position: 'relative', width: '220px' }}>
            <Search size={15} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-placeholder)' }} />
            <input
              type="text"
              placeholder="Search integrations..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                width: '100%', padding: '0.45rem 0.9rem 0.45rem 2.1rem',
                background: '#FFFFFF', border: '1px solid var(--border-default)',
                borderRadius: '8px', color: 'var(--text-heading)', fontSize: '0.85rem', outline: 'none'
              }}
            />
          </div>
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
          gap: 'clamp(1rem, 2vw, 1.25rem)'
        }}>
          {filtered.map((item, idx) => (
            <div
              key={item.id}
              className="glass-card"
              style={{
                padding: 'clamp(1.25rem, 2vw, 1.5rem)',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.3 + idx * 0.05}s`
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
                <div style={{
                  width: '42px', height: '42px',
                  borderRadius: '10px',
                  background: '#F8FAFC',
                  border: '1px solid var(--border-default)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  padding: '7px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
                }}>
                  <img
                    src={item.logoUrl}
                    alt={item.name}
                    style={{ width: '28px', height: '28px', objectFit: 'contain' }}
                  />
                </div>
                {item.badge && (
                  <span style={{
                    fontSize: '0.7rem', fontWeight: 700,
                    padding: '0.2rem 0.55rem',
                    borderRadius: 'var(--radius-full)',
                    background: 'var(--color-primary-light)',
                    color: 'var(--color-primary)',
                    border: '1px solid var(--color-primary-mid)'
                  }}>
                    {item.badge}
                  </span>
                )}
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-heading)', marginBottom: '0.35rem' }}>
                {item.name}
              </h3>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* See All button */}
        {!showAll && search.length === 0 && (
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <button
              onClick={() => setShowAll(true)}
              className="btn-secondary"
              style={{ padding: '0.85rem 2rem' }}
            >
              See All {CONNECTORS.length} Integrations →
            </button>
          </div>
        )}

        {/* Bottom note */}
        <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
          Don't see your data source? <a href="#" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Contact us</a> — we add new connectors regularly.
        </p>
      </div>
    </section>
  );
};
