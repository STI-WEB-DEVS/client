```vue
<template>
  <NuxtLayout>
    <div class="min-h-screen bg-[#0d0608] p-8">

      <!-- HEADER -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-white">
          Products
        </h1>

        <p class="mt-2 text-sm text-gray-400">
          Manage available products and services
        </p>
      </div>

      <!-- PRODUCT FORM -->
      <div
        class="mb-8 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
      >
        <h2 class="mb-5 text-lg font-semibold text-white">
          {{ editMode ? 'Edit Product' : 'Add Product' }}
        </h2>

        <div class="grid gap-4 md:grid-cols-2">

          <div>
            <label class="mb-2 block text-xs uppercase tracking-wider text-gray-400">
              Product Name
            </label>

            <input
              v-model="form.name"
              type="text"
              placeholder="Blood Bag, Screening Fee, etc."
              class="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 focus:border-red-500 focus:outline-none"
            />
          </div>

          <div>
            <label class="mb-2 block text-xs uppercase tracking-wider text-gray-400">
              Price
            </label>

            <input
              v-model="form.price"
              type="number"
              placeholder="0.00"
              class="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 focus:border-red-500 focus:outline-none"
            />
          </div>

        </div>

        <div class="mt-6 flex gap-3">

          <button
            @click="handleSubmit"
            :disabled="submitting"
            class="rounded-2xl px-6 py-3 font-semibold text-white"
            style="background:linear-gradient(135deg,#c0392b,#e74c3c)"
          >
            {{
              submitting
                ? 'Saving...'
                : editMode
                  ? 'Update Product'
                  : 'Add Product'
            }}
          </button>

          <button
            v-if="editMode"
            @click="cancelEdit"
            class="rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-white"
          >
            Cancel
          </button>

        </div>

        <p
          v-if="formError"
          class="mt-3 text-sm text-red-400"
        >
          {{ formError }}
        </p>

        <p
          v-if="formSuccess"
          class="mt-3 text-sm text-green-400"
        >
          {{ formSuccess }}
        </p>

      </div>

      <!-- PRODUCTS TABLE -->
      <div
        class="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl"
      >

        <div
          class="flex items-center justify-between border-b border-white/10 px-6 py-5"
        >
          <h2 class="font-semibold text-white">
            Products
          </h2>

          <span
            class="rounded-full bg-red-500/20 px-3 py-1 text-xs text-red-300"
          >
            {{ products.length }} Product(s)
          </span>
        </div>

        <div
          v-if="loading"
          class="p-10 text-center text-gray-400"
        >
          Loading products...
        </div>

        <ul
          v-else
          class="divide-y divide-white/5"
        >

          <li
            v-for="product in products"
            :key="product.uuid"
            class="flex items-center justify-between px-6 py-5 transition hover:bg-white/5"
          >

            <div class="flex items-center gap-4">

              <div
                class="flex h-12 w-12 items-center justify-center rounded-full text-white"
                style="background:linear-gradient(135deg,#c0392b,#e74c3c)"
              >
                🩸
              </div>

              <div>
                <p class="font-semibold text-white">
                  {{ product.name }}
                </p>

                <p class="mt-1 text-xs text-gray-500 break-all">
                  {{ product.uuid }}
                </p>
              </div>

            </div>

            <div class="flex items-center gap-4">

              <span
                class="text-lg font-bold text-red-400"
              >
                ₱{{
                  Number(product.price).toLocaleString(
                    'en-PH',
                    {
                      minimumFractionDigits: 2
                    }
                  )
                }}
              </span>

              <button
                @click="viewProduct(product)"
                class="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs text-gray-300 hover:bg-white/10"
              >
                View
              </button>

              <button
                @click="editProduct(product)"
                class="rounded-xl border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-xs text-blue-300"
              >
                Edit
              </button>

              <button
                @click="deleteProduct(product.uuid)"
                class="rounded-xl px-4 py-2 text-xs font-semibold text-white"
                style="background:linear-gradient(135deg,#991b1b,#ef4444)"
              >
                Delete
              </button>

            </div>

          </li>

        </ul>

      </div>

      <!-- VIEW MODAL -->
      <div
        v-if="viewModal"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
      >

        <div
          class="w-full max-w-lg rounded-3xl border border-white/10 bg-[#12090c] p-8 shadow-2xl"
        >

          <div class="mb-6 flex items-center justify-between">
            <h3 class="text-xl font-bold text-white">
              Product Details
            </h3>

            <button
              @click="viewModal = false"
              class="text-2xl text-gray-400 hover:text-white"
            >
              ×
            </button>
          </div>

          <div class="space-y-5">

            <div>
              <p class="text-xs uppercase tracking-wider text-gray-500">
                Product Name
              </p>

              <p class="mt-1 text-white font-semibold">
                {{ selected?.name }}
              </p>
            </div>

            <div>
              <p class="text-xs uppercase tracking-wider text-gray-500">
                Price
              </p>

              <p class="mt-1 text-2xl font-bold text-red-400">
                ₱{{
                  Number(selected?.price).toLocaleString(
                    'en-PH',
                    {
                      minimumFractionDigits: 2
                    }
                  )
                }}
              </p>
            </div>

            <div>
              <p class="text-xs uppercase tracking-wider text-gray-500">
                UUID
              </p>

              <p class="mt-1 break-all text-gray-400">
                {{ selected?.uuid }}
              </p>
            </div>

          </div>

          <div class="mt-8 flex gap-3">

            <button
              @click="editProduct(selected)"
              class="flex-1 rounded-2xl py-3 font-semibold text-white"
              style="background:linear-gradient(135deg,#c0392b,#e74c3c)"
            >
              Edit
            </button>

            <button
              @click="viewModal = false"
              class="flex-1 rounded-2xl border border-white/10 bg-white/5 py-3 text-white"
            >
              Close
            </button>

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