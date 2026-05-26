<template>
  <div class="space-y-8">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="font-['Syne'] text-2xl font-bold text-[#CFFFB3]">Product Catalog</h1>
        <p class="mt-1 font-['DM_Mono'] text-sm text-[#ADE25D]/70">Manage available items</p>
      </div>
      <button 
        @click="openModal()"
        class="font-['DM_Mono'] text-[10px] font-bold uppercase tracking-[0.15em] bg-[#ADE25D] text-[#1E2F23] px-4 py-2 rounded-sm hover:bg-[#CFFFB3] transition-colors shadow-[4px_4px_0px_0px_#3B7080]"
      >
        + Create Product
      </button>
    </div>

    <div v-if="pending" class="text-center py-12 text-[#ADE25D] font-['DM_Mono'] animate-pulse">
      Synchronizing with catalog...
    </div>

    <div v-else class="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      <div v-for="product in productList" :key="product.uuid" class="bg-[#3B7080]/20 border border-[#3B7080] p-6 rounded-sm flex flex-col justify-between">
        <div>
          <div class="flex justify-between items-start mb-4">
            <span class="font-['DM_Mono'] text-sm text-[#CFFFB3] font-bold">${{ product.price }}</span>
          </div>
          <h3 class="font-['Syne'] text-lg font-bold text-[#CFFFB3] mb-2">{{ product.name }}</h3>
        </div>
        
        <div class="flex items-center justify-end mt-4 pt-4 border-t border-[#3B7080]/50">
          <div class="flex gap-3">
            <button @click="viewProduct(product.uuid)" class="text-blue-400 hover:text-blue-300">
              <EyeIcon class="size-4" />
            </button>
            <button @click="openModal(product)" class="text-[#ADE25D] hover:text-[#CFFFB3]">
              <PencilSquareIcon class="size-4" />
            </button>
            <button @click="handleDelete(product.uuid)" class="text-red-400 hover:text-red-300">
              <TrashIcon class="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <TransitionRoot appear :show="isModalOpen" as="template">
      <Dialog as="div" @close="isModalOpen = false" class="relative z-50">
        <div class="fixed inset-0 bg-[#1E2F23]/80 backdrop-blur-sm" />
        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4">
            <DialogPanel class="w-full max-w-md transform overflow-hidden rounded-sm bg-[#1E2F23] border border-[#3B7080] p-8 shadow-2xl transition-all">
              <DialogTitle class="font-['Syne'] text-xl font-bold text-[#CFFFB3] mb-6">
                {{ editingProduct.uuid ? 'Edit Product' : 'New Product' }}
              </DialogTitle>
              
              <form @submit.prevent="saveProduct" class="space-y-4">
                <div>
                  <label class="block text-[10px] font-['DM_Mono'] uppercase text-[#ADE25D] mb-1">Product Name</label>
                  <input v-model="form.name" type="text" class="w-full bg-[#3B7080]/20 border border-[#3B7080] p-2 text-[#CFFFB3] font-['DM_Mono'] text-sm focus:outline-none focus:border-[#ADE25D]" required />
                </div>
                <div>
                  <label class="block text-[10px] font-['DM_Mono'] uppercase text-[#ADE25D] mb-1">
                    Price ($)
                  </label>
                  <input 
                    v-model="form.price" 
                    type="number" 
                    step="0.01" 
                    class="w-full bg-[#3B7080]/20 border border-[#3B7080] p-2 text-[#CFFFB3] font-['DM_Mono'] text-sm focus:outline-none focus:border-[#ADE25D]" 
                    required 
                  />
                </div>
                
                <div class="flex justify-end gap-4 mt-8">
                  <button type="button" @click="isModalOpen = false" class="text-[10px] font-['DM_Mono'] uppercase text-[#ADE25D] hover:text-[#CFFFB3]">Cancel</button>
                  <button type="submit" :disabled="submitting" class="bg-[#ADE25D] text-[#1E2F23] px-6 py-2 rounded-sm font-['DM_Mono'] text-[10px] font-bold uppercase hover:bg-[#CFFFB3] disabled:opacity-50">
                    {{ submitting ? 'Saving...' : 'Save' }}
                  </button>
                </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { EyeIcon, PencilSquareIcon, TrashIcon } from '@heroicons/vue/24/outline'
import { Dialog, DialogPanel, DialogTitle, TransitionRoot } from '@headlessui/vue'
import { productService } from '~/api/product/ProductService'

const productList = ref<any[]>([])
const pending = ref(true)
const isModalOpen = ref(false)
const submitting = ref(false)
const editingProduct = ref<any>({})

// strictly following Product.php $fillable: ['name', 'price']
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