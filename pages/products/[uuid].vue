<template>
  <NuxtLayout>
    <div class="space-y-6">
      <div>
        <h1 class="text-xl font-semibold tracking-tight text-gray-900">
          View Product
        </h1>
        <p class="mt-1 text-sm text-gray-500">
          Details for product record: {{ uuid }}
        </p>
      </div>

      <div v-if="pending" class="flex justify-center py-12">
        <div class="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900"></div>
      </div>

      <div v-else-if="error" class="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
        {{ error.message || 'Failed to load product data.' }}
      </div>

      <div v-else-if="product" class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm space-y-4">
        <div>
          <p class="text-xs font-semibold uppercase tracking-wider text-gray-400">Product Name</p>
          <p class="mt-1 text-lg font-medium text-gray-900">{{ product.name }}</p>
        </div>

        <div>
          <p class="text-xs font-semibold uppercase tracking-wider text-gray-400">Product Price</p>
          <p class="mt-1 text-lg font-medium text-gray-900">$ {{ product.price }}</p>
        </div>

        <div>
          <p class="text-xs font-semibold uppercase tracking-wider text-gray-400">Created At</p>
          <p class="mt-1 text-lg font-medium text-gray-900">{{ product.created_at }}</p>
        </div>
        
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { productsService } from '~/api/products/ProductsService'; // Adjust path as needed

const route = useRoute()
const uuid = String(route.params.uuid ?? '')

// State for the data
const product = ref<any>(null)
const pending = ref(true)
const error = ref<any>(null)

const fetchProductDetails = async () => {
  pending.value = true
  try {
    // Assuming your service has a 'show' or 'get' method that takes a UUID
    const response = await productsService.show(uuid)
    
    // Adjust this based on your API structure (e.g., response.data if wrapped)
    product.value = response.data || response
  } catch (err: any) {
    error.value = err
    console.error('Error fetching product:', err)
  } finally {
    pending.value = false
  }
}

onMounted(() => {
  if (uuid) {
    fetchProductDetails()
  }
})
</script>