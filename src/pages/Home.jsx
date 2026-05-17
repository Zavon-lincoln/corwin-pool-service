import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import LeadForm from '../components/LeadForm'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 }
}

// Pool wave SVG illustration
const PoolWave = () => (
  <svg viewBox="0 0 1200 200" xmlns="http://www.w3.org/2000/svg" className="w-full">
    <defs>
      <linearGradient id="poolGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#00C4F0" stopOpacity="0.8"/>
        <stop offset="100%" stopColor="#004E98" stopOpacity="0.9"/>
      </linearGradient>
    </defs>
    <path d="M0,80 C150,20 350,160 600,80 C850,0 1050,160 1200,80 L1200,200 L0,200 Z" fill="url(#poolGrad)"/>
    <path d="M0,120 C200,60 400,180 600,120 C800,60 1000,180 1200,120 L1200,200 L0,200 Z" fill="#004E98" opacity="0.6"/>
  </svg>
)

const services = [
  { icon: '🌊', title: 'Weekly Maintenance', desc: 'Chemicals, brushing, vacuuming, filter checks — every week, on schedule.' },
  { icon: '🦠', title: 'Green Pool Rescue', desc: 'Algae gone in 24-72 hrs. Guaranteed crystal clear or we come back free.' },
  { icon: '🔧', title: 'Equipment Repair', desc: 'Pumps, heaters, filters, automation — we fix it fast.' },
  { icon: '🧹', title: 'Deep Clean', desc: 'One-time or seasonal. Before parties, after move-ins, or just because.' },
  { icon: '🔍', title: 'Leak Detection', desc: 'Losing water? We find it and fix it — same-day diagnosis.' },
  { icon: '💎', title: 'Tile & Surface Care', desc: 'Calcium buildup, acid washing, tile scrubbing. Restore your pool\'s shine.' },
]

const testimonials = [
  {
    name: 'Marcus T.',
    location: 'Summerlin',
    stars: 5,
    text: '"Corwin has been cleaning my pool for 4 years. Never missed a visit, always leaves it immaculate. My neighbor hired them after seeing how great mine looks."',
    service: 'Weekly Maintenance',
  },
  {
    name: 'Diane R.',
    location: 'Henderson',
    stars: 5,
    text: '"Green pool emergency — they showed up same day and had it crystal clear in 48 hours. I\'ve been with them ever since. Best pool service in Vegas, period."',
    service: 'Green Pool Rescue',
  },
  {
    name: 'Tom & Lisa W.',
    location: 'Centennial Hills',
    stars: 5,
    text: '"Fast, professional, and actually shows up when they say they will. We had three other companies ghost us. Corwin has been reliable for 2+ years straight."',
    service: 'Weekly Maintenance',
  },
]

const stats = [
  { value: '25+', label: 'Years in Business' },
  { value: '500+', label: 'Happy Customers' },
  { value: '5★', label: 'Avg Review Rating' },
  { value: '#1', label: 'Best of Las Vegas' },
]

