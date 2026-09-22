import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search, X } from 'lucide-react';

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
  disabled = false,
  id = 'phone-input',
  name = 'phone',
  hasError = false
}) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]); // Default: India (+91)
  const [phoneDigits, setPhoneDigits] = useState('');

  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);
  const buttonRef = useRef(null);
  const phoneInputRef = useRef(null);

  // Synchronize internal digits if value prop changes from outside (e.g. form reset)
  useEffect(() => {
    if (!value) {
      setPhoneDigits('');
      return;
    }

    // If value already starts with selected dial code, extract national number
    if (value.startsWith(selectedCountry.dial)) {
      const remaining = value.slice(selectedCountry.dial.length).replace(/\D/g, '');
      setPhoneDigits(remaining);
    } else {
      // Find matching country dial code if possible
      const matched = COUNTRIES.find((c) => value.startsWith(c.dial));
      if (matched) {
        setSelectedCountry(matched);
        const remaining = value.slice(matched.dial.length).replace(/\D/g, '');
        setPhoneDigits(remaining);
      } else {
        // Raw digits
        setPhoneDigits(value.replace(/\D/g, ''));
      }
    }
  }, [value, selectedCountry.dial]);

  // Click-outside listener to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
        setSearchTerm('');
      }
    };

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [showDropdown]);

  const optionsListRef = useRef(null);

  // Auto-focus search input and reset list scroll when dropdown opens
  useEffect(() => {
    if (showDropdown) {
      if (optionsListRef.current) {
        optionsListRef.current.scrollTop = 0;
      }
      if (searchInputRef.current) {
        setTimeout(() => {
          searchInputRef.current?.focus();
        }, 50);
      }
    }
  }, [showDropdown]);

  // Handle country selection
  const handleSelectCountry = (country) => {
    setSelectedCountry(country);
    setShowDropdown(false);
    setSearchTerm('');

    // Emit updated phone with new dial code
    const fullNumber = phoneDigits ? `${country.dial}${phoneDigits}` : '';
    if (onChange) {
      onChange(fullNumber);
    }

    phoneInputRef.current?.focus();
  };

  // Handle phone input changes (digits only)
  const handlePhoneChange = (e) => {
    const rawDigits = e.target.value.replace(/\D/g, '');
    setPhoneDigits(rawDigits);

    const fullNumber = rawDigits ? `${selectedCountry.dial}${rawDigits}` : '';
    if (onChange) {
      onChange(fullNumber);
    }
  };

  // Filter countries by name, dial code, or ISO code
  const filteredCountries = COUNTRIES.filter((c) => {
    const q = searchTerm.toLowerCase().trim();
    if (!q) return true;
    return (
      c.name.toLowerCase().includes(q) ||
      c.dial.toLowerCase().includes(q) ||
      c.isoCode.toLowerCase().includes(q)
    );
  });

  return (
    <div
      className={`phone-input-wrapper-container ${hasError ? 'error' : ''}`}
      style={{ position: 'relative' }}
    >
      {/* Dropdown Menu (Positioned cleanly below the input field) */}
      {showDropdown && (
        <div
          ref={dropdownRef}
          className="phone-country-dropdown"
          role="listbox"
          aria-label="Select Country"
        >
          {/* Search Header */}
          <div className="phone-country-search-wrap">
            <Search size={14} className="phone-search-icon" />
            <input
              ref={searchInputRef}
              type="text"
              className="phone-country-search-input"
              placeholder="Search country or code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  setShowDropdown(false);
                  setSearchTerm('');
                }
              }}
            />
            {searchTerm && (
              <button
                type="button"
                className="phone-search-clear-btn"
                onClick={() => setSearchTerm('')}
                aria-label="Clear search"
              >
                <X size={12} />
              </button>
            )}
          </div>

          {/* Countries Scrollable List */}
          <div ref={optionsListRef} className="phone-country-options-list">
            {filteredCountries.length === 0 ? (
              <div className="phone-no-countries">No country found</div>
            ) : (
              filteredCountries.map((country) => {
                const isSelected = country.isoCode === selectedCountry.isoCode;
                return (
                  <button
                    key={`${country.isoCode}-${country.dial}`}
                    type="button"
                    className={`phone-country-item ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleSelectCountry(country)}
                  >
                    <img
                      src={`https://flagcdn.com/w40/${country.isoCode.toLowerCase()}.png`}
                      srcSet={`https://flagcdn.com/w80/${country.isoCode.toLowerCase()}.png 2x`}
                      alt={`${country.name} flag`}
                      className="phone-flag-img"
                      loading="eager"
                    />
                    <span className="phone-country-name">{country.name}</span>
                    <span className="phone-country-dial">{country.dial}</span>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* Main Combined Phone Input Field */}
      <div className="phone-input-bar">
        {/* Country Selector Button */}
        <button
          ref={buttonRef}
          type="button"
          className="phone-country-btn"
          onClick={() => setShowDropdown((prev) => !prev)}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={showDropdown}
          aria-label={`Country code: ${selectedCountry.name} (${selectedCountry.dial})`}
        >
          <img
            src={`https://flagcdn.com/w40/${selectedCountry.isoCode.toLowerCase()}.png`}
            alt={`${selectedCountry.name} flag`}
            className="phone-flag-img-btn"
          />
          <span className="phone-country-dial-label">{selectedCountry.dial}</span>
          <ChevronDown
            size={14}
            className={`phone-chevron-icon ${showDropdown ? 'rotate' : ''}`}
          />
        </button>

        {/* Digits Input */}
        <input
          ref={phoneInputRef}
          type="tel"
          id={id}
          name={name}
          className="phone-digits-input"
          placeholder={placeholder}
          value={phoneDigits}
          onChange={handlePhoneChange}
          required={required}
          disabled={disabled}
          autoComplete="tel-national"
        />
      </div>
    </div>
  );
}
