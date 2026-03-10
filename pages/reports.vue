<template>
  <NuxtLayout>
    <div class="mb-8 border-b border-[#d0d4c9] pb-4">
      <h1 class="text-2xl font-bold text-[#2d4123]">Reports</h1>
      <p class="mt-1 text-sm text-gray-600">View and manage your hiking activity reports.</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="rounded-lg shadow p-6 bg-[#e6e5ce]">
        <h3 class="text-sm font-bold text-[#2d4123] uppercase">Monthly Hikes</h3>
        <p class="mt-2 text-2xl font-bold text-gray-900">42</p>
        <p class="text-green-600 text-sm font-semibold">+10% vs last month</p>
      </div>
      <div class="rounded-lg shadow p-6 bg-[#e6e5ce]">
        <h3 class="text-sm font-bold text-[#2d4123] uppercase">Total Distance</h3>
        <p class="mt-2 text-2xl font-bold text-gray-900">318 km</p>
        <p class="text-green-600 text-sm font-semibold">+7% growth</p>
      </div>
      <div class="rounded-lg shadow p-6 bg-[#e6e5ce]">
        <h3 class="text-sm font-bold text-[#2d4123] uppercase">Commissions Earned</h3>
        <p class="mt-2 text-2xl font-bold text-gray-900">₱45,000</p>
        <p class="text-red-600 text-sm font-semibold">-3% vs last month</p>
      </div>
    </div>

    <section class="rounded-xl shadow bg-[#e6e5ce] border border-[#d0d4c9]">
      <div class="px-6 py-4 border-b border-[#d0d4c9] bg-[#2d4123]">
        <h3 class="text-sm font-bold text-white uppercase tracking-wide">Detailed Reports</h3>
      </div>
      <div class="p-6">
        <table class="min-w-full border border-[#d0d4c9] rounded-lg shadow-sm bg-white">
          <thead class="bg-[#8FA38C]">
            <tr>
              <th class="px-4 py-2 text-left text-xs font-bold text-white uppercase">Report Name</th>
              <th class="px-4 py-2 text-left text-xs font-bold text-white uppercase">Date</th>
              <th class="px-4 py-2 text-left text-xs font-bold text-white uppercase">Type</th>
              <th class="px-4 py-2 text-left text-xs font-bold text-white uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="report in reports" :key="report.id" class="border-t hover:bg-[#f5f4e9]">
              <td class="px-4 py-2">{{ report.name }}</td>
              <td class="px-4 py-2">{{ report.date }}</td>
              <td class="px-4 py-2">{{ report.type }}</td>
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

const reports = ref([
  { id: 1, name: 'February Hiking Summary', date: 'Mar 1, 2026', type: 'Monthly' },
  { id: 2, name: 'Trail Performance Report', date: 'Feb 20, 2026', type: 'Trail Stats' },
  { id: 3, name: 'Commission Breakdown', date: 'Feb 15, 2026', type: 'Financial' },
])
</script>
