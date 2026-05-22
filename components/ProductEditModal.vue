<template>
  <div v-if="open" class="fixed inset-0 flex items-center justify-center bg-black/50">
    <div class="bg-white rounded-lg p-6 w-full max-w-md">
      <h2 class="text-lg font-semibold mb-4">Edit Product</h2>
      <ProductForm
        :product="product"
        submitLabel="Save"
        @submit="updateProduct"
        @cancel="$emit('close')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ProductForm from '~/components/ProductForm.vue'
import { productService } from '~/api/product/ProductService'

const props = defineProps<{ open: boolean; product: any }>()
const emit = defineEmits(['close', 'updated'])

const updateProduct = async (payload: any) => {
  await productService.update(payload.uuid, payload)
  emit('updated')
  emit('close')
}
</script>
