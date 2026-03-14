<template>
  <div>
    <!-- Greeting banner -->
    <div class="nm-banner mb-6">
      <div>
        <h2 class="font-display text-white text-2xl font-bold">Good {{ greeting }}, System Admin 👋</h2>
        <p class="text-teal-400/65 text-sm mt-0.5">Here's what's happening on NutriMatch today.</p>
      </div>
      <NuxtLink to="/teams" class="nm-btn nm-btn-amber text-sm hidden sm:flex">
        <PlusIcon class="w-4 h-4"/> Manage Team
      </NuxtLink>
    </div>

    <!-- Stat cards -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div v-for="s in stats" :key="s.label" class="nm-card p-5">
        <div class="flex items-start justify-between mb-3">
          <div class="nm-stat-icon" :style="{ background: s.iconBg }">
            <component :is="s.icon" class="w-5 h-5" :style="{ color: s.iconColor }"/>
          </div>
          <span class="text-[.7rem] font-bold px-2 py-0.5 rounded-full"
                :style="{ background: s.changeBg, color: s.changeColor }">
            ↑ {{ s.change }}%
          </span>
        </div>
        <p class="nm-stat-val">{{ s.value }}</p>
        <p class="nm-stat-lbl">{{ s.label }}</p>
        <p class="text-xs mt-2 pt-2 border-t" style="border-color:var(--border); color:var(--muted)">{{ s.sub }}</p>
      </div>
    </div>

    <!-- Main grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">

      <!-- Recent consultations (2/3) -->
      <div class="lg:col-span-2 nm-card">
        <div class="nm-card-hd">
          <div>
            <p class="nm-sec-title">Recent Consultations</p>
            <p class="text-xs mt-0.5" style="color:var(--muted)">Latest MNT session activity</p>
          </div>
          <NuxtLink to="/clients" class="nm-btn nm-btn-ghost text-xs">View all</NuxtLink>
        </div>
        <div class="overflow-x-auto">
          <table class="nm-table">
            <thead>
              <tr>
                <th>Patient</th>
                <th>Dietitian</th>
                <th>Condition</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="c in consultations" :key="c.id">
                <td>
                  <div class="flex items-center gap-2">
                    <div class="nm-avatar w-8 h-8 text-[.65rem]" :style="{ background: c.color }">{{ c.initials }}</div>
                    <div>
                      <p class="text-sm font-semibold">{{ c.patient }}</p>
                      <p class="text-xs" style="color:var(--muted)">{{ c.pid }}</p>
                    </div>
                  </div>
                </td>
                <td class="text-sm">{{ c.rnd }}</td>
                <td><span class="nm-cond-tag">{{ c.condition }}</span></td>
                <td class="text-sm whitespace-nowrap" style="color:var(--muted)">{{ c.date }}</td>
                <td>
                  <span class="nm-badge" :class="statusBadge(c.status)">{{ c.status }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Right column -->
      <div class="space-y-5">

        <!-- Platform health -->
        <div class="nm-card p-5">
          <p class="nm-sec-title mb-4">Platform Health</p>
          <div class="space-y-3">
            <div v-for="m in health" :key="m.label">
              <div class="flex justify-between text-sm mb-1">
                <span class="font-medium">{{ m.label }}</span>
                <span class="font-bold" :style="{ color: m.color }">{{ m.val }}</span>
              </div>
              <div class="nm-track">
                <div class="nm-fill" :style="{ width: m.pct + '%', background: m.color }"/>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick links -->
        <div class="nm-card p-5">
          <p class="nm-sec-title mb-3">Quick Links</p>
          <div class="grid grid-cols-2 gap-2">
            <NuxtLink
              v-for="q in quickLinks"
              :key="q.label"
              :to="q.to"
              class="nm-quick-link"
            >
              <component :is="q.icon" class="w-5 h-5" :style="{ color: q.color }"/>
              <span class="text-xs font-semibold leading-tight text-center">{{ q.label }}</span>
            </NuxtLink>
          </div>
        </div>

        <!-- Pending verification alert -->
        <div class="nm-card p-5">
          <div class="flex items-center justify-between mb-3">
            <p class="nm-sec-title">Pending Verification</p>
            <span class="nm-badge badge-pending">1 new</span>
          </div>
          <div class="flex items-center gap-3 p-3 rounded-lg" style="background:var(--amber-lt); border:1px solid #fde68a">
            <div class="nm-avatar w-9 h-9 text-[.7rem]" style="background:#ea580c">MT</div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-semibold">Miguel Torres, RND</p>
              <p class="text-xs" style="color:var(--muted)">Sports Nutrition · PRC-RND-00901</p>
            </div>
            <NuxtLink to="/dietitians" class="nm-btn nm-btn-amber text-xs py-1.5 px-2.5">Review</NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  UserGroupIcon, IdentificationIcon, ClipboardDocumentListIcon,
  BanknotesIcon, PlusIcon, UsersIcon, ChartBarIcon, DocumentTextIcon,
} from '@heroicons/vue/24/outline'

