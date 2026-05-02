<script setup>
definePageMeta({
  layout: "customer",
});

import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { ChevronLeftIcon } from "@heroicons/vue/24/outline";

const router = useRouter();
const checkoutData = ref(null);
const showSuccessModal = ref(false);

const loadCheckoutData = () => {
  if (process.client) {
    const data = localStorage.getItem("checkout_data");
    if (data) {
      checkoutData.value = JSON.parse(data);
    } else {
      router.push("/customer/shop");
    }
  }
};

const subtotal = computed(() => {
  if (!checkoutData.value) return 0;
  return checkoutData.value.items.reduce((total, item) => {
    return total + parseFloat(item.price) * item.quantity;
  }, 0);
});

const shipping = ref(0);
const tax = computed(() => subtotal.value * 0.12);
const total = computed(() => subtotal.value + shipping.value + tax.value);

const { formatPrice } = useCurrency();

const placeOrder = () => {
  if (!checkoutData.value) return;

  // Retrieve current logged-in customer UUID from localStorage
  const customerUuid = localStorage.getItem("_uuid") || "GUEST-USER-UUID";

  // Construct JSON Payload for backend
  const orderPayload = {
    customer_uuid: customerUuid,
    products: checkoutData.value.items.map((item) => ({
      product_uuid: item.uuid,
      quantity: item.quantity,
    })),
  };

  // Log to console for development verification
  console.log(JSON.stringify(orderPayload, null, 2));

  // Show visual feedback
  showSuccessModal.value = true;
};

const handleOrderSuccess = () => {
  showSuccessModal.value = false;
  localStorage.removeItem("checkout_data");
  if (checkoutData.value && !checkoutData.value.isBuyNow) {
    localStorage.removeItem("cart");
  }
  router.push("/customer/shop");
};

onMounted(loadCheckoutData);
</script>

<template>
  <div class="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
    <NuxtLink
      to="/customer/shop"
      class="group mb-8 inline-flex items-center text-sm font-medium text-gray-500 transition-colors hover:text-gray-700"
    >
      <ChevronLeftIcon
        class="mr-1 h-5 w-5 transition-transform group-hover:-translate-x-1"
      />
      Back to Shopping
    </NuxtLink>

    <div v-if="checkoutData" class="flex flex-col items-center">
      <h1
        class="mb-10 text-center text-3xl font-extrabold tracking-tight text-gray-900"
      >
        Review Your Order
      </h1>

      <div class="w-full max-w-xl">
        <div
          class="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl"
        >
          <div class="border-b border-gray-200 bg-gray-50 p-6">
            <h2 class="text-lg font-bold text-gray-900">Order Summary</h2>
            <p class="mt-1 text-sm text-gray-500">
              {{ checkoutData.isBuyNow ? "Direct Purchase" : "Cart Checkout" }}
            </p>
          </div>

          <ul
            role="list"
            class="max-h-96 divide-y divide-gray-200 overflow-y-auto px-6 py-4"
          >
            <li
              v-for="item in checkoutData.items"
              :key="item.uuid"
              class="flex items-center py-6"
            >
              <!-- Extremely Robust Placeholder -->
              <div
                class="flex h-24 w-24 flex-none items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-700 shadow-lg"
                style="min-width: 96px; min-height: 96px"
              >
                <span
                  class="select-none text-4xl font-black text-white opacity-40"
                >
                  {{ item.name.charAt(0) }}
                </span>
              </div>
              <div class="ml-6 flex flex-1 flex-col justify-center">
                <div
                  class="flex justify-between text-base font-bold text-gray-900"
                >
                  <p>{{ item.name }}</p>
                  <p>{{ formatPrice(item.price * item.quantity) }}</p>
                </div>
                <p class="mt-1 text-sm text-gray-500">
                  Quantity: {{ item.quantity }}
                </p>
              </div>
            </li>
          </ul>

          <div class="space-y-4 border-t border-gray-200 bg-gray-50 p-8">
            <div class="flex items-center justify-between text-sm">
              <span class="text-gray-600">Subtotal</span>
              <span class="font-bold text-gray-900">{{
                formatPrice(subtotal)
              }}</span>
            </div>
            <div class="flex items-center justify-between text-sm">
              <span class="text-gray-600">Tax (12%)</span>
              <span class="font-bold text-gray-900">{{
                formatPrice(tax)
              }}</span>
            </div>
            <div
              class="flex items-center justify-between border-t border-gray-200 pt-6 text-xl font-black"
            >
              <span class="text-gray-900">Total Amount</span>
              <span class="text-indigo-600">{{ formatPrice(total) }}</span>
            </div>

            <button
              @click="placeOrder"
              type="button"
              class="mt-8 flex w-full items-center justify-center rounded-2xl bg-indigo-600 px-6 py-6 text-xl font-black text-white shadow-xl shadow-indigo-100 transition-all active:scale-[0.98] hover:bg-indigo-700"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Success Feedback Modal -->
    <FeedbackModal
      :open="showSuccessModal"
      type="success"
      title="Order Placed Successfully!"
      message="Thank you for your purchase. Your order has been received and is being processed."
      @close="handleOrderSuccess"
    />
  </div>
</template>
