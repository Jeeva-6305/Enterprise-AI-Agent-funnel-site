import React from 'react';

const COMPANIES = [
  {
    name: 'Lilly',
    fullName: 'Eli Lilly and Company',
    logoSrc: '/logos/lilly.svg',
    height: '30px'
  },
  {
    name: 'Broadridge',
    fullName: 'Broadridge Financial Solutions',
    logoSrc: '/logos/broadridge.svg',
    height: '26px'
  },
  {
    name: 'Confluence',
    fullName: 'Confluence (Atlassian)',
    logoSrc: '/logos/confluence.svg',
    height: '22px'
  },
  {
    name: 'Syngenta',
    fullName: 'Syngenta Group',
    logoSrc: '/logos/syngenta.svg',
    height: '26px'
  },
  {
    name: 'Crocs',
    fullName: 'Crocs, Inc.',
    logoSrc: '/logos/crocs.svg',
    height: '26px'
  },
  {
    name: 'NHS',
    fullName: 'National Health Service',
    logoSrc: '/logos/nhs.svg',
    height: '26px'
  },
  {
    name: 'Randstad',
    fullName: 'Randstad N.V.',
    logoSrc: '/logos/randstad.svg',
    height: '26px'
  },
  {
    name: 'Elevance Health',
    fullName: 'Elevance Health, Inc.',
    logoSrc: '/logos/elevance-health.svg',
    height: '28px'
  },
  {
    name: 'Vodafone',
    fullName: 'Vodafone Group',
    logoSrc: '/logos/vodafone.svg',
    height: '28px'
  },
  {
    name: 'AT&T',
    fullName: 'AT&T Inc.',
    logoSrc: '/logos/att.svg',
    height: '26px'
  },
  {
    name: 'Syra Health',
    fullName: 'Syra Health Corp',
    logoSrc: '/logos/syra-health.png',
    height: '34px'
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

