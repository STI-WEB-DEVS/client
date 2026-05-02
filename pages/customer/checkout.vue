<script setup lang="ts">
definePageMeta({
  layout: "customer",
});

const { cart, totalPrice, clear } = useCart();

const alert = ref<{
  variant: "success" | "error" | "info";
  message: string;
} | null>(null);

const readCustomerUuid = () => {
  if (!process.client) return "";
  return (localStorage.getItem("uuid") || "").trim();
};

const buildPayload = () => {
  const customerUuid = readCustomerUuid();
  if (!customerUuid) {
    throw new Error("Missing customer UUID. Please log in again.");
  }

  if (!cart.value.length) {
    throw new Error(
      "Your cart is empty. Add products before placing an order.",
    );
  }

  return {
    customer_uuid: customerUuid,
    items: cart.value.map((i) => ({
      product_uuid: i.uuid,
      quantity: i.quantity,
    })),
  };
};

const placeOrder = () => {
  alert.value = null;

  try {
    const payload = buildPayload();
    console.log(payload);
    clear();
  } catch (e: any) {
    alert.value = {
      variant: "error",
      message: e?.message || "Unable to place order.",
    };
  }
};

const formatMoney = (value: number) => {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(value || 0);
};
</script>

<template>
  <div class="space-y-6">
    <div
      class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
    >
      <div>
        <h1 class="text-2xl font-bold tracking-tight text-gray-900">
          Checkout
        </h1>
        <p class="mt-1 text-sm text-gray-600">
          Review your items before finalizing your purchase.
        </p>
      </div>

      <NuxtLink
        to="/customer/cart"
        class="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Back to Cart
      </NuxtLink>
    </div>

    <UiAlert v-if="alert" :variant="alert.variant" :message="alert.message" />

    <div class="mx-auto max-w-2xl">
      <div class="rounded-xl border border-gray-200 bg-white p-6">
        <h2 class="text-lg font-semibold text-gray-900">Order Summary</h2>

        <div
          v-if="!cart.length"
          class="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4"
        >
          <p class="text-sm text-gray-600">Your cart is empty.</p>
          <NuxtLink
            to="/customer/shop"
            class="mt-3 inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Browse Products
          </NuxtLink>
        </div>

        <div v-else class="mt-4 space-y-4">
          <div class="space-y-4">
            <div
              v-for="i in cart"
              :key="i.uuid"
              class="flex items-center justify-between gap-4"
            >
              <div class="flex min-w-0 items-center gap-3">
                <div
                  class="h-14 w-14 overflow-hidden rounded-lg bg-gray-100 ring-1 ring-inset ring-gray-200"
                >
                  <img
                    v-if="i.imageUrl"
                    :src="i.imageUrl"
                    :alt="i.name"
                    class="h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div
                    v-else
                    class="h-full w-full bg-gradient-to-br from-gray-100 to-gray-200"
                  />
                </div>

                <div class="min-w-0">
                  <p class="truncate text-sm font-semibold text-gray-900">
                    {{ i.name }}
                  </p>
                  <p class="text-xs text-gray-600">Qty: {{ i.quantity }}</p>
                  <p class="text-xs text-gray-500 font-mono">{{ i.uuid }}</p>
                </div>
              </div>

              <p class="text-sm font-semibold text-gray-900">
                {{ formatMoney(i.price * i.quantity) }}
              </p>
            </div>
          </div>

          <div class="border-t border-gray-200 pt-4">
            <div class="flex items-center justify-between">
              <p class="text-sm text-gray-600">Subtotal</p>
              <p class="text-sm font-semibold text-gray-900">
                {{ formatMoney(totalPrice) }}
              </p>
            </div>
          </div>

          <div class="border-t border-gray-200 pt-4">
            <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <p class="text-3xl font-bold tracking-tight text-gray-900">
                {{ formatMoney(totalPrice) }}
              </p>
              <button
                type="button"
                class="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:opacity-50"
                :disabled="!cart.length"
                @click="placeOrder"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
