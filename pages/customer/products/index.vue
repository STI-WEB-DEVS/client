<template>
    <div class="min-h-screen bg-gray-100">
  
      <!-- Page Header -->
      <div class="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
  
        <div>
          <h1 class="text-3xl font-bold text-gray-900">
            Shop Products
          </h1>
  
          <p class="mt-1 text-sm text-gray-500">
            Browse our latest products
          </p>
        </div>
  
        <!-- Search -->
        <div class="relative">
          <MagnifyingGlassIcon
            class="absolute left-3 top-3 size-5 text-gray-400"
          />
  
          <input
            v-model="search"
            type="text"
            placeholder="Search product..."
            class="w-72 rounded-xl border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm focus:border-indigo-500 focus:outline-none"
          />
        </div>
  
      </div>
  
      <!-- Product Grid -->
      <div
        v-if="filteredProducts.length"
        class="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
      >
  
        <!-- Product Card -->
        <div
          v-for="product in filteredProducts"
          :key="product.uuid"
          class="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
        >
  
          <!-- Product Image -->
          <div class="relative">
  
            <div class="flex h-64 items-center justify-center overflow-hidden bg-gray-100">
  
              <img
                v-if="product.image"
                :src="product.image"
                alt="Product"
                class="h-full w-full object-cover transition duration-300 group-hover:scale-105"
              />
  
              <div
                v-else
                class="flex flex-col items-center text-gray-400"
              >
                <PhotoIcon class="mb-2 size-12" />
  
                <span class="text-sm">
                  No Image
                </span>
              </div>
  
            </div>
  
            <!-- Stock Badge -->
            <div class="absolute right-4 top-4">
  
              <span
                :class="[
                  product.stock > 0
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700',
                  'rounded-full px-3 py-1 text-xs font-semibold'
                ]"
              >
              </span>
  
            </div>
          </div>
  
          <!-- Product Details -->
          <div class="p-5">
  
            <div class="mb-4">
  
              <h2 class="text-lg font-bold text-gray-900">
                {{ product.name }}
              </h2>
  
              <p class="mt-2 text-3xl font-bold text-indigo-600">
                ${{ product.price }}
              </p>
  
            </div>
  
            <!-- Buttons -->
            <div class="mb-4 flex gap-2">
  
              <!-- Add to Cart -->
              <button
                @click="addToCart(product)"
                :disabled="product.stock <= 0"
                class="flex flex-1 items-center justify-center gap-2 rounded-xl bg-yellow-500 py-3 text-sm font-semibold text-white transition hover:bg-yellow-600 disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                <ShoppingCartIcon class="size-5" />
  
                Add to Cart
              </button>
  
              <!-- Buy Now -->
              <button
                @click="buyNow(product)"
                :disabled="product.stock <= 0"
                class="flex flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                Buy Now
              </button>
  
            </div>
  
            <!-- Footer -->
            <div class="border-t border-gray-100 pt-4">
  
              <div class="flex items-center justify-between">
  
                <span class="text-sm text-gray-500">
                  Free Shipping
                </span>
  
                <span class="text-sm font-medium text-green-600">
                  Available
                </span>
  
              </div>
  
            </div>
  
          </div>
        </div>
      </div>
  
      <!-- Empty State -->
      <div
        v-else-if="!loading"
        class="flex flex-col items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-white py-20 text-center"
      >
  
        <CubeIcon class="mb-4 size-16 text-gray-300" />
  
        <h3 class="text-lg font-semibold text-gray-700">
          No Products Found
        </h3>
  
        <p class="mt-2 text-sm text-gray-500">
          Try searching another product.
        </p>
  
      </div>
  
    </div>
  </template>
  
  <script setup lang="ts">
  definePageMeta({
    layout: 'customer'
  })
  
  import { computed, onMounted, ref } from 'vue'
  
  import {
    CubeIcon,
    MagnifyingGlassIcon,
    PhotoIcon,
    ShoppingCartIcon,
  } from '@heroicons/vue/24/outline'
  
  import { productService } from '~/api/product/ProductService'
  
  const products = ref<any[]>([])
  const loading = ref(false)
  
  const search = ref('')
  
  const filteredProducts = computed(() => {
    return products.value.filter((product) =>
      product.name.toLowerCase().includes(search.value.toLowerCase())
    )
  })
  
  const fetchProducts = async () => {
    loading.value = true
  
    try {
      const response = await productService.list()
      products.value = response?.data || response || []
    } catch (error) {
      console.error('Failed to load products:', error)
    } finally {
      loading.value = false
    }
  }
  
  const addToCart = (product: any) => {
    alert(`${product.name} added to cart`)
  }
  
  const buyNow = (product: any) => {
    alert(`Proceeding to checkout for ${product.name}`)
  }
  
  onMounted(fetchProducts)
  </script>