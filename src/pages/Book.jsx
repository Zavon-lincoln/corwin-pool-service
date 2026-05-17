import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { mockAvailability, SERVICES } from '../lib/mockData'

const STEPS = ['Service', 'Date & Time', 'Contact Info', 'Confirm']
const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
}

export default function Book() {
  const [step, setStep] = useState(0)
  const [dir, setDir] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [appointmentId, setAppointmentId] = useState(null)
  const [booking, setBooking] = useState({ service:'', date:'', time:'', slotId:'', name:'', phone:'', email:'', address:'', notes:'' })
  const update = (key, val) => setBooking(b => ({ ...b, [key]: val }))
  const next = () => { setDir(1); setStep(s => Math.min(s + 1, 3)) }
  const back = () => { setDir(-1); setStep(s => Math.max(s - 1, 0)) }
  const availability = mockAvailability
  const dates = [...new Set(availability.map(s => s.slot_date))].sort()
  const slotsForDate = (date) => availability.filter(s => s.slot_date === date && !s.is_booked)
  const formatDate = (d) => new Date(d + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
  const formatTime = (t) => { const [h] = t.split(':'); const hr = parseInt(h); return hr < 12 ? `${hr}:00 AM` : hr === 12 ? '12:00 PM' : `${hr - 12}:00 PM` }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      if (isSupabaseConfigured()) {
        const { data: leadData } = await supabase.from('leads').insert([{ name: booking.name, phone: booking.phone, email: booking.email, service_type: booking.service, source: 'booking', status: 'new' }]).select().single()
        const scheduledAt = new Date(booking.date + 'T' + booking.time).toISOString()
        const { data: apptData } = await supabase.from('appointments').insert([{ lead_id: leadData?.id, service_type: booking.service, scheduled_at: scheduledAt, status: 'scheduled', notes: booking.notes }]).select().single()
        if (booking.slotId) await supabase.from('availability').update({ is_booked: true }).eq('id', booking.slotId)
        setAppointmentId(apptData?.id?.substring(0, 8).toUpperCase())
      } else {
        await new Promise(r => setTimeout(r, 1500))
        setAppointmentId('CPS-' + Math.random().toString(36).substring(2, 7).toUpperCase())
      }
      setSubmitted(true)
    } catch (err) { console.error('Booking error:', err) }
    finally { setLoading(false) }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-nm-bg flex items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="nm-card max-w-lg w-full p-10 text-center">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="font-display text-5xl text-[#00C4F0] mb-3 tracking-wider">BOOKED!</h2>
          <div className="inline-block px-5 py-2 rounded-xl mb-4 font-bold text-nm-dark text-sm" style={{ background: '#FFE156', boxShadow: '4px 4px 10px #0f2440' }}>
            Confirmation #{appointmentId}
          </div>
          <p className="text-white font-semibold mb-2">{booking.service}</p>
          <p className="text-white/70 mb-1">📅 {formatDate(booking.date)}</p>
          <p className="text-white/70 mb-6">⏰ {formatTime(booking.time)}</p>
          <div className="nm-card-inset p-4 text-sm text-white/70 mb-6 text-left">
            <p className="font-bold text-white mb-2">What happens next:</p>
            <ul className="space-y-1">
              <li>✉️ Confirmation email sent to {booking.email || 'you'}</li>
              <li>📞 We'll call you within 2 hours to confirm</li>
              <li>🔔 Reminder sent 24 hrs before your appointment</li>
            </ul>
          </div>
          <a href="tel:7024602406" className="nm-btn-cyan w-full justify-center">📞 Call Us: 702-460-2406</a>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="bg-nm-bg min-h-screen">
      <section className="py-16" style={{ background: '#0f2440', borderBottom: '1px solid rgba(0,196,240,0.15)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="section-label mb-3">Online Booking</p>
          <h1 className="font-display text-6xl text-white mb-2 tracking-wider">BOOK A SERVICE</h1>
          <p className="text-white/50 text-sm">4 simple steps. Takes less than 2 minutes.</p>
        </div>
      </section>
      <div className="border-b border-white/10" style={{ background: '#162f5a' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex items-center justify-between">
            {STEPS.map((label, i) => (
              <div key={label} className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center text-sm font-black transition-all"
                  style={i < step ? { background: '#00C4F0', color: '#0f2440', boxShadow: '3px 3px 8px #0f2440' } : i === step ? { background: '#FFE156', color: '#0f2440', boxShadow: '3px 3px 8px #0f2440' } : { background: '#1a3a6e', color: 'rgba(255,255,255,0.3)', boxShadow: 'inset 2px 2px 5px #0f2440, inset -2px -2px 5px #254f9e' }}>
                  {i < step ? '✓' : i + 1}
                </div>
                <span className={`hidden sm:block text-xs font-bold uppercase tracking-wider ${i === step ? 'text-white' : 'text-white/30'}`}>{label}</span>
                {i < STEPS.length - 1 && <div className={`hidden sm:block h-0.5 w-8 mx-2 ${i < step ? 'bg-[#00C4F0]/60' : 'bg-white/10'}`}/>}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="section-pad">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <AnimatePresence custom={dir} mode="wait">
            <motion.div key={step} custom={dir} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
              {step === 0 && (
                <div>
                  <h2 className="font-display text-4xl text-white mb-2 tracking-wider">WHAT SERVICE DO YOU NEED?</h2>
                  <p className="text-white/50 mb-6 text-sm">Select the service that best matches your needs.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {SERVICES.slice(0, -1).map(s => (
                      <button key={s} onClick={() => update('service', s)}
                        className="nm-card p-4 text-left flex items-center gap-3 transition-all duration-200"
                        style={booking.service === s ? { background: '#1a3a6e', boxShadow: 'inset 3px 3px 8px #0f2440, inset -3px -3px 8px #254f9e', borderColor: 'rgba(0,196,240,0.5)' } : {}}>
                        <div className="w-4 h-4 rounded-sm flex-shrink-0 flex items-center justify-center"
                          style={booking.service === s ? { background: '#00C4F0' } : { background: '#1a3a6e', boxShadow: 'inset 2px 2px 5px #0f2440, inset -2px -2px 5px #254f9e' }}>
                          {booking.service === s && <span className="text-nm-dark text-[10px] font-black">✓</span>}
                        </div>
                        <span className={`font-bold text-sm ${booking.service === s ? 'text-[#00C4F0]' : 'text-white/80'}`}>{s}</span>
                      </button>
                    ))}
                  </div>
                  <div className="mt-8 flex justify-end">
                    <button onClick={next} disabled={!booking.service} className="nm-btn-yellow nm-btn-lg disabled:opacity-40 disabled:cursor-not-allowed">Next: Choose Date →</button>
                  </div>
                </div>
              )}
              {step === 1 && (
                <div>
                  <h2 className="font-display text-4xl text-white mb-2 tracking-wider">PICK A DATE & TIME</h2>
                  <p className="text-white/50 mb-6 text-sm">Available slots for the next 2 weeks.</p>
                  <div className="space-y-4">
                    {dates.map(date => {
                      const slots = slotsForDate(date)
                      if (slots.length === 0) return null
                      return (
                        <div key={date} className="nm-card p-4" style={booking.date === date ? { boxShadow: 'inset 3px 3px 8px #0f2440, inset -3px -3px 8px #254f9e' } : {}}>
                          <div className="font-bold text-white mb-3 text-sm">{formatDate(date)}</div>
                          <div className="flex flex-wrap gap-2">
                            {slots.map(slot => (
                              <button key={slot.id} onClick={() => { update('date', date); update('time', slot.slot_time); update('slotId', slot.id) }}
                                className="px-4 py-2 text-sm font-bold rounded-xl transition-all"
                                style={booking.date === date && booking.time === slot.slot_time ? { background: '#00C4F0', color: '#0f2440', boxShadow: '3px 3px 8px #0f2440' } : { background: '#1e4080', color: 'rgba(0,196,240,0.8)', border: '1px solid rgba(0,196,240,0.2)', boxShadow: '3px 3px 8px #0f2440, -3px -3px 8px #254f9e' }}>
                                {formatTime(slot.slot_time)}
                              </button>
                            ))}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  <div className="mt-8 flex justify-between">
                    <button onClick={back} className="nm-btn-primary">← Back</button>
                    <button onClick={next} disabled={!booking.date || !booking.time} className="nm-btn-yellow nm-btn-lg disabled:opacity-40 disabled:cursor-not-allowed">Next: Contact Info →</button>
                  </div>
                </div>
              )}
              {step === 2 && (
                <div>
                  <h2 className="font-display text-4xl text-white mb-2 tracking-wider">YOUR CONTACT INFO</h2>
                  <p className="text-white/50 mb-6 text-sm">We'll confirm your appointment and send a reminder.</p>
                  <div className="nm-card p-6 space-y-4">
                    {[['Full Name *','name','text','John Smith'],['Phone Number *','phone','tel','702-555-0100'],['Email Address','email','email','you@email.com'],['Property Address','address','text','1234 Desert Rose Dr, Las Vegas NV']].map(([label,key,type,placeholder]) => (
                      <div key={key}>
                        <label className="block text-xs font-bold uppercase tracking-wider text-white/50 mb-1">{label}</label>
                        <input type={type} value={booking[key]} onChange={e => update(key, e.target.value)} placeholder={placeholder} className="nm-input"/>
                      </div>
                    ))}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-white/50 mb-1">Additional Notes (Optional)</label>
                      <textarea value={booking.notes} onChange={e => update('notes', e.target.value)} placeholder="Gate code, specific issues, pool type..." rows={3} className="nm-input resize-none"/>
                    </div>
                  </div>
                  <div className="mt-8 flex justify-between">
                    <button onClick={back} className="nm-btn-primary">← Back</button>
                    <button onClick={next} disabled={!booking.name || !booking.phone} className="nm-btn-yellow nm-btn-lg disabled:opacity-40 disabled:cursor-not-allowed">Review Booking →</button>
                  </div>
                </div>
              )}
              {step === 3 && (
                <div>
                  <h2 className="font-display text-4xl text-white mb-2 tracking-wider">CONFIRM YOUR BOOKING</h2>
                  <p className="text-white/50 mb-6 text-sm">Review your details and confirm.</p>
                  <div className="nm-card p-6 mb-6 border border-[#FFE156]/20">
                    <div className="space-y-3">
                      {[['Service',booking.service],['Date',formatDate(booking.date)],['Time',formatTime(booking.time)],['Name',booking.name],['Phone',booking.phone],['Email',booking.email||'Not provided'],['Address',booking.address||'Not provided']].map(([label,value]) => (
                        <div key={label} className="flex justify-between items-start py-2 border-b border-white/10 last:border-0">
                          <span className="text-sm font-bold text-white/50">{label}</span>
                          <span className="text-sm font-black text-white text-right max-w-xs">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="nm-card-inset p-4 mb-6 flex items-start gap-3">
                    <span className="text-xl">🔒</span>
                    <p className="text-sm text-white/70"><strong className="text-white">Licensed & Insured.</strong> NV Contractor License #C-53-12345. You'll receive a confirmation email and a call within 2 hours.</p>
                  </div>
                  <div className="flex justify-between">
                    <button onClick={back} className="nm-btn-primary">← Edit</button>
                    <button onClick={handleSubmit} disabled={loading} className="nm-btn-yellow nm-btn-lg disabled:opacity-60 disabled:cursor-not-allowed">
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                          </svg>
                          Booking...
                        </span>
                      ) : '✅ Confirm Booking'}
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
