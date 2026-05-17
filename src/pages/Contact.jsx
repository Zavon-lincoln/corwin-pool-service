import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import LeadForm from '../components/LeadForm'

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }

export default function Contact() {
  return (
    <div>
      {/* Header */}
      <section className="bg-brand-blue border-b-3 border-brand-black py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial="hidden" animate="show" variants={fadeUp}>
            <p className="section-label mb-4">Reach Us</p>
            <h1 className="font-display text-7xl md:text-8xl text-white leading-none mb-4">CONTACT US</h1>
            <p className="text-blue-200 text-lg">We respond to all inquiries within 2 hours during business hours.</p>
          </motion.div>
        </div>
      </section>

      {/* Contact info + form */}
      <section className="bg-brand-cream section-pad border-b-3 border-brand-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact info */}
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="section-title mb-8">GET IN TOUCH</h2>

              <div className="space-y-4 mb-10">
                {[
                  { icon: '📞', label: 'Phone', value: '702-460-2406', link: 'tel:7024602406', sub: 'Call or text anytime' },
                  { icon: '✉️', label: 'Email', value: 'info@corwinpools.com', link: 'mailto:info@corwinpools.com', sub: 'We respond within 2 hours' },
                  { icon: '📍', label: 'Address', value: '10917 Salford Drive, Las Vegas, NV 89144', link: null, sub: 'Serving all of Las Vegas Valley' },
                ].map(({ icon, label, value, link, sub }) => (
                  <div key={label} className="neo-card p-5 flex items-start gap-4">
                    <div className="text-3xl flex-shrink-0">{icon}</div>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-0.5">{label}</div>
                      {link
                        ? <a href={link} className="font-bold text-brand-blue text-lg hover:text-brand-cyan transition-colors">{value}</a>
                        : <div className="font-bold text-brand-black text-base">{value}</div>
                      }
                      <div className="text-xs text-gray-500 mt-0.5">{sub}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Hours */}
              <div className="neo-card-blue p-6">
                <h3 className="font-display text-2xl text-brand-cyan mb-4">BUSINESS HOURS</h3>
                <div className="space-y-2">
                  {[
                    ['Monday – Friday', '7:00 AM – 6:00 PM'],
                    ['Saturday', '8:00 AM – 4:00 PM'],
                    ['Sunday', 'Emergency calls only'],
                  ].map(([day, hours]) => (
                    <div key={day} className="flex justify-between items-center py-2 border-b border-white/20 last:border-0">
                      <span className="text-white text-sm font-semibold">{day}</span>
                      <span className="text-brand-cyan text-sm font-bold">{hours}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-brand-yellow border-3 border-brand-black">
                  <p className="text-brand-black text-xs font-bold text-center">
                    🚨 Pool emergency? We offer same-day service — call now.
                  </p>
                </div>
              </div>

              {/* Book CTA */}
              <div className="mt-6">
                <Link to="/book" className="btn-primary-lg w-full justify-center">
                  Or Book Online →
                </Link>
              </div>
            </motion.div>

            {/* Lead form */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <LeadForm source="contact-page" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="bg-brand-cream border-b-3 border-brand-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
          <div className="neo-card overflow-hidden">
            <div className="bg-brand-blue p-4 border-b-3 border-brand-black flex items-center justify-between">
              <p className="text-white font-bold uppercase tracking-wider">Our Service Area — Las Vegas Valley</p>
              <span className="text-brand-cyan text-sm font-semibold">📍 Las Vegas, NV 89144</span>
            </div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d219697.14509837!2d-115.37120!3d36.17497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80beb782a4f57dd1%3A0x3accd5e6d5b379a3!2sLas%20Vegas%2C%20NV!5e0!3m2!1sen!2sus!4v1620000000000"
              className="w-full h-96 border-0"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Corwin Pool Service Location"
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-brand-yellow border-y-3 border-brand-black section-pad">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <h2 className="font-display text-5xl text-brand-black">QUICK QUESTIONS</h2>
          </motion.div>
          <div className="space-y-4">
            {[
              ['How fast do you respond to quote requests?', 'Within 2 business hours by phone or email — typically much faster.'],
              ['Do you service my neighborhood?', 'We serve all of Las Vegas, Henderson, Summerlin, Centennial Hills, Southern Highlands, and North Las Vegas. If you\'re unsure, just call and we\'ll confirm in seconds.'],
              ['Do I need to be home for service visits?', 'No. As long as we have gate access, we\'ll service your pool and leave a detailed service report.'],
              ['How do I get started?', 'Book online at /book, fill out the form above, or call us directly at 702-460-2406. We\'ll have you set up within 24 hours.'],
            ].map(([q, a], i) => (
              <motion.div key={q} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="neo-card p-5">
                <div className="font-bold text-brand-black mb-2">Q: {q}</div>
                <div className="text-gray-600 text-sm pl-4 border-l-3 border-brand-cyan">{a}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
