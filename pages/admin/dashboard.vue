```vue
<template>
  <NuxtLayout>
    <div class="min-h-screen bg-[#0d0608] p-6">

      <!-- Header -->
      <div class="mb-8">
        <h1
          class="text-3xl font-bold text-white"
          style="font-family: Georgia, serif;"
        >
          Dashboard
        </h1>

        <p class="mt-2 text-sm text-red-100/60">
          Welcome back, Admin. Here's your overview.
        </p>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8">

        <!-- Customers -->
        <div
          class="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-red-500/30"
        >
          <div class="flex items-center gap-4">
            <div
              class="flex h-14 w-14 items-center justify-center rounded-2xl text-white"
              style="background: linear-gradient(135deg,#c0392b,#e74c3c);"
            >
              <UsersIcon class="size-7" />
            </div>

            <div>
              <p class="text-xs uppercase tracking-widest text-red-100/50">
                Total Customers
              </p>

              <p class="mt-1 text-3xl font-bold text-white">
                {{ totalCustomers }}
              </p>
            </div>
          </div>
        </div>

        <!-- Products -->
        <div
          class="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-red-500/30"
        >
          <div class="flex items-center gap-4">
            <div
              class="flex h-14 w-14 items-center justify-center rounded-2xl text-white"
              style="background: linear-gradient(135deg,#922b21,#c0392b);"
            >
              <ShoppingBagIcon class="size-7" />
            </div>

            <div>
              <p class="text-xs uppercase tracking-widest text-red-100/50">
                Total Products
              </p>

              <p class="mt-1 text-3xl font-bold text-white">
                {{ totalProducts }}
              </p>
            </div>
          </div>
        </div>

        <!-- Orders -->
        <div
          class="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-red-500/30"
        >
          <div class="flex items-center gap-4">
            <div
              class="flex h-14 w-14 items-center justify-center rounded-2xl text-white"
              style="background: linear-gradient(135deg,#641e16,#922b21);"
            >
              <ClipboardDocumentListIcon class="size-7" />
            </div>

            <div>
              <p class="text-xs uppercase tracking-widest text-red-100/50">
                Total Orders
              </p>

              <p class="mt-1 text-3xl font-bold text-white">
                {{ totalOrders }}
              </p>
            </div>
          </div>
        </div>

      </div>

      <!-- Quick Actions -->
      <div
        class="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden"
      >
        <div class="border-b border-white/10 px-6 py-5">
          <h2 class="text-lg font-bold text-white">
            Quick Actions
          </h2>
        </div>

        <div class="p-6 space-y-4">

          <!-- Products -->
          <NuxtLink
            to="/admin/products"
            class="group flex items-center gap-4 rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-white transition-all hover:border-red-500/40 hover:bg-red-900/20"
          >
            <div
              class="flex h-10 w-10 items-center justify-center rounded-xl text-white"
              style="background: linear-gradient(135deg,#c0392b,#e74c3c);"
            >
              <ShoppingBagIcon class="size-5" />
            </div>

            <span class="font-medium">
              Manage Products
            </span>
          </NuxtLink>

          <!-- Customers -->
          <NuxtLink
            to="/admin/customer"
            class="group flex items-center gap-4 rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-white transition-all hover:border-red-500/40 hover:bg-red-900/20"
          >
            <div
              class="flex h-10 w-10 items-center justify-center rounded-xl text-white"
              style="background: linear-gradient(135deg,#922b21,#c0392b);"
            >
              <UsersIcon class="size-5" />
            </div>

            <span class="font-medium">
              Manage Customers
            </span>
          </NuxtLink>

          <!-- Orders -->
          <NuxtLink
            to="/admin/orders"
            class="group flex items-center gap-4 rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-white transition-all hover:border-red-500/40 hover:bg-red-900/20"
          >
            <div
              class="flex h-10 w-10 items-center justify-center rounded-xl text-white"
              style="background: linear-gradient(135deg,#641e16,#922b21);"
            >
              <ClipboardDocumentListIcon class="size-5" />
            </div>

            <span class="font-medium">
              View Orders
            </span>
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
    const [customer, products, orders] = await Promise.all([
      $fetch<any>('/customer', { baseURL: runtimeConfig.public.apiBaseURL, headers }),
      $fetch<any>('/products', { baseURL: runtimeConfig.public.apiBaseURL, headers }),
      $fetch<any>('/orders', { baseURL: runtimeConfig.public.apiBaseURL, headers }),
    ])
    totalCustomers.value = customer.data?.length || 0
    totalProducts.value = products.data?.length || 0
    totalOrders.value = orders.data?.length || 0
  } catch (e) {
    console.error(e)
  }
})
</script>