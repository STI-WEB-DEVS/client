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
                    <XMarkIcon class="size-6 text-white" />
                  </button>
                </div>
              </TransitionChild>
              <div class="flex grow flex-col gap-y-5 overflow-y-auto sidebar-bg px-6 pb-4">
                <!-- Brand (mobile) -->
                <div class="flex h-16 shrink-0 items-center gap-x-3">
                  <img src="/satura-logo.png" alt="SATURA" class="h-9 w-9 object-contain" />
                  <span class="brand-name">SATURA</span>
                </div>
                <nav class="flex flex-1 flex-col">
                  <ul role="list" class="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" class="-mx-2 space-y-1">
                        <li v-for="item in navigation" :key="item.name">
                          <NuxtLink :to="item.href" @click="sidebarOpen = false" :class="[isActive(item.href) ? 'nav-link-active' : 'nav-link', 'group flex gap-x-3 rounded-lg p-2.5 text-sm font-semibold']">
                            <component :is="item.icon" class="size-5 shrink-0" />
                            <span>{{ item.name }}</span>
                          </NuxtLink>
                        </li>
                      </ul>
                    </li>
                    <li class="mt-auto">
                      <NuxtLink to="/settings" @click="sidebarOpen = false" :class="[isActive('/settings') ? 'nav-link-active' : 'nav-link', 'group -mx-2 flex gap-x-3 rounded-lg p-2.5 text-sm font-semibold']">
                        <Cog6ToothIcon class="size-5 shrink-0" />Settings
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
        <div class="flex h-18 shrink-0 items-center gap-x-3 pt-5 pb-2">
          <img src="/satura-logo.png" alt="SATURA" class="h-11 w-11 object-contain" />
          <div>
            <span class="brand-name">SATURA</span>
            <p class="brand-sub">Business Management</p>
          </div>
        </div>

        <!-- Nav -->
        <nav class="flex flex-1 flex-col">
          <ul role="list" class="flex flex-1 flex-col gap-y-7">
            <!-- Main menu -->
            <li>
              <p class="nav-section-label">MAIN MENU</p>
              <ul role="list" class="-mx-2 space-y-1 mt-2">
                <li v-for="item in navigation" :key="item.name">
                  <NuxtLink :to="item.href" :class="[isActive(item.href) ? 'nav-link-active' : 'nav-link', 'group flex gap-x-3 rounded-lg p-2.5 text-sm font-semibold transition-all duration-150']">
                    <component :is="item.icon" class="size-5 shrink-0" />
                    {{ item.name }}
                  </NuxtLink>
                </li>
              </ul>
            </li>

            <li class="mt-auto">
              <p class="nav-section-label mb-2">SYSTEM</p>
              <NuxtLink to="/settings" :class="[isActive('/settings') ? 'nav-link-active' : 'nav-link', 'group -mx-2 flex gap-x-3 rounded-lg p-2.5 text-sm font-semibold transition-all duration-150']">
                <Cog6ToothIcon class="size-5 shrink-0" />Settings
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <!-- Main content area -->
    <div class="lg:pl-72 min-h-screen bg-slate-50 flex flex-col">
      <!-- Top bar -->
      <div class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-slate-200 bg-white/95 backdrop-blur px-4 shadow-sm sm:gap-x-6 lg:px-8">
        <button type="button" class="-m-2.5 p-2.5 text-slate-700 lg:hidden" @click="sidebarOpen = true">
          <Bars3Icon class="size-6" />
        </button>
        <div class="h-6 w-px bg-slate-900/10 lg:hidden"></div>

        <div class="flex flex-1 gap-x-4 self-stretch items-center lg:gap-x-6 min-w-0">
          <div class="flex flex-1 items-center min-w-0">
            <h1 class="text-base sm:text-lg font-semibold text-slate-800 truncate">{{ currentPageTitle }}</h1>
          </div>

          <div class="flex items-center gap-x-3 lg:gap-x-4 shrink-0">
            <!-- Plan badge (hidden on very small screens) -->
            <div v-if="isPremium" class="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full badge-premium">
              <span class="text-xs">👑</span>
              <span class="text-xs font-bold" style="color:#92600A">Premium</span>
            </div>
            <div v-else class="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200">
              <span class="text-xs">🥉</span>
              <span class="text-xs font-bold text-slate-600">Basic</span>
            </div>

            <!-- Notification Bell -->
            <Menu as="div" class="relative">
              <MenuButton
                @click="markRead"
                class="relative -m-2.5 p-2.5 text-slate-400 hover:text-teal-600 transition-colors"
              >
                <BellIcon class="size-6" />
                <span v-if="hasUnread" class="absolute top-1.5 right-1.5 size-2 rounded-full bg-teal-500"></span>
              </MenuButton>
              <transition
                enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <MenuItems class="absolute right-0 z-10 mt-2 w-80 origin-top-right rounded-xl bg-white shadow-lg ring-1 ring-slate-900/10 focus:outline-none">
                  <div class="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                    <p class="text-sm font-bold text-slate-800">Notifications</p>
                    <span class="text-xs text-slate-400">Today</span>
                  </div>
                  <div class="divide-y divide-slate-50">
                    <MenuItem v-for="notif in notifications" :key="notif.id" v-slot="{ active }">
                      <div :class="[active ? 'bg-slate-50' : '', 'flex gap-3 px-4 py-3 cursor-default']">
                        <div :class="['notif-dot-wrap', notif.color]">
                          <span class="text-base">{{ notif.icon }}</span>
                        </div>
                        <div class="min-w-0">
                          <p class="text-sm font-semibold text-slate-800">{{ notif.title }}</p>
                          <p class="text-xs text-slate-500 mt-0.5">{{ notif.desc }}</p>
                          <p class="text-xs text-slate-400 mt-1">{{ notif.time }}</p>
                        </div>
                      </div>
                    </MenuItem>
                  </div>
                  <div class="px-4 py-3 border-t border-slate-100 text-center">
                    <NuxtLink to="/settings" class="text-xs font-semibold" style="color:#009E97">Manage notification settings →</NuxtLink>
                  </div>
                </MenuItems>
              </transition>
            </Menu>

            <div class="hidden lg:block lg:h-6 lg:w-px lg:bg-slate-900/10"></div>

            <!-- User menu -->
            <Menu as="div" class="relative">
              <MenuButton class="flex items-center gap-x-2 rounded-full hover:bg-slate-50 px-2 py-1 transition-colors">
                <div class="size-8 rounded-full user-avatar flex items-center justify-center text-white font-bold text-sm shrink-0 overflow-hidden">
                  <img v-if="user?.avatar" :src="user.avatar" alt="avatar" class="w-full h-full object-cover" />
                  <span v-else>{{ userInitial }}</span>
                </div>
                <span class="hidden lg:flex lg:items-center min-w-0">
                  <span class="text-sm font-semibold text-slate-900 truncate max-w-[120px]">{{ user?.name ?? 'Admin' }}</span>
                  <ChevronDownIcon class="ml-1 size-4 text-slate-400 shrink-0" />
                </span>
              </MenuButton>
              <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                <MenuItems class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-xl bg-white py-1 shadow-lg ring-1 ring-slate-900/10 focus:outline-none">
                  <div class="px-4 py-2 border-b border-slate-100">
                    <p class="text-xs text-slate-500 truncate">{{ user?.email }}</p>
                    <p class="text-xs font-bold mt-0.5" :style="isPremium ? 'color:#DCB03A' : 'color:#64748B'">
                      {{ isPremium ? '👑 Premium Plan' : '🥉 Basic Plan' }}
                    </p>
                  </div>
                  <MenuItem v-slot="{ active }">
                    <NuxtLink to="/profile" :class="[active ? 'bg-slate-50' : '', 'flex items-center gap-x-2 px-4 py-2 text-sm text-slate-700']">
                      <UserCircleIcon class="size-4 text-slate-400" />Your Profile
                    </NuxtLink>
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                    <NuxtLink to="/settings" :class="[active ? 'bg-slate-50' : '', 'flex items-center gap-x-2 px-4 py-2 text-sm text-slate-700']">
                      <Cog6ToothIcon class="size-4 text-slate-400" />Settings
                    </NuxtLink>
                  </MenuItem>
                  <div class="my-1 border-t border-slate-100"></div>
                  <MenuItem v-slot="{ active }">
                    <button @click="handleSignOut" :class="[active ? 'bg-red-50' : '', 'flex w-full items-center gap-x-2 px-4 py-2 text-sm text-red-600']">
                      <ArrowRightOnRectangleIcon class="size-4" />Sign Out
                    </button>
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </div>
      </div>

      <!-- Page content -->
      <main class="flex-1 py-6 sm:py-8">
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
  ArrowRightOnRectangleIcon, DocumentTextIcon,
} from '@heroicons/vue/24/outline'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
import { useRoute } from 'vue-router'

