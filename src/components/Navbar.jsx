import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { to: '/',         label: 'Home'     },
  { to: '/services', label: 'Services' },
  { to: '/about',    label: 'About'    },
  { to: '/reviews',  label: 'Reviews'  },
  { to: '/contact',  label: 'Contact'  },
]

export default function Navbar() {
  const [open, setOpen]       = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location               = useLocation()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])
  useEffect(() => setOpen(false), [location])

  return (
    <>
      {/* Top strip */}
      <div style={{ background: 'var(--nm-navy)' }}
        className="text-white text-xs font-medium text-center py-2 px-4 tracking-wide">
        <span style={{ color: 'rgba(255,255,255,0.65)' }}>Best of Las Vegas Gold Winner 2023</span>
        <span className="mx-3" style={{ color: 'rgba(255,255,255,0.2)' }}>·</span>
        <span style={{ color: 'rgba(255,255,255,0.65)' }}>Serving Vegas Since 2000</span>
        <span className="mx-3" style={{ color: 'rgba(255,255,255,0.2)' }}>·</span>
        <a href="tel:7024602406" style={{ color: 'var(--nm-sky)' }}
          className="font-semibold hover:text-white transition-colors">702-460-2406</a>
      </div>

      {/* Main nav */}
      <nav className="sticky top-0 z-50 transition-all duration-300"
        style={{
          background: 'var(--nm-bg)',
          boxShadow: scrolled ? '0 4px 20px rgba(184,204,216,0.8)' : '0 2px 12px rgba(184,204,216,0.5)',
        }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img
              src="https://static.wixstatic.com/media/bea8df_fd28c5a1d6304adabc5bf85a6f34e90a~mv2_d_3600_3600_s_4_2.png/v1/crop/x_0,y_446,w_3600,h_2389/fill/w_600,h_400,al_c,q_95,enc_png/Corwin%20Pool%20Main.png"
              alt="Corwin Pool Service" className="h-11 w-auto" />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ to, label }) => {
              const active = location.pathname === to
              return (
                <Link key={to} to={to}
                  className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
                  style={{
                    color: active ? 'var(--nm-blue)' : 'var(--nm-body)',
                    background: 'var(--nm-bg)',
                    boxShadow: active
                      ? 'inset 3px 3px 6px #b8ccd8, inset -3px -3px 6px #ffffff'
                      : 'none',
                    fontWeight: active ? 600 : 400,
                  }}
                  onMouseEnter={e => {
                    if (!active) {
                      e.currentTarget.style.boxShadow = '4px 4px 9px #b8ccd8, -4px -4px 9px #ffffff'
                      e.currentTarget.style.color = 'var(--nm-navy)'
                    }
                  }}
                  onMouseLeave={e => {
                    if (!active) {
                      e.currentTarget.style.boxShadow = 'none'
                      e.currentTarget.style.color = 'var(--nm-body)'
                    }
                  }}>
                  {label}
                </Link>
              )
            })}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <a href="tel:7024602406" className="nm-btn-secondary text-xs py-2 px-4">
              📞 702-460-2406
            </a>
            <Link to="/book" className="nm-btn-primary text-xs py-2 px-4">Book Free Estimate</Link>
          </div>

          {/* Hamburger */}
          <button className="md:hidden p-2 rounded-xl transition-all"
            style={{ background: 'var(--nm-bg)', boxShadow: 'var(--shadow-nm-sm)' }}
            onClick={() => setOpen(!open)} aria-label="Toggle menu">
            <div className={`w-5 h-0.5 transition-all mb-1.5 ${open ? 'rotate-45 translate-y-2' : ''}`}
              style={{ background: 'var(--nm-navy)' }}/>
            <div className={`w-5 h-0.5 transition-all ${open ? 'opacity-0' : ''}`}
              style={{ background: 'var(--nm-navy)' }}/>
            <div className={`w-5 h-0.5 transition-all mt-1.5 ${open ? '-rotate-45 -translate-y-2' : ''}`}
              style={{ background: 'var(--nm-navy)' }}/>
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}
              style={{ background: 'var(--nm-alt)', borderTop: '1px solid var(--nm-dark)' }}
              className="md:hidden overflow-hidden">
              <div className="px-4 py-4 flex flex-col gap-2">
                {navLinks.map(({ to, label }) => (
                  <Link key={to} to={to}
                    className="px-4 py-3 rounded-xl font-medium text-sm text-center transition-all"
                    style={{
                      color: location.pathname === to ? 'var(--nm-blue)' : 'var(--nm-body)',
                      boxShadow: location.pathname === to
                        ? 'inset 3px 3px 6px #b8ccd8, inset -3px -3px 6px #ffffff'
                        : '4px 4px 9px #b8ccd8, -4px -4px 9px #ffffff',
                      background: 'var(--nm-bg)',
                    }}>
                    {label}
                  </Link>
                ))}
                <a href="tel:7024602406" className="nm-btn-secondary justify-center mt-1 py-2.5">
                  📞 702-460-2406
                </a>
                <Link to="/book" className="nm-btn-primary justify-center py-2.5">
                  Book Free Estimate
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  )
}
