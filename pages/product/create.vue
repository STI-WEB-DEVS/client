<template>
  <div>
    <h1 class="text-xl font-bold mb-4">Create Product</h1>
    <EntityForm
      :fields="fields"
      :service="productService"
      entityName="Product"
      @success="feedbackMessage = 'Product created successfully!'"
      @error="feedbackMessage = 'Error creating product.'"
    />
    <Feedback v-if="feedbackMessage" :message="feedbackMessage" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { productService } from '~/api/product/ProductService'
import EntityForm from '~/components/EntityForm.vue'
import Feedback from '~/components/Feedback.vue'

const feedbackMessage = ref('')

const fields = [
  { name: 'name', type: 'text', label: 'Product Name' },
  { name: 'price', type: 'number', label: 'Price' },
  { name: 'description', type: 'textarea', label: 'Description' },
]
</script>
