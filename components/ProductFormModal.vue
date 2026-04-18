<template>
  <teleport to="body">
    <transition name="fade">
      <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/30 backdrop-blur-sm" @click="handleClose" />
        <div class="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
          <div class="flex items-start justify-between gap-4">
            <div>
              <h2 class="text-lg font-semibold text-gray-900">
                {{ product ? 'Edit Product' : 'Create Product' }}
              </h2>
            </div>
            <button @click="handleClose" type="button" class="rounded-md p-2 text-gray-400 hover:bg-gray-100">✕</button>
          </div>

          <form @submit.prevent="handleSubmit" class="mt-6 space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Product Name</label>
              <input v-model="form.name" type="text" required class="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:ring-1 focus:ring-gray-900 focus:outline-none" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Price</label>
              <input v-model="form.price" type="number" step="0.01" required class="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:ring-1 focus:ring-gray-900 focus:outline-none" />
            </div>

            <div class="mt-6 flex justify-end gap-3">
              <button @click="handleClose" type="button" class="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg">Cancel</button>
              <button :disabled="loading" type="submit" class="bg-gray-900 text-white px-4 py-2 text-sm font-medium rounded-lg hover:bg-gray-800 disabled:opacity-50">
                {{ loading ? 'Saving...' : 'Save Product' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { reactive, watch, nextTick } from 'vue';

const props = defineProps<{
  open: boolean;
  loading?: boolean;
  product?: { name: string; price: number | string } | null;
}>();

const emit = defineEmits(['close', 'submit']);
const form = reactive({ name: '', price: '' });

watch(() => props.open, async (isOpen) => {
  if (isOpen) {
    await nextTick();
    if (props.product) {
      form.name = props.product.name || '';
      form.price = props.product.price?.toString() || '';
    } else {
      form.name = '';
      form.price = '';
    }
  }
});

const handleClose = () => emit('close');
const handleSubmit = () => emit('submit', { ...form });
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>