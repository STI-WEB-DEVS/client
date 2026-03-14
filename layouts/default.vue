<template>
  <div>

    <!-- ── Mobile sidebar drawer ─────────────────────────── -->
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog class="relative z-50 lg:hidden" @close="sidebarOpen = false">
        <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-[#1D3557]/80"></div>
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
              <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-[#1D3557] px-6 pb-4">
                <!-- Brand -->
                <div class="flex h-16 shrink-0 items-center gap-2.5">
                  <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-[#D62828]">
                    <svg class="size-5 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"/></svg>
                  </div>
                  <span class="text-sm font-bold text-white">Kadugo Admin</span>
                </div>
                <nav class="flex flex-1 flex-col">
                  <ul role="list" class="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" class="-mx-2 space-y-1">
                        <li v-for="item in navigation" :key="item.name">
                          <NuxtLink :to="item.href" :class="[route.path === item.href ? 'bg-white/10 text-white' : 'text-[#A8DADC] hover:bg-white/10 hover:text-white', 'group flex gap-x-3 rounded-lg p-2 text-sm font-semibold transition-colors']">
                            <component :is="item.icon" class="size-5 shrink-0" aria-hidden="true" />
                            {{ item.name }}
                          </NuxtLink>
                        </li>
                      </ul>
                    </li>
                    <li class="mt-auto">
                      <NuxtLink to="/setting" class="group -mx-2 flex gap-x-3 rounded-lg p-2 text-sm font-semibold text-[#A8DADC] hover:bg-white/10 hover:text-white transition-colors">
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

    <!-- ── Desktop sidebar ───────────────────────────────── -->
    <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-[#1D3557] px-6 pb-4">
        <!-- Brand -->
        <div class="flex h-16 shrink-0 items-center gap-2.5">
          <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-[#D62828]">
            <svg class="size-5 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"/></svg>
          </div>
          <span class="text-sm font-bold text-white">Kadugo Admin</span>
        </div>
        <nav class="flex flex-1 flex-col">
          <ul role="list" class="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="lis t" class="-mx-2 space-y-1">
                <li v-for="item in navigation" :key="item.name">
                  <NuxtLink :to="item.href" :class="[route.path === item.href ? 'bg-white/10 text-white' : 'text-[#A8DADC] hover:bg-white/10 hover:text-white', 'group flex gap-x-3 rounded-lg p-2 text-sm font-semibold transition-colors']">
                    <component :is="item.icon" class="size-5 shrink-0" aria-hidden="true" />
                    {{ item.name }}
                  </NuxtLink>
                </li>
              </ul>
            </li>
            <li class="mt-auto border-t border-white/10 pt-4">
              <NuxtLink to="/setting/general" :class="[route.path.startsWith('/setting/general') ? 'bg-white/10 text-white' : 'text-[#A8DADC] hover:bg-white/10 hover:text-white', 'group -mx-2 flex gap-x-3 rounded-lg p-2 text-sm font-semibold transition-colors']">
                <Cog6ToothIcon class="size-5 shrink-0" aria-hidden="true" />
                Settings
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <!-- ── Main area ─────────────────────────────────────── -->
    <div class="lg:pl-72">

      <!-- Top bar -->
      <div class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-[#A8DADC]/20 bg-[#F1FAEE] px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
        <button type="button" class="-m-2.5 p-2.5 text-[#1D3557] lg:hidden" @click="sidebarOpen = true">
          <span class="sr-only">Open sidebar</span>
          <Bars3Icon class="size-6" aria-hidden="true" />
        </button>
        <div class="h-6 w-px bg-[#1D3557]/10 lg:hidden" aria-hidden="true"></div>

        <div class="flex flex-1 items-center justify-end gap-x-4 lg:gap-x-6">
          <button type="button" class="-m-2.5 p-2.5 text-[#457B9D] hover:text-[#1D3557] transition-colors">
            <span class="sr-only">View notifications</span>
            <BellIcon class="size-5" aria-hidden="true" />
          </button>
          <div class="hidden lg:block lg:h-6 lg:w-px lg:bg-[#1D3557]/10" aria-hidden="true"></div>
          <Menu as="div" class="relative">
            <MenuButton class="relative flex items-center gap-x-3">
              <span class="absolute -inset-1.5"></span>
              <span class="sr-only">Open user menu</span>
              <img class="size-8 rounded-full object-cover ring-2 ring-[#A8DADC]" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
              <span class="hidden lg:flex lg:items-center">
                <span class="text-sm font-semibold text-[#1D3557]">Tom Cook</span>
                <ChevronDownIcon class="ml-2 size-4 text-[#457B9D]" aria-hidden="true" />
              </span>
            </MenuButton>
            <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
              <MenuItems class="absolute right-0 z-10 mt-2.5 w-36 origin-top-right rounded-xl bg-white py-2 shadow-lg ring-1 ring-[#1D3557]/10">
                <MenuItem v-for="item in userNavigation" :key="item.name" v-slot="{ active }">
                  <a :href="item.href" :class="[active ? 'bg-[#F1FAEE] text-[#D62828]' : 'text-[#1D3557]', 'block px-4 py-1.5 text-sm font-medium transition-colors']">{{ item.name }}</a>
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </div>

      <!-- Page content -->
      <main class="py-10 bg-[#F1FAEE] min-h-[calc(100vh-4rem)]">
        <div class="px-4 sm:px-6 lg:px-8">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Dialog, DialogPanel, Menu, MenuButton, MenuItem, MenuItems, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { Bars3Icon, BellIcon, CalendarIcon, ChartPieIcon, Cog6ToothIcon, DocumentDuplicateIcon, FolderIcon, HomeIcon, UsersIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
import { useRoute } from 'vue-router'

const route = useRoute()
const sidebarOpen = ref(false)

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Team',      href: '/team',      icon: UsersIcon },
  { name: 'Programs',  href: '/program',   icon: FolderIcon },
  { name: 'Schedule',  href: '/schedule',  icon: CalendarIcon },
  { name: 'Inventory', href: '/inventory', icon: DocumentDuplicateIcon },
  { name: 'Reports',   href: '/report',    icon: ChartPieIcon },
]

const userNavigation = [
  { name: 'Your profile', href: '/profile/overview' },
  { name: 'Sign out',     href: '/' },
]


</script>