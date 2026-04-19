<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  open: boolean
  entityType: 'Customer' | 'Product'
  service: any
}>()

const emit = defineEmits(['close', 'success'])

const form = ref({ name: '', email: '', price: 0 })
const loading = ref(false)

async function handleSave() {
  loading.value = true
  try {
    const payload = props.entityType === 'Customer' 
      ? { name: form.value.name, email: form.value.email }
      : { name: form.value.name, price: form.value.price };
    
    await props.service.create(payload)
    emit('success', `${props.entityType} created successfully!`)
    form.value = { name: '', email: '', price: 0 } // Reset
  } catch (e) {
    alert("Error saving entity")
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
    <div class="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
      <h2 class="text-xl font-bold mb-4">Create New {{ entityType }}</h2>
      
      <div class="space-y-4">
        <input v-model="form.name" placeholder="Name" class="w-full border p-2 rounded" />
        
        <input v-if="entityType === 'Customer'" v-model="form.email" placeholder="Email" class="w-full border p-2 rounded" />
        <input v-if="entityType === 'Product'" v-model="form.price" type="number" placeholder="Price" class="w-full border p-2 rounded" />
      </div>

      <div class="mt-6 flex justify-end gap-3">
        <button @click="$emit('close')" class="px-4 py-2 text-gray-600">Cancel</button>
        <button @click="handleSave" :disabled="loading" class="bg-gray-900 text-white px-4 py-2 rounded">
          {{ loading ? 'Saving...' : 'Save' }}
        </button>
      </div>
    </div>
  </div>
</template>