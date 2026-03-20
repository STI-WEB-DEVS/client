<template>
  <div class="app-root">

    <!-- ══════════════════════════════════════
         SIDEBAR
    ══════════════════════════════════════ -->
    <aside class="sidebar">

      <!-- Sidebar inner scroll container -->
      <div class="sidebar-inner">

        <!-- Logo -->
        <div class="sidebar-logo">
          <div class="logo-drop">
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:22px;height:22px;">
              <path d="M20 4 C20 4 6 16 6 24 C6 31.732 12.268 38 20 38 C27.732 38 34 31.732 34 24 C34 16 20 4 20 4Z" fill="white" fill-opacity="0.92"/>
              <rect x="18" y="20" width="4" height="10" rx="2" fill="#c0392b"/>
              <rect x="14" y="24" width="12" height="4" rx="2" fill="#c0392b"/>
            </svg>
          </div>
          <div class="logo-text">
            <p class="logo-name">KaDugo</p>
            <p class="logo-sub">Blood Donation System</p>
          </div>
        </div>

        <!-- Emergency alert banner -->
        <div class="emergency-banner">
          <span class="emergency-dot"></span>
          <div class="emergency-text">
            <p class="emergency-title">Emergency Alerts</p>
            <p class="emergency-count">3 critical requests active</p>
          </div>
        </div>

        <!-- Nav -->
        <nav class="sidebar-nav">
          <p class="nav-section-label">Main Menu</p>
          <ul class="nav-list">
            <li v-for="item in navigation" :key="item.name">
              <NuxtLink
                :to="item.href"
                class="nav-link"
                :class="{ 'nav-link--active': route.path === item.href }"
              >
                <component :is="item.icon" class="nav-icon" aria-hidden="true" />
                <span>{{ item.name }}</span>
                <span v-if="route.path === item.href" class="nav-active-pip"></span>
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <!-- Sign out -->
        <div class="sidebar-footer">
          <div class="sidebar-divider"></div>
          <button class="signout-btn" @click="showSignOutModal = true">
            <ArrowRightOnRectangleIcon class="nav-icon" aria-hidden="true" />
            <span>Sign Out</span>
          </button>
        </div>

      </div>

      <!-- Decorative heartbeat line on sidebar bottom -->
      <div class="sidebar-heartbeat">
        <svg viewBox="0 0 288 28" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <polyline
            points="0,14 50,14 65,4 75,24 85,4 97,14 120,14 133,2 143,26 150,14 175,14 220,14 233,4 243,24 253,4 265,14 288,14"
            fill="none" stroke="rgba(220,38,38,0.35)" stroke-width="1.5"
          />
        </svg>
      </div>
    </aside>

    <!-- ══════════════════════════════════════
         MAIN AREA
    ══════════════════════════════════════ -->
    <div class="main-area">

      <!-- Top bar -->
      <header class="topbar">

        <div class="topbar-left">
          <!-- Page title breadcrumb could go here -->
          <div class="page-crumb">
            <span class="crumb-dot"></span>
            <span class="crumb-label">{{ currentPageName }}</span>
          </div>
        </div>

        <div class="topbar-right">

          <!-- System status -->
          <div class="status-badge">
            <span class="status-dot"></span>
            <span class="status-text">System Active</span>
          </div>

          <!-- Bell -->
          <button class="topbar-icon-btn" type="button">
            <BellIcon style="width:20px;height:20px;" aria-hidden="true" />
            <span class="notif-badge">3</span>
          </button>

          <div class="topbar-sep" aria-hidden="true"></div>

          <!-- User menu -->
          <Menu as="div" class="user-menu-wrap">
            <MenuButton class="user-menu-btn">
              <div class="user-avatar">RA</div>
              <span class="user-name">Rogelio Aca, Jr.</span>
              <ChevronDownIcon style="width:16px;height:16px;color:rgba(255,255,255,0.35);flex-shrink:0;" />
            </MenuButton>

            <transition
              enter-active-class="dropdown-enter-active"
              enter-from-class="dropdown-enter-from"
              enter-to-class="dropdown-enter-to"
              leave-active-class="dropdown-leave-active"
              leave-from-class="dropdown-enter-to"
              leave-to-class="dropdown-enter-from"
            >
              <MenuItems class="dropdown-menu">
                <div class="dropdown-header">
                  <div class="dropdown-avatar">RA</div>
                  <div>
                    <p class="dropdown-name">Rogelio Aca, Jr.</p>
                    <p class="dropdown-role">Admin</p>
                  </div>
                </div>
                <div class="dropdown-divider"></div>
                <MenuItem v-slot="{ active }">
                  <NuxtLink to="/profile" class="dropdown-item" :class="{ 'dropdown-item--active': active }">
                    <UserCircleIcon style="width:15px;height:15px;" />
                    Your Profile
                  </NuxtLink>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <NuxtLink to="/settings" class="dropdown-item" :class="{ 'dropdown-item--active': active }">
                    <Cog6ToothIcon style="width:15px;height:15px;" />
                    Settings
                  </NuxtLink>
                </MenuItem>
                <div class="dropdown-divider"></div>
                <MenuItem v-slot="{ active }">
                  <button
                    class="dropdown-item dropdown-item--danger"
                    :class="{ 'dropdown-item--active-danger': active }"
                    @click="showSignOutModal = true"
                  >
                    <ArrowRightOnRectangleIcon style="width:15px;height:15px;" />
                    Sign Out
                  </button>
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>

        </div>
      </header>

      <!-- Page content -->
      <main class="page-content">
        <div class="page-inner">
          <slot></slot>
        </div>
      </main>

    </div>

    <!-- ══════════════════════════════════════
         SIGN OUT MODAL
    ══════════════════════════════════════ -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="showSignOutModal" class="modal-overlay" @click.self="showSignOutModal = false">
          <div class="modal-box">

            <div class="modal-drop-icon">
              <svg viewBox="0 0 48 60" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:28px;height:34px;">
                <path d="M24 3 C24 3 3 22 3 36 C3 49 12.5 57 24 57 C35.5 57 45 49 45 36 C45 22 24 3 24 3Z" fill="url(#mDrop)"/>
                <path d="M17 32 L22 37 L32 26" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                <defs>
                  <linearGradient id="mDrop" x1="12" y1="3" x2="36" y2="57" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stop-color="#ff4444"/>
                    <stop offset="100%" stop-color="#7b0000"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <h3 class="modal-title">Sign Out</h3>
            <p class="modal-desc">Are you sure you want to sign out of KaDugo? Any unsaved changes will be lost.</p>

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
import { ref, computed } from 'vue'
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

