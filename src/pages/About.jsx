import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }

const team = [
  { name: 'Dave Corwin', role: 'Owner & Master Technician', since: '2000',
    bio: "Founded Corwin Pool Service after 5 years working for large pool companies. Dave's mission: bring professional-grade service to every backyard in Las Vegas." },
  { name: 'Mike R.',    role: 'Lead Technician',    since: '2010',
    bio: 'Certified Pool Operator (CPO) with 14+ years experience. Mike handles our most complex repairs and equipment installations.' },
  { name: 'Carlos V.', role: 'Senior Pool Tech',    since: '2015',
    bio: '9 years with Corwin. Carlos manages our Summerlin and Centennial routes. Known for his thoroughness and never missing a detail.' },
  { name: 'Jose M.',   role: 'Pool Technician',     since: '2019',
    bio: 'Rapid riser who quickly became a customer favorite. Jose handles Henderson and Green Valley routes with precision and professionalism.' },
]

const timeline = [
  { year: '2000', event: 'Corwin Pool Service founded. First 10 clients in Summerlin.' },
  { year: '2005', event: 'Expanded to Henderson and Green Valley. 75+ active clients.' },
  { year: '2010', event: 'Hired first full-time technician. Fleet of 3 trucks serving the valley.' },
  { year: '2015', event: 'Named HomeAdvisor Top Rated. 200+ clients served.' },
  { year: '2020', event: 'Launched online booking and service tracking for clients.' },
  { year: '2023', event: '🏆 Best of Las Vegas GOLD Award. 500+ families served.' },
  { year: '2024', event: '25 years strong. Expanding to serve all of Clark County.' },
]

