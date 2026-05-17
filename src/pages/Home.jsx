import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import LeadForm from '../components/LeadForm'

const fadeUp = { hidden:{ opacity:0, y:24 }, show:{ opacity:1, y:0 } }

const services = [
  { icon:'🌊', title:'Weekly Maintenance',   desc:'Chemicals, brushing, vacuuming, filter checks — every week, on schedule.' },
  { icon:'🦠', title:'Green Pool Rescue',    desc:'Algae gone in 24–72 hrs. Guaranteed crystal clear or we come back free.' },
  { icon:'🔧', title:'Equipment Repair',     desc:'Pumps, heaters, filters, automation — diagnosed and fixed fast.' },
  { icon:'🧹', title:'Deep Clean',           desc:'One-time or seasonal. Before parties, after move-ins, or just because.' },
  { icon:'🔍', title:'Leak Detection',       desc:'Losing water? We find it and fix it — same-day diagnosis.' },
  { icon:'💎', title:'Tile & Surface Care',  desc:"Calcium buildup, acid washing, tile scrubbing. Restore your pool's shine." },
]

const testimonials = [
  { name:'Marcus T.',     loc:'Summerlin',        text:'Corwin has been cleaning my pool for 4 years. Never missed a visit, always leaves it immaculate. My neighbor hired them after seeing how great mine looks.',   service:'Weekly Maintenance' },
  { name:'Diane R.',      loc:'Henderson',        text:'Green pool emergency — they showed up same day and had it crystal clear in 48 hours. I\'ve been with them ever since. Best pool service in Vegas, period.',  service:'Green Pool Rescue'  },
  { name:'Tom & Lisa W.', loc:'Centennial Hills', text:'Fast, professional, and actually shows up. We had three other companies ghost us. Corwin has been reliable for 2+ years straight. Worth every penny.',         service:'Weekly Maintenance' },
]

const stats = [
  { value:'25+', label:'Years in Business'  },
  { value:'500+',label:'Happy Customers'    },
  { value:'5.0', label:'Avg Star Rating'    },
  { value:'#1',  label:'Best of Las Vegas'  },
]

