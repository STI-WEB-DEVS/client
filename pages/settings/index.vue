<template>
  <NuxtLayout>
    <h1 class="text-2xl font-bold mb-2" style="color: #1C3028;">System Settings</h1>
    <p class="text-gray-500 mb-8">Manage your spa system preferences.</p>

    <div class="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-100">

      <div class="p-6 flex items-center justify-between">
        <div>
          <p class="font-semibold text-gray-900">Business Name</p>
          <p class="text-sm text-gray-500">Displayed across the platform</p>
        </div>
        <input type="text" value="Servora" class="rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:outline-none" style="border-color: #1C3028;" />
      </div>

      <div class="p-6 flex items-center justify-between">
        <div>
          <p class="font-semibold text-gray-900">Spa Owners Notifications</p>
          <p class="text-sm text-gray-500">Email alerts for new Spa Owners signups</p>
        </div>
        <input type="checkbox" checked class="size-4" style="accent-color: #1C3028;" />
      </div>

      <div class="p-6 flex items-center justify-between">
        <div>
          <p class="font-semibold text-gray-900">Currency</p>
          <p class="text-sm text-gray-500">Used in all payment records</p>
        </div>
        <select class="rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:outline-none">
            <option>Basic</option>
            <option>Premium</option>
            <option>Enterprise</option>
        </select>
      </div>

      <div class="p-6 flex items-center justify-between">
        <div>
          <p class="font-semibold text-gray-900">Support Hours</p>
          <p class="text-sm text-gray-500">Hours your team is available for Spa Owners support</p>
        </div>
        <div class="flex gap-2 text-sm">
          <input type="time" value="08:00" class="rounded-lg border border-gray-300 px-2 py-1.5" />
          <span class="self-center text-gray-400">to</span>
          <input type="time" value="20:00" class="rounded-lg border border-gray-300 px-2 py-1.5" />
        </div>
      </div>

    </div>

    <div class="mt-6 flex justify-end">
      <button class="px-5 py-2 rounded-lg text-white text-sm font-semibold hover:opacity-90" style="background-color: #1C3028;">
        Save Changes
      </button>
    </div>
  </NuxtLayout>
</template>