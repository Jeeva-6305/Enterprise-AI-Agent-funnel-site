import React from 'react';

export default function BrandLogo({ size = 38, className = '' }) {
  return (
    <img
      src="/favicon.webp"
      alt="Adople AI"
      height={size}
      className={className}
      style={{
        height: `${size}px`,
        width: 'auto',
        display: 'inline-block',
        verticalAlign: 'middle',
        objectFit: 'contain',
        flexShrink: 0
      }}
    />
  );
}
