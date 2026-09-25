import React, { useState, useEffect } from 'react';
import { Layers, SearchX, ShieldAlert } from 'lucide-react';

export default function PainPointsCard() {
  const [activeIndex, setActiveIndex] = useState(0);

  const bottlenecks = [
    {
      id: '01',
      title: 'Fragmented data silos',
      description:
        'Important information is stored in file storage, CRM, collaboration tools, and internal chat.',
      icon: Layers
    },
    {
      id: '02',
      title: 'Inefficient retrieval',
      description:
        'Conventional search produces irrelevant results, so people have to assemble answers manually.',
      icon: SearchX
    },
    {
      id: '03',
      title: 'Difficult data governance',
      description:
        'Too many systems means inefficient management and compliance issues.',
      icon: ShieldAlert
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % bottlenecks.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [activeIndex, bottlenecks.length]);

  const activeItem = bottlenecks[activeIndex];
  const ActiveIcon = activeItem.icon;

  return (
    <div className="pain-points-card-wrapper">
      {/* Section Header */}
      <div className="pain-points-header-area">
        <h2 className="pain-points-main-heading">
          Your answers are there. You just can't locate them.
        </h2>
        <p className="pain-points-main-subtext">
          Today, companies are challenged to keep up with the ever-increasing pile of information.
        </p>
      </div>

      {/* Split Interactive Card Layout */}
      <div className="pain-points-split-card">
        {/* Left Side: Numbered Vertical Tab List */}
        <div className="pain-points-tabs-col" role="tablist" aria-label="Enterprise Information Bottlenecks">
          {bottlenecks.map((item, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`pain-points-tab-btn ${isActive ? 'active' : ''}`}
                onClick={() => setActiveIndex(index)}
              >
                <span className="tab-number-badge">{item.id}</span>
                <span className="tab-title-text">{item.title}</span>
              </button>
            );
          })}
        </div>

        {/* Right Side: Active Item Detail Card */}
        <div className="pain-points-detail-col" role="tabpanel">
          {/* Subtle Background Watermark Icon */}
          <div className="detail-watermark-wrap" aria-hidden="true">
            <ActiveIcon size={130} strokeWidth={1} />
          </div>

          <div key={activeIndex} className="detail-content-inner detail-content-animated">
            {/* Top Icon Badge */}
            <div className="detail-icon-badge">
              <ActiveIcon size={20} />
            </div>

            {/* Active Heading & Description */}
            <h3 className="detail-item-title">{activeItem.title}</h3>
            <p className="detail-item-desc">{activeItem.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
