<template>
  <NuxtLayout>
    <div>

      <!-- Page Header -->
      <div class="mb-8 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Reports</h1>
          <p class="mt-1 text-sm text-gray-500">View and generate healthcare service reports for the AMUMA system.</p>
        </div>
        <button
          class="rounded-xl px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-90 transition"
          style="background: linear-gradient(135deg, #1e3a5f, #2563eb);"
        >
          Export Report
        </button>
      </div>

      <!-- Summary Stats -->
      <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center gap-x-4">
          <div class="flex size-11 shrink-0 items-center justify-center rounded-xl text-white shadow" style="background: linear-gradient(135deg, #1e3a5f, #2563eb);">
            <UsersIcon class="size-5" />
          </div>
          <div>
            <p class="text-xs font-medium text-gray-500 uppercase tracking-wide">Total Patients</p>
            <p class="text-2xl font-bold text-gray-900">128</p>
            <p class="text-xs text-blue-600 mt-0.5">↑ 12% this month</p>
          </div>
        </div>
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center gap-x-4">
          <div class="flex size-11 shrink-0 items-center justify-center rounded-xl text-white shadow" style="background: linear-gradient(135deg, #0369a1, #0ea5e9);">
            <CalendarIcon class="size-5" />
          </div>
          <div>
            <p class="text-xs font-medium text-gray-500 uppercase tracking-wide">Appointments</p>
            <p class="text-2xl font-bold text-gray-900">342</p>
            <p class="text-xs text-sky-600 mt-0.5">↑ 8% this month</p>
          </div>
        </div>
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center gap-x-4">
          <div class="flex size-11 shrink-0 items-center justify-center rounded-xl text-white shadow" style="background: linear-gradient(135deg, #059669, #10b981);">
            <CheckCircleIcon class="size-5" />
          </div>
          <div>
            <p class="text-xs font-medium text-gray-500 uppercase tracking-wide">Completed</p>
            <p class="text-2xl font-bold text-gray-900">289</p>
            <p class="text-xs text-emerald-600 mt-0.5">84% completion rate</p>
          </div>
        </div>
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center gap-x-4">
          <div class="flex size-11 shrink-0 items-center justify-center rounded-xl text-white shadow" style="background: linear-gradient(135deg, #b91c1c, #ef4444);">
            <ExclamationTriangleIcon class="size-5" />
          </div>
          <div>
            <p class="text-xs font-medium text-gray-500 uppercase tracking-wide">Critical Cases</p>
            <p class="text-2xl font-bold text-gray-900">3</p>
            <p class="text-xs text-red-600 mt-0.5">Needs attention</p>
          </div>
        </div>
      </div>

      <!-- Monthly Report + Conditions -->
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">

        <!-- Monthly Appointments -->
        <div class="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100">
          <div class="px-6 py-4 border-b border-gray-100">
            <h2 class="text-sm font-bold text-gray-900">Monthly Appointments Overview</h2>
            <p class="text-xs text-gray-400 mt-0.5">Total appointments recorded per month</p>
          </div>
          <div class="px-6 py-6">
            <div class="space-y-4">
              <div v-for="month in monthlyData" :key="month.name" class="flex items-center gap-x-4">
                <span class="text-xs font-medium text-gray-500 w-8">{{ month.name }}</span>
                <div class="flex-1 bg-gray-100 rounded-full h-2.5 overflow-hidden">
                  <div
                    class="h-2.5 rounded-full transition-all duration-500"
                    style="background: linear-gradient(135deg, #1e3a5f, #2563eb);"
                    :style="{ width: (month.value / 60 * 100) + '%' }"
                  ></div>
                </div>
                <span class="text-xs font-bold text-gray-700 w-6 text-right">{{ month.value }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Common Conditions -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div class="px-6 py-4 border-b border-gray-100">
            <h2 class="text-sm font-bold text-gray-900">Common Conditions</h2>
            <p class="text-xs text-gray-400 mt-0.5">Most frequent diagnoses</p>
          </div>
          <ul class="divide-y divide-gray-50">
            <li v-for="condition in conditions" :key="condition.name" class="px-6 py-3 flex items-center justify-between hover:bg-gray-50 transition">
              <div class="flex items-center gap-x-3">
                <div class="size-2 rounded-full" :style="{ background: condition.color }"></div>
                <span class="text-sm text-gray-700">{{ condition.name }}</span>
              </div>
              <div class="flex items-center gap-x-2">
                <div class="w-16 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                  <div class="h-1.5 rounded-full" :style="{ width: condition.percent + '%', background: condition.color }"></div>
                </div>
                <span class="text-xs font-bold text-gray-500 w-8 text-right">{{ condition.count }}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- Appointment Type Breakdown + Staff Performance -->
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-6">

        <!-- Appointment Types -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div class="px-6 py-4 border-b border-gray-100">
            <h2 class="text-sm font-bold text-gray-900">Appointment Types</h2>
            <p class="text-xs text-gray-400 mt-0.5">Breakdown by service type this month</p>
          </div>
          <ul class="divide-y divide-gray-50">
            <li v-for="type in appointmentTypes" :key="type.name" class="px-6 py-3 flex items-center justify-between hover:bg-gray-50 transition">
              <div class="flex items-center gap-x-3">
                <div class="flex size-8 items-center justify-center rounded-lg text-white text-xs shadow-sm" :style="{ background: type.gradient }">
                  {{ type.icon }}
                </div>
                <span class="text-sm text-gray-700">{{ type.name }}</span>
              </div>
              <div class="flex items-center gap-x-3">
                <div class="w-20 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                  <div class="h-1.5 rounded-full" :style="{ width: type.percent + '%', background: type.gradient }"></div>
                </div>
                <span class="text-xs font-bold text-gray-600 w-6 text-right">{{ type.count }}</span>
              </div>
            </li>
          </ul>
        </div>

        <!-- Recent Activity Log -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div class="px-6 py-4 border-b border-gray-100">
            <h2 class="text-sm font-bold text-gray-900">Recent System Activity</h2>
            <p class="text-xs text-gray-400 mt-0.5">Latest actions recorded in AMUMA</p>
          </div>
          <ul class="divide-y divide-gray-50">
            <li v-for="log in activityLog" :key="log.id" class="px-6 py-3 flex items-start gap-x-3 hover:bg-gray-50 transition">
              <div class="flex size-8 shrink-0 items-center justify-center rounded-lg text-sm" :class="log.bgColor">
                {{ log.icon }}
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 truncate">{{ log.action }}</p>
                <p class="text-xs text-gray-400 mt-0.5">{{ log.detail }}</p>
              </div>
              <span class="text-xs text-gray-400 shrink-0">{{ log.time }}</span>
            </li>
          </ul>
        </div>
      </div>

    
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import {
  UsersIcon,
  CalendarIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from '@heroicons/vue/24/outline'

const monthlyData = [
  { name: 'Oct', value: 28 },
  { name: 'Nov', value: 35 },
  { name: 'Dec', value: 22 },
  { name: 'Jan', value: 41 },
  { name: 'Feb', value: 38 },
  { name: 'Mar', value: 52 },
]

const conditions = [
  { name: 'Hypertension', count: 34, percent: 85, color: '#2563eb' },
  { name: 'Type 2 Diabetes', count: 28, percent: 70, color: '#0ea5e9' },
  { name: 'Osteoarthritis', count: 21, percent: 52, color: '#f59e0b' },
  { name: 'COPD', count: 18, percent: 45, color: '#8b5cf6' },
  { name: 'Dementia', count: 14, percent: 35, color: '#ef4444' },
  { name: 'Glaucoma', count: 13, percent: 32, color: '#10b981' },
]

const appointmentTypes = [
  { name: 'General Checkup', count: 98, percent: 90, icon: '🩺', gradient: 'linear-gradient(135deg, #1e3a5f, #2563eb)' },
  { name: 'Cardiology', count: 67, percent: 70, icon: '❤️', gradient: 'linear-gradient(135deg, #b91c1c, #ef4444)' },
  { name: 'Physical Therapy', count: 54, percent: 55, icon: '🦽', gradient: 'linear-gradient(135deg, #059669, #10b981)' },
  { name: 'Blood Work', count: 48, percent: 48, icon: '🧪', gradient: 'linear-gradient(135deg, #b45309, #f59e0b)' },
  { name: 'Neurology', count: 43, percent: 43, icon: '🧠', gradient: 'linear-gradient(135deg, #6d28d9, #8b5cf6)' },
  { name: 'Ophthalmology', count: 32, percent: 32, icon: '👁️', gradient: 'linear-gradient(135deg, #0369a1, #0ea5e9)' },
]

const activityLog = [
  { id: 1, icon: '👴', action: 'New patient registered', detail: 'Remedios Santos — PT-001', time: '8:15 AM', bgColor: 'bg-blue-50' },
  { id: 2, icon: '📅', action: 'Appointment confirmed', detail: 'Ernesto Dela Cruz — Cardiology', time: '9:00 AM', bgColor: 'bg-sky-50' },
  { id: 3, icon: '✅', action: 'Appointment completed', detail: 'Rosario Aquino — Ophthalmology', time: '10:30 AM', bgColor: 'bg-green-50' },
  { id: 4, icon: '⚠️', action: 'Critical case flagged', detail: 'Felicidad Torres — Dementia', time: '11:00 AM', bgColor: 'bg-red-50' },
  { id: 5, icon: '⚙️', action: 'Settings updated', detail: 'Appointment duration changed', time: '2:00 PM', bgColor: 'bg-gray-50' },
]
</script>