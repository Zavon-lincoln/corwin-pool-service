import { useState } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { SERVICES } from '../lib/mockData'

export default function LeadForm({ source = 'website' }) {
  const [form, setForm]   = useState({ name:'', phone:'', email:'', service_type:'', message:'' })
  const [status, setStatus] = useState('idle')
  const [error, setError]   = useState('')

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    if (!form.name || !form.phone || !form.service_type) {
      setError('Please fill in Name, Phone, and Service Type.')
      return
    }
    setError(''); setStatus('loading')
    try {
      if (isSupabaseConfigured()) {
        const { error: dbError } = await supabase.from('leads').insert([{
          name: form.name, phone: form.phone, email: form.email,
          service_type: form.service_type, message: form.message, source, status: 'new',
        }])
        if (dbError) throw dbError
      } else {
        await new Promise(r => setTimeout(r, 1200))
      }
      setStatus('success')
      setForm({ name:'', phone:'', email:'', service_type:'', message:'' })
    } catch {
      setError('Something went wrong. Please call us at 702-460-2406.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="card-lg p-8 text-center">
        <div className="icon-wrap-lg mx-auto mb-4" style={{ color: '#2d8a4e' }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
        </div>
        <h3 className="heading" style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Request Received!</h3>
        <p className="muted" style={{ fontSize: '0.9rem' }}>We will call you within 2 hours to discuss your pool needs.</p>
      </div>
    )
  }

  return (
    <div className="card-lg p-8">
      <h3 className="heading" style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>Get a Free Estimate</h3>
      <p className="muted" style={{ fontSize: '0.875rem', marginBottom: '1.5rem' }}>We will call you within 2 hours &middot; No obligation &middot; Free quote</p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--muted)', marginBottom: '0.4rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Full Name *</label>
            <input name="name" type="text" value={form.name} onChange={handleChange} placeholder="John Smith" className="field" />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--muted)', marginBottom: '0.4rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Phone *</label>
            <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="702-555-0100" className="field" />
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--muted)', marginBottom: '0.4rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Email Address</label>
          <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@email.com" className="field" />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--muted)', marginBottom: '0.4rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Service Type *</label>
          <select name="service_type" value={form.service_type} onChange={handleChange} className="field">
            <option value="">Select a service...</option>
            {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--muted)', marginBottom: '0.4rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Message (Optional)</label>
          <textarea name="message" value={form.message} onChange={handleChange} placeholder="Tell us about your pool, any specific issues, or questions..." rows={3} className="field" style={{ resize: 'none' }} />
        </div>

        {error && <p style={{ fontSize: '0.875rem', color: '#b83232', fontWeight: 500 }}>{error}</p>}

        <button type="submit" disabled={status === 'loading'} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '0.875rem' }}>
          {status === 'loading' ? (
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <svg style={{ animation: 'spin 1s linear infinite' }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" strokeOpacity="0.25"/><path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round"/></svg>
              Sending...
            </span>
          ) : 'Get My Free Estimate'}
        </button>

        <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--muted)' }}>
          Licensed &amp; Insured &nbsp;·&nbsp; Best of Las Vegas 2023 &nbsp;·&nbsp; 2-Hour Response
        </p>
      </form>
    </div>
  )
}
