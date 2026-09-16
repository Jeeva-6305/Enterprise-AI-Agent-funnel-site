import React from 'react';
import { Network, Zap, ShieldCheck, CheckCircle, Shield, Clock } from 'lucide-react';

export default function PainPointsCard() {
  const painPoints = [
    {
      title: 'Fragmented Enterprise Workflows',
      description: 'Stop losing critical hours coordinating multi-step tasks across disconnected software systems.',
      icon: <Network size={20} className="template-item-icon" />
    },
    {
      title: 'Slow Operational Turnaround',
      description: 'Automate routine and complex business processes with real-time autonomous agent execution.',
      icon: <Clock size={20} className="template-item-icon" />
    },
    {
      title: 'Governance & Compliance Risks',
      description: 'Enforce ironclad data privacy, granular role permissions, and full auditable agent execution logs.',
      icon: <ShieldCheck size={20} className="template-item-icon" />
    }
  ];

  return (
    <div className="purpose-built-template-card">
      <div>
        <h3 className="template-card-title">
          Purpose-built for enterprise scale
        </h3>
        <p className="template-card-subtitle">
          If your organization is dealing with these operational bottlenecks, our AI Agent platform is built for you:
        </p>

        <div className="template-items-list">
          {painPoints.map((point, index) => (
            <div key={index} className="template-item-row">
              <div className="template-icon-container">
                {point.icon}
              </div>
              <div className="template-text-container">
                <p className="template-item-title">{point.title}</p>
                <p className="template-item-desc">{point.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Value Badges */}
      <div className="purpose-built-footer-metrics">
        <div className="metric-pill">
          <Zap size={14} className="metric-icon" />
          <span><strong>15x</strong> Faster Execution</span>
        </div>
        <div className="metric-pill">
          <CheckCircle size={14} className="metric-icon" />
          <span><strong>99.9%</strong> Field Accuracy</span>
        </div>
        <div className="metric-pill">
          <Shield size={14} className="metric-icon" />
          <span><strong>SOC2</strong> Type II Ready</span>
        </div>
      </div>
    </div>
  );
}


