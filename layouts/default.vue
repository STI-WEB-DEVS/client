<template>
  <div>
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog class="relative z-50 lg:hidden" @close="sidebarOpen = false">
        <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0"
          enter-to="" leave="transition-opacity ease-linear duration-300" leave-from="" leave-to="opacity-0">
          <div class="fixed inset-0 bg-[#3A5743]/80"></div>
        </TransitionChild>

        <div class="fixed inset-0 flex">
          <TransitionChild as="template" enter="transition ease-in-out duration-300 transform"
            enter-from="-translate-x-full" enter-to="translate-x-0"
            leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0"
            leave-to="-translate-x-full">
            <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
              <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0" enter-to=""
                leave="ease-in-out duration-300" leave-from="" leave-to="opacity-0">
                <div class="absolute left-full top-0 flex w-16 justify-center pt-5">
                  <button type="button" class="-m-2.5 p-2.5" @click="sidebarOpen = false">
                    <span class="sr-only">Close sidebar</span>
                    <XMarkIcon class="size-6 text-[#CFFFB3]" aria-hidden="true" />
                  </button>
                </div>
              </TransitionChild>

              <div
                class="relative flex grow flex-col gap-y-5 overflow-y-auto bg-[#3A5743] px-6 pb-4 ring-1 ring-[#3B7080]">
                <div class="flex h-16 shrink-0 items-center gap-x-3">
                  <div class="flex h-16 shrink-0 items-center gap-x-3">
                    <div class="flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="size-9" fill="#ADE25D" viewBox="0 0 256 256">
                        <path
                          d="M120,48a32,32,0,1,1,32,32A32,32,0,0,1,120,48Zm72,88c-23.37,0-28.92-8.56-36.6-20.4-3.65-5.64-7.79-12-14.16-17.55a40.92,40.92,0,0,0-8-5.47,8,8,0,0,0-11,3.92L64.66,228.81a8,8,0,0,0,4.15,10.52A7.84,7.84,0,0,0,72,240a8,8,0,0,0,7.34-4.81l33.59-77.27L144,180.12V232a8,8,0,0,0,16,0V176a8,8,0,0,0-3.35-6.51l-37.2-26.57,13.4-30.81c3.57,3.62,6.28,7.8,9.13,12.19,7.67,11.84,16.27,25.11,42,27.36V232a8,8,0,0,0,16,0V144A8,8,0,0,0,192,136ZM72,152a8,8,0,0,0,7.36-4.85l24-56a8,8,0,0,0-4.2-10.5l-28-12a8,8,0,0,0-10.5,4.2l-24,56a8,8,0,0,0,4.2,10.5l28,12A8,8,0,0,0,72,152Z">
                        </path>
                      </svg>
                    </div>
                  </div>
                  <span class="text-[#CFFFB3] font-semibold text-sm tracking-wide">HikeAdmin</span>
                </div>
                <nav class="flex flex-1 flex-col">
                  <ul role="list" class="flex flex-1 flex-col gap-y-7">
                    <li v-for="group in navigationGroups" :key="group.label">
                      <p class="text-[10px] font-semibold tracking-[0.15em] uppercase text-[#3B7080] mb-2">{{
                        group.label }}</p>
                      <ul role="list" class="-mx-2 space-y-1">
                        <li v-for="item in group.items" :key="item.name">
                          <NuxtLink :to="item.href"
                            :class="[route.path === item.href ? 'bg-[#3B7080] text-[#CFFFB3]' : 'text-[#ADE25D] hover:bg-[#3B7080]/60 hover:text-[#CFFFB3]', 'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold transition-colors']">
                            <component :is="item.icon" class="size-5 shrink-0" aria-hidden="true" />
                            {{ item.name }}
                          </NuxtLink>
                        </li>
                      </ul>
                    </li>
                    <li class="mt-auto">
                      <a href="/settings"
                        class="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-[#ADE25D] hover:bg-[#3B7080] hover:text-[#CFFFB3] transition-colors">
                        <Cog6ToothIcon class="size-5 shrink-0" aria-hidden="true" />
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

    <!-- Desktop sidebar -->
    <div class="hidden bg-[#3A5743] ring-1 ring-[#3B7080] lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-black/10 px-6 pb-4">
        <div class="flex h-16 shrink-0 items-center gap-x-3">
          <div class="flex h-16 shrink-0 items-center gap-x-3">
            <div class="flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="size-9" fill="#ADE25D" viewBox="0 0 256 256">
                <path
                  d="M120,48a32,32,0,1,1,32,32A32,32,0,0,1,120,48Zm72,88c-23.37,0-28.92-8.56-36.6-20.4-3.65-5.64-7.79-12-14.16-17.55a40.92,40.92,0,0,0-8-5.47,8,8,0,0,0-11,3.92L64.66,228.81a8,8,0,0,0,4.15,10.52A7.84,7.84,0,0,0,72,240a8,8,0,0,0,7.34-4.81l33.59-77.27L144,180.12V232a8,8,0,0,0,16,0V176a8,8,0,0,0-3.35-6.51l-37.2-26.57,13.4-30.81c3.57,3.62,6.28,7.8,9.13,12.19,7.67,11.84,16.27,25.11,42,27.36V232a8,8,0,0,0,16,0V144A8,8,0,0,0,192,136ZM72,152a8,8,0,0,0,7.36-4.85l24-56a8,8,0,0,0-4.2-10.5l-28-12a8,8,0,0,0-10.5,4.2l-24,56a8,8,0,0,0,4.2,10.5l28,12A8,8,0,0,0,72,152Z">
                </path>
              </svg>
            </div>
          </div>
          <span class="text-[#CFFFB3] font-semibold text-sm tracking-wide">HikeAdmin</span>
        </div>
        <nav class="flex flex-1 flex-col">
          <ul role="list" class="flex flex-1 flex-col gap-y-6">
            <li v-for="group in navigationGroups" :key="group.label">
              <p class="text-[10px] font-semibold tracking-[0.15em] uppercase text-[#3B7080] mb-2 px-2">{{ group.label
                }}</p>
              <ul role="list" class="-mx-2 space-y-1">
                <li v-for="item in group.items" :key="item.name">
                  <NuxtLink :to="item.href"
                    :class="[route.path === item.href ? 'bg-[#3B7080] text-[#CFFFB3]' : 'text-[#ADE25D] hover:bg-[#3B7080]/60 hover:text-[#CFFFB3]', 'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold transition-colors']">
                    <component :is="item.icon" class="size-5 shrink-0" aria-hidden="true" />
                    {{ item.name }}
                  </NuxtLink>
                </li>
              </ul>
            </li>
            <li class="mt-auto">
              <a href="/settings"
                class="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-[#ADE25D] hover:bg-[#3B7080] hover:text-[#CFFFB3] transition-colors">
                <Cog6ToothIcon class="size-5 shrink-0" aria-hidden="true" />
                Settings
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <div class="lg:pl-72">
      <!-- Topbar -->
      <div
        class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-[#3B7080] bg-[#3A5743] px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
        <button type="button" class="-m-2.5 p-2.5 text-[#ADE25D] hover:text-[#CFFFB3] lg:hidden"
          @click="sidebarOpen = true">
          <span class="sr-only">Open sidebar</span>
          <Bars3Icon class="size-6" aria-hidden="true" />
        </button>

        <div class="h-6 w-px bg-[#3B7080] lg:hidden" aria-hidden="true"></div>

        <div class="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
          <div class="flex flex-1"></div>
          <div class="flex items-center gap-x-4 lg:gap-x-6">
            <button type="button" class="-m-2.5 p-2.5 text-[#ADE25D] hover:text-[#CFFFB3]">
              <span class="sr-only">View notifications</span>
              <BellIcon class="size-6" aria-hidden="true" />
            </button>

            <div class="hidden lg:block lg:h-6 lg:w-px lg:bg-[#3B7080]" aria-hidden="true"></div>

            <Menu as="div" class="relative">
              <MenuButton class="relative flex items-center">
                <span class="absolute -inset-1.5"></span>
                <span class="sr-only">Open user menu</span>
                <img class="size-8 rounded-full bg-[#3B7080] outline outline-1 -outline-offset-1 outline-[#ADE25D]/30"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="" />
                <span class="hidden lg:flex lg:items-center">
                  <span class="ml-4 text-sm/6 font-semibold text-[#CFFFB3]" aria-hidden="true">Admin</span>
                  <ChevronDownIcon class="ml-2 size-5 text-[#ADE25D]" aria-hidden="true" />
                </span>
              </MenuButton>
              <transition enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95" enter-to-class="transform scale-100"
                leave-active-class="transition ease-in duration-75" leave-from-class="transform scale-100"
                leave-to-class="transform opacity-0 scale-95">
                <MenuItems
                  class="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-[#3A5743] py-2 shadow-lg outline outline-1 outline-[#3B7080]">
                  <MenuItem v-for="item in userNavigation" :key="item.name" v-slot="{ active }">
                  <a :href="item.href"
                    :class="[active ? 'bg-[#3B7080] outline-none' : '', 'block px-3 py-1 text-sm/6 text-[#CFFFB3]']">{{
                    item.name }}</a>
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </div>
      </div>

      <main class="py-10 bg-[#3A5743] min-h-screen">
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
  Dialog, DialogPanel, Menu, MenuButton, MenuItem, MenuItems,
  TransitionChild, TransitionRoot,
} from '@headlessui/vue'
import {
  Bars3Icon, BellIcon, Cog6ToothIcon, XMarkIcon,
  HomeIcon, UsersIcon, FolderIcon, DocumentDuplicateIcon,
  ChartPieIcon, CurrencyDollarIcon, MapIcon, ClipboardDocumentListIcon,
} from '@heroicons/vue/24/outline'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
import { useRoute } from 'vue-router'

const route = useRoute()

const navigationGroups = [
  {
    label: 'Overview',
    items: [
      { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
      { name: 'Reports', href: '/reports', icon: ChartPieIcon },
    ],
  },
  {
    label: 'Management',
    items: [
      { name: 'Organizers', href: '/organizers', icon: FolderIcon },
      { name: 'Hikers', href: '/hikers', icon: UsersIcon },
      { name: 'Team', href: '/team', icon: ClipboardDocumentListIcon },
    ],
  },
  {
    label: 'Operations',
    items: [
      { name: 'Hiking Tours', href: '/tours', icon: MapIcon },
      { name: 'Sales & Commission', href: '/commission', icon: CurrencyDollarIcon },
      { name: 'Documents', href: '/documents', icon: DocumentDuplicateIcon },
    ],
  },
]

const userNavigation = [
  { name: 'Your profile', href: '/profile' },
  { name: 'Sign out', href: '/' },
]

const sidebarOpen = ref(false)
</script>