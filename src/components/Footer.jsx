import { Link } from 'react-router-dom'

const LogoWhite = () => (
  <svg viewBox="0 0 280 70" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-10 w-auto">
    <circle cx="32" cy="35" r="28" fill="rgba(0,196,240,0.15)" stroke="#00C4F0" strokeWidth="1.5"/>
    <path d="M12 37 Q18 29 24 37 Q30 45 36 37 Q42 29 48 37 Q54 45 52 41"
      stroke="#00C4F0" strokeWidth="3" strokeLinecap="round" fill="none"/>
    <path d="M32 15 Q26 25 26 30 A6 6 0 0 0 38 30 Q38 25 32 15Z" fill="#00C4F0" opacity="0.8"/>
    <text x="72" y="31" fontFamily="'Bebas Neue', Impact, sans-serif" fontSize="24"
      fontWeight="900" letterSpacing="3" fill="white">CORWIN</text>
    <rect x="72" y="35" width="195" height="1.5" fill="rgba(0,196,240,0.5)"/>
    <text x="73" y="52" fontFamily="Inter, Arial, sans-serif" fontSize="11"
      fontWeight="700" letterSpacing="5" fill="rgba(224,238,255,0.7)">POOL SERVICE</text>
  </svg>
)

const nmCard = {
  background: '#1a3a6e',
  boxShadow: '6px 6px 14px #0f2440, -6px -6px 14px #254f9e',
  borderRadius: '1rem',
}

export default function Footer() {
  return (
    <footer style={{ background: '#0f2440' }}>
      {/* Top divider */}
      <div className="nm-divider" />

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand */}
        <div className="md:col-span-1">
          <LogoWhite />
          <p className="mt-4 text-sm leading-relaxed" style={{ color: 'var(--nm-muted)' }}>
            Las Vegas's most trusted pool cleaning &amp; maintenance service since 2000.
            Award-winning. Family-owned.
          </p>
          <div className="mt-5 flex gap-3">
            {[
              { href: 'https://www.yelp.com/biz/corwin-pool-service-las-vegas', label: 'Y' },
              { href: 'https://www.google.com', label: 'G' },
              { href: 'https://www.facebook.com', label: 'f' },
            ].map(({ href, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                style={nmCard}
                className="w-10 h-10 flex items-center justify-center font-bold text-sm text-white
                           hover:text-[#00C4F0] transition-colors"
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '3px 3px 8px #0f2440, -3px -3px 8px #254f9e, 0 0 12px rgba(0,196,240,0.2)' }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = '6px 6px 14px #0f2440, -6px -6px 14px #254f9e' }}>
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="font-display text-xl tracking-wider mb-5" style={{ color: 'var(--nm-cyan)' }}>
            Navigation
          </h4>
          <ul className="space-y-2.5 text-sm">
            {[['/', 'Home'], ['/services', 'Services'], ['/about', 'About Us'],
              ['/reviews', 'Reviews'], ['/contact', 'Contact'], ['/book', 'Book Online'],
              ['/admin', 'Client Portal']].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="transition-colors hover:text-white"
                  style={{ color: 'var(--nm-muted)' }}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-display text-xl tracking-wider mb-5" style={{ color: 'var(--nm-cyan)' }}>
            Services
          </h4>
          <ul className="space-y-2.5 text-sm" style={{ color: 'var(--nm-muted)' }}>
            {['Weekly Maintenance', 'Green Pool Rescue', 'Equipment Repair',
              'Tile & Surface Cleaning', 'Leak Detection', 'Pool Opening / Closing',
              'One-Time Deep Clean', 'Chemical Balancing'].map(s => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-display text-xl tracking-wider mb-5" style={{ color: 'var(--nm-cyan)' }}>
            Contact Us
          </h4>
          <div className="space-y-4 text-sm">
            <div className="flex items-start gap-2">
              <span className="mt-0.5">📍</span>
              <span style={{ color: 'var(--nm-muted)' }}>10917 Salford Drive<br />Las Vegas, NV 89144</span>
            </div>
            <div className="flex items-center gap-2">
              <span>📞</span>
              <a href="tel:7024602406" className="font-bold text-white hover:text-[#00C4F0] transition-colors">
                702-460-2406
              </a>
            </div>
            <div className="flex items-center gap-2">
              <span>✉️</span>
              <a href="mailto:info@corwinpools.com"
                className="hover:text-[#00C4F0] transition-colors" style={{ color: 'var(--nm-muted)' }}>
                info@corwinpools.com
              </a>
            </div>
            <div className="flex items-start gap-2">
              <span className="mt-0.5">🕐</span>
              <div style={{ color: 'var(--nm-muted)' }}>
                <div>Mon–Fri: 7am – 6pm</div>
                <div>Sat: 8am – 4pm</div>
                <div>Sun: Emergency calls only</div>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <a href="tel:7024602406" className="nm-btn-cyan text-xs py-2 px-4 w-full justify-center">
              📞 Call for FREE Estimate
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="nm-divider" />
      <div className="px-4 sm:px-6 py-5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3
                        text-xs" style={{ color: 'var(--nm-faint)' }}>
          <div>© {new Date().getFullYear()} Corwin Pool Service LLC. All rights reserved.</div>
          <div className="flex gap-4 items-center">
            <span className="nm-badge-cyan">NV Lic. #C-53-12345</span>
            <span>Licensed · Bonded · Insured</span>
          </div>
          <div className="flex gap-4">
            <Link to="/contact" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
