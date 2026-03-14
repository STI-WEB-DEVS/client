<template>
  <div>
    <!-- Mini stat row -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
      <div v-for="s in clientStats" :key="s.label" class="nm-card p-4">
        <p class="font-display text-2xl font-bold" :style="{ color: s.color }">{{ s.value }}</p>
        <p class="text-xs mt-0.5 font-medium" style="color:var(--muted)">{{ s.label }}</p>
      </div>
    </div>

    <!-- Table card -->
    <div class="nm-card">
      <!-- Toolbar -->
      <div class="px-5 py-4 border-b flex flex-col sm:flex-row gap-3 sm:items-center justify-between"
           style="border-color:var(--border)">
        <div class="flex items-center gap-2">
          <div class="relative">
            <MagnifyingGlassIcon class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style="color:var(--muted)"/>
            <input v-model="q" type="text" placeholder="Search clients…" class="nm-input pl-9 py-2 text-sm w-56"/>
          </div>
          <select v-model="filterCond" class="nm-input py-2 text-sm w-40">
            <option value="">All Conditions</option>
            <option v-for="c in conditions" :key="c" :value="c">{{ c }}</option>
          </select>
        </div>
        <div class="flex gap-2">
          <button class="nm-btn nm-btn-ghost text-sm">
            <ArrowDownTrayIcon class="w-4 h-4"/> Export
          </button>
          <button class="nm-btn nm-btn-primary text-sm">
            <PlusIcon class="w-4 h-4"/> Add Client
          </button>
        </div>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="nm-table">
          <thead>
            <tr>
              <th><input type="checkbox" style="accent-color:#0d6b6b"/></th>
              <th>Client</th>
              <th>Condition</th>
              <th>Assigned RND</th>
              <th>Last Visit</th>
              <th>Sessions</th>
              <th>Status</th>
              <th class="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="c in filtered" :key="c.id">
              <td><input type="checkbox" style="accent-color:#0d6b6b"/></td>
              <td>
                <div class="flex items-center gap-2.5">
                  <div class="nm-avatar w-9 h-9 text-[.7rem]" :style="{ background: c.color }">{{ c.initials }}</div>
                  <div>
                    <p class="text-sm font-semibold">{{ c.name }}</p>
                    <p class="text-xs" style="color:var(--muted)">{{ c.id }} · {{ c.age }}y/o, {{ c.sex }}</p>
                  </div>
                </div>
              </td>
              <td><span class="nm-cond-tag">{{ c.condition }}</span></td>
              <td class="text-sm">{{ c.rnd }}</td>
              <td class="text-sm whitespace-nowrap" style="color:var(--muted)">{{ c.lastVisit }}</td>
              <td class="text-center text-sm font-semibold">{{ c.sessions }}</td>
              <td>
                <span class="nm-badge" :class="{ 'badge-active':c.status==='Active', 'badge-pending':c.status==='Pending', 'badge-inactive':c.status==='Inactive' }">
                  {{ c.status }}
                </span>
              </td>
              <td>
                <div class="flex items-center justify-end gap-1">
                  <button class="nm-ic-btn"><EyeIcon class="w-4 h-4"/></button>
                  <button class="nm-ic-btn"><PencilSquareIcon class="w-4 h-4"/></button>
                  <button class="nm-ic-btn danger"><TrashIcon class="w-4 h-4"/></button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="px-5 py-3.5 border-t flex items-center justify-between" style="border-color:var(--border)">
        <p class="text-xs" style="color:var(--muted)">
          Showing <strong style="color:var(--text)">{{ filtered.length }}</strong> of
          <strong style="color:var(--text)">{{ clients.length }}</strong> clients
        </p>
        <div class="flex gap-1">
          <button v-for="p in 5" :key="p" class="nm-pg-btn" :class="{ 'nm-pg-active': p === 1 }">{{ p }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MagnifyingGlassIcon, PlusIcon, ArrowDownTrayIcon, EyeIcon, PencilSquareIcon, TrashIcon } from '@heroicons/vue/24/outline'

