<script setup lang="ts">
import { ref, computed, onMounted } from "vue";

definePageMeta({ layout: "customer" });

const router = useRouter();

const cart = ref<any[]>([]);
const customerUUID = ref("");
const isLoading = ref(false);

onMounted(() => {
  cart.value = JSON.parse(localStorage.getItem("cart") || "[]");

  // Prefer customer_uuid, fallback to uuid
  customerUUID.value = localStorage.getItem("customer_uuid") || 
                       localStorage.getItem("uuid") || "";

  console.log("Loaded Customer UUID:", customerUUID.value);

  if (cart.value.length === 0) {
    router.replace("/customer/cart");
  }
});

const subtotal = computed(() => 
  cart.value.reduce((sum, item) => {
    const price = Number(item?.price) || 0;
    const qty = Number(item?.quantity) || 0;
    return sum + price * qty;
  }, 0)
);

const orderPayload = computed(() => ({
  customer_uuid: customerUUID.value,
  items: cart.value.map((item) => ({
    product_id: item.uuid,
    quantity: item.quantity,
  })),
}));

const placeOrder = async () => {
  const token = localStorage.getItem("_token");

  console.log("Sending customer_uuid:", customerUUID.value);

  if (!token) return alert("Please login first!");
  if (!customerUUID.value) return alert("Customer UUID is missing! Please login again.");

  isLoading.value = true;

  try {
    const { public: { apiBaseURL } } = useRuntimeConfig();

    const response = await $fetch(`${apiBaseURL}/orders`, {
      method: "POST",
      body: orderPayload.value,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    console.log("✅ Order Created:", response);

    localStorage.removeItem("cart");
    alert("✅ Order placed successfully!");
    router.push("/customer/order");   // Changed to existing page

  } catch (error: any) {
    console.error("Full Error:", error?.response?._data || error);
    alert(error?.response?._data?.message || "Failed to place order");
  } finally {
    isLoading.value = false;
  }
};

const goBack = () => router.push("/customer/cart");
</script>

<template>
  <!-- Your template remains the same -->
  <section class="mx-auto max-w-3xl px-4 py-10">
    <button @click="goBack" class="mb-6 text-gray-500 hover:text-gray-700 flex items-center gap-1">
      ← Back to Cart
    </button>

    <h2 class="text-2xl font-bold mb-8">Checkout</h2>

    <div class="space-y-6">
      <div class="bg-white border rounded-xl p-5">
        <h3 class="font-semibold mb-2">Customer UUID</h3>
        <code class="bg-gray-100 px-3 py-1 text-sm">{{ customerUUID || "Not found" }}</code>
      </div>

      <div class="bg-white border rounded-xl divide-y">
        <div class="p-5 font-semibold">Order Items ({{ cart.length }})</div>
        <div v-for="item in cart" :key="item.uuid" class="p-5 flex justify-between">
          <div>
            <p>{{ item.name }}</p>
            <p class="text-sm text-gray-500">₱{{ Number(item.price).toFixed(2) }} × {{ item.quantity }}</p>
          </div>
          <p class="font-semibold">₱{{ (Number(item.price) * item.quantity).toFixed(2) }}</p>
        </div>
      </div>

      <div class="bg-white border rounded-xl p-6">
        <div class="flex justify-between text-xl font-bold mb-6">
          <span>Total</span>
          <span>₱{{ subtotal.toFixed(2) }}</span>
        </div>

        <button
          @click="placeOrder"
          :disabled="isLoading || !customerUUID"
          class="w-full bg-indigo-600 text-white py-4 rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50"
        >
          {{ isLoading ? "Processing..." : "Place Order" }}
        </button>
      </div>
    </div>
  </section>
</template>