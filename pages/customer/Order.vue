<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { orderService } from '~/api/order/OrderService';

definePageMeta({
  layout: 'customer'
})

const orders = ref<any[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

const formatCurrency = (val: string | number) => {
    const num = Number(val) || 0;
    return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

onMounted(async () => {
    const customerUuid = localStorage.getItem('_customer_uuid');
    if (!customerUuid) {
        loading.value = false;
        return;
    }

    try {
        const response = await orderService.listByCustomer(customerUuid);
        orders.value = response.data || response;
    } catch (err) {
        console.error('Failed to load orders', err);
        error.value = "Failed to load your orders.";
    } finally {
        loading.value = false;
    }
});
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
    <div class="mb-8">
      <h1 class="text-3xl font-extrabold tracking-tight text-gray-900">My Orders</h1>
      <p class="mt-2 text-sm text-gray-500">Your past and current orders will appear here.</p>
    </div>

    <div v-if="loading" class="flex justify-center items-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>

    <div v-else-if="error" class="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
      <p class="text-red-700 font-medium">{{ error }}</p>
    </div>

    <!-- Empty state placeholder -->
    <div v-else-if="orders.length === 0" class="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-white py-20 text-center">
      <div class="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 mb-4">
        <svg class="h-8 w-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <p class="text-base font-semibold text-gray-700">No orders yet</p>
      <p class="mt-1 text-sm text-gray-400">Head to the shop and place your first order!</p>
      <NuxtLink
        to="/customer/shop"
        class="mt-5 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-indigo-700 shadow-md"
      >
        Go to Shop
      </NuxtLink>
    </div>

    <!-- Orders List -->
    <div v-else class="space-y-6">
      <div v-for="order in orders" :key="order.uuid" class="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div class="border-b border-gray-200 bg-gray-50 px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p class="text-xs font-semibold uppercase tracking-wider text-gray-500">Order ID</p>
            <p class="mt-1 text-sm font-mono font-bold text-gray-900">{{ order.uuid.split('-')[0] }}</p>
          </div>
          <div>
            <p class="text-xs font-semibold uppercase tracking-wider text-gray-500">Date Placed</p>
            <p class="mt-1 text-sm font-medium text-gray-900">{{ formatDate(order.created_at) }}</p>
          </div>
          <div class="sm:text-right">
            <p class="text-xs font-semibold uppercase tracking-wider text-gray-500">Total Amount</p>
            <p class="mt-1 text-lg font-extrabold text-gray-900">${{ formatCurrency(order.total_amount) }}</p>
          </div>
        </div>
        
        <div class="px-6 py-4">
          <h4 class="text-sm font-bold text-gray-900 mb-4">Items</h4>
          <ul class="divide-y divide-gray-100">
            <li v-for="item in order.items" :key="item.product_uuid" class="py-3 flex justify-between items-center">
              <div>
                <p class="text-sm font-semibold text-gray-800">{{ item.product_name }}</p>
                <p class="text-xs text-gray-500 mt-0.5">Qty: {{ item.quantity }} &times; ${{ formatCurrency(item.unit_price) }}</p>
              </div>
              <p class="text-sm font-bold text-gray-900">${{ formatCurrency(item.subtotal) }}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
