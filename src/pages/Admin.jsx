import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { mockLeads, mockClients, mockAppointments } from '../lib/mockData'

// ─── PASSWORD GATE ───────────────────────────────────────────────────────────
function PasswordGate({ onAuth }) {
  const [pw, setPw] = useState('')
  const [error, setError] = useState(false)
  const handleSubmit = e => {
    e.preventDefault()
    if (pw === 'admin123') { onAuth() }
    else { setError(true); setTimeout(() => setError(false), 2000) }
  }
  return (
    <div className="min-h-screen bg-brand-blue flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="neo-card-yellow max-w-sm w-full p-10 text-center">
        <div className="font-display text-5xl text-brand-blue mb-2">ADMIN</div>
        <p className="text-brand-black/60 text-sm mb-6">Corwin Pool Service Dashboard</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={pw}
            onChange={e => setPw(e.target.value)}
            placeholder="Enter password"
            className={`form-input ${error ? 'border-red-500' : ''}`}
            autoFocus
          />
          {error && <p className="text-red-600 text-sm font-bold">Incorrect password</p>}
          <button type="submit" className="btn-blue w-full justify-center py-3">Sign In →</button>
        </form>
        <p className="text-xs text-gray-400 mt-4">Demo password: admin123</p>
      </motion.div>
    </div>
  )
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const STATUS_COLORS = {
  // Leads
  new: 'bg-blue-100 text-blue-800 border-blue-300',
  contacted: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  qualified: 'bg-purple-100 text-purple-800 border-purple-300',
  lost: 'bg-red-100 text-red-800 border-red-300',
  converted: 'bg-green-100 text-green-800 border-green-300',
  // Appointments
  scheduled: 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
  cancelled: 'bg-gray-100 text-gray-800',
  'no-show': 'bg-red-100 text-red-800',
  // Clients
  active: 'bg-green-100 text-green-800',
  inactive: 'bg-gray-100 text-gray-600',
  vip: 'bg-purple-100 text-purple-800',
}

const fmtDate = (iso) => new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
const fmtDateTime = (iso) => new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })

function StatusBadge({ status }) {
  return (
    <span className={`text-xs font-bold px-2 py-0.5 border rounded-full ${STATUS_COLORS[status] || 'bg-gray-100 text-gray-600'}`}>
      {status}
    </span>
  )
}

