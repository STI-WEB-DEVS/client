<template>
  <section class="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
    <div class="mb-8">
      <button @click="router.push('/customer/cart')"
        class="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition mb-4">
        ← Back to Cart
      </button>

      <h2 class="text-2xl font-bold text-gray-900">Checkout</h2>
      <p class="mt-1 text-sm text-gray-500">Review your order before placing it.</p>
    </div>

    <div class="space-y-6">
      <!-- ORDER SUMMARY -->
      <div class="rounded-xl border border-gray-200 bg-white divide-y divide-gray-100">
        <div class="p-5">
          <h3 class="text-base font-semibold text-gray-900">Order Summary
            <span class="text-sm font-normal text-gray-500 ml-1">
              ({{ totalItems }} item{{ totalItems !== 1 ? "s" : "" }})
            </span>
          </h3>
        </div>
        <div
          v-for="item in cart"
          :key="item.uuid"
          class="flex items-center justify-between px-5 py-4">
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
        <div class="flex justify-between px-5 py-4 bg-gray-50">
          <span class="font-bold text-gray-900">Total</span>
          <span class="font-bold text-indigo-600"
            >₱{{ subtotal.toFixed(2) }}</span>
        </div>
      </div>

      <!-- PLACE ORDER -->
      <div class="rounded-xl border border-gray-200 bg-white p-6">
        <button
          @click="placeOrder"
          :disabled="!cart.length"
          class="w-full rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-500 transition disabled:opacity-50 disabled:cursor-not-allowed">
          Place Order
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";

definePageMeta({ layout: "customer" });

const router = useRouter();
const cart = ref<any[]>([]);
const customerUUID = ref("");
const route = useRoute();

onMounted(() => {
  const mode = route.query.mode;

  if (mode === "buynow") {
    // Load buy now item only
    cart.value = JSON.parse(localStorage.getItem("buynow") || "[]");
    localStorage.removeItem("buynow"); // clean up after loading
  } else {
    // Load regular cart
    cart.value = JSON.parse(localStorage.getItem("cart") || "[]");
  }

  customerUUID.value = localStorage.getItem("uuid") || "";

  if (cart.value.length === 0) {
    router.replace("/customer/cart");
  }
});

const subtotal = computed(() =>
  cart.value.reduce(
    (sum, item) => sum + (Number(item.price) || 0) * item.quantity, 0,
  ),
);

const totalItems = computed(() =>
  cart.value.reduce((sum, item) => sum + item.quantity, 0),
);

//  PAYLOAD 
const orderPayload = computed(() => ({
  customer_uuid: customerUUID.value,
  items: cart.value.map((item) => ({
    product_uuid: item.uuid,
    quantity: item.quantity,
  })),
}));

const placeOrder = () => {
  if (!cart.value.length) return;

  // LOG TO CONSOLE
  console.log("ORDER PAYLOAD → POST /api/Order");
  console.log(JSON.stringify(orderPayload.value, null, 2));
};
</script>