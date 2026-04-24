<template>
  <NuxtLayout>
    <div class="space-y-6">
      <div class="flex items-center gap-4">
        <button
          @click="router.push('/product')"
          class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 transition hover:bg-gray-50 hover:text-gray-900"
        >
          <ArrowLeftIcon class="h-5 w-5" />
        </button>
        <div>
          <h1 class="text-xl font-semibold tracking-tight text-gray-900">
            View Product
          </h1>
          <p class="mt-1 text-sm text-gray-500">
            Details for product record {{ uuid }}
          </p>
        </div>
      </div>

      <div v-if="pending" class="flex justify-center py-16">
        <div
          class="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900"
        ></div>
      </div>

      <div
        v-else-if="error"
        class="rounded-xl border border-red-200 bg-red-50 p-4"
      >
        <p class="text-sm text-red-700">{{ error.message }}</p>
      </div>

      <div v-else-if="product" class="grid gap-6 lg:grid-cols-3">
        <div
          class="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm lg:col-span-2"
        >
          <div class="border-b border-gray-100 bg-gray-50/50 px-6 py-4">
            <h2
              class="text-sm font-semibold uppercase tracking-wider text-gray-500"
            >
              Product Information
            </h2>
          </div>
          <div class="divide-y divide-gray-100 px-6">
            <div class="py-4">
              <p
                class="text-xs font-medium uppercase tracking-wider text-gray-400"
              >
                Product Name
              </p>
              <p class="mt-1 text-base font-medium text-gray-900">
                {{ product.name }}
              </p>
            </div>
            <div class="py-4">
              <p
                class="text-xs font-medium uppercase tracking-wider text-gray-400"
              >
                Price
              </p>
              <p class="mt-1 text-xl font-bold text-gray-900">
                ${{ product.price }}
              </p>
            </div>
          </div>
        </div>

        <div
          class="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
        >
          <div class="border-b border-gray-100 bg-gray-50/50 px-6 py-4">
            <h2
              class="text-sm font-semibold uppercase tracking-wider text-gray-500"
            >
              System Details
            </h2>
          </div>
          <div class="space-y-4 px-6 py-4">
            <div>
              <p
                class="text-xs font-medium uppercase tracking-wider text-gray-400"
              >
                Internal ID
              </p>
              <p class="mt-1 text-sm font-medium text-gray-900">
                {{ product.id }}
              </p>
            </div>
            <div>
              <p
                class="text-xs font-medium uppercase tracking-wider text-gray-400"
              >
                Public UUID
              </p>
              <p class="mt-1 break-all font-mono text-xs text-gray-600">
                {{ product.uuid }}
              </p>
            </div>
            <div>
              <p
                class="text-xs font-medium uppercase tracking-wider text-gray-400"
              >
                Created At
              </p>
              <p class="mt-1 text-sm text-gray-700">
                {{ formatDate(product.created_at) }}
              </p>
            </div>
            <div>
              <p
                class="text-xs font-medium uppercase tracking-wider text-gray-400"
              >
                Last Updated
              </p>
              <p class="mt-1 text-sm text-gray-700">
                {{ formatDate(product.updated_at) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ArrowLeftIcon } from "@heroicons/vue/24/outline";
import { productService } from "~/api/product/ProductService";

const route = useRoute();
const router = useRouter();

const uuid = String(route.params.uuid ?? "");
const product = ref<any>(null);
const pending = ref(true);
const error = ref<any>(null);

const formatDate = (dateString: string) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleString();
};

onMounted(async () => {
  pending.value = true;
  error.value = null;
  try {
    const response = await productService.show(uuid);
    product.value = response.data;
  } catch (err: any) {
    error.value = err;
  } finally {
    pending.value = false;
  }
});
</script>
