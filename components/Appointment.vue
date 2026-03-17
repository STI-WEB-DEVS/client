<template>
  <div class="p-8 bg-[#0f172a] min-h-screen rounded-3xl shadow-2xl font-sans">

    <!-- Header -->
    <div class="flex justify-between items-center mb-10 border-b border-white/10 pb-8">
      <div>
        <p class="text-teal-400 text-xs font-black uppercase tracking-widest mb-2">Sutura TMS</p>
        <h1 class="text-3xl font-bold text-white tracking-tight">Schedule & Appointments</h1>
        <p class="text-slate-400 mt-1">Manage fittings, consultations, and order release dates.</p>
      </div>
      <div class="flex gap-3">
        <button class="bg-white/5 border border-white/10 text-slate-300 px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-white/10 transition">
          View Calendar
        </button>
        <button class="bg-teal-500 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-teal-400 transition shadow-lg shadow-teal-900/40">
          + Book Appointment
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">

      <!-- Timeline Sidebar -->
      <div class="lg:col-span-1 space-y-6">
        <div class="bg-white/5 border border-white/10 p-5 rounded-2xl">
          <h3 class="text-xs font-black text-slate-500 uppercase tracking-widest mb-6">Today's Timeline</h3>
          <div class="space-y-5">
            <div v-for="time in timeline" :key="time.hour" class="flex gap-4 items-start">
              <span class="text-xs font-bold text-slate-500 w-12 shrink-0">{{ time.hour }}</span>
              <div class="flex flex-col items-center gap-1">
                <div :class="time.task ? 'bg-teal-400' : 'bg-white/10'" class="w-2 h-2 rounded-full mt-0.5"></div>
                <div :class="time.task ? 'bg-teal-400/30' : 'bg-white/5'" class="w-0.5 h-6 rounded-full"></div>
              </div>
              <p :class="time.task ? 'text-slate-300' : 'text-slate-600'" class="text-xs font-medium">
                {{ time.task || 'Available' }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Appointments Table -->
      <div class="lg:col-span-3">
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="border-b border-white/10 text-slate-500 text-[11px] uppercase tracking-widest font-black">
                <th class="pb-4">Customer</th>
                <th class="pb-4">Appointment Type</th>
                <th class="pb-4">Date & Time</th>
                <th class="pb-4">Status</th>
                <th class="pb-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-white/5">
              <tr v-for="apt in appointments" :key="apt.id" class="group hover:bg-white/5 transition-colors">
                <td class="py-5">
                  <div class="font-bold text-white">{{ apt.customer }}</div>
                  <div class="text-[10px] text-slate-500">Order #{{ apt.orderId }}</div>
                </td>
                <td class="py-5">
                  <span class="text-xs font-medium text-slate-400 bg-white/5 border border-white/10 px-2 py-1 rounded-md">
                    {{ apt.type }}
                  </span>
                </td>
                <td class="py-5">
                  <div class="text-sm font-bold text-slate-300">{{ apt.date }}</div>
                  <div class="text-xs text-slate-500">{{ apt.time }}</div>
                </td>
                <td class="py-5">
                  <span :class="getStatusClass(apt.status)" class="text-[10px] px-3 py-1 rounded-full font-black uppercase ring-1 ring-inset">
                    {{ apt.status }}
                  </span>
                </td>
                <td class="py-5 text-right">
                  <button @click="notifyCustomer(apt.customer)" class="text-teal-400 font-bold text-xs hover:text-teal-300 hover:underline transition">
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
</template>

<script setup>
import { ref } from 'vue';

const appointments = ref([
  { id: 1, customer: 'Maria Clara',      orderId: '1001', type: 'First Fitting', date: 'March 16, 2026', time: '10:00 AM', status: 'Confirmed' },
  { id: 2, customer: 'Juan Dela Cruz',   orderId: '1002', type: 'Consultation',  date: 'March 16, 2026', time: '01:30 PM', status: 'Pending' },
  { id: 3, customer: 'Leonor Rivera',    orderId: '1003', type: 'Order Release', date: 'March 17, 2026', time: '09:00 AM', status: 'Scheduled' },
  { id: 4, customer: 'Crisostomo Ibarra',orderId: '1004', type: 'Final Fitting', date: 'March 17, 2026', time: '03:00 PM', status: 'Confirmed' }
]);

const timeline = ref([
  { hour: '09:00', task: 'Staff Meeting' },
  { hour: '10:00', task: 'First Fitting: M. Clara' },
  { hour: '11:00', task: null },
  { hour: '12:00', task: 'Lunch Break' },
  { hour: '01:00', task: 'Consultation: J. Dela Cruz' }
]);

const getStatusClass = (status) => {
  switch (status) {
    case 'Confirmed': return 'bg-teal-400/10 text-teal-400 ring-teal-400/20';
    case 'Pending':   return 'bg-yellow-400/10 text-yellow-400 ring-yellow-400/20';
    case 'Scheduled': return 'bg-blue-400/10 text-blue-400 ring-blue-400/20';
    default:          return 'bg-slate-400/10 text-slate-400 ring-slate-400/20';
  }
};

const notifyCustomer = (name) => {
  alert(`Automated notification sent to ${name} regarding their appointment.`);
};
</script>