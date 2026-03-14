<template>
  <div class="space-y-7">

    <!-- Header -->
    <div class="flex items-center justify-between">
      <p class="text-[10px] font-sans font-medium text-stone-400 uppercase tracking-widest">Reports</p>
      <div class="flex items-center gap-2">
        <select
          v-model="selectedPeriod"
          class="px-3 py-1.5 text-[10px] font-sans uppercase tracking-widest text-stone-500 bg-white border border-stone-200 rounded-sm outline-none focus:border-stone-900 transition-colors"
        >
          <option value="month">This month</option>
          <option value="quarter">This quarter</option>
          <option value="year">This year</option>
        </select>
        <button
          @click="exportReport"
          class="flex items-center gap-1.5 px-3 py-1.5 bg-stone-900 text-[#F7F6F3] text-[10px] font-sans font-medium uppercase tracking-widest rounded-sm hover:bg-stone-700 transition-colors"
        >
          <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M8 2v8M5 7l3 3 3-3M2 12v1a1 1 0 001 1h10a1 1 0 001-1v-1"/>
          </svg>
          Export
        </button>
      </div>
    </div>

    <!-- KPI cards -->
    <div class="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
      <div v-for="kpi in kpis" :key="kpi.label" class="p-4 bg-white border rounded-sm border-stone-200">
        <p class="text-[10px] font-sans font-medium text-stone-300 uppercase tracking-widest mb-2">{{ kpi.label }}</p>
        <p class="font-serif text-2xl text-stone-900 font-normal tracking-tight leading-none mb-1.5">{{ kpi.value }}</p>
        <div class="flex items-center gap-1 text-[11px] font-sans" :class="kpi.trend === 'up' ? 'text-green-700' : kpi.trend === 'down' ? 'text-red-700' : 'text-stone-300'">
          <span v-if="kpi.trend === 'up'">↑</span>
          <span v-else-if="kpi.trend === 'down'">↓</span>
          {{ kpi.delta }} vs last period
        </div>
      </div>
    </div>

    <!-- Charts row -->
    <div class="grid grid-cols-1 gap-2.5 lg:grid-cols-3">

      <!-- Revenue bar chart -->
      <div class="p-5 bg-white border rounded-sm lg:col-span-2 border-stone-200">
        <div class="flex items-center justify-between mb-4">
          <p class="text-[10px] font-sans font-medium text-stone-400 uppercase tracking-widest">Revenue</p>
          <p class="text-[10px] font-sans text-stone-300 uppercase tracking-widest">{{ periodLabel }}</p>
        </div>
        <div class="flex items-end gap-1 mb-2 h-36">
          <div v-for="bar in revenueChart" :key="bar.label" class="flex-1 flex flex-col items-center gap-1.5">
            <p class="text-[9px] font-sans text-stone-500 font-medium">${{ bar.val }}k</p>
            <div
              class="w-full transition-opacity rounded-sm hover:opacity-60"
              :class="bar.current ? 'bg-stone-900' : 'bg-stone-200'"
              :style="{ height: (bar.val / maxRevenue * 100) + '%' }"
            ></div>
            <p class="text-[9px] font-sans text-stone-300 uppercase tracking-wider">{{ bar.label }}</p>
          </div>
        </div>
      </div>

      <!-- Donut-style breakdown -->
      <div class="p-5 bg-white border rounded-sm border-stone-200">
        <p class="text-[10px] font-sans font-medium text-stone-400 uppercase tracking-widest mb-4">Revenue by source</p>
        <div class="space-y-3">
          <div v-for="src in revenueSources" :key="src.label">
            <div class="flex items-center justify-between mb-1">
              <p class="font-sans text-xs text-stone-700">{{ src.label }}</p>
              <p class="font-sans text-xs font-medium text-stone-500">{{ src.pct }}%</p>
            </div>
            <div class="w-full h-1 overflow-hidden rounded-sm bg-stone-100">
              <div
                class="h-full transition-all rounded-sm"
                :class="src.color"
                :style="{ width: src.pct + '%' }"
              ></div>
            </div>
          </div>
        </div>
        <div class="pt-3 mt-4 border-t border-stone-100">
          <p class="text-[10px] font-sans text-stone-300 uppercase tracking-widest mb-0.5">Total</p>
          <p class="font-serif text-lg font-normal text-stone-900">$84.2k</p>
        </div>
      </div>
    </div>

    <!-- Two column section -->
    <div class="grid grid-cols-1 gap-2.5 lg:grid-cols-2">

      <!-- Top projects -->
      <div class="p-5 bg-white border rounded-sm border-stone-200">
        <p class="text-[10px] font-sans font-medium text-stone-400 uppercase tracking-widest mb-4">Top projects by revenue</p>
        <div class="space-y-3">
          <div v-for="(proj, i) in topProjects" :key="proj.name" class="flex items-center gap-3">
            <p class="text-[10px] font-sans text-stone-300 w-4 text-right flex-shrink-0">{{ i + 1 }}</p>
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between mb-1">
                <p class="font-sans text-xs font-medium truncate text-stone-800">{{ proj.name }}</p>
                <p class="flex-shrink-0 ml-2 font-sans text-xs text-stone-500">${{ proj.revenue }}k</p>
              </div>
              <div class="w-full h-0.5 bg-stone-100 rounded-sm overflow-hidden">
                <div class="h-full rounded-sm bg-stone-900" :style="{ width: (proj.revenue / topProjects[0].revenue * 100) + '%' }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Team performance -->
      <div class="p-5 bg-white border rounded-sm border-stone-200">
        <p class="text-[10px] font-sans font-medium text-stone-400 uppercase tracking-widest mb-4">Team performance</p>
        <div class="overflow-x-auto">
          <table class="w-full font-sans text-xs" style="table-layout:fixed;">
            <thead>
              <tr class="border-b border-stone-100">
                <th class="text-left text-[10px] text-stone-300 uppercase tracking-widest font-medium pb-2.5 w-[35%]">Member</th>
                <th class="text-left text-[10px] text-stone-300 uppercase tracking-widest font-medium pb-2.5 w-[20%]">Tasks</th>
                <th class="text-left text-[10px] text-stone-300 uppercase tracking-widest font-medium pb-2.5 w-[20%]">Done</th>
                <th class="text-left text-[10px] text-stone-300 uppercase tracking-widest font-medium pb-2.5 w-[25%]">Rate</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-stone-100">
              <tr v-for="member in teamPerf" :key="member.name">
                <td class="py-2.5">
                  <div class="flex items-center gap-2">
                    <div class="w-5 h-5 rounded-sm bg-stone-100 flex items-center justify-center text-[9px] font-medium text-stone-600 flex-shrink-0">
                      {{ member.initials }}
                    </div>
                    <span class="font-medium truncate text-stone-800">{{ member.name }}</span>
                  </div>
                </td>
                <td class="py-2.5 text-stone-400">{{ member.tasks }}</td>
                <td class="py-2.5 text-stone-400">{{ member.done }}</td>
                <td class="py-2.5">
                  <div class="flex items-center gap-2">
                    <div class="flex-1 h-0.5 bg-stone-100 rounded-sm overflow-hidden">
                      <div class="h-full rounded-sm bg-stone-900" :style="{ width: member.rate + '%' }"></div>
                    </div>
                    <span class="text-[10px] text-stone-500 w-7 text-right">{{ member.rate }}%</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Recent reports list -->
    <div class="p-5 bg-white border rounded-sm border-stone-200">
      <div class="flex items-center justify-between mb-4">
        <p class="text-[10px] font-sans font-medium text-stone-400 uppercase tracking-widest">Saved reports</p>
        <button
          @click="showModal = true"
          class="text-[10px] font-sans text-stone-400 uppercase tracking-widest border-b border-stone-200 hover:text-stone-700 hover:border-stone-700 transition-colors pb-px"
        >+ New</button>
      </div>
      <div class="divide-y divide-stone-100">
        <div
          v-for="report in savedReports"
          :key="report.id"
          class="flex items-center justify-between px-5 py-3 -mx-5 transition-colors cursor-pointer hover:bg-stone-50"
        >
          <div class="flex items-center gap-3">
            <div class="flex items-center justify-center flex-shrink-0 rounded-sm w-7 h-7 bg-stone-100">
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="#888780" stroke-width="1.5">
                <path d="M2 12l3-4 3 2 3-5 3 4"/>
              </svg>
            </div>
            <div>
              <p class="font-sans text-xs font-medium text-stone-900">{{ report.name }}</p>
              <p class="text-[10px] font-sans text-stone-300 mt-0.5">{{ report.period }} · {{ report.generated }}</p>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <span
              class="inline-block px-2 py-0.5 text-[10px] uppercase tracking-wider font-medium rounded-sm"
              :class="{
                'bg-green-50 text-green-700': report.status === 'Final',
                'bg-amber-50 text-amber-700': report.status === 'Draft',
              }"
            >{{ report.status }}</span>
            <button
              @click.stop="deleteReport(report.id)"
              class="text-base leading-none transition-colors text-stone-200 hover:text-red-400"
            >&times;</button>
          </div>
        </div>
      </div>
    </div>

    <!-- New saved report modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/50"
      @click.self="showModal = false"
    >
      <div class="w-full max-w-md p-8 bg-white border rounded-sm border-stone-200">
        <div class="flex items-center justify-between mb-6">
          <p class="font-serif text-base font-normal text-stone-900">Save report</p>
          <button @click="showModal = false" class="text-xl leading-none transition-colors text-stone-300 hover:text-stone-700">&times;</button>
        </div>
        <div class="space-y-4">
          <div>
            <label class="block text-[10px] font-sans font-medium text-stone-400 uppercase tracking-widest mb-1.5">Report name</label>
            <input v-model="newReport.name" type="text" placeholder="e.g. Q1 Performance Summary"
              class="w-full px-3 py-2.5 text-sm font-sans text-stone-900 bg-stone-50 border border-stone-300 rounded-sm outline-none focus:border-stone-900 focus:bg-white transition-colors placeholder:text-stone-300" />
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-[10px] font-sans font-medium text-stone-400 uppercase tracking-widest mb-1.5">Period</label>
              <input v-model="newReport.period" type="text" placeholder="e.g. Q1 2026"
                class="w-full px-3 py-2.5 text-sm font-sans text-stone-900 bg-stone-50 border border-stone-300 rounded-sm outline-none focus:border-stone-900 focus:bg-white transition-colors placeholder:text-stone-300" />
            </div>
            <div>
              <label class="block text-[10px] font-sans font-medium text-stone-400 uppercase tracking-widest mb-1.5">Status</label>
              <select v-model="newReport.status"
                class="w-full px-3 py-2.5 text-sm font-sans text-stone-900 bg-stone-50 border border-stone-300 rounded-sm outline-none focus:border-stone-900 focus:bg-white transition-colors">
                <option>Draft</option>
                <option>Final</option>
              </select>
            </div>
          </div>
        </div>
        <div class="flex gap-2 mt-6">
          <button @click="showModal = false"
            class="flex-1 py-2.5 border border-stone-200 text-[10px] font-sans uppercase tracking-widest text-stone-400 rounded-sm hover:border-stone-400 hover:text-stone-700 transition-colors">Cancel</button>
          <button @click="addReport"
            class="flex-1 py-2.5 bg-stone-900 text-[#F7F6F3] text-[10px] font-sans font-medium uppercase tracking-widest rounded-sm hover:bg-stone-700 transition-colors">Save</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const selectedPeriod = ref('month')

