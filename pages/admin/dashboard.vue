<template>
  <div class="py-6">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

      <!-- Header -->
      <h1 class="text-2xl font-bold text-slate-900">Customers</h1>
      <p class="text-slate-500">Manage and monitor your TravelEase customers.</p>

      <!-- Stats -->
      <div class="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="stat in stats"
          :key="stat.name"
          class="relative overflow-hidden rounded-xl bg-white p-6 shadow-sm border border-slate-100"
        >
          <div class="flex items-center">
            <div class="rounded-lg bg-sky-500/10 p-3">
              <component
                :is="stat.icon"
                class="h-6 w-6 text-sky-600"
                aria-hidden="true"
              />
            </div>

            <div class="ml-5">
              <p class="truncate text-sm font-medium text-slate-500">
                {{ stat.name }}
              </p>
              <p class="text-2xl font-semibold text-slate-900">
                {{ stat.value }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Customer Table -->
      <div class="mt-10 overflow-hidden rounded-xl bg-white shadow-sm border border-slate-100">
        <div class="px-6 py-4 border-b border-slate-100">
          <h2 class="text-lg font-semibold text-slate-900">Customer List</h2>
        </div>

        <table class="min-w-full divide-y divide-slate-100">
          <thead class="bg-slate-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Name</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Email</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Joined</th>
            </tr>
          </thead>

          <tbody class="divide-y divide-slate-100 bg-white">
            <tr v-for="customer in customers" :key="customer.id">
              <td class="px-6 py-4 text-sm font-medium text-slate-900">
                {{ customer.name }}
              </td>
              <td class="px-6 py-4 text-sm text-slate-500">
                {{ customer.email }}
              </td>
              <td class="px-6 py-4 text-sm">
                <span
                  class="inline-flex rounded-full px-2 py-1 text-xs font-medium"
                  :class="customer.status === 'Active'
                    ? 'bg-green-50 text-green-700'
                    : 'bg-yellow-50 text-yellow-700'"
                >
                  {{ customer.status }}
                </span>
              </td>
              <td class="px-6 py-4 text-sm text-slate-500">
                {{ customer.joined }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  </div>
</template>

<script setup>
import { TicketIcon, UserGroupIcon, GlobeAmericasIcon, BanknotesIcon } from '@heroicons/vue/24/outline'

const stats = [
  { name: 'Active Reservations', value: '124', icon: TicketIcon },
  { name: 'Total Travel Agents', value: '12', icon: UserGroupIcon },
  { name: 'Pending Packages', value: '8', icon: GlobeAmericasIcon },
  { name: 'Monthly Revenue', value: '$45,200', icon: BanknotesIcon },
]
</script>