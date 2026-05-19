<script setup lang="ts">
    definePageMeta({
        layout: "customer",
    });

    import { ArrowTurnUpLeftIcon, MinusIcon, PlusIcon } from "@heroicons/vue/24/outline";
    import { orderService } from "~/api/Order/OrderService";

    const { cart, setQuantity, totalPrice, clear } = useCart();

    const alert = ref<{
        variant: "success" | "error" | "info";
        message: string;
    } | null>(null);

    const readCustomerUuid = () => {
        if (!import.meta.client) return "";
        return (localStorage.getItem("customer_uuid") || "").trim();
    };

    const buildPayload = () => {
        const customerUuid = readCustomerUuid();
        if (!customerUuid) {
            throw new Error("Missing customer UUID. Please log in again.");
        }

        if (!cart.value.length) {
            throw new Error("Your cart is empty. Add products before placing an order.");
        }

        return {
            customer_uuid: customerUuid,
            items: cart.value.map((i) => ({
            product_uuid: i.uuid,
            quantity: i.quantity,
            })),
        };
    };

    const placeOrder = async () => {
        alert.value = null;

        try {
            const payload = buildPayload();
            const response = await orderService.create(payload);

            alert.value = {
                variant: "success",
                message: "Order successfully placed! Your order has been received.",
            };

            // Clear cart after successful order
            clear();

            setTimeout(() => {
                navigateTo("/customer/landingpage");
            }, 2000);
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
    <div class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
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
        class="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
      >
        <ArrowTurnUpLeftIcon class="h-4 w-4" />
        Back to Cart
      </NuxtLink>
    </div>

    <Alert v-if="alert" :variant="alert.variant" :message="alert.message" />

    <div class="grid gap-6 lg:grid-cols-3">
      <div class="space-y-4">
        <div class="rounded-xl border bg-white p-6 lg:sticky lg:top-6">
          <h2 class="text-lg font-semibold text-gray-900">Order Summary</h2>

          <div v-if="!cart.length" class="mt-4 rounded-lg border bg-gray-50 p-4">
            <p class="text-sm text-gray-600">Your cart is empty.</p>
          </div>

          <div v-else class="mt-4 space-y-4">
            <div
              v-for="i in cart"
              :key="i.uuid"
              class="flex items-center justify-between gap-4"
            >

              <!-- product info -->
              <div class="flex min-w-0 items-center gap-3">
                <div class="h-12 w-12 rounded-lg bg-gray-100 overflow-hidden">
                  <img
                    v-if="i.imageUrl"
                    :src="i.imageUrl"
                    class="h-full w-full object-cover"
                  />
                </div>

                <div class="min-w-0">
                  <p class="truncate text-sm font-semibold text-gray-900">
                    {{ i.name }}
                  </p>

                  <div class="mt-1 inline-flex items-center gap-2">
                    <button
                      type="button"
                      class="rounded-md border px-2 py-1 text-xs hover:bg-gray-50"
                      :disabled="i.quantity <= 1"
                      @click="setQuantity(i.uuid, i.quantity - 1)"
                    >
                      <MinusIcon class="h-3 w-3" />
                    </button>

                    <span class="text-xs font-semibold text-gray-700">
                      {{ i.quantity }}
                    </span>

                    <button
                      type="button"
                      class="rounded-md border px-2 py-1 text-xs hover:bg-gray-50"
                      @click="setQuantity(i.uuid, i.quantity + 1)"
                    >
                      <PlusIcon class="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
              <!-- price -->
              <p class="text-sm font-semibold text-gray-900">
                {{ formatMoney(i.price * i.quantity) }}
              </p>
            </div>
          </div>

          <div class="mt-4 border-t pt-4">
            <div class="flex items-center justify-between">
              <p class="text-sm text-gray-600">Subtotal</p>
              <p class="text-sm font-semibold text-gray-900">
                {{ formatMoney(totalPrice) }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="lg:col-span-2">
        <div class="rounded-xl border bg-white p-6">
          <h2 class="text-base font-semibold text-gray-900">Details</h2>
          <p class="mt-1 text-sm text-gray-600">
            This will only generate the JSON payload and log it to the console.
          </p>

          <div class="mt-6 border-t pt-6">
            <p class="text-xs font-semibold uppercase text-gray-500">
              Total amount
            </p>

            <div class="mt-2 flex items-end justify-between">
              <p class="text-3xl font-bold text-gray-900">
                {{ formatMoney(totalPrice) }}
              </p>

              <button
                type="button"
                class="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-500"
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