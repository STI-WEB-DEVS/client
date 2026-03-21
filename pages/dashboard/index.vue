<template>
  <div style="background:#FFFEF9; min-height:100vh; padding:1px;">
    <div style="background:#FFFEF9; border-radius:16px; overflow:hidden;">

      <!-- ===== TOP NAV BAR ===== -->
      <div style="display:flex; align-items:center; justify-content:space-between; padding:14px 24px; border-bottom:1px solid #E8E0CC;">
        <!-- Left: Logo -->
        <div style="display:flex; align-items:center; gap:9px;">
          <img src="/nutrimatch-logo.png" alt="NutriMatch" style="width:28px; height:28px; border-radius:20px; object-fit:cover;"/>
          <span style="font-family:'Canva Sans','Nunito','Inter',sans-serif; font-size:15px; font-weight:700; letter-spacing:-0.2px;">
            <span style="color:#1e3448;">Nutri</span><span style="color:#2E8B50;">match</span>
          </span>
        </div>

        <!-- Right: Search + Admin button -->
        <div style="display:flex; align-items:center; gap:10px;">
          <!-- Search bar beside admin button -->
          <div style="position:relative;">
            <div style="position:absolute; left:12px; top:50%; transform:translateY(-50%); color:#b0c4bc; pointer-events:none;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </div>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search..."
              style="width:350px; border:1.5px solid #e2ece6; border-radius:10px; padding:8px 14px 8px 35px; font-size:13px; color:#1e3448; outline:none; background:#FFFDF7; font-family:'Canva Sans','Nunito','Inter',sans-serif; box-sizing:border-box; transition:border-color 0.2s;"
              @focus="(e:any)=>e.target.style.borderColor='#4CAF82'"
              @blur="(e:any)=>e.target.style.borderColor='#e2ece6'"
            />
          </div>

          <!--Admin button -->
          <NuxtLink to="/profile" style="display:flex; align-items:center; gap:8px; background:#F5F1E3; border:1px solid #e2ece6; border-radius:10px; padding:6px 12px; text-decoration:none; cursor:pointer; flex-shrink:0;">
            <div>
              <p style="font-size:12px; font-weight:700; color:#1e3448; line-height:1.2; text-align:right;">{{ user.name }}</p>
              <p style="font-size:10px; color:#8fa8bc; line-height:1.2; text-align:right;">{{ user.role }}</p>
            </div>
            <div style="width:30px; height:30px; border-radius:8px; background:#1e3448; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </div>
          </NuxtLink>
        </div>
      </div>

      <!-- ====MAIN====-->
      <div style="padding:25px;">

        <!-- Welcome -->
        <div style="margin-bottom:24px;">
          <h1 style="font-size:34px; font-weight:700; color:#1a1a1a; line-height:1.2; letter-spacing:-0.5px;">Welcome, Dr. Ivy</h1>
          <p style="font-size:13px; color:#999; margin-top:4px;">NutriMatch Admin Overview</p>
        </div>

        <!-- KPI label -->
        <p style="font-size:13px; font-weight:600; color:#333; margin-bottom:12px;">KPI</p>

        <!-- KPI Cards — exact same colors/style as Patients page stats -->
        <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:14px; margin-bottom:28px;">
          <div v-for="kpi in kpiCards" :key="kpi.label"
            :style="`background:${kpi.bg}; border:1px solid ${kpi.border}; border-radius:14px; padding:20px; position:relative; overflow:hidden;`">
            <div :style="`position:absolute; top:-16px; right:-16px; width:70px; height:70px; border-radius:50%; background:${kpi.circle}; opacity:0.4;`"></div>
            <div :style="`width:38px; height:38px; border-radius:10px; background:${kpi.iconBg}; display:flex; align-items:center; justify-content:center; margin-bottom:12px; position:relative;`" v-html="kpi.icon"></div>
            <p style="font-size:28px; font-weight:800; color:#1e3448; letter-spacing:-0.5px; line-height:1; margin-bottom:3px; position:relative;">{{ kpi.value }}</p>
            <p style="font-size:12px; color:#8fa8bc; margin-bottom:5px; position:relative;">{{ kpi.label }}</p>
            <p :style="`font-size:11px; font-weight:700; color:${kpi.changeColor};`">{{ kpi.change }}</p>
          </div>
        </div>

        <!-- Patient Progress -->
        <p style="font-size:15px; font-weight:600; color:#1a1a1a; margin-bottom:14px;">Patient Progress</p>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-bottom:28px;">
          <div style="background:#4A7FA5; border-radius:14px; padding:18px;">
            <p style="color:white; font-size:12px; font-weight:600; margin-bottom:12px;">Weight Management</p>
            <svg width="100%" height="150" viewBox="0 0 260 90" preserveAspectRatio="none">
              <defs><linearGradient id="wg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="rgba(255,255,255,0.35)"/><stop offset="100%" stop-color="rgba(255,255,255,0.0)"/></linearGradient></defs>
              <path d="M0,70 C20,60 40,40 70,50 C100,60 120,30 150,35 C180,40 210,20 260,10" stroke="rgba(255,255,255,0.95)" stroke-width="2.5" fill="none"/>
              <path d="M0,70 C20,60 40,40 70,50 C100,60 120,30 150,35 C180,40 210,20 260,10 L260,90 L0,90 Z" fill="url(#wg)"/>
            </svg>
            <div style="display:flex; justify-content:space-between; margin-top:8px;">
              <span style="color:rgba(255,255,255,0.7); font-size:10px;">Mon</span>
              <span style="color:rgba(255,255,255,0.7); font-size:10px;">Wed</span>
              <span style="color:rgba(255,255,255,0.7); font-size:10px;">Aug</span>
            </div>
          </div>
          <div style="border:1px solid #E8E0CC; border-radius:14px; padding:18px;">
            <p style="font-size:12px; font-weight:600; color:#333; margin-bottom:12px;">Nutrient Intake</p>
            <div style="display:flex; align-items:flex-end; gap:6px; height:80px;">
              <div v-for="(item,i) in nutrientData" :key="i" style="flex:1; display:flex; align-items:flex-end; gap:2px;">
                <div :style="`flex:1; height:${item.a}%; background:#4CAF82; border-radius:3px 3px 0 0;`"></div>
                <div :style="`flex:1; height:${item.b}%; background:#1e3448; border-radius:3px 3px 0 0;`"></div>
                <div :style="`flex:1; height:${item.c}%; background:#5BB8AE; border-radius:3px 3px 0 0;`"></div>
              </div>
            </div>
            <div style="display:flex; justify-content:space-between; margin-bottom:65px;">
              <span v-for="l in ['Mon','Tue','Wed','Thu']" :key="l" style="font-size:10px; color:#aaa;">{{l}}</span>
            </div>
            <div style="display:flex; gap:10px; margin-top:8px;">
              <span style="font-size:10px; color:#555; display:flex; align-items:center; gap:4px;"><span style="width:8px;height:8px;background:#4CAF82;border-radius:2px;display:inline-block;"></span>Calories</span>
              <span style="font-size:10px; color:#555; display:flex; align-items:center; gap:4px;"><span style="width:8px;height:8px;background:#1e3448;border-radius:2px;display:inline-block;"></span>Protein</span>
              <span style="font-size:10px; color:#555; display:flex; align-items:center; gap:4px;"><span style="width:8px;height:8px;background:#5BB8AE;border-radius:2px;display:inline-block;"></span>Fiber</span>
            </div>
          </div>
        </div>


                <!-- ===== BAR CHART + PIE CHART SECTION ===== -->
        <p style="font-size:15px; font-weight:600; color:#1a1a1a; margin-bottom:14px;">Analytics Overview</p>
        <div style="display:grid; grid-template-columns:1.4fr 1fr; gap:16px; margin-bottom:28px;">

          <!-- BAR CHART — Monthly Consultations -->
          <div style="background:#FFFEF9; border:1px solid #E8E0CC; border-radius:16px; padding:22px;">
            <div style="display:flex; align-items:flex-start; justify-content:space-between; margin-bottom:18px;">
              <div>
                <p style="font-size:14px; font-weight:700; color:#1e3448; margin-bottom:2px;">Monthly Consultations</p>
                <p style="font-size:12px; color:#8fa8bc;">Past 6 months</p>
              </div>
              <div style="display:flex; gap:6px;">
                <span style="font-size:11px; font-weight:600; padding:3px 10px; border-radius:20px; background:#f0faf5; color:#2E8B50; border:1px solid #c8e6d8; cursor:pointer;">2026</span>
              </div>
            </div>
            <!-- Bars -->
            <div style="display:flex; align-items:flex-end; gap:8px; height:200px; padding-bottom:4px;">
              <div v-for="(m, i) in barData" :key="m.month" style="flex:1; display:flex; flex-direction:column; align-items:center; gap:5px;">
                <span style="font-size:10px; font-weight:700; color:#1e3448;">{{ m.val }}</span>
                <div :style="`width:100%; border-radius:6px 6px 0 0; transition:height 0.3s; background:${i === barData.length-1 ? 'linear-gradient(180deg,#4CAF82,#2E8B50)' : 'linear-gradient(180deg,#a8dfc0,#c8ead4)'}; height:${(m.val/120)*115}px;`"></div>
                <span style="font-size:10px; color:#8fa8bc; font-weight:500;">{{ m.month }}</span>
              </div>
            </div>
            <!-- Legend -->
            <div style="display:flex; gap:14px; margin-top:10px; padding-top:10px; border-top:1px solid #E8E0CC;">
              <span style="display:flex; align-items:center; gap:5px; font-size:11px; color:#666;">
                <span style="width:10px; height:10px; border-radius:3px; background:linear-gradient(135deg,#4CAF82,#2E8B50); display:inline-block;"></span>Current Month
              </span>
              <span style="display:flex; align-items:center; gap:5px; font-size:11px; color:#666;">
                <span style="width:10px; height:10px; border-radius:3px; background:#c8ead4; display:inline-block;"></span>Previous Months
              </span>
            </div>
          </div>

          <!-- PIE / DONUT CHART — Patient Conditions -->
          <div style="background:#FFFEF9; border:1px solid #E8E0CC; border-radius:16px; padding:22px;">
            <p style="font-size:14px; font-weight:700; color:#1e3448; margin-bottom:2px;">Patient Conditions</p>
            <p style="font-size:12px; color:#8fa8bc; margin-bottom:16px;">Distribution by diagnosis</p>

            <!-- SVG Donut -->
            <div style="display:flex; align-items:center; gap:18px;">
              <div style="flex-shrink:0; position:relative;">
                <svg width="200" height="200" viewBox="0 0 120 120">
                  <!-- circumference of r=46 = 2π×46 ≈ 289 -->
                  <!-- Diabetes 32% = 92.5 -->
                  <circle cx="60" cy="60" r="46" fill="none" stroke="#eee" stroke-width="18"/>
                  <circle cx="60" cy="60" r="46" fill="none" stroke="#4CAF82" stroke-width="18"
                    stroke-dasharray="92.5 196.5" stroke-dashoffset="0" transform="rotate(-90 60 60)"/>
                  <!-- Hypertension 24% = 69.4 -->
                  <circle cx="60" cy="60" r="46" fill="none" stroke="#2E8B50" stroke-width="18"
                    stroke-dasharray="69.4 219.6" stroke-dashoffset="-92.5" transform="rotate(-90 60 60)"/>
                  <!-- Weight 20% = 57.8 -->
                  <circle cx="60" cy="60" r="46" fill="none" stroke="#1e3448" stroke-width="18"
                    stroke-dasharray="57.8 231.2" stroke-dashoffset="-161.9" transform="rotate(-90 60 60)"/>
                  <!-- Renal 14% = 40.5 -->
                  <circle cx="60" cy="60" r="46" fill="none" stroke="#5BB8AE" stroke-width="18"
                    stroke-dasharray="40.5 248.5" stroke-dashoffset="-219.7" transform="rotate(-90 60 60)"/>
                  <!-- Others 10% = 28.9 -->
                  <circle cx="60" cy="60" r="46" fill="none" stroke="#a8dfc0" stroke-width="18"
                    stroke-dasharray="28.9 260.1" stroke-dashoffset="-260.2" transform="rotate(-90 60 60)"/>
                  <!-- Center text -->
                  <text x="60" y="55" text-anchor="middle" font-size="16" font-weight="800" fill="#1e3448">1,450</text>
                  <text x="60" y="69" text-anchor="middle" font-size="8" fill="#8fa8bc">patients</text>
                </svg>
              </div>
              <!-- Legend -->
              <div style="display:flex; flex-direction:column; gap:7px; flex:1;">
                <div v-for="seg in pieData" :key="seg.label" style="display:flex; align-items:center; justify-content:space-between;">
                  <div style="display:flex; align-items:center; gap:7px;">
                    <span :style="`width:10px; height:10px; border-radius:3px; background:${seg.color}; display:inline-block; flex-shrink:0;`"></span>
                    <span style="font-size:11px; color:#555; font-weight:500;">{{ seg.label }}</span>
                  </div>
                  <span style="font-size:11px; font-weight:700; color:#1e3448;">{{ seg.pct }}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Team list -->
        <p style="font-size:15px; font-weight:600; color:#1a1a1a; margin-bottom:14px;">Team Management</p>
        <div style="border:1px solid #E8E0CC; border-radius:14px; overflow:hidden; margin-bottom:28px;">
          <div v-for="(m, idx) in previewTeam" :key="m.id"
            :style="`display:flex; align-items:center; gap:14px; padding:16px 20px; ${idx < previewTeam.length-1 ? 'border-bottom:1px solid #f5f5f5;' : ''}`">
            <div :style="`width:75px; height:75px; border-radius:50%; background:${avatarBg(idx)}; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:13px; color:${avatarColor(idx)}; flex-shrink:0;`">{{ m.avatar }}</div>
            <div style="flex:1; min-width:0;">
              <p style="font-size:14px; font-weight:600; color:#1a1a1a;">{{ m.name }}</p>
              <p style="font-size:12px; color:#999; margin-top:1px;">{{ m.role }}</p>
            </div>
            <div style="text-align:right; margin-right:16px;">
              <p style="font-size:11px; color:#aaa; margin-bottom:2px;">Status</p>
              <p style="font-size:12px; font-weight:600; color:#4CAF82;">{{ m.status }}</p>
            </div>
            <div style="text-align:right; margin-right:12px;"><p style="font-size:11px; color:#aaa;">View Profile</p></div>
            <button style="background:#4CAF82; color:white; border:none; border-radius:8px; padding:7px 14px; font-size:12px; font-weight:600; cursor:pointer;">View Profile</button>
          </div>
        </div>


      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TeamService from '~/api/TeamService'
