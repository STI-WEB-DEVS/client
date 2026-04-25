<template>
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-xl font-semibold tracking-tight text-gray-900">
            Product Details
          </h1>
          <p class="mt-1 text-sm text-gray-500">
            Viewing detailed information for product.
          </p>
        </div>
        <NuxtLink to="/admin/products" class="inline-flex items-center gap-2 rounded-md border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
          Back to List
        </NuxtLink>
      </div>

      <div v-if="pending" class="flex justify-center py-16">
        <div class="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900"></div>
      </div>

      <div v-else-if="error" class="rounded-xl border border-red-200 bg-red-50 p-4">
        <p class="text-sm text-red-700">Error: {{ error.message }}</p>
      </div>

      <div v-else-if="product" class="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div class="grid grid-cols-1 gap-px bg-gray-200 sm:grid-cols-2">
          <div class="bg-white p-6">
            <p class="text-xs font-semibold uppercase tracking-wider text-gray-400">Name</p>
            <p class="mt-2 text-lg font-medium text-gray-900">{{ product.name }}</p>
          </div>
          <div class="bg-white p-6">
            <p class="text-xs font-semibold uppercase tracking-wider text-gray-400">Price</p>
            <p class="mt-2 text-lg font-medium text-gray-900">${{ product.price }}</p>
          </div>
          <div class="bg-white p-6">
            <p class="text-xs font-semibold uppercase tracking-wider text-gray-400">Created At</p>
            <p class="mt-2 text-base text-gray-700">{{ formatDate(product.created_at) }}</p>
          </div>
          <div class="bg-white p-6">
            <p class="text-xs font-semibold uppercase tracking-wider text-gray-400">Updated At</p>
            <p class="mt-2 text-base text-gray-700">{{ formatDate(product.updated_at) }}</p>
          </div>
        </div>
        <div class="border-t border-gray-100 bg-gray-50 p-6">
          <p class="text-xs font-semibold uppercase tracking-wider text-gray-400">External ID / UUID</p>
          <p class="mt-1 break-all text-sm text-gray-500">{{ product.uuid }}</p>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { productService } from '~/api/product/ProductService'

const route = useRoute()
const uuid = route.params.uuid as string

const product = ref<any>(null)
const pending = ref(true)
const error = ref<any>(null)

const fetchProduct = async () => {
  pending.value = true
  error.value = null
  try {
    const response = await productService.show(uuid)
    product.value = response.data || response
  } catch (err: any) {
    error.value = err
  } finally {
    pending.value = false
  }
}

const formatDate = (dateString: string) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleString()
}

onMounted(() => {
  fetchProduct()
})
</script>