import React from 'react';
import { Users, UserCheck, Sparkles, Building2 } from 'lucide-react';

export default function LeadStats({ stats }) {
  if (!stats) return null;

  return (
    <div className="stats-grid">
      {/* Total Leads */}
      <div className="stat-card">
        <div className="stat-info">
          <span className="stat-label">Total SQL Leads</span>
          <span className="stat-value">{stats.totalLeads || 0}</span>
        </div>
        <div className="stat-icon-wrap orange">
          <Users size={24} />
        </div>
      </div>

      {/* New Leads */}
      <div className="stat-card">
        <div className="stat-info">
          <span className="stat-label">New Submissions</span>
          <span className="stat-value">{stats.newLeads || 0}</span>
        </div>
        <div className="stat-icon-wrap blue">
          <Sparkles size={24} />
        </div>
      </div>

      {/* Qualified / Demo */}
      <div className="stat-card">
        <div className="stat-info">
          <span className="stat-label">Qualified &amp; Demos</span>
          <span className="stat-value">{stats.qualifiedLeads || 0}</span>
        </div>
        <div className="stat-icon-wrap green">
          <UserCheck size={24} />
        </div>
      </div>

      {/* Enterprise Leads */}
      <div className="stat-card">
        <div className="stat-info">
          <span className="stat-label">Top Segments</span>
          <span className="stat-value" style={{ fontSize: '1.25rem' }}>
            {stats.companySizeBreakdown && stats.companySizeBreakdown.length > 0
              ? stats.companySizeBreakdown[0].company_size 
              : 'No submissions yet'}
          </span>
        </div>
        <div className="stat-icon-wrap purple">
          <Building2 size={24} />
        </div>
      </div>
    </div>
  );
}
