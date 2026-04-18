<script setup>
import { ref } from 'vue';
import { ProductService } from '~/api/product/ProductService'; 
import UniversalForm from '~/components/UniversalForm.vue';
import FeedbackModal from '~/components/FeedbackModal.vue';

const showFeedback = ref(false);
const feedbackMessage = ref('');

const handleSuccess = () => {
  feedbackMessage.value = "Product successfully created!";
  showFeedback.value = true;
};

const handleError = () => {
  feedbackMessage.value = "Failed to process request.";
  showFeedback.value = true;
};
</script>

<template>
  <div>
    <h1 class="mb-6 text-2xl font-bold text-gray-900">Products</h1>
    
    <div class="rounded-lg bg-white p-6 shadow">
      <h2 class="mb-4 text-lg font-semibold">Add New Product</h2>
      <UniversalForm 
        mode="create" 
        :service="ProductService" 
        @success="handleSuccess"
        @error="handleError"
      >
        <template #default="{ formData }">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Product Name</label>
            <input v-model="formData.name" type="text" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2" />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Price</label>
            <input v-model="formData.price" type="number" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2" />
          </div>
        </template>
      </UniversalForm>
    </div>

    <FeedbackModal 
      :open="showFeedback" 
      :message="feedbackMessage" 
      @close="showFeedback = false" 
    />
  </div>
</template>