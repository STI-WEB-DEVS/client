<template>
  <teleport to="body">
    <transition name="fade">
      <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/30 backdrop-blur-sm" @click="$emit('close')" />

        <div class="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
          <div class="flex items-start justify-between gap-4">
            <div>
              <h2 class="text-lg font-semibold text-gray-900">{{ title }}</h2>
              <p class="mt-2 text-sm text-gray-600">{{ message }}</p>
            </div>
            <button type="button" @click="$emit('close')" class="text-gray-400 hover:text-gray-600">✕</button>
          </div>

          <div class="mt-6 flex justify-end gap-3">
            <button 
              v-if="title === 'Confirmation'"
              type="button" 
              class="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg" 
              @click="$emit('close')"
            >
              Cancel
            </button>
            
            <button
              type="button"
              class="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium text-white transition"
              :class="title === 'Success' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-red-600 hover:bg-red-700'"
              @click="$emit('confirm')"
            >
              {{ confirmText }}
            </button>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  open: boolean
  message: string
  title?: string
  confirmText?: string
}>(), {
  title: 'Success',      // Default for Customer/Product actions
  confirmText: 'Close'   // Default button text
})

defineEmits(['close', 'confirm'])
</script>