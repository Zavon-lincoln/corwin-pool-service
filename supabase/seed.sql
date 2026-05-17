-- ============================================================
-- Corwin Pool Service — Seed Data
-- Run AFTER schema.sql in your Supabase SQL editor
-- ============================================================

-- ─── CLIENTS (15) ────────────────────────────────────────────────────────────
INSERT INTO clients (name, email, phone, address, service_type, status, notes) VALUES
  ('Sandra Torres',   'storres@gmail.com',       '702-555-0182', '8420 Summerlin Lakes Dr, Las Vegas NV 89128',       'Weekly Maintenance',              'vip',      'Has two pools, prefers morning visits. Always tips.'),
  ('Robert Kim',      'rkim@gmail.com',           '702-555-0478', '2100 Village Center Cir, Las Vegas NV 89134',       'Weekly Maintenance',              'active',   'New customer. Pool is 30k gallons with spa.'),
  ('Chris Morales',   'cmorales@yahoo.com',       '702-555-0293', '9650 W Flamingo Rd, Las Vegas NV 89147',            'Weekly Maintenance + Equipment',  'active',   'Recently upgraded to variable speed pump.'),
  ('Amanda Clark',    'aclark@gmail.com',         '702-555-0126', '1350 E Horizon Ridge Pkwy, Henderson NV 89002',     'Weekly Maintenance',              'active',   ''),
  ('Frank Estrada',   'festrada@gmail.com',       '702-555-0592', '7510 Painted Desert Dr, Las Vegas NV 89128',        'Weekly Maintenance',              'vip',      'Long-time client since 2012. Refers frequently.'),
  ('Gloria Reyes',    'greyes@icloud.com',        '702-555-0731', '3250 Soft Winds Dr, Las Vegas NV 89128',            'Weekly Maintenance',              'active',   'Pool has solar heater, check panels monthly.'),
  ('Harold Patterson','hpatterson@outlook.com',   '702-555-0847', '1600 Foothills Village Dr, Henderson NV 89012',     'Weekly Maintenance + Repair',     'active',   'Had pump replaced in April.'),
  ('Irene Castillo',  'icastillo@gmail.com',      '702-555-0163', '6255 W Twain Ave, Las Vegas NV 89103',              'Bi-Weekly Maintenance',           'active',   ''),
  ('James O''Brien',  'jobrien@gmail.com',        '702-555-0294', '9120 W Russell Rd, Las Vegas NV 89148',             'Weekly Maintenance',              'inactive', 'On hold, traveling for 3 months.'),
  ('Karen Mitchell',  'kmitchell@yahoo.com',      '702-555-0415', '3890 Sundance Dr, Las Vegas NV 89121',              'Weekly Maintenance',              'active',   'Pool has attached spa, service both.'),
  ('Luis Vargas',     'lvargas@gmail.com',        '702-555-0538', '11240 Canyon Lake Dr, Las Vegas NV 89138',          'Weekly Maintenance',              'vip',      'HOA president, has referred 6 clients.'),
  ('Michelle Brooks', 'mbrooks@icloud.com',       '702-555-0672', '4530 W Harmon Ave, Las Vegas NV 89103',             'Monthly Maintenance',             'active',   ''),
  ('Nathan Rivera',   'nrivera@gmail.com',        '702-555-0789', '7200 Rancho Destino Rd, Las Vegas NV 89123',        'Weekly Maintenance',              'active',   'New pool build, started service in spring.'),
  ('Olivia Freeman',  'ofreeman@outlook.com',     '702-555-0894', '5810 Antelope Blvd, North Las Vegas NV 89031',      'Weekly Maintenance',              'active',   ''),
  ('Paul Zimmerman',  'pzimmerman@gmail.com',     '702-555-0127', '2640 W Warm Springs Rd, Henderson NV 89014',        'Weekly Maintenance + Chemical',   'active',   'Saltwater pool, test weekly.');

