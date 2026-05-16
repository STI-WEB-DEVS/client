<template>
  <div class="p-8 bg-gray-50 min-h-screen">
    <!-- Header -->
    <div
      class="flex flex-col md:flex-row md:items-center md:justify-between border-b border-gray-200 pb-6 mb-8"
    >
      <div>
        <h1 class="text-3xl font-black text-gray-900 tracking-tight">
          Admin Dashboard
        </h1>
        <p class="text-sm text-gray-500 mt-1">
          Real-time database analytics metrics.
        </p>
      </div>

      <!-- Filters -->
      <div
        class="mt-4 md:mt-0 flex flex-wrap items-center gap-3 bg-white p-4 rounded-xl border border-gray-200 shadow-sm"
      >
        <div>
          <label
            class="block text-xs font-bold uppercase text-gray-400 mb-1"
          >
            Start Date
          </label>

          <input
            type="date"
            v-model="startDate"
            class="border border-gray-300 rounded-lg p-2 text-sm focus:outline-indigo-600"
          />
        </div>

        <div>
          <label
            class="block text-xs font-bold uppercase text-gray-400 mb-1"
          >
            End Date
          </label>

          <input
            type="date"
            v-model="endDate"
            class="border border-gray-300 rounded-lg p-2 text-sm focus:outline-indigo-600"
          />
        </div>

        <div class="pt-5">
          <button
            @click="fetchDashboardSummary"
            :disabled="isLoading"
            class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm px-5 py-2.5 rounded-lg transition-all shadow-sm disabled:bg-gray-400"
          >
            {{ isLoading ? 'Filtering...' : 'Filter' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div
      v-if="errorMessage"
      class="mb-6 bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-xl"
    >
      {{ errorMessage }}
    </div>

    <!-- Loading -->
    <div
      v-if="isLoading"
      class="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center text-gray-500"
    >
      Loading dashboard analytics...
    </div>

    <!-- Dashboard -->
    <div v-else>
      <!-- Metrics -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <!-- Revenue -->
        <div
          class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm"
        >
          <h3
            class="text-xs font-bold uppercase tracking-wider text-gray-400"
          >
            Total Amount / Revenue
          </h3>

          <p
            class="text-4xl font-black text-gray-900 mt-2 tracking-tight"
          >
            {{ formatCurrency(summaryData.metrics.total_revenue) }}
          </p>
        </div>

        <!-- Customers -->
        <div
          class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm"
        >
          <h3
            class="text-xs font-bold uppercase tracking-wider text-gray-400"
          >
            Number of Customers Who Ordered
          </h3>

          <p
            class="text-4xl font-black text-gray-900 mt-2 tracking-tight"
          >
            {{ summaryData.metrics.unique_customers }}

            <span class="text-lg font-medium text-gray-400">
              Unique Users
            </span>
          </p>
        </div>
      </div>

      <!-- Products Table -->
      <div
        class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
      >
        <div
          class="px-6 py-5 border-b border-gray-100 bg-gray-50/50"
        >
          <h3 class="font-bold text-gray-900 text-lg">
            Top 5 Most Purchased Products
          </h3>

          <p class="text-xs text-gray-500 mt-0.5">
            Sorted dynamically based on total units sold volumes.
          </p>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr
                class="border-b border-gray-200 bg-gray-50 text-xs font-bold uppercase text-gray-400 tracking-wider"
              >
                <th class="py-3 px-6">Product Catalog Name</th>

                <th class="py-3 px-6 text-center">
                  Quantity Sold
                </th>

                <th class="py-3 px-6 text-right">
                  Total Generated Revenue
                </th>
              </tr>
            </thead>

            <tbody class="divide-y divide-gray-100 text-sm">
              <tr
                v-for="(prod, index) in summaryData.top_products"
                :key="prod.uuid"
                class="hover:bg-gray-50/80 transition-colors"
              >
                <td
                  class="py-4 px-6 font-semibold text-gray-900 flex items-center gap-3"
                >
                  <span
                    class="w-6 h-6 flex items-center justify-center bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold"
                  >
                    {{ index + 1 }}
                  </span>

                  {{ prod.name }}
                </td>

                <td
                  class="py-4 px-6 text-center font-bold text-gray-600"
                >
                  {{ prod.total_quantity_sold }} units
                </td>

                <td
                  class="py-4 px-6 text-right font-black text-indigo-600"
                >
                  {{ formatCurrency(prod.total_earned) }}
                </td>
              </tr>

              <tr v-if="summaryData.top_products.length === 0">
                <td
                  colspan="3"
                  class="text-center py-12 text-gray-400 italic bg-gray-50/30"
                >
                  No purchase records found within this timeline window.
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
import { ref, onMounted } from 'vue'

definePageMeta({
  layout: 'default',
  role: 'admin'
})

/**
 * Default date range:
 * Last 30 days
 */
const today = new Date()

const thirtyDaysAgo = new Date()
thirtyDaysAgo.setDate(today.getDate() - 30)

const startDate = ref(
  thirtyDaysAgo.toISOString().split('T')[0]
)

const endDate = ref(
  today.toISOString().split('T')[0]
)

/**
 * Dashboard state
 */
const summaryData = ref({
  metrics: {
    total_revenue: 0,
    unique_customers: 0
  },
  top_products: []
})

const isLoading = ref(false)

const errorMessage = ref('')

/**
 * Currency formatter
 */
const formatCurrency = (value: number | string) => {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP'
  }).format(Number(value) || 0)
}

/**
 * Fetch dashboard summary analytics
 */
const fetchDashboardSummary = async () => {
  isLoading.value = true
  errorMessage.value = ''

  try {
    const token = localStorage.getItem('_token')

    const response: any = await $fetch(
      'http://127.0.0.1:8000/api/admin/order-summary',
      {
        method: 'GET',

        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        },

        params: {
          start_date: startDate.value,
          end_date: endDate.value
        }
      }
    )

    console.log('Dashboard API Response:', response)

    summaryData.value = {
      metrics: {
        total_revenue:
          response?.metrics?.total_revenue || 0,

        unique_customers:
          response?.metrics?.unique_customers || 0
      },

      top_products: response?.top_products || []
    }
  } catch (err: any) {
    console.error(
      'Dashboard reporting summary aggregate call failed:',
      err
    )

    errorMessage.value =
      'Could not load dashboard analytics.'
  } finally {
    isLoading.value = false
  }
}

/**
 * Initial page load
 */
onMounted(() => {
  fetchDashboardSummary()
})
</script>