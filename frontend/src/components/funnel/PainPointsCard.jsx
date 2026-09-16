import React from 'react';
import { Wallet, Network, EyeOff } from 'lucide-react';

export default function PainPointsCard() {
  const bottlenecks = [
    {
      title: 'Missed Revenue Opportunities',
      description:
        'Treating payments strictly as a transactional function leaves millions in potential overnight interest earnings on the table.',
      icon: Wallet
    },
    {
      title: 'Decentralized Payment Authority',
      description:
        'Managing multi-bank payment releases directly in bank portals rather than centralizing authority inside your ERP.',
      icon: Network
    },
    {
      title: 'Lack of Lifecycle Transparency',
      description:
        'Operating without real-time transparency spanning from payment initiation all the way to final reconciliation.',
      icon: EyeOff
    }
  ];

  return (
    <div className="purpose-built-container-card">
      <div className="purpose-built-header">
        <h2 className="purpose-built-title">
          Purpose-built for today's complexity
        </h2>
        <p className="purpose-built-subtitle">
          If your organization is dealing with these structural bottlenecks, this platform is built for you:
        </p>
      </div>

      <div className="purpose-built-items-list">
        {bottlenecks.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <div key={index} className="purpose-built-item-row">
              <div className="purpose-built-icon-wrap error-tint">
                <IconComponent size={20} className="purpose-built-error-icon" />
              </div>
              <div className="purpose-built-item-content">
                <h4 className="purpose-built-item-heading">{item.title}</h4>
                <p className="purpose-built-item-desc">{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
