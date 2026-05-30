<template>
  <form class="space-y-4" @submit.prevent="handleSubmit">
    <div>
      <label for="product-name" class="mb-1 block text-sm font-medium text-gray-700">Name</label>
      <input
        id="product-name"
        v-model="form.name"
        type="text"
        required
        pattern="[a-zA-Z\s\-']+"
        title="Product name must contain only letters, spaces, hyphens, and apostrophes"
        class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none"
      />
      <p v-if="errors.name" class="mt-1 text-xs text-red-600">{{ errors.name }}</p>
    </div>

    <div>
      <label for="product-price" class="mb-1 block text-sm font-medium text-gray-700">Price</label>
      <input
        id="product-price"
        v-model="form.price"
        type="number"
        min="0"
        step="0.01"
        required
        class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none"
      />
      <p v-if="errors.price" class="mt-1 text-xs text-red-600">{{ errors.price }}</p>
    </div>

    <div>
      <label for="product-description" class="mb-1 block text-sm font-medium text-gray-700">Description</label>
      <textarea
        id="product-description"
        v-model="form.description"
        rows="3"
        class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none"
        placeholder="Enter product description (optional)"
      ></textarea>
    </div>

    <div>
      <label for="product-stock" class="mb-1 block text-sm font-medium text-gray-700">Stock Quantity</label>
      <input
        id="product-stock"
        v-model="form.stock"
        type="number"
        min="0"
        step="1"
        :required="mode === 'create'"
        :disabled="mode === 'update'"
        :class="mode === 'update' ? 'bg-gray-100 cursor-not-allowed' : ''"
        class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none"
      />
      <p v-if="mode === 'update'" class="mt-1 text-xs text-gray-500">
        Use the "Restock" button to add more stock
      </p>
      <p v-if="errors.stock" class="mt-1 text-xs text-red-600">{{ errors.stock }}</p>
    </div>

    <div class="flex items-center justify-end gap-2 pt-2">
      <button
        type="button"
        class="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
        @click="emit('cancel')"
      >
        Cancel
      </button>
      <button
        type="submit"
        :disabled="submitting"
        class="rounded-md bg-gray-900 px-4 py-2 text-sm text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {{ submitting ? 'Saving...' : mode === 'create' ? 'Create' : 'Update' }}
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import { productService } from '~/api/product/ProductService';

const props = defineProps<{
  mode: 'create' | 'update';
  product?: any;
}>();

const emit = defineEmits<{
  (e: 'submitted', payload: { success: boolean; message: string; item?: any; action: string }): void;
  (e: 'cancel'): void;
}>();

const form = reactive({
  name: '',
  price: '',
  description: '',
  stock: '',
});

const errors = reactive({
  name: '',
  price: '',
  stock: '',
});

const submitting = ref(false);

watch(
  () => props.product,
  (value) => {
    form.name = value?.name ?? '';
    form.price = value?.price != null ? String(value.price) : '';
    form.description = value?.description ?? '';
    form.stock = value?.stock != null ? String(value.stock) : '0';
  },
  { immediate: true }
);

const validateForm = () => {
  errors.name = '';
  errors.price = '';
  errors.stock = '';
  
  let isValid = true;

  // Validate name - only letters, spaces, hyphens, apostrophes
  const namePattern = /^[a-zA-Z\s\-']+$/;
  if (!namePattern.test(form.name)) {
    errors.name = 'Product name must contain only letters, spaces, hyphens, and apostrophes.';
    isValid = false;
  }

  // Validate price - must be numeric
  const priceNum = parseFloat(form.price);
  if (isNaN(priceNum) || priceNum < 0) {
    errors.price = 'Price must be a valid number greater than or equal to 0.';
    isValid = false;
  }

  // Validate stock only for create mode
  if (props.mode === 'create') {
    const stockNum = parseInt(form.stock, 10);
    if (isNaN(stockNum) || stockNum < 0 || !Number.isInteger(stockNum)) {
      errors.stock = 'Stock must be a valid whole number greater than or equal to 0.';
      isValid = false;
    }
  }

  return isValid;
};

const handleSubmit = async () => {
  if (!validateForm()) {
    return;
  }

  submitting.value = true;

  try {
    if (props.mode === 'create') {
      const response = await productService.create({
        name: form.name,
        price: parseFloat(form.price),
        description: form.description || null,
        stock: parseInt(form.stock, 10),
      });

      emit('submitted', {
        success: true,
        message: 'Product created successfully.',
        item: response?.data ?? response,
        action: 'create',
      });
      return;
    }

    const uuid = props.product?.uuid;
    if (!uuid) {
      emit('submitted', {
        success: false,
        message: 'Unable to update product: missing product ID.',
        action: 'update',
      });
      return;
    }

    // Don't send stock in update payload - use restock endpoint instead
    const response = await productService.update(uuid, {
      name: form.name,
      price: parseFloat(form.price),
      description: form.description || null,
    });

    emit('submitted', {
      success: true,
      message: 'Product updated successfully.',
      item: response?.data ?? response,
      action: 'update',
    });
  } catch (error: any) {
    const errorMessage = error?.data?.message || error?.message || 'Failed to save product.';
    
    // Check for validation errors from backend
    if (error?.data?.errors) {
      const backendErrors = error.data.errors;
      if (backendErrors.name) errors.name = backendErrors.name[0];
      if (backendErrors.price) errors.price = backendErrors.price[0];
      if (backendErrors.stock) errors.stock = backendErrors.stock[0];
    }

    emit('submitted', {
      success: false,
      message: errorMessage,
      action: props.mode,
    });
  } finally {
    submitting.value = false;
  }
};
</script>