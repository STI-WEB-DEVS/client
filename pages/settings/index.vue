<template>
  <div class="max-w-4xl">
    <div class="mb-8">
      <h1 class="text-2xl font-black text-[#0088cc] italic uppercase">System Configuration</h1>
      <p class="text-black font-bold mt-1">Manage your agency profile and global application settings.</p>
    </div>

    <div class="space-y-6">
      <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h3 class="text-lg font-black text-slate-900 mb-4 border-b pb-2">Agency Profile</h3>
        <div class="grid grid-cols-1 gap-y-4">
          <div>
            <label class="block text-sm font-black text-black uppercase tracking-wider">Agency Name</label>
            <input type="text" value="TravelEase Solutions" class="mt-1 block w-full rounded-lg border-slate-300 shadow-sm focus:border-[#0088cc] focus:ring-[#0088cc] font-bold text-slate-700" />
          </div>
          <div>
            <label class="block text-sm font-black text-black uppercase tracking-wider">Contact Email</label>
            <input type="email" value="admin@travelease.ph" class="mt-1 block w-full rounded-lg border-slate-300 shadow-sm focus:border-[#0088cc] focus:ring-[#0088cc] font-bold text-slate-700" />
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h3 class="text-lg font-black text-slate-900 mb-4 border-b pb-2">Preferences</h3>
        <div class="flex items-center justify-between py-3">
          <div>
            <p class="font-black text-black">Email Notifications</p>
            <p class="text-sm text-slate-500">Receive alerts when a new reservation is made.</p>
          </div>
          <button class="bg-[#0088cc] text-white px-4 py-2 rounded-lg font-bold text-xs uppercase transition-all active:scale-95">Enabled</button>
        </div>
        <div class="flex items-center justify-between py-3 border-t">
          <div>
            <p class="font-black text-black">Maintenance Mode</p>
            <p class="text-sm text-slate-500">Temporarily disable the client-side booking site.</p>
          </div>
          <button class="bg-slate-200 text-slate-600 px-4 py-2 rounded-lg font-bold text-xs uppercase">Disabled</button>
        </div>
      </div>

      <div class="flex justify-end">
        <button class="bg-[#0088cc] text-white px-10 py-3 rounded-xl font-black uppercase italic shadow-lg shadow-blue-200 hover:bg-[#0077b3] transition-all active:scale-95">
          Save All Changes
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
// Settings logic can be added here later
</script>