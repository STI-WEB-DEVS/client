<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <header class="border-b border-gray-200 bg-white sticky top-0 z-40">
      <div
        class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8"
      >
        <!-- MY STORE → back to home -->
        <NuxtLink
          to="/customer/order"
          class="text-xl font-bold text-gray-900 hover:text-indigo-600 transition"
        >
          My Store
        </NuxtLink>

        <!-- NAV LINKS -->
        <nav class="hidden items-center gap-8 text-sm font-medium md:flex">
          <NuxtLink
            to="/customer/shop"
            :class="
              route.path === '/customer/shop'
                ? 'text-indigo-600'
                : 'text-gray-600 hover:text-indigo-600'
            "
            class="transition"
          >
            Shop
          </NuxtLink>

          <div class="flex items-center gap-8">
            <span class="cursor-default text-gray-400">Categories</span>
            <span class="cursor-default text-gray-400">Orders</span>
            <span class="cursor-default text-gray-400">Account</span>
          </div>
        </nav>

        <!-- CART + SIGN OUT -->
        <div class="flex items-center gap-3">
          <NuxtLink
            to="/customer/cart"
            class="relative rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
          >
            Cart
            <span
              v-if="cartCount > 0"
              class="absolute -top-2 -right-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white"
            >
              {{ cartCount }}
            </span>
          </NuxtLink>

          <button
            @click="handleSignOut"
            class="rounded-full border border-black-300 px-4 py-2 text-sm font-medium text-black-600 hover:bg-gray-100 transition"
          >
            Sign out
          </button>
        </div>
      </div>
    </header>

    <main class="flex-1">
      <slot />
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

    <FeedbackModal
      :open="feedbackOpen"
      :message="feedbackMessage"
      @close="feedbackOpen = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { AuthService } from "~/api/auth/AuthService";

const route = useRoute();
const router = useRouter();
const authService = new AuthService();

const cartCount = ref(0);
const feedbackOpen = ref(false);
const feedbackMessage = ref("");

const updateCartCount = () => {
  if (process.client) {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cartCount.value = cart.reduce(
      (sum: number, item: any) => sum + item.quantity,
      0,
    );
  }
};

onMounted(() => {
  updateCartCount();
  window.addEventListener("cart-updated", updateCartCount);
});

watch(() => route.path, updateCartCount);

const handleSignOut = async () => {
  await authService.logout();
  localStorage.removeItem("cart");
  await router.replace("/");
};

provide("showFeedback", (msg: string) => {
  feedbackMessage.value = msg;
  feedbackOpen.value = true;
});
provide("updateCartCount", updateCartCount);
</script>
