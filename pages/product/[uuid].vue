<template>
  <NuxtLayout>
    <div class="space-y-6">
      <div>
        <h1 class="text-xl font-semibold tracking-tight text-gray-900">View Product</h1>
        <p class="mt-1 text-sm text-gray-500">Dedicated product page using the UUID from the route.</p>
      </div>

      <div v-if="pending" class="flex justify-center py-16">
        <div class="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900"></div>
      </div>

      <div v-else class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <p class="text-sm text-gray-500">Product UUID</p>
        <p class="mt-2 break-all text-base font-medium text-gray-900">{{ uuid }}</p>
        
        <div class="mt-6 space-y-4">
          <div>
            <p class="text-sm text-gray-500">Name</p>
            <p class="text-base font-medium text-gray-900">{{ product?.name }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-500">Price</p>
            <p class="text-base font-medium text-gray-900">₱{{ product?.price }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-500">Stock</p>
            <p class="text-base font-medium text-gray-900">{{ product?.stock }}</p>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { productService } from '~/api/product/ProductService'

const route = useRoute()
// Extract UUID from route params
const uuid = route.params.uuid

const product = ref(null)
const pending = ref(true)

onMounted(async () => {
  // Pass the UUID to the service
  product.value = await productService.show(uuid)
  pending.value = false
})
</script>