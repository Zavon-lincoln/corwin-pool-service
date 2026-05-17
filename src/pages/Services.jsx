import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import LeadForm from '../components/LeadForm'

const fadeUp = { hidden:{ opacity:0, y:24 }, show:{ opacity:1, y:0 } }

const services = [
  { icon:'🌊', title:'Weekly Pool Maintenance', tagline:'Your pool, perfect every single week.', price:'From $120/mo', featured:true,
    includes:['Chemical testing & balancing','Brushing walls, steps & waterline','Skimming surface debris','Vacuuming floor','Cleaning skimmer & pump baskets','Filter backwash & inspection','Equipment visual check','Service report after every visit'], cta:'Start Weekly Service' },
  { icon:'📅', title:'Bi-Weekly Maintenance', tagline:'Every two weeks. Still crystal clear.', price:'From $80/visit',
    includes:['Full chemical test & balance','Brush & vacuum','Basket cleaning','Filter inspection','Service report'], cta:'Get a Quote' },
  { icon:'🦠', title:'Green Pool Rescue', tagline:'Algae gone. Guaranteed.', price:'From $250',
    includes:['Algae severity assessment','Shock treatment (multi-stage)','Algaecide application','Full brush & vacuum','Filter deep clean','Chemical rebalance','Follow-up within 72 hrs','100% satisfaction guarantee'], cta:'Fix My Green Pool' },
  { icon:'🧹', title:'One-Time Deep Clean', tagline:'Before a party, after move-in, or just because.', price:'From $175',
    includes:['Complete chemical rebalance','Hand brushing all surfaces','Manual vacuuming','Tile line scrubbing','Equipment flush & clean','Debris removal'], cta:'Book a Deep Clean' },
  { icon:'🔧', title:'Equipment Repair', tagline:'Fast diagnosis. Reliable fixes.', price:'Free diagnosis',
    includes:['Pool pumps & motors','Heaters (gas & electric)','Filters (sand, cartridge, DE)','Lights & electrical','Automation systems','Salt chlorinators','Variable speed installs','Same-day emergency available'], cta:'Schedule a Repair' },
  { icon:'🔍', title:'Leak Detection', tagline:'We find it. We fix it.', price:'From $150',
    includes:['Bucket test & pressure testing','Visual equipment inspection','Underground leak detection','Plumbing inspection','Detailed written report','Repair estimate included'], cta:'Book Leak Detection' },
  { icon:'💎', title:'Tile & Surface Cleaning', tagline:'Remove calcium. Restore the shine.', price:'From $200',
    includes:['Calcium / scale removal','Waterline tile scrubbing','Acid washing (severe cases)','Plaster & pebble surface care','Grout cleaning'], cta:'Get Tiles Cleaned' },
  { icon:'☀️', title:'Pool Opening / Closing', tagline:'Get summer-ready in one visit.', price:'From $200',
    includes:['Equipment start-up & inspection','Full chemical balance','Brush & vacuum','Filter clean & startup','Heater check'], cta:'Schedule Opening' },
]

export default function Services() {
  return (
    <div style={{ background:'var(--nm-bg)' }}>

      {/* ── HERO */}
      <section style={{ background:'var(--nm-alt)' }} className="section-pad">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div variants={fadeUp} initial="hidden" animate="show">
            <p className="nm-label mb-4">What We Offer</p>
            <h1 className="nm-heading text-5xl md:text-6xl mb-5">Our Services</h1>
            <p className="nm-body text-lg max-w-xl mx-auto">Every service your pool will ever need — from weekly maintenance to emergency repairs. No contracts. Transparent pricing.</p>
          </motion.div>
        </div>
      </section>

      {/* ── GRID */}
      <section style={{ background:'var(--nm-bg)' }} className="section-pad">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(({ icon, title, tagline, price, includes, cta, featured }, i) => (
              <motion.div key={title}
                initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }} transition={{ delay:i*0.06 }}
                className={`relative p-6 transition-all duration-300 hover:shadow-nm-lg ${featured ? 'nm-card-lg' : 'nm-card'}`}>
                {featured && (
                  <span className="nm-badge-teal absolute -top-3 left-5">⭐ Most Popular</span>
                )}
                <div className="nm-icon text-xl mb-4">{icon}</div>
                <h3 className="font-semibold text-lg mb-1" style={{ color:'var(--nm-navy)' }}>{title}</h3>
                <p className="text-xs italic mb-4" style={{ color:'var(--nm-muted)' }}>{tagline}</p>

                <div className="nm-inset-sm px-3 py-1.5 inline-block mb-5">
                  <span className="font-bold text-sm" style={{ color:'var(--nm-blue)' }}>{price}</span>
                </div>

                <ul className="space-y-1.5 mb-6">
                  {includes.map(item => (
                    <li key={item} className="flex items-start gap-2 text-sm nm-body">
                      <span className="flex-shrink-0 mt-0.5 font-semibold" style={{ color:'var(--nm-teal)' }}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link to="/book" className="nm-btn-primary w-full text-xs py-2.5">{cta} →</Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ */}
      <section style={{ background:'var(--nm-alt)' }} className="section-pad">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="nm-label mb-3">No Surprises</p>
            <h2 className="nm-heading-lg">Pricing FAQ</h2>
          </div>
          <div className="space-y-4">
            {[
              ['Do you charge extra for chemicals?','No. All chemicals are included in your monthly maintenance rate.'],
              ['Is there a contract?','No long-term contracts. Month-to-month. Cancel anytime with 2 weeks notice.'],
              ['What areas do you serve?','All of Las Vegas, Summerlin, Henderson, Centennial Hills, Southern Highlands, and North Las Vegas.'],
              ['How do you price repairs?','Free diagnosis on all repairs. We quote before we work — no surprise bills.'],
              ['Can I get a custom quote?','Absolutely. Call 702-460-2406 or fill out the form below.'],
            ].map(([q, a], i) => (
              <motion.div key={q}
                initial={{ opacity:0, x:-16 }} whileInView={{ opacity:1, x:0 }}
                viewport={{ once:true }} transition={{ delay:i*0.07 }}
                className="nm-card p-5">
                <div className="font-semibold mb-2 flex gap-3" style={{ color:'var(--nm-navy)' }}>
                  <span style={{ color:'var(--nm-teal)' }} className="flex-shrink-0">{i+1}.</span>{q}
                </div>
                <p className="text-sm nm-body pl-5">{a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FORM */}
      <section style={{ background:'var(--nm-bg)' }} className="section-pad">
        <div className="max-w-xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h2 className="nm-heading-lg mb-2">Get Your Custom Quote</h2>
            <p className="nm-muted text-sm">Free estimate. No obligation. We respond within 2 hours.</p>
          </div>
          <LeadForm source="services-page" />
        </div>
      </section>
    </div>
  )
}
