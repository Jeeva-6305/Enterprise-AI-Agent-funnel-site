import React, { useState } from 'react';
import { CheckCircle2, Loader2, Lock } from 'lucide-react';
import { DEFAULT_COUNTRY, CountryCode } from '../data/countryCodes';
import { PhoneInput } from './PhoneInput';

interface LeadFormProps {
  onSuccess: (accessToken: string, email?: string) => void;
  onAlreadyWatched?: () => void;
}

export const LeadForm: React.FC<LeadFormProps> = ({ onSuccess, onAlreadyWatched }) => {
  const [fullName, setFullName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companySize, setCompanySize] = useState('');
  const [country, setCountry] = useState<CountryCode>(DEFAULT_COUNTRY);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const storeLeadLocally = () => {
    try {
      const stored = JSON.parse(localStorage.getItem('adople_pending_leads') || '[]');
      stored.push({
        fullName,
        workEmail,
        jobTitle,
        companyName,
        companySize,
        phoneNumber,
        submittedAt: new Date().toISOString()
      });
      localStorage.setItem('adople_pending_leads', JSON.stringify(stored));
    } catch (e) {
      console.error('Failed to store lead locally', e);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!companySize) { setError('Please select your company size.'); return; }

    const cleanEmail = workEmail.trim().toLowerCase();

    // Check local storage for quick pre-validation
    if (localStorage.getItem(`adople_watched_${cleanEmail}`) === 'true') {
      setError('You have already watched the demo video with this email address. Each user receives one-time access, and the video is currently locked.');
      if (onAlreadyWatched) onAlreadyWatched();
      return;
    }

    setLoading(true);

    const fallbackToken = `demo_${Date.now()}_${Math.random().toString(36).substring(7)}`;

    try {
      const apiKey = import.meta.env.VITE_FUNNEL_API_KEY || 'sk_live_agenticdo_878a80ac90a06d3bb61ae527fdc59d4e24c06582ada81a70';
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:9075';
      let finalToken = fallbackToken;
      let alreadyWatched = false;

      try {
        const res = await fetch(`${backendUrl}/api/ingest/leads`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-API-Key': apiKey
          },
          body: JSON.stringify({
            funnel_id: "agentic-data-analyst",
            funnel_source: "Agentic Data Analyst",
            full_name: fullName.trim(),
            email: cleanEmail,
            phone: phoneNumber,
            company: companyName.trim(),
            job_title: jobTitle.trim(),
            use_case: `Company Size: ${companySize}`,
            message: ""
          }),
        });

        if (res.ok) {
          const data = await res.json();
          if (data.status === 'already_watched' || data.video_watched === true) {
            alreadyWatched = true;
            setError(data.message || 'You have already watched the demo video with this email address. Your one-time demo access has expired, and the video is locked.');
            localStorage.setItem('adople_demo_watched', 'true');
            localStorage.setItem(`adople_watched_${cleanEmail}`, 'true');
            localStorage.removeItem('adople_demo_access_token');
            if (onAlreadyWatched) onAlreadyWatched();
            return;
          }
          if (data && data.access_token) {
            finalToken = data.access_token;
          }
        } else {
          storeLeadLocally();
        }
      } catch (fetchErr) {
        // Backend offline or unreachable — store locally and grant instant access
        console.warn('Backend unavailable, lead stored locally:', fetchErr);
        storeLeadLocally();
      }

      if (!alreadyWatched) {
        localStorage.setItem('adople_demo_access_token', finalToken);
        localStorage.setItem('adople_user_email', cleanEmail);
        localStorage.setItem('adople_user_name', fullName.trim());
        onSuccess(finalToken, cleanEmail);
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const labelStyle: React.CSSProperties = {
    fontSize: '0.72rem',
    fontWeight: 600,
    color: 'var(--text-body)',
    marginBottom: '0.15rem',
    display: 'block'
  };

  const rowGap = '0.45rem';
  const colGap = '0.4rem';

  return (
    <div style={{
      background: '#FFFFFF',
      borderRadius: '12px',
      padding: '1rem 1.1rem',
      boxShadow: '0 16px 40px rgba(15, 23, 42, 0.14)',
      color: 'var(--text-heading)',
      width: '100%'
    }}>

      {/* Left-aligned header */}
      <div style={{ marginBottom: '0.55rem' }}>
        <h3 style={{
          fontSize: '1rem',
          fontWeight: 800,
          color: 'var(--text-heading)',
          marginBottom: '0.15rem',
          lineHeight: 1.25
        }}>
          Watch the 5-Minute Product Demo
        </h3>
        <p style={{
          fontSize: '0.73rem',
          color: 'var(--text-muted)',
          lineHeight: 1.4
        }}>
          Complete your details below to get instant access to the full Adople Agentic Data Analyst product walkthrough.
        </p>
      </div>

      {error && (
        <div style={{
          padding: '0.5rem 0.75rem',
          background: '#FEF2F2',
          border: '1px solid #FCA5A5',
          borderRadius: '8px',
          color: '#991B1B',
          fontSize: '0.75rem',
          marginBottom: '0.65rem',
          lineHeight: 1.45,
          fontWeight: 500
        }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>

        {/* Row 1: Full Name full-width */}
        <div className="form-group" style={{ marginBottom: rowGap }}>
          <label style={labelStyle}>Full Name *</label>
          <input type="text" className="form-input" placeholder="Enter your full name"
            value={fullName} onChange={e => setFullName(e.target.value)} required />
        </div>

        {/* Row 2: Work Email full-width */}
        <div className="form-group" style={{ marginBottom: rowGap }}>
          <label style={labelStyle}>Work Email *</label>
          <input type="email" className="form-input" placeholder="Enter your work email"
            value={workEmail} onChange={e => setWorkEmail(e.target.value)} required />
        </div>

        {/* Row 3: Job Title | Company Name */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: colGap, marginBottom: rowGap }}>
          <div className="form-group">
            <label style={labelStyle}>Job Title *</label>
            <input type="text" className="form-input" placeholder="Enter your job title"
              value={jobTitle} onChange={e => setJobTitle(e.target.value)} required />
          </div>
          <div className="form-group">
            <label style={labelStyle}>Company Name *</label>
            <input type="text" className="form-input" placeholder="Enter your company name"
              value={companyName} onChange={e => setCompanyName(e.target.value)} required />
          </div>
        </div>

        {/* Row 4: Company Size | Phone Number */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: colGap, marginBottom: '0.55rem' }}>
          <div className="form-group">
            <label style={labelStyle}>Company Size *</label>
            <select className="form-select" value={companySize} onChange={e => setCompanySize(e.target.value)} required>
              <option value="" disabled hidden>Select company size</option>
              <option value="1-10">1-10 employees</option>
              <option value="11-50">11-50 employees</option>
              <option value="51-200">51-200 employees</option>
              <option value="201-500">201-500 employees</option>
              <option value="501-1000">501-1000 employees</option>
              <option value="1000+">1000+ employees</option>
            </select>
          </div>
          <div className="form-group">
            <label style={labelStyle}>Phone Number *</label>
            <PhoneInput country={country} onCountryChange={setCountry}
              phoneNumber={phoneNumber} onPhoneChange={setPhoneNumber} required />
          </div>
        </div>

        {/* Full-width submit */}
        <button type="submit" disabled={loading} className="btn-primary" style={{
          width: '100%', height: '38px',
          fontSize: '0.82rem',
          justifyContent: 'center', gap: '0.4rem',
          marginBottom: '0.4rem'
        }}>
          {loading
            ? <><Loader2 size={15} className="animate-spin" /> Saving your details...</>
            : <><Lock size={13} /> Watch the Demo Now</>}
        </button>

        {/* Security note */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: '0.25rem', fontSize: '0.68rem',
          color: 'var(--text-muted)', textAlign: 'center', flexWrap: 'wrap'
        }}>
          <CheckCircle2 size={11} color="#4C9A7A" />
          <span>100% Secure. No spam. One-time access.</span>
        </div>

      </form>
    </div>
  );
};
