import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{ background: 'var(--ink)', padding: '4rem 0 2rem' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.5fr', gap: '3rem', marginBottom: '3rem' }}>

          <div>
            <p style={{ fontWeight: 700, fontSize: '1.125rem', color: '#fff', marginBottom: '0.75rem' }}>
              Corwin <span style={{ color: 'var(--teal)', fontWeight: 400 }}>Pool Service</span>
            </p>
            <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: '1.25rem', maxWidth: '22rem' }}>
              Las Vegas pool cleaning and maintenance since 2000. Serving Summerlin, Henderson, and Centennial Hills.
            </p>
            <a href="tel:7024602406" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#fff', fontWeight: 600, fontSize: '1rem' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.59 3h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              702-460-2406
            </a>
          </div>

          <div>
            <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '1rem' }}>Services</p>
            {['Weekly Maintenance','Green Pool Rescue','Equipment Repair','Deep Clean','Leak Detection'].map(s => (
              <Link key={s} to="/services" style={{ display: 'block', fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)', marginBottom: '0.5rem' }}>{s}</Link>
            ))}
          </div>

          <div>
            <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '1rem' }}>Company</p>
            {[['About Us','/about'],['Reviews','/reviews'],['Contact','/contact'],['Book Online','/book']].map(([l,t]) => (
              <Link key={l} to={t} style={{ display: 'block', fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)', marginBottom: '0.5rem' }}>{l}</Link>
            ))}
          </div>

          <div>
            <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '1rem' }}>Service Areas</p>
            {['Summerlin','Henderson','Centennial Hills','North Las Vegas','Spring Valley','Enterprise'].map(a => (
              <p key={a} style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)', marginBottom: '0.4rem' }}>{a}</p>
            ))}
          </div>

        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.3)' }}>
            &copy; {new Date().getFullYear()} Corwin Pool Service. All rights reserved. NV License #C-53-12345.
          </p>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {['Licensed & Insured','Best of LV 2023','Since 2000'].map(t => (
              <span key={t} style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.05)', padding: '0.2rem 0.65rem', borderRadius: '99px' }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
