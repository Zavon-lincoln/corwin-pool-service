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
      <div className="min-h-screen bg-[var(--nm-bg)] flex items-center justify-center px-4 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="nm-card max-w-lg w-full p-10 text-center"
        >
          <div className="nm-icon-lg mx-auto mb-6">
            <svg className="w-8 h-8 text-[var(--nm-blue)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="font-display text-3xl text-[var(--nm-navy)] mb-2 font-bold">Booking Confirmed!</h2>
          <div className="nm-inset inline-block px-5 py-2 rounded-xl mb-5">
            <span className="nm-label">Confirmation #{appointmentId}</span>
          </div>
          <p className="nm-heading text-lg mb-1">{booking.service}</p>
          <p className="nm-body mb-1">📅 {formatDate(booking.date)}</p>
          <p className="nm-body mb-6">⏰ {formatTime(booking.time)}</p>
          <div className="nm-inset p-5 text-sm text-left mb-6 rounded-xl">
            <p className="font-semibold text-[var(--nm-navy)] mb-3">What happens next:</p>
            <ul className="space-y-2 nm-body">
              <li className="flex items-start gap-2">
                <span className="text-[var(--nm-teal)] mt-0.5">✉</span>
                <span>Confirmation email sent to {booking.email || 'you'}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--nm-teal)] mt-0.5">📞</span>
                <span>We will call within 2 hours to confirm your appointment</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--nm-teal)] mt-0.5">🔔</span>
                <span>Reminder sent 24 hrs before your appointment</span>
              </li>
            </ul>
          </div>
          <a href="tel:7024602406" className="nm-btn-primary w-full justify-center inline-flex">
            📞 Call Us: 702-460-2406
          </a>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="bg-[var(--nm-bg)] min-h-screen">
      {/* Hero */}
      <section className="py-16 bg-[var(--nm-alt)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <span className="nm-label inline-block mb-3">Online Booking</span>
          <h1 className="nm-heading text-4xl sm:text-5xl mb-3">Book a Service</h1>
          <p className="nm-muted">4 simple steps. Takes less than 2 minutes.</p>
        </div>
      </section>

      {/* Step Progress */}
      <div className="bg-[var(--nm-alt)] border-b border-[var(--nm-dark)]/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex items-center justify-between">
            {STEPS.map((label, i) => (
              <div key={label} className="flex items-center gap-2">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-300"
                  style={
                    i < step
                      ? { background: 'var(--nm-teal)', color: '#fff', boxShadow: '3px 3px 8px var(--nm-dark), -1px -1px 4px #fff' }
                      : i === step
                      ? { background: 'var(--nm-blue)', color: '#fff', boxShadow: '4px 4px 10px var(--nm-dark), -2px -2px 6px #fff' }
                      : { background: 'var(--nm-bg)', boxShadow: 'inset 3px 3px 7px var(--nm-dark), inset -3px -3px 7px #fff', color: 'var(--nm-faint)' }
                  }
                >
                  {i < step ? '✓' : i + 1}
                </div>
                <span className={`hidden sm:block text-xs font-semibold uppercase tracking-wider transition-colors ${i === step ? 'text-[var(--nm-navy)]' : i < step ? 'text-[var(--nm-teal)]' : 'text-[var(--nm-faint)]'}`}>
                  {label}
                </span>
                {i < STEPS.length - 1 && (
                  <div
                    className="hidden sm:block h-0.5 w-8 mx-2 rounded-full transition-all"
                    style={{ background: i < step ? 'var(--nm-teal)' : 'var(--nm-dark)', opacity: i < step ? 0.6 : 0.25 }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Step Content */}
      <div className="py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <AnimatePresence custom={dir} mode="wait">
            <motion.div key={step} custom={dir} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>

              {/* STEP 0: Service */}
              {step === 0 && (
                <div>
                  <h2 className="nm-heading text-2xl sm:text-3xl mb-1">What service do you need?</h2>
                  <p className="nm-muted mb-7">Select the service that best matches your needs.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {SERVICES.slice(0, -1).map(s => {
                      const selected = booking.service === s
                      return (
                        <button
                          key={s}
                          onClick={() => update('service', s)}
                          className="p-4 text-left flex items-center gap-3 rounded-xl transition-all duration-200 w-full"
                          style={
                            selected
                              ? { boxShadow: 'inset 4px 4px 9px var(--nm-dark), inset -4px -4px 9px #fff', background: 'var(--nm-bg)' }
                              : { boxShadow: '5px 5px 12px var(--nm-dark), -5px -5px 12px #fff', background: 'var(--nm-bg)' }
                          }
                        >
                          <div
                            className="w-5 h-5 rounded-md flex-shrink-0 flex items-center justify-center transition-all"
                            style={
                              selected
                                ? { background: 'var(--nm-blue)', boxShadow: '2px 2px 5px var(--nm-dark)' }
                                : { boxShadow: 'inset 2px 2px 5px var(--nm-dark), inset -2px -2px 5px #fff', background: 'var(--nm-bg)' }
                            }
                          >
                            {selected && <span className="text-white text-[10px] font-black leading-none">✓</span>}
                          </div>
                          <span className={`font-medium text-sm transition-colors ${selected ? 'text-[var(--nm-blue)] font-semibold' : 'text-[var(--nm-body)]'}`}>{s}</span>
                        </button>
                      )
                    })}
                  </div>
                  <div className="mt-8 flex justify-end">
                    <button onClick={next} disabled={!booking.service} className="nm-btn-primary disabled:opacity-40 disabled:cursor-not-allowed">
                      Next: Choose Date →
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 1: Date & Time */}
              {step === 1 && (
                <div>
                  <h2 className="nm-heading text-2xl sm:text-3xl mb-1">Pick a date and time</h2>
                  <p className="nm-muted mb-7">Available slots for the next 2 weeks.</p>
                  <div className="space-y-4">
                    {dates.map(date => {
                      const slots = slotsForDate(date)
                      if (slots.length === 0) return null
                      const dateSelected = booking.date === date
                      return (
                        <div
                          key={date}
                          className="rounded-xl p-5 transition-all"
                          style={
                            dateSelected
                              ? { boxShadow: 'inset 4px 4px 9px var(--nm-dark), inset -4px -4px 9px #fff', background: 'var(--nm-bg)' }
                              : { boxShadow: '5px 5px 12px var(--nm-dark), -5px -5px 12px #fff', background: 'var(--nm-bg)' }
                          }
                        >
                          <div className="font-semibold text-[var(--nm-navy)] mb-3 text-sm">{formatDate(date)}</div>
                          <div className="flex flex-wrap gap-2">
                            {slots.map(slot => {
                              const slotActive = booking.date === date && booking.time === slot.slot_time
                              return (
                                <button
                                  key={slot.id}
                                  onClick={() => { update('date', date); update('time', slot.slot_time); update('slotId', slot.id) }}
                                  className="px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200"
                                  style={
                                    slotActive
                                      ? { background: 'var(--nm-blue)', color: '#fff', boxShadow: '3px 3px 7px var(--nm-dark)' }
                                      : { background: 'var(--nm-bg)', color: 'var(--nm-blue)', boxShadow: '3px 3px 7px var(--nm-dark), -3px -3px 7px #fff' }
                                  }
                                >
                                  {formatTime(slot.slot_time)}
                                </button>
                              )
                            })}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  <div className="mt-8 flex justify-between">
                    <button onClick={back} className="nm-btn-secondary">← Back</button>
                    <button onClick={next} disabled={!booking.date || !booking.time} className="nm-btn-primary disabled:opacity-40 disabled:cursor-not-allowed">
                      Next: Contact Info →
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Contact Info */}
              {step === 2 && (
                <div>
                  <h2 className="nm-heading text-2xl sm:text-3xl mb-1">Your contact info</h2>
                  <p className="nm-muted mb-7">We will confirm your appointment and send a reminder.</p>
                  <div className="nm-card p-6 sm:p-8 space-y-5">
                    {[
                      ['Full Name *', 'name', 'text', 'John Smith'],
                      ['Phone Number *', 'phone', 'tel', '702-555-0100'],
                      ['Email Address', 'email', 'email', 'you@email.com'],
                      ['Property Address', 'address', 'text', '1234 Desert Rose Dr, Las Vegas NV'],
                    ].map(([label, key, type, placeholder]) => (
                      <div key={key}>
                        <label className="nm-label block mb-2">{label}</label>
                        <input
                          type={type}
                          value={booking[key]}
                          onChange={e => update(key, e.target.value)}
                          placeholder={placeholder}
                          className="nm-input w-full"
                        />
                      </div>
                    ))}
                    <div>
                      <label className="nm-label block mb-2">Additional Notes (Optional)</label>
                      <textarea
                        value={booking.notes}
                        onChange={e => update('notes', e.target.value)}
                        placeholder="Gate code, specific issues, pool type..."
                        rows={3}
                        className="nm-input w-full resize-none"
                      />
                    </div>
                  </div>
                  <div className="mt-8 flex justify-between">
                    <button onClick={back} className="nm-btn-secondary">← Back</button>
                    <button onClick={next} disabled={!booking.name || !booking.phone} className="nm-btn-primary disabled:opacity-40 disabled:cursor-not-allowed">
                      Review Booking →
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Confirm */}
              {step === 3 && (
                <div>
                  <h2 className="nm-heading text-2xl sm:text-3xl mb-1">Confirm your booking</h2>
                  <p className="nm-muted mb-7">Review your details before confirming.</p>
                  <div className="nm-card p-6 sm:p-8 mb-5">
                    <div className="space-y-0">
                      {[
                        ['Service', booking.service],
                        ['Date', formatDate(booking.date)],
                        ['Time', formatTime(booking.time)],
                        ['Name', booking.name],
                        ['Phone', booking.phone],
                        ['Email', booking.email || 'Not provided'],
                        ['Address', booking.address || 'Not provided'],
                      ].map(([label, value], idx, arr) => (
                        <div
                          key={label}
                          className={`flex justify-between items-start py-3 ${idx < arr.length - 1 ? 'border-b border-[var(--nm-dark)]/15' : ''}`}
                        >
                          <span className="nm-label">{label}</span>
                          <span className="text-sm font-semibold text-[var(--nm-navy)] text-right max-w-xs">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="nm-inset p-4 mb-7 flex items-start gap-3 rounded-xl">
                    <div className="nm-icon flex-shrink-0">
                      <svg className="w-4 h-4 text-[var(--nm-blue)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <p className="nm-body text-sm">
                      <strong className="text-[var(--nm-navy)]">Licensed and Insured.</strong> NV Contractor License #C-53-12345. You will receive a confirmation email and a call within 2 hours.
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <button onClick={back} className="nm-btn-secondary">← Edit</button>
                    <button
                      onClick={handleSubmit}
                      disabled={loading}
                      className="nm-btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                          </svg>
                          Booking...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          Confirm Booking
                        </span>
                      )}
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
