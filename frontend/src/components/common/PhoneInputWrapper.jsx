import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ChevronDown, Search } from 'lucide-react';

export const COUNTRIES = [
  // Asia
  { isoCode: 'in', name: 'India', dial: '+91' },
  { isoCode: 'sg', name: 'Singapore', dial: '+65' },
  { isoCode: 'my', name: 'Malaysia', dial: '+60' },
  { isoCode: 'id', name: 'Indonesia', dial: '+62' },
  { isoCode: 'th', name: 'Thailand', dial: '+66' },
  { isoCode: 'ph', name: 'Philippines', dial: '+63' },
  { isoCode: 'jp', name: 'Japan', dial: '+81' },
  { isoCode: 'cn', name: 'China', dial: '+86' },

  // Americas
  { isoCode: 'us', name: 'United States', dial: '+1' },
  { isoCode: 'ca', name: 'Canada', dial: '+1' },
  { isoCode: 'br', name: 'Brazil', dial: '+55' },
  { isoCode: 'mx', name: 'Mexico', dial: '+52' },

  // Europe
  { isoCode: 'gb', name: 'United Kingdom', dial: '+44' },
  { isoCode: 'de', name: 'Germany', dial: '+49' },
  { isoCode: 'fr', name: 'France', dial: '+33' },
  { isoCode: 'it', name: 'Italy', dial: '+39' },
  { isoCode: 'es', name: 'Spain', dial: '+34' },
  { isoCode: 'nl', name: 'Netherlands', dial: '+31' },
  { isoCode: 'be', name: 'Belgium', dial: '+32' },
  { isoCode: 'ch', name: 'Switzerland', dial: '+41' },
  { isoCode: 'at', name: 'Austria', dial: '+43' },
  { isoCode: 'se', name: 'Sweden', dial: '+46' },
  { isoCode: 'no', name: 'Norway', dial: '+47' },
  { isoCode: 'dk', name: 'Denmark', dial: '+45' },
  { isoCode: 'pl', name: 'Poland', dial: '+48' },
  { isoCode: 'gr', name: 'Greece', dial: '+30' },

  // Middle East
  { isoCode: 'ae', name: 'United Arab Emirates', dial: '+971' },
  { isoCode: 'sa', name: 'Saudi Arabia', dial: '+966' },

  // Oceania
  { isoCode: 'au', name: 'Australia', dial: '+61' },
  { isoCode: 'nz', name: 'New Zealand', dial: '+64' },

  // Africa
  { isoCode: 'za', name: 'South Africa', dial: '+27' }
];

