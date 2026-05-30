<template>
  <div class="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">ID</th>
            <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Name</th>
            <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Description</th>
            <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Stock</th>
            <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Price</th>
            <th class="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100 bg-white">
          <tr v-for="product in products" :key="product.id">
            <td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">{{ product.id }}</td>
            <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-700">{{ product.name }}</td>
            <td class="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{{ product.description || '-' }}</td>
            <td class="whitespace-nowrap px-6 py-4 text-sm">
              <span 
                :class="[
                  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                  product.stock_quantity <= 0 ? 'bg-red-100 text-red-800' : 
                  product.stock_quantity < 10 ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-green-100 text-green-800'
                ]"
              >
                {{ product.stock_quantity ?? 0 }}
              </span>
            </td>
            <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500">₱{{ formatPrice(product.price) }}</td>
            <td class="whitespace-nowrap px-6 py-4">
              <div class="flex items-center justify-end gap-2">
                <button @click="$emit('view', product)" class="inline-flex items-center gap-2 rounded-md border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  <EyeIcon class="h-4 w-4" />
                  View
                </button>
                <button @click="$emit('edit', product)" class="inline-flex items-center gap-2 rounded-md border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  <PencilSquareIcon class="h-4 w-4" />
                  Edit
                </button>
                <button @click="$emit('delete', product)" class="inline-flex items-center gap-2 rounded-md border border-red-200 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50">
                  <TrashIcon class="h-4 w-4" />
                  Delete
                </button>
              </div>
            </td>
          </tr>
          <tr v-if="!products?.length">
            <td colspan="6" class="px-6 py-10 text-center text-sm text-gray-500">No products found.</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="border-t border-gray-200 bg-gray-50 px-6 py-4">
      <p class="text-sm text-gray-500">
        Showing <span class="font-medium">{{ meta?.from ?? 0 }}</span> to
        <span class="font-medium">{{ meta?.to ?? 0 }}</span> of
        <span class="font-medium">{{ meta?.total ?? 0 }}</span> products
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { EyeIcon, PencilSquareIcon, TrashIcon } from '@heroicons/vue/24/outline'

defineProps<{
  products: any[]
  meta?: any
}>()

defineEmits(['view', 'edit', 'delete'])

const formatPrice = (price: string | number) => {
  return Number(price).toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}
</script>