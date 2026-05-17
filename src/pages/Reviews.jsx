import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }

const NM_CARD = { background: '#1a3a6e', boxShadow: '6px 6px 14px #0f2440, -6px -6px 14px #254f9e', border: '1px solid rgba(0,196,240,0.1)' }

const reviews = [
  { name: 'Marcus T.', location: 'Summerlin, NV', stars: 5, date: 'March 2024', service: 'Weekly Maintenance', text: 'Corwin has been cleaning my pool for over 4 years now. Never missed a single visit. Always leaves it crystal clear and leaves a note about the chemical levels. My neighbors constantly ask who does my pool. I always send them to Corwin.' },
  { name: 'Diane R.', location: 'Henderson, NV', stars: 5, date: 'February 2024', service: 'Green Pool Rescue', text: "I had a massive green pool emergency right before a family gathering. Called Corwin and they came out the same day. Within 48 hours my pool was completely clear. I was genuinely shocked. They also set me up with weekly service and I've been with them ever since. Best pool service in Vegas, no contest." },
  { name: 'Tom & Lisa W.', location: 'Centennial Hills, NV', stars: 5, date: 'January 2024', service: 'Weekly Maintenance', text: 'We tried three other pool companies before Corwin. One ghosted us after two visits. Another kept canceling. Corwin has shown up every single week for going on 2.5 years. Reliable, professional, and the pool looks amazing year-round. Worth every penny.' },
  { name: 'Sandra M.', location: 'Green Valley, NV', stars: 5, date: 'December 2023', service: 'Equipment Repair', text: "Our pump died mid-summer. Corwin came out for a free diagnosis and had a new pump installed by the next morning. Price was fair and they explained everything clearly. They've since taken over our weekly maintenance and we couldn't be happier." },
  { name: 'Robert K.', location: 'Summerlin, NV', stars: 5, date: 'November 2023', service: 'One-Time Deep Clean', text: "Just bought a house with a pool that hadn't been maintained in months. Corwin did a deep clean and chemical reset — the pool looked brand new. They also gave me an honest assessment of the equipment without trying to upsell me on anything unnecessary. Refreshingly honest business." },
  { name: 'Jennifer P.', location: 'Southern Highlands, NV', stars: 5, date: 'October 2023', service: 'Weekly Maintenance', text: 'Best of Las Vegas winner for a reason. Mike comes every Monday without fail. My pool is always perfect. The chemicals are always balanced. I have a saltwater pool which some companies struggle with but Corwin handles it flawlessly.' },
  { name: 'David L.', location: 'North Las Vegas, NV', stars: 5, date: 'September 2023', service: 'Tile Cleaning', text: "Had terrible calcium buildup on my tiles. Corwin came in and made them look brand new in one visit. They were careful, efficient, and didn't damage my plaster. I also hired them for weekly service after seeing how professional they were." },
  { name: 'Karen B.', location: 'Henderson, NV', stars: 5, date: 'August 2023', service: 'Leak Detection', text: 'Water level kept dropping and I had no idea why. Corwin found a slow leak in my skimmer within an hour. Fixed it same day. They saved me from a potentially massive repair bill. Very knowledgeable and professional.' },
  { name: 'Frank E.', location: 'Las Vegas, NV', stars: 5, date: 'July 2023', service: 'Weekly Maintenance', text: "I've been a Corwin customer since 2012. That should say it all. In 12+ years they have never let me down. Price is fair, service is impeccable, and the team is always courteous and professional. I refer everyone I know to Corwin." },
]

const platformStats = [
  { platform: 'Google', rating: '4.9', count: '120+' },
  { platform: 'Yelp', rating: '4.8', count: '95+' },
  { platform: 'HomeAdvisor', rating: '4.9', count: '80+' },
]

