<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navbar -->
    <header class="sticky top-0 z-30 border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <!-- Logo -->
        <NuxtLink to="/customer/shop" class="flex items-center gap-2 text-xl font-extrabold text-gray-900 tracking-tight">
          <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
            <svg class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          My Store
        </NuxtLink>

        <!-- Desktop nav -->
        <nav class="hidden items-center gap-6 text-sm font-medium text-gray-600 md:flex">
          <NuxtLink
            to="/customer/shop"
            class="transition hover:text-gray-900"
            :class="$route.path.startsWith('/customer/shop') ? 'text-indigo-600 font-semibold' : ''"
          >
            Shop
          </NuxtLink>
          <NuxtLink
            to="/customer/Order"
            class="transition hover:text-gray-900"
            :class="$route.path.startsWith('/customer/Order') ? 'text-indigo-600 font-semibold' : ''"
          >
            My Orders
          </NuxtLink>
        </nav>

        <!-- Right side: Cart + User menu -->
        <div class="flex items-center gap-3">
          <!-- Cart button -->
          <NuxtLink
            id="open-cart-btn"
            to="/customer/cart"
            class="relative flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 hover:shadow-md"
            :class="$route.path === '/customer/cart' ? 'border-indigo-200 bg-indigo-50 text-indigo-700' : ''"
          >
            <svg class="h-5 w-5" :class="$route.path === '/customer/cart' ? 'text-indigo-600' : 'text-gray-600'" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span class="hidden sm:inline">Cart</span>

            <!-- Badge -->
            <transition name="badge-pop">
              <span
                v-if="cartCount > 0"
                class="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-indigo-600 px-1 text-xs font-bold text-white shadow"
              >
                {{ cartCount > 99 ? '99+' : cartCount }}
              </span>
            </transition>
          </NuxtLink>

          <!-- User dropdown -->
          <div class="relative" ref="userMenuRef">
            <button
              id="user-menu-btn"
              @click="userMenuOpen = !userMenuOpen"
              class="flex items-center gap-2 rounded-full border border-gray-200 bg-white py-1.5 pl-2 pr-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 hover:shadow-md"
            >
              <!-- Avatar initials -->
              <div class="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
                {{ userInitial }}
              </div>
              <span class="hidden sm:inline max-w-[100px] truncate">{{ userLabel }}</span>
              <svg
                class="h-4 w-4 text-gray-400 transition-transform duration-200"
                :class="userMenuOpen ? 'rotate-180' : ''"
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <!-- Dropdown panel -->
            <transition name="dropdown">
              <div
                v-if="userMenuOpen"
                class="absolute right-0 mt-2 w-52 rounded-xl border border-gray-100 bg-white py-1.5 shadow-xl"
              >
                <!-- User info header -->
                <div class="border-b border-gray-100 px-4 py-2.5">
                  <p class="text-xs font-semibold text-gray-500 uppercase tracking-wide">Signed in as</p>
                  <p class="mt-0.5 truncate text-sm font-semibold text-gray-900">{{ userLabel }}</p>
                </div>

                <!-- Sign out -->
                <button
                  id="customer-sign-out-btn"
                  @click="handleSignOut"
                  :disabled="signingOut"
                  class="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                >
                  <svg
                    v-if="signingOut"
                    class="h-4 w-4 animate-spin"
                    fill="none" viewBox="0 0 24 24"
                  >
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                  </svg>
                  <svg v-else class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  {{ signingOut ? 'Signing out…' : 'Sign out' }}
                </button>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </header>

    <!-- Page content -->
    <main>
      <slot />
    </main>

    <!-- Footer -->
    <footer class="mt-16 border-t border-gray-200 bg-white">
      <div class="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-gray-500 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <p>© 2026 My Store. All rights reserved.</p>
        <div class="flex gap-6">
          <span class="cursor-pointer transition hover:text-gray-700">Help</span>
          <span class="cursor-pointer transition hover:text-gray-700">Contact</span>
          <span class="cursor-pointer transition hover:text-gray-700">Privacy</span>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useCart } from '~/composables/useCart'
import { AuthService } from '~/api/auth/AuthService'

const { cartCount, clearCart } = useCart()
const authService = new AuthService()

// ── User menu ─────────────────────────────────────────
const userMenuOpen = ref(false)
const userMenuRef = ref<HTMLElement | null>(null)
const signingOut = ref(false)

const userName = computed(() => {
  if (process.client) return localStorage.getItem('_name') || ''
  return ''
})

const userUuid = computed(() => {
  if (process.client) return localStorage.getItem('_uuid') || ''
  return ''
})

const userInitial = computed(() => userName.value.charAt(0).toUpperCase() || userUuid.value.charAt(0).toUpperCase() || 'U')
const userLabel = computed(() => {
  if (userName.value) return userName.value
  const uuid = userUuid.value
  return uuid ? `${uuid.slice(0, 8)}…` : 'Customer'
})

// Close dropdown when clicking outside
const onClickOutside = (e: MouseEvent) => {
  if (userMenuRef.value && !userMenuRef.value.contains(e.target as Node)) {
    userMenuOpen.value = false
  }
}
onMounted(() => document.addEventListener('mousedown', onClickOutside))
onUnmounted(() => document.removeEventListener('mousedown', onClickOutside))

// ── Sign out ──────────────────────────────────────────
const handleSignOut = async () => {
  signingOut.value = true
  try {
    await authService.logout()
  } catch {
    // ignore — still clear local state below
  } finally {
    clearCart()
    localStorage.removeItem('_token')
    localStorage.removeItem('_uuid')
    localStorage.removeItem('_role')
    localStorage.removeItem('_name')
    localStorage.removeItem('_email')
    await navigateTo('/')
  }
}
</script>

<style scoped>
.badge-pop-enter-active,
.badge-pop-leave-active {
  transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.badge-pop-enter-from,
.badge-pop-leave-to {
  transform: scale(0);
  opacity: 0;
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
}
.dropdown-enter-from,
.dropdown-leave-to {
  transform: translateY(-6px) scale(0.97);
  opacity: 0;
}
</style>
