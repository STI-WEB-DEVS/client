<template>
  <BaseModal :open="open" @close="$emit('close')">
    <div class="flex items-start justify-between">
      <h2 class="text-lg font-semibold text-gray-900">
        {{ isEdit ? 'Edit Customer' : 'Create Customer' }}
      </h2>

      <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600">
        ✕
      </button>
    </div>

    <div class="mt-4 space-y-3">
      <input
        v-model="form.name"
        type="text"
        placeholder="Name"
        class="w-full rounded-lg border p-2"
      />

      <input
        v-model="form.email"
        type="email"
        placeholder="Email"
        class="w-full rounded-lg border p-2"
      />
    </div>

    <div class="mt-6 flex justify-end gap-2">
      <button
        class="rounded-lg bg-gray-200 px-4 py-2"
        @click="$emit('close')"
      >
        Cancel
      </button>

      <button
        class="rounded-lg bg-gray-900 px-4 py-2 text-white"
        @click="$emit('save', form)"
      >
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
  customer?: any
}>()

defineEmits<{
  (e: 'close'): void
  (e: 'save', payload: any): void
}>()

const isEdit = !!props.customer

const form = reactive({
  name: '',
  email: ''
})

watch(
  () => props.customer,
  (val) => {
    if (val) {
      form.name = val.name
      form.email = val.email
    } else {
      form.name = ''
      form.email = ''
    }
  },
  { immediate: true }
)
</script>