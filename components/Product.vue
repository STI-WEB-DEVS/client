<template>
  <div>
    <div class="mb-8 flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-[#1D3557]">Product Management</h1>
        <p class="mt-1 text-sm text-[#457B9D]">Manage products, pricing, and catalog records.</p>
      </div>
      <div class="flex flex-wrap gap-3">
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search product..."
            class="rounded-xl border border-[#A8DADC]/60 bg-white px-4 py-2.5 text-sm text-[#1D3557] placeholder:text-[#457B9D]/50 shadow-sm outline-none transition-all"
          />
        </div>
        <button
          @click="openCreateModal"
          class="inline-flex items-center gap-2 rounded-xl bg-[#D62828] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#b52020]"
        >
          + Add Product
        </button>
      </div>
    </div>

    <div class="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div
        v-for="stat in productStats"
        :key="stat.label"
        class="rounded-2xl border bg-white p-5 shadow-sm transition-all hover:shadow-md"
        :class="stat.borderClass"
      >
        <div class="mb-3 flex items-start justify-between gap-3">
          <span class="text-3xl font-black text-[#1D3557]">{{ stat.value }}</span>
          <span
            class="rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-tight"
            :class="stat.badgeClass"
          >
            {{ stat.label }}
          </span>
        </div>
        <div class="h-1.5 overflow-hidden rounded-full bg-[#A8DADC]/30">
          <div
            class="h-full rounded-full transition-all duration-700"
            :class="stat.progressClass"
            :style="{ width: stat.percentage + '%' }"
          ></div>
        </div>
        <p class="mt-2 text-[10px] italic text-[#457B9D]/70">{{ stat.description }}</p>
      </div>
    </div>

    <div v-if="error" class="mb-4 rounded-xl border border-[#D62828]/30 bg-[#D62828]/10 px-4 py-3 text-sm font-semibold text-[#D62828]">
      {{ error }}
    </div>

    <div class="overflow-hidden rounded-2xl border border-[#A8DADC]/40 bg-white shadow-sm">
      <div class="flex items-center justify-between border-b border-[#A8DADC]/30 px-6 py-4">
        <h3 class="font-bold text-[#1D3557]">Product Records</h3>
        <span class="text-sm font-semibold text-[#457B9D]">{{ filteredProducts.length }} shown</span>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead>
            <tr class="border-b border-[#A8DADC]/20 bg-[#F1FAEE]">
              <th class="px-6 py-3.5 text-[11px] font-semibold uppercase tracking-widest text-[#457B9D]">Product</th>
              <th class="px-6 py-3.5 text-[11px] font-semibold uppercase tracking-widest text-[#457B9D]">Price</th>
              <th class="px-6 py-3.5 text-[11px] font-semibold uppercase tracking-widest text-[#457B9D]">Created</th>
              <th class="px-6 py-3.5 text-[11px] font-semibold uppercase tracking-widest text-[#457B9D]">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[#A8DADC]/20">
            <tr v-if="loading">
              <td colspan="4" class="px-6 py-12 text-center text-[#457B9D]">Loading products...</td>
            </tr>

            <tr
              v-for="product in filteredProducts"
              v-else
              :key="product.uuid"
              class="transition-colors hover:bg-[#F1FAEE]/60"
            >
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div class="flex h-8 w-8 items-center justify-center rounded-full bg-[#457B9D] text-xs font-bold text-white">
                    {{ getInitials(product.name) }}
                  </div>
                  <span class="font-semibold text-[#1D3557]">{{ product.name }}</span>
                </div>
              </td>
              <td class="px-6 py-4 text-sm font-semibold text-[#1D3557]">{{ formatCurrency(product.price) }}</td>
              <td class="px-6 py-4 text-sm text-[#457B9D]">{{ formatDate(product.created_at) }}</td>
              <td class="px-6 py-4">
                <div class="flex gap-2">
                  <button
                    @click="openEditModal(product)"
                    class="rounded-lg bg-[#457B9D]/10 px-3 py-1.5 text-xs font-semibold text-[#457B9D] transition-colors hover:bg-[#457B9D]/20"
                  >
                    Edit
                  </button>
                  <button
                    @click="handleDelete(product)"
                    class="rounded-lg bg-[#D62828]/10 px-3 py-1.5 text-xs font-semibold text-[#D62828] transition-colors hover:bg-[#D62828]/20"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>

            <tr v-if="!loading && filteredProducts.length === 0">
              <td colspan="4" class="px-6 py-12 text-center text-[#457B9D]">No products found</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div class="absolute inset-0 bg-[#1D3557]/50" @click="closeModal"></div>

      <div class="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div class="mb-6 flex items-center justify-between">
          <h2 class="text-xl font-bold text-[#1D3557]">
            {{ isEdit ? 'Edit Product' : 'Add Product' }}
          </h2>
          <button
            @click="closeModal"
            class="text-2xl text-[#457B9D] hover:text-[#1D3557]"
            type="button"
          >
            x
          </button>
        </div>

        <form class="space-y-4" @submit.prevent="handleSubmit">
          <div>
            <label class="mb-1 block text-xs font-semibold text-[#457B9D]">Name *</label>
            <input
              v-model="formData.name"
              type="text"
              required
              placeholder="Enter product name"
              class="w-full rounded-xl border border-[#A8DADC]/60 bg-white px-4 py-2.5 text-sm text-[#1D3557] placeholder:text-[#457B9D]/50 shadow-sm outline-none transition-all"
            />
          </div>

          <div>
            <label class="mb-1 block text-xs font-semibold text-[#457B9D]">Price *</label>
            <input
              v-model.number="formData.price"
              type="number"
              required
              min="0"
              step="0.01"
              placeholder="0.00"
              class="w-full rounded-xl border border-[#A8DADC]/60 bg-white px-4 py-2.5 text-sm text-[#1D3557] placeholder:text-[#457B9D]/50 shadow-sm outline-none transition-all"
            />
          </div>

          <div class="flex gap-3 pt-2">
            <button
              type="button"
              @click="closeModal"
              class="flex-1 rounded-xl border border-[#A8DADC]/60 bg-white px-5 py-2.5 text-sm font-semibold text-[#457B9D] transition-colors hover:bg-[#F1FAEE]"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="formLoading"
              class="flex-1 rounded-xl bg-[#457B9D] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1D3557] disabled:opacity-50"
            >
              {{ formLoading ? 'Saving...' : 'Save' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { productService } from '~/api/product/ProductService'

const products = ref([])
const loading = ref(false)
const error = ref('')
const searchQuery = ref('')

const showModal = ref(false)
const isEdit = ref(false)
const selectedProduct = ref(null)
const formLoading = ref(false)

const formData = ref({
  name: '',
  price: 0,
})

const filteredProducts = computed(() => {
  if (!searchQuery.value) return products.value

  const query = searchQuery.value.toLowerCase()
  return products.value.filter((product) =>
    product.name?.toLowerCase().includes(query) ||
    String(product.price).includes(query),
  )
})

const productStats = computed(() => {
  const total = products.value.length
  const prices = products.value.map((product) => Number(product.price) || 0)
  const totalValue = prices.reduce((sum, price) => sum + price, 0)
  const average = total > 0 ? totalValue / total : 0
  const highest = prices.length ? Math.max(...prices) : 0

  return [
    {
      label: 'Total',
      value: total,
      borderClass: 'border-[#A8DADC]/40',
      badgeClass: 'bg-[#457B9D]/10 text-[#457B9D]',
      progressClass: 'bg-[#457B9D]',
      percentage: total > 0 ? 100 : 0,
      description: 'All product records',
    },
    {
      label: 'Value',
      value: formatCurrency(totalValue),
      borderClass: 'border-green-300/50',
      badgeClass: 'bg-green-100 text-green-700',
      progressClass: 'bg-green-500',
      percentage: total > 0 ? 100 : 0,
      description: 'Combined catalog price',
    },
    {
      label: 'Average',
      value: formatCurrency(average),
      borderClass: 'border-[#A8DADC]/40',
      badgeClass: 'bg-[#A8DADC]/30 text-[#1D3557]',
      progressClass: 'bg-[#A8DADC]',
      percentage: highest > 0 ? (average / highest) * 100 : 0,
      description: 'Average product price',
    },
    {
      label: 'Highest',
      value: formatCurrency(highest),
      borderClass: highest > 0 ? 'border-[#D62828]/30' : 'border-[#A8DADC]/40',
      badgeClass: highest > 0 ? 'bg-[#D62828]/10 text-[#D62828]' : 'bg-gray-100 text-gray-700',
      progressClass: highest > 0 ? 'bg-[#D62828]' : 'bg-gray-400',
      percentage: highest > 0 ? 100 : 0,
      description: 'Most expensive product',
    },
  ]
})

const getInitials = (name = '') => {
  return name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || 'P'
}

function formatCurrency(value) {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
  }).format(Number(value) || 0)
}

function formatDate(value) {
  if (!value) return '-'

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value))
}

