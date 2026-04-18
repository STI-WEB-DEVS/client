<template>
  <teleport to="body">
    <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center">

      <div class="absolute inset-0 bg-black/30" @click="$emit('close')" />

      <div class="relative z-10 w-full max-w-md bg-white p-6 rounded-2xl">

        <h2 class="text-lg font-semibold text-red-600">
          Delete Customer
        </h2>

        <p class="mt-2 text-sm text-gray-600">
          Are you sure you want to delete <b>{{ customer?.name }}</b>?
        </p>

        <div class="mt-6 flex justify-end gap-2">
          <button class="border px-4 py-2 rounded" @click="$emit('close')">
            Cancel
          </button>

          <button
            class="bg-red-600 text-white px-4 py-2 rounded"
            @click="$emit('confirm')"
          >
            Delete
          </button>
        </div>

      </div>

    </div>
  </teleport>
</template>

<script setup lang="ts">
defineProps<{
  open: boolean
  customer: any
}>()

defineEmits(['close', 'confirm'])
</script>