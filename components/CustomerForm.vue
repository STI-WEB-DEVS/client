<template>
  <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    
    <div class="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg space-y-4">
      
      <!-- Title -->
      <div class="flex justify-between items-center">
        <h2 class="text-lg font-semibold text-gray-900">
          {{ customer ? 'Edit Customer' : 'Create Customer' }}
        </h2>
        <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700">
          ✕
        </button>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="space-y-4">
        
        <!-- Name -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Name</label>
          <input
            v-model="form.name"
            type="text"
            class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none"
            placeholder="Enter name"
          />
        </div>

        <!-- Email -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <input
            v-model="form.email"
            type="email"
            class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none"
            placeholder="Enter email"
          />
        </div>

        <!-- Buttons -->
        <div class="flex justify-end gap-2 pt-2">
          <button
            type="button"
            @click="$emit('close')"
            class="rounded-lg border border-gray-300 px-4 py-2 text-sm"
          >
            Cancel
          </button>

          <button
            type="submit"
            :disabled="loading"
            class="rounded-lg bg-gray-900 px-4 py-2 text-sm text-white hover:bg-gray-800 disabled:opacity-50"
          >
            {{ loading ? 'Saving...' : (customer ? 'Update' : 'Create') }}
          </button>
        </div>

      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps({
  open: Boolean,
  loading: Boolean,
  customer: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close', 'submit'])

const form = ref({
  name: '',
  email: ''
})

// Populate form if editing
watch(
  () => props.customer,
  (val) => {
    if (val) {
      form.value = {
        name: val.name || '',
        email: val.email || ''
      }
    } else {
      form.value = {
        name: '',
        email: ''
      }
    }
  },
  { immediate: true }
)

const handleSubmit = () => {
  if (!form.value.name || !form.value.email) {
    alert('Please fill in all fields')
    return
  }

  emit('submit', form.value)
}
</script>