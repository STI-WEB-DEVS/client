<template>
  <div class="min-h-screen bg-gray-50">
    <header class="sticky top-0 z-10 border-b border-gray-200 bg-white">
      <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <NuxtLink to="/customer/landingpage" class="text-lg font-semibold tracking-tight text-gray-900 hover:text-indigo-600 transition">
          My Store
        </NuxtLink>

        <nav class="hidden items-center gap-6 md:flex">
          <NuxtLink
            to="/shop"
            class="cursor-pointer border-b-2 border-transparent py-1 text-sm font-medium text-gray-500 transition hover:border-gray-900 hover:text-gray-900"
            active-class="border-gray-900 text-gray-900"
          >Shop</NuxtLink>
          <span class="cursor-pointer border-b-2 border-transparent py-1 text-sm font-medium text-gray-500 transition hover:border-gray-900 hover:text-gray-900">Categories</span>
          
          <NuxtLink
            to="/customer/orders"
            class="cursor-pointer border-b-2 border-transparent py-1 text-sm font-medium text-gray-500 transition hover:border-gray-900 hover:text-gray-900"
            active-class="border-gray-900 text-gray-900"
          >Orders</NuxtLink>
          
          <span class="cursor-pointer border-b-2 border-transparent py-1 text-sm font-medium text-gray-500 transition hover:border-gray-900 hover:text-gray-900">Account</span>
        </nav>

        <div class="flex items-center gap-3">
          <NuxtLink
            to="/cart"
            class="flex items-center gap-2 rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 active:scale-95"
          >
            <ShoppingBagIcon class="h-4 w-4" />
            Cart
            <span
              class="rounded-full px-2 py-0.5 text-xs font-medium text-white transition-all"
              :class="cart.totalItems > 0 ? 'bg-indigo-600' : 'bg-gray-300'"
            >
              {{ cart.totalItems }}
            </span>
          </NuxtLink>

          <div class="relative">
            <button
              @click="toggleDropdown"
              class="flex items-center gap-1 rounded-full border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
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

    <main>
      <!-- Hero section – only on landingpage -->
      <section v-if="route.path === '/customer/landingpage'" class="bg-white">
        <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div class="grid items-center gap-12 lg:grid-cols-2">
            <!-- Left: text content -->
            <div>
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
                  to="/shop"
                  class="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700 active:scale-95"
                >
                  Shop Now
                </NuxtLink>
                <button class="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 active:scale-95">
                  View Deals
                </button>
              </div>
            </div>

            <!-- Right: Image (replaces gray placeholder) -->
            <div class="rounded-2xl bg-gray-100 p-2">
              <img
                src="https://i.ytimg.com/vi/SQJrYw1QvSQ/maxresdefault.jpg"
                alt="Shopping hero"
                class="aspect-[4/3] w-full rounded-xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- Product listing – only on landingpage (appears after hero) -->
      <div v-if="route.path === '/customer/landingpage'">
        <ProductListing />
      </div>

      <!-- For other pages (shop, orders, etc.), render the slot content -->
      <section v-else class="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <nuxt-page />
      </section>
    </main>

    <footer class="border-t border-gray-200 bg-white">
      <div class="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-gray-400 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <p>© 2026 My Store. All rights reserved.</p>
        <div class="flex gap-6">
          <span class="cursor-pointer transition hover:text-gray-700">Help</span>
          <span class="cursor-pointer transition hover:text-gray-700">Contact</span>
          <span class="cursor-pointer transition hover:text-gray-700">Privacy</span>
        </div>
      </div>
    </footer>

    <!-- Logout Modal -->
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
import { ShoppingBagIcon, UserIcon, ChevronDownIcon, ArrowRightStartOnRectangleIcon } from '@heroicons/vue/24/outline'
import { useCartStore } from '~/stores/cart'
import { useRoute } from 'vue-router'
import { AuthService } from '~/api/auth/AuthService'
import ProductListing from '~/components/product/ProductListing.vue'

const cart = useCartStore()
const route = useRoute()
const authService = new AuthService()

const dropdownOpen = ref(false)
const showLogoutModal = ref(false)

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (!target.closest('.relative')) {
    dropdownOpen.value = false
  }
}

const openLogoutModal = () => {
  dropdownOpen.value = false
  showLogoutModal.value = true
}

const closeLogoutModal = () => {
  showLogoutModal.value = false
}

const confirmLogout = async () => {
  showLogoutModal.value = false
  await authService.logout()
  await navigateTo('/')
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.rotate-180 {
  transform: rotate(180deg);
}
</style>