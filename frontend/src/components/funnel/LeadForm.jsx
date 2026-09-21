import React, { useState } from 'react';
import { ChevronDown, Lock, Loader2, CheckCircle2 } from 'lucide-react';
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

export default function LeadForm({ onSuccessLead, showToast }) {
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
      // Reset form
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
    <div className="form-container" id="lead-form-section">
      <div className="form-header-area">
        <h2 className="form-heading">Quit searching. Begin to know.</h2>
        <p className="form-subheading">
          One chat for all your documents, apps &amp; team conversations.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        {/* 2-Column Inputs Grid */}
        <div className="form-grid">
          {/* Full Name */}
          <div className="form-group">
            <input
              type="text"
              id="input-full-name"
              name="fullName"
              placeholder="Full Name *"
              value={formData.fullName}
              onChange={handleChange}
              className={`form-input-control ${errors.fullName ? 'error' : ''}`}
            />
            {errors.fullName && <span className="form-error-msg">{errors.fullName}</span>}
          </div>

          {/* Work Email */}
          <div className="form-group">
            <input
              type="email"
              id="input-work-email"
              name="workEmail"
              placeholder="Work Email *"
              value={formData.workEmail}
              onChange={handleChange}
              className={`form-input-control ${errors.workEmail ? 'error' : ''}`}
            />
            {errors.workEmail && <span className="form-error-msg">{errors.workEmail}</span>}
          </div>

          {/* Job Title */}
          <div className="form-group">
            <input
              type="text"
              id="input-job-title"
              name="jobTitle"
              placeholder="Job Title *"
              value={formData.jobTitle}
              onChange={handleChange}
              className={`form-input-control ${errors.jobTitle ? 'error' : ''}`}
            />
            {errors.jobTitle && <span className="form-error-msg">{errors.jobTitle}</span>}
          </div>

          {/* Company Name */}
          <div className="form-group">
            <input
              type="text"
              id="input-company-name"
              name="companyName"
              placeholder="Company Name *"
              value={formData.companyName}
              onChange={handleChange}
              className={`form-input-control ${errors.companyName ? 'error' : ''}`}
            />
            {errors.companyName && <span className="form-error-msg">{errors.companyName}</span>}
          </div>

          {/* Company Size Dropdown */}
          <div className="form-group">
            <div className="select-wrapper">
              <select
                id="select-company-size"
                name="companySize"
                value={formData.companySize}
                onChange={handleChange}
                className={`form-input-control ${errors.companySize ? 'error' : ''}`}
              >
                <option value="" disabled hidden>Company Size *</option>
                {COMPANY_SIZES.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
              <ChevronDown size={14} className="select-chevron" />
            </div>
            {errors.companySize && <span className="form-error-msg">{errors.companySize}</span>}
          </div>

          {/* Phone Number with PhoneInputWrapper */}
          <div className="form-group">
            <PhoneInputWrapper
              id="input-phone-number"
              name="phone"
              value={formData.phone}
              onChange={handlePhoneChange}
              required
              hasError={Boolean(errors.phone)}
              placeholder="081234 56789"
            />
            {errors.phone && <span className="form-error-msg">{errors.phone}</span>}
          </div>

          {/* Target Use Case Dropdown (Spans Full Width) */}
          <div className="form-group-full">
            <div className="select-wrapper">
              <select
                id="select-use-case"
                name="use_case"
                value={formData.use_case}
                onChange={handleChange}
                className={`form-input-control ${errors.use_case ? 'error' : ''}`}
                style={{ cursor: 'pointer' }}
                required
              >
                <option value="" disabled hidden>Target Use Case *</option>
                {USE_CASES.map((uc) => (
                  <option key={uc} value={uc}>
                    {uc}
                  </option>
                ))}
              </select>
              <ChevronDown size={14} className="select-chevron" />
            </div>
            {errors.use_case && <span className="form-error-msg">{errors.use_case}</span>}
          </div>

          {/* Conditional Custom Use Case Input (Shown only when 'Other' selected) */}
          {formData.use_case === 'Other' && (
            <div className="form-group-full form-conditional-area">
              <input
                type="text"
                id="input-other-use-case"
                name="other_use_case"
                placeholder="Describe your specific use case *"
                value={formData.other_use_case}
                onChange={handleChange}
                required={formData.use_case === 'Other'}
                className={`form-input-control ${errors.other_use_case ? 'error' : ''}`}
              />
              {errors.other_use_case && <span className="form-error-msg">{errors.other_use_case}</span>}
            </div>
          )}
        </div>

        {/* CTA Button placed below form inputs as requested */}
        <div className="form-cta-bottom">
          <button
            type="submit"
            id="btn-unlock-demo"
            className="btn-primary form-submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin" size={16} />
                <span>Opening Demo...</span>
              </>
            ) : (
              <span>Watch a Demo</span>
            )}
          </button>
        </div>

        {/* Privacy Lock Note */}
        <div className="form-privacy-note">
          <Lock size={12} />
          <span>No spam. No obligation.</span>
        </div>
      </form>
    </div>
  );
}