definePageMeta({ layout: 'default' })
const { user } = useAuth()
const searchQuery = ref('')

const kpiCards = [
  {
    label: 'Total Patients', value: '1,450', change: '↑ 15% from last month', changeColor: '#2E8B50',
    bg: '#f0faf5', border: '#c8e6d8', circle: '#4CAF82', iconBg: '#4CAF82',
    icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>'
  },
  {
    label: 'Upcoming Consults', value: '75', change: '↑ Today\'s schedule', changeColor: '#1e3448',
    bg: '#f0f4fa', border: '#c0cedc', circle: '#1e3448', iconBg: '#1e3448',
    icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>'
  },
  {
    label: 'Success Rate', value: '90%', change: '↑ Goal Achieved', changeColor: '#3d6b22',
    bg: '#f5faf0', border: '#c8dcb0', circle: '#3d6b22', iconBg: '#3d6b22',
    icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>'
  },
]

const nutrientData = [
  { a: 60, b: 80, c: 40 }, { a: 70, b: 55, c: 65 },
  { a: 85, b: 70, c: 50 }, { a: 50, b: 90, c: 75 },
]
const barData = [
  { month: 'Oct', val: 65 },
  { month: 'Nov', val: 78 },
  { month: 'Dec', val: 52 },
  { month: 'Jan', val: 88 },
  { month: 'Feb', val: 95 },
  { month: 'Mar', val: 110 },
]

const pieData = [
  { label: 'Diabetes', pct: 32, color: '#4CAF82' },
  { label: 'Hypertension', pct: 24, color: '#2E8B50' },
  { label: 'Weight Mgmt', pct: 20, color: '#1e3448' },
  { label: 'Renal Disease', pct: 14, color: '#5BB8AE' },
  { label: 'Others', pct: 10, color: '#a8dfc0' },
]

const avatarBg = (i: number) => ['#e8d5c4','#c4d5e8','#d5e8c4'][i % 3]
const avatarColor = (i: number) => ['#8b6347','#476a8b','#478b64'][i % 3]

const previewTeam = ref<any[]>([])
onMounted(async () => {
  const all = await TeamService.getAll()
  previewTeam.value = all.slice(0, 3)
})
</script>
