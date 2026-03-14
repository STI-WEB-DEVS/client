<template>
  <NuxtLayout>
    <div>

      <!-- Page Header -->
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p class="mt-1 text-sm text-gray-500">Welcome back, Nicollette. Here's your overview for today.</p>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-x-4 hover:shadow-md transition">
          <div class="flex size-12 shrink-0 items-center justify-center rounded-xl text-white shadow" style="background: linear-gradient(135deg, #1e3a5f, #2563eb);">
            <UsersIcon class="size-6" />
          </div>
          <div>
            <p class="text-xs font-medium text-gray-500 uppercase tracking-wide">Total Patients</p>
            <p class="text-2xl font-bold text-gray-900 mt-0.5">128</p>
            <p class="text-xs text-blue-600 mt-0.5">↑ 4 new this week</p>
          </div>
        </div>

        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-x-4 hover:shadow-md transition">
          <div class="flex size-12 shrink-0 items-center justify-center rounded-xl text-white shadow" style="background: linear-gradient(135deg, #0369a1, #0ea5e9);">
            <CalendarIcon class="size-6" />
          </div>
          <div>
            <p class="text-xs font-medium text-gray-500 uppercase tracking-wide">Appointments Today</p>
            <p class="text-2xl font-bold text-gray-900 mt-0.5">14</p>
            <p class="text-xs text-sky-600 mt-0.5">3 pending confirmation</p>
          </div>
        </div>

        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-x-4 hover:shadow-md transition">
          <div class="flex size-12 shrink-0 items-center justify-center rounded-xl text-white shadow" style="background: linear-gradient(135deg, #b45309, #f59e0b);">
            <UserGroupIcon class="size-6" />
          </div>
          <div>
            <p class="text-xs font-medium text-gray-500 uppercase tracking-wide">Active Staff</p>
            <p class="text-2xl font-bold text-gray-900 mt-0.5">9</p>
            <p class="text-xs text-amber-600 mt-0.5">2 on leave today</p>
          </div>
        </div>

        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-x-4 hover:shadow-md transition">
          <div class="flex size-12 shrink-0 items-center justify-center rounded-xl text-white shadow" style="background: linear-gradient(135deg, #b91c1c, #ef4444);">
            <ExclamationTriangleIcon class="size-6" />
          </div>
          <div>
            <p class="text-xs font-medium text-gray-500 uppercase tracking-wide">Critical Cases</p>
            <p class="text-2xl font-bold text-gray-900 mt-0.5">3</p>
            <p class="text-xs text-red-600 mt-0.5">Requires attention</p>
          </div>
        </div>
      </div>

      <!-- Appointments + Quick Actions -->
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">

        <!-- Today's Appointments -->
        <div class="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100">
          <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 class="text-sm font-semibold text-gray-900">Today's Appointments</h2>
            <NuxtLink to="/appointments" class="text-xs font-medium text-blue-600 hover:text-blue-500 transition">View all →</NuxtLink>
          </div>
          <ul class="divide-y divide-gray-50">
            <li v-for="appt in appointments" :key="appt.id" class="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition">
              <div class="flex items-center gap-4">
                <div class="size-9 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-sm" style="background: linear-gradient(135deg, #1e3a5f, #2563eb);">
                  {{ appt.initials }}
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-900">{{ appt.name }}</p>
                  <p class="text-xs text-gray-400 mt-0.5">{{ appt.type }} · {{ appt.time }}</p>
                </div>
              </div>
              <span :class="statusClass(appt.status)" class="text-xs font-medium px-2.5 py-1 rounded-full">
                {{ appt.status }}
              </span>
            </li>
          </ul>
        </div>

        <!-- Quick Actions -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div class="px-6 py-4 border-b border-gray-100">
            <h2 class="text-sm font-semibold text-gray-900">Quick Actions</h2>
          </div>
          <div class="px-6 py-4 space-y-3">
            <NuxtLink to="/patients" class="flex items-center gap-3 rounded-xl border border-gray-100 px-4 py-3 text-sm font-medium text-gray-700 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 transition group">
              <div class="flex size-8 items-center justify-center rounded-lg text-white text-xs shadow-sm group-hover:scale-105 transition" style="background: linear-gradient(135deg, #1e3a5f, #2563eb);">
                <UsersIcon class="size-4" />
              </div>
              Add New Patient
            </NuxtLink>
            <NuxtLink to="/appointments" class="flex items-center gap-3 rounded-xl border border-gray-100 px-4 py-3 text-sm font-medium text-gray-700 hover:border-sky-200 hover:bg-sky-50 hover:text-sky-700 transition group">
              <div class="flex size-8 items-center justify-center rounded-lg text-white text-xs shadow-sm group-hover:scale-105 transition" style="background: linear-gradient(135deg, #0369a1, #0ea5e9);">
                <CalendarIcon class="size-4" />
              </div>
              Schedule Appointment
            </NuxtLink>
            <NuxtLink to="/team" class="flex items-center gap-3 rounded-xl border border-gray-100 px-4 py-3 text-sm font-medium text-gray-700 hover:border-amber-200 hover:bg-amber-50 hover:text-amber-700 transition group">
              <div class="flex size-8 items-center justify-center rounded-lg text-white text-xs shadow-sm group-hover:scale-105 transition" style="background: linear-gradient(135deg, #b45309, #f59e0b);">
                <UserGroupIcon class="size-4" />
              </div>
              View Care Team
            </NuxtLink>
            <NuxtLink to="/reports" class="flex items-center gap-3 rounded-xl border border-gray-100 px-4 py-3 text-sm font-medium text-gray-700 hover:border-purple-200 hover:bg-purple-50 hover:text-purple-700 transition group">
              <div class="flex size-8 items-center justify-center rounded-lg text-white text-xs shadow-sm group-hover:scale-105 transition" style="background: linear-gradient(135deg, #6d28d9, #8b5cf6);">
                <ChartPieIcon class="size-4" />
              </div>
              View Reports
            </NuxtLink>
            <NuxtLink to="/settings" class="flex items-center gap-3 rounded-xl border border-gray-100 px-4 py-3 text-sm font-medium text-gray-700 hover:border-gray-200 hover:bg-gray-50 transition group">
              <div class="flex size-8 items-center justify-center rounded-lg text-white text-xs shadow-sm group-hover:scale-105 transition" style="background: linear-gradient(135deg, #374151, #6b7280);">
                <Cog6ToothIcon class="size-4" />
              </div>
              System Settings
            </NuxtLink>
          </div>
        </div>
      </div>

     

    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import {
  UsersIcon,
  CalendarIcon,
  ChartPieIcon,
  Cog6ToothIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from '@heroicons/vue/24/outline'
import { UserGroupIcon } from '@heroicons/vue/24/outline'

const appointments = [
  { id: 1, name: 'Remedios Santos', initials: 'RS', type: 'General Checkup', time: '8:00 AM', status: 'Confirmed' },
  { id: 2, name: 'Ernesto Dela Cruz', initials: 'ED', type: 'Cardiology', time: '9:30 AM', status: 'Confirmed' },
  { id: 3, name: 'Lourdes Reyes', initials: 'LR', type: 'Physical Therapy', time: '11:00 AM', status: 'Pending' },
  { id: 4, name: 'Domingo Villanueva', initials: 'DV', type: 'Follow-up', time: '1:00 PM', status: 'Cancelled' },
  { id: 5, name: 'Caridad Mendoza', initials: 'CM', type: 'Blood Work', time: '2:30 PM', status: 'Confirmed' },
]

const statusClass = (status: string) => {
  if (status === 'Confirmed') return 'bg-blue-100 text-blue-700'
  if (status === 'Pending') return 'bg-amber-100 text-amber-700'
  if (status === 'Cancelled') return 'bg-red-100 text-red-700'
  return 'bg-gray-100 text-gray-700'
}
</script>