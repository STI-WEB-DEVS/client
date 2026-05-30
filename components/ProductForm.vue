<template>
  <form @submit.prevent="handleSubmit">
    <div class="space-y-4">
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
        <input
          id="name"
          v-model="form.name"
          type="text"
          pattern="[a-zA-Z\s\-']+"
          title="Only letters, spaces, hyphens, and apostrophes are allowed"
          class="mt-1 block w-full h-12 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
        <p v-if="errors.name" class="mt-1 text-sm text-red-600">{{ errors.name }}</p>
      </div>
      
      <div>
        <label for="price" class="block text-sm font-medium text-gray-700">Price</label>
        <input
          id="price"
          v-model="form.price"
          type="number"
          step="0.01"
          min="0.01"
          class="mt-1 block w-full h-12 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
        <p v-if="errors.price" class="mt-1 text-sm text-red-600">{{ errors.price }}</p>
      </div>

      <div>
        <label for="quantity" class="block text-sm font-medium text-gray-700">Quantity (Stock)</label>
        <input
          id="quantity"
          v-model.number="form.quantity"
          type="number"
          min="0"
          step="1"
          :disabled="mode === 'update'"
          :class="[
            'mt-1 block w-full h-12 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500',
            mode === 'update' ? 'bg-gray-100 cursor-not-allowed text-gray-500' : ''
          ]"
          :required="mode === 'create'"
        />
        <p v-if="mode === 'update'" class="mt-1 text-sm text-gray-500">Use the "Restock" button to update stock quantity</p>
        <p v-if="errors.quantity" class="mt-1 text-sm text-red-600">{{ errors.quantity }}</p>
      </div>

      <div>
        <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          id="description"
          v-model="form.description"
          rows="4"
          maxlength="1000"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Optional product description..."
        ></textarea>
        <p v-if="errors.description" class="mt-1 text-sm text-red-600">{{ errors.description }}</p>
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
const errors = reactive({
  name: '',
  price: '',
  quantity: '',
  description: ''
})

const form = reactive({
  name: '',
  price: 0,
  quantity: 0,
  description: ''
})

watch(() => props.product, (newProduct) => {
  if (newProduct && props.mode === 'update') {
    form.name = newProduct.name || ''
    form.price = newProduct.price || 0
    form.quantity = newProduct.quantity || 0
    form.description = newProduct.description || ''
  }
}, { immediate: true })

const validateForm = () => {
  // Reset errors
  errors.name = ''
  errors.price = ''
  errors.quantity = ''
  errors.description = ''

  let isValid = true

  // Validate name - only letters, spaces, hyphens, apostrophes
  const nameRegex = /^[a-zA-Z\s\-']+$/
  if (!form.name.trim()) {
    errors.name = 'Product name is required.'
    isValid = false
  } else if (!nameRegex.test(form.name)) {
    errors.name = 'Product name must contain only letters, spaces, hyphens, and apostrophes.'
    isValid = false
  }

  // Validate price - must be numeric and positive
  if (form.price <= 0) {
    errors.price = 'Price must be greater than zero.'
    isValid = false
  } else if (isNaN(form.price)) {
    errors.price = 'Price must be a valid number.'
    isValid = false
  }

  // Validate quantity - must be integer and non-negative
  if (form.quantity < 0) {
    errors.quantity = 'Quantity cannot be negative.'
    isValid = false
  } else if (!Number.isInteger(form.quantity)) {
    errors.quantity = 'Quantity must be a whole number.'
    isValid = false
  }

  return isValid
}

const handleSubmit = async () => {
  if (!validateForm()) {
    return
  }

  loading.value = true
  try {
    if (props.mode === 'create') {
      try {
        const response = await productService.create({ 
          name: form.name, 
          price: form.price,
          quantity: form.quantity,
          description: form.description || null
        })
        emit('submitted', { success: true, message: 'Product created successfully.', item: response.data, action: 'create' })
        // Reset form
        form.name = ''
        form.price = 0
        form.quantity = 0
        form.description = ''
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || error.message
        emit('submitted', { success: false, message: `Error: ${errorMessage}`, action: 'create' })
      }
    } else if (props.product) {
      try {
        // Don't send quantity in update - use restock instead
        const updatePayload: any = {
          name: form.name,
          price: form.price,
          description: form.description || null
        };
        
        const response = await productService.update(props.product.uuid, updatePayload)
        emit('submitted', { success: true, message: 'Product updated successfully.', item: response.data, action: 'update' })
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || error.message
        emit('submitted', { success: false, message: `Error: ${errorMessage}`, item: props.product, action: 'update' })
      }
    }
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || error.message
    emit('submitted', { success: false, message: `Error: ${errorMessage}`, action: props.mode })
  } finally {
    loading.value = false
  }
}
</script>