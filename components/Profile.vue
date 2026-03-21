<template>
  <div class="min-h-screen bg-[#faf7f2] font-serif text-[#1a1108] p-8">
    <div class="max-w-4xl mx-auto">

      <!-- Header Card -->
      <div class="bg-[#1a1108] rounded-2xl p-8 mb-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
        <div class="absolute inset-0 opacity-5"
          style="background-image: repeating-linear-gradient(45deg, #c9a84c 0, #c9a84c 1px, transparent 0, transparent 50%); background-size: 12px 12px;">
        </div>
        <div class="relative z-10 flex flex-col md:flex-row items-center gap-8 w-full">
          <div class="relative flex-shrink-0">
            <div class="w-28 h-28 rounded-2xl bg-[#c9a84c] flex items-center justify-center text-[#1a1108] text-4xl font-black border-4 border-[#2a1f0f] shadow-2xl">
              {{ user.name.charAt(0) }}
            </div>
            <button class="absolute -bottom-2 -right-2 bg-[#f5e6c8] w-8 h-8 rounded-xl flex items-center justify-center shadow-md hover:bg-white transition-colors">
              <svg class="h-4 w-4 text-[#1a1108]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
            </button>
          </div>

          <div class="text-center md:text-left flex-1">
            <h1 class="text-3xl font-bold text-[#f5e6c8]">{{ user.name }}</h1>
            <p class="text-[#c9a84c] font-bold uppercase tracking-[0.2em] text-xs mt-1">{{ user.role }}</p>
            <div class="flex flex-wrap gap-3 mt-4 justify-center md:justify-start">
              <div class="bg-white/10 px-4 py-2 rounded-xl text-xs font-bold text-[#d4c4a8]">
                ID: #{{ user.id }}
              </div>
              <div class="bg-[#2d7a3a]/30 px-4 py-2 rounded-xl text-xs font-bold text-[#7ddb8a] border border-[#2d7a3a]/40">
                ● {{ user.status }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">

        <!-- Personal Details -->
        <div class="bg-white border border-[#e8ddc8] rounded-2xl p-8">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-lg font-bold text-[#1a1108]">Personal Details</h2>
            <span class="text-[10px] bg-[#f0e8d8] text-[#8a5a20] px-2 py-1 rounded-lg font-bold uppercase tracking-wider">Staff</span>
          </div>
          <div class="space-y-5">
            <div v-for="field in profileFields" :key="field.label" class="group">
              <label class="text-[9px] font-bold text-[#b0a090] uppercase tracking-[0.25em]">{{ field.label }}</label>
              <p class="text-[#1a1108] font-semibold mt-1 pb-3 border-b border-[#f0e8d8] group-last:border-0">{{ field.value }}</p>
            </div>
          </div>
          <button class="mt-8 w-full bg-[#1a1108] text-[#f5e6c8] py-3.5 rounded-xl font-bold text-sm uppercase tracking-[0.1em] hover:bg-[#2a1f0f] transition-all">
            Edit Information
          </button>
        </div>

        <!-- Permissions -->
        <div class="bg-white border border-[#e8ddc8] rounded-2xl p-8">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-lg font-bold text-[#1a1108]">Assigned Permissions</h2>
          </div>
          <div class="space-y-3">
            <div v-for="permission in permissions" :key="permission.name"
              class="flex items-center gap-3 p-3 rounded-xl transition-all"
              :class="permission.allowed ? 'bg-[#edf7ee]' : 'bg-[#faf7f2]'">
              <div class="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
                :class="permission.allowed ? 'bg-[#2d7a3a] text-white' : 'bg-[#e0d8cc] text-[#b0a090]'">
                <svg v-if="permission.allowed" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
                <svg v-else class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
                </svg>
              </div>
              <span class="text-sm font-medium" :class="permission.allowed ? 'text-[#1a1108]' : 'text-[#b0a090]'">
                {{ permission.name }}
              </span>
            </div>
          </div>

          <div class="mt-6 p-4 bg-[#fdf5e8] rounded-xl border border-[#e8c87a]">
            <p class="text-[9px] text-[#c9a84c] font-bold uppercase tracking-[0.2em] mb-1">Access Level</p>
            <p class="text-xs text-[#8a5a20] font-medium leading-relaxed">
              Your account has authorized access to manage tailoring operations and supply chain monitoring.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const user = ref({
  id: 'ST-2026-050',
  name: 'Renalyn Bulutano',
  role: 'Shop Administrator / Full-Stack Developer',
  status: 'Online',
});

const profileFields = ref([
  { label: 'Full Name', value: 'Renalyn Bulotano' },
  { label: 'Email Address', value: 'renalyn.bulotano@sutura.com' },
  { label: 'Contact Number', value: '+63 914 579  1475' },
  { label: 'Date Joined', value: 'January 2026' },
]);

const permissions = ref([
  { name: 'Customer Measurement Management', allowed: true },
  { name: 'Job Order Creation & Tracking', allowed: true },
  { name: 'Inventory & Supplier Monitoring', allowed: true },
  { name: 'Financial & Billing Access', allowed: true },
  { name: 'System Security Settings', allowed: false },
]);
</script>