<template>
  <BaseModal :open="open" @close="$emit('close')">
    <div class="flex items-start justify-between">
      <h2 class="text-lg font-semibold text-gray-900">
        {{ isEdit ? 'Edit Product' : 'Create Product' }}
      </h2>

      <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600">
        ✕
      </button>
    </div>

    <div class="mt-4 space-y-3">
      <input v-model="form.name" placeholder="Product Name" class="w-full border p-2 rounded-lg" />
      <input v-model="form.price" placeholder="Price" class="w-full border p-2 rounded-lg" />
    </div>

    <div class="mt-6 flex justify-end gap-2">
      <button class="bg-gray-200 px-4 py-2 rounded-lg" @click="$emit('close')">
        Cancel
      </button>

      <button class="bg-gray-900 text-white px-4 py-2 rounded-lg" @click="$emit('save', form)">
        Save
      </button>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'
import BaseModal from './BaseModal.vue'

const props = defineProps<{
  open: boolean
  mode: 'create' | 'edit'
  product?: any
}>()

defineEmits<{
  (e: 'close'): void
  (e: 'save', payload: any): void
}>()

const isEdit = !!props.product

const form = reactive({
  name: '',
  price: ''
})

watch(
  () => props.product,
  (val) => {
    if (val) {
      form.name = val.name
      form.price = val.price
    } else {
      form.name = ''
      form.price = ''
    }
  },
  { immediate: true }
)
</script>