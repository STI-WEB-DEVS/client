<template>
  <div class="servora-root">

    <!-- ── MOBILE SIDEBAR OVERLAY ── -->
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog class="relative z-50 lg:hidden" @close="sidebarOpen = false">
        <TransitionChild
          as="template"
          enter="transition-opacity ease-linear duration-300"
          enter-from="opacity-0" enter-to="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leave-from="opacity-100" leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-[#1a1a14]/80 backdrop-blur-sm"></div>
        </TransitionChild>

        <div class="fixed inset-0 flex">
          <TransitionChild
            as="template"
            enter="transition ease-in-out duration-300 transform"
            enter-from="-translate-x-full" enter-to="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leave-from="translate-x-0" leave-to="-translate-x-full"
          >
            <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
              <TransitionChild
                as="template"
                enter="ease-in-out duration-300"
                enter-from="opacity-0" enter-to="opacity-100"
                leave="ease-in-out duration-300"
                leave-from="opacity-100" leave-to="opacity-0"
              >
                <div class="absolute left-full top-0 flex w-16 justify-center pt-5">
                  <button type="button" class="-m-2.5 p-2.5" @click="sidebarOpen = false">
                    <span class="sr-only">Close sidebar</span>
                    <XMarkIcon class="size-6 text-white" />
                  </button>
                </div>
              </TransitionChild>

              <!-- Mobile sidebar content -->
              <div class="sidebar-panel flex grow flex-col gap-y-5 overflow-y-auto px-6 pb-4">

                <!-- Logo -->
                <div class="flex h-20 shrink-0 items-center gap-x-3 border-b border-[#c9a96e]/15">
                  <svg viewBox="0 0 32 32" fill="none" class="size-8 shrink-0">
                    <path d="M16 3C16 3 8 10 8 18C8 22.4 11.6 26 16 26C20.4 26 24 22.4 24 18C24 10 16 3 16 3Z" fill="#c9a96e" opacity="0.85"/>
                    <path d="M16 8C16 8 11 13 11 18C11 20.8 13.2 23 16 23C18.8 23 21 20.8 21 18C21 13 16 8 16 8Z" fill="#1a1a14"/>
                    <line x1="16" y1="26" x2="16" y2="30" stroke="#c9a96e" stroke-width="1.5" stroke-linecap="round"/>
                  </svg>
                  <div class="flex flex-col leading-none">
                    <span class="logo-brand">Servora</span>
                    <span class="logo-sub">Spa &amp; Wellness</span>
                  </div>
                </div>

                <!-- Nav -->
                <nav class="flex flex-1 flex-col">
                  <ul role="list" class="flex flex-1 flex-col gap-y-7">
                    <li>
                      <p class="nav-group-label">Main Menu</p>
                      <ul role="list" class="-mx-2 space-y-1 mt-2">
                        <li v-for="item in navigation" :key="item.name">
                          <NuxtLink :to="item.href" :class="['nav-item', route.path === item.href ? 'active' : '']">
                            <component :is="item.icon" class="size-5 shrink-0" />
                            {{ item.name }}
                            <span v-if="item.badge" class="nav-badge ml-auto">{{ item.badge }}</span>
                          </NuxtLink>
                        </li>
                      </ul>
                    </li>
                    <li class="mt-auto border-t border-[#c9a96e]/15 pt-4">
                      <NuxtLink to="/settings" class="nav-item">
                        <Cog6ToothIcon class="size-5 shrink-0" />
                        Settings
                      </NuxtLink>
                    </li>
                  </ul>
                </nav>
              </div>

            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- ── DESKTOP SIDEBAR ── -->
    <div class="sidebar-panel hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <div class="flex grow flex-col gap-y-5 overflow-y-auto px-6 pb-4">

        <!-- Logo -->
        <div class="flex h-20 shrink-0 items-center gap-x-3 border-b border-[#c9a96e]/15">
          <svg viewBox="0 0 32 32" fill="none" class="size-8 shrink-0">
            <path d="M16 3C16 3 8 10 8 18C8 22.4 11.6 26 16 26C20.4 26 24 22.4 24 18C24 10 16 3 16 3Z" fill="#c9a96e" opacity="0.85"/>
            <path d="M16 8C16 8 11 13 11 18C11 20.8 13.2 23 16 23C18.8 23 21 20.8 21 18C21 13 16 8 16 8Z" fill="#1a1a14"/>
            <line x1="16" y1="26" x2="16" y2="30" stroke="#c9a96e" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
          <div class="flex flex-col leading-none">
            <span class="logo-brand">Servora</span>
            <span class="logo-sub">Spa &amp; Wellness</span>
          </div>
        </div>

        <!-- Nav -->
        <nav class="flex flex-1 flex-col">
          <ul role="list" class="flex flex-1 flex-col gap-y-7">
            <li>
              <p class="nav-group-label">Main Menu</p>
              <ul role="list" class="-mx-2 space-y-1 mt-2">
                <li v-for="item in navigation" :key="item.name">
                  <NuxtLink :to="item.href" :class="['nav-item', route.path === item.href ? 'active' : '']">
                    <component :is="item.icon" class="size-5 shrink-0" />
                    {{ item.name }}
                    <span v-if="item.badge" class="nav-badge ml-auto">{{ item.badge }}</span>
                  </NuxtLink>
                </li>
              </ul>
            </li>
            <li class="mt-auto border-t border-[#c9a96e]/15 pt-4">
              <NuxtLink to="/settings" class="nav-item">
                <Cog6ToothIcon class="size-5 shrink-0" />
                Settings
              </NuxtLink>
            </li>
          </ul>
        </nav>

      </div>
    </div>

    <!-- ── MAIN AREA ── -->
    <div class="lg:pl-72">

      <!-- Top Bar -->
      <div class="topbar sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 px-4 sm:gap-x-6 sm:px-6 lg:px-8">

        <!-- Mobile hamburger -->
        <button
          type="button"
          class="-m-2.5 p-2.5 text-[#c9a96e] hover:text-[#e2c99a] lg:hidden"
          @click="sidebarOpen = true"
        >
          <span class="sr-only">Open sidebar</span>
          <Bars3Icon class="size-6" />
        </button>

        <div class="h-6 w-px bg-[#c9a96e]/20 lg:hidden"></div>

        <!-- Page title -->
        <div class="flex flex-1 items-center">
          <span class="topbar-page">{{ currentPageName }}</span>
        </div>

        <!-- Right: Bell + User -->
        <div class="flex items-center gap-x-4 lg:gap-x-6">

          <!-- Notification Dropdown -->
          <div class="notif-wrap" v-click-outside="() => showNotifs = false">
            <button type="button" class="topbar-icon-btn relative" @click="toggleNotifs">
              <span class="sr-only">Notifications</span>
              <BellIcon class="size-5" />
              <span v-if="unreadCount > 0" class="notif-badge">{{ unreadCount }}</span>
            </button>

            <!-- Dropdown Panel -->
            <Transition name="notif-drop">
              <div v-if="showNotifs" class="notif-panel">

                <!-- Header -->
                <div class="notif-panel-header">
                  <h3 class="notif-panel-title">Notifications</h3>
                  <button class="notif-mark-all" @click="markAllRead">Mark all as read</button>
                </div>

                <!-- Tabs -->
                <div class="notif-tabs">
                  <button :class="['notif-tab', notifTab === 'all' ? 'active' : '']" @click="notifTab = 'all'">
                    All <span class="notif-tab-count">{{ notifications.length }}</span>
                  </button>
                  <button :class="['notif-tab', notifTab === 'unread' ? 'active' : '']" @click="notifTab = 'unread'">
                    Unread <span class="notif-tab-count">{{ unreadCount }}</span>
                  </button>
                </div>

                <!-- List -->
                <ul class="notif-list">
                  <li
                    v-for="n in filteredNotifs"
                    :key="n.id"
                    :class="['notif-item', !n.read ? 'unread' : '']"
                    @click="markRead(n)"
                  >
                    <div class="notif-icon-wrap" :style="{ background: n.color + '18' }">
                      <component :is="n.icon" class="size-4" :style="{ color: n.color }" />
                    </div>
                    <div class="notif-content">
                      <p class="notif-msg">{{ n.message }}</p>
                      <p class="notif-time">{{ n.time }}</p>
                    </div>
                    <div v-if="!n.read" class="notif-unread-dot"></div>
                  </li>
                  <li v-if="filteredNotifs.length === 0" class="notif-empty">
                    All caught up! 🎉
                  </li>
                </ul>

                <!-- Footer -->
                <div class="notif-panel-footer">
                  <NuxtLink to="/myprofile" class="notif-settings-link" @click="showNotifs = false">
                    Notification Settings →
                  </NuxtLink>
                </div>

              </div>
            </Transition>
          </div>

          <div class="hidden lg:block lg:h-6 lg:w-px lg:bg-[#c9a96e]/20"></div>

          <!-- User dropdown -->
          <Menu as="div" class="relative">
            <MenuButton class="flex items-center gap-x-3 group">
              <img
                class="size-10 rounded-full ring-2 ring-[#c9a96e]/30 group-hover:ring-[#c9a96e]/60 transition-all"
                src="/Nicolaii-gwapa.jpg"
                alt="User"
              />
              <span class="hidden lg:flex lg:flex-col lg:items-start">
                <span class="user-name">Nicolaii Gwapa</span>
                <span class="user-role">Spa Manager</span>
              </span>
              <ChevronDownIcon class="hidden lg:block size-4 text-[#c9a96e]/60 group-hover:text-[#c9a96e] transition-colors" />
            </MenuButton>

            <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <MenuItems class="dropdown-menu absolute right-0 z-10 mt-2.5 w-44 origin-top-right">
                <MenuItem v-for="item in userNavigation" :key="item.name" v-slot="{ active }">
                  <a :href="item.href" :class="['dropdown-item', { active }]">
                    <component :is="item.icon" class="size-4" />
                    {{ item.name }}
                  </a>
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>

        </div>
      </div>

      <!-- Page content -->
      <main class="main-content">
        <div class="px-4 sm:px-6 lg:px-8">
          <slot />
        </div>
      </main>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
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
  HomeIcon,
  UsersIcon,
  UserGroupIcon,
  XMarkIcon,
  SparklesIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  CurrencyDollarIcon,
} from '@heroicons/vue/24/outline'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
import { useRoute } from 'vue-router'

