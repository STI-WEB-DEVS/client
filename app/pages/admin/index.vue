<template>
  <div>
    <!-- ── Greeting banner ─────────────────────────────── -->
    <div class="nm-greeting-banner mb-6">
      <div>
        <h2 class="font-display text-white text-2xl font-bold leading-tight">
          Good {{ timeOfDay }}, System Admin 👋
        </h2>
        <p class="text-nm-teal-light/70 text-sm font-body mt-0.5">
          Here's what's happening on NutriMatch today — {{ todayDate }}
        </p>
      </div>
      <button class="nm-btn-amber text-sm hidden sm:flex">
        <PlusIcon class="w-4 h-4" /> New Consultation
      </button>
    </div>

    <!-- ── Stat Cards ─────────────────────────────────── -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <AdminStatCard
        label="Total Clients"
        value="384"
        :icon="UserGroupIcon"
        icon-bg="rgba(13,107,107,0.10)"
        icon-color="#0d6b6b"
        :change="12"
        subtext="↑ 41 new this month"
      />
      <AdminStatCard
        label="Active RNDs"
        value="5"
        :icon="IdentificationIcon"
        icon-bg="rgba(217,119,6,0.10)"
        icon-color="#d97706"
        :change="0"
        subtext="1 pending verification"
      />
      <AdminStatCard
        label="Consultations"
        value="1,248"
        :icon="ClipboardDocumentListIcon"
        icon-bg="rgba(124,58,237,0.10)"
        icon-color="#7c3aed"
        :change="8"
        subtext="218 this month"
      />
      <AdminStatCard
        label="Platform Revenue"
        value="₱48,200"
        :icon="BanknotesIcon"
        icon-bg="rgba(5,150,105,0.10)"
        icon-color="#059669"
        :change="15"
        subtext="Commissions this month"
      />
    </div>

    <!-- ── Main grid ──────────────────────────────────── -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">

      <!-- Recent Consultations table (2/3 width) -->
      <div class="lg:col-span-2 nm-card">
        <div class="nm-card-header">
          <div>
            <h3 class="nm-card-title">Recent Consultations</h3>
            <p class="nm-card-sub">Latest MNT session activity across all dietitians</p>
          </div>
          <NuxtLink to="/admin/clients" class="nm-btn-ghost text-xs">View all</NuxtLink>
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
              <tr v-for="c in recentConsultations" :key="c.id">
                <td>
                  <div class="flex items-center gap-2">
                    <div class="nm-mini-avatar" :style="{ background: c.avatarColor }">
                      {{ c.patientInitials }}
                    </div>
                    <div>
                      <p class="text-sm font-semibold text-nm-text font-body">{{ c.patient }}</p>
                      <p class="text-xs text-nm-muted font-body">{{ c.patientId }}</p>
                    </div>
                  </div>
                </td>
                <td class="text-sm text-nm-text font-body">{{ c.dietitian }}</td>
                <td>
                  <span class="nm-condition-tag">{{ c.condition }}</span>
                </td>
                <td class="text-sm text-nm-muted font-body whitespace-nowrap">{{ c.date }}</td>
                <td>
                  <span
                    class="nm-badge"
                    :class="{
                      'nm-badge-active': c.status === 'Completed',
                      'nm-badge-pending': c.status === 'Scheduled',
                      'nm-badge-leave': c.status === 'Cancelled',
                    }"
                  >
                    {{ c.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Right column -->
      <div class="flex flex-col gap-5">

        <!-- Platform Health -->
        <div class="nm-card p-5">
          <h3 class="nm-card-title mb-4">Platform Health</h3>
          <div class="space-y-3">
            <div v-for="metric in platformMetrics" :key="metric.label">
              <div class="flex justify-between text-sm font-body mb-1">
                <span class="text-nm-text font-medium">{{ metric.label }}</span>
                <span class="font-bold" :style="{ color: metric.color }">{{ metric.value }}</span>
              </div>
              <div class="nm-progress-track">
                <div
                  class="nm-progress-fill"
                  :style="{ width: metric.pct + '%', background: metric.color }"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="nm-card p-5">
          <h3 class="nm-card-title mb-3">Quick Actions</h3>
          <div class="grid grid-cols-2 gap-2">
            <NuxtLink
              v-for="action in quickActions"
              :key="action.label"
              :to="action.to"
              class="nm-quick-action"
            >
              <component :is="action.icon" class="w-5 h-5" :style="{ color: action.color }" />
              <span class="text-xs font-body font-semibold text-nm-text leading-tight">{{ action.label }}</span>
            </NuxtLink>
          </div>
        </div>

        <!-- Pending Verifications -->
        <div class="nm-card p-5">
          <div class="flex items-center justify-between mb-3">
            <h3 class="nm-card-title">Pending Verifications</h3>
            <span class="nm-badge nm-badge-pending">1 new</span>
          </div>
          <div class="flex items-center gap-3 p-3 bg-nm-amber-light rounded-lg border border-amber-200">
            <div class="nm-mini-avatar" style="background: #ea580c; width:36px; height:36px;">MT</div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-semibold text-nm-text font-body">Miguel Torres, RND</p>
              <p class="text-xs text-nm-muted font-body">Sports Nutrition · PRC-RND-00901</p>
            </div>
            <NuxtLink to="/admin/dietitians" class="nm-btn-amber text-xs py-1.5 px-2.5">
              Review
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  UserGroupIcon,
  IdentificationIcon,
  ClipboardDocumentListIcon,
  BanknotesIcon,
  PlusIcon,
  UsersIcon,
  Cog6ToothIcon,
  ChartBarIcon,
  DocumentTextIcon,
} from '@heroicons/vue/24/outline'

definePageMeta({ layout: 'admin' })

/* ── Time greeting ─────────────────────────────────────── */
const hour = new Date().getHours()
const timeOfDay = hour < 12 ? 'morning' : hour < 18 ? 'afternoon' : 'evening'
const todayDate = new Date().toLocaleDateString('en-PH', {
  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
})

/* ── Mock Data ─────────────────────────────────────────── */
const recentConsultations = [
  { id: 1, patient: 'Rosa Dela Cruz', patientId: 'NM-00124', patientInitials: 'RD', avatarColor: '#7c3aed', dietitian: 'M. Santos', condition: 'Diabetes', date: 'Mar 13, 2025', status: 'Completed' },
  { id: 2, patient: 'Benito Flores', patientId: 'NM-00118', patientInitials: 'BF', avatarColor: '#0891b2', dietitian: 'A. Lim', condition: 'Hypertension', date: 'Mar 13, 2025', status: 'Completed' },
  { id: 3, patient: 'Grace Tan', patientId: 'NM-00131', patientInitials: 'GT', avatarColor: '#059669', dietitian: 'S. Cruz', condition: 'Obesity', date: 'Mar 14, 2025', status: 'Scheduled' },
  { id: 4, patient: 'Ramon Aquino', patientId: 'NM-00109', patientInitials: 'RA', avatarColor: '#d97706', dietitian: 'J. Reyes', condition: 'Renal Disease', date: 'Mar 12, 2025', status: 'Completed' },
  { id: 5, patient: 'Luz Bautista', patientId: 'NM-00139', patientInitials: 'LB', avatarColor: '#dc2626', dietitian: 'M. Santos', condition: 'Diabetes', date: 'Mar 14, 2025', status: 'Cancelled' },
]

const platformMetrics = [
  { label: 'RND Utilization',   value: '71%',  pct: 71,  color: '#0d6b6b' },
  { label: 'Client Retention',  value: '88%',  pct: 88,  color: '#059669' },
  { label: 'Appointment Fill',  value: '65%',  pct: 65,  color: '#d97706' },
  { label: 'Payment Success',   value: '96%',  pct: 96,  color: '#7c3aed' },
]

const quickActions = [
  { label: 'Manage Team',       to: '/admin/team',       icon: UsersIcon,             color: '#0d6b6b' },
  { label: 'View Clients',      to: '/admin/clients',    icon: UserGroupIcon,         color: '#d97706' },
  { label: 'Reports',           to: '/admin/settings',   icon: ChartBarIcon,          color: '#7c3aed' },
  { label: 'System Logs',       to: '/admin/settings',   icon: DocumentTextIcon,      color: '#059669' },
]
</script>

<style scoped>
.nm-greeting-banner {
  background: linear-gradient(120deg, var(--nm-teal-dark) 0%, var(--nm-teal) 100%);
  border-radius: 14px;
  padding: 1.5rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nm-card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 1.25rem 1.25rem 0.75rem;
}

.nm-card-title {
  font-family: 'Playfair Display', serif;
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--nm-text);
}

