<template>
  <div class="p-6 bg-slate-50 min-h-screen">
    <div class="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
      <div>
        <h1 class="text-2xl font-bold text-slate-800">Patient Directory</h1>
        <p class="text-slate-500 text-sm">Manage resident profiles, room assignments, and home care services.</p>
      </div>
      <div class="flex gap-3">
        <div class="relative">
          <input type="text" v-model="searchQuery" placeholder="Search patient..." class="pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none w-64" />
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 absolute left-3 top-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <button class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition">
          + New Admission
        </button>
      </div>
    </div>

    <div class="flex border-b border-slate-200 mb-8">
      <button 
        @click="activeTab = 'all'"
        :class="activeTab === 'all' ? 'border-green-600 text-green-600' : 'border-transparent text-slate-500 hover:text-slate-700'"
        class="px-6 py-3 border-b-2 font-bold text-sm transition-all"
      >
        All Patients
      </button>
      <button 
        @click="activeTab = 'in-house'"
        :class="activeTab === 'in-house' ? 'border-green-600 text-green-600' : 'border-transparent text-slate-500 hover:text-slate-700'"
        class="px-6 py-3 border-b-2 font-bold text-sm transition-all flex items-center gap-2"
      >
        <span class="h-2 w-2 rounded-full bg-blue-500"></span>
        In-House Facility
      </button>
      <button 
        @click="activeTab = 'home-care'"
        :class="activeTab === 'home-care' ? 'border-green-600 text-green-600' : 'border-transparent text-slate-500 hover:text-slate-700'"
        class="px-6 py-3 border-b-2 font-bold text-sm transition-all flex items-center gap-2"
      >
        <span class="h-2 w-2 rounded-full bg-orange-500"></span>
        Home Care
      </button>
    </div>

    <div v-if="filteredPatients.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="patient in filteredPatients" :key="patient.patient_id" 
        class="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition group">
        
        <div class="px-5 py-3 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
          <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ID: #{{ patient.patient_id }}</span>
          <span :class="patient.room ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'" 
            class="px-2 py-1 rounded text-[10px] font-bold uppercase">
            {{ patient.room ? 'In-House' : 'Home Care' }}
          </span>
        </div>

        <div class="p-5">
          <div class="flex items-center gap-4 mb-4">
            <div class="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-lg">
              {{ patient.first_name[0] }}{{ patient.last_name[0] }}
            </div>
            <div>
              <h3 class="font-bold text-slate-800 group-hover:text-green-600 transition">{{ patient.last_name }}, {{ patient.first_name }}</h3>
              <p class="text-xs text-slate-500">{{ calculateAge(patient.date_of_birth) }} years old • {{ patient.phone_number }}</p>
            </div>
          </div>

          <div class="space-y-2 mb-6 text-sm">
            <div class="flex justify-between">
              <span class="text-slate-400">Assignment</span>
              <span class="text-slate-700 font-medium">
                {{ patient.room ? `${patient.room} / Bed ${patient.bed}` : 'Out-patient / Home' }}
              </span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-400">{{patient.room ? 'Admitted' : 'Schedule Service'}}</span>
             <span
                :class="['text-slate-700 font-medium', { underline: !patient.room, 'cursor-pointer': !patient.room }]"
                >
                {{ patient.room ? patient.admitted_at : 'View Schedule' }}
                </span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-400">Latest Diagnosis</span>
              <span class="text-slate-700 font-medium truncate ml-4 italic">
                {{ patient.latest_diagnosis || 'No records' }}
              </span>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-2">
            <button class="text-xs font-bold py-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition">View Records</button>
            <button 
              v-if="patient.room"
              class="text-xs font-bold py-2 border border-blue-200 text-blue-600 rounded-lg hover:bg-blue-50 transition"
            >
              Transfer Room
            </button>
            <button 
              v-else
              class="text-xs font-bold py-2 border border-orange-200 text-orange-600 rounded-lg hover:bg-orange-50 transition"
            >
              Assign Caregiver
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
      <p class="text-slate-400">No patients found in this category.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const activeTab = ref('all');
const searchQuery = ref('');

const patients = ref([
  {
    patient_id: 201,
    first_name: 'Tinker',
    last_name: 'Doe',
    date_of_birth: '1945-05-12',
    phone_number: '0912-345-6789',
    admitted_at: '2026-03-14',
    room: 'Room 102',
    bed: 'A',
    latest_diagnosis: null
  },
  {
    patient_id: 202,
    first_name: 'Meep',
    last_name: 'Doe',
    date_of_birth: '1950-11-22',
    phone_number: '0917-888-1234',
    admitted_at: '2026-03-13',
    room: 'Room 102',
    bed: 'B',
    latest_diagnosis: 'Post-Stroke Rehab'
  },
  {
    patient_id: 203,
    first_name: 'Invk',
    last_name: 'Doe',
    date_of_birth: '1938-02-05',
    phone_number: '0922-111-5555',
    admitted_at: '2026-03-12',
    room: 'Room 301',
    bed: 'A',
    latest_diagnosis: 'Home-based Palliative'
  },
  {
    patient_id: 204,
    first_name: 'Crystal',
    last_name: 'Doe',
    date_of_birth: '1938-02-05',
    phone_number: '0922-111-5555',
    admitted_at: '2026-03-12',
    room: 'Room 301',
    bed: 'B',
    latest_diagnosis: null
  },
  {
    patient_id: 205,
    first_name: 'Bane',
    last_name: 'Doe',
    date_of_birth: '1938-02-05',
    phone_number: '0922-111-5555',
    admitted_at: '2026-03-14',
    room: null,
    bed: null,
    latest_diagnosis: null
  }
]);

const filteredPatients = computed(() => {
  return patients.value.filter(p => {
    const matchesSearch = (p.first_name + p.last_name).toLowerCase().includes(searchQuery.value.toLowerCase());
    
    if (activeTab.value === 'in-house') return matchesSearch && p.room !== null;
    if (activeTab.value === 'home-care') return matchesSearch && p.room === null;
    return matchesSearch;
  });
});

const calculateAge = (dob) => {
  const birthDate = new Date(dob);
  const diff = Date.now() - birthDate.getTime();
  const ageDate = new Date(diff);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};


</script>