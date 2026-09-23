import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Loader2, Lock } from 'lucide-react';
import { DEFAULT_COUNTRY, CountryCode } from '../data/countryCodes';
import { PhoneInput } from './PhoneInput';

interface LeadFormProps {
  onSuccess: (accessToken: string) => void;
}

export const LeadForm: React.FC<LeadFormProps> = ({ onSuccess }) => {
  const [fullName, setFullName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companySize, setCompanySize] = useState('');
  const [country, setCountry] = useState<CountryCode>(DEFAULT_COUNTRY);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!companySize) { setError('Please select your company size.'); return; }
    setLoading(true);
    try {
      const apiKey = import.meta.env.VITE_FUNNEL_API_KEY || 'sk_live_agenticdo_878a80ac90a06d3bb61ae527fdc59d4e24c06582ada81a70';
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:9000';
      const res = await fetch(`${backendUrl}/api/ingest/leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': apiKey
        },
        body: JSON.stringify({
          funnel_id: "agentic-data-analyst",
          funnel_source: "Agentic Data Analyst",
          full_name: fullName,
          email: workEmail,
          phone: phoneNumber,
          company: companyName,
          job_title: jobTitle,
          use_case: `Company Size: ${companySize}`,
          message: ""
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || err.message || 'Submission failed. Please check your details.');
      }
      const data = await res.json();
      // Generate a simple access token for frontend use
      const accessToken = `demo_${Date.now()}_${Math.random().toString(36).substring(7)}`;
      localStorage.setItem('adople_demo_access_token', accessToken);
      localStorage.setItem('adople_user_name', fullName);
      onSuccess(accessToken);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      background: '#FFFFFF',
      borderRadius: 'clamp(12px, 3vw, 16px)',
      padding: 'clamp(1.5rem, 4vw, 2.5rem)',
      boxShadow: '0 24px 56px rgba(15, 23, 42, 0.18)',
      color: 'var(--text-heading)',
      maxWidth: '100%',
      margin: '0 auto',
      width: '100%'
    }}>
      {/* Form header */}
      <div style={{
        textAlign: 'center',
        marginBottom: 'clamp(1.25rem, 3vw, 1.5rem)'
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 'clamp(0.3rem, 1vw, 0.4rem)',
          padding: 'clamp(0.3rem, 1vw, 0.35rem) clamp(0.7rem, 1.5vw, 0.85rem)',
          background: '#EFF6FF',
          border: '1px solid #BFDBFE',
          borderRadius: '999px',
          color: '#1D4ED8',
          fontSize: 'clamp(0.7rem, 1.3vw, 0.78rem)',
          fontWeight: 700,
          marginBottom: 'clamp(0.7rem, 1.5vw, 0.85rem)',
          whiteSpace: 'nowrap'
        }}>
          <Lock size={12} /> FREE DEMO ACCESS
        </div>
        <h3 style={{
          fontSize: 'clamp(1.15rem, 3vw, 1.4rem)',
          fontWeight: 800,
          color: 'var(--text-heading)',
          marginBottom: 'clamp(0.3rem, 1vw, 0.35rem)',
          lineHeight: 1.3
        }}>
          Watch the 5-Minute Product Demo
        </h3>
        <p style={{
          fontSize: 'clamp(0.82rem, 1.5vw, 0.88rem)',
          color: 'var(--text-muted)',
          lineHeight: 1.55
        }}>
          Complete your details below to get instant access to the full Adople Agentic Data Analyst product walkthrough.
        </p>
      </div>

      {error && (
        <div style={{
          padding: 'clamp(0.65rem, 1.5vw, 0.75rem) clamp(0.85rem, 2vw, 1rem)',
          background: '#FEF2F2',
          border: '1px solid #FCA5A5',
          borderRadius: 'clamp(6px, 1.5vw, 8px)',
          color: '#991B1B',
          fontSize: 'clamp(0.8rem, 1.5vw, 0.85rem)',
          marginBottom: 'clamp(1rem, 2.5vw, 1.25rem)',
          lineHeight: 1.5
        }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="lead-form-grid">
          <div className="form-group">
            <label className="form-label">Full Name *</label>
            <input type="text" className="form-input" value={fullName} onChange={e => setFullName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label className="form-label">Work Email *</label>
            <input type="email" className="form-input" value={workEmail} onChange={e => setWorkEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label className="form-label">Job Title *</label>
            <input type="text" className="form-input" value={jobTitle} onChange={e => setJobTitle(e.target.value)} required />
          </div>
          <div className="form-group">
            <label className="form-label">Company Name *</label>
            <input type="text" className="form-input" value={companyName} onChange={e => setCompanyName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label className="form-label">Company Size *</label>
            <select className="form-select" value={companySize} onChange={e => setCompanySize(e.target.value)} required>
              <option value="" disabled hidden></option>
              <option value="1-10">1–10 employees</option>
              <option value="11-50">11–50 employees</option>
              <option value="51-200">51–200 employees</option>
              <option value="201-500">201–500 employees</option>
              <option value="501-1000">501–1000 employees</option>
              <option value="1000+">1000+ employees</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Phone Number *</label>
            <PhoneInput
              country={country}
              onCountryChange={setCountry}
              phoneNumber={phoneNumber}
              onPhoneChange={setPhoneNumber}
              required
            />
          </div>
        </div>

        <div style={{ marginTop: 'clamp(1.25rem, 3vw, 1.5rem)' }}>
          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
            style={{
              width: '100%',
              height: 'clamp(46px, 10vw, 52px)',
              fontSize: 'clamp(0.9rem, 1.8vw, 1rem)',
              justifyContent: 'center'
            }}
          >
            {loading ? (
              <><Loader2 size={18} className="animate-spin" /> Saving your details...</>
            ) : (
              <>Watch the Demo Now <ArrowRight size={18} /></>
            )}
          </button>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'clamp(0.3rem, 1vw, 0.35rem)',
          marginTop: 'clamp(0.75rem, 1.5vw, 0.85rem)',
          fontSize: 'clamp(0.72rem, 1.3vw, 0.77rem)',
          color: 'var(--text-muted)',
          textAlign: 'center',
          flexWrap: 'wrap'
        }}>
          <CheckCircle2 size={13} color="#10B981" />
          <span>No spam. Your details are stored securely and never shared.</span>
        </div>
      </form>
    </div>
  );
};
