<template>
  <div class="min-h-screen bg-gray-50 flex">
    <aside class="w-72 bg-[#1e2538] p-6 flex flex-col text-white fixed h-full">
      <h1 class="text-xl font-bold mb-10 tracking-tight">SmartPark</h1>
      <nav class="flex-1 space-y-2">
        <NuxtLink v-for="item in navigation" :key="item.name" :to="item.href"
          class="flex items-center gap-3 p-3 rounded-lg transition relative"
          :class="route.path === item.href ? 'bg-[#2b354e]' : 'hover:bg-[#252e44]'">
          <component :is="item.icon" class="size-6" />
          {{ item.name }}
        </NuxtLink>
      </nav>
    </aside>

    <div class="flex-1 ml-72">
      <header class="h-16 bg-white border-b flex items-center justify-end px-8">
        <div class="flex items-center gap-6">
          <!-- Cart Icon with Badge -->
          <NuxtLink to="/customer/Cart" class="relative hover:opacity-80 transition-opacity">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span v-if="cartStore.totalItems > 0" 
                  class="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {{ cartStore.totalItems }}
            </span>
          </NuxtLink>

          <!-- User Profile Dropdown -->
          <div class="relative">
            <button 
              @click="toggleDropdown"
              class="flex items-center gap-3 hover:opacity-80 transition-opacity focus:outline-none">
              <span class="font-semibold text-gray-700">{{ user?.name || 'Guest' }}</span>
              <img :src="`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'Guest')}`" class="size-8 rounded-full" />
            </button>

            <!-- Dropdown Menu -->
            <Transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95">
              <div 
                v-if="isDropdownOpen"
                class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                <button 
                  @click="handleLogout"
                  class="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clip-rule="evenodd" />
                  </svg>
                  Log Out
                </button>
              </div>
            </Transition>
          </div>
        </div>
      </header>
      <main class="p-8">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import { HomeIcon, ShoppingBagIcon } from '@heroicons/vue/24/outline'
import { useAuthStore } from '~/stores/auth' 
import { useCartStore } from '~/stores/cart'
import { AuthService } from '~/api/auth/AuthService'

const route = useRoute()
const authStore = useAuthStore() 
const cartStore = useCartStore()
const authService = new AuthService()

// Dropdown state
const isDropdownOpen = ref(false)

// Load user data from localStorage on mount
onMounted(() => {
  authStore.loadUser()
  
  // Close dropdown when clicking outside
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

const user = computed(() => authStore.currentUser)

const navigation = [
  { name: 'Dashboard', href: '/customer/Dashboard', icon: HomeIcon },
  { name: 'Shop', href: '/customer/Order', icon: ShoppingBagIcon },
]

// Dropdown functions
const toggleDropdown = (event) => {
  event.stopPropagation()
  isDropdownOpen.value = !isDropdownOpen.value
}

const closeDropdown = () => {
  isDropdownOpen.value = false
}

const handleClickOutside = (event) => {
  const dropdown = event.target.closest('.relative')
  if (!dropdown) {
    isDropdownOpen.value = false
  }
}

// Logout function
const handleLogout = async () => {
  try {
    await authService.logout()
  } catch (error) {
    console.error('Logout error:', error)
  } finally {
    // Clear auth data
    authStore.clearUser()
    localStorage.removeItem('_token')
    localStorage.removeItem('_uuid')
    localStorage.removeItem('_role')
    
    // Redirect to login
    await navigateTo('/')
  }
}
</script>