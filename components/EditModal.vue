<script setup lang="ts">
const props = defineProps<{
  open: boolean
  entityType: 'Customer' | 'Product'
  entityData: any // The existing customer or product object
  service: any
}>()

const emit = defineEmits(['close', 'success'])
const form = ref({ ...props.entityData })

// Sync form if the data changes
watch(() => props.entityData, (newVal) => {
  form.value = { ...newVal }
}, { deep: true })

async function handleUpdate() {
  try {
    await props.service.update(props.entityData.uuid, form.value)
    emit('success', `${props.entityType} updated!`)
  } catch (e) { console.error(e) }
}
</script>

<template>
  <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
    <div class="w-full max-w-md rounded-xl bg-white p-6">
      <h2 class="text-xl font-bold mb-4">Edit {{ entityType }}</h2>
      <input v-model="form.name" class="w-full border p-2 mb-4 rounded" />
      
      <input v-if="entityType === 'Customer'" v-model="form.email" class="w-full border p-2 rounded" />
      <input v-if="entityType === 'Product'" v-model="form.price" type="number" class="w-full border p-2 rounded" />

      <div class="mt-6 flex justify-end gap-3">
        <button @click="$emit('close')">Cancel</button>
        <button @click="handleUpdate" class="bg-blue-600 text-white px-4 py-2 rounded">Update</button>
      </div>
    </div>
  </div>
</template>