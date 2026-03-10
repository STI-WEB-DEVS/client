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

              <div class="relative flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4 ring-1 ring-white/10">
                <div class="relative flex h-16 shrink-0 items-center">
                  <img class="h-8 w-auto" src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" />
                </div>
                <nav class="relative flex flex-1 flex-col">
                  <ul role="list" class="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" class="-mx-2 space-y-1">
                        <li v-for="item in navigation" :key="item.name">
                          <NuxtLink :to="item.href" :class="[route.path === item.href ? 'bg-white/5 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white', 'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold']">
                            <component :is="item.icon" class="size-6 shrink-0" aria-hidden="true" />
                            {{ item.name }}
                          </NuxtLink>
                        </li>
                      </ul>
                    </li>
                    <li class="mt-auto">
                      <a href="/setting" class="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-white hover:bg-white/5 hover:text-white">
                        <Cog6ToothIcon class="size-6 shrink-0" aria-hidden="true" />
                        Settings
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <div class="hidden bg-[#8FA38C] ring-1 ring-white/10 lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-black/10 px-6 pb-4">
        <div class="flex h-16 shrink-0 items-center gap-x-3">
          <img 
            class="h-12 w-12 rounded-full object-cover" 
            src="/images/ManakaTa.png" 
            alt="ManakaTa Logo" 
          />
            <span class="text-lg font-semibold text-white tracking-wide">Manaka Ta!</span>
        </div>

        <nav class="flex flex-1 flex-col">
          <ul role="list" class="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" class="-mx-2 space-y-1">
                <li v-for="item in navigation" :key="item.name">
                  <NuxtLink :to="item.href" :class="[route.path === item.href ? 'bg-[#d0d4c9] text-[#2d4123]' : 'text-white hover:bg-white/5 hover:text-white', 'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold']">
                    <component :is="item.icon" class="size-6 shrink-0" aria-hidden="true" />
                    {{ item.name }}
                  </NuxtLink>
                </li>
              </ul>
            </li>
            <li class="mt-auto">
              <a href="/setting" 
              class="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-white hover:bg-white/5 hover:text-white">
              <Cog6ToothIcon class="size-6 shrink-0" aria-hidden="true" />
              Settings
            </a>
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

        <div class="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
          <div class="flex flex-1"></div> <div class="flex items-center gap-x-4 lg:gap-x-6">
            <button type="button" class="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
              <span class="sr-only">View notifications</span>
              <BellIcon class="size-6" aria-hidden="true" />
            </button>

            <div class="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10" aria-hidden="true"></div>

            <Menu as="div" class="relative">
              <MenuButton class="relative flex items-center">
                <span class="absolute -inset-1.5"></span>
                <span class="sr-only">Open user menu</span>
                <img class="size-8 rounded-full bg-gray-50 outline outline-1 -outline-offset-1 outline-black/5" src="data:image/jpeg;base64,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" alt="" />
                <span class="hidden lg:flex lg:items-center">
                  <span class="ml-4 text-sm/6 font-semibold text-gray-900" aria-hidden="true">Kristine Grace Analasan</span>
                  <ChevronDownIcon class="ml-2 size-5 text-gray-400" aria-hidden="true" />
                </span>
              </MenuButton>
              <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform scale-100" leave-to-class="transform opacity-0 scale-95">
                <MenuItems class="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg outline outline-1 outline-gray-900/5">
                  <MenuItem v-for="item in userNavigation" :key="item.name" v-slot="{ active }">
                    <a :href="item.href" :class="[active ? 'bg-gray-50 outline-none' : '', 'block px-3 py-1 text-sm/6 text-gray-900']">{{ item.name }}</a>
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
  CalendarIcon,
  ChartPieIcon,
  Cog6ToothIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
} from '@heroicons/vue/24/outline'
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/vue/20/solid'
import { useRoute } from 'vue-router'

const route = useRoute()

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Team', href: '/team', icon: UsersIcon },
  { name: 'Projects', href: '/projects', icon: FolderIcon },
  { name: 'Calendar', href: '/calendar', icon: CalendarIcon },
  { name: 'Documents', href: '/documents', icon: DocumentDuplicateIcon },
  { name: 'Reports', href: '/reports', icon: ChartPieIcon },
]

const userNavigation = [
  { name: 'Your profile', href: '/userprofile' },
  { name: 'Sign out', href: '/' },
]

const sidebarOpen = ref(false)
</script>