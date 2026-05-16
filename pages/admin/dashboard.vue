<template>
  <div class="flex justify-between items-center">
    <h1 class="font-bold text-3xl">Dashboard</h1>

    <div class="flex items-center gap-4 bg-white p-3 rounded-2xl shadow-sm border border-gray-100">
      <div class="flex flex-col">
        <label class="text-[10px] font-bold text-gray-400 uppercase ml-1">From</label>
        <input v-model="filters.from" type="date" @change="fetchSummary"
          class="text-sm font-semibold text-gray-700 bg-transparent focus:outline-none border-none cursor-pointer" />
      </div>
      <div class="w-px h-8 bg-gray-100"></div>
      <div class="flex flex-col">
        <label class="text-[10px] font-bold text-gray-400 uppercase ml-1">To</label>
        <input v-model="filters.to" type="date" @change="fetchSummary"
          class="text-sm font-semibold text-gray-700 bg-transparent focus:outline-none border-none cursor-pointer" />
      </div>
    </div>
  </div>

  <div v-if="summary" class="mt-4 space-y-5 ">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">

      <div
        class=" lg:col-span-1 bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div class="flex justify-between items-start mb-4">
          <div>
            <p class="text-xs font-semibold text-gray-400 uppercase mb-1">Total Revenue</p>
            <h2 class="text-3xl font-bold text-gray-900">₱{{ Number(summary.total_revenue).toLocaleString() }}</h2>
          </div>
          <div class="p-2 bg-emerald-50 rounded-xl">
            <ChartPieIcon class="size-6 text-emerald-600" />
          </div>
        </div>
      </div>

      <div class="lg:col-span-2 bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex gap-8 items-stretch">


        <div class="flex-1 flex flex-col justify-between">
          <div>
            <p class="text-xs font-semibold text-gray-400 uppercase mb-4">Customers</p>
            <div class="flex items-center gap-4">
              <div class="size-14 bg-indigo-50 rounded-2xl flex items-center justify-center border border-indigo-100">
                <UserGroupIcon class="size-7 text-indigo-600" />
              </div>
              <div>
                <h3 class="text-3xl font-bold text-gray-900">{{ summary.total_customers }}</h3>
                <p class="text-xs text-gray-500 font-medium">Registered Users</p>
              </div>
            </div>
          </div>
        </div>

        <div class="w-px bg-gray-100 my-2"></div>

        <div class="flex-1 flex flex-col justify-between">
          <div>
            <p class="text-xs font-semibold text-gray-400 uppercase mb-4">Total Purchases</p>
            <div class="flex items-center gap-4">
              <div class="size-14 bg-rose-50 rounded-2xl flex items-center justify-center border border-rose-100">
                <ShoppingBagIcon class="size-7 text-rose-600" />
              </div>
              <div>
                <h3 class="text-3xl font-bold text-gray-900">{{ summary.total_orders }}</h3>
                <p class="text-xs text-gray-500 font-medium">Successful Orders</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div class="lg:col-span-1 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
        <h2 class="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
          Top 5 Products
        </h2>
        <ul class="space-y-1">
          <li v-for="(product, i) in summary.top_products" :key="product.name"
            class="group flex items-center gap-2 p-3 rounded-2xl hover:bg-gray-50 transition-all border border-transparent hover:border-gray-100">
            <div
              class="size-10 rounded-xl bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-400 group-hover:bg-white group-hover:text-indigo-600 transition-colors">
              {{ i + 1 }}
            </div>
            <div class="flex-1">
              <p class="text-sm font-semibold text-gray-800 group-hover:text-indigo-900">{{ product.name }}</p>
              <div class="flex items-center gap-2 mt-1">
                <div class="h-1 flex-1 bg-gray-100 rounded-full overflow-hidden">
                  <div class="h-full bg-indigo-500 rounded-full"
                    :style="{ width: `${(Number(product.total_sold) / Number(summary.top_products[0].total_sold)) * 100}%` }">
                  </div>
                </div>
                <span class="text-[10px] font-bold text-gray-400 uppercase">{{ Number(product.total_sold) }} sold</span>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div class="lg:col-span-2 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-lg font-bold text-gray-900 flex items-center gap-2">
            <ChartBarIcon class="size-5 text-indigo-500" />
            Weekly Performance
          </h2>
          <div class="flex gap-4">
            <div class="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase">
              <span class="size-2 rounded-full bg-indigo-500 animate-pulse"></span>
              Live Metrics
            </div>
          </div>
        </div>

        <div class="h-64 flex mt-9 flex-col relative pt-4">
          <div class="absolute inset-x-0 top-4 bottom-8 flex flex-col justify-between pointer-events-none">
            <div v-for="val in [5000, 3750, 2500, 1250, 0]" :key="val" class="flex items-center gap-4 w-full">
              <span class="text-[9px] font-bold text-gray-300 w-8">₱{{ val }}</span>
              <div class="flex-1 h-px bg-gray-50"></div>
            </div>
          </div>

          <div class="flex-1 ml-12 flex items-end gap-4 px-2 z-10">
            <div v-for="day in weekStats" :key="day.label"
              class="flex-1 rounded-t-xl transition-all duration-500 relative group cursor-pointer"
              :class="[day.amount > 0 ? 'bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.3)]' : 'bg-gray-100']"
              :style="{ height: `${Math.min((day.amount / 5000) * 100, 100)}%` }">

              <!-- Tooltip -->
              <div v-if="day.amount > 0"
                class="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] font-bold py-1.5 px-3 rounded-lg opacity-0 group-hover:opacity-100 whitespace-nowrap transition-all shadow-xl z-20 pointer-events-none">
                ₱{{ Number(day.amount).toLocaleString() }}
                <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
              </div>

              <div
                class="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-bold whitespace-nowrap uppercase tracking-tighter"
                :class="[day.amount > 0 ? 'text-indigo-600' : 'text-gray-300']">
                {{ day.label }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="mt-20 flex flex-col items-center justify-center space-y-4">
    <div class="size-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
    <p class="text-gray-400 font-semibold uppercase text-[10px]">Syncing Dashboard Data</p>
  </div>

</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { orderService } from '~/api/order/OrderService'

const summary = ref(null)
const filters = ref({
  from: '',
  to: ''
})

const weekStats = computed(() => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const stats = days.map(day => ({ label: day, amount: 0 }));

  if (summary.value && summary.value.sales_history) {
    summary.value.sales_history.forEach(h => {
      const date = new Date(h.date);
      // Use UTC to avoid timezone shifts if your server returns simple YYYY-MM-DD
      const dayIndex = new Date(h.date + 'T00:00:00').getDay();
      stats[dayIndex].amount += Number(h.amount);
    });
  }

  return stats;
});

