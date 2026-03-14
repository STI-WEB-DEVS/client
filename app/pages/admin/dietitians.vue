<template>
  <div>
    <!-- Header tabs -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div class="nm-tab-group">
        <button
          v-for="tab in tabs"
          :key="tab.value"
          @click="activeTab = tab.value"
          class="nm-tab"
          :class="{ 'nm-tab--active': activeTab === tab.value }"
        >
          {{ tab.label }}
          <span class="nm-tab-count">{{ tab.count }}</span>
        </button>
      </div>
      <div class="flex gap-2">
        <div class="relative">
          <MagnifyingGlassIcon class="w-4 h-4 text-nm-muted absolute left-3 top-1/2 -translate-y-1/2" />
          <input v-model="searchQuery" type="text" placeholder="Search RNDs…" class="nm-input pl-9 py-2 text-sm w-52" />
        </div>
        <button class="nm-btn-primary text-sm">
          <PlusIcon class="w-4 h-4" /> Register RND
        </button>
      </div>
    </div>

    <!-- Pending verification banner -->
    <div v-if="pendingCount > 0" class="nm-alert-banner mb-5">
      <ShieldExclamationIcon class="w-5 h-5 text-nm-amber flex-shrink-0" />
      <p class="text-sm font-body text-nm-text">
        <strong>{{ pendingCount }} RND{{ pendingCount > 1 ? 's' : '' }}</strong> pending PRC license verification.
        Verify credentials before granting platform access.
      </p>
      <button class="ml-auto nm-btn-amber text-xs py-1.5 px-3 flex-shrink-0">Review Now</button>
    </div>

    <!-- Table -->
    <div class="nm-card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="nm-table">
          <thead>
            <tr>
              <th>Dietitian</th>
              <th>Specialty</th>
              <th>PRC License</th>
              <th>Consultation</th>
              <th>Patients</th>
              <th>Rating</th>
              <th>Status</th>
              <th class="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="rnd in filteredRNDs" :key="rnd.id" class="nm-dietitian-row">
              <td>
                <div class="flex items-center gap-3">
                  <div class="nm-rnd-avatar" :style="{ background: `linear-gradient(135deg, ${rnd.color}, ${rnd.color}99)` }">
                    {{ rnd.initials }}
                  </div>
                  <div>
                    <p class="text-sm font-semibold text-nm-text font-body">{{ rnd.name }}</p>
                    <p class="text-xs text-nm-muted font-body">{{ rnd.email }}</p>
                    <p class="text-xs text-nm-muted font-body">Joined {{ rnd.joinDate }}</p>
                  </div>
                </div>
              </td>
              <td>
                <span class="nm-specialty-pill">{{ rnd.specialty }}</span>
              </td>
              <td>
                <div class="flex items-center gap-1.5">
                  <span class="text-xs font-mono font-bold text-nm-text">{{ rnd.prcLicense }}</span>
                  <CheckBadgeIcon
                    v-if="rnd.status === 'active'"
                    class="w-3.5 h-3.5 text-nm-teal"
                  />
                </div>
              </td>
              <td>
                <span class="nm-mode-pill">{{ modeLabel(rnd.consultationType) }}</span>
              </td>
              <td class="text-center">
                <span class="font-display text-nm-text text-sm font-bold">{{ rnd.patients }}</span>
              </td>
              <td>
                <div class="flex items-center gap-1">
                  <StarIcon class="w-3.5 h-3.5 text-nm-amber" />
                  <span class="text-sm font-body font-semibold text-nm-text">
                    {{ rnd.rating > 0 ? rnd.rating.toFixed(1) : '—' }}
                  </span>
                </div>
              </td>
              <td>
                <span
                  class="nm-badge"
                  :class="{
                    'nm-badge-verified': rnd.status === 'active',
                    'nm-badge-pending': rnd.status === 'pending',
                    'nm-badge-leave': rnd.status === 'on-leave',
                  }"
                >
                  {{ statusLabel(rnd.status) }}
                </span>
              </td>
              <td>
                <div class="flex items-center justify-end gap-1.5">
                  <button
                    v-if="rnd.status === 'pending'"
                    class="nm-btn-amber text-xs py-1 px-2.5"
                  >
                    Verify
                  </button>
                  <button class="nm-icon-btn">
                    <EyeIcon class="w-4 h-4" />
                  </button>
                  <button class="nm-icon-btn nm-icon-btn--danger">
                    <TrashIcon class="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Footer -->
      <div class="px-5 py-3 border-t border-nm-border flex items-center justify-between">
        <p class="text-xs text-nm-muted font-body">
          {{ filteredRNDs.length }} of {{ allRNDs.length }} registered dietitians
        </p>
        <div class="flex items-center gap-3 text-xs font-body">
          <span class="flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-emerald-400 inline-block" /> Active: <strong>{{ activeCount }}</strong>
          </span>
          <span class="flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-amber-400 inline-block" /> Pending: <strong>{{ pendingCount }}</strong>
          </span>
          <span class="flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-red-400 inline-block" /> On Leave: <strong>{{ leaveCount }}</strong>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  MagnifyingGlassIcon,
  PlusIcon,
  ShieldExclamationIcon,
  CheckBadgeIcon,
  StarIcon,
  EyeIcon,
  TrashIcon,
} from '@heroicons/vue/24/outline'
import { TeamService, type TeamMember } from '~/../../api/TeamService'

