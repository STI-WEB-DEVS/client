<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- HEADER / NAVBAR -->
    <header class="border-b border-gray-200 bg-white sticky top-0 z-40">
      <div
        class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8"
      >
        <!-- MY STORE (clickable link back to /customer/order) -->
        <NuxtLink
          to="/customer/order"
          class="text-xl font-bold text-gray-900 hover:text-indigo-600 transition"
        >
          My Store
        </NuxtLink>

        <!-- NAV LINKS (center) -->
        <nav
          class="hidden items-center gap-8 text-sm font-medium text-gray-600 md:flex"
        >
          <NuxtLink
            to="/customer/shop"
            :class="[
              route.path === '/customer/shop'
                ? 'text-indigo-600'
                : 'text-gray-600 hover:text-gray-900',
              'transition',
            ]"
          >
            Shop
          </NuxtLink>

          <div class="flex items-center gap-8">
            <span class="cursor-default text-gray-400">Categories</span>
            <span class="cursor-default text-gray-400">Orders</span>
            <span class="cursor-default text-gray-400">Account</span>
          </div>
        </nav>

        <!-- RIGHT SIDE: Cart + Sign Out -->
        <div class="flex items-center gap-3">
          <!-- CART BUTTON with badge -->
          <NuxtLink
            to="/customer/cart"
            class="relative rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
          >
            Cart
            <span
              v-if="cartCount > 0"
              class="absolute -top-2 -right-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white"
            >
              {{ cartCount }}
            </span>
          </NuxtLink>

          <!-- SIGN OUT -->
          <button
            @click="handleSignOut"
            class="rounded-full border border-red-300 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition"
          >
            Sign out
          </button>
        </div>
      </div>
    </header>

    <!-- MAIN CONTENT -->
    <main class="flex-1">
      <slot />
    </main>

    <!-- FOOTER -->
    <footer class="border-t border-gray-200 bg-white">
      <div
        class="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-gray-500 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8"
      >
        <p>&copy; 2026 My Store. All rights reserved.</p>
        <div class="flex gap-6">
          <span>Help</span>
          <span>Contact</span>
          <span>Privacy</span>
        </div>
      </div>
    </footer>

    <!-- FEEDBACK MODAL -->
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
import { authService } from "~/api/auth/AuthService";

const route = useRoute();
const router = useRouter();

const cartCount = ref(0);
const feedbackOpen = ref(false);
const feedbackMessage = ref("");

// Recalculate cart count on every route change (reactive to cart updates)
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

  // Listen for custom cart update events
  window.addEventListener("cart-updated", updateCartCount);
});

watch(() => route.path, updateCartCount);

const handleSignOut = async () => {
  try {
    await authService.logout();
  } catch (err) {
    console.error(err);
  } finally {
    localStorage.removeItem("_token");
    localStorage.removeItem("uuid");
    localStorage.removeItem("role");
    localStorage.removeItem("cart");
    localStorage.removeItem("customer_uuid");
    await router.replace("/");
  }
};

// Expose for child pages to trigger feedback
const showFeedback = (msg: string) => {
  feedbackMessage.value = msg;
  feedbackOpen.value = true;
};

provide("showFeedback", showFeedback);
provide("updateCartCount", updateCartCount);
</script>