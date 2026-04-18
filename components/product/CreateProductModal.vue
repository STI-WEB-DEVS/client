<template>
  <teleport to="body">
    <transition name="fade">
      <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center p-4">

        <div class="absolute inset-0 bg-black/30 backdrop-blur-sm" @click="closeModal" />

        <div class="relative z-10 w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">

          <!-- header -->
          <div>
            <h2 class="text-lg font-semibold text-gray-900">Create Product</h2>
            <p class="mt-1 text-sm text-gray-500">Enter product details</p>
          </div>

          <!-- form -->
          <form @submit.prevent="handleSubmit" class="mt-6 space-y-5">

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
              <input v-model="form.name" type="text" required
                class="w-full rounded-lg border border-gray-300 px-4 py-3" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Price *</label>
              <input v-model="form.price" type="number" step="0.01" required
                class="w-full rounded-lg border border-gray-300 px-4 py-3" />
            </div>

            <!-- actions -->
            <div class="mt-8 flex justify-end gap-3">

              <button type="button" @click="closeModal"
                class="px-5 py-2.5 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
                Cancel
              </button>

              <button type="submit" :disabled="loading"
                class="px-6 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50">
                {{ loading ? 'Creating...' : 'Create Product' }}
              </button>

            </div>

          </form>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { productService } from '~/api/product/ProductService'

const props = defineProps<{ open: boolean }>()
const emit = defineEmits<{ (e: 'close'): void; (e: 'created'): void }>()

const form = ref({ name: '', price: '' })
const loading = ref(false)

const handleSubmit = async () => {
  loading.value = true
  try {
    await productService.create(form.value)
    emit('created')
    resetForm()
    emit('close')
  } finally {
    loading.value = false
  }
}

const resetForm = () => (form.value = { name: '', price: '' })
const closeModal = () => emit('close')
</script>