const currentPageName = computed(() => {
  const match = navigation.find(n => n.href === route.path)
  return match ? match.name : 'Overview'
})

const showSignOutModal = ref(false)

const confirmSignOut = () => {
  showSignOutModal.value = false
  localStorage.removeItem('user')
  navigateTo('/')
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

/* ── Root ── */
.app-root {
  display: flex;
  min-height: 100vh;
  background: #0a0202;
  font-family: 'DM Sans', sans-serif;
}

/* ══════════════════════════════
   SIDEBAR
══════════════════════════════ */
.sidebar {
  position: fixed;
  top: 0; left: 0; bottom: 0;
  width: 272px;
  background: #0f0303;
  border-right: 1px solid rgba(220, 38, 38, 0.14);
  display: flex;
  flex-direction: column;
  z-index: 50;
  overflow: hidden;
}

/* faint noise texture overlay */
.sidebar::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 47px,
      rgba(220,38,38,0.03) 48px
    );
  pointer-events: none;
}

.sidebar-inner {
  flex: 1;
  overflow-y: auto;
  padding: 0 0 1rem;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
  scrollbar-width: none;
}
.sidebar-inner::-webkit-scrollbar { display: none; }

/* Logo */
.sidebar-logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.25rem 1.25rem 1rem;
  border-bottom: 1px solid rgba(255,255,255,0.04);
  margin-bottom: 1.25rem;
}

