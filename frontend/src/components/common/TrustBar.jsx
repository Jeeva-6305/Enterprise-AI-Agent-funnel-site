import React from 'react';

const COMPANIES = [
  {
    name: 'Lilly',
    fullName: 'Eli Lilly and Company',
    logoSrc: '/logos/lilly.webp',
    height: '24px'
  },
  {
    name: 'Broadridge',
    fullName: 'Broadridge Financial Solutions',
    logoSrc: '/logos/Broadridge.webp',
    height: '22px'
  },
  {
    name: 'Confluence',
    fullName: 'Confluence (Atlassian)',
    logoSrc: '/logos/confluence.webp',
    height: '24px'
  },
  {
    name: 'Syngenta',
    fullName: 'Syngenta Group',
    logoSrc: '/logos/syngenta.webp',
    height: '22px'
  },
  {
    name: 'Crocs',
    fullName: 'Crocs, Inc.',
    logoSrc: '/logos/crocs.webp',
    height: '22px'
  },
  {
    name: 'NHS',
    fullName: 'National Health Service',
    logoSrc: '/logos/nhs.jpg',
    height: '22px'
  },
  {
    name: 'Randstad',
    fullName: 'Randstad N.V.',
    logoSrc: '/logos/randstad.webp',
    height: '24px'
  },
  {
    name: 'Elevance Health',
    fullName: 'Elevance Health, Inc.',
    logoSrc: '/logos/Elevance Health.webp',
    height: '24px'
  },
  {
    name: 'Vodafone',
    fullName: 'Vodafone Group',
    logoSrc: '/logos/vodofone.webp',
    height: '24px'
  },
  {
    name: 'AT&T',
    fullName: 'AT&T Inc.',
    logoSrc: '/logos/Att.webp',
    height: '22px'
  },
  {
    name: 'Syra Health',
    fullName: 'Syra Health Corp',
    logoSrc: '/logos/syra-health.png',
    height: '28px'
  }
];



export default function TrustBar() {
  return (
    <section className="trust-bar-carousel-section" aria-label="Trusted Enterprise Brands">
      <div className="trust-carousel-viewport">
        {/* Track with dual sets of logos to create seamless infinite continuous loop */}
        <div className="trust-carousel-track">
          {/* Set 1 */}
          {COMPANIES.map((company, index) => (
            <div key={`logo-1-${index}`} className="carousel-logo-card" title={company.fullName}>
              <img
                src={company.logoSrc}
                alt={company.fullName}
                className="trust-bar-company-logo"
                style={{ height: company.height || '26px' }}
                loading="eager"
              />
            </div>
          ))}

          {/* Set 2 (Duplicate for seamless continuous loop from right to left) */}
          {COMPANIES.map((company, index) => (
            <div key={`logo-2-${index}`} className="carousel-logo-card" title={company.fullName}>
              <img
                src={company.logoSrc}
                alt={company.fullName}
                className="trust-bar-company-logo"
                style={{ height: company.height || '26px' }}
                loading="eager"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

