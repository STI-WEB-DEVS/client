<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-slate-50 to-amber-50/40">
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

              <div class="relative flex grow flex-col gap-y-5 overflow-y-auto bg-gradient-to-b from-slate-900 to-slate-800 px-6 pb-6 ring-1 ring-white/10">
                <div class="relative flex h-16 shrink-0 items-center justify-between">
                  <div class="flex items-center gap-2">
                    <div class="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center font-black text-slate-900">P</div>
                    <span class="text-white font-bold text-sm tracking-wide">SmartPark - Admin</span>
                  </div>
                </div>
                <nav class="relative flex flex-1 flex-col">
                  <ul role="list" class="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" class="-mx-2 space-y-1">
                        <li v-for="item in navigation" :key="item.name">
                          <NuxtLink :to="item.href" :class="navItemClass(item.href)">
                            <component :is="item.icon" class="size-6 shrink-0" aria-hidden="true" />
                            {{ item.name }}
                          </NuxtLink>
                        </li>
                      </ul>
                    </li>
                    <li class="mt-auto space-y-1">
                      <NuxtLink to="/settings" :class="navItemClass('/settings')">
                        <Cog6ToothIcon class="size-6 shrink-0" aria-hidden="true" />
                        Settings
                      </NuxtLink>
                      <button @click="handleSignOut" class="w-full group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-300 transition hover:bg-white/10 hover:text-white">
                        <ArrowRightOnRectangleIcon class="size-6 shrink-0" aria-hidden="true" />
                        Sign Out
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <div class="hidden bg-gradient-to-b from-slate-900 to-slate-800 ring-1 ring-white/10 lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-black/20 px-6 pb-6">
        <div class="flex h-16 shrink-0 items-center justify-between">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center font-black text-slate-900">P</div>
            <span class="text-white font-bold tracking-wide">SmartPark - Admin</span>
          </div>
        </div>
        <nav class="flex flex-1 flex-col">
          <ul role="list" class="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" class="-mx-2 space-y-1">
                <li v-for="item in navigation" :key="item.name">
                  <NuxtLink :to="item.href" :class="navItemClass(item.href)">
                    <component :is="item.icon" class="size-6 shrink-0" aria-hidden="true" />
                    {{ item.name }}
                  </NuxtLink>
                </li>
              </ul>
            </li>
            <li class="mt-auto space-y-1">
              <NuxtLink to="/settings" :class="navItemClass('/settings')">
                <Cog6ToothIcon class="size-6 shrink-0" aria-hidden="true" />
                Settings
              </NuxtLink>
              <button @click="handleSignOut" class="w-full group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-300 transition hover:bg-white/10 hover:text-white">
                <ArrowRightOnRectangleIcon class="size-6 shrink-0" aria-hidden="true" />
                Sign Out
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <div class="lg:pl-72">
      <div class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-slate-200/80 bg-white/85 px-4 shadow-sm backdrop-blur sm:gap-x-6 sm:px-6 lg:px-8">
        <button type="button" class="-m-2.5 p-2.5 text-gray-700 hover:text-gray-900 lg:hidden" @click="sidebarOpen = true">
          <span class="sr-only">Open sidebar</span>
          <Bars3Icon class="size-6" aria-hidden="true" />
        </button>

        <div class="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true"></div>

        <div class="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
          <div class="flex flex-1 items-center">
            <p class="hidden text-sm font-semibold text-slate-700 lg:block">Operations Center</p>
          </div>
          <div class="flex items-center gap-x-4 lg:gap-x-6">
            <button type="button" class="-m-2.5 rounded-lg p-2.5 text-gray-400 transition hover:bg-slate-100 hover:text-gray-500">
              <span class="sr-only">View notifications</span>
              <BellIcon class="size-6" aria-hidden="true" />
            </button>

            <div class="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10" aria-hidden="true"></div>

            <Menu as="div" class="relative">
              <MenuButton class="relative flex items-center">
                <span class="absolute -inset-1.5"></span>
                <span class="sr-only">Open user menu</span>
                <img class="size-8 rounded-full bg-gray-50 outline outline-2 -outline-offset-2 outline-amber-200" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                <span class="hidden lg:flex lg:items-center">
                  <span class="ml-4 text-sm/6 font-semibold text-gray-900" aria-hidden="true">Isaiah Calamba</span>
                  <ChevronDownIcon class="ml-2 size-5 text-gray-400" aria-hidden="true" />
                </span>
              </MenuButton>
              <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform scale-100" leave-to-class="transform opacity-0 scale-95">
                <MenuItems class="absolute right-0 z-10 mt-2.5 w-36 origin-top-right rounded-xl bg-white py-2 shadow-lg outline outline-1 outline-gray-900/5">
                  <MenuItem v-slot="{ active }">
                    <NuxtLink to="/profile" :class="[active ? 'bg-gray-50 outline-none' : '', 'block px-3 py-1 text-sm/6 text-gray-900']">Your profile</NuxtLink>
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                    <button @click="handleSignOut" :class="[active ? 'bg-gray-50 outline-none' : '', 'block w-full text-left px-3 py-1 text-sm/6 text-gray-900']">Sign out</button>
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </div>
      </div>

      <main class="py-10">
        <div class="px-4 sm:px-6 lg:px-8">
            <slot></slot>
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
  BuildingOffice2Icon,
  ChartPieIcon,
  Cog6ToothIcon,
  DocumentDuplicateIcon,
  HomeIcon,
  QrCodeIcon,
  UsersIcon,
  XMarkIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/vue/24/outline'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
import { useRoute } from 'vue-router'

const route = useRoute()

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Team', href: '/team', icon: UsersIcon },
  { name: 'Parking Zones', href: '/projects', icon: BuildingOffice2Icon },
  { name: 'QR Tickets', href: '/calendar', icon: QrCodeIcon },
  { name: 'Operations Logs', href: '/documents', icon: DocumentDuplicateIcon },
  { name: 'Reports', href: '/reports', icon: ChartPieIcon },
]

const navItemClass = (href) => [
  route.path === href
    ? 'bg-white/15 text-white ring-1 ring-white/20'
    : 'text-gray-300 hover:bg-white/10 hover:text-white',
  'group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold transition',
]

const handleSignOut = async () => {
  await navigateTo('/')
}

const sidebarOpen = ref(false)
</script>