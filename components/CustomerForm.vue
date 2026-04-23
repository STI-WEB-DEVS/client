<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <div>
      <label class="block text-sm font-medium text-gray-700">Name</label>
      <input
        v-model="formData.name"
        type="text"
        required
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
    </div>
    
    <div>
      <label class="block text-sm font-medium text-gray-700">Email</label>
      <input
        v-model="formData.email"
        type="email"
        required
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
    </div>

    <div class="flex justify-end gap-3">
      <button type="button" @click="$emit('cancel')" class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
        Cancel
      </button>
      <button type="submit" :disabled="loading" class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:opacity-50">
        {{ loading ? 'Saving...' : (isEdit ? 'Update' : 'Create') }}
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  initialData?: { name: string; email: string }
  isEdit?: boolean
}>()

const emit = defineEmits(['submit', 'cancel'])

const loading = ref(false)
const formData = ref({
  name: props.initialData?.name || '',
  email: props.initialData?.email || ''
})

watch(() => props.initialData, (newData) => {
  if (newData) {
    formData.value = { ...newData }
  }
}, { deep: true })

const handleSubmit = async () => {
  loading.value = true
  try {
    await emit('submit', formData.value)
  } finally {
    loading.value = false
  }
}
</script>