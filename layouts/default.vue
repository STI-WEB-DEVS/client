<template>
  <div>
    <div class="hidden ring-1 ring-white/10 lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col" style="background: #1a0a0a;">
      <div class="flex grow flex-col gap-y-5 overflow-y-auto px-6 pb-4" style="background: rgba(0,0,0,0.1);">

        <!-- Logo -->
        <div class="flex h-16 shrink-0 items-center gap-x-3">
          <div style="width:38px;height:38px;background:linear-gradient(135deg,#c0392b,#7b241c);border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:0 4px 14px rgba(192,57,43,0.35);">
            <svg viewBox="0 0 40 40" fill="none" style="width:26px;height:26px;">
              <path d="M20 4 C20 4 6 16 6 24 C6 31.732 12.268 38 20 38 C27.732 38 34 31.732 34 24 C34 16 20 4 20 4Z" fill="white" fill-opacity="0.92"/>
              <rect x="18" y="20" width="4" height="10" rx="2" fill="#c0392b"/>
              <rect x="14" y="24" width="12" height="4" rx="2" fill="#c0392b"/>
            </svg>
          </div>
          <div>
            <p style="font-family:Georgia,serif;font-size:1.15rem;font-weight:700;color:white;line-height:1;margin:0;">KaDugo</p>
            <p style="font-size:0.6rem;color:rgba(255,255,255,0.35);text-transform:uppercase;letter-spacing:0.09em;margin:3px 0 0;">Blood Donation System</p>
          </div>
        </div>

        <!-- Emergency banner -->
        <div style="background:rgba(192,57,43,0.18);border:1px solid rgba(192,57,43,0.35);border-radius:10px;padding:0.65rem 0.9rem;display:flex;align-items:center;gap:10px;">
          <div style="width:8px;height:8px;border-radius:50%;background:#e74c3c;flex-shrink:0;animation:blink 1.5s infinite;"></div>
          <div>
            <p style="font-size:0.68rem;font-weight:700;color:#ff8080;text-transform:uppercase;letter-spacing:0.05em;margin:0;">Emergency Alerts</p>
            <p style="font-size:0.65rem;color:rgba(255,255,255,0.35);margin:2px 0 0;">3 critical requests active</p>
          </div>
        </div>

        <nav class="flex flex-1 flex-col">
          <ul role="list" class="flex flex-1 flex-col gap-y-7">
            <li>
              <p style="font-size:0.62rem;font-weight:700;color:rgba(255,255,255,0.28);text-transform:uppercase;letter-spacing:0.1em;margin:0 0 8px 4px;">Main Menu</p>
              <ul role="list" class="-mx-2 space-y-1">
                <li v-for="item in navigation" :key="item.name">
                  <NuxtLink
                    :to="item.href"
                    :class="[
                      route.path === item.href ? 'text-white' : 'text-gray-400 hover:text-white',
                      'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold'
                    ]"
                    :style="route.path === item.href
                      ? 'background:linear-gradient(135deg,rgba(192,57,43,0.38),rgba(231,76,60,0.18));border:1px solid rgba(192,57,43,0.35);color:#ff8080;'
                      : 'border:1px solid transparent;'"
                  >
                    <component :is="item.icon" class="size-6 shrink-0" aria-hidden="true" />
                    {{ item.name }}
                  </NuxtLink>
                </li>
              </ul>
            </li>

            <!-- Sidebar Sign Out -->
            <li class="mt-auto">
              <button
                @click="showSignOutModal = true"
                class="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold w-full"
                style="color:rgba(255,100,100,0.65);border:1px solid rgba(231,76,60,0.2);background:transparent;cursor:pointer;"
                onmouseover="this.style.background='rgba(192,57,43,0.18)';this.style.color='#ff8080';"
                onmouseout="this.style.background='transparent';this.style.color='rgba(255,100,100,0.65)';"
              >
                <ArrowRightOnRectangleIcon class="size-6 shrink-0" aria-hidden="true" />
                Sign Out
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <!-- MAIN CONTENT -->
    <div class="lg:pl-72">

      <!-- Top bar -->
      <div class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8"
           style="background:white;border-color:#f0e0e0;box-shadow:0 1px 8px rgba(192,57,43,0.07);">

        <div class="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
          <div class="flex flex-1"></div>
          <div class="flex items-center gap-x-4 lg:gap-x-6">

            <!-- System status badge -->
            <div class="hidden sm:flex items-center gap-x-2 rounded-full px-3 py-1" style="background:#fef2f2;border:1px solid #fecaca;">
              <span style="width:7px;height:7px;border-radius:50%;background:#22c55e;display:inline-block;animation:blink 2s infinite;"></span>
              <span style="font-size:0.7rem;font-weight:600;color:#c0392b;letter-spacing:0.03em;">System Active</span>
            </div>

            <!-- Bell -->
            <button type="button" class="-m-2.5 p-2.5" style="color:#999;position:relative;"
              onmouseover="this.style.color='#c0392b'" onmouseout="this.style.color='#999'">
              <BellIcon class="size-6" aria-hidden="true" />
              <span style="position:absolute;top:6px;right:6px;width:15px;height:15px;background:#c0392b;border-radius:50%;font-size:0.58rem;font-weight:700;color:white;display:flex;align-items:center;justify-content:center;">3</span>
            </button>

            <div class="hidden lg:block lg:h-6 lg:w-px" style="background:rgba(0,0,0,0.08);" aria-hidden="true"></div>

            <!-- User menu -->
            <Menu as="div" class="relative">
              <MenuButton class="relative flex items-center gap-x-2" style="background:none;border:none;cursor:pointer;padding:4px;border-radius:10px;"
                onmouseover="this.style.background='#fef2f2'" onmouseout="this.style.background='transparent'">
                <div style="width:34px;height:34px;border-radius:50%;background:linear-gradient(135deg,#c0392b,#e74c3c);display:flex;align-items:center;justify-content:center;font-size:0.7rem;font-weight:700;color:white;flex-shrink:0;">
                  RA
                </div>
                <span class="hidden lg:flex lg:items-center">
                  <span class="ml-1 text-sm/6 font-semibold" style="color:#1a1a1a;">Rogelio Aca, Jr.</span>
                  <ChevronDownIcon class="ml-2 size-5" style="color:#aaa;" />
                </span>
              </MenuButton>

              <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform scale-100" leave-to-class="transform opacity-0 scale-95">
                <MenuItems class="absolute right-0 z-10 mt-2.5 w-44 origin-top-right rounded-md bg-white shadow-lg"
                           style="border:1px solid #f0e0e0;border-radius:12px;padding:6px;">
                  <MenuItem v-slot="{ active }">
                    <NuxtLink to="/profile"
                      :style="active ? 'background:#fef2f2;color:#c0392b;border-radius:8px;' : 'color:#444;'"
                      class="block px-3 py-1 text-sm/6">
                      Your Profile
                    </NuxtLink>
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                    <NuxtLink to="/settings"
                      :style="active ? 'background:#fef2f2;color:#c0392b;border-radius:8px;' : 'color:#444;'"
                      class="block px-3 py-1 text-sm/6">
                      Settings
                    </NuxtLink>
                  </MenuItem>
                  <div style="height:1px;background:#f5e8e8;margin:4px 0;"></div>
                  <!-- Dropdown Sign Out -->
                  <MenuItem v-slot="{ active }">
                    <button
                      @click="showSignOutModal = true"
                      :style="active ? 'background:#fef2f2;color:#c0392b;border-radius:8px;' : 'color:#c0392b;'"
                      class="block w-full text-left px-3 py-1 text-sm/6 font-semibold">
                      Sign Out
                    </button>
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </div>
      </div>

      <main class="py-10" style="background:#f7f1f1;min-height:calc(100vh - 64px);">
        <div class="px-4 sm:px-6 lg:px-8">
          <slot></slot>
        </div>
      </main>
    </div>

    <!-- SIGN OUT CONFIRMATION MODAL -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="showSignOutModal" class="modal-overlay" @click.self="showSignOutModal = false">
          <div class="modal-box">

            <!-- Icon -->
            <div class="modal-icon">
              <ArrowRightOnRectangleIcon style="width:28px;height:28px;color:#c0392b;" />
            </div>

            <!-- Text -->
            <h3 class="modal-title">Sign Out</h3>
            <p class="modal-desc">Are you sure you want to sign out of KaDugo? Any unsaved changes will be lost.</p>

            <!-- Actions -->
            <div class="modal-actions">
              <button class="modal-btn-cancel" @click="showSignOutModal = false">No, Cancel</button>
              <button class="modal-btn-confirm" @click="confirmSignOut">Yes, Sign Out</button>
            </div>

          </div>
        </div>
      </Transition>
    </Teleport>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import {
  BellIcon, Cog6ToothIcon, HomeIcon, UsersIcon,
  BeakerIcon, UserGroupIcon, UserCircleIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/vue/24/outline'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
import { useRoute } from 'vue-router'

const route = useRoute()

const navigation = [
  { name: 'Dashboard',       href: '/dashboard', icon: HomeIcon },
  { name: 'Blood Inventory', href: '/inventory',  icon: BeakerIcon },
  { name: 'Donors',          href: '/donors',     icon: UserGroupIcon },
  { name: 'Team',            href: '/team',       icon: UsersIcon },
  { name: 'Profile',         href: '/profile',    icon: UserCircleIcon },
  { name: 'Settings',        href: '/settings',   icon: Cog6ToothIcon },
]

const sidebarOpen = ref(false)
const showSignOutModal = ref(false)

const confirmSignOut = () => {
  showSignOutModal.value = false
  localStorage.removeItem('user')
  navigateTo('/')
}
</script>

<style>
@keyframes blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.3; }
}

