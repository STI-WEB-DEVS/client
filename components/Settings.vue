<template>
    <div class="p-6 bg-gray-50 min-h-screen">
    <h1 class="text-2xl font-bold mb-6">System Settings</h1>

    <!-- Profile Settings -->
    <div class="bg-white shadow rounded-lg p-6 mb-6">
      <h2 class="text-lg font-semibold text-gray-700 mb-4">Profile</h2>
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-600">Name</label>
          <input type="text" placeholder="Enter your name"
            class="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-600">Email</label>
          <input type="email" placeholder="Enter your email"
            class="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500" />
        </div>
      </div>
    </div>

    <!-- Preferences -->
    <div class="bg-white shadow rounded-lg p-6 mb-6">
      <h2 class="text-lg font-semibold text-gray-700 mb-4">Preferences</h2>
      <div class="flex items-center justify-between mb-4">
        <span class="text-gray-700">Dark Mode</span>
        <input type="checkbox" class="toggle-checkbox" />
      </div>
      <div class="flex items-center justify-between mb-4">
        <span class="text-gray-700">Notifications</span>
        <input type="checkbox" class="toggle-checkbox" />
      </div>
    </div>

    <!-- Save Button -->
    <div class="text-right">
      <button class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
        Save Settings
      </button>
    </div>
  </div>
</template>