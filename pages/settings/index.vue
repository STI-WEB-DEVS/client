<template>
    <NuxtLayout name="default">
      <div class="py-10 px-4 sm:px-6 lg:px-8">
        <div class="mb-8">
          <h1 class="text-3xl font-extrabold text-gray-900 tracking-tight">System Settings</h1>
          <p class="mt-2 text-sm text-gray-500">Configure your dashboard preferences and system behavior.</p>
        </div>
  
        <div class="flex flex-col lg:flex-row gap-8">
          <div class="w-full lg:w-64 shrink-0">
            <nav class="flex flex-col gap-1">
              <button class="flex items-center gap-3 px-4 py-3 text-sm font-bold bg-[#0f2573] text-white rounded-xl shadow-md">
                General
              </button>
              <button class="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-600 hover:bg-gray-100 rounded-xl transition-colors">
                Notifications
              </button>
              <button class="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-600 hover:bg-gray-100 rounded-xl transition-colors">
                Privacy & Security
              </button>
              <button class="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-600 hover:bg-gray-100 rounded-xl transition-colors">
                Integrations
              </button>
            </nav>
          </div>
  
          <div class="flex-1 space-y-8">
            <div class="bg-white shadow-sm ring-1 ring-gray-200 rounded-2xl overflow-hidden">
              <div class="px-6 py-8 sm:p-10">
                <h3 class="text-lg font-bold text-gray-900 mb-8 border-b border-gray-100 pb-4">General Preferences</h3>
                
                <div class="space-y-8">
                  <div class="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
                    <label class="text-sm font-bold text-gray-700">System Language</label>
                    <div class="sm:col-span-2">
                      <select class="block w-full rounded-xl border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-[#0f2573] sm:text-sm">
                        <option>English (US)</option>
                        <option>Filipino</option>
                        <option>Spanish</option>
                      </select>
                    </div>
                  </div>
  
                  <div class="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
                    <label class="text-sm font-bold text-gray-700">Timezone</label>
                    <div class="sm:col-span-2">
                      <select class="block w-full rounded-xl border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-[#0f2573] sm:text-sm">
                        <option>(GMT+08:00) Manila, Philippine Standard Time</option>
                        <option>(GMT-08:00) Pacific Time</option>
                      </select>
                    </div>
                  </div>
  
                  <div class="grid grid-cols-1 sm:grid-cols-3 items-center gap-4 border-t border-gray-50 pt-6">
                    <div>
                      <label class="text-sm font-bold text-gray-700">Dark Mode</label>
                      <p class="text-xs text-gray-500">Enable dark theme for the interface.</p>
                    </div>
                    <div class="sm:col-span-2">
                      <button type="button" class="bg-gray-200 relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#0f2573] focus:ring-offset-2">
                        <span class="translate-x-0 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
  
              <div class="flex items-center justify-end gap-x-4 bg-gray-50 px-6 py-4 border-t border-gray-100">
                <button type="button" class="text-sm font-bold text-gray-600 hover:text-gray-900 px-4">Reset Defaults</button>
                <button type="submit" class="rounded-xl bg-[#0f2573] px-10 py-2.5 text-sm font-bold text-white shadow-md hover:bg-[#1a3a8a] transition-all">
                  Save Settings
                </button>
              </div>
            </div>
  
            <div class="bg-red-50 shadow-sm ring-1 ring-red-100 rounded-2xl p-6 sm:p-8 flex items-center justify-between">
              <div>
                <h3 class="text-lg font-bold text-red-900">Danger Zone</h3>
                <p class="text-sm text-red-600">Permanently delete your account and all system data.</p>
              </div>
              <button class="text-sm font-bold text-white bg-red-600 px-6 py-3 rounded-xl hover:bg-red-700 transition-colors">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </NuxtLayout>
  </template>