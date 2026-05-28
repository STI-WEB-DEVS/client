<template>
  <div class="p-0 bg-gray-50 min-h-screen">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Orders</h1>
          <p class="text-sm text-gray-500 mt-1">All customer orders across the platform.</p>
        </div>
        <span class="text-sm text-gray-400">{{ orders.length }} total</span>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="flex justify-center py-20">
        <div class="animate-spin rounded-full h-10 w-10 border-4 border-green-200 border-t-green-600"></div>
      </div>

      <!-- Table -->
      <div v-else class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table class="w-full text-left">
          <thead class="bg-gray-50 border-b border-gray-200">
            <tr>
              <th class="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Order ID</th>
              <th class="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Customer</th>
              <th class="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Items</th>
              <th class="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Total</th>
              <th class="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
              <th class="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-for="order in orders" :key="order.uuid" class="hover:bg-gray-50 transition">
              <td class="px-6 py-4 font-mono text-xs text-gray-500">{{ order.uuid?.slice(0, 8) }}…</td>
              <td class="px-6 py-4">
                <div class="font-medium text-gray-900">{{ order.customer?.name ?? '—' }}</div>
                <div class="text-xs text-gray-400">{{ order.customer?.email ?? '' }}</div>
              </td>
              <td class="px-6 py-4 text-gray-700">{{ order.items?.length ?? 0 }} item(s)</td>
              <td class="px-6 py-4 font-semibold text-gray-900">${{ Number(order.total_amount).toFixed(2) }}</td>
              <td class="px-6 py-4 text-sm text-gray-500">{{ formatDate(order.created_at) }}</td>
              <td class="px-6 py-4 text-right">
                <button @click="viewOrder(order)" class="text-indigo-600 hover:text-indigo-900 font-semibold text-sm">View</button>
              </td>
            </tr>
            <tr v-if="orders.length === 0">
              <td colspan="6" class="px-6 py-16 text-center text-gray-400">No orders yet.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Order Detail Modal -->
    <div v-if="selectedOrder" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" @click.self="selectedOrder = null">
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <!-- Receipt Header -->
        <div class="bg-green-600 px-6 py-5 rounded-t-2xl text-white">
          <div class="flex justify-between items-start">
            <div>
              <p class="text-xs font-semibold text-green-200 uppercase tracking-wider">Order Receipt</p>
              <p class="text-lg font-bold mt-1">{{ selectedOrder.customer?.name }}</p>
              <p class="text-sm text-green-200">{{ selectedOrder.customer?.email }}</p>
            </div>
            <button @click="selectedOrder = null" class="text-green-200 hover:text-white text-xl font-light">✕</button>
          </div>
          <div class="mt-3 pt-3 border-t border-green-500 flex justify-between text-sm">
            <span class="text-green-200">Order ID: <span class="font-mono text-white">{{ selectedOrder.uuid?.slice(0, 8) }}…</span></span>
            <span class="text-green-200">{{ formatDate(selectedOrder.created_at) }}</span>
          </div>
        </div>

        <!-- Items -->
        <div class="px-6 py-4">
          <p class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Items</p>
          <div class="space-y-3">
            <div v-for="item in selectedOrder.items" :key="item.product_uuid" class="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
              <div>
                <p class="font-medium text-gray-900">{{ item.product_name }}</p>
                <p class="text-xs text-gray-400">qty {{ item.quantity }} × ${{ Number(item.unit_price).toFixed(2) }}</p>
              </div>
              <p class="font-semibold text-gray-900">${{ Number(item.subtotal).toFixed(2) }}</p>
            </div>
          </div>
        </div>

        <!-- Total -->
        <div class="px-6 py-4 bg-gray-50 rounded-b-2xl flex justify-between items-center">
          <span class="font-bold text-gray-700">Total</span>
          <span class="text-2xl font-bold text-green-600">${{ Number(selectedOrder.total_amount).toFixed(2) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { orderService } from '~/api/order/OrderService';

definePageMeta({ middleware: 'auth' });

const orders = ref<any[]>([]);
const loading = ref(false);
const selectedOrder = ref<any | null>(null);

const fetchOrders = async () => {
  loading.value = true;
  try {
    const res = await orderService.list();
    orders.value = res?.data || res || [];
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
};

const viewOrder = (order: any) => {
  selectedOrder.value = order;
};

const formatDate = (d: string) => {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

onMounted(fetchOrders);
</script>
