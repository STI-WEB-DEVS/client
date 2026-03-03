<template>
  <main class="p-8 bg-gray-50 min-h-screen">
    <h1 class="text-3xl font-bold mb-6 text-gray-800">Featured Product</h1>
    
    <div v-if="pending" class="text-blue-500 font-semibold">Loading products...</div>
    
    <div v-else-if="error" class="text-red-500">
      <p>Error loading products: {{ error.message }}</p>
    </div>

    <div v-else-if="products && products.length > 0">
      <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
        <img 
          :src="products[0].image" 
          :alt="products[0].title" 
          class="w-full h-48 object-contain p-4"
        />
        <div class="p-5">
          <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 line-clamp-1">
            {{ products[0].title }}
          </h5>
          <p class="mb-3 font-normal text-gray-700 text-sm line-clamp-3">
            {{ products[0].description }}
          </p>
          <div class="flex justify-between items-center mt-4">
            <span class="text-2xl font-bold text-green-600">${{ products[0].price }}</span>
            <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
              {{ products[0].category }}
            </span>
          </div>
        </div>
      </div>

      <div class="mt-10 p-6 bg-yellow-50 border-l-4 border-yellow-400">
        <h3 class="text-lg font-bold text-yellow-800">Laboratory Exercise: The Power of Loops</h3>
        <p class="text-yellow-700 mt-2">
          Currently, we are manually accessing the first item using <code class="bg-yellow-100 px-1">products[0]</code>. 
          Your task is to use the <code class="bg-yellow-100 px-1">v-for</code> directive to automatically generate a card for <strong>every</strong> product in the list.
        </p>
        <ul class="list-disc ml-5 mt-2 text-yellow-800 text-sm">
          <li>Wrap the card template in a container with <code class="bg-yellow-100 px-1">class="grid grid-cols-2 md:grid-cols-5 gap-4"</code>.</li>
          <li>Replace the manual index with the loop variable.</li>
          <li>You may check the browser's console for the whole list.</li>
        </ul>
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