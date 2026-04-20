<template>
    <NuxtLayout>
        <h1>Dashboard</h1>
    </NuxtLayout>
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
  UserGroupIcon,
  XMarkIcon,
} from '@heroicons/vue/24/outline'
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/vue/20/solid'
import { useRoute } from 'vue-router'

const route = useRoute()

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Customers', href: '/customer', icon: UserGroupIcon },
  { name: 'Products', href: '/products', icon: FolderIcon },
  // { name: 'Calendar', href: '#', icon: CalendarIcon },
  // { name: 'Documents', href: '#', icon: DocumentDuplicateIcon },
  // { name: 'Reports', href: '#', icon: ChartPieIcon },
]

const userNavigation = [
  { name: 'Your profile', href: '#' },
  { name: 'Sign out', href: '#' },
]

const sidebarOpen = ref(false)
</script>