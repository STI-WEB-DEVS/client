<template>
  <div class="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-6">

    <!-- HEADER -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">

      <div>
        <h1 class="text-3xl font-bold text-slate-800 tracking-tight">
          Service Catalog
        </h1>
        <p class="text-slate-500 text-sm mt-1">
        </p>
      </div>

      <button
        class="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-sm flex items-center gap-2 transition"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Add New Service
      </button>

    </div>

    <!-- CATEGORY FILTER -->
    <div class="mb-6 overflow-x-auto pb-2">
      <div class="flex gap-3 w-max">

        <button
          v-for="cat in categories"
          :key="cat.id"
          @click="selected = cat.name"
          class="px-4 py-2 rounded-full text-sm font-semibold border transition whitespace-nowrap shadow-sm"
          :class="selected === cat.name
            ? 'bg-emerald-600 text-white border-emerald-600'
            : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'"
        >
          {{ cat.name }}
        </button>

      </div>
    </div>

    <!-- GRID -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

      <div
        v-for="service in filteredServices"
        :key="service.services_id"
        class="group bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition"
      >

        <!-- TOP ROW -->
        <div class="flex justify-between items-start mb-4">

          <div
            class="p-2 rounded-xl bg-slate-100 group-hover:bg-emerald-600 group-hover:text-white transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.642.257a6 6 0 01-3.86.517l-2.387-.477a2 2 0 00-1.022.547l-1.168 1.168a2 2 0 00.556 3.212 9.035 9.035 0 007.146 0 2 2 0 00.556-3.212l-1.168-1.168z"
              />
            </svg>
          </div>

          <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            {{ service.categoryName }}
          </span>

        </div>

        <!-- CONTENT -->
        <h3 class="text-lg font-bold text-slate-800 leading-tight">
          {{ service.service_name }}
        </h3>

        <p class="text-sm text-slate-500 mt-2 line-clamp-2">
          Standard care protocols applied by certified personnel.
        </p>

        <!-- FOOTER -->
        <div class="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">

          <!-- PRICE -->
          <div>
            <p class="text-[10px] uppercase font-semibold text-slate-400">
              Rate
            </p>
            <p class="text-xl font-bold text-slate-900">
              ₱{{ service.price.toLocaleString() }}
            </p>
          </div>

          <!-- ACTIONS -->
          <div class="flex gap-2">

            <button
              class="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-emerald-600 transition"
              title="Edit Service"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </button>

            <button
              class="p-2 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600 transition"
              title="Delete Service"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
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