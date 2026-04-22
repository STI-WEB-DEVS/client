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
          class="relative z-10 w-full max-w-sm rounded-2xl bg-white p-8 shadow-2xl text-center"
        >
          <div class="flex flex-col items-center">
            <div
              class="mb-4 flex h-16 w-16 items-center justify-center rounded-full"
              :class="[
                type === 'success' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
              ]"
            >
              <CheckCircleIcon v-if="type === 'success'" class="h-10 w-10" />
              <XCircleIcon v-else class="h-10 w-10" />
            </div>

            <h2 class="text-xl font-bold text-gray-900">
              {{ title || (type === 'success' ? 'Success!' : 'Error') }}
            </h2>
            
            <p class="mt-3 text-sm text-gray-600 leading-relaxed">
              {{ message }}
            </p>

            <button
              type="button"
              class="mt-8 w-full rounded-xl py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2"
              :class="[
                type === 'success' 
                  ? 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500' 
                  : 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500'
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
import { CheckCircleIcon, XCircleIcon } from "@heroicons/vue/24/outline";

defineProps<{
  open: boolean;
  type: "success" | "error";
  title?: string;
  message: string;
}>();

defineEmits<{
  (e: "close"): void;
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