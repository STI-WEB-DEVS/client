<template>
  <teleport to="body">
    <transition name="fade">
      <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center p-4">

        <div class="absolute inset-0 bg-black/30 backdrop-blur-sm" @click="emit('close')" />

        <div class="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">

          <h2 class="text-lg font-semibold text-red-600">Delete Customer</h2>

          <p class="mt-3 text-sm text-gray-600">
            Are you sure you want to delete
            <span class="font-medium">"{{ customerName }}"</span>?
          </p>

          <div class="mt-8 flex justify-end gap-3">
            <button
              @click="emit('close')"
              class="px-5 py-2.5 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              @click="handleDelete"
              :disabled="loading"
              class="px-5 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
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
import { ref } from 'vue'
import { customerService } from '~/api/customer/CustomerService'

const props = defineProps<{ open: boolean; customerName: string; uuid: string }>()
const emit = defineEmits<{ (e: 'close'): void; (e: 'deleted'): void }>()

const loading = ref(false)

const handleDelete = async () => {
  loading.value = true
  try {
    await customerService.delete(props.uuid)
    emit('deleted')
    emit('close')
  } finally {
    loading.value = false
  }
}
</script>