<template>
  <main class="p-8 bg-gray-50 min-h-screen">
    <h1 class="text-3xl font-bold mb-6 text-gray-800">Product Catalog</h1>
    
    <div v-if="pending" class="text-blue-500 font-semibold">Loading products...</div>
    
    <div v-else-if="error" class="text-red-500">
      <p>Error loading products: {{ error.message }}</p>
    </div>

    <div v-else-if="products && products.length > 0" class="grid grid-cols-2 md:grid-cols-5 gap-4">
      
      <div 
        v-for="product in products" 
        :key="product.id" 
        class="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden flex flex-col"
      >
        <img 
          :src="product.image" 
          :alt="product.title" 
          class="w-full h-48 object-contain p-4"
        />
        <div class="p-5 flex-1 flex flex-col">
          <h5 class="mb-2 text-sm font-bold tracking-tight text-gray-900 line-clamp-2">
            {{ product.title }}
          </h5>
          <p class="mb-3 font-normal text-gray-700 text-xs line-clamp-2">
            {{ product.description }}
          </p>
          <div class="mt-auto flex justify-between items-center">
            <span class="text-lg font-bold text-green-600">${{ product.price }}</span>
            <span class="bg-blue-100 text-blue-800 text-[10px] font-semibold px-2 py-0.5 rounded">
              {{ product.category }}
            </span>
          </div>
        </div>
      </div>

    </div>
  </main>
</template>

<script setup>
// data fetching
const { data: products, pending, error } = await useFetch('https://fakestoreapi.com/products')

// logging
console.log('Fetched Products:', products.value)
</script>