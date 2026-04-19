cat > pages/products/create.vue << 'EOF'
<template>
  <NuxtLayout>
    <div class="space-y-6">
      <div>
        <h1 class="text-xl font-semibold tracking-tight text-gray-900">Create Product</h1>
        <p class="mt-1 text-sm text-gray-500">Add a new product to the catalog</p>
      </div>

      <div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Name *</label>
            <input
              v-model="form.name"
              type="text"
              required
              class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-gray-500 focus:outline-none"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Price *</label>
            <input
              v-model="form.price"
              type="number"
              step="0.01"
              required
              class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-gray-500 focus:outline-none"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              v-model="form.description"
              rows="3"
              class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-gray-500 focus:outline-none"
            ></textarea>
          </div>

          <div class="flex gap-3 pt-4">
            <button
              type="submit"
              :disabled="loading"
              class="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
            >
              {{ loading ? 'Creating...' : 'Create Product' }}
            </button>
            <button
              type="button"
              @click="router.back()"
              class="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </form>
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import ProductService from '~/api/product/ProductService'

const router = useRouter()
const loading = ref(false)
const isFeedbackModalOpen = ref(false)
const feedbackMessage = ref('')

const form = ref({
  name: '',
  price: '',
  description: ''
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

const handleSubmit = async () => {
  loading.value = true
  try {
    await ProductService.create({
      name: form.value.name,
      price: parseFloat(form.value.price),
      description: form.value.description
    })
    showFeedback('Product created successfully!')
  } catch (err: any) {
    showFeedback(err.message || 'Failed to create product')
  } finally {
    loading.value = false
  }
}
</script>
EOF