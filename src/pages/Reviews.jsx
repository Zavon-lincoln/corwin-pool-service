import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }

const reviews = [
  { name: 'Marcus T.', location: 'Summerlin, NV', stars: 5, date: 'March 2024', service: 'Weekly Maintenance', text: 'Corwin has been cleaning my pool for over 4 years now. Never missed a single visit. Always leaves it crystal clear and leaves a note about the chemical levels. My neighbors constantly ask who does my pool. I always send them to Corwin.' },
  { name: 'Diane R.', location: 'Henderson, NV', stars: 5, date: 'February 2024', service: 'Green Pool Rescue', text: 'I had a massive green pool emergency right before a family gathering. Called Corwin and they came out the same day. Within 48 hours my pool was completely clear. I was genuinely shocked. They also set me up with weekly service and I\'ve been with them ever since. Best pool service in Vegas, no contest.' },
  { name: 'Tom & Lisa W.', location: 'Centennial Hills, NV', stars: 5, date: 'January 2024', service: 'Weekly Maintenance', text: 'We tried three other pool companies before Corwin. One ghosted us after two visits. Another kept canceling. Corwin has shown up every single week for going on 2.5 years. Reliable, professional, and the pool looks amazing year-round. Worth every penny.' },
  { name: 'Sandra M.', location: 'Green Valley, NV', stars: 5, date: 'December 2023', service: 'Equipment Repair', text: 'Our pump died mid-summer. Corwin came out for a free diagnosis and had a new pump installed by the next morning. Price was fair and they explained everything clearly. They\'ve since taken over our weekly maintenance and we couldn\'t be happier.' },
  { name: 'Robert K.', location: 'Summerlin, NV', stars: 5, date: 'November 2023', service: 'One-Time Deep Clean', text: 'Just bought a house with a pool that hadn\'t been maintained in months. Corwin did a deep clean and chemical reset — the pool looked brand new. They also gave me an honest assessment of the equipment without trying to upsell me on anything unnecessary. Refreshingly honest business.' },
  { name: 'Jennifer P.', location: 'Southern Highlands, NV', stars: 5, date: 'October 2023', service: 'Weekly Maintenance', text: 'Best of Las Vegas winner for a reason. Mike comes every Monday without fail. My pool is always perfect. The chemicals are always balanced. I have a saltwater pool which some companies struggle with but Corwin handles it flawlessly.' },
  { name: 'David L.', location: 'North Las Vegas, NV', stars: 5, date: 'September 2023', service: 'Tile Cleaning', text: 'Had terrible calcium buildup on my tiles. Corwin came in and made them look brand new in one visit. They were careful, efficient, and didn\'t damage my plaster. I also hired them for weekly service after seeing how professional they were.' },
  { name: 'Karen B.', location: 'Henderson, NV', stars: 5, date: 'August 2023', service: 'Leak Detection', text: 'Water level kept dropping and I had no idea why. Corwin found a slow leak in my skimmer within an hour. Fixed it same day. They saved me from a potentially massive repair bill. Very knowledgeable and professional.' },
  { name: 'Frank E.', location: 'Las Vegas, NV', stars: 5, date: 'July 2023', service: 'Weekly Maintenance', text: 'I\'ve been a Corwin customer since 2012. That should say it all. In 12+ years they have never let me down. Price is fair, service is impeccable, and the team is always courteous and professional. I refer everyone I know to Corwin.' },
]

const platformStats = [
  { platform: 'Google', rating: '4.9', count: '120+', color: 'bg-brand-yellow' },
  { platform: 'Yelp', rating: '4.8', count: '95+', color: 'bg-white' },
  { platform: 'HomeAdvisor', rating: '4.9', count: '80+', color: 'bg-brand-cyan' },
]

export default function Reviews() {
  return (
    <div>
      {/* Header */}
      <section className="bg-brand-blue border-b-3 border-brand-black py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial="hidden" animate="show" variants={fadeUp}>
            <p className="section-label mb-4">What Clients Say</p>
            <h1 className="font-display text-7xl md:text-8xl text-white leading-none mb-4">
              REVIEWS
            </h1>
            <div className="flex justify-center text-5xl text-brand-yellow mb-4">
              {'★★★★★'}
            </div>
            <p className="text-blue-200 text-lg">
              Rated 4.9/5 across 295+ reviews on Google, Yelp, and HomeAdvisor.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Platform stats */}
      <section className="bg-brand-cream border-b-3 border-brand-black py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-3 gap-4">
            {platformStats.map(({ platform, rating, count, color }) => (
              <motion.div key={platform} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                className={`neo-card ${color} p-6 text-center`}>
                <div className="font-display text-4xl text-brand-blue mb-1">{rating}</div>
                <div className="text-yellow-500 text-lg mb-1">★★★★★</div>
                <div className="font-bold text-xs uppercase tracking-wider text-brand-black">{platform}</div>
                <div className="text-xs text-gray-500 mt-0.5">{count} reviews</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews grid */}
      <section className="bg-brand-black section-pad">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map(({ name, location, stars, date, service, text }, i) => (
              <motion.div key={name} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                className="bg-white border-3 border-brand-black p-6 shadow-neo hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-neo-lg transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div className="text-yellow-400 text-xl">{'★'.repeat(stars)}</div>
                  <span className="text-xs text-gray-400 font-semibold">{date}</span>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-4 italic">"{text}"</p>
                <div className="border-t-3 border-brand-black pt-3">
                  <div className="font-black text-brand-black">{name}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{location}</div>
                  <div className="mt-2 inline-block bg-brand-cyan/20 border border-brand-cyan text-brand-blue text-xs font-bold px-2 py-0.5">{service}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leave a review CTA */}
      <section className="bg-brand-yellow border-y-3 border-brand-black section-pad">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="font-display text-6xl text-brand-black mb-4">SHARE YOUR EXPERIENCE</h2>
            <p className="text-brand-black/70 mb-8 text-lg">
              Are you a Corwin customer? Your review helps other Las Vegas families find trusted pool service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://www.google.com/search?q=corwin+pool+service+las+vegas" target="_blank" rel="noopener noreferrer"
                className="btn-blue text-base px-8 py-4">
                ⭐ Leave a Google Review
              </a>
              <a href="https://www.yelp.com/biz/corwin-pool-service-las-vegas" target="_blank" rel="noopener noreferrer"
                className="btn-secondary text-base px-8 py-4">
                Leave a Yelp Review
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-brand-blue section-pad">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="section-title-white mb-4">READY TO JOIN THE 500+?</h2>
            <p className="text-blue-200 mb-8">Experience the service that earned 295+ five-star reviews.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/book" className="btn-primary text-base px-8 py-4">Book Online Now →</Link>
              <a href="tel:7024602406" className="btn-secondary text-base px-8 py-4">📞 702-460-2406</a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
