<script setup>
import { ref } from 'vue';

const stats = ref([
  { label: 'Total revenue', value: '$2.6M', trend: '+4.5%', positive: true },
  { label: 'Average order value', value: '$455', trend: '-0.5%', positive: false },
  { label: 'Tickets sold', value: '5,888', trend: '+4.5%', positive: true },
  { label: 'Total revenue', value: '$823,067', trend: null, positive: true },
]);

const orders = ref([
  { id: '3000', date: 'May 9, 2024', customer: 'Leslie Alexander', event: 'Bear...' },
  { id: '3001', date: 'May 5, 2024', customer: 'Michael Foster', event: 'Six Fl...' },
  { id: '3002', date: 'Apr 28, 2024', customer: 'Dries Vincent', event: 'We Al...' },
  // ... add more as needed
]);
</script>

<template>
  <div class="min-h-screen bg-[#0B0E14] text-white p-8 font-sans">
    <header class="mb-10 flex justify-between items-center">
      <h1 class="text-2xl font-semibold">Good afternoon, Eric Sander</h1>
      <div class="relative">
        <select class="bg-[#1C212B] border border-gray-700 text-sm rounded-lg px-4 py-2 appearance-none outline-none">
          <option>Last week</option>
        </select>
      </div>
    </header>

    <section class="mb-12">
      <h2 class="text-gray-400 text-sm font-medium mb-6">Overview</h2>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div v-for="stat in stats" :key="stat.label" class="border-t border-gray-800 pt-4">
          <p class="text-gray-400 text-sm mb-2">{{ stat.label }}</p>
          <div class="flex items-baseline gap-3">
            <span class="text-3xl font-bold">{{ stat.value }}</span>
            <span v-if="stat.trend" 
                  :class="stat.positive ? 'bg-green-900/30 text-green-400' : 'bg-pink-900/30 text-pink-400'"
                  class="text-[10px] px-2 py-0.5 rounded font-bold">
              {{ stat.trend }} <span class="text-gray-500 font-normal">from last week</span>
            </span>
          </div>
        </div>
      </div>
    </section>

    <section>
      <h2 class="text-gray-400 text-sm font-medium mb-6">Recent orders</h2>
      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead>
            <tr class="text-gray-500 text-sm border-b border-gray-800">
              <th class="pb-4 font-normal">Order number</th>
              <th class="pb-4 font-normal">Purchase date</th>
              <th class="pb-4 font-normal">Customer</th>
              <th class="pb-4 font-normal">Event</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-800/50">
            <tr v-for="order in orders" :key="order.id" class="text-sm">
              <td class="py-4">{{ order.id }}</td>
              <td class="py-4">{{ order.date }}</td>
              <td class="py-4">{{ order.customer }}</td>
              <td class="py-4 flex items-center gap-2">
                <div class="w-6 h-6 rounded-full bg-gray-700"></div> {{ order.event }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>