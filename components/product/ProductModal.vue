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

const form = ref({ name: '', price: 0, description: '', stocks: 0 })
const loading = ref(false)
const restockAmount = ref(0)
const pendingRestock = ref(0)
const originalStocks = ref(0)

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
        description: data.description || '',
        stocks: data.stocks ?? data.stock ?? 0
      }
      originalStocks.value = form.value.stocks
    } catch (err) {
      console.error("Failed to fetch product:", err)
    }
  } else if (!isOpen) {
    form.value = { name: '', price: 0, description: '', stocks: 0 }
    restockAmount.value = 0
    pendingRestock.value = 0
    originalStocks.value = 0
  }
})

const handleRestock = () => {
  if (!restockAmount.value || restockAmount.value < 1) return
  pendingRestock.value += restockAmount.value
  restockAmount.value = 0
}

const handleSubmit = async () => {
  loading.value = true
  try {
    if (props.mode === 'create') {
      await productService.create(form.value)
    } else if (props.mode === 'edit' && props.uuid) {
      const payload = { 
        ...form.value, 
        stocks: originalStocks.value + pendingRestock.value 
      }
      await productService.update(props.uuid, payload)
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
</script>

<template>
  <FeedbackModal 
    :open="open" 
    :title="config.title" 
    :variant="config.variant" 
    hide-footer
    @close="emit('close')"
  >
    <!-- Delete confirmation -->
    <div v-if="mode === 'delete'" class="py-2">
      <p class="text-sm text-gray-600 leading-relaxed">
        Are you sure you want to delete 
        <span class="font-semibold text-gray-900">"{{ productName }}"</span>? 
        This action cannot be undone.
      </p>
    </div>

    <!-- Create / Edit form -->
    <form v-else id="product-form" @submit.prevent="handleSubmit">
      
      <!-- Name + Price side by side -->
      <div class="grid grid-cols-2 gap-4 mb-4">
        <div class="col-span-2 sm:col-span-1">
          <label class="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1.5">
            Product Name <span class="text-red-500">*</span>
          </label>
          <input 
            v-model="form.name" 
            type="text" 
            required 
            placeholder="e.g. Wireless Mouse"
            @keypress="(e) => { if (/^\d+$/.test(form.name + e.key)) e.preventDefault() }"
            class="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-900 focus:bg-white focus:ring-1 focus:ring-gray-900 outline-none transition" 
          />
        </div>

        <div class="col-span-2 sm:col-span-1">
          <label class="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1.5">
            Price (₱) <span class="text-red-500">*</span>
          </label>
          <input 
            v-model.number="form.price" 
            type="number" 
            step="0.01"
            min="0"
            required 
            placeholder="0.00"
            @keypress="(e) => { if (!/[0-9.]/.test(e.key) || (e.key === '.' && form.price.toString().includes('.'))) e.preventDefault() }"
            class="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-900 focus:bg-white focus:ring-1 focus:ring-gray-900 outline-none transition" 
          />
        </div>
      </div>

      <!-- Description -->
      <div class="mb-4">
        <label class="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1.5">
          Description
        </label>
        <textarea
          v-model="form.description"
          rows="3"
          placeholder="e.g. A compact wireless mouse with ergonomic design"
          class="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-900 focus:bg-white focus:ring-1 focus:ring-gray-900 outline-none transition resize-none"
        />
      </div>

      <!-- Stocks -->
      <div class="mb-4">
        <label class="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1.5">
          Stocks <span v-if="mode === 'create'" class="text-red-500">*</span>
        </label>

        <!-- Edit mode: read-only display -->
        <div
          v-if="mode === 'edit'"
          class="w-full rounded-lg border border-gray-200 bg-gray-100 px-3 py-2.5 text-sm text-gray-500 cursor-not-allowed select-none"
        >
          {{ form.stocks }}
        </div>

        <!-- Create mode: editable input -->
        <input
          v-else
          v-model.number="form.stocks"
          type="number"
          min="0"
          step="1"
          required
          placeholder="0"
          @keypress="(e) => { if (!/[0-9]/.test(e.key)) e.preventDefault() }"
          class="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-900 focus:bg-white focus:ring-1 focus:ring-gray-900 outline-none transition"
        />
      </div>

    </form>

    <!-- Restock section: edit mode only — outside <form> to avoid validation conflicts -->
    <div v-if="mode === 'edit'" class="rounded-xl border border-dashed border-green-300 bg-green-50 p-4 mt-4">
      <div class="flex items-center justify-between mb-3">
        <div>
          <p class="text-sm font-semibold text-green-800">Restock Inventory</p>
          <p class="text-xs text-green-600 mt-0.5">
            Current stock: <span class="font-bold">{{ originalStocks }}</span>
            <span v-if="pendingRestock > 0" class="ml-1">
              → <span class="font-bold">{{ originalStocks + pendingRestock }}</span> after save
            </span>
          </p>
        </div>
      </div>
      <div class="flex gap-2">
        <input
          v-model.number="restockAmount"
          type="number"
          min="0"
          placeholder="Quantity to add"
          class="flex-1 rounded-lg border border-green-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition"
        />
        <button
          type="button"
          @click="handleRestock"
          :disabled="!restockAmount || restockAmount < 1"
          class="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 disabled:opacity-40 disabled:cursor-not-allowed transition whitespace-nowrap"
        >
          + Restock
        </button>
      </div>
    </div>

    <!-- Footer -->
    <div class="mt-6 pt-4 border-t border-gray-100 flex justify-end gap-2">
      <button 
        type="button" 
        @click="emit('close')" 
        class="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
      >
        Cancel
      </button>
      
      <button 
        v-if="mode === 'delete'"
        type="button"
        @click="handleSubmit"
        :disabled="loading"
        class="px-5 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 disabled:opacity-50 transition"
      >
        {{ loading ? 'Deleting...' : config.submitLabel }}
      </button>

      <button 
        v-else
        form="product-form"
        type="submit"
        :disabled="loading"
        class="px-5 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 disabled:opacity-50 transition"
      >
        {{ loading ? 'Saving...' : config.submitLabel }}
      </button>
    </div>

  </FeedbackModal>
</template>