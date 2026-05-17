import { Link } from 'react-router-dom'

const REVIEWS = [
  { name:'Marcus T.',    loc:'Summerlin',        rating:5, text:'Corwin has been cleaning my pool for 4 years. Never missed a visit, always immaculate. My neighbor hired them after seeing how great mine looks.',        service:'Weekly Maintenance', date:'Jan 2024' },
  { name:'Diane R.',     loc:'Henderson',        rating:5, text:'Green pool emergency — they showed up same day and had it crystal clear in 48 hours. I have been with them ever since. Best pool service in Vegas.',    service:'Green Pool Rescue',  date:'Feb 2024' },
  { name:'Tom & Lisa W.',loc:'Centennial Hills', rating:5, text:'Fast, professional, and actually shows up. We had three other companies ghost us. Corwin has been reliable for 2 years straight. Worth every penny.',   service:'Weekly Maintenance', date:'Mar 2024' },
  { name:'Sandra K.',    loc:'Spring Valley',    rating:5, text:'My pump broke during a heat wave. They diagnosed and fixed it the same day. Prices were fair and the tech explained everything clearly.',                 service:'Equipment Repair',   date:'Apr 2024' },
  { name:'James P.',     loc:'Summerlin',        rating:5, text:'Pool looks better than it ever has. The team is friendly, punctual, and thorough. I actually got a personal call from Marcus to check in. That is rare.', service:'Weekly Maintenance', date:'May 2024' },
  { name:'Rosa M.',      loc:'Enterprise',       rating:5, text:'Moved into a house with a neglected pool. They turned it around in one week. Responsive, professional, and a great value for the service level.',         service:'Deep Clean',         date:'Jun 2024' },
]

const PLATFORMS = [
  { name:'Google', rating:'4.9', reviews:'124', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/></svg> },
  { name:'Yelp',   rating:'4.8', reviews:'87',  icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><path d="M12 2a10 10 0 1 0 10 10"/><path d="m4.93 4.93 14.14 14.14"/></svg> },
  { name:'BBB',    rating:'A+',  reviews:'Accredited', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
]

export default function Reviews() {
  return (
    <div style={{ background: 'var(--bg)' }}>

      {/* Hero */}
      <section style={{ background: 'var(--alt)', padding: '4rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="label" style={{ display: 'inline-block', marginBottom: '0.75rem' }}>Customer Reviews</span>
          <h1 style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 700, color: 'var(--ink)', marginBottom: '0.5rem' }}>What Our Customers Say</h1>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.375rem', marginTop: '0.75rem' }}>
            {[...Array(5)].map((_,i) => <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="var(--orange)" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>)}
            <span style={{ marginLeft: '0.5rem', fontWeight: 700, color: 'var(--ink)', fontSize: '1.125rem' }}>5.0</span>
            <span className="muted" style={{ fontSize: '0.875rem' }}>· 200+ reviews</span>
          </div>
        </div>
      </section>

      {/* Platform stats */}
      <section style={{ padding: '3rem 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.25rem', maxWidth: '42rem', margin: '0 auto' }}>
            {PLATFORMS.map(({ name, rating, reviews, icon }) => (
              <div key={name} className="card" style={{ padding: '1.5rem', textAlign: 'center' }}>
                <div className="icon-wrap" style={{ margin: '0 auto 0.75rem' }}>{icon}</div>
                <p style={{ fontWeight: 700, fontSize: '1.5rem', color: 'var(--orange)', lineHeight: 1 }}>{rating}</p>
                <p style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--ink)', marginTop: '0.2rem' }}>{name}</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{reviews}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews grid */}
      <section style={{ background: 'var(--alt)', padding: '5rem 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.25rem' }}>
            {REVIEWS.map(({ name, loc, rating, text, service, date }) => (
              <div key={name} className="card" style={{ padding: '1.75rem' }}>
                <div style={{ display: 'flex', gap: '0.2rem', marginBottom: '0.875rem' }}>
                  {[...Array(rating)].map((_,i) => <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="var(--orange)" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>)}
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--body)', lineHeight: 1.65, marginBottom: '1.25rem' }}>{text}</p>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem' }}>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--ink)' }}>{name}</p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>{loc} · {date}</p>
                  </div>
                  <span className="chip chip-teal" style={{ fontSize: '0.7rem', flexShrink: 0 }}>{service}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--blue)', padding: '4.5rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, color: '#fff', marginBottom: '0.75rem' }}>Join 500+ Happy Customers</h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', marginBottom: '2rem' }}>Book your first service and see why Las Vegas trusts Corwin.</p>
          <Link to="/book" className="btn" style={{ background: 'var(--orange)', color: '#fff', boxShadow: 'none' }}>Book a Service</Link>
        </div>
      </section>

    </div>
  )
}