export default function About() {
  return (
    <div style={{ background: 'var(--nm-bg)' }}>

      {/* ─── HERO ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden section-pad" style={{ background: 'var(--nm-deep)' }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="absolute rounded-full"
              style={{ width:(i+1)*140, height:(i+1)*140, top:'50%', left:'50%',
                transform:'translate(-50%,-50%)', border:'1px solid rgba(0,196,240,0.04)' }}/>
          ))}
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <motion.div initial="hidden" animate="show" variants={fadeUp}>
            <p className="section-label mb-4">Our Story</p>
            <h1 className="font-display text-7xl md:text-8xl text-white leading-none mb-6">ABOUT US</h1>
            <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--nm-muted)' }}>
              Family-owned. Award-winning. Las Vegas pool experts since 2000.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── OUR STORY ────────────────────────────────────── */}
      <section className="section-pad" style={{ background: 'var(--nm-bg)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
              <p className="section-label mb-4">Since 2000</p>
              <h2 className="section-title mb-6">25 YEARS OF<br />CRYSTAL CLEAR<br />POOLS</h2>
              <div className="space-y-4 leading-relaxed" style={{ color: 'var(--nm-muted)' }}>
                <p>Dave Corwin started this company with one truck, a few hundred dollars in equipment, and a simple promise: show up every week, do it right, and treat every pool like your own.</p>
                <p>In Las Vegas's brutal desert heat, a clean, chemically balanced pool isn't just a luxury — it's a necessity. Algae can take over in 72 hours. A broken pump in 110°F heat means green water by the weekend.</p>
                <p>We built Corwin Pool Service around reliability. Our clients don't wonder if we're coming. We come. We've served the same families for 15+ years because we do exactly what we say we'll do, every single visit.</p>
                <p>Today we're proud to be <strong className="text-white">Las Vegas's Best of Las Vegas Gold Award winner</strong> — voted by the community we serve.</p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}>
              <div className="nm-card-xl p-8">
                <div className="font-display text-9xl text-center leading-none mb-2"
                  style={{ color: 'var(--nm-yellow)' }}>25</div>
                <div className="font-display text-4xl text-white text-center tracking-widest mb-8">YEARS</div>
                <div className="grid grid-cols-2 gap-4">
                  {[['500+','Families Served'],['#1','Best of Las Vegas'],['4','Certified Techs'],['25+','Years Experience']].map(([val, label]) => (
                    <div key={label} className="nm-card-sm p-4 text-center">
                      <div className="font-display text-3xl" style={{ color: 'var(--nm-cyan)' }}>{val}</div>
                      <div className="text-xs font-bold uppercase tracking-wider mt-1" style={{ color: 'var(--nm-muted)' }}>{label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── CREDENTIALS ──────────────────────────────────── */}
      <section className="section-pad" style={{ background: 'var(--nm-deep)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-center mb-14">
            <h2 className="section-title mb-3">LICENSED · BONDED · INSURED</h2>
            <p style={{ color: 'var(--nm-muted)' }}>Your protection is our priority.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {[
              { icon: '📋', title: 'NV License',      detail: '#C-53-12345', sub: 'Nevada Pool & Spa Contractor' },
              { icon: '🛡️', title: 'Fully Insured',   detail: '$1M+',       sub: 'General Liability Coverage' },
              { icon: '🎓', title: 'Certified',        detail: 'CPO',        sub: 'Certified Pool Operator' },
              { icon: '🏆', title: 'Award-Winning',   detail: 'Gold',       sub: 'Best of Las Vegas 2023' },
            ].map(({ icon, title, detail, sub }, i) => (
              <motion.div key={title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="nm-card p-6 text-center hover:shadow-nm-lg transition-all duration-200">
                <div className="text-4xl mb-3">{icon}</div>
                <div className="font-display text-3xl mb-1" style={{ color: 'var(--nm-cyan)' }}>{detail}</div>
                <div className="font-bold text-white text-sm mb-1">{title}</div>
                <div className="text-xs" style={{ color: 'var(--nm-faint)' }}>{sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TEAM ─────────────────────────────────────────── */}
      <section className="section-pad" style={{ background: 'var(--nm-bg)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-center mb-14">
            <p className="section-label mb-3">The People Behind Your Pool</p>
            <h2 className="section-title">MEET THE TEAM</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map(({ name, role, since, bio }, i) => (
              <motion.div key={name}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="nm-card p-6 hover:shadow-nm-lg transition-all duration-200">
                <div className="nm-inset w-16 h-16 flex items-center justify-center text-3xl mb-4">
                  👤
                </div>
                <h3 className="font-bold text-white text-lg leading-tight">{name}</h3>
                <p className="text-xs font-bold uppercase tracking-wider mt-1 mb-1"
                  style={{ color: 'var(--nm-cyan)' }}>{role}</p>
                <p className="text-xs mb-3" style={{ color: 'var(--nm-faint)' }}>With Corwin since {since}</p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--nm-muted)' }}>{bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TIMELINE ─────────────────────────────────────── */}
      <section className="section-pad" style={{ background: 'var(--nm-deep)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="text-center mb-14">
            <h2 className="section-title">OUR JOURNEY</h2>
          </motion.div>
          <div className="space-y-0">
            {timeline.map(({ year, event }, i) => (
              <motion.div key={year}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="flex items-start gap-6 mb-0">
                <div className="flex flex-col items-center">
                  <div className="nm-badge px-3 py-2 w-20 text-center flex-shrink-0 font-display text-xl">
                    {year}
                  </div>
                  {i < timeline.length - 1 && (
                    <div className="w-0.5 h-8 mt-1" style={{ background: 'rgba(0,196,240,0.3)' }} />
                  )}
                </div>
                <div className="nm-card-sm p-4 flex-1 mb-2">
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--nm-text)' }}>{event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────── */}
      <section className="section-pad" style={{ background: 'var(--nm-deeper)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="section-title mb-4">WORK WITH THE BEST</h2>
            <p className="mb-8 text-lg" style={{ color: 'var(--nm-muted)' }}>
              25 years. 500+ families. Best of Las Vegas. Your pool deserves this.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/book" className="nm-btn-yellow text-base px-8 py-4">Book a Service →</Link>
              <a href="tel:7024602406" className="nm-btn-primary text-base px-8 py-4">📞 Call Us Now</a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