const route       = useRoute()
const sidebarOpen = ref(false)

// ── NAVIGATION ──
const navigation = [
  { name: 'Dashboard',    href: '/dashboard',    icon: HomeIcon },
  { name: 'Appointments', href: '/appointments', icon: CalendarIcon,         badge: '4' },
  { name: 'Clients',      href: '/clients',      icon: UsersIcon },
  { name: 'Therapists',   href: '/therapists',   icon: UserGroupIcon },
  { name: 'Services',     href: '/services',     icon: SparklesIcon },
  { name: 'Reports',      href: '/reports',      icon: ChartPieIcon },
  { name: 'Documents',    href: '/documents',    icon: DocumentDuplicateIcon },
]

const userNavigation = [
  { name: 'Your Profile', href: '/myprofile', icon: UserIcon },
  { name: 'Sign Out',     href: '/Logout',        icon: ArrowRightOnRectangleIcon },
]

const currentPageName = computed(() =>
  navigation.find(n => n.href === route.path)?.name ?? 'Dashboard'
)

// ── NOTIFICATIONS ──
const showNotifs = ref(false)
const notifTab   = ref('all')

const notifications = ref([
  { id:1, message:'New appointment booked by Maria Santos for Hot Stone Massage.', time:'2 mins ago',   read: false, icon: CalendarIcon,         color: '#c9a96e' },
  { id:2, message:'James Cruz cancelled his 12:00 PM appointment today.',          time:'15 mins ago',  read: false, icon: ExclamationCircleIcon, color: '#c0725a' },
  { id:3, message:'New client Ana Reyes just registered on Servora.',              time:'1 hour ago',   read: false, icon: UsersIcon,             color: '#6a9b67' },
  { id:4, message:"Today's revenue has reached ₱ 12,400 so far. 🎉",              time:'2 hours ago',  read: false, icon: CurrencyDollarIcon,    color: '#7a8fa6' },
  { id:5, message:'Liza Macaraeg completed 5 sessions today — new record!',        time:'3 hours ago',  read: true,  icon: CheckCircleIcon,       color: '#6a9b67' },
  { id:6, message:"Weekly report for Mar 9–15 is now ready to view.",              time:'Yesterday',    read: true,  icon: InformationCircleIcon, color: '#c9a96e' },
  { id:7, message:'Sofia Navarro updated her availability schedule.',              time:'2 days ago',   read: true,  icon: UserGroupIcon,         color: '#9a6e8a' },
])