export default function PhoneInputWrapper({
  value = '',
  onChange,
  required = false,
  placeholder = '081234 56789',
  hasError = false,
  id = 'input-phone-number',
  name = 'phoneNumber',
  disabled = false
}) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]); // Default: India (+91)
  const [isFocused, setIsFocused] = useState(false);

  const containerRef = useRef(null);
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);
  const inputRef = useRef(null);

  // Sync selectedCountry and local phone number from external value if present
  useEffect(() => {
    if (value && typeof value === 'string') {
      const sortedCountries = [...COUNTRIES].sort((a, b) => b.dial.length - a.dial.length);
      const matched = sortedCountries.find((c) => value.startsWith(c.dial));
      if (matched && matched.isoCode !== selectedCountry.isoCode) {
        setSelectedCountry(matched);
      }
    }
  }, [value]);

  // Click-outside listener
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (showDropdown) {
      setTimeout(() => {
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }, 50);
    } else {
      setSearchTerm('');
    }
  }, [showDropdown]);

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setShowDropdown(false);
    }
  };

  // Filter countries in real-time
  const filteredCountries = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return COUNTRIES;
    return COUNTRIES.filter(
      (country) =>
        country.name.toLowerCase().includes(term) ||
        country.dial.includes(term) ||
        country.isoCode.toLowerCase().includes(term)
    );
  }, [searchTerm]);

  // Extract national phone number without country dial code
  const nationalNumber = useMemo(() => {
    if (!value) return '';
    if (value.startsWith(selectedCountry.dial)) {
      return value.slice(selectedCountry.dial.length);
    }
    // Check if starts with any other dial code
    const sorted = [...COUNTRIES].sort((a, b) => b.dial.length - a.dial.length);
    const match = sorted.find((c) => value.startsWith(c.dial));
    if (match) {
      return value.slice(match.dial.length);
    }
    return value.replace(/\D/g, '');
  }, [value, selectedCountry]);

  const handleSelectCountry = (country) => {
    setSelectedCountry(country);
    setShowDropdown(false);
    setSearchTerm('');
    // Trigger onChange with new country dial code + existing national digits
    if (onChange) {
      const currentDigits = nationalNumber.replace(/\D/g, '');
      const fullNumber = currentDigits ? `${country.dial}${currentDigits}` : `${country.dial}`;
      onChange(fullNumber);
    }
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handlePhoneChange = (e) => {
    const rawValue = e.target.value;
    // Strip non-numeric characters
    const digitsOnly = rawValue.replace(/\D/g, '');
    const fullNumber = digitsOnly ? `${selectedCountry.dial}${digitsOnly}` : '';
    if (onChange) {
      onChange(fullNumber);
    }
  };

  const handlePhoneInputFocus = () => {
    setIsFocused(true);
    // If empty on focus, automatically prefix with country code when typing
    if (!value && onChange) {
      // Keep UX clean: input stays clean with placeholder until typed
    }
  };

  return (
    <div
      ref={containerRef}
      className={`phone-input-wrapper-container ${isFocused ? 'is-focused' : ''} ${
        hasError ? 'is-error' : ''
      }`}
      onKeyDown={handleKeyDown}
      style={{ position: 'relative' }}
    >
      {/* Country Selector Button */}
      <button
        type="button"
        className="phone-country-btn"
        onClick={() => setShowDropdown((prev) => !prev)}
        disabled={disabled}
        aria-label={`Select country code, currently ${selectedCountry.name} ${selectedCountry.dial}`}
        aria-expanded={showDropdown}
        title={`${selectedCountry.name} (${selectedCountry.dial})`}
      >
        <img
          src={`https://flagcdn.com/w40/${selectedCountry.isoCode.toLowerCase()}.png`}
          alt={selectedCountry.name}
          className="phone-country-flag"
          loading="lazy"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
        <span className="phone-country-dial">{selectedCountry.dial}</span>
        <ChevronDown
          size={14}
          className={`phone-chevron-icon ${showDropdown ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Phone Number Input */}
      <input
        ref={inputRef}
        type="tel"
        id={id}
        name={name}
        value={nationalNumber}
        onChange={handlePhoneChange}
        onFocus={handlePhoneInputFocus}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className="phone-text-input"
        autoComplete="tel-national"
      />

      {/* Smart Dropdown Menu (Positioned Above to avoid keyboard overlap) */}
      {showDropdown && (
        <div ref={dropdownRef} className="phone-dropdown-menu">
          {/* Search Box */}
          <div className="phone-search-wrapper">
            <Search size={14} className="phone-search-icon" />
            <input
              ref={searchInputRef}
              type="text"
              className="phone-search-input"
              placeholder="Search country or code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          {/* Country List */}
          <div className="phone-country-list" role="listbox">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country) => {
                const isSelected = country.isoCode === selectedCountry.isoCode;
                return (
                  <button
                    key={`${country.isoCode}-${country.dial}`}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    className={`phone-country-item ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleSelectCountry(country)}
                  >
                    <div className="phone-item-left">
                      <img
                        src={`https://flagcdn.com/w40/${country.isoCode.toLowerCase()}.png`}
                        alt={country.name}
                        className="phone-item-flag"
                        loading="lazy"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                      <span className="phone-item-name">{country.name}</span>
                    </div>
                    <span className="phone-item-dial">{country.dial}</span>
                  </button>
                );
              })
            ) : (
              <div className="phone-no-results">No countries found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
