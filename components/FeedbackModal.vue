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
            <div class="flex items-start gap-3">
              <!-- Success icon -->
              <div v-if="type === 'success'" class="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100">
                <svg class="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <!-- Error icon -->
              <div v-else-if="type === 'error'" class="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-100">
                <svg class="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <!-- Info icon -->
              <div v-else class="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100">
                <svg class="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                </svg>
              </div>
              <div>
                <h2 class="text-lg font-semibold" :class="{
                  'text-green-800': type === 'success',
                  'text-red-800': type === 'error',
                  'text-gray-900': type === 'info' || !type
                }">
                  {{ type === 'success' ? 'Success' : type === 'error' ? 'Error' : 'Feedback' }}
                </h2>
                <p class="mt-2 text-sm text-gray-600">
                  {{ message }}
                </p>
              </div>
            </div>

            <button
              type="button"
              class="rounded-md p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
              @click="$emit('close')"
            >
              ✕
            </button>
          </div>

          <div class="mt-6 flex justify-end">
            <button
              type="button"
              :class="[
                type === 'success' ? 'bg-green-600 hover:bg-green-700' :
                type === 'error' ? 'bg-red-600 hover:bg-red-700' :
                'bg-gray-900 hover:bg-gray-800',
                'inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium text-white transition'
              ]"
              @click="$emit('close')"
            >
              Okay
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
  type?: 'success' | 'error' | 'info'
}>()

defineEmits<{
  (e: 'close'): void
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