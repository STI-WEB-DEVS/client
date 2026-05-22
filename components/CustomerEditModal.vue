<template>
  <div v-if="open" class="fixed inset-0 flex items-center justify-center bg-black/50">
    <div class="bg-white rounded-lg p-6 w-full max-w-md">
      <h2 class="text-lg font-semibold mb-4">Edit Customer</h2>
      <CustomerForm :customer="customer" submitLabel="Save" @submit="submit" @cancel="$emit('close')" />
    </div>
  </div>
</template>

<script setup lang="ts">
import CustomerForm from '~/components/CustomerForm.vue'
import { customerService } from '~/api/customer/CustomerService'

const props = defineProps<{ open: boolean; customer: any }>()
const emit = defineEmits(['close', 'updated'])

const submit = async (payload: any) => {
  await customerService.update(payload.uuid, payload)
  emit('updated')
  emit('close')
}
</script>
