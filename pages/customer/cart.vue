<script setup lang="ts">
    definePageMeta({
        layout: "customer",
    });

    import { MinusIcon, PlusIcon, TrashIcon } from "@heroicons/vue/24/outline";

    const { cart, removeItem, setQuantity, totalPrice } = useCart();

    const error = ref("");

    const formatMoney = (value: number) => {
        return new Intl.NumberFormat("en-PH", {
            style: "currency",
            currency: "PHP",
        }).format(value || 0);
    };

    const proceed = async () => {
        error.value = "";
        if (!cart.value.length) {
            error.value = "Your cart is empty. Add at least one product to continue.";
            return;
        }
        await navigateTo("/customer/checkout");
    };
</script>

<template>
  <div class="space-y-6">
    <div
      class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
    >
      <div>
        <h1 class="text-2xl font-bold tracking-tight text-gray-900">Cart</h1>
        <p class="mt-1 text-sm text-gray-600">
          Review items, update quantities, or remove products.
        </p>
      </div>

      <NuxtLink
        to="/customer/shop"
        class="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Continue Shopping
      </NuxtLink>
    </div>

    <Alert v-if="error" variant="error" :message="error" />

    <div
      v-if="!cart.length"
      class="rounded-xl border border-gray-200 bg-white p-6"
    >
      <p class="text-sm font-medium text-gray-900">
        Your cart is currently empty.
      </p>
      <p class="mt-1 text-sm text-gray-600">
        Head to the shop to add products.
      </p>
      <NuxtLink
        to="/customer/shop"
        class="mt-4 inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Browse Products
      </NuxtLink>
    </div>

    <div v-else class="grid gap-6 lg:grid-cols-3">
      <div class="space-y-4 lg:col-span-2">
        <div
          class="hidden grid-cols-12 gap-4 px-2 text-xs font-semibold text-gray-500 md:grid"
        >
          <div class="col-span-6">Product</div>
          <div class="col-span-3">Quantity</div>
          <div class="col-span-3 text-right">Price</div>
        </div>

        <div
          v-for="item in cart"
          :key="item.uuid"
          class="rounded-xl border border-gray-200 bg-white p-5"
        >
          <div class="grid gap-4 md:grid-cols-12 md:items-center">
            <div class="md:col-span-6">
              <div class="flex items-center gap-4">
                <div
                  class="h-14 w-14 overflow-hidden rounded-lg bg-gray-100 ring-1 ring-inset ring-gray-200"
                >
                  <img
                    v-if="item.imageUrl"
                    :src="item.imageUrl"
                    :alt="item.name"
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
                    {{ item.name }}
                  </p>
                  <p class="mt-1 text-xs text-gray-600">
                    {{ formatMoney(item.price) }} each
                  </p>
                </div>
              </div>
            </div>

            <div class="md:col-span-3">
              <div
                class="inline-flex items-center rounded-lg border border-gray-200 bg-gray-50 p-1"
              >
                <button
                  type="button"
                  class="inline-flex h-9 w-9 items-center justify-center rounded-md text-gray-700 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50"
                  :disabled="item.quantity <= 1"
                  @click="setQuantity(item.uuid, item.quantity - 1)"
                >
                  <span class="sr-only">Decrease quantity</span>
                  <MinusIcon class="h-4 w-4" />
                </button>

                <div
                  class="min-w-10 px-3 text-center text-sm font-semibold text-gray-900"
                >
                  {{ item.quantity }}
                </div>

                <button
                  type="button"
                  class="inline-flex h-9 w-9 items-center justify-center rounded-md text-gray-700 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50"
                  :disabled="item.quantity >= 999"
                  @click="setQuantity(item.uuid, item.quantity + 1)"
                >
                  <span class="sr-only">Increase quantity</span>
                  <PlusIcon class="h-4 w-4" />
                </button>
              </div>
            </div>

            <div
              class="flex items-center justify-between gap-4 md:col-span-3 md:justify-end"
            >
              <div class="text-sm font-semibold text-gray-900">
                {{ formatMoney(item.price * item.quantity) }}
              </div>

              <button
                type="button"
                class="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-red-600 transition hover:bg-red-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                @click="removeItem(item.uuid)"
              >
                <span class="sr-only">Remove item</span>
                <TrashIcon class="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <div class="rounded-xl border border-gray-200 bg-white p-5">
          <div class="flex items-center justify-between">
            <p class="text-sm font-medium text-gray-600">Subtotal</p>
            <p class="text-base font-semibold text-gray-900">
              {{ formatMoney(totalPrice) }}
            </p>
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <div
          class="rounded-xl border border-gray-200 bg-white p-5 lg:sticky lg:top-6"
        >
          <p class="text-sm font-semibold text-gray-900">Order Summary</p>

          <div class="mt-4 flex items-center justify-between">
            <p class="text-sm text-gray-600">Total</p>
            <p class="text-base font-semibold text-gray-900">
              {{ formatMoney(totalPrice) }}
            </p>
          </div>

          <button
            type="button"
            class="mt-4 w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            @click="proceed"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>