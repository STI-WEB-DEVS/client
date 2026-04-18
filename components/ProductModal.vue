<template>
  <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
    <div class="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
      <h2 class="text-lg font-semibold text-gray-900">
        {{ isEditMode ? 'Edit Product' : 'Create New Product' }}
      </h2>
      <p class="mb-6 text-sm text-gray-500">
        {{ isEditMode ? 'Update the product details below.' : 'Fill in the information to add a new product.' }}
      </p>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Product Name</label>
          <input
            v-model="form.name"
            type="text"
            required
            placeholder="e.g. Wireless Mouse"
            class="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Price</label>
          <div class="relative mt-1">
            <span class="absolute left-3 top-2 text-gray-500 text-sm">$</span>
            <input
              v-model.number="form.price"
              type="number"
              step="0.01"
              required
              placeholder="0.00"
              class="block w-full rounded-lg border border-gray-300 pl-7 pr-3 py-2 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
            />
          </div>
        </div>

        <div class="mt-6 flex justify-end gap-3">
          <button
            type="button"
            @click="$emit('close')"
            class="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            :disabled="loading"
            class="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800 disabled:opacity-50"
          >
            <span v-if="loading">Saving...</span>
            <span v-else>{{ isEditMode ? 'Update Product' : 'Save Product' }}</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';

const props = defineProps<{
  open: boolean;
  loading: boolean;
  product: any | null; // Null means Create mode, object means Edit mode
}>();

const emit = defineEmits(['close', 'submit']);

const form = ref({
  name: '',
  price: null as number | null
});

const isEditMode = computed(() => !!props.product);

// Sync form when product prop changes
watch(() => props.product, (newVal) => {
  if (newVal) {
    form.value = { 
      name: newVal.name, 
      price: newVal.price 
    };
  } else {
    form.value = { name: '', price: null };
  }
}, { immediate: true });

const handleSubmit = () => {
  emit('submit', { ...form.value });
};
</script>