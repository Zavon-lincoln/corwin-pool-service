import { Link } from 'react-router-dom'
import LeadForm from '../components/LeadForm'

const SERVICES = [
  {
    title: 'Weekly Maintenance',
    desc: 'Chemicals, brushing, vacuuming, and filter checks — every week, on schedule.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 17c3-3 6-3 9 0s6 3 9 0"/>
        <path d="M3 11c3-3 6-3 9 0s6 3 9 0"/>
        <path d="M3 5c3-3 6-3 9 0s6 3 9 0"/>
      </svg>
    ),
  },
  {
    title: 'Green Pool Rescue',
    desc: 'Algae gone in 24-72 hours. Guaranteed crystal clear or we come back free.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22a10 10 0 0 1-10-10A10 10 0 0 1 12 2a10 10 0 0 1 10 10"/>
        <path d="m9 12 2 2 4-4"/>
      </svg>
    ),
  },
  {
    title: 'Equipment Repair',
    desc: 'Pumps, heaters, filters, automation — diagnosed and fixed fast.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
  },
  {
    title: 'Deep Clean',
    desc: 'One-time or seasonal. Before parties, after move-ins, or just because.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3h18v5H3z"/><path d="M3 10h18v5H3z"/><path d="M3 17h18v4H3z"/>
      </svg>
    ),
  },
  {
    title: 'Leak Detection',
    desc: 'Losing water? We find it and fix it — same-day diagnosis.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/><path d="M11 8v6M8 11h6"/>
      </svg>
    ),
  },
  {
    title: 'Tile & Surface Care',
    desc: 'Calcium buildup, acid washing, tile scrubbing. Restore your pool shine.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
  },
]

const TESTIMONIALS = [
  { name: 'Marcus T.', loc: 'Summerlin', text: 'Corwin has been cleaning my pool for 4 years. Never missed a visit, always immaculate. My neighbor hired them after seeing how great mine looks.', service: 'Weekly Maintenance' },
  { name: 'Diane R.', loc: 'Henderson', text: 'Green pool emergency — they showed up same day and had it crystal clear in 48 hours. Best pool service in Vegas, period.', service: 'Green Pool Rescue' },
  { name: 'Tom & Lisa W.', loc: 'Centennial Hills', text: 'Fast, professional, and actually shows up. We had three other companies ghost us. Corwin has been reliable for 2 years straight.', service: 'Weekly Maintenance' },
]

const STATS = [
  { value: '25+', label: 'Years in Business' },
  { value: '500+', label: 'Happy Customers' },
  { value: '5.0', label: 'Star Rating' },
  { value: '#1', label: 'Best of Las Vegas' },
]

const WHY = [
  {
    title: 'Award-Winning Service',
    desc: 'Best of Las Vegas Gold Winner. Our customers vote for us year after year.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>
      </svg>
    ),
  },
  {
    title: 'Same-Day Response',
    desc: 'Green pool emergency? Most cases handled same or next day.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    title: 'Licensed, Bonded & Insured',
    desc: 'NV License #C-53. Full liability coverage. You are protected.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    title: 'No Long Contracts',
    desc: 'Month-to-month service. Stay because you love us, not because you have to.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
        <line x1="9" y1="15" x2="15" y2="15"/>
      </svg>
    ),
  },
]

const BEFORES = [
  { label: 'Severe Algae', result: 'Crystal Clear', time: '48 Hours', bgBefore: 'linear-gradient(160deg,#2a5c1a,#3d7a28)', bgAfter: 'linear-gradient(160deg,#0077b6,#48cae4)' },
  { label: 'Neglected Pool', result: 'Sparkling Clean', time: '72 Hours', bgBefore: 'linear-gradient(160deg,#8a6a1a,#a07e28)', bgAfter: 'linear-gradient(160deg,#009fb5,#90e0ef)' },
  { label: 'Black Algae', result: 'Pristine', time: '5 Days', bgBefore: 'linear-gradient(160deg,#1e3d14,#2d5a1e)', bgAfter: 'linear-gradient(160deg,#0077b6,#009fb5)' },
]

