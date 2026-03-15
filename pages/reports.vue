<template>
  <NuxtLayout>
    <div class="reports-page">

      <!-- ── PAGE HEADER ── -->
      <div class="page-header">
        <div>
          <p class="page-eyebrow">Analytics</p>
          <h1 class="page-title">Reports</h1>
        </div>
        <div class="header-actions">
          <select v-model="selectedPeriod" class="filter-select">
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          <button class="btn-gold">⬇ Export Report</button>
        </div>
      </div>

      <!-- ── KPI CARDS ── -->
      <div class="kpi-grid">
        <div v-for="kpi in kpiCards" :key="kpi.label" class="kpi-card">
          <div class="kpi-top">
            <div class="kpi-icon-wrap" :style="{ background: kpi.iconBg }">
              <component :is="kpi.icon" class="size-5" :style="{ color: kpi.iconColor }" />
            </div>
            <span class="kpi-change" :class="kpi.up ? 'up' : 'down'">
              <component :is="kpi.up ? ArrowUpIcon : ArrowDownIcon" class="size-3" />
              {{ kpi.change }}
            </span>
          </div>
          <p class="kpi-value">{{ kpi.value }}</p>
          <p class="kpi-label">{{ kpi.label }}</p>
          <p class="kpi-sub">vs {{ kpi.vs }}</p>
        </div>
      </div>

      <!-- ── ROW 1: Revenue Chart + Bookings by Day ── -->
      <div class="charts-row">

        <!-- Revenue Line Chart -->
        <div class="card card-lg">
          <div class="card-header">
            <h2 class="card-title">Revenue Overview</h2>
            <div class="chart-legend">
              <span class="legend-dot" style="background:#c9a96e"></span><span class="legend-text">Revenue</span>
              <span class="legend-dot" style="background:#6a9b67"></span><span class="legend-text">Expenses</span>
            </div>
          </div>
          <div class="line-chart-wrap">
            <svg viewBox="0 0 600 180" class="line-chart-svg" preserveAspectRatio="none">
              <!-- Grid lines -->
              <line v-for="i in 5" :key="'g'+i" :x1="0" :y1="i*36" :x2="600" :y2="i*36" stroke="rgba(201,169,110,0.08)" stroke-width="1"/>
              <!-- Revenue area fill -->
              <path :d="revenueAreaPath" fill="rgba(201,169,110,0.08)" />
              <!-- Revenue line -->
              <path :d="revenueLinePath" fill="none" stroke="#c9a96e" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
              <!-- Expense line -->
              <path :d="expenseLinePath" fill="none" stroke="#6a9b67" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="6,3"/>
              <!-- Revenue dots -->
              <circle v-for="(pt, i) in revenuePoints" :key="'rd'+i" :cx="pt.x" :cy="pt.y" r="4" fill="#fff" stroke="#c9a96e" stroke-width="2"/>
            </svg>
            <!-- X labels -->
            <div class="chart-x-labels">
              <span v-for="m in chartMonths" :key="m">{{ m }}</span>
            </div>
          </div>
        </div>

        <!-- Bookings by Day of Week -->
        <div class="card card-sm">
          <div class="card-header">
            <h2 class="card-title">Busiest Days</h2>
          </div>
          <div class="hbar-list">
            <div v-for="day in busyDays" :key="day.name" class="hbar-item">
              <span class="hbar-label">{{ day.name }}</span>
              <div class="hbar-track">
                <div class="hbar-fill" :style="{ width: day.pct + '%', background: day.color }"></div>
              </div>
              <span class="hbar-val">{{ day.bookings }}</span>
            </div>
          </div>
        </div>

      </div>

      <!-- ── ROW 2: Top Services Donut + Therapist Performance + Client Growth ── -->
      <div class="charts-row-3">

        <!-- Top Services Donut -->
        <div class="card">
          <div class="card-header">
            <h2 class="card-title">Revenue by Service</h2>
          </div>
          <div class="donut-wrap">
            <svg viewBox="0 0 160 160" class="donut-svg">
              <circle cx="80" cy="80" r="60" fill="none" stroke="#f3ede4" stroke-width="22"/>
              <circle
                v-for="(seg, i) in donutSegments"
                :key="i"
                cx="80" cy="80" r="60"
                fill="none"
                :stroke="seg.color"
                stroke-width="22"
                :stroke-dasharray="`${seg.dash} ${seg.gap}`"
                :stroke-dashoffset="seg.offset"
                stroke-linecap="butt"
                style="transition: stroke-dasharray 0.6s ease"
              />
              <text x="80" y="76" text-anchor="middle" class="donut-center-val" font-size="16" fill="#1a1a14" font-family="Cormorant Garamond, serif" font-weight="400">₱86k</text>
              <text x="80" y="91" text-anchor="middle" font-size="7" fill="#9ca3af" font-family="Jost, sans-serif" letter-spacing="1">TOTAL</text>
            </svg>
            <ul class="donut-legend">
              <li v-for="seg in donutSegments" :key="seg.label" class="donut-leg-item">
                <span class="donut-leg-dot" :style="{ background: seg.color }"></span>
                <span class="donut-leg-label">{{ seg.label }}</span>
                <span class="donut-leg-pct">{{ seg.pct }}%</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Therapist Performance -->
        <div class="card">
          <div class="card-header">
            <h2 class="card-title">Therapist Performance</h2>
          </div>
          <ul class="therapist-list">
            <li v-for="t in therapists" :key="t.name" class="therapist-item">
              <img :src="t.avatar" :alt="t.name" class="t-avatar" />
              <div class="t-info">
                <div class="t-row">
                  <span class="t-name">{{ t.name }}</span>
                  <span class="t-revenue">{{ t.revenue }}</span>
                </div>
                <div class="t-bar-track">
                  <div class="t-bar-fill" :style="{ width: t.pct + '%' }"></div>
                </div>
                <div class="t-row mt-1">
                  <span class="t-sub">{{ t.sessions }} sessions</span>
                  <span class="t-rating">★ {{ t.rating }}</span>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <!-- Client Growth -->
        <div class="card">
          <div class="card-header">
            <h2 class="card-title">Client Growth</h2>
          </div>
          <div class="growth-bars">
            <div v-for="(bar, i) in growthBars" :key="i" class="g-bar-col">
              <div class="g-bar-track">
                <div class="g-bar-new"    :style="{ height: bar.newPct + '%' }"></div>
                <div class="g-bar-return" :style="{ height: bar.retPct + '%' }"></div>
              </div>
              <span class="g-bar-label">{{ bar.month }}</span>
            </div>
          </div>
          <div class="growth-legend">
            <span class="legend-dot" style="background:#c9a96e"></span><span class="legend-text">New</span>
            <span class="legend-dot" style="background:#6a9b67; margin-left:1rem"></span><span class="legend-text">Returning</span>
          </div>
        </div>

      </div>

      <!-- ── ROW 3: Recent Transactions ── -->
      <div class="card mt-6">
        <div class="card-header">
          <h2 class="card-title">Recent Transactions</h2>
          <NuxtLink to="/appointments" class="card-link">View all →</NuxtLink>
        </div>
        <div class="table-wrap">
          <table class="tx-table">
            <thead>
              <tr>
                <th>Client</th>
                <th>Service</th>
                <th>Therapist</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Method</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="tx in transactions" :key="tx.id">
                <td>
                  <div class="client-cell">
                    <img :src="tx.avatar" :alt="tx.client" class="c-avatar" />
                    <span class="c-name">{{ tx.client }}</span>
                  </div>
                </td>
                <td class="td-muted">{{ tx.service }}</td>
                <td class="td-muted">{{ tx.therapist }}</td>
                <td class="td-muted">{{ tx.date }}</td>
                <td class="td-gold">{{ tx.amount }}</td>
                <td>
                  <span class="method-badge" :class="tx.method.toLowerCase()">{{ tx.method }}</span>
                </td>
                <td>
                  <span class="status-badge" :class="tx.status">{{ tx.status }}</span>
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
import { ref, computed } from 'vue'
import {
  BanknotesIcon, UsersIcon, CalendarIcon,
  SparklesIcon, ArrowUpIcon, ArrowDownIcon,
} from '@heroicons/vue/24/outline'

