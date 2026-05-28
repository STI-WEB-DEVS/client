<template>
  <div class="max-w-2xl mx-auto">
    <!-- Success animation header -->
    <div class="text-center mb-8">
      <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-4">
        <CheckCircleIcon class="w-12 h-12 text-green-600" />
      </div>
      <h1 class="text-3xl font-bold text-gray-900">Order Placed!</h1>
      <p class="mt-2 text-gray-500">Thank you for your purchase. Here's your receipt.</p>
    </div>

    <!-- Receipt card -->
    <div class="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
      <!-- Receipt header stripe -->
      <div class="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6 text-white">
        <div class="flex justify-between items-start">
          <div>
            <p class="text-xs font-semibold text-indigo-200 uppercase tracking-widest mb-1">Receipt</p>
            <p class="text-2xl font-bold">{{ order?.customer?.name ?? 'Customer' }}</p>
            <p class="text-sm text-indigo-200 mt-0.5">{{ order?.customer?.email ?? '' }}</p>
          </div>
          <div class="text-right">
            <p class="text-xs text-indigo-200 uppercase tracking-wider">Order ID</p>
            <p class="font-mono text-sm font-bold mt-0.5">{{ shortId }}</p>
          </div>
        </div>
        <div class="mt-4 pt-4 border-t border-indigo-500 flex justify-between text-sm text-indigo-200">
          <span>{{ formatDate(order?.created_at) }}</span>
          <span>{{ order?.items?.length ?? 0 }} item(s)</span>
        </div>
      </div>

      <!-- Items list -->
      <div class="px-8 py-6">
        <p class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Items Ordered</p>

        <div class="space-y-4">
          <div
            v-for="(item, idx) in order?.items"
            :key="item.product_uuid ?? idx"
            class="flex items-center justify-between gap-4"
          >
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0">
                <CubeIcon class="w-5 h-5 text-indigo-300" />
              </div>
              <div>
                <p class="font-semibold text-gray-900 text-sm">{{ item.product_name }}</p>
                <p class="text-xs text-gray-400">qty {{ item.quantity }} × ${{ Number(item.unit_price).toFixed(2) }}</p>
              </div>
            </div>
            <p class="font-bold text-gray-900 text-sm">${{ Number(item.subtotal).toFixed(2) }}</p>
          </div>
        </div>

        <!-- Divider -->
        <div class="my-6 border-t border-dashed border-gray-200"></div>

        <!-- Totals -->
        <div class="space-y-2">
          <div class="flex justify-between text-sm text-gray-500">
            <span>Subtotal</span>
            <span>${{ Number(order?.total_amount ?? 0).toFixed(2) }}</span>
          </div>
          <div class="flex justify-between text-sm text-gray-500">
            <span>Shipping</span>
            <span class="text-green-600 font-medium">Free</span>
          </div>
          <div class="flex justify-between text-sm text-gray-500">
            <span>Tax</span>
            <span>$0.00</span>
          </div>
          <div class="flex justify-between items-center pt-3 border-t border-gray-200">
            <span class="font-bold text-gray-900">Total Paid</span>
            <span class="text-2xl font-bold text-indigo-600">${{ Number(order?.total_amount ?? 0).toFixed(2) }}</span>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="bg-gray-50 px-8 py-4 border-t border-gray-100 text-center">
        <p class="text-xs text-gray-400">A confirmation has been recorded. Thank you for shopping with us!</p>
      </div>
    </div>

    <!-- Action buttons -->
    <div class="mt-6 flex flex-col sm:flex-row gap-3">
      <NuxtLink
        to="/customer/products"
        class="flex-1 flex items-center justify-center gap-2 rounded-xl border-2 border-indigo-600 py-3 text-sm font-semibold text-indigo-600 hover:bg-indigo-50 transition"
      >
        <ShoppingBagIcon class="w-4 h-4" />
        Continue Shopping
      </NuxtLink>
      <NuxtLink
        to="/customer/orders"
        class="flex-1 flex items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white hover:bg-indigo-700 transition"
      >
        <ClipboardDocumentListIcon class="w-4 h-4" />
        View My Orders
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'customer', middleware: 'auth' });

import { computed } from 'vue';
import { useRoute } from 'vue-router';
import {
  CheckCircleIcon,
  CubeIcon,
  ShoppingBagIcon,
  ClipboardDocumentListIcon,
} from '@heroicons/vue/24/outline';

const route = useRoute();

const order = computed(() => {
  try {
    const raw = route.query.order as string;
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
});

const shortId = computed(() => {
  const id = order.value?.uuid ?? '';
  return id ? `#${id.slice(0, 8).toUpperCase()}` : '—';
});

const formatDate = (d: string) => {
  if (!d) return new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  return new Date(d).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
};
</script>
