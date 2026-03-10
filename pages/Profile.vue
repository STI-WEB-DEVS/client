<template>
      <div class="max-w-4xl mx-auto p-6">
        <button 
          @click="router.push('/Dashboard')" 
          class="flex items-center text-sm font-medium text-[#2E4DA7] hover:text-[#00B4D8] transition-colors mb-8 group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Return to Dashboard
        </button>
  
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div class="h-32 bg-gradient-to-r from-[#2E4DA7] to-[#00B4D8]"></div>
          
          <div class="px-8 pb-8"> <div class="-mt-12 mb-6"> <div class="inline-block p-1 bg-white rounded-full shadow-sm">
            <div class="h-24 w-24 rounded-full bg-blue-50 flex items-center justify-center text-3xl font-bold text-[#2E4DA7] border-4 border-white">
              TC
            </div>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Tom Cook</h1>
            <p class="text-gray-500">Premium Traveler since 2024</p>
          </div>
          <button class="px-4 py-2 bg-[#2E4DA7] text-white rounded-lg hover:bg-opacity-90 transition-all text-sm font-semibold">
            Edit Profile
          </button>
        </div>
            <hr class="my-8 border-gray-100" />
  
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div class="space-y-1">
                <label class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Email Address</label>
                <p class="text-gray-700 font-medium">Tom.Cook@travelease.com</p>
              </div>
              <div class="space-y-1">
                <label class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Phone Number</label>
                <p class="text-gray-700 font-medium">+1 (555) 000-0000</p>
              </div>
              <div class="space-y-1">
                <label class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Preferred Language</label>
                <p class="text-gray-700 font-medium">English (US)</p>
              </div>
              <div class="space-y-1">
                <label class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Default Currency</label>
                <p class="text-gray-700 font-medium">USD ($)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
  </template>
  
  <script setup lang="ts">
  import { useRouter } from 'vue-router';
  const router = useRouter();
  </script>