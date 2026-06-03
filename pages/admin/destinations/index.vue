<template>
  <div class="bg-white p-6 rounded-xl border border-slate-100">
    <h2 class="text-xl font-bold text-slate-800 mb-6">Active Destinations</h2>
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div v-for="city in cities" :key="city" class="p-4 border border-slate-100 rounded-lg hover:border-[#0088cc] cursor-pointer transition-colors text-center">
        <span class="text-slate-700 font-semibold">{{ city }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const cities = ['Palawan', 'Batanes', 'Singapore', 'Osaka', 'London', 'Paris', 'New York', 'Sydney']
</script>