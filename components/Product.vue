<template>
  <div class="p-8 bg-[#0f172a] min-h-screen font-sans text-white">

    <!-- HEADER -->
    <div class="flex justify-between items-end mb-10 border-b border-white/10 pb-8">
      <div>
        <p class="text-teal-400 text-xs font-black uppercase tracking-widest mb-2">Sutura TMS</p>
        <h1 class="text-2xl font-bold">Products Management</h1>
        <p class="text-sm text-slate-400">Manage and track all your products</p>
      </div>

      <button
        @click="openAddModal"
        class="bg-teal-500 hover:bg-teal-400 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-teal-900/30 transition">
        + Add Product
      </button>
    </div>

    <!-- SEARCH -->
    <div class="mb-8 bg-white/5 border border-white/10 rounded-2xl p-5">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search products..."
        class="w-full bg-transparent outline-none text-sm text-white placeholder-slate-500"
      />
    </div>

    <!-- LOADING -->
    <div v-if="loading" class="text-center py-16 bg-white/5 border border-white/10 rounded-2xl">
      <div class="animate-spin w-10 h-10 border-2 border-teal-400 border-t-transparent rounded-full mx-auto"></div>
      <p class="text-slate-400 mt-4 text-sm">Loading products...</p>
    </div>

    <!-- ERROR -->
    <div v-else-if="error" class="bg-red-400/10 border border-red-400/20 rounded-2xl p-6">
      <p class="text-red-400 font-bold">Error loading products</p>
      <p class="text-sm text-red-300">{{ error }}</p>
    </div>

    <!-- TABLE -->
    <div v-else class="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
      <table class="w-full">

        <thead class="bg-white/5 border-b border-white/10">
          <tr class="text-left text-xs uppercase text-slate-400">
            <th class="p-4">Product</th>
            <th class="p-4">Price</th>
            <th class="p-4">Created</th>
            <th class="p-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="product in filteredProducts"
            :key="product.uuid"
            class="border-b border-white/5 hover:bg-white/5 transition">

            <!-- PRODUCT -->
            <td class="p-4 flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold">
                {{ product.name.charAt(0) }}
              </div>
              <div>
                <p class="font-semibold text-white text-sm">{{ product.name }}</p>
              </div>
            </td>

            <!-- PRICE -->
            <td class="p-4 text-slate-300 text-sm">
              ₱ {{ product.price }}
            </td>

            <!-- DATE -->
            <td class="p-4 text-slate-400 text-sm">
              {{ formatDate(product.created_at) }}
            </td>

            <!-- ACTIONS -->
            <td class="p-4 flex gap-3 text-sm">

              <button @click="openViewModal(product)"
                class="text-teal-400 hover:text-teal-300 font-semibold">
                View
              </button>

              <button @click="openEditModal(product)"
                class="text-blue-400 hover:text-blue-300 font-semibold">
                Edit
              </button>

              <button @click="openDeleteConfirm(product)"
                class="text-red-400 hover:text-red-300 font-semibold">
                Delete
              </button>

            </td>

          </tr>
        </tbody>

      </table>

      <div v-if="filteredProducts.length === 0" class="p-10 text-center text-slate-500">
        No products found
      </div>
    </div>

    <!-- ================= MODAL (ADD / EDIT) ================= -->
    <div v-if="showModal" class="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

      <div class="bg-[#0f172a] border border-white/10 rounded-2xl w-full max-w-md shadow-2xl">

        <!-- HEADER -->
        <div class="flex justify-between items-center p-5 border-b border-white/10">
          <h2 class="font-bold text-white text-lg">
            {{ modalMode === 'add' ? 'Add Product' : 'Edit Product' }}
          </h2>

          <button @click="closeModal" class="text-slate-400 hover:text-white">✕</button>
        </div>

        <!-- FORM -->
        <form @submit.prevent="saveProduct" class="p-6 space-y-4">

          <div>
            <label class="text-xs text-slate-400">Product Name</label>
            <input
              v-model="formData.name"
              type="text"
              class="w-full mt-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white outline-none focus:border-teal-400"
              required
            />
          </div>

          <div>
            <label class="text-xs text-slate-400">Price</label>
            <input
              v-model="formData.price"
              type="number"
              class="w-full mt-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white outline-none focus:border-teal-400"
              required
            />
          </div>

          <!-- BUTTONS -->
          <div class="flex gap-3 pt-4">

            <button
              type="button"
              @click="closeModal"
              class="flex-1 bg-white/5 border border-white/10 rounded-xl py-2 text-slate-300 hover:bg-white/10">
              Cancel
            </button>

            <button
              type="submit"
              :disabled="saving"
              class="flex-1 bg-teal-500 hover:bg-teal-400 rounded-xl py-2 font-bold text-white shadow-lg shadow-teal-900/30">
              {{ saving ? 'Saving...' : 'Save' }}
            </button>

          </div>

        </form>

      </div>

    </div>

    <!-- ================= VIEW MODAL ================= -->
    <div v-if="showViewModal" class="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

      <div class="bg-[#0f172a] border border-white/10 rounded-2xl w-full max-w-md">

        <div class="flex justify-between items-center p-5 border-b border-white/10">
          <h2 class="font-bold text-white">Product Details</h2>
          <button @click="closeViewModal" class="text-slate-400 hover:text-white">✕</button>
        </div>

        <div v-if="selectedProduct" class="p-6 space-y-4">

          <div class="flex items-center gap-4">
            <div class="w-14 h-14 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold text-xl">
              {{ selectedProduct.name.charAt(0) }}
            </div>

            <div>
              <p class="font-bold text-white">{{ selectedProduct.name }}</p>
              <p class="text-slate-400">₱ {{ selectedProduct.price }}</p>
            </div>
          </div>

          <div class="text-sm text-slate-400">
            Created: {{ formatDate(selectedProduct.created_at) }}
          </div>

          <button
            @click="closeViewModal"
            class="w-full mt-4 bg-white/5 border border-white/10 rounded-xl py-2 hover:bg-white/10">
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