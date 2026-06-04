<template>
  <div class="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-6">

    <!-- HEADER -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div>
        <h1 class="text-3xl font-bold text-slate-800 tracking-tight">
          Branch Management Dashboard
        </h1>
        <p class="text-slate-500 text-sm mt-1">
        </p>
      </div>

      <button
        class="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition"
      >
        + Admit New Patient
      </button>
    </div>

    <!-- STATS -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

      <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <p class="text-xs uppercase tracking-wider text-slate-400 font-semibold">
          Total Patients
        </p>
        <p class="text-3xl font-bold text-slate-800 mt-2">85</p>
        <p class="text-emerald-600 text-sm mt-2 font-medium">↑ 5 new this week</p>
      </div>

      <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <p class="text-xs uppercase tracking-wider text-slate-400 font-semibold">
          Bed Occupancy
        </p>
        <p class="text-3xl font-bold text-slate-800 mt-2">92%</p>

        <div class="w-full h-2 bg-slate-100 rounded-full mt-3 overflow-hidden">
          <div class="h-full bg-emerald-500" style="width: 92%"></div>
        </div>
      </div>

      <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <p class="text-xs uppercase tracking-wider text-slate-400 font-semibold">
          On-Duty Staff
        </p>
        <p class="text-3xl font-bold text-slate-800 mt-2">12</p>
        <p class="text-slate-500 text-sm mt-2">6 Nurses • 6 Caregivers</p>
      </div>

      <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <p class="text-xs uppercase tracking-wider text-slate-400 font-semibold">
          Monthly Revenue
        </p>
        <p class="text-3xl font-bold text-slate-800 mt-2">₱245k</p>
      </div>

    </div>

    <!-- MAIN GRID -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">

      <!-- TABLE CARD -->
      <div class="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">

        <!-- TABLE HEADER -->
        <div class="p-5 flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-100">

          <h3 class="text-xs font-bold uppercase tracking-widest text-slate-600">
            {{ activeTab === 'inhouse' ? 'Recent Admissions' : 'Homecare Management' }}
          </h3>

          <div class="flex bg-slate-100 p-1 rounded-xl">
            <button
              @click="activeTab = 'inhouse'"
              :class="activeTab === 'inhouse'
                ? 'bg-white shadow text-emerald-600'
                : 'text-slate-500 hover:text-slate-700'"
              class="px-4 py-1.5 rounded-lg text-xs font-semibold transition"
            >
              In-House
            </button>

            <button
              @click="activeTab = 'homecare'"
              :class="activeTab === 'homecare'
                ? 'bg-white shadow text-orange-600'
                : 'text-slate-500 hover:text-slate-700'"
              class="px-4 py-1.5 rounded-lg text-xs font-semibold transition"
            >
              Home Care
            </button>
          </div>

        </div>

        <!-- TABLE -->
        <div class="overflow-x-auto">
          <table class="w-full text-sm">

            <thead class="bg-slate-50 text-[10px] uppercase tracking-wider text-slate-500">
              <tr>
                <th class="px-6 py-4 text-left">Patient</th>
                <th class="px-6 py-4 text-left">
                  {{ activeTab === 'inhouse' ? 'Room / Bed' : 'Service Type' }}
                </th>
                <th class="px-6 py-4 text-left">
                  {{ activeTab === 'inhouse' ? 'Date' : 'Relative' }}
                </th>
                <th class="px-6 py-4 text-left">Status</th>
              </tr>
            </thead>

            <tbody class="divide-y divide-slate-100">

              <tr
                v-for="patient in filteredPatients"
                :key="patient.id"
                class="hover:bg-slate-50 transition"
              >
                <td class="px-6 py-4">
                  <p class="font-semibold text-slate-800">{{ patient.name }}</p>
                  <p class="text-[10px] text-slate-400">ID: #{{ patient.id }}</p>
                </td>

                <td class="px-6 py-4 text-slate-600">
                  <span v-if="activeTab === 'inhouse'">
                    {{ patient.bedNo }}
                  </span>

                  <span
                    v-else
                    class="text-[10px] font-bold uppercase text-orange-600 bg-orange-50 px-2 py-1 rounded"
                  >
                    {{ patient.serviceType || 'Routine Checkup' }}
                  </span>
                </td>

                <td class="px-6 py-4 text-slate-500">
                  <span v-if="activeTab === 'inhouse'">{{ patient.date }}</span>
                  <span v-else class="text-slate-700 italic">
                    {{ patient.relativeName || 'No Guardian' }}
                  </span>
                </td>

                <td class="px-6 py-4">
                  <span
                    v-if="activeTab === 'inhouse'"
                    class="inline-flex px-2 py-1 text-[10px] font-bold uppercase bg-emerald-100 text-emerald-700 rounded-full"
                  >
                    Stable
                  </span>

                  <button
                    v-else
                    class="inline-flex items-center gap-1 px-3 py-1.5 text-[10px] font-semibold text-blue-600 bg-white border border-slate-200 rounded-lg hover:bg-blue-50 transition"
                  >
                    View
                  </button>
                </td>

              </tr>

              <tr v-if="filteredPatients.length === 0">
                <td colspan="4" class="text-center py-10 text-slate-400 italic">
                  No records found.
                </td>
              </tr>

            </tbody>
          </table>
        </div>

        <div class="p-4 bg-slate-50 text-center border-t border-slate-100">
          <a href="#" class="text-xs font-semibold text-blue-600 hover:underline">
            View All {{ activeTab === 'inhouse' ? 'Residents' : 'Home Visit Logs' }}
          </a>
        </div>

      </div>

      <!-- SIDEBAR -->
      <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 h-fit">

        <h3 class="text-xs font-bold uppercase tracking-widest text-slate-600 mb-4">
          Today's Services
        </h3>

        <div class="space-y-3">

          <div
            v-for="service in todayServices"
            :key="service.id"
            class="flex gap-3 p-3 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white transition"
          >

            <div
              :class="service.name.includes('Home')
                ? 'bg-orange-100 text-orange-600'
                : 'bg-emerald-100 text-emerald-600'"
              class="p-2 rounded-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>

            <div>
              <p class="font-semibold text-sm text-slate-800">
                {{ service.name }}
              </p>
              <p class="text-xs text-slate-500">
                {{ service.patient }} • {{ service.dateTime }}
              </p>
              <p
                :class="service.name.includes('Home') ? 'text-orange-600' : 'text-emerald-600'"
                class="text-[10px] font-bold uppercase mt-1"
              >
                {{ service.status }}
              </p>
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
  { id: 201, name: 'John Doe', bedNo: '102-A', date: 'March 14, 2026' },
  { id: 202, name: 'Jane Doe', bedNo: '102-B', date: 'March 13, 2026' },
  { id: 203, name: 'Jim Doe', bedNo: '301-A', date: 'March 12, 2026' },
  { id: 204, name: 'Joe Doe', bedNo: '301-B', date: 'March 12, 2026' },
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
  { id: 1, name: 'Vital Signs Monitoring', patient: 'John Doe', dateTime: '05:00 PM', status: 'Assigned to Nurse Luna' },
  { id: 2, name: 'Vital Signs Monitoring', patient: 'Jane Doe', dateTime: '05:30 PM', status: 'Assigned to Nurse Lina' },
  { id: 3, name: 'Vital Signs Monitoring', patient: 'Jim Doe', dateTime: '08:30 PM', status: 'Assigned to Nurse Fortune' },
  { id: 4, name: 'Home Visit Checkup', patient: 'Bane Doe', dateTime: '10:00 AM', status: 'Assigned to Nurse Ezreal' },
];
</script>