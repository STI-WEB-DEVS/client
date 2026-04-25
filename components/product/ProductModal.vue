<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import FeedbackModal from '~/components/FeedbackModal.vue'
import { productService } from '~/api/product/ProductService'

const props = defineProps<{ 
  open: boolean; 
  mode: 'create' | 'edit' | 'delete';
  uuid?: string;
  productName?: string; 
}>()

const emit = defineEmits(['close', 'success'])

// Form fields aligned with the ProductService and Page table
const form = ref({ name: '', price: 0 })
const loading = ref(false)

// Computed UI configuration
const config = computed(() => ({
  title: props.mode === 'delete' ? 'Delete Product' : (props.mode === 'edit' ? 'Edit Product' : 'Add Product'),
  variant: (props.mode === 'delete' ? 'danger' : 'default') as 'danger' | 'default',
  submitLabel: props.mode === 'delete' ? 'Delete' : (props.mode === 'edit' ? 'Save Changes' : 'Add Product')
}))

// Load data for Edit mode
watch(() => props.open, async (isOpen) => {
  if (isOpen && props.mode === 'edit' && props.uuid) {
    try {
      const res = await productService.show(props.uuid)
      const data = res.data ?? res
      // Mapping API response (handling both 'name' and 'title' keys just in case)
      form.value = { 
        name: data.name || data.title || '', 
        price: data.price || 0 
      }
    } catch (err) {
      console.error("Failed to fetch product:", err)
    }
  } else if (!isOpen) {
    form.value = { name: '', price: 0 } // Reset form on close
  }
})

// Unified Submit Logic
const handleSubmit = async () => {
  loading.value = true
  try {
    if (props.mode === 'create') {
      await productService.create(form.value)
    } else if (props.mode === 'edit' && props.uuid) {
      await productService.update(props.uuid, form.value)
    } else if (props.mode === 'delete' && props.uuid) {
      await productService.delete(props.uuid)
    }
    
    emit('success') // Triggers fetchProducts() on the main page
    emit('close')
  } catch (err) {
    console.error("Operation failed:", err)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <FeedbackModal 
    :open="open" 
    :title="config.title" 
    :variant="config.variant" 
    hide-footer
    @close="emit('close')"
  >
    <div v-if="mode === 'delete'">
      <p class="text-sm text-gray-600">
        Are you sure you want to delete <span class="font-medium text-gray-900">"{{ productName }}"</span>? 
        This action cannot be undone.
      </p>
    </div>

    <form v-else id="product-form" @submit.prevent="handleSubmit" class="space-y-5">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
        <input 
          v-model="form.name" 
          type="text" 
          required 
          placeholder="e.g. Wireless Mouse"
          class="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition" 
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Price (₱) *</label>
        <input 
          v-model.number="form.price" 
          type="number" 
          step="0.01"
          required 
          placeholder="0.00"
          class="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition" 
        />
      </div>
    </form>

    <div class="mt-8 flex justify-end gap-3">
      <button 
        type="button" 
        @click="emit('close')" 
        class="px-5 py-2.5 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
      >
        Cancel
      </button>
      
      <button 
        v-if="mode === 'delete'"
        type="button"
        @click="handleSubmit"
        :disabled="loading"
        class="px-6 py-2.5 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 disabled:opacity-50 transition"
      >
        {{ loading ? 'Deleting...' : config.submitLabel }}
      </button>

      <button 
        v-else
        form="product-form"
        type="submit"
        :disabled="loading"
        class="px-6 py-2.5 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 disabled:opacity-50 transition"
      >
        {{ loading ? 'Saving...' : config.submitLabel }}
      </button>
    </div>
  </FeedbackModal>
</template>