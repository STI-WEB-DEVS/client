<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { productService } from '~/api/product/ProductService'

definePageMeta({ layout: 'customer' })

const products = ref<any[]>([])
const pending = ref(true)
const error = ref('')

onMounted(async () => {
  try {
    const res = await productService.list()
    products.value = res?.data ?? []
  } catch (err: any) {
    error.value = err.message
  } finally {
    pending.value = false
  }
})
</script>

<template>
  <div>
    <div class="mb-8">
      <h2 class="text-2xl font-bold text-gray-900">All Products</h2>
      <p class="mt-1 text-sm text-gray-500">Browse our full catalog and add items to your cart.</p>
    </div>

    <div v-if="pending" class="flex justify-center py-20">
      <div class="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-indigo-600" />
    </div>

    <div v-else-if="error" class="rounded-xl border border-red-200 bg-red-50 p-4">
      <p class="text-sm text-red-700">{{ error }}</p>
    </div>

    <div v-else class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <ProductCard
        v-for="product in products"
        :key="product.uuid"
        :product="product"
      />
      <div v-if="!products.length" class="col-span-full py-20 text-center text-sm text-gray-500">
        No products found.
      </div>
    </div>
  </div>
</template>