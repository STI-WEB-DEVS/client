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
  // small debounce could be added; keep simple
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
    <h1 class="text-2xl font-bold mb-4">Order Summary</h1>

    <div class="flex gap-4 mb-4 items-end">
      <div>
        <label class="block text-sm text-gray-600">From</label>
        <input v-model="from" type="date" class="border rounded p-2" />
      </div>
      <div>
        <label class="block text-sm text-gray-600">To</label>
        <input v-model="to" type="date" class="border rounded p-2" />
      </div>
      <div>
        <button
          class="bg-indigo-600 text-white px-4 py-2 rounded"
          @click="fetchSummary"
          :disabled="loading"
        >
          Refresh
        </button>
      </div>
    </div>

    <div v-if="error" class="text-red-600 mb-4">{{ error }}</div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div class="p-4 border rounded">
        <div class="text-sm text-gray-600">Total Revenue</div>
        <div class="text-xl font-semibold">
          {{ formatMoney(summary.total_revenue) }}
        </div>
      </div>
      <div class="p-4 border rounded">
        <div class="text-sm text-gray-600">Total Customers</div>
        <div class="text-xl font-semibold">{{ summary.total_customers }}</div>
      </div>
      <div class="p-4 border rounded">
        <div class="text-sm text-gray-600">Top Products (by quantity)</div>
        <ul class="mt-2 space-y-1">
          <li
            v-for="p in summary.top_products"
            :key="p.name"
            class="flex justify-between"
          >
            <span>{{ p.name }}</span>
            <span class="font-mono">{{ p.total_sold }}</span>
          </li>
        </ul>
      </div>
    </div>

    <div v-if="loading">Loading...</div>
  </div>
</template>
