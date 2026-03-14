<template>
  <NuxtLayout>
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div>
        <h2 class="text-2xl font-bold text-slate-800">Appointments</h2>
        <p class="text-sm text-slate-500 mt-0.5">Schedule and manage fittings, consultations & pickups</p>
      </div>
      <button class="btn-amber">+ New Appointment</button>
    </div>

    <!-- Calendar strip -->
    <div class="card mb-6">
      <div class="flex items-center justify-between mb-4">
        <button class="cal-nav">‹ Prev</button>
        <h3 class="text-base font-bold text-slate-800">March 2026</h3>
        <button class="cal-nav">Next ›</button>
      </div>
      <div class="grid grid-cols-7 gap-1">
        <div v-for="d in dayLabels" :key="d" class="text-center text-xs font-semibold text-slate-400 py-1">{{ d }}</div>
        <div v-for="n in 31" :key="n"
          :class="['cal-day', n === 14 ? 'cal-today' : appointments.some(a => a.day === n) ? 'cal-has-event' : '']">
          {{ n }}
          <span v-if="appointments.some(a => a.day === n)" class="cal-dot"></span>
        </div>
      </div>
    </div>

    <!-- Appointments grouped by day -->
    <div class="space-y-6">
      <div v-for="group in groupedAppointments" :key="group.date">
        <div class="flex items-center gap-3 mb-3">
          <div class="day-badge">{{ group.day }}</div>
          <div>
            <p class="font-bold text-slate-800">{{ group.date }}</p>
            <p class="text-xs text-slate-400">{{ group.items.length }} appointment{{ group.items.length > 1 ? 's' : '' }}</p>
          </div>
        </div>
        <div class="grid gap-3">
          <div v-for="appt in group.items" :key="appt.id" class="appt-card">
            <div class="flex items-start justify-between">
              <div class="flex items-start gap-4">
                <div :class="['appt-type-icon', typeColor(appt.type)]">
                  <component :is="typeIcon(appt.type)" class="size-4" />
                </div>
                <div>
                  <p class="font-semibold text-slate-800">{{ appt.customer }}</p>
                  <p class="text-sm text-slate-500 mt-0.5">{{ appt.type }}</p>
                  <p class="text-xs text-slate-400 mt-1">📍 {{ appt.location }} &nbsp;·&nbsp; ⏰ {{ appt.time }}</p>
                </div>
              </div>
              <span :class="statusBadge(appt.status)">{{ appt.status }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ScissorsIcon, UserIcon, ArchiveBoxIcon } from '@heroicons/vue/24/outline'

const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const appointments = [
  { id: 1, customer: 'Maria Santos', type: 'Final Fitting', time: '9:00 AM', location: 'Shop', day: 14, date: 'Saturday, March 14', status: 'Confirmed' },
  { id: 2, customer: 'Ana Dela Cruz', type: 'Measurement', time: '11:00 AM', location: 'Shop', day: 14, date: 'Saturday, March 14', status: 'Confirmed' },
  { id: 3, customer: 'Carlo Mendoza', type: 'Order Pickup', time: '2:00 PM', location: 'Shop', day: 14, date: 'Saturday, March 14', status: 'Pending' },
  { id: 4, customer: 'Jose Reyes', type: 'Consultation', time: '10:00 AM', location: 'Shop', day: 16, date: 'Monday, March 16', status: 'Confirmed' },
  { id: 5, customer: 'Liza Villanueva', type: 'Final Fitting', time: '3:00 PM', location: 'Home Visit', day: 16, date: 'Monday, March 16', status: 'Pending' },
  { id: 6, customer: 'Pedro Garcia', type: 'Order Pickup', time: '9:30 AM', location: 'Shop', day: 17, date: 'Tuesday, March 17', status: 'Confirmed' },
]

const groupedAppointments = computed(() => {
  const groups: Record<string, any> = {}
  for (const a of appointments) {
    if (!groups[a.date]) groups[a.date] = { date: a.date, day: a.day, items: [] }
    groups[a.date].items.push(a)
  }
  return Object.values(groups)
})

const typeIcon = (t: string) => {
  if (t === 'Final Fitting' || t === 'Measurement') return ScissorsIcon
  if (t === 'Consultation') return UserIcon
  return ArchiveBoxIcon
}
const typeColor = (t: string) => {
  if (t === 'Final Fitting' || t === 'Measurement') return 'bg-amber-100 text-amber-600'
  if (t === 'Consultation') return 'bg-blue-100 text-blue-600'
  return 'bg-emerald-100 text-emerald-600'
}
const statusBadge = (s: string) => s === 'Confirmed' ? 'badge-green' : 'badge-yellow'
</script>

<style scoped>
.card { background: white; border-radius: 1rem; padding: 1.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.06); border: 1px solid rgba(15,23,42,0.06); }
.btn-amber { background: linear-gradient(135deg, #F59E0B, #D97706); color: #0F172A; font-weight: 700; font-size: 0.85rem; padding: 0.6rem 1.25rem; border-radius: 0.625rem; border: none; cursor: pointer; transition: all 0.15s; }
.btn-amber:hover { box-shadow: 0 4px 12px rgba(245,158,11,0.35); transform: translateY(-1px); }
.cal-nav { font-size: 0.85rem; color: #64748B; font-weight: 600; background: #F1F5F9; border: none; border-radius: 0.5rem; padding: 0.3rem 0.75rem; cursor: pointer; }
.cal-day { position: relative; text-align: center; padding: 0.45rem 0; font-size: 0.8rem; color: #64748B; border-radius: 0.5rem; cursor: default; }
.cal-today { background: #F59E0B; color: white; font-weight: 700; border-radius: 0.5rem; }
.cal-has-event { font-weight: 600; color: #0F172A; }
.cal-dot { display: block; width: 4px; height: 4px; border-radius: 50%; background: #F59E0B; margin: 2px auto 0; }
.day-badge { width: 40px; height: 40px; border-radius: 0.625rem; background: linear-gradient(135deg, #F59E0B, #D97706); color: #0F172A; font-weight: 800; font-size: 1.1rem; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.appt-card { background: white; border-radius: 0.875rem; padding: 1.25rem; box-shadow: 0 1px 3px rgba(0,0,0,0.06); border: 1px solid rgba(15,23,42,0.06); }
.appt-type-icon { padding: 0.5rem; border-radius: 0.5rem; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.badge-green { display: inline-block; font-size: 0.7rem; font-weight: 600; padding: 0.2rem 0.6rem; border-radius: 9999px; background: #F0FDF4; color: #16A34A; }
.badge-yellow { display: inline-block; font-size: 0.7rem; font-weight: 600; padding: 0.2rem 0.6rem; border-radius: 9999px; background: #FFFBEB; color: #D97706; }
</style>
