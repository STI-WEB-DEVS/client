<template>
  <NuxtLayout>
    <div class="dashboard">

      <!-- ══════════════════════════════════════
           PAGE HEADER
      ══════════════════════════════════════ -->
      <div class="page-header">
        <div class="header-left">
          <div class="header-eyebrow">
            <span class="eyebrow-pip"></span>
            <span class="eyebrow-label">KaDugo · Blood Donation System</span>
          </div>
          <h1 class="page-title">Dashboard</h1>
          <p class="page-sub">{{ today }} &nbsp;·&nbsp; Blood Donation &amp; Inventory Overview</p>
        </div>
        <button class="btn-alert">
          <span class="alert-pulse"></span>
          <svg viewBox="0 0 24 24" fill="none" style="width:16px;height:16px;flex-shrink:0;">
            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
            <path d="M12 9v4M12 17h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
          Send Emergency Alert
        </button>
      </div>

      <!-- ══════════════════════════════════════
           STAT CARDS
      ══════════════════════════════════════ -->
      <div class="stats-grid">
        <div
          v-for="(stat, i) in stats"
          :key="stat.label"
          class="stat-card"
          :class="stat.cardClass"
          :style="{ animationDelay: `${i * 0.07}s` }"
        >
          <div class="stat-icon-wrap" :class="stat.iconClass">
            <div v-html="stat.iconSvg"></div>
          </div>
          <div class="stat-body">
            <p class="stat-label">{{ stat.label }}</p>
            <p class="stat-value">{{ stat.value }}</p>
            <p class="stat-change" :class="stat.up ? 'stat-up' : 'stat-down'">
              <svg v-if="stat.up" viewBox="0 0 12 12" fill="none" style="width:10px;height:10px;">
                <path d="M6 9V3M3 6l3-3 3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <svg v-else viewBox="0 0 12 12" fill="none" style="width:10px;height:10px;">
                <path d="M6 3v6M3 6l3 3 3-3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              {{ stat.change }}
            </p>
          </div>
          <div class="stat-glow" :style="{ background: stat.glow }"></div>
        </div>
      </div>

      <!-- ══════════════════════════════════════
           MIDDLE ROW: Inventory + Recent Donations
      ══════════════════════════════════════ -->
      <div class="mid-grid">

        <!-- Blood Inventory Card -->
        <div class="dark-card">
          <div class="card-head">
            <div class="card-title-group">
              <svg viewBox="0 0 20 20" fill="none" style="width:15px;height:15px;color:rgba(220,38,38,0.6);">
                <path d="M10 2C10 2 3 8 3 13C3 16.3 6.1 19 10 19C13.9 19 17 16.3 17 13C17 8 10 2 10 2Z" stroke="currentColor" stroke-width="1.5" fill="none"/>
              </svg>
              <h2 class="card-title">Blood Inventory Status</h2>
            </div>
            <span class="live-badge">
              <span class="live-dot"></span>
              Live
            </span>
          </div>

          <div class="inventory-list">
            <div v-for="b in inventory" :key="b.type" class="inv-row">
              <div class="inv-row-top">
                <div class="inv-type-wrap">
                  <div class="inv-dot" :style="{ background: b.dotColor }"></div>
                  <span class="inv-type">{{ b.type }}</span>
                </div>
                <div class="inv-row-right">
                  <span class="inv-units">{{ b.units }}<span class="inv-max">/ {{ b.max }}</span></span>
                  <span class="inv-status-chip" :class="'istatus-' + b.statusKey">{{ b.statusLabel }}</span>
                </div>
              </div>
              <div class="inv-track">
                <div
                  class="inv-fill"
                  :style="{ width: b.pct + '%', background: b.barColor }"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Donations Card -->
        <div class="dark-card">
          <div class="card-head">
            <div class="card-title-group">
              <svg viewBox="0 0 20 20" fill="none" style="width:15px;height:15px;color:rgba(220,38,38,0.6);">
                <path d="M10 2C10 2 3 8 3 13C3 16.3 6.1 19 10 19C13.9 19 17 16.3 17 13C17 8 10 2 10 2Z" fill="#dc2626" fill-opacity="0.4" stroke="#dc2626" stroke-width="1.2"/>
              </svg>
              <h2 class="card-title">Recent Donations</h2>
            </div>
            <NuxtLink to="/donors" class="view-all-link">
              View All
              <svg viewBox="0 0 16 16" fill="none" style="width:12px;height:12px;">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </NuxtLink>
          </div>

          <div class="donation-list">
            <div
              v-for="(d, i) in recentDonations"
              :key="d.id"
              class="donation-row"
              :style="{ animationDelay: `${i * 0.08 + 0.2}s` }"
            >
              <div class="d-avatar" :style="{ background: d.color }">{{ d.initials }}</div>
              <div class="d-info">
                <p class="d-name">{{ d.name }}</p>
                <p class="d-meta">
                  <span class="d-blood-pill">{{ d.type }}</span>
                  {{ d.date }}
                </p>
              </div>
              <span class="d-badge" :class="'dbadge-' + d.badgeKey">{{ d.badge }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- ══════════════════════════════════════
           EMERGENCY REQUESTS
      ══════════════════════════════════════ -->
      <div class="dark-card emergency-card">
        <div class="card-head">
          <div class="card-title-group">
            <div class="emergency-icon-pulse">
              <svg viewBox="0 0 20 20" fill="none" style="width:14px;height:14px;">
                <path d="M10 3v14M3 10h14" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
              </svg>
            </div>
            <h2 class="card-title">Active Emergency Requests</h2>
          </div>
          <span class="pending-badge">
            <span class="pending-dot"></span>
            {{ emergencies.length }} pending
          </span>
        </div>

        <div class="emergency-list">
          <div
            v-for="(req, i) in emergencies"
            :key="req.id"
            class="emergency-row"
            :class="'erow-' + req.urgencyKey"
            :style="{ animationDelay: `${i * 0.08 + 0.1}s` }"
          >
            <!-- Left: blood type + info -->
            <div class="erow-left">
              <div class="erow-blood">
                <svg viewBox="0 0 20 24" fill="none" style="width:10px;height:12px;opacity:0.5;flex-shrink:0;">
                  <path d="M10 1C10 1 1 9 1 15C1 19.4 5 23 10 23C15 23 19 19.4 19 15C19 9 10 1 10 1Z" fill="white"/>
                </svg>
                {{ req.bloodType }}
              </div>
              <div class="erow-detail">
                <p class="erow-hospital">{{ req.hospital }}</p>
                <p class="erow-units">{{ req.units }} units needed</p>
              </div>
            </div>

            <!-- Right: urgency + action -->
            <div class="erow-right">
              <span class="urgency-chip" :class="'uchip-' + req.urgencyKey">
                <span class="urgency-dot"></span>
                {{ req.urgency }}
              </span>
              <button class="btn-respond">
                Respond
                <svg viewBox="0 0 16 16" fill="none" style="width:12px;height:12px;">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const today = new Date().toLocaleDateString('en-PH', {
  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
})

const stats = [
  {
    label: 'Total Donors',
    value: '1,284',
    change: '+12 this week',
    up: true,
    cardClass: '',
    iconClass: 'icon-red',
    glow: 'rgba(220,38,38,0.2)',
    iconSvg: `<svg viewBox="0 0 20 20" fill="none" style="width:20px;height:20px;" xmlns="http://www.w3.org/2000/svg"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM6 8a2 2 0 11-4 0 2 2 0 014 0zM4 16c0-2.2 2.7-4 6-4s6 1.8 6 4M16 13.6c1.3.6 2 1.5 2 2.4M4 13.6C2.7 14.2 2 15.1 2 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  },
  {
    label: 'Units Collected',
    value: '348',
    change: '+28 today',
    up: true,
    cardClass: '',
    iconClass: 'icon-rose',
    glow: 'rgba(190,18,60,0.2)',
    iconSvg: `<svg viewBox="0 0 20 20" fill="none" style="width:20px;height:20px;" xmlns="http://www.w3.org/2000/svg"><path d="M10 2C10 2 3 8 3 13C3 16.3 6.1 19 10 19C13.9 19 17 16.3 17 13C17 8 10 2 10 2Z" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M10 19V13M7 13h6" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>`,
  },
  {
    label: 'Critical Stock',
    value: '3',
    change: 'O- and B- low',
    up: false,
    cardClass: 'stat-card--critical',
    iconClass: 'icon-orange',
    glow: 'rgba(239,68,68,0.25)',
    iconSvg: `<svg viewBox="0 0 20 20" fill="none" style="width:20px;height:20px;" xmlns="http://www.w3.org/2000/svg"><path d="M10 3l7.9 14H2.1L10 3z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M10 8v4M10 14.5h.01" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  },
  {
    label: 'Dispatched Today',
    value: '47',
    change: '+5 from yesterday',
    up: true,
    cardClass: '',
    iconClass: 'icon-green',
    glow: 'rgba(34,197,94,0.15)',
    iconSvg: `<svg viewBox="0 0 20 20" fill="none" style="width:20px;height:20px;" xmlns="http://www.w3.org/2000/svg"><path d="M2 6h11l3 4v4H2V6z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><circle cx="6" cy="14" r="1.5" stroke="currentColor" stroke-width="1.3"/><circle cx="14" cy="14" r="1.5" stroke="currentColor" stroke-width="1.3"/><path d="M13 6V3H5v3" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>`,
  },
]

const inventory = [
  { type: 'A+',  units: 42, max: 50, pct: 84, dotColor: '#ef4444', barColor: 'linear-gradient(90deg,#22c55e,#16a34a)', statusKey: 'adequate', statusLabel: 'Adequate' },
  { type: 'B+',  units: 28, max: 50, pct: 56, dotColor: '#dc2626', barColor: 'linear-gradient(90deg,#22c55e,#16a34a)', statusKey: 'adequate', statusLabel: 'Adequate' },
  { type: 'O+',  units: 12, max: 50, pct: 24, dotColor: '#f59e0b', barColor: 'linear-gradient(90deg,#f59e0b,#d97706)', statusKey: 'low',      statusLabel: 'Low'      },
  { type: 'AB+', units: 35, max: 50, pct: 70, dotColor: '#b91c1c', barColor: 'linear-gradient(90deg,#22c55e,#16a34a)', statusKey: 'adequate', statusLabel: 'Adequate' },
  { type: 'B-',  units: 3,  max: 30, pct: 10, dotColor: '#ef4444', barColor: 'linear-gradient(90deg,#ef4444,#dc2626)', statusKey: 'critical', statusLabel: 'Critical' },
  { type: 'O-',  units: 5,  max: 30, pct: 17, dotColor: '#dc2626', barColor: 'linear-gradient(90deg,#ef4444,#dc2626)', statusKey: 'critical', statusLabel: 'Critical' },
]

const recentDonations = [
  { id: 1, name: 'Maria Clara Santos',    initials: 'MC', type: 'O+',  date: 'Today, 9:00 AM',  badge: 'Verified',   badgeKey: 'verified',   color: 'linear-gradient(135deg,#dc2626,#7f1d1d)' },
  { id: 2, name: 'Juan Miguel dela Cruz', initials: 'JM', type: 'A+',  date: 'Today, 10:30 AM', badge: 'Processing', badgeKey: 'processing', color: 'linear-gradient(135deg,#991b1b,#450a0a)' },
  { id: 3, name: 'Ana Luisa Reyes',       initials: 'AL', type: 'B-',  date: 'Today, 11:15 AM', badge: 'Verified',   badgeKey: 'verified',   color: 'linear-gradient(135deg,#ef4444,#b91c1c)' },
  { id: 4, name: 'Carlos Mendez',         initials: 'CM', type: 'AB+', date: 'Yesterday',        badge: 'Dispatched', badgeKey: 'dispatched', color: 'linear-gradient(135deg,#b91c1c,#7f1d1d)' },
]

const emergencies = [
  { id: 1, bloodType: 'O-',  hospital: 'Philippine General Hospital', units: 10, urgency: 'Critical', urgencyKey: 'critical' },
  { id: 2, bloodType: 'B-',  hospital: "St. Luke's Medical Center",   units: 5,  urgency: 'Urgent',   urgencyKey: 'urgent'   },
  { id: 3, bloodType: 'A+',  hospital: 'Makati Medical Center',       units: 8,  urgency: 'Moderate', urgencyKey: 'moderate' },
]
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

/* ── Root ── */
.dashboard {
  max-width: 1280px;
  font-family: 'DM Sans', sans-serif;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

/* ══════════════════════════
   PAGE HEADER
══════════════════════════ */
.page-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1.25rem;
}

.header-eyebrow {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.4rem;
}
.eyebrow-pip {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #dc2626;
  box-shadow: 0 0 8px rgba(220,38,38,0.8);
}
.eyebrow-label {
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: rgba(255,255,255,0.28);
  font-weight: 600;
}
.page-title {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 2.25rem;
  font-weight: 900;
  color: #fff;
  margin: 0;
  line-height: 1.1;
  letter-spacing: -0.02em;
}
.page-sub {
  font-size: 0.78rem;
  color: rgba(255,255,255,0.3);
  margin: 0.35rem 0 0;
}

/* Alert button */
.btn-alert {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.72rem 1.4rem;
  background: linear-gradient(135deg, #dc2626, #991b1b);
  color: white;
  border: none;
  border-radius: 12px;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.87rem;
  font-weight: 700;
  cursor: pointer;
  letter-spacing: 0.01em;
  box-shadow: 0 4px 20px rgba(220,38,38,0.45), 0 1px 0 rgba(255,255,255,0.12) inset;
  transition: transform 0.15s, box-shadow 0.15s;
  overflow: visible;
}
.btn-alert:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(220,38,38,0.6);
}

.alert-pulse {
  position: absolute;
  top: -4px; right: -4px;
  width: 10px; height: 10px;
  border-radius: 50%;
  background: #fbbf24;
  box-shadow: 0 0 0 0 rgba(251,191,36,0.7);
  animation: alertPulse 1.8s infinite;
}
@keyframes alertPulse {
  0%   { box-shadow: 0 0 0 0 rgba(251,191,36,0.7); }
  70%  { box-shadow: 0 0 0 8px rgba(251,191,36,0); }
  100% { box-shadow: 0 0 0 0 rgba(251,191,36,0); }
}

/* ══════════════════════════
   STAT CARDS
══════════════════════════ */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1rem;
}

