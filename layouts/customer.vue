<template>
  <div class="min-h-screen bg-gray-50">
    <header class="sticky top-0 z-40 border-b border-gray-200 bg-white/80 backdrop-blur-lg">
      <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <NuxtLink to="/customer/home" class="text-xl font-bold text-gray-900 transition hover:text-indigo-600">
          🛍️ My Store
        </NuxtLink>

        <div class="hidden items-center gap-8 text-sm font-medium text-gray-600 md:flex">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.href"
            :to="link.href"
            :class="[
              route.path === link.href
                ? 'text-indigo-600 border-b-2 border-indigo-600 pb-0.5'
                : 'hover:text-indigo-600 transition-colors',
            ]"
          >
            {{ link.label }}
          </NuxtLink>
        </div>

        <div class="flex items-center gap-4">
          <NuxtLink
            to="/customer/cart"
            class="relative rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-indigo-400 hover:text-indigo-600"
          >
            🛒 Cart
            <span
              v-if="cartCount > 0"
              class="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white"
            >
              {{ cartCount }}
            </span>
          </NuxtLink>

          <button
            @click="handleLogout"
            class="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-700"
          >
            Logout
          </button>
        </div>
      </div>

      <div class="flex items-center gap-4 overflow-x-auto border-t border-gray-100 px-4 py-2 text-sm md:hidden">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.href"
          :to="link.href"
          :class="[
            route.path === link.href
              ? 'text-indigo-600 font-semibold'
              : 'text-gray-500',
            'whitespace-nowrap',
          ]"
        >
          {{ link.label }}
        </NuxtLink>
      </div>
    </header>

    <main>
      <slot />
    </main>

    <footer class="border-t border-gray-200 bg-white">
      <div class="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-gray-500 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <p>&copy; 2026 My Store. All rights reserved.</p>
        <div class="flex gap-6">
          <span>Help</span>
          <span>Contact</span>
          <span>Privacy</span>
        </div>
      </div>
    </footer>

    <Transition
      enter-active-class="transition ease-out duration-300 transform"
      enter-from-class="translate-y-4 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition ease-in duration-200 transform"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-4 opacity-0"
    >
      <div
        v-if="toastMessage"
        class="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl bg-green-600 px-5 py-3 text-sm font-medium text-white shadow-lg"
      >
        <span>✅</span>
        <span>{{ toastMessage }}</span>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, provide } from 'vue'
import { useRoute } from 'vue-router'
import { AuthService } from '~/api/auth/AuthService'
import { useCart } from '~/composables/useCart'

const route = useRoute()
const { cartCount } = useCart()

const navLinks = [
  { label: 'Home', href: '/customer/home' },
  { label: 'Shop', href: '/customer/shop' },
  { label: 'Cart', href: '/customer/cart' },
  { label: 'Orders', href: '/customer/orders' },
]

const toastMessage = ref('')
let toastTimer = null

const showToast = (message) => {
  toastMessage.value = message
  if (toastTimer) clearTimeout(toastTimer)
  toastTimer = setTimeout(() => {
    toastMessage.value = ''
  }, 3000)
}

provide('showToast', showToast)

const authService = new AuthService()

const handleLogout = async () => {
  try {
    await authService.logout()
  } catch (err) {
    console.warn('Logout API failed (token may already be expired):', err)
  } finally {
    authService.clearToken()
    localStorage.removeItem('_role')
    localStorage.removeItem('_uuid')
    localStorage.removeItem('_customer_uuid')
    await navigateTo('/')
  }
}
</script>