<template>

    <div class="space-y-6">
      <div class="flex flex-col gap-4 rounded-[1.5rem] border border-stone-200 bg-white p-6 shadow-sm shadow-stone-950/5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 class="text-2xl font-bold tracking-tight text-stone-950">Products</h1>
          <p class="mt-1 text-sm text-stone-500">Displaying product records from your API.</p>
        </div>

        <button
          type="button"
          @click="handleCreate"
          class="inline-flex items-center justify-center gap-2 rounded-full bg-stone-950 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-stone-950/10 transition hover:-translate-y-0.5 hover:bg-stone-800"
        >
          <PlusIcon class="h-4 w-4" />
          <span>Create Product</span>
        </button>
      </div>

      <!-- Loading -->
      <div v-if="pending" class="flex justify-center py-16">
        <div class="h-8 w-8 animate-spin rounded-full border-2 border-stone-200 border-t-amber-600"></div>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="rounded-xl border border-red-200 bg-red-50 p-4">
        <p class="text-sm text-red-700">{{ error.message }}</p>
      </div>

      <!-- Table -->
      <div v-else class="overflow-hidden rounded-[1.5rem] border border-stone-200 bg-white shadow-sm shadow-stone-950/5">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-stone-200">
            <thead class="bg-stone-50">
              <tr>
                <th class="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-stone-500">Name</th>
                <th class="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-stone-500">Price</th>
                <th class="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-stone-500">Created At</th>
                <th class="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-stone-500">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-stone-100 bg-white">
              <tr v-for="product in products?.data" :key="product.uuid" class="transition hover:bg-stone-50/80">
                <td class="px-6 py-4 text-sm font-semibold text-stone-950">{{ product.name }}</td>
                <td class="px-6 py-4 text-sm text-stone-700">{{ product.price }}</td>
                <td class="px-6 py-4 text-sm text-stone-500">{{ formatDate(product.created_at) }}</td>
                <td class="px-6 py-4">
                  <div class="flex items-center justify-end gap-2">
                    <button @click="handleView(product)" class="inline-flex items-center gap-2 rounded-full border border-stone-200 px-3 py-1.5 text-sm font-semibold text-stone-700 transition hover:bg-stone-50">
                      <EyeIcon class="h-4 w-4" /> View
                    </button>
                    <button @click="handleEdit(product)" class="inline-flex items-center gap-2 rounded-full border border-stone-200 px-3 py-1.5 text-sm font-semibold text-stone-700 transition hover:bg-stone-50">
                      <PencilSquareIcon class="h-4 w-4" /> Edit
                    </button>
                    <button @click="handleDelete(product)" class="inline-flex items-center gap-2 rounded-full border border-rose-200 px-3 py-1.5 text-sm font-semibold text-rose-600 transition hover:bg-rose-50">
                      <TrashIcon class="h-4 w-4" /> Delete
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="!products?.data?.length">
                <td colspan="4" class="px-6 py-10 text-center text-sm text-gray-500">No products found.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Product modal -->
      <CreateProductModal
        :open="isCreateModalOpen"
        :product="selectedProduct"
        @close="isCreateModalOpen = false"
        @saved="onProductSaved"
      />

      <ConfirmModal
        :open="isConfirmModalOpen"
        :title="confirmTitle"
        :message="confirmMessage"
        @close="closeConfirmModal"
        @confirm="deleteProduct"
      />

      <FeedbackModal
        :open="Boolean(feedbackMessage)"
        :message="feedbackMessage"
        @close="closeFeedbackModal"
      />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { PlusIcon, EyeIcon, PencilSquareIcon, TrashIcon } from '@heroicons/vue/24/outline'
import { productService } from '~/api/product/ProductService'
import CreateProductModal from '~/components/CreateProductModal.vue'
import ConfirmModal from '~/components/ConfirmModal.vue'
import FeedbackModal from '~/components/FeedbackModal.vue'

const router = useRouter()
const products = ref<any>(null)
const pending = ref(true)
const error = ref<any>(null)

const isCreateModalOpen = ref(false)
const selectedProduct = ref<any>(null)
const isConfirmModalOpen = ref(false)
const feedbackMessage = ref('')
const confirmTitle = ref('')
const confirmMessage = ref('')

const fetchProducts = async () => {
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
onMounted(fetchProducts)

const handleCreate = () => { selectedProduct.value = null; isCreateModalOpen.value = true }
const handleView = (product: any) => { router.push(`/admin/products/${product.uuid}`) }
const handleEdit = (product: any) => { selectedProduct.value = product; isCreateModalOpen.value = true }
const handleDelete = (product: any) => {
  selectedProduct.value = product
  confirmTitle.value = 'Delete product'
  confirmMessage.value = `Are you sure you want to delete ${product.name}? This cannot be undone.`
  isConfirmModalOpen.value = true
}
const closeConfirmModal = () => { isConfirmModalOpen.value = false; selectedProduct.value = null }
const deleteProduct = async () => {
  if (!selectedProduct.value?.uuid) return
  isConfirmModalOpen.value = false
  pending.value = true
  try {
    await productService.delete(selectedProduct.value.uuid)
    await fetchProducts()
    feedbackMessage.value = 'Product deleted successfully.'
  } catch (err: any) {
    error.value = err
  } finally {
    pending.value = false
    selectedProduct.value = null
  }
}
const onProductSaved = async () => {
  isCreateModalOpen.value = false
  await fetchProducts()
  feedbackMessage.value = selectedProduct.value ? 'Product updated successfully.' : 'Product created successfully.'
}
const closeFeedbackModal = () => { feedbackMessage.value = '' }

const formatDate = (date: string) => {
  if (!date) return ''

  return new Date(date).toLocaleDateString('en-PH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
</script>
