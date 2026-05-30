<template>
  <div
    v-if="open"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
  >
    <div class="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
      <h2 class="text-lg font-semibold text-gray-900">
        {{ isEditMode ? "Edit Product" : "Create New Product" }}
      </h2>
      <p class="mb-6 text-sm text-gray-500">
        {{
          isEditMode
            ? "Update the product details below."
            : "Fill in the information to add a new product."
        }}
      </p>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <!-- Name -->
        <div>
          <label class="block text-sm font-medium text-gray-700"
            >Product Name</label
          >
          <input
            v-model="form.name"
            type="text"
            required
            placeholder="e.g. Wireless Mouse"
            @input="validateName"
            :class="[
              'mt-1 block w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-1',
              nameError
                ? 'border-red-400 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:border-gray-900 focus:ring-gray-900',
            ]"
          />
          <p v-if="nameError" class="mt-1 text-xs text-red-600">
            {{ nameError }}
          </p>
        </div>

        <!-- Description -->
        <div>
          <label class="block text-sm font-medium text-gray-700">
            Description
            <span class="ml-1 text-xs font-normal text-gray-400"
              >(optional)</span
            >
          </label>
          <textarea
            v-model="form.description"
            rows="3"
            placeholder="e.g. A high-quality wireless mouse with ergonomic design."
            class="mt-1 block w-full resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
          />
        </div>

        <!-- Price -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Price</label>
          <div class="relative mt-1">
            <span class="absolute left-3 top-2 text-sm text-gray-500">₱</span>
            <input
              v-model.number="form.price"
              type="number"
              step="0.01"
              min="0.01"
              required
              placeholder="0.00"
              @input="validatePrice"
              :class="[
                'block w-full rounded-lg border pl-7 pr-3 py-2 text-sm focus:outline-none focus:ring-1',
                priceError
                  ? 'border-red-400 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:border-gray-900 focus:ring-gray-900',
              ]"
            />
          </div>
          <p v-if="priceError" class="mt-1 text-xs text-red-600">
            {{ priceError }}
          </p>
        </div>

        <!-- CREATE MODE: Initial Stock -->
        <div v-if="!isEditMode">
          <label class="block text-sm font-medium text-gray-700"
            >Initial Stock Quantity</label
          >
          <input
            v-model.number="form.stock_quantity"
            type="number"
            min="0"
            required
            placeholder="e.g. 100"
            class="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
          />
        </div>

        <!-- EDIT MODE: Current stock + Restock -->
        <div v-else class="space-y-3">
          <div class="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
            <p
              class="text-xs font-semibold uppercase tracking-wider text-gray-400"
            >
              Current Stock
            </p>
            <div class="mt-1 flex items-center gap-2">
              <span class="text-2xl font-bold text-gray-900">
                {{ props.product?.stock_quantity ?? 0 }}
              </span>
              <span
                :class="[
                  'rounded-full px-2 py-0.5 text-xs font-semibold',
                  props.product?.stock_quantity === 0
                    ? 'bg-red-100 text-red-700'
                    : props.product?.stock_quantity <= 5
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-green-100 text-green-700',
                ]"
              >
                {{
                  props.product?.stock_quantity === 0
                    ? "Out of Stock"
                    : props.product?.stock_quantity <= 5
                      ? "Low Stock"
                      : "In Stock"
                }}
              </span>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">
              Add Restock Quantity
              <span class="ml-1 text-xs font-normal text-gray-400"
                >(adds to current stock)</span
              >
            </label>
            <input
              v-model.number="form.restock"
              type="number"
              min="0"
              placeholder="e.g. 50"
              class="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
            />
            <p
              v-if="form.restock > 0"
              class="mt-1 text-xs font-medium text-indigo-600"
            >
              New total will be:
              {{
                (props.product?.stock_quantity ?? 0) + (form.restock ?? 0)
              }}
              units
            </p>
          </div>
        </div>

        <div class="mt-6 flex justify-end gap-3">
          <button
            type="button"
            @click="$emit('close')"
            class="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            :disabled="loading || !!nameError || !!priceError"
            class="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800 disabled:opacity-50"
          >
            <span v-if="loading">Saving...</span>
            <span v-else>{{
              isEditMode ? "Update Product" : "Save Product"
            }}</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";

const props = defineProps<{
  open: boolean;
  loading: boolean;
  product: any | null;
}>();

const emit = defineEmits(["close", "submit"]);

const form = ref({
  name: "",
  description: "",
  price: null as number | null,
  stock_quantity: null as number | null,
  restock: 0,
});

const nameError = ref("");
const priceError = ref("");

const isEditMode = computed(() => !!props.product);

const validateName = () => {
  const val = form.value.name.trim();
  if (!val) {
    nameError.value = "";
    return;
  }
  if (!/[a-zA-Z]/.test(val)) {
    nameError.value =
      "Product name must contain at least one letter, not numbers only.";
  } else {
    nameError.value = "";
  }
};

const validatePrice = () => {
  const val = form.value.price;
  if (val === null || val === undefined) {
    priceError.value = "";
    return;
  }
  if (val <= 0) {
    priceError.value = "Price must be greater than zero.";
  } else {
    priceError.value = "";
  }
};

watch(
  () => props.open,
  (isOpen) => {
    if (!isOpen) return;
    nameError.value = "";
    priceError.value = "";
    if (props.product) {
      form.value = {
        name: props.product.name,
        description: props.product.description ?? "",
        price: props.product.price,
        stock_quantity: null,
        restock: 0,
      };
    } else {
      form.value = {
        name: "",
        description: "",
        price: null,
        stock_quantity: null,
        restock: 0,
      };
    }
  },
);

const handleSubmit = () => {
  validateName();
  validatePrice();
  if (nameError.value || priceError.value) return;

  const payload: any = {
    name: form.value.name,
    description: form.value.description,
    price: form.value.price,
  };

  if (isEditMode.value) {
    if (form.value.restock && form.value.restock > 0) {
      payload.restock = form.value.restock;
    }
  } else {
    payload.stock_quantity = form.value.stock_quantity;
  }

  emit("submit", payload);
};
</script>
