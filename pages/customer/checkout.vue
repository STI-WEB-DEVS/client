<template>
  <main class="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-4xl">
      <div class="mb-8">
        <button
          @click="navigateTo('/customer/order')"
          class="text-sm font-semibold text-indigo-600 hover:text-indigo-500"
        >
          ← Back to shop
        </button>

        <h2 class="mt-4 text-3xl font-bold tracking-tight text-gray-900">
          Checkout
        </h2>

        <p class="mt-2 text-sm text-gray-600">
          Review your order before placing it.
        </p>
      </div>

      <div v-if="cart.length === 0" class="rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-sm">
        <h3 class="text-lg font-semibold text-gray-900">
          Your cart is empty
        </h3>

        <p class="mt-2 text-sm text-gray-500">
          Add products to your cart before checking out.
        </p>

        <button
          @click="navigateTo('/customer/order')"
          class="mt-6 rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500"
        >
          Continue Shopping
        </button>
      </div>

      <div v-else class="grid gap-6 lg:grid-cols-[1fr_320px]">
        <section class="space-y-4">
          <div
            v-for="item in cart"
            :key="item.uuid"
            class="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <div class="flex items-start justify-between gap-4">
              <div>
                <h3 class="text-base font-semibold text-gray-900">
                  {{ item.name }}
                </h3>

                <p class="mt-1 text-sm text-gray-500">
                  Quantity: {{ item.quantity }}
                </p>

                <p class="mt-1 text-sm text-gray-500">
                  Price: ₱{{ Number(item.price).toLocaleString() }}
                </p>
              </div>

              <p class="shrink-0 font-bold text-gray-900">
                ₱{{ (Number(item.price) * Number(item.quantity)).toLocaleString() }}
              </p>
            </div>
          </div>
        </section>

        <aside class="h-fit rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 class="text-lg font-bold text-gray-900">
            Order Summary
          </h3>

          <div class="mt-5 space-y-3 text-sm">
            <div class="flex justify-between text-gray-600">
              <span>Items</span>
              <span>{{ cart.length }}</span>
            </div>

            <div class="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>₱{{ totalAmount.toLocaleString() }}</span>
            </div>

            <div class="border-t border-gray-200 pt-3">
              <div class="flex justify-between text-base font-bold text-gray-900">
                <span>Total</span>
                <span>₱{{ totalAmount.toLocaleString() }}</span>
              </div>
            </div>
          </div>

          <button
            @click="placeOrder"
            :disabled="isLoading"
            class="mt-6 w-full rounded-md bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {{ isLoading ? 'Placing order...' : 'Place Order' }}
          </button>

          <p v-if="error" class="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-600">
            {{ error }}
          </p>
        </aside>
      </div>
    </div>

    <div
      v-if="showSuccessModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
    >
      <div class="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-xl">
        <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-2xl text-green-600">
          ✓
        </div>

        <h3 class="mt-4 text-xl font-bold text-gray-900">
          Order Placed Successfully
        </h3>

        <p class="mt-2 text-sm text-gray-600">
          Your order has been created successfully.
        </p>

        <button
          @click="goToOrders"
          class="mt-6 w-full rounded-md bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-500"
        >
          View Orders
        </button>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { getCart, clearCart } from '~/utils/cart';

definePageMeta({
  layout: false,
});

const runtimeConfig = useRuntimeConfig();

const cart = ref<any[]>([]);
const error = ref('');
const isLoading = ref(false);
const showSuccessModal = ref(false);

const totalAmount = computed(() => {
  return cart.value.reduce((sum, item) => {
    return sum + Number(item.price) * Number(item.quantity);
  }, 0);
});

onMounted(() => {
  cart.value = getCart();
});

const placeOrder = async () => {
  error.value = '';
  isLoading.value = true;

  try {
    const customerUUID = localStorage.getItem('_uuid');

    const payload = {
      order_uuid: crypto.randomUUID(),
      customer_uuid: customerUUID,
      date: new Date().toISOString(),
      total: totalAmount.value,
      items: cart.value.map((item: any) => ({
        product_uuid: item.uuid,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
    };

    // ✅ ONLY console log (no backend)
    console.log('Order Payload:', payload);

    // simulate success
    clearCart();
    cart.value = [];

    showSuccessModal.value = true;
  } catch (err: any) {
    error.value = err?.message || 'Something went wrong.';
  } finally {
    isLoading.value = false;
  }
};
const goToOrders = async () => {
  await navigateTo('/customer/order');
};
</script>