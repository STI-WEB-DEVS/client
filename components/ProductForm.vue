<template>
  <div
    v-if="open"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
  >
    <div class="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg space-y-4 max-h-[90vh] overflow-y-auto">
      <!-- Title -->
      <div class="flex justify-between items-center">
        <h2 class="text-lg font-semibold text-gray-900">
          {{ product ? "Edit Product" : "Create Product" }}
        </h2>
        <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700">✕</button>
      </div>

      <!-- Form -->
      <div class="space-y-4">
        <!-- Name -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Product Name</label>
          <input
            v-model="form.name"
            type="text"
            class="mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none"
            :class="errors.name ? 'border-red-400 focus:border-red-500' : 'border-gray-300 focus:border-gray-900'"
            placeholder="e.g. Invi 12"
          />
          <p v-if="errors.name" class="mt-1 text-xs text-red-500">{{ errors.name }}</p>
        </div>

        <!-- Description -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            v-model="form.description"
            rows="3"
            class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none resize-none"
            placeholder="Enter product description (optional)"
          />
        </div>

        <!-- Price -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Price (₱)</label>
          <input
            v-model="form.price"
            type="number"
            step="0.01"
            min="0.01"
            class="mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none"
            :class="errors.price ? 'border-red-400 focus:border-red-500' : 'border-gray-300 focus:border-gray-900'"
            placeholder="Enter price"
          />
          <p v-if="errors.price" class="mt-1 text-xs text-red-500">{{ errors.price }}</p>
        </div>

        <!-- Stock Quantity — only on CREATE -->
        <div v-if="!product">
          <label class="block text-sm font-medium text-gray-700">Stock Quantity</label>
          <input
            v-model="form.stock_quantity"
            type="number"
            min="0"
            class="mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none"
            :class="errors.stock_quantity ? 'border-red-400 focus:border-red-500' : 'border-gray-300 focus:border-gray-900'"
            placeholder="Enter initial stock"
          />
          <p v-if="errors.stock_quantity" class="mt-1 text-xs text-red-500">{{ errors.stock_quantity }}</p>
        </div>

        <!-- Restock — only on EDIT -->
        <div v-if="product">
          <label class="block text-sm font-medium text-gray-700">
            Restock Quantity
            <span class="ml-1 text-xs font-normal text-gray-400">
              (current stock: {{ product.stock_quantity ?? 0 }})
            </span>
          </label>
          <input
            v-model="form.restock_quantity"
            type="number"
            min="1"
            class="mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none"
            :class="errors.restock_quantity ? 'border-red-400 focus:border-red-500' : 'border-gray-300 focus:border-gray-900'"
            placeholder="Enter quantity to add to stock"
          />
          <p class="mt-1 text-xs text-gray-500">
            This value will be <span class="font-semibold">added</span> to the current stock.
          </p>
          <p v-if="errors.restock_quantity" class="mt-1 text-xs text-red-500">{{ errors.restock_quantity }}</p>
        </div>

        <!-- Buttons -->
        <div class="flex justify-end gap-2 pt-2">
          <button
            type="button"
            @click="$emit('close')"
            class="rounded-lg border border-gray-300 px-4 py-2 text-sm"
          >
            Cancel
          </button>
          <button
            type="button"
            @click="handleSubmit"
            :disabled="loading"
            class="rounded-lg bg-gray-900 px-4 py-2 text-sm text-white hover:bg-gray-800 disabled:opacity-50"
          >
            {{ loading ? "Saving..." : product ? "Update" : "Create" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps({
  open: Boolean,
  loading: Boolean,
  product: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(["close", "submit"]);

const form = ref({
  name: "",
  description: "",
  price: "",
  stock_quantity: "",
  restock_quantity: "",
});

const errors = ref({
  name: "",
  price: "",
  stock_quantity: "",
  restock_quantity: "",
});

const resetForm = () => {
  form.value = { name: "", description: "", price: "", stock_quantity: "", restock_quantity: "" };
  errors.value = { name: "", price: "", stock_quantity: "", restock_quantity: "" };
};

// Populate form when editing
watch(
  () => props.product,
  (val) => {
    if (val) {
      form.value = {
        name: val.name || "",
        description: val.description || "",
        price: val.price || "",
        stock_quantity: "",
        restock_quantity: "",
      };
    } else {
      resetForm();
    }
  },
  { immediate: true }
);

// Reset when modal closes
watch(
  () => props.open,
  (val) => { if (!val) resetForm(); }
);

const validate = (): boolean => {
  errors.value = { name: "", price: "", stock_quantity: "", restock_quantity: "" };
  let valid = true;

  // Name: required
  if (!form.value.name.trim()) {
    errors.value.name = "Product name is required.";
    valid = false;
  }
  
  // NEW: Tan-awon kon duna ba'y mga special characters (Dawaton lang ang letra, numero, ug space)
  else if (!/^[a-zA-Z0-9\s]+$/.test(form.value.name.trim())) {
    errors.value.name = "Product name can only contain letters, numbers, and spaces. Special characters are not allowed.";
    valid = false;
  }
  // Name: cannot be purely numeric (digits only, e.g. "123456")
  else if (/^\d+$/.test(form.value.name.trim())) {
    errors.value.name = "Product name cannot be numbers only (e.g. '123456' is invalid, 'Invi 12' is valid).";
    valid = false;
  }

  // Price: required and > 0
  if (!form.value.price) {
    errors.value.price = "Price is required.";
    valid = false;
  } else if (parseFloat(String(form.value.price)) <= 0) {
    errors.value.price = "Price must be greater than 0.";
    valid = false;
  }

  if (!props.product) {
    // CREATE: stock_quantity required and >= 0
    if (form.value.stock_quantity === "" || form.value.stock_quantity === null) {
      errors.value.stock_quantity = "Stock quantity is required.";
      valid = false;
    } else if (parseInt(String(form.value.stock_quantity)) < 0) {
      errors.value.stock_quantity = "Stock quantity cannot be negative.";
      valid = false;
    }
  } else {
    // EDIT: restock_quantity is optional; if filled, must be >= 1
    if (form.value.restock_quantity !== "" && form.value.restock_quantity !== null) {
      if (parseInt(String(form.value.restock_quantity)) < 1) {
        errors.value.restock_quantity = "Restock quantity must be at least 1.";
        valid = false;
      }
    }
  }

  return valid;
};

const handleSubmit = () => {
  if (!validate()) return;

  emit("submit", {
    name: form.value.name.trim(),
    description: form.value.description.trim(),
    price: form.value.price,
    // Include the right stock field depending on mode
    ...(!props.product
      ? { stock_quantity: parseInt(String(form.value.stock_quantity)) }
      : form.value.restock_quantity
        ? { restock_quantity: parseInt(String(form.value.restock_quantity)) }
        : {}
    ),
  });
};
</script>