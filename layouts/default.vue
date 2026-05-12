<template>
  <div>
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
          <div class="fixed inset-0 bg-gray-900/80"></div>
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
            <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
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
                  <button type="button" class="-m-2.5 p-2.5" @click="sidebarOpen = false">
                    <span class="sr-only">Close sidebar</span>
                    <XMarkIcon class="size-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </TransitionChild>

              <div class="relative flex grow flex-col gap-y-5 overflow-y-auto bg-blue-600 px-6 pb-4">
                <div class="flex h-16 shrink-0 items-center gap-x-3 border-b border-blue-500/30">
                  <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-white/20">
                    <svg class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582" />
                    </svg>
                  </div>
                  <span class="text-white font-bold text-base tracking-tight">
                    Library Management
                  </span> 
                </div>
                <nav class="relative flex flex-1 flex-col">
                  <ul role="list" class="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" class="-mx-2 space-y-1">
                        <li v-for="item in navigation" :key="item.name">
                          <NuxtLink
                            :to="item.href"
                            :class="[
                              route.path === item.href
                                ? 'bg-blue-700 text-white shadow-sm'
                                : 'text-blue-100 hover:bg-blue-700/50 hover:text-white',
                              'group flex gap-x-3 rounded-md p-2.5 text-sm font-medium transition-colors duration-150',
                            ]"
                          >
                            <component :is="item.icon" class="size-5 shrink-0" aria-hidden="true" />
                            {{ item.name }}
                          </NuxtLink>
                        </li>
                      </ul>
                    </li>
                    <li class="mt-auto">
                      <a
                        href="/settings"
                        class="group -mx-2 flex gap-x-3 rounded-md p-2.5 text-sm font-medium text-blue-100 hover:bg-blue-700/50 hover:text-white transition-colors duration-150"
                      >
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

    <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
      <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-blue-600 px-6 pb-4 shadow-xl">
        
        <div class="flex h-20 shrink-0 items-center gap-x-3 border-b border-blue-500/40">
          <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 shadow-inner">
            <svg class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
          </div>
          <span class="text-white font-bold text-base tracking-tight leading-tight">
            Library Management<br><span class="text-xs text-blue-200 font-normal tracking-normal">System</span>
          </span>
        </div>

        <nav class="flex flex-1 flex-col">
          <ul role="list" class="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" class="-mx-2 space-y-1">
                <li v-for="item in navigation" :key="item.name">
                  <NuxtLink
                    :to="item.href"
                    :class="[
                      route.path === item.href
                        ? 'bg-blue-700 text-white shadow-sm'
                        : 'text-blue-100 hover:bg-blue-500/40 hover:text-white',
                      'group flex gap-x-3 rounded-md p-2.5 text-sm font-medium transition-colors duration-150 items-center',
                    ]"
                  >
                    <component
                      :is="item.icon"
                      :class="[
                        route.path === item.href ? 'text-white' : 'text-blue-200 group-hover:text-white',
                        'size-5 shrink-0 transition-colors duration-150'
                      ]"
                      aria-hidden="true"
                    />
                    {{ item.name }}
                  </NuxtLink>
                </li>
              </ul>
            </li>

            <li class="mt-auto">
              <NuxtLink
                to="/settings"
                :class="[
                  route.path === '/settings' ? 'bg-blue-700 text-white' : 'text-blue-100 hover:bg-blue-500/40 hover:text-white',
                  'group -mx-2 flex gap-x-3 rounded-md p-2.5 text-sm font-medium items-center transition-colors duration-150'
                ]"
              >
                <Cog6ToothIcon 
                  :class="[
                    route.path === '/settings' ? 'text-white' : 'text-blue-200 group-hover:text-white',
                    'size-5 shrink-0'
                  ]" 
                  aria-hidden="true" 
                />
                Settings
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <div class="lg:pl-64">
      <div class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-100 bg-white px-4 sm:gap-x-6 sm:px-6 lg:px-8 shadow-sm">
        <button
          type="button"
          class="-m-2.5 p-2.5 text-gray-700 hover:text-gray-900 lg:hidden"
          @click="sidebarOpen = true"
        >
          <span class="sr-only">Open sidebar</span>
          <Bars3Icon class="size-6" aria-hidden="true" />
        </button>

        <div class="h-6 w-px bg-gray-200 lg:hidden" aria-hidden="true"></div>

        <div class="flex flex-1 justify-end gap-x-4 self-stretch lg:gap-x-6">
          <div class="flex items-center gap-x-4 lg:gap-x-6">
            <button type="button" class="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
              <span class="sr-only">View notifications</span>
              <BellIcon class="size-6" aria-hidden="true" />
            </button>

            <div class="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" aria-hidden="true"></div>

            <Menu as="div" class="relative">
              <MenuButton class="relative flex items-center p-1.5 rounded-full hover:bg-gray-50 transition-colors duration-150">
                <span class="sr-only">Open user menu</span>
                <div class="size-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-semibold text-sm border border-gray-300 shadow-sm">
                  A
                </div>
                <span class="hidden lg:flex lg:items-center">
                  <span class="ml-3 text-sm font-semibold text-gray-700" aria-hidden="true">Admin</span>
                  <ChevronDownIcon class="ml-2 size-4 text-gray-400" aria-hidden="true" />
                </span>
              </MenuButton>
              <transition
                enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <MenuItems class="absolute right-0 z-10 mt-2.5 w-36 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-black/5 focus:outline-none">
                  <MenuItem v-for="item in userNavigation" :key="item.name" v-slot="{ active }">
                    <a
                      :href="item.href"
                      :class="[
                        active ? 'bg-gray-50 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm transition-colors duration-150',
                      ]"
                    >
                      {{ item.name }}
                    </a>
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </div>
      </div>

      <main class="py-10 bg-gray-50/50 min-h-[calc(100vh-4rem)]">
        <div class="px-4 sm:px-6 lg:px-8">
          <slot></slot>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  Dialog,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
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
  UserGroupIcon,
  ShoppingBagIcon,
} from "@heroicons/vue/24/outline";
import { ChevronDownIcon, MagnifyingGlassIcon } from "@heroicons/vue/20/solid";
import { useRoute } from "vue-router";

const route = useRoute();

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
  { name: "Team", href: "/team", icon: UsersIcon },
  { name: "Customers", href: "/customers", icon: UserGroupIcon },
  { name: "Products", href: "/products", icon: ShoppingBagIcon },
  { name: "Projects", href: "/projects", icon: FolderIcon },
  { name: "Calendar", href: "/calendar", icon: CalendarIcon },
  { name: "Documents", href: "/documents", icon: DocumentDuplicateIcon },
  { name: "Reports", href: "/reports", icon: ChartPieIcon },
];

const userNavigation = [
  { name: "Your profile", href: "/profile"  },
  { name: "Sign out", href: "/" },
];

const sidebarOpen = ref(false);
</script>