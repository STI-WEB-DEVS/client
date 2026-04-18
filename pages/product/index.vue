<template>
  <NuxtLayout>
    <div class="space-y-6">

      <!-- HEADER -->
      <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 class="text-xl font-semibold tracking-tight text-gray-900">
            Products
          </h1>
          <p class="mt-1 text-sm text-gray-500">
            Displaying product records from your API.
          </p>
        </div>

        <button
          type="button"
          @click="showCreateModal = true"
          class="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          <span>+ Create Product</span>
        </button>
      </div>

      <!-- LOADING -->
      <div v-if="pending" class="flex justify-center py-16">
        <div class="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900"></div>
      </div>

      <!-- ERROR -->
      <div v-else-if="error" class="rounded-xl border border-red-200 bg-red-50 p-4">
        <p class="text-sm text-red-700">{{ error.message }}</p>
      </div>

      <!-- TABLE -->
      <div v-else class="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">

            <!-- HEADER -->
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">ID</th>
                <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Name</th>
                <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Price</th>
                <th class="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">Actions</th>
              </tr>
            </thead>

            <!-- BODY -->
            <tbody class="divide-y divide-gray-100 bg-white">

              <tr
                v-for="product in products"
                :key="product.uuid"
                class="transition hover:bg-gray-50"
              >

                <!-- ID -->
                <td class="whitespace-nowrap px-6 py-4 text-sm font-mono text-gray-900">
                  {{ product.id }}
                </td>

                <!-- NAME -->
                <td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                  {{ product.name }}
                </td>

                <!-- PRICE -->
                <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-700">
                  ₱{{ Number(product.price || 0).toFixed(2) }}
                </td>

                <!-- ACTIONS -->
                <td class="whitespace-nowrap px-6 py-4">
                  <div class="flex items-center justify-end gap-2">

                    <button
                      @click="handleView(product)"
                      class="rounded-md border border-gray-200 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      View
                    </button>

                    <button
                      @click="handleEdit(product)"
                      class="rounded-md border border-gray-200 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Edit
                    </button>

                    <button
                      @click="handleDelete(product)"
                      class="rounded-md border border-red-200 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50"
                    >
                      Delete
                    </button>

                  </div>
                </td>

              </tr>

              <!-- EMPTY -->
              <tr v-if="!products?.length">
                <td colspan="4" class="px-6 py-10 text-center text-sm text-gray-500">
                  No products found.
                </td>
              </tr>

            </tbody>

          </table>
        </div>

        <!-- FOOTER -->
        <div class="border-t border-gray-200 bg-gray-50 px-6 py-4">
          <p class="text-sm text-gray-500">
            Showing
            <span class="font-medium text-gray-900">{{ products.length }}</span>
            products
          </p>
        </div>

      </div>

      <!-- MODALS -->
      <CreateProductModal
        :open="showCreateModal"
        @close="showCreateModal = false"
        @created="fetchProducts"
      />

      <EditProductModal
        :open="showEditModal"
        :uuid="selectedUuid"
        @close="showEditModal = false"
        @updated="fetchProducts"
      />

      <DeleteProductModal
        :open="showDeleteModal"
        :uuid="selectedUuid"
        :product-name="selectedName"
        @close="showDeleteModal = false"
        @deleted="fetchProducts"
      />

    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { productService } from '~/api/product/ProductService'
import CreateProductModal from '~/components/product/CreateProductModal.vue'
import EditProductModal from '~/components/product/EditProductModal.vue'
import DeleteProductModal from '~/components/product/DeleteProductModal.vue'

const router = useRouter()

const products = ref<any[]>([])
const pending = ref(true)
const error = ref<any>(null)

const showCreateModal = ref(false)
const showEditModal = ref(false)
const showDeleteModal = ref(false)

const selectedUuid = ref('')
const selectedName = ref('')

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

onMounted(fetchProducts)

/* VIEW */
const handleView = (product: any) => {
  router.push(`/product/${product.uuid}`)
}

/* EDIT */
const handleEdit = (product: any) => {
  selectedUuid.value = product.uuid
  showEditModal.value = true
}

/* DELETE */
const handleDelete = (product: any) => {
  selectedUuid.value = product.uuid
  selectedName.value = product.name
  showDeleteModal.value = true
}
</script>