<script setup>
import { ref, onMounted } from 'vue'
import { orderService } from '~/api/order/OrderService';

definePageMeta({
  layout: 'customer'
})

const orders = ref([])
const isLoading = ref(true)

onMounted(async () => {
  try {
    const response = await orderService.list();
    orders.value = response.data || response;
  } catch (error) {
    console.error('Failed to fetch orders:', error);
  } finally {
    isLoading.value = false;
  }
})
</script>

<template>
  <div class="max-w-full mx-auto">
    <PageHeader title="My Orders" description="View your order history and details." />

    <div v-if="isLoading" class="mt-8 py-20 text-center text-gray-400">
      Loading orders...
    </div>

    <div v-else-if="orders.length > 0" class="mt-8 space-y-6">
      <OrderCard v-for="order in orders" :key="order.uuid" :order="order" />
    </div>

    <div v-else class="mt-8 py-20 text-center bg-white rounded-2xl border border-dashed border-gray-300">
      <Icon name="heroicons:shopping-bag" size="48" class="mx-auto text-gray-300 mb-4" />
      <h2 class="text-xl font-bold text-gray-900">No orders yet.</h2>
      <p class="text-gray-500 mt-2">When you place an order, it will appear here.</p>
    </div>
  </div>
</template>
