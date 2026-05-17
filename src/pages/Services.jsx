import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import LeadForm from '../components/LeadForm'

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }

const services = [
  {
    icon: '🌊',
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
    color: 'bg-brand-cyan',
    featured: true,
  },
  {
    icon: '📅',
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
    color: 'bg-white',
  },
  {
    icon: '🦠',
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
    color: 'bg-brand-yellow',
  },
  {
    icon: '🧹',
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
    color: 'bg-white',
  },
  {
    icon: '🔧',
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
    color: 'bg-white',
  },
  {
    icon: '🔍',
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
    color: 'bg-white',
  },
  {
    icon: '💎',
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
    color: 'bg-white',
  },
  {
    icon: '🌞',
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
    color: 'bg-white',
  },
]

export default function Services() {
  return (
    <div>
      {/* Header */}
      <section className="bg-brand-blue border-b-3 border-brand-black py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial="hidden" animate="show" variants={fadeUp}>
            <p className="section-label mb-4">What We Offer</p>
            <h1 className="font-display text-7xl md:text-8xl text-white leading-none mb-4">
              OUR SERVICES
            </h1>
            <p className="text-blue-200 text-lg max-w-2xl mx-auto">
              Every service your pool will ever need — from weekly maintenance to emergency repairs.
              No contracts. Transparent pricing. Best in Las Vegas.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services grid */}
      <section className="bg-brand-cream section-pad">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(({ icon, title, tagline, price, includes, cta, color, featured }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className={`relative border-3 border-brand-black p-6 shadow-neo hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-neo-lg transition-all ${color} ${featured ? 'lg:col-span-1 ring-4 ring-brand-cyan ring-offset-2' : ''}`}
              >
                {featured && (
                  <div className="absolute -top-4 left-4 bg-brand-blue text-white text-xs font-black px-3 py-1 border-3 border-brand-black shadow-neo uppercase tracking-wider">
                    ⭐ Most Popular
                  </div>
                )}
                <div className="text-4xl mb-3">{icon}</div>
                <h3 className="font-display text-2xl text-brand-blue mb-1">{title}</h3>
                <p className="text-sm text-gray-500 mb-3 italic">{tagline}</p>

                <div className="bg-brand-blue text-brand-yellow font-black text-lg px-4 py-2 border-3 border-brand-black shadow-neo inline-block mb-4">
                  {price}
                </div>

                <ul className="space-y-1.5 mb-6">
                  {includes.map(item => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-brand-cyan mt-0.5 flex-shrink-0 font-bold">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>

                <Link to="/book" className="btn-blue w-full justify-center text-xs py-2.5">
                  {cta} →
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing FAQ */}
      <section className="bg-brand-black section-pad border-y-3 border-brand-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <h2 className="font-display text-5xl text-white mb-4">PRICING FAQ</h2>
            <p className="text-gray-400">Transparent answers to common pricing questions.</p>
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
                className="bg-white border-3 border-brand-black p-5 shadow-neo"
              >
                <div className="font-bold text-brand-black mb-2 flex items-start gap-3">
                  <span className="text-brand-cyan font-display text-xl leading-none mt-0.5">{i+1}.</span>
                  {q}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed pl-7">{a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead form */}
      <section className="bg-brand-blue section-pad">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="font-display text-5xl text-white">GET YOUR CUSTOM QUOTE</h2>
            <p className="text-blue-200 mt-2">Free estimate. No obligation. We respond within 2 hours.</p>
          </div>
          <LeadForm dark source="services-page" />
        </div>
      </section>
    </div>
  )
}
