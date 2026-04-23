<template>
  <NuxtLayout>
    <div class="space-y-6">
      <PageHeader 
        title="Products" 
        description="Displaying product records from your API."
        entity-name="Product"
        :show-create-button="true"
        @create="openCreateModal"
      />

      <div v-if="pending" class="flex justify-center py-16">
        <div class="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900"></div>
      </div>

      <ProductTable 
        v-else
        :products="products"
        :meta="meta"
        @edit="openEditModal"
        @delete="deleteProduct"
      />

      <!-- Create/Edit Modal -->
      <div v-if="showModal" class="fixed inset-0 z-50 overflow-y-auto">
        <div class="flex min-h-screen items-center justify-center p-4">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75" @click="closeModal"></div>
          <div class="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 class="text-lg font-semibold mb-4">{{ isEditing ? 'Edit Product' : 'Create Product' }}</h3>
            <ProductForm 
              :initial-data="form" 
              :is-edit="isEditing"
              @submit="saveProduct"
              @cancel="closeModal"
            />
          </div>
        </div>
      </div>

      <DeleteModal 
        :show="showDeleteModal"
        item-type="Product"
        :item-name="productToDelete?.name"
        @close="showDeleteModal = false"
        @confirm="confirmDelete"
      />

      <FeedbackModal :open="isFeedbackModalOpen" :message="feedbackMessage" @close="closeFeedbackModal" />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { productService } from '~/api/product/ProductService'
import PageHeader from '~/components/PageHeader.vue'
import ProductTable from '~/components/ProductTable.vue'
import ProductForm from '~/components/ProductForm.vue'
import DeleteModal from '~/components/DeleteModal.vue'

definePageMeta({
  middleware: 'auth'
})

const products = ref([])
const meta = ref({})
const pending = ref(true)
const showModal = ref(false)
const showDeleteModal = ref(false)
const isEditing = ref(false)
const editingUuid = ref(null)
const productToDelete = ref(null)
const form = ref({ name: '', price: 0 })
const isFeedbackModalOpen = ref(false)
const feedbackMessage = ref('')

const fetchProducts = async () => {
  pending.value = true
  try {
    const response = await productService.list()
    products.value = response.data || []
    meta.value = response.meta || {}
  } catch (error: any) {
    console.error('Error fetching products:', error)
  } finally {
    pending.value = false
  }
}

const openCreateModal = () => {
  isEditing.value = false
  editingUuid.value = null
  form.value = { name: '', price: 0 }
  showModal.value = true
}

const openEditModal = (product: any) => {
  isEditing.value = true
  editingUuid.value = product.uuid
  form.value = { name: product.name, price: product.price }
  showModal.value = true
}

const saveProduct = async (data: any) => {
  try {
    if (isEditing.value) {
      await productService.update(editingUuid.value, data)
      feedbackMessage.value = 'Product updated successfully!'
    } else {
      await productService.create(data)
      feedbackMessage.value = 'Product created successfully!'
    }
    closeModal()
    await fetchProducts()
    isFeedbackModalOpen.value = true
    setTimeout(() => { isFeedbackModalOpen.value = false }, 3000)
  } catch (error: any) {
    feedbackMessage.value = error.message || 'Error saving product'
    isFeedbackModalOpen.value = true
  }
}

const deleteProduct = (product: any) => {
  productToDelete.value = product
  showDeleteModal.value = true
}

const confirmDelete = async () => {
  try {
    await productService.delete(productToDelete.value.uuid)
    feedbackMessage.value = 'Product deleted successfully!'
    showDeleteModal.value = false
    await fetchProducts()
    isFeedbackModalOpen.value = true
    setTimeout(() => { isFeedbackModalOpen.value = false }, 3000)
  } catch (error: any) {
    feedbackMessage.value = error.message || 'Error deleting product'
    isFeedbackModalOpen.value = true
  }
}

const closeModal = () => {
  showModal.value = false
  form.value = { name: '', price: 0 }
  editingUuid.value = null
  isEditing.value = false
}

const closeFeedbackModal = () => {
  isFeedbackModalOpen.value = false
}

onMounted(() => {
  fetchProducts()
})
</script>