const selectedPeriod = ref('month')

// ── KPI CARDS ──
const kpiCards = [
  { label:'Total Revenue',     value:'₱ 86,400', change:'+18%', up:true,  vs:'last month', icon: BanknotesIcon, iconBg:'rgba(201,169,110,0.12)', iconColor:'#c9a96e' },
  { label:'Total Appointments',value:'134',      change:'+12%', up:true,  vs:'last month', icon: CalendarIcon,  iconBg:'rgba(106,155,103,0.12)', iconColor:'#6a9b67' },
  { label:'New Clients',       value:'28',       change:'+5',   up:true,  vs:'last month', icon: UsersIcon,     iconBg:'rgba(122,143,166,0.12)', iconColor:'#7a8fa6' },
  { label:'Avg. per Session',  value:'₱ 1,645',  change:'-3%',  up:false, vs:'last month', icon: SparklesIcon,  iconBg:'rgba(192,114,90,0.12)',  iconColor:'#c0725a' },
]

// ── REVENUE LINE CHART ──
const chartMonths = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

const revenueData = [42,55,48,70,65,80,74,88,76,92,86,95]
const expenseData = [30,35,32,40,38,42,39,45,41,48,44,50]

const chartW = 600, chartH = 180, pad = 20
function toPoints(data) {
  const max = Math.max(...data)
  return data.map((v, i) => ({
    x: pad + (i / (data.length - 1)) * (chartW - pad * 2),
    y: chartH - pad - (v / max) * (chartH - pad * 2),
  }))
}

