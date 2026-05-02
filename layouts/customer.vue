<template>
  <div class="min-h-screen bg-gray-50">
    <header class="border-b border-gray-200 bg-white">
      <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <NuxtLink to="/shop" class="text-xl font-bold text-gray-900 hover:text-indigo-600">
          My Store
        </NuxtLink>

        <div class="hidden items-center gap-8 text-sm font-medium text-gray-600 md:flex">
          <NuxtLink to="/shop" class="hover:text-indigo-600 transition-colors">Shop</NuxtLink>
          <NuxtLink to="/categories" class="hover:text-indigo-600 transition-colors">Categories</NuxtLink>
          <NuxtLink to="/customer/order" class="hover:text-indigo-600 transition-colors">Orders</NuxtLink>
          <NuxtLink to="/account" class="hover:text-indigo-600 transition-colors">Account</NuxtLink>
        </div>

        <div class="flex items-center gap-4">
          <NuxtLink to="/cart" class="rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-indigo-300 transition-colors">
            Cart
          </NuxtLink>
          
          <!-- Creative Logout Button -->
          <button 
            @click="showLogoutModal = true" 
            class="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-red-600 to-red-700 px-5 py-2 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
            </svg>
            <span>Sign Out</span>
            <span class="absolute inset-0 -translate-x-full rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-0"></span>
          </button>
        </div>
      </div>
    </header>

    <main>
      <section class="bg-white">
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
                <NuxtLink to="/shop" class="rounded-md bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors">
                  Shop Now
                </NuxtLink>

                <NuxtLink to="/deals" class="rounded-md border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                  View Deals
                </NuxtLink>
              </div>
            </div>

            <div class="rounded-2xl bg-gray-200 p-8">
              <div class="aspect-[4/3] rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-16 w-16 text-indigo-400">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                </svg>
              </div>
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
          <NuxtLink to="/help" class="hover:text-indigo-600 transition-colors">Help</NuxtLink>
          <NuxtLink to="/contact" class="hover:text-indigo-600 transition-colors">Contact</NuxtLink>
          <NuxtLink to="/privacy" class="hover:text-indigo-600 transition-colors">Privacy</NuxtLink>
        </div>
      </div>
    </footer>

    <!-- Stylish Logout Confirmation Modal -->
    <div v-if="showLogoutModal" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex min-h-screen items-center justify-center p-4">
        <div class="fixed inset-0 bg-gray-900/70 backdrop-blur-sm transition-opacity" @click="showLogoutModal = false"></div>
        
        <div class="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all">
          <div class="relative">
            <!-- Decorative top bar -->
            <div class="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-red-500 to-red-600"></div>
            
            <div class="p-6 text-center">
              <!-- Animated icon -->
              <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 animate-pulse">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-8 w-8 text-red-600 animate-bounce">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                </svg>
              </div>
              
              <h3 class="mt-4 text-xl font-bold text-gray-900">Ready to leave?</h3>
              <p class="mt-2 text-sm text-gray-500">
                You're about to sign out of your account. 
                <span class="block text-xs text-gray-400 mt-1">We'll miss you! 👋</span>
              </p>
              
              <div class="mt-6 flex gap-3">
                <button 
                  @click="showLogoutModal = false" 
                  class="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50 hover:border-gray-400"
                >
                  Stay
                </button>
                <button 
                  @click="confirmLogout" 
                  class="flex-1 rounded-lg bg-gradient-to-r from-red-600 to-red-700 px-4 py-2.5 text-sm font-medium text-white shadow-md transition-all hover:scale-105 hover:shadow-lg hover:from-red-700 hover:to-red-800"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { AuthService } from '~/api/auth/AuthService'

const authService = new AuthService()
const showLogoutModal = ref(false)

const handleLogout = async () => {
  try {
    await authService.logout();
    window.location.href = '/';
  } catch (error) {
    console.error('Logout error:', error);
    window.location.href = '/';
  }
}

const confirmLogout = async () => {
  showLogoutModal.value = false;
  await handleLogout();
}
</script>

<style scoped>
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.animate-bounce {
  animation: bounce 0.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.05); }
}

.animate-pulse {
  animation: pulse 1.5s ease-in-out infinite;
}
</style>