import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import LeadForm from '../components/LeadForm'

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }

const NM_CARD = { background: '#1a3a6e', boxShadow: '6px 6px 14px #0f2440, -6px -6px 14px #254f9e', border: '1px solid rgba(0,196,240,0.1)' }

export default function Contact() {
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
            <p className="text-xs font-bold tracking-widest2 uppercase mb-4" style={{ color: '#00C4F0' }}>Reach Us</p>
            <h1 className="font-display text-7xl md:text-8xl text-white leading-none mb-6">CONTACT US</h1>
            <p className="text-lg" style={{ color: 'rgba(224,238,255,0.65)' }}>
              We respond to all inquiries within 2 hours during business hours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── CONTACT INFO + FORM ─── */}
      <section className="section-pad" style={{ background: '#1a3a6e' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact info */}
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="font-display text-5xl text-white leading-none mb-8">GET IN TOUCH</h2>

              <div className="space-y-4 mb-10">
                {[
                  { icon: '\U0001f4de', label: 'Phone', value: '702-460-2406', link: 'tel:7024602406', sub: 'Call or text anytime' },
                  { icon: '✉️', label: 'Email', value: 'info@corwinpools.com', link: 'mailto:info@corwinpools.com', sub: 'We respond within 2 hours' },
                  { icon: '\U0001f4cd', label: 'Address', value: '10917 Salford Drive, Las Vegas, NV 89144', link: null, sub: 'Serving all of Las Vegas Valley' },
                ].map(({ icon, label, value, link, sub }) => (
                  <div key={label} style={NM_CARD} className="rounded-2xl p-5 flex items-start gap-4">
                    <div className="text-3xl flex-shrink-0">{icon}</div>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider mb-0.5" style={{ color: 'rgba(224,238,255,0.45)' }}>{label}</div>
                      {link
                        ? <a href={link} className="font-bold text-[#00C4F0] text-lg hover:text-white transition-colors">{value}</a>
                        : <div className="font-bold text-white text-base">{value}</div>
                      }
                      <div className="text-xs mt-0.5" style={{ color: 'rgba(224,238,255,0.45)' }}>{sub}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Hours */}
              <div
                style={{ background: '#162f5a', boxShadow: '6px 6px 14px #0f2440, -6px -6px 14px #254f9e', border: '1px solid rgba(0,196,240,0.15)' }}
                className="rounded-2xl p-6 mb-6">
                <h3 className="font-display text-2xl text-[#00C4F0] mb-4">BUSINESS HOURS</h3>
                <div className="space-y-0">
                  {[
                    ['Monday – Friday', '7:00 AM – 6:00 PM'],
                    ['Saturday', '8:00 AM – 4:00 PM'],
                    ['Sunday', 'Emergency calls only'],
                  ].map(([day, hours]) => (
                    <div key={day} className="flex justify-between items-center py-3" style={{ borderBottom: '1px solid rgba(0,196,240,0.1)' }}>
                      <span className="text-white text-sm font-semibold">{day}</span>
                      <span className="text-sm font-bold" style={{ color: '#00C4F0' }}>{hours}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 rounded-xl text-center"
                  style={{ background: 'rgba(255,225,86,0.1)', border: '1px solid rgba(255,225,86,0.25)' }}>
                  <p className="text-xs font-bold" style={{ color: '#FFE156' }}>
                    \U0001f6a8 Pool emergency? We offer same-day service — call now.
                  </p>
                </div>
              </div>

              <Link to="/book" className="nm-btn-yellow w-full justify-center text-sm py-3">
                Or Book Online →
              </Link>
            </motion.div>

            {/* Lead form */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <LeadForm source="contact-page" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── MAP ─── */}
      <section style={{ background: '#162f5a' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
          <div
            style={{ background: '#1a3a6e', boxShadow: '6px 6px 14px #0f2440, -6px -6px 14px #254f9e', border: '1px solid rgba(0,196,240,0.15)' }}
            className="rounded-2xl overflow-hidden">
            <div className="p-4 flex items-center justify-between" style={{ background: '#162f5a', borderBottom: '1px solid rgba(0,196,240,0.15)' }}>
              <p className="text-white font-bold uppercase tracking-wider text-sm">Our Service Area — Las Vegas Valley</p>
              <span className="text-sm font-semibold" style={{ color: '#00C4F0' }}>\U0001f4cd Las Vegas, NV 89144</span>
            </div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d219697.14509837!2d-115.37120!3d36.17497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80beb782a4f57dd1%3A0x3accd5e6d5b379a3!2sLas%20Vegas%2C%20NV!5e0!3m2!1sen!2sus!4v1620000000000"
              className="w-full border-0"
              style={{ height: '384px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Corwin Pool Service Location"
            />
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="section-pad" style={{ background: '#0f2440' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <h2 className="font-display text-5xl text-white mb-3">QUICK QUESTIONS</h2>
            <p style={{ color: 'rgba(224,238,255,0.5)' }}>Fast answers before you reach out.</p>
          </motion.div>
          <div className="space-y-4">
            {[
              ['How fast do you respond to quote requests?', 'Within 2 business hours by phone or email — typically much faster.'],
              ['Do you service my neighborhood?', "We serve all of Las Vegas, Henderson, Summerlin, Centennial Hills, Southern Highlands, and North Las Vegas. If you're unsure, just call and we'll confirm in seconds."],
              ['Do I need to be home for service visits?', "No. As long as we have gate access, we'll service your pool and leave a detailed service report."],
              ['How do I get started?', 'Book online at /book, fill out the form above, or call us directly at 702-460-2406. We\'ll have you set up within 24 hours.'],
            ].map(([q, a], i) => (
              <motion.div key={q}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                style={NM_CARD}
                className="rounded-2xl p-5">
                <div className="font-bold text-white mb-2">Q: {q}</div>
                <div className="text-sm pl-4 leading-relaxed" style={{ borderLeft: '2px solid rgba(0,196,240,0.4)', color: 'rgba(224,238,255,0.65)' }}>{a}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
