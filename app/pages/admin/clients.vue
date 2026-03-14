<template>
  <div>
    <!-- Stats row -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
      <div v-for="s in clientStats" :key="s.label" class="nm-mini-stat-card">
        <p class="nm-mini-stat-val" :style="{ color: s.color }">{{ s.value }}</p>
        <p class="nm-mini-stat-lbl">{{ s.label }}</p>
      </div>
    </div>

    <!-- Table card -->
    <div class="nm-card">
      <!-- Toolbar -->
      <div class="px-5 py-4 border-b border-nm-border flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="relative">
            <MagnifyingGlassIcon class="w-4 h-4 text-nm-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search clients…"
              class="nm-input pl-9 py-2 text-sm w-56"
            />
          </div>
          <select v-model="filterCondition" class="nm-input py-2 text-sm w-40">
            <option value="">All Conditions</option>
            <option v-for="c in conditions" :key="c" :value="c">{{ c }}</option>
          </select>
        </div>
        <div class="flex items-center gap-2">
          <button class="nm-btn-ghost text-sm">
            <ArrowDownTrayIcon class="w-4 h-4" /> Export
          </button>
          <button class="nm-btn-primary text-sm">
            <PlusIcon class="w-4 h-4" /> Add Client
          </button>
        </div>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="nm-table">
          <thead>
            <tr>
              <th>
                <input type="checkbox" class="nm-checkbox" @change="toggleAll" />
              </th>
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
            <tr v-for="client in filteredClients" :key="client.id">
              <td><input type="checkbox" class="nm-checkbox" /></td>
              <td>
                <div class="flex items-center gap-3">
                  <div class="nm-mini-avatar-sm" :style="{ background: client.avatarColor }">
                    {{ client.initials }}
                  </div>
                  <div>
                    <p class="text-sm font-semibold text-nm-text font-body">{{ client.name }}</p>
                    <p class="text-xs text-nm-muted font-body">{{ client.id }} · {{ client.age }}y/o, {{ client.sex }}</p>
                  </div>
                </div>
              </td>
              <td>
                <span class="nm-condition-pill">{{ client.condition }}</span>
              </td>
              <td class="text-sm font-body text-nm-text">{{ client.rnd }}</td>
              <td class="text-sm font-body text-nm-muted whitespace-nowrap">{{ client.lastVisit }}</td>
              <td class="text-sm font-body text-nm-text text-center">{{ client.sessions }}</td>
              <td>
                <span
                  class="nm-badge"
                  :class="{
                    'nm-badge-active': client.status === 'Active',
                    'nm-badge-pending': client.status === 'Pending',
                    'nm-badge-inactive': client.status === 'Inactive',
                  }"
                >{{ client.status }}</span>
              </td>
              <td class="text-right">
                <div class="flex items-center justify-end gap-1">
                  <button class="nm-icon-btn" title="View chart">
                    <ClipboardDocumentListIcon class="w-4 h-4" />
                  </button>
                  <button class="nm-icon-btn" title="Edit">
                    <PencilSquareIcon class="w-4 h-4" />
                  </button>
                  <button class="nm-icon-btn nm-icon-btn--danger" title="Remove">
                    <TrashIcon class="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="px-5 py-3.5 border-t border-nm-border flex items-center justify-between">
        <p class="text-xs text-nm-muted font-body">
          Showing <strong class="text-nm-text">{{ filteredClients.length }}</strong> of <strong class="text-nm-text">{{ clients.length }}</strong> clients
        </p>
        <div class="flex items-center gap-1">
          <button v-for="p in 5" :key="p" class="nm-page-btn" :class="{ 'nm-page-btn--active': p === 1 }">
            {{ p }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  MagnifyingGlassIcon,
  PlusIcon,
  ArrowDownTrayIcon,
  ClipboardDocumentListIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/vue/24/outline'

definePageMeta({ layout: 'admin' })

const searchQuery = ref('')
const filterCondition = ref('')

const conditions = ['Diabetes', 'Hypertension', 'Renal Disease', 'Obesity', 'Cardiovascular', 'Oncology']

const clientStats = [
  { label: 'Total Clients',   value: '384', color: 'var(--nm-teal)' },
  { label: 'Active',          value: '291', color: '#059669' },
  { label: 'New This Month',  value: '41',  color: '#d97706' },
  { label: 'Discharged',      value: '52',  color: '#6b7280' },
]

const clients = [
  { id: 'NM-00124', name: 'Rosa Dela Cruz',   initials: 'RD', avatarColor: '#7c3aed', age: 52, sex: 'F', condition: 'Diabetes',      rnd: 'M. Santos, RND', lastVisit: 'Mar 13, 2025', sessions: 12, status: 'Active' },
  { id: 'NM-00118', name: 'Benito Flores',    initials: 'BF', avatarColor: '#0891b2', age: 67, sex: 'M', condition: 'Hypertension',  rnd: 'A. Lim, RND',    lastVisit: 'Mar 13, 2025', sessions: 8,  status: 'Active' },
  { id: 'NM-00131', name: 'Grace Tan',        initials: 'GT', avatarColor: '#059669', age: 38, sex: 'F', condition: 'Obesity',       rnd: 'S. Cruz, RND',   lastVisit: 'Mar 10, 2025', sessions: 5,  status: 'Active' },
  { id: 'NM-00109', name: 'Ramon Aquino',     initials: 'RA', avatarColor: '#d97706', age: 61, sex: 'M', condition: 'Renal Disease', rnd: 'J. Reyes, RND',  lastVisit: 'Mar 12, 2025', sessions: 20, status: 'Active' },
  { id: 'NM-00139', name: 'Luz Bautista',     initials: 'LB', avatarColor: '#dc2626', age: 45, sex: 'F', condition: 'Diabetes',      rnd: 'M. Santos, RND', lastVisit: 'Mar 8, 2025',  sessions: 7,  status: 'Pending' },
  { id: 'NM-00101', name: 'Edgar Navarro',    initials: 'EN', avatarColor: '#0d6b6b', age: 73, sex: 'M', condition: 'Cardiovascular',rnd: 'A. Lim, RND',    lastVisit: 'Feb 28, 2025', sessions: 15, status: 'Inactive' },
  { id: 'NM-00147', name: 'Maricel Santos',   initials: 'MS', avatarColor: '#ea580c', age: 29, sex: 'F', condition: 'Obesity',       rnd: 'S. Cruz, RND',   lastVisit: 'Mar 14, 2025', sessions: 3,  status: 'Active' },
  { id: 'NM-00155', name: 'Dante Reyes',      initials: 'DR', avatarColor: '#7c3aed', age: 58, sex: 'M', condition: 'Hypertension',  rnd: 'A. Lim, RND',    lastVisit: 'Mar 11, 2025', sessions: 6,  status: 'Active' },
]

const filteredClients = computed(() => {
  let list = clients
  if (filterCondition.value) {
    list = list.filter(c => c.condition === filterCondition.value)
  }
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.id.toLowerCase().includes(q) ||
      c.condition.toLowerCase().includes(q)
    )
  }
  return list
})

