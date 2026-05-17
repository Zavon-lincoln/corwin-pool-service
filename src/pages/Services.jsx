import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import LeadForm from '../components/LeadForm'

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }

const NM_CARD = { background: '#1a3a6e', boxShadow: '6px 6px 14px #0f2440, -6px -6px 14px #254f9e', border: '1px solid rgba(0,196,240,0.1)' }
const NM_SURFACE = { background: '#1e4080', boxShadow: '4px 4px 10px #0f2440, -4px -4px 10px #254f9e', border: '1px solid rgba(0,196,240,0.1)' }

const services = [
  {
    icon: '\U0001f30a',
    title: 'Weekly Pool Maintenance',
    tagline: 'Your pool, perfect. Every single week.',
    price: 'From $120/mo',
    includes: [
      'Chemical testing & balancing (pH, chlorine, alkalinity, CYA)',
      'Brushing walls, steps, and waterline',
      'Skimming debris from surface',
      'Vacuuming floor (manual or auto)',
      'Cleaning skimmer & pump baskets',
      'Filter backwash & inspection',
      'Equipment visual check',
      'Service report after every visit',
    ],
    cta: 'Start Weekly Service',
    featured: true,
  },
  {
    icon: '\U0001f4c5',
    title: 'Bi-Weekly Maintenance',
    tagline: 'Every two weeks. Still crystal clear.',
    price: 'From $80/visit',
    includes: [
      'Full chemical test & balance',
      'Brush & vacuum',
      'Basket cleaning',
      'Filter inspection',
      'Service report',
    ],
    cta: 'Get a Quote',
  },
  {
    icon: '\U0001f9a0',
    title: 'Green Pool Rescue',
    tagline: 'Algae gone. Guaranteed.',
    price: 'From $250',
    includes: [
      'Algae severity assessment',
      'Shock treatment (multi-stage)',
      'Algaecide application',
      'Full brush & vacuum',
      'Filter deep clean / backwash',
      'Chemical rebalance',
      'Follow-up visit within 72 hrs',
      '100% satisfaction guarantee',
    ],
    cta: 'Get Green Pool Fixed',
    accent: true,
  },
  {
    icon: '\U0001f9f9',
    title: 'One-Time Deep Clean',
    tagline: 'Before a party, after move-in, or just because.',
    price: 'From $175',
    includes: [
      'Complete chemical rebalance',
      'Hand brushing all surfaces',
      'Manual vacuuming',
      'Tile line scrubbing',
      'Equipment flush & clean',
      'Debris removal',
    ],
    cta: 'Book a Deep Clean',
  },
  {
    icon: '\U0001f527',
    title: 'Equipment Repair',
    tagline: 'Fast diagnosis. Reliable fixes.',
    price: 'Free diagnosis',
    includes: [
      'Pool pumps & motors',
      'Pool heaters (gas & electric)',
      'Filters (sand, cartridge, DE)',
      'Pool lights & electrical',
      'Automation systems',
      'Salt chlorinators',
      'Variable speed pump installs',
      'Same-day emergency service available',
    ],
    cta: 'Schedule a Repair',
  },
  {
    icon: '\U0001f50d',
    title: 'Leak Detection',
    tagline: 'We find it. We fix it.',
    price: 'From $150',
    includes: [
      'Bucket test & pressure testing',
      'Visual inspection of equipment',
      'Underground leak detection',
      'Plumbing inspection',
      'Detailed written report',
      'Repair estimate included',
    ],
    cta: 'Book Leak Detection',
  },
  {
    icon: '\U0001f48e',
    title: 'Tile & Surface Cleaning',
    tagline: 'Remove calcium. Restore the shine.',
    price: 'From $200',
    includes: [
      'Calcium / scale removal',
      'Waterline tile scrubbing',
      'Acid washing (severe cases)',
      'Plaster & pebble surface care',
      'Grout cleaning',
    ],
    cta: 'Get Tiles Cleaned',
  },
  {
    icon: '\U0001f31e',
    title: 'Pool Opening / Closing',
    tagline: 'Get summer-ready in one visit.',
    price: 'From $200',
    includes: [
      'Equipment start-up & inspection',
      'Full chemical balance',
      'Brush & vacuum',
      'Filter clean & startup',
      'Heater check',
    ],
    cta: 'Schedule Opening',
  },
]

