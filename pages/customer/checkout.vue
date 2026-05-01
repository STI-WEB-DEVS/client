<script setup lang="ts">
import { ref, computed, onMounted } from "vue";

definePageMeta({
  layout: "customer",
});

const router = useRouter();

const cart = ref<any[]>([]);
const customerUUID = ref("");

onMounted(() => {
  cart.value = JSON.parse(localStorage.getItem("cart") || "[]");

  // Try all possible keys where the customer UUID might be stored
  customerUUID.value =
    localStorage.getItem("customer_uuid") || localStorage.getItem("uuid") || "";

  if (cart.value.length === 0) {
    router.replace("/customer/cart");
  }
});

const subtotal = computed(() =>
  cart.value.reduce(
    (sum, item) => sum + (Number(item.price) || 0) * item.quantity,
    0,
  ),
);

const totalItems = computed(() =>
  cart.value.reduce((sum, item) => sum + item.quantity, 0),
);

// 🔥 BUILD PAYLOAD — matches backend OrderStoreRequest exactly
const orderPayload = computed(() => ({
  customer_id: customerUUID.value,
  items: cart.value.map((item) => ({
    product_id: item.uuid,
    quantity: item.quantity,
  })),
}));

const placeOrder = () => {
  console.log("═══════════════════════════════════");
  console.log("📦ORDER PAYLOAD (POST /api/orders)");
  console.log("═══════════════════════════════════");
  console.log(JSON.stringify(orderPayload.value, null, 2));
  console.log("═══════════════════════════════════");
};

const goBack = () => router.push("/customer/cart");
</script>

<template>
  <section class="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
    <div class="mb-8">
      <button
        @click="goBack"
        class="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition mb-4"
      >
        <svg
          class="h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        </svg>
        Back to Cart
      </button>
      <h2 class="text-2xl font-bold text-gray-900">Checkout</h2>
      <p class="mt-1 text-sm text-gray-500">
        Review your order before placing it.
      </p>
    </div>

    <div class="space-y-6">
      <!-- Customer Info -->
      <div class="rounded-xl border border-gray-200 bg-white p-5">
        <h3 class="text-sm font-semibold text-gray-900 mb-3">Customer</h3>
        <div class="text-sm text-gray-600">
          <span class="font-medium text-gray-700">UUID:</span>
          <code
            class="ml-2 rounded bg-gray-100 px-2 py-0.5 text-xs font-mono text-gray-800"
          >
            {{ customerUUID || "Not found — check localStorage" }}
          </code>
        </div>
      </div>

      <!-- Order Items -->
      <div
        class="rounded-xl border border-gray-200 bg-white divide-y divide-gray-100"
      >
        <div class="p-5">
          <h3 class="text-sm font-semibold text-gray-900">
            Order Items ({{ totalItems }} item{{ totalItems !== 1 ? "s" : "" }})
          </h3>
        </div>
        <div
          v-for="item in cart"
          :key="item.uuid"
          class="flex items-center justify-between p-5"
        >
          <div>
            <p class="text-sm font-semibold text-gray-900">{{ item.name }}</p>
            <p class="text-xs text-gray-500">
              ₱{{ Number(item.price).toFixed(2) }} × {{ item.quantity }}
            </p>
            <p class="text-xs text-gray-400 font-mono mt-0.5">
              UUID: {{ item.uuid }}
            </p>
          </div>
          <p class="text-sm font-semibold text-gray-900">
            ₱{{ (Number(item.price) * item.quantity).toFixed(2) }}
          </p>
        </div>
      </div>

      <!-- Total & Place Order -->
      <div class="rounded-xl border border-gray-200 bg-white p-6">
        <div class="flex justify-between mb-6">
          <span class="text-base font-semibold text-gray-900">Total</span>
          <span class="text-lg font-bold text-indigo-600"
            >₱{{ subtotal.toFixed(2) }}</span
          >
        </div>

        <button
          @click="placeOrder"
          :disabled="!cart.length || !customerUUID"
          class="w-full rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Place Order
        </button>

        <p v-if="!customerUUID" class="mt-2 text-xs text-center text-red-500">
          ⚠ Customer UUID missing from localStorage. Check your login response.
        </p>
      </div>
    </div>
  </section>
</template>