-- ─── LEADS (20) ──────────────────────────────────────────────────────────────
INSERT INTO leads (name, email, phone, service_type, message, source, status, created_at) VALUES
  ('Sandra Torres',   'storres@gmail.com',    '702-555-0182', 'Weekly Maintenance',  'Need weekly service for my backyard pool in Summerlin',                                  'website', 'converted',  NOW() - INTERVAL '30 days'),
  ('Mike Delgado',    'mdelgado@outlook.com', '702-555-0241', 'Green Pool Rescue',   'Pool has turned green after being closed 3 weeks',                                       'website', 'contacted',  NOW() - INTERVAL '2 days'),
  ('Jennifer Walsh',  'jwalsh@yahoo.com',     '702-555-0315', 'Equipment Repair',    'Pump making loud noise, possibly needs replacement',                                      'website', 'qualified',  NOW() - INTERVAL '3 days'),
  ('Robert Kim',      'rkim@gmail.com',       '702-555-0478', 'One-Time Clean',      'Just bought a house with a pool that needs a deep clean',                                'website', 'converted',  NOW() - INTERVAL '60 days'),
  ('Lisa Hernandez',  'lhernandez@gmail.com', '702-555-0562', 'Weekly Maintenance',  'Looking for reliable weekly pool service in Henderson',                                   'website', 'new',        NOW() - INTERVAL '6 days'),
  ('David Nguyen',    'dnguyen@icloud.com',   '702-555-0639', 'Pool Opening',        'Need pool opened and chemicals balanced for summer',                                      'website', 'contacted',  NOW() - INTERVAL '7 days'),
  ('Maria Santos',    'msantos@gmail.com',    '702-555-0724', 'Weekly Maintenance',  'Want to switch from current pool service, unhappy with them',                            'website', 'qualified',  NOW() - INTERVAL '8 days'),
  ('James Carter',    'jcarter@outlook.com',  '702-555-0891', 'Leak Detection',      'Water level dropping faster than normal',                                                'website', 'new',        NOW() - INTERVAL '1 day'),
  ('Ashley Patel',    'apatel@gmail.com',     '702-555-0167', 'Weekly Maintenance',  'Requesting pricing info for Centennial Hills area',                                       'website', 'lost',       NOW() - INTERVAL '12 days'),
  ('Chris Morales',   'cmorales@yahoo.com',   '702-555-0293', 'Equipment Install',   'Want to upgrade to variable speed pump',                                                 'website', 'converted',  NOW() - INTERVAL '90 days'),
  ('Patricia Lee',    'plee@gmail.com',       '702-555-0447', 'Green Pool Rescue',   'Pool went green during vacation, need ASAP service',                                     'website', 'contacted',  NOW() - INTERVAL '15 days'),
  ('Kevin Rodriguez', 'krodriguez@icloud.com','702-555-0573', 'Weekly Maintenance',  'Looking for service for my 40k gallon pool in Summerlin',                                'website', 'new',        NOW() - INTERVAL '16 days'),
  ('Nancy Thompson',  'nthompson@gmail.com',  '702-555-0654', 'Tile Cleaning',       'Tiles have calcium buildup and need acid washing',                                       'website', 'qualified',  NOW() - INTERVAL '18 days'),
  ('Brian Wilson',    'bwilson@outlook.com',  '702-555-0728', 'One-Time Clean',      'Need a one-time clean before a party next weekend',                                      'website', 'new',        NOW() - INTERVAL '20 days'),
  ('Laura Gomez',     'lgomez@gmail.com',     '702-555-0845', 'Weekly Maintenance',  'Want weekly service in the Green Valley Ranch area',                                     'website', 'contacted',  NOW() - INTERVAL '21 days'),
  ('Tony Russo',      'trusso@yahoo.com',     '702-555-0913', 'Equipment Repair',    'Pool heater not working, want it repaired or replaced',                                  'website', 'new',        NOW() - INTERVAL '22 days'),
  ('Amanda Clark',    'aclark@gmail.com',     '702-555-0126', 'Weekly Maintenance',  '',                                                                                       'website', 'converted',  NOW() - INTERVAL '120 days'),
  ('Steven Park',     'spark@icloud.com',     '702-555-0237', 'Green Pool Rescue',   'Pool turned green after electrical outage, pump was off',                                'website', 'new',        NOW() - INTERVAL '27 days'),
  ('Rachel Bennett',  'rbennett@gmail.com',   '702-555-0364', 'Pool Opening',        'Need full opening service, pool has been closed 4 months',                               'website', 'qualified',  NOW() - INTERVAL '28 days'),
  ('Daniel Foster',   'dfoster@outlook.com',  '702-555-0481', 'Weekly Maintenance',  'Need service in North Las Vegas, do you cover that area?',                               'website', 'new',        NOW() - INTERVAL '29 days');

