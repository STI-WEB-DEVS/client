<template>
  <div class="p-8 bg-slate-50 min-h-screen font-sans">
    <div class="max-w-4xl mx-auto">
      <div class="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 mb-8 flex flex-col md:flex-row items-center gap-8">
        <div class="relative">
          <div class="size-32 bg-indigo-100 rounded-3xl flex items-center justify-center text-indigo-600 text-4xl font-black border-4 border-white shadow-lg">
            {{ user.name.charAt(0) }}
          </div>
          <button class="absolute -bottom-2 -right-2 bg-white p-2 rounded-xl shadow-md border border-slate-100 hover:bg-slate-50 transition">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
        
        <div class="text-center md:text-left flex-1">
          <h1 class="text-3xl font-bold text-slate-900">{{ user.name }}</h1>
          <p class="text-indigo-600 font-bold uppercase tracking-widest text-sm mt-1">{{ user.role }}</p>
          <div class="flex flex-wrap gap-4 mt-4 justify-center md:justify-start">
            <div class="bg-slate-50 px-4 py-2 rounded-xl border border-slate-100 text-xs font-bold text-slate-500">
              Employee ID: #{{ user.id }}
            </div>
            <div class="bg-green-50 px-4 py-2 rounded-xl border border-green-100 text-xs font-bold text-green-600">
              System Status: {{ user.status }}
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
          <h2 class="text-lg font-bold text-slate-800 mb-6">Personal Details</h2>
          <div class="space-y-6">
            <div v-for="field in profileFields" :key="field.label" class="space-y-2">
              <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">{{ field.label }}</label>
              <p class="text-slate-900 font-semibold border-b border-slate-50 pb-2">{{ field.value }}</p>
            </div>
          </div>
          <button class="mt-8 w-full bg-slate-900 text-white py-3 rounded-2xl font-bold text-sm hover:bg-black transition shadow-lg shadow-slate-200">
            Edit Information
          </button>
        </div>

        <div class="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
          <h2 class="text-lg font-bold text-slate-800 mb-6">Assigned Permissions</h2>
          <div class="space-y-4">
            <div v-for="permission in permissions" :key="permission.name" class="flex items-center gap-3">
              <div class="p-2 rounded-lg" :class="permission.allowed ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'">
                <svg v-if="permission.allowed" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </div>
              <span class="text-sm font-medium" :class="permission.allowed ? 'text-slate-700' : 'text-slate-400'">
                {{ permission.name }}
              </span>
            </div>
          </div>
          
          <div class="mt-8 p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
            <p class="text-[10px] text-indigo-400 font-bold uppercase tracking-widest mb-1">Access Level</p>
            <p class="text-sm text-indigo-700 font-bold">Your account has authorized access to manage tailoring operations and supply chain monitoring.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const user = ref({
  id: 'ST-2026-001',
  name: 'Jossua Bongo',
  role: 'Shop Administrator / Full-Stack Developer',
  status: 'Online'
});

const profileFields = ref([
  { label: 'Full Name', value: 'Jossua Bongo' },
  { label: 'Email Address', value: 'jossua.bongo@sutura.com' },
  { label: 'Contact Number', value: '+63 912 345 6789' },
  { label: 'Date Joined', value: 'February 2026' }
]);

const permissions = ref([
  { name: 'Customer Measurement Management', allowed: true },
  { name: 'Job Order Creation & Tracking', allowed: true },
  { name: 'Inventory & Supplier Monitoring', allowed: true },
  { name: 'Financial & Billing Access', allowed: true },
  { name: 'System Security Settings', allowed: false }
]);
</script>