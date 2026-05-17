import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const LogoMark = () => (
  <img
    src="https://static.wixstatic.com/media/bea8df_fd28c5a1d6304adabc5bf85a6f34e90a~mv2_d_3600_3600_s_4_2.png/v1/crop/x_0,y_446,w_3600,h_2389/fill/w_600,h_400,al_c,q_95,enc_png/Corwin%20Pool%20Main.png"
    alt="Corwin Pool Service"
    className="h-12 w-auto"
    style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.4))' }}
  />
)

const navLinks = [
  { to: '/',         label: 'Home'     },
  { to: '/services', label: 'Services' },
  { to: '/about',    label: 'About'    },
  { to: '/reviews',  label: 'Reviews'  },
  { to: '/contact',  label: 'Contact'  },
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

  useEffect(() => { setOpen(false) }, [location])

  const nmBase     = { background: '#1a3a6e', boxShadow: '3px 3px 8px #0f2440, -3px -3px 8px #254f9e' }
  const nmInset    = { background: '#1a3a6e', boxShadow: 'inset 3px 3px 8px #0f2440, inset -3px -3px 8px #254f9e' }

  return (
    <>
      {/* Top bar */}
      <div style={{ background: '#0f2440', boxShadow: '0 2px 8px rgba(0,0,0,0.4)' }}
        className="text-white text-xs font-semibold tracking-wider text-center py-2">
        <span style={{ color: 'rgba(224,238,255,0.65)' }}>Best of Las Vegas Gold Winner 2023</span>
        <span className="mx-3" style={{ color: 'rgba(0,196,240,0.3)' }}>|</span>
        <span style={{ color: 'rgba(224,238,255,0.65)' }}>Serving the Vegas Valley Since 2000</span>
        <span className="mx-3" style={{ color: 'rgba(0,196,240,0.3)' }}>|</span>
        <a href="tel:7024602406" style={{ color: '#00C4F0' }} className="font-bold hover:text-white transition-colors">
          702-460-2406
        </a>
      </div>

      {/* Main nav */}
      <nav style={{
          background: '#162f5a',
          boxShadow: scrolled
            ? '0 4px 20px rgba(15,36,64,0.9), 0 8px 24px rgba(0,196,240,0.04)'
            : '6px 6px 14px #0f2440, -6px -6px 14px #254f9e',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          transition: 'all 0.3s ease',
        }}
        className="sticky top-0 z-50">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <Link to="/" className="flex-shrink-0"><LogoMark /></Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ to, label }) => {
              const active = location.pathname === to
              return (
                <Link key={to} to={to}
                  style={active ? nmInset : {}}
                  className={`px-4 py-2 text-sm font-bold uppercase tracking-wider rounded-xl transition-all duration-200 ${
                    active ? 'text-[#00C4F0]' : 'text-white/75 hover:text-white'
                  }`}
                  onMouseEnter={e => { if (!active) Object.assign(e.currentTarget.style, nmBase) }}
                  onMouseLeave={e => { if (!active) { e.currentTarget.style.background = ''; e.currentTarget.style.boxShadow = '' } }}>
                  {label}
                </Link>
              )
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a href="tel:7024602406" className="nm-btn-primary text-xs py-2 px-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              702-460-2406
            </a>
            <Link to="/book" className="nm-btn-yellow text-xs py-2 px-4">Book Now →</Link>
          </div>

          {/* Hamburger */}
          <button style={nmBase} className="md:hidden rounded-xl p-2.5"
            onClick={() => setOpen(!open)} aria-label="Toggle menu">
            <div className={`w-5 h-0.5 bg-white transition-all mb-1.5 ${open ? 'rotate-45 translate-y-2' : ''}`}/>
            <div className={`w-5 h-0.5 bg-white transition-all ${open ? 'opacity-0' : ''}`}/>
            <div className={`w-5 h-0.5 bg-white transition-all mt-1.5 ${open ? '-rotate-45 -translate-y-2' : ''}`}/>
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}
              style={{ background: '#0f2440' }} className="md:hidden overflow-hidden">
              <div className="px-4 py-4 flex flex-col gap-2">
                {navLinks.map(({ to, label }) => (
                  <Link key={to} to={to}
                    style={location.pathname === to ? nmInset : nmBase}
                    className={`px-4 py-3 font-bold uppercase tracking-wider rounded-xl text-center text-sm transition-all ${
                      location.pathname === to ? 'text-[#00C4F0]' : 'text-white/80'
                    }`}>
                    {label}
                  </Link>
                ))}
                <a href="tel:7024602406" className="nm-btn-primary justify-center mt-2 py-3">📞 702-460-2406</a>
                <Link to="/book" className="nm-btn-yellow justify-center py-3">Book Now →</Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  )
}