export default function Home() {
  return (
    <div style={{ background:'var(--nm-bg)' }}>

      {/* ── HERO ───────────────────────────────────────────── */}
      <section style={{ background:'var(--nm-alt)' }} className="relative overflow-hidden">
        {/* Soft water-circle bg detail */}
        <div className="absolute inset-0 pointer-events-none" style={{ overflow:'hidden' }}>
          {[350,500,650,800].map((s,i) => (
            <div key={i} className="absolute rounded-full"
              style={{ width:s, height:s, right:`-${s/4}px`, bottom:`-${s/3}px`,
                border:`1px solid rgba(0,119,182,0.06)` }}/>
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left: Copy */}
            <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ duration:0.5 }}>
              <span className="nm-badge mb-6">🏆 Best of Las Vegas 2023</span>

              <h1 className="nm-heading text-5xl md:text-6xl lg:text-7xl mb-5" style={{ letterSpacing:'-0.02em' }}>
                Las Vegas's<br />
                <span style={{ color:'var(--nm-blue)' }}>Pool Care</span><br />
                Professionals
              </h1>

              <p className="nm-body text-lg mb-8 max-w-md">
                Crystal-clear water, every week — guaranteed. Corwin Pool Service has kept Las Vegas pools spotless since <strong style={{ color:'var(--nm-navy)' }}>2000</strong>.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <Link to="/book" className="nm-btn-primary text-base px-7 py-3.5">
                  Book Free Estimate →
                </Link>
                <a href="tel:7024602406" className="nm-btn-secondary text-base px-7 py-3.5">
                  📞 702-460-2406
                </a>
              </div>

              <div className="flex flex-wrap gap-3">
                {['Licensed & Insured','2-Hr Response','Free Estimate'].map(t => (
                  <div key={t} className="nm-chip">
                    <span style={{ color:'var(--nm-teal)' }}>✓</span> {t}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: Form */}
            <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
              transition={{ duration:0.5, delay:0.15 }}>
              <LeadForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── STATS ──────────────────────────────────────────── */}
      <section style={{ background:'var(--nm-bg)' }} className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {stats.map(({ value, label }, i) => (
              <motion.div key={label}
                initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }} transition={{ delay:i*0.08 }}
                className="nm-card p-6 text-center">
                <div className="text-4xl font-extrabold mb-1" style={{ color:'var(--nm-blue)' }}>{value}</div>
                <div className="text-xs font-medium uppercase tracking-widest" style={{ color:'var(--nm-muted)' }}>{label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TICKER ─────────────────────────────────────────── */}
      <div style={{ background:'var(--nm-alt)' }} className="py-5 overflow-hidden">
        <div className="nm-inset mx-6 sm:mx-12 py-3.5 px-6 overflow-hidden" style={{ borderRadius:'3rem' }}>
          <div className="ticker-animate flex whitespace-nowrap">
            {Array.from({ length:4 }).map((_,i) => (
              <span key={i} className="flex items-center">
                {['⭐ Weekly Maintenance','🏆 Best of Las Vegas 2023','🌊 Green Pool Rescue',
                  '🔧 Same-Day Repairs','✅ 500+ Happy Clients','💧 Vegas Since 2000','📞 Free Estimates'
                ].map(item => (
                  <span key={item} className="mx-8 text-sm font-semibold"
                    style={{ color:'var(--nm-blue)' }}>{item}</span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── SERVICES ───────────────────────────────────────── */}
      <section style={{ background:'var(--nm-bg)' }} className="section-pad">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show"
            viewport={{ once:true }} className="text-center mb-14">
            <p className="nm-label mb-3">What We Do</p>
            <h2 className="nm-heading-xl mb-4">Every Service Your Pool Needs</h2>
            <p className="nm-body max-w-xl mx-auto">
              From routine maintenance to emergency rescues — we handle it all.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(({ icon, title, desc }, i) => (
              <motion.div key={title}
                initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }} transition={{ delay:i*0.07 }}
                className="nm-card p-6 transition-all duration-300 hover:shadow-nm-lg cursor-default group">
                <div className="nm-icon mb-4 text-xl transition-all group-hover:shadow-nm">{icon}</div>
                <h3 className="font-semibold text-lg mb-2" style={{ color:'var(--nm-navy)' }}>{title}</h3>
                <p className="text-sm nm-body leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/services" className="nm-btn-secondary px-8 py-3">
              See All Services & Pricing →
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHY CORWIN ─────────────────────────────────────── */}
      <section style={{ background:'var(--nm-alt)' }} className="section-pad">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once:true }}>
              <p className="nm-label mb-3">Why Corwin</p>
              <h2 className="nm-heading-xl mb-5">
                Vegas Pool Experts<br />Since 2000
              </h2>
              <p className="nm-body mb-8">
                In Las Vegas's 115°F summers, your pool isn't a luxury — it's a necessity. We've been keeping pools crystal clear for 25+ years, earning trust one backyard at a time.
              </p>

              <div className="space-y-3">
                {[
                  ['🏆','Award-Winning Service',      'Best of Las Vegas Gold Winner — voted by the community we serve.'],
                  ['⚡','Same-Day Response',           'Green pool emergency? Most handled same or next day.'],
                  ['🔐','Licensed, Bonded & Insured',  'NV License #C-53. Full liability coverage. You\'re protected.'],
                  ['📅','Never Misses a Visit',        'We show up every week — rain, heat, or holiday.'],
                ].map(([icon, title, desc]) => (
                  <div key={title} className="nm-card-sm p-4 flex items-start gap-4">
                    <div className="nm-icon text-base flex-shrink-0">{icon}</div>
                    <div>
                      <div className="font-semibold text-sm mb-0.5" style={{ color:'var(--nm-navy)' }}>{title}</div>
                      <div className="text-xs nm-body leading-relaxed">{desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex gap-3">
                <Link to="/about" className="nm-btn-primary">Learn Our Story →</Link>
                <a href="tel:7024602406" className="nm-btn-secondary">Call Now</a>
              </div>
            </motion.div>

            {/* Stats card */}
            <motion.div initial={{ opacity:0, scale:0.96 }} whileInView={{ opacity:1, scale:1 }}
              viewport={{ once:true }} transition={{ duration:0.5 }} className="nm-float">
              <div className="nm-card-xl p-8 text-center">
                <div className="text-8xl font-extrabold mb-1" style={{ color:'var(--nm-blue)' }}>25</div>
                <div className="font-semibold text-lg mb-8 tracking-widest uppercase"
                  style={{ color:'var(--nm-muted)' }}>Years Strong</div>

                <div className="nm-inset-lg p-5 mb-5">
                  <svg viewBox="0 0 360 140" className="w-full">
                    <rect x="10" y="10" width="340" height="120" rx="12"
                      fill="none" stroke="rgba(0,119,182,0.15)" strokeWidth="1.5"/>
                    {[35,55,75,95,115].map(y => (
                      <path key={y} d={`M10,${y} Q90,${y-12} 180,${y} Q270,${y+12} 350,${y}`}
                        stroke="rgba(0,180,216,0.35)" strokeWidth="1.5" fill="none"/>
                    ))}
                    <text x="180" y="132" fill="rgba(61,96,112,0.5)" fontSize="11"
                      fontWeight="600" textAnchor="middle" fontFamily="inherit" letterSpacing="4">
                      CRYSTAL CLEAR
                    </text>
                  </svg>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {['Mon','Wed','Fri'].map(d => (
                    <div key={d} className="nm-card-sm p-3 text-center">
                      <div className="text-xs font-semibold mb-1" style={{ color:'var(--nm-muted)' }}>{d}</div>
                      <div className="text-base" style={{ color:'var(--nm-teal)' }}>✓</div>
                    </div>
                  ))}
                </div>
                <p className="text-xs mt-3 font-medium tracking-wide uppercase"
                  style={{ color:'var(--nm-muted)' }}>Every Week, On Schedule</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── BEFORE / AFTER ─────────────────────────────────── */}
      <section style={{ background:'var(--nm-bg)' }} className="section-pad">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show"
            viewport={{ once:true }} className="text-center mb-14">
            <p className="nm-label mb-3">Proof of Work</p>
            <h2 className="nm-heading-xl">Before & After</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { before:'#6aaa5c', after:'#48cae4', label:'Severe Algae → Crystal Clear', time:'48 Hours' },
              { before:'#9a8040', after:'#90e0ef', label:'Neglected Pool → Sparkling',   time:'72 Hours' },
              { before:'#3a5a38', after:'#00b4d8', label:'Black Algae → Pristine',       time:'5 Days'   },
            ].map(({ before, after, label, time }, i) => (
              <motion.div key={i}
                initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }} transition={{ delay:i*0.1 }}>
                <div className="nm-card overflow-hidden">
                  <div className="grid grid-cols-2">
                    <div style={{ background:before }} className="h-36 flex items-end pb-2 justify-center">
                      <span className="text-white text-[10px] font-semibold tracking-widest uppercase px-2 py-0.5 rounded"
                        style={{ background:'rgba(0,0,0,0.35)' }}>Before</span>
                    </div>
                    <div style={{ background:after }} className="h-36 flex items-end pb-2 justify-center relative overflow-hidden">
                      <svg viewBox="0 0 200 144" className="absolute inset-0 w-full h-full opacity-25">
                        {[28,52,76,100,124].map(y => (
                          <path key={y} d={`M0,${y} Q50,${y-10} 100,${y} Q150,${y+10} 200,${y}`}
                            stroke="white" strokeWidth="2" fill="none"/>
                        ))}
                      </svg>
                      <span className="relative text-white text-[10px] font-semibold tracking-widest uppercase px-2 py-0.5 rounded"
                        style={{ background:'rgba(0,0,0,0.35)' }}>After</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="font-semibold text-sm" style={{ color:'var(--nm-navy)' }}>{label}</p>
                    <p className="text-xs mt-1 font-medium" style={{ color:'var(--nm-teal)' }}>⏱ {time}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/book" className="nm-btn-primary text-base px-8 py-3.5">
              Get Your Pool Looking Like This →
            </Link>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ───────────────────────────────────── */}
      <section style={{ background:'var(--nm-alt)' }} className="section-pad">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show"
            viewport={{ once:true }} className="text-center mb-14">
            <p className="nm-label mb-3">What Clients Say</p>
            <h2 className="nm-heading-xl">500+ Happy Las Vegas Pools</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(({ name, loc, text, service }, i) => (
              <motion.div key={name}
                initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }} transition={{ delay:i*0.1 }}
                className="nm-card p-6 hover:shadow-nm-lg transition-all duration-300">
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_,j) => (
                    <span key={j} className="text-lg" style={{ color:'#f59e0b' }}>★</span>
                  ))}
                </div>
                <p className="text-sm nm-body leading-relaxed mb-5 italic">"{text}"</p>
                <div className="nm-divider mb-4"/>
                <div className="font-semibold text-sm" style={{ color:'var(--nm-navy)' }}>{name}</div>
                <div className="text-xs mt-0.5" style={{ color:'var(--nm-muted)' }}>{loc} · {service}</div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/reviews" className="nm-btn-primary">Read All Reviews →</Link>
            <a href="https://www.google.com/search?q=corwin+pool+service+las+vegas"
              target="_blank" rel="noopener noreferrer" className="nm-btn-secondary">
              ⭐ Leave a Google Review
            </a>
          </div>
        </div>
      </section>

      {/* ── SERVICE AREA ───────────────────────────────────── */}
      <section style={{ background:'var(--nm-bg)' }} className="section-pad">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once:true }}>
              <p className="nm-label mb-3">Where We Serve</p>
              <h2 className="nm-heading-xl mb-5">All of Las Vegas & Henderson</h2>
              <p className="nm-body mb-6">From Summerlin to Henderson, Centennial to Southern Highlands — if you have a pool in the Las Vegas Valley, we've got you covered.</p>
              <div className="grid grid-cols-2 gap-2 mb-8">
                {['Summerlin','Centennial Hills','Henderson','Green Valley',
                  'Southern Highlands','Aliante','North Las Vegas','Spring Valley'].map(a => (
                  <div key={a} className="flex items-center gap-2 text-sm nm-body">
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background:'var(--nm-teal)' }}/>
                    {a}
                  </div>
                ))}
              </div>
              <Link to="/contact" className="nm-btn-secondary">Check If We Serve You →</Link>
            </motion.div>

            <motion.div initial={{ opacity:0, scale:0.97 }} whileInView={{ opacity:1, scale:1 }}
              viewport={{ once:true }}>
              <div className="nm-card-lg overflow-hidden">
                <div className="p-4 pb-0">
                  <p className="font-semibold text-sm" style={{ color:'var(--nm-muted)' }}>📍 Las Vegas Valley Service Area</p>
                </div>
                <div className="h-64 m-4 rounded-xl overflow-hidden" style={{ boxShadow:'var(--shadow-inset-sm)' }}>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d219697.14509837!2d-115.37120!3d36.17497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80beb782a4f57dd1%3A0x3accd5e6d5b379a3!2sLas%20Vegas%2C%20NV!5e0!3m2!1sen!2sus!4v1620000000000"
                    className="w-full h-full border-0" allowFullScreen="" loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade" title="Service Area"/>
                </div>
                <div className="px-4 pb-4">
                  <p className="text-xs text-center font-medium" style={{ color:'var(--nm-muted)' }}>
                    10917 Salford Drive, Las Vegas NV 89144
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────── */}
      <section style={{ background:'var(--nm-blue)' }} className="section-pad">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once:true }}>
            <p className="text-xs font-semibold tracking-widest2 uppercase mb-4"
              style={{ color:'rgba(255,255,255,0.6)' }}>Don't Let Your Pool Go Green</p>
            <h2 className="font-extrabold text-5xl md:text-6xl text-white mb-4" style={{ lineHeight:1.1 }}>
              Ready for Crystal Clear?
            </h2>
            <p className="text-lg mb-10" style={{ color:'rgba(255,255,255,0.75)' }}>
              Join 500+ Las Vegas families who trust Corwin Pool Service every week.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/book"
                className="inline-flex items-center justify-center gap-2 text-base font-semibold px-9 py-4 rounded-xl text-white transition-all hover:opacity-90"
                style={{ background:'rgba(255,255,255,0.15)', boxShadow:'0 4px 16px rgba(0,0,0,0.15)', backdropFilter:'blur(4px)' }}>
                Book Your First Service →
              </Link>
              <a href="tel:7024602406"
                className="inline-flex items-center justify-center gap-2 text-base font-semibold px-9 py-4 rounded-xl transition-all hover:opacity-90"
                style={{ background:'rgba(255,255,255,0.15)', color:'white', boxShadow:'0 4px 16px rgba(0,0,0,0.15)' }}>
                📞 702-460-2406
              </a>
            </div>
            <p className="mt-6 text-sm" style={{ color:'rgba(255,255,255,0.55)' }}>
              Free estimate · No contracts · Cancel anytime
            </p>
          </motion.div>
        </div>
      </section>

    </div>
  )
}
