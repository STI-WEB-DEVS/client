<template>
  <div>

    <!-- TOP NAVBAR -->
    <nav class="fixed top-0 left-0 right-0 z-50" style="background:#120404;border-bottom:1px solid rgba(192,57,43,0.25);box-shadow:0 2px 16px rgba(0,0,0,0.4);">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">

          <!-- Logo -->
          <NuxtLink to="/customer" class="flex items-center gap-x-3" style="text-decoration:none;">
            <div style="width:34px;height:34px;background:linear-gradient(135deg,#c0392b,#7b241c);border-radius:9px;display:flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:0 4px 12px rgba(192,57,43,0.35);">
              <svg viewBox="0 0 40 40" fill="none" style="width:22px;height:22px;">
                <path d="M20 4 C20 4 6 16 6 24 C6 31.732 12.268 38 20 38 C27.732 38 34 31.732 34 24 C34 16 20 4 20 4Z" fill="white" fill-opacity="0.92"/>
                <rect x="18" y="20" width="4" height="10" rx="2" fill="#c0392b"/>
                <rect x="14" y="24" width="12" height="4" rx="2" fill="#c0392b"/>
              </svg>
            </div>
            <div>
              <p style="font-family:Georgia,serif;font-size:1.05rem;font-weight:700;color:white;line-height:1;margin:0;">KaDugo</p>
              <p style="font-size:0.58rem;color:rgba(255,255,255,0.3);text-transform:uppercase;letter-spacing:0.09em;margin:2px 0 0;">Care Shop</p>
            </div>
          </NuxtLink>

          <!-- Nav Links (desktop) -->
          <div class="hidden md:flex items-center gap-x-1">
            <NuxtLink
              v-for="item in navigation"
              :key="item.name"
              :to="item.href"
              class="customer-nav-link"
              :class="{ active: route.path.startsWith(item.href) }"
            >
              <component :is="item.icon" style="width:16px;height:16px;flex-shrink:0;" />
              {{ item.name }}
            </NuxtLink>
          </div>

          <!-- Right side -->
          <div class="flex items-center gap-x-3">

            <!-- Sign Out -->
            <button
              @click="showSignOutModal = true"
              class="customer-signout-btn hidden md:flex"
            >
              <ArrowRightOnRectangleIcon style="width:16px;height:16px;" />
              Sign Out
            </button>

            <!-- Mobile menu toggle -->
            <button
              @click="mobileMenuOpen = !mobileMenuOpen"
              class="md:hidden flex items-center justify-center"
              style="width:36px;height:36px;background:rgba(192,57,43,0.15);border:1px solid rgba(192,57,43,0.3);border-radius:8px;color:rgba(255,255,255,0.7);cursor:pointer;"
            >
              <Bars3Icon v-if="!mobileMenuOpen" style="width:18px;height:18px;" />
              <XMarkIcon v-else style="width:18px;height:18px;" />
            </button>

          </div>
        </div>
      </div>

      <!-- Mobile Menu -->
      <Transition name="mobile-menu">
        <div v-if="mobileMenuOpen" style="background:#1a0404;border-top:1px solid rgba(192,57,43,0.2);padding:0.75rem 1rem 1rem;">
          <div class="flex flex-col gap-y-1">
            <NuxtLink
              v-for="item in navigation"
              :key="item.name"
              :to="item.href"
              class="customer-nav-link mobile"
              :class="{ active: route.path.startsWith(item.href) }"
              @click="mobileMenuOpen = false"
            >
              <component :is="item.icon" style="width:17px;height:17px;flex-shrink:0;" />
              {{ item.name }}
            </NuxtLink>
            <div style="height:1px;background:rgba(192,57,43,0.2);margin:0.5rem 0;"></div>
            <button
              @click="showSignOutModal = true; mobileMenuOpen = false"
              class="customer-nav-link mobile"
              style="color:rgba(255,100,100,0.7) !important;background:none;border:none;cursor:pointer;width:100%;text-align:left;"
            >
              <ArrowRightOnRectangleIcon style="width:17px;height:17px;flex-shrink:0;" />
              Sign Out
            </button>
          </div>
        </div>
      </Transition>
    </nav>

    <!-- PAGE CONTENT -->
    <main style="padding-top:64px;min-height:100vh;background:#0e0303;">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <slot></slot>
      </div>
    </main>

    <!-- SIGN OUT MODAL -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="showSignOutModal" class="modal-overlay" @click.self="showSignOutModal = false">
          <div class="modal-box">
            <div class="modal-icon">
              <ArrowRightOnRectangleIcon style="width:28px;height:28px;color:#c0392b;" />
            </div>
            <h3 class="modal-title">Sign Out</h3>
            <p class="modal-desc">Are you sure you want to sign out of KaDugo?</p>
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
import { useRoute } from 'vue-router'
import {
  ShoppingBagIcon,
  ClipboardDocumentListIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/vue/24/outline'

const route = useRoute()
const mobileMenuOpen = ref(false)
const showSignOutModal = ref(false)

const navigation = [
  { name: 'Shop',      href: '/customer/shops',  icon: ShoppingBagIcon },
  { name: 'My Orders', href: '/customer/orders', icon: ClipboardDocumentListIcon },
  { name: 'Profile',   href: '/customer/profile', icon: UserCircleIcon },
]

const confirmSignOut = () => {
  showSignOutModal.value = false
  localStorage.removeItem('_token')
  localStorage.removeItem('_email')
  localStorage.removeItem('_uuid')
  navigateTo('/')
}
</script>

<style scoped>
/* Nav links */
.customer-nav-link {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 0.45rem 0.85rem;
  border-radius: 8px;
  font-size: 0.82rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.55);
  text-decoration: none;
  border: 1px solid transparent;
  transition: all 0.15s ease;
  letter-spacing: 0.01em;
}
.customer-nav-link:hover {
  color: white;
  background: rgba(192, 57, 43, 0.15);
  border-color: rgba(192, 57, 43, 0.25);
}
.customer-nav-link.active {
  color: #ff8080;
  background: linear-gradient(135deg, rgba(192,57,43,0.35), rgba(231,76,60,0.15));
  border-color: rgba(192, 57, 43, 0.4);
}
.customer-nav-link.mobile {
  padding: 0.6rem 0.85rem;
  width: 100%;
}

/* Sign out button */
.customer-signout-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0.4rem 0.85rem;
  border-radius: 8px;
  font-size: 0.78rem;
  font-weight: 600;
  color: rgba(255, 100, 100, 0.6);
  background: transparent;
  border: 1px solid rgba(231, 76, 60, 0.2);
  cursor: pointer;
  transition: all 0.15s ease;
}
.customer-signout-btn:hover {
  background: rgba(192, 57, 43, 0.18);
  color: #ff8080;
  border-color: rgba(192, 57, 43, 0.4);
}

/* Mobile menu transition */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 0.2s ease;
}
.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(10, 2, 2, 0.7);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}
.modal-box {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  width: 100%;
  max-width: 360px;
  box-shadow: 0 24px 60px rgba(192,57,43,0.18), 0 8px 24px rgba(0,0,0,0.12);
  border: 1px solid #f5e8e8;
  text-align: center;
}
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
.modal-title {
  font-family: Georgia, serif;
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