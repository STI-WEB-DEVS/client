<template>
  <div>
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog class="relative z-50 lg:hidden" @close="sidebarOpen = false">
  
        <TransitionChild
          as="template"
          enter="transition-opacity ease-linear duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-gray-900/80" />
        </TransitionChild>
  
        <div class="fixed inset-0 flex">
  
          <TransitionChild
            as="template"
            enter="transition ease-in-out duration-300 transform"
            enter-from="-translate-x-full"
            enter-to="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leave-from="translate-x-0"
            leave-to="-translate-x-full"
          >
            <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
  
              <TransitionChild
                as="template"
                enter="ease-in-out duration-300"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="ease-in-out duration-300"
                leave-from="opacity-100"
                leave-to="opacity-0"
              >
                <div class="absolute left-full top-0 flex w-16 justify-center pt-5">
                  <button
                    type="button"
                    class="-m-2.5 p-2.5"
                    @click="sidebarOpen = false"
                  >
                    <XMarkIcon class="size-6 text-white" />
                  </button>
                </div>
              </TransitionChild>
  
              <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-indigo-700 px-6 pb-4">
  
                <div class="flex h-16 items-center">
                  <h1 class="text-xl font-bold text-white">
                    My Store
                  </h1>
                </div>
  
                <nav class="flex flex-1 flex-col">
                  <ul class="space-y-2">
  
                    <li
                      v-for="item in navigation"
                      :key="item.name"
                    >
                      <NuxtLink
                        :to="item.href"
                        :class="[
                          route.path === item.href
                            ? 'bg-white/10 text-white'
                            : 'text-indigo-100 hover:bg-white/10 hover:text-white',
                          'group flex items-center gap-x-3 rounded-md p-3 text-sm font-semibold transition'
                        ]"
                      >
                        <component
                          :is="item.icon"
                          class="size-5 shrink-0"
                        />
  
                        {{ item.name }}
                      </NuxtLink>
                    </li>
  
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>
  
    <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
  
      <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-indigo-700 px-6 pb-4">
  
        <div class="flex h-16 items-center">
          <h1 class="text-xl font-bold text-white">
            My Store
          </h1>
        </div>
  
        <nav class="flex flex-1 flex-col">
          <ul class="space-y-2">
  
            <li
              v-for="item in navigation"
              :key="item.name"
            >
              <NuxtLink
                :to="item.href"
                :class="[
                  route.path === item.href
                    ? 'bg-white/10 text-white'
                    : 'text-indigo-100 hover:bg-white/10 hover:text-white',
                  'group flex items-center gap-x-3 rounded-md p-3 text-sm font-semibold transition'
                ]"
              >
                <component
                  :is="item.icon"
                  class="size-5 shrink-0"
                />
  
                {{ item.name }}
              </NuxtLink>
            </li>
  
          </ul>
        </nav>
      </div>
    </div>
  
    <div class="lg:pl-72">
  
      <div class="sticky top-0 z-40 flex h-16 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:px-6 lg:px-8">
  
        <button
          type="button"
          class="-m-2.5 p-2.5 text-gray-700 lg:hidden"
          @click="sidebarOpen = true"
        >
          <Bars3Icon class="size-6" />
        </button>
  
        <div class="h-6 w-px bg-gray-200 lg:hidden" />
  
        <div class="flex flex-1">
  
          <div class="relative w-full max-w-md">
  
            <MagnifyingGlassIcon
              class="absolute left-3 top-3 size-5 text-gray-400"
            />
  
            <input
              type="text"
              placeholder="Search products..."
              class="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-indigo-500 focus:outline-none"
            />
          </div>
        </div>
  
        <div class="flex items-center gap-x-4">
  
          <Menu as="div" class="relative">
            <MenuButton class="relative flex p-1 rounded-full text-gray-600 hover:text-indigo-600 focus:outline-none">
              <ShoppingCartIcon class="size-6" />
              <span class="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                {{ cartItems.length }}
              </span>
            </MenuButton>

            <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <MenuItems class="absolute right-0 z-50 mt-2 w-80 rounded-md bg-white shadow-lg ring-1 ring-black/5 divide-y divide-gray-100 focus:outline-none">
                <div class="px-4 py-3">
                  <p class="text-sm font-semibold text-gray-900">Shopping Cart</p>
                </div>

                <div class="max-h-60 overflow-y-auto p-2 space-y-2">
                  <div v-if="cartItems.length === 0" class="text-center py-6 text-sm text-gray-500">
                    Your cart is empty
                  </div>
                  
                  <MenuItem 
                    v-for="item in cartItems" 
                    :key="item.id"
                    v-slot="{ active }"
                  >
                    <div :class="[active ? 'bg-gray-50' : '', 'flex items-center gap-x-3 p-2 rounded-md transition']">
                      <img :src="item.image" :alt="item.name" class="size-10 rounded object-cover bg-gray-100" />
                      <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium text-gray-900 truncate">{{ item.name }}</p>
                        <p class="text-xs text-gray-500">Qty: {{ item.quantity }}</p>
                      </div>
                      <p class="text-sm font-semibold text-gray-900">${{ item.price }}</p>
                    </div>
                  </MenuItem>
                </div>

                <div v-if="cartItems.length > 0" class="p-4 bg-gray-50 rounded-b-md">
                  <div class="flex justify-between text-base font-semibold text-gray-900 mb-4">
                    <span>Total</span>
                    <span>${{ cartTotal }}</span>
                  </div>
                  <button 
                    @click="handleOrder" 
                    class="w-full flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition"
                  >
                    Place Order
                  </button>
                </div>
              </MenuItems>
            </transition>
          </Menu>
  
          <button class="text-gray-500 hover:text-gray-700">
            <BellIcon class="size-6" />
          </button>
  
          <Menu as="div" class="relative">
  
            <MenuButton class="flex items-center gap-x-3">
              <img
                class="size-8 rounded-full object-cover"
                src="https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2558760599.jpg"
                alt=""
              />
  
              <span class="hidden text-sm font-semibold text-gray-900 lg:block">
                Customer
              </span>
  
              <ChevronDownIcon class="size-5 text-gray-400" />
            </MenuButton>
  
            <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
  
              <MenuItems class="absolute right-0 z-10 mt-2 w-40 rounded-md bg-white py-2 shadow-lg ring-1 ring-black/5">
  
                <MenuItem
                  v-for="item in userNavigation"
                  :key="item.name"
                  v-slot="{ active }"
                >
                  <NuxtLink
                    :to="item.href"
                    :class="[
                      active ? 'bg-gray-100' : '',
                      'block px-4 py-2 text-sm text-gray-700'
                    ]"
                  >
                    {{ item.name }}
                  </NuxtLink>
                </MenuItem>
  
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </div>
  
      <main class="py-8">
        <div class="px-4 sm:px-6 lg:px-8">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>
  
