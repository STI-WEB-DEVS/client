<template>
  <div class="p-8 bg-white min-h-screen rounded-3xl shadow-sm border border-gray-100 font-sans">
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-3xl font-bold text-slate-900 tracking-tight">Schedule & Appointments</h1>
        <p class="text-slate-500 mt-1">Manage fittings, consultations, and order release dates.</p>
      </div>
      <div class="flex gap-3">
        <button class="bg-indigo-50 text-indigo-600 px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-indigo-100 transition">
          View Calendar
        </button>
        <button class="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-indigo-700 transition shadow-lg shadow-indigo-100">
          + Book Appointment
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div class="lg:col-span-1 space-y-6">
        <div class="bg-slate-50 p-5 rounded-2xl border border-slate-100">
          <h3 class="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">Today's Timeline</h3>
          <div class="space-y-4">
            <div v-for="time in timeline" :key="time.hour" class="flex gap-4">
              <span class="text-xs font-bold text-slate-400 w-12">{{ time.hour }}</span>
              <div :class="time.task ? 'bg-indigo-600' : 'bg-slate-200'" class="w-1 rounded-full"></div>
              <p class="text-xs font-medium text-slate-600">{{ time.task || 'Available' }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="lg:col-span-3">
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="border-b border-slate-100 text-slate-400 text-[11px] uppercase tracking-widest font-black">
                <th class="pb-4">Customer</th>
                <th class="pb-4">Appointment Type</th>
                <th class="pb-4">Date & Time</th>
                <th class="pb-4">Status</th>
                <th class="pb-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-50">
              <tr v-for="apt in appointments" :key="apt.id" class="group hover:bg-slate-50 transition-colors">
                <td class="py-5">
                  <div class="font-bold text-slate-900">{{ apt.customer }}</div>
                  <div class="text-[10px] text-slate-400">Order #{{ apt.orderId }}</div>
                </td>
                <td class="py-5">
                  <span class="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded">
                    {{ apt.type }}
                  </span>
                </td>
                <td class="py-5">
                  <div class="text-sm font-bold text-slate-700">{{ apt.date }}</div>
                  <div class="text-xs text-slate-400">{{ apt.time }}</div>
                </td>
                <td class="py-5">
                  <span :class="getStatusClass(apt.status)" class="text-[10px] px-3 py-1 rounded-full font-black uppercase ring-1 ring-inset">
                    {{ apt.status }}
                  </span>
                </td>
                <td class="py-5 text-right">
                  <button @click="notifyCustomer(apt.customer)" class="text-indigo-600 font-bold text-xs hover:underline">
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
  { id: 1, customer: 'Maria Clara', orderId: '1001', type: 'First Fitting', date: 'March 16, 2026', time: '10:00 AM', status: 'Confirmed' },
  { id: 2, customer: 'Juan Dela Cruz', orderId: '1002', type: 'Consultation', date: 'March 16, 2026', time: '01:30 PM', status: 'Pending' },
  { id: 3, customer: 'Leonor Rivera', orderId: '1003', type: 'Order Release', date: 'March 17, 2026', time: '09:00 AM', status: 'Scheduled' },
  { id: 4, customer: 'Crisostomo Ibarra', orderId: '1004', type: 'Final Fitting', date: 'March 17, 2026', time: '03:00 PM', status: 'Confirmed' }
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
    case 'Confirmed': return 'bg-green-50 text-green-700 ring-green-600/20';
    case 'Pending': return 'bg-yellow-50 text-yellow-700 ring-yellow-600/20';
    case 'Scheduled': return 'bg-blue-50 text-blue-700 ring-blue-600/20';
    default: return 'bg-slate-50 text-slate-700 ring-slate-600/20';
  }
};

const notifyCustomer = (name) => {
  alert(`Automated notification sent to ${name} regarding their appointment.`);
};
</script>