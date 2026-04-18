<template>
  <teleport to="body">
    <transition name="fade">
      <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/30 backdrop-blur-sm" @click="$emit('close')" />

        <div class="relative z-10 w-full max-w-md overflow-hidden rounded-3xl bg-white p-6 shadow-2xl">
          <div class="mb-6 flex items-start justify-between gap-4">
            <div>
              <h2 class="text-xl font-semibold text-gray-900">{{ title }}</h2>
              <p class="mt-2 text-sm text-gray-500">{{ message }}</p>
            </div>
            <button type="button" class="rounded-full p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600" @click="$emit('close')">
              <span class="sr-only">Close modal</span>
              ✕
            </button>
          </div>

          <div class="space-y-4">
            <p class="rounded-2xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700">This action cannot be undone.</p>
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
                type="button"
                class="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-gray-400"
                @click="$emit('confirm')"
                :disabled="submitting"
              >
                {{ confirmLabel }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

defineProps<{
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  submitting?: boolean;
}>();

defineEmits<{
  (e: 'close'): void;
  (e: 'confirm'): void;
}>();
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
