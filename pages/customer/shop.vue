<template>
  <NuxtLayout>
    <div>
      <!-- Page Header -->
      <div class="mb-8 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Mangukay Ta!</h1>
          <p class="mt-1 text-sm text-gray-500">Choose a package for your loved one.</p>
        </div>
        <button
          class="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white relative"
          style="background: linear-gradient(135deg, #000000, #000000);"
          @click="openCart"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
          Cart
          <span v-if="cartCount > 0" class="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">{{ cartCount }}</span>
        </button>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="flex flex-col items-center gap-4 py-20 text-gray-400">
        <div class="w-9 h-9 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
        <p class="text-sm">Loading services...</p>
      </div>

      <!-- Products Grid -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div v-for="product in products" :key="product.uuid"
          class="bg-white rounded-2xl p-6 flex flex-col items-center gap-4 shadow-sm border border-gray-100 hover:-translate-y-1 hover:shadow-md transition-all duration-200">
          <div class="w-full flex justify-between items-start">
            <span class="text-4xl">🏥</span>
            <span class="text-xs font-semibold bg-green-100 text-green-700 px-3 py-1 rounded-full">Available</span>
          </div>
          <h3 class="text-sm font-bold text-gray-900 text-center">{{ product.name }}</h3>
          <p class="text-xl font-bold text-blue-800">₱{{ Number(product.price).toLocaleString('en-PH', { minimumFractionDigits: 2 }) }}</p>
          <div class="flex items-center gap-4 bg-gray-50 border border-gray-200 rounded-full px-4 py-2">
            <button class="text-gray-500 hover:text-blue-800 text-lg font-bold" @click="decreaseQty(product)">−</button>
            <span class="text-sm font-bold text-gray-900 min-w-[20px] text-center">{{ getQty(product.uuid) }}</span>
            <button class="text-gray-500 hover:text-blue-800 text-lg font-bold" @click="increaseQty(product)">+</button>
          </div>
          <button
            class="w-full py-2.5 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 transition hover:opacity-90"
            style="background: linear-gradient(135deg, #000000, #000000);"
            @click="addToCart(product)"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Add to Cart
          </button>
        </div>
      </div>

      <!-- Cart Modal -->
      <div v-if="showCart" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" @click.self="showCart = false">
        <div class="bg-white rounded-2xl p-8 w-full max-w-md max-h-[90vh] overflow-y-auto">

          <!-- Success Screen -->
          <div v-if="checkoutSuccess" class="flex flex-col items-center gap-4 text-center">
            <div class="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold" style="background: linear-gradient(135deg, #16a34a, #22c55e);">✓</div>
            <h3 class="text-xl font-bold text-gray-900">Order Confirmed!</h3>
            <p class="text-sm text-gray-500">Your order has been placed successfully.</p>
            <div class="w-full bg-gray-50 rounded-xl p-5 text-left flex flex-col gap-3">
              <p class="text-xs font-bold text-gray-400 uppercase tracking-widest">Order Summary</p>
              <div v-for="(item, i) in lastOrder" :key="i" class="flex justify-between text-sm text-gray-700">
                <span>{{ item.name }} <span class="text-gray-400">x{{ item.quantity }}</span></span>
                <span>₱{{ (Number(item.price) * item.quantity).toLocaleString('en-PH', { minimumFractionDigits: 2 }) }}</span>
              </div>
              <div class="flex justify-between text-base font-bold text-gray-900 pt-3 border-t border-gray-200">
                <span>Total Paid</span>
                <span class="text-blue-800">₱{{ lastTotal.toLocaleString('en-PH', { minimumFractionDigits: 2 }) }}</span>
              </div>
            </div>
            <button class="w-full py-3 rounded-xl text-sm font-bold text-white" style="background: linear-gradient(135deg, #1e3a5f, #2563eb);" @click="closeAfterCheckout">Done</button>
          </div>

          <!-- Cart Contents -->
          <div v-else>
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-lg font-bold text-gray-900">Your Cart</h3>
              <button class="w-8 h-8 rounded-full bg-gray-100 text-gray-500 text-sm hover:bg-gray-200" @click="showCart = false">✕</button>
            </div>

            <div v-if="cart.length === 0" class="flex flex-col items-center gap-3 py-10 text-gray-400">
              <span class="text-5xl">🛒</span>
              <p class="text-sm">Your cart is empty.</p>
            </div>

            <div v-else>
              <div class="flex flex-col mb-5">
                <div v-for="(item, index) in cart" :key="index" class="flex justify-between items-center py-3 border-b border-gray-50">
                  <div>
                    <p class="text-sm font-semibold text-gray-900">{{ item.name }}</p>
                    <p class="text-xs text-gray-400">₱{{ Number(item.price).toLocaleString('en-PH', { minimumFractionDigits: 2 }) }} / unit</p>
                  </div>
                  <div class="flex items-center gap-3">
                    <span class="text-sm font-bold text-blue-800">₱{{ (Number(item.price) * item.quantity).toLocaleString('en-PH', { minimumFractionDigits: 2 }) }}</span>
                    <span class="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-semibold">x{{ item.quantity }}</span>
                    <button class="text-gray-300 hover:text-red-500 text-sm transition" @click="removeFromCart(index)">✕</button>
                  </div>
                </div>
              </div>

              <div class="bg-gray-50 rounded-xl p-4 mb-5 flex flex-col gap-2">
                <div class="flex justify-between text-sm text-gray-500">
                  <span>Subtotal</span>
                  <span>₱{{ totalAmount.toLocaleString('en-PH', { minimumFractionDigits: 2 }) }}</span>
                </div>
                <div class="flex justify-between text-base font-bold text-gray-900 pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span class="text-blue-800 text-lg">₱{{ totalAmount.toLocaleString('en-PH', { minimumFractionDigits: 2 }) }}</span>
                </div>
              </div>

              <button
                class="w-full py-3.5 rounded-xl text-sm font-bold text-white mb-2 flex items-center justify-center gap-2 disabled:opacity-60"
                style="background: linear-gradient(135deg, #1e3a5f, #2563eb);"
                :disabled="checkingOut"
                @click="handleCheckout"
              >
                <svg v-if="checkingOut" class="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="9" stroke="rgba(255,255,255,0.3)" stroke-width="2.5"/>
                  <path d="M12 3a9 9 0 019 9" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
                </svg>
                {{ checkingOut ? 'Processing...' : 'Proceed to Checkout' }}
              </button>

              <p v-if="checkoutError" class="text-red-500 text-xs text-center mb-3">{{ checkoutError }}</p>
            </div>

            <button class="w-full py-3 rounded-xl text-sm font-semibold text-gray-500 bg-gray-100 hover:bg-gray-200 transition" @click="showCart = false">Continue Shopping</button>
          </div>

        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";

