<template>
  <div class="min-h-screen bg-gray-100 p-4 sm:p-8">
    <!-- Header -->
    <div class="flex flex-wrap items-center justify-between gap-4 mb-8">
      <div>
        <h1
          class="text-3xl sm:text-4xl font-black tracking-tight text-gray-900 mb-1"
        >
          Dashboard
        </h1>
        <p
          class="text-xs font-semibold uppercase tracking-widest text-gray-400"
        >
          Order summary and Revenue insights
        </p>
      </div>

      <!-- Date Range Filter -->
      <div
        class="flex flex-wrap items-end gap-2 sm:gap-3 bg-white rounded-2xl shadow px-4 sm:px-5 py-3 sm:py-4 w-full sm:w-auto"
      >
        <div class="flex flex-col gap-1 flex-1 sm:flex-none">
          <label
            class="text-xs font-semibold uppercase tracking-widest text-gray-400"
            >From</label
          >
          <input
            type="date"
            v-model="dateFrom"
            :max="dateTo || undefined"
            class="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full"
          />
        </div>
        <span class="text-gray-300 pb-2">→</span>
        <div class="flex flex-col gap-1 flex-1 sm:flex-none">
          <label
            class="text-xs font-semibold uppercase tracking-widest text-gray-400"
            >To</label
          >
          <input
            type="date"
            v-model="dateTo"
            :min="dateFrom || undefined"
            class="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full"
          />
        </div>
        <button
          @click="fetchSummary"
          :disabled="!dateFrom || !dateTo || loading"
          class="bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg px-5 py-2 transition-colors flex items-center gap-2 whitespace-nowrap"
        >
          <svg
            v-if="loading"
            class="animate-spin w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            />
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8z"
            />
          </svg>
          <span>{{ loading ? "Loading..." : "Apply" }}</span>
        </button>
      </div>
    </div>

    <!-- Error Banner -->
    <div
      v-if="error"
      class="bg-red-50 border border-red-200 text-red-700 rounded-xl px-5 py-3 text-sm mb-6"
    >
      {{ error }}
    </div>

    <!-- Stat Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mb-6">
      <!-- Total Revenue -->
      <div
        class="bg-white rounded-2xl shadow p-5 sm:p-6 flex items-center gap-4 hover:-translate-y-1 transition-transform"
      >
        <div
          class="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center text-xl font-bold flex-shrink-0"
        >
          ₱
        </div>
        <div class="min-w-0">
          <p
            class="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1"
          >
            Total Revenue
          </p>
          <p
            class="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight truncate"
          >
            {{ formatCurrency(summary?.total_revenue ?? 0) }}
          </p>
        </div>
      </div>

      <!-- Customers Who Ordered -->
      <div
        class="bg-white rounded-2xl shadow p-5 sm:p-6 flex items-center gap-4 hover:-translate-y-1 transition-transform"
      >
        <div
          class="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0"
        >
          <svg
            class="w-5 h-5 sm:w-6 sm:h-6"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </div>
        <div class="min-w-0">
          <p
            class="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1"
          >
            No. of Customers Who Ordered
          </p>
          <p class="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            {{ summary?.customer_count ?? 0 }}
          </p>
        </div>
      </div>

      <!-- Most Sold Product -->
      <div
        class="bg-white rounded-2xl shadow p-5 sm:p-6 flex items-center gap-4 hover:-translate-y-1 transition-transform"
      >
        <div
          class="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-amber-100 text-amber-500 flex items-center justify-center flex-shrink-0"
        >
          <svg
            class="w-5 h-5 sm:w-6 sm:h-6"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
            <polyline points="17 6 23 6 23 12" />
          </svg>
        </div>
        <div class="min-w-0">
          <p
            class="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1"
          >
            Most Sold Product
          </p>
          <p
            class="text-base sm:text-lg font-black text-gray-900 tracking-tight truncate"
          >
            {{ summary?.top_products?.[0]?.product_name ?? "—" }}
          </p>
          <p
            v-if="summary?.top_products?.[0]"
            class="text-xs text-gray-400 mt-0.5"
          >
            {{ summary.top_products[0].total_purchased }} units sold
          </p>
        </div>
      </div>
    </div>

    <!-- Top 5 Most Purchased Products — Table Style -->
    <div class="bg-white rounded-2xl shadow overflow-hidden">
      <!-- Table Header -->
      <div class="px-5 sm:px-6 pt-5 sm:pt-6 pb-3 border-b border-gray-100">
        <h2 class="text-base font-bold text-gray-900">
          Top 5 Most Purchased Products
        </h2>
        <p class="text-xs text-gray-400 mt-0.5">
          {{
            summary?.date_range?.from
              ? `${summary.date_range.from} – ${summary.date_range.to}`
              : "All time"
          }}
        </p>
      </div>

      <!-- Empty State -->
      <div
        v-if="!summary || summary.top_products.length === 0"
        class="flex flex-col items-center justify-center py-16 text-gray-400"
      >
        <svg
          class="w-12 h-12 mb-3 opacity-25"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          viewBox="0 0 24 24"
        >
          <path
            d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
          />
        </svg>
        <p class="text-sm">No data for this period.</p>
      </div>

      <!-- Table -->
      <div v-else>
        <!-- Column Headers -->
        <div
          class="grid grid-cols-12 px-5 sm:px-6 py-3 border-b border-gray-100"
        >
          <span
            class="col-span-2 sm:col-span-1 text-xs font-semibold uppercase tracking-widest text-gray-400"
            >Rank</span
          >
          <span
            class="col-span-8 sm:col-span-9 text-xs font-semibold uppercase tracking-widest text-gray-400 pl-2"
            >Product</span
          >
          <span
            class="col-span-2 text-xs font-semibold uppercase tracking-widest text-gray-400 text-right"
            >Units Sold</span
          >
        </div>

        <!-- Rows -->
        <div
          v-for="(product, index) in summary.top_products"
          :key="index"
          class="grid grid-cols-12 items-center px-5 sm:px-6 py-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors"
        >
          <!-- Rank Badge -->
          <div class="col-span-2 sm:col-span-1 flex items-center">
            <span
              class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black"
              :class="
                index === 0
                  ? 'bg-amber-100 text-amber-500 ring-2 ring-amber-300'
                  : index === 1
                    ? 'bg-gray-100 ring ring-gray-300 text-gray-500'
                    : index === 2
                      ? 'bg-orange-100 text-orange-600 ring-2 ring-orange-300'
                      : 'bg-gray-50 text-gray-400'
              "
            >
              {{ index + 1 }}
            </span>
          </div>

          <!-- Product Name -->
          <div class="col-span-8 sm:col-span-9 pl-2">
            <span
              class="text-sm font-semibold truncate block"
              :class="index < 3 ? 'text-gray-900' : 'text-gray-600'"
            >
              {{ product.product_name }}
            </span>
          </div>

          <!-- Units Sold -->
          <div class="col-span-2 text-right">
            <span
              class="text-sm font-bold tabular-nums"
              :class="
                index === 0
                  ? 'text-indigo-500'
                  : index === 2
                    ? 'text-indigo-400'
                    : 'text-gray-700'
              "
            >
              {{ product.total_purchased }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { orderService } from "~/api/order/OrderService";

const dateFrom = ref("");
const dateTo = ref("");
const loading = ref(false);
const error = ref("");

const summary = ref<null | {
  total_revenue: number;
  customer_count: number;
  top_products: { product_name: string; total_purchased: number }[];
  date_range: { from: string | null; to: string | null };
}>(null);

const maxQty = computed(() =>
  summary.value
    ? Math.max(...summary.value.top_products.map((p) => p.total_purchased), 1)
    : 1,
);

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
  }).format(value);
}

async function fetchSummary() {
  if (!dateFrom.value || !dateTo.value) return;
  loading.value = true;
  error.value = "";
  try {
    summary.value = await orderService.summary({
      from: dateFrom.value,
      to: dateTo.value,
    });
  } catch (e: any) {
    error.value = e.message || "Failed to load summary.";
  } finally {
    loading.value = false;
  }
}

onMounted(async () => {
  loading.value = true;
  error.value = "";
  try {
    summary.value = await orderService.summary();
  } catch (e: any) {
    error.value = e.message || "Failed to load summary.";
  } finally {
    loading.value = false;
  }
});
</script>
