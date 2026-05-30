<template>
  <div
    v-if="modelValue"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
  >
    <div class="w-full max-w-lg rounded-2xl bg-white shadow-xl">
      <div class="flex items-center justify-between border-b px-6 py-4">
        <h3 class="text-lg font-bold text-gray-900">Buy Now</h3>

        <button
          @click="$emit('close')"
          class="text-2xl text-gray-400 hover:text-gray-600"
        >
          ×
        </button>
      </div>

      <div class="space-y-6 p-6">
        <div class="flex items-center gap-4 rounded-xl bg-gray-50 p-4">
          <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100 font-bold text-indigo-600">
            {{ product?.name?.charAt(0) }}
          </div>

          <div>
            <h4 class="font-semibold text-gray-900">
              {{ product?.name }}
            </h4>

            <p class="font-bold text-indigo-600">
              ₱{{ Number(product?.price || 0).toLocaleString() }}
            </p>

            <p
              class="text-sm font-medium"
              :class="(product?.quantity ?? 0) > 0 ? 'text-green-600' : 'text-red-500'"
            >
              {{ (product?.quantity ?? 0) > 0 ? product.quantity + ' in stock' : 'Out of stock' }}
            </p>
          </div>
        </div>

        <div>
          <label class="text-sm font-semibold text-gray-700">
            Quantity
          </label>

          <div class="mt-3 flex items-center gap-6">
            <button
              @click="decrease"
              class="h-10 w-10 rounded-lg border text-xl"
            >
              −
            </button>

            <span class="text-lg font-bold">
              {{ qty }}
            </span>

            <button
              @click="increase"
              class="h-10 w-10 rounded-lg border text-xl"
            >
              +
            </button>
          </div>
        </div>

        <div class="flex justify-between rounded-xl bg-indigo-50 px-4 py-4">
          <span class="font-semibold text-indigo-700">Total:</span>

          <span class="text-lg font-bold text-indigo-700">
            ₱{{ total }}
          </span>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <button
            @click="$emit('close')"
            class="rounded-lg border px-4 py-3 text-sm font-semibold"
          >
            Cancel
          </button>

          <button
            @click="confirm"
            class="rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';

const props = defineProps({
  modelValue: Boolean,
  product: Object,
});

const emit = defineEmits(['close', 'confirm']);

const qty = ref(1);

watch(() => props.modelValue, (val) => {
  if (val) qty.value = 1;
});

const increase = () => {
  if (qty.value < (props.product?.quantity ?? 0)) qty.value++;
};
const decrease = () => {
  if (qty.value > 1) qty.value--;
};

const total = computed(() => {
  return (props.product?.price || 0) * qty.value;
});

const confirm = () => {
  emit('confirm', qty.value);
};
</script>