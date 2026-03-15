<template>
  <NuxtLayout>
    <div class="dashboard">

      <!-- ── WELCOME HEADER ── -->
      <div class="dash-header">
        <div>
          <p class="dash-date">{{ today }}</p>
          <h1 class="dash-title">Good {{ greeting }}, Nicolaii Gwapa </h1>
          <p class="dash-sub">Here's what's happening at Servora today.</p>
        </div>
        <button class="btn-gold">
          <span>+ New Appointment</span>
        </button>
      </div>

      <!-- ── STAT CARDS ── -->
      <div class="stats-grid">
        <div v-for="stat in stats" :key="stat.label" class="stat-card">
          <div class="stat-icon-wrap" :style="{ background: stat.iconBg }">
            <component :is="stat.icon" class="size-5" :style="{ color: stat.iconColor }" />
          </div>
          <div class="stat-body">
            <p class="stat-label">{{ stat.label }}</p>
            <p class="stat-value">{{ stat.value }}</p>
            <p class="stat-change" :class="stat.up ? 'up' : 'down'">
              <component :is="stat.up ? ArrowUpIcon : ArrowDownIcon" class="size-3" />
              {{ stat.change }} vs last week
            </p>
          </div>
        </div>
      </div>

      <!-- ── TWO COLUMN ── -->
      <div class="two-col">

        <!-- Appointments Today -->
        <div class="card">
          <div class="card-header">
            <h2 class="card-title">Today's Appointments</h2>
            <NuxtLink to="/appointments" class="card-link">View all →</NuxtLink>
          </div>

          <ul class="appt-list">
            <li v-for="appt in appointments" :key="appt.id" class="appt-item">
              <img :src="appt.avatar" :alt="appt.name" class="appt-avatar" />
              <div class="appt-info">
                <p class="appt-name">{{ appt.name }}</p>
                <p class="appt-service">{{ appt.service }}</p>
              </div>
              <div class="appt-right">
                <p class="appt-time">{{ appt.time }}</p>
                <span class="appt-badge" :class="appt.status">{{ appt.status }}</span>
              </div>
            </li>
          </ul>
        </div>

        <!-- Right column -->
        <div class="right-col">

          <!-- Revenue Chart (simple bar) -->
          <div class="card">
            <div class="card-header">
              <h2 class="card-title">Weekly Revenue</h2>
              <span class="revenue-total">₱ 48,250</span>
            </div>
            <div class="bar-chart">
              <div v-for="bar in weekBars" :key="bar.day" class="bar-col">
                <div class="bar-track">
                  <div
                    class="bar-fill"
                    :style="{ height: bar.pct + '%', background: bar.active ? '#c9a96e' : 'rgba(201,169,110,0.2)' }"
                  ></div>
                </div>
                <span class="bar-label" :class="{ active: bar.active }">{{ bar.day }}</span>
              </div>
            </div>
          </div>

          <!-- Top Services -->
          <div class="card">
            <div class="card-header">
              <h2 class="card-title">Top Services</h2>
            </div>
            <ul class="service-list">
              <li v-for="svc in topServices" :key="svc.name" class="service-item">
                <div class="service-info">
                  <span class="service-dot" :style="{ background: svc.color }"></span>
                  <span class="service-name">{{ svc.name }}</span>
                </div>
                <div class="service-bar-wrap">
                  <div class="service-bar-track">
                    <div class="service-bar-fill" :style="{ width: svc.pct + '%', background: svc.color }"></div>
                  </div>
                  <span class="service-pct">{{ svc.pct }}%</span>
                </div>
              </li>
            </ul>
          </div>

        </div>
      </div>

      <!-- ── RECENT CLIENTS ── -->
      <div class="card mt-6">
        <div class="card-header">
          <h2 class="card-title">Recent Clients</h2>
          <NuxtLink to="/clients" class="card-link">View all →</NuxtLink>
        </div>
        <div class="table-wrap">
          <table class="clients-table">
            <thead>
              <tr>
                <th>Client</th>
                <th>Last Visit</th>
                <th>Service</th>
                <th>Spent</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="client in recentClients" :key="client.name">
                <td>
                  <div class="client-cell">
                    <img :src="client.avatar" :alt="client.name" class="client-avatar" />
                    <div>
                      <p class="client-name">{{ client.name }}</p>
                      <p class="client-email">{{ client.email }}</p>
                    </div>
                  </div>
                </td>
                <td class="td-muted">{{ client.lastVisit }}</td>
                <td class="td-muted">{{ client.service }}</td>
                <td class="td-gold">{{ client.spent }}</td>
                <td>
                  <span class="client-badge" :class="client.status">{{ client.status }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  </NuxtLayout>
</template>

<script setup>
import { computed } from 'vue'
import {
  UsersIcon, CalendarIcon, BanknotesIcon,
  SparklesIcon, ArrowUpIcon, ArrowDownIcon,
} from '@heroicons/vue/24/outline'

// Greeting
const greeting = computed(() => {
  const h = new Date().getHours()
  if (h < 12) return 'Morning'
  if (h < 17) return 'Afternoon'
  return 'Evening'
})

const today = computed(() =>
  new Date().toLocaleDateString('en-PH', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
)

// Stat cards
const stats = [
  { label: 'Total Clients',       value: '1,284',  change: '+12%', up: true,  icon: UsersIcon,     iconBg: 'rgba(201,169,110,0.12)', iconColor: '#c9a96e' },
  { label: 'Appointments Today',  value: '8',      change: '+3',   up: true,  icon: CalendarIcon,  iconBg: 'rgba(58,74,56,0.15)',    iconColor: '#6a9b67' },
  { label: 'Revenue This Month',  value: '₱ 86,400', change: '+8%', up: true, icon: BanknotesIcon, iconBg: 'rgba(201,169,110,0.12)', iconColor: '#c9a96e' },
  { label: 'Services Booked',     value: '34',     change: '-2',   up: false, icon: SparklesIcon,  iconBg: 'rgba(180,100,80,0.1)',   iconColor: '#c0725a' },
]

// Today's appointments
const appointments = [
  { id:1, name:'Maria Santos',  service:'Hot Stone Massage',  time:'9:00 AM',  status:'confirmed', avatar:'https://i.pravatar.cc/40?img=5'  },
  { id:2, name:'Ana Reyes',     service:'Deep Tissue Massage', time:'10:30 AM', status:'confirmed', avatar:'https://i.pravatar.cc/40?img=9'  },
  { id:3, name:'James Cruz',    service:'Aromatherapy Facial', time:'12:00 PM', status:'pending',   avatar:'https://i.pravatar.cc/40?img=12' },
  { id:4, name:'Rosa Lim',      service:'Swedish Massage',    time:'2:00 PM',  status:'confirmed', avatar:'https://i.pravatar.cc/40?img=47' },
  { id:5, name:'Carlo Bautista',service:'Foot Reflexology',   time:'4:30 PM',  status:'cancelled', avatar:'https://i.pravatar.cc/40?img=15' },
]

// Weekly bar chart
const weekBars = [
  { day:'Mon', pct:55, active:false },
  { day:'Tue', pct:72, active:false },
  { day:'Wed', pct:48, active:false },
  { day:'Thu', pct:90, active:false },
  { day:'Fri', pct:65, active:false },
  { day:'Sat', pct:100,active:false },
  { day:'Sun', pct:78, active:true  },
]

// Top services
const topServices = [
  { name:'Swedish Massage',   pct:42, color:'#c9a96e' },
  { name:'Hot Stone Massage', pct:28, color:'#6a9b67' },
  { name:'Aromatherapy',      pct:18, color:'#c0725a' },
  { name:'Foot Reflexology',  pct:12, color:'#7a8fa6' },
]

// Recent clients table
const recentClients = [
  { name:'Maria Santos',   email:'maria@email.com',  lastVisit:'Mar 14, 2026', service:'Hot Stone',       spent:'₱ 1,800', status:'active',   avatar:'https://i.pravatar.cc/40?img=5'  },
  { name:'Ana Reyes',      email:'ana@email.com',    lastVisit:'Mar 13, 2026', service:'Deep Tissue',     spent:'₱ 1,500', status:'active',   avatar:'https://i.pravatar.cc/40?img=9'  },
  { name:'James Cruz',     email:'james@email.com',  lastVisit:'Mar 12, 2026', service:'Facial',          spent:'₱ 2,200', status:'pending',  avatar:'https://i.pravatar.cc/40?img=12' },
  { name:'Rosa Lim',       email:'rosa@email.com',   lastVisit:'Mar 10, 2026', service:'Swedish',         spent:'₱ 1,200', status:'active',   avatar:'https://i.pravatar.cc/40?img=47' },
  { name:'Carlo Bautista', email:'carlo@email.com',  lastVisit:'Mar 8, 2026',  service:'Reflexology',     spent:'₱ 900',   status:'inactive', avatar:'https://i.pravatar.cc/40?img=15' },
]
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&family=Jost:wght@300;400;500;600&display=swap');

.dashboard {
  font-family: 'Jost', sans-serif;
  padding-bottom: 3rem;
}

/* ─── WELCOME ─── */
.dash-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
}
.dash-date {
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #c9a96e;
  margin-bottom: 0.3rem;
}
.dash-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 2rem;
  font-weight: 300;
  color: #1a1a14;
  letter-spacing: 0.02em;
  line-height: 1.1;
}
.dash-sub {
  font-size: 0.82rem;
  color: #9ca3af;
  margin-top: 0.3rem;
  font-weight: 300;
}
.btn-gold {
  background: #c9a96e;
  color: #1a1a14;
  border: none;
  padding: 0.7rem 1.5rem;
  font-family: 'Jost', sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  cursor: pointer;
  border-radius: 4px;
  transition: background 0.2s, transform 0.2s;
  white-space: nowrap;
}
.btn-gold:hover { background: #e2c99a; transform: translateY(-1px); }

/* ─── STAT CARDS ─── */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.25rem;
  margin-bottom: 1.5rem;
}
.stat-card {
  background: #fff;
  border-radius: 10px;
  padding: 1.4rem;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  border: 1px solid rgba(201,169,110,0.12);
  box-shadow: 0 2px 16px rgba(26,26,20,0.05);
  transition: box-shadow 0.2s, transform 0.2s;
}
.stat-card:hover {
  box-shadow: 0 6px 28px rgba(26,26,20,0.1);
  transform: translateY(-2px);
}
.stat-icon-wrap {
  padding: 0.65rem;
  border-radius: 8px;
  flex-shrink: 0;
}
.stat-label {
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #9ca3af;
  margin-bottom: 0.3rem;
}
.stat-value {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.8rem;
  font-weight: 400;
  color: #1a1a14;
  line-height: 1;
  margin-bottom: 0.4rem;
}
.stat-change {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.7rem;
  font-weight: 500;
}
.stat-change.up   { color: #6a9b67; }
.stat-change.down { color: #c0725a; }

/* ─── TWO COL ─── */
.two-col {
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 1.25rem;
}
.right-col { display: flex; flex-direction: column; gap: 1.25rem; }

/* ─── CARD ─── */
.card {
  background: #fff;
  border-radius: 10px;
  padding: 1.4rem;
  border: 1px solid rgba(201,169,110,0.12);
  box-shadow: 0 2px 16px rgba(26,26,20,0.05);
}
.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.2rem;
}
.card-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.1rem;
  font-weight: 400;
  color: #1a1a14;
  letter-spacing: 0.04em;
}
.card-link {
  font-size: 0.72rem;
  color: #c9a96e;
  text-decoration: none;
  letter-spacing: 0.05em;
  transition: color 0.2s;
}
.card-link:hover { color: #1a1a14; }

/* ─── APPOINTMENTS ─── */
.appt-list { display: flex; flex-direction: column; gap: 0.85rem; }
.appt-item {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 0.75rem;
  border-radius: 8px;
  transition: background 0.15s;
}
.appt-item:hover { background: #fdf8f0; }
.appt-avatar {
  width: 38px; height: 38px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
  ring: 2px solid rgba(201,169,110,0.3);
}
.appt-info { flex: 1; min-width: 0; }
.appt-name  { font-size: 0.85rem; font-weight: 500; color: #1a1a14; }
.appt-service { font-size: 0.72rem; color: #9ca3af; margin-top: 1px; }
.appt-right { text-align: right; flex-shrink: 0; }
.appt-time { font-size: 0.75rem; color: #6b7280; margin-bottom: 4px; }
.appt-badge {
  display: inline-block;
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.18rem 0.5rem;
  border-radius: 999px;
}
.appt-badge.confirmed { background: rgba(106,155,103,0.15); color: #4a8a47; }
.appt-badge.pending   { background: rgba(201,169,110,0.15); color: #a07830; }
.appt-badge.cancelled { background: rgba(192,114,90,0.15);  color: #b05540; }

/* ─── BAR CHART ─── */
.revenue-total {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.2rem;
  color: #c9a96e;
  font-weight: 400;
}
.bar-chart {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 0.4rem;
  height: 120px;
}
.bar-col {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  height: 100%;
}
.bar-track {
  flex: 1;
  width: 100%;
  background: rgba(201,169,110,0.08);
  border-radius: 4px;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
}
.bar-fill {
  width: 100%;
  border-radius: 4px;
  transition: height 0.6s ease;
}
.bar-label {
  font-size: 0.62rem;
  letter-spacing: 0.05em;
  color: #9ca3af;
  text-transform: uppercase;
}
.bar-label.active { color: #c9a96e; font-weight: 600; }

/* ─── TOP SERVICES ─── */
.service-list { display: flex; flex-direction: column; gap: 0.85rem; }
.service-item { display: flex; flex-direction: column; gap: 0.35rem; }
.service-info { display: flex; align-items: center; gap: 0.5rem; }
.service-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.service-name { font-size: 0.78rem; color: #374151; }
.service-bar-wrap { display: flex; align-items: center; gap: 0.6rem; }
.service-bar-track {
  flex: 1;
  height: 5px;
  background: rgba(201,169,110,0.1);
  border-radius: 99px;
  overflow: hidden;
}
.service-bar-fill { height: 100%; border-radius: 99px; }
.service-pct { font-size: 0.68rem; color: #9ca3af; width: 30px; text-align: right; }

/* ─── CLIENTS TABLE ─── */
.mt-6 { margin-top: 1.5rem; }
.table-wrap { overflow-x: auto; }
.clients-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.82rem;
}
.clients-table thead tr {
  border-bottom: 1px solid rgba(201,169,110,0.15);
}
.clients-table th {
  text-align: left;
  font-size: 0.65rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #9ca3af;
  font-weight: 500;
  padding: 0 0.75rem 0.85rem;
}
.clients-table tbody tr {
  border-bottom: 1px solid #f9f5ef;
  transition: background 0.15s;
}
.clients-table tbody tr:hover { background: #fdf8f0; }
.clients-table td { padding: 0.85rem 0.75rem; vertical-align: middle; }
.client-cell { display: flex; align-items: center; gap: 0.75rem; }
.client-avatar { width: 34px; height: 34px; border-radius: 50%; object-fit: cover; flex-shrink: 0; }
.client-name  { font-weight: 500; color: #1a1a14; font-size: 0.82rem; }
.client-email { font-size: 0.7rem; color: #9ca3af; margin-top: 1px; }
.td-muted { color: #6b7280; }
.td-gold  { color: #c9a96e; font-weight: 500; }
.client-badge {
  display: inline-block;
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
}
.client-badge.active   { background: rgba(106,155,103,0.15); color: #4a8a47; }
.client-badge.pending  { background: rgba(201,169,110,0.15); color: #a07830; }
.client-badge.inactive { background: rgba(156,163,175,0.2);  color: #6b7280; }

/* ─── RESPONSIVE ─── */
@media (max-width: 1024px) {
  .two-col { grid-template-columns: 1fr; }
}
@media (max-width: 640px) {
  .stats-grid { grid-template-columns: 1fr 1fr; }
  .dash-title { font-size: 1.5rem; }
}
</style>