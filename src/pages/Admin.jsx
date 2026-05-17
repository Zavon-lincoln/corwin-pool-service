import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { mockLeads, mockClients, mockAppointments } from '../lib/mockData'

function PasswordGate({ onAuth }) {
  const [pw, setPw] = useState('')
  const [error, setError] = useState(false)
  const handleSubmit = e => {
    e.preventDefault()
    if (pw === 'admin123') { onAuth() }
    else { setError(true); setTimeout(() => setError(false), 2000) }
  }
  return (
    <div className="min-h-screen bg-nm-bg flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
        className="nm-card max-w-sm w-full p-10 text-center">
        <div className="font-display text-5xl text-[#00C4F0] mb-2 tracking-wider">ADMIN</div>
        <p className="text-white/50 text-sm mb-8">Corwin Pool Service Dashboard</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="password" value={pw} onChange={e => setPw(e.target.value)}
            placeholder="Enter password"
            className={`nm-input ${error ? 'border-red-400' : ''}`} autoFocus />
          {error && <p className="text-red-400 text-sm font-bold">Incorrect password</p>}
          <button type="submit" className="nm-btn-cyan w-full justify-center py-3 text-sm">Sign In →</button>
        </form>
        <p className="text-xs text-white/30 mt-4">Demo password: admin123</p>
      </motion.div>
    </div>
  )
}

const STATUS_COLORS = {
  new: 'bg-blue-900/60 text-blue-200 border border-blue-500/40',
  contacted: 'bg-yellow-900/60 text-yellow-200 border border-yellow-500/40',
  qualified: 'bg-purple-900/60 text-purple-200 border border-purple-500/40',
  lost: 'bg-red-900/60 text-red-200 border border-red-500/40',
  converted: 'bg-green-900/60 text-green-200 border border-green-500/40',
  scheduled: 'bg-blue-900/60 text-blue-200 border border-blue-500/40',
  completed: 'bg-green-900/60 text-green-200 border border-green-500/40',
  cancelled: 'bg-gray-800 text-gray-400 border border-gray-600/40',
  'no-show': 'bg-red-900/60 text-red-300 border border-red-500/40',
  active: 'bg-green-900/60 text-green-200 border border-green-500/40',
  inactive: 'bg-gray-800 text-gray-400 border border-gray-600/40',
  vip: 'bg-purple-900/60 text-purple-200 border border-purple-500/40',
}
const fmtDate = (iso) => new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
const fmtDateTime = (iso) => new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })

