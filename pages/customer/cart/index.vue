<template>
  <div class="max-w-3xl mx-auto">
    <h1 class="text-2xl font-bold text-gray-900 mb-6">Your Cart</h1>

    <!-- Empty cart -->
    <div v-if="items.length === 0" class="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white py-20 text-center">
      <ShoppingCartIcon class="mb-4 size-14 text-gray-300" />
      <h3 class="text-lg font-semibold text-gray-700">Your cart is empty</h3>
      <NuxtLink to="/customer/products" class="mt-4 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 transition">
        Start Shopping
      </NuxtLink>
    </div>

    <!-- Cart items -->
    <div v-else>
      <div class="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mb-6">
        <div class="divide-y divide-gray-100">
          <div v-for="item in items" :key="item.uuid" class="flex items-center gap-4 px-6 py-4">
            <!-- Icon -->
            <div class="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0">
              <CubeIcon class="size-7 text-indigo-300" />
            </div>

            <!-- Info -->
            <div class="flex-1 min-w-0">
              <p class="font-semibold text-gray-900 truncate">{{ item.name }}</p>
              <p class="text-sm text-gray-500">${{ Number(item.price).toFixed(2) }} each</p>
            </div>

            <!-- Quantity controls -->
            <div class="flex items-center gap-2">
              <button @click="decrease(item)" class="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition font-semibold text-sm">−</button>
              <span class="w-6 text-center font-semibold text-gray-900 text-sm">{{ item.quantity }}</span>
              <button @click="increase(item)" class="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition font-semibold text-sm">+</button>
            </div>

            <!-- Subtotal -->
            <p class="w-20 text-right font-bold text-gray-900">${{ (item.price * item.quantity).toFixed(2) }}</p>

            <!-- Remove -->
            <button @click="remove(item.uuid)" class="text-red-400 hover:text-red-600 transition ml-2">
              <TrashIcon class="size-5" />
            </button>
          </div>
        </div>
      </div>

      <!-- Summary -->
      <div class="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        <div class="space-y-2 mb-4">
          <div class="flex justify-between text-sm text-gray-600">
            <span>Subtotal ({{ totalItems }} items)</span>
            <span>${{ total.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between text-sm text-gray-600">
            <span>Shipping</span>
            <span class="text-green-600 font-medium">Free</span>
          </div>
          <div class="border-t border-gray-100 pt-3 flex justify-between font-bold text-gray-900 text-lg">
            <span>Total</span>
            <span>${{ total.toFixed(2) }}</span>
          </div>
        </div>

        <div class="flex gap-3">
          <NuxtLink to="/customer/products" class="flex-1 rounded-xl border border-gray-300 py-3 text-sm font-semibold text-gray-700 text-center hover:bg-gray-50 transition">
            Continue Shopping
          </NuxtLink>
          <button @click="checkout" :disabled="isCheckingOut"
            class="flex-1 rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60 transition flex items-center justify-center gap-2">
            <svg v-if="isCheckingOut" class="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
            </svg>
            {{ isCheckingOut ? 'Placing Order…' : 'Checkout' }}
          </button>
        </div>

        <p v-if="errorMsg" class="mt-3 text-sm text-red-600 text-center">{{ errorMsg }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'customer', middleware: 'auth' });

import { ref, computed, onMounted } from 'vue';
import { ShoppingCartIcon, CubeIcon, TrashIcon } from '@heroicons/vue/24/outline';
import { cartService, type CartItem } from '~/api/cart/CartService';
import { orderService } from '~/api/order/OrderService';

const items = ref<CartItem[]>([]);
const isCheckingOut = ref(false);
const errorMsg = ref('');

const total = computed(() => items.value.reduce((s, i) => s + i.price * i.quantity, 0));
const totalItems = computed(() => items.value.reduce((s, i) => s + i.quantity, 0));

const refresh = () => {
  items.value = cartService.getItems();
  window.dispatchEvent(new Event('cart-updated'));
};

const increase = (item: CartItem) => {
  cartService.updateQty(item.uuid, item.quantity + 1);
  refresh();
};

const decrease = (item: CartItem) => {
  if (item.quantity <= 1) {
    cartService.removeItem(item.uuid);
  } else {
    cartService.updateQty(item.uuid, item.quantity - 1);
  }
  refresh();
};

const remove = (uuid: string) => {
  cartService.removeItem(uuid);
  refresh();
};

const checkout = async () => {
  const customerUuid = localStorage.getItem('_uuid');
  if (!customerUuid) {
    errorMsg.value = 'Unable to identify your customer account.';
    return;
  }

  isCheckingOut.value = true;
  errorMsg.value = '';

  try {
    const payload = {
      customer_uuid: customerUuid,
      items: items.value.map(i => ({
        product_uuid: i.uuid,
        quantity: i.quantity,
      })),
    };

    const order = await orderService.create(payload);
    cartService.clear();
    window.dispatchEvent(new Event('cart-updated'));

    // Navigate to receipt page with order data
    const orderData = order?.data ?? order;
    await navigateTo({
      path: '/customer/receipt',
      query: { order: JSON.stringify(orderData) },
    });
  } catch (e: any) {
    errorMsg.value = e?.message || 'Checkout failed. Please try again.';
  } finally {
    isCheckingOut.value = false;
  }
};

onMounted(refresh);
</script>
