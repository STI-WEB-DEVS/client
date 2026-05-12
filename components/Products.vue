<template>
  <div class="min-h-full bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow-sm border-b border-gray-200">
      <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold tracking-tight text-gray-900">Products</h1>
          <p class="mt-0.5 text-sm text-gray-500">Manage your product catalog</p>
        </div>
        <button
          @click="openCreateModal"
          class="flex items-center gap-2 rounded-md bg-[#543923] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#402911] focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-[#543923] transition-colors"
        >
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add Product
        </button>
      </div>
    </div>

    <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">

      <!-- Global Alert -->
      <transition name="fade">
        <div v-if="alert.message" :class="[
          'mb-6 rounded-md p-4 flex items-start gap-3',
          alert.type === 'success' ? 'bg-green-50' : 'bg-red-50'
        ]">
          <svg v-if="alert.type === 'success'" class="h-5 w-5 text-green-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          <svg v-else class="h-5 w-5 text-red-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
          </svg>
          <p :class="['text-sm font-medium', alert.type === 'success' ? 'text-green-800' : 'text-red-800']">
            {{ alert.message }}
          </p>
        </div>
      </transition>

      <!-- Loading State -->
      <div v-if="isLoadingList" class="flex items-center justify-center py-24">
        <div class="flex flex-col items-center gap-3">
          <svg class="h-8 w-8 animate-spin text-[#543923]" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
          <p class="text-sm text-gray-500">Loading products...</p>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else-if="!isLoadingList && products.length === 0" class="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-white py-20">
        <svg class="h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
        </svg>
        <p class="mt-4 text-base font-semibold text-gray-900">No products yet</p>
        <p class="mt-1 text-sm text-gray-500">Get started by adding your first product.</p>
        <button
          @click="openCreateModal"
          class="mt-6 rounded-md bg-[#543923] px-4 py-2 text-sm font-semibold text-white hover:bg-[#402911] transition-colors"
        >
          Add Product
        </button>
      </div>

      <!-- Products Table -->
      <div v-else class="overflow-hidden rounded-lg bg-white shadow ring-1 ring-black/5">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="py-3.5 pl-6 pr-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                #
              </th>
              <th class="px-3 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                Name
              </th>
              <th class="px-3 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                Price
              </th>
              <th class="py-3.5 pl-3 pr-6 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 bg-white">
            <tr
              v-for="(product, index) in products"
              :key="product.uuid"
              class="hover:bg-gray-50 transition-colors"
            >
              <td class="whitespace-nowrap py-4 pl-6 pr-3 text-sm text-gray-400">
                {{ index + 1 }}
              </td>
              <td class="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900">
                {{ product.name }}
              </td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-700">
                <span class="inline-flex items-center rounded-full bg-[#543923]/10 px-2.5 py-0.5 text-xs font-semibold text-[#543923]">
                  ₱{{ formatPrice(product.price) }}
                </span>
              </td>
              <td class="whitespace-nowrap py-4 pl-3 pr-6 text-right text-sm">
                <div class="flex items-center justify-end gap-2">
                  <button
                    @click="openEditModal(product)"
                    class="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium text-[#543923] ring-1 ring-inset ring-[#543923]/30 hover:bg-[#543923]/5 transition-colors"
                  >
                    <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125" />
                    </svg>
                    Edit
                  </button>
                  <button
                    @click="confirmDelete(product)"
                    class="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium text-red-600 ring-1 ring-inset ring-red-300 hover:bg-red-50 transition-colors"
                  >
                    <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Create / Edit Modal -->
    <transition name="modal">
      <div v-if="modal.open" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" @click="closeModal" />

        <!-- Panel -->
        <div class="relative z-10 w-full max-w-md rounded-xl bg-white shadow-2xl ring-1 ring-black/10">
          <div class="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
            <h3 class="text-base font-semibold text-gray-900">
              {{ modal.mode === 'create' ? 'Add New Product' : 'Edit Product' }}
            </h3>
            <button @click="closeModal" class="rounded-md p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form class="px-6 py-6 space-y-5" @submit.prevent="handleSubmit">
            <!-- Form Error -->
            <div v-if="modal.error" class="rounded-md bg-red-50 p-3">
              <p class="text-sm font-medium text-red-800">{{ modal.error }}</p>
            </div>

            <!-- Name Field -->
            <div>
              <label for="product-name" class="block text-sm font-medium text-gray-900">
                Product Name
              </label>
              <div class="mt-2">
                <input
                  v-model="modal.form.name"
                  type="text"
                  id="product-name"
                  placeholder="e.g. Wireless Keyboard"
                  required
                  class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#543923] sm:text-sm/6"
                />
              </div>
            </div>

            <!-- Price Field -->
            <div>
              <label for="product-price" class="block text-sm font-medium text-gray-900">
                Price
              </label>
              <div class="mt-2 relative">
                <span class="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400 text-sm">₱</span>
                <input
                  v-model="modal.form.price"
                  type="number"
                  id="product-price"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  required
                  class="block w-full rounded-md bg-white pl-7 pr-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#543923] sm:text-sm/6"
                />
              </div>
            </div>

            <!-- Actions -->
            <div class="flex gap-3 pt-1">
              <button
                type="button"
                @click="closeModal"
                class="flex-1 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                :disabled="modal.isLoading"
                class="flex-1 flex justify-center items-center gap-2 rounded-md bg-[#543923] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#402911] focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-[#543923] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <svg v-if="modal.isLoading" class="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                <span>{{ modal.isLoading ? 'Saving...' : (modal.mode === 'create' ? 'Create Product' : 'Save Changes') }}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </transition>

    <!-- Delete Confirm Modal -->
    <transition name="modal">
      <div v-if="deleteModal.open" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" @click="deleteModal.open = false" />
        <div class="relative z-10 w-full max-w-sm rounded-xl bg-white shadow-2xl ring-1 ring-black/10 p-6">
          <div class="flex items-start gap-4">
            <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100">
              <svg class="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
              </svg>
            </div>
            <div>
              <h3 class="text-base font-semibold text-gray-900">Delete Product</h3>
              <p class="mt-1 text-sm text-gray-500">
                Are you sure you want to delete <span class="font-semibold text-gray-800">{{ deleteModal.product?.name }}</span>? This action cannot be undone.
              </p>
            </div>
          </div>
          <div class="mt-6 flex gap-3">
            <button
              @click="deleteModal.open = false"
              class="flex-1 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              @click="handleDelete"
              :disabled="deleteModal.isLoading"
              class="flex-1 flex justify-center items-center gap-2 rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <svg v-if="deleteModal.isLoading" class="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              <span>{{ deleteModal.isLoading ? 'Deleting...' : 'Delete' }}</span>
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { productService } from "~/api/product/ProductService";

