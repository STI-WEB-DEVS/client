<template>
  <form @submit.prevent="submit">
    <input
      v-model="localCustomer.name"
      type="text"
      placeholder="Name"
      class="w-full mb-3 border rounded px-3 py-2"
    />
    <input
      v-model="localCustomer.email"
      type="email"
      placeholder="Email"
      class="w-full mb-3 border rounded px-3 py-2"
    />
    <div class="flex justify-end gap-2">
      <button type="button" @click="$emit('cancel')" class="px-4 py-2 border rounded">Cancel</button>
      <button type="submit" class="px-4 py-2 bg-indigo-600 text-white rounded">
        {{ submitLabel }}
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'

const props = defineProps<{
  customer?: any
  submitLabel: string
}>()

const emit = defineEmits(['submit', 'cancel'])

const localCustomer = reactive({ name: '', email: '', uuid: '' })

watch(
  () => props.customer,
  (c) => {
    if (c) Object.assign(localCustomer, c)
  },
  { immediate: true }
)

const submit = () => {
  emit('submit', { ...localCustomer })
}
</script>