.stat-card {
  position: relative;
  background: #110202;
  border: 1px solid rgba(220,38,38,0.14);
  border-radius: 16px;
  padding: 1.25rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
  animation: cardIn 0.4s cubic-bezier(.22,1,.36,1) both;
}
.stat-card:hover {
  transform: translateY(-3px);
  border-color: rgba(220,38,38,0.3);
  box-shadow: 0 12px 32px rgba(0,0,0,0.4);
}
.stat-card--critical {
  border-color: rgba(239,68,68,0.25);
  background: linear-gradient(135deg, #110202, #1a0505);
}

.stat-icon-wrap {
  width: 44px; height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.icon-red   { background: rgba(220,38,38,0.12); border: 1px solid rgba(220,38,38,0.25); color: #fca5a5; }
.icon-rose  { background: rgba(190,18,60,0.12);  border: 1px solid rgba(190,18,60,0.25);  color: #fda4af; }
.icon-orange{ background: rgba(239,68,68,0.12);  border: 1px solid rgba(239,68,68,0.3);   color: #fca5a5; }
.icon-green { background: rgba(34,197,94,0.1);   border: 1px solid rgba(34,197,94,0.22);  color: #4ade80; }

.stat-body { flex: 1; min-width: 0; }

.stat-label {
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(255,255,255,0.3);
  margin: 0 0 3px;
  font-weight: 600;
}
.stat-value {
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  font-weight: 700;
  color: #fff;
  line-height: 1;
  margin: 0 0 4px;
}
.stat-change {
  display: flex;
  align-items: center;
  gap: 3px;
  font-size: 0.7rem;
  font-weight: 500;
  margin: 0;
}
.stat-up   { color: #4ade80; }
.stat-down { color: #fca5a5; }

.stat-glow {
  position: absolute;
  right: -16px; bottom: -16px;
  width: 72px; height: 72px;
  border-radius: 50%;
  filter: blur(24px);
  pointer-events: none;
}

/* ══════════════════════════
   MIDDLE GRID
══════════════════════════ */
.mid-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
}
@media (max-width: 900px) {
  .mid-grid { grid-template-columns: 1fr; }
}

/* Shared dark card */
.dark-card {
  background: #110202;
  border: 1px solid rgba(220,38,38,0.14);
  border-radius: 18px;
  overflow: hidden;
  animation: cardIn 0.4s cubic-bezier(.22,1,.36,1) both;
}

.card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  flex-wrap: wrap;
  gap: 0.5rem;
}

.card-title-group {
  display: flex;
  align-items: center;
  gap: 0.55rem;
}

.card-title {
  font-family: 'Playfair Display', serif;
  font-size: 0.98rem;
  font-weight: 700;
  color: rgba(255,255,255,0.85);
  margin: 0;
}

.live-badge {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.2rem 0.65rem;
  background: rgba(220,38,38,0.12);
  border: 1px solid rgba(220,38,38,0.28);
  border-radius: 999px;
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #fca5a5;
}
.live-dot {
  width: 5px; height: 5px;
  border-radius: 50%;
  background: #ef4444;
  animation: blink 1.5s infinite;
  box-shadow: 0 0 5px rgba(239,68,68,0.8);
}

.view-all-link {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: #fca5a5;
  text-decoration: none;
  opacity: 0.7;
  transition: opacity 0.15s;
}
.view-all-link:hover { opacity: 1; }

/* ── Inventory list ── */
.inventory-list {
  padding: 1rem 1.5rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.inv-row { display: flex; flex-direction: column; gap: 5px; }

.inv-row-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.inv-type-wrap {
  display: flex;
  align-items: center;
  gap: 0.45rem;
}

.inv-dot {
  width: 8px; height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.inv-type {
  font-size: 0.83rem;
  font-weight: 700;
  color: rgba(255,255,255,0.8);
  letter-spacing: 0.02em;
}

.inv-row-right {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.inv-units {
  font-size: 0.78rem;
  font-weight: 700;
  color: rgba(255,255,255,0.7);
}
.inv-max {
  font-weight: 400;
  color: rgba(255,255,255,0.25);
  font-size: 0.72rem;
}

.inv-status-chip {
  font-size: 0.6rem;
  font-weight: 700;
  padding: 0.18rem 0.55rem;
  border-radius: 999px;
  text-transform: uppercase;
  letter-spacing: 0.07em;
}
.istatus-adequate { background: rgba(22,163,74,0.12);  border: 1px solid rgba(22,163,74,0.25);  color: #4ade80; }
.istatus-low      { background: rgba(245,158,11,0.12); border: 1px solid rgba(245,158,11,0.25); color: #fcd34d; }
.istatus-critical { background: rgba(220,38,38,0.12);  border: 1px solid rgba(220,38,38,0.3);   color: #fca5a5; }

.inv-track {
  height: 5px;
  background: rgba(255,255,255,0.06);
  border-radius: 999px;
  overflow: hidden;
}
.inv-fill {
  height: 100%;
  border-radius: 999px;
  transition: width 0.8s cubic-bezier(.22,1,.36,1);
}

/* ── Donation list ── */
.donation-list {
  padding: 0.75rem 1.5rem 1.25rem;
  display: flex;
  flex-direction: column;
}

.donation-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.7rem 0.6rem;
  border-radius: 10px;
  transition: background 0.15s;
  animation: cardIn 0.35s cubic-bezier(.22,1,.36,1) both;
}
.donation-row:hover { background: rgba(220,38,38,0.04); }

.d-avatar {
  width: 38px; height: 38px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Playfair Display', serif;
  font-size: 0.75rem;
  font-weight: 700;
  color: white;
  flex-shrink: 0;
  box-shadow: 0 3px 10px rgba(0,0,0,0.3);
}

.d-info { flex: 1; min-width: 0; }

.d-name {
  font-size: 0.85rem;
  font-weight: 600;
  color: rgba(255,255,255,0.78);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.d-meta {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.7rem;
  color: rgba(255,255,255,0.28);
  margin: 2px 0 0;
}

.d-blood-pill {
  padding: 0.08rem 0.4rem;
  background: rgba(220,38,38,0.14);
  border: 1px solid rgba(220,38,38,0.25);
  border-radius: 4px;
  font-size: 0.62rem;
  font-weight: 800;
  color: #fca5a5;
  letter-spacing: 0.03em;
}

.d-badge {
  font-size: 0.62rem;
  font-weight: 700;
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  flex-shrink: 0;
  white-space: nowrap;
}
.dbadge-verified   { background: rgba(22,163,74,0.12);  border: 1px solid rgba(22,163,74,0.25);  color: #4ade80; }
.dbadge-processing { background: rgba(245,158,11,0.12); border: 1px solid rgba(245,158,11,0.25); color: #fcd34d; }
.dbadge-dispatched { background: rgba(59,130,246,0.12); border: 1px solid rgba(59,130,246,0.25); color: #93c5fd; }

/* ══════════════════════════
   EMERGENCY CARD
══════════════════════════ */
.emergency-card {
  border-color: rgba(220,38,38,0.22);
}

.emergency-icon-pulse {
  width: 28px; height: 28px;
  border-radius: 8px;
  background: #dc2626;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 0 12px rgba(220,38,38,0.6);
  animation: emergencyGlow 2s ease-in-out infinite;
}
@keyframes emergencyGlow {
  0%, 100% { box-shadow: 0 0 12px rgba(220,38,38,0.6); }
  50%       { box-shadow: 0 0 22px rgba(220,38,38,0.9); }
}

.pending-badge {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.28rem 0.8rem;
  background: rgba(220,38,38,0.12);
  border: 1px solid rgba(220,38,38,0.3);
  border-radius: 999px;
  font-size: 0.7rem;
  font-weight: 700;
  color: #fca5a5;
}
.pending-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #ef4444;
  animation: blink 1.2s infinite;
  box-shadow: 0 0 6px rgba(239,68,68,0.8);
}

/* Emergency list */
.emergency-list {
  padding: 1rem 1.5rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.emergency-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 1.1rem;
  border-radius: 14px;
  border: 1px solid;
  flex-wrap: wrap;
  animation: rowIn 0.35s cubic-bezier(.22,1,.36,1) both;
  transition: transform 0.15s;
}
.emergency-row:hover { transform: translateX(2px); }

.erow-critical { background: rgba(220,38,38,0.08);  border-color: rgba(220,38,38,0.28); }
.erow-urgent   { background: rgba(245,158,11,0.06); border-color: rgba(245,158,11,0.22); }
.erow-moderate { background: rgba(34,197,94,0.05);  border-color: rgba(34,197,94,0.18); }

.erow-left {
  display: flex;
  align-items: center;
  gap: 1rem;
  min-width: 0;
}

.erow-blood {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  width: 52px; height: 52px;
  border-radius: 13px;
  background: linear-gradient(135deg, #dc2626, #7f1d1d);
  color: white;
  font-weight: 800;
  font-size: 0.95rem;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 4px 14px rgba(220,38,38,0.35);
  letter-spacing: 0.02em;
}

.erow-detail { min-width: 0; }

.erow-hospital {
  font-size: 0.88rem;
  font-weight: 600;
  color: rgba(255,255,255,0.8);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.erow-units {
  font-size: 0.72rem;
  color: rgba(255,255,255,0.3);
  margin: 3px 0 0;
}

.erow-right {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  flex-shrink: 0;
}

.urgency-chip {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.28rem 0.75rem;
  border-radius: 999px;
  font-size: 0.68rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.07em;
}
.uchip-critical { background: rgba(220,38,38,0.15);  border: 1px solid rgba(220,38,38,0.35); color: #fca5a5; }
.uchip-urgent   { background: rgba(245,158,11,0.15); border: 1px solid rgba(245,158,11,0.35); color: #fcd34d; }
.uchip-moderate { background: rgba(34,197,94,0.12);  border: 1px solid rgba(34,197,94,0.3);  color: #4ade80; }

.urgency-dot {
  width: 5px; height: 5px;
  border-radius: 50%;
  background: currentColor;
  flex-shrink: 0;
}

.btn-respond {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, #dc2626, #991b1b);
  border: none;
  border-radius: 9px;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.78rem;
  font-weight: 700;
  color: white;
  cursor: pointer;
  box-shadow: 0 3px 10px rgba(220,38,38,0.35);
  transition: all 0.15s;
  white-space: nowrap;
}
.btn-respond:hover {
  box-shadow: 0 5px 16px rgba(220,38,38,0.55);
  transform: translateY(-1px);
}

/* ── Animations ── */
@keyframes cardIn {
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes rowIn {
  from { opacity: 0; transform: translateX(-8px); }
  to   { opacity: 1; transform: translateX(0); }
}
@keyframes blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.25; }
}
</style>