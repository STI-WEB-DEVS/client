<script setup lang="ts">
const props = defineProps<{
  open: boolean
  entityName: string
  uuid: string
  service: any
}>()

const emit = defineEmits(['close', 'success'])

async function confirmDelete() {
  await props.service.delete(props.uuid)
  emit('success', 'Deleted successfully')
}
</script>

<template>
  <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
    <div class="bg-white p-6 rounded-xl max-w-sm w-full shadow-2xl">
      <h3 class="text-lg font-bold">Delete Confirmation</h3>
      <p class="text-gray-600 my-4">Are you sure you want to delete <strong>{{ entityName }}</strong>?</p>
      <div class="flex justify-end gap-2">
        <button @click="$emit('close')" class="px-4 py-2 border rounded">Cancel</button>
        <button @click="confirmDelete" class="bg-red-600 text-white px-4 py-2 rounded">Delete</button>
      </div>
    </div>
  </div>
</template>