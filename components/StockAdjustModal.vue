<template>
  <teleport to="body">
    <transition name="fade">
      <div
        v-if="open"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
      >
        <div class="absolute inset-0 bg-black/30 backdrop-blur-sm" @click="$emit('close')" />

        <div class="relative z-10 w-full max-w-md rounded-2xl bg-white shadow-2xl">
          <!-- Header -->
          <div class="flex items-center justify-between border-b border-gray-200 px-6 py-4">
            <div>
              <h2 class="text-lg font-semibold text-gray-900">Adjust Stock</h2>
              <p v-if="product" class="mt-0.5 text-sm text-gray-500">{{ product.name }}</p>
            </div>
            <button
              type="button"
              class="rounded-md p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
              @click="$emit('close')"
            >✕</button>
          </div>

          <!-- Current stock summary -->
          <div class="px-6 pt-5">
            <div class="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 flex items-center justify-between">
              <span class="text-sm text-gray-600">Current Stock</span>
              <div class="flex items-center gap-2">
                <StockBadge :quantity="product?.stock_quantity ?? 0" />
              </div>
            </div>
          </div>

          <!-- Form -->
          <form @submit.prevent="handleSubmit" class="px-6 py-5 space-y-4">
            <!-- Mode toggle -->
            <div class="space-y-1">
              <label class="text-sm font-medium text-gray-700">Adjustment Type</label>
              <div class="flex gap-2">
                <button
                  v-for="opt in modes"
                  :key="opt.value"
                  type="button"
                  @click="mode = opt.value"
                  :class="[
                    'flex-1 rounded-lg border px-3 py-2 text-sm font-medium transition',
                    mode === opt.value
                      ? opt.activeClass
                      : 'border-gray-200 text-gray-600 hover:bg-gray-50',
                  ]"
                >
                  {{ opt.label }}
                </button>
              </div>
            </div>

            <!-- Quantity input -->
            <div class="space-y-1">
              <label for="adjust-qty" class="text-sm font-medium text-gray-700">Quantity</label>
              <input
                id="adjust-qty"
                v-model.number="quantity"
                type="number"
                min="1"
                required
                class="block w-full rounded-lg border border-gray-300 px-4 py-2 text-sm shadow-sm transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                placeholder="e.g. 10"
              />
            </div>

            <!-- Preview -->
            <div
              v-if="quantity > 0"
              class="rounded-lg border px-4 py-2.5 text-sm"
              :class="previewStock < 0 ? 'border-red-100 bg-red-50 text-red-700' : 'border-blue-100 bg-blue-50 text-blue-700'"
            >
              New stock will be
              <span class="font-semibold">{{ Math.max(previewStock, 0) }}</span>
              <span v-if="previewStock < 0" class="ml-1 font-medium">(insufficient stock!)</span>
            </div>

            <!-- Footer -->
            <div class="flex justify-end gap-3 pt-4 border-t border-gray-100">
              <button
                type="button"
                class="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                @click="$emit('close')"
              >
                Cancel
              </button>
              <button
                type="submit"
                :disabled="loading || (mode === 'deduct' && previewStock < 0)"
                class="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800 disabled:opacity-50"
              >
                <span v-if="loading" class="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></span>
                <span>Apply</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { productsService } from '~/api/product/ProductsService';
import StockBadge from '~/components/StockBadge.vue';

const props = defineProps<{
  open: boolean;
  product: any;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'success', message: string): void;
  (e: 'error', message: string): void;
}>();

const mode = ref<'add' | 'deduct' | 'set'>('add');
const quantity = ref<number>(1);
const loading = ref(false);

const modes: { value: 'add' | 'deduct' | 'set'; label: string; activeClass: string }[] = [
  { value: 'add',    label: '+ Restock',   activeClass: 'border-green-400 bg-green-50 text-green-700' },
  { value: 'deduct', label: '− Deduct',    activeClass: 'border-red-400 bg-red-50 text-red-700' },
  { value: 'set',    label: '= Set Exact', activeClass: 'border-blue-400 bg-blue-50 text-blue-700' },
];

watch(() => props.open, (val) => {
  if (val) {
    mode.value = 'add';
    quantity.value = 1;
  }
});

const previewStock = computed(() => {
  const current = props.product?.stock_quantity ?? 0;
  if (mode.value === 'add')    return current + (quantity.value || 0);
  if (mode.value === 'deduct') return current - (quantity.value || 0);
  return quantity.value || 0; // set
});

const handleSubmit = async () => {
  if (!props.product) return;
  loading.value = true;
  try {
    if (mode.value === 'set') {
      await productsService.update(props.product.uuid, { stock_quantity: quantity.value });
    } else {
      const adjustment = mode.value === 'add' ? quantity.value : -quantity.value;
      await productsService.adjustStock(props.product.uuid, adjustment);
    }
    emit('success', 'Stock updated successfully!');
    emit('close');
  } catch (err: any) {
    emit('error', err.message || 'Failed to update stock');
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>