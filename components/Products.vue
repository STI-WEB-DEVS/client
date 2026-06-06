<template>
  <div class="p-8 bg-[#FDFCFB] min-h-screen font-sans text-slate-900">
    <header class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
      <div>
        <h1 class="text-3xl font-black text-[#2D2424] tracking-tight">Furniture Products</h1>
        <p class="text-gray-500 mt-1">Manage products, pricing, and stock availability.</p>
      </div>

      <div class="flex items-center gap-3">
        <div class="relative">
          <MagnifyingGlassIcon class="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            v-model="search"
            type="text"
            placeholder="Search products..."
            class="pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 outline-none w-64 transition-all"
          />
        </div>
        <button
          class="bg-[#5D4037] hover:bg-[#4E342E] text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg active:scale-95 flex items-center gap-2"
          @click="openProductForm"
        >
          <PlusIcon class="w-5 h-5" />
          <span>Add New Product</span>
        </button>
      </div>
    </header>

    <div class="flex gap-4 mb-8 overflow-x-auto pb-2">
      <button
        v-for="cat in categories"
        :key="cat"
        :class="[
          'px-5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all',
          cat === selectedCategory ? 'bg-[#FFB300] text-[#2D2424]' : 'bg-white text-gray-500 border border-gray-200 hover:border-amber-500',
        ]"
        @click="selectedCategory = cat"
      >
        {{ cat }}
      </button>
    </div>

    <div v-if="errorMessage" class="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
      {{ errorMessage }}
    </div>

    <div v-if="isLoading" class="py-16 text-center text-sm font-bold text-gray-400">
      Loading products...
    </div>

    <div v-else-if="filteredProducts.length === 0" class="py-16 text-center text-sm font-bold text-gray-400">
      No products found.
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      <div
        v-for="product in filteredProducts"
        :key="product.uuid || product.id"
        class="group bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300"
      >
        <div class="aspect-[4/3] bg-stone-100 relative overflow-hidden flex items-center justify-center">
          <img
            :src="product.image"
            :alt="product.name"
            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div class="absolute inset-0 bg-[#5D4037]/10 group-hover:bg-transparent transition-colors"></div>

          <div class="absolute top-4 left-4">
            <span
              :class="[
                'px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-sm',
                product.stock > 0 ? 'bg-white text-emerald-600' : 'bg-red-500 text-white',
              ]"
            >
              {{ product.stock > 0 ? 'In Stock' : 'Out of Stock' }}
            </span>
          </div>
        </div>

        <div class="p-6">
          <div class="flex justify-between items-start mb-2">
            <div>
              <p class="text-[10px] font-bold text-amber-600 uppercase tracking-widest">{{ product.category }}</p>
              <h3 class="text-lg font-bold text-[#2D2424] leading-tight">{{ product.name }}</h3>
            </div>
            <p class="text-sm font-black text-[#2D2424]">{{ formatMoney(product.price) }}</p>
          </div>

          <p class="text-xs text-gray-500 line-clamp-2 mb-4">
            Material: {{ product.material }}
          </p>

          <div class="flex items-center justify-between pt-4 border-t border-gray-50">
            <div class="flex flex-col">
              <span class="text-[9px] font-bold text-gray-400 uppercase leading-none">Quantity</span>
              <span class="text-sm font-bold text-[#2D2424]">{{ product.stock }} units</span>
            </div>
            <div class="flex gap-2">
              <button class="p-2 bg-gray-50 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all">
                <PencilSquareIcon class="w-5 h-5" />
              </button>
              <button class="p-2 bg-gray-50 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                <TrashIcon class="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showProductForm" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div class="w-full max-w-md rounded-2xl bg-white shadow-2xl border border-gray-100">
        <div class="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <h2 class="text-lg font-black text-[#2D2424]">Add New Product</h2>
          <button class="text-gray-400 hover:text-gray-700" @click="closeProductForm">
            <XMarkIcon class="w-5 h-5" />
          </button>
        </div>

        <form class="p-6 space-y-4" @submit.prevent="saveProduct">
          <div>
            <label class="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Product Name</label>
            <input
              v-model.trim="productForm.name"
              type="text"
              required
              class="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="Example: Narra Dining Table"
            />
          </div>

          <div>
            <label class="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Price</label>
            <input
              v-model.number="productForm.price"
              type="number"
              min="0"
              step="0.01"
              required
              class="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="0.00"
            />
          </div>

          <div v-if="formError" class="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            {{ formError }}
          </div>

          <div class="flex justify-end gap-3 pt-2">
            <button type="button" class="px-5 py-3 rounded-xl text-sm font-bold text-gray-500 hover:bg-gray-50" @click="closeProductForm">
              Cancel
            </button>
            <button
              type="submit"
              class="px-5 py-3 rounded-xl text-sm font-bold text-white bg-[#5D4037] hover:bg-[#4E342E] disabled:opacity-60"
              :disabled="isSaving"
            >
              {{ isSaving ? 'Saving...' : 'Save Product' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import {
  PlusIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
  TrashIcon,
  XMarkIcon,
} from '@heroicons/vue/24/outline'
import { productService } from '~/api/product/ProductService'

const defaultImage = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=500&auto=format&fit=crop'
const seedProducts = [
  {
    id: 1,
    name: 'Heritage Narra Table',
    category: 'Dining',
    price: 45000,
    stock: 3,
    material: 'Solid Narra Wood, Glossy Finish',
    image: 'https://www.jahroc.com.au/wp-content/uploads/2014/10/Nara-Dining-Table-2400L-2-deep-etched.jpg',
  },
  {
    id: 2,
    name: 'Cloud Comfort Sofa',
    category: 'Living Room',
    price: 32500,
    stock: 5,
    material: 'Velvet Upholstery, Mahogany Base',
    image: defaultImage,
  },
]

const categories = ['All Works', 'Living Room', 'Bedroom', 'Dining', 'Office', 'Custom Orders']
const products = ref([])
const selectedCategory = ref('All Works')
const search = ref('')
const isLoading = ref(false)
const isSaving = ref(false)
const showProductForm = ref(false)
const errorMessage = ref('')
const formError = ref('')
const productForm = ref({ name: '', price: null })

const filteredProducts = computed(() => {
  const keyword = search.value.toLowerCase()

  return products.value.filter((product) => {
    const matchesCategory = selectedCategory.value === 'All Works' || product.category === selectedCategory.value
    const matchesSearch = product.name.toLowerCase().includes(keyword)

    return matchesCategory && matchesSearch
  })
})

onMounted(fetchProducts)

async function fetchProducts() {
  isLoading.value = true
  errorMessage.value = ''

  try {
    const response = await productService.list()
    const list = Array.isArray(response?.data) ? response.data : []
    products.value = list.map(normalizeProduct)

    if (products.value.length === 0) {
      products.value = seedProducts
    }
  } catch (error) {
    errorMessage.value = error.message || 'Unable to load products.'
    products.value = seedProducts
  } finally {
    isLoading.value = false
  }
}

function normalizeProduct(product) {
  return {
    ...product,
    category: product.category || 'Custom Orders',
    price: Number(product.price || 0),
    stock: Number(product.stock || 0),
    material: product.material || 'Product details pending',
    image: product.image || defaultImage,
  }
}

function openProductForm() {
  formError.value = ''
  productForm.value = { name: '', price: null }
  showProductForm.value = true
}

function closeProductForm() {
  showProductForm.value = false
}

async function saveProduct() {
  isSaving.value = true
  formError.value = ''

  try {
    const response = await productService.create({
      name: productForm.value.name,
      price: Number(productForm.value.price),
    })

    const created = response?.data || response
    products.value = [normalizeProduct(created), ...products.value]
    closeProductForm()
  } catch (error) {
    formError.value = error.message || 'Unable to save product.'
  } finally {
    isSaving.value = false
  }
}

function formatMoney(value) {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
  }).format(Number(value || 0))
}
</script>
