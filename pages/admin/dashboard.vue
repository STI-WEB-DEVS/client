<template>
  <div class="space-y-8">
    <div class="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <h1 class="text-3xl font-semibold text-gray-900">Admin Dashboard</h1>
        <p class="mt-2 text-sm text-gray-600">Sales overview and order analytics for your store.</p>
      </div>

      <div class="grid gap-3 sm:grid-cols-3">
        <div>
          <label class="block text-sm font-medium text-gray-700">From</label>
          <input
            type="date"
            v-model="filters.from_date"
            class="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">To</label>
          <input
            type="date"
            v-model="filters.to_date"
            class="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        <div class="flex items-end gap-2">
          <button
            @click="loadSummary"
            :disabled="loading"
            class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {{ loading ? 'Refreshing...' : 'Refresh' }}
          </button>
          <button
            @click="resetFilters"
            type="button"
            class="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50"
          >
            Reset
          </button>
        </div>
      </div>
    </div>

    <div v-if="error" class="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
      {{ error }}
    </div>

    <div v-if="loading" class="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center text-sm text-gray-500">
      Loading order analytics...
    </div>

    <div v-else class="space-y-6">
      <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <p class="text-sm font-medium text-gray-500">Total Orders</p>
          <p class="mt-4 text-3xl font-semibold text-gray-900">{{ summary?.total_orders ?? 0 }}</p>
        </div>
        <div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <p class="text-sm font-medium text-gray-500">Total Revenue</p>
          <p class="mt-4 text-3xl font-semibold text-gray-900">₱{{ summary?.total_revenue ?? '0.00' }}</p>
        </div>
        <div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <p class="text-sm font-medium text-gray-500">Average Order Value</p>
          <p class="mt-4 text-3xl font-semibold text-gray-900">₱{{ summary?.average_order_value ?? '0.00' }}</p>
        </div>
        <div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <p class="text-sm font-medium text-gray-500">Unique Customers</p>
          <p class="mt-4 text-3xl font-semibold text-gray-900">{{ summary?.unique_customers ?? 0 }}</p>
        </div>
      </div>

      <div class="grid gap-4 xl:grid-cols-2">
        <section class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div class="mb-4 flex items-center justify-between gap-4">
            <div>
              <h2 class="text-lg font-semibold text-gray-900">Top 5 Products</h2>
              <p class="mt-1 text-sm text-gray-500">Best-selling items by quantity.</p>
            </div>
          </div>

          <div class="overflow-hidden rounded-2xl border border-gray-100">
            <table class="min-w-full divide-y divide-gray-200 text-sm">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-4 py-3 text-left font-semibold text-gray-900">Product</th>
                  <th class="px-4 py-3 text-left font-semibold text-gray-900">Quantity Sold</th>
                  <th class="px-4 py-3 text-left font-semibold text-gray-900">Revenue</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100 bg-white">
                <tr v-for="product in summary?.top_products || []" :key="product.id">
                  <td class="px-4 py-4 text-gray-700">{{ product.name }}</td>
                  <td class="px-4 py-4 text-gray-700">{{ product.total_quantity }}</td>
                  <td class="px-4 py-4 text-gray-700">₱{{ formatCurrency(product.total_revenue) }}</td>
                </tr>
                <tr v-if="!(summary?.top_products?.length)">
                  <td colspan="3" class="px-4 py-4 text-sm text-gray-500">No product sales found for this range.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div class="mb-4">
            <h2 class="text-lg font-semibold text-gray-900">Orders by Day</h2>
            <p class="mt-1 text-sm text-gray-500">Daily order count and revenue.</p>
          </div>

          <div class="overflow-hidden rounded-2xl border border-gray-100">
            <table class="min-w-full divide-y divide-gray-200 text-sm">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-4 py-3 text-left font-semibold text-gray-900">Date</th>
                  <th class="px-4 py-3 text-left font-semibold text-gray-900">Orders</th>
                  <th class="px-4 py-3 text-left font-semibold text-gray-900">Revenue</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100 bg-white">
                <tr v-for="day in summary?.orders_by_day || []" :key="day.day">
                  <td class="px-4 py-4 text-gray-700">{{ day.day }}</td>
                  <td class="px-4 py-4 text-gray-700">{{ day.order_count }}</td>
                  <td class="px-4 py-4 text-gray-700">₱{{ formatCurrency(day.revenue) }}</td>
                </tr>
                <tr v-if="!(summary?.orders_by_day?.length)">
                  <td colspan="3" class="px-4 py-4 text-sm text-gray-500">No orders found for this range.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useOrderSummary } from '~/composables/useOrderSummary';

definePageMeta({
  middleware: 'auth',
});

const { summary, loading, error, filters, fetchSummary } = useOrderSummary();
const initialized = ref(false);

const loadSummary = async () => {
  const params: Record<string, string> = {};

  if (filters.from_date) {
    params.from_date = filters.from_date;
  }

  if (filters.to_date) {
    params.to_date = filters.to_date;
  }

  await fetchSummary(params);
};

const resetFilters = async () => {
  filters.from_date = '';
  filters.to_date = '';
  await loadSummary();
};

const formatCurrency = (value: number | string) => {
  const amount = Number(value ?? 0);
  return amount.toFixed(2);
};

onMounted(async () => {
  if (!initialized.value) {
    initialized.value = true;
    await loadSummary();
  }
});
</script>
