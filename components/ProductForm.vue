<template>
  <div class="space-y-4">
    <div class="space-y-1">
      <label
        class="text-xs font-semibold uppercase tracking-wider text-gray-500"
        >Product Name</label
      >
      <input
        v-model="name"
        type="text"
        class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
        placeholder="Product Name"
        :disabled="disabled"
      />
    </div>
    <div class="space-y-1">
      <label
        class="text-xs font-semibold uppercase tracking-wider text-gray-500"
        >Price</label
      >
      <div class="relative">
        <span class="absolute left-3 top-2 text-sm text-gray-500">$</span>
        <input
          v-model="price"
          type="number"
          step="0.01"
          class="w-full rounded-lg border border-gray-200 py-2 pl-7 pr-3 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
          placeholder="0.00"
          :disabled="disabled"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface ProductForm {
  name: string;
  price: string | number;
}

const props = defineProps<{
  modelValue: ProductForm;
  disabled?: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: ProductForm): void;
}>();

const name = computed({
  get: () => props.modelValue.name,
  set: (val) => emit("update:modelValue", { ...props.modelValue, name: val }),
});

const price = computed({
  get: () => props.modelValue.price,
  set: (val) => emit("update:modelValue", { ...props.modelValue, price: val }),
});
</script>
