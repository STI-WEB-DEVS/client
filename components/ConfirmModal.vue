<template>
  <TransitionRoot as="template" :show="modelValue">
    <Dialog class="relative z-50" @close="onClose">
      <div class="fixed inset-0 bg-black/40" />

      <div class="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel class="mx-auto max-w-lg rounded-xl bg-white p-6 shadow-lg">
          <DialogTitle class="text-lg font-semibold">{{ title }}</DialogTitle>
          <div class="mt-4 text-sm text-slate-600">{{ message }}</div>

          <div class="mt-6 flex justify-end gap-3">
            <button @click="cancel" class="rounded-md border px-4 py-2">Cancel</button>
            <button @click="confirm" class="rounded-md bg-rose-600 px-4 py-2 text-white">Confirm</button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionRoot } from '@headlessui/vue'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  title: { type: String, default: 'Confirm' },
  message: { type: String, default: 'Are you sure?' },
})

const emit = defineEmits(['update:modelValue', 'confirm', 'cancel'])

const onClose = () => emit('update:modelValue', false)
const confirm = () => {
  emit('confirm')
  emit('update:modelValue', false)
}
const cancel = () => {
  emit('cancel')
  emit('update:modelValue', false)
}
</script>
