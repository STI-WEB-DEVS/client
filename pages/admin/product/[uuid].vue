<template>
    <div class="space-y-6">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 class="text-xl font-semibold tracking-tight text-gray-900">Product Details</h1>
          <p class="mt-1 text-sm text-gray-500">Viewing product information.</p>
        </div>
        <div class="flex gap-2">
          <NuxtLink :to="`/admin/product/${uuid}/edit`" class="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700">
            <PencilSquareIcon class="h-4 w-4" />
            Edit Product
          </NuxtLink>
          <NuxtLink to="/admin/product" class="inline-flex items-center gap-2 rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            Back to List
          </NuxtLink>
        </div>
      </div>

      <div v-if="pending" class="flex justify-center py-16">
        <div class="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900"></div>
      </div>

      <div v-else class="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div class="px-6 py-5 border-b border-gray-200 bg-gray-50">
          <h3 class="text-lg font-medium text-gray-900">Product Information</h3>
        </div>
        <div class="px-6 py-5">
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div class="flex border-b pb-2">
              <span class="w-1/3 font-medium text-gray-500">ID:</span>
              <span class="w-2/3 text-gray-900">{{ product?.id }}</span>
            </div>
            <div class="flex border-b pb-2">
              <span class="w-1/3 font-medium text-gray-500">UUID:</span>
              <span class="w-2/3 text-gray-900 font-mono text-sm break-all">{{ product?.uuid }}</span>
            </div>
            <div class="flex border-b pb-2">
              <span class="w-1/3 font-medium text-gray-500">Name:</span>
              <span class="w-2/3 text-gray-900 font-semibold">{{ product?.name }}</span>
            </div>
            <div class="flex border-b pb-2">
              <span class="w-1/3 font-medium text-gray-500">Price:</span>
              <span class="w-2/3 text-gray-900">₱{{ formatPrice(product?.price) }}</span>
            </div>
            <div class="flex border-b pb-2">
              <span class="w-1/3 font-medium text-gray-500">Created At:</span>
              <span class="w-2/3 text-gray-900">{{ formatDate(product?.created_at) }}</span>
            </div>
            <div class="flex border-b pb-2">
              <span class="w-1/3 font-medium text-gray-500">Updated At:</span>
              <span class="w-2/3 text-gray-900">{{ formatDate(product?.updated_at) }}</span>
            </div>
          </div>
        </div>
      </div>

      <FeedbackModal :open="isFeedbackModalOpen" :message="feedbackMessage" @close="closeFeedbackModal" />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { PencilSquareIcon } from '@heroicons/vue/24/outline'
import { productService } from '~/api/product/ProductService'

definePageMeta({
  middleware: 'auth'
})

const route = useRoute()
const uuid = route.params.uuid

const product = ref(null)
const pending = ref(true)
const isFeedbackModalOpen = ref(false)
const feedbackMessage = ref('')

const formatPrice = (price: string | number) => {
  if (!price) return '0.00'
  return Number(price).toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

const formatDate = (date: string) => {
  if (!date) return 'N/A'
  return new Date(date).toLocaleString()
}

const fetchProduct = async () => {
  pending.value = true
  try {
    const response = await productService.show(uuid)
    product.value = response
  } catch (error: any) {
    console.error('Error fetching product:', error)
    feedbackMessage.value = error.message || 'Failed to load product'
    isFeedbackModalOpen.value = true
  } finally {
    pending.value = false
  }
}

const closeFeedbackModal = () => {
  isFeedbackModalOpen.value = false
}

onMounted(() => {
  const token = localStorage.getItem('_token');
  if (!token) {
    navigateTo('/');
  } else {
    fetchProduct();
  }
})
</script>