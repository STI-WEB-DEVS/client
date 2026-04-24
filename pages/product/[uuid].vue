<template>
  <NuxtLayout>
    <div class="space-y-6">
      <h1 class="text-xl font-semibold">View Product</h1>

      <div v-if="pending">Loading...</div>
      <div v-else-if="error" class="text-red-600">{{ error.message }}</div>
      <div v-else-if="product" class="rounded border p-6 bg-white shadow-sm space-y-4">
        <p><strong>ID:</strong> {{ product.id }}</p>
        <p><strong>UUID:</strong> {{ product.uuid }}</p>
        <p><strong>Name:</strong> {{ product.name }}</p>
        <p><strong>Price:</strong> {{ product.price }}</p>
        <p><strong>Created At:</strong> {{ product.created_at }}</p>
        <p><strong>Updated At:</strong> {{ product.updated_at }}</p>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { productService } from '~/api/product/ProductService'

const route = useRoute()
const uuid = String(route.params.uuid ?? '')

const product = ref<any>(null)
const pending = ref(true)
const error = ref<any>(null)

onMounted(async () => {
  try {
    const response = await productService.show(uuid)
    product.value = response.data
  } catch (err: any) {
    error.value = err
  } finally {
    pending.value = false
  }
})
</script>