definePageMeta({ layout: 'admin' })

const allRNDs = ref<TeamMember[]>([])
const loading = ref(true)
const searchQuery = ref('')
const activeTab = ref('all')

onMounted(async () => {
  allRNDs.value = await TeamService.getAll()
  loading.value = false
})

const activeCount  = computed(() => allRNDs.value.filter(r => r.status === 'active').length)
const pendingCount = computed(() => allRNDs.value.filter(r => r.status === 'pending').length)
const leaveCount   = computed(() => allRNDs.value.filter(r => r.status === 'on-leave').length)

const tabs = computed(() => [
  { label: 'All',      value: 'all',      count: allRNDs.value.length },
  { label: 'Verified', value: 'active',   count: activeCount.value },
  { label: 'Pending',  value: 'pending',  count: pendingCount.value },
  { label: 'On Leave', value: 'on-leave', count: leaveCount.value },
])

const filteredRNDs = computed(() => {
  let list = allRNDs.value
  if (activeTab.value !== 'all') list = list.filter(r => r.status === activeTab.value)
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(r =>
      r.name.toLowerCase().includes(q) ||
      r.specialty.toLowerCase().includes(q) ||
      r.prcLicense.toLowerCase().includes(q)
    )
  }
  return list
})

function statusLabel(s: string) {
  return { active: 'Verified', pending: 'Pending', 'on-leave': 'On Leave' }[s] ?? s
}
function modeLabel(m: string) {
  return { online: 'Online', 'in-person': 'In-Person', both: 'Hybrid' }[m] ?? m
}
</script>

<style scoped>
.nm-tab-group {
  display: flex;
  background: var(--nm-cream-dark);
  border-radius: 10px;
  padding: 3px;
  gap: 2px;
}
.nm-tab {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 0.85rem;
  border-radius: 8px;
  border: none;
  background: transparent;
  font-family: 'Source Sans 3', sans-serif;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--nm-text-muted);
  cursor: pointer;
  transition: all 0.18s ease;
}
.nm-tab:hover { color: var(--nm-text); }
.nm-tab--active { background: #fff; color: var(--nm-teal); box-shadow: 0 1px 3px rgba(0,0,0,0.08); }
.nm-tab-count {
  font-size: 0.65rem;
  background: var(--nm-cream);
  color: var(--nm-text-muted);
  padding: 0.1rem 0.45rem;
  border-radius: 99px;
  font-weight: 700;
}
.nm-tab--active .nm-tab-count { background: var(--nm-teal-pale); color: var(--nm-teal); }

.nm-alert-banner {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.9rem 1.25rem;
  background: var(--nm-amber-light);
  border: 1px solid #fde68a;
  border-radius: 12px;
}

.nm-rnd-avatar {
  width: 40px; height: 40px;
  border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  color: #fff;
  font-size: 0.8rem;
  font-weight: 700;
  font-family: 'Source Sans 3', sans-serif;
  flex-shrink: 0;
}

.nm-specialty-pill {
  display: inline-block;
  background: var(--nm-teal-pale);
  color: var(--nm-teal);
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.25rem 0.6rem;
  border-radius: 6px;
  font-family: 'Source Sans 3', sans-serif;
  max-width: 160px;
  white-space: normal;
  line-height: 1.3;
}

.nm-mode-pill {
  display: inline-block;
  background: #f3f4f6;
  color: #6b7280;
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.2rem 0.6rem;
  border-radius: 6px;
  font-family: 'Source Sans 3', sans-serif;
}

.nm-dietitian-row { transition: background 0.15s; }

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
</style>
