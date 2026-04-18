<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ProductService } from '~/api/product/ProductService';
import UniversalForm from '~/components/UniversalForm.vue';
import FeedbackModal from '~/components/FeedbackModal.vue';

const route = useRoute();
const router = useRouter();
const uuid = route.params.uuid; // STEP 7: Extracting the UUID from the URL

const productData = ref(null);
const showFeedback = ref(false);
const feedbackMessage = ref('');

onMounted(async () => {
  const response = await ProductService.getById(uuid);
  productData.value = response.data; 
});

const handleUpdateSuccess = () => {
  feedbackMessage.value = "Product successfully updated!";
  showFeedback.value = true;
};

const handleDelete = async () => {
  try {
    await ProductService.delete(uuid);
    feedbackMessage.value = "Product deleted!";
    showFeedback.value = true;
    setTimeout(() => router.push('/product'), 1500);
  } catch (error) {
    feedbackMessage.value = "Error deleting product.";
    showFeedback.value = true;
  }
};
</script>

<template>
  <div v-if="productData">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold text-gray-900">Edit Product</h1>
      <button @click="handleDelete" class="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700">
        Delete Product
      </button>
    </div>

    <div class="rounded-lg bg-white p-6 shadow">
      <UniversalForm 
        mode="update" 
        :entityId="uuid"
        :service="ProductService" 
        :initialData="productData"
        @success="handleUpdateSuccess"
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