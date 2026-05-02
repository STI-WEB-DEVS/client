<template>
  <section class="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
    <div class="mb-8 flex items-center justify-between">
      <h2 class="text-2xl font-bold text-gray-900">Shopping Cart</h2>
      <button v-if="cart.length > 0"
        @click="clearCart"
        class="text-sm font-medium text-red-600 hover:text-red-500 transition">
        Clear Cart
      </button>
    </div>

    <!-- EMPTY -->
    <div
      v-if="cart.length === 0"
      class="rounded-xl border border-gray-200 bg-white p-12 text-center">
      <h3 class="text-lg font-semibold text-gray-900">Your cart is empty</h3>
      <p class="mt-2 text-sm text-gray-500">Start shopping to add items.</p>
      <button
        @click="router.push('/customer/shop')"
        class="mt-6 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-500 transition">
        Continue Shopping
      </button>
    </div>

    <div v-else class="space-y-6">
      <div
        class="rounded-xl border border-gray-200 bg-white divide-y divide-gray-100">
        <div
          v-for="item in cart"
          :key="item.uuid"
          class="flex items-center gap-4 p-5">

          <div class="flex-1">
            <p class="text-sm font-semibold text-gray-900">{{ item.name }}</p>
            <p class="text-xs text-gray-500">
              ₱{{ Number(item.price).toFixed(2) }} each
            </p>
          </div>
          <div class="flex items-center gap-2">
            <button
              @click="decrement(item)"
              class="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50">−
            </button>
            <span class="w-8 text-center text-sm font-medium">{{item.quantity}}</span>
            
            <button
              @click="increment(item)"
              class="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50">+
            </button>
          </div>
          <p class="w-24 text-right text-sm font-semibold text-gray-900">
            ₱{{ (Number(item.price) * item.quantity).toFixed(2) }}
          </p>
          <button
            @click="removeItem(item)"
            class="text-gray-400 hover:text-red-500 transition">✕
          </button>
        </div>
      </div>

      <div class="rounded-xl border border-gray-200 bg-white p-6">
        <div class="flex justify-between mb-4">
          <span class="font-semibold text-gray-900">Total</span>
          <span class="font-bold text-indigo-600">
            ₱{{ subtotal.toFixed(2) }}</span>
        </div>
        <div class="flex gap-3">
          <button
            @click="router.push('/customer/shop')"
            class="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
            Continue Shopping
          </button>

          <button
            @click="router.push('/customer/checkout')"
            class="flex-1 rounded-lg bg-indigo-600 px-4 py-3 text-sm font-medium text-white hover:bg-indigo-500 transition">
            Checkout
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, inject } from "vue";

definePageMeta({ layout: "customer" });

const router = useRouter();
const cart = ref<any[]>([]);
const updateCartCount = inject<() => void>("updateCartCount");

onMounted(() => {
  cart.value = JSON.parse(localStorage.getItem("cart") || "[]");
});

const saveCart = () => {
  localStorage.setItem("cart", JSON.stringify(cart.value));
  window.dispatchEvent(new Event("cart-updated"));
  if (updateCartCount) updateCartCount();
};

const increment = (item: any) => {
  item.quantity++;
  saveCart();
};
const decrement = (item: any) => {
  if (item.quantity <= 1) {
    removeItem(item);
    return;
  }
  item.quantity--;
  saveCart();
};
const removeItem = (item: any) => {
  cart.value = cart.value.filter((i: any) => i.uuid !== item.uuid);
  saveCart();
};
const clearCart = () => {
  cart.value = [];
  saveCart();
};

const subtotal = computed(() =>
  cart.value.reduce(
    (sum, item) => sum + (Number(item.price) || 0) * item.quantity, 0,),
);
</script>