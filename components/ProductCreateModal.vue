<template>
  <div v-if="open" class="fixed inset-0 flex items-center justify-center bg-black/50">
    <div class="bg-white rounded-lg p-6 w-full max-w-md">
      <h2 class="text-lg font-semibold mb-4">Create Product</h2>
      <ProductForm
        submitLabel="Create"
        @submit="createProduct"
        @cancel="$emit('close')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ProductForm from '~/components/ProductForm.vue'
import { productService } from '~/api/product/ProductService'

const props = defineProps<{ open: boolean }>()
const emit = defineEmits(['close', 'created'])

const createProduct = async (payload: any) => {
  await productService.create(payload)
  emit('created')
  emit('close')
}
</script>