export default function Home() {
  return (
    <div>
      {/* ─── HERO ─── */}
      <section className="relative bg-brand-blue overflow-hidden border-b-3 border-brand-black">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="absolute rounded-full border border-white"
              style={{ width: (i + 1) * 40, height: (i + 1) * 40, top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-0 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Copy */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              transition={{ duration: 0.5 }}
              className="pb-16 lg:pb-20"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-brand-yellow border-3 border-brand-black shadow-neo px-4 py-2 mb-6">
                <span className="text-xs font-black uppercase tracking-wider text-brand-black">🏆 Best of Las Vegas Gold Winner 2023</span>
              </div>

              <h1 className="font-display text-6xl md:text-7xl lg:text-8xl text-white leading-none mb-4">
                VEGAS'S #1<br />
                <span className="text-brand-cyan">POOL</span><br />
                SERVICE
              </h1>

              <p className="text-lg text-blue-200 mb-8 max-w-md leading-relaxed">
                Crystal-clear water. Every week. Guaranteed. Corwin Pool Service has kept Las Vegas pools spotless since <strong className="text-white">2000</strong>.
              </p>

              {/* Primary CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link to="/book" className="btn-primary text-base px-8 py-4 justify-center sm:justify-start">
                  Book Online Now →
                </Link>
                <a href="tel:7024602406" className="btn-secondary text-base px-8 py-4 justify-center sm:justify-start">
                  📞 702-460-2406
                </a>
              </div>

              {/* Trust signals */}
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-white/10 border border-white/20 px-3 py-2">
                  <span className="text-brand-cyan text-lg">✓</span>
                  <span className="text-sm text-white font-semibold">Licensed & Insured</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 border border-white/20 px-3 py-2">
                  <span className="text-brand-cyan text-lg">✓</span>
                  <span className="text-sm text-white font-semibold">2-Hr Response</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 border border-white/20 px-3 py-2">
                  <span className="text-brand-cyan text-lg">✓</span>
                  <span className="text-sm text-white font-semibold">Free Estimate</span>
                </div>
              </div>
            </motion.div>

            {/* Right: Lead form */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="pb-8 lg:pb-16"
            >
              <LeadForm dark />
            </motion.div>
          </div>
        </div>

        {/* Wave bottom */}
        <div className="relative -mt-1">
          <PoolWave />
        </div>
      </section>

      {/* ─── TICKER ─── */}
      <div className="bg-brand-yellow border-y-3 border-brand-black py-3 overflow-hidden">
        <div className="ticker-animate flex whitespace-nowrap">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="flex items-center">
              {['⭐ Weekly Maintenance', '🏆 Best of Las Vegas 2023', '🌊 Green Pool Rescue', '🔧 Same-Day Repairs', '✅ 500+ Happy Clients', '💧 Serving Vegas Since 2000', '📞 Free Estimates'].map(item => (
                <span key={item} className="mx-8 text-sm font-black uppercase tracking-widest text-brand-black">{item}</span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ─── STATS ─── */}
      <section className="bg-brand-cream border-b-3 border-brand-black section-pad">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map(({ value, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="neo-card p-6 text-center"
              >
                <div className="font-display text-5xl text-brand-blue mb-1">{value}</div>
                <div className="text-xs font-bold uppercase tracking-wider text-gray-500">{label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section className="bg-brand-cream section-pad border-b-3 border-brand-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-14"
          >
            <p className="section-label mb-3">What We Do</p>
            <h2 className="section-title">EVERY SERVICE<br />YOUR POOL NEEDS</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(({ icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="neo-card p-6 hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-neo-lg transition-all cursor-default"
              >
                <div className="text-4xl mb-4">{icon}</div>
                <h3 className="font-display text-2xl text-brand-blue mb-2">{title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/services" className="btn-blue text-sm px-8 py-4">
              See All Services & Pricing →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── WHY CHOOSE US ─── */}
      <section className="bg-brand-blue section-pad border-b-3 border-brand-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
              <p className="section-label mb-3">Why Corwin</p>
              <h2 className="section-title-white mb-6">THE VEGAS POOL<br />EXPERTS SINCE<br />2000</h2>
              <p className="text-blue-200 leading-relaxed mb-8">
                In Las Vegas's 115°F summers, your pool isn't a luxury — it's a necessity.
                We've been keeping Vegas pools crystal clear for over 25 years, earning trust one backyard at a time.
              </p>

              <div className="space-y-4">
                {[
                  ['🏆', 'Award-Winning Service', 'Best of Las Vegas Gold Winner. Our customers vote for us year after year.'],
                  ['⚡', 'Same-Day Response', 'Green pool emergency? We\'re there fast. Most emergencies handled same or next day.'],
                  ['🔐', 'Licensed, Bonded & Insured', 'NV License #C-53. Full liability coverage. You\'re protected.'],
                  ['📅', 'Never Misses a Visit', 'We show up every single week — rain, heat, or holiday. Consistent, reliable, professional.'],
                ].map(([icon, title, desc]) => (
                  <div key={title} className="flex items-start gap-4 p-4 bg-white/10 border border-white/20">
                    <span className="text-2xl flex-shrink-0">{icon}</span>
                    <div>
                      <div className="font-bold text-white text-sm">{title}</div>
                      <div className="text-blue-200 text-xs mt-0.5 leading-relaxed">{desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex gap-4">
                <Link to="/about" className="btn-primary">Learn Our Story →</Link>
                <a href="tel:7024602406" className="btn-secondary">Call Now</a>
              </div>
            </motion.div>

            {/* Pool illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="neo-card-yellow p-8 relative">
                <div className="font-display text-8xl text-brand-blue text-center leading-none mb-4">25</div>
                <div className="font-display text-3xl text-brand-blue text-center mb-6 tracking-widest">YEARS STRONG</div>

                {/* Pool diagram */}
                <div className="bg-brand-blue border-3 border-brand-black p-6 relative overflow-hidden">
                  <svg viewBox="0 0 400 200" className="w-full">
                    {/* Pool body */}
                    <rect x="20" y="40" width="360" height="140" rx="20" fill="#00C4F0" opacity="0.3"/>
                    <rect x="20" y="40" width="360" height="140" rx="20" fill="none" stroke="#00C4F0" strokeWidth="4"/>
                    {/* Water lines */}
                    {[60, 90, 120, 150].map(y => (
                      <path key={y} d={`M40,${y} Q100,${y-15} 160,${y} Q220,${y+15} 280,${y} Q340,${y-15} 380,${y}`}
                        stroke="#00C4F0" strokeWidth="2" fill="none" opacity="0.6"/>
                    ))}
                    {/* Sparkle stars */}
                    {[[60,55],[200,70],[320,60],[140,140],[280,130]].map(([x, y], i) => (
                      <text key={i} x={x} y={y} fill="#FFE156" fontSize="14" textAnchor="middle">✦</text>
                    ))}
                    {/* "CRYSTAL CLEAR" text */}
                    <text x="200" y="175" fill="white" fontSize="18" fontWeight="bold" textAnchor="middle" fontFamily="Arial" letterSpacing="4">CRYSTAL CLEAR</text>
                  </svg>
                </div>

                <div className="grid grid-cols-3 gap-3 mt-4">
                  {['Mon', 'Wed', 'Fri'].map(d => (
                    <div key={d} className="bg-brand-blue border-3 border-brand-black p-3 text-center">
                      <div className="text-xs font-bold text-brand-cyan">{d}</div>
                      <div className="text-white text-lg">✓</div>
                    </div>
                  ))}
                </div>
                <p className="text-center text-xs font-bold text-brand-blue mt-3">EVERY WEEK, ON SCHEDULE</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── BEFORE / AFTER ─── */}
      <section className="bg-brand-cream section-pad border-b-3 border-brand-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <p className="section-label mb-3">Proof of Work</p>
            <h2 className="section-title">BEFORE & AFTER</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { before: '#2d5a27', after: '#00C4F0', label: 'Severe Algae → Crystal Clear', time: '48 Hours' },
              { before: '#8B6914', after: '#00C4F0', label: 'Neglected Pool → Sparkling', time: '72 Hours' },
              { before: '#1a3a1a', after: '#0099cc', label: 'Black Algae → Pristine', time: '5 Days' },
            ].map(({ before, after, label, time }, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className="neo-card overflow-hidden">
                  <div className="grid grid-cols-2">
                    <div style={{ background: before }} className="h-40 flex items-center justify-center border-r-3 border-brand-black">
                      <span className="text-white font-bold text-xs bg-black/50 px-2 py-1">BEFORE</span>
                    </div>
                    <div style={{ background: after }} className="h-40 flex items-center justify-center relative overflow-hidden">
                      <svg viewBox="0 0 200 160" className="absolute inset-0 w-full h-full opacity-50">
                        {[30, 60, 90, 120].map(y => (
                          <path key={y} d={`M0,${y} Q50,${y-15} 100,${y} Q150,${y+15} 200,${y}`} stroke="white" strokeWidth="2" fill="none"/>
                        ))}
                      </svg>
                      <span className="text-white font-bold text-xs bg-black/50 px-2 py-1 relative z-10">AFTER</span>
                    </div>
                  </div>
                  <div className="p-4 border-t-3 border-brand-black">
                    <p className="font-bold text-sm text-brand-black">{label}</p>
                    <p className="text-xs text-brand-cyan font-bold mt-1">⏱ {time}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/book" className="btn-primary-lg">Get Your Pool Looking Like This →</Link>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="bg-brand-black section-pad border-b-3 border-brand-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <p className="text-brand-cyan text-xs font-bold tracking-widest2 uppercase mb-3">What Clients Say</p>
            <h2 className="font-display text-5xl md:text-6xl text-white leading-none">500+ HAPPY<br />LAS VEGAS POOLS</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(({ name, location, stars, text, service }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white border-3 border-brand-black p-6 shadow-neo hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-neo-lg transition-all"
              >
                <div className="flex text-yellow-400 mb-3">
                  {Array.from({ length: stars }).map((_, j) => <span key={j} className="text-xl">★</span>)}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-4 italic">{text}</p>
                <div className="border-t-3 border-brand-black pt-3">
                  <div className="font-bold text-brand-black text-sm">{name}</div>
                  <div className="text-xs text-gray-500">{location} · {service}</div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/reviews" className="btn-primary">Read All Reviews →</Link>
            <a
              href="https://www.google.com/search?q=corwin+pool+service+las+vegas"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              ⭐ Leave a Google Review
            </a>
          </div>
        </div>
      </section>

      {/* ─── SERVICE AREA ─── */}
      <section className="bg-brand-cream section-pad border-b-3 border-brand-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
              <p className="section-label mb-3">Where We Serve</p>
              <h2 className="section-title mb-6">ALL OF LAS VEGAS<br />& HENDERSON</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                From Summerlin to Henderson, Centennial to Southern Highlands — if you have a pool in the Las Vegas Valley, we've got you covered.
              </p>
              <div className="grid grid-cols-2 gap-2 mb-8">
                {['Summerlin', 'Centennial Hills', 'Henderson', 'Green Valley', 'Southern Highlands', 'Aliante', 'North Las Vegas', 'Spring Valley'].map(area => (
                  <div key={area} className="flex items-center gap-2 text-sm font-semibold">
                    <span className="w-2 h-2 bg-brand-cyan border border-brand-black flex-shrink-0"/>
                    {area}
                  </div>
                ))}
              </div>
              <Link to="/contact" className="btn-blue">Check If We Serve Your Area →</Link>
            </motion.div>

            {/* Map placeholder */}
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
              <div className="neo-card overflow-hidden">
                <div className="bg-brand-blue p-4 border-b-3 border-brand-black">
                  <p className="text-white font-bold text-sm uppercase tracking-wider">Service Area — Las Vegas Valley</p>
                </div>
                <div className="bg-gray-100 h-72 flex items-center justify-center relative">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d219697.14509837!2d-115.37120!3d36.17497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80beb782a4f57dd1%3A0x3accd5e6d5b379a3!2sLas%20Vegas%2C%20NV!5e0!3m2!1sen!2sus!4v1620000000000"
                    className="w-full h-full border-0"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Corwin Pool Service Area"
                  />
                </div>
                <div className="p-4 bg-brand-yellow border-t-3 border-brand-black">
                  <p className="text-xs font-bold text-brand-black text-center">📍 10917 Salford Drive, Las Vegas NV 89144</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── BOTTOM CTA BANNER ─── */}
      <section className="bg-brand-yellow border-b-3 border-brand-black section-pad">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <p className="text-brand-black/60 text-xs font-bold tracking-widest2 uppercase mb-4">Don't Let Your Pool Go Green</p>
            <h2 className="font-display text-6xl md:text-7xl text-brand-black mb-4 leading-none">
              READY FOR<br />CRYSTAL CLEAR?
            </h2>
            <p className="text-brand-black/70 mb-10 text-lg">
              Join 500+ Las Vegas families who trust Corwin Pool Service every week.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/book" className="btn-blue text-lg px-10 py-5">
                Book Your First Service →
              </Link>
              <a href="tel:7024602406" className="btn-secondary text-lg px-10 py-5">
                📞 702-460-2406
              </a>
            </div>
            <p className="mt-6 text-sm text-brand-black/60 font-semibold">
              Free estimate · No contracts · Cancel anytime
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
