<!-- CreateCustomerModal.vue -->
<template>
  <Dialog :open="open" @close="onClose" class="relative z-50">
    <div class="fixed inset-0 bg-black/30" aria-hidden="true"></div>
    <div class="fixed inset-0 flex items-center justify-center p-4">
      <DialogPanel class="mx-auto max-w-sm rounded bg-white p-6 shadow">
        <DialogTitle class="text-lg font-medium text-gray-900">
          {{ title }}
        </DialogTitle>

        <form @submit.prevent="submit">
          <div class="mt-4">
            <label class="block text-sm font-medium text-gray-700">Name</label>
            <input v-model="name" type="text" class="mt-1 w-full rounded border px-3 py-2" required />
          </div>

          <div class="mt-4">
            <label class="block text-sm font-medium text-gray-700">Email</label>
            <input v-model="email" type="email" class="mt-1 w-full rounded border px-3 py-2" required />
          </div>

          <div class="mt-6 flex justify-end gap-2">
            <button type="button" @click="onClose" class="px-4 py-2 text-sm text-gray-600">Cancel</button>
            <button type="submit" class="px-4 py-2 text-sm text-white bg-gray-900 rounded">{{ submitLabel }}</button>
          </div>
        </form>
      </DialogPanel>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'
import { customerService } from '~/api/customer/CustomerService'

const props = defineProps<{
  open: boolean
  customer?: { uuid: string; name: string; email: string } | null
}>()
const emit = defineEmits(['close', 'saved'])

const name = ref('')
const email = ref('')

const title = computed(() => (props.customer ? 'Edit Customer' : 'Create Customer'))
const submitLabel = computed(() => (props.customer ? 'Update' : 'Save'))

watch(
  () => props.open,
  (open) => {
    if (open && props.customer) {
      name.value = props.customer.name ?? ''
      email.value = props.customer.email ?? ''
    }

    if (!open) {
      name.value = ''
      email.value = ''
    }
  },
  { immediate: true }
)

const onClose = () => emit('close')

const submit = async () => {
  try {
    const payload = { name: name.value, email: email.value }

    if (props.customer?.uuid) {
      await customerService.update(props.customer.uuid, payload)
    } else {
      await customerService.create(payload)
    }

    emit('saved')
    onClose()
  } catch (err: any) {
    alert(err?.message || 'Unable to save customer.')
  }
}
</script>
