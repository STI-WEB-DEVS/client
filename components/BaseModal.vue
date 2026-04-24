<template>
  <teleport to="body">
    <transition name="fade">
      <div
        v-if="open"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
      >
        <div
          class="absolute inset-0 bg-black/30 backdrop-blur-sm"
          @click="$emit('close')"
        />

        <div
          class="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
        >
          <div class="flex items-start justify-between gap-4">
            <div class="flex-1">
              <slot name="header">
                <h2 v-if="title" class="text-lg font-semibold text-gray-900">
                  {{ title }}
                </h2>
              </slot>
              <div class="mt-2 text-sm text-gray-600">
                <slot />
              </div>
            </div>

            <button
              v-if="!loading"
              type="button"
              class="rounded-md p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
              @click="$emit('close')"
            >
              ✕
            </button>
          </div>

          <div class="mt-6 flex justify-end gap-3">
            <slot name="footer">
              <button
                v-if="cancelText"
                type="button"
                :disabled="loading"
                class="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 disabled:opacity-50"
                @click="$emit('close')"
              >
                {{ cancelText }}
              </button>

              <button
                v-if="confirmText"
                type="button"
                :disabled="loading"
                class="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition focus:outline-none focus:ring-2 disabled:opacity-50"
                :class="[
                  variant === 'danger'
                    ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
                    : 'bg-gray-900 hover:bg-gray-800 focus:ring-gray-900'
                ]"
                @click="$emit('confirm')"
              >
                <div
                  v-if="loading"
                  class="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
                ></div>
                <span>{{ confirmText }}</span>
              </button>
            </slot>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
defineProps<{
  open: boolean;
  title?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "primary" | "danger";
  loading?: boolean;
}>();

defineEmits<{
  (e: "close"): void;
  (e: "confirm"): void;
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
