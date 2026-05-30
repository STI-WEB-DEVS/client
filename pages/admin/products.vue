<template>
  <NuxtLayout>
    <div>
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-gray-900">Products</h1>
        <p class="mt-1 text-sm text-gray-500">Manage your care service products.</p>
      </div>

      <!-- Add Product Form -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <h2 class="text-sm font-semibold text-gray-900 mb-4">{{ editMode ? 'Edit Product' : 'Add Product' }}</h2>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label class="block text-xs font-medium text-gray-500 mb-1">Product Name</label>
            <input v-model="form.name" type="text" placeholder="e.g. Basic Care Package"
              class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-500 mb-1">Price (₱)</label>
            <input v-model="form.price" type="number" placeholder="0.00"
              class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>
        <div class="flex gap-3 mt-4">
          <button @click="handleSubmit" :disabled="submitting"
            class="px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition"
            style="background: linear-gradient(135deg, #1e3a5f, #2563eb);">
            {{ submitting ? 'Saving...' : editMode ? 'Update Product' : 'Add Product' }}
          </button>
          <button v-if="editMode" @click="cancelEdit"
            class="px-6 py-2.5 rounded-xl text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition">
            Cancel
          </button>
        </div>
        <p v-if="formError" class="text-red-500 text-xs mt-2">{{ formError }}</p>
        <p v-if="formSuccess" class="text-green-600 text-xs mt-2">{{ formSuccess }}</p>
      </div>

      <!-- Products Table -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 class="text-sm font-semibold text-gray-900">Products</h2>
          <span class="text-xs text-gray-400">{{ products.length }} item(s)</span>
        </div>

        <div v-if="loading" class="p-8 text-center text-sm text-gray-400">Loading...</div>

        <ul v-else class="divide-y divide-gray-50">
          <li v-for="product in products" :key="product.uuid"
            class="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition">
            <div>
              <p class="text-sm font-semibold text-gray-900">{{ product.name }}</p>
              <p class="text-xs text-gray-400 mt-0.5">{{ product.uuid }}</p>
            </div>
            <div class="flex items-center gap-4">
              <span class="text-sm font-bold text-blue-700">₱{{ Number(product.price).toLocaleString('en-PH', { minimumFractionDigits: 2 }) }}</span>
              <button @click="viewProduct(product)" class="text-xs text-gray-500 hover:text-gray-700">View</button>
              <button @click="editProduct(product)" class="text-xs text-blue-600 hover:text-blue-800">Edit</button>
              <button @click="deleteProduct(product.uuid)" class="text-xs text-red-500 hover:text-red-700">Delete</button>
            </div>
          </li>
        </ul>
      </div>

      <!-- View Modal -->
      <div v-if="viewModal" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div class="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-base font-bold text-gray-900">Product Details</h3>
            <button @click="viewModal = false" class="text-gray-400 hover:text-gray-600 text-lg">✕</button>
          </div>
          <div class="space-y-3">
            <div>
              <p class="text-xs text-gray-400">Product Name</p>
              <p class="text-sm font-semibold text-gray-900">{{ selected?.name }}</p>
            </div>
            <div>
              <p class="text-xs text-gray-400">Price</p>
              <p class="text-sm font-bold text-blue-700">₱{{ Number(selected?.price).toLocaleString('en-PH', { minimumFractionDigits: 2 }) }}</p>
            </div>
            <div>
              <p class="text-xs text-gray-400">UUID</p>
              <p class="text-xs text-gray-400 break-all">{{ selected?.uuid }}</p>
            </div>
          </div>
          <div class="flex gap-3 mt-6">
            <button @click="editProduct(selected)" class="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white" style="background: linear-gradient(135deg, #1e3a5f, #2563eb);">Edit</button>
            <button @click="viewModal = false" class="flex-1 py-2.5 rounded-xl text-sm font-semibold text-gray-600 bg-gray-100">Close</button>
          </div>
        </div>
      </div>

    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const products = ref<any[]>([]);
const loading = ref(true);
const submitting = ref(false);
const editMode = ref(false);
const viewModal = ref(false);
const selected = ref<any>(null);
const formError = ref("");
const formSuccess = ref("");
const editUuid = ref("");

const form = ref({ name: "", price: "" });

const runtimeConfig = useRuntimeConfig();
const token = localStorage.getItem("_token");

const headers = {
  Authorization: `Bearer ${token}`,
  Accept: "application/json",
};

const fetchProducts = async () => {
  loading.value = true;
  try {
    const data = await $fetch<any>("products", { baseURL: runtimeConfig.public.apiBaseURL, headers });
    products.value = data.data || data;
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
};

const handleSubmit = async () => {
  formError.value = "";
  formSuccess.value = "";
  if (!form.value.name || !form.value.price) {
    formError.value = "Please fill in all fields.";
    return;
  }
  submitting.value = true;
  try {
    if (editMode.value) {
      await $fetch(`products/${editUuid.value}`, {
        baseURL: runtimeConfig.public.apiBaseURL,
        method: "PUT",
        headers,
        body: form.value,
      });
      formSuccess.value = "Product updated successfully!";
    } else {
      await $fetch("products", {
        baseURL: runtimeConfig.public.apiBaseURL,
        method: "POST",
        headers,
        body: form.value,
      });
      formSuccess.value = "Product added successfully!";
    }
    form.value = { name: "", price: "" };
    editMode.value = false;
    editUuid.value = "";
    await fetchProducts();
  } catch (e: any) {
    formError.value = e?.message || "Something went wrong.";
  } finally {
    submitting.value = false;
  }
};

const editProduct = (product: any) => {
  form.value = { name: product.name, price: product.price };
  editUuid.value = product.uuid;
  editMode.value = true;
  viewModal.value = false;
};

const cancelEdit = () => {
  form.value = { name: "", price: "" };
  editMode.value = false;
  editUuid.value = "";
  formError.value = "";
  formSuccess.value = "";
};

const viewProduct = (product: any) => {
  selected.value = product;
  viewModal.value = true;
};

const deleteProduct = async (uuid: string) => {
  if (!confirm("Are you sure you want to delete this product?")) return;
  try {
    await $fetch(`products/${uuid}`, {
      baseURL: runtimeConfig.public.apiBaseURL,
      method: "DELETE",
      headers,
    });
    await fetchProducts();
  } catch (e: any) {
    alert("Failed to delete product.");
  }
};

onMounted(fetchProducts);
</script>