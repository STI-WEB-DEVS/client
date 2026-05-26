<template>
    <div class="min-h-screen bg-white font-sans text-gray-900">
      
      <!-- MINIMALIST HEADER -->
      <header class="border-b border-gray-100 bg-white">
        <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
          <div class="text-xl font-black tracking-widest uppercase">
            My<span class="text-blue-600">Store</span>
          </div>
          
          <nav class="hidden gap-8 text-sm font-medium text-gray-500 md:flex">
            <a href="#" class="text-black transition-colors">Shop</a>
            <a href="#" class="hover:text-black transition-colors">About</a>
            <a href="#" class="hover:text-black transition-colors">Contact</a>
          </nav>
          
          <!-- Static Cart Icon (No complex state) -->
          <button class="text-gray-900 hover:text-blue-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
          </button>
        </div>
      </header>
  
      <main>
        <!-- CLEAN, BRIGHT HERO SECTION -->
        <section class="bg-blue-50 py-20 sm:py-32">
          <div class="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <h1 class="text-4xl font-black tracking-tight sm:text-6xl text-gray-900">
              The New Standard.
            </h1>
            <p class="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
              Simply good products for everyday life. Live data fetched directly from your Laravel database.
            </p>
          </div>
        </section>
  
        <!-- SIMPLIFIED PRODUCT GRID -->
        <section class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          
          <div class="mb-10 flex items-center justify-between border-b border-gray-200 pb-4">
            <h2 class="text-2xl font-bold text-gray-900">All Products</h2>
          </div>
  
          <!-- Loading State -->
          <div v-if="isLoading" class="flex justify-center py-20 text-gray-500">
            <p class="text-lg animate-pulse">Fetching inventory...</p>
          </div>
  
          <!-- Error State -->
          <div v-else-if="errorMessage" class="rounded-lg bg-red-50 p-4 text-red-700 text-center">
            {{ errorMessage }}
          </div>
  
          <!-- Empty State -->
          <div v-else-if="products.length === 0" class="text-center py-20 text-gray-500">
            No products found in the database.
          </div>
  
          <!-- Flat Design Grid -->
          <div v-else class="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div v-for="product in products" :key="product.id" class="group">
              
              <!-- Simple Image Box -->
              <div class="aspect-square w-full overflow-hidden rounded-lg bg-gray-100 mb-4">
                <img 
                  :src="product.image_url || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop'" 
                  :alt="product.name" 
                  class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
              </div>
              
              <!-- Minimalist Info -->
              <div class="flex justify-between items-start">
                <h3 class="text-base font-bold text-gray-900">{{ product.name }}</h3>
                <p class="text-base font-bold text-gray-900">${{ product.price }}</p>
              </div>
              
              <p class="mt-1 text-sm text-gray-500 line-clamp-2">
                {{ product.description }}
              </p>
              
              <!-- Simple Static Button -->
              <button class="mt-4 w-full rounded border-2 border-gray-900 py-2.5 text-sm font-bold text-gray-900 transition-colors hover:bg-gray-900 hover:text-white">
                Buy Now
              </button>
  
            </div>
          </div>
        </section>
      </main>
  
      <!-- CLEAN FOOTER -->
      <footer class="border-t border-gray-100 bg-white py-10 mt-10">
        <div class="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8 text-sm text-gray-500">
          <p>© 2026 MyStore. Simple & Clean.</p>
        </div>
      </footer>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  
  // Only the absolute basics for fetching data
  const products = ref([])
  const isLoading = ref(true)
  const errorMessage = ref(null)
  
  const fetchProducts = async () => {
    isLoading.value = true
    errorMessage.value = null
  
    try {
      const response = await fetch('http://127.0.0.1:8000/api/products', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
          
        }
      })
  
      if (!response.ok) {
        throw new Error('Failed to connect to the database.')
      }
  
      const result = await response.json()
      products.value = result.data || result
      
    } catch (error) {
      errorMessage.value = "Could not load products. Ensure Laravel is running."
      console.error(error)
    } finally {
      isLoading.value = false
    }
  }
  
  onMounted(() => {
    fetchProducts()
  })
  </script>