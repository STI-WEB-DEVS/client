<template>
  <teleport to="body">
    <transition name="modal">
      <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto">
        <!-- Backdrop -->
        <div 
          class="fixed inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity" 
          @click="$emit('close')"
        />
        
        <!-- Modal Content -->
        <div class="relative z-10 w-full max-w-sm transform overflow-hidden rounded-3xl bg-white p-8 text-left align-middle shadow-2xl transition-all">
          <div class="flex flex-col items-center text-center">
            <!-- Icon -->
            <div class="flex h-16 w-16 items-center justify-center rounded-full bg-green-50 mb-6">
              <div class="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
                <CheckCircleIcon class="h-8 w-8" />
              </div>
            </div>

            <h3 class="text-xl font-bold leading-6 text-gray-900 mb-2">
              All set!
            </h3>
            
            <p class="text-sm text-gray-500 mb-8">
              {{ message }}
            </p>

            <button
              type="button"
              @click="$emit('close')"
              class="inline-flex w-full justify-center rounded-2xl bg-gray-900 px-6 py-4 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 transition-all active:scale-[0.98]"
            >
              Great, thanks!
            </button>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { CheckCircleIcon } from '@heroicons/vue/24/outline'

defineProps<{ 
  open: boolean; 
  message: string 
}>()

defineEmits<{ 
  (e: 'close'): void 
}>()
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
