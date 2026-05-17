import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{ background: 'var(--nm-footer)', color: 'rgba(255,255,255,0.75)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="md:col-span-1">
            <img
              src="https://static.wixstatic.com/media/bea8df_fd28c5a1d6304adabc5bf85a6f34e90a~mv2_d_3600_3600_s_4_2.png/v1/crop/x_0,y_446,w_3600,h_2389/fill/w_600,h_400,al_c,q_95,enc_png/Corwin%20Pool%20Main.png"
              alt="Corwin Pool Service" className="h-12 w-auto mb-4"
              style={{ filter: 'brightness(0) invert(1) opacity(0.85)' }} />
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
              Las Vegas's most trusted pool cleaning &amp; maintenance service since 2000. Award-winning. Family-owned.
            </p>
            <div className="flex gap-3 mt-5">
              {[['Y','https://www.yelp.com/biz/corwin-pool-service-las-vegas'],
                ['G','https://www.google.com'],['f','https://www.facebook.com']].map(([l,h]) => (
                <a key={l} href={h} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all hover:text-white"
                  style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.6)' }}>
                  {l}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-white font-semibold text-sm mb-5 tracking-wide">Navigation</p>
            <ul className="space-y-2.5 text-sm">
              {[['/', 'Home'],['/services','Services'],['/about','About Us'],
                ['/reviews','Reviews'],['/contact','Contact'],['/book','Book Online']].map(([t,l]) => (
                <li key={t}>
                  <Link to={t} className="hover:text-white transition-colors"
                    style={{ color: 'rgba(255,255,255,0.55)' }}>{l}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <p className="text-white font-semibold text-sm mb-5 tracking-wide">Services</p>
            <ul className="space-y-2.5 text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>
              {['Weekly Maintenance','Green Pool Rescue','Equipment Repair',
                'Tile & Surface Cleaning','Leak Detection','One-Time Deep Clean',
                'Chemical Balancing','Pool Opening / Closing'].map(s => <li key={s}>{s}</li>)}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-white font-semibold text-sm mb-5 tracking-wide">Contact</p>
            <div className="space-y-4 text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>
              <div>📍 10917 Salford Drive<br />Las Vegas, NV 89144</div>
              <div><a href="tel:7024602406" className="text-white font-semibold hover:text-[#90e0ef] transition-colors">📞 702-460-2406</a></div>
              <div><a href="mailto:info@corwinpools.com" className="hover:text-white transition-colors">✉️ info@corwinpools.com</a></div>
              <div>Mon–Fri 7am–6pm · Sat 8am–4pm</div>
            </div>
            <a href="tel:7024602406"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white px-4 py-2.5 rounded-xl transition-all hover:opacity-90"
              style={{ background: 'var(--nm-blue)', boxShadow: '3px 3px 8px rgba(0,0,0,0.3)' }}>
              Get a Free Estimate
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs"
          style={{ borderTop: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.35)' }}>
          <div>© {new Date().getFullYear()} Corwin Pool Service LLC. All rights reserved.</div>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-medium"
              style={{ background: 'rgba(0,119,182,0.2)', color: 'var(--nm-sky)' }}>
              NV Lic. #C-53-12345
            </span>
            <span>Licensed · Bonded · Insured</span>
          </div>
          <div className="flex gap-4">
            <Link to="/contact" className="hover:text-white transition-colors">Privacy</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
