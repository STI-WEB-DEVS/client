<!-- layouts/customer.vue -->

<template>
  <div class="min-h-screen bg-gray-50">
    <header class="border-b border-gray-200 bg-white">
      <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div class="text-xl font-bold text-gray-900">
          My Store
        </div>

        <div class="hidden items-center gap-8 text-sm font-medium text-gray-600 md:flex">
          <span>Shop</span>
          <span>Categories</span>
          <span>Orders</span>
          <button @click="promptLogout" class="rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">Logout</button>
        </div>

        <button @click="navigateTo('/customer/checkout')" class="rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
          Cart
        </button>
      </div>
    </header>

    <main>
      <section class="bg-white">
        <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div class="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <p class="text-sm font-semibold uppercase tracking-wide text-indigo-600">
                New arrivals
              </p>

              <h1 class="mt-3 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Shop quality products made for everyday use.
              </h1>

              <p class="mt-5 max-w-xl text-base text-gray-600">
                Browse featured products, discover new items, and enjoy a simple shopping experience.
              </p>

              <div class="mt-8 flex gap-3">
                <button
                  @click="scrollToProducts"
                  class="rounded-md bg-indigo-600 px-5 py-3 text-sm font-semibold text-white"
                >
                  Shop Now
                </button>

                <button class="rounded-md border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700">
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

      <section
        ref="productsSection"
        class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8"
      >
        <div class="mb-6">
          <h2 class="text-2xl font-bold text-gray-900">
            Products
          </h2>

          <p class="mt-1 text-sm text-gray-600">
            Browse all available products.
          </p>
        </div>

        <p v-if="isLoading" class="text-sm text-gray-500">
          Loading products...
        </p>

        <p v-else-if="error" class="text-sm text-red-600">
          {{ error }}
        </p>

        <div
          v-else
          class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          <div
            v-for="product in products"
            :key="product.uuid || product.id"
            class="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
          >
            <div class="mb-4 flex aspect-square items-center justify-center rounded-lg bg-gray-200 text-4xl font-bold text-gray-400">
              {{ product.name?.charAt(0) }}
            </div>

            <h3 class="font-semibold text-gray-900">
              {{ product.name }}
            </h3>

            <p class="mt-1 text-sm text-gray-500">
              {{ product.description }}
            </p>

            <p class="mt-3 font-bold text-gray-900">
              ₱{{ Number(product.price || 0).toLocaleString() }}
            </p>

            <p
              class="mt-1 text-sm font-medium"
              :class="product.quantity > 0 ? 'text-green-600' : 'text-red-500'"
            >
              {{ product.quantity > 0 ? product.quantity + ' in stock' : 'Out of stock' }}
            </p>

            <div v-if="product.quantity > 0" class="mt-3 flex items-center gap-2">
              <label class="text-sm font-medium text-gray-700">Quantity:</label>
              <input 
                type="number" 
                v-model.number="product.selectedQuantity" 
                min="1" 
                :max="product.quantity"
                class="w-16 rounded-md border border-gray-300 px-2 py-1 text-sm"
              />
            </div>

            <div class="mt-4 grid grid-cols-2 gap-2">
              <button
                @click="handleAddToCart(product)"
                :disabled="product.quantity === 0"
                class="rounded-md border border-indigo-600 px-4 py-2 text-sm font-semibold text-indigo-600 hover:bg-indigo-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Add to Cart
              </button>

              <button
                @click="openBuyNowModal(product)"
                :disabled="product.quantity === 0"
                class="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>

        <slot />
      </section>
    </main>

    <footer class="border-t border-gray-200 bg-white">
      <div class="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-gray-500 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <p>© 2026 My Store. All rights reserved.</p>

        <div class="flex gap-6">
          <span>Help</span>
          <span>Contact</span>
          <span>Privacy</span>
        </div>
      </div>
    </footer>

    <BuyNowModal
      :model-value="showBuyNowModal"
      :product="selectedProduct"
      :customer-uuid="customerUUID"
      @close="closeBuyNowModal"
      @confirm="confirmBuyNow"
    />

    <SuccessModal
      :model-value="showSuccessModal"
      @view-orders="goToOrders"
    />

    <!-- Simple Cart Modal -->
<div
  v-if="showCartModal"
  class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
