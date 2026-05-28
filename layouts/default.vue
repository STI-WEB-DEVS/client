<template>
  <div>
    <!-- Mobile Sidebar -->
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog class="relative z-50 lg:hidden" @close="sidebarOpen = false">
        <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-gray-900/80" />
        </TransitionChild>
        <div class="fixed inset-0 flex">
          <TransitionChild as="template" enter="transition ease-in-out duration-300 transform" enter-from="-translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0" leave-to="-translate-x-full">
            <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
              <div class="absolute left-full top-0 flex w-16 justify-center pt-5">
                <button type="button" class="-m-2.5 p-2.5" @click="sidebarOpen = false">
                  <XMarkIcon class="size-6 text-white" />
                </button>
              </div>
              <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-green-900 px-6 pb-4">
                <div class="flex h-16 items-center gap-3">
                  <div class="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                    <ShoppingBagIcon class="w-5 h-5 text-white" />
                  </div>
                  <span class="text-white font-semibold">Admin Panel</span>
                </div>
                <nav class="flex flex-1 flex-col">
                  <ul class="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul class="-mx-2 space-y-1">
                        <li v-for="item in navigation" :key="item.name">
                          <NuxtLink :to="item.href" :class="[route.path === item.href ? 'bg-white/10 text-white' : 'text-gray-400 hover:bg-white/10 hover:text-white', 'group flex gap-x-3 rounded-md p-2 text-sm font-semibold']">
                            <component :is="item.icon" class="size-5 shrink-0" />
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

    <!-- Desktop Sidebar -->
    <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
      <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-green-900 px-6 pb-4">
        <div class="flex h-16 items-center gap-3">
          <div class="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
            <ShoppingBagIcon class="w-5 h-5 text-white" />
          </div>
          <span class="text-white font-semibold text-sm">Admin Panel</span>
        </div>
        <nav class="flex flex-1 flex-col">
          <ul class="flex flex-1 flex-col gap-y-7">
            <li>
              <p class="text-xs font-semibold text-green-400 uppercase tracking-wider mb-2">Main</p>
              <ul class="-mx-2 space-y-1">
                <li v-for="item in navigation" :key="item.name">
                  <NuxtLink :to="item.href" :class="[route.path.startsWith(item.href) ? 'bg-white/10 text-white' : 'text-gray-400 hover:bg-white/10 hover:text-white', 'group flex gap-x-3 rounded-md p-2 text-sm font-semibold transition']">
                    <component :is="item.icon" class="size-5 shrink-0" />
                    {{ item.name }}
                  </NuxtLink>
                </li>
              </ul>
            </li>
            <li class="mt-auto">
              <button @click="logout" class="group -mx-2 flex w-full gap-x-3 rounded-md p-2 text-sm font-semibold text-gray-400 hover:bg-white/10 hover:text-white transition">
                <ArrowRightOnRectangleIcon class="size-5 shrink-0" />
                Sign out
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <!-- Main Content -->
    <div class="lg:pl-64">
      <!-- Top Bar -->
      <div class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:px-6 lg:px-8">
        <button type="button" class="-m-2.5 p-2.5 text-gray-700 lg:hidden" @click="sidebarOpen = true">
          <Bars3Icon class="size-6" />
        </button>
        <div class="h-6 w-px bg-gray-900/10 lg:hidden" />
        <div class="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
          <div class="flex flex-1 items-center">
            <span class="text-sm font-medium text-gray-500">
              Admin Dashboard
            </span>
          </div>
          <div class="flex items-center gap-x-4 lg:gap-x-6">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white text-xs font-bold">A</div>
              <span class="hidden lg:block text-sm font-semibold text-gray-900">Admin</span>
            </div>
          </div>
        </div>
      </div>

      <main class="py-8">
        <div class="px-4 sm:px-6 lg:px-8">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue';
import {
  Bars3Icon, HomeIcon, UsersIcon, ShoppingBagIcon,
  ClipboardDocumentListIcon, XMarkIcon, ArrowRightOnRectangleIcon,
} from '@heroicons/vue/24/outline';
import { useRoute } from 'vue-router';

definePageMeta({ middleware: 'auth' });

const route = useRoute();
const sidebarOpen = ref(false);

const navigation = [
  { name: 'Dashboard',  href: '/admin/dashboard', icon: HomeIcon },
  { name: 'Products',   href: '/admin/products',  icon: ShoppingBagIcon },
  { name: 'Customers',  href: '/admin/customer',  icon: UsersIcon },
  { name: 'Orders',     href: '/admin/orders',    icon: ClipboardDocumentListIcon },
];

const logout = async () => {
  localStorage.removeItem('_token');
  localStorage.removeItem('_role');
  localStorage.removeItem('_uuid');
  await navigateTo('/');
};
</script>