export default function Home() {
  return (
    <div style={{ background: 'var(--bg)' }}>

      {/* ── HERO ─────────────────────────────────── */}
      <section style={{ background: 'var(--alt)', paddingTop: '4rem', paddingBottom: '4.5rem' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3.5rem', alignItems: 'center' }}>

            <div>
              <span className="label" style={{ display: 'inline-block', marginBottom: '1.25rem' }}>
                Best of Las Vegas 2023
              </span>
              <h1 style={{ fontSize: 'clamp(2.25rem, 4vw, 3.25rem)', fontWeight: 700, color: 'var(--ink)', lineHeight: 1.12, marginBottom: '1.25rem' }}>
                Las Vegas Pool<br />
                <span style={{ color: 'var(--blue)' }}>Care Experts</span><br />
                Since 2000
              </h1>
              <p className="subtext" style={{ fontSize: '1.0625rem', lineHeight: 1.7, marginBottom: '2rem', maxWidth: '26rem' }}>
                Crystal-clear water, every week — guaranteed. Serving 500+ Las Vegas families across Summerlin, Henderson, and Centennial Hills.
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <Link to="/book" className="btn btn-primary">Book a Service</Link>
                <a href="tel:7024602406" className="btn btn-ghost">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.59 3h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  702-460-2406
                </a>
              </div>
              <div style={{ display: 'flex', gap: '1.5rem', marginTop: '2rem', flexWrap: 'wrap' }}>
                {['Licensed & Insured', 'No Contracts', '2-Hr Response'].map(t => (
                  <span key={t} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.8125rem', color: 'var(--muted)', fontWeight: 500 }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <LeadForm />
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────── */}
      <section style={{ background: 'var(--bg)', padding: '3rem 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1.25rem' }}>
            {STATS.map(({ value, label }) => (
              <div key={label} className="card" style={{ padding: '1.5rem', textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--blue)', lineHeight: 1, marginBottom: '0.4rem' }}>{value}</div>
                <div style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────── */}
      <section style={{ background: 'var(--alt)', padding: '5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="label" style={{ display: 'inline-block', marginBottom: '0.75rem' }}>What We Do</span>
            <h2 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--ink)' }}>Full-Service Pool Care</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.25rem' }}>
            {SERVICES.map(({ title, desc, icon }) => (
              <div key={title} className="card" style={{ padding: '1.75rem' }}>
                <div className="icon-wrap" style={{ marginBottom: '1rem' }}>{icon}</div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '0.5rem' }}>{title}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--body)', lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link to="/services" className="btn btn-ghost">View All Services & Pricing</Link>
          </div>
        </div>
      </section>

      {/* ── WHY CORWIN ───────────────────────────── */}
      <section style={{ background: 'var(--bg)', padding: '5rem 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <div>
              <span className="label" style={{ display: 'inline-block', marginBottom: '0.75rem' }}>Why Choose Us</span>
              <h2 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '1rem' }}>The Vegas Pool Experts Since 2000</h2>
              <p className="subtext" style={{ lineHeight: 1.7, marginBottom: '2rem' }}>In Las Vegas's 115 degree summers, your pool is a necessity. We have been keeping Vegas pools crystal clear for over 25 years, earning trust one backyard at a time.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {WHY.map(({ title, desc, icon }) => (
                  <div key={title} className="card-sm" style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    <div className="icon-wrap-orange" style={{ width: '2.5rem', height: '2.5rem', borderRadius: '0.75rem', flexShrink: 0 }}>{icon}</div>
                    <div>
                      <p style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '0.2rem' }}>{title}</p>
                      <p style={{ fontSize: '0.8375rem', color: 'var(--body)', lineHeight: 1.5 }}>{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="card-lg" style={{ padding: '2.5rem', textAlign: 'center' }}>
              <div style={{ fontSize: '4rem', fontWeight: 800, color: 'var(--blue)', lineHeight: 1, marginBottom: '0.25rem' }}>25</div>
              <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '2rem' }}>Years Strong</div>
              <div className="inset" style={{ padding: '2rem', borderRadius: '1rem', marginBottom: '1.5rem', position: 'relative', overflow: 'hidden', height: '10rem', background: 'linear-gradient(160deg, #0077b6, #48cae4)' }}>
                <svg viewBox="0 0 300 140" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.3 }}>
                  {[30,55,80,105,130].map(y => (
                    <path key={y} d={`M0,${y} Q75,${y-12} 150,${y} Q225,${y+12} 300,${y}`} stroke="white" strokeWidth="2" fill="none"/>
                  ))}
                </svg>
                <span style={{ position: 'absolute', bottom: '0.75rem', left: '50%', transform: 'translateX(-50%)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.9)' }}>Crystal Clear</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                {[['500+','Customers'],['5.0','Stars']].map(([v,l]) => (
                  <div key={l} className="card-sm" style={{ padding: '0.875rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--orange)' }}>{v}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--muted)', fontWeight: 500 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BEFORE & AFTER ────────────────────────── */}
      <section style={{ background: 'var(--alt)', padding: '5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="label" style={{ display: 'inline-block', marginBottom: '0.75rem' }}>Proof of Work</span>
            <h2 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--ink)' }}>Before &amp; After</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.25rem' }}>
            {BEFORES.map(({ label, result, time, bgBefore, bgAfter }) => (
              <div key={label} className="card" style={{ overflow: 'hidden' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', height: '10rem' }}>
                  <div style={{ background: bgBefore, display: 'flex', alignItems: 'flex-end', padding: '0.6rem', position: 'relative' }}>
                    <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', background: 'rgba(0,0,0,0.25)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>Before</span>
                  </div>
                  <div style={{ background: bgAfter, display: 'flex', alignItems: 'flex-end', padding: '0.6rem', position: 'relative', overflow: 'hidden' }}>
                    <svg viewBox="0 0 150 120" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.25 }}>
                      {[24,48,72,96].map(y => (
                        <path key={y} d={`M0,${y} Q37,${y-8} 75,${y} Q112,${y+8} 150,${y}`} stroke="white" strokeWidth="1.5" fill="none"/>
                      ))}
                    </svg>
                    <span style={{ position: 'relative', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.9)', background: 'rgba(0,0,0,0.2)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>After</span>
                  </div>
                </div>
                <div style={{ padding: '1rem 1.25rem' }}>
                  <p style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--ink)', marginBottom: '0.2rem' }}>{label} &rarr; {result}</p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--teal)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    {time}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link to="/book" className="btn btn-primary">Get Your Pool Looking Like This</Link>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────── */}
      <section style={{ background: 'var(--bg)', padding: '5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="label" style={{ display: 'inline-block', marginBottom: '0.75rem' }}>What Clients Say</span>
            <h2 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--ink)' }}>500+ Happy Las Vegas Pools</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.25rem' }}>
            {TESTIMONIALS.map(({ name, loc, text, service }) => (
              <div key={name} className="card" style={{ padding: '1.75rem' }}>
                <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '0.875rem' }}>
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="var(--orange)" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                  ))}
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--body)', lineHeight: 1.65, marginBottom: '1rem' }}>{text}</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--ink)' }}>{name}</p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>{loc}</p>
                  </div>
                  <span className="chip chip-blue" style={{ fontSize: '0.7rem' }}>{service}</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link to="/reviews" className="btn btn-ghost">Read All Reviews</Link>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────── */}
      <section style={{ background: 'var(--blue)', padding: '5rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span style={{ display: 'inline-block', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: '1rem' }}>No more green pools</span>
          <h2 style={{ fontSize: 'clamp(1.75rem,3.5vw,2.75rem)', fontWeight: 700, color: '#fff', marginBottom: '0.875rem' }}>Ready for Crystal Clear Water?</h2>
          <p style={{ fontSize: '1.0625rem', color: 'rgba(255,255,255,0.7)', marginBottom: '2.5rem', maxWidth: '30rem', margin: '0 auto 2.5rem' }}>Join 500+ Las Vegas families who trust Corwin Pool Service every week.</p>
          <div style={{ display: 'flex', gap: '0.875rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/book" className="btn" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', backdropFilter: 'blur(4px)', boxShadow: 'none', borderRadius: '0.625rem' }}>Book Your First Service</Link>
            <a href="tel:7024602406" className="btn" style={{ background: 'var(--orange)', color: '#fff', borderRadius: '0.625rem', boxShadow: 'none' }}>702-460-2406</a>
          </div>
          <p style={{ marginTop: '1.5rem', fontSize: '0.8125rem', color: 'rgba(255,255,255,0.45)' }}>Free estimate &nbsp;·&nbsp; No contracts &nbsp;·&nbsp; Cancel anytime</p>
        </div>
      </section>

    </div>
  )
}
