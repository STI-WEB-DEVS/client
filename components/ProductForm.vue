<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <!-- Product Name with Character Counter -->
    <div>
      <label class="block text-sm font-semibold text-gray-900 mb-1">
        Product Name <span class="text-red-500">*</span>
      </label>
      <div class="relative">
        <input
          v-model="formData.name"
          type="text"
          required
          maxlength="50"
          :class="[
            'mt-1 block w-full rounded-xl border-2 px-4 py-3 shadow-sm transition-all duration-200 sm:text-sm',
            errors.name 
              ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500' 
              : 'border-gray-200 bg-gray-50 focus:border-indigo-500 focus:ring-indigo-500 hover:border-indigo-300'
          ]"
          placeholder="e.g., Cheeseburger"
        />
        <div class="absolute right-3 top-3 text-xs text-gray-400">
          {{ formData.name.length }}/50
        </div>
      </div>
      <div class="mt-2 flex items-center gap-2">
        <svg v-if="errors.name" class="h-4 w-4 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <svg v-else-if="formData.name && isValidProductName(formData.name)" class="h-4 w-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p v-if="errors.name" class="text-sm text-red-600">{{ errors.name }}</p>
        <p v-else class="text-xs text-gray-500">
          <span class="font-medium">Tip:</span> Use letters, numbers, spaces, hyphens, or apostrophes only.
        </p>
      </div>
    </div>

    <!-- Description -->
    <div>
      <label class="block text-sm font-semibold text-gray-900 mb-1">
        Description
        <span class="text-xs font-normal text-gray-500">(optional)</span>
      </label>
      <div class="relative">
        <textarea
          v-model="formData.description"
          rows="4"
          maxlength="500"
          class="mt-1 block w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 shadow-sm transition-all duration-200 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm hover:border-indigo-300"
          placeholder="Enter product description..."
        ></textarea>
        <div class="absolute bottom-3 right-3 text-xs text-gray-400">
          {{ formData.description.length }}/500
        </div>
      </div>
      <p class="mt-2 text-xs text-gray-500">
        <svg class="inline h-3 w-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
        Describe your product features, ingredients, or specifications
      </p>
    </div>

    <!-- Price with Currency Symbol -->
    <div>
      <label class="block text-sm font-semibold text-gray-900 mb-1">
        Price <span class="text-red-500">*</span>
      </label>
      <div class="relative mt-1 rounded-xl shadow-sm">
        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
          <span class="text-gray-500 sm:text-sm font-bold">₱</span>
        </div>
        <input
          v-model="formData.price"
          type="number"
          step="0.01"
          min="0"
          required
          :class="[
            'block w-full rounded-xl border-2 bg-gray-50 py-3 pl-8 pr-12 shadow-sm transition-all duration-200 sm:text-sm',
            errors.price 
              ? 'border-red-300 bg-red-50 focus:border-red-500' 
              : 'border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 hover:border-indigo-300'
          ]"
          placeholder="0.00"
        />
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
          <span class="text-gray-400 sm:text-sm">PHP</span>
        </div>
      </div>
      <p v-if="errors.price" class="mt-2 text-sm text-red-600">{{ errors.price }}</p>
    </div>

    <!-- Initial Stock (Create Mode) -->
    <div v-if="!isEdit" class="rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 p-5">
      <div class="flex items-center gap-2 mb-3">
        <div class="rounded-full bg-indigo-100 p-1.5">
          <svg class="h-5 w-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        </div>
        <h4 class="text-sm font-semibold text-gray-900">Initial Stock Setup</h4>
      </div>
      <div class="relative">
        <input
          v-model="formData.stock_quantity"
          type="number"
          min="0"
          required
          class="mt-1 block w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 shadow-sm transition-all duration-200 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="0"
        />
      </div>
      <p class="mt-2 text-xs text-gray-600">
        <svg class="inline h-3 w-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        Set the initial quantity available for this product
      </p>
    </div>

    <!-- Restock Section (Edit Mode) -->
    <div v-if="isEdit" class="rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 p-5 shadow-inner">
      <div class="flex items-center gap-2 mb-4">
        <div class="rounded-full bg-green-100 p-1.5">
          <svg class="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </div>
        <h4 class="text-sm font-semibold text-gray-900">Restock Management</h4>
        <span class="ml-auto rounded-full bg-green-200 px-2 py-0.5 text-xs font-medium text-green-800">
          Auto-Calculated
        </span>
      </div>

      <!-- Stock Display Cards -->
      <div class="mb-4 grid grid-cols-2 gap-3">
        <div class="rounded-lg bg-white p-3 shadow-sm">
          <p class="text-xs text-gray-500">Current Stock</p>
          <p class="text-2xl font-bold" :class="currentStock === 0 ? 'text-red-600' : 'text-gray-900'">
            {{ currentStock }}
          </p>
          <p class="text-xs text-gray-400">units available</p>
        </div>
        <div class="rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 p-3 shadow-lg">
          <p class="text-xs text-white/80">New Stock</p>
          <p class="text-2xl font-bold text-white">
            {{ computedNewStock }}
          </p>
          <p class="text-xs text-white/70">after restock</p>
        </div>
      </div>

      <!-- Restock Input -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          <svg class="inline h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Stock Quantity
        </label>
        <div class="relative">
          <input
            v-model="formData.restock_quantity"
            type="number"
            min="0"
            class="mt-1 block w-full rounded-xl border-2 border-green-200 bg-white px-4 py-3 pr-28 shadow-sm transition-all duration-200 focus:border-green-500 focus:ring-green-500 sm:text-sm"
            placeholder="Enter additional stock"
          />
          <div class="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
            + Add
          </div>
        </div>
        <div class="mt-3 flex items-start gap-2 rounded-lg bg-white/50 p-2">
          <svg class="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p class="text-xs text-gray-600">
            <strong>How it works:</strong> Current Stock ({{ currentStock }}) + Added Stock ({{ formData.restock_quantity || 0 }}) = <strong class="text-green-700">{{ computedNewStock }}</strong> New Stock
          </p>
        </div>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex justify-end gap-3 pt-4 border-t border-gray-200">
      <button 
        type="button" 
        @click="$emit('cancel')" 
        class="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 transition-all duration-200 hover:bg-gray-200 hover:shadow-md"
      >
        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
        Cancel
      </button>
      <button 
        type="submit" 
        :disabled="loading"
        class="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 px-6 py-2.5 text-sm font-medium text-white shadow-lg transition-all duration-200 hover:from-indigo-700 hover:to-indigo-800 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg v-if="loading" class="h-4 w-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
        </svg>
        <svg v-else class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path v-if="!isEdit" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        {{ loading ? 'Saving...' : (isEdit ? 'Update & Restock' : 'Create Product') }}
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'

