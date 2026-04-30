<script setup>
definePageMeta({
  layout: "customer",
});

import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { productService } from "~/api/product/ProductService";
import {
  ChevronLeftIcon,
  ShoppingCartIcon,
  BoltIcon,
} from "@heroicons/vue/24/outline";

const route = useRoute();
const router = useRouter();
const uuid = route.params.uuid;

const product = ref(null);
const pending = ref(true);
const error = ref(null);
const addedToCart = ref(false);

const loadProduct = async () => {
  pending.value = true;
  error.value = null;
  try {
    const response = await productService.show(uuid);
    // Laravel API resources wrap the object in a 'data' property
    product.value = response.data || response;
  } catch (err) {
    console.error("Failed to load product:", err);
    error.value = err;
  } finally {
    pending.value = false;
  }
};

const addToCart = () => {
  if (!product.value) return;

  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const existingItem = cart.find((item) => item.uuid === product.value.uuid);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      uuid: product.value.uuid,
      name: product.value.name,
      price: product.value.price,
      quantity: 1,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  // Show visual feedback
  addedToCart.value = true;
  setTimeout(() => {
    addedToCart.value = false;
  }, 2000);
};

const buyNow = () => {
  if (!product.value) return;

  const checkoutData = {
    isBuyNow: true,
    items: [
      {
        uuid: product.value.uuid,
        name: product.value.name,
        price: product.value.price,
        quantity: 1,
      },
    ],
  };

  localStorage.setItem("checkout_data", JSON.stringify(checkoutData));
  router.push("/customer/checkout");
};

const formatPrice = (price) => {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(price);
};

onMounted(loadProduct);
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
    <!-- Back Button -->
    <NuxtLink
      to="/customer/shop"
      class="group mb-8 inline-flex items-center text-sm font-medium text-gray-500 transition-colors hover:text-gray-700"
    >
      <ChevronLeftIcon
        class="mr-1 h-5 w-5 transition-transform group-hover:-translate-x-1"
      />
      Back to Shop
    </NuxtLink>

    <!-- Loading State -->
    <div
      v-if="pending"
      class="animate-pulse lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-12"
    >
      <div
        class="aspect-h-1 aspect-w-1 h-[500px] w-full overflow-hidden rounded-3xl bg-gray-200"
      ></div>
      <div class="mt-10 space-y-6 px-4 sm:mt-16 sm:px-0 lg:mt-0">
        <div class="h-10 w-3/4 rounded-lg bg-gray-200"></div>
        <div class="h-6 w-1/4 rounded-lg bg-gray-200"></div>
        <div class="space-y-3 pt-6">
          <div class="h-4 w-full rounded bg-gray-200"></div>
          <div class="h-4 w-full rounded bg-gray-200"></div>
          <div class="h-4 w-2/3 rounded bg-gray-200"></div>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="rounded-3xl bg-red-50 py-20 text-center">
      <p class="font-medium text-red-800">Failed to load product details.</p>
      <button
        @click="loadProduct"
        class="mt-4 font-semibold text-indigo-600 hover:underline"
      >
        Retry
      </button>
    </div>

    <!-- Product Details -->
    <div
      v-else-if="product"
      class="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-12"
    >
      <!-- Image / Aesthetic Hero -->
      <div
        class="aspect-h-1 aspect-w-1 flex h-[500px] w-full items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 to-purple-700 shadow-2xl shadow-indigo-100"
      >
        <span class="select-none text-9xl font-black text-white opacity-10">
          {{ product?.name?.charAt(0) || "P" }}
        </span>
      </div>

      <!-- Product Info -->
      <div class="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
        <h1
          class="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl"
        >
          {{ product?.name }}
        </h1>

        <div class="mt-3">
          <h2 class="sr-only">Product information</h2>
          <p class="text-3xl font-bold text-indigo-600">
            {{ formatPrice(product.price) }}
          </p>
        </div>

        <!-- Description (Placeholder Content) -->
        <div class="mt-6">
          <h3 class="sr-only">Description</h3>
          <div class="space-y-6 text-base leading-relaxed text-gray-700">
            <p>
              Experience the perfect blend of innovation and style with the
              {{ product?.name }}. Designed for those who demand excellence,
              this product offers unparalleled performance and reliability in
              its class.
            </p>
            <ul class="list-disc space-y-2 pl-5 text-gray-600">
              <li>Premium build quality and materials</li>
              <li>Sleek, modern aesthetic design</li>
              <li>Optimized for maximum efficiency</li>
              <li>Includes full manufacturer warranty</li>
            </ul>
          </div>
        </div>

        <!-- CTA Buttons -->
        <div class="mt-10 flex flex-col gap-4 sm:flex-row">
          <button
            @click="addToCart"
            type="button"
            class="flex flex-1 items-center justify-center rounded-xl border border-transparent px-8 py-4 text-base font-bold text-white shadow-lg transition-all active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            :class="
              addedToCart
                ? 'bg-green-600 shadow-green-200'
                : 'bg-indigo-600 shadow-indigo-200 hover:bg-indigo-700'
            "
          >
            <ShoppingCartIcon v-if="!addedToCart" class="mr-2 h-5 w-5" />
            <span v-if="addedToCart">Added to Cart!</span>
            <span v-else>Add to Cart</span>
          </button>
          <button
            @click="buyNow"
            type="button"
            class="flex flex-1 items-center justify-center rounded-xl border-2 border-gray-900 bg-transparent px-8 py-4 text-base font-bold text-gray-900 transition-all active:scale-[0.98] hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
          >
            <BoltIcon class="mr-2 h-5 w-5" />
            Buy Now
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
