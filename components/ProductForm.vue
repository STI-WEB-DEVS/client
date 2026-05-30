<template>
  <form @submit.prevent="submit">
    <p v-if="formError" class="text-sm text-red-600 mb-2">{{ formError }}</p>

    <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
    <input
      v-model="localProduct.name"
      type="text"
      placeholder="Product name"
      class="w-full mb-3 border rounded px-3 py-2"
    />

    <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
    <textarea
      v-model="localProduct.description"
      placeholder="Product description"
      rows="3"
      class="w-full mb-3 border rounded px-3 py-2"
    ></textarea>

    <label class="block text-sm font-medium text-gray-700 mb-1">Price</label>
    <input
      v-model="localProduct.price"
      type="number"
      step="0.01"
      placeholder="Price"
      class="w-full mb-3 border rounded px-3 py-2"
    />

    <label class="block text-sm font-medium text-gray-700 mb-1">
      {{ isEdit ? 'Add to Stock' : 'Quantity' }}
    </label>
    <input
      v-model.number="quantityValue"
      type="number"
      min="0"
      :placeholder="isEdit ? 'How many to add' : 'Stock quantity'"
      class="w-full mb-3 border rounded px-3 py-2"
    />

    <div class="flex justify-end gap-2">
      <button
        type="button"
        @click="$emit('cancel')"
        class="px-4 py-2 border rounded"
      >
        Cancel
      </button>
      <button
        type="submit"
        class="px-4 py-2 bg-indigo-600 text-white rounded"
      >
        {{ submitLabel }}
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue'

const props = defineProps<{
  product?: any
  submitLabel: string
  isEdit?: boolean
}>()

const emit = defineEmits(['submit', 'cancel'])

const localProduct = reactive({ name: '', description: '', price: 0, uuid: '' })
const quantityValue = ref(0)
const formError = ref('')

watch(
  () => props.product,
  (p) => {
    if (p) {
      Object.assign(localProduct, {
        name: p.name || '',
        description: p.description || '',
        price: p.price || 0,
        uuid: p.uuid || '',
      })
    }
    quantityValue.value = 0
    formError.value = ''
  },
  { immediate: true }
)

const submit = () => {
  formError.value = ''

  if (/^\d+$/.test(localProduct.name.trim())) {
    formError.value = 'Product name cannot be numbers only.'
    return
  }

  const payload: any = { ...localProduct }
  if (props.isEdit) {
    payload.add_quantity = quantityValue.value
  } else {
    payload.quantity = quantityValue.value
  }
  emit('submit', payload)
}
</script>
