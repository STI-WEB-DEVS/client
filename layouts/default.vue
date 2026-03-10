
<template>
  <div class="min-h-screen bg-stone-100/70 text-slate-900">
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog class="relative z-50 lg:hidden" @close="sidebarOpen = false">
        <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-slate-900/70" />
        </TransitionChild>

        <div class="fixed inset-0 flex">
          <TransitionChild as="template" enter="transition ease-in-out duration-300 transform" enter-from="-translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0" leave-to="-translate-x-full">
            <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
              <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in-out duration-300" leave-from="opacity-100" leave-to="opacity-0">
                <div class="absolute left-full top-0 flex w-16 justify-center pt-5">
                  <button type="button" class="-m-2.5 p-2.5 text-white" @click="sidebarOpen = false">
                    <span class="sr-only">Close sidebar</span>
                    <XMarkIcon class="size-6" aria-hidden="true" />
                  </button>
                </div>
              </TransitionChild>

              <aside class="flex grow flex-col gap-y-6 overflow-y-auto bg-[#4E342E] px-6 pb-4 ring-1 ring-[#6D4C41]">
                <div class="mt-5 flex items-center gap-3">
                  <div class="flex size-10 items-center justify-center rounded-xl bg-[#A1887F] text-xl">☕</div>
                  <div>
                    <p class="text-xs font-semibold uppercase tracking-[0.2em] text-[#FFE0B2]">BrewSpot</p>
                  </div>
                </div>
                <nav class="flex flex-1 flex-col">
                  <ul role="list" class="space-y-2">
                    <li v-for="item in navigation" :key="item.name">
                      <NuxtLink
                        :to="item.href"
                        :class="[
                          route.path === item.href
                            ? 'bg-[#8D6E63]/40 text-[#FFF3E0] ring-1 ring-[#D7CCC8]/40'
                            : 'text-[#EFEBE9] hover:bg-[#6D4C41] hover:text-white',
                          'group flex items-center gap-x-3 rounded-lg px-3 py-2 text-sm font-semibold transition'
                        ]"
                      >
                        <component :is="item.icon" class="size-5 shrink-0" aria-hidden="true" />
                        {{ item.name }}
                      </NuxtLink>
                    </li>
                  </ul>
                  <div class="mt-auto pb-2">
                    <button
                      type="button"
                      class="group flex w-full items-center gap-x-3 rounded-lg px-3 py-2 text-sm font-semibold text-[#FFCCBC] transition hover:bg-[#6D4C41] hover:text-white"
                      @click="signOut"
                    >
                      <ArrowLeftOnRectangleIcon class="size-5 shrink-0" aria-hidden="true" />
                      Sign out
                    </button>
                  </div>
                </nav>
              </aside>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <aside class="hidden bg-[#4E342E] ring-1 ring-[#6D4C41] lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <div class="flex grow flex-col gap-y-6 overflow-y-auto px-6 pb-4">
        <div class="mt-5 flex items-center gap-3">
          <div class="flex size-10 items-center justify-center rounded-xl bg-[#A1887F] text-xl">☕</div>
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.2em] text-[#FFE0B2]">BrewSpot</p>
          </div>
        </div>

        <nav class="flex flex-1 flex-col">
          <ul role="list" class="space-y-2">
            <li v-for="item in navigation" :key="item.name">
              <NuxtLink
                :to="item.href"
                :class="[
                  route.path === item.href
                    ? 'bg-[#8D6E63]/40 text-[#FFF3E0] ring-1 ring-[#D7CCC8]/40'
                    : 'text-[#EFEBE9] hover:bg-[#6D4C41] hover:text-white',
                  'group flex items-center gap-x-3 rounded-lg px-3 py-2 text-sm font-semibold transition'
                ]"
              >
                <component :is="item.icon" class="size-5 shrink-0" aria-hidden="true" />
                {{ item.name }}
              </NuxtLink>
            </li>
          </ul>
          <div class="mt-auto pb-2">
            <button
              type="button"
              class="group flex w-full items-center gap-x-3 rounded-lg px-3 py-2 text-sm font-semibold text-[#FFCCBC] transition hover:bg-[#6D4C41] hover:text-white"
              @click="signOut"
            >
              <ArrowLeftOnRectangleIcon class="size-5 shrink-0" aria-hidden="true" />
              Sign out
            </button>
          </div>
        </nav>
      </div>
    </aside>

    <div class="lg:pl-72">
      <header class="sticky top-0 z-40 flex h-16 items-center gap-x-4 border-b border-stone-200/50 bg-transparent px-4 backdrop-blur-sm sm:px-6 lg:px-8">
        <button type="button" class="-m-2.5 p-2.5 text-slate-700 hover:text-slate-900 lg:hidden" @click="sidebarOpen = true">
          <span class="sr-only">Open sidebar</span>
          <Bars3Icon class="size-6" aria-hidden="true" />
        </button>

        <div class="flex flex-1 items-center justify-end">
          <Menu as="div" class="relative">
            <MenuButton class="relative flex items-center gap-2 rounded-full border border-stone-300 bg-white/80 px-2 py-1 shadow-sm backdrop-blur">
              <span class="sr-only">Open user menu</span>
              <div class="flex size-8 items-center justify-center rounded-full bg-stone-200 text-sm font-bold text-stone-700">CM</div>
              <ChevronDownIcon class="size-4 text-slate-500" aria-hidden="true" />
            </MenuButton>
            <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform scale-100 opacity-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform scale-100 opacity-100" leave-to-class="transform opacity-0 scale-95">
              <MenuItems class="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-slate-900/5">
                <MenuItem v-slot="{ active }">
                  <NuxtLink :to="'/profile'" :class="[active ? 'bg-stone-100' : '', 'block px-3 py-2 text-sm text-slate-700']">Profile</NuxtLink>
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </header>

      <main class="py-8">
        <div class="px-4 sm:px-6 lg:px-8">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
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
  ArrowLeftOnRectangleIcon,
  HomeIcon,
  ShoppingBagIcon,
  Squares2X2Icon,
  Cog6ToothIcon,
  UserCircleIcon,
  UsersIcon,
  XMarkIcon,
} from '@heroicons/vue/24/outline'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
import { useRoute } from 'vue-router'

const route = useRoute()

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Team Members', href: '/team', icon: UsersIcon },
  { name: 'Owners Info', href: '/orders', icon: ShoppingBagIcon },
  { name: 'Cafe Management', href: '/menu', icon: Squares2X2Icon },
  { name: 'System Settings', href: '/settings', icon: Cog6ToothIcon },
  { name: 'User Profile', href: '/profile', icon: UserCircleIcon },
]

const sidebarOpen = ref(false)

const signOut = async () => {
  await navigateTo('/')
}
</script>