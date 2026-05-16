<template>
  <main class="min-h-screen bg-gray-50 p-6">
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900">Dashboard</h1>
      <p class="text-sm text-gray-500">Order summary report</p>
    </div>

    <section class="mb-6 grid gap-4 md:grid-cols-3">
      <div>
        <label class="text-sm font-medium text-gray-700">From</label>
        <input
          v-model="from"
          type="date"
          class="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
        />
      </div>

      <div>
        <label class="text-sm font-medium text-gray-700">To</label>
        <input
          v-model="to"
          type="date"
          class="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
        />
      </div>

      <button
        @click="fetchSummary"
        class="mt-6 rounded-md bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-500"
      >
        Filter
      </button>
    </section>

    <p v-if="error" class="mb-4 text-sm text-red-600">{{ error }}</p>

    <section class="grid gap-4 md:grid-cols-2">
      <div class="rounded-xl bg-white p-6 shadow">
        <p class="text-sm text-gray-500">Total Revenue</p>
        <h2 class="mt-2 text-3xl font-bold text-gray-900">
          ₱{{ Number(summary.total_revenue || 0).toLocaleString() }}
        </h2>
      </div>

      <div class="rounded-xl bg-white p-6 shadow">
        <p class="text-sm text-gray-500">Customers Ordered</p>
        <h2 class="mt-2 text-3xl font-bold text-gray-900">
          {{ summary.total_customers || 0 }}
        </h2>
      </div>
    </section>

    <section class="mt-6 rounded-xl bg-white p-6 shadow">
      <h2 class="mb-4 text-lg font-bold text-gray-900">
        Top 5 Purchased Products
      </h2>

      <table class="w-full text-left text-sm">
        <thead>
          <tr class="border-b text-gray-500">
            <th class="py-3">Product</th>
            <th class="py-3">Quantity Sold</th>
            <th class="py-3">Revenue</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="product in summary.top_products"
            :key="product.product_id"
            class="border-b"
          >
            <td class="py-3 font-medium text-gray-900">
              {{ product.product_name }}
            </td>
            <td class="py-3">
              {{ product.total_quantity }}
            </td>
            <td class="py-3">
              ₱{{ Number(product.total_revenue || 0).toLocaleString() }}
            </td>
          </tr>

          <tr v-if="!summary.top_products?.length">
            <td colspan="3" class="py-6 text-center text-gray-500">
              No data found.
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { orderService } from '~/api/order/OrderService';

const from = ref('');
const to = ref('');
const error = ref('');

const summary = ref({
  total_revenue: 0,
  total_customers: 0,
  top_products: [],
});

const fetchSummary = async () => {
  error.value = '';

  try {
    summary.value = await orderService.summary({
      from: from.value,
      to: to.value,
    });
  } catch (err: any) {
    error.value = err?.message || 'Failed to load dashboard summary.';
  }
};

onMounted(() => {
  const today = new Date().toISOString().slice(0, 10);

  from.value = today;
  to.value = today;

  fetchSummary();
});
</script>