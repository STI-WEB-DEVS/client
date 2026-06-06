<template>
  <div class="min-h-screen bg-[#FDFCFB] p-8 font-sans text-slate-900">
    <header class="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <h1 class="text-3xl font-black tracking-tight text-[#2D2424]">Furniture Products</h1>
        <p class="mt-1 text-gray-500">Manage product details, pricing, and stock availability.</p>
      </div>

      <button class="flex items-center gap-2 rounded-xl bg-[#5D4037] px-5 py-3 text-sm font-bold text-white shadow-lg hover:bg-[#4E342E]" @click="openCreateForm">
        <PlusIcon class="size-5" />
        Add Product
      </button>
    </header>

    <div class="mb-6 rounded-xl border border-gray-200 bg-white p-4">
      <div class="relative max-w-md">
        <MagnifyingGlassIcon class="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-gray-400" />
        <input v-model="search" type="text" placeholder="Search products..." class="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-amber-500" />
      </div>
    </div>

    <div v-if="errorMessage" class="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
      {{ errorMessage }}
    </div>

    <div v-if="isLoading" class="rounded-xl border border-gray-200 bg-white p-10 text-center text-sm font-bold text-gray-400">
      Loading products...
    </div>

    <div v-else-if="filteredProducts.length === 0" class="rounded-xl border border-gray-200 bg-white p-10 text-center text-sm font-bold text-gray-400">
      No products found.
    </div>

    <div v-else class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-5 py-3 text-left text-xs font-black uppercase tracking-widest text-gray-400">Product</th>
            <th class="px-5 py-3 text-left text-xs font-black uppercase tracking-widest text-gray-400">Description</th>
            <th class="px-5 py-3 text-left text-xs font-black uppercase tracking-widest text-gray-400">Price</th>
            <th class="px-5 py-3 text-left text-xs font-black uppercase tracking-widest text-gray-400">Stock</th>
            <th class="px-5 py-3 text-right text-xs font-black uppercase tracking-widest text-gray-400">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr v-for="product in filteredProducts" :key="product.uuid">
            <td class="px-5 py-4 text-sm font-bold text-gray-900">{{ product.name }}</td>
            <td class="max-w-md px-5 py-4 text-sm text-gray-600">{{ product.description || 'No description' }}</td>
            <td class="px-5 py-4 text-sm font-semibold text-gray-900">{{ formatMoney(product.price) }}</td>
            <td class="px-5 py-4">
              <span :class="['rounded-full px-3 py-1 text-xs font-bold', product.stock > 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700']">
                {{ product.stock > 0 ? `${product.stock} available` : 'Out of stock' }}
              </span>
            </td>
            <td class="px-5 py-4">
              <div class="flex justify-end gap-2">
                <button class="rounded-lg bg-gray-50 p-2 text-gray-500 hover:bg-amber-50 hover:text-amber-700" @click="openEditForm(product)">
                  <PencilSquareIcon class="size-5" />
                </button>
                <button class="rounded-lg bg-gray-50 p-2 text-gray-500 hover:bg-red-50 hover:text-red-700" @click="deleteProduct(product)">
                  <TrashIcon class="size-5" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="showProductForm" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div class="w-full max-w-lg rounded-2xl border border-gray-100 bg-white shadow-2xl">
        <div class="flex items-center justify-between border-b border-gray-100 px-6 py-5">
          <h2 class="text-lg font-black text-[#2D2424]">{{ editingProduct ? 'Edit Product' : 'Add Product' }}</h2>
          <button class="text-gray-400 hover:text-gray-700" @click="closeProductForm">
            <XMarkIcon class="size-5" />
          </button>
        </div>

        <form class="space-y-4 p-6" @submit.prevent="saveProduct">
          <div>
            <label class="mb-2 block text-xs font-black uppercase tracking-widest text-gray-400">Product Name</label>
            <input v-model.trim="productForm.name" type="text" required class="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-amber-500" placeholder="Example: Narra Table" />
          </div>

          <div>
            <label class="mb-2 block text-xs font-black uppercase tracking-widest text-gray-400">Description</label>
            <textarea v-model.trim="productForm.description" rows="3" class="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-amber-500" placeholder="Example: Handcrafted solid wood dining table"></textarea>
          </div>

          <div class="grid gap-4 sm:grid-cols-2">
            <div>
              <label class="mb-2 block text-xs font-black uppercase tracking-widest text-gray-400">Price</label>
              <input v-model.number="productForm.price" type="number" min="0" step="0.01" required class="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-amber-500" />
            </div>
            <div>
              <label class="mb-2 block text-xs font-black uppercase tracking-widest text-gray-400">Stock</label>
              <input v-model.number="productForm.stock" type="number" min="0" step="1" required class="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-amber-500" />
            </div>
          </div>

          <div v-if="formError" class="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            {{ formError }}
          </div>

          <div class="flex justify-end gap-3 pt-2">
            <button type="button" class="rounded-xl px-5 py-3 text-sm font-bold text-gray-500 hover:bg-gray-50" @click="closeProductForm">
              Cancel
            </button>
            <button type="submit" class="rounded-xl bg-[#5D4037] px-5 py-3 text-sm font-bold text-white hover:bg-[#4E342E] disabled:opacity-60" :disabled="isSaving">
              {{ isSaving ? 'Saving...' : 'Save Product' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import {
  MagnifyingGlassIcon,
  PencilSquareIcon,
  PlusIcon,
  TrashIcon,
  XMarkIcon,
} from '@heroicons/vue/24/outline'
import { productService } from '~/api/product/ProductService'

const products = ref([])
const search = ref('')
const isLoading = ref(false)
const isSaving = ref(false)
const showProductForm = ref(false)
const editingProduct = ref(null)
const errorMessage = ref('')
const formError = ref('')
const productForm = ref({ name: '', description: '', price: 0, stock: 0 })
let refreshTimer = null

const filteredProducts = computed(() => {
  const keyword = search.value.toLowerCase()

  return products.value.filter((product) => {
    return [product.name, product.description].some((value) => String(value || '').toLowerCase().includes(keyword))
  })
})

onMounted(() => {
  fetchProducts()
  refreshTimer = window.setInterval(() => fetchProducts(true), 10000)
})

onBeforeUnmount(() => {
  if (refreshTimer) {
    window.clearInterval(refreshTimer)
  }
})

async function fetchProducts(silent = false) {
  if (!silent) {
    isLoading.value = true
  }
  errorMessage.value = ''

  try {
    const response = await productService.list()
    products.value = Array.isArray(response?.data) ? response.data.map(normalizeProduct) : []
  } catch (error) {
    if (!silent) {
      errorMessage.value = error.message || 'Unable to load products.'
    }
  } finally {
    if (!silent) {
      isLoading.value = false
    }
  }
}

function normalizeProduct(product) {
  return {
    ...product,
    price: Number(product.price || 0),
    stock: Number(product.stock || 0),
  }
}

function openCreateForm() {
  editingProduct.value = null
  formError.value = ''
  productForm.value = { name: '', description: '', price: 0, stock: 0 }
  showProductForm.value = true
}

function openEditForm(product) {
  editingProduct.value = product
  formError.value = ''
  productForm.value = {
    name: product.name,
    description: product.description || '',
    price: Number(product.price || 0),
    stock: Number(product.stock || 0),
  }
  showProductForm.value = true
}

function closeProductForm() {
  showProductForm.value = false
}

function validateForm() {
  if (/\d/.test(productForm.value.name || '')) {
    return 'Product name cannot contain numbers.'
  }

  if (/\d/.test(productForm.value.description || '')) {
    return 'Description cannot contain numbers.'
  }

  if (Number(productForm.value.price) < 0) {
    return 'Price cannot be negative.'
  }

  if (Number(productForm.value.stock) < 0) {
    return 'Stock cannot be negative.'
  }

  return ''
}

async function saveProduct() {
  const validationMessage = validateForm()

  if (validationMessage) {
    formError.value = validationMessage
    return
  }

  isSaving.value = true
  formError.value = ''

  const payload = {
    name: productForm.value.name,
    description: productForm.value.description,
    price: Number(productForm.value.price),
    stock: Number(productForm.value.stock),
  }

  try {
    const response = editingProduct.value
      ? await productService.update(editingProduct.value.uuid, payload)
      : await productService.create(payload)
    const savedProduct = normalizeProduct(response?.data || response)

    if (editingProduct.value) {
      products.value = products.value.map((product) => product.uuid === savedProduct.uuid ? savedProduct : product)
    } else {
      products.value = [savedProduct, ...products.value]
    }

    closeProductForm()
  } catch (error) {
    formError.value = error.message || 'Unable to save product.'
  } finally {
    isSaving.value = false
  }
}

async function deleteProduct(product) {
  if (!confirm(`Delete ${product.name}?`)) return

  try {
    await productService.delete(product.uuid)
    products.value = products.value.filter((item) => item.uuid !== product.uuid)
  } catch (error) {
    errorMessage.value = error.message || 'Unable to delete product.'
  }
}

function formatMoney(value) {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
  }).format(Number(value || 0))
}
</script>