.logo-drop {
  width: 40px; height: 40px;
  background: linear-gradient(135deg, #dc2626, #7f1d1d);
  border-radius: 11px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 4px 16px rgba(220,38,38,0.35);
}

.logo-name {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 1.2rem;
  font-weight: 700;
  color: #fff;
  margin: 0;
  line-height: 1;
}

.logo-sub {
  font-size: 0.58rem;
  color: rgba(255,255,255,0.3);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin: 3px 0 0;
}

/* Emergency banner */
.emergency-banner {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  background: rgba(220,38,38,0.12);
  border: 1px solid rgba(220,38,38,0.28);
  border-radius: 10px;
  padding: 0.65rem 0.9rem;
  margin: 0 1rem 1.5rem;
}

.emergency-dot {
  width: 8px; height: 8px;
  border-radius: 50%;
  background: #ef4444;
  flex-shrink: 0;
  animation: blink 1.5s infinite;
  box-shadow: 0 0 6px rgba(239,68,68,0.7);
}

.emergency-title {
  font-size: 0.68rem;
  font-weight: 700;
  color: #fca5a5;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin: 0;
}

.emergency-count {
  font-size: 0.63rem;
  color: rgba(255,255,255,0.32);
  margin: 2px 0 0;
}

/* Nav */
.sidebar-nav {
  flex: 1;
  padding: 0 0.75rem;
}

.nav-section-label {
  font-size: 0.6rem;
  font-weight: 700;
  color: rgba(255,255,255,0.22);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  margin: 0 0.5rem 0.5rem;
}

.nav-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.65rem 0.85rem;
  border-radius: 10px;
  font-size: 0.875rem;
  font-weight: 500;
  color: rgba(255,255,255,0.45);
  text-decoration: none;
  border: 1px solid transparent;
  transition: color 0.15s, background 0.15s, border-color 0.15s;
  position: relative;
}

.nav-link:hover {
  color: rgba(255,255,255,0.85);
  background: rgba(220,38,38,0.08);
}

.nav-link--active {
  color: #fca5a5 !important;
  background: linear-gradient(135deg, rgba(220,38,38,0.22), rgba(185,28,28,0.1));
  border-color: rgba(220,38,38,0.3);
  font-weight: 600;
}

.nav-icon {
  width: 18px; height: 18px;
  flex-shrink: 0;
}

.nav-active-pip {
  position: absolute;
  right: 10px;
  width: 5px; height: 5px;
  border-radius: 50%;
  background: #ef4444;
  box-shadow: 0 0 6px rgba(239,68,68,0.8);
}

/* Footer */
.sidebar-footer {
  padding: 0 0.75rem 0.5rem;
  margin-top: 1rem;
}

.sidebar-divider {
  height: 1px;
  background: rgba(255,255,255,0.06);
  margin-bottom: 0.75rem;
}

.signout-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.65rem 0.85rem;
  border-radius: 10px;
  border: 1px solid rgba(220,38,38,0.2);
  background: transparent;
  color: rgba(255,120,120,0.6);
  font-family: 'DM Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s, color 0.15s, border-color 0.15s;
  text-align: left;
}

.signout-btn:hover {
  background: rgba(220,38,38,0.12);
  color: #fca5a5;
  border-color: rgba(220,38,38,0.4);
}

/* Heartbeat bottom decoration */
.sidebar-heartbeat {
  height: 28px;
  flex-shrink: 0;
  opacity: 0.7;
  position: relative;
  z-index: 1;
}
.sidebar-heartbeat svg {
  width: 100%; height: 28px;
}

