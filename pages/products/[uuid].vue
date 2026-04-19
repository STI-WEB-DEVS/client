cat > pages/products/[uuid].vue << 'EOF'
<template>
  <NuxtLayout>
    <div class="space-y-6">
      <div>
        <h1 class="text-xl font-semibold tracking-tight text-gray-900">Product Details</h1>
        <p class="mt-1 text-sm text-gray-500">
          UUID: {{ uuid }}
        </p>
      </div>

      <div v-if="pending" class="flex justify-center py-16">
        <div class="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900"></div>
      </div>

      <div v-else-if="error" class="rounded-xl border border-red-200 bg-red-50 p-4">
        <p class="text-sm text-red-700">{{ error.message }}</p>
      </div>

      <div v-else class="space-y-4">
        <div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div class="space-y-4">
            <div>
              <p class="text-sm text-gray-500">Product Name</p>
              <p class="mt-1 text-base font-medium text-gray-900">{{ product?.name }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Price</p>
              <p class="mt-1 text-base font-medium text-gray-900">${{ product?.price }}</p>
            </div>
            <div v-if="product?.description">
              <p class="text-sm text-gray-500">Description</p>
              <p class="mt-1 text-base text-gray-700">{{ product?.description }}</p>
            </div>
          </div>
        </div>

        <div class="flex gap-3">
          <button
            @click="handleEdit"
            class="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
          >
            Edit Product
          </button>
          <button
            @click="handleDelete"
            class="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
          >
            Delete Product
          </button>
        </div>
      </div>

      <FeedbackModal
        :open="isFeedbackModalOpen"
        :message="feedbackMessage"
        @close="closeFeedbackModal"
      />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ProductService from '~/api/product/ProductService'

const route = useRoute()
const router = useRouter()

const uuid = computed(() => String(route.params.uuid))
const product = ref<any>(null)
const pending = ref(true)
const error = ref<any>(null)
const isFeedbackModalOpen = ref(false)
const feedbackMessage = ref('')

const fetchProduct = async () => {
  pending.value = true
  error.value = null

  try {
    product.value = await ProductService.get(uuid.value)
  } catch (err: any) {
    error.value = err
  } finally {
    pending.value = false
  }
}

onMounted(() => {
  fetchProduct()
})

const showFeedback = (message: string) => {
  feedbackMessage.value = message
  isFeedbackModalOpen.value = true
}

const closeFeedbackModal = () => {
  isFeedbackModalOpen.value = false
  feedbackMessage.value = ''
  router.push('/products')
}

const handleEdit = () => {
  router.push(`/products/edit/${uuid.value}`)
}

const handleDelete = async () => {
  if (confirm('Are you sure you want to delete this product?')) {
    try {
      await ProductService.delete(uuid.value)
      showFeedback('Product deleted successfully!')
    } catch (err: any) {
      showFeedback(err.message || 'Failed to delete product')
    }
  }
}
</script>
EOF