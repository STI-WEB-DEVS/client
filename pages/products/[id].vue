<template>
  <NuxtLayout>
    <div class="max-w-4xl mx-auto space-y-6">
      <div v-if="pending" class="text-[#ADE25D] font-['DM_Mono'] text-sm animate-pulse">
        Accessing product data {{ $route.params.id }}...
      </div>

      <div v-else-if="product" class="bg-[#3B7080]/20 border border-[#3B7080] p-8 rounded-sm">
        <div class="flex justify-between items-start mb-8 border-b border-[#3B7080]/50 pb-6">
          <div>
            <h1 class="font-['Syne'] text-3xl font-bold text-[#CFFFB3]">{{ product.name }}</h1>
            <p class="font-['DM_Mono'] text-[#ADE25D]/70 uppercase tracking-widest text-[10px] mt-2">
              SKU/UUID: {{ product.uuid }}
            </p>
          </div>
          <button 
            @click="navigateTo('/products')" 
            class="font-['DM_Mono'] text-[10px] text-[#ADE25D] border border-[#ADE25D]/30 px-4 py-2 hover:bg-[#ADE25D]/10 transition-colors uppercase tracking-wider"
          >
            ← Back to Catalog
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div class="space-y-6">
            <div>
              <label class="block font-['DM_Mono'] text-[10px] uppercase text-[#ADE25D]/50 mb-1">Current Price</label>
              <p class="font-['DM_Mono'] text-2xl text-[#CFFFB3] font-bold">
                {{ formatPrice(product.price) }}
              </p>
            </div>
            
            <div class="pt-4">
               <span class="inline-block bg-[#ADE25D]/10 text-[#ADE25D] font-['DM_Mono'] text-[10px] px-3 py-1 rounded-full border border-[#ADE25D]/20">
                 Active in Catalog
               </span>
            </div>
          </div>

          <div class="bg-[#1E2F23] p-6 border border-[#3B7080]/30 rounded-sm">
            <h4 class="font-['Syne'] text-[#CFFFB3] text-sm font-bold mb-3 uppercase tracking-tight">System Info</h4>
            <ul class="space-y-2 font-['DM_Mono'] text-[10px] text-[#ADE25D]/80">
              <li>Created: {{ new Date(product.created_at).toLocaleString() }}</li>
              <li>Last Update: {{ new Date(product.updated_at).toLocaleString() }}</li>
            </ul>
          </div>
        </div>
      </div>

      <div v-else class="bg-red-900/20 border border-red-500/50 p-6 text-red-400 font-['DM_Mono'] text-sm">
        Product record could not be retrieved. Please verify the UUID.
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { productService } from '~/api/product/ProductService'

const route = useRoute()
const product = ref<any>(null)
const pending = ref(true)

/**
 * Fetches product data using the UUID from the route parameter.
 * Unwraps the 'data' key from the Laravel Resource response.
 */
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

/**
 * Formats decimal numbers to currency format.
 */
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