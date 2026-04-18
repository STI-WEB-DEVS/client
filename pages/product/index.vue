<template>
  <NuxtLayout>
    <div class="space-y-6">
      <Heading
        title="Products"
        description="Displaying product records from your API."
        button-text="Create Product"
        @click="handleCreate"
      />

      <div v-if="pending" class="flex justify-center py-16">
        <div
          class="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900"
        ></div>
      </div>

      <div
        v-else-if="error"
        class="rounded-xl border border-red-200 bg-red-50 p-4"
      >
        <p class="text-sm text-red-700">{{ error.message }}</p>
      </div>

      <Table
        v-else
        :columns="tableColumns"
        :rows="products?.data || []"
        empty-message="No products found."
      >
        <template #cell(price)="{ value }">
          <span class="font-medium text-gray-900">${{ value }}</span>
        </template>

        <template #cell(actions)="{ row: product }">
          <div class="flex items-center justify-end gap-2">
            <button
              type="button"
              @click="handleView(product)"
              class="inline-flex items-center gap-2 rounded-md border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <EyeIcon class="h-4 w-4" />
              <span>View</span>
            </button>

            <button
              type="button"
              @click="handleEdit(product)"
              class="inline-flex items-center gap-2 rounded-md border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <PencilSquareIcon class="h-4 w-4" />
              <span>Edit</span>
            </button>

            <button
              type="button"
              @click="handleDelete(product)"
              class="inline-flex items-center gap-2 rounded-md border border-red-200 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50"
            >
              <TrashIcon class="h-4 w-4" />
              <span>Delete</span>
            </button>
          </div>
        </template>

        <template #footer>
          <p class="text-sm text-gray-500">
            Showing
            <span class="font-medium text-gray-900">{{
              products?.meta?.from ?? 0
            }}</span>
            to
            <span class="font-medium text-gray-900">{{
              products?.meta?.to ?? 0
            }}</span>
            of
            <span class="font-medium text-gray-900">{{
              products?.meta?.total ?? 0
            }}</span>
            products
          </p>
        </template>
      </Table>

      <FeedbackModal
        :open="isModalOpen"
        :title="modalTitle"
        :confirm-text="confirmText"
        :cancel-text="modalMode !== 'view' ? 'Cancel' : undefined"
        :variant="modalMode === 'delete' ? 'danger' : 'info'"
        :loading="submitting"
        @close="closeModal"
        @confirm="handleModalConfirm"
      >
        <div v-if="modalMode === 'delete'">
          <p>
            Are you sure you want to delete
            <span class="font-semibold text-gray-900">{{
              selectedProduct?.name
            }}</span>? This action cannot be undone.
          </p>
        </div>

        <div v-else-if="modalMode === 'edit' || modalMode === 'create'">
          <ProductForm v-model="form" :disabled="submitting" />
        </div>

        <div v-else-if="modalMode === 'view'" class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider">ID</p>
              <p class="mt-1 text-sm text-gray-900 font-medium">{{ selectedProduct?.id }}</p>
            </div>
            <div>
              <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider">UUID</p>
              <p class="mt-1 text-xs text-gray-600 truncate">{{ selectedProduct?.uuid }}</p>
            </div>
            <div class="col-span-2">
              <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider">Product Name</p>
              <p class="mt-1 text-sm text-gray-900">{{ selectedProduct?.name }}</p>
            </div>
            <div class="col-span-2">
              <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</p>
              <p class="mt-1 text-sm text-gray-900 font-medium">${{ selectedProduct?.price }}</p>
            </div>
          </div>
        </div>
      </FeedbackModal>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/vue/24/outline";
import { productService } from "~/api/product/ProductService";

const router = useRouter();

const tableColumns = [
  { key: "id", label: "ID" },
  { key: "name", label: "Name" },
  { key: "price", label: "Price" },
  { key: "actions", label: "Actions", align: "right" as const },
];

const products = ref<any>(null);
const pending = ref(true);
const error = ref<any>(null);
const submitting = ref(false);

const isModalOpen = ref(false);
const modalMode = ref<"create" | "edit" | "delete" | "view">("view");
const selectedProduct = ref<any>(null);
const form = ref({
  name: "",
  price: "",
});

const modalTitle = computed(() => {
  switch (modalMode.value) {
    case "create":
      return "Create Product";
    case "edit":
      return "Edit Product";
    case "delete":
      return "Delete Product";
    case "view":
      return "Product Details";
    default:
      return "Notification";
  }
});

const confirmText = computed(() => {
  switch (modalMode.value) {
    case "create":
      return "Create";
    case "edit":
      return "Save Changes";
    case "delete":
      return "Delete";
    case "view":
      return "Close";
    default:
      return "Okay";
  }
});

const loadProducts = async () => {
  pending.value = true;
  error.value = null;
  try {
    products.value = await productService.list();
  } catch (err: any) {
    error.value = err;
  } finally {
    pending.value = false;
  }
};

onMounted(loadProducts);

const closeModal = () => {
  isModalOpen.value = false;
  selectedProduct.value = null;
  submitting.value = false;
};

const handleModalConfirm = async () => {
  if (modalMode.value === "view") {
    closeModal();
    return;
  }

  submitting.value = true;
  try {
    if (modalMode.value === "delete") {
      await productService.delete(selectedProduct.value.uuid);
    } else if (modalMode.value === "edit") {
      await productService.update(selectedProduct.value.uuid, form.value);
    } else if (modalMode.value === "create") {
      await productService.create(form.value);
    }
    await loadProducts();
    closeModal();
  } catch (err: any) {
    alert(err.message || "An error occurred");
  } finally {
    submitting.value = false;
  }
};

const handleCreate = () => {
  modalMode.value = "create";
  form.value = { name: "", price: "" };
  isModalOpen.value = true;
};

const handleView = (product: any) => {
  router.push(`/product/${product.uuid}`);
};

const handleEdit = (product: any) => {
  modalMode.value = "edit";
  selectedProduct.value = product;
  form.value = { name: product.name, price: product.price };
  isModalOpen.value = true;
};

const handleDelete = (product: any) => {
  modalMode.value = "delete";
  selectedProduct.value = product;
  isModalOpen.value = true;
};
</script>
