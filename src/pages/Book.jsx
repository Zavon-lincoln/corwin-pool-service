import { useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { mockAvailability, SERVICES } from '../lib/mockData'

const STEPS = ['Service','Date & Time','Your Info','Confirm']

const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
)
const ChevronLeft = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
)
const Check = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
)

export default function Book() {
  const [step, setStep]         = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading]   = useState(false)
  const [apptId, setApptId]     = useState(null)
  const [booking, setBooking]   = useState({ service:'', date:'', time:'', slotId:'', name:'', phone:'', email:'', address:'', notes:'' })
  const upd = (k, v) => setBooking(b => ({ ...b, [k]: v }))
  const next = () => setStep(s => Math.min(s + 1, 3))
  const back = () => setStep(s => Math.max(s - 1, 0))

  const slots    = mockAvailability
  const dates    = [...new Set(slots.map(s => s.slot_date))].sort()
  const forDate  = d => slots.filter(s => s.slot_date === d && !s.is_booked)
  const fmtDate  = d => new Date(d + 'T00:00:00').toLocaleDateString('en-US', { weekday:'long', month:'long', day:'numeric' })
  const fmtTime  = t => { const h = parseInt(t.split(':')[0]); return h < 12 ? `${h}:00 AM` : h === 12 ? '12:00 PM' : `${h-12}:00 PM` }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      if (isSupabaseConfigured()) {
        const { data: lead } = await supabase.from('leads').insert([{ name: booking.name, phone: booking.phone, email: booking.email, service_type: booking.service, source: 'booking', status: 'new' }]).select().single()
        const at = new Date(booking.date + 'T' + booking.time).toISOString()
        const { data: appt } = await supabase.from('appointments').insert([{ lead_id: lead?.id, service_type: booking.service, scheduled_at: at, status: 'scheduled', notes: booking.notes }]).select().single()
        if (booking.slotId) await supabase.from('availability').update({ is_booked: true }).eq('id', booking.slotId)
        setApptId(appt?.id?.substring(0, 8).toUpperCase())
      } else {
        await new Promise(r => setTimeout(r, 1200))
        setApptId('CPS-' + Math.random().toString(36).substring(2, 7).toUpperCase())
      }
      setSubmitted(true)
    } catch (e) { console.error(e) }
    finally { setLoading(false) }
  }

  if (submitted) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 1.5rem' }}>
        <div className="card-lg" style={{ maxWidth: '28rem', width: '100%', padding: '3rem', textAlign: 'center' }}>
          <div className="icon-wrap-lg" style={{ margin: '0 auto 1.25rem', background: 'var(--bg)', color: '#2d8a4e' }}>
            <Check size={28} />
          </div>
          <h2 style={{ fontWeight: 700, fontSize: '1.5rem', color: 'var(--ink)', marginBottom: '0.5rem' }}>Booking Confirmed!</h2>
          <div className="inset-sm" style={{ display: 'inline-block', padding: '0.3rem 1rem', borderRadius: '0.5rem', marginBottom: '1.25rem' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--blue)' }}>Confirmation #{apptId}</span>
          </div>
          <p style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--ink)', marginBottom: '0.25rem' }}>{booking.service}</p>
          <p style={{ color: 'var(--body)', fontSize: '0.9rem' }}>{fmtDate(booking.date)} &middot; {fmtTime(booking.time)}</p>
          <div className="inset" style={{ padding: '1.25rem', borderRadius: '1rem', margin: '1.5rem 0', textAlign: 'left' }}>
            <p style={{ fontWeight: 600, color: 'var(--ink)', fontSize: '0.875rem', marginBottom: '0.75rem' }}>What happens next:</p>
            {['Confirmation email sent to you','We will call within 2 hours to confirm','Reminder sent 24 hrs before your appointment'].map(t => (
              <div key={t} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: '0.2rem', flexShrink: 0 }}><polyline points="20 6 9 17 4 12"/></svg>
                <span style={{ fontSize: '0.8375rem', color: 'var(--body)' }}>{t}</span>
              </div>
            ))}
          </div>
          <a href="tel:7024602406" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Call 702-460-2406</a>
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>

      {/* Header */}
      <section style={{ background: 'var(--alt)', padding: '3rem 0 0' }}>
        <div className="container" style={{ textAlign: 'center', paddingBottom: '1.5rem' }}>
          <span className="label" style={{ display: 'inline-block', marginBottom: '0.5rem' }}>Online Booking</span>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--ink)' }}>Book a Service</h1>
        </div>

        {/* Step bar */}
        <div style={{ borderTop: '1px solid rgba(192,204,216,0.4)' }}>
          <div className="container" style={{ padding: '1.25rem 1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {STEPS.map((label, i) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: i < STEPS.length - 1 ? '1' : 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
                    <div
                      style={{
                        width: '2rem', height: '2rem', borderRadius: '0.625rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8125rem', fontWeight: 700, transition: 'all 0.2s',
                        ...(i < step
                          ? { background: 'var(--teal)', color: '#fff', boxShadow: '3px 3px 7px #c0ccd8, -1px -1px 4px #fff' }
                          : i === step
                          ? { background: 'var(--blue)', color: '#fff', boxShadow: '4px 4px 9px #c0ccd8, -2px -2px 5px #fff' }
                          : { background: 'var(--bg)', color: 'var(--faint)', boxShadow: 'inset 3px 3px 6px #c0ccd8, inset -3px -3px 6px #fff' })
                      }}
                    >
                      {i < step ? <Check size={13} /> : i + 1}
                    </div>
                    <span style={{ fontSize: '0.8125rem', fontWeight: i === step ? 600 : 400, color: i === step ? 'var(--ink)' : i < step ? 'var(--teal)' : 'var(--faint)', display: 'none', ...(window.innerWidth > 640 ? { display: 'block' } : {}) }}>{label}</span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div style={{ flex: 1, height: '1px', background: i < step ? 'var(--teal)' : 'var(--dark)', opacity: 0.4, borderRadius: '1px', margin: '0 0.25rem' }} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Step content */}
      <div style={{ padding: '3rem 0 5rem' }}>
        <div className="container" style={{ maxWidth: '42rem' }}>

          {/* Step 0: Service */}
          {step === 0 && (
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '0.375rem' }}>What service do you need?</h2>
              <p style={{ color: 'var(--muted)', marginBottom: '1.75rem', fontSize: '0.9rem' }}>Select the service that best fits your situation.</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.875rem' }}>
                {SERVICES.slice(0, -1).map(s => {
                  const sel = booking.service === s
                  return (
                    <button key={s} onClick={() => upd('service', s)}
                      style={{ padding: '1rem 1.125rem', borderRadius: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', border: 'none', textAlign: 'left', transition: 'box-shadow 0.15s', background: 'var(--bg)',
                        boxShadow: sel ? 'inset 4px 4px 9px #c0ccd8, inset -4px -4px 9px #ffffff' : '5px 5px 12px #c0ccd8, -5px -5px 12px #ffffff' }}>
                      <div style={{ width: '1.25rem', height: '1.25rem', borderRadius: '0.375rem', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s',
                        background: sel ? 'var(--blue)' : 'var(--bg)', boxShadow: sel ? '2px 2px 5px #c0ccd8' : 'inset 2px 2px 5px #c0ccd8, inset -2px -2px 5px #fff' }}>
                        {sel && <Check size={10} />}
                      </div>
                      <span style={{ fontSize: '0.875rem', fontWeight: sel ? 600 : 500, color: sel ? 'var(--blue)' : 'var(--body)' }}>{s}</span>
                    </button>
                  )
                })}
              </div>
              <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
                <button onClick={next} disabled={!booking.service} className="btn btn-primary" style={{ opacity: booking.service ? 1 : 0.45 }}>
                  Next <ChevronRight />
                </button>
              </div>
            </div>
          )}

          {/* Step 1: Date & Time */}
          {step === 1 && (
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '0.375rem' }}>Pick a date and time</h2>
              <p style={{ color: 'var(--muted)', marginBottom: '1.75rem', fontSize: '0.9rem' }}>Available slots for the next 2 weeks.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                {dates.map(date => {
                  const available = forDate(date)
                  if (!available.length) return null
                  const isDateSel = booking.date === date
                  return (
                    <div key={date} style={{ borderRadius: '1rem', padding: '1.25rem', background: 'var(--bg)', boxShadow: isDateSel ? 'inset 4px 4px 9px #c0ccd8, inset -4px -4px 9px #fff' : '5px 5px 12px #c0ccd8, -5px -5px 12px #fff', transition: 'box-shadow 0.15s' }}>
                      <p style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--ink)', marginBottom: '0.75rem' }}>{fmtDate(date)}</p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {available.map(slot => {
                          const active = booking.date === date && booking.time === slot.slot_time
                          return (
                            <button key={slot.id} onClick={() => { upd('date', date); upd('time', slot.slot_time); upd('slotId', slot.id) }}
                              style={{ padding: '0.4rem 0.875rem', borderRadius: '0.5rem', fontSize: '0.8375rem', fontWeight: 600, cursor: 'pointer', border: 'none', transition: 'all 0.15s', background: 'var(--bg)',
                                color: active ? '#fff' : 'var(--blue)',
                                boxShadow: active ? 'none' : '3px 3px 7px #c0ccd8, -3px -3px 7px #fff',
                                backgroundColor: active ? 'var(--blue)' : undefined }}>
                              {fmtTime(slot.slot_time)}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
              <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
                <button onClick={back} className="btn btn-ghost"><ChevronLeft /> Back</button>
                <button onClick={next} disabled={!booking.date || !booking.time} className="btn btn-primary" style={{ opacity: booking.date && booking.time ? 1 : 0.45 }}>Next <ChevronRight /></button>
              </div>
            </div>
          )}

          {/* Step 2: Contact */}
          {step === 2 && (
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '0.375rem' }}>Your contact info</h2>
              <p style={{ color: 'var(--muted)', marginBottom: '1.75rem', fontSize: '0.9rem' }}>We will confirm your appointment and send a reminder.</p>
              <div className="card" style={{ padding: '2rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  {[['Full Name *','name','text','John Smith'],['Phone *','phone','tel','702-555-0100']].map(([l,k,t,p]) => (
                    <div key={k}>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>{l}</label>
                      <input type={t} value={booking[k]} onChange={e => upd(k, e.target.value)} placeholder={p} className="field" />
                    </div>
                  ))}
                </div>
                {[['Email Address','email','email','you@email.com'],['Property Address','address','text','1234 Desert Rose Dr, Las Vegas NV']].map(([l,k,t,p]) => (
                  <div key={k} style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>{l}</label>
                    <input type={t} value={booking[k]} onChange={e => upd(k, e.target.value)} placeholder={p} className="field" />
                  </div>
                ))}
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>Notes (Optional)</label>
                  <textarea value={booking.notes} onChange={e => upd('notes', e.target.value)} placeholder="Gate code, pool type, specific issues..." rows={3} className="field" style={{ resize: 'none' }} />
                </div>
              </div>
              <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between' }}>
                <button onClick={back} className="btn btn-ghost"><ChevronLeft /> Back</button>
                <button onClick={next} disabled={!booking.name || !booking.phone} className="btn btn-primary" style={{ opacity: booking.name && booking.phone ? 1 : 0.45 }}>Review <ChevronRight /></button>
              </div>
            </div>
          )}

          {/* Step 3: Confirm */}
          {step === 3 && (
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '0.375rem' }}>Confirm your booking</h2>
              <p style={{ color: 'var(--muted)', marginBottom: '1.75rem', fontSize: '0.9rem' }}>Review everything before we lock it in.</p>
              <div className="card" style={{ padding: '1.75rem', marginBottom: '1rem' }}>
                {[['Service',booking.service],['Date',fmtDate(booking.date)],['Time',fmtTime(booking.time)],['Name',booking.name],['Phone',booking.phone],['Email',booking.email||'Not provided'],['Address',booking.address||'Not provided']].map(([l,v],i,arr) => (
                  <div key={l} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '0.7rem 0', borderBottom: i < arr.length-1 ? '1px solid rgba(192,204,216,0.4)' : 'none' }}>
                    <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--muted)' }}>{l}</span>
                    <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--ink)', textAlign: 'right', maxWidth: '60%' }}>{v}</span>
                  </div>
                ))}
              </div>
              <div className="inset" style={{ padding: '1rem 1.25rem', borderRadius: '0.875rem', marginBottom: '1.5rem', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <div className="icon-wrap" style={{ width: '2rem', height: '2rem', borderRadius: '0.5rem', flexShrink: 0 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                <p style={{ fontSize: '0.8375rem', color: 'var(--body)', lineHeight: 1.55 }}>
                  <strong style={{ color: 'var(--ink)' }}>Licensed and Insured.</strong> NV Contractor License #C-53-12345. You will receive a confirmation and a call within 2 hours.
                </p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button onClick={back} className="btn btn-ghost"><ChevronLeft /> Edit</button>
                <button onClick={handleSubmit} disabled={loading} className="btn btn-primary" style={{ opacity: loading ? 0.7 : 1 }}>
                  {loading ? (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <svg style={{ animation: 'spin 1s linear infinite' }} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" strokeOpacity="0.25"/><path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round"/></svg>
                      Booking...
                    </span>
                  ) : <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Check size={15} /> Confirm Booking</span>}
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
