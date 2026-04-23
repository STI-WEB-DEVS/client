<template>
  <div class="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">ID</th>
            <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Name</th>
            <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Email</th>
            <th class="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100 bg-white">
          <tr v-for="customer in customers" :key="customer.id">
            <td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">{{ customer.id }}</td>
            <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-700">{{ customer.name }}</td>
            <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{{ customer.email }}</td>
            <td class="whitespace-nowrap px-6 py-4">
              <div class="flex items-center justify-end gap-2">
                <NuxtLink :to="`/customer/${customer.uuid}`" class="inline-flex items-center gap-2 rounded-md border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  <EyeIcon class="h-4 w-4" />
                  View
                </NuxtLink>
                <button @click="$emit('edit', customer)" class="inline-flex items-center gap-2 rounded-md border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  <PencilSquareIcon class="h-4 w-4" />
                  Edit
                </button>
                <button @click="$emit('delete', customer)" class="inline-flex items-center gap-2 rounded-md border border-red-200 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50">
                  <TrashIcon class="h-4 w-4" />
                  Delete
                </button>
              </div>
            </td>
          </tr>
          <tr v-if="!customers?.length">
            <td colspan="4" class="px-6 py-10 text-center text-sm text-gray-500">No customers found.</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="border-t border-gray-200 bg-gray-50 px-6 py-4">
      <p class="text-sm text-gray-500">
        Showing <span class="font-medium">{{ meta?.from ?? 0 }}</span> to
        <span class="font-medium">{{ meta?.to ?? 0 }}</span> of
        <span class="font-medium">{{ meta?.total ?? 0 }}</span> customers
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { EyeIcon, PencilSquareIcon, TrashIcon } from '@heroicons/vue/24/outline'

defineProps<{
  customers: any[]
  meta?: any
}>()

defineEmits(['edit', 'delete'])
</script>