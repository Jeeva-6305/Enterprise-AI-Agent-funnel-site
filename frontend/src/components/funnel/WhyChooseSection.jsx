import React, { useState } from "react";
import {
  SearchCode,
  Plug,
  Zap,
  GitMerge,
  TrendingUp,
  BarChart3,
  Sparkles,
} from "lucide-react";

export default function WhyChooseSection() {
  const [activeTab, setActiveTab] = useState("revenue");
  const [animKey, setAnimKey] = useState(0);
  const [hoveredPoint, setHoveredPoint] = useState(null);

  const trendPoints = [
    { month: "Jan", val: 8.2, x: 40, y: 126, display: "8.2" },
    { month: "Feb", val: 12.0, x: 124, y: 103, display: "12.0" },
    { month: "Mar", val: 14.8, x: 208, y: 86, display: "14.8" },
    { month: "Apr", val: 17.2, x: 292, y: 72, display: "17.2" },
    { month: "May", val: 21.4, x: 376, y: 47, display: "21.4" },
    { month: "Jun", val: 24.6, x: 460, y: 27, display: "24.6" },
  ];

  const getTooltipStyle = (pt) => {
    if (!pt) return {};
    const leftPct = (pt.x / 500) * 100;
    const topPct = (pt.y / 200) * 100;

    let transform = "translate(-50%, -120%)";
    if (pt.month === "Jan") {
      transform = "translate(14px, -50%)";
    } else if (pt.month === "Jun") {
      transform = "translate(-102%, 10px)";
    } else if (pt.month === "May") {
      transform = "translate(-85%, -115%)";
    }

    return {
      left: `${leftPct}%`,
      top: `${topPct}%`,
      transform,
    };
  };

  // Chart data for Revenue by Region
  const revenueChart = {
    legend1: "North America",
    legend2: "APAC",
    yLabels: ["$1000k", "$800k", "$600k", "$400k", "$200k", "$0k"],
    bars: [
      { label: "Q1", v1: 41, v2: 30, display1: "$410k", display2: "$300k" },
      { label: "Q2", v1: 57, v2: 47, display1: "$570k", display2: "$470k" },
      { label: "Q3", v1: 71, v2: 63, display1: "$710k", display2: "$630k" },
      { label: "Q4", v1: 89, v2: 81, display1: "$890k", display2: "$810k" },
    ],
  };

  // 3 Product Cards matching the size & style in the reference screenshot
  const productCards = [
    {
      id: "audit",
      category: "ANSWER ACCURACY RATE",
      badge: "VERIFIED",
      badgeClass: "why-badge--verified",
      icon: SearchCode,
      title: "Auditable Data Every Time",
      description:
        "Every extraction comes with a full audit trail. What was read, what was changed, and why. Traceable back to the source document.",
    },
    {
      id: "compatible",
      category: "BUSINESS QUESTIONS ANSWERED",
      badge: "LIVE",
      badgeClass: "why-badge--live",
      icon: Plug,
      title: "Compatible With Epic, Cerner, Azure & AWS",
      description:
        "No rip-and-replace. Adople AI plugs directly into the systems you already run on, pushing structured data straight where it needs to go.",
    },
    {
      id: "integration",
      category: "AVERAGE SETUP TIME",
      badge: "FAST",
      badgeClass: "why-badge--fast",
      icon: GitMerge,
      title: "Seamless Data Integration",
      description:
        "Structured output maps directly into your current workflow and tools with zero disruption to how your team already works.",
    },
  ];

  return (
    <div className="why-choose-inner">
      {/* Section Header */}
      <div className="why-choose-header">
        <div className="why-choose-badge">
          <span>LIVE DASHBOARD PREVIEW</span>
        </div>
        <h2 className="why-choose-title">Why Teams Choose Adople AI</h2>
        <p className="why-choose-subtitle">
          Four things that set us apart from generic OCR tools
        </p>
      </div>

      {/* 1. Three Product Cards (Horizontal Row at Top matching reference screenshot size) */}
      <div className="why-top-cards-row">
        {productCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.id} className="why-top-product-card">
              <div className="why-top-card-meta">
                <div className="why-top-card-icon-wrap">
                  <Icon size={18} className="why-top-card-icon" strokeWidth={1.8} />
                </div>
                <div className="why-top-card-badges">
                  <span className="why-top-card-category">{card.category}</span>
                  <span className={`why-badge ${card.badgeClass}`}>
                    {card.badge}
                  </span>
                </div>
              </div>
              <h3 className="why-top-card-title">{card.title}</h3>
              <p className="why-top-card-desc">{card.description}</p>
            </div>
          );
        })}
      </div>

      {/* 2. Dashboard Directly Below (Center-aligned, matching the 3 cards width) */}
      <div className="why-dashboard-card">
        {/* Top Bar with ONLY Revenue by Region and Growth Trend */}
        <div className="why-featured-topbar">
          <div className="why-featured-tabs">
            <button
              type="button"
              className={`why-tab-btn ${activeTab === "revenue" ? "active" : ""}`}
              onClick={() => setActiveTab("revenue")}
            >
              <TrendingUp size={15} className="why-tab-icon" />
              <span>Revenue by Region</span>
            </button>
            <button
              type="button"
              className={`why-tab-btn ${activeTab === "growth" ? "active" : ""}`}
              onClick={() => {
                setActiveTab("growth");
                setAnimKey((k) => k + 1);
                setHoveredPoint(null);
              }}
            >
              <BarChart3 size={15} className="why-tab-icon" />
              <span>Growth Trend</span>
            </button>
          </div>

          <div className="why-auto-badge">
            <Sparkles size={13} className="why-auto-icon" />
            <span>Auto-generated</span>
          </div>
        </div>

        {/* Dashboard Title & Description - hidden on Growth Trend dashboard */}
        {activeTab !== "growth" && (
          <div className="why-featured-body">
            <div className="why-featured-title-wrap">
              <div className="why-tile-icon-wrap">
                <Zap size={20} className="why-tile-icon" strokeWidth={1.8} />
              </div>
              <h3 className="why-featured-title">No Manual Data Input Needed</h3>
            </div>
            <p className="why-featured-desc">
              The AI reads, classifies, and extracts end to end. Your team only
              steps in when the system flags something it is not confident
              about, not for routine entry.
            </p>
          </div>
        )}

        {/* Visual Chart Area */}
        {activeTab === "growth" ? (
          /* Live-growing graph: animates on tab click; hovering over points shows month-wise details */
          <div className="why-trend-area" key={animKey}>
            <div className="why-trend-box">
              {/* Y-Axis Percentage Labels */}
              <div className="why-trend-yaxis">
                <span>25%</span>
                <span>20%</span>
                <span>15%</span>
                <span>10%</span>
                <span>5%</span>
                <span>0%</span>
              </div>

              {/* Plot Area with SVG and hover-to-view month details */}
              <div
                className="why-trend-plot"
                onMouseLeave={() => setHoveredPoint(null)}
              >
                {/* Horizontal gridlines */}
                <div className="why-gridline" style={{ top: "0%" }} />
                <div className="why-gridline" style={{ top: "20%" }} />
                <div className="why-gridline" style={{ top: "40%" }} />
                <div className="why-gridline" style={{ top: "60%" }} />
                <div className="why-gridline" style={{ top: "80%" }} />
                <div className="why-gridline" style={{ top: "100%" }} />

                {/* SVG Curve, Area Fill, Vertical Dashed Line, and Points */}
                <svg
                  viewBox="0 0 500 200"
                  preserveAspectRatio="none"
                  className="why-trend-svg why-trend-svg-animated"
                >
                  <defs>
                    <linearGradient
                      id={`whyTrendGrad-${animKey}`}
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="#431407"
                        stopOpacity="0.16"
                      />
                      <stop
                        offset="100%"
                        stopColor="#431407"
                        stopOpacity="0.01"
                      />
                    </linearGradient>
                  </defs>

                  {/* Shaded Area underneath the line */}
                  <path
                    d="M 40,126 L 124,103 L 208,86 L 292,72 L 376,47 L 460,27 L 460,185 L 40,185 Z"
                    fill={`url(#whyTrendGrad-${animKey})`}
                    className="why-trend-area-fill"
                  />

                  {/* Vertical dashed line at hovered point */}
                  {hoveredPoint && (
                    <line
                      x1={hoveredPoint.x}
                      y1="10"
                      x2={hoveredPoint.x}
                      y2="185"
                      stroke="#94A3B8"
                      strokeWidth="1.5"
                      strokeDasharray="4 4"
                      className="why-trend-guide-line"
                    />
                  )}

                  {/* Animated Trend Line */}
                  <path
                    d="M 40,126 L 124,103 L 208,86 L 292,72 L 376,47 L 460,27"
                    fill="none"
                    stroke="#2B1108"
                    strokeWidth="2.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="why-trend-line"
                  />

                  {/* Hover zones covering each section of the graph */}
                  {trendPoints.map((pt, idx) => {
                    const prevX = idx > 0 ? trendPoints[idx - 1].x : 0;
                    const nextX =
                      idx < trendPoints.length - 1
                        ? trendPoints[idx + 1].x
                        : 500;
                    const leftX = idx === 0 ? 0 : (prevX + pt.x) / 2;
                    const rightX =
                      idx === trendPoints.length - 1
                        ? 500
                        : (pt.x + nextX) / 2;
                    const width = rightX - leftX;

                    return (
                      <rect
                        key={`hover-zone-${pt.month}`}
                        x={leftX}
                        y="0"
                        width={width}
                        height="200"
                        fill="transparent"
                        onMouseEnter={() => setHoveredPoint(pt)}
                        style={{ cursor: "pointer" }}
                      />
                    );
                  })}

                  {/* Points on each month */}
                  {trendPoints.map((pt) => {
                    const isHovered = hoveredPoint?.month === pt.month;
                    return (
                      <g
                        key={pt.month}
                        className="why-trend-point-group"
                        onMouseEnter={() => setHoveredPoint(pt)}
                        style={{ cursor: "pointer" }}
                      >
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r="18"
                          fill="transparent"
                        />
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r={isHovered ? "5.5" : "3.5"}
                          fill="#2B1108"
                          stroke="#ffffff"
                          strokeWidth={isHovered ? "2.2" : "1.5"}
                          className="why-trend-point-dot"
                        />
                      </g>
                    );
                  })}
                </svg>

                {/* Month-wise details directly on the graph - shown automatically on hover */}
                {hoveredPoint && (
                  <div
                    className="why-trend-tooltip"
                    style={getTooltipStyle(hoveredPoint)}
                  >
                    <div className="why-tooltip-month">
                      {hoveredPoint.month}
                    </div>
                    <div className="why-tooltip-row">
                      <span className="why-tooltip-dot" />
                      <span className="why-tooltip-label">
                        YoY Revenue Growth
                      </span>
                      <strong className="why-tooltip-value">
                        {hoveredPoint.display}%
                      </strong>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Revenue by Region Bar Chart */
          <div className="why-chart-area">
            {/* Chart Legend */}
            <div className="why-chart-legend">
              <div className="why-legend-item">
                <span className="why-legend-dot why-legend-dot--navy" />
                <span>{revenueChart.legend1}</span>
              </div>
              <div className="why-legend-item">
                <span className="why-legend-dot why-legend-dot--orange" />
                <span>{revenueChart.legend2}</span>
              </div>
            </div>

            {/* Chart Grid with Y-axis & Bars */}
            <div className="why-chart-box">
              {/* Y-Axis Labels */}
              <div className="why-chart-yaxis">
                {revenueChart.yLabels.map((lbl, idx) => (
                  <span key={idx} className="why-chart-ylabel">
                    {lbl}
                  </span>
                ))}
              </div>

              {/* Chart Plot Area with Gridlines & Bars */}
              <div className="why-chart-plot">
                <div className="why-gridline" style={{ top: "0%" }} />
                <div className="why-gridline" style={{ top: "20%" }} />
                <div className="why-gridline" style={{ top: "40%" }} />
                <div className="why-gridline" style={{ top: "60%" }} />
                <div className="why-gridline" style={{ top: "80%" }} />
                <div className="why-gridline" style={{ top: "100%" }} />

                {/* Bar Groups */}
                <div className="why-chart-columns">
                  {revenueChart.bars.map((bar, idx) => (
                    <div key={idx} className="why-bar-col">
                      <div className="why-bar-pair">
                        <div
                          className="why-bar why-bar--navy"
                          style={{ height: `${bar.v1}%` }}
                          title={`${revenueChart.legend1}: ${bar.display1}`}
                        />
                        <div
                          className="why-bar why-bar--orange"
                          style={{ height: `${bar.v2}%` }}
                          title={`${revenueChart.legend2}: ${bar.display2}`}
                        />
                      </div>
                      <span className="why-chart-xlabel">{bar.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
