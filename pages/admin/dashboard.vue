<template>
  <div>
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900">Dashboard</h1>
      <p class="mt-1 text-sm text-gray-500">Welcome back, Admin. Here's what's happening.</p>
    </div>

    <!-- Stat cards -->
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4 mb-10">
      <div v-for="stat in stats" :key="stat.label" class="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        <div class="flex items-center justify-between mb-4">
          <p class="text-sm font-medium text-gray-500">{{ stat.label }}</p>
          <div :class="`w-10 h-10 rounded-xl flex items-center justify-center ${stat.bg}`">
            <component :is="stat.icon" :class="`w-5 h-5 ${stat.iconColor}`" />
          </div>
        </div>
        <div v-if="loading" class="h-8 w-16 bg-gray-100 animate-pulse rounded"></div>
        <p v-else class="text-3xl font-bold text-gray-900">{{ stat.value }}</p>
        <p class="mt-1 text-xs text-gray-400">{{ stat.sub }}</p>
      </div>
    </div>

    <!-- Recent Orders table -->
    <div class="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div class="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
        <h2 class="font-bold text-gray-900">Recent Orders</h2>
        <NuxtLink to="/admin/orders" class="text-sm text-green-600 font-semibold hover:underline">View all →</NuxtLink>
      </div>
      <table class="w-full text-left">
        <thead class="bg-gray-50 border-b border-gray-200">
          <tr>
            <th class="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Order</th>
            <th class="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Customer</th>
            <th class="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Items</th>
            <th class="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Total</th>
            <th class="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr v-if="loading">
            <td colspan="5" class="px-6 py-10 text-center">
              <div class="flex justify-center">
                <div class="animate-spin rounded-full h-8 w-8 border-4 border-green-200 border-t-green-600"></div>
              </div>
            </td>
          </tr>
          <tr v-else v-for="order in recentOrders" :key="order.uuid" class="hover:bg-gray-50 transition">
            <td class="px-6 py-4 font-mono text-xs text-gray-400">#{{ order.uuid?.slice(0, 8).toUpperCase() }}</td>
            <td class="px-6 py-4">
              <p class="font-semibold text-gray-900 text-sm">{{ order.customer?.name ?? '—' }}</p>
              <p class="text-xs text-gray-400">{{ order.customer?.email ?? '' }}</p>
            </td>
            <td class="px-6 py-4 text-sm text-gray-600">{{ order.items?.length ?? 0 }} item(s)</td>
            <td class="px-6 py-4 font-bold text-gray-900">${{ Number(order.total_amount).toFixed(2) }}</td>
            <td class="px-6 py-4 text-sm text-gray-500">{{ formatDate(order.created_at) }}</td>
          </tr>
          <tr v-if="!loading && recentOrders.length === 0">
            <td colspan="5" class="px-6 py-12 text-center text-gray-400">No orders yet.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' });

import { ref, computed, onMounted } from 'vue';
import {
  UsersIcon, ShoppingBagIcon, ClipboardDocumentListIcon, CurrencyDollarIcon,
} from '@heroicons/vue/24/outline';
import { customerService } from '~/api/customer/CustomerService';
import { productService } from '~/api/product/ProductService';
import { orderService } from '~/api/order/OrderService';

const loading = ref(true);
const customers = ref<any[]>([]);
const products  = ref<any[]>([]);
const orders    = ref<any[]>([]);

const recentOrders = computed(() => orders.value.slice(0, 5));
const totalRevenue = computed(() =>
  orders.value.reduce((s: number, o: any) => s + Number(o.total_amount || 0), 0).toFixed(2)
);

const stats = computed(() => [
  { label: 'Total Customers', value: customers.value.length, sub: 'Registered customers', icon: UsersIcon,                  bg: 'bg-blue-50',   iconColor: 'text-blue-500'   },
  { label: 'Products',        value: products.value.length,  sub: 'Active listings',      icon: ShoppingBagIcon,            bg: 'bg-purple-50', iconColor: 'text-purple-500' },
  { label: 'Orders',          value: orders.value.length,    sub: 'All time',             icon: ClipboardDocumentListIcon,  bg: 'bg-green-50',  iconColor: 'text-green-600'  },
  { label: 'Revenue',         value: `$${totalRevenue.value}`, sub: 'Total collected',    icon: CurrencyDollarIcon,         bg: 'bg-yellow-50', iconColor: 'text-yellow-500' },
]);

const fetchAll = async () => {
  loading.value = true;
  // Use allSettled so one failure doesn't blank the whole dashboard
  const [c, p, o] = await Promise.allSettled([
    customerService.list(),
    productService.list(),
    orderService.list(),
  ]);
  if (c.status === 'fulfilled') customers.value = c.value?.data || c.value || [];
  if (p.status === 'fulfilled') products.value  = p.value?.data || p.value || [];
  if (o.status === 'fulfilled') orders.value    = o.value?.data || o.value || [];
  loading.value = false;
};

const formatDate = (d: string) => {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

onMounted(fetchAll);
</script>
