<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useCart } from '~/composables/useCart'
import { useRouter } from 'vue-router'

const { cart } = useCart()
const cartCount = computed(() => cart.value.reduce((sum, item) => sum + item.quantity, 0))

const isLoggingOut = ref(false)
const isDropdownOpen = ref(false) // State for dropdown visibility
const router = useRouter()

// Close dropdown when clicking outside
const closeDropdown = (e) => {
  if (!e.target.closest('#user-menu-button')) {
    isDropdownOpen.ref = false
  }
}

onMounted(() => window.addEventListener('click', closeDropdown))
onUnmounted(() => window.removeEventListener('click', closeDropdown))

const handleLogout = async () => {
  isLoggingOut.value = true
  localStorage.removeItem('_token')
  localStorage.removeItem('_role') 
  localStorage.removeItem('_uuid')
  await router.push('/')
  isLoggingOut.value = false
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <header class="border-b border-gray-200 bg-white">
      <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        
        <NuxtLink to="/customer" class="text-xl font-bold text-gray-900">My Store</NuxtLink>

        <!-- Navigation Links -->
        <div class="hidden items-center gap-8 text-sm font-medium text-gray-600 md:flex">
          <NuxtLink to="/customer/shop" class="hover:text-indigo-600 transition-colors">Shop</NuxtLink>
          <NuxtLink to="/customer/categories" class="hover:text-indigo-600 transition-colors">Categories</NuxtLink>
          <NuxtLink to="/customer/order" class="hover:text-indigo-600 transition-colors">Orders</NuxtLink>
          <NuxtLink to="/customer/account" class="hover:text-indigo-600 transition-colors">Account</NuxtLink>
        </div>

        <div class="flex items-center gap-4">
          <!-- Cart Icon Button -->
          <NuxtLink to="/customer/cart" class="relative p-2 text-gray-400 hover:text-gray-500">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
            <span v-if="cartCount > 0" class="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-[10px] text-white">
              {{ cartCount }}
            </span>
          </NuxtLink>

          <!-- User Profile Dropdown -->
          <div class="relative ml-3">
            <div>
              <button 
                type="button" 
                @click.stop="isDropdownOpen = !isDropdownOpen"
                class="relative flex items-center gap-2 rounded-full bg-white text-sm focus:outline-none" 
                id="user-menu-button"
              >
                <img class="h-8 w-8 rounded-full object-cover" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="User Profile" />
                <span class="hidden text-sm font-semibold text-gray-700 lg:block">Tom Cook</span>
                <svg class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            <!-- Dropdown Menu -->
            <div 
              v-if="isDropdownOpen"
              class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <NuxtLink to="/customer/account" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Account</NuxtLink>
              <button 
                @click="handleLogout" 
                class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>

    <main class="flex-grow">
      <slot />
    </main>
    <!-- Footer remains the same -->
  </div>
</template>