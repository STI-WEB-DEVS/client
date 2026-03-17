<template>
  <div class="p-8 bg-[#0f172a] min-h-screen font-sans">

    <!-- Header -->
    <div class="flex justify-between items-center mb-10 border-b border-white/10 pb-8">
      <div>
        <p class="text-teal-400 text-xs font-black uppercase tracking-widest mb-2">Sutura TMS</p>
        <h1 class="text-2xl font-bold text-white">Operational Overview</h1>
        <p class="text-sm text-slate-400">Sutura Tailoring Management System</p>
      </div>
      <div class="text-sm text-slate-400">
        Business Status:
        <span class="text-teal-400 font-semibold bg-teal-400/10 px-3 py-1 rounded-full border border-teal-400/20 ml-1">
          Active Subscription
        </span>
      </div>
    </div>

    <!-- KPI Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
      <div v-for="card in kpiCards" :key="card.title"
        class="bg-white/5 border border-white/10 p-5 rounded-2xl hover:bg-white/10 transition-all">
        <p class="text-xs font-black text-slate-500 uppercase tracking-widest">{{ card.title }}</p>
        <div class="flex items-center justify-between mt-3">
          <h3 class="text-2xl font-bold text-white">{{ card.value }}</h3>
          <span :class="card.isPositive ? 'text-teal-400 bg-teal-400/10' : 'text-red-400 bg-red-400/10'"
            class="text-xs font-bold px-2 py-1 rounded-full">
            {{ card.trend }}
          </span>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2 space-y-8">

        <!-- Job Order Lifecycle -->
        <div class="bg-white/5 border border-white/10 p-6 rounded-2xl">
          <div class="flex justify-between items-center mb-8">
            <h4 class="font-bold text-white text-lg">Job Order Lifecycle</h4>
            <NuxtLink to="/orders" class="text-xs text-teal-400 font-semibold hover:underline">
              View All Orders
            </NuxtLink>
          </div>

          <!-- Lifecycle Steps -->
          <div class="flex items-center justify-between gap-2 mb-6">
            <div v-for="(step, index) in orderFlow" :key="step.label" class="flex items-center flex-1">
              <div class="flex-1 flex flex-col items-center gap-2">
                <div
                  class="w-10 h-10 rounded-full flex items-center justify-center text-sm font-black ring-1"
                  :class="index === orderFlow.length - 1
                    ? 'bg-purple-500/20 text-purple-400 ring-purple-400/30'
                    : 'bg-teal-500/20 text-teal-400 ring-teal-400/30'">
                  {{ index + 1 }}
                </div>
                <p class="text-[11px] font-bold text-slate-500 uppercase tracking-tighter text-center leading-tight">
                  {{ step.label }}
                </p>
              </div>
              <!-- Connector line between steps -->
              <div v-if="index < orderFlow.length - 1"
                class="h-px flex-1 mx-2 mb-5"
                :class="index < orderFlow.length - 2 ? 'bg-teal-500/40' : 'bg-white/10'">
              </div>
            </div>
          </div>

          <!-- Progress Bar -->
          <div class="mt-6 pt-6 border-t border-white/10">
            <div class="flex justify-between text-xs text-slate-500 mb-2">
              <span>Overall Progress</span>
              <span class="text-teal-400 font-bold">75% in progress</span>
            </div>
            <div class="w-full bg-white/10 h-2 rounded-full overflow-hidden">
              <div class="bg-teal-500 h-full rounded-full w-3/4 transition-all"></div>
            </div>
          </div>
        </div>

        <!-- Upcoming Appointments -->
        <div class="bg-white/5 border border-white/10 p-6 rounded-2xl">
          <h4 class="font-bold text-white text-lg mb-6">Upcoming Fittings & Appointments</h4>
          <div class="space-y-4">
            <div v-for="apt in appointments" :key="apt.id"
              class="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all">
              <div class="flex items-center gap-4">
                <div class="w-1 h-10 bg-teal-400 rounded-full"></div>
                <div>
                  <p class="font-bold text-sm text-white">{{ apt.customer }}</p>
                  <p class="text-xs text-slate-500">{{ apt.type }} • {{ apt.time }}</p>
                </div>
              </div>
              <button @click="sendNotification(apt.customer)"
                class="text-xs font-bold text-teal-400 hover:text-teal-300 hover:underline transition">
                Send Update
              </button>
            </div>
          </div>
        </div>

      </div>

      <!-- Right Sidebar -->
      <div class="space-y-8">
        <div class="bg-white/5 border border-white/10 p-6 rounded-2xl">
          <h4 class="font-bold text-white text-lg mb-6">Inventory & Supplies</h4>

          <!-- Critical Stock Alert -->
          <div class="mb-6 p-4 bg-red-400/10 rounded-xl border border-red-400/20">
            <div class="flex justify-between text-sm mb-2">
              <span class="text-red-400 font-bold">Fabric Stock Level</span>
              <span class="font-black text-red-400 uppercase text-xs">Critical (12%)</span>
            </div>
            <div class="w-full bg-white/10 h-2 rounded-full overflow-hidden">
              <div class="bg-red-500 h-full w-[12%] rounded-full"></div>
            </div>
            <p class="text-[10px] text-red-400/70 mt-2 font-medium">
              * System recommends reordering from Supplier: "Textile Hub Inc."
            </p>
          </div>

          <!-- Supplier Alerts -->
          <div class="bg-white/5 p-5 rounded-xl border border-dashed border-white/10">
            <p class="text-xs text-slate-500 font-black uppercase mb-2 tracking-widest">Supplier Alerts</p>
            <p class="text-sm font-medium text-slate-300">3 Pending Material Requests</p>
            <button class="mt-4 w-full bg-teal-500 text-white py-2.5 rounded-xl text-sm font-bold hover:bg-teal-400 transition-all shadow-lg shadow-teal-900/40">
              Manage Procurement
            </button>
          </div>

          <!-- Weekly Revenue Trends -->
          <div class="mt-8 border-t border-white/10 pt-6">
            <p class="text-sm font-bold text-white mb-4 flex items-center gap-2">
              Weekly Revenue Trends
              <span class="text-[10px] font-normal text-slate-500 tracking-normal">(Projected)</span>
            </p>
            <div class="flex items-end justify-between h-32 gap-1.5">
              <div v-for="(val, idx) in weeklyRevenue" :key="idx"
                class="flex-1 rounded-t-sm transition-colors cursor-help"
                :class="val === Math.max(...weeklyRevenue) ? 'bg-teal-400' : 'bg-teal-800 hover:bg-teal-600'"
                :style="{ height: val + '%' }"
                :title="`Day ${idx + 1}`">
              </div>
            </div>
            <div class="flex justify-between text-[10px] text-slate-600 mt-3 font-bold px-1">
              <span>MON</span><span>WED</span><span>FRI</span><span>SUN</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const kpiCards = ref([
  { title: 'Total Revenue',   value: '₱145,280', trend: '+12.5%', isPositive: true  },
  { title: 'Active Jobs',     value: '24',        trend: '+4',     isPositive: true  },
  { title: 'Low Stock Items', value: '8',         trend: '-2.1%',  isPositive: false },
  { title: 'New Customers',   value: '12',        trend: '+15%',   isPositive: true  }
]);

const orderFlow = ref([
  { label: 'New Orders',         height: 80 },
  { label: 'In Production',      height: 65 },
  { label: 'Fittings Scheduled', height: 40 },
  { label: 'Ready for Release',  height: 95 }
]);

const appointments = ref([
  { id: 1, customer: 'Maria Clara',    type: 'First Fitting',      time: '10:00 AM' },
  { id: 2, customer: 'Juan Dela Cruz', type: 'Final Gown Check',   time: '01:30 PM' },
  { id: 3, customer: 'Leonor Rivera',  type: 'Measurement Intake', time: '04:00 PM' }
]);

const weeklyRevenue = ref([45, 60, 55, 80, 70, 90, 85]);

const sendNotification = (customer) => {
  alert(`Sending automated order update to ${customer}...`);
};
</script>