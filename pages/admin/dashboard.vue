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
          <label class="text-sm font-medium text-gray-700 flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
            From:
          </label>
          <input
            type="date"
            v-model="from"
            class="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>
        <div class="grid gap-2">
          <label class="text-sm font-medium text-gray-700 flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
            To:
          </label>
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

    <!-- UNAUTHORIZED ALERT -->
    <div v-if="!token" class="rounded-2xl border border-red-200 bg-red-50 p-6 flex items-start gap-4">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-red-600 mt-0.5"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
      <div>
        <p class="text-sm font-semibold text-red-700">Unauthorized.</p>
        <p class="mt-1 text-sm text-red-600">Please login as admin to view the summary dashboard.</p>
      </div>
    </div>

    <div v-else>
      <!-- ERROR ALERT -->
      <div v-if="error" class="rounded-2xl border border-red-200 bg-red-50 p-6 flex items-start gap-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-red-600 mt-0.5"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
        <div>
          <p class="text-sm font-semibold text-red-700">Failed to load summary</p>
          <p class="mt-1 text-sm text-red-600">{{ error.message || 'Please try again.' }}</p>
        </div>
      </div>

      <!-- PENDING LOADING -->
      <div v-else-if="pending" class="rounded-2xl border border-gray-200 bg-white p-8 text-center">
        <div class="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-gray-300 border-t-indigo-600"></div>
        <p class="mt-4 text-sm text-gray-600">Loading order summary...</p>
      </div>

      <div v-else class="grid gap-6">
        <div class="grid gap-4 lg:grid-cols-3">
          
          <!-- REVENUE METRIC -->
          <div class="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm flex flex-col justify-between">
            <div class="flex justify-between items-center">
              <p class="text-sm font-medium text-gray-500">Revenue</p>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-indigo-500"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            </div>
            <p class="mt-4 text-3xl font-semibold text-gray-900">{{ formatCurrency(summary?.total_amount ?? 0) }}</p>
          </div>

          <!-- CUSTOMERS METRIC -->
          <div class="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm flex flex-col justify-between">
            <div class="flex justify-between items-center">
              <p class="text-sm font-medium text-gray-500">Customers Ordered</p>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-emerald-500"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <p class="mt-4 text-3xl font-semibold text-gray-900">{{ summary?.customer_count ?? 0 }}</p>
          </div>

          <!-- DATE RANGE METRIC -->
          <div class="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm flex flex-col justify-between">
            <div class="flex justify-between items-center">
              <p class="text-sm font-medium text-gray-500">Date Range</p>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-amber-500"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
            </div>
            <div class="mt-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
                <span>{{ summary?.range.from }}</span>
                <ArrowRightIcon class="h-5 w-5 text-gray-400" />
                <span>{{ summary?.range.to }}</span>
            </div>
          </div>
        </div>

        <!-- PRODUCT TABLE SUMMARY -->
        <div class="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <div class="flex items-center justify-between gap-4">
            <div class="flex items-center gap-3">
              <div class="p-2 bg-indigo-50 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-indigo-600"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
              </div>
              <div>
                <h2 class="text-lg font-semibold text-gray-900">Top 5 Purchased Products</h2>
                <p class="mt-1 text-sm text-gray-500">Based on total quantity sold in the selected range.</p>
              </div>
            </div>
          </div>

          <div class="mt-6 overflow-hidden rounded-3xl border border-gray-100">
            <table class="min-w-full divide-y divide-gray-200 text-left text-sm">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 font-semibold text-gray-500 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/></svg>
                    Product
                  </th>
                  <th class="px-6 py-3 font-semibold text-gray-500">Quantity</th>
                  <th class="px-6 py-3 font-semibold text-gray-500">Revenue</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100 bg-white">
                <tr v-for="product in summary?.top_products ?? []" :key="product.product_uuid" class="hover:bg-gray-50/70 transition-colors">
                  <td class="px-6 py-4 text-gray-700 font-medium">{{ product.product_name }}</td>
                  <td class="px-6 py-4 text-gray-900">{{ product.total_quantity }}</td>
                  <td class="px-6 py-4 text-gray-900 font-medium">{{ formatCurrency(product.total_revenue) }}</td>
                </tr>
                <tr v-if="!(summary?.top_products?.length ?? 0)">
                  <td colspan="3" class="px-6 py-10 text-center text-sm text-gray-500">
                    <div class="flex flex-col items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-300"><circle cx="12" cy="12" r="10"/><line x1="8" x2="16" y1="12" y2="12"/></svg>
                      No products ordered for this date range.
                    </div>
                  </td>
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
