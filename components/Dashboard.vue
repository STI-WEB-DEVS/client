<template>
  <div>
    <!-- Page header -->
    <div class="mb-8 flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-[#1D3557]">Good afternoon, Tom Cook</h1>
        <p class="mt-1 text-sm text-[#457B9D]">Here's what's happening at the blood bank today.</p>
      </div>
      <select class="rounded-lg border border-[#A8DADC] bg-white px-4 py-2 text-sm font-medium text-[#1D3557] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#457B9D]/30">
        <option>Last week</option>
        <option>Last month</option>
        <option>Last year</option>
      </select>
    </div>

    <!-- Stats overview -->
    <div class="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <div v-for="stat in stats" :key="stat.label" class="rounded-2xl border border-[#A8DADC]/40 bg-white p-6 shadow-sm">
        <div class="flex items-center justify-between mb-3">
          <div class="flex h-10 w-10 items-center justify-center rounded-xl" :class="stat.iconBg">
            <component :is="stat.icon" class="size-5" :class="stat.iconColor" aria-hidden="true" />
          </div>
          <span v-if="stat.trend" class="inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-bold"
            :class="stat.positive ? 'bg-green-50 text-green-700' : 'bg-red-50 text-[#D62828]'">
            {{ stat.trend }}
          </span>
        </div>
        <p class="text-sm font-medium text-[#457B9D]">{{ stat.label }}</p>
        <p class="mt-1 text-2xl font-bold text-[#1D3557]">{{ stat.value }}</p>
      </div>
    </div>

    <!-- Recent activity table -->
    <div class="rounded-2xl border border-[#A8DADC]/40 bg-white shadow-sm overflow-hidden">
      <div class="border-b border-[#A8DADC]/30 px-6 py-4">
        <h2 class="text-base font-bold text-[#1D3557]">Recent Transactions</h2>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead>
            <tr class="border-b border-[#A8DADC]/20 bg-[#F1FAEE]">
              <th class="px-6 py-3.5 text-[11px] font-semibold uppercase tracking-widest text-[#457B9D]">Order #</th>
              <th class="px-6 py-3.5 text-[11px] font-semibold uppercase tracking-widest text-[#457B9D]">Date</th>
              <th class="px-6 py-3.5 text-[11px] font-semibold uppercase tracking-widest text-[#457B9D]">Customer</th>
              <th class="px-6 py-3.5 text-[11px] font-semibold uppercase tracking-widest text-[#457B9D]">Type</th>
              <th class="px-6 py-3.5 text-[11px] font-semibold uppercase tracking-widest text-[#457B9D]">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[#A8DADC]/20">
            <tr v-for="order in orders" :key="order.id" class="hover:bg-[#F1FAEE]/60 transition-colors">
              <td class="px-6 py-4 font-mono text-xs font-semibold text-[#457B9D]">#{{ order.id }}</td>
              <td class="px-6 py-4 text-sm text-[#1D3557]">{{ order.date }}</td>
              <td class="px-6 py-4 text-sm font-medium text-[#1D3557]">{{ order.customer }}</td>
              <td class="px-6 py-4 text-sm text-[#457B9D]">{{ order.event }}</td>
              <td class="px-6 py-4">
                <span class="inline-flex items-center gap-1.5 rounded-full bg-[#A8DADC]/30 px-2.5 py-1 text-xs font-semibold text-[#1D3557]">
                  <span class="h-1.5 w-1.5 rounded-full bg-[#457B9D]"></span>
                  Dispatched
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { BeakerIcon, HeartIcon, UserGroupIcon, ChartBarIcon } from '@heroicons/vue/24/outline'

const stats = ref([
  { label: 'Total Donations', value: '1,284', trend: '+4.5%', positive: true, icon: HeartIcon, iconBg: 'bg-[#D62828]/10', iconColor: 'text-[#D62828]' },
  { label: 'Units Dispatched', value: '856',   trend: '+2.1%', positive: true, icon: BeakerIcon, iconBg: 'bg-[#457B9D]/10', iconColor: 'text-[#457B9D]' },
  { label: 'Active Donors',    value: '5,888', trend: '+4.5%', positive: true, icon: UserGroupIcon, iconBg: 'bg-[#A8DADC]/30', iconColor: 'text-[#1D3557]' },
  { label: 'Success Rate',     value: '98.2%', trend: null,    positive: true, icon: ChartBarIcon, iconBg: 'bg-green-50', iconColor: 'text-green-600' },
])

const orders = ref([
  { id: '3000', date: 'Mar 14, 2026', customer: 'Leslie Alexander', event: 'Whole Blood' },
  { id: '3001', date: 'Mar 13, 2026', customer: 'Michael Foster',   event: 'Plasma'      },
  { id: '3002', date: 'Mar 12, 2026', customer: 'Dries Vincent',    event: 'Platelets'   },
  { id: '3003', date: 'Mar 11, 2026', customer: 'Sarah Jenkins',    event: 'Whole Blood' },
])
</script>