<template>
  <div class="space-y-4">
    <div class="space-y-1">
      <label
        class="text-xs font-semibold uppercase tracking-wider text-gray-500"
        >Name</label
      >
      <input
        v-model="name"
        type="text"
        class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
        placeholder="Full Name"
        :disabled="disabled"
      />
    </div>
    <div class="space-y-1">
      <label
        class="text-xs font-semibold uppercase tracking-wider text-gray-500"
        >Email</label
      >
      <input
        v-model="email"
        type="email"
        class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
        placeholder="email@example.com"
        :disabled="disabled"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface CustomerForm {
  name: string;
  email: string;
}

const props = defineProps<{
  modelValue: CustomerForm;
  disabled?: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: CustomerForm): void;
}>();

const name = computed({
  get: () => props.modelValue.name,
  set: (val) => emit("update:modelValue", { ...props.modelValue, name: val }),
});

const email = computed({
  get: () => props.modelValue.email,
  set: (val) => emit("update:modelValue", { ...props.modelValue, email: val }),
});
</script>
