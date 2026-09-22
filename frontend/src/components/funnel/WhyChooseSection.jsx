import React from "react";
import { SearchCode, Plug, Zap, GitMerge } from "lucide-react";

const tiles = [
  {
    id: "audit",
    title: "Auditable Data Every Time",
    description:
      "Every extraction comes with a full audit trail. What was read, what was changed, and why. No black-box outputs; every field is traceable back to the source document.",
    icon: SearchCode,
    featured: false,
    gridClass: "why-tile--audit",
  },
  {
    id: "automation",
    title: "No Manual Data Input Needed",
    description:
      "The AI reads, classifies, and extracts end to end. Your team only steps in when the system flags something it is not confident about, not for routine entry.",
    icon: Zap,
    featured: true,
    gridClass: "why-tile--featured",
  },
  {
    id: "compatible",
    title: "Compatible With Epic, Cerner, Azure & AWS",
    description:
      "No rip-and-replace. Adople AI plugs directly into the systems you already run on, pushing structured data straight where it needs to go.",
    icon: Plug,
    featured: false,
    gridClass: "why-tile--compatible",
  },
  {
    id: "integration",
    title: "Seamless Data Integration Into Your Existing Systems",
    description:
      "Structured output maps directly into your current workflow and tools. No new software to learn and no disruption to how your team already works.",
    icon: GitMerge,
    featured: false,
    gridClass: "why-tile--integration",
  },
];

export default function WhyChooseSection() {
  return (
    <div className="why-choose-inner">
      <div className="why-choose-header">
        <h2 className="why-choose-title">Why Teams Choose Adople AI</h2>
        <p className="why-choose-subtitle">
          Four things that set us apart from generic OCR tools
        </p>
      </div>

      <div className="why-bento-grid">
        {tiles.map((tile) => {
          const Icon = tile.icon;
          return (
            <div
              key={tile.id}
              className={`why-bento-tile ${tile.gridClass} ${
                tile.featured ? "why-bento-tile--navy" : "why-bento-tile--light"
              }`}
            >
              <div className="why-tile-icon-wrap">
                <Icon
                  size={tile.featured ? 26 : 22}
                  strokeWidth={1.75}
                  className="why-tile-icon"
                />
              </div>
              <div className="why-tile-body">
                <h3 className="why-tile-title">{tile.title}</h3>
                <p className="why-tile-desc">{tile.description}</p>
              </div>
              {tile.featured && (
                <div className="why-tile-accent-dot" aria-hidden="true" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