definePageMeta({ layout: 'admin' })

const hour = new Date().getHours()
const greeting = hour < 12 ? 'morning' : hour < 18 ? 'afternoon' : 'evening'

const stats = [
  { label: 'Total Clients',     value: '384',     icon: UserGroupIcon,             iconBg: 'rgba(13,107,107,.10)',  iconColor: '#0d6b6b', change: 12, sub: '41 new this month',      changeBg: '#d1fae5', changeColor: '#065f46' },
  { label: 'Active RNDs',       value: '5',        icon: IdentificationIcon,        iconBg: 'rgba(217,119,6,.10)',   iconColor: '#d97706', change: 0,  sub: '1 pending verification', changeBg: '#fef3c7', changeColor: '#92400e' },
  { label: 'Consultations',     value: '1,248',    icon: ClipboardDocumentListIcon, iconBg: 'rgba(124,58,237,.10)', iconColor: '#7c3aed', change: 8,  sub: '218 this month',         changeBg: '#ede9fe', changeColor: '#6d28d9' },
  { label: 'Platform Revenue',  value: '₱48,200',  icon: BanknotesIcon,             iconBg: 'rgba(5,150,105,.10)',  iconColor: '#059669', change: 15, sub: 'Commissions this month',  changeBg: '#d1fae5', changeColor: '#065f46' },
]

const consultations = [
  { id:1, patient:'Rosa Dela Cruz',   pid:'NM-00124', initials:'RD', color:'#7c3aed', rnd:'M. Santos', condition:'Diabetes',     date:'Mar 13, 2025', status:'Completed' },
  { id:2, patient:'Benito Flores',    pid:'NM-00118', initials:'BF', color:'#0891b2', rnd:'A. Lim',    condition:'Hypertension', date:'Mar 13, 2025', status:'Completed' },
  { id:3, patient:'Grace Tan',        pid:'NM-00131', initials:'GT', color:'#059669', rnd:'S. Cruz',   condition:'Obesity',      date:'Mar 14, 2025', status:'Scheduled' },
  { id:4, patient:'Ramon Aquino',     pid:'NM-00109', initials:'RA', color:'#d97706', rnd:'J. Reyes',  condition:'Renal Disease',date:'Mar 12, 2025', status:'Completed' },
  { id:5, patient:'Luz Bautista',     pid:'NM-00139', initials:'LB', color:'#dc2626', rnd:'M. Santos', condition:'Diabetes',     date:'Mar 14, 2025', status:'Cancelled' },
]

const health = [
  { label:'RND Utilization',  val:'71%', pct:71, color:'#0d6b6b' },
  { label:'Client Retention', val:'88%', pct:88, color:'#059669' },
  { label:'Appointment Fill', val:'65%', pct:65, color:'#d97706' },
  { label:'Payment Success',  val:'96%', pct:96, color:'#7c3aed' },
]

const quickLinks = [
  { label:'Manage Team',    to:'/teams',      icon:UsersIcon,              color:'#0d6b6b' },
  { label:'View Clients',   to:'/clients',    icon:UserGroupIcon,          color:'#d97706' },
  { label:'Dietitians',     to:'/dietitians', icon:IdentificationIcon,     color:'#7c3aed' },
  { label:'Settings',       to:'/settings',   icon:ChartBarIcon,           color:'#059669' },
]

function statusBadge(s: string) {
  return { Completed:'badge-active', Scheduled:'badge-pending', Cancelled:'badge-leave' }[s] ?? ''
}
</script>

<style scoped>
.nm-banner {
  background: linear-gradient(115deg, #083534 0%, #0d6b6b 100%);
  border-radius: 14px; padding: 1.5rem 2rem;
  display: flex; align-items: center; justify-content: space-between;
}
.nm-cond-tag {
  display: inline-block;
  background: var(--teal-100); color: var(--teal-700);
  font-size: .7rem; font-weight: 600;
  padding: .2rem .55rem; border-radius: 6px;
}
.nm-quick-link {
  display: flex; flex-direction: column; align-items: center; gap: .45rem;
  padding: .85rem .5rem; border-radius: 10px;
  border: 1.5px solid var(--border); background: var(--cream);
  text-decoration: none; transition: all .16s;
  color: var(--text);
}
.nm-quick-link:hover { border-color: var(--teal-400); background: var(--teal-50); transform: translateY(-1px); }
</style>
