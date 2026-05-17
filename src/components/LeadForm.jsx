import { useState } from 'react'
import { motion } from 'framer-motion'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { SERVICES } from '../lib/mockData'

export default function LeadForm({ dark = false, compact = false, source = 'website' }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', service_type: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | loading | success | error
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
          name: form.name,
          phone: form.phone,
          email: form.email,
          service_type: form.service_type,
          message: form.message,
          source,
          status: 'new',
        }])
        if (dbError) throw dbError
        console.log('[Corwin] Lead submitted to Supabase:', form)
        // Edge Function trigger (placeholder)
        console.log(`[Corwin] Email confirmation would be sent to: ${form.email}`)
        console.log('[Corwin] Admin notification: New lead received -', form.name, form.phone)
      } else {
        // Demo mode: simulate API delay
        await new Promise(r => setTimeout(r, 1200))
        console.log('[Corwin Demo] Lead would be submitted:', form)
        console.log('[Corwin Demo] Confirmation email would be sent to:', form.email)
        console.log('[Corwin Demo] Admin notified of new lead:', form.name, form.service_type)
      }
      setStatus('success')
      setForm({ name: '', phone: '', email: '', service_type: '', message: '' })
    } catch (err) {
      console.error('Lead submission error:', err)
      setError('Something went wrong. Please call us directly at 702-460-2406.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`neo-card p-8 text-center ${dark ? 'bg-brand-yellow' : 'bg-brand-yellow'}`}
      >
        <div className="text-4xl mb-3">✅</div>
        <h3 className="font-display text-3xl text-brand-black mb-2">WE GOT IT!</h3>
        <p className="font-bold text-brand-black mb-1">Thanks, we'll call you within 2 hours.</p>
        <p className="text-sm text-brand-black/70">Or call us now: <a href="tel:7024602406" className="font-bold underline">702-460-2406</a></p>
        <button onClick={() => setStatus('idle')} className="mt-4 text-xs text-brand-black/60 underline hover:text-brand-black">Submit another request</button>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={`neo-card p-6 md:p-8 ${dark ? 'bg-brand-blue' : 'bg-white'}`}>
      <h3 className={`font-display text-3xl mb-1 ${dark ? 'text-brand-yellow' : 'text-brand-blue'}`}>
        GET A FREE ESTIMATE
      </h3>
      <p className={`text-sm mb-6 ${dark ? 'text-blue-200' : 'text-gray-500'}`}>
        We'll call you within 2 hours · No obligation · Free quote
      </p>

      <div className={`grid ${compact ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'} gap-4`}>
        <div>
          <label className={`block text-xs font-bold uppercase tracking-wider mb-1 ${dark ? 'text-blue-200' : 'text-brand-black'}`}>
            Full Name *
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="John Smith"
            className={`form-input ${dark ? 'bg-brand-blue-dark border-white/40 text-white placeholder-white/40 focus:border-brand-cyan' : ''}`}
            required
          />
        </div>

        <div>
          <label className={`block text-xs font-bold uppercase tracking-wider mb-1 ${dark ? 'text-blue-200' : 'text-brand-black'}`}>
            Phone Number *
          </label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="702-555-0100"
            className={`form-input ${dark ? 'bg-brand-blue-dark border-white/40 text-white placeholder-white/40 focus:border-brand-cyan' : ''}`}
            required
          />
        </div>

        <div>
          <label className={`block text-xs font-bold uppercase tracking-wider mb-1 ${dark ? 'text-blue-200' : 'text-brand-black'}`}>
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@email.com"
            className={`form-input ${dark ? 'bg-brand-blue-dark border-white/40 text-white placeholder-white/40 focus:border-brand-cyan' : ''}`}
          />
        </div>

        <div>
          <label className={`block text-xs font-bold uppercase tracking-wider mb-1 ${dark ? 'text-blue-200' : 'text-brand-black'}`}>
            Service Type *
          </label>
          <select
            name="service_type"
            value={form.service_type}
            onChange={handleChange}
            className={`form-select ${dark ? 'bg-brand-blue-dark border-white/40 text-white focus:border-brand-cyan' : ''}`}
            required
          >
            <option value="">Select a service…</option>
            {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {!compact && (
          <div className="sm:col-span-2">
            <label className={`block text-xs font-bold uppercase tracking-wider mb-1 ${dark ? 'text-blue-200' : 'text-brand-black'}`}>
              Message (Optional)
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Tell us about your pool, any specific issues, or questions…"
              rows={3}
              className={`form-input resize-none ${dark ? 'bg-brand-blue-dark border-white/40 text-white placeholder-white/40 focus:border-brand-cyan' : ''}`}
            />
          </div>
        )}
      </div>

      {error && (
        <div className="mt-3 p-3 bg-red-50 border-3 border-red-500 text-red-700 text-sm font-semibold">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn-primary-lg w-full justify-center mt-6 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
            Sending…
          </span>
        ) : (
          'Get My Free Estimate →'
        )}
      </button>

      <div className="mt-4 flex flex-wrap gap-3 justify-center">
        <span className="text-xs text-gray-500 flex items-center gap-1">🔒 Licensed & Insured</span>
        <span className="text-xs text-gray-500 flex items-center gap-1">⭐ Best of Las Vegas 2023</span>
        <span className="text-xs text-gray-500 flex items-center gap-1">📞 2-Hour Response</span>
      </div>
    </form>
  )
}
