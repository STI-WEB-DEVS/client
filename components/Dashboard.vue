<template>
  <div class="dashboard">

    <!-- HERO BAND -->
    <div class="hero-band">
      <div class="hero-inner">
        <div class="hero-title">Library Usage <span>Analytics</span></div>
        <div class="hero-sub">Real-time insights · STI College of Davao · A.Y. 2024–2025</div>
        <div class="hero-meta">
          <div class="hero-stat" v-for="stat in heroStats" :key="stat.label">
            <div class="hero-stat-val">{{ stat.value }}</div>
            <div class="hero-stat-lbl">{{ stat.label }}</div>
            <div class="hero-stat-delta" :class="stat.up ? 'delta-up' : 'delta-dn'">
              {{ stat.delta }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- PAGE BODY -->
    <div class="page">

      <!-- FILTER BAR -->
      <div class="filter-bar">
        <span class="filter-label">Filter by:</span>
        <select v-model="selectedYear">
          <option value="2425">School Year 2024–2025</option>
          <option value="2324">School Year 2023–2024</option>
        </select>
        <select v-model="selectedSemester" @change="updateLineChart">
          <option value="all">All Semesters</option>
          <option value="1">1st Semester</option>
          <option value="2">2nd Semester</option>
        </select>
        <select v-model="selectedCourse" @change="updatePieChart">
          <option value="all">All Courses</option>
          <option value="bsit">BSIT</option>
          <option value="bscs">BSCS</option>
          <option value="bscrim">BSCrim</option>
          <option value="bsed">BSEd</option>
          <option value="bshm">BSHM</option>
        </select>
        <select v-model="selectedCampus">
          <option value="main">Main Campus</option>
          <option value="annex">Annex Campus</option>
        </select>
      </div>

      <!-- KPI CARDS -->
      <div class="section-title">Key Metrics</div>
      <div class="grid-3 mb">
        <div class="card" v-for="kpi in kpiCards" :key="kpi.label">
          <div class="stat-icon">{{ kpi.icon }}</div>
          <div class="stat-num">{{ kpi.value }}</div>
          <div class="stat-label">{{ kpi.label }}</div>
          <div class="stat-trend" :class="kpi.up ? 'delta-up' : 'delta-dn'">{{ kpi.trend }}</div>
          <div class="bar-wrap" style="margin-top:.6rem;">
            <div class="bar-fill" :style="{ width: kpi.pct + '%', background: kpi.color }"></div>
          </div>
        </div>
      </div>

      <!-- CHARTS ROW -->
      <div class="section-title">Visitor Traffic &amp; Demographics</div>
      <div class="grid-2 mb chart-row">

        <!-- LINE CHART -->
        <div class="card">
          <div class="card-header">
            <div>
              <div class="card-title">Student Entries Over Time</div>
              <div class="card-sub">Daily count per month · Hover for details</div>
            </div>
            <div class="tab-row">
              <button
                v-for="v in lineViews"
                :key="v.key"
                class="tab"
                :class="{ active: lineView === v.key }"
                @click="setLineView(v.key)"
              >{{ v.label }}</button>
            </div>
          </div>
          <div class="chart-wrap">
            <canvas ref="lineCanvas"></canvas>
          </div>
          <div class="legend">
            <div class="legend-item"><div class="legend-dot" style="background:#964B00;"></div>This Year</div>
            <div class="legend-item"><div class="legend-dot" style="background:#C47A2B;opacity:.5;"></div>Last Year</div>
          </div>
        </div>

        <!-- PIE CHART -->
        <div class="card">
          <div class="card-header">
            <div>
              <div class="card-title">Visitor Demographics</div>
              <div class="card-sub">By course enrollment</div>
            </div>
            <div class="card-actions">
              <button
                v-for="v in pieViews"
                :key="v.key"
                class="btn-xs"
                :class="{ sel: pieView === v.key }"
                @click="setPieView(v.key)"
              >{{ v.label }}</button>
            </div>
          </div>
          <div class="pie-row">
            <div class="pie-canvas-wrap">
              <canvas ref="pieCanvas" width="200" height="200"></canvas>
            </div>
            <div class="pie-legend">
              <div
                class="pie-legend-item"
                v-for="(item, i) in currentPieData.labels"
                :key="item"
              >
                <div class="pie-legend-swatch" :style="{ background: currentPieData.colors[i] }"></div>
                <span class="pie-legend-label">{{ item }}</span>
                <span class="pie-legend-val">{{ currentPieData.data[i] }}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- SERVICE USAGE + TOP BOOKS -->
      <div class="section-title">Service Usage &amp; Popular Titles</div>
      <div class="grid-2 mb">

        <!-- SERVICES -->
        <div class="card">
          <div class="card-header">
            <div class="card-title">Services Utilized</div>
            <select v-model="servicesPeriod" style="font-size:.72rem;">
              <option value="month">This Month</option>
              <option value="sem">This Semester</option>
              <option value="year">This Year</option>
            </select>
          </div>
          <div class="services-list">
            <div class="service-row" v-for="s in services" :key="s.name">
              <div class="service-meta">
                <span class="service-name">{{ s.name }}</span>
                <span class="service-pct">{{ s.val }}%</span>
              </div>
              <div class="bar-wrap">
                <div class="bar-fill" :style="{ width: s.val + '%', background: s.color }"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- TOP BOOKS -->
        <div class="card">
          <div class="card-header">
            <div class="card-title">Most Borrowed Titles</div>
            <button class="btn-xs" @click="exportCSV">Export CSV</button>
          </div>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Category</th>
                <th>Borrows</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(b, i) in topBooks" :key="b.title">
                <td class="muted fw6">{{ i + 1 }}</td>
                <td><strong>{{ b.title }}</strong></td>
                <td><span class="pill" :class="pillClass(b.cat)">{{ b.cat }}</span></td>
                <td class="text-right">
                  <strong>{{ b.borrows }}</strong>
                  <span :style="{ color: b.up ? '#10B981' : '#EF4444', fontSize: '.75rem' }">
                    {{ b.up ? '↑' : '↓' }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- HEATMAP -->
      <div class="section-title">Peak Hours Heatmap</div>
      <div class="card mb">
        <div class="card-header">
          <div class="card-title">Average Student Entries by Day &amp; Hour</div>
          <span class="card-sub">Darker = more students</span>
        </div>
        <div class="heatmap-scroll">
          <table class="heatmap-table">
            <thead>
              <tr>
                <th></th>
                <th v-for="h in heatHours" :key="h">{{ h }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, di) in heatData" :key="heatDays[di]">
                <td class="heat-day">{{ heatDays[di] }}</td>
                <td
                  v-for="(val, hi) in row"
                  :key="hi"
                  class="heat-cell"
                  :title="`${heatDays[di]} ${heatHours[hi]}: ${val} students`"
                  :style="{ background: heatColor(val), color: val > 55 ? '#fff' : '#5C2E00', fontWeight: val > 55 ? '700' : '400' }"
                >{{ val || '' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- TREND SUMMARY -->
      <div class="section-title">Trend Analysis Summary</div>
      <div class="grid-3">
        <div class="card trend-card" v-for="t in trendCards" :key="t.title" :style="{ borderTopColor: t.color }">
          <div class="trend-icon">{{ t.icon }}</div>
          <div class="trend-title">{{ t.title }}</div>
          <div class="trend-body" v-html="t.body"></div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch, nextTick } from 'vue'

// ── Chart.js (install via: npm install chart.js) ──
import {
  Chart,
  LineElement, PointElement, LineController,
  DoughnutController, ArcElement,
  CategoryScale, LinearScale,
  Tooltip, Legend, Filler,
} from 'chart.js'

Chart.register(
  LineElement, PointElement, LineController,
  DoughnutController, ArcElement,
  CategoryScale, LinearScale,
  Tooltip, Legend, Filler
)

// ── Refs ──
const lineCanvas = ref(null)
const pieCanvas  = ref(null)
let lineChartInst = null
let pieChartInst  = null

// ── Filters ──
const selectedYear     = ref('2425')
const selectedSemester = ref('all')
const selectedCourse   = ref('all')
const selectedCampus   = ref('main')
const servicesPeriod   = ref('month')

// ── Hero Stats ──
const heroStats = [
  { value: '1,284', label: 'Visits Today',    delta: '↑ 12% vs yesterday', up: true  },
  { value: '342',   label: 'Books Borrowed',  delta: '↑ 8% this week',     up: true  },
  { value: '87',    label: 'Active Now',       delta: '↓ 3 seats free',     up: false },
  { value: '4.2%',  label: 'Overdue Rate',    delta: '↓ improved',         up: true  },
]

// ── KPI Cards ──
const kpiCards = [
  { icon: '📚', value: '18,540', label: 'Total Library Visits (This Sem)', trend: '↑ 14.2% from last semester', up: true,  pct: 72, color: '#D97706' },
  { icon: '📖', value: '4,873',  label: 'Books Borrowed (This Month)',     trend: '↑ 9.1% from last month',    up: true,  pct: 61, color: '#3A7D44' },
  { icon: '⏰', value: '218',    label: 'Overdue Returns',                 trend: '↑ 2.4% – needs attention',  up: false, pct: 22, color: '#EF4444' },
]

// ── Line Chart ──
const lineView  = ref('daily')
const lineViews = [
  { key: 'daily',   label: 'Daily'   },
  { key: 'weekly',  label: 'Weekly'  },
  { key: 'monthly', label: 'Monthly' },
]
const lineLabels = ['Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr','May','Jun']
const lineDataSets = {
  daily:   { curr:[820,1040,1280,960,540,1180,1350,1420,1190,880,420],  prev:[710,920,1100,840,480,1020,1210,1310,1050,760,380] },
  weekly:  { curr:[210,280,310,260,140,295,340,360,300,220,105],        prev:[180,245,275,230,120,255,305,325,265,190,95] },
  monthly: { curr:[4100,5200,6400,4800,2700,5900,6750,7100,5950,4400,2100], prev:[3550,4600,5500,4200,2400,5100,6050,6550,5250,3800,1900] },
}

function buildLineChart() {
  if (!lineCanvas.value) return
  const ctx = lineCanvas.value.getContext('2d')
  const d   = lineDataSets[lineView.value]
  if (lineChartInst) lineChartInst.destroy()

  const grad = ctx.createLinearGradient(0, 0, 0, 280)
  grad.addColorStop(0, 'rgba(150,75,0,.22)')
  grad.addColorStop(1, 'rgba(150,75,0,.01)')

  lineChartInst = new Chart(ctx, {
    type: 'line',
    data: {
      labels: lineLabels,
      datasets: [
        {
          label: 'This Year',
          data: d.curr,
          borderColor: '#964B00', borderWidth: 2.5,
          pointBackgroundColor: '#964B00', pointRadius: 4, pointHoverRadius: 6,
          fill: true, backgroundColor: grad, tension: .38,
        },
        {
          label: 'Last Year',
          data: d.prev,
          borderColor: '#C47A2B', borderWidth: 1.5, borderDash: [5,4],
          pointBackgroundColor: '#C47A2B', pointRadius: 3, pointHoverRadius: 5,
          fill: false, tension: .38,
        },
      ],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#1A1008', padding: 10,
          callbacks: { label: c => `  ${c.dataset.label}: ${c.parsed.y.toLocaleString()} students` },
        },
      },
      scales: {
        x: { grid: { color: '#F0E0C8' }, ticks: { color: '#7A6050', font: { size: 11 } } },
        y: {
          grid: { color: '#F0E0C8' },
          ticks: {
            color: '#7A6050', font: { size: 11 },
            callback: v => v >= 1000 ? (v/1000).toFixed(1)+'k' : v,
          },
        },
      },
    },
  })
}

function setLineView(v) {
  lineView.value = v
  nextTick(buildLineChart)
}
function updateLineChart() { nextTick(buildLineChart) }

// ── Pie Chart ──
const pieView  = ref('course')
const pieViews = [
  { key: 'course', label: 'Course'     },
  { key: 'year',   label: 'Year Level' },
  { key: 'gender', label: 'Gender'     },
]
const pieDataSets = {
  course: { labels:['BSIT','BSCS','BSCrim','BSEd','BSHM','Others'], data:[34,18,15,14,11,8],  colors:['#964B00','#C47A2B','#3A7D44','#2563EB','#D97706','#7A6050'] },
  year:   { labels:['1st Year','2nd Year','3rd Year','4th Year'],   data:[31,27,24,18],        colors:['#964B00','#C47A2B','#3A7D44','#2563EB'] },
  gender: { labels:['Female','Male','Non-binary'],                   data:[52,46,2],            colors:['#D97706','#964B00','#0891B2'] },
}
const currentPieData = computed(() => pieDataSets[pieView.value])

function buildPieChart() {
  if (!pieCanvas.value) return
  const ctx = pieCanvas.value.getContext('2d')
  const d   = currentPieData.value
  if (pieChartInst) pieChartInst.destroy()
  pieChartInst = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: d.labels,
      datasets: [{ data: d.data, backgroundColor: d.colors, borderColor: '#fff', borderWidth: 2.5, hoverOffset: 6 }],
    },
    options: {
      responsive: false, cutout: '62%',
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#1A1008', padding: 10,
          callbacks: { label: c => `  ${c.label}: ${c.parsed}%` },
        },
      },
    },
  })
}

