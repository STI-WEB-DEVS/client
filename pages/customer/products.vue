<script setup lang="ts">
import type { Product } from "~/composables/useCart";

    definePageMeta({
        layout: "customer",
    });

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
    };

    const onBuyNow = async (p: Product) => {
        addItem(p, 1);
        await navigateTo("/customer/checkout");
    };
</script>

<template>
  <div class="space-y-6 p-6">
    <div class="flex items-start justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Products</h1>
        <p class="mt-1 text-sm text-gray-600">
          Browse products and add items to your cart.
        </p>
      </div>
    </div>

    <Alert v-if="alert" :variant="alert.variant" :message="alert.message" />
    <Alert v-if="error" variant="error" :message="error" />

    <div v-if="pending" class="rounded-lg border border-gray-200 bg-white p-6">
      <p class="text-sm text-gray-600">Loading products...</p>
    </div>

    <div
      v-else-if="!products.length"
      class="rounded-lg border border-gray-200 bg-white p-6"
    >
      <p class="text-sm text-gray-600">No products available.</p>
      <button
        type="button"
        class="mt-3 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
        @click="refresh"
      >
        Retry
      </button>
    </div>

    <div v-else class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      <div
        v-for="product in products"
        :key="product.uuid"
        class="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm"
      >
        <div class="h-56 bg-gray-100">
          <img
            v-if="product.imageUrl"
            :src="product.imageUrl"
            alt="Product image"
            class="h-full w-full object-cover"
          />
        </div>

        <div class="space-y-4 p-6">
          <div>
            <h2 class="text-lg font-semibold text-gray-900">
              {{ product.name }}
            </h2>
            <p class="mt-2 text-sm text-gray-600">
              {{ product.description || 'No description available.' }}
            </p>
          </div>

          <div class="flex items-center justify-between gap-3">
            <span class="text-lg font-bold text-indigo-600">
              ₱{{ product.price.toFixed(2) }}
            </span>

            <div class="flex gap-2">
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
    </div>
  </div>
</template>