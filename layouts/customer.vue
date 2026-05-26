<!-- layouts/customer.vue -->

<template>
    <div>
      <!-- Mobile Sidebar -->
      <TransitionRoot as="template" :show="sidebarOpen">
        <Dialog class="relative z-50 lg:hidden" @close="sidebarOpen = false">
  
          <!-- Background -->
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
  
            <!-- Sidebar -->
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
  
                <!-- Close Button -->
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
  
                <!-- Mobile Menu -->
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
  
      <!-- Desktop Sidebar -->
      <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
  
        <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-indigo-700 px-6 pb-4">
  
          <!-- Logo -->
          <div class="flex h-16 items-center">
            <h1 class="text-xl font-bold text-white">
              My Store
            </h1>
          </div>
  
          <!-- Navigation -->
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
  
      <!-- Main Content -->
      <div class="lg:pl-72">
  
        <!-- Top Navbar -->
        <div class="sticky top-0 z-40 flex h-16 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:px-6 lg:px-8">
  
          <!-- Mobile Menu Button -->
          <button
            type="button"
            class="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            @click="sidebarOpen = true"
          >
            <Bars3Icon class="size-6" />
          </button>
  
          <div class="h-6 w-px bg-gray-200 lg:hidden" />
  
          <!-- Search -->
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
  
          <!-- Right Side -->
          <div class="flex items-center gap-x-4">
  
            <!-- Cart -->
            <NuxtLink
              to="/cart"
              class="relative"
            >
              <ShoppingCartIcon class="size-6 text-gray-600 hover:text-indigo-600" />
  
              <span class="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                2
              </span>
            </NuxtLink>
  
            <!-- Notifications -->
            <button class="text-gray-500 hover:text-gray-700">
              <BellIcon class="size-6" />
            </button>
  
            <!-- User Dropdown -->
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
  
        <!-- Page Content -->
        <main class="py-8">
          <div class="px-4 sm:px-6 lg:px-8">
            <slot />
          </div>
        </main>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
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
  
  const navigation = [
    {
      name: 'Home',
      href: '',
      icon: HomeIcon,
    },
    {
      name: 'Shop',
      href: '/customer/products',
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