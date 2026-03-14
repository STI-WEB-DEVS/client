<template>
  <div class="p-6 bg-slate-50 min-h-screen">
    <div class="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
      <div>
        <h1 class="text-2xl font-bold text-slate-800">Branch Management Dashboard</h1>
        <p class="text-slate-500 text-sm">Overview of operations for Branch ID: #101</p>
      </div>
      <div class="flex gap-2">
        <button class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition shadow-sm">
          + Admit New Patient
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <div class="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Total Patients</div>
        <div class="text-3xl font-bold text-slate-800">85</div> 
        <div class="mt-2 text-green-600 text-sm font-medium">↑ 5 new this week</div>
      </div>
      <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <div class="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Bed Occupancy</div>
        <div class="text-3xl font-bold text-slate-800">92%</div>
        <div class="mt-2 w-full bg-slate-100 rounded-full h-1.5">
          <div class="bg-[#90C55C] h-1.5 rounded-full" style="width: 92%"></div>
        </div>
      </div>
      <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <div class="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">On-Duty Staff</div>
        <div class="text-3xl font-bold text-slate-800">12</div>
        <div class="mt-2 text-slate-500 text-sm font-medium">6 Nurses | 6 Caregivers</div>
      </div>
      <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <div class="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Monthly Revenue</div>
        <div class="text-3xl font-bold text-slate-800">₱245k</div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div class="p-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h3 class="font-bold text-slate-700 uppercase text-xs tracking-widest">
            {{ activeTab === 'inhouse' ? 'Recent Admissions' : 'Homecare Management' }}
          </h3>
          
          <div class="flex bg-slate-100 p-1 rounded-lg">
            <button 
              @click="activeTab = 'inhouse'"
              :class="activeTab === 'inhouse' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'"
              class="px-4 py-1.5 rounded-md text-xs font-bold transition-all"
            >
              In-House
            </button>
            <button 
              @click="activeTab = 'homecare'"
              :class="activeTab === 'homecare' ? 'bg-white shadow-sm text-orange-600' : 'text-slate-500 hover:text-slate-700'"
              class="px-4 py-1.5 rounded-md text-xs font-bold transition-all"
            >
              Home Care
            </button>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left">
            <thead class="bg-slate-50 text-slate-500 text-[10px] uppercase tracking-wider">
              <tr>
                <th class="px-6 py-4 font-semibold">Patient Name</th>
                <th class="px-6 py-4 font-semibold">{{ activeTab === 'inhouse' ? 'Room / Bed No.' : 'Service Type' }}</th>
                <th class="px-6 py-4 font-semibold">{{ activeTab === 'inhouse' ? 'Registration Date' : 'Relative Name' }}</th>
                <th class="px-6 py-4 font-semibold">{{ activeTab === 'inhouse' ? 'Status' : 'Schedules' }}</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-sm">
              <tr v-for="patient in filteredPatients" :key="patient.id" class="hover:bg-slate-50/50 transition">
                <td class="px-6 py-4">
                  <div class="font-bold text-slate-800">{{ patient.name }}</div>
                  <div class="text-[10px] text-slate-400 italic">ID: #{{ patient.id }}</div>
                </td>
                
                <td class="px-6 py-4">
                  <span v-if="activeTab === 'inhouse'" class="text-slate-600 font-medium">{{ patient.bedNo }}</span>
                  <span v-else class="text-orange-600 font-bold text-[10px] uppercase bg-orange-50 px-2 py-1 rounded">
                    {{ patient.serviceType || 'Routine Checkup' }}
                  </span>
                </td>

                <td class="px-6 py-4 text-slate-500">
                  <span v-if="activeTab === 'inhouse'" class="text-xs">{{ patient.date }}</span>
                  <span v-else class="text-slate-700 font-medium italic underline decoration-slate-200 cursor-help">
                    {{ patient.relativeName || 'No Guardian' }}
                  </span>
                </td>

                <td class="px-6 py-4">
                  <span v-if="activeTab === 'inhouse'" class="bg-green-100 text-green-700 px-2 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-tighter">
                    Stable
                  </span>
                  <button v-else class="flex items-center gap-1.5 bg-white border border-slate-200 text-blue-600 px-3 py-1.5 rounded-lg text-[10px] font-bold hover:bg-blue-50 hover:border-blue-200 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    View Applied
                  </button>
                </td>
              </tr>
              <tr v-if="filteredPatients.length === 0">
                <td colspan="4" class="px-6 py-10 text-center text-slate-400 italic text-sm">No records found.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="p-4 bg-slate-50 border-t border-slate-100 text-center">
          <a href="#" class="text-blue-600 text-xs font-bold hover:underline">
            View All {{ activeTab === 'inhouse' ? 'Residents' : 'Home Visit Logs' }}
          </a>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-5 h-fit">
        <h3 class="font-bold text-slate-700 mb-4 text-xs uppercase tracking-widest">Today's Services</h3>
        <div class="space-y-4">
          <div v-for="service in todayServices" :key="service.id" class="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100 hover:border-blue-200 transition">
            <div :class="service.name.includes('Home') ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'" class="p-2 rounded shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div>
              <p class="text-sm font-bold text-slate-800">{{ service.name }}</p>
              <p class="text-xs text-slate-500">{{ service.patient }} • {{ service.dateTime }}</p>
              <p :class="service.name.includes('Home') ? 'text-orange-600' : 'text-blue-600'" class="text-[10px] mt-1 font-bold uppercase tracking-tight">{{ service.status }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const activeTab = ref('inhouse');

const patients = [
  { id: 201, name: 'Tinker Doe', bedNo: '102-A', date: 'March 14, 2026' },
  { id: 202, name: 'Meep Doe', bedNo: '102-B', date: 'March 13, 2026' },
  { id: 203, name: 'Invk Doe', bedNo: '301-A', date: 'March 12, 2026' },
  { id: 204, name: 'Crystal Doe', bedNo: '301-B', date: 'March 12, 2026' },
  { 
    id: 205, 
    name: 'Bane Doe', 
    bedNo: null, 
    date: 'March 14, 2026',
    serviceType: 'Hospice Care',
    relativeName: 'Zeus Doe'
  }, 
];

const filteredPatients = computed(() => {
  if (activeTab.value === 'inhouse') {
    return patients.filter(p => p.bedNo !== null);
  } else {
    return patients.filter(p => p.bedNo === null);
  }
});

const todayServices = [
  { id: 1, name: 'Vital Signs Monitoring', patient: 'Tinker Doe', dateTime: '05:00 PM', status: 'Assigned to Nurse Luna' },
  { id: 2, name: 'Vital Signs Monitoring', patient: 'Meep Doe', dateTime: '05:30 PM', status: 'Assigned to Nurse Lina' },
  { id: 3, name: 'Vital Signs Monitoring', patient: 'Invk Doe', dateTime: '08:30 PM', status: 'Assigned to Nurse Fortune' },
  { id: 4, name: 'Home Visit Checkup', patient: 'Bane Doe', dateTime: '10:00 AM', status: 'Assigned to Nurse Ezreal' },
];
</script>