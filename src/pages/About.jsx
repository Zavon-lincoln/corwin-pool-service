import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const fadeUp = { hidden:{ opacity:0, y:24 }, show:{ opacity:1, y:0 } }

const team = [
  { name:'Dave Corwin', role:'Owner & Master Technician', since:'2000', bio:"Founded Corwin Pool Service with one truck and a simple promise: show up every week, do it right." },
  { name:'Mike R.',     role:'Lead Technician',    since:'2010', bio:'Certified Pool Operator (CPO). 14+ years experience. Handles our most complex repairs.' },
  { name:'Carlos V.',   role:'Senior Pool Tech',   since:'2015', bio:'Manages Summerlin and Centennial routes. Known for thoroughness and never missing a detail.' },
  { name:'Jose M.',     role:'Pool Technician',    since:'2019', bio:'Henderson and Green Valley routes. Quickly became a customer favorite for his precision.' },
]

const timeline = [
  { year:'2000', event:'Corwin Pool Service founded. First 10 clients in Summerlin.' },
  { year:'2005', event:'Expanded to Henderson and Green Valley. 75+ active clients.' },
  { year:'2010', event:'Hired first full-time technician. Fleet of 3 trucks.' },
  { year:'2015', event:'Named HomeAdvisor Top Rated. 200+ clients served.' },
  { year:'2020', event:'Launched online booking and service tracking.' },
  { year:'2023', event:'🏆 Best of Las Vegas GOLD Award. 500+ families served.' },
  { year:'2024', event:'25 years strong. Expanding across all of Clark County.' },
]

export default function About() {
  return (
    <div style={{ background:'var(--nm-bg)' }}>

      <section style={{ background:'var(--nm-alt)' }} className="section-pad">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div variants={fadeUp} initial="hidden" animate="show">
            <p className="nm-label mb-4">Our Story</p>
            <h1 className="nm-heading text-5xl md:text-6xl mb-5">About Us</h1>
            <p className="nm-body text-lg">Family-owned. Award-winning. Las Vegas pool experts since 2000.</p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section style={{ background:'var(--nm-bg)' }} className="section-pad">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once:true }}>
              <p className="nm-label mb-4">Since 2000</p>
              <h2 className="nm-heading-xl mb-6">25 Years of Crystal Clear Pools</h2>
              <div className="space-y-4 nm-body">
                <p>Dave Corwin started this company with one truck, a few hundred dollars in equipment, and a simple promise: show up every week, do it right, and treat every pool like your own.</p>
                <p>In Las Vegas's brutal desert heat, a clean, chemically balanced pool isn't a luxury — it's a necessity. Algae can take over in 72 hours. A broken pump in 110°F heat means green water by the weekend.</p>
                <p>We built Corwin around reliability. Our clients don't wonder if we're coming. We come. We've served the same families for 15+ years because we do exactly what we say, every visit.</p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity:0, scale:0.97 }} whileInView={{ opacity:1, scale:1 }} viewport={{ once:true }}>
              <div className="nm-card-xl p-8 text-center nm-float">
                <div className="text-8xl font-extrabold mb-1" style={{ color:'var(--nm-blue)' }}>25</div>
                <div className="font-medium text-lg tracking-widest uppercase mb-8" style={{ color:'var(--nm-muted)' }}>Years</div>
                <div className="grid grid-cols-2 gap-4">
                  {[['500+','Families Served'],['#1','Best of Las Vegas'],['4','Certified Techs'],['25+','Yrs Experience']].map(([v,l]) => (
                    <div key={l} className="nm-card-sm p-4 text-center">
                      <div className="text-2xl font-bold" style={{ color:'var(--nm-blue)' }}>{v}</div>
                      <div className="text-xs mt-1 font-medium uppercase tracking-wide" style={{ color:'var(--nm-muted)' }}>{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section style={{ background:'var(--nm-alt)' }} className="section-pad">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="nm-heading-lg">Licensed · Bonded · Insured</h2>
            <p className="nm-muted mt-2">Your protection is our priority.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {[['📋','NV License','#C-53-12345','Nevada Pool & Spa Contractor'],['🛡️','Fully Insured','$1M+','General Liability Coverage'],['🎓','Certified','CPO','Certified Pool Operator'],['🏆','Award-Winning','Gold','Best of Las Vegas 2023']].map(([icon,title,detail,sub],i) => (
              <motion.div key={title} initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*0.1 }}
                className="nm-card p-6 text-center hover:shadow-nm-lg transition-all duration-300">
                <div className="nm-icon-lg mx-auto mb-3 text-2xl">{icon}</div>
                <div className="text-2xl font-bold mb-1" style={{ color:'var(--nm-blue)' }}>{detail}</div>
                <div className="font-semibold text-sm mb-1" style={{ color:'var(--nm-navy)' }}>{title}</div>
                <div className="text-xs" style={{ color:'var(--nm-muted)' }}>{sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{ background:'var(--nm-bg)' }} className="section-pad">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="nm-label mb-3">The People Behind Your Pool</p>
            <h2 className="nm-heading-lg">Meet the Team</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map(({ name, role, since, bio }, i) => (
              <motion.div key={name} initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*0.1 }}
                className="nm-card p-6 hover:shadow-nm-lg transition-all duration-300">
                <div className="nm-icon-lg mb-4 text-2xl">👤</div>
                <div className="font-semibold" style={{ color:'var(--nm-navy)' }}>{name}</div>
                <div className="text-xs font-semibold mt-0.5 mb-1" style={{ color:'var(--nm-teal)' }}>{role}</div>
                <div className="text-xs mb-3" style={{ color:'var(--nm-faint)' }}>Since {since}</div>
                <p className="text-sm nm-body">{bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section style={{ background:'var(--nm-alt)' }} className="section-pad">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12"><h2 className="nm-heading-lg">Our Journey</h2></div>
          <div>
            {timeline.map(({ year, event }, i) => (
              <motion.div key={year} initial={{ opacity:0, x:-20 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ delay:i*0.08 }}
                className="flex items-start gap-5 mb-2">
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="nm-badge px-3 py-1.5 font-bold w-16 text-center text-xs">{year}</div>
                  {i < timeline.length-1 && <div className="w-px h-6 mt-1" style={{ background:'var(--nm-dark)' }}/>}
                </div>
                <div className="nm-card-sm p-4 flex-1 mb-1">
                  <p className="text-sm nm-body">{event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background:'var(--nm-blue)' }} className="section-pad">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once:true }}>
            <h2 className="font-extrabold text-4xl md:text-5xl text-white mb-4">Work With the Best</h2>
            <p className="text-lg mb-8" style={{ color:'rgba(255,255,255,0.75)' }}>25 years. 500+ families. Best of Las Vegas.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/book" className="inline-flex items-center justify-center gap-2 text-base font-semibold px-8 py-4 rounded-xl text-white transition-all hover:opacity-90"
                style={{ background:'rgba(255,255,255,0.15)', boxShadow:'0 4px 16px rgba(0,0,0,0.15)' }}>
                Book a Service →
              </Link>
              <a href="tel:7024602406" className="inline-flex items-center justify-center gap-2 text-base font-semibold px-8 py-4 rounded-xl text-white transition-all hover:opacity-90"
                style={{ background:'rgba(255,255,255,0.15)', boxShadow:'0 4px 16px rgba(0,0,0,0.15)' }}>
                📞 Call Us Now
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
