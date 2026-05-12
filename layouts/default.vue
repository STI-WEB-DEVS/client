<template>
  <div>
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog class="relative z-50 lg:hidden" @close="sidebarOpen = false">
        <div class="fixed inset-0 bg-green-900/80"></div>
         <div class="fixed inset-0 flex">
            <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1 bg-green-900">
                <nav class="flex flex-1 flex-col p-6">
                    <ul role="list" class="-mx-2 space-y-1">
                        <li v-for="item in navigation" :key="item.name">
                            <NuxtLink :to="item.href" class="text-white group flex gap-x-3 rounded-md p-2 text-sm font-semibold">
                                <component :is="item.icon" class="size-6 text-white" />
                                {{ item.name }}
                            </NuxtLink>
                        </li>
                    </ul>
                </nav>
            </DialogPanel>
         </div>
      </Dialog>
    </TransitionRoot>

    <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col bg-green-900">
      <div class="flex grow flex-col gap-y-5 overflow-y-auto px-6 pb-4">
        <div class="flex h-16 shrink-0 items-center text-white font-bold italic">Your Company</div>
        <nav class="flex flex-1 flex-col">
          <ul role="list" class="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" class="-mx-2 space-y-1">
                <li v-for="item in navigation" :key="item.name">
                  <NuxtLink :to="item.href" :class="[route.path === item.href ? 'bg-white/10 text-white' : 'text-gray-300 hover:bg-white/5 hover:text-white', 'group flex gap-x-3 rounded-md p-2 text-sm font-semibold']">
                    <component :is="item.icon" class="size-6 shrink-0" />
                    {{ item.name }}
                  </NuxtLink>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <div class="lg:pl-72">
      <header class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-8 shadow-sm">
        <button type="button" class="lg:hidden" @click="sidebarOpen = true">
            <Bars3Icon class="size-6 text-gray-600" />
        </button>
        <div class="flex flex-1"></div>
        <div class="flex items-center gap-x-4">
            <BellIcon class="size-6 text-gray-400" />
            <div class="h-6 w-px bg-gray-200"></div>
            <span class="text-sm font-semibold text-gray-900">Dedrich Bryce Arce</span>
            <img class="size-8 rounded-full" src="https://cdn.britannica.com/05/236505-050-17B6E34A/Elon-Musk-2022.jpg" />
        </div>
      </header>

      <main class="py-10">
        <div class="px-4 sm:px-6 lg:px-8">
          <slot /> 
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { ArchiveBoxIcon, Bars3Icon, BellIcon, CalendarIcon, ChartPieIcon, HomeIcon, UsersIcon, FolderIcon, DocumentDuplicateIcon } from '@heroicons/vue/24/outline'
import { useRoute } from 'vue-router'

const route = useRoute()
const sidebarOpen = ref(false)

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Team', href: '/team', icon: UsersIcon },
  { name: 'Projects', href: '/projects', icon: FolderIcon },
  { name: 'Calendar', href: '/calendar', icon: CalendarIcon },
  { name: 'Documents', href: '/documents', icon: DocumentDuplicateIcon },
  { name: 'Reports', href: '/reports', icon: ChartPieIcon },
  { name: 'Products', href: '/products', icon: ArchiveBoxIcon },
  { name: 'Customers', href: '/customers', icon: UsersIcon }
]
</script>