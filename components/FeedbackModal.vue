<template>
  <teleport to="body">
    <transition name="fade">
      <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/30" @click="$emit('close')" />
        <div class="relative z-10 max-w-md rounded bg-white p-6">
          <h2 class="text-lg font-semibold">Feedback</h2>
          <p class="mt-2 text-sm">{{ message }}</p>
          <button @click="$emit('close')" class="mt-4 px-4 py-2 bg-gray-900 text-white">Okay</button>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
defineProps<{ open: boolean; message: string }>()
defineEmits<{ (e: 'close'): void }>()
</script>
