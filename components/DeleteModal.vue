<template>
  <BaseModal :open="open" @close="$emit('close')">
    <h2 class="text-lg font-semibold text-gray-900">Confirm Delete</h2>

    <p class="mt-2 text-sm text-gray-600">
      {{ message }}
    </p>

    <div class="mt-6 flex justify-end gap-2">
      <button class="bg-gray-200 px-4 py-2 rounded-lg" @click="$emit('close')">
        Cancel
      </button>

      <button class="bg-red-600 text-white px-4 py-2 rounded-lg" @click="$emit('confirm')">
        Delete
      </button>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import BaseModal from './BaseModal.vue'

defineProps<{
  open: boolean
  message: string
}>()

defineEmits<{
  (e: 'close'): void
  (e: 'confirm'): void
}>()
</script>