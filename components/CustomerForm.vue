<template>
  <form @submit.prevent="handleSubmit">
    <div class="space-y-4">
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
        <input
          id="name"
          v-model="form.name"
          type="text"
          class="mt-1 block w-full h-12 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
        <input
          id="email"
          v-model="form.email"
          type="email"
          class="mt-1 block w-full h-12 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>
      <div class="flex justify-between">
        <button
          type="button"
          @click="emit('cancel')"
          class="px-4 py-2 text-sm text-gray-500 border border-gray-300 rounded hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          :disabled="loading"
          class="px-4 py-2 text-sm font-bold bg-gray-900 text-white rounded hover:bg-gray-800 disabled:opacity-50"
        >
          {{ mode === 'create' ? 'Create Customer' : 'Update Customer' }}
        </button>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { customerService } from '~/api/customer/CustomerService'

const props = defineProps<{
  mode: 'create' | 'update'
  customer?: any
}>()

const emit = defineEmits<{
  submitted: [data: {success: boolean, message: string, item?: any, action: string}],
  cancel: []
}>()

const loading = ref(false)
const form = reactive({
  name: '',
  email: ''
})

watch(() => props.customer, (newCustomer) => {
  if (newCustomer && props.mode === 'update') {
    form.name = newCustomer.name || ''
    form.email = newCustomer.email || ''
  }
}, { immediate: true })

const handleSubmit = async () => {
  loading.value = true
  try {
    if (props.mode === 'create') {
      try {
        const response = await customerService.create({ name: form.name, email: form.email })
        emit('submitted', { success: true, message: 'Customer created successfully.', item: response.data, action: 'create' })
        // Reset form
        form.name = ''
        form.email = ''
      } catch (error: any) {
        emit('submitted', { success: false, message: `Error: ${error.message}`, action: 'create' })
      }
    } else if (props.customer) {
      try {
        const response = await customerService.update(props.customer.uuid, form)
        emit('submitted', { success: true, message: 'Customer updated successfully.', item: response.data, action: 'update' })
      } catch (error: any) {
        emit('submitted', { success: false, message: `Error: ${error.message}`, item: props.customer, action: 'update' })
      }
    }
  } catch (error: any) {
    emit('submitted', { success: false, message: `Error: ${error.message}`, action: props.mode })
  } finally {
    loading.value = false
  }
}
</script>