export default function Services() {
  return (
    <div style={{ background: '#1a3a6e' }}>
      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden" style={{ background: '#162f5a' }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="absolute rounded-full"
              style={{ width: (i+1)*140, height: (i+1)*140, top: '50%', left: '50%',
                transform: 'translate(-50%,-50%)', border: '1px solid rgba(0,196,240,0.05)' }} />
          ))}
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24 text-center relative z-10">
          <motion.div initial="hidden" animate="show" variants={fadeUp}>
            <p className="text-xs font-bold tracking-widest2 uppercase mb-4" style={{ color: '#00C4F0' }}>What We Offer</p>
            <h1 className="font-display text-7xl md:text-8xl text-white leading-none mb-6">
              OUR SERVICES
            </h1>
            <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: 'rgba(224,238,255,0.65)' }}>
              Every service your pool will ever need — from weekly maintenance to emergency repairs.
              No contracts. Transparent pricing. Best in Las Vegas.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── SERVICES GRID ─── */}
      <section className="section-pad" style={{ background: '#1a3a6e' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(({ icon, title, tagline, price, includes, cta, featured, accent }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                style={{
                  background: '#1a3a6e',
                  boxShadow: featured
                    ? '0 0 30px rgba(0,196,240,0.15), 6px 6px 14px #0f2440, -6px -6px 14px #254f9e'
                    : '6px 6px 14px #0f2440, -6px -6px 14px #254f9e',
                  border: featured ? '1px solid rgba(0,196,240,0.4)' : '1px solid rgba(0,196,240,0.1)',
                }}
                className="rounded-2xl p-6 relative transition-all duration-200 hover:border-[#00C4F0]/30"
              >
                {featured && (
                  <div
                    style={{ background: '#00C4F0', boxShadow: '3px 3px 8px #0f2440' }}
                    className="absolute -top-3 left-6 text-[#0f2440] text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
                    ⭐ Most Popular
                  </div>
                )}
                <div className="text-4xl mb-4">{icon}</div>
                <h3 className="font-display text-2xl text-[#00C4F0] mb-1">{title}</h3>
                <p className="text-xs mb-4 italic" style={{ color: 'rgba(224,238,255,0.5)' }}>{tagline}</p>

                <div className="inline-block mb-5 px-4 py-2 rounded-xl font-black text-lg text-[#FFE156]"
                  style={{ background: '#0f2440', boxShadow: 'inset 3px 3px 8px #0a1e36, inset -3px -3px 8px #162f5a' }}>
                  {price}
                </div>

                <ul className="space-y-2 mb-6">
                  {includes.map(item => (
                    <li key={item} className="flex items-start gap-2 text-sm" style={{ color: 'rgba(224,238,255,0.7)' }}>
                      <span className="text-[#00C4F0] mt-0.5 flex-shrink-0 font-bold">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>

                <Link to="/book"
                  style={{ background: '#1e4080', boxShadow: '3px 3px 8px #0f2440, -3px -3px 8px #254f9e' }}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white hover:text-[#00C4F0] transition-colors">
                  {cta} →
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRICING FAQ ─── */}
      <section className="section-pad" style={{ background: '#162f5a' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <p className="text-xs font-bold tracking-widest2 uppercase mb-3" style={{ color: '#00C4F0' }}>No Surprises</p>
            <h2 className="font-display text-5xl text-white">PRICING FAQ</h2>
            <p className="mt-3" style={{ color: 'rgba(224,238,255,0.5)' }}>Transparent answers to common pricing questions.</p>
          </motion.div>
          <div className="space-y-4">
            {[
              ['Do you charge extra for chemicals?', 'No. All chemicals are included in your monthly maintenance rate. No surprise add-ons.'],
              ['Is there a contract?', 'No long-term contracts. Month-to-month service. Cancel anytime with 2 weeks notice.'],
              ['What areas do you serve?', 'All of Las Vegas, Summerlin, Henderson, Centennial Hills, Southern Highlands, and North Las Vegas.'],
              ['How do you price repairs?', 'Free diagnosis on all repairs. We quote before we work — no surprise bills.'],
              ['Can I get a custom quote?', 'Absolutely. Call us at 702-460-2406 or fill out the form below for a custom estimate.'],
            ].map(([q, a], i) => (
              <motion.div
                key={q}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                style={NM_CARD}
                className="rounded-2xl p-5"
              >
                <div className="font-bold text-white mb-2 flex items-start gap-3">
                  <span className="font-display text-xl text-[#00C4F0] leading-none mt-0.5 flex-shrink-0">{i+1}.</span>
                  {q}
                </div>
                <p className="text-sm leading-relaxed pl-7" style={{ color: 'rgba(224,238,255,0.6)' }}>{a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── LEAD FORM ─── */}
      <section className="section-pad" style={{ background: '#0f2440' }}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="font-display text-5xl text-white mb-2">GET YOUR CUSTOM QUOTE</h2>
            <p style={{ color: 'rgba(224,238,255,0.55)' }}>Free estimate. No obligation. We respond within 2 hours.</p>
          </div>
          <LeadForm dark source="services-page" />
        </div>
      </section>
    </div>
  )
}
