<template>
  <div class="min-h-screen bg-slate-50">
    <template v-if="route.path !== '/'">
      <TransitionRoot as="template" :show="sidebarOpen">
        <Dialog class="relative z-50 lg:hidden" @close="sidebarOpen = false">
          <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100" leave-to="opacity-0">
            <div class="fixed inset-0 bg-slate-900/80" />
          </TransitionChild>
          <div class="fixed inset-0 flex">
            <TransitionChild as="template" enter="transition ease-in-out duration-300 transform" enter-from="-translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0" leave-to="-translate-x-full">
              <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
                <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-[#020617] px-6 pb-4">
                  <div class="flex h-16 shrink-0 items-center">
                    <span class="text-2xl font-black italic text-white tracking-tighter">TravelEase</span>
                  </div>
                  <nav class="flex flex-1 flex-col">
                    <ul role="list" class="flex flex-1 flex-col gap-y-7">
                      <li>
                        <ul role="list" class="-mx-2 space-y-1">
                          <li v-for="item in navigation" :key="item.name">
                            <NuxtLink :to="item.href" :class="[route.path === item.href ? 'bg-[#0088cc] text-white' : 'text-slate-400 hover:bg-slate-900', 'group flex gap-x-3 rounded-lg p-3 text-sm font-semibold transition-all']">
                              <component :is="item.icon" class="size-6 shrink-0" aria-hidden="true" />
                              {{ item.name }}
                            </NuxtLink>
                          </li>
                        </ul>
                      </li>
                      <li class="mt-auto">
                        <button @click="handleSignOut" class="group -mx-2 flex w-full gap-x-3 rounded-lg p-3 text-sm font-semibold text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all">
                          <ArrowLeftOnRectangleIcon class="size-6 shrink-0 text-slate-500 group-hover:text-red-400" aria-hidden="true" />
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

      <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col bg-[#020617] px-6 pb-4">
        <div class="flex h-20 shrink-0 items-center">
          <span class="text-3xl font-black italic text-white tracking-tighter">TravelEase</span>
        </div>
        <nav class="flex flex-1 flex-col">
          <ul role="list" class="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" class="-mx-2 space-y-2">
                <li v-for="item in navigation" :key="item.name">
                  <NuxtLink :to="item.href" :class="[route.path === item.href ? 'bg-[#0088cc] text-white shadow-lg' : 'text-slate-400 hover:bg-slate-900 hover:text-white', 'group flex gap-x-4 rounded-lg p-3 text-base font-medium transition-all duration-200']">
                    <component :is="item.icon" class="size-6 shrink-0" aria-hidden="true" />
                    {{ item.name }}
                  </NuxtLink>
                </li>
              </ul>
            </li>
            <li class="mt-auto space-y-1">
              <NuxtLink to="/settings" class="group -mx-2 flex gap-x-4 rounded-lg p-3 text-base font-medium text-slate-400 hover:bg-slate-900 hover:text-white transition-all">
                <Cog6ToothIcon class="size-6 shrink-0 text-slate-500 group-hover:text-white" aria-hidden="true" />
                Settings
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </div>
    </template>

    <div :class="[route.path === '/' ? '' : 'lg:pl-72']">
      
      <div v-if="route.path !== '/'" class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
        <button type="button" class="-m-2.5 p-2.5 text-gray-700 lg:hidden" @click="sidebarOpen = true">
          <Bars3Icon class="size-6" aria-hidden="true" />
        </button>
        <div class="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
          <div class="relative flex flex-1"></div>
          <div class="flex items-center gap-x-4 lg:gap-x-6">
            <button type="button" class="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
              <BellIcon class="size-6" aria-hidden="true" />
            </button>
            <div class="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10" aria-hidden="true" />
            <Menu as="div" class="relative">
              <MenuButton class="-m-1.5 flex items-center p-1.5">
                <img class="size-8 rounded-full bg-gray-50" src="https://i.pinimg.com/1200x/b0/25/d2/b025d2b33ebe6db7e576ff3476f9acde.jpg" alt="" />
                <span class="hidden lg:flex lg:items-center">
                  <span class="ml-4 text-sm font-semibold text-gray-900" aria-hidden="true">Admin</span>
                  <ChevronDownIcon class="ml-2 size-5 text-gray-400" aria-hidden="true" />
                </span>
              </MenuButton>
              <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform scale-100" leave-to-class="transform opacity-0 scale-95">
                <MenuItems class="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                  <MenuItem v-slot="{ active }">
                    <NuxtLink to="/profile" :class="[active ? 'bg-gray-50' : '', 'block px-3 py-1 text-sm text-gray-900']">Profile</NuxtLink>
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                    <button @click="handleSignOut" :class="[active ? 'bg-gray-50' : '', 'block w-full text-left px-3 py-1 text-sm text-gray-900']">Sign out</button>
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </div>
      </div>

      <main :class="[route.path === '/' ? '' : 'py-10 bg-slate-50 min-h-screen']">
        <div :class="[route.path === '/' ? '' : 'px-4 sm:px-6 lg:px-8']">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Dialog, DialogPanel, Menu, MenuButton, MenuItem, MenuItems, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { 
  HomeIcon, TicketIcon, BriefcaseIcon, GlobeAmericasIcon, TagIcon, 
  UsersIcon, Cog6ToothIcon, BellIcon, Bars3Icon, ArrowLeftOnRectangleIcon 
} from '@heroicons/vue/24/outline'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'

const route = useRoute()
const router = useRouter()
const sidebarOpen = ref(false)

const handleSignOut = () => {
  router.push('/')
}

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Reservations', href: '/bookings', icon: TicketIcon },
  { name: 'Travel Packages', href: '/packages', icon: BriefcaseIcon },
  { name: 'Destinations', href: '/destinations', icon: GlobeAmericasIcon },
  { name: 'Special Promos', href: '/promos', icon: TagIcon },
  { name: 'Travel Agents', href: '/team', icon: UsersIcon },
]
</script>