<template>
  <div class="space-y-8">
    <div class="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
      <Heading
        title="Admin Dashboard"
        description="Welcome back! Here's a quick overview of your store's performance."
      />

      <!-- Date Filter -->
      <div class="flex items-center gap-2">
        <div class="flex flex-col gap-1">
          <label class="text-[10px] font-bold uppercase tracking-wider text-gray-400">From</label>
          <input
            v-model="dateRange.from"
            type="date"
            class="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
            @change="fetchDashboardData"
          />
        </div>
        <div class="flex flex-col gap-1">
          <label class="text-[10px] font-bold uppercase tracking-wider text-gray-400">To</label>
          <input
            v-model="dateRange.to"
            type="date"
            class="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
            @change="fetchDashboardData"
          />
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="pending" class="flex h-64 items-center justify-center">
      <div class="h-8 w-8 animate-spin rounded-full border-2 border-gray-900 border-t-transparent"></div>
    </div>

    <template v-else>
      <!-- Metrics Grid -->
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <DashboardCard
          title="Total Revenue"
          :value="formatPrice(stats.total_revenue)"
          :icon="BanknotesIcon"
        />
        <DashboardCard
          title="Total Customers"
          :value="stats.customer_count"
          :icon="UsersIcon"
        />
        <DashboardCard
          title="Total Orders"
          :value="stats.order_count"
          :icon="ShoppingBagIcon"
        />

      </div>

      <!-- Charts Section -->
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ProductChart :products="stats.top_products" />
        
        <!-- Recent Orders Section -->
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold text-gray-900">Recent Orders</h3>
            <NuxtLink to="/admin/orders" class="text-sm font-medium text-gray-600 hover:text-gray-900">View all</NuxtLink>
          </div>
          
          <Table :columns="orderColumns" :rows="formattedOrders">
            <template #cell(amount)="{ value }">
              {{ formatPrice(value) }}
            </template>
          </Table>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import {
  BanknotesIcon,
  UsersIcon,
  ShoppingBagIcon,
} from "@heroicons/vue/24/outline";
import { orderService } from "~/api/order/OrderService";

// Date Range State
const dateRange = ref({
  from: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
  to: new Date().toISOString().split('T')[0],
});

// Stats State
const stats = ref({
  total_revenue: 0,
  customer_count: 0,
  order_count: 0,
  top_products: [],
  recent_orders: [],
});

const pending = ref(false);

// Table Config
const orderColumns = [
  { key: "id", label: "Order ID", headerClass: "w-32" },
  { key: "customer", label: "Customer" },
  { key: "amount", label: "Amount", align: "right" as const, headerClass: "w-32" },
];

const formattedOrders = computed(() => {
  return stats.value.recent_orders.map((order: any) => ({
    id: `#ORD-${order.id}`,
    customer: order.customer?.name || "Unknown",
    amount: order.total_amount,
  }));
});

// Data Fetching
const fetchDashboardData = async () => {
  pending.value = true;
  try {
    const data = await orderService.summary({
      from: dateRange.value.from,
      to: dateRange.value.to,
    });
    stats.value = data.data || data;
  } catch (error) {
    console.error("Failed to fetch dashboard data:", error);
  } finally {
    pending.value = false;
  }
};

onMounted(() => {
  fetchDashboardData();
});


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