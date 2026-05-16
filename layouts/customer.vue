<!-- layouts/customer.vue -->

<template>
  <div class="min-h-screen bg-gray-50">
    <header class="border-b border-gray-200 bg-white">
      <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <NuxtLink to="/customer/order" class="text-xl font-bold text-gray-900">
          My Store
        </NuxtLink>

        <div class="hidden items-center gap-8 text-sm font-medium text-gray-600 md:flex">
          <NuxtLink to="/customer/catalog" class="transition hover:text-indigo-600">Shop</NuxtLink>
          <NuxtLink to="/customer/catalog" class="transition hover:text-indigo-600">Categories</NuxtLink>
          <NuxtLink to="/customer/order" class="transition hover:text-indigo-600">Orders</NuxtLink>
          <span class="cursor-pointer transition hover:text-indigo-600">Account</span>
        </div>

        <div class="flex items-center gap-3">
          <NuxtLink
            to="/customer/cart"
            class="relative rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            Cart
            <span
              v-if="itemCount > 0"
              class="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white"
            >
              {{ itemCount }}
            </span>
          </NuxtLink>

          <button
            type="button"
            :disabled="isSigningOut"
            @click="handleSignOut"
            class="rounded-full border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-50"
          >
            {{ isSigningOut ? 'Signing out...' : 'Sign Out' }}
          </button>
        </div>
      </div>
    </header>

    <main>
      <!-- Hero section — only shown on the home/order page -->
      <section v-if="isHome" class="bg-white">
        <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div class="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <p class="text-sm font-semibold uppercase tracking-wide text-indigo-600">
                New arrivals
              </p>

              <h1 class="mt-3 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Shop quality products made for everyday use.
              </h1>

              <p class="mt-5 max-w-xl text-base text-gray-600">
                Browse featured products, discover new items, and enjoy a simple shopping experience.
              </p>

              <div class="mt-8 flex gap-3">
                <NuxtLink
                  to="/customer/catalog"
                  class="rounded-md bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
                >
                  Shop Now
                </NuxtLink>

                <NuxtLink
                  to="/customer/cart"
                  class="rounded-md border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                >
                  View Cart
                </NuxtLink>
              </div>
            </div>

            <div class="rounded-2xl bg-gray-200 p-8">
              <img
                src="https://contents.pep.ph/images2/inset/1465915687-Jose-Manalo-fall.jpg"
                alt="jose"
                class="aspect-[4/3] w-full rounded-xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <slot />
      </section>
    </main>

    <footer class="border-t border-gray-200 bg-white">
      <div class="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-gray-500 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <p>© 2026 My Store. All rights reserved.</p>

        <div class="flex gap-6">
          <span class="cursor-pointer hover:text-gray-900">Help</span>
          <span class="cursor-pointer hover:text-gray-900">Contact</span>
          <span class="cursor-pointer hover:text-gray-900">Privacy</span>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useCart } from '~/composables/useCart'
import { AuthService } from '~/api/auth/AuthService'

const route = useRoute()
const { itemCount } = useCart()
const isSigningOut = ref(false)
const authService = new AuthService()

const isHome = computed(() => route.path === '/customer/order')

const handleSignOut = async () => {
  isSigningOut.value = true
  try {
    await authService.logout()
    await navigateTo('/')
  } catch (err) {
    console.error('Sign out failed:', err)
  } finally {
    isSigningOut.value = false
  }
}
</script>