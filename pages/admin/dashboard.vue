<template>
    <div class="mx-auto max-w-7xl animate-in fade-in duration-500">
        <header class="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
                <h1 class="text-3xl font-bold tracking-tight text-gray-900">Dashboard Overview</h1>
                <p class="mt-2 text-sm text-gray-600">Real-time performance metrics and sales summary.</p>
            </div>

            <!-- Date Filters -->
            <div class="flex flex-wrap items-center gap-4 bg-white p-4 rounded-2xl shadow-sm ring-1 ring-gray-200">
                <div class="flex flex-col">
                    <label for="from" class="text-[10px] font-bold text-gray-400 uppercase mb-1 ml-1">From Date</label>
                    <div class="relative">
                        <input 
                            type="date" 
                            id="from" 
                            v-model="filters.from"
                            class="block w-full rounded-xl border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm transition-all"
                        />
                    </div>
                </div>
                <div class="flex flex-col">
                    <label for="to" class="text-[10px] font-bold text-gray-400 uppercase mb-1 ml-1">To Date</label>
                    <div class="relative">
                        <input 
                            type="date" 
                            id="to" 
                            v-model="filters.to"
                            class="block w-full rounded-xl border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm transition-all"
                        />
                    </div>
                </div>
                <div class="flex items-end self-end">
                    <button 
                        @click="clearFilters"
                        v-if="filters.from || filters.to"
                        class="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-50 text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all ring-1 ring-gray-200"
                        title="Clear filters"
                    >
                        <XMarkIcon class="h-5 w-5" />
                    </button>
                </div>
            </div>
        </header>

        <!-- Loading State Overlay -->
        <div class="relative">
            <div v-if="loading && summary" class="absolute inset-0 z-10 bg-white/50 backdrop-blur-[2px] rounded-2xl flex items-center justify-center transition-all">
                <div class="flex flex-col items-center">
                    <div class="h-10 w-10 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600 mb-2"></div>
                    <span class="text-xs font-bold text-indigo-600 uppercase tracking-widest">Updating</span>
                </div>
            </div>

            <!-- Stats Grid -->
            <div v-if="loading && !summary" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8">
                <div v-for="i in 2" :key="i" class="h-32 rounded-2xl bg-gray-100 animate-pulse"></div>
            </div>

            <div v-else class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8">
                <!-- Total Revenue -->
                <div class="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200 transition-all hover:shadow-lg hover:ring-indigo-500/30">
                    <div class="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-indigo-50 transition-all group-hover:bg-indigo-100/50"></div>
                    <dt class="flex items-center gap-x-3">
                        <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-200">
                            <BanknotesIcon class="h-6 w-6" aria-hidden="true" />
                        </div>
                        <p class="text-sm font-semibold text-gray-500 uppercase tracking-wider">Total Revenue</p>
                    </dt>
                    <dd class="mt-4 flex items-baseline justify-between">
                        <p class="text-3xl font-extrabold tracking-tight text-gray-900">
                            {{ formatCurrency(summary?.total_amount || 0) }}
                        </p>
                    </dd>
                </div>

                <!-- Total Customers -->
                <div class="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200 transition-all hover:shadow-lg hover:ring-emerald-500/30">
                    <div class="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-emerald-50 transition-all group-hover:bg-emerald-100/50"></div>
                    <dt class="flex items-center gap-x-3">
                        <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-lg shadow-emerald-200">
                            <UsersIcon class="h-6 w-6" aria-hidden="true" />
                        </div>
                        <p class="text-sm font-semibold text-gray-500 uppercase tracking-wider">Unique Customers</p>
                    </dt>
                    <dd class="mt-4 flex items-baseline justify-between">
                        <p class="text-3xl font-extrabold tracking-tight text-gray-900">
                            {{ summary?.customers_count || 0 }}
                        </p>
                    </dd>
                </div>
            </div>

            <!-- Top Products -->
            <div class="bg-white rounded-2xl shadow-sm ring-1 ring-gray-200 overflow-hidden">
                <div class="px-6 py-5 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                    <div>
                        <h3 class="text-lg font-bold leading-6 text-gray-900">Top 5 Most Purchased Products</h3>
                        <p class="mt-1 text-xs text-gray-500">
                            {{ filters.from || filters.to ? 'Filtered performance by selected dates.' : 'Based on total quantity sold across all orders.' }}
                        </p>
                    </div>
                    <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-gray-200">
                        <ChartBarIcon class="h-5 w-5 text-indigo-600" />
                    </div>
                </div>
                
                <div class="px-6 py-4">
                    <div v-if="loading && !summary" class="space-y-4">
                        <div v-for="i in 5" :key="i" class="h-16 rounded-xl bg-gray-50 animate-pulse"></div>
                    </div>
                    
                    <ul v-else role="list" class="divide-y divide-gray-100">
                        <li v-for="(item, index) in summary?.top_products" :key="item.product_id" 
                            class="flex items-center justify-between py-5 group transition-all duration-300 hover:px-2 rounded-xl">
                            <div class="flex items-center gap-x-4">
                                <div class="relative">
                                    <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50 text-sm font-bold text-gray-600 ring-1 ring-gray-200 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                        {{ index + 1 }}
                                    </span>
                                    <div v-if="index === 0" class="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-yellow-400 text-[10px] text-white ring-2 ring-white">
                                        ★
                                    </div>
                                </div>
                                <div>
                                    <p class="text-sm font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{{ item.product?.name }}</p>
                                    <p class="text-xs text-gray-500 mt-0.5">Price: {{ formatCurrency(item.product?.price) }}</p>
                                </div>
                            </div>
                            <div class="flex flex-col items-end">
                                <span class="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-bold text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
                                    {{ item.total_quantity }} sold
                                </span>
                                <p class="text-xs font-medium text-gray-400 mt-1.5">Total Revenue: {{ formatCurrency(item.total_quantity * item.product?.price) }}</p>
                            </div>
                        </li>
                        
                        <li v-if="!summary?.top_products?.length && !loading" class="py-12 text-center">
                            <div class="flex flex-col items-center">
                                <div class="h-12 w-12 rounded-full bg-gray-50 flex items-center justify-center mb-3">
                                    <ChartBarIcon class="h-6 w-6 text-gray-300" />
                                </div>
                                <p class="text-sm font-medium text-gray-500">No data available for the selected period</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch, reactive } from 'vue'
import { orderService } from '~/api/order/OrderService'
import { BanknotesIcon, UsersIcon, ChartBarIcon, XMarkIcon } from '@heroicons/vue/24/outline'

definePageMeta({
    layout: 'default'
})

const summary = ref(null)
const loading = ref(true)

const filters = reactive({
    from: '',
    to: ''
})

const fetchSummary = async () => {
    loading.value = true
    try {
        const response = await orderService.getSummary({
            from: filters.from,
            to: filters.to
        })
        summary.value = response
    } catch (error) {
        console.error('Failed to fetch order summary:', error)
    } finally {
        loading.value = false
    }
}

const clearFilters = () => {
    filters.from = ''
    filters.to = ''
}

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: 'PHP',
    }).format(amount)
}

watch(filters, () => {
    fetchSummary()
})

onMounted(() => {
    fetchSummary()
})
</script>

<style scoped>
.animate-in {
    animation-name: animate-in;
    animation-duration: 0.5s;
    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes animate-in {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Custom scrollbar for better look */
::-webkit-calendar-picker-indicator {
    filter: invert(0.5);
    cursor: pointer;
}
</style>