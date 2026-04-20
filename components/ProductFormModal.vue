<template>
  <teleport to="body">
    <transition name="fade">
      <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/30 backdrop-blur-sm" @click="$emit('close')" />

        <div class="relative z-10 w-full max-w-lg overflow-hidden rounded-3xl bg-white p-6 shadow-2xl">
          <div class="mb-6 flex items-start justify-between gap-4">
            <div>
              <h2 class="text-xl font-semibold text-gray-900">{{ title }}</h2>
              <p class="mt-2 text-sm text-gray-500">Use this form to {{ title.toLowerCase() }} and save changes.</p>
            </div>
            <button type="button" class="rounded-full p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600" @click="$emit('close')">
              <span class="sr-only">Close modal</span>
              ✕
            </button>
          </div>

          <form @submit.prevent="handleSubmit" class="space-y-4">
            <div>
              <label for="product-name" class="block text-sm font-medium text-gray-700">Name</label>
              <input
                id="product-name"
                v-model="form.name"
                type="text"
                autocomplete="name"
                class="mt-2 block w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                placeholder="Product name"
              />
            </div>

            <div>
              <label for="product-price" class="block text-sm font-medium text-gray-700">Price</label>
              <input
                id="product-price"
                v-model.number="form.price"
                type="number"
                step="0.01"
                min="0"
                class="mt-2 block w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                placeholder="0.00"
              />
            </div>

            <p v-if="error" class="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{{ error }}</p>

            <div class="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                class="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                @click="$emit('close')"
                :disabled="submitting"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400"
                :disabled="submitting"
              >
                {{ submitLabel }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { watch, reactive } from 'vue';

const props = defineProps<{
  open: boolean;
  title: string;
  initialData: { name: string; description: string; price: number };
  submitLabel: string;
  submitting?: boolean;
  error?: string;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'submit', payload: { name: string; description: string; price: number }): void;
}>();

const form = reactive({
  name: '',
  description: '',
  price: 0,
});

watch(
  () => props.initialData,
  (next) => {
    form.name = next.name ?? '';
    form.description = next.description ?? '';
    form.price = next.price ?? 0;
  },
  { immediate: true }
);

const handleSubmit = () => {
  emit('submit', {
    name: form.name.trim(),
    description: form.description.trim(),
    price: form.price,
  });
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>