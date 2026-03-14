<template>
  <div>
    <!-- Mobile sidebar -->
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog class="relative z-50 lg:hidden" @close="sidebarOpen = false">
        <TransitionChild
          as="template"
          enter="transition-opacity ease-linear duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-stone-950/70"></div>
        </TransitionChild>

        <div class="fixed inset-0 flex">
          <TransitionChild
            as="template"
            enter="transition ease-in-out duration-300 transform"
            enter-from="-translate-x-full"
            enter-to="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leave-from="translate-x-0"
            leave-to="-translate-x-full"
          >
            <DialogPanel class="relative flex flex-1 w-full max-w-xs mr-16">
              <TransitionChild
                as="template"
                enter="ease-in-out duration-300"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="ease-in-out duration-300"
                leave-from="opacity-100"
                leave-to="opacity-0"
              >
                <div class="absolute top-0 flex justify-center w-16 pt-5 left-full">
                  <button type="button" class="-m-2.5 p-2.5" @click="sidebarOpen = false">
                    <span class="sr-only">Close sidebar</span>
                    <XMarkIcon class="size-5 text-stone-300" aria-hidden="true" />
                  </button>
                </div>
              </TransitionChild>

              <!-- Mobile sidebar panel -->
              <div class="flex grow flex-col gap-y-6 overflow-y-auto bg-[#1A1A18] px-6 pb-4">
                <div class="flex items-center h-16 shrink-0">
                  <div class="flex items-center justify-center w-8 h-8 border border-stone-500">
                    <span class="font-serif text-base font-normal leading-none text-stone-100">S</span>
                  </div>
                </div>
                <nav class="flex flex-col flex-1">
                  <ul role="list" class="flex flex-col flex-1 gap-y-7">
                    <li>
                      <ul role="list" class="-mx-2 space-y-0.5">
                        <li v-for="item in navigation" :key="item.name">
                          <NuxtLink
                            :to="item.href"
                            :class="[
                              route.path === item.href
                                ? 'bg-white/8 text-stone-100'
                                : 'text-stone-400 hover:bg-white/5 hover:text-stone-200',
                              'group flex gap-x-3 rounded-sm px-2 py-2 text-xs font-sans font-medium uppercase tracking-widest transition-colors'
                            ]"
                          >
                            <component :is="item.icon" class="mt-px size-4 shrink-0" aria-hidden="true" />
                            {{ item.name }}
                          </NuxtLink>
                        </li>
                      </ul>
                    </li>
                    <li class="mt-auto">
                      <div class="pt-4 border-t border-stone-700/50">
                        <a
                          href="/setting"
                          class="flex px-2 py-2 -mx-2 font-sans text-xs font-medium tracking-widest uppercase transition-colors rounded-sm group gap-x-3 text-stone-500 hover:bg-white/5 hover:text-stone-300"
                        >
                          <Cog6ToothIcon class="mt-px size-4 shrink-0" aria-hidden="true" />
                          Settings
                        </a>
                      </div>
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
    <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col bg-[#1A1A18]">
      <div class="flex flex-col px-6 pb-4 overflow-y-auto grow gap-y-6">
        <!-- Logo -->
        <div class="flex items-center h-16 shrink-0">
          <div class="flex items-center justify-center w-8 h-8 border border-stone-500">
            <span class="font-serif text-base font-normal leading-none text-stone-100">S</span>
          </div>
        </div>

        <nav class="flex flex-col flex-1">
          <ul role="list" class="flex flex-col flex-1 gap-y-7">
            <li>
              <p class="text-[10px] font-sans font-medium text-stone-600 uppercase tracking-widest mb-3">Menu</p>
              <ul role="list" class="-mx-2 space-y-0.5">
                <li v-for="item in navigation" :key="item.name">
                  <NuxtLink
                    :to="item.href"
                    :class="[
                      route.path === item.href
                        ? 'bg-white/8 text-stone-100'
                        : 'text-stone-400 hover:bg-white/5 hover:text-stone-200',
                      'group flex gap-x-3 rounded-sm px-2 py-2 text-xs font-sans font-medium uppercase tracking-widest transition-colors'
                    ]"
                  >
                    <component :is="item.icon" class="mt-px size-4 shrink-0" aria-hidden="true" />
                    {{ item.name }}
                  </NuxtLink>
                </li>
              </ul>
            </li>

            <li class="mt-auto">
              <div class="pt-4 border-t border-stone-700/50">
                <a
                  href="/setting"
                  class="flex px-2 py-2 -mx-2 font-sans text-xs font-medium tracking-widest uppercase transition-colors rounded-sm group gap-x-3 text-stone-500 hover:bg-white/5 hover:text-stone-300"
                >
                  <Cog6ToothIcon class="mt-px size-4 shrink-0" aria-hidden="true" />
                  Settings
                </a>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <!-- Main content -->
    <div class="lg:pl-64">
      <!-- Topbar -->
      <div class="sticky top-0 z-40 flex h-14 shrink-0 items-center gap-x-4 border-b border-stone-200 bg-[#F7F6F3] px-4 sm:gap-x-6 sm:px-6 lg:px-8">
        <!-- Mobile menu button -->
        <button
          type="button"
          class="-m-2.5 p-2.5 text-stone-600 hover:text-stone-900 lg:hidden transition-colors"
          @click="sidebarOpen = true"
        >
          <span class="sr-only">Open sidebar</span>
          <Bars3Icon class="size-5" aria-hidden="true" />
        </button>

        <div class="w-px h-4 bg-stone-900/10 lg:hidden" aria-hidden="true"></div>

        <div class="flex self-stretch flex-1 gap-x-4 lg:gap-x-6">
          <div class="flex flex-1"></div>

          <div class="flex items-center gap-x-4 lg:gap-x-5">
            <!-- Notifications -->
            <button type="button" class="-m-2.5 p-2.5 text-stone-400 hover:text-stone-700 transition-colors">
              <span class="sr-only">View notifications</span>
              <BellIcon class="size-5" aria-hidden="true" />
            </button>

            <div class="hidden lg:block lg:h-4 lg:w-px lg:bg-stone-900/10" aria-hidden="true"></div>

            <!-- User menu -->
            <Menu as="div" class="relative">
              <MenuButton class="relative flex items-center gap-x-3 group">
                <span class="absolute -inset-1.5"></span>
                <span class="sr-only">Open user menu</span>
                <img
                  class="object-cover size-7 ring-1 ring-stone-200 rounded-2xl"
                  src="/Me.jpg"
                  alt=""
                />
                <span class="hidden lg:flex lg:items-center gap-x-2">
                  <span class="font-sans text-xs font-medium text-stone-900" aria-hidden="true">Jake Maunas</span>
                  <ChevronDownIcon class="transition-colors size-4 text-stone-400 group-hover:text-stone-600" aria-hidden="true" />
                </span>
              </MenuButton>

              <transition
                enter-active-class="transition duration-100 ease-out"
                enter-from-class="transform scale-95 opacity-0"
                enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-75 ease-in"
                leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0"
              >
                <MenuItems class="absolute right-0 z-10 py-1 mt-2 origin-top-right bg-white border rounded-sm shadow-sm w-36 border-stone-200">
                  <MenuItem v-for="item in userNavigation" :key="item.name" v-slot="{ active }">
                    <a
                      :href="item.href"
                      :class="[
                        active ? 'bg-stone-50 text-stone-900' : 'text-stone-500',
                        'block px-3 py-1.5 text-xs font-sans uppercase tracking-widest transition-colors'
                      ]"
                    >{{ item.name }}</a>
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </div>
      </div>

      <!-- Page content -->
      <main class="py-10 bg-[#F7F6F3] min-h-screen">
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
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
import { useRoute } from 'vue-router'

const route = useRoute()

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Team', href: '/team', icon: UsersIcon },
  { name: 'Projects', href: '/project', icon: FolderIcon },
  { name: 'Calendar', href: '/calendar', icon: CalendarIcon },
  { name: 'Documents', href: '/document', icon: DocumentDuplicateIcon },
  { name: 'Reports', href: '/report', icon: ChartPieIcon },
]

const userNavigation = [
  { name: 'Your profile', href: '/profile' },
  { name: 'Sign out', href: '/' },
]

const sidebarOpen = ref(false)


</script>