-- ─── APPOINTMENTS (25) ───────────────────────────────────────────────────────
-- Uses subqueries to get client IDs by name
INSERT INTO appointments (client_id, service_type, scheduled_at, duration_minutes, status, technician, notes) VALUES
  ((SELECT id FROM clients WHERE name='Sandra Torres'),   'Weekly Maintenance',    NOW() - INTERVAL '30 days' + INTERVAL '9 hours',  60,  'completed', 'Mike R.',    'Chemical levels adjusted. Filter cleaned.'),
  ((SELECT id FROM clients WHERE name='Frank Estrada'),   'Weekly Maintenance',    NOW() - INTERVAL '29 days' + INTERVAL '10 hours', 60,  'completed', 'Carlos V.',  'All good. Brushed walls.'),
  ((SELECT id FROM clients WHERE name='Chris Morales'),   'Equipment Install',     NOW() - INTERVAL '28 days' + INTERVAL '11 hours', 120, 'completed', 'Mike R.',    'Installed variable speed pump. Running at 1800 RPM.'),
  ((SELECT id FROM clients WHERE name='Irene Castillo'),  'Bi-Weekly Maintenance', NOW() - INTERVAL '25 days' + INTERVAL '9 hours',  45,  'completed', 'Carlos V.',  'pH was high at 8.0. Added muriatic acid.'),
  ((SELECT id FROM clients WHERE name='Karen Mitchell'),  'Weekly Maintenance',    NOW() - INTERVAL '22 days' + INTERVAL '10 hours', 75,  'completed', 'Jose M.',    'Serviced pool and spa.'),
  ((SELECT id FROM clients WHERE name='Robert Kim'),      'Green Pool Rescue',     NOW() - INTERVAL '20 days' + INTERVAL '8 hours',  180, 'completed', 'Mike R.',    'Shocked pool with 5lbs chlorine. Algaecide added. Return in 3 days.'),
  ((SELECT id FROM clients WHERE name='Harold Patterson'),'Equipment Repair',      NOW() - INTERVAL '18 days' + INTERVAL '11 hours', 90,  'completed', 'Carlos V.',  'Replaced pump motor. Parts: $280, Labor: $120.'),
  ((SELECT id FROM clients WHERE name='Luis Vargas'),     'Weekly Maintenance',    NOW() - INTERVAL '15 days' + INTERVAL '9 hours',  60,  'completed', 'Jose M.',    'Normal service. Great condition.'),
  ((SELECT id FROM clients WHERE name='Gloria Reyes'),    'Weekly Maintenance',    NOW() - INTERVAL '14 days' + INTERVAL '10 hours', 60,  'completed', 'Mike R.',    'Solar panels checked. One panel bracket loose, secured.'),
  ((SELECT id FROM clients WHERE name='Amanda Clark'),    'Weekly Maintenance',    NOW() - INTERVAL '12 days' + INTERVAL '14 hours', 60,  'no-show',   'Carlos V.',  'Client not home, gate locked.'),
  ((SELECT id FROM clients WHERE name='Sandra Torres'),   'Weekly Maintenance',    NOW() - INTERVAL '7 days'  + INTERVAL '9 hours',  60,  'completed', 'Mike R.',    'Normal service. Backwashed filter.'),
  ((SELECT id FROM clients WHERE name='Nathan Rivera'),   'Weekly Maintenance',    NOW() - INTERVAL '6 days'  + INTERVAL '11 hours', 60,  'completed', 'Jose M.',    'New pool still cycling. Adjusted levels.'),
  ((SELECT id FROM clients WHERE name='Paul Zimmerman'),  'Weekly Maintenance',    NOW() - INTERVAL '5 days'  + INTERVAL '10 hours', 60,  'completed', 'Carlos V.',  'Saltwater cell cleaned. Salt level 3200 ppm.'),
  ((SELECT id FROM clients WHERE name='Olivia Freeman'),  'Weekly Maintenance',    NOW() - INTERVAL '3 days'  + INTERVAL '8 hours',  60,  'completed', 'Mike R.',    'All normal.'),
  ((SELECT id FROM clients WHERE name='Frank Estrada'),   'Weekly Maintenance',    NOW() - INTERVAL '2 days'  + INTERVAL '9 hours',  60,  'completed', 'Jose M.',    'Slight algae on steps, brushed thoroughly.'),
  ((SELECT id FROM clients WHERE name='Michelle Brooks'), 'Monthly Maintenance',   NOW() - INTERVAL '1 days'  + INTERVAL '13 hours', 90,  'completed', 'Carlos V.',  'Monthly deep service complete.'),
  ((SELECT id FROM clients WHERE name='Luis Vargas'),     'Weekly Maintenance',    NOW() + INTERVAL '1 days'  + INTERVAL '9 hours',  60,  'scheduled', 'Mike R.',    ''),
  ((SELECT id FROM clients WHERE name='Sandra Torres'),   'Weekly Maintenance',    NOW() + INTERVAL '2 days'  + INTERVAL '10 hours', 60,  'scheduled', 'Carlos V.',  ''),
  ((SELECT id FROM clients WHERE name='Chris Morales'),   'Weekly Maintenance',    NOW() + INTERVAL '3 days'  + INTERVAL '11 hours', 60,  'scheduled', 'Jose M.',    ''),
  ((SELECT id FROM clients WHERE name='Irene Castillo'),  'Bi-Weekly Maintenance', NOW() + INTERVAL '4 days'  + INTERVAL '9 hours',  45,  'scheduled', 'Mike R.',    ''),
  ((SELECT id FROM clients WHERE name='Gloria Reyes'),    'Weekly Maintenance',    NOW() + INTERVAL '5 days'  + INTERVAL '10 hours', 60,  'scheduled', 'Carlos V.',  ''),
  ((SELECT id FROM clients WHERE name='Robert Kim'),      'One-Time Clean',        NOW() + INTERVAL '6 days'  + INTERVAL '8 hours',  120, 'scheduled', 'Jose M.',    'Requested before pool party.'),
  ((SELECT id FROM clients WHERE name='Nathan Rivera'),   'Weekly Maintenance',    NOW() + INTERVAL '7 days'  + INTERVAL '11 hours', 60,  'scheduled', 'Mike R.',    ''),
  ((SELECT id FROM clients WHERE name='Karen Mitchell'),  'Weekly Maintenance',    NOW() + INTERVAL '8 days'  + INTERVAL '9 hours',  75,  'scheduled', 'Carlos V.',  ''),
  ((SELECT id FROM clients WHERE name='Frank Estrada'),   'Weekly Maintenance',    NOW() + INTERVAL '9 days'  + INTERVAL '10 hours', 60,  'scheduled', 'Jose M.',    '');

-- ─── AVAILABILITY (28 slots over next 14 business days) ─────────────────────
-- 9am–3pm Mon–Fri, ~2 slots per day booked
DO $$
DECLARE
  d DATE := CURRENT_DATE + 1;
  slot_hours INT[] := ARRAY[9, 10, 11, 13, 14, 15];
  h INT;
  slot_count INT := 0;
BEGIN
  WHILE slot_count < 28 LOOP
    IF EXTRACT(DOW FROM d) NOT IN (0, 6) THEN  -- skip weekends
      FOREACH h IN ARRAY slot_hours LOOP
        IF slot_count < 28 THEN
          INSERT INTO availability (slot_date, slot_time, is_booked)
          VALUES (d, (h::TEXT || ':00')::TIME, (slot_count % 5 = 0));  -- ~20% booked
          slot_count := slot_count + 1;
        END IF;
      END LOOP;
    END IF;
    d := d + 1;
  END LOOP;
END $$;
