<template>
  <NuxtLayout>
    <div class="space-y-8">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 class="font-['Syne'] text-2xl font-bold text-[#CFFFB3]">Product Catalog</h1>
          <p class="mt-1 font-['DM_Mono'] text-sm text-[#ADE25D]/70">Manage hiking tours, pricing, and availability</p>
        </div>
        <button 
          @click="openModal()"
          class="font-['DM_Mono'] text-[10px] font-bold uppercase tracking-[0.15em] bg-[#ADE25D] text-[#1E2F23] px-4 py-2 rounded-sm hover:bg-[#CFFFB3] transition-colors shadow-[4px_4px_0px_0px_#3B7080]"
        >
          + Create New Tour
        </button>
      </div>

      <div v-if="pending" class="text-center py-12 text-[#ADE25D] font-['DM_Mono'] animate-pulse">
        Synchronizing with catalog...
      </div>

      <div v-else class="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        <div v-for="product in productList" :key="product.uuid" class="bg-[#3B7080]/20 border border-[#3B7080] rounded-sm flex flex-col">
          <div class="p-6 flex-1">
            <div class="flex justify-between items-start mb-4">
              <span class="font-['DM_Mono'] text-[10px] tracking-widest uppercase text-[#ADE25D] bg-[#ADE25D]/10 px-2 py-1 border border-[#ADE25D]/20">
                {{ product.category }}
              </span>
              <p class="font-['Syne'] text-lg font-bold text-[#CFFFB3]">₱{{ product.price }}</p>
            </div>
            <h3 class="font-['Syne'] text-md font-semibold text-[#CFFFB3] mb-2">{{ product.name }}</h3>
            <p class="font-['DM_Mono'] text-xs text-[#ADE25D]/60 line-clamp-2 mb-4">{{ product.description }}</p>
            
            <div class="flex items-center gap-4 border-t border-[#3B7080]/40 pt-4">
              <div>
                <p class="font-['DM_Mono'] text-[10px] uppercase text-[#ADE25D]/40">Difficulty</p>
                <p class="font-['DM_Mono'] text-xs text-[#ADE25D]">{{ product.difficulty }}</p>
              </div>
              <div>
                <p class="font-['DM_Mono'] text-[10px] uppercase text-[#ADE25D]/40">Slots</p>
                <p class="font-['DM_Mono'] text-xs text-[#ADE25D]">{{ product.slots }} left</p>
              </div>
            </div>
          </div>
          
          <div class="bg-[#3B7080]/10 border-t border-[#3B7080] px-6 py-3 flex justify-end gap-4">
            <button @click="openModal(product)" class="text-[#ADE25D] hover:text-[#CFFFB3] transition-colors text-xs font-['DM_Mono'] uppercase tracking-wider">Edit</button>
            <button @click="handleDelete(product.uuid)" class="text-red-400 hover:text-red-300 transition-colors text-xs font-['DM_Mono'] uppercase tracking-wider">Delete</button>
          </div>
        </div>
      </div>

      <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
        <div class="bg-[#1E2F23] border border-[#ADE25D]/30 p-8 w-full max-w-2xl shadow-2xl">
          <h2 class="font-['Syne'] text-xl font-bold text-[#CFFFB3] mb-6">
            {{ editingProduct.uuid ? 'Edit Tour Product' : 'Add New Tour' }}
          </h2>
          
          <form @submit.prevent="saveProduct" class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="md:col-span-2">
              <label class="block font-['DM_Mono'] text-[10px] uppercase text-[#ADE25D] mb-1">Tour Name</label>
              <input v-model="form.name" type="text" required class="w-full bg-[#3B7080]/20 border border-[#3B7080] p-2 text-[#CFFFB3] font-['Syne'] focus:outline-none focus:border-[#ADE25D]" />
            </div>
            
            <div>
              <label class="block font-['DM_Mono'] text-[10px] uppercase text-[#ADE25D] mb-1">Price (PHP)</label>
              <input v-model="form.price" type="number" required class="w-full bg-[#3B7080]/20 border border-[#3B7080] p-2 text-[#CFFFB3] font-['DM_Mono'] focus:outline-none focus:border-[#ADE25D]" />
            </div>

            <div>
              <label class="block font-['DM_Mono'] text-[10px] uppercase text-[#ADE25D] mb-1">Difficulty</label>
              <select v-model="form.difficulty" class="w-full bg-[#3B7080]/20 border border-[#3B7080] p-2 text-[#CFFFB3] font-['DM_Mono'] focus:outline-none focus:border-[#ADE25D]">
                <option>Easy</option>
                <option>Moderate</option>
                <option>Challenging</option>
                <option>Hard</option>
              </select>
            </div>

            <div class="md:col-span-2">
              <label class="block font-['DM_Mono'] text-[10px] uppercase text-[#ADE25D] mb-1">Short Description</label>
              <textarea v-model="form.description" rows="3" class="w-full bg-[#3B7080]/20 border border-[#3B7080] p-2 text-[#CFFFB3] font-['Syne'] focus:outline-none focus:border-[#ADE25D]"></textarea>
            </div>
            
            <div class="md:col-span-2 flex justify-end gap-3 mt-6">
              <button type="button" @click="isModalOpen = false" class="font-['DM_Mono'] text-[10px] uppercase text-[#ADE25D]/60 hover:text-[#ADE25D]">Cancel</button>
              <button type="submit" :disabled="submitting" class="font-['DM_Mono'] text-[10px] font-bold uppercase bg-[#ADE25D] text-[#1E2F23] px-6 py-2 rounded-sm shadow-[4px_4px_0px_0px_#3B7080] disabled:opacity-50">
                {{ submitting ? 'Processing...' : 'Confirm Product' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'

const config = useRuntimeConfig()
const isModalOpen = ref(false)
const submitting = ref(false)
const editingProduct = ref<any>({})

const form = reactive({
  name: '',
  price: 0,
  difficulty: 'Easy',
  description: '',
  slots: 10,
  category: 'Day Tour'
})

// Fetch logic aligning with ProductService::listProduct
const { data: response, pending, refresh } = await useFetch<any>(`${config.public.apiBase}/products`)
const productList = computed(() => response.value?.data || [])

const openModal = (product: any = null) => {
  if (product) {
    editingProduct.value = { ...product }
    Object.assign(form, product)
  } else {
    editingProduct.value = {}
    Object.assign(form, { name: '', price: 0, difficulty: 'Easy', description: '', slots: 10, category: 'Day Tour' })
  }
  isModalOpen.value = true
}

const saveProduct = async () => {
  submitting.value = true
  // Determine endpoint based on whether we have a UUID (update vs create)
  const isUpdating = !!editingProduct.value.uuid
  const url = isUpdating 
    ? `${config.public.apiBase}/products/${editingProduct.value.uuid}` 
    : `${config.public.apiBase}/products`
  
  try {
    await $fetch(url, {
      method: isUpdating ? 'PUT' : 'POST',
      body: form
    })
    await refresh() // Refresh the collection from backend
    isModalOpen.value = false
  } catch (error) {
    console.error('API Error:', error)
  } finally {
    submitting.value = false
  }
}

const handleDelete = async (uuid: string) => {
  if (confirm('Permanently remove this tour from the catalog?')) {
    try {
      // Aligns with ProductService::deleteProduct(string $uuid)
      await $fetch(`${config.public.apiBase}/products/${uuid}`, { method: 'DELETE' })
      await refresh()
    } catch (error) {
      console.error('Delete failed:', error)
    }
  }
}
</script>