<template>
  <div>
    <!-- Page header actions -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div class="flex items-center gap-3">
        <!-- Filter tabs -->
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
      </div>
      <div class="flex items-center gap-2">
        <div class="relative">
          <MagnifyingGlassIcon class="w-4 h-4 text-nm-muted absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search team…"
            class="nm-input pl-9 py-2 text-sm w-52"
          />
        </div>
        <button class="nm-btn-primary text-sm">
          <PlusIcon class="w-4 h-4" /> Add Member
        </button>
      </div>
    </div>

    <!-- Loading state -->
    <div v-if="loading" class="nm-card p-12 flex flex-col items-center gap-3">
      <svg class="animate-spin w-8 h-8 text-nm-teal" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
      </svg>
      <p class="text-nm-muted font-body text-sm">Loading team members…</p>
    </div>

    <!-- Team grid -->
    <div v-else-if="filteredMembers.length" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      <div
        v-for="member in filteredMembers"
        :key="member.id"
        class="nm-card nm-member-card"
      >
        <!-- Card top accent -->
        <div class="nm-member-accent" :style="{ background: member.color }" />

        <div class="p-5 pt-6">
          <!-- Avatar + status -->
          <div class="flex items-start justify-between mb-4">
            <div class="relative">
              <div
                class="nm-member-avatar"
                :style="{ background: `linear-gradient(135deg, ${member.color}, ${member.color}bb)` }"
              >
                {{ member.initials }}
              </div>
              <div
                class="nm-status-dot"
                :class="{
                  'nm-status-active': member.status === 'active',
                  'nm-status-leave': member.status === 'on-leave',
                  'nm-status-pending': member.status === 'pending',
                }"
              />
            </div>
            <span
              class="nm-badge mt-1"
              :class="{
                'nm-badge-active': member.status === 'active',
                'nm-badge-leave': member.status === 'on-leave',
                'nm-badge-pending': member.status === 'pending',
              }"
            >
              {{ statusLabel(member.status) }}
            </span>
          </div>

          <!-- Name + role -->
          <h3 class="font-display text-nm-text text-[1.05rem] font-semibold leading-tight">
            {{ member.name }}
          </h3>
          <p class="text-nm-muted text-xs font-body font-medium mt-0.5 mb-3">{{ member.role }}</p>

          <!-- Specialty tag -->
          <div class="inline-flex items-center gap-1.5 bg-nm-teal-pale px-2.5 py-1 rounded-lg mb-4">
            <BeakerIcon class="w-3 h-3 text-nm-teal" />
            <span class="text-nm-teal text-xs font-semibold font-body">{{ member.specialty }}</span>
          </div>

          <!-- Stats row -->
          <div class="grid grid-cols-3 gap-2 mb-4">
            <div class="nm-member-stat">
              <p class="nm-member-stat-val">{{ member.patients }}</p>
              <p class="nm-member-stat-lbl">Patients</p>
            </div>
            <div class="nm-member-stat">
              <p class="nm-member-stat-val">{{ member.rating > 0 ? member.rating.toFixed(1) : '—' }}</p>
              <p class="nm-member-stat-lbl">Rating</p>
            </div>
            <div class="nm-member-stat">
              <p class="nm-member-stat-val text-[0.75rem]">{{ consultLabel(member.consultationType) }}</p>
              <p class="nm-member-stat-lbl">Mode</p>
            </div>
          </div>

          <!-- License + email -->
          <div class="space-y-1.5 pb-4 border-b border-nm-border">
            <div class="flex items-center gap-2">
              <IdentificationIcon class="w-3.5 h-3.5 text-nm-muted flex-shrink-0" />
              <span class="text-xs font-body text-nm-muted">{{ member.prcLicense }}</span>
            </div>
            <div class="flex items-center gap-2">
              <EnvelopeIcon class="w-3.5 h-3.5 text-nm-muted flex-shrink-0" />
              <span class="text-xs font-body text-nm-muted truncate">{{ member.email }}</span>
            </div>
          </div>

          <!-- Languages -->
          <div class="flex flex-wrap gap-1.5 mt-3">
            <span
              v-for="lang in member.languages"
              :key="lang"
              class="text-[0.65rem] font-body font-semibold bg-nm-cream border border-nm-border text-nm-muted px-2 py-0.5 rounded-full"
            >
              {{ lang }}
            </span>
          </div>

          <!-- Actions -->
          <div class="flex gap-2 mt-4">
            <button class="nm-btn-ghost flex-1 text-xs py-1.5 justify-center">
              View Profile
            </button>
            <button
              v-if="member.status === 'pending'"
              class="nm-btn-amber flex-1 text-xs py-1.5 justify-center"
            >
              Verify RND
            </button>
            <button
              v-else
              class="nm-btn-ghost flex-1 text-xs py-1.5 justify-center"
            >
              Message
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty state -->
    <div v-else class="nm-card p-12 flex flex-col items-center gap-3 text-center">
      <UsersIcon class="w-12 h-12 text-nm-border" />
      <p class="font-display text-nm-text text-lg font-semibold">No members found</p>
      <p class="text-nm-muted text-sm font-body">Try adjusting your search or filters.</p>
    </div>

    <!-- Summary footer -->
    <div class="mt-4 flex items-center justify-between text-xs text-nm-muted font-body">
      <span>Showing <strong class="text-nm-text">{{ filteredMembers.length }}</strong> of <strong class="text-nm-text">{{ members.length }}</strong> team members</span>
      <span>Total patients served: <strong class="text-nm-teal">{{ totalPatients }}</strong></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  MagnifyingGlassIcon,
  PlusIcon,
  IdentificationIcon,
  EnvelopeIcon,
  BeakerIcon,
  UsersIcon,
} from '@heroicons/vue/24/outline'
import { TeamService, type TeamMember } from '~/../../api/TeamService'