function setPieView(v) {
  pieView.value = v
  nextTick(buildPieChart)
}
function updatePieChart() { nextTick(buildPieChart) }

// ── Services ──
const services = reactive([
  { name: 'Book Borrowing',       val: 82, color: '#964B00' },
  { name: 'Reading Area Use',     val: 71, color: '#3A7D44' },
  { name: 'Online Catalogue',     val: 58, color: '#2563EB' },
  { name: 'Reference / Reserve',  val: 47, color: '#D97706' },
  { name: 'Printing / Scanning',  val: 39, color: '#7C3AED' },
  { name: 'Study Room Booking',   val: 26, color: '#0891B2' },
])

// ── Top Books ──
const topBooks = [
  { title: 'Programming Logic & Design',  cat: 'IT/CS',     borrows: 148, up: true  },
  { title: 'Introduction to Criminology', cat: 'Crim',      borrows: 122, up: true  },
  { title: 'Business Communication',      cat: 'General',   borrows: 110, up: false },
  { title: 'Database Management Systems', cat: 'IT/CS',     borrows: 104, up: true  },
  { title: 'Food & Beverage Service',     cat: 'HM',        borrows: 89,  up: false },
  { title: 'Fundamentals of Education',   cat: 'Education', borrows: 83,  up: true  },
]

