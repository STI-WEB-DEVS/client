<template>
  <div class="h-full">
    <!-- Mobile sidebar overlay -->
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog class="relative z-50 lg:hidden" @close="sidebarOpen = false">
        <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-slate-900/80"></div>
        </TransitionChild>
        <div class="fixed inset-0 flex">
          <TransitionChild as="template" enter="transition ease-in-out duration-300 transform" enter-from="-translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0" leave-to="-translate-x-full">
            <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
              <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in-out duration-300" leave-from="opacity-100" leave-to="opacity-0">
                <div class="absolute left-full top-0 flex w-16 justify-center pt-5">
                  <button type="button" class="-m-2.5 p-2.5" @click="sidebarOpen = false">
                    <span class="sr-only">Close sidebar</span>
                    <XMarkIcon class="size-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </TransitionChild>
              <div class="flex grow flex-col gap-y-5 overflow-y-auto sidebar-bg px-6 pb-4">
                <div class="flex h-16 shrink-0 items-center gap-x-3">
                  <div class="brand-logo">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="size-7 text-amber-400">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                    </svg>
                  </div>
                  <span class="brand-name">TailorTrack</span>
                </div>
                <nav class="flex flex-1 flex-col">
                  <ul role="list" class="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" class="-mx-2 space-y-1">
                        <li v-for="item in navigation" :key="item.name">
                          <NuxtLink :to="item.href" :class="[route.path === item.href || route.path.startsWith(item.href + '/') ? 'nav-link-active' : 'nav-link', 'group flex gap-x-3 rounded-lg p-2.5 text-sm font-semibold']">
                            <component :is="item.icon" class="size-5 shrink-0" aria-hidden="true" />
                            {{ item.name }}
                          </NuxtLink>
                        </li>
                      </ul>
                    </li>
                    <li class="mt-auto">
                      <NuxtLink to="/settings" :class="[route.path === '/settings' ? 'nav-link-active' : 'nav-link', 'group -mx-2 flex gap-x-3 rounded-lg p-2.5 text-sm font-semibold']">
                        <Cog6ToothIcon class="size-5 shrink-0" aria-hidden="true" />
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

    <!-- Desktop sidebar -->
    <div class="hidden sidebar-bg lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <div class="flex grow flex-col gap-y-5 overflow-y-auto px-6 pb-4">
        <!-- Brand -->
        <div class="flex h-16 shrink-0 items-center gap-x-3">
          <div class="brand-logo">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="size-7 text-amber-400">
              <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
            </svg>
          </div>
          <div>
            <span class="brand-name">TailorTrack</span>
            <p class="brand-sub">Business Management</p>
          </div>
        </div>

        <!-- Nav -->
        <nav class="flex flex-1 flex-col">
          <ul role="list" class="flex flex-1 flex-col gap-y-7">
            <li>
              <p class="nav-section-label">MAIN MENU</p>
              <ul role="list" class="-mx-2 space-y-1 mt-2">
                <li v-for="item in navigation" :key="item.name">
                  <NuxtLink :to="item.href" :class="[route.path === item.href || route.path.startsWith(item.href + '/') ? 'nav-link-active' : 'nav-link', 'group flex gap-x-3 rounded-lg p-2.5 text-sm font-semibold transition-all duration-150']">
                    <component :is="item.icon" class="size-5 shrink-0" aria-hidden="true" />
                    {{ item.name }}
                  </NuxtLink>
                </li>
              </ul>
            </li>

            <li class="mt-auto">
              <p class="nav-section-label mb-2">SYSTEM</p>
              <NuxtLink to="/settings" :class="[route.path === '/settings' ? 'nav-link-active' : 'nav-link', 'group -mx-2 flex gap-x-3 rounded-lg p-2.5 text-sm font-semibold transition-all duration-150']">
                <Cog6ToothIcon class="size-5 shrink-0" aria-hidden="true" />
                Settings
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <!-- Main content area -->
    <div class="lg:pl-72 min-h-screen bg-slate-50">
      <!-- Top bar -->
      <div class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-slate-200 bg-white/95 backdrop-blur px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
        <button type="button" class="-m-2.5 p-2.5 text-slate-700 hover:text-slate-900 lg:hidden" @click="sidebarOpen = true">
          <span class="sr-only">Open sidebar</span>
          <Bars3Icon class="size-6" aria-hidden="true" />
        </button>
        <div class="h-6 w-px bg-slate-900/10 lg:hidden" aria-hidden="true"></div>

        <div class="flex flex-1 gap-x-4 self-stretch items-center lg:gap-x-6">
          <!-- Page title -->
          <div class="flex flex-1 items-center">
            <h1 class="text-lg font-semibold text-slate-800">{{ currentPageTitle }}</h1>
          </div>

          <div class="flex items-center gap-x-4 lg:gap-x-6">
            <!-- Notification bell -->
            <button type="button" class="relative -m-2.5 p-2.5 text-slate-400 hover:text-amber-500 transition-colors">
              <span class="sr-only">View notifications</span>
              <BellIcon class="size-6" aria-hidden="true" />
              <span class="absolute top-1.5 right-1.5 size-2 rounded-full bg-amber-500"></span>
            </button>

            <div class="hidden lg:block lg:h-6 lg:w-px lg:bg-slate-900/10" aria-hidden="true"></div>

            <!-- User menu -->
            <Menu as="div" class="relative">
              <MenuButton class="flex items-center gap-x-3 rounded-full hover:bg-slate-50 px-2 py-1 transition-colors">
                <span class="sr-only">Open user menu</span>
                <div class="size-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white font-bold text-sm">A</div>
                <span class="hidden lg:flex lg:items-center">
                  <span class="text-sm font-semibold text-slate-900">Admin</span>
                  <ChevronDownIcon class="ml-1 size-4 text-slate-400" aria-hidden="true" />
                </span>
              </MenuButton>
              <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                <MenuItems class="absolute right-0 z-10 mt-2 w-44 origin-top-right rounded-xl bg-white py-1 shadow-lg ring-1 ring-slate-900/10 focus:outline-none">
                  <MenuItem v-slot="{ active }">
                    <NuxtLink to="/profile" :class="[active ? 'bg-slate-50' : '', 'flex items-center gap-x-2 px-4 py-2 text-sm text-slate-700']">
                      <UserCircleIcon class="size-4 text-slate-400" />
                      Your Profile
                    </NuxtLink>
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                    <NuxtLink to="/settings" :class="[active ? 'bg-slate-50' : '', 'flex items-center gap-x-2 px-4 py-2 text-sm text-slate-700']">
                      <Cog6ToothIcon class="size-4 text-slate-400" />
                      Settings
                    </NuxtLink>
                  </MenuItem>
                  <div class="my-1 border-t border-slate-100"></div>
                  <MenuItem v-slot="{ active }">
                    <button @click="handleSignOut" :class="[active ? 'bg-red-50' : '', 'flex w-full items-center gap-x-2 px-4 py-2 text-sm text-red-600']">
                      <ArrowRightOnRectangleIcon class="size-4" />
                      Sign Out
                    </button>
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </div>
      </div>

      <!-- Page content -->
      <main class="py-8">
        <div class="px-4 sm:px-6 lg:px-8">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  Dialog, DialogPanel, Menu, MenuButton, MenuItem, MenuItems,
  TransitionChild, TransitionRoot,
} from '@headlessui/vue'
import {
  Bars3Icon, BellIcon, Cog6ToothIcon, XMarkIcon,
  HomeIcon, UsersIcon, CubeIcon, CalendarDaysIcon,
  BanknotesIcon, UserGroupIcon, UserCircleIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/vue/24/outline'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const sidebarOpen = ref(false)

const navigation = [
  { name: 'Dashboard',             href: '/dashboard',    icon: HomeIcon },
  { name: 'Customers & Orders',    href: '/customers',    icon: UsersIcon },
  { name: 'Inventory & Suppliers', href: '/inventory',    icon: CubeIcon },
  { name: 'Appointments',          href: '/appointments', icon: CalendarDaysIcon },
  { name: 'Billing & Payments',    href: '/billing',      icon: BanknotesIcon },
  { name: 'Team',                  href: '/team',         icon: UserGroupIcon },
]

const currentPageTitle = computed(() => {
  const found = navigation.find(n => route.path === n.href || route.path.startsWith(n.href + '/'))
  if (found) return found.name
  if (route.path === '/settings') return 'Settings'
  if (route.path === '/profile') return 'My Profile'
  return 'TailorTrack'
})

const handleSignOut = async () => {
  await navigateTo('/')
}
</script>

<style scoped>
.sidebar-bg {
  background: linear-gradient(180deg, #0F172A 0%, #1E293B 100%);
  border-right: 1px solid rgba(255,255,255,0.06);
}
.brand-logo {
  background: rgba(245,158,11,0.15);
  border-radius: 10px;
  padding: 6px;
}
.brand-name {
  font-size: 1.15rem;
  font-weight: 800;
  color: #fff;
  letter-spacing: -0.02em;
}
.brand-sub {
  font-size: 0.65rem;
  color: rgba(255,255,255,0.4);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-top: -2px;
}
.nav-section-label {
  font-size: 0.65rem;
  font-weight: 700;
  color: rgba(255,255,255,0.25);
  letter-spacing: 0.1em;
  padding-left: 0.625rem;
}
.nav-link {
  color: rgba(255,255,255,0.55);
}
.nav-link:hover {
  background: rgba(255,255,255,0.07);
  color: rgba(255,255,255,0.9);
}
.nav-link-active {
  background: rgba(245,158,11,0.18);
  color: #FCD34D;
  box-shadow: inset 3px 0 0 #F59E0B;
}
</style>