<template>
  <div class="space-y-6">

    <!-- Header -->
    <div>
      <h1 class="text-xl font-semibold tracking-tight text-gray-900">Dashboard</h1>
      <p class="mt-1 text-sm text-gray-500">Order summary within a date range.</p>
    </div>

    <!-- Date Range Filter -->
    <div class="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-end">
        <div class="flex-1">
          <label class="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">From</label>
          <input
            v-model="from"
            type="date"
            class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 focus:border-gray-400 focus:outline-none"
          />
        </div>
        <div class="flex-1">
          <label class="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">To</label>
          <input
            v-model="to"
            type="date"
            class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 focus:border-gray-400 focus:outline-none"
          />
        </div>
        <button
          type="button"
          @click="fetchSummary"
          :disabled="pending"
          class="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-5 py-2 text-sm font-medium text-white transition hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <MagnifyingGlassIcon class="h-4 w-4" />
          <span>{{ pending ? 'Loading...' : 'Generate' }}</span>
        </button>
      </div>

      <!-- Validation error -->
      <p v-if="validationError" class="mt-2 text-xs text-red-600">{{ validationError }}</p>
    </div>

    <!-- API Error -->
    <div v-if="error" class="rounded-xl border border-red-200 bg-red-50 p-4">
      <p class="text-sm text-red-700">{{ error }}</p>
    </div>

    <!-- Loading -->
    <div v-if="pending" class="flex justify-center py-16">
      <div class="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900"></div>
    </div>

    <!-- Results -->
    <template v-if="summary && !pending">

      <!-- Stat Cards -->
      <div class="grid gap-4 sm:grid-cols-2">

        <!-- Total Revenue -->
        <div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div class="flex items-center justify-between">
            <p class="text-sm font-medium text-gray-500">Total Revenue</p>
            <span class="rounded-full bg-green-50 p-2">
              <CurrencyDollarIcon class="h-5 w-5 text-green-600" />
            </span>
          </div>
          <p class="mt-3 text-3xl font-bold tracking-tight text-gray-900">
            ₱{{ formatNumber(summary.total_revenue) }}
          </p>
          <p class="mt-1 text-xs text-gray-400">{{ summary.from }} → {{ summary.to }}</p>
        </div>

        <!-- Unique Customers -->
        <div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div class="flex items-center justify-between">
            <p class="text-sm font-medium text-gray-500">Customers Who Ordered</p>
            <span class="rounded-full bg-blue-50 p-2">
              <UserGroupIcon class="h-5 w-5 text-blue-600" />
            </span>
          </div>
          <p class="mt-3 text-3xl font-bold tracking-tight text-gray-900">
            {{ summary.total_customers.toLocaleString() }}
          </p>
          <p class="mt-1 text-xs text-gray-400">Unique customers in range</p>
        </div>

      </div>

      <!-- Top Products Table -->
      <div class="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-base font-semibold text-gray-900">Top 5 Most Purchased Products</h2>
          <p class="mt-0.5 text-sm text-gray-500">Ranked by total quantity sold in the selected period.</p>
        </div>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Rank</th>
                <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Product</th>
                <th class="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">Qty Sold</th>
                <th class="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">Revenue</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 bg-white">
              <tr
                v-for="(product, index) in summary.top_products as any[]"
                :key="product.uuid"
                class="transition hover:bg-gray-50"
              >
                <td class="whitespace-nowrap px-6 py-4">
                  <span
                    class="inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold"
                    :class="rankClass(Number(index))"
                    >
                      {{ Number(index) + 1 }}
                  </span>
                </td>
                <td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">{{ product.name }}</td>
                <td class="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-700">
                  {{ Number(product.total_quantity).toLocaleString() }}
                </td>
                <td class="whitespace-nowrap px-6 py-4 text-right text-sm font-semibold text-gray-900">
                  ₱{{ formatNumber(product.total_revenue) }}
                </td>
              </tr>
              <tr v-if="!summary.top_products?.length">
                <td colspan="4" class="px-6 py-10 text-center text-sm text-gray-500">No orders found in this date range.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </template>

    <!-- Empty state (before first search) -->
    <div v-if="!summary && !pending && !error" class="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-white py-20 text-center">
      <ChartBarIcon class="h-10 w-10 text-gray-300" />
      <p class="mt-3 text-sm font-medium text-gray-500">Select a date range and click Generate</p>
      <p class="mt-1 text-xs text-gray-400">Revenue, customers, and top products will appear here.</p>
    </div>

  </div>
</template>

<script setup lang="ts">
    import { ref, onMounted } from 'vue'
    import {
    MagnifyingGlassIcon,
    CurrencyDollarIcon,
    UserGroupIcon,
    ChartBarIcon,
    } from '@heroicons/vue/24/outline'
    import { dashboardService } from '~/api/dashboard/DashboardService'

    definePageMeta({ layout: 'default' })

    const from = ref("")
    const to = ref("")
    const summary = ref<any>(null)
    const pending = ref(false)
    const error = ref('')
    const validationError = ref('')

    const fetchSummary = async () => {
    validationError.value = ''
    error.value = ''

    if (from.value && to.value && from.value > to.value) {
      validationError.value = '"From" date must be before or equal to "To" date.'
      return
    }

    pending.value = true
    try {
        summary.value = await dashboardService.getOrderSummary(from.value, to.value)
    } catch (err: any) {
        error.value = err?.message || 'Failed to load summary. Please try again.'
    } finally {
        pending.value = false
    }
    }

    const formatNumber = (value: number | string) => {
    return Number(value).toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    }

    const rankClass = (index: number): string => {
    if (index === 0) return 'bg-yellow-100 text-yellow-700'
    if (index === 1) return 'bg-gray-100 text-gray-600'
    if (index === 2) return 'bg-orange-100 text-orange-600'
    return 'bg-gray-50 text-gray-400'
    }

    onMounted(fetchSummary)
</script>