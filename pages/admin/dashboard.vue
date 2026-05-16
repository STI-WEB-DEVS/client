<template>
  <div class="space-y-6">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 class="text-2xl font-semibold tracking-tight text-gray-900">Order Summary</h1>
        <p class="mt-1 text-sm text-gray-500">
          Revenue, customer order counts, and top products within a selected date range.
        </p>
      </div>

      <div class="grid gap-3 sm:grid-flow-col sm:auto-cols-max">
        <div class="grid gap-2">
          <label class="text-sm font-medium text-gray-700">From:</label>
          <input
            type="date"
            v-model="from"
            class="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>
        <div class="grid gap-2">
          <label class="text-sm font-medium text-gray-700">To:</label>
          <input
            type="date"
            v-model="to"
            class="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>
        <!-- <button
          type="button"
          @click="loadSummary"
          :disabled="pending"
          class="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:opacity-60"
        >
          {{ pending ? 'Loading...' : 'Refresh' }}
        </button> -->
      </div>
    </div>

    <div v-if="!token" class="rounded-2xl border border-red-200 bg-red-50 p-6">
      <p class="text-sm font-semibold text-red-700">Unauthorized.</p>
      <p class="mt-1 text-sm text-red-600">Please login as admin to view the summary dashboard.</p>
    </div>

    <div v-else>
      <div v-if="error" class="rounded-2xl border border-red-200 bg-red-50 p-6">
        <p class="text-sm font-semibold text-red-700">Failed to load summary</p>
        <p class="mt-1 text-sm text-red-600">{{ error.message || 'Please try again.' }}</p>
      </div>

      <div v-else-if="pending" class="rounded-2xl border border-gray-200 bg-white p-8 text-center">
        <div class="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-gray-300 border-t-indigo-600"></div>
        <p class="mt-4 text-sm text-gray-600">Loading order summary...</p>
      </div>

      <div v-else class="grid gap-6">
        <div class="grid gap-4 lg:grid-cols-3">
          <div class="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <p class="text-sm font-medium text-gray-500">Revenue</p>
            <p class="mt-4 text-3xl font-semibold text-gray-900">{{ formatCurrency(summary?.total_amount ?? 0) }}</p>
          </div>

          <div class="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <p class="text-sm font-medium text-gray-500">Customers Ordered</p>
            <p class="mt-4 text-3xl font-semibold text-gray-900">{{ summary?.customer_count ?? 0 }}</p>
          </div>

          <div class="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <p class="text-sm font-medium text-gray-500">Date Range</p>
            <div class="mt-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
                <span>{{ summary?.range.from }}</span>
                <ArrowRightIcon class="h-5 w-5" />
                <span>{{ summary?.range.to }}</span>
            </div>
          </div>
        </div>

        <div class="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <div class="flex items-center justify-between gap-4">
            <div>
              <h2 class="text-lg font-semibold text-gray-900">Top 5 Purchased Products</h2>
              <p class="mt-1 text-sm text-gray-500">Based on total quantity sold in the selected range.</p>
            </div>
          </div>

          <div class="mt-6 overflow-hidden rounded-3xl border border-gray-100">
            <table class="min-w-full divide-y divide-gray-200 text-left text-sm">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 font-semibold text-gray-500">Product</th>
                  <th class="px-6 py-3 font-semibold text-gray-500">Quantity</th>
                  <th class="px-6 py-3 font-semibold text-gray-500">Revenue</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100 bg-white">
                <tr v-for="product in summary?.top_products ?? []" :key="product.product_uuid">
                  <td class="px-6 py-4 text-gray-700">{{ product.product_name }}</td>
                  <td class="px-6 py-4 text-gray-900">{{ product.total_quantity }}</td>
                  <td class="px-6 py-4 text-gray-900">{{ formatCurrency(product.total_revenue) }}</td>
                </tr>
                <tr v-if="!(summary?.top_products?.length ?? 0)">
                  <td colspan="3" class="px-6 py-10 text-center text-sm text-gray-500">No products ordered for this date range.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { summaryService } from '~/api/summary/SummaryService';
import type { SummaryData } from '~/api/summary/SummaryService';
import { ArrowRightIcon } from '@heroicons/vue/24/solid';

const summary = ref<SummaryData | null>(null);
const pending = ref(true);
const error = ref<any>(null);
const from = ref('');
const to = ref('');

const token = ref<string | null>(null);

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    maximumFractionDigits: 2,
  }).format(value ?? 0);
};

const loadSummary = async () => {
  if (!token.value) {
    pending.value = false;
    return;
  }

  pending.value = true;
  error.value = null;

  try {
    const params: { from?: string; to?: string } = {};
    if (from.value) params.from = from.value;
    if (to.value) params.to = to.value;

    const response = await summaryService.getSummary(params);
    summary.value = response.data;
  } catch (err: any) {
    error.value = err;
  } finally {
    pending.value = false;
  }
};

onMounted(() => {
  token.value = localStorage.getItem('_token');

  const today = new Date();
  const prior = new Date();
  prior.setDate(today.getDate() - 30);

  from.value = prior.toISOString().slice(0, 10);
  to.value = today.toISOString().slice(0, 10);

  loadSummary();
});
</script>
