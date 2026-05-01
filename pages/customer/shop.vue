<script setup lang="ts">
import { ref, onMounted, inject } from "vue";
import { productsService } from "~/api/products/ProductsService";

definePageMeta({
  layout: "customer",
});

const router = useRouter();

const products = ref<any[]>([]);
const loading = ref(true);
const error = ref("");

const showFeedback = inject<(msg: string) => void>("showFeedback");
const updateCartCount = inject<() => void>("updateCartCount");

onMounted(async () => {
  try {
    const response = await productsService.list();
    // Handle paginated response
    products.value = response?.data || response || [];
  } catch (err: any) {
    error.value = err.message || "Failed to load products";
  } finally {
    loading.value = false;
  }
});

const addToCart = (product: any) => {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");

  const existing = cart.find((i: any) => i.uuid === product.uuid);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({
      uuid: product.uuid,
      name: product.name,
      price: product.price,
      quantity: 1,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  window.dispatchEvent(new Event("cart-updated"));

  if (showFeedback) {
    showFeedback(`"${product.name}" added to cart successfully!`);
  }
};

const buyNow = (product: any) => {
  // Clear cart and add only this product, then go to checkout
  const cart = [
    {
      uuid: product.uuid,
      name: product.name,
      price: product.price,
      quantity: 1,
    },
  ];

  localStorage.setItem("cart", JSON.stringify(cart));
  window.dispatchEvent(new Event("cart-updated"));

  router.push("/customer/checkout");
};
</script>

<template>
  <section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
    <div class="mb-8">
      <h2 class="text-2xl font-bold text-gray-900">Browse Products</h2>
      <p class="mt-1 text-sm text-gray-500">
        Select products to add to your cart or buy now.
      </p>
    </div>

    <!-- LOADING STATE -->
    <div v-if="loading" class="flex items-center justify-center py-20">
      <div class="text-center">
        <svg
          class="mx-auto h-8 w-8 animate-spin text-indigo-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          />
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
        <p class="mt-3 text-sm text-gray-500">Loading products...</p>
      </div>
    </div>

    <!-- ERROR STATE -->
    <div
      v-else-if="error"
      class="rounded-lg border border-red-200 bg-red-50 p-6 text-center"
    >
      <p class="text-sm text-red-600">{{ error }}</p>
    </div>

    <!-- EMPTY STATE -->
    <div
      v-else-if="products.length === 0"
      class="rounded-lg border border-gray-200 bg-white p-12 text-center"
    >
      <p class="text-gray-500">No products available at the moment.</p>
    </div>

    <!-- PRODUCTS GRID -->
    <div
      v-else
      class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      <div
        v-for="product in products"
        :key="product.uuid"
        class="group rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md"
      >
        <!-- Product Image Placeholder -->
        <div
          class="aspect-square rounded-lg bg-gray-100 flex items-center justify-center mb-4"
        >
          <svg
            class="h-12 w-12 text-gray-300"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
            />
          </svg>
        </div>

        <!-- Product Info -->
        <h3 class="text-sm font-semibold text-gray-900">{{ product.name }}</h3>
        <p class="mt-1 text-lg font-bold text-indigo-600">
          ₱{{ Number(product.price).toFixed(2) }}
        </p>

        <!-- Action Buttons -->
        <div class="mt-4 flex gap-2">
          <button
            @click="addToCart(product)"
            class="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
          >
            Add to Cart
          </button>
          <button
            @click="buyNow(product)"
            class="flex-1 rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-500 transition"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  </section>
</template>