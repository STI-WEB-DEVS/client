<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-xl font-semibold tracking-tight text-gray-900">View Product</h1>
    </div>

    <div v-if="pending" class="flex justify-center py-16">
      <div class="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900"></div>
    </div>

    <div v-else-if="error" class="rounded-xl border border-red-200 bg-red-50 p-4">
      <p class="text-sm text-red-700">{{ error.message }}</p>
    </div>

    <div v-else class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm space-y-4">
      <div class="mb-4">
        <p class="text-sm text-gray-500">Product Name</p>
        <p class="mt-1 text-base font-medium text-gray-900">{{ product?.name }}</p>
      </div>

      <div class="mb-4">
        <p class="text-sm text-gray-500">Description</p>
        <p class="mt-1 text-base font-medium text-gray-900">{{ product?.description }}</p>
      </div>

      <div class="mb-4">
        <p class="text-sm text-gray-500">Product Price</p>
        <p class="mt-1 text-base font-medium text-gray-900">₱{{ Number(product?.price).toFixed(2) }}</p>
      </div>

      <div class="mb-4">
        <p class="text-sm text-gray-500">Stock Quantity</p>
        <div class="mt-1 flex items-center gap-2">
          <span
            :class="[
              'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
              product?.stock_quantity === 0
                ? 'bg-red-100 text-red-700'
                : product?.stock_quantity <= 10
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'bg-green-100 text-green-700'
            ]"
          >
            {{ product?.stock_quantity === 0 ? 'Out of Stock' : product?.stock_quantity <= 10 ? 'Low Stock' : 'In Stock' }}
          </span>
          <p class="text-base font-medium text-gray-900">{{ product?.stock_quantity }} units</p>
        </div>
      </div>

      <div>
        <p class="text-sm text-gray-500">Product UUID</p>
        <p class="mt-1 break-all text-base font-medium text-gray-900">{{ uuid }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue'
  import { productService } from '~/api/product/ProductService'

  const route = useRoute()

  const uuid = computed(() => String(route.params.uuid ?? ''))

  const product = ref<any>(null)
  const pending = ref(true)
  const error = ref<any>(null)

  onMounted(async () => {
    try {
      const response = await productService.show(uuid.value)
      product.value = response.data
    } catch (err: any) {
      error.value = err
    } finally {
      pending.value = false
    }
  })
</script>