const route = useRoute()
const sidebarOpen = ref(false)
const hasUnread = ref(true)
const { user, isPremium, signOut } = useAuth()
const userInitial = computed(() => (user.value?.name?.[0] ?? 'A').toUpperCase())

// Navigation is strictly limited to 6 items per technical requirement
const navigation = [
  { name: 'Dashboard',             href: '/dashboard',    icon: HomeIcon },
  { name: 'Customers & Orders',    href: '/customers',    icon: UsersIcon },
  { name: 'Inventory & Suppliers', href: '/inventory',    icon: CubeIcon },
  { name: 'Appointments',          href: '/appointments', icon: CalendarDaysIcon },
  { name: 'Billing & Payments',    href: '/billing',      icon: BanknotesIcon },
  { name: 'Team',                  href: '/team',         icon: UserGroupIcon },
]

const isActive = (href: string) =>
  route.path === href || route.path.startsWith(href + '/')

const currentPageTitle = computed(() => {
  if (isActive('/posts'))    return 'Posts'
  const found = navigation.find(n => isActive(n.href))
  if (found) return found.name
  if (isActive('/settings')) return 'Settings'
  if (isActive('/profile'))  return 'My Profile'
  return 'SATURA'
})

// ── Notifications ──────────────────────────────────────────────
const notifications = [
  {
    id: 1,
    icon: '✅',
    color: 'notif-green',
    title: 'JO-003 is Ready for Pickup',
    desc: 'Ana Dela Cruz — Barong is ready.',
    time: '5 min ago',
  },
  {
    id: 2,
    icon: '⚠️',
    color: 'notif-yellow',
    title: 'Low Stock Alert',
    desc: 'Japanese Cotton Poplin is below reorder level.',
    time: '1 hour ago',
  },
  {
    id: 3,
    icon: '📅',
    color: 'notif-teal',
    title: 'Appointment Tomorrow',
    desc: 'Maria Santos — Final Fitting at 9:00 AM.',
    time: '3 hours ago',
  },
]

