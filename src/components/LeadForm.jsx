import { useState } from 'react'
import { motion } from 'framer-motion'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { SERVICES } from '../lib/mockData'

export default function LeadForm({ dark = false, compact = false, source = 'website' }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', service_type: '', message: '' })
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    if (!form.name || !form.phone || !form.service_type) {
      setError('Please fill in Name, Phone, and Service Type.')
      return
    }
    setError('')
    setStatus('loading')
    try {
      if (isSupabaseConfigured()) {
        const { error: dbError } = await supabase.from('leads').insert([{
          name: form.name, phone: form.phone, email: form.email,
          service_type: form.service_type, message: form.message,
          source, status: 'new',
        }])
        if (dbError) throw dbError
      } else {
        await new Promise(r => setTimeout(r, 1200))
      }
      setStatus('success')
      setForm({ name: '', phone: '', email: '', service_type: '', message: '' })
    } catch (err) {
      setError('Something went wrong. Please call us directly at 702-460-2406.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="nm-card-lg p-8 text-center nm-glow">
        <div className="text-5xl mb-4">✅</div>
        <h3 className="font-display text-3xl text-white mb-2">WE GOT IT!</h3>
        <p className="font-bold text-white mb-1">Thanks, we'll call you within 2 hours.</p>
        <p className="text-sm" style={{ color: 'var(--nm-muted)' }}>
          Or call us now:{' '}
          <a href="tel:7024602406" className="font-bold text-[#00C4F0] hover:text-white transition-colors">
            702-460-2406
          </a>
        </p>
        <button onClick={() => setStatus('idle')}
          className="mt-4 text-xs hover:text-white transition-colors"
          style={{ color: 'var(--nm-muted)' }}>
          Submit another request
        </button>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="nm-card-lg p-6 md:p-8">
      <h3 className="font-display text-3xl mb-1" style={{ color: 'var(--nm-yellow)' }}>
        GET A FREE ESTIMATE
      </h3>
      <p className="text-sm mb-6" style={{ color: 'var(--nm-muted)' }}>
        We'll call you within 2 hours · No obligation · Free quote
      </p>

      <div className={`grid ${compact ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'} gap-4`}>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-1.5"
            style={{ color: 'var(--nm-muted)' }}>
            Full Name *
          </label>
          <input type="text" name="name" value={form.name} onChange={handleChange}
            placeholder="John Smith" className="nm-input" required />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-1.5"
            style={{ color: 'var(--nm-muted)' }}>
            Phone Number *
          </label>
          <input type="tel" name="phone" value={form.phone} onChange={handleChange}
            placeholder="702-555-0100" className="nm-input" required />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-1.5"
            style={{ color: 'var(--nm-muted)' }}>
            Email Address
          </label>
          <input type="email" name="email" value={form.email} onChange={handleChange}
            placeholder="you@email.com" className="nm-input" />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-1.5"
            style={{ color: 'var(--nm-muted)' }}>
            Service Type *
          </label>
          <select name="service_type" value={form.service_type} onChange={handleChange}
            className="nm-select" required>
            <option value="">Select a service…</option>
            {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {!compact && (
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold uppercase tracking-wider mb-1.5"
              style={{ color: 'var(--nm-muted)' }}>
              Message (Optional)
            </label>
            <textarea name="message" value={form.message} onChange={handleChange}
              placeholder="Tell us about your pool, any specific issues, or questions…"
              rows={3} className="nm-input resize-none" />
          </div>
        )}
      </div>

      {error && (
        <div className="mt-3 p-3 rounded-lg text-sm font-semibold"
          style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.4)', color: '#fca5a5' }}>
          {error}
        </div>
      )}

      <button type="submit" disabled={status === 'loading'}
        className="nm-btn-yellow w-full justify-center mt-6 text-base px-8 py-4
                   disabled:opacity-50 disabled:cursor-not-allowed">
        {status === 'loading' ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
            Sending…
          </span>
        ) : 'Get My Free Estimate →'}
      </button>

      <div className="mt-4 flex flex-wrap gap-3 justify-center">
        {['🔒 Licensed & Insured', '⭐ Best of Las Vegas 2023', '📞 2-Hour Response'].map(t => (
          <span key={t} className="text-xs font-semibold" style={{ color: 'var(--nm-muted)' }}>{t}</span>
        ))}
      </div>
    </form>
  )
}
