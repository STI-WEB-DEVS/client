<template>
  <div>
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog class="relative z-50 lg:hidden" @close="sidebarOpen = false">
        <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0" enter-to="" leave="transition-opacity ease-linear duration-300" leave-from="" leave-to="opacity-0">
          <div class="fixed inset-0 bg-gray-900/80"></div>
        </TransitionChild>
        <div class="fixed inset-0 flex">
          <TransitionChild as="template" enter="transition ease-in-out duration-300 transform" enter-from="-translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0" leave-to="-translate-x-full">
            <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
              <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0" enter-to="" leave="ease-in-out duration-300" leave-from="" leave-to="opacity-0">
                <div class="absolute left-full top-0 flex w-16 justify-center pt-5">
                  <button type="button" class="-m-2.5 p-2.5" @click="sidebarOpen = false">
                    <span class="sr-only">Close sidebar</span>
                    <XMarkIcon class="size-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </TransitionChild>

              <!-- Mobile Sidebar Content -->
              <div class="flex grow flex-col overflow-y-auto" style="background: linear-gradient(180deg, #1e3a5f 0%, #162d4a 100%);">
                <div class="flex h-16 shrink-0 items-center gap-x-3 border-b border-white/10 px-6">
                  <!-- Logo -->
                  <div class="flex size-9 items-center justify-center rounded-lg shrink-0" style="background: #162c48;">
                    <svg width="24" height="24" viewBox="0 0 44 44" fill="none">
                      <path d="M22 32C22 32 11 25.5 11 18.5C11 14.9 13.9 12 17.5 12C19.7 12 21.6 13.2 22 13.8C22.4 13.2 24.3 12 26.5 12C30.1 12 33 14.9 33 18.5C33 25.5 22 32 22 32Z" fill="none" stroke="#7eb8f7" stroke-width="1.4"/>
                      <path d="M14 20L17 20L18.5 17L20.5 23L22 19L23.5 21L25 20L28 20" stroke="#7eb8f7" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                    </svg>
                  </div>
                  <div>
                    <p class="text-white font-bold text-sm leading-tight">AMUMA</p>
                    <p class="text-blue-300 text-xs leading-tight">Healthcare Portal</p>
                  </div>
                </div>
                <nav class="flex flex-1 flex-col px-4 py-6">
                  <ul role="list" class="flex flex-1 flex-col gap-y-6">
                    <li>
                      <p class="text-xs font-semibold text-blue-300/60 uppercase tracking-widest mb-3 px-3">Main Menu</p>
                      <ul role="list" class="space-y-1">
                        <li v-for="item in navigation" :key="item.name">
                          <NuxtLink
                            :to="item.href"
                            :class="[
                              route.path === item.href
                                ? 'bg-white/10 text-white border-l-2 border-blue-400'
                                : 'text-blue-100/70 hover:bg-white/5 hover:text-white border-l-2 border-transparent',
                              'group flex gap-x-3 rounded-r-md pl-3 pr-2 py-2.5 text-sm font-medium transition-all duration-150'
                            ]"
                          >
                            <component :is="item.icon" class="size-5 shrink-0 mt-0.5" aria-hidden="true" />
                            {{ item.name }}
                          </NuxtLink>
                        </li>
                      </ul>
                    </li>
                    <li class="mt-auto">
                      <p class="text-xs font-semibold text-blue-300/60 uppercase tracking-widest mb-3 px-3">System</p>
                      <NuxtLink
                        to="/settings"
                        :class="[
                          route.path === '/settings'
                            ? 'bg-white/10 text-white border-l-2 border-blue-400'
                            : 'text-blue-100/70 hover:bg-white/5 hover:text-white border-l-2 border-transparent',
                          'group flex gap-x-3 rounded-r-md pl-3 pr-2 py-2.5 text-sm font-medium transition-all duration-150'
                        ]"
                      >
                        <Cog6ToothIcon class="size-5 shrink-0 mt-0.5" aria-hidden="true" />
                        Settings
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
    <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
      <div class="flex grow flex-col overflow-y-auto shadow-xl" style="background: linear-gradient(180deg, #1e3a5f 0%, #162d4a 100%);">

        <!-- Logo -->
        <div class="flex h-16 shrink-0 items-center gap-x-3 border-b border-white/10 px-6">
          <div class="flex size-9 items-center justify-center rounded-lg shrink-0" style="background: #162c48;">
            <svg width="24" height="24" viewBox="0 0 44 44" fill="none">
              <path d="M22 32C22 32 11 25.5 11 18.5C11 14.9 13.9 12 17.5 12C19.7 12 21.6 13.2 22 13.8C22.4 13.2 24.3 12 26.5 12C30.1 12 33 14.9 33 18.5C33 25.5 22 32 22 32Z" fill="none" stroke="#7eb8f7" stroke-width="1.4"/>
              <path d="M14 20L17 20L18.5 17L20.5 23L22 19L23.5 21L25 20L28 20" stroke="#7eb8f7" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
            </svg>
          </div>
          <div>
            <p class="text-white font-bold text-sm leading-tight">AMUMA</p>
            <p class="text-blue-300 text-xs leading-tight">Healthcare Portal</p>
          </div>
        </div>

        <nav class="flex flex-1 flex-col px-4 py-6">
          <ul role="list" class="flex flex-1 flex-col gap-y-6">
            <li>
              <p class="text-xs font-semibold text-blue-300/60 uppercase tracking-widest mb-3 px-3">Main Menu</p>
              <ul role="list" class="space-y-1">
                <li v-for="item in navigation" :key="item.name">
                  <NuxtLink
                    :to="item.href"
                    :class="[
                      route.path === item.href
                        ? 'bg-white/10 text-white border-l-2 border-blue-400'
                        : 'text-blue-100/70 hover:bg-white/5 hover:text-white border-l-2 border-transparent',
                      'group flex gap-x-3 rounded-r-md pl-3 pr-2 py-2.5 text-sm font-medium transition-all duration-150'
                    ]"
                  >
                    <component :is="item.icon" class="size-5 shrink-0 mt-0.5" aria-hidden="true" />
                    {{ item.name }}
                  </NuxtLink>
                </li>
              </ul>
            </li>

            <!-- Settings at bottom -->
            <li class="mt-auto">
              <p class="text-xs font-semibold text-blue-300/60 uppercase tracking-widest mb-3 px-3">System</p>
              <NuxtLink
                to="/settings"
                :class="[
                  route.path === '/settings'
                    ? 'bg-white/10 text-white border-l-2 border-blue-400'
                    : 'text-blue-100/70 hover:bg-white/5 hover:text-white border-l-2 border-transparent',
                  'group flex gap-x-3 rounded-r-md pl-3 pr-2 py-2.5 text-sm font-medium transition-all duration-150'
                ]"
              >
                <Cog6ToothIcon class="size-5 shrink-0 mt-0.5" aria-hidden="true" />
                Settings
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <!-- Main Content -->
    <div class="lg:pl-64">
      <!-- Top Bar -->
      <div class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
        <button type="button" class="-m-2.5 p-2.5 text-gray-700 lg:hidden" @click="sidebarOpen = true">
          <span class="sr-only">Open sidebar</span>
          <Bars3Icon class="size-6" aria-hidden="true" />
        </button>
        <div class="h-6 w-px bg-gray-200 lg:hidden" aria-hidden="true"></div>

        <div class="flex flex-1 items-center justify-between">
          <!-- Breadcrumb -->
          <div class="flex items-center gap-x-2">
            <span class="text-xs text-gray-400 font-medium uppercase tracking-widest hidden sm:block">AMUMA</span>
            <span class="text-gray-300 hidden sm:block">/</span>
            <span class="text-sm font-semibold text-gray-700 capitalize hidden sm:block">{{ currentPage }}</span>
          </div>

          <!-- Right Side -->
          <div class="flex items-center gap-x-3">
            <button type="button" class="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition">
              <span class="sr-only">View notifications</span>
              <BellIcon class="size-5" aria-hidden="true" />
              <span class="absolute top-1.5 right-1.5 size-2 rounded-full bg-red-500"></span>
            </button>

            <div class="h-6 w-px bg-gray-200" aria-hidden="true"></div>

            <Menu as="div" class="relative">
              <MenuButton class="flex items-center gap-x-2 rounded-lg px-2 py-1.5 hover:bg-gray-100 transition">
                <div class="size-8 rounded-full flex items-center justify-center text-white text-xs font-bold shadow" style="background: linear-gradient(135deg, #1e3a5f, #2563eb);">NL</div>
                <div class="hidden lg:block text-left">
                  <p class="text-sm font-semibold text-gray-800 leading-tight">Admin</p>
                </div>
                <ChevronDownIcon class="size-4 text-gray-400" aria-hidden="true" />
              </MenuButton>
              <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform scale-100" leave-to-class="transform opacity-0 scale-95">
                <MenuItems class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-2xl bg-white py-1 shadow-lg ring-1 ring-gray-900/5">
                  <MenuItem v-slot="{ active }">
                    <a href="/profile" :class="[active ? 'bg-gray-50' : '', 'flex items-center gap-x-2 px-4 py-2.5 text-sm text-gray-700 rounded-t-2xl']">
                      <UserCircleIcon class="size-4 text-gray-400" />
                      Your Profile
                    </a>
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                    <a href="/settings" :class="[active ? 'bg-gray-50' : '', 'flex items-center gap-x-2 px-4 py-2.5 text-sm text-gray-700']">
                      <Cog6ToothIcon class="size-4 text-gray-400" />
                      Settings
                    </a>
                  </MenuItem>
                  <div class="my-1 border-t border-gray-100"></div>
                  <MenuItem v-slot="{ active }">
                    <a href="/" :class="[active ? 'bg-red-50 text-red-600' : 'text-red-500', 'flex items-center gap-x-2 px-4 py-2.5 text-sm rounded-b-2xl']">
                      <ArrowRightOnRectangleIcon class="size-4" />
                      Sign Out
                    </a>
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </div>
      </div>

      <!-- Page Content -->
      <main class="py-8 bg-gray-50 min-h-screen">
        <div class="px-4 sm:px-6 lg:px-10">
          <slot></slot>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import {
  Dialog, DialogPanel, Menu, MenuButton, MenuItem, MenuItems,
  TransitionChild, TransitionRoot,
} from '@headlessui/vue'
import {
  Bars3Icon, BellIcon, CalendarIcon, ChartPieIcon,
  Cog6ToothIcon, HomeIcon, UsersIcon, XMarkIcon,
  UserCircleIcon, ArrowRightOnRectangleIcon,
  DocumentDuplicateIcon, FolderIcon,
} from '@heroicons/vue/24/outline'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
import { useRoute } from 'vue-router'

const route = useRoute()
const sidebarOpen = ref(false)

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Team', href: '/team', icon: UsersIcon },
  { name: 'Patients', href: '/patients', icon: FolderIcon },
  { name: 'Appointments', href: '/appointments', icon: CalendarIcon },
  { name: 'Records', href: '/records', icon: DocumentDuplicateIcon },
  { name: 'Reports', href: '/reports', icon: ChartPieIcon },
]

const currentPage = computed(() => {
  const path = route.path.replace('/', '') || 'home'
  return path
})
</script>