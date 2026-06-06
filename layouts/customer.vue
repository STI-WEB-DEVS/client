<template>
  <div class="min-h-screen bg-gray-50">
    <header class="border-b border-gray-200 bg-white">
      <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <NuxtLink to="/customer" class="text-xl font-bold text-gray-900">
          My Store
        </NuxtLink>
        <div class="hidden items-center gap-8 text-sm font-medium text-gray-600 md:flex">
          <NuxtLink v-for="item in navigation" :key="item.name" :to="item.href" class="hover:text-indigo-600">
            {{ item.name }}
          </NuxtLink>
        </div>
        <div class="flex items-center gap-4">
          <NuxtLink to="/customer/cart" class="relative rounded-full p-2 text-gray-600 hover:bg-gray-100 hover:text-indigo-600">
            <span class="sr-only">Cart</span>
            <ShoppingCartIcon class="size-6" aria-hidden="true" />
            <span v-if="cartCount" class="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
              {{ cartCount }}
            </span>
          </NuxtLink>

          <Menu as="div" class="relative">
            <MenuButton class="relative flex items-center">
              <span class="absolute -inset-1.5"></span>
              <span class="sr-only">Open user menu</span>
              <UserCircleIcon class="size-8 text-gray-500" aria-hidden="true" />
              <span class="hidden sm:flex sm:items-center">
                <span class="ml-2 text-sm font-semibold text-gray-900">Customer</span>
                <ChevronDownIcon class="ml-1 size-5 text-gray-400" aria-hidden="true" />
              </span>
            </MenuButton>
            <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform scale-100" leave-to-class="transform opacity-0 scale-95">
              <MenuItems class="absolute right-0 z-10 mt-2.5 w-36 origin-top-right rounded-md bg-white py-2 shadow-lg outline outline-1 outline-gray-900/5">
                <MenuItem v-for="item in userNavigation" :key="item.name" v-slot="{ active }">
                  <button v-if="item.action === 'logout'" type="button" :class="[active ? 'bg-gray-50 outline-none' : '', 'block w-full px-3 py-1 text-left text-sm/6 text-gray-900']" @click="handleLogout">
                    {{ item.name }}
                  </button>
                  <NuxtLink v-else :to="item.href" :class="[active ? 'bg-gray-50 outline-none' : '', 'block px-3 py-1 text-sm/6 text-gray-900']">
                    {{ item.name }}
                  </NuxtLink>
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </div>
    </header>

    <main>
      <section v-if="route.path === '/customer'" class="bg-white">
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
                <NuxtLink to="/customer/products" class="rounded-md bg-indigo-600 px-5 py-3 text-sm font-semibold text-white">
                  Shop Now
                </NuxtLink>
                <NuxtLink to="/customer/products" class="rounded-md border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700">
                  View Deals
                </NuxtLink>
              </div>
            </div>
            <div class="rounded-2xl bg-gray-200 p-8">
              <div class="aspect-[4/3] rounded-xl bg-gray-300" />
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
          <span>Help</span>
          <span>Contact</span>
          <span>Privacy</span>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { AuthService } from '~/api/auth/AuthService'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { ShoppingCartIcon, UserCircleIcon } from '@heroicons/vue/24/outline'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
import { useRoute } from 'vue-router'

const authService = new AuthService()
const { count: cartCount, readCart } = useCustomerCart()
const route = useRoute()

const navigation = [
  { name: 'Shop', href: '/customer/products' },
  { name: 'Categories', href: '/customer/products' },
  { name: 'Orders', href: '/customer/orders' },
  { name: 'Account', href: '/customer/profile' },
]

const userNavigation = [
  { name: 'Your profile', href: '/customer/profile' },
  { name: 'Sign out', href: '/', action: 'logout' },
]

const clearLocalAuth = () => {
  localStorage.clear()
  sessionStorage.clear()
}

const handleLogout = async () => {
  try {
    await authService.logout()
    clearLocalAuth()
    await navigateTo('/')
  } catch (error) {
    console.warn('Logout request failed. Local session was not cleared.', error)
  }
}

onMounted(() => {
  readCart()
  window.addEventListener('customer-cart-updated', readCart)
})

onBeforeUnmount(() => {
  window.removeEventListener('customer-cart-updated', readCart)
})
</script>
