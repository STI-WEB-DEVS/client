<template>
    <NuxtLayout name="default">
      <div class="max-w-6xl mx-auto p-6">
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-[#2E4DA7]">Settings</h1>
          <p class="text-gray-500">Manage your account preferences and travel configurations.</p>
        </div>
  
        <div class="flex flex-col md:flex-row gap-8">
          <aside class="w-full md:w-64 space-y-1">
            <button v-for="item in tabs" :key="item.name" 
              @click="activeTab = item.id"
              :class="[
                activeTab === item.id 
                  ? 'bg-blue-50 text-[#2E4DA7]' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                'w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors'
              ]"
            >
              <component :is="item.icon" class="w-5 h-5 mr-3" />
              {{ item.name }}
            </button>
          </aside>
  
          <div class="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div v-if="activeTab === 'notifications'" class="space-y-6">
              <div>
                <h2 class="text-xl font-semibold text-gray-900">Email Notifications</h2>
                <p class="text-sm text-gray-500">Choose what updates you want to receive.</p>
              </div>
  
              <div class="space-y-4">
                <div v-for="opt in notificationOptions" :key="opt.title" class="flex items-start justify-between">
                  <div class="flex-1">
                    <p class="text-sm font-medium text-gray-900">{{ opt.title }}</p>
                    <p class="text-xs text-gray-500">{{ opt.desc }}</p>
                  </div>
                  <button 
                    @click="opt.enabled = !opt.enabled"
                    :class="opt.enabled ? 'bg-[#00B4D8]' : 'bg-gray-200'"
                    class="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out"
                  >
                    <span :class="opt.enabled ? 'translate-x-6' : 'translate-x-1'" class="mt-1 inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out shadow-sm" />
                  </button>
                </div>
              </div>
  
              <div class="pt-6 border-t border-gray-100 flex justify-end gap-3">
                <button class="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg">Cancel</button>
                <button class="px-4 py-2 text-sm font-medium bg-[#2E4DA7] text-white rounded-lg hover:bg-opacity-90 transition-all">Save Changes</button>
              </div>
            </div>
  
            <div v-else class="flex flex-col items-center justify-center py-20 text-gray-400">
              <p>Content for {{ activeTab }} tab coming soon.</p>
            </div>
          </div>
        </div>
      </div>
    </NuxtLayout>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  const activeTab = ref('notifications');
  
  const tabs = [
    { id: 'account', name: 'Account Info', icon: 'UserIcon' }, // You'd use actual Heroicons here
    { id: 'notifications', name: 'Notifications', icon: 'BellIcon' },
    { id: 'security', name: 'Security', icon: 'ShieldIcon' },
    { id: 'billing', name: 'Billing', icon: 'CreditCardIcon' },
  ];
  
  const notificationOptions = ref([
    { title: 'New Package Alerts', desc: 'Get notified when new travel deals match your profile.', enabled: true },
    { title: 'Booking Updates', desc: 'Important emails regarding your flight and hotel status.', enabled: true },
    { title: 'Promotional Offers', desc: 'Receive occasional discounts and travel tips.', enabled: false },
  ]);
  </script>