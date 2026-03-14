<template>
  <div>
    <!-- Toolbar -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
      <div class="nm-tabs">
        <button
          v-for="t in tabs" :key="t.val"
          class="nm-tab" :class="{ active: activeTab === t.val }"
          @click="activeTab = t.val"
        >
          {{ t.label }}
          <span class="nm-tab-cnt">{{ t.count }}</span>
        </button>
      </div>
      <div class="flex items-center gap-2">
        <div class="relative">
          <MagnifyingGlassIcon class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style="color:var(--muted)"/>
          <input v-model="q" type="text" placeholder="Search RNDs…" class="nm-input pl-9 py-2 text-sm w-52"/>
        </div>
        <button class="nm-btn nm-btn-primary text-sm">
          <PlusIcon class="w-4 h-4"/> Register RND
        </button>
      </div>
    </div>

    <!-- Pending alert banner -->
    <div v-if="pendingCount > 0" class="flex items-center gap-3 px-4 py-3 rounded-xl mb-5"
         style="background:var(--amber-lt); border:1px solid #fde68a">
      <ShieldExclamationIcon class="w-5 h-5 flex-shrink-0" style="color:#d97706"/>
      <p class="text-sm">
        <strong>{{ pendingCount }} RND{{ pendingCount > 1 ? 's' : '' }}</strong>
        pending PRC license verification. Verify credentials before granting access.
      </p>
      <button class="nm-btn nm-btn-amber text-xs py-1.5 px-3 flex-shrink-0 ml-auto">Review Now</button>
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
              <th>Mode</th>
              <th>Patients</th>
              <th>Rating</th>
              <th>Joined</th>
              <th>Status</th>
              <th class="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="m in filtered" :key="m.id">
              <td>
                <div class="flex items-center gap-3">
                  <div
                    class="nm-avatar w-10 h-10 text-[.8rem]"
                    :style="{ background: `linear-gradient(135deg, ${m.color}, ${m.color}99)` }"
                  >{{ m.initials }}</div>
                  <div>
                    <p class="text-sm font-semibold">{{ m.name }}</p>
                    <p class="text-xs truncate max-w-[160px]" style="color:var(--muted)">{{ m.email }}</p>
                  </div>
                </div>
              </td>
              <td>
                <span class="nm-spec-tag">{{ m.specialty }}</span>
              </td>
              <td>
                <div class="flex items-center gap-1.5">
                  <span class="text-xs font-mono font-bold">{{ m.prcLicense }}</span>
                  <CheckBadgeIcon v-if="m.status === 'active'" class="w-3.5 h-3.5" style="color:var(--teal-700)"/>
                </div>
              </td>
              <td>
                <span class="nm-badge" :class="modeBadge(m.consultationType)">{{ modeLabel(m.consultationType) }}</span>
              </td>
              <td class="text-center">
                <span class="font-display font-bold text-sm">{{ m.patients }}</span>
              </td>
              <td>
                <div class="flex items-center gap-1">
                  <StarIcon class="w-3.5 h-3.5" style="color:#d97706"/>
                  <span class="text-sm font-semibold">{{ m.rating > 0 ? m.rating.toFixed(1) : '—' }}</span>
                </div>
              </td>
              <td class="text-sm whitespace-nowrap" style="color:var(--muted)">{{ m.joinDate }}</td>
              <td>
                <span class="nm-badge" :class="statusBadge(m.status)">{{ statusLabel(m.status) }}</span>
              </td>
              <td>
                <div class="flex items-center justify-end gap-1.5">
                  <button v-if="m.status === 'pending'" class="nm-btn nm-btn-amber text-xs py-1 px-2.5">Verify</button>
                  <button class="nm-ic-btn"><EyeIcon class="w-4 h-4"/></button>
                  <button class="nm-ic-btn danger"><TrashIcon class="w-4 h-4"/></button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Footer -->
      <div class="px-5 py-3 border-t flex items-center justify-between" style="border-color:var(--border)">
        <p class="text-xs" style="color:var(--muted)">
          {{ filtered.length }} of {{ TEAM_MEMBERS.length }} registered dietitians
        </p>
        <div class="flex items-center gap-4 text-xs" style="color:var(--muted)">
          <span class="flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-emerald-400 inline-block"/> Active: <strong style="color:var(--text)">{{ TEAM_MEMBERS.filter(m=>m.status==='active').length }}</strong>
          </span>
          <span class="flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-amber-400 inline-block"/> Pending: <strong style="color:var(--text)">{{ pendingCount }}</strong>
          </span>
          <span class="flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-red-400 inline-block"/> On Leave: <strong style="color:var(--text)">{{ TEAM_MEMBERS.filter(m=>m.status==='on-leave').length }}</strong>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MagnifyingGlassIcon, PlusIcon, ShieldExclamationIcon, CheckBadgeIcon, StarIcon, EyeIcon, TrashIcon } from '@heroicons/vue/24/outline'
import { TEAM_MEMBERS } from '~/data/TeamService'

definePageMeta({ layout: 'admin' })

const q = ref('')
const activeTab = ref('all')
const pendingCount = computed(() => TEAM_MEMBERS.filter(m => m.status === 'pending').length)

const tabs = computed(() => [
  { val:'all',      label:'All',      count: TEAM_MEMBERS.length },
  { val:'active',   label:'Verified', count: TEAM_MEMBERS.filter(m=>m.status==='active').length },
  { val:'pending',  label:'Pending',  count: pendingCount.value },
  { val:'on-leave', label:'On Leave', count: TEAM_MEMBERS.filter(m=>m.status==='on-leave').length },
])

const filtered = computed(() => {
  let list = TEAM_MEMBERS
  if (activeTab.value !== 'all') list = list.filter(m => m.status === activeTab.value)
  if (q.value.trim()) {
    const s = q.value.toLowerCase()
    list = list.filter(m => m.name.toLowerCase().includes(s) || m.specialty.toLowerCase().includes(s) || m.prcLicense.toLowerCase().includes(s))
  }
  return list
})

function statusLabel(s: string) { return { active:'Verified', pending:'Pending', 'on-leave':'On Leave' }[s] ?? s }
function modeLabel(s: string)   { return { online:'Online', 'in-person':'In-Person', both:'Hybrid' }[s] ?? s }
function statusBadge(s: string) { return { active:'badge-verified', pending:'badge-pending', 'on-leave':'badge-leave' }[s] ?? '' }
function modeBadge(s: string)   { return { online:'badge-online', 'in-person':'badge-inactive', both:'badge-hybrid' }[s] ?? '' }
</script>

<style scoped>
.nm-spec-tag {
  display: inline-block;
  background: var(--teal-50); color: var(--teal-700);
  font-size: .7rem; font-weight: 600;
  padding: .25rem .55rem; border-radius: 6px;
  max-width: 160px; white-space: normal; line-height: 1.3;
}
</style>
