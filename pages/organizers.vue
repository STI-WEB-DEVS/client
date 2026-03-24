<template>
  <NuxtLayout>
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="font-['Syne'] text-2xl font-bold text-[#CFFFB3]">Organizers</h1>
          <p class="mt-1 font-['DM_Mono'] text-sm text-[#ADE25D]/70">Review and approve hiking organizer registrations</p>
        </div>
        <!-- Filter tabs -->
        <div class="flex gap-2">
          <button
            v-for="tab in tabs" :key="tab"
            @click="activeTab = tab"
            :class="activeTab === tab ? 'bg-[#ADE25D] text-[#3A5743]' : 'bg-transparent text-[#ADE25D] border border-[#3B7080] hover:border-[#ADE25D]'"
            class="font-['DM_Mono'] text-xs px-3 py-1.5 rounded-sm transition-colors"
          >{{ tab }}</button>
        </div>
      </div>

      <!-- Table -->
      <div class="bg-[#3B7080]/20 border border-[#3B7080] rounded-sm overflow-hidden">
        <table class="min-w-full divide-y divide-[#3B7080]/40">
          <thead>
            <tr class="bg-[#3B7080]/30">
              <th class="px-6 py-3 text-left font-['DM_Mono'] text-[10px] tracking-[0.15em] uppercase text-[#ADE25D]">Organizer</th>
              <th class="px-6 py-3 text-left font-['DM_Mono'] text-[10px] tracking-[0.15em] uppercase text-[#ADE25D]">Contact</th>
              <th class="px-6 py-3 text-left font-['DM_Mono'] text-[10px] tracking-[0.15em] uppercase text-[#ADE25D]">Submitted</th>
              <th class="px-6 py-3 text-left font-['DM_Mono'] text-[10px] tracking-[0.15em] uppercase text-[#ADE25D]">Documents</th>
              <th class="px-6 py-3 text-left font-['DM_Mono'] text-[10px] tracking-[0.15em] uppercase text-[#ADE25D]">Status</th>
              <th class="px-6 py-3 text-left font-['DM_Mono'] text-[10px] tracking-[0.15em] uppercase text-[#ADE25D]">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[#3B7080]/30">
            <tr v-for="org in filteredOrganizers" :key="org.id" class="hover:bg-[#3B7080]/20 transition-colors">
              <td class="px-6 py-4">
                <p class="font-['Syne'] text-sm font-semibold text-[#CFFFB3]">{{ org.name }}</p>
                <p class="font-['DM_Mono'] text-xs text-[#ADE25D]/60">{{ org.region }}</p>
              </td>
              <td class="px-6 py-4">
                <p class="font-['DM_Mono'] text-xs text-[#CFFFB3]">{{ org.email }}</p>
                <p class="font-['DM_Mono'] text-xs text-[#ADE25D]/60">{{ org.phone }}</p>
              </td>
              <td class="px-6 py-4 font-['DM_Mono'] text-xs text-[#ADE25D]/70">{{ org.submitted }}</td>
              <td class="px-6 py-4">
                <span :class="org.docs === 'Complete' ? 'text-[#ADE25D] bg-[#ADE25D]/10 border-[#ADE25D]/30' : 'text-[#CFFFB3]/50 bg-[#3B7080]/30 border-[#3B7080]'" class="font-['DM_Mono'] text-[10px] tracking-wider uppercase border px-2 py-0.5 rounded-sm">{{ org.docs }}</span>
              </td>
              <td class="px-6 py-4">
                <span :class="statusStyle(org.status)" class="font-['DM_Mono'] text-[10px] tracking-wider uppercase border px-2 py-0.5 rounded-sm">{{ org.status }}</span>
              </td>
              <td class="px-6 py-4">
                <div v-if="org.status === 'Pending'" class="flex gap-2">
                  <button @click="approve(org)" class="font-['DM_Mono'] text-xs bg-[#ADE25D] text-[#3A5743] px-3 py-1 rounded-sm hover:bg-[#CFFFB3] transition-colors">Approve</button>
                  <button @click="deny(org)" class="font-['DM_Mono'] text-xs border border-[#3B7080] text-[#CFFFB3]/60 px-3 py-1 rounded-sm hover:border-red-400 hover:text-red-400 transition-colors">Deny</button>
                </div>
                <span v-else class="font-['DM_Mono'] text-xs text-[#ADE25D]/40">—</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const tabs = ['All', 'Pending', 'Approved', 'Denied']
const activeTab = ref('All')

const organizers = ref([
  { id: 1, name: 'Summit Trail Co.',    region: 'Davao Region',    email: 'summit@trail.ph',   phone: '+63 912 000 0001', submitted: 'Mar 22, 2026', docs: 'Complete',   status: 'Pending' },
  { id: 2, name: 'Ridge Walkers PH',   region: 'Cordillera',      email: 'ridge@walkers.ph',  phone: '+63 912 000 0002', submitted: 'Mar 21, 2026', docs: 'Complete',   status: 'Pending' },
  { id: 3, name: 'Alpino Adventures',  region: 'SOCCSKSARGEN',    email: 'alpino@adv.ph',     phone: '+63 912 000 0003', submitted: 'Mar 19, 2026', docs: 'Incomplete', status: 'Pending' },
  { id: 4, name: 'Peak Seekers Group', region: 'Bicol Region',    email: 'peak@seekers.ph',   phone: '+63 912 000 0004', submitted: 'Mar 17, 2026', docs: 'Complete',   status: 'Approved' },
  { id: 5, name: 'Trailblaze PH',      region: 'Eastern Visayas', email: 'trail@blaze.ph',    phone: '+63 912 000 0005', submitted: 'Mar 10, 2026', docs: 'Complete',   status: 'Approved' },
  { id: 6, name: 'Wild Paths Inc.',    region: 'Zamboanga',       email: 'wild@paths.ph',     phone: '+63 912 000 0006', submitted: 'Mar 5, 2026',  docs: 'Incomplete', status: 'Denied' },
])

const filteredOrganizers = computed(() =>
  activeTab.value === 'All' ? organizers.value : organizers.value.filter(o => o.status === activeTab.value)
)

const statusStyle = (status: string) => ({
  Pending:  'text-[#ADE25D] bg-[#ADE25D]/10 border-[#ADE25D]/30',
  Approved: 'text-[#CFFFB3] bg-[#3B7080]/40 border-[#3B7080]',
  Denied:   'text-red-400 bg-red-400/10 border-red-400/30',
}[status] ?? '')

const approve = (org: any) => { org.status = 'Approved' }
const deny    = (org: any) => { org.status = 'Denied' }
</script>