<template>
  <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    <div
      v-for="p in products"
      :key="p.uuid"
      class="group overflow-hidden rounded-xl border border-gray-200 bg-white transition hover:shadow-md hover:border-gray-300"
    >
      <!-- Image -->
      <div class="p-4 pb-0">
        <div class="aspect-[4/3] overflow-hidden rounded-lg bg-gray-100 ring-1 ring-gray-200">
          <img
            v-if="p.imageUrl"
            :src="p.imageUrl"
            :alt="p.name"
            class="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
            loading="lazy"
          />
          <div v-else class="h-full w-full bg-gray-200"></div>
        </div>
      </div>

      <div class="p-4 space-y-4">
        <div class="flex items-start justify-between gap-3">
          <h3 class="text-base font-semibold text-gray-900 leading-snug line-clamp-2">
            {{ p.name }}
          </h3>
          <span class="shrink-0 rounded-lg bg-gradient-to-r from-gray-50 to-white px-3 py-1 text-sm font-bold text-gray-900 ring-1 ring-gray-200 shadow-sm">
            {{ formatMoney(p.price) }}
          </span>
        </div>

        <!-- ACTIONS -->
        <div class="space-y-2 pt-2">
          <button
            type="button"
            class="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500"
            @click="$emit('buyNow', p)"
          >
            <ShoppingCartIcon class="h-4 w-4" />
            Buy Now
          </button>

          <div class="grid grid-cols-2 gap-2">

            <NuxtLink
              :to="`/customer/product/${p.uuid}`"
              class="flex items-center justify-center rounded-lg border border-gray-300 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              View
            </NuxtLink>

            <button
              type="button"
              class="flex items-center justify-center gap-2 rounded-lg border border-gray-300 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
              @click="$emit('add', p)"
            >
              <PlusIcon class="h-4 w-4" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
    import type { Product } from "~/composables/useCart";
    import { PlusIcon, ShoppingCartIcon } from "@heroicons/vue/24/outline";

    defineProps<{ products: Product[] }>();

    defineEmits<{
        (e: "add", product: Product): void;
        (e: "buyNow", product: Product): void;
    }>();

    const formatMoney = (value: number) => {
        return new Intl.NumberFormat("en-PH", {
            style: "currency",
            currency: "PHP",
        }).format(value || 0);
    };
</script>