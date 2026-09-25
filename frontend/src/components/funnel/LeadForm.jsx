import React, { useState } from 'react';
import { ChevronDown, Lock, Loader2, CheckCircle2 } from 'lucide-react';
import { leadsApi } from '../../api/leadsApi';

const COUNTRY_CODES = [
  { code: '+91', flag: '🇮🇳', name: 'India' },
  { code: '+1', flag: '🇺🇸', name: 'USA/Canada' },
  { code: '+44', flag: '🇬🇧', name: 'UK' },
  { code: '+61', flag: '🇦🇺', name: 'Australia' },
  { code: '+49', flag: '🇩🇪', name: 'Germany' },
  { code: '+971', flag: '🇦🇪', name: 'UAE' },
  { code: '+65', flag: '🇸🇬', name: 'Singapore' },
  { code: '+81', flag: '🇯🇵', name: 'Japan' }
];

const COMPANY_SIZES = [
  '1-50 employees',
  '51-200 employees',
  '201-500 employees',
  '501-1000 employees',
  '1000+ employees',
  'Enterprise (5000+)'
];

export default function LeadForm({ onSuccessLead, showToast }) {
  const [formData, setFormData] = useState({
    fullName: '',
    workEmail: '',
    jobTitle: '',
    companyName: '',
    companySize: '',
    phoneCountryCode: '+91',
    phoneNumber: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full name is required';
    if (!formData.workEmail.trim()) {
      errs.workEmail = 'Work email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.workEmail.trim())) {
      errs.workEmail = 'Enter a valid business email';
    }
    if (!formData.jobTitle.trim()) errs.jobTitle = 'Job title is required';
    if (!formData.companyName.trim()) errs.companyName = 'Company name is required';
    if (!formData.companySize) errs.companySize = 'Please select company size';
    if (!formData.phoneNumber.trim()) errs.phoneNumber = 'Phone number is required';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      if (showToast) showToast('Please complete all required fields to unlock the demo video.', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await leadsApi.submitLead({
        ...formData,
        sourceCampaign: 'SEC Analysis Funnel'
      });
      if (showToast) {
        showToast('Demo Unlocked! Lead saved to SQL database.', 'success');
      }
      if (onSuccessLead) {
        onSuccessLead(response.lead || { fullName: formData.fullName, companyName: formData.companyName });
      }
      // Reset form
      setFormData({
        fullName: '',
        workEmail: '',
        jobTitle: '',
        companyName: '',
        companySize: '',
        phoneCountryCode: '+91',
        phoneNumber: ''
      });
    } catch (err) {
      console.error('Submission error:', err);
      // Fallback: ensure demo unlocks so prospective customer is never blocked
      if (showToast) {
        showToast('Demo Unlocked! Access granted.', 'success');
      }
      if (onSuccessLead) {
        onSuccessLead({
          fullName: formData.fullName,
          companyName: formData.companyName,
          email: formData.workEmail
        });
      }
      setFormData({
        fullName: '',
        workEmail: '',
        jobTitle: '',
        companyName: '',
        companySize: '',
        phoneCountryCode: '+91',
        phoneNumber: ''
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentCountry = COUNTRY_CODES.find(c => c.code === formData.phoneCountryCode) || COUNTRY_CODES[0];

  return (
    <div className="screenshot-form-card" id="lead-form-section">
      <div className="screenshot-form-header">
        <h2 className="screenshot-form-title">Watch a Demo</h2>
        <p className="screenshot-form-subtitle">
          Enter your details below to access the interactive SEC-Mind product demo.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        {/* 2-Column Inputs Grid */}
        <div className="screenshot-form-grid">
          {/* Full Name */}
          <div className="screenshot-form-group">
            <input
              type="text"
              id="input-full-name"
              name="fullName"
              placeholder="Full Name *"
              value={formData.fullName}
              onChange={handleChange}
              className={`screenshot-form-input ${errors.fullName ? 'error' : ''}`}
            />
            {errors.fullName && <span className="form-error-msg">{errors.fullName}</span>}
          </div>

          {/* Work Email */}
          <div className="screenshot-form-group">
            <input
              type="email"
              id="input-work-email"
              name="workEmail"
              placeholder="Work Email *"
              value={formData.workEmail}
              onChange={handleChange}
              className={`screenshot-form-input ${errors.workEmail ? 'error' : ''}`}
            />
            {errors.workEmail && <span className="form-error-msg">{errors.workEmail}</span>}
          </div>

          {/* Job Title */}
          <div className="screenshot-form-group">
            <input
              type="text"
              id="input-job-title"
              name="jobTitle"
              placeholder="Job Title *"
              value={formData.jobTitle}
              onChange={handleChange}
              className={`screenshot-form-input ${errors.jobTitle ? 'error' : ''}`}
            />
            {errors.jobTitle && <span className="form-error-msg">{errors.jobTitle}</span>}
          </div>

          {/* Company Name */}
          <div className="screenshot-form-group">
            <input
              type="text"
              id="input-company-name"
              name="companyName"
              placeholder="Company Name *"
              value={formData.companyName}
              onChange={handleChange}
              className={`screenshot-form-input ${errors.companyName ? 'error' : ''}`}
            />
            {errors.companyName && <span className="form-error-msg">{errors.companyName}</span>}
          </div>

          {/* Company Size Dropdown */}
          <div className="screenshot-form-group">
            <div className="screenshot-select-wrap">
              <select
                id="select-company-size"
                name="companySize"
                value={formData.companySize}
                onChange={handleChange}
                className={`screenshot-form-input select ${errors.companySize ? 'error' : ''}`}
              >
                <option value="" disabled hidden>Company Size *</option>
                {COMPANY_SIZES.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
              <ChevronDown size={16} className="screenshot-select-chevron" />
            </div>
            {errors.companySize && <span className="form-error-msg">{errors.companySize}</span>}
          </div>

          {/* Phone Number with Country Code */}
          <div className="screenshot-form-group">
            <div className={`screenshot-phone-group ${errors.phoneNumber ? 'error' : ''}`}>
              <div className="screenshot-country-select-wrap">
                <span className="country-flag-icon">{currentCountry.flag}</span>
                <select
                  id="select-country-code"
                  name="phoneCountryCode"
                  value={formData.phoneCountryCode}
                  onChange={handleChange}
                  className="screenshot-country-select"
                >
                  {COUNTRY_CODES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.code}
                    </option>
                  ))}
                </select>
                <ChevronDown size={12} style={{ color: '#64748b' }} />
              </div>
              <input
                type="tel"
                id="input-phone-number"
                name="phoneNumber"
                placeholder="081234 56789"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="screenshot-phone-input"
              />
            </div>
            {errors.phoneNumber && <span className="form-error-msg">{errors.phoneNumber}</span>}
          </div>
        </div>

        {/* CTA Button placed below inputs as shown in screenshot */}
        <div className="screenshot-form-cta">
          <button
            type="submit"
            id="btn-unlock-demo"
            className="screenshot-btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin" size={16} />
                <span>Loading Demo...</span>
              </>
            ) : (
              <span>Watch a Demo</span>
            )}
          </button>
        </div>

        {/* Privacy Lock Note */}
        <div className="screenshot-privacy-note">
          <Lock size={12} />
          <span>No spam. No obligation</span>
        </div>
      </form>
    </div>
  );
}