export default function Reviews() {
  return (
    <div style={{ background: 'var(--nm-bg)' }}>
      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden" style={{ background: 'var(--nm-deep)' }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="absolute rounded-full"
              style={{ width: (i+1)*140, height: (i+1)*140, top: '50%', left: '50%',
                transform: 'translate(-50%,-50%)', border: '1px solid rgba(0,196,240,0.05)' }} />
          ))}
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24 text-center relative z-10">
          <motion.div initial="hidden" animate="show" variants={fadeUp}>
            <p className="text-xs font-bold tracking-widest2 uppercase mb-4" style={{ color: 'var(--nm-cyan)' }}>What Clients Say</p>
            <h1 className="font-display text-7xl md:text-8xl text-white leading-none mb-6">
              REVIEWS
            </h1>
            <div className="flex justify-center mb-4" style={{ color: 'var(--nm-yellow)', fontSize: '3rem', letterSpacing: '0.1em' }}>
              {'★★★★★'}
            </div>
            <p className="text-lg" style={{ color: 'var(--nm-muted)' }}>
              Rated 4.9/5 across 295+ reviews on Google, Yelp, and HomeAdvisor.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── PLATFORM STATS ─── */}
      <section className="py-12" style={{ background: 'var(--nm-bg)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-3 gap-5">
            {platformStats.map(({ platform, rating, count }, i) => (
              <motion.div key={platform}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="nm-card"
                className="rounded-2xl p-6 text-center">
                <div className="font-display text-4xl text-[#00C4F0] mb-1">{rating}</div>
                <div className="text-yellow-400 text-lg mb-2">★★★★★</div>
                <div className="font-bold text-white text-xs uppercase tracking-wider">{platform}</div>
                <div className="text-xs mt-1" style={{ color: 'var(--nm-faint)' }}>{count} reviews</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── REVIEWS GRID ─── */}
      <section className="section-pad" style={{ background: 'var(--nm-deep)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map(({ name, location, stars, date, service, text }, i) => (
              <motion.div key={name}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="nm-card"
                className="rounded-2xl p-6 transition-all duration-200 hover:border-[#00C4F0]/30">
                <div className="flex items-start justify-between mb-3">
                  <div className="text-yellow-400 text-xl">{'★'.repeat(stars)}</div>
                  <span className="text-xs font-semibold" style={{ color: 'var(--nm-faint)' }}>{date}</span>
                </div>
                <p className="text-sm leading-relaxed mb-4 italic" style={{ color: 'var(--nm-text)' }}>"{text}"</p>
                <div className="pt-3" style={{ borderTop: '1px solid rgba(0,196,240,0.2)' }}>
                  <div className="font-black text-white">{name}</div>
                  <div className="text-xs mt-0.5" style={{ color: 'var(--nm-faint)' }}>{location}</div>
                  <div className="mt-2 inline-block rounded-full px-2 py-0.5 text-xs font-bold"
                    style={{ background: 'rgba(0,196,240,0.12)', border: '1px solid rgba(0,196,240,0.3)', color: 'var(--nm-cyan)' }}>
                    {service}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── LEAVE A REVIEW CTA ─── */}
      <section className="section-pad" style={{ background: 'var(--nm-deeper)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="font-display text-6xl text-white mb-4">SHARE YOUR EXPERIENCE</h2>
            <p className="mb-8 text-lg" style={{ color: 'var(--nm-muted)' }}>
              Are you a Corwin customer? Your review helps other Las Vegas families find trusted pool service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://www.google.com/search?q=corwin+pool+service+las+vegas"
                target="_blank" rel="noopener noreferrer"
                className="nm-btn-yellow text-base px-8 py-4">
                ⭐ Leave a Google Review
              </a>
              <a href="https://www.yelp.com/biz/corwin-pool-service-las-vegas"
                target="_blank" rel="noopener noreferrer"
                className="nm-btn-primary text-base px-8 py-4">
                Leave a Yelp Review
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── BOTTOM CTA ─── */}
      <section className="section-pad" style={{ background: 'var(--nm-bg)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="font-display text-5xl text-white mb-4">READY TO JOIN THE 500+?</h2>
            <p className="mb-8" style={{ color: 'var(--nm-muted)' }}>
              Experience the service that earned 295+ five-star reviews.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/book" className="nm-btn-cyan text-base px-8 py-4">Book Online Now →</Link>
              <a href="tel:7024602406" className="nm-btn-primary text-base px-8 py-4">\U0001f4de 702-460-2406</a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
