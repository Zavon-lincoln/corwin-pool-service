import { Link } from 'react-router-dom'
import LeadForm from '../components/LeadForm'

const INFO = [
  {
    label: 'Phone',
    value: '702-460-2406',
    sub: 'Mon–Sat 7am–6pm',
    href: 'tel:7024602406',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.59 3h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
  },
  {
    label: 'Email',
    value: 'info@corwinpools.com',
    sub: 'Response within 4 hours',
    href: 'mailto:info@corwinpools.com',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  },
  {
    label: 'Address',
    value: '10917 Salford Drive',
    sub: 'Las Vegas, NV 89144',
    href: 'https://maps.google.com/?q=10917+Salford+Drive+Las+Vegas+NV',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  },
]

const HOURS = [
  ['Monday – Friday', '7:00 AM – 6:00 PM'],
  ['Saturday', '8:00 AM – 4:00 PM'],
  ['Sunday', 'Emergency calls only'],
]

export default function Contact() {
  return (
    <div style={{ background: 'var(--bg)' }}>

      {/* Hero */}
      <section style={{ background: 'var(--alt)', padding: '4rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="label" style={{ display: 'inline-block', marginBottom: '0.75rem' }}>Get in Touch</span>
          <h1 style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 700, color: 'var(--ink)', marginBottom: '0.75rem' }}>Contact Us</h1>
          <p className="subtext" style={{ fontSize: '1.0625rem', maxWidth: '28rem', margin: '0 auto' }}>Free estimates, no obligation. We respond within 2 hours during business hours.</p>
        </div>
      </section>

      {/* Main content */}
      <section style={{ padding: '5rem 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '3rem', alignItems: 'start' }}>

            {/* Info col */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {INFO.map(({ label, value, sub, href, icon }) => (
                <div key={label} className="card" style={{ padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div className="icon-wrap">{icon}</div>
                  <div>
                    <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '0.2rem' }}>{label}</p>
                    <a href={href} style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--ink)', display: 'block' }}>{value}</a>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--muted)' }}>{sub}</p>
                  </div>
                </div>
              ))}

              <div className="card" style={{ padding: '1.5rem' }}>
                <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '1rem' }}>Business Hours</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {HOURS.map(([day, time]) => (
                    <div key={day} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.875rem', color: 'var(--body)' }}>{day}</span>
                      <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--blue)' }}>{time}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="inset" style={{ padding: '1.25rem 1.5rem', borderRadius: '1rem' }}>
                <p style={{ fontSize: '0.875rem', color: 'var(--body)', lineHeight: 1.6 }}>
                  <strong style={{ color: 'var(--ink)' }}>Emergency service available.</strong> Green pool or equipment failure? Call us and we will do our best to get a technician out same day.
                </p>
              </div>
            </div>

            {/* Form col */}
            <LeadForm source="contact" />
          </div>
        </div>
      </section>

    </div>
  )
}