const revenuePoints = toPoints(revenueData)
const expensePoints = toPoints(expenseData)

function pointsToPath(pts) {
  return pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')
}

const revenueLinePath = computed(() => pointsToPath(revenuePoints))
const expenseLinePath = computed(() => pointsToPath(expensePoints))
const revenueAreaPath = computed(() => {
  const last = revenuePoints[revenuePoints.length - 1]
  const first = revenuePoints[0]
  return `${pointsToPath(revenuePoints)} L${last.x},${chartH} L${first.x},${chartH} Z`
})

// ── BUSIEST DAYS ──
const busyDays = [
  { name:'Saturday', bookings:34, pct:100, color:'#c9a96e' },
  { name:'Sunday',   bookings:28, pct:82,  color:'#c9a96e' },
  { name:'Friday',   bookings:22, pct:65,  color:'#e2c99a' },
  { name:'Thursday', bookings:18, pct:53,  color:'#e2c99a' },
  { name:'Wednesday',bookings:14, pct:41,  color:'rgba(201,169,110,0.4)' },
  { name:'Tuesday',  bookings:10, pct:29,  color:'rgba(201,169,110,0.3)' },
  { name:'Monday',   bookings:8,  pct:24,  color:'rgba(201,169,110,0.25)' },
]

// ── DONUT CHART ──
const donutData = [
  { label:'Massage',      pct:42, color:'#c9a96e' },
  { label:'Facial',       pct:22, color:'#7a8fa6' },
  { label:'Body Treat.',  pct:18, color:'#6a9b67' },
  { label:'Foot Care',    pct:10, color:'#c06a7a' },
  { label:'Packages',     pct:8,  color:'#1a1a14' },
]
const circumference = 2 * Math.PI * 60 // r=60
const donutSegments = computed(() => {
  let offset = -circumference * 0.25 // start at top
  return donutData.map(d => {
    const dash = (d.pct / 100) * circumference
    const gap  = circumference - dash
    const seg  = { ...d, dash, gap, offset: -offset }
    offset += dash
    return seg
  })
})

// ── THERAPISTS ──
const therapists = [
  { name:'Liza Macaraeg',     revenue:'₱ 28,400', sessions:38, rating:'4.9', pct:100, avatar:'https://i.pravatar.cc/40?img=16' },
  { name:'Jenny Ortega',      revenue:'₱ 22,100', sessions:30, rating:'4.8', pct:78,  avatar:'https://i.pravatar.cc/40?img=21' },
  { name:'Carla Delos Reyes', revenue:'₱ 19,800', sessions:26, rating:'4.9', pct:70,  avatar:'https://i.pravatar.cc/40?img=32' },
  { name:'Mark Reyes',        revenue:'₱ 16,100', sessions:22, rating:'4.7', pct:57,  avatar:'https://i.pravatar.cc/40?img=51' },
]

