<template>
  <div v-if="pending" class="py-20 text-center text-gray-400">
    Loading dashboard...
  </div>

  <div v-else class="min-h-screen bg-gray-50 p-6">
    <div class="mb-6 flex items-center justify-between">
      <div>
        <h1 class="text-xl font-semibold text-indigo-900">Dashboard</h1>
        <p class="mt-0.5 text-sm text-gray-500">
          {{ formatDate(filter.from) }} - {{ formatDate(filter.to) }}
        </p>
      </div>

      <div class="relative">
        <button
          class="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-indigo-600 shadow-sm transition-colors hover:bg-indigo-50"
          @click="showDatePicker = !showDatePicker"
        >
          <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <path d="M16 2v4M8 2v4M3 10h18" />
          </svg>
          {{ formatDate(filter.from) }} - {{ formatDate(filter.to) }}
        </button>

        <div v-if="showDatePicker" class="absolute right-0 z-10 mt-2 w-64 rounded-xl border bg-white p-4 shadow-lg">
          <div class="flex flex-col gap-2">
            <label class="text-xs text-gray-500">From</label>
            <input v-model="filter.from" type="date" class="rounded border px-2 py-1 text-sm" />

            <label class="mt-2 text-xs text-gray-500">To</label>
            <input v-model="filter.to" type="date" class="rounded border px-2 py-1 text-sm" />

            <button
              class="mt-3 rounded bg-indigo-600 px-3 py-2 text-sm text-white"
              @click="applyFilter"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
      



    </div>

    <div class="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div class="rounded-xl border border-gray-200 bg-white p-4 shadow">
        <div class="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100">
          <svg class="h-4 w-4 text-indigo-600" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.86 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z" />
          </svg>
        </div>
        <p class="mb-1 text-xs text-gray-500">Total sales</p>
        <p class="text-2xl font-semibold text-indigo-900">{{ peso(summary.total_sales) }}</p>
        <span class="mt-2 inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-700">
          {{ formatDate(filter.from) }} - {{ formatDate(filter.to) }}
        </span>
      </div>

      <div class="rounded-xl border border-gray-200 bg-white p-4 shadow">
        <div class="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-green-100">
          <svg class="h-4 w-4 text-green-600" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </div>
        <p class="mb-1 text-xs text-gray-500">Customers</p>
        <p class="text-2xl font-semibold text-indigo-900">{{ summary.total_customers }}</p>
        <span class="mt-2 inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700">
          Customers who made a purchase
        </span>
      </div>

      <div class="rounded-xl border border-gray-200 bg-white p-4 shadow">
        <div class="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100">
          <svg class="h-4 w-4 text-amber-600" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          </svg>
        </div>
        <p class="mb-1 text-xs text-gray-500">Units sold</p>
        <p class="text-2xl font-semibold text-indigo-900">{{ totalUnitsSold }}</p>
        <span class="mt-2 inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700">
          {{ topProducts.length }} products
        </span>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-4 xl:grid-cols-2">
      <div class="rounded-xl border border-gray-200 bg-white p-4 shadow">
        <div class="mb-4 flex items-start justify-between gap-3">
          <div class="flex items-start gap-2">
            <svg class="mt-0.5 h-4 w-4 text-indigo-600" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
              <polyline points="17 6 23 6 23 12" />
            </svg>
            <div>
              <p class="text-sm font-medium text-indigo-900">Daily sales</p>
              <p class="text-xs text-gray-400">
                Each bar shows revenue for one day from {{ formatDate(filter.from) }} to {{ formatDate(filter.to) }}
              </p>
            </div>
          </div>

          <div class="rounded-full bg-indigo-50 px-2.5 py-1 text-right">
            <div class="flex items-center gap-1 text-[11px] font-medium text-indigo-700">
              <span class="h-2 w-2 rounded-full bg-indigo-500"></span>
              Sales bars
            </div>
            <p class="text-[11px] text-indigo-500">Peak: {{ peso(maxSales) }}</p>
          </div>
        </div>

        <div class="mb-3 rounded-2xl bg-gray-50 p-4">
          <div class="mb-3 flex items-center justify-between text-[11px] font-medium uppercase tracking-wide text-gray-400">
            <span>Daily revenue</span>
            <span>{{ dailySalesTrend.length }} days</span>
          </div>

          <div class="relative overflow-x-auto">
            <div class="pointer-events-none absolute inset-x-0 top-6 bottom-8 grid grid-rows-4">
              <div class="border-b border-dashed border-gray-200"></div>
              <div class="border-b border-dashed border-gray-200"></div>
              <div class="border-b border-dashed border-gray-200"></div>
              <div class="border-b border-dashed border-gray-200"></div>
            </div>

            <div class="relative flex min-h-[260px] min-w-max items-end gap-3 pt-6">
              <div
                v-for="day in dailySalesTrend"
                :key="day.date"
                class="flex w-14 flex-col items-center"
              >
                <span class="mb-2 text-[10px] font-semibold text-indigo-700">
                  {{ peso(day.sales) }}
                </span>

                <div class="flex h-44 w-full items-end rounded-t-2xl bg-white/60 px-2 pb-0">
                  <div
                    class="w-full rounded-t-xl bg-gradient-to-t from-indigo-600 to-indigo-400 shadow-sm transition-all"
                    :style="{ height: getSalesHeight(day.sales) }"
                  />
                </div>

                <span class="mt-2 text-[11px] font-medium text-gray-500">
                  {{ formatDate(day.date) }}
                </span>
                <span class="mt-0.5 text-[10px] text-gray-400">
                  {{ getSalesPercent(day.sales) }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="flex items-center justify-between text-xs text-gray-400">
          <span>Lowest: {{ peso(minSales) }}</span>
          <span>Highest: {{ peso(maxSales) }}</span>
        </div>

        <div class="mt-4 flex justify-between border-t border-gray-100 pt-3 text-center">
          <div>
            <p class="text-sm font-semibold text-indigo-900">{{ peso(summary.total_sales) }}</p>
            <p class="text-xs text-gray-400">{{ dailySalesTrend.length }}-day total</p>
          </div>
          <div>
            <p class="text-sm font-semibold text-indigo-900">{{ peso(averageDailySales) }}</p>
            <p class="text-xs text-gray-400">Daily avg</p>
          </div>
        </div>
      </div>
      <div class="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

      <!-- Header -->
      <div class="mb-5 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="rounded-lg bg-indigo-50 p-2">
            <svg class="h-4 w-4 text-indigo-600" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
              <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
              <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
              <path d="M4 22h16" />
              <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
              <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
              <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
            </svg>
          </div>

          <span class="text-sm font-semibold text-gray-900">
            Top products
          </span>
        </div>

        <span class="text-xs text-gray-400">
          by units sold
        </span>
      </div>

      <!-- List -->
      <div class="space-y-4">

        <div
          v-for="(product, index) in topProducts"
          :key="product.id"
          class="grid grid-cols-[28px_1fr_80px] items-center gap-3"
        >

          <!-- Rank -->
          <div class="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-50 text-xs font-semibold text-indigo-600">
            {{ index + 1 }}
          </div>

          <!-- Name + bar -->
          <div>
            <div class="mb-1 flex items-center justify-between">
              <span class="truncate text-sm font-medium text-gray-800">
                {{ product.name }}
              </span>

              <span class="text-xs text-gray-500">
                {{ product.total_quantity }} pcs
              </span>
            </div>

            <div class="h-2 w-full rounded-full bg-gray-100">
              <div
                class="h-2 rounded-full bg-indigo-500 transition-all"
                :style="{ width: getBarWidth(product.total_quantity) }"
              />
            </div>
          </div>

          <!-- right spacer (keeps alignment clean) -->
          <div></div>

        </div>

      </div>

      <!-- Footer -->
      <div class="mt-5 border-t border-gray-100 pt-4">
        <div class="flex items-center justify-between text-xs text-gray-500">
          <span>{{ totalUnitsSold }} units sold</span>
          <span class="font-medium text-gray-700">
            {{ peso(summary.total_sales) }} revenue
          </span>
        </div>
      </div>

    </div>




    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { orderService } from '~/api/order/OrderService'

const pending = ref(true)
const error = ref(null)
const data = ref(null)
const filter = ref({
  from: '',
  to: '',
})
const showDatePicker = ref(false)

const fetchDashboard = async (params = {}) => {
  pending.value = true

  try {
    const response = await orderService.getSummary(params)
    data.value = response

    const nextDashboard = response?.data || {}
    filter.value = {
      from: nextDashboard.from || '',
      to: nextDashboard.to || '',
    }
  } catch (err) {
    error.value = err
  } finally {
    pending.value = false
  }
}

await fetchDashboard()

const dashboard = computed(() => data.value?.data || {})
const summary = computed(() => dashboard.value.summary || {})
const topProducts = computed(() => dashboard.value.top_products || [])
const dailySalesTrend = computed(() => dashboard.value.daily_sales_trend || [])

const applyFilter = async () => {
  showDatePicker.value = false

  await fetchDashboard({
    from: filter.value.from,
    to: filter.value.to,
  })
}
const totalUnitsSold = computed(() => {
  return topProducts.value.reduce(
    (sum, product) => sum + Number(product.total_quantity),
    0
  )
})

const totalTrendSales = computed(() => {
  return dailySalesTrend.value.reduce(
    (sum, item) => sum + Number(item.sales),
    0
  )
})

const averageDailySales = computed(() => {
  if (!dailySalesTrend.value.length) return 0

  return totalTrendSales.value / dailySalesTrend.value.length
})

const maxQty = computed(() => {
  if (!topProducts.value.length) return 1

  return Math.max(...topProducts.value.map((product) => Number(product.total_quantity)))
})

const maxSales = computed(() => {
  if (!dailySalesTrend.value.length) return 1

  return Math.max(...dailySalesTrend.value.map((day) => Number(day.sales)))
})

const minSales = computed(() => {
  if (!dailySalesTrend.value.length) return 0

  return Math.min(...dailySalesTrend.value.map((day) => Number(day.sales)))
})

const peso = (value) => {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    maximumFractionDigits: 0,
  }).format(Number(value || 0))
}

const formatDate = (date) => {
  if (!date) return '--'

  return new Date(date).toLocaleDateString('en-PH', {
    month: 'short',
    day: 'numeric',
  })
}

const getSalesHeight = (sales) => {
  return `${Math.max((Number(sales) / maxSales.value) * 100, 10)}%`
}

const getSalesPercent = (sales) => {
  return `${Math.round((Number(sales) / maxSales.value) * 100)}%`
}

const getBarWidth = (qty) => {
  return `${(Number(qty) / maxQty.value) * 100}%`
}
</script>
