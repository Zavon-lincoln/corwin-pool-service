import { Link } from 'react-router-dom'

const TEAM = [
  { name: 'Marcus Corwin', role: 'Founder & Master Tech', years: '25 yrs', initials: 'MC' },
  { name: 'Jordan Lee', role: 'Senior Pool Technician', years: '12 yrs', initials: 'JL' },
  { name: 'Priya Nair', role: 'Operations Manager', years: '8 yrs', initials: 'PN' },
  { name: 'Darnell Webb', role: 'Equipment Specialist', years: '10 yrs', initials: 'DW' },
]

const TIMELINE = [
  { year: '2000', event: 'Founded in Las Vegas with 3 residential clients and one truck.' },
  { year: '2005', event: 'Expanded to commercial properties and HOA communities.' },
  { year: '2010', event: 'Hired first dedicated equipment repair technician.' },
  { year: '2018', event: 'Named Best of Las Vegas for the first time.' },
  { year: '2023', event: 'Over 500 active customers and a fully certified team of specialists.' },
]

const CERTS = [
  { label: 'NV Contractor', value: '#C-53-12345', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
  { label: 'CPO Certified', value: 'All Technicians', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg> },
  { label: 'Fully Insured', value: '$1M Liability', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><polyline points="9 15 11 17 15 13"/></svg> },
  { label: 'Best of LV', value: 'Gold Winner 2023', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> },
]

export default function About() {
  return (
    <div style={{ background: 'var(--bg)' }}>

      {/* Hero */}
      <section style={{ background: 'var(--alt)', padding: '4rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="label" style={{ display: 'inline-block', marginBottom: '0.75rem' }}>Our Story</span>
          <h1 style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 700, color: 'var(--ink)', marginBottom: '0.875rem' }}>About Corwin Pool Service</h1>
          <p className="subtext" style={{ fontSize: '1.0625rem', maxWidth: '36rem', margin: '0 auto' }}>25 years of keeping Las Vegas pools crystal clear, one backyard at a time.</p>
        </div>
      </section>

      {/* Credentials */}
      <section style={{ padding: '4rem 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1.25rem' }}>
            {CERTS.map(({ label, value, icon }) => (
              <div key={label} className="card" style={{ padding: '1.5rem', textAlign: 'center' }}>
                <div className="icon-wrap-orange" style={{ margin: '0 auto 0.875rem' }}>{icon}</div>
                <p style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--ink)', marginBottom: '0.25rem' }}>{label}</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section style={{ background: 'var(--alt)', padding: '5rem 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <div>
              <span className="label" style={{ display: 'inline-block', marginBottom: '0.75rem' }}>Who We Are</span>
              <h2 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '1rem' }}>Built on Reputation, Not Advertising</h2>
              <p className="subtext" style={{ lineHeight: 1.75, marginBottom: '1rem' }}>Corwin Pool Service started with a single truck and a handshake promise: show up every week, do the job right, and never cut corners. That is the same promise we make to every customer today.</p>
              <p className="subtext" style={{ lineHeight: 1.75, marginBottom: '1.5rem' }}>Over 80% of our new customers come from referrals from existing clients. In 25 years, we have never run a single advertisement. Our work speaks for itself.</p>
              <Link to="/book" className="btn btn-primary">Get a Free Estimate</Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              {TIMELINE.map(({ year, event }) => (
                <div key={year} className="card-sm" style={{ padding: '1rem 1.25rem', display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                  <div className="inset-sm" style={{ padding: '0.3rem 0.7rem', borderRadius: '0.5rem', flexShrink: 0 }}>
                    <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--blue)' }}>{year}</span>
                  </div>
                  <p style={{ fontSize: '0.875rem', color: 'var(--body)', lineHeight: 1.55 }}>{event}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{ padding: '5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="label" style={{ display: 'inline-block', marginBottom: '0.75rem' }}>The Team</span>
            <h2 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--ink)' }}>People Behind Your Pool</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1.25rem' }}>
            {TEAM.map(({ name, role, years, initials }) => (
              <div key={name} className="card" style={{ padding: '1.75rem', textAlign: 'center' }}>
                <div className="icon-wrap-lg" style={{ margin: '0 auto 1rem', background: 'var(--blue)' }}>
                  <span style={{ color: '#fff', fontWeight: 700, fontSize: '0.9375rem' }}>{initials}</span>
                </div>
                <p style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--ink)', marginBottom: '0.25rem' }}>{name}</p>
                <p style={{ fontSize: '0.825rem', color: 'var(--body)', marginBottom: '0.5rem' }}>{role}</p>
                <span className="chip chip-orange" style={{ fontSize: '0.7rem' }}>{years} exp.</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--blue)', padding: '4.5rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, color: '#fff', marginBottom: '0.75rem' }}>Ready to Work With Us?</h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', marginBottom: '2rem' }}>Book your first service online or give us a call. No pressure, no commitment.</p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/book" className="btn" style={{ background: 'var(--orange)', color: '#fff', boxShadow: 'none' }}>Book a Service</Link>
            <a href="tel:7024602406" className="btn" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', boxShadow: 'none' }}>702-460-2406</a>
          </div>
        </div>
      </section>

    </div>
  )
}
