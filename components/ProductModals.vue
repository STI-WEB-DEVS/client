<template>
  <!-- Create Modal -->
  <div v-if="openModal === 'create'" class="fixed inset-0 z-50 flex items-center justify-center">
    <div class="absolute inset-0 bg-black/40" @click="$emit('close')" />
    <div class="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
      <h2 class="text-lg font-semibold text-gray-900">Create Product</h2>
      <p class="mt-1 text-sm text-gray-500">Fill in the details to create a new product.</p>

      <div class="mt-4 space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Name</label>
          <input
            v-model="form.name"
            type="text"
            placeholder="Product name"
            class="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-1"
            :class="errors.name ? 'border-red-400 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-gray-900 focus:ring-gray-900'"
          />
          <p v-if="errors.name" class="mt-1 text-xs text-red-600">{{ errors.name }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            v-model="form.description"
            rows="3"
            placeholder="Product description (optional)"
            class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 resize-none"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Price</label>
          <input
            v-model="form.price"
            type="number"
            placeholder="0.00"
            min="0"
            class="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-1"
            :class="errors.price ? 'border-red-400 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-gray-900 focus:ring-gray-900'"
          />
          <p v-if="errors.price" class="mt-1 text-xs text-red-600">{{ errors.price }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Stock Quantity</label>
          <input
            v-model="form.stock_quantity"
            type="number"
            placeholder="0"
            min="0"
            class="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-1"
            :class="errors.stock_quantity ? 'border-red-400 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-gray-900 focus:ring-gray-900'"
          />
          <p v-if="errors.stock_quantity" class="mt-1 text-xs text-red-600">{{ errors.stock_quantity }}</p>
        </div>
      </div>

      <div class="mt-6 flex justify-end gap-2">
        <button type="button" @click="$emit('close')"
          class="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
          Cancel
        </button>
        <button type="button" @click="handleCreate"
          class="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800">
          Create
        </button>
      </div>
    </div>
  </div>

  <!-- Edit Modal -->
  <div v-if="openModal === 'edit'" class="fixed inset-0 z-50 flex items-center justify-center">
    <div class="absolute inset-0 bg-black/40" @click="$emit('close')" />
    <div class="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
      <h2 class="text-lg font-semibold text-gray-900">Edit Product</h2>
      <p class="mt-1 text-sm text-gray-500">Update the product's details.</p>

      <div class="mt-4 space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Name</label>
          <input
            v-model="form.name"
            type="text"
            class="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-1"
            :class="errors.name ? 'border-red-400 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-gray-900 focus:ring-gray-900'"
          />
          <p v-if="errors.name" class="mt-1 text-xs text-red-600">{{ errors.name }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            v-model="form.description"
            rows="3"
            placeholder="Product description (optional)"
            class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 resize-none"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Price</label>
          <input
            v-model="form.price"
            type="number"
            min="0"
            class="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-1"
            :class="errors.price ? 'border-red-400 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-gray-900 focus:ring-gray-900'"
          />
          <p v-if="errors.price" class="mt-1 text-xs text-red-600">{{ errors.price }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Restock Quantity</label>
          <p class="mt-0.5 text-xs text-gray-500">
            Current stock: <span class="font-medium text-gray-700">{{ props.product?.stock_quantity ?? 0 }}</span>.
            Units entered here will be <span class="font-medium">added</span> to the current stock.
          </p>
          <input
            v-model="form.restock_quantity"
            type="number"
            placeholder="0"
            min="0"
            class="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-1"
            :class="errors.restock_quantity ? 'border-red-400 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-gray-900 focus:ring-gray-900'"
          />
          <p v-if="errors.restock_quantity" class="mt-1 text-xs text-red-600">{{ errors.restock_quantity }}</p>
          <p v-if="restockPreview !== null" class="mt-1 text-xs text-gray-500">
            New stock will be: <span class="font-semibold text-gray-800">{{ restockPreview }} units</span>
          </p>
        </div>
      </div>

      <div class="mt-6 flex justify-end gap-2">
        <button type="button" @click="$emit('close')"
          class="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
          Cancel
        </button>
        <button type="button" @click="handleEdit"
          class="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800">
          Save Changes
        </button>
      </div>
    </div>
  </div>

  <!-- Delete Modal -->
  <div v-if="openModal === 'delete'" class="fixed inset-0 z-50 flex items-center justify-center">
    <div class="absolute inset-0 bg-black/40" @click="$emit('close')" />
    <div class="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
      <h2 class="text-lg font-semibold text-gray-900">Delete Product</h2>
      <p class="mt-4 text-sm text-gray-600">
        Are you sure you want to delete
        <span class="font-semibold text-gray-900">{{ product?.name }}</span>?
        This action cannot be undone.
      </p>

      <div v-if="deleteError" class="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
        {{ deleteError }}
      </div>

      <div class="mt-6 flex justify-end gap-2">
        <button type="button" @click="$emit('close')"
          class="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
          Cancel
        </button>
        <button type="button" :disabled="loading" @click="handleDelete"
          class="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50">
          <span v-if="loading" class="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          {{ loading ? 'Deleting...' : 'Delete' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { productService } from '~/api/product/ProductService'

const props = defineProps<{
  openModal: 'create' | 'edit' | 'delete' | null
  product?: any
}>()

const emit = defineEmits<{
  close: []
  submit: [action: 'create' | 'edit', form: any]
  success: [action: 'deleted']
}>()

// ── Forms ────────────────────────────────────────────────
const form = ref<any>({ name: '', description: '', price: '', stock_quantity: '' })
const errors = ref<Record<string, string>>({})
const loading = ref(false)
const deleteError = ref('')

// ── Restock preview ──────────────────────────────────────
const restockPreview = computed(() => {
  if (form.value.restock_quantity === '' || form.value.restock_quantity === null) return null
  const current = Number(props.product?.stock_quantity ?? 0)
  const adding  = Number(form.value.restock_quantity)
  return current + (isNaN(adding) ? 0 : adding)
})

// ── Hydrate form on product / modal change ───────────────
watch([() => props.product, () => props.openModal], ([val, modal]) => {
  errors.value = {}
  if (modal === 'edit' && val) {
    form.value = {
      name:             val.name        ?? '',
      description:      val.description ?? '',
      price:            val.price       ?? '',
      restock_quantity: '',
    }
  } else if (modal === 'create') {
    form.value = { name: '', description: '', price: '', stock_quantity: '' }
  }
}, { immediate: true })

// ── Validation ───────────────────────────────────────────
// Name must contain at least one letter (a-z, A-Z, or unicode letter)
const hasLetterRegex = /\p{L}/u

function validateCreate(): boolean {
  const e: Record<string, string> = {}

  if (!form.value.name.trim())
    e.name = 'Name is required.'
  else if (!hasLetterRegex.test(form.value.name.trim()))
    e.name = 'Name must contain at least one letter.'

  if (form.value.price === '' || form.value.price === null)
    e.price = 'Price is required.'
  else if (Number(form.value.price) < 0)
    e.price = 'Price cannot be negative.'

  if (form.value.stock_quantity === '' || form.value.stock_quantity === null)
    e.stock_quantity = 'Stock quantity is required.'
  else if (Number(form.value.stock_quantity) < 0)
    e.stock_quantity = 'Stock cannot be negative.'

  errors.value = e
  return Object.keys(e).length === 0
}

function validateEdit(): boolean {
  const e: Record<string, string> = {}

  if (!form.value.name.trim())
    e.name = 'Name is required.'
  else if (!hasLetterRegex.test(form.value.name.trim()))
    e.name = 'Name must contain at least one letter.'

  if (form.value.price === '' || form.value.price === null)
    e.price = 'Price is required.'
  else if (Number(form.value.price) < 0)
    e.price = 'Price cannot be negative.'

  if (form.value.restock_quantity !== '' && form.value.restock_quantity !== null) {
    if (Number(form.value.restock_quantity) < 0)
      e.restock_quantity = 'Restock quantity cannot be negative.'
  }

  errors.value = e
  return Object.keys(e).length === 0
}

// ── Handlers ─────────────────────────────────────────────
const handleCreate = () => {
  if (!validateCreate()) return
  emit('submit', 'create', { ...form.value })
}

const handleEdit = () => {
  if (!validateEdit()) return
  const current        = Number(props.product?.stock_quantity ?? 0)
  const restock        = Number(form.value.restock_quantity) || 0
  const stock_quantity = current + restock

  emit('submit', 'edit', {
    name:           form.value.name,
    description:    form.value.description,
    price:          form.value.price,
    stock_quantity,
  })
}

const handleDelete = async () => {
  loading.value     = true
  deleteError.value = ''
  try {
    await productService.delete(props.product.uuid)
    emit('close')
    emit('success', 'deleted')
  } catch (err: any) {
    deleteError.value = err.message
  } finally {
    loading.value = false
  }
}
</script>