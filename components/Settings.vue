<template>
  <div class="max-w-6xl mx-auto">
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900">System Settings</h1>
      <p class="text-sm text-gray-500">Global configurations for the OmniBus management platform.</p>
    </div>

    <div class="lg:grid lg:grid-cols-12 lg:gap-x-8">
      <aside class="py-2 px-2 sm:px-6 lg:col-span-3 lg:px-0">
        <nav class="space-y-1">
          <button 
            v-for="item in tabs" 
            :key="item.name"
            @click="activeTab = item.id"
            :class="[
              activeTab === item.id 
                ? 'bg-indigo-50 text-indigo-700 hover:bg-white' 
                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900',
              'group flex items-center rounded-md px-3 py-2 text-sm font-medium w-full'
            ]"
          >
            <component :is="item.icon" class="mr-3 size-5 shrink-0" />
            {{ item.name }}
          </button>
        </nav>
      </aside>

      <div class="space-y-6 sm:px-6 lg:col-span-9 lg:px-0">
        
        <section v-if="activeTab === 'general'" class="bg-white shadow sm:rounded-lg border border-gray-200">
          <div class="px-4 py-5 sm:p-6">
            <h3 class="text-lg font-medium leading-6 text-gray-900">General Configuration</h3>
            <p class="mt-1 text-sm text-gray-500">Basic display and localization settings for the dashboard.</p>
            
            <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div class="sm:col-span-3">
                <label class="block text-sm font-medium text-gray-700">System Name</label>
                <input type="text" value="OmniBus Central" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2" />
              </div>

              <div class="sm:col-span-3">
                <label class="block text-sm font-medium text-gray-700">Timezone</label>
                <select class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2">
                  <option>UTC (Greenwich Mean Time)</option>
                  <option selected>EST (Eastern Standard Time)</option>
                </select>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 text-right sm:px-6 rounded-b-lg">
            <button class="inline-flex justify-center rounded-md bg-indigo-600 py-2 px-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">Save</button>
          </div>
        </section>

        <section v-if="activeTab === 'fleet'" class="bg-white shadow sm:rounded-lg border border-gray-200">
          <div class="px-4 py-5 sm:p-6">
            <h3 class="text-lg font-medium leading-6 text-gray-900">Fleet Thresholds</h3>
            <p class="mt-1 text-sm text-gray-500">Define automated alerts for vehicle health and performance.</p>

            <div class="mt-6 space-y-4">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-900">Low Battery Alert</p>
                  <p class="text-xs text-gray-500">Notify dispatch when an EV bus falls below this %.</p>
                </div>
                <div class="w-20">
                  <input type="number" value="20" class="block w-full rounded-md border-gray-300 shadow-sm border p-1 text-center" />
                </div>
              </div>

              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-900">Idle Warning</p>
                  <p class="text-xs text-gray-500">Alert if a vehicle is stationary with engine on for X minutes.</p>
                </div>
                <div class="w-20">
                  <input type="number" value="10" class="block w-full rounded-md border-gray-300 shadow-sm border p-1 text-center" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { 
  AdjustmentsHorizontalIcon, 
  TruckIcon, 
  KeyIcon, 
  BellAlertIcon 
} from '@heroicons/vue/24/outline'

const activeTab = ref('general')

const tabs = [
  { id: 'general', name: 'General', icon: AdjustmentsHorizontalIcon },
  { id: 'fleet', name: 'Fleet Rules', icon: TruckIcon }
]
</script>