<script setup>
import ProductService from '~/api/product/ProductService';

definePageMeta({
    layout: 'customer'
})

const products = ref([])
const isLoading = ref(true)

onMounted(async () => {
  try {
    const productService = ProductService.getInstance();
    const response = await productService.list();
    products.value = response.data || response;
  } catch (error) {
    console.error('Failed to fetch products:', error);
  } finally {
    isLoading.value = false;
  }
})
</script>

<template>
  <div>
    <PageHeader 
      title="Shop" 
      description="Discover our curated collection." 
    />

    <div v-if="isLoading" class="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
      <div v-for="i in 4" :key="i" class="h-64 bg-gray-100 animate-pulse rounded-xl"></div>
    </div>

    <div v-else-if="products.length > 0" class="mt-10 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        <ProductCard v-for="product in products" :key="product.id" :product="product" />
    </div>

    <div v-else class="mt-10 text-center py-12">
      <p class="text-gray-500 italic text-lg">No products available at the moment.</p>
    </div>
  </div>
</template>