const products = ref<any[]>([]);
const cart = ref<any[]>([]);
const lastOrder = ref<any[]>([]);
const lastTotal = ref(0);
const quantities = ref<Record<string, number>>({});
const loading = ref(true);
const showCart = ref(false);
const checkingOut = ref(false);
const checkoutError = ref("");
const checkoutSuccess = ref(false);
const customerUuid = ref("");

const runtimeConfig = useRuntimeConfig();
const token = localStorage.getItem("_token");

const headers = {
  Authorization: `Bearer ${token}`,
  Accept: "application/json",
};

const cartCount = computed(() =>
  cart.value.reduce((sum, item) => sum + item.quantity, 0)
);

const totalAmount = computed(() =>
  cart.value.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0)
);

const getQty = (uuid: string) => quantities.value[uuid] || 1;

const increaseQty = (product: any) => {
  quantities.value[product.uuid] = getQty(product.uuid) + 1;
};

const decreaseQty = (product: any) => {
  if (getQty(product.uuid) > 1) {
    quantities.value[product.uuid] = getQty(product.uuid) - 1;
  }
};

const addToCart = (product: any) => {
  const qty = getQty(product.uuid);
  const existing = cart.value.find((i) => i.uuid === product.uuid);
  if (existing) {
    existing.quantity += qty;
  } else {
    cart.value.push({ ...product, quantity: qty });
  }
  quantities.value[product.uuid] = 1;
};

const removeFromCart = (index: number) => {
  cart.value.splice(index, 1);
};

const openCart = () => {
  checkoutSuccess.value = false;
  showCart.value = true;
};

const closeAfterCheckout = () => {
  checkoutSuccess.value = false;
  showCart.value = false;
};

const fetchCustomer = async () => {
  try {
    const data = await $fetch<any>("customers", {
      baseURL: runtimeConfig.public.apiBaseURL,
      headers,
    });
    const email = localStorage.getItem("_email");
    const customer = (data.data || data).find((c: any) => c.email === email);
    if (customer) {
      customerUuid.value = customer.uuid;
    } else {
      checkoutError.value = "No customer record found. Please contact admin.";
    }
  } catch (e) {
    console.error("fetchCustomer failed:", e);
  }
};

const fetchProducts = async () => {
  try {
    const data = await $fetch<any>("products", {
      baseURL: runtimeConfig.public.apiBaseURL,
      headers,
    });
    products.value = data.data || data;
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
};

const handleCheckout = async () => {
  if (!customerUuid.value) {
    checkoutError.value = "No customer record found. Please contact admin.";
    return;
  }

  checkingOut.value = true;
  checkoutError.value = "";

  try {
    await $fetch("orders", {
      baseURL: runtimeConfig.public.apiBaseURL,
      method: "POST",
      headers,
      body: {
        customer_uuid: customerUuid.value,
        items: cart.value.map((item: any) => ({
          product_uuid: item.uuid,
          quantity: item.quantity,
        })),
      },
    });

    lastOrder.value = [...cart.value];
    lastTotal.value = totalAmount.value;
    cart.value = [];
    checkoutSuccess.value = true;
  } catch (e: any) {
    checkoutError.value = e?.message || "Checkout failed. Please try again.";
  } finally {
    checkingOut.value = false;
  }
};

onMounted(() => {
  fetchProducts();
  fetchCustomer();
});
</script>