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
          class="absolute inset-0 bg-black/30"
          @click="$emit('close')"
        />

        <div
          class="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
        >
          <div v-if="type === 'success'" class="mb-4 flex items-center gap-3">
            <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100">
              <svg class="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <h2 class="text-lg font-semibold text-gray-900">{{ title || 'Success' }}</h2>
            <button
              type="button"
              class="ml-auto rounded-md p-2 text-gray-400 transition hover:text-gray-600"
              @click="$emit('close')"
            >✕</button>
          </div>

          <div v-else-if="type === 'danger'" class="mb-4 flex items-center gap-3">
            <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100">
              <svg class="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
            <h2 class="text-lg font-semibold text-gray-900">{{ title || 'Confirm' }}</h2>
            <button
              type="button"
              class="ml-auto rounded-md p-2 text-gray-400 transition hover:text-gray-600"
              @click="$emit('close')"
            >✕</button>
          </div>

          <div v-else class="flex items-start justify-between gap-4">
            <div>
              <h2 class="text-lg font-semibold text-gray-900">{{ title || 'Feedback' }}</h2>
            </div>
            <button
              type="button"
              class="rounded-md p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
              @click="$emit('close')"
            >✕</button>
          </div>

          <p class="mt-1 text-sm text-gray-600">{{ message }}</p>

          <div class="mt-6 flex justify-end gap-3">
            <button
              v-if="showCancel"
              type="button"
              class="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              @click="$emit('close')"
            >
              {{ cancelText || 'Cancel' }}
            </button>
            <button
              type="button"
              class="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium text-white transition"
              :class="danger
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-indigo-600 hover:bg-indigo-700'"
              @click="showCancel ? $emit('confirm') : $emit('close')"
            >
              {{ confirmText || (showCancel ? 'Confirm' : 'Okay') }}
            </button>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
defineProps<{
  open: boolean
  message: string
  title?: string
  showCancel?: boolean
  confirmText?: string
  cancelText?: string
  /** 'success' | 'danger' | 'default' – controls the icon shown at top */
  type?: 'success' | 'danger' | 'default'
  /** When true, the confirm button uses red/destructive styling */
  danger?: boolean
}>()

defineEmits<{
  (e: 'close'): void
  (e: 'confirm'): void
}>()
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