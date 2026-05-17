import { Link } from 'react-router-dom'

const LogoWhite = () => (
  <svg viewBox="0 0 280 70" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-10 w-auto">
    <circle cx="32" cy="35" r="28" fill="white" stroke="white" strokeWidth="2"/>
    <path d="M12 37 Q18 29 24 37 Q30 45 36 37 Q42 29 48 37 Q54 45 52 41" stroke="#004E98" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
    <path d="M32 15 Q26 25 26 30 A6 6 0 0 0 38 30 Q38 25 32 15Z" fill="#004E98"/>
    <text x="72" y="31" fontFamily="'Bebas Neue', Impact, sans-serif" fontSize="24" fontWeight="900" letterSpacing="3" fill="white">CORWIN</text>
    <rect x="72" y="35" width="195" height="2.5" fill="#00C4F0"/>
    <text x="73" y="52" fontFamily="Inter, Arial, sans-serif" fontSize="11" fontWeight="700" letterSpacing="5" fill="white">POOL SERVICE</text>
  </svg>
)

export default function Footer() {
  return (
    <footer className="bg-brand-blue text-white border-t-3 border-brand-black">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand column */}
        <div className="md:col-span-1">
          <LogoWhite />
          <p className="mt-4 text-sm text-blue-200 leading-relaxed">
            Las Vegas's most trusted pool cleaning & maintenance service since 2000. Award-winning. Family-owned.
          </p>
          <div className="mt-4 flex gap-3">
            <a href="https://www.yelp.com/biz/corwin-pool-service-las-vegas" target="_blank" rel="noopener noreferrer"
               className="w-9 h-9 bg-white border-3 border-white flex items-center justify-center text-brand-blue font-bold text-xs hover:bg-brand-yellow hover:text-brand-black transition-colors shadow-neo">
              Y
            </a>
            <a href="https://www.google.com" target="_blank" rel="noopener noreferrer"
               className="w-9 h-9 bg-white border-3 border-white flex items-center justify-center text-brand-blue font-bold text-xs hover:bg-brand-yellow hover:text-brand-black transition-colors shadow-neo">
              G
            </a>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"
               className="w-9 h-9 bg-white border-3 border-white flex items-center justify-center text-brand-blue font-bold text-xs hover:bg-brand-yellow hover:text-brand-black transition-colors shadow-neo">
              f
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="font-display text-xl tracking-wider text-brand-cyan mb-4">Navigation</h4>
          <ul className="space-y-2 text-sm">
            {[['/', 'Home'], ['/services', 'Services'], ['/about', 'About Us'], ['/reviews', 'Reviews'], ['/contact', 'Contact'], ['/book', 'Book Online'], ['/admin', 'Client Portal']].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="hover:text-brand-cyan transition-colors">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-display text-xl tracking-wider text-brand-cyan mb-4">Services</h4>
          <ul className="space-y-2 text-sm text-blue-200">
            {['Weekly Maintenance', 'Green Pool Rescue', 'Equipment Repair', 'Tile & Surface Cleaning', 'Leak Detection', 'Pool Opening / Closing', 'One-Time Deep Clean', 'Chemical Balancing'].map(s => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-display text-xl tracking-wider text-brand-cyan mb-4">Contact Us</h4>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <span className="mt-0.5">📍</span>
              <span className="text-blue-200">10917 Salford Drive<br />Las Vegas, NV 89144</span>
            </div>
            <div className="flex items-center gap-2">
              <span>📞</span>
              <a href="tel:7024602406" className="text-white font-bold hover:text-brand-cyan transition-colors">702-460-2406</a>
            </div>
            <div className="flex items-center gap-2">
              <span>✉️</span>
              <a href="mailto:info@corwinpools.com" className="text-blue-200 hover:text-brand-cyan transition-colors">info@corwinpools.com</a>
            </div>
            <div className="flex items-start gap-2">
              <span className="mt-0.5">🕐</span>
              <div className="text-blue-200">
                <div>Mon–Fri: 7am – 6pm</div>
                <div>Sat: 8am – 4pm</div>
                <div>Sun: Emergency calls only</div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-6">
            <a href="tel:7024602406" className="btn-primary text-xs py-2 px-4 w-full justify-center">
              📞 Call for FREE Estimate
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t-3 border-brand-black bg-brand-blue-dark px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-blue-300">
          <div>© {new Date().getFullYear()} Corwin Pool Service LLC. All rights reserved.</div>
          <div className="flex gap-4 items-center">
            <span className="bg-brand-yellow text-brand-black font-bold px-2 py-0.5 border border-brand-black">
              NV Lic. #C-53-12345
            </span>
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
