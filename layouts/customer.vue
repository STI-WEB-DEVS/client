<script setup>
  import { ShoppingCartIcon, ChevronDownIcon  } from "@heroicons/vue/24/outline"
  import {
    Dialog,
    DialogPanel,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
    Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  } from "@headlessui/vue"
  import { ExclamationTriangleIcon } from "@heroicons/vue/24/outline"

  import { AuthService } from "~/api/auth/AuthService"
  import { useRoute, useRouter } from "vue-router"

  const route = useRoute()
  const router = useRouter()

  const authService = new AuthService()

  const showHero = computed(() => route.path === "/customer/landing")
  const showLogoutModal = ref(false)

  const { cart } = useCart()

  const cartCount = computed(() => {
    return cart.value.reduce((total, item) => total + item.quantity, 0)
  })

  const handleLogout = async () => {
    try {
      await authService.logout()
    } catch (error) {
      console.error("Logout failed:", error)
    } finally {
      showLogoutModal.value = false
      router.push("/")
    }
  }
</script>

<template>
  <div class="min-h-screen bg-gray-50">

    <!-- HEADER -->
    <header class="border-b border-gray-200 bg-white">
      <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <NuxtLink
          to="/customer/landing"
          class="shrink-0 text-xl font-bold text-gray-900"
        >
          My Store
        </NuxtLink>

        <!-- NAV -->
        <nav class="hidden flex-1 justify-center md:flex">
          <div class="flex items-center gap-8 text-sm font-medium text-gray-600">

            <NuxtLink
              to="/customer/shop"
              class="hover:text-gray-900"
              :class="route.path === '/customer/shop' ? 'text-gray-900' : ''"
            >
              Shop
            </NuxtLink>

            <NuxtLink
              to="/customer/categories"
              class="hover:text-gray-900"
              :class="route.path === '/customer/categories' ? 'text-gray-900' : ''"
            >
              Categories
            </NuxtLink>

            <NuxtLink
              to="/customer/orders"
              class="hover:text-gray-900"
              :class="route.path === '/customer/orders' ? 'text-gray-900' : ''"
            >
              Orders
            </NuxtLink>

            <NuxtLink
              to="/customer/account"
              class="hover:text-gray-900"
              :class="route.path === '/customer/account' ? 'text-gray-900' : ''"
            >
              Account
            </NuxtLink>

          </div>
        </nav>

        <div class="flex items-center gap-2">
          <!-- Cart with badge -->
          <NuxtLink
            to="/customer/cart"
            class="relative flex items-center gap-2 rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <ShoppingCartIcon class="h-4 w-4" />

            <span
              v-if="cartCount > 0"
              class="absolute -top-1 -left-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-xs font-bold text-white"
            >
              {{ cartCount }}
            </span>
          </NuxtLink>

          <!-- LOGOUT -->
          <Menu as="div" class="relative">
            <MenuButton class="flex items-center gap-x-2 rounded-full px-3 py-2">
              <img
                class="h-8 w-8 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="profile"
              />

              <span class="hidden sm:block text-sm font-medium text-gray-900">
                Tom Cook
              </span>

              <ChevronDownIcon class="h-4 w-4 text-gray-500" />
            </MenuButton>

            <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="opacity-0 scale-95"
              enter-to-class="opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="opacity-100 scale-100"
              leave-to-class="opacity-0 scale-95"
            >
              <MenuItems
                class="absolute right-0 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5"
              >
                <MenuItem v-slot="{ active }">
                  <NuxtLink
                    to="/customer/account"
                    :class="[
                      active ? 'bg-gray-50' : '',
                      'block px-4 py-2 text-sm text-gray-700'
                    ]"
                  >
                    My Account
                  </NuxtLink>
                </MenuItem>

                <MenuItem v-slot="{ active }">
                  <button
                    @click="showLogoutModal = true"
                    :class="[
                      active ? 'bg-gray-50' : '',
                      'block w-full text-left px-4 py-2 text-sm text-gray-700'
                    ]"
                  >
                    Sign out
                  </button>
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>

        </div>
      </div>
    </header>

    <main>
      <section v-if="showHero" class="bg-white">
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
                Browse featured products, discover new items, and enjoy a simple
                shopping experience.
              </p>

              <div class="mt-8 flex gap-3">
                <button
                  class="rounded-md bg-indigo-600 px-5 py-3 text-sm font-semibold text-white"
                  @click="navigateTo('/customer/shop')"
                >
                  Shop Now
                </button>

                <button
                  class="rounded-md border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700"
                  @click="navigateTo('/customer/shop')"
                >
                  View Deals
                </button>
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

    <!-- FOOTER -->
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

    <!-- LOGOUT MODAL -->
    <TransitionRoot as="template" :show="showLogoutModal">
      <Dialog as="div" class="relative z-[100]" @close="showLogoutModal = false">

        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
          leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-gray-500/75" />
        </TransitionChild>

        <div class="fixed inset-0 z-10 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4">

            <TransitionChild as="template" enter="ease-out duration-300"
              enter-from="opacity-0 scale-95" enter-to="opacity-100 scale-100"
              leave="ease-in duration-200" leave-from="opacity-100 scale-100" leave-to="opacity-0 scale-95">

              <DialogPanel class="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl">

                <div class="flex items-start gap-3">
                  <div class="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                    <ExclamationTriangleIcon class="h-6 w-6 text-red-600" />
                  </div>

                  <div>
                    <DialogTitle class="text-base font-semibold text-gray-900">
                      Sign out
                    </DialogTitle>
                    <p class="mt-1 text-sm text-gray-500">
                      Are you sure you want to sign out?
                    </p>
                  </div>
                </div>

                <div class="mt-6 flex justify-end gap-3">
                  <button
                    class="rounded-md border px-4 py-2 text-sm"
                    @click="showLogoutModal = false"
                  >
                    Cancel
                  </button>

                  <button
                    class="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-500"
                    @click="handleLogout"
                  >
                    Sign out
                  </button>
                </div>

              </DialogPanel>
            </TransitionChild>

          </div>
        </div>
      </Dialog>
    </TransitionRoot>

  </div>
</template>