function markRead() {
  hasUnread.value = false
}

const handleSignOut = async () => {
  signOut()
  await navigateTo('/')
}
</script>

<style scoped>
/* Brand: Teal #009E97 | Gold #DCB03A | Charcoal #1A2026 */
.sidebar-bg {
  background: linear-gradient(180deg, #1A2026 0%, #212B34 100%);
  border-right: 1px solid rgba(255,255,255,0.05);
}
.brand-name { font-size: 1.15rem; font-weight: 800; color: #fff; letter-spacing: -0.01em; }
.brand-sub  { font-size: 0.65rem; color: rgba(255,255,255,0.35); letter-spacing: 0.05em; text-transform: uppercase; margin-top: -2px; }
.nav-section-label { font-size: 0.65rem; font-weight: 700; color: rgba(255,255,255,0.22); letter-spacing: 0.1em; padding-left: 0.625rem; }
.nav-link { color: rgba(255,255,255,0.5); }
.nav-link:hover { background: rgba(0,158,151,0.12); color: rgba(255,255,255,0.9); }
.nav-link-active { background: rgba(0,158,151,0.2); color: #009E97; box-shadow: inset 3px 0 0 #009E97; }
.pro-badge { background: rgba(220,176,58,0.15); color: #DCB03A; }
.user-avatar { background: linear-gradient(135deg, #009E97, #007A75); }
.badge-premium { background: #FFFBEB; border: 1px solid #FDE68A; }
/* Notification dot icons */
.notif-dot-wrap { width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 1rem; }
.notif-green  { background: #F0FDF4; }
.notif-yellow { background: #FFFBEB; }
.notif-teal   { background: rgba(0,158,151,0.08); }
</style>