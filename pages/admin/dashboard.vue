<template>
  <div class="space-y-10 pb-10">
    <div
      class="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between"
    >
      <div>
        <h1 class="text-3xl font-black tracking-tight text-gray-900">
          Dashboard
        </h1>
        <p class="mt-1 text-sm font-medium text-gray-400">
          Detailed overview of your store's performance metrics.
        </p>
      </div>

      <!-- Date Filter -->
      <div
        class="flex items-center gap-3 rounded-2xl bg-white p-2 shadow-sm ring-1 ring-gray-100"
      >
        <div
          class="flex items-center gap-2 px-3 py-1.5 transition-colors hover:bg-gray-50 rounded-xl"
        >
          <label
            class="text-[10px] font-black uppercase tracking-widest text-gray-400"
            >From</label
          >
          <input
            v-model="dateRange.from"
            type="date"
            class="bg-transparent text-sm font-bold text-gray-900 focus:outline-none"
            @change="fetchDashboardData"
          />
        </div>
        <div class="h-6 w-px bg-gray-100"></div>
        <div
          class="flex items-center gap-2 px-3 py-1.5 transition-colors hover:bg-gray-50 rounded-xl"
        >
          <label
            class="text-[10px] font-black uppercase tracking-widest text-gray-400"
            >To</label
          >
          <input
            v-model="dateRange.to"
            type="date"
            class="bg-transparent text-sm font-bold text-gray-900 focus:outline-none"
            @change="fetchDashboardData"
          />
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="pending" class="flex h-96 items-center justify-center">
      <div class="relative h-12 w-12">
        <div
          class="absolute inset-0 animate-ping rounded-full bg-indigo-100"
        ></div>
        <div
          class="relative flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-gray-100"
        >
          <div
            class="h-6 w-6 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent"
          ></div>
        </div>
      </div>
    </div>

    <template v-else>
      <!-- Metrics Grid -->
      <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <DashboardCard
          title="Revenue"
          :value="formatPrice(stats.total_revenue)"
          :icon="BanknotesIcon"
        />
        <DashboardCard
          title="Customers"
          :value="stats.customer_count"
          :icon="UsersIcon"
        />
        <DashboardCard
          title="Orders"
          :value="stats.order_count"
          :icon="ShoppingBagIcon"
        />
      </div>

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <!-- Chart takes 2 columns -->
        <div class="lg:col-span-2">
          <ProductChart :products="stats.top_products" />
        </div>

        <!-- Recent Orders Section -->
        <div
          class="flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
        >
          <div class="mb-6 flex items-center justify-between">
            <h3 class="text-base font-bold text-gray-900">Recent Orders</h3>
            <NuxtLink
              to="/admin/orders"
              class="rounded-lg bg-gray-50 px-3 py-1 text-xs font-bold text-indigo-600 transition-colors hover:bg-indigo-50"
              >View all</NuxtLink
            >
          </div>

          <div class="flex-1 space-y-4">
            <div
              v-if="formattedOrders.length === 0"
              class="flex h-full flex-col items-center justify-center py-10 text-center"
            >
              <div class="rounded-full bg-gray-50 p-3">
                <ShoppingBagIcon class="h-6 w-6 text-gray-300" />
              </div>
              <p class="mt-2 text-sm font-medium text-gray-400">
                No recent orders
              </p>
            </div>
            <div v-else class="divide-y divide-gray-50">
              <div
                v-for="order in formattedOrders"
                :key="order.id"
                class="flex items-center justify-between py-3"
              >
                <div>
                  <p class="text-sm font-bold text-gray-900">{{ order.id }}</p>
                  <p class="text-xs font-medium text-gray-400">
                    {{ order.customer }}
                  </p>
                </div>
                <p class="text-sm font-black text-gray-900">
                  {{ formatPrice(order.amount) }}
                </p>
              </div>
            </div>
          </div>
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
  from: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
    .toISOString()
    .split("T")[0],
  to: new Date().toISOString().split("T")[0],
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
  {
    key: "amount",
    label: "Amount",
    align: "right" as const,
    headerClass: "w-32",
  },
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
