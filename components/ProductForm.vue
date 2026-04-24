<template>
  <form @submit.prevent="submit">
    <input
      v-model="localProduct.name"
      type="text"
      placeholder="Name"
      class="w-full mb-3 border rounded px-3 py-2"
    />
    <input
      v-model="localProduct.price"
      type="number"
      step="0.01"
      placeholder="Price"
      class="price-input w-full mb-3 border rounded px-3 py-2"
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
import { reactive, watch } from 'vue'

const props = defineProps<{
  product?: any
  submitLabel: string
}>()

const emit = defineEmits(['submit', 'cancel'])

const localProduct = reactive({ name: '', price: 0, uuid: '' })

watch(
  () => props.product,
  (p) => {
    if (p) Object.assign(localProduct, p)
  },
  { immediate: true }
)

const submit = () => {
  emit('submit', { ...localProduct })
}
</script>

<style scoped>
.price-input::-webkit-outer-spin-button,
.price-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.price-input[type='number'] {
  appearance: textfield;
  -moz-appearance: textfield;
}
</style>
