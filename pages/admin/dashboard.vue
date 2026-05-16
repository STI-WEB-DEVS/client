<template>
  <div class="space-y-8">
    <!-- Header -->
    <div>
      <h1 class="text-2xl font-bold tracking-tight text-gray-900">Dashboard</h1>
      <p class="mt-1 text-sm text-gray-500">
        Order summary and analytics. Select a date range to generate a report.
      </p>
    </div>

    <!-- Date Range Filter -->
    <div class="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div class="border-b border-gray-100 bg-gray-50/50 px-6 py-4">
        <h2 class="text-sm font-semibold text-gray-700 uppercase tracking-wider">Date Range</h2>
      </div>
      <div class="px-6 py-5">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-end">
          <div class="flex-1">
            <label for="date-from" class="block text-sm font-medium text-gray-700 mb-1.5">From</label>
            <input
              id="date-from"
              v-model="dateFrom"
              type="date"
              class="block w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 shadow-sm transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
            />
          </div>
          <div class="flex-1">
            <label for="date-to" class="block text-sm font-medium text-gray-700 mb-1.5">To</label>
            <input
              id="date-to"
              v-model="dateTo"
              type="date"
              class="block w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 shadow-sm transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
            />
          </div>
          <div class="sm:flex-shrink-0">
            <button
              type="button"
              @click="fetchSummary"
              :disabled="!dateFrom || !dateTo || loading"
              class="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChartBarIcon class="h-4 w-4" />
              <span>{{ loading ? 'Generating...' : 'Generate' }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center py-16">
      <div class="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-indigo-600"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="rounded-xl border border-red-200 bg-red-50 p-4">
      <p class="text-sm text-red-700">{{ error }}</p>
    </div>

    <!-- Results -->
    <template v-else-if="summary">
      <!-- Stat Cards -->
      <div class="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <!-- Total Revenue -->
        <div class="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div class="px-6 py-5">
            <div class="flex items-center gap-4">
              <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50">
                <CurrencyDollarIcon class="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <p class="text-sm font-medium text-gray-500">Total Revenue</p>
                <p class="mt-0.5 text-2xl font-bold tracking-tight text-gray-900">
                  ₱{{ formatNumber(summary.total_revenue) }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Total Orders -->
        <div class="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div class="px-6 py-5">
            <div class="flex items-center gap-4">
              <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                <ClipboardDocumentListIcon class="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p class="text-sm font-medium text-gray-500">Total Orders</p>
                <p class="mt-0.5 text-2xl font-bold tracking-tight text-gray-900">
                  {{ summary.total_orders }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Customer Count -->
        <div class="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div class="px-6 py-5">
            <div class="flex items-center gap-4">
              <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50">
                <UserGroupIcon class="h-6 w-6 text-violet-600" />
              </div>
              <div>
                <p class="text-sm font-medium text-gray-500">Customers Who Ordered</p>
                <p class="mt-0.5 text-2xl font-bold tracking-tight text-gray-900">
                  {{ summary.customer_count }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Top 5 Products -->
      <div class="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div class="border-b border-gray-100 bg-gray-50/50 px-6 py-4">
          <h2 class="text-sm font-semibold text-gray-700 uppercase tracking-wider">Top 5 Most Purchased Products</h2>
        </div>
        <div v-if="summary.top_products && summary.top_products.length" class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Rank</th>
                <th class="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Product Name</th>
                <th class="px-6 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">Qty Sold</th>
                <th class="px-6 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">Revenue</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 bg-white">
              <tr v-for="(product, index) in summary.top_products" :key="product.product_uuid" class="transition hover:bg-gray-50">
                <td class="whitespace-nowrap px-6 py-4">
                  <span
                    class="inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold"
                    :class="{
                      'bg-yellow-100 text-yellow-700': index === 0,
                      'bg-gray-100 text-gray-600': index === 1,
                      'bg-orange-100 text-orange-600': index === 2,
                      'bg-gray-50 text-gray-500': index > 2,
                    }"
                  >
                    {{ index + 1 }}
                  </span>
                </td>
                <td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">{{ product.product_name }}</td>
                <td class="whitespace-nowrap px-6 py-4 text-right text-sm font-semibold text-gray-700">{{ product.total_quantity }}</td>
                <td class="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-700">₱{{ formatNumber(product.total_revenue) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else class="px-6 py-10 text-center text-sm text-gray-500">
          No product data in this date range.
        </div>
      </div>
    </template>

    <!-- Initial empty state -->
    <div v-else class="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-gray-50/50 py-16">
      <ChartBarIcon class="h-12 w-12 text-gray-300" />
      <h3 class="mt-4 text-sm font-semibold text-gray-700">No report generated yet</h3>
      <p class="mt-1 text-sm text-gray-500">Select a date range above and click <strong>Generate</strong> to view the summary.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  ChartBarIcon,
  CurrencyDollarIcon,
  ClipboardDocumentListIcon,
  UserGroupIcon,
} from '@heroicons/vue/24/outline';
import { orderService } from '~/api/order/OrderService';

const dateFrom = ref('');
const dateTo = ref('');
const loading = ref(false);
const error = ref<string | null>(null);
const summary = ref<any>(null);

const fetchSummary = async () => {
  if (!dateFrom.value || !dateTo.value) return;
  loading.value = true;
  error.value = null;
  summary.value = null;

  try {
    summary.value = await orderService.summary(dateFrom.value, dateTo.value);
  } catch (err: any) {
    error.value = err.message || 'Failed to load order summary.';
  } finally {
    loading.value = false;
  }
};

const formatNumber = (value: number | string): string => {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  return num.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const formatDate = (value: string): string => {
  if (!value) return '—';
  return new Date(value).toLocaleDateString('en-PH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};
</script>
