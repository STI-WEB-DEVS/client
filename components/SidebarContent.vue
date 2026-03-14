<template>
  <div class="flex h-16 shrink-0 items-center gap-3 mt-1">
    <div class="bg-white rounded-lg p-1.5 shadow-sm">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 text-teal-700"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </div>
    <div>
      <span class="text-white font-bold text-lg tracking-tight"
        >HealthTrack</span
      >
      <p class="text-teal-400 text-xs">Hospital Management</p>
    </div>
  </div>

  <nav class="flex flex-1 flex-col">
    <ul role="list" class="flex flex-1 flex-col gap-y-1">
      <li v-for="item in navigation" :key="item.name">
        <NuxtLink
          :to="item.href"
          :class="[
            route.path === item.href
              ? 'bg-teal-800 text-white shadow-sm'
              : 'text-teal-200 hover:bg-teal-800/60 hover:text-white',
            'group flex gap-x-3 rounded-xl p-2.5 text-sm font-medium transition-all duration-150',
          ]"
        >
          <component
            :is="item.icon"
            class="size-5 shrink-0"
            aria-hidden="true"
          />
          {{ item.name }}
          <span
            v-if="item.badge"
            class="ml-auto text-xs bg-teal-600 text-white px-1.5 py-0.5 rounded-full"
          >
            {{ item.badge }}
          </span>
        </NuxtLink>
      </li>
    </ul>

    <!-- Bottom: Settings only -->
    <div class="mt-auto pt-4 border-t border-teal-800">
      <NuxtLink
        to="/settings"
        :class="[
          route.path === '/settings'
            ? 'bg-teal-800 text-white shadow-sm'
            : 'text-teal-200 hover:bg-teal-800/60 hover:text-white',
          'group flex gap-x-3 rounded-xl p-2.5 text-sm font-medium transition-all duration-150',
        ]"
      >
        <Cog6ToothIcon class="size-5 shrink-0" />
        Settings
      </NuxtLink>
    </div>
  </nav>
</template>

<script setup>
import { useRoute } from "vue-router";
import {
  HomeIcon,
  UsersIcon,
  CalendarDaysIcon,
  UserGroupIcon,
  ChartBarIcon,
  BuildingOffice2Icon,
  Cog6ToothIcon,
} from "@heroicons/vue/24/outline";

defineEmits(["sign-out"]);
const route = useRoute();

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon, badge: null },
  { name: "Patients", href: "/patients", icon: UserGroupIcon, badge: "2.4k" },
  {
    name: "Appointments",
    href: "/appointments",
    icon: CalendarDaysIcon,
    badge: "12",
  },
  { name: "Medical Team", href: "/team", icon: UsersIcon, badge: null },
  {
    name: "Reports & Analytics",
    href: "/reports",
    icon: ChartBarIcon,
    badge: null,
  },
  {
    name: "Wards & Rooms",
    href: "/wards",
    icon: BuildingOffice2Icon,
    badge: null,
  },
];
</script>
