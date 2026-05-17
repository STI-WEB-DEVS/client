<template>
  <Dialog :open="open" @close="onClose" class="relative z-50">
    <div class="fixed inset-0 bg-stone-950/40 backdrop-blur-sm" aria-hidden="true"></div>
    <div class="fixed inset-0 flex items-center justify-center p-4">
      <DialogPanel class="mx-auto w-full max-w-sm rounded-[1.5rem] border border-stone-200 bg-white p-6 shadow-2xl shadow-stone-950/20">
        <DialogTitle class="text-lg font-bold text-stone-950">{{ title }}</DialogTitle>
        <form @submit.prevent="submit">
          <div class="mt-5">
            <label class="block text-sm font-semibold text-stone-700">Name</label>
            <input v-model="name" type="text" class="mt-2 w-full rounded-2xl border-0 bg-stone-50 px-4 py-3 text-sm text-stone-950 ring-1 ring-inset ring-stone-200 transition focus:bg-white focus:ring-2 focus:ring-amber-600" required />
          </div>
          <div class="mt-4">
            <label class="block text-sm font-semibold text-stone-700">Price</label>
            <input v-model="price" type="number" step="0.01" class="mt-2 w-full rounded-2xl border-0 bg-stone-50 px-4 py-3 text-sm text-stone-950 ring-1 ring-inset ring-stone-200 transition focus:bg-white focus:ring-2 focus:ring-amber-600" required />
          </div>
          <div class="mt-6 flex justify-end gap-2">
            <button type="button" @click="onClose" class="rounded-full px-4 py-2.5 text-sm font-semibold text-stone-600 transition hover:bg-stone-100 hover:text-stone-950">Cancel</button>
            <button type="submit" class="rounded-full bg-stone-950 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-stone-950/10 transition hover:-translate-y-0.5 hover:bg-stone-800">{{ submitLabel }}</button>
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