function pillClass(cat) {
  if (cat === 'IT/CS') return 'pill-green'
  if (cat === 'Crim')  return 'pill-red'
  return 'pill-amber'
}

function exportCSV() {
  const rows = [['#','Title','Category','Borrows'], ...topBooks.map((b,i) => [i+1, b.title, b.cat, b.borrows])]
  const csv  = rows.map(r => r.join(',')).join('\n')
  const a    = document.createElement('a')
  a.href     = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv)
  a.download = 'top-books.csv'
  a.click()
}

// ── Heatmap ──
const heatDays  = ['Mon','Tue','Wed','Thu','Fri','Sat']
const heatHours = ['7AM','8AM','9AM','10AM','11AM','12PM','1PM','2PM','3PM','4PM','5PM','6PM','7PM']
const heatData  = [
  [12,28,55, 92, 88,70,80, 95,84,60,40,22, 8],
  [10,32,60,100,100,74,88,100,91,68,50,28,10],
  [11,30,58, 96, 92,72,85, 98,88,65,48,25, 9],
  [12,31,57, 94, 90,71,84, 97,87,64,46,24, 9],
  [14,36,62, 88, 80,66,78, 82,72,56,44,30,12],
  [20,38,50, 60, 62,48,45, 44,38,30,20,12, 6],
]