function toggleAll() {}
</script>

<style scoped>
.nm-mini-stat-card {
  background: #fff;
  border: 1px solid var(--nm-border);
  border-radius: 10px;
  padding: 1rem 1.25rem;
}
.nm-mini-stat-val {
  font-family: 'Playfair Display', serif;
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 1.1;
}
.nm-mini-stat-lbl {
  font-family: 'Source Sans 3', sans-serif;
  font-size: 0.78rem;
  color: var(--nm-text-muted);
  font-weight: 500;
  margin-top: 0.15rem;
}

.nm-mini-avatar-sm {
  width: 36px; height: 36px;
  border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  color: #fff;
  font-size: 0.72rem;
  font-weight: 700;
  font-family: 'Source Sans 3', sans-serif;
  flex-shrink: 0;
}

.nm-condition-pill {
  display: inline-block;
  background: var(--nm-teal-pale);
  color: var(--nm-teal);
  font-size: 0.72rem;
  font-weight: 600;
  padding: 0.2rem 0.65rem;
  border-radius: 99px;
  font-family: 'Source Sans 3', sans-serif;
  white-space: nowrap;
}

.nm-icon-btn {
  width: 28px; height: 28px;
  display: flex; align-items: center; justify-content: center;
  border-radius: 6px;
  border: 1px solid var(--nm-border);
  background: transparent;
  color: var(--nm-text-muted);
  cursor: pointer;
  transition: all 0.18s;
}
.nm-icon-btn:hover { border-color: var(--nm-teal-light); color: var(--nm-teal); background: var(--nm-teal-pale); }
.nm-icon-btn--danger:hover { border-color: #fca5a5; color: #dc2626; background: #fef2f2; }

.nm-page-btn {
  width: 30px; height: 30px;
  display: flex; align-items: center; justify-content: center;
  border-radius: 6px;
  border: 1.5px solid var(--nm-border);
  background: transparent;
  font-family: 'Source Sans 3', sans-serif;
  font-size: 0.78rem;
  color: var(--nm-text-muted);
  cursor: pointer;
  transition: all 0.18s;
}
.nm-page-btn:hover { border-color: var(--nm-teal-light); color: var(--nm-teal); }
.nm-page-btn--active { background: var(--nm-teal); border-color: var(--nm-teal); color: #fff; }

.nm-checkbox { accent-color: var(--nm-teal); width: 14px; height: 14px; cursor: pointer; }
</style>
