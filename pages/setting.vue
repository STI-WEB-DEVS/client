<template>
  <NuxtLayout>
    <div class="mb-8 border-b border-gray-100 pb-4">
      <h1 class="text-2xl font-bold text-gray-900">System Settings</h1>
      <p class="mt-1 text-sm text-gray-500">Manage your profile and preferences.</p>
    </div>

    <section class="rounded-xl border border-gray-200 bg-white shadow-sm mb-6">
      <div class="px-6 py-4 border-b border-gray-100 bg-gray-50">
        <h3 class="text-sm font-bold text-gray-900 uppercase tracking-wide">Profile</h3>
      </div>
      <div class="p-6 space-y-4">
        <div>
          <label class="block text-xs font-bold text-gray-500 uppercase">Full Name</label>
          <input type="text" value="Kristine Analasan" class="mt-2 block w-full rounded-lg border-gray-200 bg-gray-50 px-4 py-2 text-sm focus:ring-2 focus:ring-black outline-none" />
        </div>
        <div>
          <label class="block text-xs font-bold text-gray-500 uppercase">Email Address</label>
          <input type="email" value="analasank@gmail.com" class="mt-2 block w-full rounded-lg border-gray-200 bg-gray-50 px-4 py-2 text-sm focus:ring-2 focus:ring-black outline-none" />
        </div>
        <div>
          <label class="block text-xs font-bold text-gray-500 uppercase">Profile Photo</label>
          <div class="mt-2 flex items-center gap-x-4">
            <div class="h-12 w-12 rounded-full bg-gray-900 flex items-center justify-center text-white font-bold">TC</div>
            <button class="rounded-lg border border-gray-300 bg-white px-3 py-1 text-xs font-bold text-gray-700 hover:bg-gray-50">Change Photo</button>
          </div>
        </div>
      </div>
    </section>

    <section class="rounded-xl border border-gray-200 bg-white shadow-sm mb-6">
      <div class="px-6 py-4 border-b border-gray-100 bg-gray-50">
        <h3 class="text-sm font-bold text-gray-900 uppercase tracking-wide">Hiking 101</h3>
      </div>
      <div class="p-6">
        <div class="flex items-center justify-between p-4 rounded-lg border border-gray-100 bg-gray-50">
          <div>
            <p class="text-sm font-bold text-gray-900">Gear Checking</p>
            <p class="text-xs text-gray-500">Check all the gears available</p>
          </div>
          <input type="number" value="5" class="w-20 rounded-lg border-gray-200 p-2 text-center text-sm font-bold" />
        </div>
      </div>
    </section>

    <div class="flex justify-end gap-3">
      <button class="text-sm font-bold text-gray-500 hover:text-black">Cancel</button>
      <button class="rounded-lg bg-black px-6 py-2 text-sm font-bold text-white hover:bg-gray-800 shadow-md">Save Changes</button>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
</script>
