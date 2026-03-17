<template>
  <div class="p-6 bg-[#F8F9FB] min-h-screen font-sans text-[#2D3748]">
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-2xl font-bold">Operational Overview</h1>
        <p class="text-sm text-gray-500">Sutura Tailoring Management System</p>
      </div>
      <div class="text-sm text-gray-500">
        Business Status: 
        <span class="text-green-600 font-semibold bg-green-50 px-3 py-1 rounded-full border border-green-100">
          Active Subscription
        </span>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <div v-for="card in kpiCards" :key="card.title" class="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
        <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider">{{ card.title }}</p>
        <div class="flex items-center justify-between mt-2">
          <h3 class="text-2xl font-bold">{{ card.value }}</h3>
          <span :class="card.isPositive ? 'text-green-500 bg-green-50' : 'text-red-500 bg-red-50'" class="text-xs font-bold px-2 py-1 rounded-full">
            {{ card.trend }}
          </span>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2 space-y-8">
        
        <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div class="flex justify-between items-center mb-6">
            <h4 class="font-bold text-lg">Job Order Lifecycle</h4>
            <router-link to="/orders" class="text-xs text-blue-600 font-semibold hover:underline">View All Orders</router-link>
          </div>
          <div class="flex items-end justify-between h-64 px-4">
            <div v-for="step in orderFlow" :key="step.label" class="flex flex-col items-center w-1/4 group">
              <div class="w-full bg-[#4A90E2] rounded-t-md transition-all duration-300 group-hover:bg-[#357ABD]" :style="{ height: step.height + '%' }"></div>
              <p class="text-[11px] font-bold mt-3 text-gray-500 uppercase tracking-tighter text-center">{{ step.label }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h4 class="font-bold text-lg mb-4">Upcoming Fittings & Appointments</h4>
          <div class="space-y-4">
            <div v-for="apt in appointments" :key="apt.id" class="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
              <div class="flex items-center gap-4">
                <div class="w-2 h-10 bg-indigo-500 rounded-full"></div>
                <div>
                  <p class="font-bold text-sm">{{ apt.customer }}</p>
                  <p class="text-xs text-gray-500">{{ apt.type }} • {{ apt.time }}</p>
                </div>
              </div>
              <button @click="sendNotification(apt.customer)" class="text-xs font-bold text-blue-600 hover:text-blue-800 transition">
                Send Update
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="space-y-8">
        <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h4 class="font-bold text-lg mb-6">Inventory & Supplies</h4>
          
          <div class="mb-8 p-4 bg-red-50 rounded-xl border border-red-100">
            <div class="flex justify-between text-sm mb-2">
              <span class="text-red-700 font-bold">Fabric Stock Level</span>
              <span class="font-black text-red-600 uppercase">Critical (12%)</span>
            </div>
            <div class="w-full bg-red-200 h-2 rounded-full overflow-hidden">
              <div class="bg-red-600 h-full w-[12%]"></div>
            </div>
            <p class="text-[10px] text-red-500 mt-2 font-medium">* System recommends reordering from Supplier: "Textile Hub Inc."</p>
          </div>

          <div class="bg-[#F7FAFC] p-5 rounded-xl border border-dashed border-gray-200">
            <p class="text-xs text-gray-400 font-bold uppercase mb-2 tracking-widest">Supplier Alerts</p>
            <p class="text-sm font-medium text-gray-700">3 Pending Material Requests</p>
            <button class="mt-4 w-full bg-[#2D3748] text-white py-2.5 rounded-lg text-sm font-bold hover:bg-black transition-all shadow-lg shadow-gray-200">
              Manage Procurement
            </button>
          </div>

          <div class="mt-8 border-t border-gray-100 pt-6">
            <p class="text-sm font-bold mb-4 flex items-center gap-2">
              Weekly Revenue Trends
              <span class="text-[10px] font-normal text-gray-400 font-sans tracking-normal">(Projected)</span>
            </p>
            <div class="flex items-end justify-between h-32 gap-1.5">
              <div v-for="(val, idx) in weeklyRevenue" :key="idx" 
                   class="flex-1 bg-indigo-100 rounded-t-sm hover:bg-indigo-400 transition-colors cursor-help" 
                   :style="{ height: val + '%' }"
                   :title="`Day ${idx + 1}`">
              </div>
            </div>
            <div class="flex justify-between text-[10px] text-gray-400 mt-3 font-bold px-1">
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
  { title: 'Total Revenue', value: '₱145,280', trend: '+12.5%', isPositive: true },
  { title: 'Active Jobs', value: '24', trend: '+4', isPositive: true },
  { title: 'Low Stock Items', value: '8', trend: '-2.1%', isPositive: false },
  { title: 'New Customers', value: '12', trend: '+15%', isPositive: true }
]);

const orderFlow = ref([
  { label: 'New Orders', height: 80 },
  { label: 'In Production', height: 65 },
  { label: 'Fittings Scheduled', height: 40 },
  { label: 'Ready for Release', height: 95 }
]);

const appointments = ref([
  { id: 1, customer: 'Maria Clara', type: 'First Fitting', time: '10:00 AM' },
  { id: 2, customer: 'Juan Dela Cruz', type: 'Final Gown Check', time: '01:30 PM' },
  { id: 3, customer: 'Leonor Rivera', type: 'Measurement Intake', time: '04:00 PM' }
]);

const weeklyRevenue = ref([45, 60, 55, 80, 70, 90, 85]);

const sendNotification = (customer) => {
  alert(`Sending automated order update to ${customer}...`);
};
</script>