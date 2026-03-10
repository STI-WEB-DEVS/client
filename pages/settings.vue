<template>
  <NuxtLayout>
    <div class="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <p class="text-xs font-semibold uppercase tracking-widest text-amber-600">Configuration</p>
      <h1 class="mt-2 text-3xl font-bold text-slate-900">System Settings</h1>
      <p class="mt-2 text-sm text-slate-600">Manage operational defaults and security preferences for SmartPark.</p>
    </div>

    <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div class="lg:col-span-2 space-y-6">
        <!-- General Settings -->
        <div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div class="border-b border-slate-100 bg-slate-50 px-6 py-4">
            <h2 class="text-lg font-semibold text-slate-900">General Settings</h2>
          </div>
          <div class="px-6 py-4 space-y-4">
            <div>
              <label class="block text-sm font-semibold text-slate-700">System Name</label>
              <input type="text" value="SmartPark Operations" class="mt-1 block w-full rounded-xl border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200 sm:text-sm" />
            </div>
            <div>
              <label class="block text-sm font-semibold text-slate-700">Email Notifications</label>
              <label class="mt-2 flex items-center">
                <input type="checkbox" checked class="h-4 w-4 rounded border-slate-300 text-amber-500" />
                <span class="ml-2 text-sm text-slate-600">Send alerts via email</span>
              </label>
            </div>
          </div>
        </div>

        <!-- Security Settings -->
        <div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div class="border-b border-slate-100 bg-slate-50 px-6 py-4">
            <h2 class="text-lg font-semibold text-slate-900">Security Settings</h2>
          </div>
          <div class="px-6 py-4 space-y-4">
            <div>
              <label class="block text-sm font-semibold text-slate-700">Two-Factor Authentication</label>
              <label class="mt-2 flex items-center">
                <input type="checkbox" checked class="h-4 w-4 rounded border-slate-300 text-amber-500" />
                <span class="ml-2 text-sm text-slate-600">Enable 2FA for all users</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div class="space-y-6">
        <!-- System Status -->
        <div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div class="border-b border-slate-100 bg-slate-50 px-6 py-4">
            <h2 class="text-sm font-semibold text-slate-900">System Status</h2>
          </div>
          <div class="px-6 py-4 space-y-2 text-sm">
            <div class="flex justify-between items-center">
              <span class="text-slate-600">Database</span>
              <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                Connected
              </span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-slate-600">API Server</span>
              <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                Running
              </span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-slate-600">QR System</span>
              <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                Active
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-6 flex justify-end gap-4">
      <button class="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
        Cancel
      </button>
      <button class="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
        Save Changes
      </button>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
</script>