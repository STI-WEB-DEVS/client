<template>
  <div class="min-h-screen" style="background-color: #f5f0e8;">

    <!-- Header -->
    <div class="px-8 py-5 flex items-center justify-between" style="background-color: #1C3028;">
      <div class="flex items-center gap-4">
        <NuxtLink to="/customer/shop" class="flex items-center gap-2 text-sm font-semibold hover:opacity-80 transition-opacity" style="color: #C9A96E; font-family: sans-serif;">
          ← Back to Shop
        </NuxtLink>
      </div>
      <span style="font-family: Georgia, serif; font-size: 1.4rem; color: white; letter-spacing: 0.05em;">
        Servor<span style="color: #C9A96E;">a</span>
      </span>
      <div class="flex items-center gap-4" style="font-family: sans-serif;">
        <NuxtLink to="/customer/customers" class="text-xs opacity-60 hover:opacity-100 transition-opacity" style="color: white;">Customers</NuxtLink>
        <NuxtLink to="/product/products" class="text-xs opacity-60 hover:opacity-100 transition-opacity" style="color: white;">Products</NuxtLink>
      </div>
    </div>

    <div class="max-w-3xl mx-auto px-6 py-10 space-y-6">

      <!-- List -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-bold" style="color: #1C3028; font-family: Georgia, serif;">Orders</h2>
          <span class="text-xs text-gray-400" style="font-family: sans-serif;">{{ orders.length }} item(s)</span>
        </div>

        <div v-if="loading" class="text-sm text-gray-400 py-6 text-center" style="font-family: sans-serif;">Loading...</div>
        <div v-else-if="orders.length === 0" class="text-sm text-gray-400 py-6 text-center" style="font-family: sans-serif;">No orders yet.</div>

        <div v-else class="divide-y divide-gray-100">
          <div v-for="o in orders" :key="o.uuid" class="py-3.5 flex items-center justify-between">
            <div>
              <p class="font-semibold text-gray-800 text-sm" style="font-family: sans-serif;">Order #{{ o.uuid?.slice(0, 8) }}</p>
              <p class="text-xs text-gray-400 mt-0.5" style="font-family: sans-serif;">{{ o.created_at ? new Date(o.created_at).toLocaleDateString() : '' }}</p>
            </div>
            <div class="flex items-center gap-4">
              <p class="font-bold text-sm" style="color: #C9A96E; font-family: sans-serif;">₱{{ Number(o.total_amount).toFixed(2) }}</p>
              <button @click="viewOrder(o)" class="text-xs font-semibold hover:opacity-70 transition-opacity" style="color: #1C3028; font-family: sans-serif;">View</button>
              <button @click="deleteOrder(o.uuid)" class="text-xs font-semibold hover:opacity-70 transition-opacity" style="color: #EF4444; font-family: sans-serif;">Delete</button>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- View Modal -->
    <div v-if="viewing" class="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4">
      <div class="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
        <div class="flex items-center justify-between mb-5">
          <h3 class="font-bold text-lg" style="color: #1C3028; font-family: Georgia, serif;">Order Details</h3>
          <button @click="viewing = null" class="text-gray-300 hover:text-gray-500 text-2xl leading-none transition-colors">×</button>
        </div>
        <div class="space-y-4 text-sm" style="font-family: sans-serif;">
          <div>
            <p class="text-xs text-gray-400 uppercase tracking-widest mb-1">Order UUID</p>
            <p class="text-gray-500 text-xs break-all">{{ viewing.uuid }}</p>
          </div>
          <div>
            <p class="text-xs text-gray-400 uppercase tracking-widest mb-1">Total Amount</p>
            <p class="font-bold text-lg" style="color: #C9A96E;">₱{{ Number(viewing.total_amount).toFixed(2) }}</p>
          </div>
          <div>
            <p class="text-xs text-gray-400 uppercase tracking-widest mb-1">Date</p>
            <p class="font-semibold text-gray-800">{{ viewing.created_at ? new Date(viewing.created_at).toLocaleString() : 'N/A' }}</p>
          </div>
          <div v-if="viewing.order_items?.length">
            <p class="text-xs text-gray-400 uppercase tracking-widest mb-2">Items</p>
            <div class="space-y-1.5 bg-gray-50 rounded-xl p-3">
              <div v-for="item in viewing.order_items" :key="item.id" class="flex justify-between text-xs">
                <span class="text-gray-700">{{ item.product?.name ?? 'Product' }} × {{ item.quantity }}</span>
                <span class="font-semibold" style="color: #C9A96E;">₱{{ Number(item.unit_price).toFixed(2) }}</span>
              </div>
            </div>
          </div>
        </div>
        <button @click="viewing = null"
          class="w-full mt-6 py-2.5 rounded-xl text-sm font-semibold border border-gray-200 hover:bg-gray-50 transition-colors"
          style="font-family: sans-serif;">Close</button>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { orderService } from '~/api/order/OrderService';

const orders = ref<any[]>([]);
const loading = ref(true);
const viewing = ref<any>(null);

onMounted(async () => { await loadOrders(); });

async function loadOrders() {
  loading.value = true;
  try {
    const res = await orderService.list();
    orders.value = res.data ?? res;
  } catch (e: any) { console.error(e); }
  finally { loading.value = false; }
}

function viewOrder(o: any) { viewing.value = o; }

async function deleteOrder(uuid: string) {
  if (!confirm('Delete this order?')) return;
  try {
    await orderService.delete(uuid);
    await loadOrders();
  } catch (e: any) { alert(e?.message || 'Failed to delete.'); }
}
</script>