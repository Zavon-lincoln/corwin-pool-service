import { Link } from 'react-router-dom'

const SERVICES = [
  {
    title: 'Weekly Maintenance',
    price: 'From $120/mo',
    desc: 'Full weekly service keeping your pool balanced, clean, and ready to swim at all times.',
    features: ['Chemical balancing & testing','Brushing walls and floor','Vacuuming debris','Skimmer & basket cleaning','Filter inspection','Monthly equipment check'],
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M3 17c3-3 6-3 9 0s6 3 9 0"/><path d="M3 11c3-3 6-3 9 0s6 3 9 0"/><path d="M3 5c3-3 6-3 9 0s6 3 9 0"/></svg>,
    featured: true,
  },
  {
    title: 'Green Pool Rescue',
    price: 'From $250',
    desc: 'Heavy algae treatment that brings your pool back to crystal clear, guaranteed.',
    features: ['Algae shock treatment','Multiple chemical applications','Brushing and vacuuming','Filter deep-clean','Re-test and balance','Free follow-up if not clear'],
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>,
  },
  {
    title: 'Equipment Repair',
    price: 'Quote on-site',
    desc: 'Same-day diagnosis of pumps, heaters, filters, and automation systems.',
    features: ['Pump repair & replacement','Heater diagnosis & repair','Filter system service','Automation programming','Valve repair','Salt cell cleaning'],
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
  },
  {
    title: 'Deep Clean',
    price: 'From $180',
    desc: 'One-time thorough cleaning. Perfect before parties, after move-in, or seasonal reopen.',
    features: ['Full brush and vacuum','Filter backwash','Tile line scrubbing','Deck rinse-down','Chemical reset','Written condition report'],
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3h18v5H3z"/><path d="M3 10h18v5H3z"/><path d="M3 17h18v4H3z"/></svg>,
  },
  {
    title: 'Leak Detection',
    price: 'From $150',
    desc: 'Losing water daily? We pinpoint the source and provide a same-day repair estimate.',
    features: ['Pressure testing','Dye injection testing','Structural inspection','Equipment line check','Full written report','Repair quote same visit'],
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/><path d="M11 8v6M8 11h6"/></svg>,
  },
  {
    title: 'Tile & Surface Care',
    price: 'From $200',
    desc: 'Calcium removal, acid washing, and tile restoration to bring back the shine.',
    features: ['Calcium line removal','Waterline tile scrubbing','Acid washing','Surface stain treatment','Grout cleaning','Post-service chemical balance'],
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
  },
]

const FAQS = [
  { q: 'How often should my pool be serviced?', a: 'In Las Vegas, weekly service is strongly recommended due to dust, high heat, and heavy UV that rapidly deplete chemicals and accelerate algae growth.' },
  { q: 'Do you require long-term contracts?', a: 'No. All maintenance plans are month-to-month. You stay because of the quality of service, not because you are locked in.' },
  { q: 'How quickly can you respond to a green pool?', a: 'In most cases we can be there the same or next day. We keep emergency slots open for existing customers.' },
  { q: 'Are you licensed and insured?', a: 'Yes. NV Contractor License #C-53-12345, fully bonded and insured with $1M liability coverage.' },
]

export default function Services() {
  return (
    <div style={{ background: 'var(--bg)' }}>

      {/* Hero */}
      <section style={{ background: 'var(--alt)', padding: '4rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="label" style={{ display: 'inline-block', marginBottom: '0.75rem' }}>What We Offer</span>
          <h1 style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 700, color: 'var(--ink)', marginBottom: '0.875rem' }}>Services &amp; Pricing</h1>
          <p className="subtext" style={{ fontSize: '1.0625rem', maxWidth: '36rem', margin: '0 auto 2rem' }}>Transparent pricing, no hidden fees. Every service backed by our quality guarantee.</p>
          <Link to="/book" className="btn btn-primary">Book a Service</Link>
        </div>
      </section>

      {/* Services grid */}
      <section style={{ padding: '5rem 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.25rem' }}>
            {SERVICES.map(({ title, price, desc, features, icon, featured }) => (
              <div key={title} className={featured ? 'card-lg' : 'card'} style={{ padding: '2rem', position: 'relative' }}>
                {featured && (
                  <span className="chip chip-orange" style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', fontSize: '0.7rem' }}>Most Popular</span>
                )}
                <div className={featured ? 'icon-wrap-orange' : 'icon-wrap'} style={{ marginBottom: '1.125rem' }}>{icon}</div>
                <h3 style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '0.3rem' }}>{title}</h3>
                <div className="inset-sm" style={{ display: 'inline-block', padding: '0.25rem 0.75rem', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.875rem', fontWeight: 700, color: featured ? 'var(--orange)' : 'var(--blue)' }}>{price}</span>
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--body)', lineHeight: 1.6, marginBottom: '1.25rem' }}>{desc}</p>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                  {features.map(f => (
                    <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8375rem', color: 'var(--body)' }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: 'var(--alt)', padding: '5rem 0' }}>
        <div className="container" style={{ maxWidth: '52rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="label" style={{ display: 'inline-block', marginBottom: '0.75rem' }}>Common Questions</span>
            <h2 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--ink)' }}>FAQs</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {FAQS.map(({ q, a }) => (
              <div key={q} className="card" style={{ padding: '1.5rem 1.75rem' }}>
                <p style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--ink)', marginBottom: '0.5rem' }}>{q}</p>
                <p style={{ fontSize: '0.875rem', color: 'var(--body)', lineHeight: 1.65 }}>{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--blue)', padding: '4.5rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, color: '#fff', marginBottom: '0.75rem' }}>Not sure which service you need?</h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', marginBottom: '2rem' }}>Call us and we will assess your pool and recommend the right solution.</p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="tel:7024602406" className="btn" style={{ background: 'var(--orange)', color: '#fff', boxShadow: 'none' }}>Call 702-460-2406</a>
            <Link to="/book" className="btn" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', boxShadow: 'none' }}>Book Online</Link>
          </div>
        </div>
      </section>

    </div>
  )
}
