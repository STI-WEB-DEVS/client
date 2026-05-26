<template>
    <div class="min-h-screen bg-gray-50">
  
      <!-- Header -->
      <header class="border-b border-gray-200 bg-white">
        <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
  
          <div class="text-xl font-bold text-gray-900">
            My Store
          </div>
  
          <nav class="hidden items-center gap-8 text-sm font-medium text-gray-600 md:flex">
            <a href="#" class="hover:text-indigo-600">Shop</a>
            <a href="#" class="hover:text-indigo-600">Categories</a>
            <a href="#" class="hover:text-indigo-600">Orders</a>
            <a href="#" class="hover:text-indigo-600">Account</a>
          </nav>
  
          <button
            class="rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700"
          >
            Cart
          </button>
  
        </div>
      </header>
  
      <!-- Hero Section -->
      <main>
  
        <section class="bg-white">
          <div class="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
  
            <div class="grid items-center gap-10 lg:grid-cols-2">
  
              <div>
  
                <p class="text-sm font-semibold uppercase tracking-wide text-indigo-600">
                  New arrivals
                </p>
  
                <h1 class="mt-3 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                  Shop quality products made for everyday use.
                </h1>
  
                <p class="mt-5 max-w-xl text-base text-gray-600">
                  Browse featured products, discover new items, and enjoy a simple shopping experience.
                </p>
  
                <div class="mt-8 flex gap-3">
  
                  <!-- SHOP NOW -->
                  <button
                    @click="showModal = true"
                    class="rounded-md bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
                  >
                    Shop Now
                  </button>
  
                  <button
                    class="rounded-md border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700"
                  >
                    View Deals
                  </button>
  
                </div>
  
              </div>
  
              <!-- Hero Image -->
              <div class="rounded-2xl bg-gray-200 p-8">
                <div class="aspect-[4/3] rounded-xl bg-gray-300"></div>
              </div>
  
            </div>
  
          </div>
        </section>
  
      </main>
  
      <!-- PRODUCT MODAL -->
      <div
        v-if="showModal"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      >
  
        <!-- Modal Box -->
        <div class="max-h-[90vh] w-full max-w-6xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
  
          <!-- Modal Header -->
          <div class="mb-6 flex items-center justify-between">
  
            <h2 class="text-2xl font-bold text-gray-900">
              Products
            </h2>
  
            <button
              @click="showModal = false"
              class="rounded-full bg-gray-100 px-4 py-2 text-sm hover:bg-gray-200"
            >
              ✕
            </button>
  
          </div>
  
          <!-- Loading -->
          <div v-if="loading" class="py-20 text-center">
            Loading products...
          </div>
  
          <!-- Products -->
          <div
            v-else
            class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
  
            <!-- Product Card -->
            <div
              v-for="product in products"
              :key="product.id"
              class="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
            >
  
              <!-- Image -->
              <div class="h-56 bg-gray-100">
  
                <img
                  v-if="product.image"
                  :src="`http://localhost:8000/storage/${product.image}`"
                  :alt="product.name"
                  class="h-full w-full object-cover"
                />
  
                <div
                  v-else
                  class="flex h-full items-center justify-center text-gray-400"
                >
                  No Image
                </div>
  
              </div>
  
              <!-- Info -->
              <div class="p-5">
  
                <h3 class="text-lg font-semibold text-gray-900">
                  {{ product.name }}
                </h3>
  
                <p class="mt-2 text-xl font-bold text-indigo-600">
                  ₱ {{ product.price }}
                </p>
  
                <p
                  v-if="product.description"
                  class="mt-2 text-sm text-gray-500"
                >
                  {{ product.description }}
                </p>
  
                <button
                  class="mt-5 w-full rounded-lg bg-indigo-600 px-4 py-3 text-white hover:bg-indigo-700"
                >
                  Add to Cart
                </button>
  
              </div>
  
            </div>
  
          </div>
  
        </div>
  
      </div>
  
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  
  /*
  |--------------------------------------------------------------------------
  | Modal
  |--------------------------------------------------------------------------
  */
  
  const showModal = ref(false)
  
  /*
  |--------------------------------------------------------------------------
  | Products
  |--------------------------------------------------------------------------
  */
  
  const products = ref([])
  
  const loading = ref(true)
  
  /*
  |--------------------------------------------------------------------------
  | Fetch Products
  |--------------------------------------------------------------------------
  */
  
  const fetchProducts = async () => {
    try {
  
      const response = await fetch('http://localhost:8000/api/products')
  
      const data = await response.json()
  
      products.value = data
  
    } catch (error) {
  
      console.error('Error fetching products:', error)
  
    } finally {
  
      loading.value = false
  
    }
  }
  
  /*
  |--------------------------------------------------------------------------
  | Mounted
  |--------------------------------------------------------------------------
  */
  
  onMounted(() => {
    fetchProducts()
  })
  </script>