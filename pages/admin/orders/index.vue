<template>
  <div class="space-y-6">
    <NuxtLink
      to="/admin/dashboard"
      class="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
    >
      <ArrowLeftIcon class="h-4 w-4" />
      Back to Dashboard
    </NuxtLink>

    <Heading
      title="Orders"
      description="Manage and track all customer orders."
    />


    <div v-if="pending" class="flex justify-center py-16">
      <div
        class="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900"
      ></div>
    </div>

    <div
      v-else-if="error"
      class="rounded-xl border border-red-200 bg-red-50 p-4"
    >
      <p class="text-sm text-red-700">{{ error.message }}</p>
    </div>

    <Table
      v-else
      :columns="tableColumns"
      :rows="orders?.data || []"
      empty-message="No orders found."
    >
      <template #cell(order_id)="{ value }">
        <span class="font-medium text-gray-900">#ORD-{{ value }}</span>
      </template>

      <template #cell(total_amount)="{ value }">
        {{ formatCurrency(value) }}
      </template>

      <template #cell(created_at)="{ value }">
        {{ formatDate(value) }}
      </template>

      <template #cell(actions)="{ row: order }">
        <div class="flex items-center justify-end gap-2">
          <button
            type="button"
            @click="handleView(order)"
            class="inline-flex items-center gap-2 rounded-md border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <EyeIcon class="h-4 w-4" />
            <span>View</span>
          </button>
        </div>
      </template>

      <template #footer>
        <p class="text-sm text-gray-500">
          Showing
          <span class="font-medium text-gray-900">{{
            orders?.meta?.from ?? 0
          }}</span>
          to
          <span class="font-medium text-gray-900">{{
            orders?.meta?.to ?? 0
          }}</span>
          of
          <span class="font-medium text-gray-900">{{
            orders?.meta?.total ?? 0
          }}</span>
          orders
        </p>
        
        <!-- Pagination -->
        <div class="flex items-center gap-2">
          <button
            :disabled="!orders?.links?.prev"
            @click="loadOrders(orders?.meta?.current_page - 1)"
            class="rounded-md border border-gray-200 px-3 py-1 text-sm disabled:opacity-50"
          >
            Previous
          </button>
          <button
            :disabled="!orders?.links?.next"
            @click="loadOrders(orders?.meta?.current_page + 1)"
            class="rounded-md border border-gray-200 px-3 py-1 text-sm disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </template>
    </Table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { EyeIcon, ArrowLeftIcon } from "@heroicons/vue/24/outline";
import { orderService } from "~/api/order/OrderService";


const tableColumns = [
  { key: "order_id", label: "Order ID" },
  { key: "customer_name", label: "Customer" },
  { key: "total_amount", label: "Amount", align: "right" as const },
  { key: "created_at", label: "Date" },
  { key: "actions", label: "Actions", align: "right" as const },
];

const orders = ref<any>(null);
const pending = ref(true);
const error = ref<any>(null);

const loadOrders = async (page = 1) => {
  pending.value = true;
  error.value = null;
  try {
    orders.value = await orderService.list({ page });
  } catch (err: any) {
    error.value = err;
  } finally {
    pending.value = false;
  }
};

onMounted(() => loadOrders());

const handleView = (order: any) => {
  // Navigation to order details
  console.log("View order:", order.uuid);
};

const formatCurrency = (value: number | string) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Number(value));
};

const formatDate = (dateString: string) => {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
</script>
