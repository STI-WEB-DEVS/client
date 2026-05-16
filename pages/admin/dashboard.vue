<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { orderService } from "~/api/order/OrderService";

const from = ref<string | null>(null);
const to = ref<string | null>(null);
const loading = ref(false);
const error = ref<string | null>(null);

const summary = ref<any>({
  total_revenue: 0,
  total_customers: 0,
  top_products: [],
});

const fetchSummary = async () => {
  loading.value = true;
  error.value = null;
  try {
    const params: any = {};
    if (from.value) params.from = from.value;
    if (to.value) params.to = to.value;
    const res = await orderService.summary(params);
    summary.value = res;
  } catch (e: any) {
    console.error(e);
    error.value = e?.message || "Failed to load summary";
  } finally {
    loading.value = false;
  }
};

onMounted(() => fetchSummary());

watch([from, to], () => {
  fetchSummary();
});

const formatMoney = (value: number) => {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(value || 0);
};
</script>

<template>
  <div class="p-6">
    <div class="flex items-start justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold">Order Summary</h1>
        <p class="text-sm text-gray-500">
          All-time and date-filtered sales overview
        </p>
      </div>

      <div class="flex items-end gap-3">
        <div class="text-sm text-gray-600">
          <label class="block">From</label>
          <input
            v-model="from"
            type="date"
            class="border rounded px-3 py-2 w-40"
          />
        </div>
        <div class="text-sm text-gray-600">
          <label class="block">To</label>
          <input
            v-model="to"
            type="date"
            class="border rounded px-3 py-2 w-40"
          />
        </div>
        <button
          class="bg-indigo-600 text-white px-4 py-2 rounded"
          @click="fetchSummary"
          :disabled="loading"
        >
          Apply
        </button>
      </div>
    </div>

    <div v-if="error" class="text-red-600 mb-4">{{ error }}</div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="bg-white shadow-sm rounded-lg p-5 border-l-4 border-red-500">
        <div class="text-sm text-gray-500">Total Revenue</div>
        <div class="mt-2 text-2xl font-bold">
          {{ formatMoney(summary.total_revenue) }}
        </div>
      </div>
      <div
        class="bg-white shadow-sm rounded-lg p-5 border-l-4 border-green-500"
      >
        <div class="text-sm text-gray-500">Number of Customers</div>
        <div class="mt-2 text-2xl font-bold">{{ summary.total_customers }}</div>
      </div>
      <div class="bg-white shadow-sm rounded-lg p-5 border-l-4 border-blue-500">
        <div class="text-sm text-gray-500">Most Sold Product</div>
        <div class="mt-2 text-2xl font-bold">
          <span v-if="summary.top_products && summary.top_products.length">{{
            summary.top_products[0].name
          }}</span>
          <span v-else class="text-gray-400">—</span>
        </div>
        <div class="text-sm text-gray-500 mt-1">
          <span v-if="summary.top_products && summary.top_products.length"
            >{{ summary.top_products[0].total_sold }} sold</span
          >
        </div>
      </div>
    </div>

    <div class="bg-white shadow-sm rounded-lg p-5 border border-gray-100">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-semibold">Top 5 Most Purchased Products</h2>
      </div>

      <div v-if="summary.top_products && summary.top_products.length">
        <ol>
          <li
            v-for="(p, idx) in summary.top_products"
            :key="p.name"
            class="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0"
          >
            <div class="flex items-center gap-8">
              <div
                class="w-8 h-8 flex items-center justify-center bg-indigo-50 text-indigo-600 rounded"
              >
                {{ idx + 1 }}
              </div>
              <div>
                <div class="font-medium">{{ p.name }}</div>
              </div>
            </div>
            <div class="text-sm font-medium text-gray-700">
              {{ p.total_sold }} units
            </div>
          </li>
        </ol>
      </div>
      <div v-else class="text-gray-500">
        No products found for the selected range.
      </div>
    </div>

    <div v-if="loading" class="mt-4 text-sm text-gray-600">Loading...</div>
  </div>
</template>
