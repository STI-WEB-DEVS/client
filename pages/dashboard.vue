<template>
  <NuxtLayout>

    <!-- Page Header -->
    <div class="flex flex-wrap items-start justify-between gap-4 mb-8">
      <div>
        <h1 style="font-family:Georgia,serif;font-size:1.75rem;font-weight:700;color:#1a1a1a;margin:0;line-height:1.2;">
          Dashboard
        </h1>
        <p style="font-size:0.82rem;color:#999;margin:5px 0 0;">
          {{ today }} &nbsp;·&nbsp; Blood Donation &amp; Inventory Overview
        </p>
      </div>
      <button
        style="display:flex;align-items:center;gap:8px;padding:0.6rem 1.2rem;background:linear-gradient(135deg,#c0392b,#e74c3c);color:white;border:none;border-radius:10px;font-size:0.85rem;font-weight:600;cursor:pointer;box-shadow:0 4px 14px rgba(192,57,43,0.3);transition:all 0.2s;"
        onmouseover="this.style.transform='translateY(-1px)';this.style.boxShadow='0 6px 20px rgba(192,57,43,0.4)'"
        onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='0 4px 14px rgba(192,57,43,0.3)'"
      >
        <svg style="width:16px;height:16px;" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
        </svg>
        Send Emergency Alert
      </button>
    </div>

    <!-- STAT CARDS -->
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:1rem;margin-bottom:1.5rem;">
      <div v-for="stat in stats" :key="stat.label"
        style="background:white;border-radius:14px;padding:1.25rem;display:flex;align-items:center;gap:1rem;border:1px solid #f5e8e8;box-shadow:0 1px 6px rgba(192,57,43,0.04);"
      >
        <div :style="'width:44px;height:44px;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;background:' + stat.iconBg">
          <span style="font-size:1.3rem;">{{ stat.emoji }}</span>
        </div>
        <div>
          <p style="font-size:0.7rem;color:#999;text-transform:uppercase;letter-spacing:0.05em;margin:0;">{{ stat.label }}</p>
          <p style="font-size:1.6rem;font-weight:700;color:#1a1a1a;line-height:1.1;margin:2px 0;">{{ stat.value }}</p>
          <p :style="'font-size:0.7rem;font-weight:500;margin:0;color:' + (stat.up ? '#22c55e' : '#e74c3c')">
            {{ stat.up ? '▲' : '▼' }} {{ stat.change }}
          </p>
        </div>
      </div>
    </div>

    <!-- Inventory + Recent Donations -->
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.25rem;margin-bottom:1.25rem;">

      <!-- Blood Inventory Card -->
      <div style="background:white;border-radius:16px;padding:1.5rem;border:1px solid #f5e8e8;box-shadow:0 1px 8px rgba(192,57,43,0.04);">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1.25rem;">
          <h2 style="font-size:0.95rem;font-weight:700;color:#1a1a1a;margin:0;">Blood Inventory Status</h2>
          <span style="background:#fef2f2;color:#c0392b;font-size:0.65rem;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;padding:3px 9px;border-radius:20px;border:1px solid #fecaca;">
            Live
          </span>
        </div>
        <div style="display:flex;flex-direction:column;gap:10px;">
          <div v-for="b in inventory" :key="b.type" style="display:flex;flex-direction:column;gap:4px;">
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <span style="font-size:0.8rem;font-weight:700;color:#333;">{{ b.type }}</span>
              <span
                style="font-size:0.63rem;font-weight:700;text-transform:uppercase;padding:2px 7px;border-radius:10px;"
                :style="b.statusKey === 'critical' ? 'background:#fef2f2;color:#e74c3c;'
                       : b.statusKey === 'low'      ? 'background:#fffbeb;color:#d97706;'
                       :                              'background:#f0fdf4;color:#16a34a;'"
              >{{ b.statusLabel }}</span>
            </div>
            <div style="width:100%;height:6px;background:#f5e8e8;border-radius:10px;overflow:hidden;">
              <div :style="'height:100%;border-radius:10px;background:' + b.color + ';width:' + b.pct + '%;transition:width 0.7s ease;'"></div>
            </div>
            <div style="display:flex;gap:3px;">
              <span style="font-size:0.7rem;font-weight:600;color:#555;">{{ b.units }} units</span>
              <span style="font-size:0.7rem;color:#bbb;">/ {{ b.max }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Donations Card -->
      <div style="background:white;border-radius:16px;padding:1.5rem;border:1px solid #f5e8e8;box-shadow:0 1px 8px rgba(192,57,43,0.04);">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1.25rem;">
          <h2 style="font-size:0.95rem;font-weight:700;color:#1a1a1a;margin:0;">Recent Donations</h2>
          <NuxtLink to="/donors" style="font-size:0.78rem;color:#c0392b;text-decoration:none;font-weight:600;">View All →</NuxtLink>
        </div>
        <div style="display:flex;flex-direction:column;gap:0.65rem;">
          <div
            v-for="d in recentDonations" :key="d.id"
            style="display:flex;align-items:center;gap:10px;padding:0.55rem;border-radius:10px;transition:background 0.15s;"
            onmouseover="this.style.background='#fef9f9'"
            onmouseout="this.style.background='transparent'"
          >
            <div :style="'width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:0.7rem;font-weight:700;color:white;flex-shrink:0;background:' + d.color">
              {{ d.initials }}
            </div>
            <div style="flex:1;min-width:0;">
              <p style="font-size:0.85rem;font-weight:600;color:#1a1a1a;margin:0;">{{ d.name }}</p>
              <p style="font-size:0.72rem;color:#999;margin:2px 0 0;">{{ d.type }} &nbsp;·&nbsp; {{ d.date }}</p>
            </div>
            <span
              style="font-size:0.63rem;font-weight:600;padding:3px 9px;border-radius:20px;flex-shrink:0;"
              :style="d.badgeKey === 'verified'   ? 'background:#f0fdf4;color:#22c55e;'
                     : d.badgeKey === 'processing' ? 'background:#fffbeb;color:#d97706;'
                     :                               'background:#eff6ff;color:#3b82f6;'"
            >{{ d.badge }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- EMERGENCY REQUESTS -->
    <div style="background:white;border-radius:16px;padding:1.5rem;border:1px solid #f5e8e8;box-shadow:0 1px 8px rgba(192,57,43,0.04);">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1.25rem;flex-wrap:wrap;gap:8px;">
        <h2 style="display:flex;align-items:center;gap:8px;font-size:0.95rem;font-weight:700;color:#1a1a1a;margin:0;">
          <span style="font-size:1.1rem;">🚨</span> Active Emergency Requests
        </h2>
        <span style="font-size:0.75rem;font-weight:600;color:#c0392b;background:#fef2f2;border:1px solid #fecaca;padding:3px 10px;border-radius:20px;">
          3 pending
        </span>
      </div>
      <div style="display:flex;flex-direction:column;gap:10px;">
        <div
          v-for="req in emergencies" :key="req.id"
          style="display:flex;align-items:center;justify-content:space-between;gap:1rem;padding:0.9rem 1rem;background:#fff9f9;border:1px solid #fecaca;border-radius:12px;flex-wrap:wrap;"
        >
          <div style="display:flex;align-items:center;gap:12px;">
            <div :style="'width:44px;height:44px;border-radius:10px;background:linear-gradient(135deg,#c0392b,#e74c3c);color:white;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:0.88rem;flex-shrink:0;'">
              {{ req.bloodType }}
            </div>
            <div>
              <p style="font-size:0.85rem;font-weight:600;color:#1a1a1a;margin:0;">{{ req.hospital }}</p>
              <p style="font-size:0.72rem;color:#999;margin:2px 0 0;">{{ req.units }} units needed</p>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:10px;flex-shrink:0;">
            <span
              style="font-size:0.68rem;font-weight:700;padding:3px 9px;border-radius:20px;text-transform:uppercase;letter-spacing:0.04em;"
              :style="req.urgencyKey === 'critical' ? 'background:#fef2f2;color:#c0392b;border:1px solid #fecaca;'
                     : req.urgencyKey === 'urgent'   ? 'background:#fffbeb;color:#d97706;border:1px solid #fde68a;'
                     :                                  'background:#f0fdf4;color:#16a34a;border:1px solid #bbf7d0;'"
            >{{ req.urgency }}</span>
            <button
              style="padding:5px 14px;background:#c0392b;color:white;border:none;border-radius:8px;font-size:0.78rem;font-weight:600;cursor:pointer;transition:background 0.15s;"
              onmouseover="this.style.background='#e74c3c'"
              onmouseout="this.style.background='#c0392b'"
            >Respond</button>
          </div>
        </div>
      </div>
    </div>

  </NuxtLayout>
</template>

<script setup lang="ts">
const today = new Date().toLocaleDateString('en-PH', {
  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
})

const stats = [
  { label: 'Total Donors',     value: '1,284', change: '+12 this week', up: true,  emoji: '👥', iconBg: '#fef2f2' },
  { label: 'Units Collected',  value: '348',   change: '+28 today',     up: true,  emoji: '🩸', iconBg: '#fef2f2' },
  { label: 'Critical Stock',   value: '3',     change: 'O- and B- low', up: false, emoji: '⚠️', iconBg: '#fff1f0' },
  { label: 'Dispatched Today', value: '47',    change: '+5 from yesterday', up: true, emoji: '🚚', iconBg: '#fef2f2' },
]

const inventory = [
  { type: 'A+',  units: 42, max: 50, pct: 84, color: '#e74c3c', statusKey: 'adequate',  statusLabel: 'Adequate' },
  { type: 'B+',  units: 28, max: 50, pct: 56, color: '#c0392b', statusKey: 'adequate',  statusLabel: 'Adequate' },
  { type: 'O+',  units: 12, max: 50, pct: 24, color: '#f39c12', statusKey: 'low',       statusLabel: 'Low' },
  { type: 'AB+', units: 35, max: 50, pct: 70, color: '#922b21', statusKey: 'adequate',  statusLabel: 'Adequate' },
  { type: 'B-',  units: 3,  max: 30, pct: 10, color: '#e74c3c', statusKey: 'critical',  statusLabel: 'Critical' },
  { type: 'O-',  units: 5,  max: 30, pct: 17, color: '#c0392b', statusKey: 'critical',  statusLabel: 'Critical' },
]

const recentDonations = [
  { id: 1, name: 'Maria Clara Santos',   initials: 'MC', type: 'O+',  date: 'Today, 9:00 AM',  badge: 'Verified',   badgeKey: 'verified',   color: '#c0392b' },
  { id: 2, name: 'Juan Miguel dela Cruz',initials: 'JM', type: 'A+',  date: 'Today, 10:30 AM', badge: 'Processing', badgeKey: 'processing', color: '#7b241c' },
  { id: 3, name: 'Ana Luisa Reyes',      initials: 'AL', type: 'B-',  date: 'Today, 11:15 AM', badge: 'Verified',   badgeKey: 'verified',   color: '#e74c3c' },
  { id: 4, name: 'Carlos Mendez',        initials: 'CM', type: 'AB+', date: 'Yesterday',        badge: 'Dispatched', badgeKey: 'dispatched', color: '#922b21' },
]

const emergencies = [
  { id: 1, bloodType: 'O-',  hospital: 'Philippine General Hospital', units: 10, urgency: 'Critical', urgencyKey: 'critical' },
  { id: 2, bloodType: 'B-',  hospital: "St. Luke's Medical Center",   units: 5,  urgency: 'Urgent',   urgencyKey: 'urgent'   },
  { id: 3, bloodType: 'A+',  hospital: 'Makati Medical Center',       units: 8,  urgency: 'Moderate', urgencyKey: 'moderate' },
]
</script>