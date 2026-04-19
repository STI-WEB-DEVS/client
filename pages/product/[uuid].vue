<template>
  <NuxtLayout>
    <div class="space-y-6">
      <div>
        <h1 class="text-xl font-semibold tracking-tight text-gray-900">
          View Product
        </h1>
        <p class="mt-1 text-sm text-gray-500">
          Dedicated product page using the UUID from the route.
        </p>
      </div>

      <div v-if="pending" class="flex justify-center py-16">
        <div
          class="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900"
        ></div>
      </div>

      <div
        v-else-if="product"
        class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm space-y-4"
      >
        <div>
          <p class="text-sm text-gray-500">Name</p>
          <p class="mt-2 text-base font-medium text-gray-900">
            {{ product.name }}
          </p>
        </div>
        <div>
          <p class="text-sm text-gray-500">Price</p>
          <p class="mt-2 text-base font-medium text-gray-900">
            {{ parseFloat(product.price).toFixed(2) }}
          </p>
        </div>
        <div>
          <p class="text-sm text-gray-500">UUID</p>
          <p class="mt-2 break-all text-base font-medium text-gray-900">
            {{ product.uuid }}
          </p>
        </div>
      </div>
    </div>

    <FeedbackModal
      :open="isFeedbackModalOpen"
      :message="feedbackMessage"
      @close="closeFeedbackModal"
    />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { productService } from "~/api/product/ProductService";
import FeedbackModal from "~/components/FeedbackModal.vue";

const route = useRoute();

const uuid = computed(() => String(route.params.uuid ?? ""));
const product = ref<any>(null);
const pending = ref(true);
const error = ref<any>(null);

const isFeedbackModalOpen = ref(false);
const feedbackMessage = ref("");

const openFeedbackModal = (message: string) => {
  feedbackMessage.value = message;
  isFeedbackModalOpen.value = true;
};

const closeFeedbackModal = () => {
  isFeedbackModalOpen.value = false;
  feedbackMessage.value = "";
};

onMounted(async () => {
  pending.value = true;
  error.value = null;

  try {
    const response = await productService.show(uuid.value);
    product.value = response.data;
  } catch (err: any) {
    error.value = err;
    openFeedbackModal("Product not found");
  } finally {
    pending.value = false;
  }
});
</script>
