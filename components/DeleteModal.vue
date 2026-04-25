<template>
  <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <div class="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg space-y-4">

      <!-- Title -->
      <div class="flex justify-between items-center">
        <h2 class="text-lg font-semibold text-gray-900">
          Confirm Delete
        </h2>
        <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700">
          ✕
        </button>
      </div>

      <!-- Message -->
      <p class="text-sm text-gray-600">
        Are you sure you want to delete <span class="font-medium text-gray-900">{{ title }}</span>?
      </p>

      <!-- Actions -->
      <div class="flex justify-end gap-2 pt-2">
        <button
          type="button"
          @click="$emit('close')"
          class="rounded-lg border border-gray-300 px-4 py-2 text-sm"
        >
          Cancel
        </button>

        <button
          type="button"
          :disabled="loading"
          @click="$emit('confirm')"
          class="rounded-lg bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700 disabled:opacity-50"
        >
          {{ loading ? 'Deleting...' : 'Delete' }}
        </button>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  open: Boolean,
  loading: Boolean,
  title: {
    type: String,
    default: ''
  }
})

defineEmits(['close', 'confirm'])
</script>