definePageMeta({ layout: 'admin' })

const members = ref<TeamMember[]>([])
const loading = ref(true)
const searchQuery = ref('')
const activeTab = ref('all')

onMounted(async () => {
  members.value = await TeamService.getAll()
  loading.value = false
})

const tabs = computed(() => [
  { label: 'All',      value: 'all',      count: members.value.length },
  { label: 'Active',   value: 'active',   count: members.value.filter(m => m.status === 'active').length },
  { label: 'On Leave', value: 'on-leave', count: members.value.filter(m => m.status === 'on-leave').length },
  { label: 'Pending',  value: 'pending',  count: members.value.filter(m => m.status === 'pending').length },
])

const filteredMembers = computed(() => {
  let list = members.value
  if (activeTab.value !== 'all') {
    list = list.filter(m => m.status === activeTab.value)
  }
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(m =>
      m.name.toLowerCase().includes(q) ||
      m.specialty.toLowerCase().includes(q) ||
      m.role.toLowerCase().includes(q)
    )
  }
  return list
})

const totalPatients = computed(() => members.value.reduce((a, m) => a + m.patients, 0))

function statusLabel(status: string) {
  return { 'active': 'Active', 'on-leave': 'On Leave', 'pending': 'Pending' }[status] ?? status
}

function consultLabel(type: string) {
  return { 'online': 'Online', 'in-person': 'In-Person', 'both': 'Hybrid' }[type] ?? type
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

.nm-member-card { position: relative; overflow: hidden; }
.nm-member-accent {
  height: 4px;
  width: 100%;
  opacity: 0.8;
}

.nm-member-avatar {
  width: 56px;
  height: 56px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 1.1rem;
  font-weight: 700;
  font-family: 'Source Sans 3', sans-serif;
  letter-spacing: 0.03em;
}

.nm-status-dot {
  width: 12px; height: 12px;
  border-radius: 50%;
  border: 2.5px solid #fff;
  position: absolute; bottom: -2px; right: -2px;
}
.nm-status-active  { background: #10b981; }
.nm-status-leave   { background: #ef4444; }
.nm-status-pending { background: #f59e0b; }

.nm-member-stat {
  background: var(--nm-cream);
  border-radius: 8px;
  padding: 0.55rem 0.4rem;
  text-align: center;
}
.nm-member-stat-val {
  font-family: 'Playfair Display', serif;
  font-size: 1rem;
  font-weight: 700;
  color: var(--nm-text);
  line-height: 1.2;
}
.nm-member-stat-lbl {
  font-family: 'Source Sans 3', sans-serif;
  font-size: 0.62rem;
  color: var(--nm-text-muted);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-top: 0.1rem;
}
</style>
