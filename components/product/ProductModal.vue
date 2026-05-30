<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import FeedbackModal from '~/components/FeedbackModal.vue'
import AddStocksModal from '~/components/product/AddStocksModal.vue'
import { productService } from '~/api/product/ProductService'

const nameError = ref('')

const validateName = (value: string) => {
  if (/^\d+$/.test(value.trim())) {
    nameError.value = 'Product name cannot be purely numbers.'
  } else {
    nameError.value = ''
  }
}

const props = defineProps<{ 
  open: boolean; 
  mode: 'create' | 'edit' | 'delete';
  uuid?: string;
  productName?: string; 
}>()

const emit = defineEmits(['close', 'success'])

const form = ref({ name: '', price: 0, stocks: 0, product_description: '' })
const loading = ref(false)
const showAddStocks = ref(false)

const config = computed(() => ({
  title: props.mode === 'delete' ? 'Delete Product' : (props.mode === 'edit' ? 'Edit Product' : 'Add Product'),
  variant: (props.mode === 'delete' ? 'danger' : 'default') as 'danger' | 'default',
  submitLabel: props.mode === 'delete' ? 'Delete' : (props.mode === 'edit' ? 'Save Changes' : 'Add Product')
}))

watch(() => props.open, async (isOpen) => {
  if (isOpen && props.mode === 'edit' && props.uuid) {
    try {
      const res = await productService.show(props.uuid)
      const data = res.data ?? res
      form.value = { 
        name: data.name || data.title || '', 
        price: data.price || 0,
        stocks: data.stocks || 0,
        product_description: data.product_description || ''
      }
    } catch (err) {
      console.error("Failed to fetch product:", err)
    }
  } else if (!isOpen) {
    form.value = { name: '', price: 0, stocks: 0, product_description: '' }
  }
})

const handleSubmit = async () => {

   if (/^\d+$/.test(form.value.name.trim())) {
    nameError.value = 'Product name cannot be purely numbers.'
    return
  }

  loading.value = true
  try {
    if (props.mode === 'create') {
      await productService.create(form.value)
    } else if (props.mode === 'edit' && props.uuid) {
      await productService.update(props.uuid, form.value)
    } else if (props.mode === 'delete' && props.uuid) {
      await productService.delete(props.uuid)
    }
    emit('success')
    emit('close')
  } catch (err) {
    console.error("Operation failed:", err)
  } finally {
    loading.value = false
  }
}

const handleAddStocks = () => {
  showAddStocks.value = true
}

const onStocksConfirmed = (quantity: number) => {
  form.value.stocks += quantity
  showAddStocks.value = false
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
          class="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition"
          :class="nameError ? 'border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-400' : 'focus:border-gray-900 focus:ring-1 focus:ring-gray-900'"
          @input="validateName(form.name)"
        />
        <p v-if="nameError" class="mt-1 text-xs text-red-500">{{ nameError }}</p>
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

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Stocks</label>
        <div class="flex gap-2">
          <input 
            v-model.number="form.stocks" 
            type="number"
            step="1"
            min="0"
            :disabled="mode === 'edit'"
            placeholder="0"
            class="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition"
            :class="mode === 'edit' ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'focus:border-gray-900 focus:ring-1 focus:ring-gray-900'"
          />
          <button
            v-if="mode === 'edit'"
            type="button"
            @click="handleAddStocks"
            class="shrink-0 rounded-lg border border-emerald-200 px-4 py-2 text-sm font-medium text-emerald-700 hover:bg-emerald-50 transition"
          >
            + Add Stocks
          </button>
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          v-model="form.product_description"
          rows="3"
          placeholder="e.g. A compact wireless mouse with ergonomic design..."
          class="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition resize-none"
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

  <!-- AddStocksModal is now inside ProductModal, no need to touch index.vue -->
  <AddStocksModal
    :open="showAddStocks"
    :product-name="productName"
    :current-stocks="form.stocks"
    @close="showAddStocks = false"
    @confirm="onStocksConfirmed"
  />
</template>