function lerpColor(a, b, t) {
  const pa = parseInt(a.slice(1),16), pb = parseInt(b.slice(1),16)
  const r = Math.round(((pa>>16)&0xff) + (((pb>>16)&0xff)-((pa>>16)&0xff))*t)
  const g = Math.round(((pa>> 8)&0xff) + (((pb>> 8)&0xff)-((pa>> 8)&0xff))*t)
  const bl= Math.round(( pa     &0xff) + (( pb     &0xff)-( pa     &0xff))*t)
  return `rgb(${r},${g},${bl})`
}
function heatColor(v) {
  const stops = [[0,'#FDF6EC'],[20,'#F9E3C5'],[40,'#EDBB80'],[60,'#D4892C'],[80,'#A95F0A'],[100,'#5C2E00']]
  for (let i=1; i<stops.length; i++) {
    if (v <= stops[i][0]) {
      const t = (v - stops[i-1][0]) / (stops[i][0] - stops[i-1][0])
      return lerpColor(stops[i-1][1], stops[i][1], t)
    }
  }
  return stops[stops.length-1][1]
}

// ── Trend Cards ──
const trendCards = [
  { icon:'📈', title:'Peak Usage Window',  color:'#3A7D44', body:'Tuesday–Thursday, <strong>10 AM–2 PM</strong> consistently sees the highest footfall. Schedule additional staff during these hours.' },
  { icon:'🎓', title:'Dominant Course',    color:'#964B00', body:'<strong>BSIT students</strong> represent 34% of all library visits. Consider expanding IT and programming references.' },
  { icon:'⚠️', title:'Action Needed',      color:'#D97706', body:'Overdue return rate rose slightly. <strong>218 items</strong> are currently past due. Consider automated SMS reminders.' },
]

