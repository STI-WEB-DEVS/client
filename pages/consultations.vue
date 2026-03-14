<!-- pages/consultations.vue -->
<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-bold text-gray-900">Consultations</h2>
      <button class="px-4 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 flex items-center space-x-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
        </svg>
        <span>Schedule Consultation</span>
      </button>
    </div>

    <!-- Calendar/List View Toggle -->
    <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
      <div class="flex items-center justify-between">
        <div class="flex space-x-2">
          <button class="px-4 py-2 bg-primary-50 text-primary-700 rounded-xl">Today</button>
          <button class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-xl">This Week</button>
          <button class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-xl">This Month</button>
        </div>
        <div class="flex space-x-2">
          <button class="p-2 text-gray-400 hover:text-gray-600">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
          <button class="p-2 text-gray-400 hover:text-gray-600">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Consultations List -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="divide-y divide-gray-200">
        <div v-for="consultation in consultations" :key="consultation.id" class="p-6 hover:bg-gray-50">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <div class="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                <span class="text-primary-700 font-medium">{{ consultation.initials }}</span>
              </div>
              <div>
                <h3 class="text-lg font-medium text-gray-900">{{ consultation.patient }}</h3>
                <p class="text-sm text-gray-500">{{ consultation.type }} • {{ consultation.time }}</p>
              </div>
            </div>
            <div class="flex items-center space-x-4">
              <span class="px-3 py-1 bg-primary-50 text-primary-700 text-sm font-medium rounded-full">{{ consultation.status }}</span>
              <button class="text-primary-600 hover:text-primary-700">View Details</button>
            </div>
          </div>
          <div class="mt-4 flex items-center space-x-6 text-sm text-gray-500">
            <div class="flex items-center space-x-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l5 5a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-5-5A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
              </svg>
              <span>{{ consultation.condition }}</span>
            </div>
            <div class="flex items-center space-x-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>{{ consultation.duration }}</span>
            </div>
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

const consultations = ref([
  { 
    id: 1, 
    patient: 'Juan Dela Cruz', 
    initials: 'JC',
    type: 'Initial Consultation', 
    time: 'Today, 09:00 AM',
    status: 'Confirmed',
    condition: 'Type 2 Diabetes',
    duration: '60 mins'
  },
  { 
    id: 2, 
    patient: 'Maria Reyes', 
    initials: 'MR',
    type: 'Follow-up', 
    time: 'Today, 10:30 AM',
    status: 'Confirmed',
    condition: 'Hypertension',
    duration: '45 mins'
  },
  { 
    id: 3, 
    patient: 'Jose Santos', 
    initials: 'JS',
    type: 'MNT Review', 
    time: 'Today, 02:00 PM',
    status: 'Pending',
    condition: 'Chronic Kidney Disease',
    duration: '60 mins'
  },
  { 
    id: 4, 
    patient: 'Ana Mercado', 
    initials: 'AM',
    type: 'Initial Consultation', 
    time: 'Tomorrow, 09:30 AM',
    status: 'Scheduled',
    condition: 'Weight Management',
    duration: '60 mins'
  }
])
</script>