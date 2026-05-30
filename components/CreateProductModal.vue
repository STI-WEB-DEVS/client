<template>
  <Dialog :open="open" @close="onClose" class="relative z-50">
    <div class="fixed inset-0 bg-black/30" aria-hidden="true"></div>
    <div class="fixed inset-0 flex items-center justify-center p-4">
      <DialogPanel class="mx-auto w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <DialogTitle class="text-lg font-medium text-gray-900">{{ title }}</DialogTitle>
        <form @submit.prevent="submit">

          <!-- Name -->
          <div class="mt-4">
            <label class="block text-sm font-medium text-gray-700">Name</label>
            <input
              v-model="form.name"
              type="text"
              @keydown="blockDigits"
              @paste="stripDigitsOnPaste"
              class="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
              required
            />
          </div>

          <!-- Description -->
          <div class="mt-4">
            <label class="block text-sm font-medium text-gray-700">
              Description
              <span class="ml-1 text-xs font-normal text-gray-400">(optional)</span>
            </label>
            <textarea
              v-model="form.description"
              rows="3"
              placeholder="Describe the product..."
              class="mt-1 w-full resize-none rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
          </div>

          <!-- Price + Stock -->
          <div class="mt-4 grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Price (₱)</label>
              <input
                v-model="form.price"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                @keydown="blockMinus"
                class="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                required
              />
            </div>
            <div>
              <!-- Edit mode: add stock only -->
              <template v-if="isEditMode">
                <label class="block text-sm font-medium text-gray-700">
                  Add Stock
                  <span class="ml-1 text-xs font-normal text-gray-400">(current: {{ props.product?.stock }})</span>
                </label>
                <input
                  v-model.number="form.stockToAdd"
                  type="number"
                  min="0"
                  placeholder="0"
                  @keydown="blockMinus"
                  class="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                  required
                />
              </template>
              <!-- Create mode: set stock freely -->
              <template v-else>
                <label class="block text-sm font-medium text-gray-700">Stock</label>
                <input
                  v-model.number="form.stock"
                  type="number"
                  min="0"
                  placeholder="0"
                  @keydown="blockMinus"
                  class="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                  required
                />
              </template>
            </div>
          </div>

          <!-- Error -->
          <p v-if="errorMessage" class="mt-3 text-sm text-red-600">{{ errorMessage }}</p>

          <!-- Actions -->
          <div class="mt-6 flex justify-end gap-2">
            <button
              type="button"
              @click="onClose"
              class="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="saving"
              class="inline-flex items-center gap-2 rounded bg-gray-900 px-4 py-2 text-sm text-white hover:bg-gray-800 disabled:opacity-60"
            >
              <span
                v-if="saving"
                class="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent"
              />
              {{ submitLabel }}
            </button>
          </div>
        </form>
      </DialogPanel>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'
import { productService } from '~/api/product/ProductService'

const props = defineProps<{
  open: boolean
  product?: {
    uuid: string
    name: string
    description?: string
    price: string | number
    stock: number
  } | null
}>()

const emit = defineEmits(['close', 'saved'])

const saving = ref(false)
const errorMessage = ref('')

const isEditMode = computed(() => !!props.product?.uuid)

const defaultForm = () => ({
  name:        '',
  description: '',
  price:       '' as string | number,
  stock:       0,
  stockToAdd:  0,
})

const form = reactive(defaultForm())

const title       = computed(() => isEditMode.value ? 'Edit Product' : 'Create Product')
const submitLabel = computed(() => isEditMode.value ? 'Update' : 'Save')

watch(
  () => props.open,
  (open) => {
    errorMessage.value = ''
    if (open && props.product) {
      form.name        = props.product.name        ?? ''
      form.description = props.product.description ?? ''
      form.price       = props.product.price       ?? ''
      form.stock       = props.product.stock       ?? 0
      form.stockToAdd  = 0 // always start at 0 when opening edit
    } else if (!open) {
      Object.assign(form, defaultForm())
    }
  },
  { immediate: true }
)

/** Block digit keys (0–9) and numpad digits in the Name field */
const blockDigits = (e: KeyboardEvent) => {
  if (/^[0-9]$/.test(e.key) || (e.code >= 'Numpad0' && e.code <= 'Numpad9')) {
    e.preventDefault()
  }
}

/** Strip any digits pasted into the Name field */
const stripDigitsOnPaste = (e: ClipboardEvent) => {
  e.preventDefault()
  const text = e.clipboardData?.getData('text') ?? ''
  const cleaned = text.replace(/[0-9]/g, '')
  document.execCommand('insertText', false, cleaned)
}

/** Block the minus key for Price and Stock fields */
const blockMinus = (e: KeyboardEvent) => {
  if (e.key === '-' || e.key === 'Subtract') {
    e.preventDefault()
  }
}

const onClose = () => emit('close')

const submit = async () => {
  errorMessage.value = ''

  // Guard: price must not be negative
  if (Number(form.price) < 0) {
    errorMessage.value = 'Price cannot be negative.'
    return
  }

  // Guard: stockToAdd must not be negative in edit mode
  if (isEditMode.value && form.stockToAdd < 0) {
    errorMessage.value = 'Stock to add cannot be negative.'
    return
  }

  saving.value = true

  const payload = {
    name:        form.name,
    description: form.description || null,
    price:       form.price,
    // In edit mode, send the incremental amount so the backend adds it.
    // In create mode, send the absolute stock value.
    stock: isEditMode.value
      ? (props.product?.stock ?? 0) + form.stockToAdd
      : form.stock,
  }

  try {
    if (props.product?.uuid) {
      await productService.update(props.product.uuid, payload)
    } else {
      await productService.create(payload)
    }
    emit('saved')
    onClose()
  } catch (err: any) {
    errorMessage.value = err?.message || 'Unable to save product.'
  } finally {
    saving.value = false
  }
}
</script>