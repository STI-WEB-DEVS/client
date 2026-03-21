<template>
  <div style="background:#FFFEF9; min-height:100vh; padding:16px;">
    <div style="background:#FFFEF9; border-radius:16px; min-height:calc(100vh - 32px); padding:25px;">

      <!-- Header -->
      <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:24px;">
        <div>
          <h1 style="font-size:28px; font-weight:700; color:#1e3448; letter-spacing:-0.4px; margin-bottom:4px;">Patients</h1>
          <p style="font-size:13px; color:#8fa8bc;">Monitor and manage all patient records</p>
        </div>
        <div style="display:flex; gap:10px; align-items:center;">
          <!-- Search -->
          <div style="position:relative;">
            <div style="position:absolute; left:11px; top:50%; transform:translateY(-50%); color:#b0c4bc; pointer-events:none;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </div>
            <input v-model="search" placeholder="Search patients..." style="border:1.5px solid #e2ece6; border-radius:10px; padding:9px 14px 9px 34px; font-size:13px; outline:none; width:220px; font-family:'Canva Sans','Nunito','Inter',sans-serif; color:#1e3448; background:#FFFDF7;"/>
          </div>
          <button style="background:linear-gradient(135deg,#4CAF82,#2E8B50); color:white; border:none; border-radius:10px; padding:10px 18px; font-size:13px; font-weight:600; cursor:pointer; display:flex; align-items:center; gap:6px; font-family:'Canva Sans','Nunito','Inter',sans-serif;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            New Patient
          </button>
        </div>
      </div>

      <!-- KPI Stats row -->
      <div style="display:grid; grid-template-columns:repeat(4,1fr); gap:14px; margin-bottom:24px;">
        <div v-for="s in stats" :key="s.label"
          :style="`background:${s.bg}; border:1px solid ${s.border}; border-radius:14px; padding:18px; position:relative; overflow:hidden;`">
          <div :style="`position:absolute; top:-16px; right:-16px; width:70px; height:70px; border-radius:50%; background:${s.circle}; opacity:0.4;`"></div>
          <div :style="`width:36px; height:36px; border-radius:9px; background:${s.iconBg}; display:flex; align-items:center; justify-content:center; margin-bottom:10px;`" v-html="s.icon"></div>
          <p style="font-size:26px; font-weight:800; color:#1e3448; letter-spacing:-0.5px; line-height:1; margin-bottom:3px;">{{ s.value }}</p>
          <p style="font-size:11px; color:#8fa8bc; margin-bottom:5px;">{{ s.label }}</p>
          <p :style="`font-size:11px; font-weight:700; color:${s.up ? '#2E8B50' : '#ef4444'};`">{{ s.change }}</p>
        </div>
      </div>

      <!-- Filter tabs + condition breakdown -->
      <div style="display:grid; grid-template-columns:1fr auto; gap:16px; align-items:start; margin-bottom:20px;">
        <div style="display:flex; gap:8px; flex-wrap:wrap;">
          <button v-for="tab in filterTabs" :key="tab"
            @click="activeTab=tab"
            :style="`padding:7px 16px; border-radius:8px; font-size:12px; font-weight:600; cursor:pointer; border:none; font-family:'Canva Sans','Nunito','Inter',sans-serif; transition:background 0.15s;
              ${activeTab===tab ? 'background:#4CAF82; color:white;' : 'background:#F5F1E3; color:#555;'}`">
            {{ tab }}
          </button>
        </div>
        <!-- Condition legend pills -->
        <div style="display:flex; gap:6px; flex-wrap:wrap; justify-content:flex-end;">
          <span v-for="c in conditions" :key="c.label"
            :style="`font-size:11px; font-weight:600; padding:4px 10px; border-radius:20px; background:${c.bg}; color:${c.color}; border:1px solid ${c.border};`">
            {{ c.label }}: {{ c.count }}
          </span>
        </div>
      </div>

      <!-- Patient Table -->
      <div style="border:1px solid #e2ece6; border-radius:14px; overflow:hidden;">
        <div style="display:flex; align-items:center; justify-content:space-between; padding:16px 20px; border-bottom:1px solid #e8f0ec; background:#FFFDF7;">
          <p style="font-size:14px; font-weight:700; color:#1e3448;">Patient Records
            <span style="font-size:12px; font-weight:500; color:#8fa8bc; margin-left:8px;">{{ filteredPatients.length }} records</span>
          </p>
          <div style="display:flex; gap:8px;">
            <button style="border:1px solid #e2ece6; background:white; border-radius:8px; padding:6px 12px; font-size:12px; color:#555; cursor:pointer; display:flex; align-items:center; gap:5px; font-family:'Canva Sans','Nunito','Inter',sans-serif;">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
              Filter
            </button>
            <button style="border:1px solid #e2ece6; background:white; border-radius:8px; padding:6px 12px; font-size:12px; color:#555; cursor:pointer; display:flex; align-items:center; gap:5px; font-family:'Canva Sans','Nunito','Inter',sans-serif;">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Export
            </button>
          </div>
        </div>

        <table style="width:100%; border-collapse:collapse;">
          <thead>
            <tr style="background:#F5F1E3;">
              <th style="text-align:left; padding:11px 20px; font-size:11px; font-weight:700; color:#8fa8bc; text-transform:uppercase; letter-spacing:0.5px;">Patient</th>
              <th style="text-align:left; padding:11px 20px; font-size:11px; font-weight:700; color:#8fa8bc; text-transform:uppercase; letter-spacing:0.5px;">Condition</th>
              <th style="text-align:left; padding:11px 20px; font-size:11px; font-weight:700; color:#8fa8bc; text-transform:uppercase; letter-spacing:0.5px;">Dietitian</th>
              <th style="text-align:left; padding:11px 20px; font-size:11px; font-weight:700; color:#8fa8bc; text-transform:uppercase; letter-spacing:0.5px;">BMI</th>
              <th style="text-align:left; padding:11px 20px; font-size:11px; font-weight:700; color:#8fa8bc; text-transform:uppercase; letter-spacing:0.5px;">Next Consult</th>
              <th style="text-align:left; padding:11px 20px; font-size:11px; font-weight:700; color:#8fa8bc; text-transform:uppercase; letter-spacing:0.5px;">Progress</th>
              <th style="text-align:left; padding:11px 20px; font-size:11px; font-weight:700; color:#8fa8bc; text-transform:uppercase; letter-spacing:0.5px;">Status</th>
              <th style="text-align:left; padding:11px 20px; font-size:11px; font-weight:700; color:#8fa8bc; text-transform:uppercase; letter-spacing:0.5px;">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(p, i) in filteredPatients" :key="p.id" :style="`border-top:1px solid #E8E0CC; ${i%2===1?'background:#FFFDF7;':''}`">
              <td style="padding:14px 20px;">
                <div style="display:flex; align-items:center; gap:10px;">
                  <div :style="`width:36px; height:36px; border-radius:10px; background:${p.avatarBg}; color:${p.avatarFg}; display:flex; align-items:center; justify-content:center; font-size:12px; font-weight:700; flex-shrink:0;`">{{ p.initials }}</div>
                  <div>
                    <p style="font-size:13px; font-weight:600; color:#1e3448; margin-bottom:1px;">{{ p.name }}</p>
                    <p style="font-size:11px; color:#8fa8bc;">{{ p.age }}y · {{ p.gender }}</p>
                  </div>
                </div>
              </td>
              <td style="padding:14px 20px;">
                <span :style="`font-size:11px; font-weight:600; padding:3px 9px; border-radius:20px; background:${p.condBg}; color:${p.condColor};`">{{ p.condition }}</span>
              </td>
              <td style="padding:14px 20px; font-size:13px; color:#555; font-weight:500;">{{ p.dietitian }}</td>
              <td style="padding:14px 20px;">
                <span :style="`font-size:12px; font-weight:700; color:${p.bmi>=25?'#E8846A':'#4CAF82'};`">{{ p.bmi }}</span>
                <span style="font-size:10px; color:#aaa; margin-left:3px;">{{ p.bmi >= 30 ? 'Obese' : p.bmi >= 25 ? 'Overweight' : 'Normal' }}</span>
              </td>
              <td style="padding:14px 20px; font-size:13px; color:#1e3448; font-weight:500;">{{ p.nextConsult }}</td>
              <td style="padding:14px 20px;">
                <div style="display:flex; align-items:center; gap:8px;">
                  <div style="flex:1; max-width:80px; background:#e8f0ec; border-radius:6px; height:7px;">
                    <div :style="`width:${p.progress}%; background:linear-gradient(90deg,#4CAF82,#2E8B50); height:7px; border-radius:6px;`"></div>
                  </div>
                  <span style="font-size:12px; font-weight:700; color:#2E8B50; min-width:28px;">{{ p.progress }}%</span>
                </div>
              </td>
              <td style="padding:14px 20px;">
                <span :style="`font-size:11px; font-weight:700; padding:4px 10px; border-radius:20px;
                  ${p.status==='Active' ? 'background:#e8f5ee; color:#2E8B50;' : p.status==='On Hold' ? 'background:#fef9e8; color:#b8860b;' : 'background:#EEE9D8; color:#999;'}`">
                  {{ p.status }}
                </span>
              </td>
              <td style="padding:14px 20px;">
                <div style="display:flex; gap:6px;">
                  <button style="width:28px; height:28px; border:1px solid #e2ece6; border-radius:7px; background:white; cursor:pointer; display:flex; align-items:center; justify-content:center; color:#4CAF82;">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  </button>
                  <button style="width:28px; height:28px; border:1px solid #e2ece6; border-radius:7px; background:white; cursor:pointer; display:flex; align-items:center; justify-content:center; color:#1e3448;">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Pagination -->
        <div style="display:flex; align-items:center; justify-content:space-between; padding:14px 20px; border-top:1px solid #e8f0ec; background:#FFFDF7;">
          <p style="font-size:12px; color:#8fa8bc;">Showing <strong style="color:#1e3448;">{{ filteredPatients.length }}</strong> of <strong style="color:#1e3448;">{{ patients.length }}</strong> patients</p>
          <div style="display:flex; gap:5px;">
            <button v-for="n in 3" :key="n"
              :style="`width:30px; height:30px; border-radius:8px; font-size:12px; font-weight:600; cursor:pointer; border:1px solid;
                ${n===1 ? 'background:#4CAF82; color:white; border-color:#4CAF82;' : 'background:white; color:#555; border-color:#e2ece6;'}`">
              {{ n }}
            </button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default' })
const search = ref('')
const activeTab = ref('All')
const filterTabs = ['All', 'Active', 'On Hold', 'Inactive']

const stats = [
  {
    label: 'Total Patients', value: '1,450', change: '↑ 15% this month', up: true,
    bg: '#f0faf5', border: '#c8e6d8', circle: '#4CAF82', iconBg: '#4CAF82',
    icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>'
  },
  {
    label: 'Active This Week', value: '327', change: '↑ 8% vs last week', up: true,
    bg: '#f0f4fa', border: '#c0cedc', circle: '#1e3448', iconBg: '#1e3448',
    icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>'
  },
  {
    label: 'New Registrations', value: '42', change: '↑ 12% this month', up: true,
    bg: '#f5faf0', border: '#c8dcb0', circle: '#3d6b22', iconBg: '#3d6b22',
    icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>'
  },
  {
    label: 'Pending Review', value: '18', change: '↓ 3 from yesterday', up: false,
    bg: '#fef9f0', border: '#f0dcc0', circle: '#E8846A', iconBg: '#E8846A',
    icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>'
  },
]

const conditions = [
  { label: 'Diabetes', count: 3, bg: '#e8f5ee', color: '#2E8B50', border: '#c8e6d8' },
  { label: 'Hypertension', count: 1, bg: '#f0f4fa', color: '#1e3448', border: '#c0cedc' },
  { label: 'Weight Mgmt', count: 1, bg: '#fef9f0', color: '#b8860b', border: '#f0dcc0' },
  { label: 'Renal', count: 1, bg: '#f8f5fc', color: '#6b3a8b', border: '#d8c0e8' },
]

const patients = [
  { id:1, name:'Maria Santos',  initials:'MS', age:45, gender:'F', condition:'Type 2 Diabetes',   condBg:'#e8f5ee', condColor:'#2E8B50', dietitian:'Dr. Sharma', bmi:27.4, nextConsult:'Mar 21', progress:72, status:'Active',   avatarBg:'#e8f5ee', avatarFg:'#2E8B50' },
  { id:2, name:'Jose Reyes',    initials:'JR', age:58, gender:'M', condition:'Hypertension',       condBg:'#f0f4fa', condColor:'#1e3448', dietitian:'Dr. Cruz',   bmi:29.1, nextConsult:'Mar 23', progress:55, status:'Active',   avatarBg:'#f0f4fa', avatarFg:'#1e3448' },
  { id:3, name:'Ana Garcia',    initials:'AG', age:32, gender:'F', condition:'Weight Management',  condBg:'#fef9f0', condColor:'#b8860b', dietitian:'Dr. Lim',    bmi:24.5, nextConsult:'Mar 25', progress:88, status:'Active',   avatarBg:'#fef9f0', avatarFg:'#b8860b' },
  { id:4, name:'Pedro Cruz',    initials:'PC', age:67, gender:'M', condition:'Renal Disease',      condBg:'#f8f5fc', condColor:'#6b3a8b', dietitian:'Dr. Reyes',  bmi:23.8, nextConsult:'Apr 1',  progress:40, status:'Active',   avatarBg:'#f8f5fc', avatarFg:'#6b3a8b' },
  { id:5, name:'Lina Diaz',     initials:'LD', age:29, gender:'F', condition:'Eating Disorder',    condBg:'#fff0f0', condColor:'#c0392b', dietitian:'Dr. Sharma', bmi:18.2, nextConsult:'Mar 28', progress:63, status:'On Hold',  avatarBg:'#fff0f0', avatarFg:'#c0392b' },
  { id:6, name:'Carlos Tan',    initials:'CT', age:50, gender:'M', condition:'Obesity',            condBg:'#fef9f0', condColor:'#b8860b', dietitian:'Dr. Lim',    bmi:33.6, nextConsult:'—',       progress:20, status:'Inactive', avatarBg:'#f5f5f5', avatarFg:'#999' },
]

const filteredPatients = computed(() => {
  let list = patients
  if (activeTab.value !== 'All') list = list.filter(p => p.status === activeTab.value)
  if (search.value) list = list.filter(p =>
    p.name.toLowerCase().includes(search.value.toLowerCase()) ||
    p.condition.toLowerCase().includes(search.value.toLowerCase()) ||
    p.dietitian.toLowerCase().includes(search.value.toLowerCase())
  )
  return list
})
</script>