const props = defineProps<{
  initialData?: { 
    uuid?: string
    name: string
    description?: string
    price: number
    stock_quantity?: number
  }
  isEdit?: boolean
}>()

const emit = defineEmits(['submit', 'cancel'])

const loading = ref(false)
const errors = ref<Record<string, string>>({})

const formData = ref({
  name: props.initialData?.name || '',
  description: props.initialData?.description || '',
  price: props.initialData?.price || 0,
  stock_quantity: props.initialData?.stock_quantity || 0,
  restock_quantity: ''
})

const currentStock = computed(() => props.initialData?.stock_quantity || 0)

const computedNewStock = computed(() => {
  if (!props.isEdit) return 0
  const restockQty = parseInt(formData.value.restock_quantity as string) || 0
  return currentStock.value + restockQty
})

const productNamePattern = /^[A-Za-z0-9 '-]+$/

const isValidProductName = (name: string) => productNamePattern.test(name.trim())

watch(() => props.initialData, (newData) => {
  if (newData) {
    formData.value = {
      name: newData.name || '',
      description: newData.description || '',
      price: newData.price || 0,
      stock_quantity: newData.stock_quantity || 0,
      restock_quantity: ''
    }
  }
}, { deep: true })

const validateName = (name: string): string | null => {
  if (name.trim().length < 2) {
    return 'Product name must be at least 2 characters'
  }
  if (!isValidProductName(name)) {
    return 'Product name cannot contain special characters.'
  }
  return null
}

const validatePrice = (price: number): string | null => {
  if (price < 0) return 'Price cannot be negative'
  if (price === 0) return 'Price should be greater than 0'
  return null
}

const handleSubmit = async () => {
  loading.value = true
  errors.value = {}

  const nameError = validateName(formData.value.name)
  if (nameError) {
    errors.value.name = nameError
    loading.value = false
    return
  }

  const priceError = validatePrice(Number(formData.value.price))
  if (priceError) {
    errors.value.price = priceError
    loading.value = false
    return
  }

  const submitData: any = {
    name: formData.value.name,
    description: formData.value.description,
    price: Number(formData.value.price)
  }

  if (!props.isEdit) {
    if (Number(formData.value.stock_quantity) < 0) {
      errors.value.stock_quantity = 'Stock cannot be negative'
      loading.value = false
      return
    }
    submitData.stock_quantity = Number(formData.value.stock_quantity)
  } else {
    if (formData.value.restock_quantity && formData.value.restock_quantity !== '') {
      submitData.restock_quantity = Number(formData.value.restock_quantity)
    }
  }

  try {
    await emit('submit', submitData)
  } finally {
    loading.value = false
  }
}
</script>
