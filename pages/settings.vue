<!-- pages/settings.vue -->
<template>
  <div class="max-w-4xl mx-auto space-y-6">
    <h2 class="text-2xl font-bold text-gray-900">System Settings</h2>

    <!-- Settings Tabs -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="border-b border-gray-200">
        <nav class="flex space-x-8 px-6" aria-label="Settings">
          <button 
            v-for="tab in tabs" 
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              activeTab === tab.id ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
              'py-4 px-1 border-b-2 font-medium text-sm'
            ]"
          >
            {{ tab.name }}
          </button>
        </nav>
      </div>

      <div class="p-6">
        <!-- General Settings -->
        <div v-if="activeTab === 'general'" class="space-y-6">
          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-4">System Information</h3>
            <div class="grid grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700">System Name</label>
                <input type="text" value="NutriMatch" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Version</label>
                <input type="text" value="2.1.0" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500">
              </div>
              <div class="col-span-2">
                <label class="block text-sm font-medium text-gray-700">System Description</label>
                <textarea rows="3" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500">Web-Based Clinical Nutrition Consultation and Outcome Monitoring System for Structured Medical Nutrition Therapy</textarea>
              </div>
            </div>
          </div>

          <div class="pt-6 border-t border-gray-200">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Branding</h3>
            <div class="grid grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700">Primary Color</label>
                <div class="mt-1 flex items-center space-x-3">
                  <input type="color" value="#419a4a" class="w-10 h-10 rounded border border-gray-300">
                  <input type="text" value="#419a4a" class="flex-1 px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500">
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Secondary Color</label>
                <div class="mt-1 flex items-center space-x-3">
                  <input type="color" value="#2f8037" class="w-10 h-10 rounded border border-gray-300">
                  <input type="text" value="#2f8037" class="flex-1 px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500">
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Security Settings -->
        <div v-if="activeTab === 'security'" class="space-y-6">
          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-4">Authentication</h3>
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-900">Two-Factor Authentication</p>
                  <p class="text-sm text-gray-500">Require 2FA for all admin accounts</p>
                </div>
                <button class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2" :class="twoFAEnabled ? 'bg-primary-600' : 'bg-gray-200'" @click="twoFAEnabled = !twoFAEnabled">
                  <span class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out" :class="twoFAEnabled ? 'translate-x-5' : 'translate-x-0'"></span>
                </button>
              </div>

              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-900">Session Timeout</p>
                  <p class="text-sm text-gray-500">Automatically log out after inactivity</p>
                </div>
                <select class="px-3 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-200">
                  <option>30 minutes</option>
                  <option>1 hour</option>
                  <option>2 hours</option>
                  <option>4 hours</option>
                </select>
              </div>
            </div>
          </div>

          <div class="pt-6 border-t border-gray-200">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Password Policy</h3>
            <div class="space-y-4">
              <div class="flex items-center space-x-4">
                <input type="checkbox" class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded">
                <label class="text-sm text-gray-700">Require strong passwords (uppercase, numbers, symbols)</label>
              </div>
              <div class="flex items-center space-x-4">
                <input type="checkbox" class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" checked>
                <label class="text-sm text-gray-700">Force password change every 90 days</label>
              </div>
              <div class="flex items-center space-x-4">
                <input type="checkbox" class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" checked>
                <label class="text-sm text-gray-700">Prevent password reuse (last 5 passwords)</label>
              </div>
            </div>
          </div>
        </div>

        <!-- Notifications -->
        <div v-if="activeTab === 'notifications'" class="space-y-6">
          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-4">Email Notifications</h3>
            <div class="space-y-4">
              <div v-for="notification in emailNotifications" :key="notification.id" class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-900">{{ notification.title }}</p>
                  <p class="text-sm text-gray-500">{{ notification.description }}</p>
                </div>
                <input type="checkbox" :checked="notification.enabled" class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded">
              </div>
            </div>
          </div>
        </div>

        <!-- Integrations -->
        <div v-if="activeTab === 'integrations'" class="space-y-6">
          <div class="grid grid-cols-2 gap-6">
            <div class="p-4 border border-gray-200 rounded-xl">
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center space-x-3">
                  <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg class="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">...</svg>
                  </div>
                  <div>
                    <h4 class="font-medium text-gray-900">USDA FoodData Central</h4>
                    <p class="text-xs text-gray-500">Connected</p>
                  </div>
                </div>
                <span class="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">Active</span>
              </div>
              <button class="text-sm text-primary-600 hover:text-primary-700">Configure</button>
            </div>

            <div class="p-4 border border-gray-200 rounded-xl">
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center space-x-3">
                  <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg class="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">...</svg>
                  </div>
                  <div>
                    <h4 class="font-medium text-gray-900">Philippine Food Data</h4>
                    <p class="text-xs text-gray-500">Connected</p>
                  </div>
                </div>
                <span class="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">Active</span>
              </div>
              <button class="text-sm text-primary-600 hover:text-primary-700">Configure</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Save Button -->
      <div class="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <button class="px-4 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700">Save Changes</button>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default'
})

const activeTab = ref('general')
const twoFAEnabled = ref(false)

const tabs = [
  { id: 'general', name: 'General' },
  { id: 'security', name: 'Security' },
  { id: 'notifications', name: 'Notifications' },
  { id: 'integrations', name: 'Integrations' }
]

const emailNotifications = [
  { id: 1, title: 'New Patient Registration', description: 'Get notified when a new patient registers', enabled: true },
  { id: 2, title: 'Consultation Reminders', description: 'Receive reminders for upcoming consultations', enabled: true },
  { id: 3, title: 'System Updates', description: 'Notifications about system maintenance and updates', enabled: false },
  { id: 4, title: 'Payment Notifications', description: 'Get notified about successful payments', enabled: true }
]
</script>