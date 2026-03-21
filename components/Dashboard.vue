<template>
  <div class="min-h-screen bg-[#faf7f2] font-serif text-[#1a1108] p-8">

    <!-- Header -->
    <div class="flex justify-between items-start mb-10">
      <div>
        <p class="text-[10px] tracking-[0.3em] uppercase text-[#b0a090] mb-1">Sutura Tailoring</p>
        <h1 class="text-3xl font-bold text-[#1a1108] tracking-tight">Atelier Overview</h1>
      </div>
      <div class="flex items-center gap-3">
        <div class="text-right">
          <p class="text-xs text-[#8a7060]">Business Status</p>
          <span class="inline-flex items-center gap-1.5 text-xs font-bold text-[#2d7a3a]">
            <span class="w-2 h-2 bg-[#2d7a3a] rounded-full inline-block animate-pulse"></span>
            Active Subscription
          </span>
        </div>
        <div class="w-10 h-10 rounded-full bg-[#c9a84c] flex items-center justify-center text-white font-bold text-sm">S</div>
      </div>
    </div>

    <!-- KPI Cards -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
      <div v-for="card in kpiCards" :key="card.title"
        class="bg-white border border-[#e8ddc8] rounded-2xl p-5 hover:border-[#c9a84c] transition-all duration-200">
        <p class="text-[9px] font-bold text-[#b0a090] uppercase tracking-[0.25em] mb-3">{{ card.title }}</p>
        <div class="flex items-end justify-between">
          <h3 class="text-2xl font-bold text-[#1a1108]">{{ card.value }}</h3>
          <span :class="card.isPositive ? 'text-[#2d7a3a] bg-[#edf7ee]' : 'text-[#b94040] bg-[#fdf0f0]'"
            class="text-[10px] font-bold px-2 py-1 rounded-full">{{ card.trend }}</span>
        </div>
      </div>
    </div>

    <!-- Main Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">

      <!-- Left: Chart + Appointments -->
      <div class="lg:col-span-2 space-y-8">

        <!-- Job Order Lifecycle Bar Chart -->
        <div class="bg-white border border-[#e8ddc8] rounded-2xl p-6">
          <div class="flex justify-between items-center mb-6">
            <div>
              <h4 class="font-bold text-lg text-[#1a1108]">Job Order Lifecycle</h4>
              <p class="text-[10px] text-[#b0a090] uppercase tracking-widest mt-0.5">Current Production Pipeline</p>
            </div>
            <router-link to="/orders"
              class="text-xs font-bold text-[#c9a84c] hover:text-[#a07c3a] tracking-wider uppercase transition-colors">
              View All →
            </router-link>
          </div>
          <div class="flex items-end justify-between gap-3 h-52 px-2">
            <div v-for="step in orderFlow" :key="step.label" class="flex flex-col items-center flex-1 group">
              <p class="text-[9px] font-bold text-[#c9a84c] mb-2 opacity-0 group-hover:opacity-100 transition-all">
                {{ step.height }}%
              </p>
              <div class="w-full rounded-t-lg transition-all duration-300 group-hover:opacity-80"
                :style="{ height: step.height + '%', backgroundColor: step.color }">
              </div>
              <p class="text-[9px] font-bold mt-3 text-[#8a7060] uppercase tracking-tight text-center leading-tight">
                {{ step.label }}
              </p>
            </div>
          </div>
        </div>

        <!-- Upcoming Appointments -->
        <div class="bg-white border border-[#e8ddc8] rounded-2xl p-6">
          <h4 class="font-bold text-lg text-[#1a1108] mb-5">Upcoming Fittings</h4>
          <div class="space-y-3">
            <div v-for="apt in appointments" :key="apt.id"
              class="flex items-center justify-between p-4 rounded-xl bg-[#faf7f2] border border-[#ede4d3] hover:border-[#c9a84c] transition-all">
              <div class="flex items-center gap-4">
                <div class="w-1 h-10 rounded-full bg-[#c9a84c]"></div>
                <div class="w-8 h-8 rounded-full bg-[#f0e8d8] flex items-center justify-center text-[#8a5a20] font-bold text-sm">
                  {{ apt.customer.charAt(0) }}
                </div>
                <div>
                  <p class="font-bold text-sm text-[#1a1108]">{{ apt.customer }}</p>
                  <p class="text-xs text-[#8a7060]">{{ apt.type }} · {{ apt.time }}</p>
                </div>
              </div>
              <button @click="sendNotification(apt.customer)"
                class="text-xs font-bold text-[#c9a84c] hover:text-[#a07c3a] uppercase tracking-wider transition-colors">
                Notify
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Right: Inventory + Revenue -->
      <div class="space-y-6">

        <!-- Inventory Alert -->
        <div class="bg-white border border-[#e8ddc8] rounded-2xl p-6">
          <h4 class="font-bold text-lg text-[#1a1108] mb-5">Fabric & Supplies</h4>

          <div class="mb-6 p-4 bg-[#fdf5e8] rounded-xl border border-[#e8c87a]">
            <div class="flex justify-between items-center text-sm mb-2">
              <span class="text-[#8a5a20] font-bold text-xs uppercase tracking-wider">Premium Silk — Critical</span>
              <span class="font-black text-[#b94040] text-xs">12%</span>
            </div>
            <div class="w-full bg-[#e8c87a]/40 h-1.5 rounded-full overflow-hidden">
              <div class="bg-[#b94040] h-full rounded-full" style="width: 12%"></div>
            </div>
            <p class="text-[10px] text-[#a07040] mt-2">Reorder recommended · Textile Hub Inc.</p>
          </div>

          <div class="p-4 bg-[#faf7f2] rounded-xl border border-dashed border-[#d4c4a8]">
            <p class="text-[9px] text-[#b0a090] font-bold uppercase tracking-[0.2em] mb-1">Procurement</p>
            <p class="text-sm font-bold text-[#1a1108]">3 Pending Material Requests</p>
            <button class="mt-4 w-full bg-[#1a1108] text-[#f5e6c8] py-2.5 rounded-lg text-xs font-bold uppercase tracking-[0.15em] hover:bg-[#2a1f0f] transition-all">
              Manage Orders
            </button>
          </div>
        </div>

        <!-- Weekly Revenue -->
        <div class="bg-white border border-[#e8ddc8] rounded-2xl p-6">
          <div class="flex justify-between items-center mb-5">
            <h4 class="font-bold text-[#1a1108]">Weekly Revenue</h4>
            <span class="text-[10px] text-[#b0a090] uppercase tracking-wider">Projected</span>
          </div>
          <div class="flex items-end justify-between gap-1.5 h-28">
            <div v-for="(val, idx) in weeklyRevenue" :key="idx"
              class="flex-1 rounded-t cursor-pointer group relative transition-all duration-200 hover:opacity-80"
              :style="{ height: val + '%', backgroundColor: idx === weeklyRevenue.length - 1 ? '#c9a84c' : '#e8ddc8' }"
              :title="`Day ${idx + 1}`">
            </div>
          </div>
          <div class="flex justify-between text-[9px] text-[#b0a090] mt-3 font-bold uppercase tracking-wider">
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const kpiCards = ref([
  { title: 'Total Revenue', value: '₱145,280', trend: '+12.5%', isPositive: true },
  { title: 'Active Jobs', value: '24', trend: '+4', isPositive: true },
  { title: 'Low Stock Items', value: '8', trend: '−2', isPositive: false },
  { title: 'New Clients', value: '12', trend: '+15%', isPositive: true },
]);

const orderFlow = ref([
  { label: 'New Orders', height: 80, color: '#d4c4a8' },
  { label: 'In Production', height: 65, color: '#c9a84c' },
  { label: 'Fittings Scheduled', height: 40, color: '#a07c3a' },
  { label: 'Ready for Release', height: 95, color: '#1a1108' },
]);

const appointments = ref([
  { id: 1, customer: 'Maria Clara', type: 'First Fitting', time: '10:00 AM' },
  { id: 2, customer: 'Juan Dela Cruz', type: 'Final Gown Check', time: '1:30 PM' },
  { id: 3, customer: 'Leonor Rivera', type: 'Measurement Intake', time: '4:00 PM' },
]);

const weeklyRevenue = ref([45, 60, 55, 80, 70, 90, 85]);

const sendNotification = (customer) => {
  alert(`Sending order update to ${customer}...`);
};
</script>