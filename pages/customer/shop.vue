<script setup lang="ts">
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

const onAdd = (p: any) => {
  addItem(p, 1);
  alert.value = { variant: "success", message: "Added to cart." };
};

const onBuyNow = async (p: any) => {
  addItem(p, 1);
  await navigateTo("/customer/checkout");
};
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-start justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Shop</h1>
        <p class="mt-1 text-sm text-gray-600">
          Browse products and add items to your cart.
        </p>
      </div>
    </div>

    <UiAlert v-if="alert" :variant="alert.variant" :message="alert.message" />
    <UiAlert v-if="error" variant="error" :message="error" />

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

    <ProductList v-else :products="products" @add="onAdd" @buy-now="onBuyNow" />
  </div>
</template>
