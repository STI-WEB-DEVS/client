<template>
  <div class="min-h-screen bg-gray-50">
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
              <div
                class="absolute left-full top-0 flex w-16 justify-center pt-5"
              >
                <button
                  type="button"
                  class="-m-2.5 p-2.5"
                  @click="sidebarOpen = false"
                >
                  <XMarkIcon class="size-6 text-white" aria-hidden="true" />
                </button>
              </div>
              <div
                class="flex grow flex-col gap-y-5 overflow-y-auto bg-teal-900 px-6 pb-4"
              >
                <SidebarContent @sign-out="signOut" />
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <div
      class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col"
    >
      <div
        class="flex grow flex-col gap-y-5 overflow-y-auto bg-teal-900 px-6 pb-4 shadow-xl"
      >
        <SidebarContent @sign-out="signOut" />
      </div>
    </div>

    <div class="lg:pl-64">
      <div
        class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8"
      >
        <button
          type="button"
          class="-m-2.5 p-2.5 text-gray-700 lg:hidden"
          @click="sidebarOpen = true"
        >
          <Bars3Icon class="size-6" aria-hidden="true" />
        </button>
        <div class="h-6 w-px bg-gray-200 lg:hidden"></div>
        <div class="flex flex-1 items-center justify-between">
          <div>
            <h1 class="text-lg font-semibold text-gray-900">{{ pageTitle }}</h1>
            <p class="text-xs text-gray-500">{{ currentDate }}</p>
          </div>
          <div class="flex items-center gap-x-4">
            <button
              class="relative rounded-full bg-gray-100 p-2 text-gray-500 hover:text-teal-600 hover:bg-teal-50 transition-colors"
            >
              <BellIcon class="size-5" />
              <span
                class="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"
              ></span>
            </button>
            <Menu as="div" class="relative">
              <MenuButton
                class="flex items-center gap-2 rounded-full hover:bg-gray-50 pr-2 transition-colors"
              >
                <div
                  class="h-8 w-8 rounded-full bg-teal-600 flex items-center justify-center text-white text-sm font-semibold"
                >
                  DR
                </div>
                <div class="hidden lg:block text-left">
                  <p class="text-sm font-medium text-gray-900">Dr. Reyes</p>
                  <p class="text-xs text-gray-500">Administrator</p>
                </div>
                <ChevronDownIcon
                  class="hidden lg:block h-4 w-4 text-gray-400"
                />
              </MenuButton>
              <transition
                enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <MenuItems
                  class="absolute right-0 z-10 mt-2 w-44 origin-top-right rounded-xl bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
                >
                  <MenuItem v-slot="{ active }">
                    <NuxtLink
                      to="/profile"
                      :class="[
                        active ? 'bg-gray-50' : '',
                        'flex items-center gap-2 px-4 py-2 text-sm text-gray-700',
                      ]"
                    >
                      <UserCircleIcon class="h-4 w-4 text-gray-400" /> Your
                      Profile
                    </NuxtLink>
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                    <NuxtLink
                      to="/settings"
                      :class="[
                        active ? 'bg-gray-50' : '',
                        'flex items-center gap-2 px-4 py-2 text-sm text-gray-700',
                      ]"
                    >
                      <Cog6ToothIcon class="h-4 w-4 text-gray-400" /> Settings
                    </NuxtLink>
                  </MenuItem>
                  <div class="border-t border-gray-100 my-1"></div>
                  <MenuItem v-slot="{ active }">
                    <button
                      @click="signOut"
                      :class="[
                        active ? 'bg-red-50' : '',
                        'w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600',
                      ]"
                    >
                      <ArrowRightOnRectangleIcon class="h-4 w-4" /> Sign out
                    </button>
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>
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
import { ref, computed } from "vue";
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
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/vue/24/outline";
import { ChevronDownIcon } from "@heroicons/vue/20/solid";
import {
  Cog6ToothIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/vue/24/outline";
import { useRoute } from "vue-router";

const route = useRoute();
const sidebarOpen = ref(false);

const pageTitles = {
  "/dashboard": "Dashboard",
  "/patients": "Patient Management",
  "/appointments": "Appointments",
  "/team": "Medical Team",
  "/reports": "Reports & Analytics",
  "/wards": "Wards & Rooms",
  "/settings": "System Settings",
  "/profile": "My Profile",
};

const pageTitle = computed(() => pageTitles[route.path] || "HealthTrack");
const currentDate = computed(() =>
  new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }),
);

const signOut = async () => {
  await navigateTo("/");
};
</script>
