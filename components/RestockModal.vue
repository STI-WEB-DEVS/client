<template>
  <div v-if="open" class="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50" @click="emit('close')">
    <div @click.stop class="bg-white p-6 rounded-lg max-w-md w-full mx-4">
      <h2 class="text-lg font-semibold mb-4">Restock Product</h2>
      
      <div class="mb-4">
        <p class="text-sm text-gray-600 mb-2">Product: <span class="font-medium text-gray-900">{{ product?.name }}</span></p>
        <p class="text-sm text-gray-600 mb-4">Current Stock: <span class="font-medium text-gray-900">{{ product?.quantity || 0 }}</span></p>
        
        <label for="restock-quantity" class="block text-sm font-medium text-gray-700 mb-2">
          Add Quantity
        </label>
        <input
          id="restock-quantity"
          v-model.number="restockQuantity"
          type="number"
          min="1"
          step="1"
          class="block w-full h-12 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Enter quantity to add"
          required
        />
        <p v-if="error" class="mt-2 text-sm text-red-600">{{ error }}</p>
        <p v-if="restockQuantity > 0" class="mt-2 text-sm text-gray-600">
          New stock will be: <span class="font-semibold text-indigo-600">{{ (product?.quantity || 0) + restockQuantity }}</span>
        </p>
      </div>

      <div class="flex justify-end gap-3">
        <button
          type="button"
          @click="emit('close')"
          :disabled="loading"
          class="px-4 py-2 text-sm text-gray-500 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="button"
          @click="handleRestock"
          :disabled="loading || restockQuantity < 1"
          class="px-4 py-2 text-sm font-bold bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
        >
          {{ loading ? 'Restocking...' : 'Restock' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { productService } from '~/api/product/ProductService'

const props = defineProps<{
  open: boolean
  product: any
}>()

const emit = defineEmits<{
  close: []
  restocked: [data: { success: boolean, message: string, product?: any }]
}>()

const restockQuantity = ref(0)
const loading = ref(false)
const error = ref('')

watch(() => props.open, (isOpen) => {
  if (isOpen) {
    restockQuantity.value = 0
    error.value = ''
  }
})

const handleRestock = async () => {
  if (restockQuantity.value < 1) {
    error.value = 'Quantity must be at least 1'
    return
  }

  if (!Number.isInteger(restockQuantity.value)) {
    error.value = 'Quantity must be a whole number'
    return
  }

  loading.value = true
  error.value = ''

  try {
    const response = await productService.restock(props.product.uuid, restockQuantity.value)
    emit('restocked', {
      success: true,
      message: `Successfully added ${restockQuantity.value} units to ${props.product.name}`,
      product: response.data
    })
    emit('close')
  } catch (err: any) {
    const errorMessage = err.response?.data?.message || err.message
    error.value = errorMessage
    emit('restocked', {
      success: false,
      message: `Failed to restock: ${errorMessage}`
    })
  } finally {
    loading.value = false
  }
}
</script>
