<template>
  <div v-if="open" class="fixed inset-0 flex items-center justify-center bg-black/50">
    <div class="bg-white rounded-lg p-6 w-full max-w-md">
      <h2 class="text-lg font-semibold mb-4">Delete Customer</h2>
      <p>Are you sure you want to delete <strong>{{ customer?.name }}</strong>?</p>

      <div class="flex justify-end gap-2 mt-6">
        <button
          type="button"
          @click="$emit('close')"
          class="px-4 py-2 border rounded"
        >
          Cancel
        </button>
        <button
          type="button"
          @click="submit"
          class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { customerService } from '~/api/customer/CustomerService'

const props = defineProps<{ open: boolean; customer: any }>()
const emit = defineEmits(['close', 'deleted'])

const submit = async () => {
  if (!props.customer?.uuid) return
  await customerService.delete(props.customer.uuid)
  emit('deleted')
  emit('close')
}
</script>
