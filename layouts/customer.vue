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
          <!-- Cart Icon -->
          <NuxtLink to="/cart" class="relative p-2 text-gray-600 hover:text-gray-900">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
          </NuxtLink>

          <!-- Profile Dropdown - Same as admin layout -->
          <Menu as="div" class="relative">
            <MenuButton class="relative flex items-center">
              <span class="absolute -inset-1.5"></span>
              <span class="sr-only">Open user menu</span>
              <img class="size-8 rounded-full bg-gray-50 outline outline-1 -outline-offset-1 outline-black/5" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
              <span class="hidden lg:flex lg:items-center">
                <span class="ml-4 text-sm/6 font-semibold text-gray-900">Tom Cook</span>
                <ChevronDownIcon class="ml-2 size-5 text-gray-400" />
              </span>
            </MenuButton>
            <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
              <MenuItems class="absolute right-0 z-10 mt-2.5 w-40 origin-top-right rounded-md bg-white py-2 shadow-lg outline outline-1 outline-gray-900/5">
                <MenuItem v-for="item in userNavigation" :key="item.name" v-slot="{ active }">
                  <button 
                    @click="handleUserAction(item)"
                    :class="[active ? 'bg-gray-50' : '', 'block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50']"
                  >
                    {{ item.name }}
                  </button>
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </div>
    </header>

    <main>
      <section class="bg-white">
        <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div class="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <p class="text-sm font-semibold uppercase tracking-wide text-indigo-600">
                NEW ARRIVALS
              </p>
              <h1 class="mt-3 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Shop quality products made for everyday use.
              </h1>
              <p class="mt-5 max-w-xl text-base text-gray-600">
                Browse featured products, discover new items, and enjoy a simple shopping experience.
              </p>
              <div class="mt-8 flex gap-3">
                <NuxtLink to="/shop" class="rounded-md bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700">
                  Shop Now
                </NuxtLink>
                <NuxtLink to="/deals" class="rounded-md border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50">
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
          <NuxtLink to="/help" class="hover:text-indigo-600">Help</NuxtLink>
          <NuxtLink to="/contact" class="hover:text-indigo-600">Contact</NuxtLink>
          <NuxtLink to="/privacy" class="hover:text-indigo-600">Privacy</NuxtLink>
        </div>
      </div>
    </footer>

    <!-- Logout Confirmation Modal -->
    <div v-if="showLogoutModal" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex min-h-screen items-center justify-center p-4">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="showLogoutModal = false"></div>
        <div class="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6">
          <div class="text-center">
            <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <svg class="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M6 5h12M5 5v14a2 2 0 002 2h10a2 2 0 002-2V5M9 5v14m6-14v14" />
              </svg>
            </div>
            <h3 class="mt-4 text-lg font-medium text-gray-900">Sign out</h3>
            <p class="mt-2 text-sm text-gray-500">Are you sure you want to sign out of your account?</p>
            <div class="mt-6 flex justify-end gap-3">
              <button @click="showLogoutModal = false" class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
                Cancel
              </button>
              <button @click="confirmLogout" class="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700">
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
import { AuthService } from '~/api/auth/AuthService'

const authService = new AuthService()
const showLogoutModal = ref(false)

const userNavigation = [
  { name: 'Your profile', href: '#' },
  { name: 'Sign out', href: '#', action: 'logout' },
]

const handleLogout = async () => {
  try {
    await authService.logout();
    window.location.href = '/';
  } catch (error) {
    console.error('Logout error:', error);
    window.location.href = '/';
  }
}

const handleUserAction = async (item) => {
  if (item.action === 'logout') {
    showLogoutModal.value = true;
  }
}

const confirmLogout = async () => {
  showLogoutModal.value = false;
  await handleLogout();
}
</script>