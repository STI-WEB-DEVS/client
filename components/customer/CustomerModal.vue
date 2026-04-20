<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import FeedbackModal from '~/components/FeedbackModal.vue'
import { customerService } from '~/api/customer/CustomerService'

const props = defineProps<{ 
  open: boolean; 
  mode: 'create' | 'edit' | 'delete';
  uuid?: string;
  customerName?: string;
}>()

const emit = defineEmits(['close', 'success'])

const form = ref({ name: '', email: '' })
const loading = ref(false)

// Dynamic UI Config based on the mode
const config = computed(() => ({
  title: props.mode === 'delete' ? 'Delete Customer' : (props.mode === 'edit' ? 'Edit Customer' : 'Create Customer'),
  variant: (props.mode === 'delete' ? 'danger' : 'default') as 'danger' | 'default',
  submitLabel: props.mode === 'delete' ? 'Delete' : (props.mode === 'edit' ? 'Save Changes' : 'Create Customer')
}))

// Load data when opening Edit mode
watch(() => props.open, async (isOpen) => {
  if (isOpen && props.mode === 'edit' && props.uuid) {
    try {
      const res = await customerService.show(props.uuid)
      const data = res.data ?? res
      form.value = { name: data.name, email: data.email }
    } catch (err) {
      console.error("Failed to fetch customer:", err)
    }
  } else if (!isOpen) {
    form.value = { name: '', email: '' } // Clear form on close
  }
})

const handleSubmit = async () => {
  loading.value = true
  try {
    if (props.mode === 'create') await customerService.create(form.value)
    else if (props.mode === 'edit') await customerService.update(props.uuid!, form.value)
    else if (props.mode === 'delete') await customerService.delete(props.uuid!)
    
    emit('success')
    emit('close')
  } catch (err) {
    console.error("Operation failed:", err)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <FeedbackModal 
    :open="open" 
    :title="config.title" 
    :variant="config.variant" 
    hide-footer
    @close="emit('close')"
  >
    <div v-if="mode === 'delete'">
      <p class="text-sm text-gray-600">
        Are you sure you want to delete <span class="font-medium text-gray-900">"{{ customerName }}"</span>? 
        This action cannot be undone.
      </p>
    </div>

    <form v-else id="customer-form" @submit.prevent="handleSubmit" class="space-y-5">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
        <input 
          v-model="form.name" 
          type="text" 
          required 
          placeholder="e.g. John Doe"
          class="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition" 
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Email *</label>
        <input 
          v-model="form.email" 
          type="email" 
          required 
          placeholder="john@example.com"
          class="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition" 
        />
      </div>
    </form>

    <div class="mt-8 flex justify-end gap-3">
      <button 
        type="button" 
        @click="emit('close')" 
        class="px-5 py-2.5 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
      >
        Cancel
      </button>
      
      <button 
        v-if="mode === 'delete'"
        type="button"
        @click="handleSubmit"
        :disabled="loading"
        class="px-6 py-2.5 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 disabled:opacity-50 transition"
      >
        {{ loading ? 'Deleting...' : 'Delete' }}
      </button>

      <button 
        v-else
        form="customer-form"
        type="submit"
        :disabled="loading"
        class="px-6 py-2.5 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 disabled:opacity-50 transition"
      >
        {{ loading ? 'Saving...' : config.submitLabel }}
      </button>
    </div>
  </FeedbackModal>
</template>