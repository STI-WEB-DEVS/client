<script setup lang="ts">
    import type { Product } from "~/composables/useCart";
    import { ShoppingCartIcon, PlusIcon, ArrowTurnUpLeftIcon } from "@heroicons/vue/24/outline";
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

    const mockDef = computed(() => {
        return [
            { label: "Brand", value: "N/A" },
            { label: "Material", value: "N/A" },
            { label: "Unit", value: "N/A" },
            { label: "Size", value: "N/A" },
            { label: "Weight", value: "N/A" },
            { label: "Strength/Grade", value: "N/A" },
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

    const handleAdd = () => {
        alert.value = null;

        if (!product.value) {
            alert.value = { variant: "error", message: "Product not found." };
            return;
        }

        addItem(product.value, 1);
        alert.value = { variant: "success", message: "Added to cart." };
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
    <Alert v-if="alert" :variant="alert.variant" :message="alert.message" />
    <Alert v-if="error" variant="error" :message="error" />

    <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">
          {{ product?.name || "Product" }}
        </h1>
        <p class="mt-1 text-sm text-gray-600">
          Construction materials details
        </p>
      </div>

      <div class="flex items-center gap-3">
        <span class="rounded-lg bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-900">
          {{ formatMoney(product?.price || 0) }}
        </span>

        <NuxtLink
          to="/customer/shop"
          class="flex items-center gap-2 rounded-md border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
        >
          <ArrowTurnUpLeftIcon class="h-4 w-4" />
          Back
        </NuxtLink>
      </div>
    </div>

    <!-- LOADS -->
    <div v-if="pending && !product" class="rounded-xl border bg-white p-6">
      <p class="text-sm text-gray-600">Loading product...</p>
    </div>

    <!-- PRODUCT NOT FOUND -->
    <div v-else-if="!product" class="rounded-xl border bg-white p-6">
      <p class="text-sm font-medium text-gray-900">Product not found.</p>
      <p class="mt-1 text-sm text-gray-600">
        Please go back to shop and try again.
      </p>
    </div>

    <!-- CONTENT -->
    <div v-else class="space-y-6">
      <div class="grid gap-6 lg:grid-cols-2">
        <!-- IMAGE -->
        <div class="rounded-xl border bg-white p-4">
          <img
            v-if="product.imageUrl"
            :src="product.imageUrl"
            class="h-80 w-full rounded-lg object-cover"
            :alt="product.name"
          />
          <div v-else class="h-80 rounded-lg bg-gray-100"></div>
        </div>

        <!-- DETAILS -->
        <div class="rounded-xl border bg-white p-6 space-y-4">
          <div class="border-b border-gray-100 pb-3">
            <h2 class="text-sm font-bold text-gray-900">
              Product Details
            </h2>
          </div>

          <dl class="space-y-3 text-sm">
            <div
              v-for="s in mockDef"
              :key="s.label"
              class="flex justify-between"
            >
              <dt class="text-gray-600">{{ s.label }}</dt>
              <dd class="font-medium text-gray-900">{{ s.value }}</dd>
            </div>
          </dl>
        </div>
      </div>

      <div class="flex flex-col gap-3 sm:flex-row">
        <button
          class="flex flex-1 items-center justify-center gap-2 rounded-md border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
          @click="handleAdd"
        >
          <PlusIcon class="h-4 w-4" />
          Add to Cart
        </button>

        <button
          class="flex flex-1 items-center justify-center gap-2 rounded-md bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
          @click="handleBuyNow"
        >
          <ShoppingCartIcon class="h-4 w-4" />
          Buy Now
        </button>
      </div>
    </div>
  </div>
</template>