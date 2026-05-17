import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const LogoMark = ({ white = false }) => (
  <svg viewBox="0 0 280 70" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-10 w-auto">
    <circle cx="32" cy="35" r="28" fill={white ? 'white' : '#004E98'} stroke="#0D0D0D" strokeWidth="2.5"/>
    <path d="M12 37 Q18 29 24 37 Q30 45 36 37 Q42 29 48 37 Q54 45 52 41" stroke={white ? '#004E98' : '#00C4F0'} strokeWidth="3.5" strokeLinecap="round" fill="none"/>
    <path d="M12 43 Q18 35 24 43 Q30 51 36 43 Q42 35 48 43" stroke={white ? '#004E98' : 'white'} strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6"/>
    <path d="M32 15 Q26 25 26 30 A6 6 0 0 0 38 30 Q38 25 32 15Z" fill={white ? '#004E98' : '#00C4F0'}/>
    <text x="72" y="31" fontFamily="'Bebas Neue', Impact, sans-serif" fontSize="24" fontWeight="900" letterSpacing="3" fill={white ? 'white' : '#004E98'}>CORWIN</text>
    <rect x="72" y="35" width="195" height="2.5" fill="#00C4F0"/>
    <text x="73" y="52" fontFamily="Inter, Arial, sans-serif" fontSize="11" fontWeight="700" letterSpacing="5" fill={white ? 'white' : '#0D0D0D'}>POOL SERVICE</text>
  </svg>
)

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/reviews', label: 'Reviews' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location])

  const isHome = location.pathname === '/'

  return (
    <>
      {/* Top bar */}
      <div className="bg-brand-blue text-white text-xs font-semibold tracking-wider text-center py-2 border-b-3 border-brand-black">
        🏆 Best of Las Vegas Gold Winner 2023 &nbsp;|&nbsp; Serving the Vegas Valley Since 2000 &nbsp;|&nbsp;
        <a href="tel:7024602406" className="underline hover:text-brand-cyan transition-colors"> 702-460-2406</a>
      </div>

      {/* Main nav */}
      <nav className={`sticky top-0 z-50 border-b-3 border-brand-black transition-all duration-300 ${
        scrolled || !isHome ? 'bg-brand-cream shadow-neo' : 'bg-brand-cream'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <LogoMark />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`px-4 py-2 text-sm font-bold uppercase tracking-wider border-3 transition-all
                  ${location.pathname === to
                    ? 'border-brand-black bg-brand-blue text-white shadow-neo'
                    : 'border-transparent hover:border-brand-black hover:bg-brand-yellow'
                  }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* CTA + Phone */}
          <div className="hidden md:flex items-center gap-3">
            <a href="tel:7024602406" className="btn-secondary text-xs py-2 px-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              702-460-2406
            </a>
            <Link to="/book" className="btn-primary text-xs py-2 px-4">
              Book Now →
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden border-3 border-brand-black p-2 bg-white shadow-neo"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <div className={`w-5 h-0.5 bg-brand-black transition-all mb-1 ${open ? 'rotate-45 translate-y-1.5' : ''}`}/>
            <div className={`w-5 h-0.5 bg-brand-black transition-all ${open ? 'opacity-0' : ''}`}/>
            <div className={`w-5 h-0.5 bg-brand-black transition-all mt-1 ${open ? '-rotate-45 -translate-y-1.5' : ''}`}/>
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden bg-brand-cream border-t-3 border-brand-black"
            >
              <div className="px-4 py-4 flex flex-col gap-2">
                {navLinks.map(({ to, label }) => (
                  <Link
                    key={to}
                    to={to}
                    className={`px-4 py-3 font-bold uppercase tracking-wider border-3 text-center
                      ${location.pathname === to
                        ? 'border-brand-black bg-brand-blue text-white'
                        : 'border-brand-black bg-white hover:bg-brand-yellow'
                      }`}
                  >
                    {label}
                  </Link>
                ))}
                <a href="tel:7024602406" className="btn-secondary justify-center mt-2">
                  📞 702-460-2406
                </a>
                <Link to="/book" className="btn-primary justify-center">
                  Book Now →
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  )
}
