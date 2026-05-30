<template>
  <NuxtLayout>
    <div>

      <!-- Page Header -->
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p class="mt-1 text-sm text-gray-500">Welcome back, Admin. Here's your overview.</p>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8">
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-x-4 hover:shadow-md transition">
          <div class="flex size-12 shrink-0 items-center justify-center rounded-xl text-white shadow" style="background: linear-gradient(135deg, #1e3a5f, #2563eb);">
            <UsersIcon class="size-6" />
          </div>
          <div>
            <p class="text-xs font-medium text-gray-500 uppercase tracking-wide">Total Customers</p>
            <p class="text-2xl font-bold text-gray-900 mt-0.5">{{ totalCustomers }}</p>
          </div>
        </div>

        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-x-4 hover:shadow-md transition">
          <div class="flex size-12 shrink-0 items-center justify-center rounded-xl text-white shadow" style="background: linear-gradient(135deg, #0369a1, #0ea5e9);">
            <ShoppingBagIcon class="size-6" />
          </div>
          <div>
            <p class="text-xs font-medium text-gray-500 uppercase tracking-wide">Total Products</p>
            <p class="text-2xl font-bold text-gray-900 mt-0.5">{{ totalProducts }}</p>
          </div>
        </div>

        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-x-4 hover:shadow-md transition">
          <div class="flex size-12 shrink-0 items-center justify-center rounded-xl text-white shadow" style="background: linear-gradient(135deg, #b45309, #f59e0b);">
            <ClipboardDocumentListIcon class="size-6" />
          </div>
          <div>
            <p class="text-xs font-medium text-gray-500 uppercase tracking-wide">Total Orders</p>
            <p class="text-2xl font-bold text-gray-900 mt-0.5">{{ totalOrders }}</p>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div class="px-6 py-4 border-b border-gray-100">
          <h2 class="text-sm font-semibold text-gray-900">Quick Actions</h2>
        </div>
        <div class="px-6 py-4 space-y-3">
          <NuxtLink to="/admin/products" class="flex items-center gap-3 rounded-xl border border-gray-100 px-4 py-3 text-sm font-medium text-gray-700 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 transition group">
            <div class="flex size-8 items-center justify-center rounded-lg text-white text-xs shadow-sm group-hover:scale-105 transition" style="background: linear-gradient(135deg, #1e3a5f, #2563eb);">
              <ShoppingBagIcon class="size-4" />
            </div>
            Manage Products
          </NuxtLink>
          <NuxtLink to="/admin/customers" class="flex items-center gap-3 rounded-xl border border-gray-100 px-4 py-3 text-sm font-medium text-gray-700 hover:border-sky-200 hover:bg-sky-50 hover:text-sky-700 transition group">
            <div class="flex size-8 items-center justify-center rounded-lg text-white text-xs shadow-sm group-hover:scale-105 transition" style="background: linear-gradient(135deg, #0369a1, #0ea5e9);">
              <UsersIcon class="size-4" />
            </div>
            Manage Customers
          </NuxtLink>
          <NuxtLink to="/admin/orders" class="flex items-center gap-3 rounded-xl border border-gray-100 px-4 py-3 text-sm font-medium text-gray-700 hover:border-amber-200 hover:bg-amber-50 hover:text-amber-700 transition group">
            <div class="flex size-8 items-center justify-center rounded-lg text-white text-xs shadow-sm group-hover:scale-105 transition" style="background: linear-gradient(135deg, #b45309, #f59e0b);">
              <ClipboardDocumentListIcon class="size-4" />
            </div>
            View Orders
          </NuxtLink>
        </div>
      </div>

    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  UsersIcon,
  ShoppingBagIcon,
  ClipboardDocumentListIcon,
} from '@heroicons/vue/24/outline'

const totalCustomers = ref(0)
const totalProducts = ref(0)
const totalOrders = ref(0)

const runtimeConfig = useRuntimeConfig()
const token = localStorage.getItem('_token')

const headers = {
  Authorization: `Bearer ${token}`,
  Accept: 'application/json',
}

onMounted(async () => {
  try {
    const [customers, products, orders] = await Promise.all([
      $fetch<any>('/customers', { baseURL: runtimeConfig.public.apiBaseURL, headers }),
      $fetch<any>('/products', { baseURL: runtimeConfig.public.apiBaseURL, headers }),
      $fetch<any>('/orders', { baseURL: runtimeConfig.public.apiBaseURL, headers }),
    ])
    totalCustomers.value = customers.data?.length || 0
    totalProducts.value = products.data?.length || 0
    totalOrders.value = orders.data?.length || 0
  } catch (e) {
    console.error(e)
  }
})
</script>