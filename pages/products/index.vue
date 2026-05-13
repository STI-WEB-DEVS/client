<template>
  <div class="p-8 max-w-7xl mx-auto">
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
      <div>
        <h2 class="text-3xl font-black text-slate-900 tracking-tight">Product Catalog</h2>
        <p class="text-slate-500 mt-1">Manage parking permits, hardware, and service subscriptions.</p>
      </div>
      
      <div class="flex items-center gap-3">
        <button 
          @click="openModal()"
          class="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-2xl font-bold text-sm transition-all flex items-center gap-2 shadow-xl shadow-slate-200"
        >
          <span class="text-lg">+</span> Create Product
        </button>
      </div>
    </div>

    <div class="min-h-[400px]">
      <div v-if="pending" class="flex flex-col items-center justify-center p-20">
        <div class="w-12 h-12 border-4 border-emerald-100 border-t-emerald-500 rounded-full animate-spin"></div>
        <p class="mt-4 text-slate-400 font-bold text-xs uppercase tracking-widest">Accessing Catalog...</p>
      </div>

      <div v-else-if="productList.length === 0" class="bg-white border-2 border-dashed border-slate-200 rounded-[2.5rem] p-16 text-center">
        <div class="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">📦</div>
        <h3 class="text-lg font-bold text-slate-900">Your catalog is empty</h3>
        <p class="text-slate-500 max-w-xs mx-auto mb-6">Start adding products to manage your facility's offerings.</p>
        <button @click="openModal()" class="text-emerald-600 font-bold text-sm hover:underline">Add your first product →</button>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <div v-for="product in productList" :key="product.uuid" class="bg-white border border-slate-200 rounded-[2rem] p-6 hover:shadow-xl hover:shadow-slate-200/50 transition-all group relative overflow-hidden">
          <div class="absolute top-0 right-0 bg-emerald-50 px-4 py-2 rounded-bl-2xl border-b border-l border-emerald-100">
            <span class="text-emerald-700 font-black text-sm">${{ product.price }}</span>
          </div>

          <div class="pt-4">
            <div class="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform">
              🏷️
            </div>
            <h3 class="text-xl font-bold text-slate-900 mb-1">{{ product.name }}</h3>
            <p class="text-[10px] font-mono text-slate-400 uppercase tracking-tighter">UUID: {{ product.uuid.split('-')[0] }}...</p>
          </div>
          
          <div class="flex items-center justify-between mt-8 pt-6 border-t border-slate-50">
            <button @click="viewProduct(product.uuid)" class="text-xs font-bold text-slate-400 hover:text-emerald-600 transition-colors uppercase tracking-widest">
              View Details
            </button>
            <div class="flex gap-2">
              <button @click="openModal(product)" class="p-2.5 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all" title="Edit">
                ✏️
              </button>
              <button @click="handleDelete(product.uuid)" class="p-2.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all" title="Delete">
                🗑️
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Teleport to="body">
      <div v-if="isModalOpen" class="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md transition-all">
        <div class="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
          <div class="p-10">
            <div class="flex justify-between items-start mb-8">
              <div>
                <h3 class="text-2xl font-black text-slate-900 tracking-tight">
                  {{ editingProduct.uuid ? 'Edit Product' : 'New Product' }}
                </h3>
                <p class="text-slate-500 text-sm mt-1">Define product details and pricing.</p>
              </div>
              <button @click="isModalOpen = false" class="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-400 hover:text-slate-900 transition-colors">✕</button>
            </div>
            
            <form @submit.prevent="saveProduct" class="space-y-6">
              <div class="space-y-2">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Product Name</label>
                <input 
                  v-model="form.name" 
                  type="text" 
                  class="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all" 
                  placeholder="e.g. Monthly Pass"
                  required 
                />
              </div>
              <div class="space-y-2">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Price (USD)</label>
                <div class="relative">
                  <span class="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                  <input 
                    v-model="form.price" 
                    type="number" 
                    step="0.01" 
                    class="w-full pl-10 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all" 
                    required 
                  />
                </div>
              </div>
              
              <div class="flex gap-4 pt-4">
                <button 
                  type="submit" 
                  :disabled="submitting" 
                  class="flex-1 py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-500/30 flex items-center justify-center gap-2"
                >
                  <span v-if="submitting" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  {{ submitting ? 'Processing...' : 'Save Product' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { productService } from '~/api/product/ProductService'

const productList = ref<any[]>([])
const pending = ref(true)
const isModalOpen = ref(false)
const submitting = ref(false)
const editingProduct = ref<any>({})

const form = reactive({
  name: '',
  price: 0
})

const fetchProducts = async () => {
  pending.value = true
  try {
    const response = await productService.list()
    productList.value = response.data || []
  } catch (error: any) {
    console.error('Fetch Error:', error.message)
  } finally {
    pending.value = false
  }
}

const openModal = (product: any = null) => {
  if (product) {
    editingProduct.value = { ...product }
    form.name = product.name
    form.price = product.price
  } else {
    editingProduct.value = {}
    form.name = ''
    form.price = 0
  }
  isModalOpen.value = true
}

const saveProduct = async () => {
  submitting.value = true
  try {
    const uuid = editingProduct.value?.uuid
    const payload = { name: form.name, price: form.price }

    if (uuid) {
      await productService.update(uuid, payload)
    } else {
      await productService.create(payload)
    }
    
    await fetchProducts()
    isModalOpen.value = false
  } catch (error: any) {
    alert(error.message)
  } finally {
    submitting.value = false
  }
}

const handleDelete = async (uuid: string) => {
  if (confirm('Permanently remove this product?')) {
    try {
      await productService.delete(uuid)
      await fetchProducts()
    } catch (error: any) {
      console.error(error.message)
    }
  }
}

const viewProduct = (uuid: string) => {
  navigateTo(`/products/${uuid}`)
}

onMounted(() => {
  fetchProducts()
})
</script>