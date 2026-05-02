<script setup lang="ts">
import { AuthService } from "~/api/auth/AuthService";

const authService = new AuthService();
const showConfirmLogout = ref(false);
const isLoggingOut = ref(false);

const handleLogout = () => {
  showConfirmLogout.value = true;
};

const confirmLogout = async () => {
  isLoggingOut.value = true;
  try {
    await authService.logout();
  } catch (error) {
    console.error("Logout failed:", error);
  } finally {
    localStorage.removeItem("_token");
    localStorage.removeItem("_uuid");
    localStorage.removeItem("_role");
    showConfirmLogout.value = false;
    isLoggingOut.value = false;
    navigateTo("/");
  }
};
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <header class="border-b border-gray-200 bg-white">
      <div
        class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8"
      >
        <NuxtLink to="/customer">
          <div class="text-xl font-bold text-gray-900">My Store</div>
        </NuxtLink>

        <div
          class="hidden items-center gap-8 text-sm font-medium text-gray-600 md:flex"
        >
          <NuxtLink to="/customer/shop">Shop</NuxtLink>
          <NuxtLink to="#">Categories</NuxtLink>
          <NuxtLink to="/customer/order">Orders</NuxtLink>
          <NuxtLink to="#">Account</NuxtLink>
        </div>

        <div class="flex items-center gap-4">
          <NuxtLink
            to="/customer/cart"
            class="rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cart
          </NuxtLink>
          <button
            @click="handleLogout"
            class="rounded-full border border-red-600 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-600 hover:text-white transition-colors"
          >
            Sign out
          </button>
        </div>
      </div>
    </header>

    <main>
      <section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <slot />
      </section>
    </main>

    <footer class="border-t border-gray-200 bg-white">
      <div
        class="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-gray-500 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8"
      >
        <p>© 2026 My Store. All rights reserved.</p>

        <div class="flex gap-6">
          <span>Help</span>
          <span>Contact</span>
          <span>Privacy</span>
        </div>
      </div>
    </footer>

    <BaseModal
      :open="showConfirmLogout"
      title="Confirm Sign Out"
      confirm-text="Sign Out"
      cancel-text="Cancel"
      variant="danger"
      :loading="isLoggingOut"
      @close="showConfirmLogout = false"
      @confirm="confirmLogout"
    >
      Are you sure you want to sign out of your account? Any unsaved changes may
      be lost.
    </BaseModal>
  </div>
</template>
