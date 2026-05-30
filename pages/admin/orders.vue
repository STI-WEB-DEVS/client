<template>
  <NuxtLayout>
    <div>
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-gray-900">Orders</h1>
        <p class="mt-1 text-sm text-gray-500">View all customer orders.</p>
      </div>

      <!-- Orders Table -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 class="text-sm font-semibold text-gray-900">Orders</h2>
          <span class="text-xs text-gray-400">{{ orders.length }} item(s)</span>
        </div>

        <div v-if="loading" class="p-8 text-center text-sm text-gray-400">Loading...</div>

        <div v-else-if="orders.length === 0" class="p-8 text-center text-sm text-gray-400">
          No orders yet.
        </div>

        <ul v-else class="divide-y divide-gray-50">
          <li v-for="order in orders" :key="order.uuid"
            class="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition">
            <div>
              <p class="text-sm font-semibold text-gray-900">Order #{{ order.id }}</p>
              <p class="text-xs text-gray-400 mt-0.5">{{ order.uuid }}</p>
              <p class="text-xs text-gray-400 mt-0.5">{{ new Date(order.created_at).toLocaleDateString('en-PH', { year: 'numeric', month: 'long', day: 'numeric' }) }}</p>
            </div>
            <div class="flex items-center gap-4">
              <span class="text-sm font-bold text-blue-700">₱{{ Number(order.total_amount).toLocaleString('en-PH', { minimumFractionDigits: 2 }) }}</span>
              <button @click="viewOrder(order)" class="text-xs text-gray-500 hover:text-gray-700">View</button>
              <button @click="deleteOrder(order.uuid)" class="text-xs text-red-500 hover:text-red-700">Delete</button>
            </div>
          </li>
        </ul>
      </div>

      <!-- View Modal -->
      <div v-if="viewModal" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div class="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-base font-bold text-gray-900">Order Details</h3>
            <button @click="viewModal = false" class="text-gray-400 hover:text-gray-600 text-lg">✕</button>
          </div>
          <div class="space-y-3">
            <div>
              <p class="text-xs text-gray-400">Order ID</p>
              <p class="text-sm font-semibold text-gray-900">#{{ selected?.id }}</p>
            </div>
            <div>
              <p class="text-xs text-gray-400">UUID</p>
              <p class="text-xs text-gray-400 break-all">{{ selected?.uuid }}</p>
            </div>
            <div>
              <p class="text-xs text-gray-400">Customer ID</p>
              <p class="text-sm text-gray-700">{{ selected?.customer_id }}</p>
            </div>
            <div>
              <p class="text-xs text-gray-400">Total Amount</p>
              <p class="text-lg font-bold text-blue-700">₱{{ Number(selected?.total_amount).toLocaleString('en-PH', { minimumFractionDigits: 2 }) }}</p>
            </div>
            <div>
              <p class="text-xs text-gray-400">Date</p>
              <p class="text-sm text-gray-700">{{ selected ? new Date(selected.created_at).toLocaleDateString('en-PH', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : '' }}</p>
            </div>
            <div v-if="selected?.order_items?.length">
              <p class="text-xs text-gray-400 mb-2">Items Ordered</p>
              <div class="bg-gray-50 rounded-xl p-3 space-y-2">
                <div v-for="(item, i) in selected.order_items" :key="i" class="flex justify-between text-sm">
                  <span class="text-gray-700">{{ item.product?.name || 'Product' }} <span class="text-gray-400">x{{ item.quantity }}</span></span>
                  <span class="font-semibold text-gray-900">₱{{ Number(item.unit_price * item.quantity).toLocaleString('en-PH', { minimumFractionDigits: 2 }) }}</span>
                </div>
              </div>
            </div>
          </div>
          <button @click="viewModal = false" class="w-full mt-6 py-2.5 rounded-xl text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200">Close</button>
        </div>
      </div>

    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const orders = ref<any[]>([]);
const loading = ref(true);
const viewModal = ref(false);
const selected = ref<any>(null);

const runtimeConfig = useRuntimeConfig();
const token = localStorage.getItem("_token");

const headers = {
  Authorization: `Bearer ${token}`,
  Accept: "application/json",
};

const fetchOrders = async () => {
  loading.value = true;
  try {
    const data = await $fetch<any>("orders", { baseURL: runtimeConfig.public.apiBaseURL, headers });
    orders.value = data.data || data;
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
};

const viewOrder = (order: any) => {
  selected.value = order;
  viewModal.value = true;
};

const deleteOrder = async (uuid: string) => {
  if (!confirm("Are you sure you want to delete this order?")) return;
  try {
    await $fetch(`orders/${uuid}`, {
      baseURL: runtimeConfig.public.apiBaseURL,
      method: "DELETE",
      headers,
    });
    await fetchOrders();
  } catch (e: any) {
    alert("Failed to delete order.");
  }
};

onMounted(fetchOrders);
</script>