<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
  
import {
  Dialog,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
  
import {
  Bars3Icon,
  BellIcon,
  HomeIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  UserCircleIcon,
  TagIcon,
  CubeIcon,
  XMarkIcon,
} from '@heroicons/vue/24/outline'
  
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from '@heroicons/vue/20/solid'
  
import { useRoute } from 'vue-router'
  
const route = useRoute()
const sidebarOpen = ref(false)

// 1. Core Reactive Cart State (Starts empty so display defaults to 0)
const cartItems = ref([])

// 2. Load and Sync Cart Function
const updateCartFromStorage = () => {
  if (typeof window !== 'undefined') {
    const localCartData = localStorage.getItem('shopping-cart')
    cartItems.value = localCartData ? JSON.parse(localCartData) : []
  }
}

// 3. Lifecycle hooks to listen for the "cart-updated" event from the product page
onMounted(() => {
  // Initial load when layout mounts
  updateCartFromStorage()

  // Listen for the custom window event sent by the product page
  if (typeof window !== 'undefined') {
    window.addEventListener('cart-updated', updateCartFromStorage)
  }
})

onBeforeUnmount(() => {
  // Clean up the event listener to avoid memory leaks
  if (typeof window !== 'undefined') {
    window.removeEventListener('cart-updated', updateCartFromStorage)
  }
})

// Calculate Cart Total dynamically
const cartTotal = computed(() => {
  return cartItems.value.reduce((total, item) => total + (Number(item.price) * item.quantity), 0).toFixed(2)
})

const handleOrder = () => {
  alert('Order placed successfully!')
  // Clear cart out of storage and update layout state
  localStorage.removeItem('shopping-cart')
  updateCartFromStorage()
}
  
const navigation = [
  {
    name: 'Home',
    href: '',
    icon: HomeIcon,
  },
  {
    name: 'Shop',
    href: '/customer/shops',
    icon: ShoppingBagIcon,
  },
  {
    name: 'Categories',
    href: '/categories',
    icon: TagIcon,
  },
  {
    name: 'Products',
    href: '/products',
    icon: CubeIcon,
  },
]
  
const userNavigation = [
  {
    name: 'Profile',
    href: '/profile',
  },
  {
    name: 'Orders',
    href: '/orders',
  },
  {
    name: 'Logout',
    href: '/',
  },
]
</script>