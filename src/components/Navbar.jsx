import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const links = [
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
    const fn = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  useEffect(() => setOpen(false), [location])

  const active = (to) => location.pathname === to

  return (
    <header
      className="sticky top-0 z-50 transition-all duration-300"
      style={{
        background: 'var(--bg)',
        boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.06)' : 'none',
        borderBottom: scrolled ? 'none' : '1px solid rgba(192,204,216,0.4)',
      }}
    >
      <div className="container">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <img src="/logo.png" alt="Corwin Pool Service" className="h-9 w-auto" onError={e => e.target.style.display='none'} />
            <span style={{ color: 'var(--ink)', fontWeight: 700, fontSize: '1rem', letterSpacing: '-0.01em' }}>
              Corwin <span style={{ color: 'var(--blue)', fontWeight: 400 }}>Pool Service</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                style={{
                  padding: '0.4rem 0.9rem',
                  borderRadius: '0.5rem',
                  fontSize: '0.9rem',
                  fontWeight: active(to) ? 600 : 500,
                  color: active(to) ? 'var(--blue)' : 'var(--body)',
                  background: active(to) ? 'var(--bg)' : 'transparent',
                  boxShadow: active(to) ? 'inset 3px 3px 7px #c0ccd8, inset -3px -3px 7px #ffffff' : 'none',
                  transition: 'all 0.15s',
                }}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* CTA buttons */}
          <div className="hidden md:flex items-center gap-2">
            <a
              href="tel:7024602406"
              className="btn btn-ghost"
              style={{ padding: '0.45rem 1rem', fontSize: '0.875rem' }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.59 3h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              702-460-2406
            </a>
            <Link to="/book" className="btn btn-primary" style={{ padding: '0.45rem 1.1rem', fontSize: '0.875rem' }}>
              Book Now
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(o => !o)}
            className="md:hidden"
            style={{ width: '2.5rem', height: '2.5rem', borderRadius: '0.625rem', background: 'var(--bg)', boxShadow: 'var(--sh-sm)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '5px', border: 'none', cursor: 'pointer' }}
            aria-label="Menu"
          >
            <span style={{ width: '18px', height: '2px', background: open ? 'var(--blue)' : 'var(--body)', borderRadius: '1px', transition: 'all 0.2s', transform: open ? 'rotate(45deg) translateY(7px)' : 'none' }} />
            <span style={{ width: '18px', height: '2px', background: 'var(--body)', borderRadius: '1px', opacity: open ? 0 : 1, transition: 'all 0.2s' }} />
            <span style={{ width: '18px', height: '2px', background: open ? 'var(--blue)' : 'var(--body)', borderRadius: '1px', transition: 'all 0.2s', transform: open ? 'rotate(-45deg) translateY(-7px)' : 'none' }} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{ background: 'var(--bg)', borderTop: '1px solid rgba(192,204,216,0.4)', padding: '1rem 1.5rem 1.5rem' }}>
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              style={{ display: 'block', padding: '0.65rem 0.75rem', borderRadius: '0.625rem', fontWeight: active(to) ? 600 : 500, color: active(to) ? 'var(--blue)' : 'var(--body)', marginBottom: '0.25rem', background: active(to) ? 'var(--bg)' : 'transparent', boxShadow: active(to) ? 'inset 3px 3px 7px #c0ccd8, inset -3px -3px 7px #ffffff' : 'none' }}
            >
              {label}
            </Link>
          ))}
          <div style={{ marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <a href="tel:7024602406" className="btn btn-ghost" style={{ width: '100%' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.59 3h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              702-460-2406
            </a>
            <Link to="/book" className="btn btn-primary" style={{ width: '100%' }}>Book Now</Link>
          </div>
        </div>
      )}
    </header>
  )
}
