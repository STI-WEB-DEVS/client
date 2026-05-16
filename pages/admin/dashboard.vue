<template>
  <div v-if="isAdmin" class="space-y-6">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 class="text-xl font-semibold tracking-tight text-gray-900">Dashboard</h1>
        <p class="mt-1 text-sm text-gray-500">Order summary for the selected date range.</p>
      </div>

      <form class="grid gap-3 sm:grid-cols-[minmax(0,150px)_minmax(0,150px)_auto]" @submit.prevent="fetchSummary">
        <label class="block">
          <span class="text-xs font-medium uppercase tracking-wide text-gray-500">From</span>
          <input
            v-model="filters.from"
            type="date"
            class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
          />
        </label>

        <label class="block">
          <span class="text-xs font-medium uppercase tracking-wide text-gray-500">To</span>
          <input
            v-model="filters.to"
            type="date"
            class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
          />
        </label>

        <button
          type="submit"
          :disabled="pending"
          class="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-4 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60 sm:self-end"
        >
          {{ pending ? 'Loading' : 'Apply' }}
        </button>
      </form>
    </div>

    <div v-if="pending" class="flex justify-center py-16">
      <div class="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900"></div>
    </div>

    <div v-else-if="error" class="rounded-lg border border-red-200 bg-red-50 p-4">
      <p class="text-sm text-red-700">{{ error }}</p>
    </div>

    <div v-else class="space-y-6">
      <div class="grid gap-4 md:grid-cols-2">
        <section class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <p class="text-sm font-medium text-gray-500">Total Revenue</p>
          <p class="mt-3 text-3xl font-semibold tracking-tight text-gray-900">
            {{ formatCurrency(summary?.total_revenue || 0) }}
          </p>
        </section>

        <section class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <p class="text-sm font-medium text-gray-500">Customers Ordered</p>
          <p class="mt-3 text-3xl font-semibold tracking-tight text-gray-900">
            {{ summary?.customers_ordered || 0 }}
          </p>
        </section>
      </div>

      <section class="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        <div class="border-b border-gray-200 px-6 py-4">
          <h2 class="text-base font-semibold text-gray-900">Top 5 Most Purchased Products</h2>
        </div>

        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Product</th>
                <th class="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">Quantity</th>
                <th class="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">Revenue</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 bg-white">
              <tr v-for="product in summary?.top_products" :key="product.uuid" class="hover:bg-gray-50">
                <td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">{{ product.name }}</td>
                <td class="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-700">{{ product.total_quantity }}</td>
                <td class="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-700">
                  {{ formatCurrency(product.total_revenue || 0) }}
                </td>
              </tr>

              <tr v-if="!summary?.top_products?.length">
                <td colspan="3" class="px-6 py-10 text-center text-sm text-gray-500">
                  No orders found for this date range.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { orderService } from '~/api/order/OrderService';

const isAdmin = ref(false);
const pending = ref(false);
const error = ref('');
const summary = ref<any>(null);

const today = new Date();
const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

const toDateInputValue = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const filters = reactive({
  from: toDateInputValue(firstDayOfMonth),
  to: toDateInputValue(today),
});

const formatCurrency = (amount: number | string) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(Number(amount));

const fetchSummary = async () => {
  if (!isAdmin.value) return;

  pending.value = true;
  error.value = '';

  try {
    summary.value = await orderService.summary({
      from: filters.from,
      to: filters.to,
    });
  } catch (err: any) {
    error.value = err?.message || 'Failed to load order summary.';
  } finally {
    pending.value = false;
  }
};

onMounted(() => {
  isAdmin.value = localStorage.getItem('_role') === 'admin';
  fetchSummary();
});
</script>
