<template>
  <div class="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th v-for="header in headers" :key="header.key" 
                class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
              {{ header.label }}
            </th>
            <th class="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
              Actions
            </th>
          </tr>
        </thead>

        <tbody class="divide-y divide-gray-100 bg-white">
          <tr v-for="product in products" :key="product.id" class="transition hover:bg-gray-50">
            <td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
              {{ product.id }}
            </td>
            <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-700">
              <div class="flex items-center gap-3">
                <img v-if="product.image" :src="product.image" class="h-8 w-8 rounded object-cover" />
                <span>{{ product.name }}</span>
              </div>
            </td>
            <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
              {{ product.sku || 'N/A' }}
            </td>
            <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-900 font-semibold">
              ${{ product.price }}
            </td>
            
            <td class="whitespace-nowrap px-6 py-4 text-right">
              <div class="flex items-center justify-end gap-2">
                <slot name="actions" :product="product"></slot>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  products: any[];
  headers: { key: string; label: string }[];
}>();
</script>