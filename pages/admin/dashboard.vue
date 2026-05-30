<template>
  <div class="space-y-6">
    <!-- HEADER -->
    <div
      class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
    >
      <div>
        <h1 class="text-xl font-semibold tracking-tight text-gray-900">
          Dashboard
        </h1>
        <p class="mt-1 text-sm text-gray-500">
          Order summary and revenue overview.
        </p>
      </div>

      <!-- DATE RANGE FILTER -->
      <div class="flex items-center gap-2 flex-wrap">
        <div class="flex items-center gap-2">
          <label class="text-sm text-gray-500 whitespace-nowrap">From</label>
          <input
            v-model="from"
            type="date"
            class="rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
        <div class="flex items-center gap-2">
          <label class="text-sm text-gray-500 whitespace-nowrap">To</label>
          <input
            v-model="to"
            type="date"
            class="rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
        <button
          @click="fetchSummary"
          :disabled="loading"
          class="rounded-lg bg-gray-900 px-4 py-1.5 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50 transition"
        >
          {{ loading ? "Loading..." : "Apply" }}
        </button>
        <button
          @click="clearFilter"
          class="rounded-lg border border-gray-300 px-4 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
        >
          Clear
        </button>
      </div>
    </div>

    <!-- ERROR -->
    <div v-if="error" class="rounded-xl border border-red-200 bg-red-50 p-4">
      <p class="text-sm text-red-700">{{ error }}</p>
    </div>

    <!-- LOADING SKELETON -->
    <div v-if="loading" class="grid grid-cols-1 gap-5 sm:grid-cols-3">
      <div
        v-for="n in 3"
        :key="n"
        class="h-28 animate-pulse rounded-2xl bg-gray-100"
      />
    </div>

    <!-- STAT CARDS -->
    <div v-else class="grid grid-cols-1 gap-5 sm:grid-cols-3">
      <!-- Total Revenue -->
      <div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <p class="text-xs font-semibold uppercase tracking-wider text-gray-400">
          Total Revenue
        </p>
        <p class="mt-2 text-3xl font-bold text-gray-900">
          ₱{{
            Number(summary.total_revenue ?? 0).toLocaleString("en-PH", {
              minimumFractionDigits: 2,
            })
          }}
        </p>
        <p class="mt-1 text-sm text-gray-500">All completed orders</p>
      </div>

      <!-- Total Customers -->
      <div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <p class="text-xs font-semibold uppercase tracking-wider text-gray-400">
          Customers Who Ordered
        </p>
        <p class="mt-2 text-3xl font-bold text-gray-900">
          {{ summary.total_customers ?? 0 }}
        </p>
        <p class="mt-1 text-sm text-gray-500">Unique customers</p>
      </div>

      <!-- Top Products Count -->
      <div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <p class="text-xs font-semibold uppercase tracking-wider text-gray-400">
          Top Product
        </p>
        <p class="mt-2 text-xl font-bold text-gray-900 truncate">
          {{ summary.top_products?.[0]?.name ?? "—" }}
        </p>
        <p class="mt-1 text-sm text-gray-500">
          {{ summary.top_products?.[0]?.total_qty ?? 0 }} units sold
        </p>
      </div>
    </div>

    <!-- TOP 5 PRODUCTS TABLE -->
    <div
      v-if="!loading"
      class="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
    >
      <div class="border-b border-gray-100 px-6 py-4">
        <h2 class="text-sm font-semibold text-gray-900">
          Top 5 Most Purchased Products
        </h2>
        <p class="mt-0.5 text-xs text-gray-500">
          {{ dateRangeLabel }}
        </p>
      </div>

      <div
        v-if="!summary.top_products?.length"
        class="px-6 py-12 text-center text-sm text-gray-400"
      >
        No orders found for the selected period.
      </div>

      <table v-else class="min-w-full divide-y divide-gray-100">
        <thead class="bg-gray-50">
          <tr>
            <th
              class="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500"
            >
              Rank
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500"
            >
              Product
            </th>
            <th
              class="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500"
            >
              Units Sold
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr
            v-for="(product, index) in summary.top_products"
            :key="index"
            class="transition hover:bg-gray-50"
          >
            <td class="px-6 py-4 text-sm font-medium text-gray-500">
              <span
                class="inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold"
                :class="rankClass(index)"
              >
                {{ index + 1 }}
              </span>
            </td>
            <td class="px-6 py-4 text-sm font-medium text-gray-900">
              {{ product.name }}
            </td>
            <td
              class="px-6 py-4 text-right text-sm font-semibold text-indigo-600"
            >
              {{ product.total_qty }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { orderService } from "~/api/orders/OrderService";

const from = ref("");
const to = ref("");
const loading = ref(true);
const error = ref("");

const summary = ref<{
  total_revenue: number;
  total_customers: number;
  top_products: { name: string; total_qty: number }[];
}>({
  total_revenue: 0,
  total_customers: 0,
  top_products: [],
});

const fetchSummary = async () => {
  loading.value = true;
  error.value = "";
  try {
    const params: Record<string, string> = {};
    if (from.value) params.from = from.value;
    if (to.value) params.to = to.value;

    summary.value = await orderService.summary(params);
  } catch (err: any) {
    error.value = err.message || "Failed to load summary.";
  } finally {
    loading.value = false;
  }
};

const clearFilter = () => {
  from.value = "";
  to.value = "";
  fetchSummary();
};

const dateRangeLabel = computed(() => {
  if (from.value && to.value) return `From ${from.value} to ${to.value}`;
  if (from.value) return `From ${from.value}`;
  if (to.value) return `Up to ${to.value}`;
  return "All time";
});

const rankClass = (index: number) => {
  if (index === 0) return "bg-yellow-100 text-yellow-700";
  if (index === 1) return "bg-gray-100 text-gray-600";
  if (index === 2) return "bg-orange-100 text-orange-600";
  return "bg-gray-50 text-gray-400";
};

onMounted(fetchSummary);
</script>