const fetchSummary = async () => {
  try {
    summary.value = await orderService.getSummary(filters.value.from, filters.value.to)
  } catch (error) {
    console.error('Failed to fetch summary:', error)
  }
}

onMounted(() => {
  fetchSummary();
})

const mockSales = [
  { amount: 12000, date: '2026-05-10' },
  { amount: 19000, date: '2026-05-11' },
  { amount: 3000, date: '2026-05-12' },
  { amount: 5000, date: '2026-05-13' },
  { amount: 2000, date: '2026-05-14' },
  { amount: 3000, date: '2026-05-15' },
  { amount: 9000, date: '2026-05-16' },
];

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString(undefined, { weekday: 'short' });
}

const generatePath = (history) => {
  // Use mock data if history is empty or short to show the "mountain" look
  const data = (history && history.length > 2)
    ? history.map(h => Number(h.amount))
    : [30, 45, 35, 55, 40, 70, 50]; // Mock "mountain" peaks

  const points = data.map((val, i) => ({
    x: (i / (data.length - 1)) * 100,
    y: 35 - (val / Math.max(...data, 100)) * 30
  }));

  let d = `M ${points[0].x} ${points[0].y}`;

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i];
    const p1 = points[i + 1];
    // Smooth curves with tension
    const cp1x = p0.x + (p1.x - p0.x) * 0.5;
    d += ` C ${cp1x} ${p0.y}, ${cp1x} ${p1.y}, ${p1.x} ${p1.y}`;
  }

  // Close the path for fill
  d += ` L 100 40 L 0 40 Z`;
  return d;
}
import {
  Dialog,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import {
  Bars3Icon,
  BellIcon,
  CalendarIcon,
  ChartPieIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UserGroupIcon,
  ShoppingBagIcon,
  SparklesIcon,
  XMarkIcon,
} from '@heroicons/vue/24/outline'
import { ChevronDownIcon, MagnifyingGlassIcon, ArrowDownIcon } from '@heroicons/vue/20/solid'
import { useRoute } from 'vue-router'

const route = useRoute()

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: HomeIcon },
  { name: 'Customers', href: '/admin/customer', icon: UserGroupIcon },
  { name: 'Products', href: '/admin/products', icon: FolderIcon },
  // { name: 'Calendar', href: '#', icon: CalendarIcon },
  // { name: 'Documents', href: '#', icon: DocumentDuplicateIcon },
  // { name: 'Reports', href: '#', icon: ChartPieIcon },
]

const userNavigation = [
  { name: 'Your profile', href: '#' },
  { name: 'Sign out', href: '#' },
]

const sidebarOpen = ref(false)
</script>