function StatusBadge({ status }) {
  return (
    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${STATUS_COLORS[status] || 'bg-gray-800 text-gray-400'}`}>
      {status}
    </span>
  )
}

function OverviewTab({ leads, clients, appointments }) {
  const thisMonth = new Date(); thisMonth.setDate(1); thisMonth.setHours(0,0,0,0)
  const leadsThisMonth = leads.filter(l => new Date(l.created_at) >= thisMonth).length
  const apptThisWeek = appointments.filter(a => {
    const d = new Date(a.scheduled_at), now = new Date()
    const start = new Date(now); start.setDate(now.getDate() - now.getDay())
    const end = new Date(start); end.setDate(start.getDate() + 7)
    return d >= start && d < end
  }).length
  const converted = leads.filter(l => l.status === 'converted').length
  const convRate = leads.length > 0 ? ((converted / leads.length) * 100).toFixed(0) : 0
  const completedAppts = appointments.filter(a => a.status === 'completed').length
  const revenueEst = completedAppts * 180
  const stats = [
    { label: 'Leads This Month', value: leadsThisMonth, icon: '📋', accent: '#00C4F0' },
    { label: 'Appts This Week', value: apptThisWeek, icon: '📅', accent: '#FFE156' },
    { label: 'Conversion Rate', value: `${convRate}%`, icon: '📈', accent: '#00C4F0' },
    { label: 'Revenue Est.', value: `$${revenueEst.toLocaleString()}`, icon: '💰', accent: '#FFE156' },
  ]
  const recentActivity = [
    ...leads.slice(0, 5).map(l => ({ type: 'lead', text: `New lead: ${l.name}`, time: l.created_at })),
    ...appointments.filter(a => a.status === 'completed').slice(0, 5).map(a => ({ type: 'appt', text: `Completed: ${a.service_type}`, time: a.scheduled_at })),
  ].sort((a, b) => new Date(b.time) - new Date(a.time)).slice(0, 10)
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon, accent }) => (
          <div key={label} className="nm-card p-5">
            <div className="text-2xl mb-3">{icon}</div>
            <div className="font-display text-4xl leading-none mb-1" style={{ color: accent }}>{value}</div>
            <div className="text-xs font-bold uppercase tracking-wider text-white/50">{label}</div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="nm-card overflow-hidden">
          <div className="px-5 py-4 border-b border-white/10">
            <h3 className="text-[#00C4F0] font-bold uppercase tracking-wider text-xs">Recent Activity</h3>
          </div>
          <div className="divide-y divide-white/5">
            {recentActivity.map((item, i) => (
              <div key={i} className="px-5 py-3 flex items-start gap-3 hover:bg-nm-surface/50 transition-colors">
                <span className="text-base mt-0.5">{item.type === 'lead' ? '📋' : '✅'}</span>
                <div>
                  <p className="text-sm font-semibold text-white">{item.text}</p>
                  <p className="text-xs text-white/40 mt-0.5">{fmtDate(item.time)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="nm-card overflow-hidden">
          <div className="px-5 py-4 border-b border-white/10">
            <h3 className="text-[#FFE156] font-bold uppercase tracking-wider text-xs">Upcoming Appointments</h3>
          </div>
          <div className="divide-y divide-white/5">
            {appointments.filter(a => a.status === 'scheduled' && new Date(a.scheduled_at) > new Date())
              .sort((a, b) => new Date(a.scheduled_at) - new Date(b.scheduled_at))
              .slice(0, 8).map((a) => {
                const client = clients.find(c => c.id === a.client_id)
                return (
                  <div key={a.id} className="px-5 py-3 flex items-center justify-between hover:bg-nm-surface/50 transition-colors">
                    <div>
                      <p className="text-sm font-bold text-white">{client?.name || 'New Booking'}</p>
                      <p className="text-xs text-white/50">{a.service_type}</p>
                    </div>
                    <p className="text-xs font-bold text-[#00C4F0]">{fmtDateTime(a.scheduled_at)}</p>
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    </div>
  )
}

function LeadsTab({ leads, setLeads }) {
  const [filter, setFilter] = useState('all')
  const [expanded, setExpanded] = useState(null)
  const statuses = ['all', 'new', 'contacted', 'qualified', 'converted', 'lost']
  const filtered = filter === 'all' ? leads : leads.filter(l => l.status === filter)
  const updateStatus = async (id, status) => {
    if (isSupabaseConfigured()) await supabase.from('leads').update({ status }).eq('id', id)
    setLeads(ls => ls.map(l => l.id === id ? { ...l, status } : l))
  }
  const nmActive = { background: '#1a3a6e', boxShadow: 'inset 3px 3px 8px #0f2440, inset -3px -3px 8px #254f9e' }
  const nmRaised = { background: '#1e4080', boxShadow: '3px 3px 8px #0f2440, -3px -3px 8px #254f9e' }
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {statuses.map(s => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-xl transition-all border ${filter === s ? 'text-[#00C4F0] border-[#00C4F0]/40' : 'text-white/60 border-white/10 hover:text-white'}`}
            style={filter === s ? nmActive : nmRaised}>
            {s} ({s === 'all' ? leads.length : leads.filter(l => l.status === s).length})
          </button>
        ))}
      </div>
      <div className="nm-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: '#0f2440' }}>
                {['Name', 'Phone', 'Service', 'Status', 'Date', ''].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs uppercase tracking-wider font-bold text-white/60">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((lead) => (
                <React.Fragment key={lead.id}>
                  <tr className={`border-b border-white/5 cursor-pointer transition-colors ${expanded === lead.id ? 'bg-nm-surface/60' : 'hover:bg-nm-surface/40'}`}
                    onClick={() => setExpanded(expanded === lead.id ? null : lead.id)}>
                    <td className="px-4 py-3 font-bold text-white">{lead.name}</td>
                    <td className="px-4 py-3"><a href={`tel:${lead.phone}`} className="text-[#00C4F0] hover:text-white text-xs" onClick={e => e.stopPropagation()}>{lead.phone}</a></td>
                    <td className="px-4 py-3 text-white/60 text-xs">{lead.service_type}</td>
                    <td className="px-4 py-3"><StatusBadge status={lead.status}/></td>
                    <td className="px-4 py-3 text-white/40 text-xs">{fmtDate(lead.created_at)}</td>
                    <td className="px-4 py-3 text-xs text-[#00C4F0] font-bold">{expanded === lead.id ? '▲' : '▼'}</td>
                  </tr>
                  {expanded === lead.id && (
                    <tr><td colSpan={6} className="p-4" style={{ background: '#162f5a' }}>
                      <div className="flex flex-wrap gap-4 mb-3">
                        <div><span className="text-xs text-white/40 block mb-1">Email</span><a href={`mailto:${lead.email}`} className="text-[#00C4F0] font-semibold text-sm">{lead.email || '—'}</a></div>
                        <div><span className="text-xs text-white/40 block mb-1">Message</span><p className="text-sm text-white/80 max-w-md">{lead.message || '—'}</p></div>
                      </div>
                      <div className="flex gap-2 flex-wrap items-center">
                        <span className="text-xs font-bold text-white/40">Update Status:</span>
                        {['new','contacted','qualified','converted','lost'].map(s => (
                          <button key={s} onClick={(e) => { e.stopPropagation(); updateStatus(lead.id, s) }}
                            className={`px-2 py-1 text-xs font-bold rounded-lg transition-all border ${lead.status === s ? 'text-[#00C4F0] border-[#00C4F0]/40' : 'text-white/60 border-white/10 hover:text-white'}`}
                            style={lead.status === s ? { background: '#1a3a6e', boxShadow: 'inset 2px 2px 6px #0f2440, inset -2px -2px 6px #254f9e' } : { background: '#1e4080', boxShadow: '2px 2px 6px #0f2440, -2px -2px 6px #254f9e' }}>
                            {s}
                          </button>
                        ))}
                      </div>
                    </td></tr>
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
    <div className="space-y-4">
      <input type="text" value={search} onChange={e => setSearch(e.target.value)}
        placeholder="Search clients..." className="nm-input max-w-md"/>
      <div className="nm-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: '#0f2440' }}>
                {['Name','Phone','Service','Status','Last Appt',''].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs uppercase tracking-wider font-bold text-white/60">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(client => {
                const clientAppts = appointments.filter(a => a.client_id === client.id)
                const lastAppt = clientAppts.filter(a => a.status === 'completed').sort((a,b) => new Date(b.scheduled_at)-new Date(a.scheduled_at))[0]
                return (
                  <React.Fragment key={client.id}>
                    <tr className={`border-b border-white/5 cursor-pointer transition-colors ${expanded === client.id ? 'bg-nm-surface/60' : 'hover:bg-nm-surface/40'}`}
                      onClick={() => setExpanded(expanded === client.id ? null : client.id)}>
                      <td className="px-4 py-3 font-bold text-white">{client.name}</td>
                      <td className="px-4 py-3"><a href={`tel:${client.phone}`} className="text-[#00C4F0] hover:text-white text-xs" onClick={e=>e.stopPropagation()}>{client.phone}</a></td>
                      <td className="px-4 py-3 text-white/60 text-xs">{client.service_type}</td>
                      <td className="px-4 py-3"><StatusBadge status={client.status}/></td>
                      <td className="px-4 py-3 text-white/40 text-xs">{lastAppt ? fmtDate(lastAppt.scheduled_at) : '—'}</td>
                      <td className="px-4 py-3 text-xs text-[#00C4F0] font-bold">{expanded === client.id ? '▲' : '▼'}</td>
                    </tr>
                    {expanded === client.id && (
                      <tr><td colSpan={6} className="p-4" style={{ background: '#162f5a' }}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs text-white/40 mb-1">Address</p><p className="text-sm font-semibold text-white">{client.address}</p>
                            <p className="text-xs text-white/40 mt-2 mb-1">Email</p><a href={`mailto:${client.email}`} className="text-sm text-[#00C4F0]">{client.email}</a>
                            <p className="text-xs text-white/40 mt-2 mb-1">Notes</p><p className="text-sm text-white/70">{client.notes || '—'}</p>
                          </div>
                          <div>
                            <p className="text-xs text-white/40 mb-2 font-bold uppercase tracking-wider">History ({clientAppts.length})</p>
                            <div className="space-y-1 max-h-40 overflow-y-auto">
                              {clientAppts.sort((a,b)=>new Date(b.scheduled_at)-new Date(a.scheduled_at)).map(a => (
                                <div key={a.id} className="flex items-center justify-between text-xs rounded-lg px-3 py-2"
                                  style={{ background: '#1a3a6e', boxShadow: 'inset 2px 2px 5px #0f2440, inset -2px -2px 5px #254f9e' }}>
                                  <span className="text-white/70">{fmtDate(a.scheduled_at)} · {a.service_type}</span>
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

function MonthCalendar({ appointments, onSelectDay }) {
  const [current, setCurrent] = useState(() => { const d = new Date(); d.setDate(1); return d })
  const year = current.getFullYear(), month = current.getMonth()
  const monthName = current.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const today = new Date()
  const apptsByDay = {}
  appointments.forEach(a => {
    const d = new Date(a.scheduled_at)
    if (d.getFullYear() === year && d.getMonth() === month) {
      const key = d.getDate()
      if (!apptsByDay[key]) apptsByDay[key] = []
      apptsByDay[key].push(a)
    }
  })
  const DOW = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
  const cells = []
  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)
  while (cells.length % 7 !== 0) cells.push(null)
  const STATUS_DOT = { scheduled: '#00C4F0', completed: '#4ade80', cancelled: '#6b7280', 'no-show': '#f87171' }
  const nmBtn = { background: '#1e4080', boxShadow: '3px 3px 8px #0f2440, -3px -3px 8px #254f9e' }
  return (
    <div className="nm-card overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
        <button onClick={() => setCurrent(d => { const n = new Date(d); n.setMonth(n.getMonth()-1); return n })}
          className="w-8 h-8 rounded-xl text-white/70 hover:text-white font-bold flex items-center justify-center" style={nmBtn}>‹</button>
        <h3 className="font-display text-xl text-white tracking-wider">{monthName.toUpperCase()}</h3>
        <button onClick={() => setCurrent(d => { const n = new Date(d); n.setMonth(n.getMonth()+1); return n })}
          className="w-8 h-8 rounded-xl text-white/70 hover:text-white font-bold flex items-center justify-center" style={nmBtn}>›</button>
      </div>
      <div className="grid grid-cols-7 border-b border-white/10">
        {DOW.map(d => <div key={d} className="py-2 text-center text-xs font-bold uppercase tracking-wider text-white/40">{d}</div>)}
      </div>
      <div className="grid grid-cols-7">
        {cells.map((day, i) => {
          if (!day) return <div key={`e-${i}`} className="h-16 border-r border-b border-white/5"/>
          const dayAppts = apptsByDay[day] || []
          const isToday = today.getDate() === day && today.getMonth() === month && today.getFullYear() === year
          return (
            <button key={day} onClick={() => onSelectDay(day, month, year, dayAppts)}
              className="h-16 border-r border-b border-white/5 p-1.5 text-left transition-all hover:bg-nm-surface/60 flex flex-col"
              style={isToday ? { background: 'rgba(0,196,240,0.08)', outline: '1px solid rgba(0,196,240,0.5)', outlineOffset: '-1px' } : {}}>
              <span className={`text-xs font-bold ${isToday ? 'text-[#00C4F0]' : 'text-white/70'}`}>{day}</span>
              {dayAppts.length > 0 && (
                <div className="flex gap-0.5 flex-wrap mt-1">
                  {dayAppts.slice(0,3).map((a,idx) => (
                    <span key={idx} className="w-2 h-2 rounded-full" style={{ background: STATUS_DOT[a.status] || '#00C4F0' }}/>
                  ))}
                  {dayAppts.length > 3 && <span className="text-[9px] text-white/40 font-bold">+{dayAppts.length-3}</span>}
                </div>
              )}
            </button>
          )
        })}
      </div>
      <div className="flex gap-4 px-5 py-3 border-t border-white/10 flex-wrap">
        {Object.entries(STATUS_DOT).map(([s,c]) => (
          <div key={s} className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: c }}/><span className="text-xs text-white/40 capitalize">{s}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function AppointmentsTab({ appointments, clients, setAppointments }) {
  const [view, setView] = useState('calendar')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selected, setSelected] = useState(null)
  const [dayPanel, setDayPanel] = useState(null)
  const filtered = statusFilter === 'all' ? appointments : appointments.filter(a => a.status === statusFilter)
  const sorted = [...filtered].sort((a,b) => new Date(a.scheduled_at)-new Date(b.scheduled_at))
  const updateStatus = async (id, status) => {
    if (isSupabaseConfigured()) await supabase.from('appointments').update({ status }).eq('id', id)
    setAppointments(as => as.map(a => a.id === id ? { ...a, status } : a))
    if (selected?.id === id) setSelected(s => ({ ...s, status }))
    if (dayPanel) setDayPanel(dp => dp ? { ...dp, appts: dp.appts.map(a => a.id === id ? { ...a, status } : a) } : null)
  }
  const handleSelectDay = (day, month, year, appts) => {
    const date = new Date(year, month, day)
    setDayPanel({ label: date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }), appts })
  }
  const nmActive = { background: '#1a3a6e', boxShadow: 'inset 3px 3px 8px #0f2440, inset -3px -3px 8px #254f9e' }
  const nmRaised = { background: '#1e4080', boxShadow: '3px 3px 8px #0f2440, -3px -3px 8px #254f9e' }
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 items-center justify-between">
        <div className="flex gap-2 flex-wrap">
          {['all','scheduled','completed','cancelled','no-show'].map(s => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-xl transition-all border ${statusFilter === s ? 'text-[#00C4F0] border-[#00C4F0]/40' : 'text-white/60 border-white/10 hover:text-white'}`}
              style={statusFilter === s ? nmActive : nmRaised}>{s}</button>
          ))}
        </div>
        <div className="flex gap-2">
          {[['calendar','📅 Calendar'],['list','≡ List']].map(([v,label]) => (
            <button key={v} onClick={() => setView(v)}
              className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-xl transition-all border ${view === v ? 'text-[#FFE156] border-[#FFE156]/40' : 'text-white/60 border-white/10 hover:text-white'}`}
              style={view === v ? nmActive : nmRaised}>{label}</button>
          ))}
        </div>
      </div>
      {view === 'calendar' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <MonthCalendar appointments={appointments} onSelectDay={handleSelectDay}/>
          </div>
          <div className="nm-card overflow-hidden">
            {dayPanel ? (
              <>
                <div className="px-5 py-4 border-b border-white/10">
                  <p className="text-[#00C4F0] font-bold text-xs uppercase tracking-wider">{dayPanel.label}</p>
                  <p className="text-white/40 text-xs mt-0.5">{dayPanel.appts.length} appointment{dayPanel.appts.length !== 1 ? 's' : ''}</p>
                </div>
                <div className="divide-y divide-white/5 overflow-y-auto max-h-96">
                  {dayPanel.appts.length === 0
                    ? <p className="px-5 py-6 text-white/40 text-sm text-center">No appointments</p>
                    : dayPanel.appts.sort((a,b)=>new Date(a.scheduled_at)-new Date(b.scheduled_at)).map(a => {
                        const client = clients.find(c => c.id === a.client_id)
                        const time = new Date(a.scheduled_at).toLocaleTimeString('en-US', { hour:'numeric', minute:'2-digit' })
                        return (
                          <div key={a.id} className="px-5 py-3 hover:bg-nm-surface/50 transition-colors cursor-pointer"
                            onClick={() => setSelected(a)}>
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <p className="text-sm font-bold text-white">{client?.name || 'New Booking'}</p>
                                <p className="text-xs text-white/50 mt-0.5">{a.service_type}</p>
                                <p className="text-xs text-[#00C4F0] mt-0.5">{time}</p>
                              </div>
                              <StatusBadge status={a.status}/>
                            </div>
                          </div>
                        )
                      })
                  }
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full py-16 text-center px-6">
                <div className="text-4xl mb-3">📅</div>
                <p className="text-white/50 text-sm">Click a day to see appointments</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="nm-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr style={{ background: '#0f2440' }}>
                {['Client','Service','Date & Time','Technician','Status',''].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs uppercase tracking-wider font-bold text-white/60">{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {sorted.map(appt => {
                  const client = clients.find(c => c.id === appt.client_id)
                  return (
                    <tr key={appt.id} className="border-b border-white/5 hover:bg-nm-surface/40 cursor-pointer transition-colors"
                      onClick={() => setSelected(appt)}>
                      <td className="px-4 py-3 font-bold text-white">{client?.name || 'New Booking'}</td>
                      <td className="px-4 py-3 text-white/60 text-xs">{appt.service_type}</td>
                      <td className="px-4 py-3 text-xs font-semibold text-white">{fmtDateTime(appt.scheduled_at)}</td>
                      <td className="px-4 py-3 text-xs text-white/60">{appt.technician || '—'}</td>
                      <td className="px-4 py-3"><StatusBadge status={appt.status}/></td>
                      <td className="px-4 py-3 text-xs text-[#00C4F0] font-bold">View →</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
            onClick={() => setSelected(null)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="nm-card max-w-lg w-full p-6" onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-start mb-5">
                <h3 className="font-display text-2xl text-[#00C4F0] tracking-wider">APPOINTMENT DETAIL</h3>
                <button onClick={() => setSelected(null)}
                  className="w-8 h-8 rounded-xl text-white/60 hover:text-white flex items-center justify-center"
                  style={{ background: '#1e4080', boxShadow: '2px 2px 6px #0f2440, -2px -2px 6px #254f9e' }}>✕</button>
              </div>
              {(() => {
                const client = clients.find(c => c.id === selected.client_id)
                return (
                  <div className="space-y-3">
                    {[['Client', client?.name || 'New Booking'],['Service', selected.service_type],
                      ['Scheduled', fmtDateTime(selected.scheduled_at)],['Duration', `${selected.duration_minutes || 60} min`],
                      ['Technician', selected.technician || 'TBD'],['Notes', selected.notes || '—']].map(([l,v]) => (
                      <div key={l} className="flex gap-3 text-sm border-b border-white/10 pb-2">
                        <span className="w-24 text-white/40 font-semibold flex-shrink-0">{l}</span>
                        <span className="font-bold text-white">{v}</span>
                      </div>
                    ))}
                    <div className="flex items-center gap-2 pt-1">
                      <span className="text-xs text-white/40 font-semibold w-24">Status</span>
                      <StatusBadge status={selected.status}/>
                    </div>
                    <div className="pt-2">
                      <p className="text-xs font-bold text-white/40 mb-2 uppercase tracking-wider">Update Status:</p>
                      <div className="flex gap-2 flex-wrap">
                        {['scheduled','completed','cancelled','no-show'].map(s => (
                          <button key={s} onClick={() => updateStatus(selected.id, s)}
                            className={`px-3 py-1 text-xs font-bold rounded-lg transition-all border ${selected.status === s ? 'text-[#00C4F0] border-[#00C4F0]/40' : 'text-white/60 border-white/10 hover:text-white'}`}
                            style={selected.status === s ? { background: '#1a3a6e', boxShadow: 'inset 2px 2px 6px #0f2440, inset -2px -2px 6px #254f9e' } : { background: '#1e4080', boxShadow: '2px 2px 6px #0f2440, -2px -2px 6px #254f9e' }}>
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

function SettingsTab({ leads, clients, appointments }) {
  const handleExport = (type) => {
    const data = type === 'leads' ? leads : type === 'clients' ? clients : appointments
    if (!data.length) return
    const keys = Object.keys(data[0])
    const csv = [keys.join(','), ...data.map(r => keys.map(k => `"${(r[k]||'').toString().replace(/"/g,'""')}"`).join(','))].join('\n')
    const a = document.createElement('a')
    a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }))
    a.download = `corwin-${type}-${Date.now()}.csv`; a.click()
  }
  return (
    <div className="max-w-2xl space-y-6">
      <div className="nm-card overflow-hidden">
        <div className="px-5 py-4 border-b border-white/10"><h3 className="text-[#00C4F0] font-bold text-xs uppercase tracking-wider">Business Information</h3></div>
        <div className="p-6 space-y-4">
          {[['Business Name','Corwin Pool Service'],['Phone','702-460-2406'],['Email','info@corwinpools.com'],
            ['Address','10917 Salford Drive, Las Vegas, NV 89144'],['License #','NV C-53-12345']].map(([label,value]) => (
            <div key={label} className="grid grid-cols-3 gap-4 items-center">
              <label className="text-xs font-bold uppercase tracking-wider text-white/40">{label}</label>
              <input defaultValue={value} className="nm-input col-span-2 text-sm" readOnly/>
            </div>
          ))}
        </div>
      </div>
      <div className="nm-card overflow-hidden">
        <div className="px-5 py-4 border-b border-white/10"><h3 className="text-[#FFE156] font-bold text-xs uppercase tracking-wider">Notifications</h3></div>
        <div className="p-6 space-y-3">
          {['Email on new lead','SMS on new booking','Daily summary digest','Appointment reminders'].map(opt => (
            <label key={opt} className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#00C4F0]"/>
              <span className="text-sm font-semibold text-white/80">{opt}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="nm-card overflow-hidden">
        <div className="px-5 py-4 border-b border-white/10"><h3 className="text-white font-bold text-xs uppercase tracking-wider">Export Data</h3></div>
        <div className="p-6 space-y-3">
          {[['leads','Leads CSV'],['clients','Clients CSV'],['appointments','Appointments CSV']].map(([type,label]) => (
            <button key={type} onClick={() => handleExport(type)} className="nm-btn-primary w-full justify-center text-xs py-2.5">
              ⬇ Download {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

const TABS = [{ id: 'Overview', icon: '📊' },{ id: 'Leads', icon: '📋' },{ id: 'Clients', icon: '👥' },{ id: 'Appointments', icon: '📅' },{ id: 'Settings', icon: '⚙️' }]

export default function Admin() {
  const [authed, setAuthed] = useState(false)
  const [tab, setTab] = useState('Overview')
  const [leads, setLeads] = useState(mockLeads)
  const [clients] = useState(mockClients)
  const [appointments, setAppointments] = useState(mockAppointments)
  useEffect(() => {
    if (!authed || !isSupabaseConfigured()) return
    const fetchData = async () => {
      const [{ data: l },,{ data: a }] = await Promise.all([
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
  const nmActive = { background: '#1a3a6e', boxShadow: 'inset 3px 3px 8px #0f2440, inset -3px -3px 8px #254f9e' }
  const nmRaised = { background: '#1e4080', boxShadow: '3px 3px 8px #0f2440, -3px -3px 8px #254f9e' }
  return (
    <div className="min-h-screen bg-nm-bg">
      <header className="sticky top-0 z-40 border-b border-white/10" style={{ background: 'rgba(15,36,64,0.97)', backdropFilter: 'blur(10px)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-display text-xl tracking-widest text-[#00C4F0]">CORWIN</span>
            <span className="text-white/30 text-xs font-bold uppercase tracking-widest">Admin</span>
          </div>
          <div className="flex items-center gap-4">
            {isSupabaseConfigured() ? <span className="text-xs text-green-400 font-bold">● Live Data</span> : <span className="text-xs text-yellow-400 font-bold">● Demo Mode</span>}
            <button onClick={() => setAuthed(false)} className="text-xs text-white/40 hover:text-white font-bold transition-colors">Sign Out</button>
          </div>
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex gap-2 flex-wrap mb-6">
          {TABS.map(({ id, icon }) => (
            <button key={id} onClick={() => setTab(id)}
              className={`px-4 py-2 text-sm font-bold uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 border ${tab === id ? 'text-[#00C4F0] border-[#00C4F0]/30' : 'text-white/60 border-white/10 hover:text-white'}`}
              style={tab === id ? nmActive : nmRaised}>
              <span>{icon}</span><span className="hidden sm:inline">{id}</span>
            </button>
          ))}
        </div>
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