.nm-card-sub {
  font-family: 'Source Sans 3', sans-serif;
  font-size: 0.78rem;
  color: var(--nm-text-muted);
  margin-top: 0.1rem;
}

.nm-mini-avatar {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 0.65rem;
  font-weight: 700;
  font-family: 'Source Sans 3', sans-serif;
  flex-shrink: 0;
}

.nm-condition-tag {
  display: inline-block;
  background: var(--nm-teal-pale);
  color: var(--nm-teal);
  font-size: 0.72rem;
  font-weight: 600;
  padding: 0.2rem 0.55rem;
  border-radius: 6px;
  font-family: 'Source Sans 3', sans-serif;
}

.nm-progress-track {
  height: 6px;
  background: var(--nm-cream-dark);
  border-radius: 99px;
  overflow: hidden;
}
.nm-progress-fill {
  height: 100%;
  border-radius: 99px;
  transition: width 0.6s ease;
}

.nm-quick-action {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 0.9rem 0.5rem;
  border-radius: 10px;
  border: 1.5px solid var(--nm-border);
  background: var(--nm-cream);
  text-decoration: none;
  transition: all 0.18s ease;
  text-align: center;
}
.nm-quick-action:hover {
  border-color: var(--nm-teal-light);
  background: var(--nm-teal-pale);
  transform: translateY(-1px);
}
</style>
