// Mock data for admin dashboard demo (used when Supabase isn't configured)

export const mockLeads = [
  { id: '1', name: 'Sandra Torres', phone: '702-555-0182', email: 'storres@gmail.com', service_type: 'Weekly Maintenance', status: 'new', message: 'Need weekly service for my backyard pool in Summerlin', source: 'website', created_at: new Date(Date.now() - 1 * 86400000).toISOString() },
  { id: '2', name: 'Mike Delgado', phone: '702-555-0241', email: 'mdelgado@outlook.com', service_type: 'Green Pool Rescue', status: 'contacted', message: 'Pool has turned green after being closed 3 weeks', source: 'website', created_at: new Date(Date.now() - 2 * 86400000).toISOString() },
  { id: '3', name: 'Jennifer Walsh', phone: '702-555-0315', email: 'jwalsh@yahoo.com', service_type: 'Equipment Repair', status: 'qualified', message: 'Pump making loud noise, possibly needs replacement', source: 'website', created_at: new Date(Date.now() - 3 * 86400000).toISOString() },
  { id: '4', name: 'Robert Kim', phone: '702-555-0478', email: 'rkim@gmail.com', service_type: 'One-Time Clean', status: 'converted', message: 'Just bought a house with a pool that needs a deep clean', source: 'website', created_at: new Date(Date.now() - 5 * 86400000).toISOString() },
  { id: '5', name: 'Lisa Hernandez', phone: '702-555-0562', email: 'lhernandez@gmail.com', service_type: 'Weekly Maintenance', status: 'new', message: 'Looking for reliable weekly pool service in Henderson', source: 'website', created_at: new Date(Date.now() - 6 * 86400000).toISOString() },
  { id: '6', name: 'David Nguyen', phone: '702-555-0639', email: 'dnguyen@icloud.com', service_type: 'Pool Opening', status: 'contacted', message: 'Need pool opened and chemicals balanced for summer', source: 'website', created_at: new Date(Date.now() - 7 * 86400000).toISOString() },
  { id: '7', name: 'Maria Santos', phone: '702-555-0724', email: 'msantos@gmail.com', service_type: 'Weekly Maintenance', status: 'qualified', message: 'Want to switch from current pool service, unhappy with them', source: 'website', created_at: new Date(Date.now() - 8 * 86400000).toISOString() },
  { id: '8', name: 'James Carter', phone: '702-555-0891', email: 'jcarter@outlook.com', service_type: 'Leak Detection', status: 'new', message: 'Water level dropping faster than normal', source: 'website', created_at: new Date(Date.now() - 9 * 86400000).toISOString() },
  { id: '9', name: 'Ashley Patel', phone: '702-555-0167', email: 'apatel@gmail.com', service_type: 'Weekly Maintenance', status: 'lost', message: 'Requesting pricing info for Centennial Hills area', source: 'website', created_at: new Date(Date.now() - 12 * 86400000).toISOString() },
  { id: '10', name: 'Chris Morales', phone: '702-555-0293', email: 'cmorales@yahoo.com', service_type: 'Equipment Install', status: 'converted', message: 'Want to upgrade to variable speed pump', source: 'website', created_at: new Date(Date.now() - 14 * 86400000).toISOString() },
  { id: '11', name: 'Patricia Lee', phone: '702-555-0447', email: 'plee@gmail.com', service_type: 'Green Pool Rescue', status: 'contacted', message: 'Pool went green during vacation, need ASAP service', source: 'website', created_at: new Date(Date.now() - 15 * 86400000).toISOString() },
  { id: '12', name: 'Kevin Rodriguez', phone: '702-555-0573', email: 'krodriguez@icloud.com', service_type: 'Weekly Maintenance', status: 'new', message: 'Looking for service for my 40k gallon pool in Summerlin', source: 'website', created_at: new Date(Date.now() - 16 * 86400000).toISOString() },
  { id: '13', name: 'Nancy Thompson', phone: '702-555-0654', email: 'nthompson@gmail.com', service_type: 'Tile Cleaning', status: 'qualified', message: 'Tiles have calcium buildup and need acid washing', source: 'website', created_at: new Date(Date.now() - 18 * 86400000).toISOString() },
  { id: '14', name: 'Brian Wilson', phone: '702-555-0728', email: 'bwilson@outlook.com', service_type: 'One-Time Clean', status: 'new', message: 'Need a one-time clean before a party next weekend', source: 'website', created_at: new Date(Date.now() - 20 * 86400000).toISOString() },
  { id: '15', name: 'Laura Gomez', phone: '702-555-0845', email: 'lgomez@gmail.com', service_type: 'Weekly Maintenance', status: 'contacted', message: 'Want weekly service in the Green Valley Ranch area', source: 'website', created_at: new Date(Date.now() - 21 * 86400000).toISOString() },
  { id: '16', name: 'Tony Russo', phone: '702-555-0913', email: 'trusso@yahoo.com', service_type: 'Equipment Repair', status: 'new', message: 'Pool heater not working, want it repaired or replaced', source: 'website', created_at: new Date(Date.now() - 22 * 86400000).toISOString() },
  { id: '17', name: 'Amanda Clark', phone: '702-555-0126', email: 'aclark@gmail.com', service_type: 'Weekly Maintenance', status: 'converted', message: '', source: 'website', created_at: new Date(Date.now() - 25 * 86400000).toISOString() },
  { id: '18', name: 'Steven Park', phone: '702-555-0237', email: 'spark@icloud.com', service_type: 'Green Pool Rescue', status: 'new', message: 'Pool turned green after electrical outage, pump was off', source: 'website', created_at: new Date(Date.now() - 27 * 86400000).toISOString() },
  { id: '19', name: 'Rachel Bennett', phone: '702-555-0364', email: 'rbennett@gmail.com', service_type: 'Pool Opening', status: 'qualified', message: 'Need full opening service, pool has been closed 4 months', source: 'website', created_at: new Date(Date.now() - 28 * 86400000).toISOString() },
  { id: '20', name: 'Daniel Foster', phone: '702-555-0481', email: 'dfoster@outlook.com', service_type: 'Weekly Maintenance', status: 'new', message: 'Need service in North Las Vegas, do you cover that area?', source: 'website', created_at: new Date(Date.now() - 29 * 86400000).toISOString() },
]

