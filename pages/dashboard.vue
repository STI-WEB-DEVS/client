<template>
  <NuxtLayout>
    <div class="py-8 px-6 max-w-3xl mx-auto">

      <div class="mb-8">
        <h1 class="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p class="mt-1 text-sm text-gray-500">Welcome back, Admin. Here's your overview.</p>
      </div>

      <div class="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-8">
        <div v-for="stat in stats" :key="stat.label"
          class="bg-white rounded-xl border border-gray-100 p-5 flex items-center gap-4">
          <div class="flex size-11 shrink-0 items-center justify-center rounded-lg"
            :class="stat.iconBg">
            <component :is="stat.icon" class="size-5" :class="stat.iconColor" />
          </div>
          <div>
            <p class="text-xs text-gray-400 uppercase tracking-wide">{{ stat.label }}</p>
            <p class="text-2xl font-semibold text-gray-900 mt-0.5">{{ stat.value }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl border border-gray-100">
        <div class="px-5 py-4 border-b border-gray-100">
          <h2 class="text-sm font-semibold text-gray-900">Quick actions</h2>
        </div>
        <div class="p-4 space-y-2">
          <NuxtLink v-for="action in actions" :key="action.to" :to="action.to"
            class="flex items-center gap-3 rounded-lg border border-gray-100 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition">
            <div class="flex size-8 items-center justify-center rounded-md" :class="action.iconBg">
              <component :is="action.icon" class="size-4" :class="action.iconColor" />
            </div>
            {{ action.label }}
          </NuxtLink>
        </div>
      </div>

    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { UsersIcon, ShoppingBagIcon, ClipboardDocumentListIcon } from '@heroicons/vue/24/outline'

const totalCustomers = ref(0)
const totalProducts = ref(0)
const totalOrders = ref(0)

const stats = computed(() => [
  { label: 'Total customers', value: totalCustomers.value, icon: UsersIcon, iconBg: 'bg-blue-50', iconColor: 'text-blue-600' },
  { label: 'Total products',  value: totalProducts.value,  icon: ShoppingBagIcon, iconBg: 'bg-teal-50', iconColor: 'text-teal-600' },
  { label: 'Total orders',    value: totalOrders.value,    icon: ClipboardDocumentListIcon, iconBg: 'bg-amber-50', iconColor: 'text-amber-600' },
])

const actions = [
  { label: 'Manage products',  to: '/admin/products',  icon: ShoppingBagIcon, iconBg: 'bg-blue-50', iconColor: 'text-blue-600' },
  { label: 'Manage customers', to: '/admin/customers', icon: UsersIcon, iconBg: 'bg-blue-50', iconColor: 'text-blue-600' },
  { label: 'View orders',      to: '/admin/orders',    icon: ClipboardDocumentListIcon, iconBg: 'bg-amber-50', iconColor: 'text-amber-600' },
]

const runtimeConfig = useRuntimeConfig()
const token = localStorage.getItem('_token')
const headers = { Authorization: `Bearer ${token}`, Accept: 'application/json' }

onMounted(async () => {
  try {
    const [customers, products, orders] = await Promise.all([
      $fetch<any>('/customers', { baseURL: runtimeConfig.public.apiBaseURL, headers }),
      $fetch<any>('/products',  { baseURL: runtimeConfig.public.apiBaseURL, headers }),
      $fetch<any>('/orders',    { baseURL: runtimeConfig.public.apiBaseURL, headers }),
    ])
    totalCustomers.value = customers.data?.length ?? 0
    totalProducts.value  = products.data?.length  ?? 0
    totalOrders.value    = orders.data?.length     ?? 0
  } catch (e) {
    console.error(e)
  }
})
</script>