<template>
  <div class="p-8 max-w-5xl mx-auto">
    <div class="mb-8 flex items-center justify-between">
      <button 
        @click="navigateTo('/products')" 
        class="group flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-emerald-600 transition-colors"
      >
        <span class="transition-transform group-hover:-translate-x-1">←</span> 
        Back to Product Catalog
      </button>
      
      <div v-if="product" class="flex gap-2">
        <span class="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-widest">
          In Stock
        </span>
      </div>
    </div>

    <div v-if="pending" class="flex flex-col items-center justify-center p-20 bg-white border border-slate-200 rounded-3xl shadow-sm">
      <div class="w-12 h-12 border-4 border-emerald-100 border-t-emerald-500 rounded-full animate-spin"></div>
      <p class="mt-4 text-slate-400 font-bold text-xs uppercase tracking-[0.2em]">Retrieving Product Info...</p>
    </div>

    <div v-else-if="product" class="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div class="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden">
        <div class="absolute -right-20 -top-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
        
        <div class="relative flex flex-col md:flex-row items-center gap-8">
          <div class="w-32 h-32 rounded-3xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-4xl shadow-2xl shadow-emerald-500/20">
            📦
          </div>
          <div class="text-center md:text-left">
            <h1 class="text-4xl font-black tracking-tight mb-2">{{ product.name }}</h1>
            <div class="flex flex-wrap justify-center md:justify-start gap-4">
              <div class="flex items-center gap-2 text-emerald-400 font-bold">
                <span class="text-lg">💰</span>
                <span class="text-2xl">{{ formatPrice(product.price) }}</span>
              </div>
              <div class="flex items-center gap-2 text-slate-400">
                <span class="text-lg">🆔</span>
                <span class="text-[10px] font-mono uppercase tracking-widest">{{ product.uuid }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div class="md:col-span-2 bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm">
          <h3 class="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Product Specifications</h3>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div class="space-y-1">
              <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Display Name</label>
              <p class="text-slate-900 font-bold text-lg">{{ product.name }}</p>
            </div>
            <div class="space-y-1">
              <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pricing Model</label>
              <p class="text-slate-900 font-bold text-lg">Standard Rate</p>
            </div>
            <div class="space-y-1">
              <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Product Category</label>
              <p class="text-slate-600 font-medium">SmartPark Operations</p>
            </div>
          </div>
        </div>

        <div class="bg-slate-50 border border-slate-200 rounded-[2rem] p-8">
          <h3 class="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6">System Metadata</h3>
          <div class="space-y-4">
            <div class="space-y-1">
              <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Created At</label>
              <p class="text-slate-900 text-xs font-bold">{{ new Date(product.created_at).toLocaleString() }}</p>
            </div>
            <div class="space-y-1">
              <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Last Modified</label>
              <p class="text-slate-900 text-xs font-bold">{{ new Date(product.updated_at).toLocaleString() }}</p>
            </div>
          </div>
          
          <button 
            @click="navigateTo('/products')"
            class="w-full mt-8 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm shadow-lg shadow-slate-900/20 hover:bg-slate-800 transition-all"
          >
            Edit Settings
          </button>
        </div>

      </div>
    </div>

    <div v-else class="flex flex-col items-center justify-center p-20 text-center bg-rose-50 border border-rose-100 rounded-[2rem]">
      <div class="text-5xl mb-4">⚠️</div>
      <h3 class="text-xl font-black text-slate-900">Product Not Found</h3>
      <p class="text-slate-500 mt-2 max-w-xs">The record for <strong>{{ $route.params.id }}</strong> could not be retrieved.</p>
      <button @click="navigateTo('/products')" class="mt-6 text-emerald-600 font-bold hover:underline">Return to Catalog</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, navigateTo } from '#app'
import { productService } from '~/api/product/ProductService'

const route = useRoute()
const product = ref<any>(null)
const pending = ref(true)

const loadProduct = async () => {
  pending.value = true
  try {
    const response = await productService.show(route.params.id as string)
    product.value = response.data
  } catch (error: any) {
    console.error("Product Load Error:", error.message)
  } finally {
    pending.value = false
  }
}

const formatPrice = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value)
}

onMounted(() => {
  if (route.params.id) {
    loadProduct()
  }
})
</script>