<template>
  <div class="space-y-6 bg-[#F8FAFC] min-h-screen p-6">

    <!-- HEADER -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">

      <div>
        <h1
          class="text-4xl font-extrabold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent"
        >
          Products
        </h1>

        <p class="text-slate-500 mt-2">
        </p>
      </div>

      <button
        @click="openAddModal"
        class="px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
      >
        + Add Product
      </button>

    </div>

    <!-- SEARCH -->
    <div
      class="bg-white/80 backdrop-blur-md rounded-3xl border border-white shadow-xl p-5 mb-8"
    >
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search products..."
        class="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
      />
    </div>

    <!-- LOADING -->
    <div
      v-if="loading"
      class="bg-white rounded-3xl shadow-xl border border-slate-100 p-16 text-center"
    >
      <div
        class="animate-spin h-12 w-12 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto"
      ></div>

      <p class="text-slate-500 mt-5 font-medium">
        Loading products...
      </p>
    </div>

    <!-- ERROR -->
    <div
      v-else-if="error"
      class="bg-rose-50 border border-rose-200 rounded-3xl p-6 shadow-sm"
    >
      <p class="text-rose-600 font-semibold">
        Error loading products
      </p>

      <p class="text-rose-500 text-sm mt-1">
        {{ error }}
      </p>
    </div>

    <!-- PRODUCT TABLE -->
    <div
      v-else
      class="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden"
    >

      <div class="overflow-x-auto">

        <table class="w-full">

          <!-- TABLE HEADER -->
          <thead
            class="bg-gradient-to-r from-indigo-50 to-violet-50 text-slate-600 text-xs uppercase tracking-wider"
          >
            <tr>
              <th class="text-left px-6 py-5 font-semibold">
                Product
              </th>

              <th class="text-left px-6 py-5 font-semibold">
                Price
              </th>

              <th class="text-left px-6 py-5 font-semibold">
                Created
              </th>

              <th class="text-left px-6 py-5 font-semibold">
                Actions
              </th>
            </tr>
          </thead>

          <!-- TABLE BODY -->
          <tbody>

            <tr
              v-for="product in filteredProducts"
              :key="product.uuid"
              class="border-t border-slate-100 hover:bg-indigo-50/50 transition-all duration-200"
            >

              <!-- PRODUCT -->
              <td class="px-6 py-5">

                <div class="flex items-center gap-4">

                  <div
                    class="h-12 w-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white flex items-center justify-center font-bold shadow-md"
                  >
                    {{ product.name.charAt(0).toUpperCase() }}
                  </div>

                  <div>
                    <p class="font-semibold text-slate-800">
                      {{ product.name }}
                    </p>

                    <p class="text-xs text-slate-400">
                      Product Item
                    </p>
                  </div>

                </div>

              </td>

              <!-- PRICE -->
              <td class="px-6 py-5">
                <span
                  class="px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-sm font-semibold"
                >
                  ₱ {{ product.price }}
                </span>
              </td>

              <!-- DATE -->
              <td class="px-6 py-5 text-slate-500 text-sm">
                {{ formatDate(product.created_at) }}
              </td>

              <!-- ACTIONS -->
              <td class="px-6 py-5">

                <div class="flex flex-wrap gap-2">

                  <button
                    @click="openViewModal(product)"
                    class="px-3 py-2 rounded-xl bg-indigo-50 text-indigo-600 font-medium hover:bg-indigo-100 transition"
                  >
                    View
                  </button>

                  <button
                    @click="openEditModal(product)"
                    class="px-3 py-2 rounded-xl bg-emerald-50 text-emerald-600 font-medium hover:bg-emerald-100 transition"
                  >
                    Edit
                  </button>

                  <button
                    @click="openDeleteConfirm(product)"
                    class="px-3 py-2 rounded-xl bg-rose-50 text-rose-600 font-medium hover:bg-rose-100 transition"
                  >
                    Delete
                  </button>

                </div>

              </td>

            </tr>

          </tbody>

        </table>

      </div>

      <!-- EMPTY STATE -->
      <div
        v-if="filteredProducts.length === 0"
        class="py-20 text-center"
      >

        <div
          class="w-20 h-20 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center"
        >
          <svg
            class="w-10 h-10 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M20 13V7a2 2 0 00-2-2h-3V3H9v2H6a2 2 0 00-2 2v6m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0H4"
            />
          </svg>
        </div>

        <h3 class="text-lg font-semibold text-slate-700">
          No Products Found
        </h3>

        <p class="text-slate-500 mt-2">
          Try adjusting your search or add a new product.
        </p>

      </div>

      <!-- FOOTER -->
      <div
        class="px-6 py-5 border-t border-slate-100 bg-slate-50 flex items-center justify-between"
      >

        <span class="text-sm text-slate-500">
          Showing
          <span class="font-semibold text-slate-700">
            {{ filteredProducts.length }}
          </span>
          of
          <span class="font-semibold text-slate-700">
            {{ products.length }}
          </span>
          products
        </span>

      </div>

    </div>

    <!-- ADD / EDIT MODAL -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <div class="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden">

        <div class="px-6 py-5 border-b flex justify-between items-center">
          <h2 class="text-xl font-bold text-slate-800">
            {{ modalMode === 'add' ? 'Add Product' : 'Edit Product' }}
          </h2>

          <button
            @click="closeModal"
            class="text-slate-400 hover:text-slate-700"
          >
            ✕
          </button>
        </div>

        <form @submit.prevent="saveProduct" class="p-6 space-y-5">

          <div>
            <label class="block text-sm font-medium text-slate-600 mb-2">
              Product Name
            </label>

            <input
              v-model="formData.name"
              type="text"
              required
              class="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-600 mb-2">
              Price
            </label>

            <input
              v-model="formData.price"
              type="number"
              required
              class="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div class="flex gap-3 pt-2">

            <button
              type="button"
              @click="closeModal"
              class="flex-1 py-3 rounded-2xl border border-slate-200 hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              :disabled="saving"
              class="flex-1 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold"
            >
              {{ saving ? 'Saving...' : 'Save Product' }}
            </button>

          </div>

        </form>

      </div>
    </div>

    <!-- VIEW MODAL -->
    <div
      v-if="showViewModal"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >

      <div class="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden">

        <div class="px-6 py-5 border-b flex justify-between items-center">
          <h2 class="text-xl font-bold text-slate-800">
            Product Details
          </h2>

          <button
            @click="closeViewModal"
            class="text-slate-400 hover:text-slate-700"
          >
            ✕
          </button>
        </div>

        <div
          v-if="selectedProduct"
          class="p-6"
        >

          <div class="flex items-center gap-4 mb-6">

            <div
              class="h-16 w-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white flex items-center justify-center text-xl font-bold"
            >
              {{ selectedProduct.name.charAt(0).toUpperCase() }}
            </div>

            <div>
              <h3 class="font-bold text-slate-800 text-lg">
                {{ selectedProduct.name }}
              </h3>

              <p class="text-emerald-600 font-semibold">
                ₱ {{ selectedProduct.price }}
              </p>
            </div>

          </div>

          <div class="space-y-4">

            <div>
              <p class="text-sm text-slate-500">Created Date</p>
              <p class="font-medium text-slate-800">
                {{ formatDate(selectedProduct.created_at) }}
              </p>
            </div>

          </div>

          <button
            @click="closeViewModal"
            class="w-full mt-6 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 font-medium"
          >
            Close
          </button>

        </div>

      </div>

    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { productService } from '~/api/product/ProductService'

