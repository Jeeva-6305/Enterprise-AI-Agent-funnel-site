import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  Building2,
  ShieldAlert,
  ChartNoAxesCombined,
  Presentation,
  Table2,
  BarChart3,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const categories = [
  {
    number: '01',
    title: 'Business Overview & Operations',
    description: 'Core business model, product lines, revenue drivers, and operating segments.',
    icon: Building2
  },
  {
    number: '02',
    title: 'Risk factors',
    description: 'Item 1A risk exposures, macroeconomic threats, and operational vulnerabilities.',
    icon: ShieldAlert
  },
  {
    number: '03',
    title: 'Selected Financial Data & Key Metrics',
    description: 'Five-year historical trends, margin performance, and vital capital metrics.',
    icon: ChartNoAxesCombined
  },
  {
    number: '04',
    title: 'Management Discussion & Analysis',
    description: 'Executive analysis of liquidity, forward outlook, margins, and capital resources.',
    icon: Presentation
  },
  {
    number: '05',
    title: 'Consolidated Financial Statements',
    description: 'Audited balance sheets, income statements, and statement of cash flows.',
    icon: Table2
  },
  {
    number: '06',
    title: 'Segment Performance Reporting',
    description: 'Breakdown of revenue, operating profits, and assets by division and geography.',
    icon: BarChart3
  }
];

export default function AnalysisCategories() {
  const carouselRef = useRef(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  const checkScrollPosition = useCallback(() => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    setIsAtStart(scrollLeft <= 4);
    setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 6);
  }, []);

  useEffect(() => {
    checkScrollPosition();
    const carousel = carouselRef.current;
    if (!carousel) return;

    const handleResize = () => checkScrollPosition();
    window.addEventListener('resize', handleResize);
    carousel.addEventListener('scroll', checkScrollPosition, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      carousel.removeEventListener('scroll', checkScrollPosition);
    };
  }, [checkScrollPosition]);

  const scrollByCard = (direction) => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const firstCard = container.querySelector('.analysis-category-card');
    const cardWidth = firstCard ? firstCard.getBoundingClientRect().width : 240;
    const gap = 14;
    const scrollAmount = cardWidth + gap;

    container.scrollBy({
      left: direction === 'right' ? scrollAmount : -scrollAmount,
      behavior: 'smooth'
    });
  };

  const handleMouseDown = (e) => {
    if (!carouselRef.current) return;
    isDraggingRef.current = true;
    startXRef.current = e.pageX - carouselRef.current.offsetLeft;
    scrollLeftRef.current = carouselRef.current.scrollLeft;
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.25;
    carouselRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleMouseLeave = () => {
    isDraggingRef.current = false;
  };

  return (
    <section
      className="analysis-categories-section"
      aria-labelledby="analysis-categories-title"
    >
      <div className="container analysis-categories-container">
        <div className="analysis-categories-header">
          <div className="analysis-categories-eyebrow">WHAT SEC-MIND ANALYZES</div>
          <h2 id="analysis-categories-title" className="analysis-categories-title">
            One Filing Six Intelligence Categories
          </h2>
          <p className="analysis-categories-subtitle">
            SEC-Mind organizes financial disclosures into structured categories, making complex SEC filings easier to analyze and explore.
          </p>
        </div>

        {/* Horizontally Scrolling Carousel Strip with 6 Compact Cards */}
        <div className="analysis-carousel-wrapper">
          {/* Subtle fade / gradient overlays at edges */}
          <div
            className={`analysis-carousel-gradient analysis-carousel-gradient-left ${isAtStart ? 'is-hidden' : ''}`}
            aria-hidden="true"
          />
          <div
            className={`analysis-carousel-gradient analysis-carousel-gradient-right ${isAtEnd ? 'is-hidden' : ''}`}
            aria-hidden="true"
          />

          {/* Left Arrow Button */}
          <button
            type="button"
            className="analysis-carousel-arrow analysis-carousel-arrow-prev"
            onClick={() => scrollByCard('left')}
            disabled={isAtStart}
            aria-label="Previous category"
          >
            <ChevronLeft size={18} strokeWidth={2.2} />
          </button>

          {/* Right Arrow Button */}
          <button
            type="button"
            className="analysis-carousel-arrow analysis-carousel-arrow-next"
            onClick={() => scrollByCard('right')}
            disabled={isAtEnd}
            aria-label="Next category"
          >
            <ChevronRight size={18} strokeWidth={2.2} />
          </button>

          {/* Scrollable Card Track */}
          <div
            className="analysis-categories-track"
            ref={carouselRef}
            role="region"
            aria-label="SEC Intelligence Categories Carousel"
            tabIndex={0}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
          >
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <article
                  className="analysis-category-card"
                  key={cat.number}
                >
                  <span className="analysis-category-number">{cat.number}</span>
                  <div className="analysis-category-icon" aria-hidden="true">
                    <Icon size={17} strokeWidth={1.8} />
                  </div>
                  <h3 className="analysis-category-title">{cat.title}</h3>
                  <p className="analysis-category-description">{cat.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
