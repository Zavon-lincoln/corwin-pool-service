import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import LeadForm from '../components/LeadForm'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0 },
}

const services = [
  { icon: '🌊', title: 'Weekly Maintenance',  desc: 'Chemicals, brushing, vacuuming, filter checks — every week, on schedule.' },
  { icon: '🦠', title: 'Green Pool Rescue',   desc: 'Algae gone in 24–72 hrs. Guaranteed crystal clear or we come back free.' },
  { icon: '🔧', title: 'Equipment Repair',    desc: 'Pumps, heaters, filters, automation — we fix it fast.' },
  { icon: '🧹', title: 'Deep Clean',          desc: 'One-time or seasonal. Before parties, after move-ins, or just because.' },
  { icon: '🔍', title: 'Leak Detection',      desc: 'Losing water? We find it and fix it — same-day diagnosis.' },
  { icon: '💎', title: 'Tile & Surface Care', desc: "Calcium buildup, acid washing, tile scrubbing. Restore your pool's shine." },
]

const testimonials = [
  { name: 'Marcus T.',      location: 'Summerlin',       stars: 5, text: '"Corwin has been cleaning my pool for 4 years. Never missed a visit, always leaves it immaculate. My neighbor hired them after seeing how great mine looks."',     service: 'Weekly Maintenance' },
  { name: 'Diane R.',       location: 'Henderson',       stars: 5, text: '"Green pool emergency — they showed up same day and had it crystal clear in 48 hours. I\'ve been with them ever since. Best pool service in Vegas, period."',            service: 'Green Pool Rescue' },
  { name: 'Tom & Lisa W.',  location: 'Centennial Hills',stars: 5, text: '"Fast, professional, and actually shows up when they say they will. We had three other companies ghost us. Corwin has been reliable for 2+ years straight."',          service: 'Weekly Maintenance' },
]

const stats = [
  { value: '25+', label: 'Years in Business' },
  { value: '500+', label: 'Happy Customers' },
  { value: '5★',   label: 'Avg Review Rating' },
  { value: '#1',   label: 'Best of Las Vegas' },
]

