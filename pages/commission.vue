<template>
  <NuxtLayout>
    <div class="space-y-6">
      <div>
        <h1 class="font-['Syne'] text-2xl font-bold text-[#CFFFB3]">Sales & Commission</h1>
        <p class="mt-1 font-['DM_Mono'] text-sm text-[#ADE25D]/70">Monitor organizer sales and commission breakdown</p>
      </div>

      <!-- Summary stats -->
      <div class="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div v-for="s in summaryStats" :key="s.label" class="bg-[#3B7080]/20 border border-[#3B7080] rounded-sm p-5">
          <p class="font-['DM_Mono'] text-[10px] tracking-[0.15em] uppercase text-[#ADE25D] mb-2">{{ s.label }}</p>
          <p class="font-['Syne'] text-3xl font-bold text-[#CFFFB3]">{{ s.value }}</p>
          <p class="font-['DM_Mono'] text-xs text-[#ADE25D]/60 mt-1">{{ s.sub }}</p>
        </div>
      </div>

      <!-- Commission table -->
      <div class="bg-[#3B7080]/20 border border-[#3B7080] rounded-sm overflow-hidden">
        <div class="px-6 py-4 border-b border-[#3B7080]">
          <h2 class="font-['Syne'] text-sm font-semibold text-[#CFFFB3]">Commission per Organizer</h2>
        </div>
        <table class="min-w-full divide-y divide-[#3B7080]/40">
          <thead>
            <tr class="bg-[#3B7080]/30">
              <th class="px-6 py-3 text-left font-['DM_Mono'] text-[10px] tracking-[0.15em] uppercase text-[#ADE25D]">Organizer</th>
              <th class="px-6 py-3 text-left font-['DM_Mono'] text-[10px] tracking-[0.15em] uppercase text-[#ADE25D]">Tours</th>
              <th class="px-6 py-3 text-left font-['DM_Mono'] text-[10px] tracking-[0.15em] uppercase text-[#ADE25D]">Total Sales (PHP)</th>
              <th class="px-6 py-3 text-left font-['DM_Mono'] text-[10px] tracking-[0.15em] uppercase text-[#ADE25D]">Rate</th>
              <th class="px-6 py-3 text-left font-['DM_Mono'] text-[10px] tracking-[0.15em] uppercase text-[#ADE25D]">Commission (PHP)</th>
              <th class="px-6 py-3 text-left font-['DM_Mono'] text-[10px] tracking-[0.15em] uppercase text-[#ADE25D]">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[#3B7080]/30">
            <tr v-for="row in commissions" :key="row.id" class="hover:bg-[#3B7080]/20 transition-colors">
              <td class="px-6 py-4 font-['Syne'] text-sm font-semibold text-[#CFFFB3]">{{ row.organizer }}</td>
              <td class="px-6 py-4 font-['DM_Mono'] text-xs text-[#ADE25D]/70">{{ row.tours }}</td>
              <td class="px-6 py-4 font-['DM_Mono'] text-xs text-[#CFFFB3]">{{ row.sales.toLocaleString() }}</td>
              <td class="px-6 py-4 font-['DM_Mono'] text-xs text-[#ADE25D]">{{ row.rate }}%</td>
              <td class="px-6 py-4 font-['DM_Mono'] text-sm font-medium text-[#CFFFB3]">{{ row.commission.toLocaleString() }}</td>
              <td class="px-6 py-4">
                <span :class="row.paid ? 'text-[#ADE25D] bg-[#ADE25D]/10 border-[#ADE25D]/30' : 'text-[#CFFFB3]/50 bg-[#3B7080]/30 border-[#3B7080]'" class="font-['DM_Mono'] text-[10px] tracking-wider uppercase border px-2 py-0.5 rounded-sm">{{ row.paid ? 'Paid' : 'Pending' }}</span>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr class="bg-[#3B7080]/30">
              <td colspan="4" class="px-6 py-3 font-['DM_Mono'] text-xs text-[#ADE25D] font-medium">Total</td>
              <td class="px-6 py-3 font-['Syne'] text-sm font-bold text-[#CFFFB3]">{{ totalCommission.toLocaleString() }}</td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const summaryStats = [
  { label: 'Total Sales This Month', value: '₱842,500', sub: '+12% from last month' },
  { label: 'Total Commission',       value: '₱84,250',  sub: '10% average rate' },
  { label: 'Pending Payouts',        value: '₱31,200',  sub: '3 organizers' },
]

const commissions = [
  { id: 1, organizer: 'Summit Trail Co.',   tours: 8,  sales: 280000, rate: 10, commission: 28000, paid: true },
  { id: 2, organizer: 'Ridge Walkers PH',   tours: 5,  sales: 175000, rate: 10, commission: 17500, paid: true },
  { id: 3, organizer: 'Peak Seekers Group', tours: 6,  sales: 210000, rate: 10, commission: 21000, paid: false },
  { id: 4, organizer: 'Trailblaze PH',      tours: 3,  sales: 102500, rate: 8,  commission: 8200,  paid: false },
  { id: 5, organizer: 'Alpino Adventures',  tours: 2,  sales: 75000,  rate: 8,  commission: 6000,  paid: false },
  { id: 6, organizer: 'Wild Paths Inc.',    tours: 1,  sales: 0,      rate: 10, commission: 0,     paid: false },
]

const totalCommission = computed(() => commissions.reduce((sum, r) => sum + r.commission, 0))
</script>
