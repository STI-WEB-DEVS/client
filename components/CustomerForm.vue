<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <div>
      <label class="block text-sm font-medium">Name</label>
      <input v-model="form.name" type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
    </div>

    <div>
      <label class="block text-sm font-medium">Email</label>
      <input v-model="form.email" type="email" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
    </div>

    <button type="submit" class="px-4 py-2 bg-indigo-600 text-white rounded">
      {{ mode === 'create' ? 'Create Customer' : 'Update Customer' }}
    </button>

    <FeedbackModal :open="!!feedbackMessage" :message="feedbackMessage" @close="feedbackMessage = ''" />
  </form>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { customerService } from '~/api/customer/CustomerService'
import FeedbackModal from '~/components/FeedbackModal.vue'

const emit = defineEmits(['submitted'])

const props = defineProps({
  mode: { type: String, default: 'create' },
  uuid: { type: String, default: null },
  initialData: { type: Object, default: () => ({}) }
})

const form = ref({ name: '', email: '' })
const feedbackMessage = ref('')

watch(() => props.initialData, (newData) => {
  if (props.mode === 'update' && newData) {
    form.value = { ...newData }
  }
}, { immediate: true })

async function handleSubmit() {
  try {
    if (props.mode === 'create') {
      await customerService.create(form.value)
      feedbackMessage.value = 'Customer created successfully!'
      emit('submitted') // notify parent
      form.value = { name: '', email: '' }
    } else {
      await customerService.update(props.uuid, form.value)
      feedbackMessage.value = 'Customer updated successfully!'
      emit('submitted') // notify parent
    }
  } catch (err: any) {
    feedbackMessage.value = `Error: ${err.message}`
  }
}
</script>

</script>
