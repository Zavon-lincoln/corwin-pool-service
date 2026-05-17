import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const fadeUp = { hidden:{ opacity:0, y:24 }, show:{ opacity:1, y:0 } }

const reviews = [
  { name:'Marcus T.',    loc:'Summerlin, NV',         stars:5, date:'March 2024',    service:'Weekly Maintenance', text:'Corwin has been cleaning my pool for over 4 years now. Never missed a single visit. Always leaves it crystal clear and leaves a note about the chemical levels. My neighbors constantly ask who does my pool.' },
  { name:'Diane R.',     loc:'Henderson, NV',         stars:5, date:'February 2024', service:'Green Pool Rescue',  text:"I had a massive green pool emergency right before a family gathering. Called Corwin and they came out the same day. Within 48 hours my pool was completely clear. They also set me up with weekly service — best pool service in Vegas, no contest." },
  { name:'Tom & Lisa W.',loc:'Centennial Hills, NV',  stars:5, date:'January 2024',  service:'Weekly Maintenance', text:"We tried three other pool companies before Corwin. One ghosted us after two visits. Corwin has shown up every single week for going on 2.5 years. Reliable, professional, and the pool looks amazing year-round." },
  { name:'Sandra M.',    loc:'Green Valley, NV',      stars:5, date:'December 2023', service:'Equipment Repair',   text:"Our pump died mid-summer. Corwin came for a free diagnosis and had a new pump installed by the next morning. Price was fair and they explained everything clearly." },
  { name:'Robert K.',    loc:'Summerlin, NV',         stars:5, date:'November 2023', service:'One-Time Deep Clean', text:"Bought a house with a pool that hadn't been maintained in months. Corwin did a deep clean — the pool looked brand new. They gave an honest assessment without trying to upsell on anything unnecessary." },
  { name:'Jennifer P.',  loc:'Southern Highlands, NV',stars:5, date:'October 2023',  service:'Weekly Maintenance', text:"Best of Las Vegas winner for a reason. Mike comes every Monday without fail. My pool is always perfect. I have a saltwater pool which some companies struggle with but Corwin handles it flawlessly." },
  { name:'David L.',     loc:'North Las Vegas, NV',   stars:5, date:'September 2023',service:'Tile Cleaning',      text:"Had terrible calcium buildup on my tiles. Corwin came in and made them look brand new in one visit. They were careful, efficient, and didn't damage my plaster. Hired them for weekly service after." },
  { name:'Karen B.',     loc:'Henderson, NV',         stars:5, date:'August 2023',   service:'Leak Detection',     text:"Water level kept dropping and I had no idea why. Corwin found a slow leak in my skimmer within an hour. Fixed it same day. They saved me from a potentially massive repair bill." },
  { name:'Frank E.',     loc:'Las Vegas, NV',         stars:5, date:'July 2023',     service:'Weekly Maintenance', text:"I've been a Corwin customer since 2012. In 12+ years they have never let me down. Price is fair, service is impeccable, and the team is always courteous. I refer everyone I know to Corwin." },
]

export default function Reviews() {
  return (
    <div style={{ background:'var(--nm-bg)' }}>

      <section style={{ background:'var(--nm-alt)' }} className="section-pad">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div variants={fadeUp} initial="hidden" animate="show">
            <p className="nm-label mb-4">What Clients Say</p>
            <h1 className="nm-heading text-5xl md:text-6xl mb-4">Reviews</h1>
            <div className="flex justify-center gap-1 mb-3">
              {[...Array(5)].map((_,i) => <span key={i} className="text-3xl" style={{ color:'#f59e0b' }}>★</span>)}
            </div>
            <p className="nm-body text-lg">Rated 4.9/5 across 295+ reviews on Google, Yelp, and HomeAdvisor.</p>
          </motion.div>
        </div>
      </section>

      {/* Platform stats */}
      <section style={{ background:'var(--nm-bg)' }} className="py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-3 gap-5">
            {[{p:'Google',r:'4.9',c:'120+'},{p:'Yelp',r:'4.8',c:'95+'},{p:'HomeAdvisor',r:'4.9',c:'80+'}].map(({ p,r,c },i) => (
              <motion.div key={p} initial={{ opacity:0, scale:0.95 }} whileInView={{ opacity:1, scale:1 }} viewport={{ once:true }} transition={{ delay:i*0.1 }}
                className="nm-card p-5 text-center">
                <div className="text-3xl font-extrabold mb-1" style={{ color:'var(--nm-blue)' }}>{r}</div>
                <div className="flex justify-center gap-0.5 mb-1">
                  {[...Array(5)].map((_,j) => <span key={j} className="text-sm" style={{ color:'#f59e0b' }}>★</span>)}
                </div>
                <div className="font-semibold text-xs uppercase tracking-wide" style={{ color:'var(--nm-navy)' }}>{p}</div>
                <div className="text-xs mt-0.5" style={{ color:'var(--nm-muted)' }}>{c} reviews</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews grid */}
      <section style={{ background:'var(--nm-alt)' }} className="section-pad">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map(({ name, loc, stars, date, service, text }, i) => (
              <motion.div key={name} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*0.05 }}
                className="nm-card p-6 hover:shadow-nm-lg transition-all duration-300">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex gap-0.5">
                    {[...Array(stars)].map((_,j) => <span key={j} className="text-lg" style={{ color:'#f59e0b' }}>★</span>)}
                  </div>
                  <span className="text-xs" style={{ color:'var(--nm-faint)' }}>{date}</span>
                </div>
                <p className="text-sm nm-body italic mb-4 leading-relaxed">"{text}"</p>
                <div className="nm-divider mb-3"/>
                <div className="font-semibold text-sm" style={{ color:'var(--nm-navy)' }}>{name}</div>
                <div className="text-xs mt-0.5" style={{ color:'var(--nm-muted)' }}>{loc}</div>
                <span className="mt-2 inline-block text-xs font-medium px-2.5 py-1 rounded-full"
                  style={{ background:'rgba(0,180,216,0.1)', color:'var(--nm-teal)' }}>{service}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background:'var(--nm-blue)' }} className="section-pad">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once:true }}>
            <h2 className="font-extrabold text-4xl text-white mb-4">Share Your Experience</h2>
            <p className="text-lg mb-8" style={{ color:'rgba(255,255,255,0.75)' }}>Your review helps other Las Vegas families find trusted pool service.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://www.google.com/search?q=corwin+pool+service+las+vegas" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 font-semibold px-7 py-3.5 rounded-xl text-white transition-all hover:opacity-90"
                style={{ background:'rgba(255,255,255,0.15)', boxShadow:'0 4px 16px rgba(0,0,0,0.15)' }}>
                ⭐ Leave a Google Review
              </a>
              <Link to="/book" className="inline-flex items-center justify-center gap-2 font-semibold px-7 py-3.5 rounded-xl text-white transition-all hover:opacity-90"
                style={{ background:'rgba(255,255,255,0.15)', boxShadow:'0 4px 16px rgba(0,0,0,0.15)' }}>
                Book a Service →
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