const searchQuery = ref('')
const products = ref<any[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

// Modal
const showModal = ref(false)
const showViewModal = ref(false)
const modalMode = ref<'add' | 'edit'>('add')
const saving = ref(false)

// Selected
const selectedProduct = ref<any>(null)

// Form
const formData = ref({
    name: '',
    price: ''
})

// Computed
const filteredProducts = computed(() => {
    return products.value.filter(p =>
        searchQuery.value === '' ||
        p.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
})

// Fetch
const fetchProducts = async () => {
    loading.value = true
    try {
        const response = await productService.list({ per_page: 100 })
        products.value = response.data ?? response
    } catch (err: any) {
        error.value = err.message
    } finally {
        loading.value = false
    }
}

// Modal
const openAddModal = () => {
    modalMode.value = 'add'
    formData.value = { name: '', price: '' }
    showModal.value = true
}

const openEditModal = (product: any) => {
    modalMode.value = 'edit'
    selectedProduct.value = product
    formData.value = {
        name: product.name,
        price: product.price
    }
    showModal.value = true
}

const closeModal = () => {
    showModal.value = false
    selectedProduct.value = null
}

// Save
const saveProduct = async () => {
    saving.value = true
    try {
        if (modalMode.value === 'add') {
            await productService.create(formData.value)
        } else {
            await productService.update(selectedProduct.value.uuid, formData.value)
        }

        closeModal()
        await fetchProducts()
    } finally {
        saving.value = false
    }
}

// Delete
const openDeleteConfirm = async (product: any) => {
    if (!confirm(`Delete ${product.name}?`)) return

    await productService.delete(product.uuid)
    await fetchProducts()
}

// View
const openViewModal = (product: any) => {
    selectedProduct.value = product
    showViewModal.value = true
}

const closeViewModal = () => {
    showViewModal.value = false
    selectedProduct.value = null
}

// Utils
const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })

onMounted(fetchProducts)
</script>