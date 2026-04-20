<template>
  <Dialog :open="open" @close="onClose" class="relative z-50">
    <div class="fixed inset-0 bg-black/30" aria-hidden="true"></div>
    <div class="fixed inset-0 flex items-center justify-center p-4">
      <DialogPanel class="mx-auto max-w-sm rounded bg-white p-6 shadow">
        <DialogTitle class="text-lg font-medium text-gray-900">{{ title }}</DialogTitle>
        <form @submit.prevent="submit">
          <div class="mt-4">
            <label class="block text-sm font-medium text-gray-700">Name</label>
            <input v-model="name" type="text" class="mt-1 w-full rounded border px-3 py-2" required />
          </div>
          <div class="mt-4">
            <label class="block text-sm font-medium text-gray-700">Price</label>
            <input v-model="price" type="number" step="0.01" class="mt-1 w-full rounded border px-3 py-2" required />
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
import { productService } from '~/api/product/ProductService'

const props = defineProps<{ open: boolean; product?: { uuid: string; name: string; price: string } | null }>()
const emit = defineEmits(['close', 'saved'])

const name = ref('')
const price = ref('')

const title = computed(() => (props.product ? 'Edit Product' : 'Create Product'))
const submitLabel = computed(() => (props.product ? 'Update' : 'Save'))

watch(
  () => props.open,
  (open) => {
    if (open && props.product) {
      name.value = props.product.name ?? ''
      price.value = props.product.price ?? ''
    }
    if (!open) {
      name.value = ''
      price.value = ''
    }
  },
  { immediate: true }
)

const onClose = () => emit('close')

const submit = async () => {
  try {
    if (props.product?.uuid) {
      // Only send changed fields
      const payload: any = {}
      if (name.value !== props.product.name) payload.name = name.value
      if (price.value !== props.product.price) payload.price = price.value
      await productService.update(props.product.uuid, payload)
    } else {
      await productService.create({ name: name.value, price: price.value })
    }
    emit('saved')
    onClose()
  } catch (err: any) {
    alert(err?.message || 'Unable to save product.')
  }
}
</script>
