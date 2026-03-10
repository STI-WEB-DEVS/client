<template>
    <NuxtLayout>
      <div class="p-6 md:p-8 bg-gray-50 min-h-screen">
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-gray-900">Settings</h1>
          <p class="text-gray-500 mt-1">Manage your account preferences and system configurations.</p>
        </div>
  
        <div class="max-w-4xl space-y-8">
          
          <section class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">Profile Information</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" placeholder="John Doe">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input type="email" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" placeholder="john@example.com">
              </div>
            </div>
          </section>
  
          <section class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">Notifications</h2>
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-900">Email Notifications</p>
                  <p class="text-xs text-gray-500">Receive news and updates via email.</p>
                </div>
                <input type="checkbox" class="w-5 h-5 text-green-600 rounded border-gray-300 focus:ring-green-500">
              </div>
              <hr class="border-gray-100">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-900">Push Notifications</p>
                  <p class="text-xs text-gray-500">Get alerts on your mobile device.</p>
                </div>
                <input type="checkbox" checked class="w-5 h-5 text-green-600 rounded border-gray-300 focus:ring-green-500">
              </div>
            </div>
          </section>
  
          <div class="flex justify-end gap-4">
            <button class="px-5 py-2 text-gray-700 font-medium hover:text-gray-900">Cancel</button>
            <button class="px-5 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition">Save Changes</button>
          </div>
        </div>
      </div>
    </NuxtLayout>
  </template>