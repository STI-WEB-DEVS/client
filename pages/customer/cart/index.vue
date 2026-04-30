<script setup>
definePageMeta({
  layout: "customer",
});

import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import {
  TrashIcon,
  MinusIcon,
  PlusIcon,
  ArrowRightIcon,
  ShoppingBagIcon,
} from "@heroicons/vue/24/outline";

const router = useRouter();
const cartItems = ref([]);

const loadCart = () => {
  if (process.client) {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        cartItems.value = JSON.parse(savedCart);
      } catch (e) {
        console.error("Failed to parse cart:", e);
        cartItems.value = [];
      }
    }
  }
};

const saveCart = () => {
  if (process.client) {
    localStorage.setItem("cart", JSON.stringify(cartItems.value));
  }
};

const goToCheckout = () => {
  const checkoutData = {
    isBuyNow: false,
    items: cartItems.value,
  };
  localStorage.setItem("checkout_data", JSON.stringify(checkoutData));
  router.push("/customer/checkout");
};

const updateQuantity = (uuid, delta) => {
  const item = cartItems.value.find((i) => i.uuid === uuid);
  if (item) {
    item.quantity += delta;
    if (item.quantity <= 0) {
      removeFromCart(uuid);
    } else {
      saveCart();
    }
  }
};

const removeFromCart = (uuid) => {
  cartItems.value = cartItems.value.filter((i) => i.uuid !== uuid);
  saveCart();
};

const subtotal = computed(() => {
  return cartItems.value.reduce((total, item) => {
    return total + parseFloat(item.price) * item.quantity;
  }, 0);
});

const shipping = ref(0); // Free shipping for demo
const tax = computed(() => subtotal.value * 0.12); // 12% VAT
const total = computed(() => subtotal.value + shipping.value + tax.value);

const formatPrice = (price) => {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(price);
};

onMounted(loadCart);
</script>

<template>
  <div class="space-y-8">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-extrabold tracking-tight text-gray-900">
        Shopping Cart
      </h1>
      <span class="text-sm font-medium text-gray-500"
        >{{ cartItems.length }} Items</span
      >
    </div>

    <!-- Empty State -->
    <div
      v-if="cartItems.length === 0"
      class="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-gray-200 bg-white py-20"
    >
      <ShoppingBagIcon class="mb-4 h-16 w-16 text-gray-300" />
      <p class="text-xl font-medium text-gray-900">Your cart is empty</p>
      <p class="mt-2 text-gray-500">
        Looks like you haven't added anything to your cart yet.
      </p>
      <NuxtLink
        to="/customer/shop"
        class="mt-8 rounded-full bg-indigo-600 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-100 transition-all hover:bg-indigo-700"
      >
        Start Shopping
      </NuxtLink>
    </div>

    <!-- Cart Content -->
    <div
      v-else
      class="lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16"
    >
      <!-- Item List -->
      <section class="lg:col-span-7">
        <ul
          role="list"
          class="divide-y divide-gray-200 border-b border-t border-gray-200"
        >
          <li
            v-for="item in cartItems"
            :key="item.uuid"
            class="flex py-6 sm:py-10"
          >
            <!-- Product Placeholder -->
            <div
              class="flex h-24 w-24 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 sm:h-32 sm:w-32"
            >
              <span class="select-none text-3xl font-bold text-white opacity-20">
                {{ item.name.charAt(0) }}
              </span>
            </div>

            <div class="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
              <div class="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                <div>
                  <div class="flex justify-between">
                    <h3 class="text-sm">
                      <NuxtLink
                        :to="`/customer/shop/${item.uuid}`"
                        class="font-bold text-gray-700 hover:text-gray-800"
                      >
                        {{ item.name }}
                      </NuxtLink>
                    </h3>
                  </div>
                  <p class="mt-1 text-sm font-medium text-indigo-600">
                    {{ formatPrice(item.price) }}
                  </p>
                </div>

                <div class="mt-4 sm:mt-0 sm:pr-9">
                  <div
                    class="flex w-fit items-center space-x-3 rounded-lg border border-gray-200 p-1"
                  >
                    <button
                      @click="updateQuantity(item.uuid, -1)"
                      class="p-1 text-gray-400 hover:text-gray-600"
                    >
                      <MinusIcon class="h-4 w-4" />
                    </button>
                    <span
                      class="w-8 text-center text-sm font-bold text-gray-700"
                      >{{ item.quantity }}</span
                    >
                    <button
                      @click="updateQuantity(item.uuid, 1)"
                      class="p-1 text-gray-400 hover:text-gray-600"
                    >
                      <PlusIcon class="h-4 w-4" />
                    </button>
                  </div>

                  <div class="absolute right-0 top-0">
                    <button
                      @click="removeFromCart(item.uuid)"
                      type="button"
                      class="-m-2 inline-flex p-2 text-gray-400 transition-colors hover:text-red-500"
                    >
                      <TrashIcon class="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>

              <p class="mt-4 flex space-x-2 text-sm text-gray-700">
                <span class="font-medium">Subtotal:</span>
                <span class="font-bold">{{
                  formatPrice(item.price * item.quantity)
                }}</span>
              </p>
            </div>
          </li>
        </ul>
      </section>

      <!-- Order Summary -->
      <section
        class="mt-16 rounded-3xl bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
      >
        <h2 class="text-lg font-bold text-gray-900">Order Summary</h2>

        <dl class="mt-6 space-y-4">
          <div class="flex items-center justify-between">
            <dt class="text-sm text-gray-600">Subtotal</dt>
            <dd class="text-sm font-bold text-gray-900">
              {{ formatPrice(subtotal) }}
            </dd>
          </div>
          <div
            class="flex items-center justify-between border-t border-gray-200 pt-4"
          >
            <dt class="flex items-center text-sm text-gray-600">
              <span>Shipping estimate</span>
            </dt>
            <dd class="text-sm font-bold text-gray-900">
              {{ formatPrice(shipping) }}
            </dd>
          </div>
          <div
            class="flex items-center justify-between border-t border-gray-200 pt-4"
          >
            <dt class="text-sm text-gray-600">Tax estimate (12%)</dt>
            <dd class="text-sm font-bold text-gray-900">
              {{ formatPrice(tax) }}
            </dd>
          </div>
          <div
            class="flex items-center justify-between border-t border-gray-200 pt-4"
          >
            <dt class="text-base font-extrabold text-gray-900">Order total</dt>
            <dd class="text-base font-extrabold text-indigo-600">
              {{ formatPrice(total) }}
            </dd>
          </div>
        </dl>

        <div class="mt-6">
          <button
            @click="goToCheckout"
            type="button"
            class="flex w-full items-center justify-center rounded-xl border border-transparent bg-indigo-600 px-4 py-4 text-base font-bold text-white shadow-lg shadow-indigo-100 transition-all active:scale-[0.98] hover:bg-indigo-700"
          >
            Checkout
            <ArrowRightIcon class="ml-2 h-5 w-5" />
          </button>
        </div>
      </section>
    </div>
  </div>
</template>
