<template>
  <teleport to="body">
    <transition name="fade">
      <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/30 backdrop-blur-sm" @click="$emit('close')" />
        
        <div class="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
          <div class="flex items-center gap-4 text-red-600">
            <div class="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
              <TrashIcon class="h-6 w-6" />
            </div>
            <h2 class="text-lg font-semibold">{{ title }}</h2>
          </div>

          <p class="mt-4 text-sm text-gray-600">{{ message }}</p>

          <div class="mt-6 flex justify-end gap-3">
            <button 
              type="button" 
              class="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100" 
              @click="$emit('close')"
            >
              Cancel
            </button>
            <button 
              type="button" 
              :disabled="loading"
              class="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50" 
              @click="$emit('confirm')"
            >
              {{ loading ? 'Deleting...' : 'Delete' }}
            </button>
          </div>
        </div>
      </div>
    </transition>
  </teleport>

</template>

<script setup lang="ts">
import { TrashIcon } from '@heroicons/vue/24/outline';
defineProps<{ open: boolean; loading: boolean; title: string; message: string }>();
defineEmits(['close', 'confirm']);
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>