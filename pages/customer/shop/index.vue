<script setup>
definePageMeta({
  layout: "customer",
});

import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { productService } from "~/api/product/ProductService";

const router = useRouter();

const products = ref(null);
const pending = ref(true);
const error = ref(null);

const loadProducts = async () => {
  pending.value = true;
  error.value = null;
  try {
    const response = await productService.list();
    products.value = response.data;
  } catch (err) {
    error.value = err;
  } finally {
    pending.value = false;
  }
};

const { formatPrice } = useCurrency();

onMounted(loadProducts);
</script>

<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="flex flex-col gap-2">
      <h1
        class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl"
      >
        Our Products
      </h1>
      <p class="text-lg text-gray-500">
        Discover our curated selection of high-quality tech and accessories.
      </p>
    </div>

    <!-- Loading State -->
    <div
      v-if="pending"
      class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      <div v-for="i in 8" :key="i" class="animate-pulse space-y-4">
        <div
          class="aspect-h-1 aspect-w-1 h-64 w-full overflow-hidden rounded-2xl bg-gray-200 lg:aspect-none"
        ></div>
        <div class="h-4 w-3/4 rounded bg-gray-200"></div>
        <div class="h-4 w-1/4 rounded bg-gray-200"></div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="rounded-xl bg-red-50 p-6 text-center">
      <p class="font-medium text-red-800">
        Failed to load products. Please try again later.
      </p>
      <button
        @click="loadProducts"
        class="mt-4 text-sm font-semibold text-red-900 underline hover:text-red-700"
      >
        Retry
      </button>
    </div>

    <!-- Products Grid -->
    <div
      v-else-if="products && products.length > 0"
      class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      <div
        v-for="product in products"
        :key="product.id"
        class="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all hover:-translate-y-1 hover:shadow-xl"
      >
        <!-- Placeholder for Image (Aesthetic Gradient) -->
        <div
          class="aspect-h-1 aspect-w-1 flex h-48 items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600 sm:aspect-none"
        >
          <span class="select-none text-4xl font-bold text-white opacity-20">
            {{ product.name.charAt(0) }}
          </span>
        </div>

        <div class="flex flex-1 flex-col space-y-2 p-6">
          <h3 class="text-sm font-medium text-gray-900">
            <NuxtLink :to="`/customer/shop/${product.uuid}`">
              <span aria-hidden="true" class="absolute inset-0" />
              {{ product.name }}
            </NuxtLink>
          </h3>
          <div class="flex flex-1 flex-col justify-end">
            <p class="text-lg font-bold text-indigo-600">
              {{ formatPrice(product.price) }}
            </p>
          </div>
        </div>

        <!-- Action Button (Aesthetic indicator) -->
        <div class="p-6 pt-0 opacity-0 transition-opacity group-hover:opacity-100">
          <button
            class="w-full rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
          >
            View Details
          </button>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="py-20 text-center">
      <p class="text-lg italic text-gray-500">
        No products available at the moment.
      </p>
    </div>
  </div>
</template>
