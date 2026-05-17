import { useState } from 'react'
import { motion } from 'framer-motion'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { SERVICES } from '../lib/mockData'

export default function LeadForm({ compact = false, source = 'website' }) {
  const [form, setForm] = useState({ name:'', phone:'', email:'', service_type:'', message:'' })
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

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
      <motion.div initial={{ opacity:0, scale:0.97 }} animate={{ opacity:1, scale:1 }}
        className="nm-card p-8 text-center">
        <div className="nm-icon-lg mx-auto mb-4 text-2xl">✅</div>
        <h3 className="nm-heading-md mb-2">We Got It!</h3>
        <p className="nm-muted text-sm mb-1">We'll call you within 2 hours.</p>
        <a href="tel:7024602406" className="font-semibold text-sm"
          style={{ color: 'var(--nm-blue)' }}>702-460-2406</a>
        <div className="mt-4">
          <button onClick={() => setStatus('idle')} className="nm-btn-ghost text-xs py-2 px-4">
            Submit another request
          </button>
        </div>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="nm-card-lg p-6 md:p-8">
      <h3 className="nm-heading-md mb-1">Get a Free Estimate</h3>
      <p className="nm-muted text-sm mb-6">We'll call within 2 hours · No obligation</p>

      <div className={`grid ${compact ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'} gap-4`}>
        {[
          { label:'Full Name', name:'name',  type:'text',  placeholder:'John Smith',      req:true },
          { label:'Phone',     name:'phone', type:'tel',   placeholder:'702-555-0100',    req:true },
          { label:'Email',     name:'email', type:'email', placeholder:'you@email.com',   req:false },
        ].map(({ label, name, type, placeholder, req }) => (
          <div key={name}>
            <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide"
              style={{ color: 'var(--nm-muted)' }}>{label}{req && ' *'}</label>
            <input type={type} name={name} value={form[name]} onChange={handleChange}
              placeholder={placeholder} className="nm-input" required={req} />
          </div>
        ))}

        <div>
          <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide"
            style={{ color: 'var(--nm-muted)' }}>Service Type *</label>
          <select name="service_type" value={form.service_type} onChange={handleChange}
            className="nm-select" required>
            <option value="">Select a service…</option>
            {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {!compact && (
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide"
              style={{ color: 'var(--nm-muted)' }}>Message (Optional)</label>
            <textarea name="message" value={form.message} onChange={handleChange}
              placeholder="Tell us about your pool or any specific issues…"
              rows={3} className="nm-input resize-none" />
          </div>
        )}
      </div>

      {error && (
        <div className="mt-3 p-3 rounded-xl text-sm font-medium"
          style={{ background: 'rgba(220,38,38,0.08)', color: '#dc2626', border: '1px solid rgba(220,38,38,0.2)' }}>
          {error}
        </div>
      )}

      <button type="submit" disabled={status === 'loading'}
        className="nm-btn-primary w-full mt-5 py-4 text-base disabled:opacity-50 disabled:cursor-not-allowed">
        {status === 'loading'
          ? <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>Sending…</span>
          : 'Get My Free Estimate →'}
      </button>

      <div className="mt-4 flex flex-wrap gap-3 justify-center">
        {['🔒 Licensed & Insured','⭐ Best of Las Vegas 2023','📞 2-Hour Response'].map(t => (
          <span key={t} className="text-xs" style={{ color: 'var(--nm-muted)' }}>{t}</span>
        ))}
      </div>
    </form>
  )
}
