import React from 'react';
import { Layers, SearchX, ShieldAlert } from 'lucide-react';

export default function PainPointsCard() {
  const bottlenecks = [
    {
      title: 'Fragmented data silos',
      description:
        'Important information is stored in file storage, CRM, collaboration tools, and internal chat.',
      icon: Layers
    },
    {
      title: 'Inefficient retrieval',
      description:
        'Conventional search produces irrelevant results, so people have to assemble answers manually.',
      icon: SearchX
    },
    {
      title: 'Difficult data governance',
      description:
        'Too many systems means inefficient management and compliance issues.',
      icon: ShieldAlert
    }
  ];

  return (
    <div className="purpose-built-container-card">
      <div className="purpose-built-header">
        <h2 className="purpose-built-title">
          Your answers are there. You just can't locate them.
        </h2>
        <p className="purpose-built-subtitle">
          Today, companies are challenged to keep up with the ever-increasing pile of information.
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
