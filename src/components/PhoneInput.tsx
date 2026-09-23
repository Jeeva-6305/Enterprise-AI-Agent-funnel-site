import React, { useState, useRef, useEffect } from 'react';
import { CountryCode, COUNTRY_CODES } from '../data/countryCodes';
import { ChevronDown, Search } from 'lucide-react';

interface PhoneInputProps {
  country: CountryCode;
  onCountryChange: (country: CountryCode) => void;
  phoneNumber: string;
  onPhoneChange: (phone: string) => void;
  placeholder?: string;
  required?: boolean;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({
  country,
  onCountryChange,
  phoneNumber,
  onPhoneChange,
  placeholder = "081234 56789",
  required = true
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredCountries = COUNTRY_CODES.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.dialCode.includes(searchQuery) ||
    c.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div style={{ position: 'relative' }} ref={containerRef}>
      <div className="phone-input-container">
        <div
          className="country-selector-trigger"
          onClick={() => setIsOpen(!isOpen)}
          title="Select Country Code"
        >
          <span className="flag-icon">{country.flag}</span>
          <span className="dial-code">{country.dialCode}</span>
          <ChevronDown size={14} className="chevron-down" />
        </div>

        <input
          type="tel"
          className="phone-number-field"
          value={phoneNumber}
          onChange={(e) => onPhoneChange(e.target.value)}
          placeholder={placeholder}
          required={required}
        />
      </div>

      {isOpen && (
        <div className="country-dropdown-popover">
          <div style={{ position: 'relative', marginBottom: '0.4rem' }}>
            <Search size={14} style={{ position: 'absolute', left: '8px', top: '10px', color: '#94a3b8' }} />
            <input
              type="text"
              className="country-search-input"
              style={{ paddingLeft: '1.75rem', marginBottom: 0 }}
              placeholder="Search country or code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
          </div>

          <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
            {filteredCountries.map((c) => (
              <div
                key={`${c.code}-${c.dialCode}`}
                className="country-option"
                onClick={() => {
                  onCountryChange(c);
                  setIsOpen(false);
                  setSearchQuery('');
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span>{c.flag}</span>
                  <span>{c.name}</span>
                </div>
                <span style={{ fontWeight: 600, color: '#64748b', fontSize: '0.85rem' }}>{c.dialCode}</span>
              </div>
            ))}
            {filteredCountries.length === 0 && (
              <div style={{ padding: '0.5rem', textAlign: 'center', fontSize: '0.85rem', color: '#94a3b8' }}>
                No country found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
