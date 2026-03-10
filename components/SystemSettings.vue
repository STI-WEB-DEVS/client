<template>
  <div class="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
    <form @submit.prevent="saveSettings">
      <div class="space-y-12">
        
        <div class="border-b border-gray-900/10 pb-12">
          <h2 class="text-base/7 font-semibold text-gray-900">General Configuration</h2>
          <p class="mt-1 text-sm/6 text-gray-600">Manage the core identity and localization of your system.</p>

          <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div class="sm:col-span-3">
              <label for="system-name" class="block text-sm/6 font-medium text-gray-900">System Name</label>
              <div class="mt-2">
                <input type="text" id="system-name" v-model="settings.systemName" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" />
              </div>
            </div>

            <div class="sm:col-span-3">
              <label for="currency" class="block text-sm/6 font-medium text-gray-900">Primary Currency</label>
              <div class="mt-2">
                <select id="currency" v-model="settings.currency" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6">
                  <option value="PHP">PHP (₱)</option>
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div class="border-b border-gray-900/10 pb-12">
          <h2 class="text-base/7 font-semibold text-gray-900">Boarding House Operations</h2>
          <p class="mt-1 text-sm/6 text-gray-600">Set defaults for billing, tenants, and room management.</p>

          <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div class="sm:col-span-3">
              <label for="rent-due" class="block text-sm/6 font-medium text-gray-900">Default Rent Due Date (Day of Month)</label>
              <div class="mt-2">
                <input type="number" min="1" max="31" id="rent-due" v-model="settings.defaultRentDueDay" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" />
              </div>
            </div>

            <div class="sm:col-span-3">
              <label for="late-fee" class="block text-sm/6 font-medium text-gray-900">Default Late Fee (%)</label>
              <div class="mt-2">
                <input type="number" step="0.1" id="late-fee" v-model="settings.lateFeePercentage" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" />
              </div>
            </div>

            <div class="col-span-full flex items-center justify-between gap-x-6">
              <div>
                <label for="auto-invoice" class="block text-sm/6 font-medium text-gray-900">Auto-Generate Invoices</label>
                <p class="text-sm text-gray-500">Automatically create billing records 3 days before the due date.</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" id="auto-invoice" v-model="settings.autoGenerateInvoices" class="sr-only peer">
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
          </div>
        </div>

        <div class="border-b border-gray-900/10 pb-12">
          <h2 class="text-base/7 font-semibold text-gray-900">Data & Synchronization</h2>
          <p class="mt-1 text-sm/6 text-gray-600">Manage how the progressive web app handles local data and cloud syncing.</p>

          <div class="mt-10 space-y-8">
            <div class="flex items-center justify-between gap-x-6">
              <div>
                <label for="offline-mode" class="block text-sm/6 font-medium text-gray-900">Enable Offline-First Mode</label>
                <p class="text-sm text-gray-500">Store data locally and push to the server when a connection is restored.</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" id="offline-mode" v-model="settings.offlineFirstMode" class="sr-only peer">
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>

            <div class="sm:col-span-3">
              <label for="sync-interval" class="block text-sm/6 font-medium text-gray-900">Background Sync Interval</label>
              <div class="mt-2">
                <select id="sync-interval" v-model="settings.syncInterval" :disabled="!settings.offlineFirstMode" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 disabled:opacity-50 disabled:bg-gray-100">
                  <option value="15">Every 15 minutes</option>
                  <option value="30">Every 30 minutes</option>
                  <option value="60">Every 1 hour</option>
                  <option value="manual">Manual Sync Only</option>
                </select>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div class="mt-6 flex items-center justify-end gap-x-6 pb-6">
        <button type="button" @click="resetSettings" class="text-sm/6 font-semibold text-gray-900">Reset to Defaults</button>
        <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save Settings</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Reactive settings state
const settings = ref({
  systemName: 'BHMS Admin Hub',
  currency: 'PHP',
  defaultRentDueDay: 5,
  lateFeePercentage: 2.5,
  autoGenerateInvoices: true,
  offlineFirstMode: true,
  syncInterval: '30'
});

const saveSettings = () => {
  // Replace with your API service call later
  console.log('Settings saved:', settings.value);
  alert('System settings updated successfully!');
};

const resetSettings = () => {
  if(confirm("Are you sure you want to revert to default settings?")) {
    settings.value = {
      systemName: 'BHMS Admin Hub',
      currency: 'PHP',
      defaultRentDueDay: 5,
      lateFeePercentage: 2.5,
      autoGenerateInvoices: true,
      offlineFirstMode: true,
      syncInterval: '30'
    };
  }
};
</script>