// ── CLIENT GROWTH BARS ──
const growthBars = [
  { month:'Aug', newPct:30, retPct:55 },
  { month:'Sep', newPct:25, retPct:60 },
  { month:'Oct', newPct:35, retPct:50 },
  { month:'Nov', newPct:40, retPct:45 },
  { month:'Dec', newPct:20, retPct:65 },
  { month:'Jan', newPct:45, retPct:40 },
  { month:'Feb', newPct:35, retPct:55 },
  { month:'Mar', newPct:38, retPct:52 },
]

// ── TRANSACTIONS ──
const transactions = [
  { id:1, client:'Maria Santos',   service:'Hot Stone Massage',   therapist:'Liza Macaraeg',     date:'Mar 15, 2026', amount:'₱ 1,800', method:'GCash',  status:'paid',    avatar:'https://i.pravatar.cc/40?img=5'  },
  { id:2, client:'Ana Reyes',      service:'Deep Tissue Massage', therapist:'Jenny Ortega',      date:'Mar 15, 2026', amount:'₱ 1,500', method:'Cash',   status:'paid',    avatar:'https://i.pravatar.cc/40?img=9'  },
  { id:3, client:'James Cruz',     service:'Aromatherapy Facial', therapist:'Carla Delos Reyes', date:'Mar 15, 2026', amount:'₱ 2,200', method:'Card',   status:'pending', avatar:'https://i.pravatar.cc/40?img=12' },
  { id:4, client:'Rosa Lim',       service:'Swedish Massage',     therapist:'Mark Reyes',        date:'Mar 14, 2026', amount:'₱ 1,200', method:'GCash',  status:'paid',    avatar:'https://i.pravatar.cc/40?img=47' },
  { id:5, client:'Lea Soriano',    service:'Body Scrub',          therapist:'Jenny Ortega',      date:'Mar 14, 2026', amount:'₱ 1,600', method:'Cash',   status:'paid',    avatar:'https://i.pravatar.cc/40?img=22' },
  { id:6, client:'Carlo Bautista', service:'Foot Reflexology',    therapist:'Liza Macaraeg',     date:'Mar 13, 2026', amount:'₱ 900',   method:'Card',   status:'refunded',avatar:'https://i.pravatar.cc/40?img=15' },
  { id:7, client:'Grace Tan',      service:'Hot Stone Massage',   therapist:'Carla Delos Reyes', date:'Mar 13, 2026', amount:'₱ 1,800', method:'GCash',  status:'paid',    avatar:'https://i.pravatar.cc/40?img=44' },
]
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&family=Jost:wght@300;400;500;600&display=swap');

.reports-page { font-family: 'Jost', sans-serif; padding-bottom: 3rem; }