export default function Home() {
  return (
    <div style={{ background: 'var(--nm-bg)' }}>

      {/* ─── HERO ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ background: 'var(--nm-deep)' }}>
        {/* Concentric ring bg pattern */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="absolute rounded-full"
              style={{
                width:  (i + 1) * 80, height: (i + 1) * 80,
                top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
                border: '1px solid rgba(0,196,240,0.04)',
              }} />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-0 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left: Copy */}
            <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ duration: 0.5 }}
              className="pb-16 lg:pb-20">

              <span className="nm-badge mb-6 inline-flex">🏆 Best of Las Vegas Gold Winner 2023</span>

              <h1 className="font-display text-6xl md:text-7xl lg:text-8xl text-white leading-none mb-4">
                VEGAS'S #1<br />
                <span style={{ color: 'var(--nm-cyan)' }}>POOL</span><br />
                SERVICE
              </h1>

              <p style={{ color: 'var(--nm-muted)' }} className="text-lg mb-8 max-w-md leading-relaxed">
                Crystal-clear water. Every week. Guaranteed. Corwin Pool Service has kept Las Vegas pools spotless since{' '}
                <strong className="text-white">2000</strong>.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link to="/book" className="nm-btn-yellow text-base px-8 py-4 justify-center sm:justify-start">
                  Book Online Now →
                </Link>
                <a href="tel:7024602406" className="nm-btn-primary text-base px-8 py-4 justify-center sm:justify-start">
                  📞 702-460-2406
                </a>
              </div>

              <div className="flex flex-wrap gap-3">
                {['Licensed & Insured', '2-Hr Response', 'Free Estimate'].map(t => (
                  <div key={t} className="nm-trust-chip">
                    <span style={{ color: 'var(--nm-cyan)' }}>✓</span> {t}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: Lead form */}
            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }} className="pb-8 lg:pb-16">
              <LeadForm dark />
            </motion.div>
          </div>
        </div>

        {/* Wave bottom */}
        <div className="relative -mt-1">
          <svg viewBox="0 0 1200 80" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0,40 C200,10 400,70 600,40 C800,10 1000,70 1200,40 L1200,80 L0,80 Z"
              fill="var(--nm-bg)" opacity="0.9"/>
          </svg>
        </div>
      </section>

      {/* ─── TICKER ───────────────────────────────────────── */}
      <div className="py-4 overflow-hidden" style={{ background: 'var(--nm-deep)' }}>
        <div className="nm-inset mx-4 sm:mx-8 py-3 overflow-hidden" style={{ borderRadius: '2rem' }}>
          <div className="ticker-animate flex whitespace-nowrap">
            {Array.from({ length: 4 }).map((_, i) => (
              <span key={i} className="flex items-center">
                {['⭐ Weekly Maintenance', '🏆 Best of Las Vegas 2023', '🌊 Green Pool Rescue',
                  '🔧 Same-Day Repairs', '✅ 500+ Happy Clients', '💧 Serving Vegas Since 2000', '📞 Free Estimates'
                ].map(item => (
                  <span key={item} className="mx-8 text-sm font-black uppercase tracking-widest"
                    style={{ color: 'var(--nm-cyan)' }}>{item}</span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ─── STATS ────────────────────────────────────────── */}
      <section className="section-pad" style={{ background: 'var(--nm-bg)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {stats.map(({ value, label }, i) => (
              <motion.div key={label}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="nm-card p-6 text-center">
                <div className="font-display text-5xl mb-1" style={{ color: 'var(--nm-cyan)' }}>{value}</div>
                <div className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--nm-muted)' }}>{label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICES ─────────────────────────────────────── */}
      <section className="section-pad" style={{ background: 'var(--nm-deep)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-center mb-14">
            <p className="section-label mb-3">What We Do</p>
            <h2 className="section-title">EVERY SERVICE<br />YOUR POOL NEEDS</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(({ icon, title, desc }, i) => (
              <motion.div key={title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="nm-card p-6 transition-all duration-200 hover:shadow-nm-lg cursor-default">
                <div className="text-4xl mb-4">{icon}</div>
                <h3 className="font-display text-2xl mb-2" style={{ color: 'var(--nm-cyan)' }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--nm-muted)' }}>{desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/services" className="nm-btn-cyan text-sm px-8 py-4">
              See All Services & Pricing →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── WHY CORWIN ───────────────────────────────────── */}
      <section className="section-pad" style={{ background: 'var(--nm-bg)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
              <p className="section-label mb-3">Why Corwin</p>
              <h2 className="section-title mb-6">THE VEGAS POOL<br />EXPERTS SINCE<br />2000</h2>
              <p className="leading-relaxed mb-8" style={{ color: 'var(--nm-muted)' }}>
                In Las Vegas's 115°F summers, your pool isn't a luxury — it's a necessity.
                We've been keeping Vegas pools crystal clear for over 25 years.
              </p>

              <div className="space-y-3">
                {[
                  ['🏆', 'Award-Winning Service',  'Best of Las Vegas Gold Winner. Our customers vote for us year after year.'],
                  ['⚡', 'Same-Day Response',       "Green pool emergency? We're there fast. Most emergencies handled same or next day."],
                  ['🔐', 'Licensed, Bonded & Insured', 'NV License #C-53. Full liability coverage. You\'re protected.'],
                  ['📅', 'Never Misses a Visit',   'We show up every single week — rain, heat, or holiday. Consistent, reliable.'],
                ].map(([icon, title, desc]) => (
                  <div key={title} className="nm-inset p-4 flex items-start gap-4">
                    <span className="text-2xl flex-shrink-0">{icon}</span>
                    <div>
                      <div className="font-bold text-white text-sm">{title}</div>
                      <div className="text-xs mt-0.5 leading-relaxed" style={{ color: 'var(--nm-muted)' }}>{desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex gap-4">
                <Link to="/about" className="nm-btn-yellow">Learn Our Story →</Link>
                <a href="tel:7024602406" className="nm-btn-primary">Call Now</a>
              </div>
            </motion.div>

            {/* Stats card */}
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="nm-card-lg p-8">
                <div className="font-display text-9xl text-center leading-none mb-2"
                  style={{ color: 'var(--nm-yellow)' }}>25</div>
                <div className="font-display text-3xl text-white text-center mb-8 tracking-widest">YEARS STRONG</div>

                <div className="nm-inset-lg p-6 relative overflow-hidden mb-4">
                  <svg viewBox="0 0 400 180" className="w-full">
                    <rect x="20" y="30" width="360" height="130" rx="16" fill="rgba(0,196,240,0.08)"/>
                    <rect x="20" y="30" width="360" height="130" rx="16" fill="none"
                      stroke="rgba(0,196,240,0.3)" strokeWidth="2"/>
                    {[55, 80, 105, 130].map(y => (
                      <path key={y} d={`M40,${y} Q100,${y-12} 160,${y} Q220,${y+12} 280,${y} Q340,${y-12} 380,${y}`}
                        stroke="#00C4F0" strokeWidth="1.5" fill="none" opacity="0.5"/>
                    ))}
                    {[[60,50],[200,65],[330,55],[150,130],[290,125]].map(([x,y], j) => (
                      <text key={j} x={x} y={y} fill="#FFE156" fontSize="12" textAnchor="middle">✦</text>
                    ))}
                    <text x="200" y="165" fill="rgba(224,238,255,0.7)" fontSize="14"
                      fontWeight="700" textAnchor="middle" fontFamily="Arial" letterSpacing="4">
                      CRYSTAL CLEAR
                    </text>
                  </svg>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {['Mon', 'Wed', 'Fri'].map(d => (
                    <div key={d} className="nm-card-sm p-3 text-center">
                      <div className="text-xs font-bold" style={{ color: 'var(--nm-cyan)' }}>{d}</div>
                      <div className="text-white text-lg">✓</div>
                    </div>
                  ))}
                </div>
                <p className="text-center text-xs font-bold mt-3" style={{ color: 'var(--nm-muted)' }}>
                  EVERY WEEK, ON SCHEDULE
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── BEFORE / AFTER ───────────────────────────────── */}
      <section className="section-pad" style={{ background: 'var(--nm-deep)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-center mb-14">
            <p className="section-label mb-3">Proof of Work</p>
            <h2 className="section-title">BEFORE & AFTER</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { before: '#2d5a27', after: '#00C4F0', label: 'Severe Algae → Crystal Clear', time: '48 Hours' },
              { before: '#8B6914', after: '#0099cc', label: 'Neglected Pool → Sparkling',   time: '72 Hours' },
              { before: '#1a3a1a', after: '#0077b6', label: 'Black Algae → Pristine',       time: '5 Days'   },
            ].map(({ before, after, label, time }, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className="nm-card overflow-hidden">
                  <div className="grid grid-cols-2">
                    <div style={{ background: before }} className="h-40 flex items-center justify-center">
                      <span className="text-white font-bold text-xs px-2 py-1 rounded"
                        style={{ background: 'rgba(0,0,0,0.45)' }}>BEFORE</span>
                    </div>
                    <div style={{ background: after }} className="h-40 flex items-center justify-center relative overflow-hidden">
                      <svg viewBox="0 0 200 160" className="absolute inset-0 w-full h-full opacity-40">
                        {[30,60,90,120].map(y => (
                          <path key={y} d={`M0,${y} Q50,${y-12} 100,${y} Q150,${y+12} 200,${y}`}
                            stroke="white" strokeWidth="2" fill="none"/>
                        ))}
                      </svg>
                      <span className="text-white font-bold text-xs px-2 py-1 rounded relative z-10"
                        style={{ background: 'rgba(0,0,0,0.45)' }}>AFTER</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="font-bold text-sm text-white">{label}</p>
                    <p className="text-xs font-bold mt-1" style={{ color: 'var(--nm-cyan)' }}>⏱ {time}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/book" className="nm-btn-yellow text-base px-8 py-4">
              Get Your Pool Looking Like This →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─────────────────────────────────── */}
      <section className="section-pad" style={{ background: 'var(--nm-bg)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-center mb-14">
            <p className="section-label mb-3">What Clients Say</p>
            <h2 className="section-title">500+ HAPPY<br />LAS VEGAS POOLS</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(({ name, location, stars, text, service }, i) => (
              <motion.div key={name}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="nm-card p-6 hover:shadow-nm-lg transition-all duration-200">
                <div className="flex mb-3" style={{ color: '#FFE156' }}>
                  {Array.from({ length: stars }).map((_, j) => <span key={j} className="text-xl">★</span>)}
                </div>
                <p className="text-sm leading-relaxed mb-4 italic" style={{ color: 'var(--nm-text)' }}>{text}</p>
                <div className="nm-divider mb-3" />
                <div className="font-bold text-white text-sm">{name}</div>
                <div className="text-xs mt-0.5" style={{ color: 'var(--nm-muted)' }}>{location} · {service}</div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/reviews" className="nm-btn-yellow">Read All Reviews →</Link>
            <a href="https://www.google.com/search?q=corwin+pool+service+las+vegas"
              target="_blank" rel="noopener noreferrer" className="nm-btn-primary">
              ⭐ Leave a Google Review
            </a>
          </div>
        </div>
      </section>

      {/* ─── SERVICE AREA ─────────────────────────────────── */}
      <section className="section-pad" style={{ background: 'var(--nm-deep)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
              <p className="section-label mb-3">Where We Serve</p>
              <h2 className="section-title mb-6">ALL OF LAS VEGAS<br />& HENDERSON</h2>
              <p className="mb-6 leading-relaxed" style={{ color: 'var(--nm-muted)' }}>
                From Summerlin to Henderson, Centennial to Southern Highlands — if you have a pool in the
                Las Vegas Valley, we've got you covered.
              </p>
              <div className="grid grid-cols-2 gap-2 mb-8">
                {['Summerlin','Centennial Hills','Henderson','Green Valley',
                  'Southern Highlands','Aliante','North Las Vegas','Spring Valley'].map(area => (
                  <div key={area} className="flex items-center gap-2 text-sm font-semibold text-white">
                    <span className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ background: 'var(--nm-cyan)', boxShadow: '0 0 6px rgba(0,196,240,0.5)' }} />
                    {area}
                  </div>
                ))}
              </div>
              <Link to="/contact" className="nm-btn-cyan">Check If We Serve Your Area →</Link>
            </motion.div>

            {/* Map card */}
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}>
              <div className="nm-card-lg overflow-hidden">
                <div className="p-4" style={{ background: 'var(--nm-darker, var(--nm-deep))' }}>
                  <p className="text-white font-bold text-sm uppercase tracking-wider">
                    Service Area — Las Vegas Valley
                  </p>
                </div>
                <div className="h-72">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d219697.14509837!2d-115.37120!3d36.17497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80beb782a4f57dd1%3A0x3accd5e6d5b379a3!2sLas%20Vegas%2C%20NV!5e0!3m2!1sen!2sus!4v1620000000000"
                    className="w-full h-full border-0" allowFullScreen="" loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade" title="Corwin Pool Service Area"
                  />
                </div>
                <div className="p-4 nm-inset-sm text-center mx-4 my-3" style={{ borderRadius: '0.5rem' }}>
                  <p className="text-xs font-bold" style={{ color: 'var(--nm-muted)' }}>
                    📍 10917 Salford Drive, Las Vegas NV 89144
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ───────────────────────────────────── */}
      <section className="section-pad" style={{ background: 'var(--nm-deeper)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <p className="section-label mb-4">Don't Let Your Pool Go Green</p>
            <h2 className="font-display text-6xl md:text-7xl text-white mb-4 leading-none">
              READY FOR<br />CRYSTAL CLEAR?
            </h2>
            <p className="mb-10 text-lg" style={{ color: 'var(--nm-muted)' }}>
              Join 500+ Las Vegas families who trust Corwin Pool Service every week.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/book" className="nm-btn-yellow text-lg px-10 py-5">
                Book Your First Service →
              </Link>
              <a href="tel:7024602406" className="nm-btn-primary text-lg px-10 py-5">
                📞 702-460-2406
              </a>
            </div>
            <p className="mt-6 text-sm font-semibold" style={{ color: 'var(--nm-muted)' }}>
              Free estimate · No contracts · Cancel anytime
            </p>
          </motion.div>
        </div>
      </section>

    </div>
  )
}
