<template>
  <div class="max-w-4xl mx-auto">
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900">My Orders</h1>
      <p class="mt-1 text-sm text-gray-500">Your complete purchase history.</p>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex justify-center py-20">
      <div class="animate-spin rounded-full h-10 w-10 border-4 border-indigo-200 border-t-indigo-600"></div>
    </div>

    <!-- Empty -->
    <div v-else-if="orders.length === 0" class="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white py-20 text-center">
      <ClipboardDocumentListIcon class="mb-4 size-14 text-gray-300" />
      <h3 class="text-lg font-semibold text-gray-700">No orders yet</h3>
      <p class="mt-1 text-sm text-gray-500">When you place an order, it will appear here.</p>
      <NuxtLink to="/customer/products" class="mt-5 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 transition">
        Shop Now
      </NuxtLink>
    </div>

    <!-- Orders list -->
    <div v-else class="space-y-4">
      <div
        v-for="order in orders"
        :key="order.uuid"
        class="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
      >
        <!-- Order header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-4 bg-gray-50 border-b border-gray-200">
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
              <ClipboardDocumentListIcon class="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <p class="font-mono text-xs text-gray-400">Order #{{ order.uuid?.slice(0, 8).toUpperCase() }}</p>
              <p class="text-sm font-semibold text-gray-900">{{ formatDate(order.created_at) }}</p>
            </div>
          </div>
          <div class="flex items-center gap-4">
            <span class="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
              Completed
            </span>
            <p class="font-bold text-gray-900 text-lg">${{ Number(order.total_amount).toFixed(2) }}</p>
            <button @click="toggleExpand(order.uuid)" class="text-indigo-600 hover:text-indigo-800 text-sm font-semibold transition">
              {{ expanded === order.uuid ? 'Hide' : 'View Receipt' }}
            </button>
          </div>
        </div>

        <!-- Order items (expandable receipt) -->
        <div v-if="expanded === order.uuid" class="px-6 py-5">
          <p class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Items</p>
          <div class="space-y-3">
            <div
              v-for="(item, idx) in order.items"
              :key="item.product_uuid ?? idx"
              class="flex items-center justify-between gap-4 py-2 border-b border-gray-100 last:border-0"
            >
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0">
                  <CubeIcon class="w-4 h-4 text-indigo-300" />
                </div>
                <div>
                  <p class="text-sm font-semibold text-gray-900">{{ item.product_name }}</p>
                  <p class="text-xs text-gray-400">qty {{ item.quantity }} × ${{ Number(item.unit_price).toFixed(2) }}</p>
                </div>
              </div>
              <p class="font-bold text-gray-900 text-sm">${{ Number(item.subtotal).toFixed(2) }}</p>
            </div>
          </div>

          <!-- Total row -->
          <div class="mt-4 flex justify-between items-center pt-3 border-t border-gray-200">
            <span class="font-bold text-gray-700">Total Paid</span>
            <span class="text-xl font-bold text-indigo-600">${{ Number(order.total_amount).toFixed(2) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'customer', middleware: 'auth' });

import { ref, onMounted } from 'vue';
import { ClipboardDocumentListIcon, CubeIcon } from '@heroicons/vue/24/outline';
import { orderService } from '~/api/order/OrderService';

const orders = ref<any[]>([]);
const loading = ref(false);
const expanded = ref<string | null>(null);

const fetchOrders = async () => {
  loading.value = true;
  try {
    const res = await orderService.myOrders();
    orders.value = res?.data || res || [];
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
};

const toggleExpand = (uuid: string) => {
  expanded.value = expanded.value === uuid ? null : uuid;
};

const formatDate = (d: string) => {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
};

onMounted(fetchOrders);
</script>
