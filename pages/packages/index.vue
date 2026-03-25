<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-black text-slate-900 italic">Travel Packages</h1>
      <button class="bg-[#0088cc] text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-[#0077b3] transition-all">
        Create New Package
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div v-for="pkg in travelPackages" :key="pkg.id" class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden group">
        <div class="h-40 bg-slate-100"></div>
        <div class="p-5">
          <h3 class="font-black text-[#0088cc] text-lg uppercase italic">{{ pkg.title }}</h3>
          <p class="text-black font-bold text-xl mt-2">{{ pkg.price }}</p>
          <div class="mt-4 pt-4 border-t border-slate-100">
            <button class="w-full py-2 rounded-lg border-2 border-[#0088cc] text-[#0088cc] font-black text-xs uppercase tracking-widest hover:bg-[#0088cc] hover:text-white transition-all">
              Edit Package Details
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const travelPackages = [
  { id: 1, title: 'Boracay Escape', price: '₱12,500' },
  { id: 2, title: 'Kyoto Cultural', price: '₱45,900' }
]
</script>