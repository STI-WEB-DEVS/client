<template>
  <div v-if="open" class="fixed inset-0 flex items-center justify-center bg-black/50">
    <div class="bg-white rounded-lg p-6 w-full max-w-md">
      <h2 class="text-lg font-semibold mb-4">Create Customer</h2>
      <CustomerForm submitLabel="Create" @submit="submit" @cancel="$emit('close')" />
    </div>
  </div>
</template>

<script setup lang="ts">
import CustomerForm from '~/components/CustomerForm.vue'
import { customerService } from '~/api/customer/CustomerService'

const props = defineProps<{ open: boolean }>()
const emit = defineEmits(['close', 'created'])

const submit = async (payload: any) => {
  await customerService.create(payload)
  emit('created')
  emit('close')
}
</script>
