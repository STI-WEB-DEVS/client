<template>
  <div>
    <!-- Page header -->
    <div class="mb-8 flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-[#1D3557]">Blood Stock Inventory</h1>
        <p class="mt-1 text-sm text-[#457B9D]">Real-time supply monitoring and management.</p>
      </div>
      <div class="flex gap-3">
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search type..."
            class="rounded-xl border border-[#A8DADC]/60 bg-white pl-9 pr-4 py-2.5 text-sm text-[#1D3557] placeholder:text-[#457B9D]/50 shadow-sm outline-none focus:border-[#457B9D] focus:ring-2 focus:ring-[#457B9D]/20 transition-all"
          />
          <span class="absolute left-3 top-1/2 -translate-y-1/2 text-[#457B9D]/50 text-sm">🔍</span>
        </div>
        <button class="inline-flex items-center gap-2 rounded-xl bg-[#D62828] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#b52020] transition-colors">
          + Add Units
        </button>
      </div>
    </div>

    <!-- Blood type cards -->
    <div class="mb-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
      <div v-for="item in filteredInventory" :key="item.type"
        class="rounded-2xl border bg-white p-5 shadow-sm hover:shadow-md transition-all"
        :class="item.status === 'Critical' ? 'border-[#D62828]/30' : item.status === 'Low' ? 'border-yellow-300/50' : 'border-[#A8DADC]/40'">
        <div class="mb-3 flex items-start justify-between">
          <span class="text-2xl font-black text-[#1D3557]">{{ item.type }}</span>
          <span class="rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-tight"
            :class="item.status === 'Critical' ? 'bg-[#D62828]/10 text-[#D62828]' : item.status === 'Low' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'">
            {{ item.status }}
          </span>
        </div>
        <div class="space-y-2">
          <div class="flex justify-between text-xs font-semibold text-[#457B9D]">
            <span>Stock</span>
            <span class="font-bold text-[#1D3557]">{{ item.units }}u</span>
          </div>
          <div class="h-1.5 rounded-full bg-[#A8DADC]/30 overflow-hidden">
            <div class="h-full rounded-full transition-all duration-700"
              :class="item.status === 'Critical' ? 'bg-[#D62828]' : item.status === 'Low' ? 'bg-yellow-400' : 'bg-[#457B9D]'"
              :style="{ width: getProgressWidth(item.units) }">
            </div>
          </div>
          <p class="text-[10px] text-[#457B9D]/70 italic">Updated {{ item.lastUpdated }}</p>
        </div>
      </div>
    </div>

    <!-- Activity table -->
    <div class="rounded-2xl border border-[#A8DADC]/40 bg-white shadow-sm overflow-hidden">
      <div class="flex items-center justify-between border-b border-[#A8DADC]/30 px-6 py-4">
        <h3 class="font-bold text-[#1D3557]">Recent Stock Activity</h3>
        <button class="text-sm font-semibold text-[#457B9D] hover:text-[#1D3557] transition-colors">View All Logs →</button>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead>
            <tr class="border-b border-[#A8DADC]/20 bg-[#F1FAEE]">
              <th class="px-6 py-3.5 text-[11px] font-semibold uppercase tracking-widest text-[#457B9D]">Transaction ID</th>
              <th class="px-6 py-3.5 text-[11px] font-semibold uppercase tracking-widest text-[#457B9D]">Blood Type</th>
              <th class="px-6 py-3.5 text-[11px] font-semibold uppercase tracking-widest text-[#457B9D]">Amount</th>
              <th class="px-6 py-3.5 text-[11px] font-semibold uppercase tracking-widest text-[#457B9D]">Source / Destination</th>
              <th class="px-6 py-3.5 text-[11px] font-semibold uppercase tracking-widest text-[#457B9D]">Date</th>
              <th class="px-6 py-3.5 text-[11px] font-semibold uppercase tracking-widest text-[#457B9D]">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[#A8DADC]/20">
            <tr v-for="i in 3" :key="i" class="hover:bg-[#F1FAEE]/60 transition-colors">
              <td class="px-6 py-4 font-mono text-xs font-semibold text-[#457B9D]">#TRX-99{{ i }}24</td>
              <td class="px-6 py-4 text-sm font-bold text-[#D62828]">O- (Negative)</td>
              <td class="px-6 py-4 text-sm font-bold text-[#D62828]">-2 Units</td>
              <td class="px-6 py-4 text-sm text-[#457B9D]">St. Mary's ER</td>
              <td class="px-6 py-4 text-sm text-[#1D3557]">Mar 14, 2026</td>
              <td class="px-6 py-4">
                <span class="inline-flex items-center gap-1.5 rounded-full bg-[#457B9D]/10 px-2.5 py-1 text-xs font-semibold text-[#457B9D]">
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
import { ref, computed } from 'vue'

const searchQuery = ref('')

const bloodInventory = ref([
  { type: 'A+',  units: 45, status: 'Stable',   lastUpdated: '2 hours ago'  },
  { type: 'O-',  units: 8,  status: 'Critical',  lastUpdated: '15 mins ago'  },
  { type: 'B+',  units: 22, status: 'Low',       lastUpdated: '1 hour ago'   },
  { type: 'AB+', units: 56, status: 'Stable',    lastUpdated: '5 hours ago'  },
  { type: 'O+',  units: 12, status: 'Low',       lastUpdated: '45 mins ago'  },
])

const filteredInventory = computed(() =>
  bloodInventory.value.filter(item =>
    item.type.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
)

const getProgressWidth = (units) => Math.min((units / 60) * 100, 100) + '%'
</script>