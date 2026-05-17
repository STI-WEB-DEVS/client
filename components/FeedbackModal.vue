<template>
  <teleport to="body">
    <transition name="modal">
      <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto p-4">
        <!-- Backdrop -->
        <div 
          class="fixed inset-0 bg-stone-950/40 backdrop-blur-sm transition-opacity" 
          @click="$emit('close')"
        />
        
        <!-- Modal Content -->
        <div class="relative z-10 w-full max-w-sm transform overflow-hidden rounded-[1.5rem] border border-stone-200 bg-white p-8 text-left align-middle shadow-2xl shadow-stone-950/20 transition-all">
          <div class="flex flex-col items-center text-center">
            <!-- Icon -->
            <div class="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
              <div class="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <CheckCircleIcon class="h-8 w-8" />
              </div>
            </div>

            <h3 class="mb-2 text-xl font-bold leading-6 text-stone-950">
              All set!
            </h3>
            
            <p class="mb-8 text-sm leading-6 text-stone-500">
              {{ message }}
            </p>

            <button
              type="button"
              @click="$emit('close')"
              class="inline-flex w-full justify-center rounded-full bg-stone-950 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-stone-950/10 transition-all hover:-translate-y-0.5 hover:bg-stone-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2 active:scale-[0.98]"
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
