<template>
  <NuxtLayout>
    <div class="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <p class="text-xs font-semibold uppercase tracking-widest text-amber-600">Product Management</p>
      <h1 class="mt-2 text-3xl font-bold text-slate-900">Products</h1>
      <p class="mt-2 text-sm text-slate-600">Manage product records from the same app shell and visual language.</p>
    </div>

    <div class="grid grid-cols-1 gap-6 xl:grid-cols-3">
      <div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm xl:col-span-2">
        <div class="border-b border-slate-100 bg-slate-50 px-6 py-4">
          <h2 class="text-lg font-semibold text-slate-900">Product Records</h2>
          <p class="mt-1 text-xs text-slate-500">Pulled from the `/api/products` endpoint.</p>
        </div>

        <div v-if="message" class="mx-6 mt-6 rounded-xl border px-4 py-3 text-sm" :class="messageClass">
          {{ message }}
        </div>

        <div class="overflow-x-auto px-6 py-6">
          <table class="min-w-full divide-y divide-slate-200">
            <thead>
              <tr class="text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                <th class="pb-3 pr-4">Name</th>
                <th class="pb-3 pr-4">Price</th>
                <th class="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr v-for="product in products" :key="product.uuid" class="align-top">
                <td class="py-4 pr-4">
                  <p class="font-semibold text-slate-900">{{ product.name }}</p>
                  <p class="mt-1 text-xs text-slate-500">{{ product.uuid }}</p>
                </td>
                <td class="py-4 pr-4 text-sm text-slate-600">{{ formatPrice(product.price) }}</td>
                <td class="py-4 text-right">
                  <div class="inline-flex items-center gap-2">
                    <NuxtLink :to="`/products/${product.uuid}`" class="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
                      View
                    </NuxtLink>
                    <button class="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50" @click="startEdit(product)">
                      Edit
                    </button>
                    <button class="rounded-lg border border-rose-200 px-3 py-1.5 text-sm font-medium text-rose-700 transition hover:bg-rose-50" @click="promptDelete(product)">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="!products.length">
                <td colspan="3" class="py-10 text-center text-sm text-slate-500">No products found.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div class="border-b border-slate-100 bg-slate-50 px-6 py-4">
          <h2 class="text-lg font-semibold text-slate-900">{{ editingUuid ? 'Edit Product' : 'New Product' }}</h2>
          <p class="mt-1 text-xs text-slate-500">Uses the existing product form component.</p>
        </div>

        <div class="space-y-6 px-6 py-6">
          <ProductsForm v-model="form" :disabled="saving" />

          <div class="flex items-center gap-3">
            <button class="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60" :disabled="saving" @click="saveProduct">
              {{ saving ? 'Saving...' : editingUuid ? 'Update Product' : 'Create Product' }}
            </button>
            <button v-if="editingUuid" class="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50" :disabled="saving" @click="resetForm">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
  <ConfirmModal v-model="showDeleteModal" title="Delete product?" :message="deletingProduct ? `Delete ${deletingProduct.name}?` : 'Delete?'" @confirm="confirmDelete" />
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import ProductsForm from '~/components/ProductsForm.vue'
import ConfirmModal from '~/components/ConfirmModal.vue'
import { productService } from '~/api/products/ProductService'

type ProductRecord = {
  uuid: string
  name: string
  price: string | number
}

type ProductFormState = {
  name: string
  price: string | number
}

const products = ref<ProductRecord[]>([])
const form = ref<ProductFormState>({ name: '', price: '' })
const editingUuid = ref<string | null>(null)
const saving = ref(false)
const message = ref('')
const messageTone = ref<'success' | 'error' | ''>('')

const messageClass = computed(() =>
  messageTone.value === 'success'
    ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
    : 'border-rose-200 bg-rose-50 text-rose-800',
)

const extractRows = (response: any): ProductRecord[] => {
  // handle multiple API shapes: { data: [...] }, { data: { data: [...] } }, or direct array
  if (!response) return []

  if (Array.isArray(response)) return response

  // resource collection: { data: [...] }
  if (Array.isArray(response.data)) return response.data

  // nested resource: { data: { data: [...] } }
  if (response.data && Array.isArray(response.data.data)) return response.data.data

  return []
}

const setFeedback = (text: string, tone: 'success' | 'error') => {
  message.value = text
  messageTone.value = tone
}

const clearFeedback = () => {
  message.value = ''
  messageTone.value = ''
}

const loadProducts = async () => {
  try {
    const response = await productService.list()
    products.value = extractRows(response)
  } catch (error: any) {
    setFeedback(error?.message || 'Failed to load products.', 'error')
  }
}

const resetForm = () => {
  editingUuid.value = null
  form.value = { name: '', price: '' }
}

const startEdit = (product: ProductRecord) => {
  clearFeedback()
  editingUuid.value = product.uuid
  form.value = {
    name: product.name,
    price: product.price,
  }
}

const saveProduct = async () => {
  saving.value = true
  clearFeedback()

  try {
    if (editingUuid.value) {
      await productService.update(editingUuid.value, form.value)
      setFeedback('Product updated successfully.', 'success')
    } else {
      await productService.create(form.value)
      setFeedback('Product created successfully.', 'success')
    }

    await loadProducts()
    resetForm()
  } catch (error: any) {
    setFeedback(error?.message || 'Unable to save product.', 'error')
  } finally {
    saving.value = false
  }
}

const showDeleteModal = ref(false)
const deletingProduct = ref<ProductRecord | null>(null)

const promptDelete = (product: ProductRecord) => {
  deletingProduct.value = product
  showDeleteModal.value = true
}

const confirmDelete = async () => {
  if (!deletingProduct.value) return
  saving.value = true
  clearFeedback()
  try {
    await productService.delete(deletingProduct.value.uuid)
    setFeedback('Product deleted successfully.', 'success')
    if (editingUuid.value === deletingProduct.value.uuid) resetForm()
    await loadProducts()
  } catch (error: any) {
    setFeedback(error?.message || 'Unable to delete product.', 'error')
  } finally {
    saving.value = false
    deletingProduct.value = null
  }
}

const formatPrice = (value: string | number) => {
  const numericValue = Number(value)

  if (Number.isNaN(numericValue)) {
    return String(value)
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(numericValue)
}

onMounted(loadProducts)
</script>