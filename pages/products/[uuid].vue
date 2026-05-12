<template>
  <NuxtLayout>
    <div class="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <NuxtLink to="/products" class="mb-4 inline-flex items-center rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
        Back to Products
      </NuxtLink>
      <h1 class="text-2xl font-bold">Product Details</h1>
      <p class="text-sm text-slate-600 mt-1">Detailed view for product</p>
    </div>

    <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div v-if="loading" class="py-8">Loading…</div>
      <div v-else-if="error" class="text-red-600">{{ error }}</div>
      <div v-else>
        <p class="text-lg font-semibold">{{ product.name }}</p>
        <p class="text-sm text-slate-500">Price: {{ formatPrice(product.price) }}</p>
        <div class="mt-4 text-sm">
          <p><strong>UUID:</strong> {{ product.uuid }}</p>
          <p><strong>Created:</strong> {{ product.created_at }}</p>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { productService } from '~/api/products/ProductService'

const route = useRoute()
const uuid = String(route.params.uuid)

const product = ref<any>(null)
const loading = ref(true)
const error = ref('')

const formatPrice = (value: string | number) => {
  const numericValue = Number(value)
  if (Number.isNaN(numericValue)) return String(value)
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(numericValue)
}

onMounted(async () => {
  try {
    const res = await productService.show(uuid)
    product.value = res.data || res
  } catch (e: any) {
    error.value = e?.message || 'Failed to load product'
  } finally {
    loading.value = false
  }
})
</script>
