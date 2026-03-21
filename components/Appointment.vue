<template>
  <div class="min-h-screen bg-[#faf7f2] font-serif text-[#1a1108] p-8">

    <!-- Header -->
    <div class="flex justify-between items-start mb-10">
      <div>
        <p class="text-[10px] tracking-[0.3em] uppercase text-[#b0a090] mb-1">Atelier Calendar</p>
        <h1 class="text-3xl font-bold text-[#1a1108] tracking-tight">Schedule & Appointments</h1>
        <p class="text-[#8a7060] mt-1 text-sm">Manage fittings, consultations, and order release dates.</p>
      </div>
      <div class="flex gap-3">
        <button class="bg-white border border-[#e8ddc8] text-[#4a3820] px-5 py-2.5 rounded-xl font-bold text-sm hover:border-[#c9a84c] transition-all">
          View Calendar
        </button>
        <button class="bg-[#1a1108] text-[#f5e6c8] px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-[#2a1f0f] transition-all flex items-center gap-2">
          <span class="text-[#c9a84c]">+</span> Book Appointment
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">

      <!-- Today's Timeline -->
      <div class="lg:col-span-1 space-y-4">
        <div class="bg-white border border-[#e8ddc8] rounded-2xl p-5">
          <h3 class="text-[9px] font-bold text-[#b0a090] uppercase tracking-[0.25em] mb-5">Today's Timeline</h3>
          <div class="space-y-4 relative">
            <div class="absolute left-[42px] top-2 bottom-2 w-px bg-[#ede4d3]"></div>
            <div v-for="time in timeline" :key="time.hour" class="flex gap-4 items-start relative">
              <span class="text-[10px] font-bold text-[#b0a090] w-10 flex-shrink-0 pt-0.5">{{ time.hour }}</span>
              <div class="flex-shrink-0 mt-1.5 relative z-10">
                <div :class="time.task ? 'bg-[#c9a84c] border-[#c9a84c]' : 'bg-[#faf7f2] border-[#ede4d3]'"
                  class="w-3 h-3 rounded-full border-2">
                </div>
              </div>
              <div class="flex-1 min-w-0">
                <p :class="time.task ? 'text-[#1a1108] font-bold' : 'text-[#c0b0a0]'"
                  class="text-xs leading-snug">{{ time.task || 'Available' }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Stats -->
        <div class="bg-[#1a1108] rounded-2xl p-5 text-[#f5e6c8]">
          <p class="text-[9px] font-bold text-[#c9a84c] uppercase tracking-[0.25em] mb-4">Today's Summary</p>
          <div class="space-y-3">
            <div class="flex justify-between items-center">
              <span class="text-xs text-[#a09080]">Total Appointments</span>
              <span class="font-bold">4</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-xs text-[#a09080]">Confirmed</span>
              <span class="font-bold text-[#c9a84c]">2</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-xs text-[#a09080]">Pending</span>
              <span class="font-bold text-[#f5c842]">1</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Appointments Table -->
      <div class="lg:col-span-3">
        <div class="bg-white border border-[#e8ddc8] rounded-2xl overflow-hidden">
          <div class="px-6 py-5 border-b border-[#ede4d3]">
            <h2 class="font-bold text-[#1a1108]">Upcoming Appointments</h2>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="border-b border-[#f0e8d8] bg-[#fdf9f4]">
                  <th class="px-6 py-4 text-[9px] font-bold text-[#b0a090] uppercase tracking-[0.2em]">Customer</th>
                  <th class="px-6 py-4 text-[9px] font-bold text-[#b0a090] uppercase tracking-[0.2em]">Appointment Type</th>
                  <th class="px-6 py-4 text-[9px] font-bold text-[#b0a090] uppercase tracking-[0.2em]">Date & Time</th>
                  <th class="px-6 py-4 text-[9px] font-bold text-[#b0a090] uppercase tracking-[0.2em]">Status</th>
                  <th class="px-6 py-4 text-[9px] font-bold text-[#b0a090] uppercase tracking-[0.2em] text-right">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#f5efe5]">
                <tr v-for="apt in appointments" :key="apt.id"
                  class="hover:bg-[#fdf9f4] transition-colors">
                  <td class="px-6 py-5">
                    <div class="flex items-center gap-3">
                      <div class="w-8 h-8 rounded-full bg-[#f0e8d8] flex items-center justify-center text-[#8a5a20] font-bold text-sm flex-shrink-0">
                        {{ apt.customer.charAt(0) }}
                      </div>
                      <div>
                        <div class="font-bold text-[#1a1108] text-sm">{{ apt.customer }}</div>
                        <div class="text-[10px] text-[#b0a090] font-mono">Order #{{ apt.orderId }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-5">
                    <span class="text-xs font-medium text-[#4a3820] bg-[#f0e8d8] px-3 py-1 rounded-lg">
                      {{ apt.type }}
                    </span>
                  </td>
                  <td class="px-6 py-5">
                    <div class="text-sm font-bold text-[#1a1108]">{{ apt.date }}</div>
                    <div class="text-xs text-[#8a7060]">{{ apt.time }}</div>
                  </td>
                  <td class="px-6 py-5">
                    <span :class="getStatusClass(apt.status)"
                      class="text-[10px] px-3 py-1 rounded-full font-bold uppercase border">
                      {{ apt.status }}
                    </span>
                  </td>
                  <td class="px-6 py-5 text-right">
                    <button @click="notifyCustomer(apt.customer)"
                      class="text-[#c9a84c] font-bold text-xs hover:text-[#a07c3a] uppercase tracking-wider transition-colors">
                      Send Reminder
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const appointments = ref([
  { id: 1, customer: 'Maria Clara', orderId: '1001', type: 'First Fitting', date: 'March 16, 2026', time: '10:00 AM', status: 'Confirmed' },
  { id: 2, customer: 'Juan Dela Cruz', orderId: '1002', type: 'Consultation', date: 'March 16, 2026', time: '01:30 PM', status: 'Pending' },
  { id: 3, customer: 'Leonor Rivera', orderId: '1003', type: 'Order Release', date: 'March 17, 2026', time: '09:00 AM', status: 'Scheduled' },
  { id: 4, customer: 'Crisostomo Ibarra', orderId: '1004', type: 'Final Fitting', date: 'March 17, 2026', time: '03:00 PM', status: 'Confirmed' },
]);

const timeline = ref([
  { hour: '09:00', task: 'Staff Meeting' },
  { hour: '10:00', task: 'First Fitting: M. Clara' },
  { hour: '11:00', task: null },
  { hour: '12:00', task: 'Lunch Break' },
  { hour: '01:30', task: 'Consultation: J. Dela Cruz' },
]);

const getStatusClass = (status) => {
  switch (status) {
    case 'Confirmed': return 'bg-[#edf7ee] text-[#2d7a3a] border-[#b8debb]';
    case 'Pending': return 'bg-[#fdf5e8] text-[#8a5a20] border-[#e8c87a]';
    case 'Scheduled': return 'bg-[#eef4fd] text-[#2a5fa5] border-[#b0cdf0]';
    default: return 'bg-[#f0ece8] text-[#6a5a4a] border-[#d4c4b0]';
  }
};

const notifyCustomer = (name) => {
  alert(`Reminder sent to ${name} regarding their appointment.`);
};
</script>