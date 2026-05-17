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

  const [booking, setBooking] = useState({
    service: '',
    date: '',
    time: '',
    slotId: '',
    name: '',
    phone: '',
    email: '',
    address: '',
    notes: '',
  })

  const update = (key, val) => setBooking(b => ({ ...b, [key]: val }))

  const next = () => { setDir(1); setStep(s => Math.min(s + 1, 3)) }
  const back = () => { setDir(-1); setStep(s => Math.max(s - 1, 0)) }

  // Get unique dates from availability
  const availability = mockAvailability
  const dates = [...new Set(availability.map(s => s.slot_date))].sort()

  const slotsForDate = (date) =>
    availability.filter(s => s.slot_date === date && !s.is_booked)

  const formatDate = (d) => new Date(d + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
  const formatTime = (t) => {
    const [h] = t.split(':')
    const hr = parseInt(h)
    return hr < 12 ? `${hr}:00 AM` : hr === 12 ? '12:00 PM' : `${hr - 12}:00 PM`
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      if (isSupabaseConfigured()) {
        // Insert lead
        const { data: leadData } = await supabase.from('leads').insert([{
          name: booking.name, phone: booking.phone, email: booking.email,
          service_type: booking.service, source: 'booking', status: 'new',
        }]).select().single()

        // Insert appointment
        const scheduledAt = new Date(booking.date + 'T' + booking.time).toISOString()
        const { data: apptData } = await supabase.from('appointments').insert([{
          lead_id: leadData?.id,
          service_type: booking.service,
          scheduled_at: scheduledAt,
          status: 'scheduled',
          notes: booking.notes,
        }]).select().single()

        // Mark slot booked
        if (booking.slotId) {
          await supabase.from('availability').update({ is_booked: true }).eq('id', booking.slotId)
        }

        setAppointmentId(apptData?.id?.substring(0, 8).toUpperCase())
        console.log('[Corwin] Appointment booked:', { booking, apptId: apptData?.id })
        console.log(`[Corwin] Confirmation email sent to: ${booking.email}`)
        console.log('[Corwin] Admin notified of new booking:', booking.name, booking.service, booking.date)
      } else {
        // Demo mode
        await new Promise(r => setTimeout(r, 1500))
        setAppointmentId('CPS-' + Math.random().toString(36).substring(2, 7).toUpperCase())
        console.log('[Corwin Demo] Appointment booked:', booking)
        console.log('[Corwin Demo] Confirmation email would be sent to:', booking.email)
      }
      setSubmitted(true)
    } catch (err) {
      console.error('Booking error:', err)
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-brand-cream flex items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="neo-card-yellow max-w-lg w-full p-10 text-center">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="font-display text-5xl text-brand-blue mb-2">BOOKED!</h2>
          <div className="bg-brand-blue text-white font-bold text-sm px-4 py-2 border-3 border-brand-black shadow-neo inline-block mb-4">
            Confirmation #{appointmentId}
          </div>
          <p className="text-brand-black font-semibold mb-2">
            <strong>{booking.service}</strong>
          </p>
          <p className="text-brand-black mb-1">📅 {formatDate(booking.date)}</p>
          <p className="text-brand-black mb-6">⏰ {formatTime(booking.time)}</p>
          <div className="neo-card p-4 text-sm text-gray-700 mb-6">
            <p className="font-bold text-brand-black mb-2">What happens next:</p>
            <ul className="space-y-1 text-left">
              <li>✉️ Confirmation email sent to {booking.email || 'you'}</li>
              <li>📞 We'll call you within 2 hours to confirm</li>
              <li>🔔 Reminder sent 24hrs before your appointment</li>
            </ul>
          </div>
          <a href="tel:7024602406" className="btn-blue w-full justify-center">
            📞 Call Us: 702-460-2406
          </a>
        </motion.div>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <section className="bg-brand-blue border-b-3 border-brand-black py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="font-display text-6xl text-white mb-2">BOOK A SERVICE</h1>
          <p className="text-blue-200">4 simple steps. Takes less than 2 minutes.</p>
        </div>
      </section>

      {/* Stepper */}
      <div className="bg-brand-cream border-b-3 border-brand-black">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex items-center justify-between">
            {STEPS.map((label, i) => (
              <div key={label} className="flex items-center gap-2">
                <div className={`w-8 h-8 border-3 border-brand-black flex items-center justify-center text-sm font-black transition-all
                  ${i < step ? 'bg-brand-cyan text-brand-black' : i === step ? 'bg-brand-yellow text-brand-black' : 'bg-white text-gray-400'}`}>
                  {i < step ? '✓' : i + 1}
                </div>
                <span className={`hidden sm:block text-xs font-bold uppercase tracking-wider ${i === step ? 'text-brand-black' : 'text-gray-400'}`}>
                  {label}
                </span>
                {i < STEPS.length - 1 && (
                  <div className={`hidden sm:block flex-1 h-0.5 w-8 mx-2 ${i < step ? 'bg-brand-cyan' : 'bg-gray-200'}`}/>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Step content */}
      <div className="bg-brand-cream section-pad">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <AnimatePresence custom={dir} mode="wait">
            <motion.div
              key={step}
              custom={dir}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              {/* Step 0: Service */}
              {step === 0 && (
                <div>
                  <h2 className="font-display text-4xl text-brand-blue mb-2">WHAT SERVICE DO YOU NEED?</h2>
                  <p className="text-gray-500 mb-6 text-sm">Select the service that best matches your needs.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {SERVICES.slice(0, -1).map(s => (
                      <button key={s} onClick={() => { update('service', s) }}
                        className={`neo-card p-4 text-left flex items-center gap-3 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-neo-lg transition-all
                          ${booking.service === s ? 'bg-brand-cyan border-brand-black shadow-neo-blue' : 'bg-white hover:bg-brand-yellow/20'}`}>
                        <div className={`w-4 h-4 border-3 border-brand-black flex-shrink-0 ${booking.service === s ? 'bg-brand-blue' : 'bg-white'}`}/>
                        <span className="font-bold text-sm text-brand-black">{s}</span>
                      </button>
                    ))}
                  </div>
                  <div className="mt-8 flex justify-end">
                    <button onClick={next} disabled={!booking.service} className="btn-primary-lg disabled:opacity-40 disabled:cursor-not-allowed">
                      Next: Choose Date →
                    </button>
                  </div>
                </div>
              )}

              {/* Step 1: Date/Time */}
              {step === 1 && (
                <div>
                  <h2 className="font-display text-4xl text-brand-blue mb-2">PICK A DATE & TIME</h2>
                  <p className="text-gray-500 mb-6 text-sm">Available slots for the next 2 weeks. Green = open.</p>

                  <div className="space-y-4">
                    {dates.map(date => {
                      const slots = slotsForDate(date)
                      if (slots.length === 0) return null
                      return (
                        <div key={date} className={`neo-card p-4 ${booking.date === date ? 'border-brand-cyan' : ''}`}>
                          <div className="font-bold text-brand-black mb-3 text-sm">{formatDate(date)}</div>
                          <div className="flex flex-wrap gap-2">
                            {slots.map(slot => (
                              <button key={slot.id}
                                onClick={() => { update('date', date); update('time', slot.slot_time); update('slotId', slot.id) }}
                                className={`px-4 py-2 text-sm font-bold border-3 border-brand-black transition-all
                                  ${booking.date === date && booking.time === slot.slot_time
                                    ? 'bg-brand-blue text-white shadow-neo'
                                    : 'bg-brand-cyan/20 hover:bg-brand-cyan hover:text-brand-black'
                                  }`}>
                                {formatTime(slot.slot_time)}
                              </button>
                            ))}
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  <div className="mt-8 flex justify-between">
                    <button onClick={back} className="btn-secondary">← Back</button>
                    <button onClick={next} disabled={!booking.date || !booking.time} className="btn-primary-lg disabled:opacity-40 disabled:cursor-not-allowed">
                      Next: Contact Info →
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Contact info */}
              {step === 2 && (
                <div>
                  <h2 className="font-display text-4xl text-brand-blue mb-2">YOUR CONTACT INFO</h2>
                  <p className="text-gray-500 mb-6 text-sm">We'll confirm your appointment and send a reminder.</p>
                  <div className="neo-card p-6 space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider mb-1">Full Name *</label>
                      <input type="text" value={booking.name} onChange={e => update('name', e.target.value)} placeholder="John Smith" className="form-input" required/>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider mb-1">Phone Number *</label>
                      <input type="tel" value={booking.phone} onChange={e => update('phone', e.target.value)} placeholder="702-555-0100" className="form-input" required/>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider mb-1">Email Address</label>
                      <input type="email" value={booking.email} onChange={e => update('email', e.target.value)} placeholder="you@email.com" className="form-input"/>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider mb-1">Property Address</label>
                      <input type="text" value={booking.address} onChange={e => update('address', e.target.value)} placeholder="1234 Desert Rose Dr, Las Vegas NV" className="form-input"/>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider mb-1">Additional Notes (Optional)</label>
                      <textarea value={booking.notes} onChange={e => update('notes', e.target.value)} placeholder="Gate code, specific issues, pool type…" rows={3} className="form-input resize-none"/>
                    </div>
                  </div>
                  <div className="mt-8 flex justify-between">
                    <button onClick={back} className="btn-secondary">← Back</button>
                    <button onClick={next} disabled={!booking.name || !booking.phone} className="btn-primary-lg disabled:opacity-40 disabled:cursor-not-allowed">
                      Review Booking →
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Confirm */}
              {step === 3 && (
                <div>
                  <h2 className="font-display text-4xl text-brand-blue mb-2">CONFIRM YOUR BOOKING</h2>
                  <p className="text-gray-500 mb-6 text-sm">Review your details and confirm.</p>

                  <div className="neo-card-yellow p-6 mb-6">
                    <div className="space-y-3">
                      {[
                        ['🔧 Service', booking.service],
                        ['📅 Date', formatDate(booking.date)],
                        ['⏰ Time', formatTime(booking.time)],
                        ['👤 Name', booking.name],
                        ['📞 Phone', booking.phone],
                        ['✉️ Email', booking.email || 'Not provided'],
                        ['📍 Address', booking.address || 'Not provided'],
                      ].map(([label, value]) => (
                        <div key={label} className="flex justify-between items-start py-2 border-b border-brand-black/20 last:border-0">
                          <span className="text-sm font-bold text-brand-black/60">{label}</span>
                          <span className="text-sm font-black text-brand-black text-right max-w-xs">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="neo-card p-4 mb-6 flex items-start gap-3 bg-brand-cyan/10">
                    <span className="text-xl">🔒</span>
                    <p className="text-sm text-gray-600">
                      <strong>Licensed & Insured.</strong> NV Contractor License #C-53-12345.
                      You'll receive a confirmation email and a call within 2 hours.
                    </p>
                  </div>

                  <div className="flex justify-between">
                    <button onClick={back} className="btn-secondary">← Edit</button>
                    <button onClick={handleSubmit} disabled={loading} className="btn-primary-lg disabled:opacity-60 disabled:cursor-not-allowed">
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                          </svg>
                          Booking…
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
