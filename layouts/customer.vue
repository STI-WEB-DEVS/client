<!-- layouts/customer.vue -->

<script setup lang="ts">
const route = useRoute();

const showHero = computed(() => route.path === "/customer/order");

const { totalItems } = useCart();

const logoutModalOpen = ref(false);

const openLogoutModal = () => {
  logoutModalOpen.value = true;
};

const closeLogoutModal = () => {
  logoutModalOpen.value = false;
};

const confirmLogout = async () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("_token");
    localStorage.removeItem("uuid");
    localStorage.removeItem("role");
    localStorage.removeItem("customer_uuid");
    localStorage.removeItem("customer_cart");
    sessionStorage.setItem("signed_out", "1");
  }
  closeLogoutModal();
  await navigateTo("/");
};
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <header class="border-b border-gray-200 bg-white">
      <div
        class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8"
      >
        <NuxtLink
          to="/customer/order"
          class="shrink-0 text-xl font-bold text-gray-900"
        >
          My Store
        </NuxtLink>

        <nav class="hidden flex-1 justify-center md:flex">
          <div
            class="flex items-center gap-8 text-sm font-medium text-gray-600"
          >
            <NuxtLink
              to="/customer/shop"
              class="hover:text-gray-900"
              :class="route.path === '/customer/shop' ? 'text-gray-900' : ''"
            >
              Shop
            </NuxtLink>
            <NuxtLink to="/customer/shop" class="hover:text-gray-900">
              Categories
            </NuxtLink>
            <NuxtLink
              to="/customer/orders"
              class="hover:text-gray-900"
              :class="route.path === '/customer/orders' ? 'text-gray-900' : ''"
            >
              Orders
            </NuxtLink>
            <NuxtLink
              to="/customer/account"
              class="hover:text-gray-900"
              :class="route.path === '/customer/account' ? 'text-gray-900' : ''"
            >
              Account
            </NuxtLink>
          </div>
        </nav>

        <div class="flex items-center gap-3">
          <NuxtLink
            to="/customer/cart"
            class="shrink-0 rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cart
            <span v-if="totalItems > 0" class="ml-1 inline-flex items-center justify-center rounded-full bg-indigo-600 px-2 py-0.5 text-xs font-semibold text-white">
              {{ totalItems }}
            </span>
          </NuxtLink>

          <button
            type="button"
            class="shrink-0 rounded-full bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            @click="openLogoutModal"
          >
            Logout
          </button>
        </div>
      </div>
    </header>

    <main>
      <section v-if="showHero" class="bg-white">
        <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div class="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <p
                class="text-sm font-semibold uppercase tracking-wide text-indigo-600"
              >
                New arrivals
              </p>

              <h1
                class="mt-3 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl"
              >
                Shop quality products made for everyday use.
              </h1>

              <p class="mt-5 max-w-xl text-base text-gray-600">
                Browse featured products, discover new items, and enjoy a simple
                shopping experience.
              </p>

              <div class="mt-8 flex gap-3">
                <button
                  class="rounded-md bg-indigo-600 px-5 py-3 text-sm font-semibold text-white"
                  type="button"
                  @click="navigateTo('/customer/shop')"
                >
                  Shop Now
                </button>

                <button
                  class="rounded-md border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700"
                  type="button"
                  @click="navigateTo('/customer/shop')"
                >
                  View Deals
                </button>
              </div>
            </div>

            <div class="rounded-2xl bg-gray-200 p-8">
              <div class="aspect-[4/3] rounded-xl bg-gray-300" />
            </div>
          </div>
        </div>
      </section>

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

    <FeedbackModal
      :open="logoutModalOpen"
      title="Sign out"
      message="Are you sure you want to sign out?"
      confirm
      confirm-text="Sign out"
      cancel-text="Cancel"
      @close="closeLogoutModal"
      @confirm="confirmLogout"
    />
  </div>
</template>
