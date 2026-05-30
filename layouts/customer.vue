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
                  <button type="button" class="-m-2.5 p-2.5" @click="sidebarOpen = false">
                    <span class="sr-only">Close sidebar</span>
                    <XMarkIcon class="size-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </TransitionChild>

              <div class="relative flex grow flex-col gap-y-5 overflow-y-auto bg-green-900 px-6 pb-4 ring-1 ring-white/10">
                <div class="flex h-16 shrink-0 items-center">
                  <h1 class="ml-5 text-sm text-white">Event Management System</h1>
                </div>
                <nav class="flex flex-1 flex-col">
                  <ul role="list" class="-mx-2 space-y-1">
                    <li v-for="item in navigation" :key="item.name">
                      <NuxtLink
                        :to="item.href"
                        :class="[
                          route.path === item.href
                            ? 'bg-white/5 text-white'
                            : 'text-gray-400 hover:bg-white/5 hover:text-white',
                          'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold'
                        ]"
                      >
                        <component :is="item.icon" class="size-6 shrink-0" aria-hidden="true" />
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

    <div class="hidden bg-green-900 ring-1 ring-white/10 lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-black/10 px-6 pb-4">
        <div class="flex h-16 shrink-0 items-center">
          <h1 class="ml-5 text-sm text-white">Event Management System</h1>
        </div>
        <nav class="flex flex-1 flex-col">
          <ul role="list" class="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" class="-mx-2 space-y-1">
                <li v-for="item in navigation" :key="item.name">
                  <NuxtLink
                    :to="item.href"
                    :class="[
                      route.path === item.href
                        ? 'bg-white/5 text-white'
                        : 'text-gray-400 hover:bg-white/5 hover:text-white',
                      'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold'
                    ]"
                  >
                    <component :is="item.icon" class="size-6 shrink-0" aria-hidden="true" />
                    {{ item.name }}
                  </NuxtLink>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <div class="lg:pl-72">
      <div class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
        <button type="button" class="-m-2.5 p-2.5 text-gray-700 hover:text-gray-900 lg:hidden" @click="sidebarOpen = true">
          <span class="sr-only">Open sidebar</span>
          <Bars3Icon class="size-6" aria-hidden="true" />
        </button>

        <div class="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true"></div>

        <!-- Search bar -->
        <div class="flex flex-1">
          <div class="relative w-full max-w-md">
            <MagnifyingGlassIcon class="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-gray-400" aria-hidden="true" />
            <input
              type="text"
              placeholder="Search products..."
              class="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600"
            />
          </div>
        </div>

        <div class="flex items-center gap-x-4 lg:gap-x-6">

          <!-- Cart dropdown -->
          <Menu as="div" class="relative">
            <MenuButton class="relative -m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
              <span class="sr-only">View cart</span>
              <ShoppingCartIcon class="size-6" aria-hidden="true" />
              <span class="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-semibold text-white">
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
              <MenuItems class="absolute right-0 z-50 mt-2 w-80 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                <div class="px-4 py-3">
                  <p class="text-sm font-semibold text-gray-900">Shopping Cart</p>
                </div>

                <div class="max-h-60 space-y-2 overflow-y-auto p-2">
                  <div v-if="cartItems.length === 0" class="py-6 text-center text-sm text-gray-500">
                    Your cart is empty
                  </div>

                  <MenuItem v-for="item in cartItems" :key="item.id" v-slot="{ active }">
                    <div :class="[active ? 'bg-gray-50' : '', 'flex items-center gap-x-3 rounded-md p-2 transition']">
                      <img :src="item.image" :alt="item.name" class="size-10 rounded bg-gray-100 object-cover" />
                      <div class="min-w-0 flex-1">
                        <p class="truncate text-sm font-medium text-gray-900">{{ item.name }}</p>
                        <p class="text-xs text-gray-500">Qty: {{ item.quantity }}</p>
                      </div>
                      <p class="text-sm font-semibold text-gray-900">${{ item.price }}</p>
                    </div>
                  </MenuItem>
                </div>

                <div v-if="cartItems.length > 0" class="rounded-b-md bg-gray-50 p-4">
                  <div class="mb-4 flex justify-between text-base font-semibold text-gray-900">
                    <span>Total</span>
                    <span>${{ cartTotal }}</span>
                  </div>
                  <button
                    @click="handleOrder"
                    class="flex w-full items-center justify-center rounded-md bg-green-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-500"
                  >
                    Place Order
                  </button>
                </div>
              </MenuItems>
            </transition>
          </Menu>

          <div class="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10" aria-hidden="true"></div>

          <!-- Bell -->
          <button type="button" class="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
            <span class="sr-only">View notifications</span>
            <BellIcon class="size-6" aria-hidden="true" />
          </button>

          <div class="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10" aria-hidden="true"></div>

          <!-- User dropdown -->
          <Menu as="div" class="relative">
            <MenuButton class="relative flex items-center">
              <span class="absolute -inset-1.5"></span>
              <span class="sr-only">Open user menu</span>
              <img
                class="size-8 rounded-full bg-gray-50 outline outline-1 -outline-offset-1 outline-black/5"
                src="https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2558760599.jpg"
                alt=""
              />
              <span class="hidden lg:flex lg:items-center">
                <span class="ml-4 text-sm/6 font-semibold text-gray-900" aria-hidden="true">Customer</span>
                <ChevronDownIcon class="ml-2 size-5 text-gray-400" aria-hidden="true" />
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
              <MenuItems class="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg outline outline-1 outline-gray-900/5">
                <MenuItem v-for="item in userNavigation" :key="item.name" v-slot="{ active }">
                  <NuxtLink
                    :to="item.href"
                    :class="[active ? 'bg-gray-50 outline-none' : '', 'block px-3 py-1 text-sm/6 text-gray-900']"
                  >
                    {{ item.name }}
                  </NuxtLink>
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </div>

      <main class="py-10">
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
  TagIcon,
  CubeIcon,
  XMarkIcon,
} from '@heroicons/vue/24/outline'
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from '@heroicons/vue/20/solid'
import { useRoute } from 'vue-router'
import { orderService } from '~/api/order/OrderService'

