<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <div>
      <label class="block text-sm font-medium">Product Name</label>
      <input
        v-model="form.name"
        type="text"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
      />
    </div>

    <div>
      <label class="block text-sm font-medium">Price</label>
      <input
        v-model="form.price"
        type="number"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
      />
    </div>

    <button type="submit" class="px-4 py-2 bg-indigo-600 text-white rounded">
      {{ mode === 'create' ? 'Create Product' : 'Update Product' }}
    </button>

    <!-- Feedback message -->
    <FeedbackModal :open="!!feedbackMessage" :message="feedbackMessage" @close="feedbackMessage = ''" />
  </form>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { productService } from '~/api/product/ProductService'
import FeedbackModal from '~/components/FeedbackModal.vue'

const props = defineProps({
  mode: { type: String, default: 'create' }, // 'create' or 'update'
  uuid: { type: String, default: null },
  initialData: { type: Object, default: () => ({}) }
})

const form = ref({ name: '', price: '' })
const feedbackMessage = ref('')

// Automatically pre-fill when initialData changes (useful for edit page)
watch(
  () => props.initialData,
  (newData) => {
    if (props.mode === 'update' && newData) {
      form.value = { ...newData }
    }
  },
  { immediate: true }
)

async function handleSubmit() {
  try {
    if (props.mode === 'create') {
      await productService.create(form.value)
      feedbackMessage.value = 'Product created successfully!'
      form.value = { name: '', price: '' } // reset after create
    } else {
      await productService.update(props.uuid, form.value)
      feedbackMessage.value = 'Product updated successfully!'
    }
  } catch (err: any) {
    feedbackMessage.value = `Error: ${err.message}`
  }
}
</script>