// ── Lifecycle ──
onMounted(() => {
  buildLineChart()
  buildPieChart()
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

.dashboard {
  font-family: 'DM Sans', sans-serif;
  background: #FDF6EC;
  color: #1A1008;
  min-height: 100vh;
  --brown:   #964B00;
  --brown-lt:#C47A2B;
  --brown-dk:#5C2E00;
  --cream:   #FDF6EC;
  --sand:    #F0E0C8;
  --white:   #FFFFFF;
  --ink:     #1A1008;
  --muted:   #7A6050;
  --border:  #E8D5BB;
  --shadow:  0 2px 16px rgba(150,75,0,.10);
}

/* ── HERO BAND ── */
.hero-band {
  background: linear-gradient(100deg, #5C2E00 0%, #964B00 55%, #C47A2B 100%);
  padding: 2.5rem 2.5rem 2rem;
  position: relative;
  overflow: hidden;
}
.hero-band::after {
  content: '';
  position: absolute; inset: 0;
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E");
}
.hero-inner { position: relative; z-index: 1; max-width: 1200px; margin: 0 auto; }
.hero-title { font-family: 'DM Serif Display', serif; font-size: 1.75rem; color: #fff; letter-spacing: -.02em; }
.hero-title span { color: #FBBF24; font-style: italic; }
.hero-sub { color: rgba(255,255,255,.72); font-size: .875rem; margin-top: .3rem; font-weight: 300; }
.hero-meta { display: flex; align-items: center; gap: 1rem; margin-top: 1.5rem; flex-wrap: wrap; }
.hero-stat {
  background: rgba(255,255,255,.12);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255,255,255,.2);
  border-radius: 10px;
  padding: .75rem 1.25rem;
  min-width: 130px;
}
.hero-stat-val { font-size: 1.6rem; font-weight: 700; color: #fff; line-height: 1; }
.hero-stat-lbl { font-size: .7rem; color: rgba(255,255,255,.65); margin-top: .2rem; letter-spacing: .04em; text-transform: uppercase; }
.hero-stat-delta { font-size: .72rem; margin-top: .3rem; }
.delta-up { color: #6EE7B7; }
.delta-dn { color: #FCA5A5; }

/* ── PAGE ── */
.page { max-width: 1200px; margin: 0 auto; padding: 2rem 2rem 3rem; }
.mb { margin-bottom: 1.75rem; }

/* ── SECTION TITLE ── */
.section-title {
  font-family: 'DM Serif Display', serif;
  font-size: 1.15rem; color: #5C2E00;
  margin-bottom: 1rem;
  display: flex; align-items: center; gap: .5rem;
}
.section-title::after { content: ''; flex: 1; height: 1px; background: #E8D5BB; }

/* ── GRIDS ── */
.grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
.grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1.25rem; }

/* ── CARD ── */
.card {
  background: #fff;
  border: 1px solid #E8D5BB;
  border-radius: 14px;
  padding: 1.4rem 1.5rem;
  box-shadow: var(--shadow);
}
.card-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 1.2rem; gap: .75rem; }
.card-title { font-size: .82rem; font-weight: 600; color: #7A6050; letter-spacing: .05em; text-transform: uppercase; }
.card-sub { font-size: .72rem; color: #7A6050; margin-top: .15rem; }
.card-actions { display: flex; gap: .4rem; flex-shrink: 0; }

/* ── FILTER BAR ── */
.filter-bar { display: flex; align-items: center; gap: .75rem; margin-bottom: 1.75rem; flex-wrap: wrap; }
.filter-label { font-size: .78rem; font-weight: 600; color: #7A6050; }
select {
  font-family: 'DM Sans', sans-serif;
  font-size: .78rem; color: #1A1008;
  background: #fff; border: 1px solid #E8D5BB;
  border-radius: 7px; padding: .38rem .7rem;
  outline: none; cursor: pointer;
  appearance: none; -webkit-appearance: none;
  transition: border .12s;
}
select:focus { border-color: #964B00; }

/* ── TABS ── */
.tab-row { display: flex; gap: .3rem; flex-shrink: 0; }
.tab {
  font-size: .75rem; font-weight: 600; padding: .35rem .8rem;
  border-radius: 6px; border: 1px solid transparent;
  background: transparent; color: #7A6050; cursor: pointer;
  transition: all .12s; font-family: 'DM Sans', sans-serif;
}
.tab.active { background: #964B00; color: #fff; border-color: #964B00; }
.tab:hover:not(.active) { background: #F0E0C8; color: #964B00; }

/* ── BUTTONS ── */
.btn-xs {
  font-size: .7rem; font-weight: 600;
  border: 1px solid #E8D5BB; background: #FDF6EC; color: #7A6050;
  padding: .2rem .6rem; border-radius: 6px; cursor: pointer;
  transition: background .12s, color .12s;
  font-family: 'DM Sans', sans-serif;
}
.btn-xs:hover, .btn-xs.sel { background: #964B00; color: #fff; border-color: #964B00; }

/* ── STAT CARDS ── */
.stat-icon { font-size: 1.5rem; margin-bottom: .6rem; }
.stat-num  { font-size: 2rem; font-weight: 700; color: #1A1008; line-height: 1; }
.stat-label{ font-size: .78rem; color: #7A6050; margin-top: .2rem; font-weight: 500; }
.stat-trend{ font-size: .73rem; margin-top: .4rem; }

/* ── BAR ── */
.bar-wrap { background: #F0E0C8; border-radius: 99px; height: 7px; overflow: hidden; margin-top: .3rem; }
.bar-fill  { height: 100%; border-radius: 99px; background: #964B00; transition: width .7s ease; }

/* ── CHART WRAP ── */
.chart-wrap { position: relative; height: 220px; }
.chart-wrap canvas { width: 100% !important; height: 100% !important; }

/* ── LEGEND ── */
.legend { display: flex; flex-wrap: wrap; gap: .6rem 1.2rem; margin-top: .8rem; }
.legend-item { display: flex; align-items: center; gap: .4rem; font-size: .75rem; color: #7A6050; }
.legend-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }

/* ── PIE ── */
.pie-row { display: flex; align-items: center; gap: 1.5rem; flex-wrap: wrap; }
.pie-canvas-wrap { flex: 0 0 200px; max-width: 200px; }
.pie-legend { flex: 1; min-width: 130px; }
.pie-legend-item { display: flex; align-items: center; gap: .5rem; margin-bottom: .55rem; }
.pie-legend-swatch { width: 11px; height: 11px; border-radius: 3px; flex-shrink: 0; }
.pie-legend-label { font-size: .78rem; color: #7A6050; flex: 1; }
.pie-legend-val   { font-size: .8rem; font-weight: 700; color: #1A1008; }

/* ── SERVICES ── */
.services-list { display: flex; flex-direction: column; gap: .9rem; }
.service-row {}
.service-meta { display: flex; justify-content: space-between; margin-bottom: .25rem; }
.service-name { font-size: .8rem; color: #1A1008; font-weight: 500; }
.service-pct  { font-size: .78rem; font-weight: 700; color: #7A6050; }

/* ── TABLE ── */
table { width: 100%; border-collapse: collapse; }
thead th {
  text-align: left; font-size: .72rem; font-weight: 600; color: #7A6050;
  letter-spacing: .05em; text-transform: uppercase;
  padding: .4rem .75rem .7rem;
  border-bottom: 1px solid #E8D5BB;
}
tbody tr { transition: background .1s; }
tbody tr:hover { background: #FDF6EC; }
tbody td { font-size: .83rem; padding: .65rem .75rem; border-bottom: 1px solid #F5EBE0; color: #1A1008; }
.text-right { text-align: right; }
.muted { color: #7A6050; }
.fw6   { font-weight: 600; }

/* ── PILLS ── */
.pill {
  display: inline-block; font-size: .67rem; font-weight: 700; letter-spacing: .04em;
  text-transform: uppercase; padding: .18rem .55rem; border-radius: 99px;
}
.pill-green { background: #D1FAE5; color: #065F46; }
.pill-red   { background: #FEE2E2; color: #991B1B; }
.pill-amber { background: #FEF3C7; color: #92400E; }

/* ── HEATMAP ── */
.heatmap-scroll { overflow-x: auto; }
.heatmap-table { border-collapse: separate; border-spacing: 3px; font-size: .72rem; }
.heatmap-table thead th {
  padding: .3rem .4rem; color: #7A6050; font-weight: 500;
  text-align: center; white-space: nowrap; border: none;
  text-transform: none; letter-spacing: 0; font-size: .72rem;
}
.heat-day { padding: .3rem .6rem; font-weight: 600; color: #7A6050; white-space: nowrap; border: none; }
.heat-cell {
  text-align: center; padding: .35rem .5rem;
  border-radius: 5px; cursor: default; min-width: 36px;
  border: none;
}

/* ── TREND CARDS ── */
.trend-card { border-top: 3px solid #964B00; }
.trend-icon  { font-size: 1.4rem; margin-bottom: .5rem; }
.trend-title { font-weight: 700; font-size: .9rem; margin-bottom: .3rem; }
.trend-body  { font-size: .82rem; color: #7A6050; line-height: 1.55; }

/* ── RESPONSIVE ── */
@media (max-width: 768px) {
  .grid-2, .grid-3 { grid-template-columns: 1fr; }
  .hero-band { padding: 1.5rem 1.25rem; }
  .page { padding: 1.25rem 1rem 2rem; }
}
</style>