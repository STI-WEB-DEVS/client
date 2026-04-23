<template>
  <!-- Create Modal -->
  <div v-if="openModal === 'create'" class="fixed inset-0 z-50 flex items-center justify-center">
    <div class="absolute inset-0 bg-black/40" @click="$emit('close')" />
    <div class="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
      <h2 class="text-lg font-semibold text-gray-900">Create Product</h2>
      <p class="mt-1 text-sm text-gray-500">Fill in the details to create a new product.</p>

      <div class="mt-4 space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Name</label>
          <input
            v-model="form.name"
            type="text"
            placeholder="Product name"
            class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Price</label>
          <input
            v-model="form.price"
            type="number"
            placeholder="0.00"
            class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
          />
        </div>
      </div>

      <div class="mt-6 flex justify-end gap-2">
        <button
          type="button"
          @click="$emit('close')"
          class="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="button"
          @click="$emit('submit', 'create', form)"
          class="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          Create
        </button>
      </div>
    </div>
  </div>

  <!-- Edit Modal -->
  <div v-if="openModal === 'edit'" class="fixed inset-0 z-50 flex items-center justify-center">
    <div class="absolute inset-0 bg-black/40" @click="$emit('close')" />
    <div class="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
      <h2 class="text-lg font-semibold text-gray-900">Edit Product</h2>
      <p class="mt-1 text-sm text-gray-500">Update the product's details.</p>

      <div class="mt-4 space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Name</label>
          <input
            v-model="form.name"
            type="text"
            class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Price</label>
          <input
            v-model="form.price"
            type="number"
            class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
          />
        </div>
      </div>

      <div class="mt-6 flex justify-end gap-2">
        <button
          type="button"
          @click="$emit('close')"
          class="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="button"
          @click="$emit('submit', 'edit', form)"
          class="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          Save Changes
        </button>
      </div>
    </div>
  </div>

  <!-- Delete Modal -->
  <div v-if="openModal === 'delete'" class="fixed inset-0 z-50 flex items-center justify-center">
    <div class="absolute inset-0 bg-black/40" @click="$emit('close')" />
    <div class="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
      <h2 class="text-lg font-semibold text-gray-900">Delete Product</h2>
      <p class="mt-4 text-sm text-gray-600">
        Are you sure you want to delete
        <span class="font-semibold text-gray-900">{{ product?.name }}</span>?
        This action cannot be undone.
      </p>

      <div v-if="error" class="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
        {{ error }}
      </div>

      <div class="mt-6 flex justify-end gap-2">
        <button
          type="button"
          @click="$emit('close')"
          class="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="button"
          :disabled="loading"
          @click="handleDelete"
          class="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
        >
          <span v-if="loading" class="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          {{ loading ? 'Deleting...' : 'Delete' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue'
  import { productService } from '~/api/product/ProductService'

  const props = defineProps<{
    openModal: 'create' | 'edit' | 'delete' | null
    product?: any
  }>()

  const emit = defineEmits<{
    close: []
    submit: [action: 'create' | 'edit', form: { name: string; price: string }]
    success: [action: 'deleted']
  }>()

  const form = ref({ name: '', price: '' })
  const loading = ref(false)
  const error = ref('')

  watch(() => props.product, (val) => {
    if (val) {
      form.value.name = val.name ?? ''
      form.value.price = val.price ?? ''
    } else {
      form.value = { name: '', price: '' }
    }
  }, { immediate: true })

  const handleDelete = async () => {
    loading.value = true
    error.value = ''
    try {
      await productService.delete(props.product.uuid)
      emit('close')
      emit('success', 'deleted')
    } catch (err: any) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }
</script>