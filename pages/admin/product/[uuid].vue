<template>
  <div class="mx-auto max-w-2xl space-y-6">
    <div class="flex items-center gap-4">
      <button
        @click="router.push('/admin/product')"
        class="rounded-lg border border-gray-200 p-2 transition hover:bg-gray-50"
      >
        <ArrowLeftIcon class="h-5 w-5 text-gray-500" />
      </button>
      <div>
        <h1 class="text-xl font-semibold tracking-tight text-gray-900">
          Product Details
        </h1>
        <p class="mt-1 text-sm text-gray-500">
          Viewing product information.
        </p>
      </div>
    </div>

    <div v-if="loading" class="flex justify-center py-16">
      <div class="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900"></div>
    </div>

    <div v-else-if="product" class="space-y-4">
      <div class="rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div class="divide-y divide-gray-100">
          <div class="px-6 py-4">
            <p class="text-xs font-semibold uppercase tracking-wider text-gray-400">UUID</p>
            <p class="mt-1 text-sm font-mono text-gray-900 bg-gray-50 rounded-lg px-4 py-2">{{ product.uuid }}</p>
          </div>
          <div class="px-6 py-4">
            <p class="text-xs font-semibold uppercase tracking-wider text-gray-400">Product Name</p>
            <p class="mt-1 text-sm text-gray-900">{{ product.name }}</p>
          </div>
          <div class="px-6 py-4">
            <p class="text-xs font-semibold uppercase tracking-wider text-gray-400">Price</p>
            <p class="mt-1 text-sm text-gray-900">${{ product.price }}</p>
          </div>

          <!-- Stock -->
          <div class="px-6 py-4">
            <div class="flex items-center justify-between">
              <p class="text-xs font-semibold uppercase tracking-wider text-gray-400">Stock</p>
              <button
                type="button"
                @click="showStockModal = true"
                class="inline-flex items-center gap-1.5 rounded-md border border-blue-200 px-2.5 py-1 text-xs font-medium text-blue-600 hover:bg-blue-50 transition"
              >
                <ArchiveBoxIcon class="h-3.5 w-3.5" />
                Adjust
              </button>
            </div>
            <div class="mt-2 flex items-center gap-3">
              <StockBadge :quantity="product.stock_quantity" />
              <span class="text-sm text-gray-500"></span>
            </div>
          </div>

          <div v-if="product.created_at" class="px-6 py-4">
            <p class="text-xs font-semibold uppercase tracking-wider text-gray-400">Created At</p>
            <p class="mt-1 text-sm text-gray-900">{{ product.created_at }}</p>
          </div>
          <div v-if="product.updated_at" class="px-6 py-4">
            <p class="text-xs font-semibold uppercase tracking-wider text-gray-400">Updated At</p>
            <p class="mt-1 text-sm text-gray-900">{{ product.updated_at }}</p>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="rounded-xl border border-red-200 bg-red-50 p-4">
      <p class="text-sm text-red-700">Product not found.</p>
    </div>

    <!-- Stock Adjust Modal -->
    <StockAdjustModal
      :open="showStockModal"
      :product="product"
      @close="showStockModal = false"
      @success="onStockSuccess"
      @error="onStockError"
    />

    <!-- Feedback -->
    <FeedbackModal
      :open="isFeedbackOpen"
      :message="feedbackMessage"
      :type="feedbackType"
      @close="isFeedbackOpen = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ArrowLeftIcon, ArchiveBoxIcon } from '@heroicons/vue/24/outline';
import { productsService } from '~/api/product/ProductsService';
import StockBadge from '~/components/StockBadge.vue';
import StockAdjustModal from '~/components/StockAdjustModal.vue';
import FeedbackModal from '~/components/FeedbackModal.vue';

const route  = useRoute();
const router = useRouter();

const uuid = computed(() => String(route.params.uuid ?? ''));

const product = ref<any>(null);
const loading = ref(false);

const showStockModal  = ref(false);
const isFeedbackOpen  = ref(false);
const feedbackMessage = ref('');
const feedbackType    = ref<'success' | 'error' | 'info'>('info');

const fetchProduct = async () => {
  loading.value = true;
  try {
    const response = await productsService.show(uuid.value);
    product.value = response.data || response;
  } catch (err) {
    console.error('Failed to fetch product', err);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchProduct);

const onStockSuccess = async (msg: string) => {
  feedbackMessage.value = msg;
  feedbackType.value = 'success';
  isFeedbackOpen.value = true;
  await fetchProduct();
};

const onStockError = (msg: string) => {
  feedbackMessage.value = msg;
  feedbackType.value = 'error';
  isFeedbackOpen.value = true;
};
</script>