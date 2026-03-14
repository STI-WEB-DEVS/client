<template>
  <div class="p-6 bg-slate-50 min-h-screen">
    <div class="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
      <div>
        <h1 class="text-2xl font-bold text-slate-800">Clinical Records</h1>
        <p class="text-slate-500 text-sm">Review diagnoses, treatment outcomes, and nurse observations.</p>
      </div>
      <div class="flex gap-2">
        <button class="bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-50 transition flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Export Medical Summary
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div class="lg:col-span-1 bg-white border border-slate-200 rounded-xl p-4 shadow-sm h-fit">
        <h3 class="font-bold text-slate-700 mb-4 px-2">Patients</h3>
        <div class="space-y-1">
          <button v-for="p in patients" :key="p.id" 
            @click="selectedPatient = p"
            :class="selectedPatient.id === p.id ? 'bg-green-50 text-green-700 border-green-200' : 'text-slate-600 border-transparent hover:bg-slate-50'"
            class="w-full text-left px-3 py-2 rounded-lg border text-sm font-medium transition flex justify-between items-center"
          >
            <span 
              >
              {{ p.name }} 
            </span>

            <span 
            :class="selectedPatient.id === p.id ? '' : 'text-[10px]'"> 
                {{ p.type }}
            </span>
            <span v-if="selectedPatient.id === p.id" class="h-2 w-2 bg-green-500 rounded-full"></span>
          </button>
        </div>
      </div>

      <div class="lg:col-span-3 space-y-6">
        <div v-if="selectedPatient" class="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div class="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <div>
              <h2 class="text-xl font-bold text-slate-800">{{ selectedPatient.name }}</h2>
              <p class="text-xs text-slate-500 uppercase font-bold tracking-widest mt-1">Patient History & Progress Notes</p>
              <p class="text-xs text-slate-400 italic mt-1">
                {{ selectedPatient.type && selectedPatient.type.toLowerCase() === 'homecare' ? 'View Schedule' : 'Bed: ' + selectedPatient.bedNo }}
            </p>
            </div>
            <button class="bg-green-600 text-white px-3 py-1.5 rounded-md text-xs font-bold hover:bg-blue-700 transition">
              + Add Clinical Note
            </button>
          </div>

          <div class="p-6">
            <div class="relative border-l-2 border-slate-100 ml-3 space-y-8">
              <div v-for="record in activeRecords" :key="record.id" class="relative pl-8">
                <div class="absolute -left-[9px] top-1 h-4 w-4 rounded-full border-2 border-white bg-green-500 shadow-sm"></div>
                
                <div class="bg-slate-50 border border-slate-200 rounded-xl p-4">
                  <div class="flex justify-between items-start mb-2">
                    <h4 class="font-bold text-slate-800">{{ record.title }}</h4>
                    <span class="text-[10px] font-bold text-slate-400 bg-white border border-slate-100 px-2 py-1 rounded">{{ record.date }}</span>
                  </div>
                  
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p class="text-[10px] uppercase font-bold text-slate-400 mb-1">Diagnosis/Observation</p>
                      <p class="text-sm text-slate-700">{{ record.diagnosis }}</p>
                    </div>
                    <div>
                      <p class="text-[10px] uppercase font-bold text-slate-400 mb-1">Outcome/Plan</p>
                      <p class="text-sm text-slate-700">{{ record.outcome || 'Pending next assessment' }}</p>
                    </div>
                  </div>

                  <div class="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between">
                    <span class="text-xs text-slate-500 italic">Recorded by: <span class="font-semibold text-slate-700">{{ record.recordedBy }}</span></span>
                    <button class="text-blue-600 text-xs font-bold hover:underline">View Details</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const patients = ref([
  { id: 201, name: 'Tinker Doe', bedNo: '102-A', date: 'March 14, 2026',type:'Inhouse' },
  { id: 202, name: 'Meep Doe', bedNo: '102-B', date: 'March 13, 2026',type:'Inhouse' },
  { id: 203, name: 'Invk Doe', bedNo: '301-A', date: 'March 12, 2026',type:'Inhouse' },
  { id: 204, name: 'Crystal Doe', bedNo: '301-B', date: 'March 12, 2026' ,type:'Inhouse'},
  { id: 205, name: 'Bane Doe', bedNo: null, date: 'March 14, 2026',type:'Homecare' }
]);

const selectedPatient = ref(patients.value[0]);

const activeRecords = ref([
  {
    id: 501,
    title: 'Vital Signs Monitoring',
    diagnosis: 'Normal range blood pressure and heart rate. Patient alert and cooperative.',
    outcome: 'Continue regular monitoring as per schedule.',
    date: 'March 14, 2026',
    recordedBy: 'Nurse Luna',
    type:'Inhouse'
  },
  {
    id: 502,
    title: 'Morning Wellness Check',
    diagnosis: 'Slight joint stiffness noted in the morning. Lungs clear upon auscultation.',
    outcome: 'Assisted with light stretching exercises.',
    date: 'March 13, 2026',
    recordedBy: 'Nurse Lina',
    type:'Inhouse'
  },
  {
    id: 503,
    title: 'Routine Health Assessment',
    diagnosis: 'Appetite is good. Patient reports better sleep quality over the last 24 hours.',
    outcome: 'Maintain current diet and hydration plan.',
    date: 'March 12, 2026',
    recordedBy: 'Nurse Fortune',
    type:'Inhouse'
  },
  {
    id: 504,
    title: 'Home Visit Observation',
    diagnosis: 'Environment safe. Patient compliant with medication regimen.',
    outcome: 'Scheduled follow-up visit for next week.',
    date: 'March 11, 2026',
    recordedBy: 'Nurse Ezreal',
    type: 'Homecare'
  }
]);
</script>