const periodLabel = computed(() => ({
  month: 'This month',
  quarter: 'This quarter',
  year: 'This year',
}[selectedPeriod.value]))

const kpis = [
  { label: 'Total revenue', value: '$84.2k', delta: '+12.4%', trend: 'up' },
  { label: 'Expenses', value: '$31.5k', delta: '+3.1%', trend: 'down' },
  { label: 'Net profit', value: '$52.7k', delta: '+18.2%', trend: 'up' },
  { label: 'Avg deal size', value: '$4.2k', delta: '+5.6%', trend: 'up' },
]

const revenueChart = computed(() => {
  const month = [
    { label: 'W1', val: 18, current: false },
    { label: 'W2', val: 22, current: false },
    { label: 'W3', val: 19, current: false },
    { label: 'W4', val: 25, current: true },
  ]
  const quarter = [
    { label: 'Jan', val: 24, current: false },
    { label: 'Feb', val: 31, current: false },
    { label: 'Mar', val: 29, current: true },
  ]
  const year = [
    { label: 'Q1', val: 84, current: false },
    { label: 'Q2', val: 91, current: false },
    { label: 'Q3', val: 78, current: false },
    { label: 'Q4', val: 105, current: true },
  ]
  return { month, quarter, year }[selectedPeriod.value]
})

