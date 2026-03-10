<template>
  <div class="p-8 bg-slate-50 min-h-screen">
    <header class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-3xl font-extrabold text-slate-900 tracking-tight">
          Operations Team
        </h1>
        <p class="text-slate-500 mt-1">
          Managing role-based access for SmartPark personnel.
        </p>
      </div>
      <button class="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-semibold transition shadow-md shadow-emerald-100 flex items-center gap-2">
        <span class="text-xl">+</span> Add Member
      </button>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <p class="text-sm font-medium text-slate-500 uppercase">Total Personnel</p>
        <p class="text-2xl font-bold text-slate-900">{{ team.length }}</p>
      </div>
      <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <p class="text-sm font-medium text-slate-500 uppercase">Active Now</p>
        <p class="text-2xl font-bold text-emerald-600">
          {{ team.filter(m => m.status === 'online').length }}
        </p>
      </div>
    </div>

    <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <table class="w-full text-left border-collapse">
        <thead class="bg-slate-900 text-slate-300 uppercase text-xs font-bold">
          <tr>
            <th class="px-6 py-4">Member</th>
            <th class="px-6 py-4">Role</th>
            <th class="px-6 py-4">Status</th>
            <th class="px-6 py-4">Contact</th>
            <th class="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr v-for="member in team" :key="member.id" class="hover:bg-slate-50 transition-colors">
            <td class="px-6 py-4 flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold border border-blue-200">
                {{ member.name.charAt(0) }}
              </div>
              <span class="font-semibold text-slate-900">{{ member.name }}</span>
            </td>
            <td class="px-6 py-4">
              <span :class="getRoleClass(member.role)">
                {{ member.role }}
              </span>
            </td>
            <td class="px-6 py-4">
              <div class="flex items-center gap-2">
                <span :class="member.status === 'online' ? 'bg-emerald-500' : 'bg-slate-300'" 
                      class="w-2 h-2 rounded-full"></span>
                <span class="capitalize text-sm">{{ member.status }}</span>
              </div>
            </td>
            <td class="px-6 py-4 text-sm text-slate-500">
              {{ member.email }}
            </td>
            <td class="px-6 py-4 text-right">
              <button class="text-slate-400 hover:text-blue-600 font-medium text-sm">Manage</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
// Requirement: Use the existing TeamService.ts
import { TeamService } from '/api/Team/TeamService';

const team = ref([]);

// Fetch data on component mount
onMounted(() => {
  team.value = TeamService.getAllMembers();
});

// Helper for dynamic styling
const getRoleClass = (role) => {
  const base = "px-2.5 py-0.5 rounded-full text-xs font-bold ";
  if (role === 'Admin') return base + "bg-purple-100 text-purple-700";
  if (role === 'Attendant') return base + "bg-blue-100 text-blue-700";
  return base + "bg-amber-100 text-amber-700"; // Technician
};
</script>