// ─── OVERVIEW TAB ─────────────────────────────────────────────────────────────
function OverviewTab({ leads, clients, appointments }) {
  const thisMonth = new Date(); thisMonth.setDate(1); thisMonth.setHours(0,0,0,0)
  const leadsThisMonth = leads.filter(l => new Date(l.created_at) >= thisMonth).length
  const apptThisWeek = appointments.filter(a => {
    const d = new Date(a.scheduled_at)
    const now = new Date()
    const start = new Date(now); start.setDate(now.getDate() - now.getDay())
    const end = new Date(start); end.setDate(start.getDate() + 7)
    return d >= start && d < end
  }).length
  const converted = leads.filter(l => l.status === 'converted').length
  const convRate = leads.length > 0 ? ((converted / leads.length) * 100).toFixed(0) : 0
  const avgTicket = 180
  const completedAppts = appointments.filter(a => a.status === 'completed').length
  const revenueEst = completedAppts * avgTicket

  const recentActivity = [
    ...leads.slice(0, 5).map(l => ({ type: 'lead', text: `New lead: ${l.name} — ${l.service_type}`, time: l.created_at })),
    ...appointments.filter(a => a.status === 'completed').slice(0, 5).map(a => ({ type: 'appt', text: `Completed: ${a.service_type}`, time: a.scheduled_at })),
  ].sort((a, b) => new Date(b.time) - new Date(a.time)).slice(0, 10)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Leads This Month', value: leadsThisMonth, color: 'bg-brand-blue text-white', icon: '📋' },
          { label: 'Appts This Week', value: apptThisWeek, color: 'bg-brand-cyan text-brand-black', icon: '📅' },
          { label: 'Conversion Rate', value: `${convRate}%`, color: 'bg-brand-yellow text-brand-black', icon: '📈' },
          { label: 'Revenue Est.', value: `$${revenueEst.toLocaleString()}`, color: 'bg-white text-brand-black', icon: '💰' },
        ].map(({ label, value, color, icon }) => (
          <div key={label} className={`border-3 border-brand-black p-5 shadow-neo ${color}`}>
            <div className="text-2xl mb-2">{icon}</div>
            <div className="font-display text-4xl leading-none mb-1">{value}</div>
            <div className="text-xs font-bold uppercase tracking-wider opacity-70">{label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent activity */}
        <div className="neo-card">
          <div className="bg-brand-blue p-4 border-b-3 border-brand-black">
            <h3 className="text-white font-bold uppercase tracking-wider text-sm">Recent Activity</h3>
          </div>
          <div className="divide-y divide-gray-100">
            {recentActivity.map((item, i) => (
              <div key={i} className="p-3 flex items-start gap-3">
                <span className="text-lg">{item.type === 'lead' ? '📋' : '✅'}</span>
                <div>
                  <p className="text-sm font-semibold text-brand-black">{item.text}</p>
                  <p className="text-xs text-gray-400">{fmtDate(item.time)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming appointments */}
        <div className="neo-card">
          <div className="bg-brand-yellow p-4 border-b-3 border-brand-black">
            <h3 className="text-brand-black font-bold uppercase tracking-wider text-sm">Upcoming Appointments</h3>
          </div>
          <div className="divide-y divide-gray-100">
            {appointments.filter(a => a.status === 'scheduled' && new Date(a.scheduled_at) > new Date())
              .sort((a, b) => new Date(a.scheduled_at) - new Date(b.scheduled_at))
              .slice(0, 8)
              .map((a) => {
                const client = clients.find(c => c.id === a.client_id)
                return (
                  <div key={a.id} className="p-3 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-brand-black">{client?.name || 'Unknown'}</p>
                      <p className="text-xs text-gray-500">{a.service_type} · {a.technician}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-brand-blue">{fmtDateTime(a.scheduled_at)}</p>
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── LEADS TAB ────────────────────────────────────────────────────────────────
function LeadsTab({ leads, setLeads }) {
  const [filter, setFilter] = useState('all')
  const [expanded, setExpanded] = useState(null)
  const statuses = ['all', 'new', 'contacted', 'qualified', 'converted', 'lost']
  const filtered = filter === 'all' ? leads : leads.filter(l => l.status === filter)

  const updateStatus = async (id, status) => {
    if (isSupabaseConfigured()) {
      await supabase.from('leads').update({ status }).eq('id', id)
    }
    setLeads(ls => ls.map(l => l.id === id ? { ...l, status } : l))
  }

  const handleConvert = (lead) => {
    alert(`Convert "${lead.name}" to a client — in production this creates a client record and links an appointment.`)
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {statuses.map(s => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-3 py-1.5 text-xs font-bold uppercase border-3 border-brand-black transition-all
              ${filter === s ? 'bg-brand-blue text-white shadow-neo' : 'bg-white hover:bg-brand-yellow'}`}>
            {s} {s === 'all' ? `(${leads.length})` : `(${leads.filter(l => l.status === s).length})`}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="neo-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-brand-black text-white">
                {['Name', 'Phone', 'Service', 'Status', 'Date', 'Actions'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs uppercase tracking-wider font-bold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((lead) => (
                <>
                  <tr key={lead.id} className={`border-b border-gray-100 hover:bg-brand-cream cursor-pointer ${expanded === lead.id ? 'bg-brand-cream' : ''}`}
                    onClick={() => setExpanded(expanded === lead.id ? null : lead.id)}>
                    <td className="px-4 py-3 font-bold text-brand-black">{lead.name}</td>
                    <td className="px-4 py-3"><a href={`tel:${lead.phone}`} className="text-brand-blue hover:underline" onClick={e => e.stopPropagation()}>{lead.phone}</a></td>
                    <td className="px-4 py-3 text-gray-600 text-xs">{lead.service_type}</td>
                    <td className="px-4 py-3"><StatusBadge status={lead.status}/></td>
                    <td className="px-4 py-3 text-gray-400 text-xs">{fmtDate(lead.created_at)}</td>
                    <td className="px-4 py-3 text-xs text-brand-cyan font-bold">
                      {expanded === lead.id ? '▲' : '▼'} Details
                    </td>
                  </tr>
                  {expanded === lead.id && (
                    <tr key={`${lead.id}-exp`}>
                      <td colSpan={6} className="bg-brand-cream border-b-3 border-brand-black p-4">
                        <div className="flex flex-wrap gap-4 mb-3">
                          <div><span className="text-xs text-gray-400 block">Email</span><a href={`mailto:${lead.email}`} className="text-brand-blue font-semibold text-sm">{lead.email || '—'}</a></div>
                          <div><span className="text-xs text-gray-400 block">Message</span><p className="text-sm text-gray-700 max-w-md">{lead.message || '—'}</p></div>
                        </div>
                        <div className="flex gap-2 flex-wrap">
                          <span className="text-xs font-bold text-gray-500 self-center">Update Status:</span>
                          {['new', 'contacted', 'qualified', 'converted', 'lost'].map(s => (
                            <button key={s} onClick={(e) => { e.stopPropagation(); updateStatus(lead.id, s) }}
                              className={`px-2 py-1 text-xs font-bold border-2 border-brand-black transition-all
                                ${lead.status === s ? 'bg-brand-blue text-white' : 'bg-white hover:bg-brand-yellow'}`}>
                              {s}
                            </button>
                          ))}
                          <button onClick={(e) => { e.stopPropagation(); handleConvert(lead) }}
                            className="px-3 py-1 text-xs font-bold bg-green-500 text-white border-2 border-brand-black hover:bg-green-600 ml-2">
                            + Convert to Client
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// ─── CLIENTS TAB ──────────────────────────────────────────────────────────────
function ClientsTab({ clients, appointments }) {
  const [search, setSearch] = useState('')
  const [expanded, setExpanded] = useState(null)
  const filtered = clients.filter(c => c.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="space-y-4">
      <input type="text" value={search} onChange={e => setSearch(e.target.value)}
        placeholder="Search clients by name…"
        className="form-input max-w-md"/>

      <div className="neo-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-brand-black text-white">
                {['Name', 'Phone', 'Service', 'Status', 'Last Appt', 'Actions'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs uppercase tracking-wider font-bold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(client => {
                const clientAppts = appointments.filter(a => a.client_id === client.id)
                const lastAppt = clientAppts.filter(a => a.status === 'completed').sort((a,b) => new Date(b.scheduled_at)-new Date(a.scheduled_at))[0]
                return (
                  <>
                    <tr key={client.id} className={`border-b border-gray-100 hover:bg-brand-cream cursor-pointer ${expanded === client.id ? 'bg-brand-cream' : ''}`}
                      onClick={() => setExpanded(expanded === client.id ? null : client.id)}>
                      <td className="px-4 py-3 font-bold text-brand-black">{client.name}</td>
                      <td className="px-4 py-3"><a href={`tel:${client.phone}`} className="text-brand-blue hover:underline" onClick={e=>e.stopPropagation()}>{client.phone}</a></td>
                      <td className="px-4 py-3 text-gray-600 text-xs">{client.service_type}</td>
                      <td className="px-4 py-3"><StatusBadge status={client.status}/></td>
                      <td className="px-4 py-3 text-gray-400 text-xs">{lastAppt ? fmtDate(lastAppt.scheduled_at) : '—'}</td>
                      <td className="px-4 py-3 text-xs text-brand-cyan font-bold">{expanded === client.id ? '▲' : '▼'}</td>
                    </tr>
                    {expanded === client.id && (
                      <tr key={`${client.id}-exp`}>
                        <td colSpan={6} className="bg-brand-cream border-b-3 border-brand-black p-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-xs text-gray-400 mb-1">Address</p>
                              <p className="text-sm font-semibold">{client.address}</p>
                              <p className="text-xs text-gray-400 mt-2 mb-1">Email</p>
                              <a href={`mailto:${client.email}`} className="text-sm text-brand-blue">{client.email}</a>
                              <p className="text-xs text-gray-400 mt-2 mb-1">Notes</p>
                              <p className="text-sm text-gray-700">{client.notes || '—'}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-400 mb-2 font-bold uppercase">Appointment History ({clientAppts.length})</p>
                              <div className="space-y-1 max-h-40 overflow-y-auto">
                                {clientAppts.sort((a,b)=>new Date(b.scheduled_at)-new Date(a.scheduled_at)).map(a => (
                                  <div key={a.id} className="flex items-center justify-between text-xs bg-white border border-gray-200 p-2">
                                    <span>{fmtDate(a.scheduled_at)} · {a.service_type}</span>
                                    <StatusBadge status={a.status}/>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// ─── APPOINTMENTS TAB ─────────────────────────────────────────────────────────
function AppointmentsTab({ appointments, clients, setAppointments }) {
  const [view, setView] = useState('list')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selected, setSelected] = useState(null)

  const filtered = statusFilter === 'all' ? appointments : appointments.filter(a => a.status === statusFilter)
  const sorted = [...filtered].sort((a, b) => new Date(a.scheduled_at) - new Date(b.scheduled_at))

  const updateStatus = async (id, status) => {
    if (isSupabaseConfigured()) {
      await supabase.from('appointments').update({ status }).eq('id', id)
    }
    setAppointments(as => as.map(a => a.id === id ? { ...a, status } : a))
    if (selected?.id === id) setSelected(s => ({ ...s, status }))
  }

  const APPT_COLORS = { scheduled: '#DBEAFE', completed: '#DCFCE7', cancelled: '#F3F4F6', 'no-show': '#FEE2E2' }

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap gap-2 items-center justify-between">
        <div className="flex gap-2 flex-wrap">
          {['all', 'scheduled', 'completed', 'cancelled', 'no-show'].map(s => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 text-xs font-bold uppercase border-3 border-brand-black
                ${statusFilter === s ? 'bg-brand-blue text-white shadow-neo' : 'bg-white hover:bg-brand-yellow'}`}>
              {s}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          {['list', 'calendar'].map(v => (
            <button key={v} onClick={() => setView(v)}
              className={`px-3 py-1.5 text-xs font-bold uppercase border-3 border-brand-black
                ${view === v ? 'bg-brand-yellow text-brand-black shadow-neo' : 'bg-white hover:bg-brand-yellow'}`}>
              {v === 'list' ? '≡ List' : '📅 Week'}
            </button>
          ))}
        </div>
      </div>

      {view === 'list' ? (
        <div className="neo-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-brand-black text-white">
                  {['Client', 'Service', 'Date & Time', 'Technician', 'Status', 'Actions'].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs uppercase tracking-wider font-bold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sorted.map(appt => {
                  const client = clients.find(c => c.id === appt.client_id)
                  const isPast = new Date(appt.scheduled_at) < new Date()
                  return (
                    <tr key={appt.id} className={`border-b border-gray-100 hover:bg-brand-cream cursor-pointer ${isPast && appt.status === 'scheduled' ? 'opacity-60' : ''}`}
                      onClick={() => setSelected(appt)}>
                      <td className="px-4 py-3 font-bold text-brand-black">{client?.name || 'Unknown'}</td>
                      <td className="px-4 py-3 text-gray-600 text-xs">{appt.service_type}</td>
                      <td className="px-4 py-3 text-xs font-semibold">{fmtDateTime(appt.scheduled_at)}</td>
                      <td className="px-4 py-3 text-xs text-gray-600">{appt.technician || '—'}</td>
                      <td className="px-4 py-3"><StatusBadge status={appt.status}/></td>
                      <td className="px-4 py-3 text-xs text-brand-cyan font-bold">View →</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        // Calendar week view
        <div className="neo-card overflow-hidden">
          <div className="bg-brand-blue p-4 border-b-3 border-brand-black">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider">This Week's Appointments</h3>
          </div>
          <div className="p-4 space-y-2">
            {(() => {
              const now = new Date()
              const weekStart = new Date(now); weekStart.setDate(now.getDate() - now.getDay())
              const days = Array.from({length: 7}, (_, i) => {
                const d = new Date(weekStart); d.setDate(weekStart.getDate() + i)
                return d
              })
              return days.map(day => {
                const dayAppts = appointments.filter(a => {
                  const d = new Date(a.scheduled_at)
                  return d.toDateString() === day.toDateString()
                })
                return (
                  <div key={day.toDateString()} className={`flex gap-3 p-3 border-3 border-brand-black ${day.toDateString() === now.toDateString() ? 'bg-brand-yellow' : 'bg-white'}`}>
                    <div className="w-20 flex-shrink-0">
                      <div className="text-xs font-bold text-gray-500">{day.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                      <div className="font-display text-2xl text-brand-blue">{day.getDate()}</div>
                    </div>
                    <div className="flex-1 space-y-1">
                      {dayAppts.length === 0 ? <span className="text-xs text-gray-400">No appointments</span> :
                        dayAppts.sort((a,b) => new Date(a.scheduled_at)-new Date(b.scheduled_at)).map(a => {
                          const client = clients.find(c => c.id === a.client_id)
                          return (
                            <div key={a.id} onClick={() => setSelected(a)}
                              style={{ background: APPT_COLORS[a.status] }}
                              className="text-xs font-semibold px-2 py-1 border border-gray-300 cursor-pointer hover:opacity-80 flex items-center justify-between">
                              <span>{new Date(a.scheduled_at).toLocaleTimeString('en-US', {hour:'numeric',minute:'2-digit'})} — {client?.name || 'Unknown'}</span>
                              <span className="text-gray-500">{a.technician}</span>
                            </div>
                          )
                        })
                      }
                    </div>
                  </div>
                )
              })
            })()}
          </div>
        </div>
      )}

      {/* Appointment detail modal */}
      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
            onClick={() => setSelected(null)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="neo-card max-w-lg w-full p-6"
              onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-display text-3xl text-brand-blue">APPOINTMENT DETAIL</h3>
                <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-brand-black text-xl">✕</button>
              </div>
              {(() => {
                const client = clients.find(c => c.id === selected.client_id)
                return (
                  <div className="space-y-3">
                    {[
                      ['Client', client?.name || 'Unknown'],
                      ['Service', selected.service_type],
                      ['Scheduled', fmtDateTime(selected.scheduled_at)],
                      ['Duration', `${selected.duration_minutes} min`],
                      ['Technician', selected.technician || 'TBD'],
                      ['Notes', selected.notes || '—'],
                    ].map(([l, v]) => (
                      <div key={l} className="flex gap-3 text-sm border-b border-gray-100 pb-2">
                        <span className="w-24 text-gray-400 font-semibold flex-shrink-0">{l}</span>
                        <span className="font-bold text-brand-black">{v}</span>
                      </div>
                    ))}
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400 font-semibold w-24">Status</span>
                      <StatusBadge status={selected.status}/>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Update Status:</p>
                      <div className="flex gap-2 flex-wrap">
                        {['scheduled', 'completed', 'cancelled', 'no-show'].map(s => (
                          <button key={s} onClick={() => updateStatus(selected.id, s)}
                            className={`px-3 py-1 text-xs font-bold border-2 border-brand-black
                              ${selected.status === s ? 'bg-brand-blue text-white' : 'bg-white hover:bg-brand-yellow'}`}>
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── SETTINGS TAB ─────────────────────────────────────────────────────────────
function SettingsTab({ leads, clients, appointments }) {
  const handleExport = (type) => {
    const data = type === 'leads' ? leads : type === 'clients' ? clients : appointments
    const keys = Object.keys(data[0] || {})
    const csv = [keys.join(','), ...data.map(r => keys.map(k => `"${(r[k]||'').toString().replace(/"/g, '""')}"`).join(','))].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = `corwin-${type}-${Date.now()}.csv`; a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="max-w-2xl space-y-6">
      {/* Business info */}
      <div className="neo-card">
        <div className="bg-brand-blue p-4 border-b-3 border-brand-black">
          <h3 className="text-white font-bold text-sm uppercase tracking-wider">Business Information</h3>
        </div>
        <div className="p-6 space-y-4">
          {[
            { label: 'Business Name', value: 'Corwin Pool Service' },
            { label: 'Phone', value: '702-460-2406' },
            { label: 'Email', value: 'info@corwinpools.com' },
            { label: 'Address', value: '10917 Salford Drive, Las Vegas, NV 89144' },
            { label: 'License #', value: 'NV C-53-12345' },
          ].map(({ label, value }) => (
            <div key={label} className="grid grid-cols-3 gap-4 items-center">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500">{label}</label>
              <input defaultValue={value} className="form-input col-span-2 text-sm" readOnly/>
            </div>
          ))}
        </div>
      </div>

      {/* Notifications */}
      <div className="neo-card">
        <div className="bg-brand-yellow p-4 border-b-3 border-brand-black">
          <h3 className="text-brand-black font-bold text-sm uppercase tracking-wider">Notifications (Placeholder)</h3>
        </div>
        <div className="p-6 space-y-3">
          {['Email on new lead', 'SMS on new booking', 'Daily summary digest', 'Appointment reminders'].map(opt => (
            <label key={opt} className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4 border-2 border-brand-black accent-brand-blue"/>
              <span className="text-sm font-semibold">{opt}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Export */}
      <div className="neo-card">
        <div className="bg-brand-black p-4 border-b-3 border-brand-black">
          <h3 className="text-white font-bold text-sm uppercase tracking-wider">Export Data</h3>
        </div>
        <div className="p-6 space-y-3">
          {[['leads', 'Leads CSV'], ['clients', 'Clients CSV'], ['appointments', 'Appointments CSV']].map(([type, label]) => (
            <button key={type} onClick={() => handleExport(type)} className="btn-secondary w-full justify-center text-xs py-2.5">
              ⬇ Download {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── MAIN ADMIN ───────────────────────────────────────────────────────────────
const TABS = ['Overview', 'Leads', 'Clients', 'Appointments', 'Settings']

export default function Admin() {
  const [authed, setAuthed] = useState(false)
  const [tab, setTab] = useState('Overview')
  const [leads, setLeads] = useState(mockLeads)
  const [clients] = useState(mockClients)
  const [appointments, setAppointments] = useState(mockAppointments)

  useEffect(() => {
    if (!authed || !isSupabaseConfigured()) return
    const fetchData = async () => {
      const [{ data: l }, { data: c }, { data: a }] = await Promise.all([
        supabase.from('leads').select('*').order('created_at', { ascending: false }),
        supabase.from('clients').select('*').order('created_at', { ascending: false }),
        supabase.from('appointments').select('*').order('scheduled_at', { ascending: true }),
      ])
      if (l) setLeads(l)
      if (a) setAppointments(a)
    }
    fetchData()
  }, [authed])

  if (!authed) return <PasswordGate onAuth={() => setAuthed(true)} />

  return (
    <div className="min-h-screen bg-brand-gray-light">
      {/* Admin header */}
      <header className="bg-brand-black border-b-3 border-brand-black sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-brand-cyan font-display text-xl tracking-widest">CORWIN</span>
            <span className="text-white text-xs font-bold uppercase tracking-widest text-gray-400">Admin</span>
          </div>
          <div className="flex items-center gap-4">
            {isSupabaseConfigured()
              ? <span className="text-xs text-green-400 font-bold">● Live Data</span>
              : <span className="text-xs text-yellow-400 font-bold">● Demo Mode</span>
            }
            <button onClick={() => setAuthed(false)} className="text-xs text-gray-400 hover:text-white font-bold">Sign Out</button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Tabs */}
        <div className="flex gap-1 flex-wrap mb-6">
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-4 py-2 text-sm font-bold uppercase border-3 border-brand-black transition-all
                ${tab === t ? 'bg-brand-blue text-white shadow-neo' : 'bg-white hover:bg-brand-yellow text-brand-black'}`}>
              {t}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
            {tab === 'Overview' && <OverviewTab leads={leads} clients={clients} appointments={appointments}/>}
            {tab === 'Leads' && <LeadsTab leads={leads} setLeads={setLeads}/>}
            {tab === 'Clients' && <ClientsTab clients={clients} appointments={appointments}/>}
            {tab === 'Appointments' && <AppointmentsTab appointments={appointments} clients={clients} setAppointments={setAppointments}/>}
            {tab === 'Settings' && <SettingsTab leads={leads} clients={clients} appointments={appointments}/>}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
