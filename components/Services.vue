<template>
  <div class="p-6 bg-slate-50 min-h-screen">
    <div class="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
      <div>
        <h1 class="text-2xl font-bold text-slate-800">Service Catalog</h1>
        <p class="text-slate-500 text-sm">Manage healthcare services and pricing for this branch.</p>
      </div>
      <button class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Add New Service
      </button>
    </div>

    <div class="flex gap-4 mb-6 overflow-x-auto pb-2">
      <button v-for="cat in categories" :key="cat.id" 
        :class="selected === cat.name ? 'bg-green-600 text-white' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'"
        @click="selected = cat.name"
        class="px-4 py-2 rounded-full text-sm font-medium border whitespace-nowrap transition shadow-sm">
        {{ cat.name }}
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="service in filteredServices" :key="service.services_id" 
        class="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition group">
        
        <div class="flex justify-between items-start mb-4">
          <div class="p-2 bg-blue-50 rounded-lg group-hover:bg-green-600 group-hover:text-white transition">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.642.257a6 6 0 01-3.86.517l-2.387-.477a2 2 0 00-1.022.547l-1.168 1.168a2 2 0 00.556 3.212 9.035 9.035 0 007.146 0 2 2 0 00.556-3.212l-1.168-1.168z" />
            </svg>
          </div>
          <span class="text-xs font-bold text-slate-400 uppercase tracking-tighter">{{ service.categoryName }}</span>
        </div>

        <h3 class="text-lg font-bold text-slate-800 mb-1">{{ service.service_name }}</h3>
        <p class="text-slate-500 text-sm mb-4 line-clamp-2">Standard care protocols applied by certified personnel.</p>
        
        <div class="border-t border-slate-100 pt-4 flex justify-between items-center">
          <div>
            <p class="text-xs text-slate-400 font-medium uppercase">Rate</p>
            <p class="text-xl font-bold text-slate-900">₱{{ service.price.toLocaleString() }}</p>
          </div>
          <div class="flex gap-2">
            <button class="p-2 hover:bg-slate-100 rounded text-slate-400 hover:text-blue-600 transition" title="Edit Service">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
            <button class="p-2 hover:bg-red-50 rounded text-slate-400 hover:text-red-600 transition" title="Delete">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const selected = ref('All');

const categories = ref([
  { id: 1, name: 'All' },
  { id: 2, name: 'Clinical' },
  { id: 3, name: 'Personal Care' },
  { id: 4, name: 'Therapy' },
]);

const services = ref([
  { services_id: 1, service_name: 'Vital Signs Monitoring', categoryName: 'Clinical', price: 500.00 },
  { services_id: 2, service_name: 'Wound Dressing', categoryName: 'Clinical', price: 1200.00 },
  { services_id: 3, service_name: 'Physical Therapy (1hr)', categoryName: 'Therapy', price: 1500.00 },
  { services_id: 4, service_name: 'Assisted Bathing', categoryName: 'Personal Care', price: 800.00 },
  { services_id: 6, service_name: 'IV Insertion', categoryName: 'Clinical', price: 1800.00 },
]);

const filteredServices = computed(() => {
  if (selected.value === 'All') return services.value;
  return services.value.filter(e => e.categoryName === selected.value);
});
</script>