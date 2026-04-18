<template>
  <div>
    <h1 class="text-xl font-bold mb-4">Edit Product</h1>
    <EntityForm
      :fields="fields"
      :service="productService"
      entityName="Product"
      :uuid="uuid"
      @success="feedbackMessage = 'Product updated successfully!'"
      @error="feedbackMessage = 'Error updating product.'"
    />
    <Feedback v-if="feedbackMessage" :message="feedbackMessage" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { productService } from '~/api/product/ProductService'
import EntityForm from '~/components/EntityForm.vue'
import Feedback from '~/components/Feedback.vue'

const route = useRoute()
const uuid = route.params.uuid as string

const feedbackMessage = ref('')

const fields = [
  { name: 'name', type: 'text', label: 'Product Name' },
  { name: 'price', type: 'number', label: 'Price' },
  { name: 'description', type: 'textarea', label: 'Description' },
]
</script>
