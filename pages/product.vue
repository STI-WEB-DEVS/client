<template>
  <NuxtLayout>
    <div class="min-h-screen bg-[#faf7f2] font-serif text-[#1a1108] p-8">

      <!-- Header -->
      <div class="flex justify-between items-start mb-10">
        <div>
          <p class="text-[10px] tracking-[0.3em] uppercase text-[#b0a090] mb-1">
            Sutura Tailoring
          </p>
          <h1 class="text-3xl font-bold tracking-tight">Product Atelier</h1>
          <p class="text-xs text-[#8a7060] mt-1">Manage your crafted inventory pieces</p>
        </div>

        <button @click="openAddModal"
          class="bg-[#1a1108] text-[#f5e6c8] px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-[0.15em] hover:bg-[#2a1f0f] transition">
          + Add Product
        </button>
      </div>

      <!-- Search -->
      <div class="bg-white border border-[#e8ddc8] rounded-2xl p-4 mb-8">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search crafted products..."
          class="w-full bg-transparent outline-none text-sm placeholder-[#b0a090]"
        />
      </div>

      <!-- Loading -->
      <div v-if="loading" class="bg-white border border-[#e8ddc8] rounded-2xl p-10 text-center">
        <div class="animate-pulse text-[#8a7060] text-sm">Loading atelier inventory...</div>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="bg-[#fdf0f0] border border-[#b94040]/30 rounded-2xl p-6">
        <p class="text-[#b94040] font-bold text-sm">Inventory Error</p>
        <p class="text-xs text-[#8a5a5a] mt-1">{{ error }}</p>
      </div>

      <!-- Products Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        <div
          v-for="product in filteredProducts"
          :key="product.uuid"
          class="bg-white border border-[#e8ddc8] rounded-2xl p-5 hover:border-[#c9a84c] transition group"
        >

          <!-- Product Header -->
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-[#f0e8d8] flex items-center justify-center text-[#8a5a20] font-bold">
                {{ product.name.charAt(0) }}
              </div>
              <div>
                <p class="font-bold text-sm">{{ product.name }}</p>
                <p class="text-[10px] text-[#b0a090] uppercase tracking-wider">Handcrafted Piece</p>
              </div>
            </div>
          </div>

          <!-- Price -->
          <div class="mb-4">
            <p class="text-xs text-[#b0a090] uppercase tracking-wider">Price</p>
            <p class="text-lg font-bold text-[#1a1108]">₱ {{ product.price }}</p>
          </div>

          <!-- Date -->
          <p class="text-[10px] text-[#8a7060] mb-4">
            Created: {{ formatDate(product.created_at) }}
          </p>

          <!-- Actions -->
          <div class="flex gap-2">

            <button @click="openViewModal(product)"
              class="flex-1 text-xs font-bold uppercase tracking-wider text-[#8a5a20] bg-[#faf7f2] border border-[#e8ddc8] rounded-lg py-2 hover:border-[#c9a84c]">
              View
            </button>

            <button @click="openEditModal(product)"
              class="flex-1 text-xs font-bold uppercase tracking-wider text-[#2d7a3a] bg-[#edf7ee] rounded-lg py-2">
              Edit
            </button>

            <button @click="openDeleteConfirm(product)"
              class="flex-1 text-xs font-bold uppercase tracking-wider text-[#b94040] bg-[#fdf0f0] rounded-lg py-2">
              Delete
            </button>

          </div>
        </div>
      </div>

      <!-- Empty -->
      <div v-if="filteredProducts.length === 0 && !loading"
        class="text-center py-16 text-[#8a7060] text-sm">
        No crafted products found
      </div>

      <!-- MODAL -->
      <div v-if="showModal"
        class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

        <div class="bg-[#faf7f2] border border-[#e8ddc8] rounded-2xl w-full max-w-md p-6">

          <div class="flex justify-between items-center mb-6">
            <h2 class="font-bold text-lg">
              {{ modalMode === 'add' ? 'Add Product' : 'Edit Product' }}
            </h2>
            <button @click="closeModal" class="text-[#8a7060]">✕</button>
          </div>

          <form @submit.prevent="saveProduct" class="space-y-4">

            <div>
              <label class="text-xs text-[#8a7060] uppercase tracking-wider">Name</label>
              <input v-model="formData.name"
                class="w-full mt-1 bg-white border border-[#e8ddc8] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#c9a84c]" />
            </div>

            <div>
              <label class="text-xs text-[#8a7060] uppercase tracking-wider">Price</label>
              <input v-model="formData.price" type="number"
                class="w-full mt-1 bg-white border border-[#e8ddc8] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#c9a84c]" />
            </div>

            <div class="flex gap-2 pt-4">

              <button type="button" @click="closeModal"
                class="flex-1 text-xs uppercase tracking-wider bg-white border border-[#e8ddc8] rounded-lg py-2">
                Cancel
              </button>

              <button type="submit"
                class="flex-1 text-xs uppercase tracking-wider bg-[#1a1108] text-[#f5e6c8] rounded-lg py-2">
                {{ saving ? 'Saving...' : 'Save' }}
              </button>

            </div>

          </form>
        </div>
      </div>

      <!-- VIEW MODAL -->
      <div v-if="showViewModal"
        class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

        <div class="bg-[#faf7f2] border border-[#e8ddc8] rounded-2xl w-full max-w-md p-6">

          <div class="flex justify-between items-center mb-6">
            <h2 class="font-bold text-lg">Product Details</h2>
            <button @click="closeViewModal">✕</button>
          </div>

          <div v-if="selectedProduct" class="space-y-4">

            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-full bg-[#f0e8d8] flex items-center justify-center font-bold">
                {{ selectedProduct.name.charAt(0) }}
              </div>
              <div>
                <p class="font-bold">{{ selectedProduct.name }}</p>
                <p class="text-sm text-[#8a7060]">₱ {{ selectedProduct.price }}</p>
              </div>
            </div>

            <p class="text-xs text-[#8a7060]">
              Created: {{ formatDate(selectedProduct.created_at) }}
            </p>

            <button @click="closeViewModal"
              class="w-full mt-4 bg-[#1a1108] text-[#f5e6c8] rounded-lg py-2 text-xs uppercase tracking-wider">
              Close
            </button>

          </div>

        </div>
      </div>

    </div>
  </NuxtLayout>
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