/* ══════════════════════════════
   MAIN AREA
══════════════════════════════ */
.main-area {
  margin-left: 272px;
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* Topbar */
.topbar {
  position: sticky;
  top: 0;
  z-index: 40;
  height: 64px;
  background: rgba(10, 2, 2, 0.92);
  border-bottom: 1px solid rgba(220, 38, 38, 0.12);
  backdrop-filter: blur(16px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  gap: 1rem;
}

.topbar-left { display: flex; align-items: center; }

.page-crumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: rgba(255,255,255,0.55);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.crumb-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #dc2626;
  box-shadow: 0 0 6px rgba(220,38,38,0.7);
}

.topbar-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

/* Status badge */
.status-badge {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  background: rgba(220,38,38,0.1);
  border: 1px solid rgba(220,38,38,0.22);
  border-radius: 999px;
  padding: 0.3rem 0.8rem;
}

.status-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #22c55e;
  animation: blink 2s infinite;
  box-shadow: 0 0 5px rgba(34,197,94,0.7);
}

.status-text {
  font-size: 0.68rem;
  font-weight: 600;
  color: rgba(255,255,255,0.55);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Topbar icon button */
.topbar-icon-btn {
  position: relative;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 10px;
  width: 38px; height: 38px;
  display: flex; align-items: center; justify-content: center;
  color: rgba(255,255,255,0.45);
  cursor: pointer;
  transition: background 0.15s, color 0.15s, border-color 0.15s;
}

.topbar-icon-btn:hover {
  background: rgba(220,38,38,0.1);
  border-color: rgba(220,38,38,0.3);
  color: #fca5a5;
}

.notif-badge {
  position: absolute;
  top: -4px; right: -4px;
  width: 16px; height: 16px;
  background: #dc2626;
  border-radius: 50%;
  font-size: 0.55rem;
  font-weight: 700;
  color: white;
  display: flex; align-items: center; justify-content: center;
  border: 1.5px solid #0f0303;
}

.topbar-sep {
  width: 1px;
  height: 24px;
  background: rgba(255,255,255,0.08);
}

/* User menu */
.user-menu-wrap { position: relative; }

.user-menu-btn {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 12px;
  padding: 0.4rem 0.75rem 0.4rem 0.4rem;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s;
}

.user-menu-btn:hover {
  background: rgba(220,38,38,0.1);
  border-color: rgba(220,38,38,0.25);
}

.user-avatar {
  width: 30px; height: 30px;
  border-radius: 50%;
  background: linear-gradient(135deg, #dc2626, #991b1b);
  display: flex; align-items: center; justify-content: center;
  font-size: 0.65rem;
  font-weight: 700;
  color: white;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(220,38,38,0.4);
}

.user-name {
  font-size: 0.82rem;
  font-weight: 600;
  color: rgba(255,255,255,0.75);
}

/* Dropdown */
.dropdown-menu {
  position: absolute;
  right: 0;
  top: calc(100% + 8px);
  width: 220px;
  background: #140404;
  border: 1px solid rgba(220,38,38,0.2);
  border-radius: 14px;
  padding: 0.5rem;
  box-shadow: 0 20px 50px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04) inset;
  z-index: 60;
}

.dropdown-header {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.6rem 0.7rem;
  margin-bottom: 0.25rem;
}

.dropdown-avatar {
  width: 32px; height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #dc2626, #991b1b);
  display: flex; align-items: center; justify-content: center;
  font-size: 0.65rem;
  font-weight: 700;
  color: white;
  flex-shrink: 0;
}

.dropdown-name {
  font-size: 0.82rem;
  font-weight: 600;
  color: rgba(255,255,255,0.8);
  margin: 0;
  line-height: 1.2;
}

.dropdown-role {
  font-size: 0.65rem;
  color: rgba(255,255,255,0.3);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin: 2px 0 0;
}

.dropdown-divider {
  height: 1px;
  background: rgba(255,255,255,0.06);
  margin: 0.35rem 0;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  width: 100%;
  padding: 0.55rem 0.75rem;
  border-radius: 8px;
  font-size: 0.82rem;
  font-weight: 500;
  color: rgba(255,255,255,0.55);
  text-decoration: none;
  background: transparent;
  border: none;
  cursor: pointer;
  font-family: 'DM Sans', sans-serif;
  text-align: left;
  transition: background 0.12s, color 0.12s;
}

.dropdown-item--active,
.dropdown-item:hover {
  background: rgba(220,38,38,0.1);
  color: rgba(255,255,255,0.85);
}

.dropdown-item--danger {
  color: rgba(252,165,165,0.7);
  font-weight: 600;
}

.dropdown-item--danger:hover,
.dropdown-item--active-danger {
  background: rgba(220,38,38,0.15);
  color: #fca5a5;
}

/* Dropdown transition */
.dropdown-enter-active { transition: opacity 0.15s ease, transform 0.15s ease; }
.dropdown-leave-active { transition: opacity 0.1s ease, transform 0.1s ease; }
.dropdown-enter-from { opacity: 0; transform: translateY(-6px) scale(0.97); }
.dropdown-enter-to   { opacity: 1; transform: translateY(0) scale(1); }
.dropdown-leave-to   { opacity: 0; transform: translateY(-4px) scale(0.97); }

/* Page content */
.page-content {
  flex: 1;
  background: #0d0303;
  background-image:
    radial-gradient(ellipse 80% 50% at 50% -10%, rgba(220,38,38,0.07), transparent),
    repeating-linear-gradient(
      90deg,
      transparent,
      transparent 59px,
      rgba(255,255,255,0.012) 60px
    ),
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 59px,
      rgba(255,255,255,0.012) 60px
    );
  min-height: calc(100vh - 64px);
}

