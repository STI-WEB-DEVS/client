<template>
    <div class="space-y-6">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 class="text-xl font-semibold tracking-tight text-gray-900">Products</h1>
          <p class="mt-1 text-sm text-gray-500">Displaying product records from your API.</p>
        </div>

        <button
          type="button"
          @click="openModal('create')"
          class="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          <span>+ Create Product</span>
        </button>
      </div>

      <div v-if="pending" class="flex justify-center py-16">
        <div class="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900"></div>
      </div>

      <div v-else-if="error" class="rounded-xl border border-red-200 bg-red-50 p-4">
        <p class="text-sm text-red-700">{{ error.message }}</p>
      </div>

      <div v-else class="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-500">Name</th>
                <th class="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-500">Price</th>
                <th class="px-6 py-4 text-right text-xs font-semibold uppercase text-gray-500">Actions</th>
              </tr>
            </thead>

            <tbody class="divide-y divide-gray-100 bg-white">
              <tr v-for="product in products" :key="product.uuid" class="transition hover:bg-gray-50">
                <td class="px-6 py-4 text-sm font-medium text-gray-900">{{ product.name || product.title }}</td>
                <td class="px-6 py-4 text-sm text-gray-700">₱{{ Number(product.price || 0).toFixed(2) }}</td>
                <td class="px-6 py-4 text-right space-x-2">
                  <button @click="router.push(`/product/${product.uuid}`)" class="text-gray-600 hover:text-gray-900 text-sm font-medium">View</button>
                  <button @click="openModal('edit', product)" class="text-blue-600 hover:text-blue-800 text-sm font-medium">Edit</button>
                  <button @click="openModal('delete', product)" class="text-red-600 hover:text-red-800 text-sm font-medium">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="border-t border-gray-200 bg-gray-50 px-6 py-4">
          <p class="text-sm text-gray-500">
            Showing <span class="font-medium text-gray-900">{{ products.length }}</span> products
          </p>
        </div>
      </div>

      <ProductModal
        :open="modal.show"
        :mode="modal.mode"
        :uuid="modal.selected?.uuid"
        :product-name="modal.selected?.name || modal.selected?.title"
        @close="modal.show = false"
        @success="fetchProducts"
      />
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { productService } from '~/api/product/ProductService'
import ProductModal from '~/components/product/ProductModal.vue'

const router = useRouter()
const products = ref<any[]>([])
const pending = ref(true)
const error = ref<any>(null)

// Single reactive object for modal state
const modal = reactive({
  show: false,
  mode: 'create' as 'create' | 'edit' | 'delete',
  selected: null as any
})

const fetchProducts = async () => {
  pending.value = true
  error.value = null
  try {
    const res = await productService.list()
    products.value = res.data ?? res
  } catch (err: any) {
    error.value = { message: 'Failed to load products.' }
  } finally {
    pending.value = false
  }
}

const openModal = (mode: 'create' | 'edit' | 'delete', product: any = null) => {
  modal.mode = mode
  modal.selected = product
  modal.show = true
}

onMounted(fetchProducts)
</script>