export const mockClients = [
  { id: 'c1', name: 'Sandra Torres', email: 'storres@gmail.com', phone: '702-555-0182', address: '8420 Summerlin Lakes Dr, Las Vegas NV 89128', service_type: 'Weekly Maintenance', status: 'vip', notes: 'Has two pools, prefers morning visits. Always tips.', created_at: new Date(Date.now() - 180 * 86400000).toISOString() },
  { id: 'c2', name: 'Robert Kim', email: 'rkim@gmail.com', phone: '702-555-0478', address: '2100 Village Center Cir, Las Vegas NV 89134', service_type: 'Weekly Maintenance', status: 'active', notes: 'New customer. Pool is 30k gallons with spa.', created_at: new Date(Date.now() - 60 * 86400000).toISOString() },
  { id: 'c3', name: 'Chris Morales', email: 'cmorales@yahoo.com', phone: '702-555-0293', address: '9650 W Flamingo Rd, Las Vegas NV 89147', service_type: 'Weekly Maintenance + Equipment', status: 'active', notes: 'Recently upgraded to variable speed pump.', created_at: new Date(Date.now() - 90 * 86400000).toISOString() },
  { id: 'c4', name: 'Amanda Clark', email: 'aclark@gmail.com', phone: '702-555-0126', address: '1350 E Horizon Ridge Pkwy, Henderson NV 89002', service_type: 'Weekly Maintenance', status: 'active', notes: '', created_at: new Date(Date.now() - 120 * 86400000).toISOString() },
  { id: 'c5', name: 'Frank Estrada', email: 'festrada@gmail.com', phone: '702-555-0592', address: '7510 Painted Desert Dr, Las Vegas NV 89128', service_type: 'Weekly Maintenance', status: 'vip', notes: 'Long-time client since 2012. Refers frequently.', created_at: new Date(Date.now() - 365 * 4 * 86400000).toISOString() },
  { id: 'c6', name: 'Gloria Reyes', email: 'greyes@icloud.com', phone: '702-555-0731', address: '3250 Soft Winds Dr, Las Vegas NV 89128', service_type: 'Weekly Maintenance', status: 'active', notes: 'Pool has solar heater, check panels monthly.', created_at: new Date(Date.now() - 200 * 86400000).toISOString() },
  { id: 'c7', name: 'Harold Patterson', email: 'hpatterson@outlook.com', phone: '702-555-0847', address: '1600 Foothills Village Dr, Henderson NV 89012', service_type: 'Weekly Maintenance + Repair', status: 'active', notes: 'Had pump replaced in April.', created_at: new Date(Date.now() - 250 * 86400000).toISOString() },
  { id: 'c8', name: 'Irene Castillo', email: 'icastillo@gmail.com', phone: '702-555-0163', address: '6255 W Twain Ave, Las Vegas NV 89103', service_type: 'Bi-Weekly Maintenance', status: 'active', notes: '', created_at: new Date(Date.now() - 150 * 86400000).toISOString() },
  { id: 'c9', name: 'James O\'Brien', email: 'jobrien@gmail.com', phone: '702-555-0294', address: '9120 W Russell Rd, Las Vegas NV 89148', service_type: 'Weekly Maintenance', status: 'inactive', notes: 'On hold, traveling for 3 months.', created_at: new Date(Date.now() - 300 * 86400000).toISOString() },
  { id: 'c10', name: 'Karen Mitchell', email: 'kmitchell@yahoo.com', phone: '702-555-0415', address: '3890 Sundance Dr, Las Vegas NV 89121', service_type: 'Weekly Maintenance', status: 'active', notes: 'Pool has attached spa, service both.', created_at: new Date(Date.now() - 400 * 86400000).toISOString() },
  { id: 'c11', name: 'Luis Vargas', email: 'lvargas@gmail.com', phone: '702-555-0538', address: '11240 Canyon Lake Dr, Las Vegas NV 89138', service_type: 'Weekly Maintenance', status: 'vip', notes: 'HOA president, has referred 6 clients.', created_at: new Date(Date.now() - 730 * 86400000).toISOString() },
  { id: 'c12', name: 'Michelle Brooks', email: 'mbrooks@icloud.com', phone: '702-555-0672', address: '4530 W Harmon Ave, Las Vegas NV 89103', service_type: 'Monthly Maintenance', status: 'active', notes: '', created_at: new Date(Date.now() - 80 * 86400000).toISOString() },
  { id: 'c13', name: 'Nathan Rivera', email: 'nrivera@gmail.com', phone: '702-555-0789', address: '7200 Rancho Destino Rd, Las Vegas NV 89123', service_type: 'Weekly Maintenance', status: 'active', notes: 'New pool build, started service in spring.', created_at: new Date(Date.now() - 45 * 86400000).toISOString() },
  { id: 'c14', name: 'Olivia Freeman', email: 'ofreeman@outlook.com', phone: '702-555-0894', address: '5810 Antelope Blvd, North Las Vegas NV 89031', service_type: 'Weekly Maintenance', status: 'active', notes: '', created_at: new Date(Date.now() - 160 * 86400000).toISOString() },
  { id: 'c15', name: 'Paul Zimmerman', email: 'pzimmerman@gmail.com', phone: '702-555-0127', address: '2640 W Warm Springs Rd, Henderson NV 89014', service_type: 'Weekly Maintenance + Chemical', status: 'active', notes: 'Saltwater pool, test weekly.', created_at: new Date(Date.now() - 220 * 86400000).toISOString() },
]

