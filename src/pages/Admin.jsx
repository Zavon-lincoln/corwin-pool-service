import React, { useState, useEffect } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { mockLeads, mockClients, mockAppointments } from '../lib/mockData'

const fmtDate = iso => new Date(iso).toLocaleDateString('en-US', { month:'short', day:'numeric', year:'numeric' })
const fmtDT   = iso => new Date(iso).toLocaleDateString('en-US', { month:'short', day:'numeric', hour:'numeric', minute:'2-digit' })

const STATUS_COLOR = {
  new:'blue', contacted:'orange', qualified:'teal', converted:'green', lost:'red',
  scheduled:'blue', completed:'green', cancelled:'gray', 'no-show':'red',
  active:'green', inactive:'gray', vip:'teal',
}

function StatusBadge({ status }) {
  const c = STATUS_COLOR[status] || 'gray'
  const map = { blue:'var(--blue)', orange:'var(--orange)', teal:'var(--teal)', green:'#2d8a4e', red:'#b83232', gray:'var(--muted)' }
  return (
    <span className="status-badge" style={{ color: map[c] }}>
      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: map[c], flexShrink: 0 }} />
      {status}
    </span>
  )
}

function PasswordGate({ onAuth }) {
  const [pw, setPw] = useState('')
  const [err, setErr] = useState(false)
  const submit = e => {
    e.preventDefault()
    if (pw === 'admin123') { onAuth() }
    else { setErr(true); setTimeout(() => setErr(false), 2000) }
  }
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div className="card-lg" style={{ maxWidth: '22rem', width: '100%', padding: '3rem', textAlign: 'center' }}>
        <div className="icon-wrap-lg" style={{ margin: '0 auto 1.25rem' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
        </div>
        <h1 style={{ fontWeight: 700, fontSize: '1.375rem', color: 'var(--ink)', marginBottom: '0.25rem' }}>Admin Portal</h1>
        <p style={{ fontSize: '0.875rem', color: 'var(--muted)', marginBottom: '2rem' }}>Corwin Pool Service Dashboard</p>
        <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
          <input type="password" value={pw} onChange={e => setPw(e.target.value)} placeholder="Enter password" className="field" autoFocus
            style={{ textAlign: 'center', ...(err ? { boxShadow: 'inset 4px 4px 9px #c0ccd8, inset -4px -4px 9px #fff, 0 0 0 2px rgba(184,50,50,0.25)' } : {}) }} />
          {err && <p style={{ fontSize: '0.8125rem', color: '#b83232', fontWeight: 500 }}>Incorrect password</p>}
          <button type="submit" className="btn btn-blue" style={{ justifyContent: 'center' }}>Sign In</button>
        </form>
        <p style={{ fontSize: '0.75rem', color: 'var(--faint)', marginTop: '1.25rem' }}>Demo password: admin123</p>
      </div>
    </div>
  )
}

function OverviewTab({ leads, clients, appointments }) {
  const now = new Date()
  const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  const weekStart = new Date(now); weekStart.setDate(now.getDate() - now.getDay())
  const weekEnd   = new Date(weekStart); weekEnd.setDate(weekStart.getDate() + 7)

  const leadsMonth = leads.filter(l => new Date(l.created_at) >= thisMonth).length
  const apptWeek   = appointments.filter(a => { const d = new Date(a.scheduled_at); return d >= weekStart && d < weekEnd }).length
  const converted  = leads.filter(l => l.status === 'converted').length
  const convRate   = leads.length ? ((converted / leads.length) * 100).toFixed(0) : 0
  const revenue    = appointments.filter(a => a.status === 'completed').length * 180

  const STATS = [
    { label:'Leads This Month', value: leadsMonth, color:'var(--blue)', icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
    { label:'Appts This Week',  value: apptWeek,  color:'var(--teal)',  icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> },
    { label:'Conversion Rate',  value:`${convRate}%`, color:'var(--orange)', icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg> },
    { label:'Revenue Est.',     value:`$${revenue.toLocaleString()}`, color:'#2d8a4e', icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg> },
  ]

  const activity = [
    ...leads.slice(0, 5).map(l => ({ text:`New lead: ${l.name}`, time: l.created_at, icon:'lead' })),
    ...appointments.filter(a => a.status === 'completed').slice(0,5).map(a => ({ text:`Completed: ${a.service_type}`, time: a.scheduled_at, icon:'check' })),
  ].sort((a,b) => new Date(b.time)-new Date(a.time)).slice(0,8)

  const upcoming = appointments.filter(a => a.status === 'scheduled' && new Date(a.scheduled_at) > now)
    .sort((a,b) => new Date(a.scheduled_at)-new Date(b.scheduled_at)).slice(0,6)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1rem' }}>
        {STATS.map(({ label, value, color, icon }) => (
          <div key={label} className="card" style={{ padding: '1.25rem' }}>
            <div className="icon-wrap" style={{ marginBottom: '0.75rem', color }}>{icon}</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 700, color, lineHeight: 1, marginBottom: '0.25rem' }}>{value}</div>
            <div style={{ fontSize: '0.75rem', fontWeight: 500, color:'var(--muted)', textTransform:'uppercase', letterSpacing:'0.06em' }}>{label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div className="card" style={{ overflow: 'hidden' }}>
          <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid rgba(192,204,216,0.4)' }}>
            <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--blue)' }}>Recent Activity</p>
          </div>
          {activity.map((item, i) => (
            <div key={i} style={{ padding: '0.75rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem', borderBottom: i < activity.length-1 ? '1px solid rgba(192,204,216,0.25)' : 'none' }}>
              <div className="icon-wrap" style={{ width: '2rem', height: '2rem', borderRadius: '0.5rem', color: item.icon === 'check' ? '#2d8a4e' : 'var(--blue)', flexShrink: 0 }}>
                {item.icon === 'check'
                  ? <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  : <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                }
              </div>
              <div>
                <p style={{ fontSize: '0.8375rem', fontWeight: 600, color: 'var(--ink)' }}>{item.text}</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{fmtDate(item.time)}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="card" style={{ overflow: 'hidden' }}>
          <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid rgba(192,204,216,0.4)' }}>
            <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--orange)' }}>Upcoming Appointments</p>
          </div>
          {upcoming.map((a, i) => {
            const client = clients.find(c => c.id === a.client_id)
            return (
              <div key={a.id} style={{ padding: '0.75rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: i < upcoming.length-1 ? '1px solid rgba(192,204,216,0.25)' : 'none' }}>
                <div>
                  <p style={{ fontSize: '0.8375rem', fontWeight: 600, color: 'var(--ink)' }}>{client?.name || 'New Booking'}</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{a.service_type}</p>
                </div>
                <p style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--blue)', whiteSpace: 'nowrap' }}>{fmtDT(a.scheduled_at)}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function LeadsTab({ leads, setLeads }) {
  const [filter, setFilter] = useState('all')
  const [expanded, setExpanded] = useState(null)
  const statuses = ['all','new','contacted','qualified','converted','lost']
  const filtered = filter === 'all' ? leads : leads.filter(l => l.status === filter)

  const updateStatus = async (id, status) => {
    if (isSupabaseConfigured()) await supabase.from('leads').update({ status }).eq('id', id)
    setLeads(ls => ls.map(l => l.id === id ? { ...l, status } : l))
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {statuses.map(s => (
          <button key={s} onClick={() => setFilter(s)} className="btn-inset" style={{ padding: '0.35rem 0.875rem', fontSize: '0.8rem', fontWeight: 600, borderRadius: '0.5rem', cursor: 'pointer', border: 'none', ...(filter === s ? { color: 'var(--blue)', boxShadow: 'inset 3px 3px 7px #c0ccd8, inset -3px -3px 7px #fff' } : { color: 'var(--muted)', boxShadow: '3px 3px 7px #c0ccd8, -3px -3px 7px #fff', background: 'var(--bg)' }) }}>
            {s} ({s === 'all' ? leads.length : leads.filter(l => l.status === s).length})
          </button>
        ))}
      </div>
      <div className="card" style={{ overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', fontSize: '0.875rem', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--alt)' }}>
                {['Name','Phone','Service','Status','Date',''].map(h => (
                  <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--muted)', borderBottom: '1px solid rgba(192,204,216,0.5)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(lead => (
                <React.Fragment key={lead.id}>
                  <tr onClick={() => setExpanded(expanded === lead.id ? null : lead.id)} style={{ cursor: 'pointer', background: expanded === lead.id ? 'var(--alt)' : 'transparent' }}>
                    <td style={{ padding: '0.875rem 1rem', fontWeight: 600, color: 'var(--ink)', borderBottom: '1px solid rgba(192,204,216,0.25)' }}>{lead.name}</td>
                    <td style={{ padding: '0.875rem 1rem', borderBottom: '1px solid rgba(192,204,216,0.25)' }}><a href={`tel:${lead.phone}`} style={{ color: 'var(--blue)', fontSize: '0.8125rem' }} onClick={e => e.stopPropagation()}>{lead.phone}</a></td>
                    <td style={{ padding: '0.875rem 1rem', color: 'var(--body)', fontSize: '0.8125rem', borderBottom: '1px solid rgba(192,204,216,0.25)' }}>{lead.service_type}</td>
                    <td style={{ padding: '0.875rem 1rem', borderBottom: '1px solid rgba(192,204,216,0.25)' }}><StatusBadge status={lead.status}/></td>
                    <td style={{ padding: '0.875rem 1rem', color: 'var(--muted)', fontSize: '0.8125rem', borderBottom: '1px solid rgba(192,204,216,0.25)' }}>{fmtDate(lead.created_at)}</td>
                    <td style={{ padding: '0.875rem 1rem', color: 'var(--blue)', fontSize: '0.8125rem', fontWeight: 700, borderBottom: '1px solid rgba(192,204,216,0.25)' }}>{expanded === lead.id ? '▲' : '▼'}</td>
                  </tr>
                  {expanded === lead.id && (
                    <tr>
                      <td colSpan={6} style={{ padding: '1.25rem 1rem', background: 'var(--alt)', borderBottom: '1px solid rgba(192,204,216,0.4)' }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', marginBottom: '0.875rem' }}>
                          <div><p style={{ fontSize: '0.7rem', color: 'var(--muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.25rem' }}>Email</p><a href={`mailto:${lead.email}`} style={{ color: 'var(--blue)', fontSize: '0.875rem' }}>{lead.email || '—'}</a></div>
                          <div><p style={{ fontSize: '0.7rem', color: 'var(--muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.25rem' }}>Message</p><p style={{ fontSize: '0.875rem', color: 'var(--body)', maxWidth: '30rem' }}>{lead.message || '—'}</p></div>
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                          <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Update:</span>
                          {['new','contacted','qualified','converted','lost'].map(s => (
                            <button key={s} onClick={e => { e.stopPropagation(); updateStatus(lead.id, s) }}
                              style={{ padding: '0.25rem 0.75rem', borderRadius: '0.4rem', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', border: 'none', background: 'var(--bg)', transition: 'box-shadow 0.15s',
                                color: lead.status === s ? 'var(--blue)' : 'var(--muted)',
                                boxShadow: lead.status === s ? 'inset 2px 2px 5px #c0ccd8, inset -2px -2px 5px #fff' : '2px 2px 5px #c0ccd8, -2px -2px 5px #fff' }}>
                              {s}
                            </button>
                          ))}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function ClientsTab({ clients, appointments }) {
  const [search, setSearch] = useState('')
  const [expanded, setExpanded] = useState(null)
  const filtered = clients.filter(c => c.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search clients..." className="field" style={{ maxWidth: '24rem' }} />
      <div className="card" style={{ overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', fontSize: '0.875rem', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--alt)' }}>
                {['Name','Phone','Service','Status','Last Appt',''].map(h => (
                  <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--muted)', borderBottom: '1px solid rgba(192,204,216,0.5)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(client => {
                const appts = appointments.filter(a => a.client_id === client.id)
                const last  = appts.filter(a => a.status === 'completed').sort((a,b) => new Date(b.scheduled_at)-new Date(a.scheduled_at))[0]
                return (
                  <React.Fragment key={client.id}>
                    <tr onClick={() => setExpanded(expanded === client.id ? null : client.id)} style={{ cursor: 'pointer', background: expanded === client.id ? 'var(--alt)' : 'transparent' }}>
                      <td style={{ padding: '0.875rem 1rem', fontWeight: 600, color: 'var(--ink)', borderBottom: '1px solid rgba(192,204,216,0.25)' }}>{client.name}</td>
                      <td style={{ padding: '0.875rem 1rem', borderBottom: '1px solid rgba(192,204,216,0.25)' }}><a href={`tel:${client.phone}`} style={{ color: 'var(--blue)', fontSize: '0.8125rem' }} onClick={e=>e.stopPropagation()}>{client.phone}</a></td>
                      <td style={{ padding: '0.875rem 1rem', color: 'var(--body)', fontSize: '0.8125rem', borderBottom: '1px solid rgba(192,204,216,0.25)' }}>{client.service_type}</td>
                      <td style={{ padding: '0.875rem 1rem', borderBottom: '1px solid rgba(192,204,216,0.25)' }}><StatusBadge status={client.status}/></td>
                      <td style={{ padding: '0.875rem 1rem', color: 'var(--muted)', fontSize: '0.8125rem', borderBottom: '1px solid rgba(192,204,216,0.25)' }}>{last ? fmtDate(last.scheduled_at) : '—'}</td>
                      <td style={{ padding: '0.875rem 1rem', color: 'var(--blue)', fontSize: '0.8125rem', fontWeight: 700, borderBottom: '1px solid rgba(192,204,216,0.25)' }}>{expanded === client.id ? '▲' : '▼'}</td>
                    </tr>
                    {expanded === client.id && (
                      <tr><td colSpan={6} style={{ padding: '1.25rem 1rem', background: 'var(--alt)', borderBottom: '1px solid rgba(192,204,216,0.4)' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                          <div>
                            {[['Address',client.address],['Email',client.email],['Notes',client.notes||'—']].map(([l,v])=>(
                              <div key={l} style={{ marginBottom: '0.75rem' }}>
                                <p style={{ fontSize: '0.7rem', color: 'var(--muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.2rem' }}>{l}</p>
                                <p style={{ fontSize: '0.875rem', color: 'var(--body)' }}>{v}</p>
                              </div>
                            ))}
                          </div>
                          <div>
                            <p style={{ fontSize: '0.7rem', color: 'var(--muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>History</p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', maxHeight: '10rem', overflowY: 'auto' }}>
                              {appts.sort((a,b)=>new Date(b.scheduled_at)-new Date(a.scheduled_at)).map(a => (
                                <div key={a.id} className="inset-sm" style={{ padding: '0.4rem 0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                  <span style={{ fontSize: '0.75rem', color: 'var(--body)' }}>{fmtDate(a.scheduled_at)} · {a.service_type}</span>
                                  <StatusBadge status={a.status}/>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </td></tr>
                    )}
                  </React.Fragment>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function AppointmentsTab({ appointments, clients }) {
  const [filter, setFilter] = useState('all')
  const statuses = ['all','scheduled','completed','cancelled','no-show']
  const filtered = (filter === 'all' ? appointments : appointments.filter(a => a.status === filter))
    .sort((a,b) => new Date(a.scheduled_at)-new Date(b.scheduled_at))

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {statuses.map(s => (
          <button key={s} onClick={() => setFilter(s)}
            style={{ padding: '0.35rem 0.875rem', fontSize: '0.8rem', fontWeight: 600, borderRadius: '0.5rem', cursor: 'pointer', border: 'none', background: 'var(--bg)', transition: 'box-shadow 0.15s',
              color: filter === s ? 'var(--blue)' : 'var(--muted)',
              boxShadow: filter === s ? 'inset 3px 3px 7px #c0ccd8, inset -3px -3px 7px #fff' : '3px 3px 7px #c0ccd8, -3px -3px 7px #fff' }}>
            {s} ({s === 'all' ? appointments.length : appointments.filter(a => a.status === s).length})
          </button>
        ))}
      </div>
      <div className="card" style={{ overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', fontSize: '0.875rem', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--alt)' }}>
                {['Client','Service','Date & Time','Status'].map(h => (
                  <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--muted)', borderBottom: '1px solid rgba(192,204,216,0.5)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((a, i) => {
                const client = clients.find(c => c.id === a.client_id)
                return (
                  <tr key={a.id} style={{ background: i % 2 === 0 ? 'transparent' : 'var(--alt)' }}>
                    <td style={{ padding: '0.875rem 1rem', fontWeight: 600, color: 'var(--ink)', borderBottom: '1px solid rgba(192,204,216,0.2)' }}>{client?.name || 'New Booking'}</td>
                    <td style={{ padding: '0.875rem 1rem', color: 'var(--body)', fontSize: '0.8125rem', borderBottom: '1px solid rgba(192,204,216,0.2)' }}>{a.service_type}</td>
                    <td style={{ padding: '0.875rem 1rem', fontWeight: 600, color: 'var(--ink)', fontSize: '0.8125rem', borderBottom: '1px solid rgba(192,204,216,0.2)' }}>{fmtDT(a.scheduled_at)}</td>
                    <td style={{ padding: '0.875rem 1rem', borderBottom: '1px solid rgba(192,204,216,0.2)' }}><StatusBadge status={a.status}/></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

const TABS = [
  { id:'Overview',     icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg> },
  { id:'Leads',        icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
  { id:'Clients',      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
  { id:'Appointments', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> },
  { id:'Settings',     icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg> },
]

export default function Admin() {
  const [authed, setAuthed]           = useState(false)
  const [tab, setTab]                 = useState('Overview')
  const [leads, setLeads]             = useState(mockLeads)
  const [clients]                     = useState(mockClients)
  const [appointments, setApps]       = useState(mockAppointments)

  useEffect(() => {
    if (!authed || !isSupabaseConfigured()) return
    Promise.all([
      supabase.from('leads').select('*').order('created_at', { ascending: false }),
      supabase.from('appointments').select('*').order('scheduled_at', { ascending: true }),
    ]).then(([{ data: l }, { data: a }]) => {
      if (l) setLeads(l)
      if (a) setApps(a)
    })
  }, [authed])

  if (!authed) return <PasswordGate onAuth={() => setAuthed(true)} />

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Admin header */}
      <header style={{ background: 'var(--alt)', borderBottom: '1px solid rgba(192,204,216,0.4)', position: 'sticky', top: 0, zIndex: 40 }}>
        <div className="container" style={{ height: '3.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--ink)' }}>Corwin</span>
            <span className="chip" style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--muted)' }}>Admin</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: isSupabaseConfigured() ? '#2d8a4e' : 'var(--orange)', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'currentColor' }} />
              {isSupabaseConfigured() ? 'Live' : 'Demo Mode'}
            </span>
            <button onClick={() => setAuthed(false)} style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--muted)', background: 'none', border: 'none', cursor: 'pointer' }}>Sign Out</button>
          </div>
        </div>
      </header>

      <div className="container" style={{ paddingTop: '1.5rem', paddingBottom: '4rem' }}>
        {/* Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          {TABS.map(({ id, icon }) => (
            <button key={id} onClick={() => setTab(id)}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.45rem 1rem', borderRadius: '0.625rem', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer', border: 'none', background: 'var(--bg)', transition: 'all 0.15s',
                color: tab === id ? 'var(--blue)' : 'var(--muted)',
                boxShadow: tab === id ? 'inset 3px 3px 7px #c0ccd8, inset -3px -3px 7px #fff' : '4px 4px 9px #c0ccd8, -4px -4px 9px #fff' }}>
              {icon}<span>{id}</span>
            </button>
          ))}
        </div>

        {tab === 'Overview'     && <OverviewTab leads={leads} clients={clients} appointments={appointments} />}
        {tab === 'Leads'        && <LeadsTab leads={leads} setLeads={setLeads} />}
        {tab === 'Clients'      && <ClientsTab clients={clients} appointments={appointments} />}
        {tab === 'Appointments' && <AppointmentsTab appointments={appointments} clients={clients} />}
        {tab === 'Settings'     && (
          <div style={{ maxWidth: '32rem' }}>
            <div className="card" style={{ overflow: 'hidden', marginBottom: '1rem' }}>
              <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid rgba(192,204,216,0.4)' }}>
                <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--blue)' }}>Business Info</p>
              </div>
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[['Name','Corwin Pool Service'],['Phone','702-460-2406'],['Email','info@corwinpools.com'],['License','NV C-53-12345']].map(([l,v]) => (
                  <div key={l} style={{ display: 'grid', gridTemplateColumns: '8rem 1fr', gap: '1rem', alignItems: 'center' }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{l}</label>
                    <input defaultValue={v} readOnly className="field" style={{ fontSize: '0.875rem' }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
