<template>
  <div class="min-h-screen bg-gray-50">

    <!-- HEADER -->
    <header class="sticky top-0 z-10 border-b border-gray-200 bg-white">
      <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">

        <NuxtLink to="/customer/landingpage" class="text-lg font-semibold tracking-tight text-gray-900 hover:text-indigo-600 transition">
          My Store
        </NuxtLink>

        <!-- NAV -->
        <nav class="hidden items-center gap-6 md:flex">
          <NuxtLink to="/customer/shop"
            class="border-b-2 border-transparent py-1 text-sm font-medium text-gray-500 hover:text-gray-900 hover:border-gray-900 transition"
            active-class="border-gray-900 text-gray-900"
          >
            Shop
          </NuxtLink>

          <NuxtLink to="/customer/orders"
            class="border-b-2 border-transparent py-1 text-sm font-medium text-gray-500 hover:text-gray-900 hover:border-gray-900 transition"
            active-class="border-gray-900 text-gray-900"
          >
            Orders
          </NuxtLink>

          <span class="py-1 text-sm font-medium text-gray-500">
            Account
          </span>
        </nav>

        <!-- RIGHT SIDE -->
        <div class="flex items-center gap-3">

          <!-- CART -->
          <NuxtLink
            to="/customer/cart"
            class="flex items-center gap-2 rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
          >
            <ShoppingBagIcon class="h-4 w-4" />
            Cart

            <span
              class="rounded-full px-2 py-0.5 text-xs font-medium text-white"
              :class="(cart?.totalItems ?? 0) > 0 ? 'bg-indigo-600' : 'bg-gray-300'"
            >
              {{ cart?.totalItems ?? 0 }}
            </span>
          </NuxtLink>

          <!-- PROFILE -->
          <div class="relative">

            <button
              @click="toggleDropdown"
              class="flex items-center gap-1 rounded-full border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
            >
              <UserIcon class="h-4 w-4" />
              Profile
              <ChevronDownIcon class="h-3 w-3" :class="{ 'rotate-180': dropdownOpen }" />
            </button>

            <div
              v-if="dropdownOpen"
              class="absolute right-0 mt-2 w-48 rounded-lg border border-gray-100 bg-white py-1 shadow-lg z-20"
            >
              <button
                @click="openLogoutModal"
                class="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
              >
                <ArrowRightStartOnRectangleIcon class="h-4 w-4" />
                Logout
              </button>
            </div>

          </div>
        </div>
      </div>
    </header>

    <!-- MAIN -->
    <main>

      <!-- HERO -->
      <section v-if="route.path === '/customer/order'" class="bg-white">
        <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

          <p class="text-xs font-semibold uppercase tracking-widest text-indigo-600">
            New arrivals
          </p>

          <h1 class="mt-3 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            Shop quality products made for everyday use.
          </h1>

          <p class="mt-5 max-w-xl text-base leading-relaxed text-gray-500">
            Browse featured products, discover new items, and enjoy a simple shopping experience.
          </p>

          <div class="mt-8 flex gap-3">
            <NuxtLink
              to="/customer/shop"
              class="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 transition"
            >
              Shop Now
            </NuxtLink>

            <button class="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
              View Deals
            </button>
          </div>

        </div>
      </section>

      <!-- PRODUCT LIST -->
      <div v-if="route.path === '/customer/order'">
        <ProductListing />
      </div>

      <!-- OTHER PAGES -->
      <section v-else class="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <slot />
      </section>

    </main>

    <!-- FOOTER -->
    <footer class="border-t border-gray-200 bg-white">
      <div class="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-gray-400 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <p>© 2026 My Store. All rights reserved.</p>
      </div>
    </footer>

    <!-- LOGOUT MODAL -->
    <div v-if="showLogoutModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

      <div class="w-96 rounded-lg bg-white p-6 shadow-xl">

        <h3 class="text-lg font-semibold text-gray-900">Confirm Logout</h3>
        <p class="mt-2 text-sm text-gray-500">Are you sure you want to logout?</p>

        <div class="mt-5 flex justify-end gap-3">
          <button
            @click="closeLogoutModal"
            class="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            No
          </button>

          <button
            @click="confirmLogout"
            class="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            Yes, Logout
          </button>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useCartStore } from '~/stores/cart'
import { useRoute } from 'vue-router'

import {
  ShoppingBagIcon,
  UserIcon,
  ChevronDownIcon,
  ArrowRightStartOnRectangleIcon
} from '@heroicons/vue/24/outline'

const cart = useCartStore()
const route = useRoute()

const dropdownOpen = ref(false)
const showLogoutModal = ref(false)

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

const openLogoutModal = () => {
  dropdownOpen.value = false
  showLogoutModal.value = true
}

const closeLogoutModal = () => {
  showLogoutModal.value = false
}

const confirmLogout = async () => {
  localStorage.clear()
  await navigateTo('/')
}

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (!target.closest('.relative')) {
    dropdownOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>