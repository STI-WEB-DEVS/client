<template>
  <div class="max-w-4xl p-8">
    <h1 class="text-2xl font-bold mb-6">System Settings</h1>
    <section class="space-y-6 bg-white p-6 rounded-xl border">
      <div class="flex items-center justify-between border-b pb-4">
        <div>
          <p class="font-semibold">Automatic Dynamic Pricing</p>
          <p class="text-sm text-gray-500">Adjust rates based on peak hour occupancy.</p>
        </div>
        <input type="checkbox" class="toggle-emerald" checked />
      </div>
      <div class="grid grid-cols-2 gap-4">
        <label class="block text-sm font-medium">Base Hourly Rate ($)</label>
        <input type="number" value="5.00" class="border rounded p-2" />
      </div>
    </section>
  </div>
</template>