<script setup>
import { ref, onMounted, watch } from 'vue';
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import {
  CurrencyDollarIcon,
  UserGroupIcon,
  ShoppingBagIcon,
  CalendarDaysIcon,
  ArrowTrendingUpIcon,
  ChartBarIcon,
  SparklesIcon,
  FireIcon,
} from '@heroicons/vue/24/outline';
import BaseService from '~/api/BaseService';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

definePageMeta({
  layout: 'default'
});

const api = new BaseService();

// Summary data
const summaryData = ref(null);
const summaryLoading = ref(true);

// Chart data
const chartData = ref(null);
const chartLoading = ref(true);

// Date range
const dateFrom = ref('');
const dateTo = ref('');

// Current date for defaults
const today = new Date();
const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
dateFrom.value = firstDayOfMonth.toISOString().split('T')[0];
dateTo.value = today.toISOString().split('T')[0];

const fetchSummary = async () => {
  summaryLoading.value = true;
  try {
    const params = {};
    if (dateFrom.value) params.from = dateFrom.value;
    if (dateTo.value) params.to = dateTo.value;
    summaryData.value = await api.request('/summary', 'GET', params);
  } catch (err) {
    console.error('Failed to fetch summary:', err);
  } finally {
    summaryLoading.value = false;
  }
};

const fetchWeeklyChart = async () => {
  chartLoading.value = true;
  try {
    chartData.value = await api.request('/weekly-chart', 'GET');
  } catch (err) {
    console.error('Failed to fetch chart:', err);
  } finally {
    chartLoading.value = false;
  }
};

const applyDateFilter = () => {
  fetchSummary();
};

const resetDateFilter = () => {
  dateFrom.value = firstDayOfMonth.toISOString().split('T')[0];
  dateTo.value = today.toISOString().split('T')[0];
  fetchSummary();
};

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value || 0);
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        padding: 20,
        usePointStyle: true,
        pointStyle: 'rectRounded',
        font: { size: 12, weight: '500' },
        color: '#6b7280',
      },
    },
    title: { display: false },
    tooltip: {
      backgroundColor: 'rgba(17, 24, 39, 0.95)',
      titleColor: '#f9fafb',
      bodyColor: '#d1d5db',
      padding: 14,
      cornerRadius: 10,
      titleFont: { size: 13, weight: '600' },
      bodyFont: { size: 12 },
      boxPadding: 6,
      borderColor: 'rgba(99, 102, 241, 0.3)',
      borderWidth: 1,
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: {
        color: '#9ca3af',
        font: { size: 11, weight: '500' },
      },
      border: { display: false },
    },
    y: {
      beginAtZero: true,
      grid: {
        color: 'rgba(229, 231, 235, 0.5)',
        drawBorder: false,
      },
      ticks: {
        color: '#9ca3af',
        font: { size: 11 },
        stepSize: 1,
      },
      border: { display: false },
    },
  },
};

onMounted(() => {
  fetchSummary();
  fetchWeeklyChart();
});

// Rank badge colors
const rankColors = [
  'from-yellow-400 to-amber-500',
  'from-gray-300 to-gray-400',
  'from-amber-600 to-amber-700',
  'from-indigo-400 to-indigo-500',
  'from-purple-400 to-purple-500',
];

const rankEmojis = ['🥇', '🥈', '🥉', '4', '5'];
</script>

