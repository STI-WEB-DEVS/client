<template>
  <div class="p-8 bg-[#FDFCFB] min-h-screen font-sans text-slate-900">
    <header class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
      <div>
        <h1 class="text-3xl font-black text-[#2D2424] tracking-tight">Furnicraft Overview</h1>
        <p class="text-gray-500 mt-1">Furniture management and real-time order tracking.</p>
      </div>
      
      <div class="flex items-center gap-3">
        <button class="flex items-center gap-2 bg-[#5D4037] hover:bg-[#4E342E] text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg active:scale-95">
          <PlusIcon class="w-5 h-5" />
          <span>New Order</span>
        </button>
      </div>
    </header>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      <div v-for="stat in stats" :key="stat.label" 
           class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-md transition-shadow">
        <div :class="['p-4 rounded-2xl', stat.bgColor]">
          <component :is="stat.icon" :class="['w-6 h-6', stat.iconColor]" />
        </div>
        <div>
          <p class="text-xs font-bold text-gray-400 uppercase tracking-widest">{{ stat.label }}</p>
          <p class="text-2xl font-black text-[#2D2424]">{{ stat.value }}</p>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
      <div class="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
        <div class="flex items-center gap-3">
          <div class="w-2 h-6 bg-[#FFB300] rounded-full"></div>
          <h3 class="text-lg font-bold text-[#2D2424]">Recent Orders</h3>
        </div>
        <button class="text-sm font-bold text-amber-700 hover:text-amber-600 transition-colors">
          View All Transactions
        </button>
      </div>
      
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="text-[11px] font-bold text-gray-400 uppercase tracking-widest bg-white">
              <th class="px-8 py-5">Order Reference</th>
              <th class="px-8 py-5">Customer</th>
              <th class="px-8 py-5">Furniture Selection</th>
              <th class="px-8 py-5">Status</th>
              <th class="px-8 py-5">Amount</th>
              <th class="px-8 py-5"></th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-for="order in orders" :key="order.ref" class="hover:bg-amber-50/20 transition-colors group">
              <td class="px-8 py-5 text-sm font-mono font-bold text-[#5D4037]">{{ order.ref }}</td>
              <td class="px-8 py-5 text-sm font-bold text-gray-900">{{ order.customer }}</td>
              <td class="px-8 py-5 text-sm text-gray-600">
                <span class="bg-gray-100 px-2 py-1 rounded text-xs font-medium">{{ order.item }}</span>
              </td>
              <td class="px-8 py-5">
                <span :class="['px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wide shadow-sm', order.statusClass]">
                  {{ order.status }}
                </span>
              </td>
              <td class="px-8 py-5 text-sm font-black text-[#2D2424]">{{ order.price }}</td>
              <td class="px-8 py-5 text-right text-gray-300 group-hover:text-amber-600 transition-colors">
                <ChevronRightIcon class="w-5 h-5 ml-auto" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { 
  ShoppingBagIcon, 
  CurrencyDollarIcon, 
  ClockIcon, 
  ArchiveBoxIcon, 
  PlusIcon, 
  ChevronRightIcon 
} from '@heroicons/vue/24/outline'

const stats = [
  { label: 'Total Orders', value: '142', icon: ShoppingBagIcon, bgColor: 'bg-amber-50', iconColor: 'text-amber-600' },
  { label: 'Revenue', value: '₱245,000', icon: CurrencyDollarIcon, bgColor: 'bg-emerald-50', iconColor: 'text-emerald-600' },
  { label: 'Pending Production', value: '12', icon: ClockIcon, bgColor: 'bg-orange-50', iconColor: 'text-orange-600' },
  { label: 'In Stock', value: '840', icon: ArchiveBoxIcon, bgColor: 'bg-stone-100', iconColor: 'text-stone-600' },
]

const orders = [
  { ref: 'FC-1092', customer: 'Amara Reyes', item: 'Narra Dining Table', status: 'In Production', price: '₱42,000', statusClass: 'bg-blue-600 text-white' },
  { ref: 'FC-1093', customer: 'Liam Tan', item: 'Scandinavian Sofa', status: 'Pending', price: '₱28,500', statusClass: 'bg-amber-500 text-white' },
  { ref: 'FC-1094', customer: 'Sofia Garcia', item: 'Oak Bed Frame', status: 'Completed', price: '₱18,200', statusClass: 'bg-emerald-600 text-white' },
]
</script>