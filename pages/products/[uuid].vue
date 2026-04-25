<template>
  <NuxtLayout>
    <div class="space-y-6">
      <div>
        <h1 class="text-xl font-semibold tracking-tight text-gray-900">
          View Product
        </h1>
        <p class="mt-1 text-sm text-gray-500">
          Product details from the database.
        </p>
      </div>

      <!-- Loading -->
      <div v-if="pending" class="flex justify-center py-16">
        <div
          class="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900"
        ></div>
      </div>

      <!-- Error -->
      <div
        v-else-if="error"
        class="rounded-xl border border-red-200 bg-red-50 p-4"
      >
        <p class="text-sm text-red-700">Failed to load product.</p>
      </div>

      <!-- Product Details -->
      <div
        v-else
        class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm space-y-4"
      >
        <div>
          <p class="text-sm text-gray-500">ID</p>
          <p class="mt-1 text-base font-medium text-gray-900">
            {{ product?.id }}
          </p>
        </div>

        <div>
          <p class="text-sm text-gray-500">UUID</p>
          <p class="mt-1 break-all text-base font-medium text-gray-900">
            {{ product?.uuid }}
          </p>
        </div>

        <div>
          <p class="text-sm text-gray-500">Name</p>
          <p class="mt-1 text-base font-medium text-gray-900">
            {{ product?.name }}
          </p>
        </div>

        <div>
          <p class="text-sm text-gray-500">Price</p>
          <p class="mt-1 text-base font-medium text-gray-900">
            {{ product?.price }}
          </p>
        </div>

        <div>
          <p class="text-sm text-gray-500">Created At</p>
          <p class="mt-1 text-base font-medium text-gray-900">
            {{ product?.created_at }}
          </p>
        </div>

        <div>
          <p class="text-sm text-gray-500">Updated At</p>
          <p class="mt-1 text-base font-medium text-gray-900">
            {{ product?.updated_at }}
          </p>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { productService } from "~/api/product/ProductService";

const route = useRoute();
const uuid = String(route.params.uuid ?? "");

const product = ref<any>(null);
const pending = ref(true);
const error = ref<any>(null);

onMounted(async () => {
  try {
    const response = await productService.show(uuid);
    product.value = response?.data ?? response;
  } catch (err: any) {
    error.value = err;
    console.error("Failed to fetch product:", err);
  } finally {
    pending.value = false;
  }
});
</script>