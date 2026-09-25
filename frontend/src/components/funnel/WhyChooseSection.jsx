import React, { useState } from "react";
import {
  SearchCode,
  Plug,
  Zap,
  GitMerge,
  TrendingUp,
  PieChart,
  BarChart3,
  Sparkles,
  ChevronDown,
} from "lucide-react";

export default function WhyChooseSection() {
  const [activeTab, setActiveTab] = useState("revenue");
  // Growth Trend chart is collapsed by default (do not show automatically)
  const [isGrowthExpanded, setIsGrowthExpanded] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState("Apr");
  // Expandable cards state: empty by default so only titles are visible
  const [expandedCards, setExpandedCards] = useState({});

  const toggleGrowth = () => {
    setIsGrowthExpanded((prev) => {
      const next = !prev;
      if (next) {
        setAnimKey((k) => k + 1);
      }
      return next;
    });
  };

  const trendPoints = [
    { month: "Jan", val: 8.2, x: 40, y: 126, display: "8.2" },
    { month: "Feb", val: 12.0, x: 124, y: 103, display: "12.0" },
    { month: "Mar", val: 14.8, x: 208, y: 86, display: "14.8" },
    { month: "Apr", val: 17.2, x: 292, y: 72, display: "17.2" },
    { month: "May", val: 21.4, x: 376, y: 47, display: "21.4" },
    { month: "Jun", val: 24.6, x: 460, y: 27, display: "24.6" },
  ];

  const currentPoint =
    trendPoints.find((p) => p.month === selectedMonth) || trendPoints[3];

  const toggleCard = (cardId) => {
    setExpandedCards((prev) => ({
      ...prev,
      [cardId]: !prev[cardId],
    }));
  };

  // Chart data according to selected tab (matching screenshot)
  const tabData = {
    revenue: {
      legend1: "North America",
      legend2: "APAC",
      yLabels: ["$1000k", "$800k", "$600k", "$400k", "$200k", "$0k"],
      bars: [
        { label: "Q1", v1: 41, v2: 30, display1: "$410k", display2: "$300k" },
        { label: "Q2", v1: 57, v2: 47, display1: "$570k", display2: "$470k" },
        { label: "Q3", v1: 71, v2: 63, display1: "$710k", display2: "$630k" },
        { label: "Q4", v1: 89, v2: 81, display1: "$890k", display2: "$810k" },
      ],
    },
    market: {
      legend1: "Enterprise",
      legend2: "Mid-Market",
      yLabels: ["$1000k", "$800k", "$600k", "$400k", "$200k", "$0k"],
      bars: [
        { label: "Q1", v1: 35, v2: 25, display1: "$350k", display2: "$250k" },
        { label: "Q2", v1: 52, v2: 40, display1: "$520k", display2: "$400k" },
        { label: "Q3", v1: 68, v2: 55, display1: "$680k", display2: "$550k" },
        { label: "Q4", v1: 84, v2: 74, display1: "$840k", display2: "$740k" },
      ],
    },
  };

  const currentChart = tabData[activeTab];

  // 3 Supporting KPI Cards
  const rightCards = [
    {
      id: "audit",
      category: "ANSWER ACCURACY RATE",
      badge: "VERIFIED",
      badgeClass: "why-badge--verified",
      icon: SearchCode,
      title: "Auditable Data Every Time",
      description:
        "Every extraction comes with a full audit trail. What was read, what was changed, and why. No black-box outputs; every field is traceable back to the source document.",
      progressClass: "why-stat-progress--green",
      footerLeft: "AI-verified",
      footerRight: "Audited Monthly",
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
      progressClass: "why-stat-progress--coral",
      footerLeft: "50+ Enterprise Clients",
      footerRight: "Real-time Updates",
    },
    {
      id: "integration",
      category: "AVERAGE SETUP TIME",
      badge: "FAST",
      badgeClass: "why-badge--fast",
      icon: GitMerge,
      title: "Seamless Data Integration Into Your Existing Systems",
      description:
        "Structured output maps directly into your current workflow and tools. No new software to learn and no disruption to how your team already works.",
      progressClass: "why-stat-progress--indigo",
      footerLeft: "No Training Required",
      footerRight: "Instant Connection",
    },
  ];

  return (
    <div className="why-choose-inner">
      {/* Section Header - Centered with Badge matching screenshot */}
      <div className="why-choose-header">
        <div className="why-choose-badge">
          <span>LIVE DASHBOARD PREVIEW</span>
        </div>
        <h2 className="why-choose-title">Why Teams Choose Adople AI</h2>
        <p className="why-choose-subtitle">
          Four things that set us apart from generic OCR tools
        </p>
      </div>

      {/* Main 2-Column Grid */}
      <div className="why-choose-layout">
        {/* Left Column: Featured Showcase Card */}
        <div className="why-featured-card">
          {/* Top Bar with Tabs + Auto-generated Badge */}
          <div className="why-featured-topbar">
            <div className="why-featured-tabs">
              <button
                type="button"
                className={`why-tab-btn ${activeTab === "revenue" ? "active" : ""}`}
                onClick={() => setActiveTab("revenue")}
              >
                <TrendingUp size={14} className="why-tab-icon" />
                <span>Revenue by Region</span>
              </button>
              <button
                type="button"
                className={`why-tab-btn ${activeTab === "market" ? "active" : ""}`}
                onClick={() => setActiveTab("market")}
              >
                <PieChart size={14} className="why-tab-icon" />
                <span>Market Breakdown</span>
              </button>
              <button
                type="button"
                className={`why-tab-btn ${activeTab === "growth" ? "active" : ""}`}
                onClick={() => {
                  if (activeTab === "growth") {
                    toggleGrowth();
                  } else {
                    setActiveTab("growth");
                    setIsGrowthExpanded(true);
                    setAnimKey((k) => k + 1);
                  }
                }}
              >
                <BarChart3 size={14} className="why-tab-icon" />
                <span>Growth Trend</span>
                <ChevronDown
                  size={12}
                  className={`why-chevron ${isGrowthExpanded && activeTab === "growth" ? "rotated" : ""}`}
                  style={{ marginLeft: "2px" }}
                />
              </button>
            </div>

            <div className="why-auto-badge">
              <Sparkles size={13} className="why-auto-icon" />
              <span>Auto-generated</span>
            </div>
          </div>

          {/* Featured Content: Keep existing text & icon intact */}
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

            {/* Growth Trend Click-to-View Toggle Target */}
            {activeTab === "growth" && (
              <div
                className={`why-growth-toggle-bar ${isGrowthExpanded ? "open" : ""}`}
                onClick={toggleGrowth}
                role="button"
                tabIndex={0}
                aria-expanded={isGrowthExpanded}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleGrowth();
                  }
                }}
              >
                <div className="why-growth-toggle-left">
                  <TrendingUp size={15} className="why-growth-toggle-icon" />
                  <span>
                    {isGrowthExpanded
                      ? "Hide Growth Trend Chart & Predictions"
                      : "Click to View Growth Trend & Monthly Predictions"}
                  </span>
                </div>
                <div className="why-growth-toggle-right">
                  {!isGrowthExpanded && (
                    <span className="why-growth-toggle-badge">Live Chart</span>
                  )}
                  <ChevronDown
                    size={15}
                    className={`why-chevron ${isGrowthExpanded ? "rotated" : ""}`}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Visual Chart Area - Growth Trend (Collapsible) vs Bar Chart */}
          {activeTab === "growth" ? (
            /* Growth Trend Line / Area Chart - Hidden by default, animated on expand */
            <div
              className={`why-trend-collapsible ${
                isGrowthExpanded ? "open" : "closed"
              }`}
            >
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

                  {/* Plot Area with SVG and Tooltip */}
                  <div className="why-trend-plot">
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

                      {/* Vertical dashed line at active point */}
                      <line
                        x1={currentPoint.x}
                        y1="10"
                        x2={currentPoint.x}
                        y2="185"
                        stroke="#94A3B8"
                        strokeWidth="1.5"
                        strokeDasharray="4 4"
                        className="why-trend-guide-line"
                      />

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

                      {/* Points on each month */}
                      {trendPoints.map((pt) => {
                        const isActive = pt.month === selectedMonth;
                        return (
                          <g
                            key={pt.month}
                            onClick={() => setSelectedMonth(pt.month)}
                            style={{ cursor: "pointer" }}
                            className="why-trend-point-group"
                          >
                            <circle
                              cx={pt.x}
                              cy={pt.y}
                              r="12"
                              fill="transparent"
                            />
                            <circle
                              cx={pt.x}
                              cy={pt.y}
                              r={isActive ? "4.5" : "3"}
                              fill="#2B1108"
                              stroke="#ffffff"
                              strokeWidth={isActive ? "2" : "1.5"}
                              className="why-trend-point-dot"
                            />
                          </g>
                        );
                      })}
                    </svg>

                    {/* Floating Tooltip Card matching screenshot */}
                    <div
                      className="why-trend-tooltip animated"
                      style={{
                        left: `${(currentPoint.x / 500) * 100}%`,
                        top: `${(currentPoint.y / 200) * 100}%`,
                      }}
                    >
                      <div className="why-tooltip-month">
                        {currentPoint.month}
                      </div>
                      <div className="why-tooltip-row">
                        <span className="why-tooltip-dot" />
                        <span className="why-tooltip-label">
                          YoY Revenue Growth
                        </span>
                        <strong className="why-tooltip-value">
                          {currentPoint.display}
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>

                {/* X-Axis Month Labels */}
                <div className="why-trend-xaxis">
                  {trendPoints.map((pt) => (
                    <span
                      key={pt.month}
                      className={`why-trend-xlabel ${
                        pt.month === selectedMonth ? "active" : ""
                      }`}
                      onClick={() => setSelectedMonth(pt.month)}
                    >
                      {pt.month}
                    </span>
                  ))}
                </div>

                {/* Monthly Prediction Details Strip */}
                <div className="why-prediction-strip">
                  <span className="why-pred-title">Monthly Predictions:</span>
                  <div className="why-pred-list">
                    {trendPoints.map((pt) => (
                      <button
                        key={pt.month}
                        type="button"
                        className={`why-pred-item ${
                          pt.month === selectedMonth ? "active" : ""
                        }`}
                        onClick={() => setSelectedMonth(pt.month)}
                      >
                        <span className="why-pred-month">{pt.month}</span>
                        <span className="why-pred-val">{pt.display}%</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="why-chart-area">
              {/* Chart Legend */}
              <div className="why-chart-legend">
                <div className="why-legend-item">
                  <span className="why-legend-dot why-legend-dot--navy" />
                  <span>{currentChart.legend1}</span>
                </div>
                <div className="why-legend-item">
                  <span className="why-legend-dot why-legend-dot--orange" />
                  <span>{currentChart.legend2}</span>
                </div>
              </div>

              {/* Chart Grid with Y-axis & Bars */}
              <div className="why-chart-box">
                {/* Y-Axis Labels */}
                <div className="why-chart-yaxis">
                  {currentChart.yLabels.map((lbl, idx) => (
                    <span key={idx} className="why-chart-ylabel">
                      {lbl}
                    </span>
                  ))}
                </div>

                {/* Chart Plot Area with Gridlines & Bars */}
                <div className="why-chart-plot">
                  {/* Horizontal Guide Lines */}
                  <div className="why-gridline" style={{ top: "0%" }} />
                  <div className="why-gridline" style={{ top: "20%" }} />
                  <div className="why-gridline" style={{ top: "40%" }} />
                  <div className="why-gridline" style={{ top: "60%" }} />
                  <div className="why-gridline" style={{ top: "80%" }} />
                  <div className="why-gridline" style={{ top: "100%" }} />

                  {/* Bar Groups */}
                  <div className="why-chart-columns">
                    {currentChart.bars.map((bar, idx) => (
                      <div key={idx} className="why-bar-col">
                        <div className="why-bar-pair">
                          <div
                            className="why-bar why-bar--navy"
                            style={{ height: `${bar.v1}%` }}
                            title={`${currentChart.legend1}: ${bar.display1}`}
                          />
                          <div
                            className="why-bar why-bar--orange"
                            style={{ height: `${bar.v2}%` }}
                            title={`${currentChart.legend2}: ${bar.display2}`}
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

        {/* Right Column: 3 Compact Stacked Cards (Expand/Collapse on click) */}
        <div className="why-choose-right-stack">
          {rightCards.map((card) => {
            const Icon = card.icon;
            const isExpanded = !!expandedCards[card.id];

            return (
              <div
                key={card.id}
                className={`why-stat-card ${isExpanded ? "expanded" : "collapsed"}`}
                onClick={() => toggleCard(card.id)}
                role="button"
                tabIndex={0}
                aria-expanded={isExpanded}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleCard(card.id);
                  }
                }}
              >
                {/* Top tracking category + Badge + Chevron */}
                <div className="why-stat-top">
                  <span className="why-stat-category">{card.category}</span>
                  <div className="why-stat-top-right">
                    <span className={`why-badge ${card.badgeClass}`}>
                      {card.badge}
                    </span>
                    <ChevronDown
                      size={15}
                      className={`why-chevron ${isExpanded ? "rotated" : ""}`}
                      aria-hidden="true"
                    />
                  </div>
                </div>

                {/* Card Title & Icon - ALWAYS VISIBLE */}
                <div className="why-stat-header-row">
                  <div className="why-stat-icon-wrap">
                    <Icon size={18} className="why-stat-icon" strokeWidth={1.8} />
                  </div>
                  <h3 className="why-stat-title">{card.title}</h3>
                </div>

                {/* Card Details: Description, Progress Bar, Footers - SHOWN ON CLICK */}
                <div
                  className={`why-stat-details ${
                    isExpanded ? "open" : "closed"
                  }`}
                >
                  <p className="why-stat-desc">{card.description}</p>
                  <div className={`why-stat-progress ${card.progressClass}`} />
                  <div className="why-stat-footer">
                    <span>{card.footerLeft}</span>
                    <span>{card.footerRight}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
