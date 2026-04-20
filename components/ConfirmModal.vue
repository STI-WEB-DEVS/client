<template>
  <teleport to="body">
    <transition name="fade">
      <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
        <div class="absolute inset-0 bg-black/30 backdrop-blur-sm" @click="$emit('close')" />
        <div class="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
          <div class="flex items-start justify-between gap-4">
            <div>
              <h2 class="text-lg font-semibold text-gray-900">{{ title }}</h2>
              <p class="mt-2 text-sm text-gray-600">{{ message }}</p>
            </div>
            <button @click="$emit('close')" class="rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600">✕</button>
          </div>
          <div class="mt-6 flex justify-end gap-3">
            <button @click="$emit('close')" class="rounded-lg bg-gray-100 px-4 py-2 text-sm text-gray-700">Cancel</button>
            <button @click="$emit('confirm')" class="rounded-lg bg-red-600 px-4 py-2 text-sm text-white">Confirm</button>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
defineProps<{ open: boolean; title: string; message: string }>()
defineEmits<{ (e: 'close'): void; (e: 'confirm'): void }>()
</script>
