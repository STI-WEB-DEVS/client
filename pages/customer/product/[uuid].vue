<script setup lang="ts">
import type { Product } from "~/composables/useCart";

definePageMeta({
  layout: "customer",
});

const route = useRoute();
const uuid = computed(() => String(route.params.uuid || ""));

const { products, pending, error, refresh } = useProducts();
const { addItem } = useCart();

onMounted(async () => {
  if (!products.value.length) {
    await refresh();
  }
});

const product = computed<Product | null>(() => {
  return products.value.find((p) => p.uuid === uuid.value) || null;
});

const mockHighlights = computed(() => {
  const base = product.value?.name || "Product";
  return [
    `Built for daily tech use with ${base.toLowerCase()}.`,
    "Comfortable, lightweight feel for long sessions (mock).",
    "Stable performance for calls, music, and media (mock).",
    "Made for commuting, work, and everyday carry (mock).",
  ];
});

const mockSpecs = computed(() => {
  return [
    { label: "Condition", value: "New" },
    { label: "Compatibility", value: "Android / iOS / Windows (mock)" },
    { label: "Connectivity", value: "Bluetooth / Wired (mock)" },
    { label: "Charging", value: "USB-C (mock)" },
    { label: "Battery", value: "Up to 8 hours (mock)" },
    { label: "Warranty", value: "7 days (mock)" },
  ];
});

const formatMoney = (value: number) => {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(value || 0);
};

const alert = ref<{
  variant: "success" | "error" | "info";
  message: string;
} | null>(null);

const feedbackOpen = ref(false);
const feedbackMessage = ref("");

const openFeedback = (message: string) => {
  feedbackMessage.value = message;
  feedbackOpen.value = true;
};

const closeFeedback = () => {
  feedbackOpen.value = false;
};

const handleAdd = () => {
  alert.value = null;
  if (!product.value) {
    alert.value = { variant: "error", message: "Product not found." };
    return;
  }
  addItem(product.value, 1);
  openFeedback("Item has been successfully added to the cart.");
};

const handleBuyNow = async () => {
  alert.value = null;
  if (!product.value) {
    alert.value = { variant: "error", message: "Product not found." };
    return;
  }
  addItem(product.value, 1);
  await navigateTo("/customer/checkout");
};
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-start justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold tracking-tight text-gray-900">Product</h1>
        <p class="mt-1 text-sm text-gray-600">
          Product details and ordering actions.
        </p>
      </div>

      <NuxtLink
        to="/customer/shop"
        class="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Back to Shop
      </NuxtLink>
    </div>

    <UiAlert v-if="alert" :variant="alert.variant" :message="alert.message" />
    <UiAlert v-if="error" variant="error" :message="error" />

    <div
      v-if="pending && !product"
      class="rounded-xl border border-gray-200 bg-white p-6"
    >
      <p class="text-sm text-gray-600">Loading product...</p>
    </div>

    <div
      v-else-if="!product"
      class="rounded-xl border border-gray-200 bg-white p-6"
    >
      <p class="text-sm font-medium text-gray-900">Product not found.</p>
      <p class="mt-1 text-sm text-gray-600">
        Try returning to the shop and selecting a product again.
      </p>
    </div>

    <div v-else class="grid gap-6 lg:grid-cols-5">
      <div class="lg:col-span-2">
        <div
          class="overflow-hidden rounded-xl bg-gray-100 ring-1 ring-inset ring-gray-200"
        >
          <div class="aspect-[4/3]">
            <img
              v-if="product.imageUrl"
              :src="product.imageUrl"
              :alt="product.name"
              class="h-full w-full object-cover"
              loading="lazy"
            />
            <div
              v-else
              class="h-full w-full bg-gradient-to-br from-gray-100 to-gray-200"
            />
          </div>
        </div>
      </div>

      <div class="space-y-4 lg:col-span-3">
        <div class="rounded-xl border border-gray-200 bg-white p-6">
          <div class="flex items-start justify-between gap-4">
            <div class="min-w-0">
              <h2 class="text-xl font-bold text-gray-900">
                {{ product.name }}
              </h2>
              <p class="mt-2 text-sm text-gray-600">
                {{
                  product.description ||
                  "This is a mock product description used for the product details page."
                }}
              </p>
            </div>

            <div class="shrink-0">
              <span
                class="inline-flex items-center rounded-full bg-gray-50 px-3 py-1.5 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-200"
              >
                {{ formatMoney(product.price) }}
              </span>
            </div>
          </div>
        </div>

        <div class="grid gap-6 md:grid-cols-2">
          <div class="rounded-xl border border-gray-200 bg-white p-6">
            <h3 class="text-sm font-semibold text-gray-900">
              Highlights (mock)
            </h3>
            <ul class="mt-3 space-y-2 text-sm text-gray-600">
              <li v-for="h in mockHighlights" :key="h" class="flex gap-2">
                <span class="mt-1 size-1.5 shrink-0 rounded-full bg-gray-400" />
                <span>{{ h }}</span>
              </li>
            </ul>
          </div>

          <div class="rounded-xl border border-gray-200 bg-white p-6">
            <h3 class="text-sm font-semibold text-gray-900">Specs (mock)</h3>
            <dl class="mt-3 space-y-2 text-sm">
              <div
                v-for="s in mockSpecs"
                :key="s.label"
                class="flex items-center justify-between gap-4"
              >
                <dt class="text-gray-600">{{ s.label }}</dt>
                <dd class="font-medium text-gray-900">{{ s.value }}</dd>
              </div>
            </dl>
          </div>
        </div>

        <div class="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            class="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            @click="handleAdd"
          >
            Add to Cart
          </button>

          <button
            type="button"
            class="flex-1 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            @click="handleBuyNow"
          >
            Buy Now
          </button>
        </div>

        <FeedbackModal
          :open="feedbackOpen"
          title="Added to cart"
          :message="feedbackMessage"
          @close="closeFeedback"
        />
      </div>
    </div>
  </div>
</template>