/* Modal overlay */
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(10, 2, 2, 0.65);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

/* Modal box */
.modal-box {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  width: 100%;
  max-width: 380px;
  box-shadow: 0 24px 60px rgba(192,57,43,0.18), 0 8px 24px rgba(0,0,0,0.12);
  border: 1px solid #f5e8e8;
  text-align: center;
}

/* Modal icon */
.modal-icon {
  width: 56px;
  height: 56px;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.25rem;
}

/* Modal text */
.modal-title {
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 1.2rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 0.5rem;
}

.modal-desc {
  font-size: 0.85rem;
  color: #888;
  margin: 0 0 1.75rem;
  line-height: 1.55;
}

/* Modal buttons */
.modal-actions {
  display: flex;
  gap: 0.75rem;
}

.modal-btn-cancel {
  flex: 1;
  padding: 0.7rem;
  background: none;
  border: 1px solid #f0e0e0;
  border-radius: 10px;
  font-size: 0.85rem;
  font-weight: 600;
  color: #888;
  cursor: pointer;
  transition: all 0.15s;
}
.modal-btn-cancel:hover {
  background: #faf9f9;
  border-color: #fecaca;
  color: #555;
}

.modal-btn-confirm {
  flex: 1;
  padding: 0.7rem;
  background: linear-gradient(135deg, #c0392b, #e74c3c);
  border: none;
  border-radius: 10px;
  font-size: 0.85rem;
  font-weight: 600;
  color: white;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(192,57,43,0.3);
  transition: all 0.15s;
}
.modal-btn-confirm:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(192,57,43,0.4);
}

/* Modal transition animation */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}
.modal-enter-active .modal-box,
.modal-leave-active .modal-box {
  transition: transform 0.2s ease, opacity 0.2s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-from .modal-box,
.modal-leave-to .modal-box {
  transform: scale(0.95);
  opacity: 0;
}
</style>