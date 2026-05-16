<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold mb-6">Dashboard</h1>

    <div class="bg-white p-4 rounded-lg shadow mb-6">
      <div class="flex flex-wrap gap-4 items-end">
        <div>
          <label class="block text-sm font-medium text-gray-700">From</label>
          <input type="date" v-model="filters.from" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring focus:ring-opacity-50 focus:ring-blue-300" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">To</label>
          <input type="date" v-model="filters.to" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring focus:ring-opacity-50 focus:ring-blue-300" />
        </div>
        <button @click="fetchSummary" class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 h-fit transition-colors">
          Apply Filter
        </button>
      </div>
    </div>

    <div v-if="loading" class="text-center py-10">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      <p class="mt-4 text-gray-500">Loading summary...</p>
    </div>
    
    <div v-else-if="summary" class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500">
          <h2 class="text-lg font-medium text-gray-500">Total Revenue</h2>
          <p class="text-4xl font-bold text-gray-900 mt-2">${{ formatCurrency(summary.revenue) }}</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow border-l-4 border-green-500">
          <h2 class="text-lg font-medium text-gray-500">Customers Ordered</h2>
          <p class="text-4xl font-bold text-gray-900 mt-2">{{ summary.customers_count }}</p>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 class="text-lg font-medium text-gray-900">Top 5 Most Purchased Products</h2>
        </div>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Quantity</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="product in summary.top_products" :key="product.name" class="hover:bg-gray-50 transition-colors">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ product.name }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {{ product.total_quantity }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${{ formatCurrency(product.total_revenue) }}</td>
              </tr>
              <tr v-if="!summary.top_products || summary.top_products.length === 0">
                  <td colspan="3" class="px-6 py-8 text-center text-sm text-gray-500">
                    No products found in this date range.
                  </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { orderService } from '~/api/order/OrderService';

const filters = ref({
  from: '',
  to: ''
});

const summary = ref<any>(null);
const loading = ref(false);

const formatCurrency = (val: string | number) => {
    const num = Number(val) || 0;
    return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const fetchSummary = async () => {
    if (!filters.value.from || !filters.value.to) return;
    
    loading.value = true;
    try {
        summary.value = await orderService.summary({
            from: filters.value.from,
            to: filters.value.to
        });
    } catch (error) {
        console.error('Failed to fetch summary', error);
        alert('Failed to fetch summary. Please check your dates and try again.');
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    // Set default dates to last 30 days
    const today = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(today.getDate() - 30);
    
    filters.value.to = today.toISOString().split('T')[0];
    filters.value.from = thirtyDaysAgo.toISOString().split('T')[0];
    
    fetchSummary();
});
</script>