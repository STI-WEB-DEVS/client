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
        {{ formatPrice(value) }}
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

    <!-- Order Details Modal -->
    <BaseModal
      :open="isModalOpen"
      title="Order Details"
      confirm-text="Close"
      @close="closeModal"
      @confirm="closeModal"
    >
      <div v-if="loadingDetail" class="flex justify-center py-8">
        <div class="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900"></div>
      </div>
      
      <div v-else-if="selectedOrder" class="space-y-6">
        <!-- Order Header Info -->
        <div class="grid grid-cols-2 gap-4 rounded-lg bg-gray-50 p-4">
          <div>
            <p class="text-[10px] font-bold uppercase tracking-wider text-gray-400">Order ID</p>
            <p class="text-sm font-semibold text-gray-900">#ORD-{{ selectedOrder.order_id }}</p>
          </div>
          <div>
            <p class="text-[10px] font-bold uppercase tracking-wider text-gray-400">Date</p>
            <p class="text-sm font-medium text-gray-900">{{ formatDate(selectedOrder.created_at) }}</p>
          </div>
          <div class="col-span-2">
            <p class="text-[10px] font-bold uppercase tracking-wider text-gray-400">Customer</p>
            <p class="text-sm font-medium text-gray-900">{{ selectedOrder.customer_name }}</p>
          </div>
        </div>

        <!-- Items Table -->
        <div class="space-y-2">
          <p class="text-xs font-bold uppercase tracking-wider text-gray-500">Order Items</p>
          <div class="overflow-hidden rounded-lg border border-gray-200">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-4 py-2 text-left text-[10px] font-bold uppercase tracking-wider text-gray-500">Product</th>
                  <th class="px-4 py-2 text-center text-[10px] font-bold uppercase tracking-wider text-gray-500">Qty</th>
                  <th class="px-4 py-2 text-right text-[10px] font-bold uppercase tracking-wider text-gray-500">Price</th>
                  <th class="px-4 py-2 text-right text-[10px] font-bold uppercase tracking-wider text-gray-500">Total</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-for="item in selectedOrder.order_items" :key="item.product_id">
                  <td class="whitespace-nowrap px-4 py-2 text-sm text-gray-900">{{ item.product_name }}</td>
                  <td class="whitespace-nowrap px-4 py-2 text-center text-sm text-gray-600">{{ item.quantity }}</td>
                  <td class="whitespace-nowrap px-4 py-2 text-right text-sm text-gray-600">{{ formatPrice(item.unit_price) }}</td>
                  <td class="whitespace-nowrap px-4 py-2 text-right text-sm font-medium text-gray-900">{{ formatPrice(item.total) }}</td>
                </tr>
              </tbody>
              <tfoot class="bg-gray-50">
                <tr>
                  <td colspan="3" class="px-4 py-2 text-right text-sm font-bold text-gray-900">Grand Total</td>
                  <td class="px-4 py-2 text-right text-sm font-bold text-gray-900">{{ formatPrice(selectedOrder.total_amount) }}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </BaseModal>
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

// Modal State
const isModalOpen = ref(false);
const loadingDetail = ref(false);
const selectedOrder = ref<any>(null);

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

const handleView = async (order: any) => {
  isModalOpen.value = true;
  loadingDetail.value = true;
  try {
    const response = await orderService.show(order.uuid);
    selectedOrder.value = response.data || response;
  } catch (err) {
    console.error("Failed to fetch order details:", err);
  } finally {
    loadingDetail.value = false;
  }
};

const closeModal = () => {
  isModalOpen.value = false;
  selectedOrder.value = null;
};

const { formatPrice } = useCurrency();

const formatDate = (dateString: string) => {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
</script>