>
  <div class="w-full max-w-sm rounded-lg bg-white p-6 shadow-lg">
    <h3 class="text-lg font-bold text-gray-900">Added to Cart</h3>
    <p class="mt-2 text-sm text-gray-600">
      {{ selectedProductName }} has been added to your cart.
    </p>

    <div class="mt-4 flex gap-3">
      <button
        @click="showCartModal = false"
        class="flex-1 rounded-md border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
      >
        Continue Shopping
      </button>
      <button
        @click="navigateTo('/customer/checkout')"
        class="flex-1 rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
      >
        Go to Checkout
      </button>
    </div>
  </div>
</div>

    <!-- Logout Confirmation Modal -->
    <teleport to="body">
      <transition name="fade">
        <div v-if="showLogoutConfirm" class="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
          <div class="absolute inset-0 bg-black/30 backdrop-blur-sm" @click="showLogoutConfirm = false" />
          <div class="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div class="flex items-start justify-between gap-4">
              <div>
                <h2 class="text-lg font-semibold text-gray-900">Confirm Logout</h2>
                <p class="mt-2 text-sm text-gray-600">
                  Are you sure you want to log out of your account?
                </p>
              </div>
              <button type="button" class="rounded-md p-2 text-gray-400 hover:bg-gray-100" @click="showLogoutConfirm = false">✕</button>
            </div>
            <div class="mt-6 flex justify-end gap-3">
              <button
                type="button"
                class="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                @click="showLogoutConfirm = false"
              >
                Cancel
              </button>
              <button
                type="button"
                class="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-500"
                @click="handleLogout"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </transition>
    </teleport>

    <!-- Feedback Modal -->
    <FeedbackModal
      :open="showLogoutFeedback"
      message="You have been successfully logged out."
      @close="closeLogoutFeedback"
    />
  </div>
</template>

<script setup lang="ts">

const showCartModal = ref(false);
const selectedProductName = ref('');

import { onMounted, ref } from 'vue';
import { productService } from '~/api/product/ProductService';
import { addToCart, setCart, getCart } from '~/utils/cart';
import BuyNowModal from '~/components/customer/modals/BuyNowModal.vue';
import SuccessModal from '~/components/customer/modals/SuccessModal.vue';
import FeedbackModal from '~/components/FeedbackModal.vue';
import { AuthService } from '~/api/auth/AuthService';

const authService = new AuthService();
const showLogoutFeedback = ref(false);
const showLogoutConfirm = ref(false);

const promptLogout = () => {
  showLogoutConfirm.value = true;
};

const handleLogout = async () => {
  showLogoutConfirm.value = false;
  await authService.logout();
  showLogoutFeedback.value = true;
};

const closeLogoutFeedback = () => {
  showLogoutFeedback.value = false;
  navigateTo('/');
};

const productsSection = ref<HTMLElement | null>(null);
const products = ref<any[]>([]);
const isLoading = ref(false);
const error = ref('');

const showBuyNowModal = ref(false);
const showSuccessModal = ref(false);
const selectedProduct = ref<any>(null);
const customerUUID = ref('');

const scrollToProducts = () => {
  productsSection.value?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
};

const fetchProducts = async () => {
  error.value = '';
  isLoading.value = true;

  try {
    const response = await productService.list();
    const items = response?.data || response || [];
    products.value = items.map((p: any) => ({ ...p, selectedQuantity: 1 }));
  } catch (err: any) {
    error.value = err?.message || 'Failed to load products.';
  } finally {
    isLoading.value = false;
  }
};

const handleAddToCart = (product: any) => {
  let qty = product.selectedQuantity || 1;
  if (qty > product.quantity) qty = product.quantity;
  if (qty < 1) qty = 1;
  
  addToCart(product, qty);
  selectedProductName.value = product.name;
  showCartModal.value = true; // ✅ show modal instead of alert
};


const openBuyNowModal = (product: any) => {
  selectedProduct.value = product;
  customerUUID.value = localStorage.getItem('_uuid') || '';
  showBuyNowModal.value = true;
};

const closeBuyNowModal = () => {
  showBuyNowModal.value = false;
  selectedProduct.value = null;
};

const confirmBuyNow = async (quantity: number) => {
  const cart = getCart(); // load existing cart

  const existingItem = cart.find(
    (item: any) => item.uuid === selectedProduct.value.uuid
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      ...selectedProduct.value,
      quantity,
    });
  }

  setCart(cart); // save updated cart

  closeBuyNowModal();

  await navigateTo('/customer/checkout');
};


const goToOrders = async () => {
  showSuccessModal.value = false;
  await navigateTo('/customer/order');
};

onMounted(() => {
  fetchProducts();
});
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>