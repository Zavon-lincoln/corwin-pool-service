import { motion } from 'framer-motion'
import LeadForm from '../components/LeadForm'

const fadeUp = { hidden:{ opacity:0, y:24 }, show:{ opacity:1, y:0 } }

export default function Contact() {
  return (
    <div style={{ background:'var(--nm-bg)' }}>

      <section style={{ background:'var(--nm-alt)' }} className="section-pad">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div variants={fadeUp} initial="hidden" animate="show">
            <p className="nm-label mb-4">Reach Us</p>
            <h1 className="nm-heading text-5xl md:text-6xl mb-5">Contact Us</h1>
            <p className="nm-body text-lg">We respond to all inquiries within 2 hours during business hours.</p>
          </motion.div>
        </div>
      </section>

      <section style={{ background:'var(--nm-bg)' }} className="section-pad">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once:true }}>
              <h2 className="nm-heading-lg mb-8">Get in Touch</h2>

              <div className="space-y-4 mb-10">
                {[
                  { icon:'📞', label:'Phone',   value:'702-460-2406',       link:'tel:7024602406',                sub:'Call or text anytime' },
                  { icon:'✉️', label:'Email',   value:'info@corwinpools.com',link:'mailto:info@corwinpools.com', sub:'We respond within 2 hours' },
                  { icon:'📍', label:'Address', value:'10917 Salford Drive, Las Vegas, NV 89144', link:null,     sub:'Serving all of Las Vegas Valley' },
                ].map(({ icon, label, value, link, sub }) => (
                  <div key={label} className="nm-card p-5 flex items-start gap-4">
                    <div className="nm-icon text-xl flex-shrink-0">{icon}</div>
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wide mb-0.5"
                        style={{ color:'var(--nm-muted)' }}>{label}</div>
                      {link
                        ? <a href={link} className="font-semibold text-base hover:opacity-80 transition-opacity"
                            style={{ color:'var(--nm-blue)' }}>{value}</a>
                        : <div className="font-semibold text-base" style={{ color:'var(--nm-navy)' }}>{value}</div>
                      }
                      <div className="text-xs mt-0.5" style={{ color:'var(--nm-muted)' }}>{sub}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="nm-card p-6">
                <h3 className="font-semibold mb-4" style={{ color:'var(--nm-navy)' }}>Business Hours</h3>
                <div className="space-y-0">
                  {[['Monday – Friday','7:00 AM – 6:00 PM'],['Saturday','8:00 AM – 4:00 PM'],['Sunday','Emergency calls only']].map(([day, hrs]) => (
                    <div key={day} className="flex justify-between py-3"
                      style={{ borderBottom:'1px solid var(--nm-dark)', opacity: day === 'Sunday' ? 0.7 : 1 }}>
                      <span className="text-sm font-medium" style={{ color:'var(--nm-navy)' }}>{day}</span>
                      <span className="text-sm font-semibold" style={{ color:'var(--nm-blue)' }}>{hrs}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 rounded-xl text-sm font-medium text-center"
                  style={{ background:'rgba(0,119,182,0.08)', color:'var(--nm-blue)' }}>
                  🚨 Pool emergency? We offer same-day service — call now.
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:0.1 }}>
              <LeadForm source="contact-page" />
            </motion.div>
          </div>
        </div>
      </section>

      <section style={{ background:'var(--nm-alt)' }} className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="nm-card-lg overflow-hidden">
            <div className="p-4">
              <p className="font-semibold text-sm" style={{ color:'var(--nm-muted)' }}>📍 Service Area — Las Vegas Valley</p>
            </div>
            <div className="h-72 mx-4 mb-4 rounded-xl overflow-hidden nm-inset">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d219697.14509837!2d-115.37120!3d36.17497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80beb782a4f57dd1%3A0x3accd5e6d5b379a3!2sLas%20Vegas%2C%20NV!5e0!3m2!1sen!2sus!4v1620000000000"
                className="w-full h-full border-0" allowFullScreen="" loading="lazy"
                referrerPolicy="no-referrer-when-downgrade" title="Service Area"/>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