const unreadCount = computed(() => notifications.value.filter(n => !n.read).length)

const filteredNotifs = computed(() =>
  notifTab.value === 'unread'
    ? notifications.value.filter(n => !n.read)
    : notifications.value
)

function toggleNotifs() { showNotifs.value = !showNotifs.value }

function markRead(n) { n.read = true }

function markAllRead() {
  notifications.value.forEach(n => n.read = true)
}

// ── CLICK OUTSIDE DIRECTIVE ──
const vClickOutside = {
  mounted(el, binding) {
    el._clickOutside = (e) => {
      if (!el.contains(e.target)) binding.value(e)
    }
    document.addEventListener('mousedown', el._clickOutside)
  },
  unmounted(el) {
    document.removeEventListener('mousedown', el._clickOutside)
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&family=Jost:wght@300;400;500;600&display=swap');

.servora-root {
  background: #f7f4ef;
  min-height: 100vh;
  font-family: 'Jost', sans-serif;
}

/* ── SIDEBAR ── */
.sidebar-panel {
  background: #1a1a14;
  border-right: 1px solid rgba(201,169,110,0.12);
}

.logo-brand {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.4rem;
  font-weight: 300;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #fff;
}
.logo-sub {
  font-size: 0.55rem;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: #c9a96e;
  margin-top: 3px;
}

.nav-group-label {
  font-size: 0.6rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: rgba(240,236,227,0.35);
  padding: 0 0.5rem;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.6rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.8rem;
  font-weight: 400;
  letter-spacing: 0.04em;
  color: rgba(240,236,227,0.5);
  text-decoration: none;
  transition: background 0.2s, color 0.2s;
  position: relative;
}
.nav-item:hover {
  background: rgba(201,169,110,0.1);
  color: rgba(240,236,227,0.9);
}
.nav-item.active {
  background: rgba(201,169,110,0.12);
  color: #c9a96e;
}
.nav-item.active::before {
  content: '';
  position: absolute;
  left: 0; top: 20%; bottom: 20%;
  width: 2px;
  background: #c9a96e;
  border-radius: 2px;
}

.nav-badge {
  background: #c9a96e;
  color: #1a1a14;
  font-size: 0.6rem;
  font-weight: 600;
  padding: 0.1rem 0.45rem;
  border-radius: 999px;
}

/* ── TOP BAR ── */
.topbar {
  background: #fff;
  border-bottom: 1px solid rgba(201,169,110,0.15);
  box-shadow: 0 1px 20px rgba(26,26,20,0.06);
}

.topbar-page {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.2rem;
  font-weight: 300;
  letter-spacing: 0.08em;
  color: #1a1a14;
}

.topbar-icon-btn {
  position: relative;
  padding: 0.5rem;
  color: #9ca3af;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s;
}
.topbar-icon-btn:hover { color: #1a1a14; }

/* ── NOTIFICATION DROPDOWN ── */
.notif-wrap { position: relative; }

.notif-badge {
  position: absolute;
  top: 4px; right: 4px;
  min-width: 16px; height: 16px;
  border-radius: 999px;
  background: #c9a96e; color: #1a1a14;
  font-size: 0.55rem; font-weight: 700;
  display: flex; align-items: center; justify-content: center;
  border: 1.5px solid #fff; padding: 0 3px;
}

.notif-panel {
  position: absolute; top: calc(100% + 0.75rem); right: -1rem;
  width: 360px; background: #fff; border-radius: 12px;
  box-shadow: 0 16px 48px rgba(26,26,20,0.14);
  border: 1px solid rgba(201,169,110,0.15); z-index: 100; overflow: hidden;
}
.notif-panel-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 1rem 1.1rem 0.6rem; border-bottom: 1px solid rgba(201,169,110,0.1);
}
.notif-panel-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.05rem; font-weight: 400; color: #1a1a14; letter-spacing: 0.04em;
}
.notif-mark-all {
  font-size: 0.68rem; color: #c9a96e; background: none;
  border: none; cursor: pointer; font-family: 'Jost', sans-serif;
  letter-spacing: 0.05em; transition: color 0.2s;
}
.notif-mark-all:hover { color: #a07830; }

.notif-tabs { display: flex; padding: 0.5rem 1.1rem 0; }
.notif-tab {
  display: flex; align-items: center; gap: 0.35rem;
  padding: 0.4rem 0.75rem; font-family: 'Jost', sans-serif;
  font-size: 0.7rem; font-weight: 400; letter-spacing: 0.06em;
  text-transform: uppercase; border: none; background: none;
  color: #9ca3af; cursor: pointer; border-bottom: 2px solid transparent;
  transition: all 0.2s;
}
.notif-tab.active { color: #c9a96e; border-bottom-color: #c9a96e; }
.notif-tab-count {
  background: rgba(201,169,110,0.15); color: #a07830;
  font-size: 0.6rem; font-weight: 600; padding: 0.1rem 0.4rem; border-radius: 999px;
}

.notif-list { list-style: none; max-height: 320px; overflow-y: auto; padding: 0.4rem 0; }
.notif-list::-webkit-scrollbar { width: 4px; }
.notif-list::-webkit-scrollbar-thumb { background: rgba(201,169,110,0.2); border-radius: 99px; }

.notif-item {
  display: flex; align-items: flex-start; gap: 0.75rem;
  padding: 0.75rem 1.1rem; cursor: pointer;
  transition: background 0.15s; position: relative;
}
.notif-item:hover { background: #fdf8f0; }
.notif-item.unread { background: rgba(201,169,110,0.04); }
.notif-icon-wrap {
  width: 34px; height: 34px; border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; margin-top: 1px;
}
.notif-content { flex: 1; min-width: 0; }
.notif-msg  { font-size: 0.78rem; color: #1a1a14; line-height: 1.5; }
.notif-time { font-size: 0.65rem; color: #9ca3af; margin-top: 3px; }
.notif-unread-dot {
  width: 7px; height: 7px; border-radius: 50%;
  background: #c9a96e; flex-shrink: 0; margin-top: 5px;
}
.notif-empty { text-align: center; padding: 2rem; font-size: 0.82rem; color: #9ca3af; }

.notif-panel-footer {
  padding: 0.75rem 1.1rem; border-top: 1px solid rgba(201,169,110,0.1); text-align: center;
}
.notif-settings-link {
  font-size: 0.7rem; color: #c9a96e; text-decoration: none;
  letter-spacing: 0.06em; transition: color 0.2s;
}
.notif-settings-link:hover { color: #1a1a14; }

.notif-drop-enter-active, .notif-drop-leave-active { transition: opacity 0.2s, transform 0.2s; }
.notif-drop-enter-from, .notif-drop-leave-to { opacity: 0; transform: translateY(-8px) scale(0.97); }

.user-name {
  font-size: 0.8rem;
  font-weight: 500;
  color: #1a1a14;
  letter-spacing: 0.02em;
}
.user-role {
  font-size: 0.6rem;
  color: #c9a96e;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

/* ── DROPDOWN ── */
.dropdown-menu {
  background: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 10px 40px rgba(26,26,20,0.12);
  border: 1px solid rgba(201,169,110,0.15);
  padding: 0.4rem;
}
.dropdown-item {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.78rem;
  color: #374151;
  text-decoration: none;
  transition: background 0.15s;
}
.dropdown-item.active,
.dropdown-item:hover {
  background: #fdf8f0;
  color: #1a1a14;
}

/* ── MAIN CONTENT ── */
.main-content {
  padding: 2.5rem 0;
  min-height: calc(100vh - 4rem);
}
</style>