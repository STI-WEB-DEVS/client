<template>
  <form class="space-y-4" @submit.prevent="handleSubmit">
    <div>
      <label for="product-name" class="mb-1 block text-sm font-medium text-gray-700">Name</label>
      <input
        id="product-name"
        v-model="form.name"
        type="text"
        required
        class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none"
      />
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
});

const submitting = ref(false);

watch(
  () => props.product,
  (value) => {
    form.name = value?.name ?? '';
    form.price = value?.price != null ? String(value.price) : '';
  },
  { immediate: true }
);

const handleSubmit = async () => {
  submitting.value = true;

  try {
    if (props.mode === 'create') {
      const response = await productService.create({
        name: form.name,
        price: parseFloat(form.price),
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

    const response = await productService.update(uuid, {
      name: form.name,
      price: parseFloat(form.price),
    });

    emit('submitted', {
      success: true,
      message: 'Product updated successfully.',
      item: response?.data ?? response,
      action: 'update',
    });
  } catch (error: any) {
    emit('submitted', {
      success: false,
      message: error?.message || 'Failed to save product.',
      action: props.mode,
    });
  } finally {
    submitting.value = false;
  }
};
</script>
