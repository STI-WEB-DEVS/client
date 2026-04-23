<template>
  <NuxtLayout>
    <div class="space-y-6">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 class="text-xl font-semibold tracking-tight text-gray-900">Products</h1>
          <p class="mt-1 text-sm text-gray-500">Displaying product records from your API.</p>
        </div>
        <button @click="openCreateModal" class="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800">
          <PlusIcon class="h-4 w-4" />
          <span>Create Product</span>
        </button>
      </div>

      <div v-if="pending" class="flex justify-center py-16">
        <div class="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900"></div>
      </div>

      <div v-else class="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">ID</th>
                <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Name</th>
                <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Price</th>
                <th class="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 bg-white">
              <tr v-for="product in products" :key="product.id">
                <td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">{{ product.id }}</td>
                <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-700">{{ product.name }}</td>
                <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500">₱{{ formatPrice(product.price) }}</td>
                <td class="whitespace-nowrap px-6 py-4">
                  <div class="flex items-center justify-end gap-2">
                    <button @click="openEditModal(product)" class="inline-flex items-center gap-2 rounded-md border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
                      <PencilSquareIcon class="h-4 w-4" />
                      <span>Edit</span>
                    </button>
                    <button @click="deleteProduct(product)" class="inline-flex items-center gap-2 rounded-md border border-red-200 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50">
                      <TrashIcon class="h-4 w-4" />
                      <span>Delete</span>
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="!products?.length">
                <td colspan="4" class="px-6 py-10 text-center text-sm text-gray-500">No products found.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="border-t border-gray-200 bg-gray-50 px-6 py-4">
          <p class="text-sm text-gray-500">
            Showing <span class="font-medium">{{ meta?.from ?? 0 }}</span> to
            <span class="font-medium">{{ meta?.to ?? 0 }}</span> of
            <span class="font-medium">{{ meta?.total ?? 0 }}</span> products
          </p>
        </div>
      </div>

      <!-- Create/Edit Modal -->
      <div v-if="showModal" class="fixed inset-0 z-50 overflow-y-auto">
        <div class="flex min-h-screen items-center justify-center p-4">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75" @click="closeModal"></div>
          <div class="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 class="text-lg font-semibold mb-4">{{ isEditing ? 'Edit Product' : 'Create Product' }}</h3>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">Name</label>
                <input v-model="form.name" type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Price</label>
                <input v-model="form.price" type="number" step="0.01" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
              </div>
            </div>
            <div class="mt-6 flex justify-end gap-3">
              <button @click="closeModal" class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">Cancel</button>
              <button @click="saveProduct" class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">Save</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Delete Confirmation Modal -->
      <div v-if="showDeleteModal" class="fixed inset-0 z-50 overflow-y-auto">
        <div class="flex min-h-screen items-center justify-center p-4">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75" @click="showDeleteModal = false"></div>
          <div class="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 class="text-lg font-semibold mb-4">Delete Product</h3>
            <p class="text-sm text-gray-500 mb-4">Are you sure you want to delete "{{ productToDelete?.name }}"?</p>
            <div class="flex justify-end gap-3">
              <button @click="showDeleteModal = false" class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">Cancel</button>
              <button @click="confirmDelete" class="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700">Delete</button>
            </div>
          </div>
        </div>
      </div>

      <FeedbackModal :open="isFeedbackModalOpen" :message="feedbackMessage" @close="closeFeedbackModal" />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { PlusIcon, PencilSquareIcon, TrashIcon } from '@heroicons/vue/24/outline'
import { productService } from '~/api/product/ProductService'

const products = ref([])
const meta = ref({})
const pending = ref(true)
const showModal = ref(false)
const showDeleteModal = ref(false)
const isEditing = ref(false)
const editingUuid = ref(null)
const productToDelete = ref(null)
const form = ref({ name: '', price: '' })
const isFeedbackModalOpen = ref(false)
const feedbackMessage = ref('')

const formatPrice = (price: string | number) => {
  return Number(price).toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

const fetchProducts = async () => {
  pending.value = true
  try {
    const response = await productService.list()
    products.value = response.data || []
    meta.value = response.meta || {}
    console.log('Products loaded:', products.value)
  } catch (error: any) {
    console.error('Error fetching products:', error)
  } finally {
    pending.value = false
  }
}

const openCreateModal = () => {
  isEditing.value = false
  editingUuid.value = null
  form.value = { name: '', price: '' }
  showModal.value = true
}

const openEditModal = (product: any) => {
  console.log('Edit - Using UUID:', product.uuid)
  isEditing.value = true
  editingUuid.value = product.uuid
  form.value = { name: product.name, price: product.price }
  showModal.value = true
}

const saveProduct = async () => {
  try {
    if (isEditing.value) {
      console.log('Update - Sending UUID:', editingUuid.value)
      await productService.update(editingUuid.value, form.value)
      feedbackMessage.value = 'Product updated successfully!'
    } else {
      await productService.create(form.value)
      feedbackMessage.value = 'Product created successfully!'
    }
    closeModal()
    await fetchProducts()
    isFeedbackModalOpen.value = true
    setTimeout(() => { isFeedbackModalOpen.value = false }, 3000)
  } catch (error: any) {
    console.error('Save error:', error)
    feedbackMessage.value = error.message || 'Error saving product'
    isFeedbackModalOpen.value = true
  }
}

const deleteProduct = (product: any) => {
  console.log('Delete - Product:', product)
  console.log('Delete - Using UUID:', product.uuid)
  productToDelete.value = product
  showDeleteModal.value = true
}

const confirmDelete = async () => {
  console.log('Confirm delete - UUID:', productToDelete.value.uuid)
  try {
    await productService.delete(productToDelete.value.uuid)
    feedbackMessage.value = 'Product deleted successfully!'
    showDeleteModal.value = false
    await fetchProducts()
    isFeedbackModalOpen.value = true
    setTimeout(() => { isFeedbackModalOpen.value = false }, 3000)
  } catch (error: any) {
    console.error('Delete error:', error)
    feedbackMessage.value = error.message || 'Error deleting product'
    isFeedbackModalOpen.value = true
  }
}

const closeModal = () => {
  showModal.value = false
  form.value = { name: '', price: '' }
  editingUuid.value = null
  isEditing.value = false
}

const closeFeedbackModal = () => {
  isFeedbackModalOpen.value = false
}

onMounted(() => {
  const token = localStorage.getItem('_token');
  if (!token) {
    navigateTo('/');
  } else {
    fetchProducts();
  }
});
</script>