/* ── HEADER ── */
.page-header { display: flex; align-items: flex-start; justify-content: space-between; flex-wrap: wrap; gap: 1rem; margin-bottom: 1.8rem; }
.page-eyebrow { font-size: 0.65rem; letter-spacing: 0.3em; text-transform: uppercase; color: #c9a96e; margin-bottom: 0.2rem; }
.page-title { font-family: 'Cormorant Garamond', serif; font-size: 2rem; font-weight: 300; color: #1a1a14; letter-spacing: 0.02em; }
.header-actions { display: flex; gap: 0.75rem; align-items: center; flex-wrap: wrap; }
.filter-select { padding: 0.65rem 1rem; border: 1px solid rgba(201,169,110,0.2); border-radius: 6px; font-family: 'Jost', sans-serif; font-size: 0.8rem; color: #374151; background: #fff; outline: none; cursor: pointer; }
.filter-select:focus { border-color: #c9a96e; }
.btn-gold { background: #c9a96e; color: #1a1a14; border: none; padding: 0.7rem 1.5rem; font-family: 'Jost', sans-serif; font-size: 0.75rem; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; cursor: pointer; border-radius: 4px; transition: background 0.2s, transform 0.2s; white-space: nowrap; }
.btn-gold:hover { background: #e2c99a; transform: translateY(-1px); }

/* ── KPI GRID ── */
.kpi-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.25rem; margin-bottom: 1.5rem; }
.kpi-card { background: #fff; border-radius: 10px; padding: 1.4rem; border: 1px solid rgba(201,169,110,0.12); box-shadow: 0 2px 16px rgba(26,26,20,0.05); transition: box-shadow 0.2s, transform 0.2s; }
.kpi-card:hover { box-shadow: 0 6px 28px rgba(26,26,20,0.1); transform: translateY(-2px); }
.kpi-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.85rem; }
.kpi-icon-wrap { padding: 0.6rem; border-radius: 8px; }
.kpi-change { display: flex; align-items: center; gap: 0.2rem; font-size: 0.7rem; font-weight: 600; padding: 0.2rem 0.5rem; border-radius: 999px; }
.kpi-change.up   { background: rgba(106,155,103,0.12); color: #4a8a47; }
.kpi-change.down { background: rgba(192,114,90,0.12);  color: #b05540; }
.kpi-value { font-family: 'Cormorant Garamond', serif; font-size: 1.9rem; font-weight: 400; color: #1a1a14; line-height: 1; margin-bottom: 0.25rem; }
.kpi-label { font-size: 0.75rem; font-weight: 500; color: #374151; }
.kpi-sub { font-size: 0.65rem; color: #9ca3af; margin-top: 2px; }

/* ── LAYOUT ROWS ── */
.charts-row   { display: grid; grid-template-columns: 1fr 300px; gap: 1.25rem; margin-bottom: 1.25rem; }
.charts-row-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; }
.mt-6 { margin-top: 1.5rem; }

/* ── CARD ── */
.card { background: #fff; border-radius: 10px; padding: 1.4rem; border: 1px solid rgba(201,169,110,0.12); box-shadow: 0 2px 16px rgba(26,26,20,0.05); }
.card-lg { } .card-sm { }
.card-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.2rem; }
.card-title { font-family: 'Cormorant Garamond', serif; font-size: 1.1rem; font-weight: 400; color: #1a1a14; letter-spacing: 0.04em; }
.card-link { font-size: 0.72rem; color: #c9a96e; text-decoration: none; letter-spacing: 0.05em; transition: color 0.2s; }
.card-link:hover { color: #1a1a14; }
.chart-legend { display: flex; align-items: center; gap: 0.5rem; }
.legend-dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; }
.legend-text { font-size: 0.7rem; color: #9ca3af; }

/* ── LINE CHART ── */
.line-chart-wrap { position: relative; }
.line-chart-svg { width: 100%; height: 180px; display: block; }
.chart-x-labels { display: flex; justify-content: space-between; padding: 0.5rem 5px 0; }
.chart-x-labels span { font-size: 0.62rem; color: #9ca3af; letter-spacing: 0.05em; }

/* ── HORIZONTAL BARS (busiest days) ── */
.hbar-list { display: flex; flex-direction: column; gap: 0.85rem; }
.hbar-item { display: flex; align-items: center; gap: 0.75rem; }
.hbar-label { font-size: 0.72rem; color: #6b7280; width: 72px; flex-shrink: 0; }
.hbar-track { flex: 1; height: 8px; background: rgba(201,169,110,0.1); border-radius: 99px; overflow: hidden; }
.hbar-fill  { height: 100%; border-radius: 99px; transition: width 0.6s ease; }
.hbar-val   { font-size: 0.7rem; font-weight: 600; color: #374151; width: 24px; text-align: right; flex-shrink: 0; }

/* ── DONUT ── */
.donut-wrap { display: flex; align-items: center; gap: 1.5rem; flex-wrap: wrap; }
.donut-svg  { width: 160px; height: 160px; flex-shrink: 0; transform: rotate(-90deg); }
.donut-center-val { transform: rotate(90deg); transform-origin: center; }
.donut-legend { flex: 1; min-width: 120px; display: flex; flex-direction: column; gap: 0.6rem; }
.donut-leg-item { display: flex; align-items: center; gap: 0.5rem; }
.donut-leg-dot   { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.donut-leg-label { font-size: 0.75rem; color: #374151; flex: 1; }
.donut-leg-pct   { font-size: 0.72rem; font-weight: 600; color: #1a1a14; }

/* ── THERAPISTS ── */
.therapist-list { display: flex; flex-direction: column; gap: 1.1rem; }
.therapist-item { display: flex; gap: 0.85rem; align-items: flex-start; }
.t-avatar { width: 36px; height: 36px; border-radius: 50%; object-fit: cover; flex-shrink: 0; border: 2px solid rgba(201,169,110,0.25); }
.t-info { flex: 1; }
.t-row  { display: flex; justify-content: space-between; align-items: center; }
.t-name    { font-size: 0.8rem; font-weight: 500; color: #1a1a14; }
.t-revenue { font-size: 0.78rem; color: #c9a96e; font-weight: 500; }
.t-sub     { font-size: 0.65rem; color: #9ca3af; }
.t-rating  { font-size: 0.65rem; color: #c9a96e; font-weight: 600; }
.mt-1 { margin-top: 0.2rem; }
.t-bar-track { height: 5px; background: rgba(201,169,110,0.1); border-radius: 99px; overflow: hidden; margin: 0.35rem 0; }
.t-bar-fill  { height: 100%; border-radius: 99px; background: linear-gradient(to right, #c9a96e, #e2c99a); transition: width 0.6s ease; }

/* ── GROWTH BARS ── */
.growth-bars { display: flex; align-items: flex-end; justify-content: space-between; gap: 0.4rem; height: 130px; margin-bottom: 0.75rem; }
.g-bar-col   { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 0.4rem; height: 100%; }
.g-bar-track { flex: 1; width: 100%; display: flex; flex-direction: column; justify-content: flex-end; gap: 2px; }
.g-bar-new    { width: 100%; border-radius: 3px 3px 0 0; background: #c9a96e; min-height: 4px; transition: height 0.6s ease; }
.g-bar-return { width: 100%; border-radius: 0; background: #6a9b67; min-height: 4px; transition: height 0.6s ease; }
.g-bar-label  { font-size: 0.58rem; letter-spacing: 0.05em; text-transform: uppercase; color: #9ca3af; }
.growth-legend { display: flex; align-items: center; }

/* ── TRANSACTION TABLE ── */
.table-wrap { overflow-x: auto; }
.tx-table { width: 100%; border-collapse: collapse; font-size: 0.82rem; }
.tx-table thead tr { border-bottom: 1px solid rgba(201,169,110,0.15); }
.tx-table th { text-align: left; font-size: 0.63rem; letter-spacing: 0.12em; text-transform: uppercase; color: #9ca3af; font-weight: 500; padding: 0 1rem 0.85rem; }
.tx-table tbody tr { border-bottom: 1px solid #f9f5ef; transition: background 0.15s; }
.tx-table tbody tr:hover { background: #fdf8f0; }
.tx-table td { padding: 0.9rem 1rem; vertical-align: middle; }
.client-cell { display: flex; align-items: center; gap: 0.65rem; }
.c-avatar { width: 32px; height: 32px; border-radius: 50%; object-fit: cover; flex-shrink: 0; }
.c-name   { font-weight: 500; color: #1a1a14; white-space: nowrap; }
.td-muted { color: #6b7280; }
.td-gold  { color: #c9a96e; font-weight: 500; }

.method-badge { display: inline-block; font-size: 0.62rem; font-weight: 600; letter-spacing: 0.06em; padding: 0.2rem 0.55rem; border-radius: 999px; text-transform: uppercase; }
.method-badge.gcash { background: rgba(74,138,71,0.12); color: #3a8a37; }
.method-badge.cash  { background: rgba(201,169,110,0.15); color: #a07830; }
.method-badge.card  { background: rgba(122,143,166,0.15); color: #4a6a8a; }

.status-badge { display: inline-block; font-size: 0.6rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; padding: 0.22rem 0.6rem; border-radius: 999px; }
.status-badge.paid     { background: rgba(106,155,103,0.15); color: #4a8a47; }
.status-badge.pending  { background: rgba(201,169,110,0.15); color: #a07830; }
.status-badge.refunded { background: rgba(192,114,90,0.15);  color: #b05540; }

/* ── RESPONSIVE ── */
@media (max-width: 1100px) {
  .charts-row-3 { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 768px) {
  .charts-row   { grid-template-columns: 1fr; }
  .charts-row-3 { grid-template-columns: 1fr; }
}
</style>