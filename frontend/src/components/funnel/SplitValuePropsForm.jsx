import React, { useState } from 'react';
import { Check, ChevronDown, Lock, Loader2 } from 'lucide-react';
import { leadsApi } from '../../api/leadsApi';
import PhoneInputWrapper from '../common/PhoneInputWrapper';

const COMPANY_SIZES = [
  '1-50 employees',
  '51-200 employees',
  '201-500 employees',
  '501-1000 employees',
  '1000+ employees',
  'Enterprise (5000+)'
];

const USE_CASES = [
  'Field Support',
  'Healthcare',
  'Customer Care',
  'Internal SOP',
  'Other'
];

export default function SplitValuePropsForm({ onSuccessLead, showToast }) {
  const valueProps = [
    'Get precise answers immediately without wading through hundreds of documents and tabs',
    'All your knowledge base in one place and always up to date',
    'Designed with enterprise-level security and control right from the start',
    'Quick to implement and easy to integrate into existing processes'
  ];

  const [formData, setFormData] = useState({
    fullName: '',
    workEmail: '',
    jobTitle: '',
    companyName: '',
    companySize: '',
    use_case: '',
    other_use_case: '',
    phone: ''
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

  const handlePhoneChange = (newPhone) => {
    setFormData((prev) => ({ ...prev, phone: newPhone }));
    if (errors.phone) {
      setErrors((prev) => ({ ...prev, phone: null }));
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
    if (!formData.use_case) errs.use_case = 'Please select a target use case';
    if (formData.use_case === 'Other' && !formData.other_use_case.trim()) {
      errs.other_use_case = 'Please describe your specific use case';
    }
    if (!formData.phone.trim()) errs.phone = 'Phone number is required';

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
      const response = await leadsApi.submitLead(formData);
      if (showToast) {
        showToast('Demo Unlocked! Lead saved to SQL database.', 'success');
      }
      if (onSuccessLead) {
        onSuccessLead(response.lead);
      }
      setFormData({
        fullName: '',
        workEmail: '',
        jobTitle: '',
        companyName: '',
        companySize: '',
        use_case: '',
        other_use_case: '',
        phone: ''
      });
    } catch (err) {
      console.error('Submission error:', err);
      if (showToast) {
        showToast(err.message || 'Submission failed. Please try again.', 'error');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="split-layout-grid" id="lead-form-section">
      {/* Left Column: 4 Value Points as Individual Feature Cards */}
      <div className="value-props-container">
        <div className="value-props-header">
          <h2 className="value-props-heading">Why teams choose Adople</h2>
          <p className="value-props-subheading">
            Enterprise AI Agent connects your documents, apps, and teams in one simple chat.
          </p>
        </div>
        
        <div className="value-props-cards-list">
          {valueProps.map((prop, idx) => (
            <div key={idx} className="value-prop-card">
              <div className="value-prop-badge">
                <Check size={16} strokeWidth={3} className="value-prop-check-icon" />
              </div>
              <p className="value-prop-text">{prop}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right Column: Clean Bright White Lead Capture Form Card */}
      <div className="light-form-container-card">
        <div className="light-form-header">
          <h2 className="light-form-heading">Quit searching. Begin to know.</h2>
          <p className="light-form-subheading">
            One chat for all your documents, apps &amp; team conversations.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="light-form-body">
          <div className="light-form-grid">
            {/* Row 1: Full Name & Work Email */}
            <div className="light-form-group">
              <input
                type="text"
                id="input-full-name"
                name="fullName"
                placeholder="Full name *"
                value={formData.fullName}
                onChange={handleChange}
                className={`light-input-control ${errors.fullName ? 'error' : ''}`}
              />
              {errors.fullName && <span className="light-form-error-msg">{errors.fullName}</span>}
            </div>

            <div className="light-form-group">
              <input
                type="email"
                id="input-work-email"
                name="workEmail"
                placeholder="Work email *"
                value={formData.workEmail}
                onChange={handleChange}
                className={`light-input-control ${errors.workEmail ? 'error' : ''}`}
              />
              {errors.workEmail && <span className="light-form-error-msg">{errors.workEmail}</span>}
            </div>

            {/* Row 2: Job Title & Company Name */}
            <div className="light-form-group">
              <input
                type="text"
                id="input-job-title"
                name="jobTitle"
                placeholder="Job title *"
                value={formData.jobTitle}
                onChange={handleChange}
                className={`light-input-control ${errors.jobTitle ? 'error' : ''}`}
              />
              {errors.jobTitle && <span className="light-form-error-msg">{errors.jobTitle}</span>}
            </div>

            <div className="light-form-group">
              <input
                type="text"
                id="input-company-name"
                name="companyName"
                placeholder="Company name *"
                value={formData.companyName}
                onChange={handleChange}
                className={`light-input-control ${errors.companyName ? 'error' : ''}`}
              />
              {errors.companyName && <span className="light-form-error-msg">{errors.companyName}</span>}
            </div>

            {/* Row 3: Company Size Dropdown & Phone Input */}
            <div className="light-form-group">
              <div className="light-select-wrapper">
                <select
                  id="select-company-size"
                  name="companySize"
                  value={formData.companySize}
                  onChange={handleChange}
                  className={`light-input-control ${errors.companySize ? 'error' : ''}`}
                >
                  <option value="" disabled hidden>Company size *</option>
                  {COMPANY_SIZES.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
                <ChevronDown size={14} className="light-select-chevron" />
              </div>
              {errors.companySize && <span className="light-form-error-msg">{errors.companySize}</span>}
            </div>

            <div className="light-form-group">
              <PhoneInputWrapper
                id="input-phone-number"
                name="phone"
                value={formData.phone}
                onChange={handlePhoneChange}
                required
                hasError={Boolean(errors.phone)}
                placeholder="081234 56789"
              />
              {errors.phone && <span className="light-form-error-msg">{errors.phone}</span>}
            </div>

            {/* Row 4: Target Use Case Dropdown (Spans Full Width) */}
            <div className="light-form-group-full">
              <div className="light-select-wrapper">
                <select
                  id="select-use-case"
                  name="use_case"
                  value={formData.use_case}
                  onChange={handleChange}
                  className={`light-input-control ${errors.use_case ? 'error' : ''}`}
                  style={{ cursor: 'pointer' }}
                  required
                >
                  <option value="" disabled hidden>Target use case *</option>
                  {USE_CASES.map((uc) => (
                    <option key={uc} value={uc}>
                      {uc}
                    </option>
                  ))}
                </select>
                <ChevronDown size={14} className="light-select-chevron" />
              </div>
              {errors.use_case && <span className="light-form-error-msg">{errors.use_case}</span>}
            </div>

            {/* Conditional Custom Use Case Input (Shown only when 'Other' selected) */}
            {formData.use_case === 'Other' && (
              <div className="light-form-group-full form-conditional-area">
                <input
                  type="text"
                  id="input-other-use-case"
                  name="other_use_case"
                  placeholder="Describe your specific use case *"
                  value={formData.other_use_case}
                  onChange={handleChange}
                  required={formData.use_case === 'Other'}
                  className={`light-input-control ${errors.other_use_case ? 'error' : ''}`}
                />
                {errors.other_use_case && <span className="light-form-error-msg">{errors.other_use_case}</span>}
              </div>
            )}
          </div>

          {/* Primary Submit Button: Solid Brand Blue (#2563EB / #1D4ED8) with white bold text */}
          <div className="light-form-cta-area">
            <button
              type="submit"
              id="btn-unlock-demo"
              className="btn-light-form-submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" size={16} />
                  <span>Opening Demo...</span>
                </>
              ) : (
                <span>Watch a demo</span>
              )}
            </button>
          </div>

          {/* Privacy Note */}
          <div className="light-form-privacy-note">
            <Lock size={12} />
            <span>No spam. No obligation.</span>
          </div>
        </form>
      </div>
    </div>
  );
}
