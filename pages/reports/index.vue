<template>
  <div style="background:#FFFEF9; min-height:100vh; padding:16px;">
    <div style="background:#FFFEF9; border-radius:16px; min-height:calc(100vh - 32px); padding:20px;">

      <!-- Header -->
      <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:25px;">
        <div>
          <h1 style="font-size:28px; font-weight:700; color:#1e3448; letter-spacing:-0.4px; margin-bottom:4px;">Reports</h1>
          <p style="font-size:13px; color:#8fa8bc;">Platform analytics & performance overview</p>
        </div>
        <button style="background:linear-gradient(135deg,#4CAF82,#2E8B50); color:white; border:none; border-radius:10px; padding:10px 20px; font-size:13px; font-weight:600; cursor:pointer; display:flex; align-items:center; gap:7px; font-family:'Canva Sans','Nunito','Inter',sans-serif;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Export Report
        </button>
      </div>

      <!-- ===== KPI CARDS ===== -->
      <div style="display:grid; grid-template-columns:repeat(4,1fr); gap:14px; margin-bottom:24px;">
        <div v-for="kpi in kpis" :key="kpi.label"
          :style="`border-radius:16px; padding:20px; background:${kpi.bg}; border:1px solid ${kpi.border}; position:relative; overflow:hidden;`">
          <div :style="`position:absolute; top:-20px; right:-20px; width:80px; height:80px; border-radius:50%; background:${kpi.circle}; opacity:0.5;`"></div>
          <div :style="`width:38px; height:45px; border-radius:10px; background:${kpi.icon}; display:flex; align-items:center; justify-content:center; margin-bottom:12px;`" v-html="kpi.svg"></div>
          <p style="font-size:26px; font-weight:700; color:#1e3448; letter-spacing:-0.5px; margin-bottom:2px; position:relative;">{{ kpi.value }}</p>
          <p style="font-size:12px; color:#8fa8bc; margin-bottom:6px; position:relative;">{{ kpi.label }}</p>
          <span :style="`font-size:11px; font-weight:600; color:${kpi.changeColor};`">{{ kpi.change }}</span>
        </div>
      </div>

      <!-- ===== CHARTS ROW ===== -->
      <div style="display:grid; grid-template-columns:1.6fr 1fr; gap:16px; margin-bottom:24px;">

        <!-- BAR CHART -->
        <div style="border:1px solid #e8f0ec; border-radius:16px; padding:22px;">
          <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:18px;">
            <div>
              <p style="font-size:14px; font-weight:700; color:#1e3448; margin-bottom:2px;">Monthly Consultations</p>
              <p style="font-size:12px; color:#8fa8bc;">Last 6 months performance</p>
            </div>
            <div style="display:flex; gap:6px;">
              <span v-for="yr in ['2025','2026']" :key="yr" style="font-size:11px; font-weight:600; padding:4px 10px; border-radius:20px; cursor:pointer; background:#f0faf5; color:#4CAF82; border:1px solid #c8e6d8;">{{ yr }}</span>
            </div>
          </div>
          <!-- Bar chart SVG -->
          <div style="display:flex; align-items:flex-end; gap:10px; height:200px; padding:0 4px;">
            <div v-for="(m, i) in monthlyData" :key="m.month" style="flex:1; display:flex; flex-direction:column; align-items:center; gap:6px;">
              <span style="font-size:10px; font-weight:700; color:#1e3448;">{{ m.val }}</span>
              <div style="width:100%; border-radius:6px 6px 0 0; transition:height 0.3s;"
                :style="`height:${(m.val/110)*130}px; background:${i===monthlyData.length-1 ? 'linear-gradient(180deg,#4CAF82,#2E8B50)' : 'linear-gradient(180deg,#a8dfc0,#c8ead4)'};`">
              </div>
              <span style="font-size:10px; color:#8fa8bc; font-weight:500;">{{ m.month }}</span>
            </div>
          </div>
          <!-- Legend -->
          <div style="display:flex; gap:14px; margin-top:12px; padding-top:12px; border-top:1px solid #E8E0CC;">
            <span style="display:flex; align-items:center; gap:5px; font-size:11px; color:#666;"><span style="width:10px; height:10px; border-radius:3px; background:linear-gradient(135deg,#4CAF82,#2E8B50); display:inline-block;"></span>Current Period</span>
            <span style="display:flex; align-items:center; gap:5px; font-size:11px; color:#666;"><span style="width:10px; height:10px; border-radius:3px; background:#c8ead4; display:inline-block;"></span>Previous Period</span>
          </div>
        </div>

        <!-- DONUT CHART -->
        <div style="border:1px solid #e8f0ec; border-radius:16px; padding:22px;">
          <p style="font-size:14px; font-weight:700; color:#1e3448; margin-bottom:2px;">Patient Conditions</p>
          <p style="font-size:12px; color:#8fa8bc; margin-bottom:16px;">Distribution by diagnosis</p>

          <!-- SVG Donut -->
          <div style="display:flex; align-items:center; gap:16px;">
            <div style="position:relative; flex-shrink:0;">
              <svg width="200" height="200" viewBox="0 0 130 130">
                <!-- Background circle -->
                <circle cx="65" cy="65" r="50" fill="none" stroke="#f0f4f1" stroke-width="20"/>
                <!-- Segments using stroke-dasharray trick -->
                <!-- Total circumference = 2*PI*50 = 314.16 -->
                <!-- Diabetes 32% = 100.5 -->
                <circle cx="65" cy="65" r="50" fill="none" stroke="#4CAF82" stroke-width="20"
                  stroke-dasharray="100.5 213.66" stroke-dashoffset="0" transform="rotate(-90 65 65)"/>
                <!-- Hypertension 24% = 75.4 -->
                <circle cx="65" cy="65" r="50" fill="none" stroke="#2E8B50" stroke-width="20"
                  stroke-dasharray="75.4 238.76" stroke-dashoffset="-100.5" transform="rotate(-90 65 65)"/>
                <!-- Weight Mgmt 20% = 62.8 -->
                <circle cx="65" cy="65" r="50" fill="none" stroke="#1e3448" stroke-width="20"
                  stroke-dasharray="62.8 251.36" stroke-dashoffset="-175.9" transform="rotate(-90 65 65)"/>
                <!-- Renal 14% = 43.98 -->
                <circle cx="65" cy="65" r="50" fill="none" stroke="#5BB8AE" stroke-width="20"
                  stroke-dasharray="43.98 270.18" stroke-dashoffset="-238.7" transform="rotate(-90 65 65)"/>
                <!-- Others 10% = 31.4 -->
                <circle cx="65" cy="65" r="50" fill="none" stroke="#a8dfc0" stroke-width="20"
                  stroke-dasharray="31.4 282.76" stroke-dashoffset="-282.68" transform="rotate(-90 65 65)"/>
                <!-- Center text -->
                <text x="65" y="60" text-anchor="middle" font-size="18" font-weight="700" fill="#1e3448">1,450</text>
                <text x="65" y="76" text-anchor="middle" font-size="9" fill="#8fa8bc">patients</text>
              </svg>
            </div>

            <!-- Legend -->
            <div style="display:flex; flex-direction:column; gap:8px; flex:1;">
              <div v-for="seg in donutData" :key="seg.label" style="display:flex; align-items:center; justify-content:space-between;">
                <div style="display:flex; align-items:center; gap:6px;">
                  <span :style="`width:10px; height:10px; border-radius:3px; background:${seg.color}; display:inline-block; flex-shrink:0;`"></span>
                  <span style="font-size:11px; color:#555;">{{ seg.label }}</span>
                </div>
                <span style="font-size:11px; font-weight:700; color:#1e3448;">{{ seg.pct }}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ===== DATA TABLE ===== -->
      <div style="border:1px solid #e8f0ec; border-radius:16px; overflow:hidden;">
        <div style="display:flex; align-items:center; justify-content:space-between; padding:18px 22px; border-bottom:1px solid #E8E0CC;">
          <div>
            <p style="font-size:14px; font-weight:700; color:#1e3448; margin-bottom:2px;">Detailed Performance Table</p>
            <p style="font-size:12px; color:#8fa8bc;">Monthly breakdown with success metrics</p>
          </div>
          <input v-model="search" placeholder="Search..." style="border:1px solid #e2e8f0; border-radius:8px; padding:7px 12px; font-size:12px; outline:none; width:180px; font-family:'Canva Sans','Nunito','Inter',sans-serif;"/>
        </div>
        <table style="width:100%; border-collapse:collapse;">
          <thead>
            <tr style="background:#F5F1E3;">
              <th style="text-align:left; padding:11px 22px; font-size:11px; font-weight:700; color:#8fa8bc; text-transform:uppercase; letter-spacing:0.5px;">Month</th>
              <th style="text-align:left; padding:11px 22px; font-size:11px; font-weight:700; color:#8fa8bc; text-transform:uppercase; letter-spacing:0.5px;">Consultations</th>
              <th style="text-align:left; padding:11px 22px; font-size:11px; font-weight:700; color:#8fa8bc; text-transform:uppercase; letter-spacing:0.5px;">New Patients</th>
              <th style="text-align:left; padding:11px 22px; font-size:11px; font-weight:700; color:#8fa8bc; text-transform:uppercase; letter-spacing:0.5px;">Success Rate</th>
              <th style="text-align:left; padding:11px 22px; font-size:11px; font-weight:700; color:#8fa8bc; text-transform:uppercase; letter-spacing:0.5px;">Revenue</th>
              <th style="text-align:left; padding:11px 22px; font-size:11px; font-weight:700; color:#8fa8bc; text-transform:uppercase; letter-spacing:0.5px;">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, i) in filteredTable" :key="row.month" :style="`border-top:1px solid #f5f8f6; ${i%2===0?'':'background:#FFFDF7;'}`">
              <td style="padding:13px 22px; font-size:13px; font-weight:600; color:#1e3448;">{{ row.month }}</td>
              <td style="padding:13px 22px; font-size:13px; color:#555;">{{ row.consults }}</td>
              <td style="padding:13px 22px; font-size:13px; color:#555;">{{ row.newPts }}</td>
              <td style="padding:13px 22px;">
                <div style="display:flex; align-items:center; gap:8px;">
                  <div style="flex:1; max-width:70px; background:#f0f4f1; border-radius:4px; height:5px;">
                    <div :style="`width:${row.rate}%; background:linear-gradient(90deg,#4CAF82,#2E8B50); height:5px; border-radius:4px;`"></div>
                  </div>
                  <span style="font-size:12px; font-weight:700; color:#2E8B50;">{{ row.rate }}%</span>
                </div>
              </td>
              <td style="padding:13px 22px; font-size:13px; font-weight:600; color:#1e3448;">{{ row.revenue }}</td>
              <td style="padding:13px 22px;">
                <span :style="`font-size:11px; font-weight:600; padding:3px 10px; border-radius:20px;
                  ${row.status==='Excellent' ? 'background:#e8f5ee; color:#2E8B50;' :
                    row.status==='Good' ? 'background:#e8eef5; color:#1e3448;' :
                    'background:#fef9e8; color:#b8860b;'}`">
                  {{ row.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- Table footer -->
        <div style="padding:14px 22px; border-top:1px solid #E8E0CC; display:flex; justify-content:space-between; align-items:center;">
          <p style="font-size:12px; color:#8fa8bc;">Showing {{ filteredTable.length }} of {{ tableData.length }} entries</p>
          <div style="display:flex; gap:6px;">
            <button v-for="n in 3" :key="n" :style="`width:28px; height:28px; border-radius:7px; border:1px solid ${n===1?'#4CAF82':'#e2e8f0'}; background:${n===1?'#4CAF82':'white'}; color:${n===1?'white':'#555'}; font-size:12px; font-weight:600; cursor:pointer;`">{{ n }}</button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default' })
const search = ref('')

const kpis = [
  {
    label: 'Total Patients', value: '1,450', change: '↑ 15% from last month', changeColor: '#2E8B50',
    bg: '#f0faf5', border: '#c8e6d8', circle: '#4CAF82', icon: '#4CAF82',
    svg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>'
  },
  {
    label: 'Consultations This Month', value: '327', change: '↑ 8% vs last month', changeColor: '#2E8B50',
    bg: '#f0f4fa', border: '#c0cedc', circle: '#1e3448', icon: '#1e3448',
    svg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>'
  },
  {
    label: 'Success Rate', value: '90%', change: '↑ Goal Achieved', changeColor: '#2E8B50',
    bg: '#f0faf7', border: '#b0dcc8', circle: '#5BB8AE', icon: '#5BB8AE',
    svg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>'
  },
  {
    label: 'Active Dietitians', value: '5', change: '↑ 1 new this month', changeColor: '#2E8B50',
    bg: '#f5f8ee', border: '#c8d8b0', circle: '#3d6b22', icon: '#3d6b22',
    svg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>'
  },
]

const monthlyData = [
  { month: 'Oct', val: 65 },
  { month: 'Nov', val: 78 },
  { month: 'Dec', val: 52 },
  { month: 'Jan', val: 88 },
  { month: 'Feb', val: 95 },
  { month: 'Mar', val: 110 },
]

const donutData = [
  { label: 'Diabetes', pct: 32, color: '#4CAF82' },
  { label: 'Hypertension', pct: 24, color: '#2E8B50' },
  { label: 'Weight Mgmt', pct: 20, color: '#1e3448' },
  { label: 'Renal Disease', pct: 14, color: '#5BB8AE' },
  { label: 'Others', pct: 10, color: '#a8dfc0' },
]

const tableData = [
  { month: 'March 2026',   consults: 110, newPts: 42, rate: 94, revenue: '₱54,890', status: 'Excellent' },
  { month: 'February 2026', consults: 95, newPts: 38, rate: 90, revenue: '₱47,500', status: 'Excellent' },
  { month: 'January 2026',  consults: 88, newPts: 31, rate: 87, revenue: '₱44,000', status: 'Good' },
  { month: 'December 2025', consults: 52, newPts: 18, rate: 80, revenue: '₱26,000', status: 'Average' },
  { month: 'November 2025', consults: 78, newPts: 29, rate: 85, revenue: '₱39,000', status: 'Good' },
  { month: 'October 2025',  consults: 65, newPts: 24, rate: 82, revenue: '₱32,500', status: 'Good' },
]

const filteredTable = computed(() =>
  search.value
    ? tableData.filter(r => r.month.toLowerCase().includes(search.value.toLowerCase()) || r.status.toLowerCase().includes(search.value.toLowerCase()))
    : tableData
)
</script>
