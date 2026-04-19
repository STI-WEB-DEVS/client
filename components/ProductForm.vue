<template>
  <form @submit.prevent="handleSubmit">
    <div class="space-y-4">
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
        <input
          id="name"
          v-model="form.name"
          type="text"
          class="mt-1 block w-full h-12 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>
      <div>
        <label for="price" class="block text-sm font-medium text-gray-700">Price</label>
        <input
          id="price"
          v-model.number="form.price"
          type="number"
          step="0.01"
          class="mt-1 block w-full h-12 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div class="flex justify-between">
        <button
          type="button"
          @click="emit('cancel')"
          class="px-4 py-2 text-sm text-gray-500 border border-gray-300 rounded hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          :disabled="loading"
          class="px-4 py-2 text-sm font-bold bg-gray-900 text-white rounded hover:bg-gray-800 disabled:opacity-50"
        >
          {{ mode === 'create' ? 'Create Product' : 'Update Product' }}
        </button>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { productService } from '~/api/product/ProductService'

const props = defineProps<{
  mode: 'create' | 'update'
  product?: any
}>()

const emit = defineEmits<{
  submitted: [data: {success: boolean, message: string, item?: any, action: string}],
  cancel: []
}>()

const loading = ref(false)
const form = reactive({
  name: '',
  price: 0
})

watch(() => props.product, (newProduct) => {
  if (newProduct && props.mode === 'update') {
    form.name = newProduct.name || ''
    form.price = newProduct.price || 0
  }
}, { immediate: true })

const handleSubmit = async () => {
  loading.value = true
  try {
    if (props.mode === 'create') {
      try {
        const response = await productService.create({ name: form.name, price: form.price })
        emit('submitted', { success: true, message: 'Product created successfully.', item: response.data, action: 'create' })
        // Reset form
        form.name = ''
        form.price = 0
      } catch (error: any) {
        emit('submitted', { success: false, message: `Error: ${error.message}`, action: 'create' })
      }
    } else if (props.product) {
      try {
        const response = await productService.update(props.product.uuid, form)
        emit('submitted', { success: true, message: 'Product updated successfully.', item: response.data, action: 'update' })
      } catch (error: any) {
        emit('submitted', { success: false, message: `Error: ${error.message}`, item: props.product, action: 'update' })
      }
    }
  } catch (error: any) {
    emit('submitted', { success: false, message: `Error: ${error.message}`, action: props.mode })
  } finally {
    loading.value = false
  }
}
</script>