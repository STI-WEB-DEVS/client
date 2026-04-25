<template>
    <div class="space-y-6">
      <div class="flex justify-between items-center">
        <h1 class="text-xl font-semibold">Products</h1>
        <button @click="handleCreate" class="bg-gray-900 text-white px-4 py-2 rounded">
          Create Product
        </button>
      </div>

      <!-- Loading -->
      <div v-if="pending" class="py-10 text-center">Loading...</div>

      <!-- Error -->
      <div v-else-if="error" class="text-red-600">{{ error.message }}</div>

      <!-- Table -->
      <div v-else class="overflow-hidden rounded border border-gray-200 bg-white shadow-sm">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500">ID</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500">Name</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500">Price</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-for="product in products?.data" :key="product.id">
              <td class="px-6 py-4">{{ product.id }}</td>
              <td class="px-6 py-4">{{ product.name }}</td>
              <td class="px-6 py-4">{{ product.price }}</td>
              <td class="px-6 py-4 text-right">
                <button @click="handleView(product)" class="px-3 py-1 border rounded">View</button>
                <button @click="handleEdit(product)" class="px-3 py-1 border rounded">Edit</button>
                <button @click="handleDelete(product)" class="px-3 py-1 border rounded text-red-600">Delete</button>
              </td>
            </tr>
            <tr v-if="!products?.data?.length">
              <td colspan="4" class="px-6 py-10 text-center text-gray-500">No products found.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Modals -->
      <ProductCreateModal
        :open="isCreateModalOpen"
        @close="isCreateModalOpen=false"
        @created="onCreated"
      />

      <ProductEditModal
        :open="isEditModalOpen"
        :product="selectedProduct"
        @close="isEditModalOpen=false"
        @updated="onUpdated"
      />

      <ProductDeleteModal
        :open="isDeleteModalOpen"
        :product="selectedProduct"
        @close="isDeleteModalOpen=false"
        @deleted="onDeleted"
      />

      <!-- Feedback Modal -->
      <FeedbackModal
        :open="isFeedbackModalOpen"
        :message="feedbackMessage"
        @close="closeFeedbackModal"
      />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { productService } from '~/api/product/ProductService'

// Import modals
import ProductCreateModal from '~/components/ProductCreateModal.vue'
import ProductEditModal from '~/components/ProductEditModal.vue'
import ProductDeleteModal from '~/components/ProductDeleteModal.vue'
import FeedbackModal from '~/components/FeedbackModal.vue'

const router = useRouter()

const products = ref<any>(null)
const pending = ref(true)
const error = ref<any>(null)

// Modal states
const isCreateModalOpen = ref(false)
const isEditModalOpen = ref(false)
const isDeleteModalOpen = ref(false)
const selectedProduct = ref<any>(null)

// Feedback modal state
const isFeedbackModalOpen = ref(false)
const feedbackMessage = ref('')

onMounted(async () => {
  await refreshList()
})

const refreshList = async () => {
  pending.value = true
  error.value = null
  try {
    products.value = await productService.list()
  } catch (err: any) {
    error.value = err
  } finally {
    pending.value = false
  }
}

const handleCreate = () => {
  isCreateModalOpen.value = true
}

const handleView = (product: any) => {
  router.push(`/product/${product.uuid}`)
}

const handleEdit = (product: any) => {
  selectedProduct.value = product
  isEditModalOpen.value = true
}

const handleDelete = (product: any) => {
  selectedProduct.value = product
  isDeleteModalOpen.value = true
}

// Feedback modal helpers
const openFeedbackModal = (message: string) => {
  feedbackMessage.value = message
  isFeedbackModalOpen.value = true
}

const closeFeedbackModal = () => {
  isFeedbackModalOpen.value = false
  feedbackMessage.value = ''
}

// CRUD event handlers from modals
const onCreated = async () => {
  await refreshList()
  openFeedbackModal('Product created successfully!')
}

const onUpdated = async () => {
  await refreshList()
  openFeedbackModal('Product updated successfully!')
}

const onDeleted = async () => {
  await refreshList()
  openFeedbackModal('Product deleted successfully!')
}
</script>
