<template>
  <form class="space-y-4" @submit.prevent="handleSubmit">
    <div>
      <label :for="`entity-name-${entity}`" class="mb-1 block text-sm font-medium text-gray-700">Name</label>
      <input
        :id="`entity-name-${entity}`"
        v-model="form.name"
        type="text"
        required
        class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none"
      />
    </div>

    <div v-if="entity === 'customer'">
      <label for="entity-email" class="mb-1 block text-sm font-medium text-gray-700">Email</label>
      <input
        id="entity-email"
        v-model="form.email"
        type="email"
        required
        class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none"
      />
    </div>

    <div v-if="entity === 'product'">
      <label for="entity-price" class="mb-1 block text-sm font-medium text-gray-700">Price</label>
      <input
        id="entity-price"
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
import { customerService } from '~/api/customer/CustomerService';
import { productService } from '~/api/product/ProductService';

type EntityType = 'customer' | 'product';

const props = defineProps<{
  entity: EntityType;
  mode: 'create' | 'update';
  item?: any;
}>();

const emit = defineEmits<{
  (e: 'submitted', payload: { success: boolean; message: string; item?: any; action: string }): void;
  (e: 'cancel'): void;
}>();

const form = reactive({
  name: '',
  email: '',
  price: '',
});

const submitting = ref(false);

watch(
  () => props.item,
  (value) => {
    form.name = value?.name ?? '';
    form.email = value?.email ?? '';
    form.price = value?.price != null ? String(value.price) : '';
  },
  { immediate: true }
);

const handleSubmit = async () => {
  submitting.value = true;

  try {
    const isCreate = props.mode === 'create';
    const uuid = props.item?.uuid;

    if (props.entity === 'customer') {
      const payload = {
        name: form.name,
        email: form.email,
      };

      const response = isCreate
        ? await customerService.create(payload)
        : await customerService.update(String(uuid ?? ''), payload);

      emit('submitted', {
        success: true,
        message: `Customer ${isCreate ? 'created' : 'updated'} successfully.`,
        item: response?.data ?? response,
        action: props.mode,
      });
      return;
    }

    const payload = {
      name: form.name,
      price: parseFloat(form.price),
    };

    const response = isCreate
      ? await productService.create(payload)
      : await productService.update(String(uuid ?? ''), payload);

    emit('submitted', {
      success: true,
      message: `Product ${isCreate ? 'created' : 'updated'} successfully.`,
      item: response?.data ?? response,
      action: props.mode,
    });
  } catch (error: any) {
    emit('submitted', {
      success: false,
      message: error?.message || 'Failed to save record.',
      action: props.mode,
    });
  } finally {
    submitting.value = false;
  }
};
</script>
