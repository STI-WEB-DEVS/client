<template>
  <div>
    <header class="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur">
      <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <NuxtLink to="/customer/shop" class="text-xl font-bold text-indigo-600">
          My Store
        </NuxtLink>

        <nav class="hidden items-center gap-8 text-sm font-medium text-gray-600 md:flex">
          <NuxtLink to="/customer/shop" class="transition hover:text-indigo-600">
            Shop
          </NuxtLink>
          <a href="#" class="transition hover:text-indigo-600">Categories</a>
          <NuxtLink to="/customer/order" class="transition hover:text-indigo-600">
            Orders
          </NuxtLink>
          <a href="#" class="transition hover:text-indigo-600">Account</a>
        </nav>

        <div class="flex items-center gap-4">
         
          <button
            type="button"
             @click="navigateTo('/customer/cart')"
            class="relative flex items-center justify-center rounded-full border border-gray-300 p-2 text-gray-700 transition hover:bg-gray-100"
          >
           <!-- @click="isCartOpen = true" -->
            <CartIcon class="size-5" />
            <span
              v-if="cartCount > 0"
              class="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-indigo-600 px-1 text-xs font-semibold text-white"
            >
              {{ cartCount }}
            </span>
            <span class="sr-only">View cart</span>
          </button>

          <Menu as="div" class="relative">
            <MenuButton class="flex items-center gap-2">
              <img
                class="size-8 rounded-full object-cover"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
                alt="Profile"
              />
              <ChevronDownIcon class="size-4 text-gray-400" />
            </MenuButton>

            <transition
              enter-active-class="transition duration-100"
              enter-from-class="scale-95 opacity-0"
              enter-to-class="scale-100 opacity-100"
              leave-active-class="transition duration-75"
              leave-from-class="scale-100 opacity-100"
              leave-to-class="scale-95 opacity-0"
            >
              <MenuItems class="absolute right-0 mt-2 w-40 rounded-md border border-gray-200 bg-white shadow-lg">
                <MenuItem v-for="item in userNavigation" :key="item.name" v-slot="{ active }">
                  <button
                    v-if="item.action"
                    type="button"
                    @click="item.action"
                    :class="['w-full px-4 py-2 text-left text-sm', active ? 'bg-gray-100' : '']"
                  >
                    {{ item.name }}
                  </button>

                  <a
                    v-else
                    :href="item.href"
                    :class="['block px-4 py-2 text-sm', active ? 'bg-gray-100' : '']"
                  >
                    {{ item.name }}
                  </a>
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </div>
    </header>

    <transition
      enter-active-class="transition duration-300"
      enter-from-class="translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transition duration-200"
      leave-from-class="translate-x-0"
      leave-to-class="translate-x-full"
    >
      <div v-if="isCartOpen" class="fixed inset-0 z-50 flex justify-end">
        <div class="absolute inset-0 bg-black/30" @click="isCartOpen = false"></div>

        <div class="relative flex h-full w-full max-w-md flex-col bg-white shadow-xl">
          <div class="flex items-center justify-between border-b p-4">
            <h2 class="text-lg font-semibold">Your Cart</h2>
            <button
              type="button"
              @click="isCartOpen = false"
              class="text-gray-500 transition hover:text-gray-700"
            >
              X
            </button>
          </div>

          <div class="flex-1 space-y-4 overflow-y-auto p-4">
            <p class="text-sm text-gray-500">Your cart is empty.</p>
          </div>

          <div class="border-t p-4">
            <button
              type="button"
              class="w-full rounded-md bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </transition>

    <ConfirmModal
      :open="isDeleteModalOpen"
      :loading="isSaving"
      title="Logout Confirmation"
      message="Are you sure you want to logout?"
      confirm-text="Logout"
      cancel-text="Cancel"
      loading-text="Logging out..."
      variant="danger"
      @close="isDeleteModalOpen = false"
      @confirm="confirmLogout"
    />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { ShoppingCartIcon as CartIcon } from '@heroicons/vue/24/outline'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'

import ConfirmModal from '~/components/ConfirmModal.vue'
import { AuthService } from '~/api/auth/AuthService'
import { ref, onMounted } from 'vue'

const router = useRouter()
const authService = new AuthService()

const isDeleteModalOpen = ref(false)
const isSaving = ref(false)
const isCartOpen = ref(false)


const cartCount = ref(0)

onMounted(() => {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]')

  cartCount.value = cart.reduce(
    (sum, item) => sum + Number(item.qty || 0),
    0
  )
})

const logout = () => {
  isDeleteModalOpen.value = true
}

const confirmLogout = async () => {
  isSaving.value = true
  try {
    await authService.logout()
    localStorage.removeItem('_token')
    localStorage.removeItem('uuid')
    localStorage.removeItem('role')
    await router.push('/')
  } catch (error) {
    console.error(error)
  } finally {
    isSaving.value = false
    isDeleteModalOpen.value = false
  }
}

const userNavigation = [
  { name: 'Your profile', href: '#' },
  { name: 'Sign out', action: logout },
]
</script>
