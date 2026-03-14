<!-- pages/dashboard.vue -->
<template>
  <div class="space-y-6">
    <!-- Welcome Section -->
    <div class="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-6 text-white">
      <h2 class="text-2xl font-bold mb-2">Welcome back, Dr. Maria Santos!</h2>
      <p class="text-primary-100">You have 3 upcoming consultations today. Stay organized and provide the best care for your patients.</p>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Total Patients</p>
            <p class="text-2xl font-bold text-gray-900">247</p>
          </div>
          <div class="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center">
            <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
            </svg>
          </div>
        </div>
        <p class="text-xs text-green-600 mt-2">+12 this month</p>
      </div>

      <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Consultations</p>
            <p class="text-2xl font-bold text-gray-900">1,432</p>
          </div>
          <div class="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
          </div>
        </div>
        <p class="text-xs text-green-600 mt-2">+24% vs last month</p>
      </div>

      <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Active Plans</p>
            <p class="text-2xl font-bold text-gray-900">156</p>
          </div>
          <div class="w-12 h-12 bg-yellow-50 rounded-xl flex items-center justify-center">
            <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
          </div>
        </div>
        <p class="text-xs text-gray-600 mt-2">Active treatment plans</p>
      </div>

      <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Revenue</p>
            <p class="text-2xl font-bold text-gray-900">₱48.5k</p>
          </div>
          <div class="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
        </div>
        <p class="text-xs text-green-600 mt-2">+18% this month</p>
      </div>
    </div>

    <!-- Charts and Recent Activity -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Patient Growth Chart -->
      <div class="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Patient Growth Overview</h3>
        <div class="h-64 flex items-end justify-between">
          <div v-for="(value, month) in patientGrowth" :key="month" class="flex flex-col items-center w-1/6">
            <div class="w-full bg-primary-100 rounded-t-lg" :style="{ height: value * 2 + 'px' }">
              <div class="w-full bg-primary-500 rounded-t-lg" :style="{ height: (value * 1.5) + 'px' }"></div>
            </div>
            <span class="text-xs text-gray-600 mt-2">{{ month }}</span>
          </div>
        </div>
      </div>

      <!-- Upcoming Consultations -->
      <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Upcoming Consultations</h3>
        <div class="space-y-4">
          <div v-for="consultation in upcomingConsultations" :key="consultation.id" class="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
            <div class="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
              <span class="text-primary-700 font-medium">{{ consultation.initials }}</span>
            </div>
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-900">{{ consultation.name }}</p>
              <p class="text-xs text-gray-500">{{ consultation.time }}</p>
            </div>
            <span class="px-2 py-1 bg-primary-50 text-primary-700 text-xs font-medium rounded-full">{{ consultation.type }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default'
})

const patientGrowth = {
  'Jan': 45,
  'Feb': 52,
  'Mar': 48,
  'Apr': 65,
  'May': 58,
  'Jun': 72
}

const upcomingConsultations = [
  { id: 1, name: 'Juan Dela Cruz', initials: 'JD', time: '09:00 AM', type: 'Initial' },
  { id: 2, name: 'Maria Reyes', initials: 'MR', time: '10:30 AM', type: 'Follow-up' },
  { id: 3, name: 'Jose Santos', initials: 'JS', time: '02:00 PM', type: 'MNT Review' },
  { id: 4, name: 'Ana Mercado', initials: 'AM', time: '03:30 PM', type: 'Initial' }
]
</script>