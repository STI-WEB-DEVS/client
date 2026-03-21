<template>
  <NuxtLayout>
    <div class="p-8 bg-gray-50 min-h-screen">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">System Settings</h1>
        <p class="text-gray-500 mb-8">Manage terminal configurations and system preferences.</p>

        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div class="p-6 border-b border-gray-100">
            <h3 class="font-bold text-lg mb-4">Admin Profile</h3>
            <div class="flex items-center gap-4">
              <div class="h-20 w-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                JG
              </div>
              <div>
                <p class="font-bold text-gray-800">Joshua Galo</p>
                <p class="text-sm text-gray-500">System Administrator - Davao Terminal</p>
                <button class="mt-2 text-sm text-blue-600 font-semibold hover:underline">Change Photo</button>
              </div>
            </div>
          </div>

          <div class="p-6 space-y-6">
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2">Terminal Name</label>
              <input type="text" value="Davao City Central Depot" class="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2">System Currency</label>
              <select class="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                <option>Philippine Peso (₱)</option>
                <option>US Dollar ($)</option>
              </select>
            </div>
          </div>

          <div class="p-6 bg-gray-50 flex justify-end">
            <button class="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>