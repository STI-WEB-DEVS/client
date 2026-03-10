<template>
  <NuxtLayout>
    <div class="mb-8 border-b border-[#d0d4c9] pb-4">
      <h1 class="text-2xl font-bold text-[#2d4123]">Projects</h1>
      <p class="mt-1 text-sm text-gray-600">Manage your hiking projects and initiatives.</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="rounded-lg shadow p-6 bg-[#e6e5ce]">
        <h3 class="text-sm font-bold text-[#2d4123] uppercase">Active Projects</h3>
        <p class="mt-2 text-2xl font-bold text-gray-900">6</p>
        <p class="text-green-600 text-sm font-semibold">+2 new this month</p>
      </div>
      <div class="rounded-lg shadow p-6 bg-[#e6e5ce]">
        <h3 class="text-sm font-bold text-[#2d4123] uppercase">Completed Projects</h3>
        <p class="mt-2 text-2xl font-bold text-gray-900">18</p>
        <p class="text-green-600 text-sm font-semibold">+3 finished last month</p>
      </div>
      <div class="rounded-lg shadow p-6 bg-[#e6e5ce]">
        <h3 class="text-sm font-bold text-[#2d4123] uppercase">Upcoming Projects</h3>
        <p class="mt-2 text-2xl font-bold text-gray-900">4</p>
        <p class="text-gray-600 text-sm font-semibold">Scheduled for next quarter</p>
      </div>
    </div>

    <section class="rounded-xl shadow bg-[#e6e5ce] border border-[#d0d4c9]">
      <div class="px-6 py-4 border-b border-[#d0d4c9] bg-[#2d4123]">
        <h3 class="text-sm font-bold text-white uppercase tracking-wide">Project List</h3>
      </div>
      <div class="p-6">
        <table class="min-w-full border border-[#d0d4c9] rounded-lg shadow-sm bg-white">
          <thead class="bg-[#8FA38C]">
            <tr>
              <th class="px-4 py-2 text-left text-xs font-bold text-white uppercase">Project Name</th>
              <th class="px-4 py-2 text-left text-xs font-bold text-white uppercase">Status</th>
              <th class="px-4 py-2 text-left text-xs font-bold text-white uppercase">Start Date</th>
              <th class="px-4 py-2 text-left text-xs font-bold text-white uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="project in projects" :key="project.id" class="border-t hover:bg-[#f5f4e9]">
              <td class="px-4 py-2">{{ project.name }}</td>
              <td class="px-4 py-2">
                <span
                  :class="[
                    project.status === 'Active' ? 'text-green-600 font-bold' :
                    project.status === 'Completed' ? 'text-gray-600 font-bold' :
                    'text-[#2d4123] font-bold'
                  ]"
                >
                  {{ project.status }}
                </span>
              </td>
              <td class="px-4 py-2">{{ project.start }}</td>
              <td class="px-4 py-2">
                <button class="text-sm font-bold text-[#2d4123] hover:underline">View</button>
                <button class="ml-3 text-sm font-bold text-red-600 hover:underline">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const projects = ref([
  { id: 1, name: 'Mt. Apo Trek Organization', status: 'Active', start: 'Mar 5, 2026' },
  { id: 2, name: 'Trail Guide Compilation', status: 'Completed', start: 'Jan 10, 2026' },
  { id: 3, name: 'Weekend Hiking Event', status: 'Upcoming', start: 'Apr 2, 2026' },
  { id: 4, name: 'Eco-Clean Trek Campaign', status: 'Active', start: 'Feb 20, 2026' },
])
</script>
