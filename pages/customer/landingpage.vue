<script setup lang="ts">
import type { Product } from "~/composables/useCart";

definePageMeta({
  layout: 'customer'
})

const { products, pending, error, refresh } = useProducts();
const { addItem } = useCart();

const alert = ref<{
    variant: "success" | "error" | "info";
    message: string;
} | null>(null);

onMounted(refresh);

const onAdd = (p: Product) => {
    addItem(p, 1);
    alert.value = { variant: "success", message: "Added to Cart Successfully!" };
    
    // Clear alert after 3 seconds
    setTimeout(() => {
        alert.value = null;
    }, 3000);
};
</script>

<template>
  <div class="space-y-12">
    <section class="bg-white rounded-3xl border border-gray-200 p-10 shadow-sm">
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

          <div class="mt-8 flex flex-wrap gap-3">
            <NuxtLink
              to="/customer/shop"
              class="rounded-md bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              Shop Now
            </NuxtLink>
            <button
              type="button"
              class="rounded-md border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              View Deals
            </button>
          </div>
        </div>

        <div class="rounded-2xl bg-gray-200 p-8">
          <div class="aspect-[4/3] rounded-xl bg-gradient-to-br from-gray-300 to-gray-200" />
        </div>
      </div>
    </section>

    <!-- Products Section -->
    <section class="space-y-6">
      <div class="flex items-center justify-between">
        <h2 class="text-2xl font-bold text-gray-900">Featured Products</h2>
        <NuxtLink to="/customer/shop" class="text-sm font-semibold text-indigo-600 hover:text-indigo-500">
          View All &rarr;
        </NuxtLink>
      </div>

      <Alert v-if="alert" :variant="alert.variant" :message="alert.message" />
      <Alert v-if="error" variant="error" :message="error" />

      <div v-if="pending" class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <div v-for="i in 3" :key="i" class="h-80 animate-pulse rounded-3xl bg-gray-200" />
      </div>

      <div
        v-else-if="!products.length"
        class="rounded-3xl border border-gray-200 bg-white p-10 text-center shadow-sm"
      >
        <p class="text-gray-600">No products available at the moment.</p>
      </div>

      <div v-else class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <div
          v-for="product in products.slice(0, 6)"
          :key="product.uuid"
          class="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
        >
          <div class="h-56 bg-gray-100">
            <img
              v-if="product.imageUrl"
              :src="product.imageUrl"
              alt="Product image"
              class="h-full w-full object-cover"
            />
            <div v-else class="flex h-full items-center justify-center bg-gray-200">
              <span class="text-gray-400">No image</span>
            </div>
          </div>

          <div class="space-y-4 p-6">
            <div>
              <h3 class="text-lg font-semibold text-gray-900">
                {{ product.name }}
              </h3>
              <p class="mt-2 line-clamp-2 text-sm text-gray-600">
                {{ product.description || 'No description available.' }}
              </p>
            </div>

            <div class="flex items-center justify-between gap-3">
              <span class="text-lg font-bold text-indigo-600">
                ₱{{ product.price.toFixed(2) }}
              </span>

              <button
                type="button"
                class="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
                @click="onAdd(product)"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="rounded-3xl bg-white p-10 shadow-sm border border-gray-100">
      <h2 class="text-2xl font-bold text-gray-900">Customer Overview</h2>
      <p class="mt-3 text-sm text-gray-600">
        This content appears inside the customer layout. Experience a seamless shopping journey with our curated selection of quality products.
      </p>
    </section>
  </div>
</template>