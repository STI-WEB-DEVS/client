<template>
  <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
    <div class="p-6 border-b border-slate-200 flex justify-between items-center">
      <div>
        <h2 class="text-xl font-black text-[#0088cc] italic uppercase">Travel Agents</h2>
        <p class="text-slate-500 text-sm font-medium">Manage your active team members and their roles.</p>
      </div>
      <button class="bg-[#0088cc] text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-[#0077b3] transition-all active:scale-95 shadow-lg shadow-blue-100">
        + Add New Agent
      </button>
    </div>
    
    <table class="w-full text-left border-collapse">
      <thead class="bg-slate-50 text-slate-500 text-xs uppercase font-black tracking-widest">
        <tr>
          <th class="px-6 py-4">Agent Name</th>
          <th class="px-6 py-4">Specialization</th>
          <th class="px-6 py-4">Status</th>
          <th class="px-6 py-4 text-right">Action</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-100 text-sm text-black font-bold">
        <tr v-for="agent in agents" :key="agent.id" class="hover:bg-slate-50 transition-colors">
          <td class="px-6 py-4">
            <div class="flex items-center gap-3">
              <div class="size-8 rounded-full bg-sky-100 flex items-center justify-center text-[#0088cc]">
                {{ agent.name.charAt(0) }}
              </div>
              {{ agent.name }}
            </div>
          </td>
          <td class="px-6 py-4 text-slate-600">{{ agent.specialty }}</td>
          <td class="px-6 py-4">
            <span class="px-2 py-1 rounded text-[10px] uppercase font-black bg-green-50 text-green-600 border border-green-100">
              Active
            </span>
          </td>
          <td class="px-6 py-4 text-right">
            <button class="text-[#0088cc] hover:underline text-xs">Edit</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
const agents = [
  { id: 1, name: 'Alex Rivera', specialty: 'International Tours' },
  { id: 2, name: 'Maria Santos', specialty: 'Local Destinations' },
  { id: 3, name: 'John Doe', specialty: 'Corporate Travel' }
]
</script>