.page-inner {
  padding: 2.5rem 2rem;
  max-width: 1400px;
}

/* ══════════════════════════════
   SIGN OUT MODAL
══════════════════════════════ */
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(5, 0, 0, 0.75);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.modal-box {
  background: #120303;
  border: 1px solid rgba(220,38,38,0.25);
  border-radius: 22px;
  padding: 2.25rem 2rem;
  width: 100%;
  max-width: 380px;
  box-shadow:
    0 30px 70px rgba(0,0,0,0.6),
    0 0 0 1px rgba(255,255,255,0.04) inset,
    0 0 50px rgba(180,0,0,0.1);
  text-align: center;
}

.modal-drop-icon {
  width: 64px; height: 64px;
  background: rgba(220,38,38,0.12);
  border: 1px solid rgba(220,38,38,0.25);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 1.5rem;
}

.modal-title {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 1.4rem;
  font-weight: 700;
  color: #fff;
  margin: 0 0 0.5rem;
}

.modal-desc {
  font-size: 0.83rem;
  color: rgba(255,255,255,0.38);
  margin: 0 0 2rem;
  line-height: 1.6;
}

.modal-actions {
  display: flex;
  gap: 0.75rem;
}

.modal-btn-cancel {
  flex: 1;
  padding: 0.75rem;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 11px;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  color: rgba(255,255,255,0.45);
  cursor: pointer;
  transition: all 0.15s;
}

.modal-btn-cancel:hover {
  background: rgba(255,255,255,0.07);
  color: rgba(255,255,255,0.7);
}

.modal-btn-confirm {
  flex: 1;
  padding: 0.75rem;
  background: linear-gradient(135deg, #dc2626, #991b1b);
  border: none;
  border-radius: 11px;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  color: white;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(220,38,38,0.35);
  transition: all 0.15s;
}

.modal-btn-confirm:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 22px rgba(220,38,38,0.5);
}

/* Modal transition */
.modal-enter-active,
.modal-leave-active { transition: opacity 0.2s ease; }
.modal-enter-active .modal-box,
.modal-leave-active .modal-box { transition: transform 0.2s ease, opacity 0.2s ease; }
.modal-enter-from,
.modal-leave-to { opacity: 0; }
.modal-enter-from .modal-box,
.modal-leave-to .modal-box { transform: scale(0.95); opacity: 0; }

/* ══════════════════════════════
   GLOBAL UTILS
══════════════════════════════ */
@keyframes blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.25; }
}

/* Responsive: hide sidebar on small screens */
@media (max-width: 1024px) {
  .sidebar { display: none; }
  .main-area { margin-left: 0; }
}
</style>