<template>
  <div class="min-h-screen">
    <!-- Page Header -->
    <div class="mb-8">
      <div class="flex items-center gap-3 mb-2">
        <div class="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-200">
          <ChartBarIcon class="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p class="text-sm text-gray-500">Analytics & Revenue Overview</p>
        </div>
      </div>
    </div>

    <!-- Date Range Filter -->
    <div class="mb-6 bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
      <div class="flex flex-wrap items-end gap-4">
        <div class="flex items-center gap-2 text-sm font-semibold text-gray-700">
          <CalendarDaysIcon class="w-5 h-5 text-indigo-500" />
          Date Range Filter
        </div>
        <div class="flex flex-wrap items-end gap-3 flex-1">
          <div class="flex flex-col gap-1">
            <label class="text-xs font-medium text-gray-500 uppercase tracking-wider">From</label>
            <input
              v-model="dateFrom"
              type="date"
              class="block rounded-xl border border-gray-300 px-4 py-2.5 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
            />
          </div>
          <div class="flex flex-col gap-1">
            <label class="text-xs font-medium text-gray-500 uppercase tracking-wider">To</label>
            <input
              v-model="dateTo"
              type="date"
              class="block rounded-xl border border-gray-300 px-4 py-2.5 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
            />
          </div>
          <button
            @click="applyDateFilter"
            class="rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200 hover:shadow-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 transform hover:-translate-y-0.5"
          >
            Apply Filter
          </button>
          <button
            @click="resetDateFilter"
            class="rounded-xl border-2 border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
          >
            Reset
          </button>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="summaryLoading" class="flex items-center justify-center py-20">
      <div class="text-center">
        <div class="relative inline-block">
          <div class="w-12 h-12 rounded-full border-4 border-gray-200 border-t-indigo-600 animate-spin"></div>
        </div>
        <p class="mt-3 text-sm text-gray-500 font-medium">Loading analytics...</p>
      </div>
    </div>

    <template v-else-if="summaryData">
      <!-- KPI Cards Row -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <!-- Revenue Card -->
        <div class="relative group overflow-hidden bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-700 rounded-2xl p-6 shadow-xl shadow-indigo-200/50 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-300/50 hover:-translate-y-1">
          <!-- Decorative elements -->
          <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-8 translate-x-8 group-hover:scale-110 transition-transform duration-500"></div>
          <div class="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-6 -translate-x-6"></div>

          <div class="relative">
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center gap-2">
                <div class="flex items-center justify-center w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm">
                  <CurrencyDollarIcon class="w-5 h-5 text-white" />
                </div>
                <span class="text-sm font-medium text-indigo-100">Total Revenue</span>
              </div>
              <ArrowTrendingUpIcon class="w-5 h-5 text-green-300" />
            </div>
            <p class="text-3xl font-extrabold text-white tracking-tight">
              {{ formatCurrency(summaryData.total_revenue) }}
            </p>
            <div class="mt-3 flex items-center gap-2">
              <span class="inline-flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                <SparklesIcon class="w-3 h-3" />
                {{ dateFrom }} — {{ dateTo }}
              </span>
            </div>
          </div>
        </div>

        <!-- Customers Card -->
        <div class="relative group overflow-hidden bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-700 rounded-2xl p-6 shadow-xl shadow-emerald-200/50 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-300/50 hover:-translate-y-1">
          <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-8 translate-x-8 group-hover:scale-110 transition-transform duration-500"></div>
          <div class="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-6 -translate-x-6"></div>

          <div class="relative">
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center gap-2">
                <div class="flex items-center justify-center w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm">
                  <UserGroupIcon class="w-5 h-5 text-white" />
                </div>
                <span class="text-sm font-medium text-emerald-100">Customers Ordered</span>
              </div>
              <UserGroupIcon class="w-5 h-5 text-emerald-200" />
            </div>
            <p class="text-3xl font-extrabold text-white tracking-tight">
              {{ summaryData.total_customers }}
            </p>
            <div class="mt-3 flex items-center gap-2">
              <span class="inline-flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                <SparklesIcon class="w-3 h-3" />
                Unique buyers in range
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <!-- Weekly Chart (Takes 2 cols) -->
        <div class="xl:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm p-6 transition-all hover:shadow-md">
          <div class="flex items-center justify-between mb-6">
            <div class="flex items-center gap-3">
              <div class="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-sky-100 to-blue-100">
                <ChartBarIcon class="w-5 h-5 text-sky-600" />
              </div>
              <div>
                <h2 class="text-lg font-bold text-gray-900">Products Sold This Week</h2>
                <p class="text-xs text-gray-500" v-if="chartData">{{ chartData.week_start }} — {{ chartData.week_end }}</p>
              </div>
            </div>
          </div>

          <div v-if="chartLoading" class="flex items-center justify-center h-72">
            <div class="w-8 h-8 rounded-full border-4 border-gray-200 border-t-sky-500 animate-spin"></div>
          </div>
          <div v-else-if="chartData && chartData.datasets.length > 0" class="h-72">
            <Bar :data="chartData" :options="chartOptions" />
          </div>
          <div v-else class="flex flex-col items-center justify-center h-72 text-gray-400">
            <ChartBarIcon class="w-12 h-12 mb-3" />
            <p class="text-sm font-medium">No sales data this week</p>
            <p class="text-xs mt-1">Orders placed this week will appear here</p>
          </div>
        </div>

        <!-- Top Products (Takes 1 col) -->
        <div class="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 transition-all hover:shadow-md">
          <div class="flex items-center gap-3 mb-6">
            <div class="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-amber-100 to-orange-100">
              <FireIcon class="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h2 class="text-lg font-bold text-gray-900">Top 5 Products</h2>
              <p class="text-xs text-gray-500">By total units sold</p>
            </div>
          </div>

          <div v-if="summaryData.top_products && summaryData.top_products.length > 0" class="space-y-3">
            <div
              v-for="(product, index) in summaryData.top_products"
              :key="index"
              class="group flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-all duration-200"
            >
              <!-- Rank Badge -->
              <div
                class="flex items-center justify-center w-9 h-9 rounded-xl text-white text-sm font-bold shadow-sm bg-gradient-to-br"
                :class="rankColors[index] || 'from-gray-400 to-gray-500'"
              >
                <span v-if="index < 3" class="text-base">{{ rankEmojis[index] }}</span>
                <span v-else>{{ index + 1 }}</span>
              </div>

              <!-- Product Info -->
              <div class="flex-1 min-w-0">
                <p class="text-sm font-semibold text-gray-900 truncate group-hover:text-indigo-600 transition-colors">
                  {{ product.name }}
                </p>
                <div class="mt-1 w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                  <div
                    class="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-700"
                    :style="{ width: `${Math.min((product.total_sold / (summaryData.top_products[0]?.total_sold || 1)) * 100, 100)}%` }"
                  ></div>
                </div>
              </div>

              <!-- Sold count -->
              <div class="text-right flex-shrink-0">
                <span class="inline-flex items-center gap-1 rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-bold text-indigo-700">
                  <ShoppingBagIcon class="w-3.5 h-3.5" />
                  {{ product.total_sold }}
                </span>
              </div>
            </div>
          </div>

          <div v-else class="flex flex-col items-center justify-center h-48 text-gray-400">
            <ShoppingBagIcon class="w-10 h-10 mb-2" />
            <p class="text-sm font-medium">No products sold</p>
            <p class="text-xs mt-1">In the selected range</p>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>