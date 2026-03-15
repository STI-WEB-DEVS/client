<template>
  <NuxtLayout>
    <h1 class="text-2xl font-bold mb-2" style="color: #1C3028;">Subscriptions</h1>
    <p class="text-gray-500 mb-8">Manage spa owner subscription plans.</p>

    <!-- Plan Summary Cards -->
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-3 mb-8">
      <div v-for="plan in plans" :key="plan.name" class="rounded-xl bg-white p-6 shadow-sm border border-gray-100">
        <p class="text-sm text-gray-500">{{ plan.name }}</p>
        <p class="mt-1 text-3xl font-bold" style="color: #1C3028;">{{ plan.count }}</p>
        <p class="mt-1 text-xs" style="color: #C9A96E;">{{ plan.price }} / month</p>
      </div>
    </div>

    <!-- Subscribers Table -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-100">
      <div class="p-4 grid grid-cols-5 text-xs font-semibold text-gray-400 uppercase">
        <span>Spa Name</span><span>Plan</span><span>Started</span><span>Next Billing</span><span>Status</span>
      </div>
      <div v-for="sub in subscriptions" :key="sub.id" class="p-4 grid grid-cols-5 text-sm text-gray-700">
        <span class="font-medium text-gray-900">{{ sub.name }}</span>
        <span class="font-semibold" :style="{ color: sub.plan === 'Enterprise' ? '#1C3028' : sub.plan === 'Premium' ? '#C9A96E' : '#6b7280' }">{{ sub.plan }}</span>
        <span>{{ sub.started }}</span>
        <span>{{ sub.nextBilling }}</span>
        <span class="font-semibold" :style="{ color: sub.active ? '#1C3028' : '#C9A96E' }">{{ sub.active ? 'Active' : 'Inactive' }}</span>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
const plans = [
  { name: 'Basic', count: 15, price: '₱999' },
  { name: 'Premium', count: 16, price: '₱1,999' },
  { name: 'Enterprise', count: 7, price: '₱3,999' },
]

const subscriptions = [
  { id: 1, name: 'Bliss Spa', plan: 'Premium', started: 'Mar 1, 2025', nextBilling: 'Apr 1, 2025', active: true },
  { id: 2, name: 'Serenity Wellness', plan: 'Basic', started: 'Feb 10, 2025', nextBilling: 'Mar 10, 2025', active: true },
  { id: 3, name: 'Zen Garden Spa', plan: 'Enterprise', started: 'Nov 5, 2024', nextBilling: 'Apr 5, 2025', active: true },
  { id: 4, name: 'Lotus Beauty', plan: 'Basic', started: 'Oct 1, 2024', nextBilling: '—', active: false },
  { id: 5, name: 'Aurora Spa & Wellness', plan: 'Premium', started: 'Mar 12, 2025', nextBilling: 'Apr 12, 2025', active: true },
]
</script>