definePageMeta({ layout: 'admin' })

const q = ref('')
const filterCond = ref('')
const conditions = ['Diabetes','Hypertension','Renal Disease','Obesity','Cardiovascular','Oncology']

const clientStats = [
  { label:'Total Clients',  value:'384', color:'var(--teal-700)' },
  { label:'Active',         value:'291', color:'#059669' },
  { label:'New This Month', value:'41',  color:'#d97706' },
  { label:'Discharged',     value:'52',  color:'#6b7280' },
]

const clients = [
  { id:'NM-00124', name:'Rosa Dela Cruz',  initials:'RD', color:'#7c3aed', age:52, sex:'F', condition:'Diabetes',      rnd:'M. Santos, RND', lastVisit:'Mar 13, 2025', sessions:12, status:'Active' },
  { id:'NM-00118', name:'Benito Flores',   initials:'BF', color:'#0891b2', age:67, sex:'M', condition:'Hypertension',  rnd:'A. Lim, RND',    lastVisit:'Mar 13, 2025', sessions:8,  status:'Active' },
  { id:'NM-00131', name:'Grace Tan',       initials:'GT', color:'#059669', age:38, sex:'F', condition:'Obesity',       rnd:'S. Cruz, RND',   lastVisit:'Mar 10, 2025', sessions:5,  status:'Active' },
  { id:'NM-00109', name:'Ramon Aquino',    initials:'RA', color:'#d97706', age:61, sex:'M', condition:'Renal Disease', rnd:'J. Reyes, RND',  lastVisit:'Mar 12, 2025', sessions:20, status:'Active' },
  { id:'NM-00139', name:'Luz Bautista',    initials:'LB', color:'#dc2626', age:45, sex:'F', condition:'Diabetes',      rnd:'M. Santos, RND', lastVisit:'Mar 8, 2025',  sessions:7,  status:'Pending' },
  { id:'NM-00101', name:'Edgar Navarro',   initials:'EN', color:'#0d6b6b', age:73, sex:'M', condition:'Cardiovascular',rnd:'A. Lim, RND',    lastVisit:'Feb 28, 2025', sessions:15, status:'Inactive' },
  { id:'NM-00147', name:'Maricel Santos',  initials:'MS', color:'#ea580c', age:29, sex:'F', condition:'Obesity',       rnd:'S. Cruz, RND',   lastVisit:'Mar 14, 2025', sessions:3,  status:'Active' },
  { id:'NM-00155', name:'Dante Reyes',     initials:'DR', color:'#7c3aed', age:58, sex:'M', condition:'Hypertension',  rnd:'A. Lim, RND',    lastVisit:'Mar 11, 2025', sessions:6,  status:'Active' },
]

const filtered = computed(() => {
  let list = clients
  if (filterCond.value) list = list.filter(c => c.condition === filterCond.value)
  if (q.value.trim()) {
    const s = q.value.toLowerCase()
    list = list.filter(c => c.name.toLowerCase().includes(s) || c.id.toLowerCase().includes(s) || c.condition.toLowerCase().includes(s))
  }
  return list
})
</script>

<style scoped>
.nm-cond-tag { display:inline-block; background:var(--teal-100); color:var(--teal-700); font-size:.7rem; font-weight:600; padding:.2rem .55rem; border-radius:6px; }

.nm-pg-btn {
  width:30px; height:30px; display:flex; align-items:center; justify-content:center;
  border-radius:6px; border:1.5px solid var(--border);
  background:transparent; font-size:.78rem; color:var(--muted); cursor:pointer; transition:all .15s;
}
.nm-pg-btn:hover { border-color:var(--teal-400); color:var(--teal-700); }
.nm-pg-active { background:var(--teal-700); border-color:var(--teal-700); color:#fff; }
</style>
