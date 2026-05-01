<script setup lang="ts">
import { ref, computed, onMounted, inject } from "vue";

definePageMeta({
  layout: "customer",
});

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

const updateQty = (item: any, qty: number) => {
  if (qty < 1) {
    removeItem(item);
    return;
  }
  item.quantity = qty;
  saveCart();
};

const incrementQty = (item: any) => {
  item.quantity++;
  saveCart();
};

const decrementQty = (item: any) => {
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

const subtotal = computed(() => {
  return cart.value.reduce((sum: number, item: any) => {
    return sum + (Number(item.price) || 0) * item.quantity;
  }, 0);
});

const goToCheckout = () => {
  if (cart.value.length === 0) return;
  router.push("/customer/checkout");
};

const goShopping = () => {
  router.push("/customer/shop");
};
</script>

<template>
  <section class="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
    <div class="mb-8 flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold text-gray-900">Shopping Cart</h2>
        <p class="mt-1 text-sm text-gray-500">
          {{ cart.length }} item{{ cart.length !== 1 ? "s" : "" }} in your cart
        </p>
      </div>
      <button
        v-if="cart.length > 0"
        @click="clearCart"
        class="text-sm font-medium text-red-600 hover:text-red-500 transition"
      >
        Clear Cart
      </button>
    </div>

    <!-- EMPTY CART -->
    <div
      v-if="cart.length === 0"
      class="rounded-xl border border-gray-200 bg-white p-12 text-center"
    >
      <svg
        class="mx-auto h-12 w-12 text-gray-300"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
        />
      </svg>
      <h3 class="mt-4 text-lg font-semibold text-gray-900">
        Your cart is empty
      </h3>
      <p class="mt-2 text-sm text-gray-500">
        Start shopping to add items to your cart.
      </p>
      <button
        @click="goShopping"
        class="mt-6 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-500 transition"
      >
        Continue Shopping
      </button>
    </div>

    <!-- CART ITEMS -->
    <div v-else class="space-y-6">
      <div
        class="rounded-xl border border-gray-200 bg-white divide-y divide-gray-100"
      >
        <div
          v-for="item in cart"
          :key="item.uuid"
          class="flex items-center gap-4 p-5"
        >
          <!-- Product Image Placeholder -->
          <div
            class="h-16 w-16 flex-shrink-0 rounded-lg bg-gray-100 flex items-center justify-center"
          >
            <svg
              class="h-8 w-8 text-gray-300"
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

          <!-- Product Details -->
          <div class="flex-1 min-w-0">
            <h3 class="text-sm font-semibold text-gray-900 truncate">
              {{ item.name }}
            </h3>
            <p class="mt-0.5 text-sm text-gray-500">
              ₱{{ Number(item.price).toFixed(2) }} each
            </p>
          </div>

          <!-- Quantity Controls -->
          <div class="flex items-center gap-2">
            <button
              @click="decrementQty(item)"
              class="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition"
            >
              −
            </button>
            <input
              type="number"
              :value="item.quantity"
              @change="
                updateQty(
                  item,
                  Number(($event.target as HTMLInputElement).value),
                )
              "
              min="1"
              class="h-8 w-14 rounded-lg border border-gray-300 text-center text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <button
              @click="incrementQty(item)"
              class="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition"
            >
              +
            </button>
          </div>

          <!-- Line Total -->
          <div class="w-24 text-right">
            <p class="text-sm font-semibold text-gray-900">
              ₱{{ (Number(item.price) * item.quantity).toFixed(2) }}
            </p>
          </div>

          <!-- Remove Button -->
          <button
            @click="removeItem(item)"
            class="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500 transition"
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
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- ORDER SUMMARY -->
      <div class="rounded-xl border border-gray-200 bg-white p-6">
        <h3 class="text-lg font-semibold text-gray-900">Order Summary</h3>

        <div class="mt-4 space-y-3">
          <div class="flex justify-between text-sm">
            <span class="text-gray-500"
              >Subtotal ({{ cart.length }} item{{
                cart.length !== 1 ? "s" : ""
              }})</span
            >
            <span class="font-medium text-gray-900"
              >₱{{ subtotal.toFixed(2) }}</span
            >
          </div>
          <div class="border-t border-gray-100 pt-3 flex justify-between">
            <span class="text-base font-semibold text-gray-900">Total</span>
            <span class="text-base font-bold text-indigo-600"
              >₱{{ subtotal.toFixed(2) }}</span
            >
          </div>
        </div>

        <div class="mt-6 flex gap-3">
          <button
            @click="goShopping"
            class="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
          >
            Continue Shopping
          </button>
          <button
            @click="goToCheckout"
            class="flex-1 rounded-lg bg-indigo-600 px-4 py-3 text-sm font-medium text-white hover:bg-indigo-500 transition"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