// ── Types ─────────────────────────────────────────────────────────────────────
interface Product {
  uuid: string; // Changed from 'id' to 'uuid' to match backend expectation
  name: string;
  price: number;
}

// ── State ─────────────────────────────────────────────────────────────────────
const products      = ref<Product[]>([]);
const isLoadingList = ref(false);

const alert = reactive({ message: "", type: "success" as "success" | "error" });

const modal = reactive({
  open:      false,
  mode:      "create" as "create" | "edit",
  isLoading: false,
  error:     "",
  editUuid:  null as string | null, // Changed from editId
  form:      { name: "", price: "" as string | number },
});

const deleteModal = reactive({
  open:      false,
  isLoading: false,
  product:   null as Product | null,
});

// ── Helpers ───────────────────────────────────────────────────────────────────
const formatPrice = (value: number) =>
  Number(value).toLocaleString("en-PH", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const showAlert = (message: string, type: "success" | "error" = "success") => {
  alert.message = message;
  alert.type    = type;
  setTimeout(() => (alert.message = ""), 4000);
};

const unwrapList = (res: any): Product[] => {
  if (Array.isArray(res))             return res;
  if (Array.isArray(res?.data))       return res.data;
  if (Array.isArray(res?.data?.data)) return res.data.data;
  return [];
};

// ── CRUD ──────────────────────────────────────────────────────────────────────
const fetchProducts = async () => {
  isLoadingList.value = true;
  try {
    const res = await productService.list();
    products.value = unwrapList(res);
  } catch {
    showAlert("Failed to load products.", "error");
  } finally {
    isLoadingList.value = false;
  }
};

const openCreateModal = () => {
  modal.mode     = "create";
  modal.editUuid = null;
  modal.form     = { name: "", price: "" };
  modal.error    = "";
  modal.open     = true;
};

const openEditModal = (product: Product) => {
  modal.mode     = "edit";
  modal.editUuid = product.uuid; // Now correctly using .uuid
  modal.form     = { name: product.name, price: product.price };
  modal.error    = "";
  modal.open     = true;
};

const closeModal = () => {
  modal.open = false;
};

const handleSubmit = async () => {
  modal.error     = "";
  modal.isLoading = true;
  const payload   = { name: modal.form.name, price: Number(modal.form.price) };

  try {
    if (modal.mode === "create") {
      await productService.create(payload);
      showAlert("Product created successfully.");
    } else {
      // Explicitly passing the UUID string to the update method
      await productService.update(String(modal.editUuid!), payload);
      showAlert("Product updated successfully.");
    }
    closeModal();
    await fetchProducts();
  } catch (err: any) {
    modal.error = err?.message || "Something went wrong. Please try again.";
  } finally {
    modal.isLoading = false;
  }
};

const confirmDelete = (product: Product) => {
  deleteModal.product = product;
  deleteModal.open    = true;
};

const handleDelete = async () => {
  if (!deleteModal.product) return;
  deleteModal.isLoading = true;
  try {
    // Explicitly passing the UUID string to the delete method
    await productService.delete(String(deleteModal.product.uuid));
    showAlert("Product deleted successfully.");
    deleteModal.open = false;
    await fetchProducts();
  } catch {
    showAlert("Failed to delete product.", "error");
    deleteModal.open = false;
  } finally {
    deleteModal.isLoading = false;
  }
};

onMounted(fetchProducts);
</script>

<style scoped>
/* Modal transition */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

/* Alert fade */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>