const today = new Date()
const getDate = (daysOffset, hour = 10, minute = 0) => {
  const d = new Date(today)
  d.setDate(d.getDate() + daysOffset)
  d.setHours(hour, minute, 0, 0)
  return d.toISOString()
}

export const mockAppointments = [
  { id: 'a1', client_id: 'c1', service_type: 'Weekly Maintenance', scheduled_at: getDate(-30, 9), duration_minutes: 60, status: 'completed', technician: 'Mike R.', notes: 'Chemical levels adjusted. Filter cleaned.' },
  { id: 'a2', client_id: 'c5', service_type: 'Weekly Maintenance', scheduled_at: getDate(-29, 10), duration_minutes: 60, status: 'completed', technician: 'Carlos V.', notes: 'All good. Brushed walls.' },
  { id: 'a3', client_id: 'c3', service_type: 'Equipment Install', scheduled_at: getDate(-28, 11), duration_minutes: 120, status: 'completed', technician: 'Mike R.', notes: 'Installed variable speed pump. Running at 1800 RPM.' },
  { id: 'a4', client_id: 'c8', service_type: 'Bi-Weekly Maintenance', scheduled_at: getDate(-25, 9), duration_minutes: 45, status: 'completed', technician: 'Carlos V.', notes: 'pH was high at 8.0. Added acid.' },
  { id: 'a5', client_id: 'c10', service_type: 'Weekly Maintenance', scheduled_at: getDate(-22, 10), duration_minutes: 75, status: 'completed', technician: 'Jose M.', notes: 'Serviced pool and spa.' },
  { id: 'a6', client_id: 'c2', service_type: 'Green Pool Rescue', scheduled_at: getDate(-20, 8), duration_minutes: 180, status: 'completed', technician: 'Mike R.', notes: 'Shocked pool with 5lbs chlorine. Algaecide added. Return in 3 days.' },
  { id: 'a7', client_id: 'c7', service_type: 'Equipment Repair', scheduled_at: getDate(-18, 11), duration_minutes: 90, status: 'completed', technician: 'Carlos V.', notes: 'Replaced pump motor. Parts: $280, Labor: $120.' },
  { id: 'a8', client_id: 'c11', service_type: 'Weekly Maintenance', scheduled_at: getDate(-15, 9), duration_minutes: 60, status: 'completed', technician: 'Jose M.', notes: 'Normal service. Great condition.' },
  { id: 'a9', client_id: 'c6', service_type: 'Weekly Maintenance', scheduled_at: getDate(-14, 10), duration_minutes: 60, status: 'completed', technician: 'Mike R.', notes: 'Solar panels checked. One panel bracket loose, secured.' },
  { id: 'a10', client_id: 'c4', service_type: 'Weekly Maintenance', scheduled_at: getDate(-12, 14), duration_minutes: 60, status: 'no-show', technician: 'Carlos V.', notes: 'Client not home, gate locked.' },
  { id: 'a11', client_id: 'c1', service_type: 'Weekly Maintenance', scheduled_at: getDate(-7, 9), duration_minutes: 60, status: 'completed', technician: 'Mike R.', notes: 'Normal service. Backwashed filter.' },
  { id: 'a12', client_id: 'c13', service_type: 'Weekly Maintenance', scheduled_at: getDate(-6, 11), duration_minutes: 60, status: 'completed', technician: 'Jose M.', notes: 'New pool still cycling. Adjusted levels.' },
  { id: 'a13', client_id: 'c15', service_type: 'Weekly Maintenance', scheduled_at: getDate(-5, 10), duration_minutes: 60, status: 'completed', technician: 'Carlos V.', notes: 'Saltwater cell cleaned. Salt level 3200 ppm - good.' },
  { id: 'a14', client_id: 'c14', service_type: 'Weekly Maintenance', scheduled_at: getDate(-3, 8), duration_minutes: 60, status: 'completed', technician: 'Mike R.', notes: 'All normal.' },
  { id: 'a15', client_id: 'c5', service_type: 'Weekly Maintenance', scheduled_at: getDate(-2, 9), duration_minutes: 60, status: 'completed', technician: 'Jose M.', notes: 'Slight algae on steps, brushed thoroughly.' },
  { id: 'a16', client_id: 'c12', service_type: 'Monthly Maintenance', scheduled_at: getDate(-1, 13), duration_minutes: 90, status: 'completed', technician: 'Carlos V.', notes: 'Monthly deep service complete.' },
  { id: 'a17', client_id: 'c11', service_type: 'Weekly Maintenance', scheduled_at: getDate(1, 9), duration_minutes: 60, status: 'scheduled', technician: 'Mike R.', notes: '' },
  { id: 'a18', client_id: 'c1', service_type: 'Weekly Maintenance', scheduled_at: getDate(2, 10), duration_minutes: 60, status: 'scheduled', technician: 'Carlos V.', notes: '' },
  { id: 'a19', client_id: 'c3', service_type: 'Weekly Maintenance', scheduled_at: getDate(3, 11), duration_minutes: 60, status: 'scheduled', technician: 'Jose M.', notes: '' },
  { id: 'a20', client_id: 'c8', service_type: 'Bi-Weekly Maintenance', scheduled_at: getDate(4, 9), duration_minutes: 45, status: 'scheduled', technician: 'Mike R.', notes: '' },
  { id: 'a21', client_id: 'c6', service_type: 'Weekly Maintenance', scheduled_at: getDate(5, 10), duration_minutes: 60, status: 'scheduled', technician: 'Carlos V.', notes: '' },
  { id: 'a22', client_id: 'c2', service_type: 'One-Time Clean', scheduled_at: getDate(6, 8), duration_minutes: 120, status: 'scheduled', technician: 'Jose M.', notes: 'Requested before pool party.' },
  { id: 'a23', client_id: 'c13', service_type: 'Weekly Maintenance', scheduled_at: getDate(7, 11), duration_minutes: 60, status: 'scheduled', technician: 'Mike R.', notes: '' },
  { id: 'a24', client_id: 'c10', service_type: 'Weekly Maintenance', scheduled_at: getDate(8, 9), duration_minutes: 75, status: 'scheduled', technician: 'Carlos V.', notes: '' },
  { id: 'a25', client_id: 'c5', service_type: 'Weekly Maintenance', scheduled_at: getDate(9, 10), duration_minutes: 60, status: 'scheduled', technician: 'Jose M.', notes: '' },
]

export const mockAvailability = (() => {
  const slots = []
  let id = 1
  for (let d = 1; d <= 14; d++) {
    const date = new Date(today)
    date.setDate(date.getDate() + d)
    const dayOfWeek = date.getDay()
    if (dayOfWeek === 0 || dayOfWeek === 6) continue
    for (let h = 9; h <= 15; h++) {
      slots.push({
        id: String(id++),
        slot_date: date.toISOString().split('T')[0],
        slot_time: `${String(h).padStart(2, '0')}:00`,
        is_booked: Math.random() < 0.3,
      })
    }
  }
  return slots
})()

export const SERVICES = [
  'Weekly Maintenance',
  'Bi-Weekly Maintenance',
  'Monthly Maintenance',
  'One-Time Clean',
  'Green Pool Rescue',
  'Equipment Repair',
  'Equipment Install',
  'Leak Detection',
  'Tile Cleaning',
  'Pool Opening',
  'Other',
]
