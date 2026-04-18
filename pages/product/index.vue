<template>
  <NuxtLayout>
    <div class="space-y-6">
      <h1 class="text-xl font-bold mb-4">Products</h1>

      <!-- Reusable ProductForm for Create -->
      <ProductForm mode="create" />

      <!-- Product List -->
      <ul class="mt-6 space-y-2">
        <li v-for="p in products" :key="p.uuid">
          <NuxtLink :to="`/product/${p.uuid}`" class="text-indigo-600 hover:underline">
            {{ p.name }} - {{ p.price }}
          </NuxtLink>
        </li>
      </ul>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { productService } from '~/api/product/ProductService'
import ProductForm from '~/components/ProductForm.vue'

const products = ref<any[]>([])

onMounted(async () => {
  products.value = await productService.list()
})
</script>
