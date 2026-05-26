<!-- layouts/customer.vue -->
<template>
  <div class="min-h-screen bg-gray-50">
    <header class="border-b border-gray-200 bg-white">
      <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <!-- Logo Link -->
        <NuxtLink to="/customer/" class="text-xl font-bold text-gray-900 hover:opacity-90">
          My Store
        </NuxtLink>

        <!-- Desktop Navigation -->
        <nav class="hidden items-center gap-6 text-sm font-medium md:flex">
          <div v-for="group in navigationGroups" :key="group.label" class="flex items-center gap-6">
            <NuxtLink
              v-for="item in group.items"
              :key="item.name"
              :to="item.href"
              :class="[
                route.path === item.href 
                  ? 'text-indigo-600' 
                  : 'text-gray-600 hover:text-indigo-600',
                'group flex items-center gap-x-1.5 py-2 text-sm font-medium transition-colors'
              ]"
            >
              <component :is="item.icon" class="size-4 shrink-0" aria-hidden="true" />
              {{ item.name }}
            </NuxtLink>
          </div>
        </nav>

        <!-- Cart Link Badge -->
        <NuxtLink 
          to="/customer/cart" 
          :class="[
            route.path === '/customer/cart' 
              ? 'bg-indigo-600 text-white border-indigo-600' 
              : 'text-gray-700 hover:bg-gray-50 border border-gray-300',
            'rounded-full px-4 py-2 text-sm font-medium transition-colors flex items-center gap-2'
          ]"
        >
          <span>Cart</span>
          <span v-if="totalItems > 0" class="inline-flex items-center rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-semibold text-indigo-800">
            {{ totalItems }}
          </span>
        </NuxtLink>
      </div>
    </header>

    <!-- Main Content Area -->
    <main class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <!-- Your pages inject exactly here -->
      <slot />
    </main>

    <footer class="border-t border-gray-200 bg-white">
      <div class="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-gray-500 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <p>© 2026 My Store. All rights reserved.</p>

        <nav class="flex items-center gap-6">
          <NuxtLink to="/help" class="hover:text-gray-900 transition-colors">Help</NuxtLink>
          <NuxtLink to="/contact" class="hover:text-gray-900 transition-colors">Contact</NuxtLink>
          <NuxtLink to="/privacy" class="hover:text-gray-900 transition-colors">Privacy</NuxtLink>
          <NuxtLink 
            to="/admin/settings"
            :class="[
              route.path === '/admin/settings' ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-900',
              'flex items-center gap-x-1.5 text-sm font-medium transition-colors'
            ]"
          >
            <Cog6ToothIcon class="size-4 shrink-0" aria-hidden="true" />
            Settings
          </NuxtLink>
        </nav>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useCart } from '~/composables/useCart'
import { 
  ShoppingBagIcon, 
  Squares2X2Icon, 
  ClipboardDocumentCheckIcon, 
  UserIcon,
  Cog6ToothIcon 
} from '@heroicons/vue/24/outline'

const route = useRoute()
const { totalItems } = useCart()

const navigationGroups = [
  {
    label: 'Explore',
    items: [
      { name: 'Shop', href: '/customer/shop', icon: ShoppingBagIcon },
      { name: 'Categories', href: '/customer/categories', icon: Squares2X2Icon }
    ]
  },
  {
    label: 'User Area',
    items: [
      { name: 'Orders', href: '/customer/orders', icon: ClipboardDocumentCheckIcon },
      { name: 'Account', href: '/customer/account', icon: UserIcon }
    ]
  }
]
</script>