const route = useRoute()
const sidebarOpen = ref(false)

const cartItems = ref([])

const updateCartFromStorage = () => {
  if (typeof window !== 'undefined') {
    const localCartData = localStorage.getItem('shopping-cart')
    cartItems.value = localCartData ? JSON.parse(localCartData) : []
  }
}

onMounted(() => {
  updateCartFromStorage()
  if (typeof window !== 'undefined') {
    window.addEventListener('cart-updated', updateCartFromStorage)
  }
})

onBeforeUnmount(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('cart-updated', updateCartFromStorage)
  }
})

const cartTotal = computed(() => {
  return cartItems.value
    .reduce((total, item) => total + Number(item.price) * item.quantity, 0)
    .toFixed(2)
})

const handleOrder = async () => {
  try {
    if (!cartItems.value.length) {
      alert('Your cart is empty')
      return
    }

    let customerUuid = ''
    if (typeof window !== 'undefined') {
      customerUuid = localStorage.getItem('_uuid') || ''
    }

    if (!customerUuid) {
      alert('You must be logged in to place an order')
      return
    }

    const items = cartItems.value.map(item => ({
      product_uuid: item.uuid,
      quantity: item.quantity,
    }))

    const payload = { customer_uuid: customerUuid, items }

    console.log('ORDER PAYLOAD:', payload)

    const response = await orderService.create(payload)

    console.log('ORDER RESPONSE:', response)

    alert('Order placed successfully!')

    localStorage.removeItem('shopping-cart')
    updateCartFromStorage()

  } catch (error) {
    console.error('ORDER FAILED:', error)
    alert(
      error?.response?._data?.message ||
      error?.message ||
      'Failed to place order'
    )
  }
}

const navigation = [
  { name: 'Home',       href: '/customer/home',       icon: HomeIcon },
  { name: 'Shop',       href: '/customer/shops',       icon: ShoppingBagIcon },
  { name: 'Categories', href: '/customer/categories',  icon: TagIcon },
  { name: 'Products',   href: '/customer/products',    icon: CubeIcon },
]

const userNavigation = [
  { name: 'Profile', href: '/profile' },
  { name: 'Orders',  href: '/customer/order' },
  { name: 'Logout',  href: '/' },
]
</script>