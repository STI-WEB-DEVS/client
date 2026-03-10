<template>
  <div>
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog class="relative z-50 lg:hidden" @close="sidebarOpen = false">
        <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-green-950/80" /> </TransitionChild>

        <div class="fixed inset-0 flex">
          <TransitionChild as="template" enter="transition ease-in-out duration-300 transform" enter-from="-translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0" leave-to="-translate-x-full">
            <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
              <div class="relative flex grow flex-col gap-y-5 overflow-y-auto bg-green-950 px-6 pb-4 ring-1 ring-white/10">
                <div class="flex h-16 shrink-0 items-center">
                  <img class="h-8 w-auto" src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=emerald&shade=500" alt="Trail Team" />
                </div>
                <nav class="flex flex-1 flex-col">
                  <ul role="list" class="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" class="-mx-2 space-y-1">
                        <li v-for="item in navigation" :key="item.name">
                          <NuxtLink :to="item.href" :class="[route.path === item.href ? 'bg-green-900 text-white' : 'text-green-300 hover:bg-green-900 hover:text-white', 'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold transition']">
                            <component :is="item.icon" :class="[route.path === item.href ? 'text-emerald-400' : 'text-green-400 group-hover:text-white', 'size-6 shrink-0']" aria-hidden="true" />
                            {{ item.name }}
                          </NuxtLink>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <div class="hidden bg-green-950 ring-1 ring-white/5 lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <div class="flex grow flex-col gap-y-5 overflow-y-auto px-6 pb-4 shadow-2xl">
        <div class="flex h-16 shrink-0 items-center">
          <img class="h-9 w-auto" src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=emerald&shade=500" alt="Trail Team" />
          <span class="ml-3 text-white font-black tracking-tight text-xl">Trail<span class="text-emerald-500">Team</span></span>
        </div>
        
        <nav class="flex flex-1 flex-col">
          <ul role="list" class="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" class="-mx-2 space-y-1">
                <li v-for="item in navigation" :key="item.name">
                  <NuxtLink :to="item.href" :class="[route.path === item.href ? 'bg-white/10 text-white ring-1 ring-white/20' : 'text-green-200 hover:bg-white/5 hover:text-white', 'group flex gap-x-3 rounded-xl p-3 text-sm font-bold transition-all duration-200']">
                    <component :is="item.icon" :class="[route.path === item.href ? 'text-emerald-400' : 'text-green-500 group-hover:text-emerald-300', 'size-6 shrink-0 transition-colors']" aria-hidden="true" />
                    {{ item.name }}
                  </NuxtLink>
                </li>
              </ul>
            </li>
            
            <li class="mt-auto border-t border-white/5 pt-4">
              <a href="#" class="group -mx-2 flex gap-x-3 rounded-xl p-3 text-sm font-bold text-green-200 hover:bg-white/5 hover:text-white transition-all">
                <Cog6ToothIcon class="size-6 shrink-0 text-green-500 group-hover:text-emerald-300" aria-hidden="true" />
                Settings
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <div class="lg:pl-72">
       <div class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-100 bg-white/80 backdrop-blur-md px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
         </div>

       <main class="py-10 bg-gray-50/50 min-h-screen">
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
  { name: 'Projects', href: '/project', icon: FolderIcon },
  { name: 'Calendar', href: '/calendar', icon: CalendarIcon },
  { name: 'Documents', href: '/documents', icon: DocumentDuplicateIcon },
  { name: 'Reports', href: '/reports', icon: ChartPieIcon },
]

const userNavigation = [
  { name: 'Your profile', href: '#' },
  { name: 'Sign out', href: '/' },
]

const sidebarOpen = ref(false)
</script>