const maxRevenue = computed(() => Math.max(...revenueChart.value.map(b => b.val)))

const revenueSources = [
  { label: 'Direct sales', pct: 42, color: 'bg-stone-900' },
  { label: 'Subscriptions', pct: 31, color: 'bg-stone-400' },
  { label: 'Partnerships', pct: 18, color: 'bg-stone-300' },
  { label: 'Other', pct: 9, color: 'bg-stone-200' },
]

const topProjects = [
  { name: 'Atlas Redesign', revenue: 28.4 },
  { name: 'API v3 Migration', revenue: 21.1 },
  { name: 'Data Warehouse', revenue: 18.7 },
  { name: 'Marketing Site', revenue: 10.2 },
  { name: 'Mobile App', revenue: 5.8 },
]

const teamPerf = [
  { name: 'Tom C.', initials: 'TC', tasks: 24, done: 21, rate: 88 },
  { name: 'Sarah M.', initials: 'SM', tasks: 18, done: 14, rate: 78 },
  { name: 'James R.', initials: 'JR', tasks: 21, done: 15, rate: 71 },
  { name: 'Lin W.', initials: 'LW', tasks: 16, done: 10, rate: 63 },
]

const savedReports = ref([
  { id: 1, name: 'Q4 2025 Performance', period: 'Q4 2025', generated: 'Jan 5, 2026', status: 'Final' },
  { id: 2, name: 'Q3 2025 Performance', period: 'Q3 2025', generated: 'Oct 3, 2025', status: 'Final' },
  { id: 3, name: 'Mar 2026 Draft', period: 'Mar 2026', generated: 'Mar 14, 2026', status: 'Draft' },
])

const showModal = ref(false)
const newReport = ref({ name: '', period: '', status: 'Draft' })

let nextId = 10
const addReport = () => {
  if (!newReport.value.name.trim()) return
  savedReports.value.unshift({
    id: nextId++,
    name: newReport.value.name,
    period: newReport.value.period || '—',
    generated: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    status: newReport.value.status,
  })
  newReport.value = { name: '', period: '', status: 'Draft' }
  showModal.value = false
}

const deleteReport = (id: number) => {
  savedReports.value = savedReports.value.filter(r => r.id !== id)
}

const exportReport = () => {
  alert('Export triggered — wire this up to your download logic.')
}
</script>