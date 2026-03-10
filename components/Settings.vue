<template>
    <div class="">
    <h1 class="text-2xl font-bold mb-6">System Settings</h1>

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
      <button class="bg-[#6D4C41] text-white px-6 py-2 rounded-lg hover:bg-[#6D4C41] transition">
        Save Settings
      </button>
    </div>
  </div>
</template>