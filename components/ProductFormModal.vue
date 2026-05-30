<template>
  <teleport to="body">
    <transition name="fade">
      <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/30 backdrop-blur-sm" @click="handleClose" />
        <div class="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
          <div class="flex items-start justify-between gap-4">
            <div>
              <h2 class="text-lg font-semibold text-gray-900">
                {{ product ? 'Edit Product' : 'Create Product' }}
              </h2>
            </div>
            <button @click="handleClose" type="button" class="rounded-md p-2 text-gray-400 hover:bg-gray-100">x</button>
          </div>

          <form @submit.prevent="handleSubmit" class="mt-6 space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Product Name</label>
              <input
                v-model="form.name"
                type="text"
                required
                pattern="^(?=.*[A-Za-z])[A-Za-z0-9 ]+$"
                title="Product name must contain at least one letter and may only contain letters, numbers, and spaces."
                class="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-900"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Description</label>
              <input
                v-model="form.description"
                type="text"
                required
                class="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-900"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Price</label>
              <input
                v-model="form.price"
                type="number"
                step="0.01"
                required
                class="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-900"
              />
            </div>

            <div v-if="isEditMode" class="space-y-3">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-5">Current Stock</label>
                <input
                  :value="form.quantity"
                  type="number"
                  readonly
                  class="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-100 px-3 py-2 text-sm text-gray-600 shadow-sm focus:outline-none"
                />
              </div>

              <button
                type="button"
                @click="toggleAddStock"
                class="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                {{ showAddStockField ? 'Cancel Add Stock' : 'Add Stock' }}
              </button>

              <div v-if="showAddStockField">
                <label class="block text-sm font-medium text-gray-700 mt-5">Add Stock</label>
                <input
                  v-model="form.addedQuantity"
                  type="number"
                  min="0"
                  step="1"
                  class="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-900"
                />
                <p class="mt-2 text-sm text-gray-500">
                  New stock total: {{ computedQuantity }}
                </p>
              </div>
            </div>

            <div v-else>
              <label class="block text-sm font-medium text-gray-700">Quantity</label>
              <input
                v-model="form.quantity"
                type="number"
                min="0"
                step="1"
                required
                class="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-900"
              />
            </div>

            <div class="mt-6 flex justify-end gap-3">
              <button @click="handleClose" type="button" class="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
                Cancel
              </button>
              <button :disabled="loading" type="submit" class="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50">
                {{ loading ? 'Saving...' : 'Save Product' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { computed, nextTick, reactive, ref, watch } from 'vue';

type ProductFormProduct = {
  uuid?: string;
  name?: string;
  description?: string;
  price?: number | string;
  quantity?: number | string;
};

const props = defineProps<{
  open: boolean;
  loading?: boolean;
  product?: ProductFormProduct | null;
}>();

const emit = defineEmits<{
  close: [];
  submit: [payload: { name: string; description: string; price: string; quantity: number }];
}>();

const showAddStockField = ref(false);
const form = reactive({
  name: '',
  description: '',
  price: '',
  quantity: '0',
  addedQuantity: '0',
});

const isEditMode = computed(() => Boolean(props.product));

const normalizeNumber = (value: number | string | undefined) => {
  const parsed = Number(value ?? 0);
  return Number.isFinite(parsed) ? parsed : 0;
};

const computedQuantity = computed(() => normalizeNumber(form.quantity) + normalizeNumber(form.addedQuantity));

watch(
  () => props.open,
  async (isOpen) => {
    if (!isOpen) {
      return;
    }

    await nextTick();

    if (props.product) {
      form.name = props.product.name || '';
      form.description = props.product.description || '';
      form.price = props.product.price?.toString() || '';
      form.quantity = normalizeNumber(props.product.quantity).toString();
    } else {
      form.name = '';
      form.description = '';
      form.price = '';
      form.quantity = '0';
    }

    form.addedQuantity = '0';
    showAddStockField.value = false;
  }
);

const toggleAddStock = () => {
  showAddStockField.value = !showAddStockField.value;
  if (!showAddStockField.value) {
    form.addedQuantity = '0';
  }
};

const handleClose = () => emit('close');

const handleSubmit = () => {
  emit('submit', {
    name: form.name,
    description: form.description,
    price: form.price,
    quantity: isEditMode.value ? computedQuantity.value : normalizeNumber(form.quantity),
  });
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
