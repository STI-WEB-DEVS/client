<template>
    <NuxtLayout>
      <div class="py-6 min-h-screen bg-gray-50/50">
        <div class="flex items-center justify-between px-4 sm:px-6 lg:px-8 mb-8">
          <div>
            <h1 class="text-2xl font-bold tracking-tight text-gray-900">Dashboard Overview</h1>
            <p class="text-sm text-gray-500">Welcome back, Sean Kenneth H. Axalan. Here’s what’s happening today.</p>
          </div>
          <button class="bg-[#0f2573] text-white px-5 py-2.5 rounded-lg text-sm font-semibold shadow-md hover:bg-[#1a3a8a] transition-all flex items-center gap-x-2">
            <PlusIcon class="size-5" />
            Create Event
          </button>
        </div>
  
        <div class="px-4 sm:px-6 lg:px-8 space-y-8">
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            <div v-for="item in stats" :key="item.name" class="relative overflow-hidden rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
              <dt>
                <div class="absolute rounded-lg bg-[#0f2573]/10 p-3">
                  <component :is="item.icon" class="size-6 text-[#0f2573]" aria-hidden="true" />
                </div>
                <p class="ml-16 truncate text-sm font-medium text-gray-500">{{ item.name }}</p>
              </dt>
              <dd class="ml-16 flex items-baseline">
                <p class="text-2xl font-bold text-gray-900">
                  {{ item.isCurrency ? '₱' : '' }}{{ item.value }}
                </p>
                <p :class="[item.changeType === 'increase' ? 'text-green-600' : 'text-red-600', 'ml-2 flex items-baseline text-xs font-semibold']">
                  {{ item.change }}
                </p>
              </dd>
            </div>
          </div>
  
          <div class="grid grid-cols-1 gap-8 xl:grid-cols-12">
            
            <div class="xl:col-span-5 bg-white rounded-xl shadow-sm ring-1 ring-gray-200 overflow-hidden">
              <div class="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
                <h3 class="font-bold text-gray-900">Live Sales Tracking</h3>
                <NuxtLink to="/events" class="text-xs font-semibold text-[#0f2573] hover:underline">View All</NuxtLink>
              </div>
              <ul class="divide-y divide-gray-100">
                <li v-for="event in activeEvents" :key="event.id" class="px-6 py-5">
                  <div class="flex items-center justify-between mb-3">
                    <span class="text-sm font-semibold text-gray-900">{{ event.name }}</span>
                    <span class="text-xs font-medium text-gray-500">{{ event.sold }} / {{ event.total }} sold</span>
                  </div>
                  <div class="w-full bg-gray-100 rounded-full h-2.5">
                    <div class="bg-[#0f2573] h-2.5 rounded-full transition-all duration-700" :style="{ width: (event.sold / event.total * 100) + '%' }"></div>
                  </div>
                </li>
              </ul>
            </div>
  
            <div class="xl:col-span-7 bg-white rounded-xl shadow-sm ring-1 ring-gray-200 overflow-hidden">
              <div class="px-6 py-5 border-b border-gray-100">
                <h3 class="font-bold text-gray-900">Recent Bookings</h3>
              </div>
              <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th class="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Customer</th>
                      <th class="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Event</th>
                      <th class="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Amount Paid</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-100 bg-white">
                    <tr v-for="order in recentOrders" :key="order.id" class="hover:bg-gray-50 transition-colors">
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm font-medium text-gray-900">{{ order.customer }}</div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <span class="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                          {{ order.event }}
                        </span>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-right font-bold text-gray-900">₱{{ order.price }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
  
          </div>
        </div>
      </div>
    </NuxtLayout>
  </template>
  
  <script setup>
  import { 
    TicketIcon, 
    CurrencyDollarIcon, 
    UsersIcon, 
    ArrowTrendingUpIcon,
    PlusIcon
  } from '@heroicons/vue/24/outline'
  
  const stats = [
    { name: 'Total Revenue', value: '1,245,600', isCurrency: true, change: '+12.5%', changeType: 'increase', icon: CurrencyDollarIcon },
    { name: 'Tickets Sold', value: '1,284', isCurrency: false, change: '+18.2%', changeType: 'increase', icon: TicketIcon },
    { name: 'Active Events', value: '12', isCurrency: false, change: '0%', changeType: 'neutral', icon: ArrowTrendingUpIcon },
    { name: 'Total Attendees', value: '892', isCurrency: false, change: '+4.3%', changeType: 'increase', icon: UsersIcon },
  ]
  
  const activeEvents = [
    { id: 1, name: 'Meet up sa mga Bugoy', sold: 850, total: 1000 },
    { id: 2, name: 'Kasal ni Binsoy', sold: 120, total: 150 },
    { id: 3, name: 'Araw ng Dabaw Bazaar', sold: 45, total: 200 },
  ]
  
  const recentOrders = [
    { id: 1, customer: 'Sean Kenneth H. Axalan', event: 'Meet up', price: '2,500.00' },
    { id: 2, customer: 'Vince David E. Canale', event: 'Kasal', price: '850.00' },
    { id: 3, customer: 'Marlo P. Deang', event: 'Bazaar', price: '5,000.00' },
  ]
  </script>