const fetchProducts = async () => {
  loading.value = true
  error.value = ''

  try {
    const response = await productService.list()
    products.value = response.data || []
  } catch (err) {
    error.value = err.message || 'Failed to fetch products'
  } finally {
    loading.value = false
  }
}

const openCreateModal = () => {
  isEdit.value = false
  selectedProduct.value = null
  formData.value = {
    name: '',
    price: 0,
  }
  showModal.value = true
}

const openEditModal = (product) => {
  isEdit.value = true
  selectedProduct.value = product
  formData.value = {
    name: product.name,
    price: Number(product.price) || 0,
  }
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  selectedProduct.value = null
}

const handleSubmit = async () => {
  formLoading.value = true

  try {
    if (isEdit.value && selectedProduct.value) {
      await productService.update(selectedProduct.value.uuid, formData.value)
    } else {
      await productService.create(formData.value)
    }

    closeModal()
    await fetchProducts()
  } catch (err) {
    alert(err.message || 'Failed to save product')
  } finally {
    formLoading.value = false
  }
}

const handleDelete = async (product) => {
  if (!confirm(`Are you sure you want to delete "${product.name}"?`)) return

  try {
    await productService.delete(product.uuid)
    await fetchProducts()
  } catch (err) {
    alert(err.message || 'Failed to delete product')
  }
}

onMounted(() => {
  fetchProducts()
})
</script>
