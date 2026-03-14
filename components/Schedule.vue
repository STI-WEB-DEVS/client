<template>
  <div class="p-6 bg-slate-50 min-h-screen">
    <!-- header omitted for brevity -->

    <div class="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
      <div class="p-5 border-b border-slate-100 flex justify-between items-center bg-white">
        <h3 class="font-bold text-slate-700">Service Assignments for Today</h3>
        <input type="date" class="border border-slate-200 rounded-lg px-3 py-1 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500" v-model="selectedDate" />
      </div>
      
      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead class="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
            <tr>
              <th class="px-6 py-4 font-semibold">Patient</th>
              <th class="px-6 py-4 font-semibold">Service</th>
              <th class="px-6 py-4 font-semibold">Bed No</th>
              <th class="px-6 py-4 font-semibold text-right">Action</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 text-sm">
            <tr v-for="sched in todayServices" :key="sched.id" class="hover:bg-slate-50 transition">
              <td class="px-6 py-4">
                <span 
                  :class="['text-slate-700 font-medium', { underline: !getBedNo(sched.patient), 'cursor-pointer': !getBedNo(sched.patient) }]"
                >
                  {{ sched.patient }}
                </span>
                <div class="text-xs text-slate-400 italic">
                  {{ getBedNo(sched.patient) || 'View Schedule' }}
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="text-slate-700">{{ sched.name }}</div>
                <div class="text-xs text-slate-400 italic">{{ sched.dateTime }}</div>
              </td>
              <td class="px-6 py-4">
                {{ getBedNo(sched.patient) || '-' }}
              </td>
              <td class="px-6 py-4 text-right">
                <button class="text-slate-400 hover:text-blue-600 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const selectedDate = ref(new Date().toISOString().substr(0, 10));

const patients = [
  { id: 201, name: 'Tinker Doe', bedNo: '102-A', date: 'March 14, 2026' },
  { id: 202, name: 'Meep Doe', bedNo: '102-B', date: 'March 13, 2026' },
  { id: 203, name: 'Invk Doe', bedNo: '301-A', date: 'March 12, 2026' },
  { id: 204, name: 'Crystal Doe', bedNo: '301-B', date: 'March 12, 2026' },
  { id: 205, name: 'Bane Doe', bedNo: null, date: 'March 14, 2026', serviceType: 'Hospice Care', relativeName: 'Zeus Doe' }
];

const todayServices = [
  { id: 1, name: 'Vital Signs Monitoring', patient: 'Tinker Doe', dateTime: '05:00 PM', status: 'Assigned to Nurse Luna' },
  { id: 2, name: 'Vital Signs Monitoring', patient: 'Meep Doe', dateTime: '05:30 PM', status: 'Assigned to Nurse Lina' },
  { id: 3, name: 'Vital Signs Monitoring', patient: 'Invk Doe', dateTime: '08:30 PM', status: 'Assigned to Nurse Fortune' },
  { id: 4, name: 'Home Visit Checkup', patient: 'Bane Doe', dateTime: '10:00 AM', status: 'Assigned to Nurse Ezreal' },
];

const getBedNo = (patientName) => {
  const patient = patients.find(p => p.name === patientName);
  return patient?.bedNo || null;
};
</script>