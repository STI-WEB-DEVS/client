<template>
  <NuxtLayout>
    <div class="space-y-8">
      <div>
        <h1 class="text-3xl font-extrabold tracking-tight text-gray-900">Library Overview</h1>
        <p class="mt-2 text-sm text-gray-600">Welcome back! Here is what's happening in the library today.</p>
      </div>

      <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div v-for="stat in stats" :key="stat.name" class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6 border border-gray-200">
          <dt class="truncate text-sm font-medium text-gray-500">{{ stat.name }}</dt>
          <dd class="mt-1 text-3xl font-semibold tracking-tight text-black">{{ stat.value }}</dd>
        </div>
      </div>

      <div class="rounded-lg bg-white shadow border border-gray-200">
        <div class="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 class="text-base font-semibold text-gray-900">Recent Book Loans</h3>
        </div>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-300">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-sm font-semibold text-gray-900">Book Title</th>
                <th class="px-6 py-3 text-left text-sm font-semibold text-gray-900">Borrower</th>
                <th class="px-6 py-3 text-left text-sm font-semibold text-gray-900">Due Date</th>
                <th class="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">
              <tr v-for="loan in recentLoans" :key="loan.id">
                <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-900">{{ loan.title }}</td>
                <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{{ loan.user }}</td>
                <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{{ loan.due }}</td>
                <td class="whitespace-nowrap px-6 py-4 text-sm">
                  <span :class="loan.status === 'Overdue' ? 'text-red-600 bg-red-50' : 'text-green-600 bg-green-50'" class="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset">
                    {{ loan.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
const stats = [
  { name: 'Total Books', value: '12,405' },
  { name: 'Active Members', value: '1,240' },
  { name: 'Currently Borrowed', value: '456' },
  { name: 'Overdue Books', value: '12' },
]

const recentLoans = [
  { id: 1, title: 'The Great Gatsby', user: 'Alice Johnson', due: '2026-03-15', status: 'On Time' },
  { id: 2, title: 'Clean Code', user: 'Bob Smith', due: '2026-03-08', status: 'Overdue' },
  { id: 3, title: 'Vue.js Guide', user: 'Charlie Brown', due: '2026-03-20', status: 'On Time' },
]
</script>