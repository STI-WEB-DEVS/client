<template>
  <NuxtLayout>
    <div>
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-gray-900">Customers</h1>
        <p class="mt-1 text-sm text-gray-500">Manage your registered customers.</p>
      </div>

      <!-- Add Customer Form -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <h2 class="text-sm font-semibold text-gray-900 mb-4">{{ editMode ? 'Edit Customer' : 'Add Customer' }}</h2>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label class="block text-xs font-medium text-gray-500 mb-1">Customer Name</label>
            <input v-model="form.name" type="text" placeholder="e.g. Juan Dela Cruz"
              class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-500 mb-1">Email</label>
            <input v-model="form.email" type="email" placeholder="e.g. juan@email.com"
              class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>
        <div class="flex gap-3 mt-4">
          <button @click="handleSubmit" :disabled="submitting"
            class="px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition"
            style="background: linear-gradient(135deg, #000000, #000000);">
            {{ submitting ? 'Saving...' : editMode ? 'Update Customer' : 'Add Customer' }}
          </button>
          <button v-if="editMode" @click="cancelEdit"
            class="px-6 py-2.5 rounded-xl text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition">
            Cancel
          </button>
        </div>
        <p v-if="formError" class="text-red-500 text-xs mt-2">{{ formError }}</p>
        <p v-if="formSuccess" class="text-green-600 text-xs mt-2">{{ formSuccess }}</p>
      </div>

      <!-- Customers Table -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 class="text-sm font-semibold text-gray-900">Customers</h2>
          <span class="text-xs text-gray-400">{{ customers.length }} item(s)</span>
        </div>

        <div v-if="loading" class="p-8 text-center text-sm text-gray-400">Loading...</div>

        <ul v-else class="divide-y divide-gray-50">
          <li v-for="customer in customers" :key="customer.uuid"
            class="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition">
            <div>
              <p class="text-sm font-semibold text-gray-900">{{ customer.name }}</p>
              <p class="text-xs text-gray-400 mt-0.5">{{ customer.email }}</p>
            </div>
            <div class="flex items-center gap-4">
              <button @click="viewCustomer(customer)" class="text-xs text-gray-500 hover:text-gray-700">View</button>
              <button @click="editCustomer(customer)" class="text-xs text-blue-600 hover:text-blue-800">Edit</button>
              <button @click="deleteCustomer(customer.uuid)" class="text-xs text-red-500 hover:text-red-700">Delete</button>
            </div>
          </li>
        </ul>
      </div>

      <!-- View Modal -->
      <div v-if="viewModal" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div class="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-base font-bold text-gray-900">Customer Details</h3>
            <button @click="viewModal = false" class="text-gray-400 hover:text-gray-600 text-lg">✕</button>
          </div>
          <div class="space-y-3">
            <div>
              <p class="text-xs text-gray-400">Customer Name</p>
              <p class="text-sm font-semibold text-gray-900">{{ selected?.name }}</p>
            </div>
            <div>
              <p class="text-xs text-gray-400">Email</p>
              <p class="text-sm text-gray-700">{{ selected?.email }}</p>
            </div>
            <div>
              <p class="text-xs text-gray-400">UUID</p>
              <p class="text-xs text-gray-400 break-all">{{ selected?.uuid }}</p>
            </div>
          </div>
          <div class="flex gap-3 mt-6">
            <button @click="editCustomer(selected)" class="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white" style="background: linear-gradient(135deg, #000000, #000000);">Edit</button>
            <button @click="viewModal = false" class="flex-1 py-2.5 rounded-xl text-sm font-semibold text-gray-600 bg-gray-100">Close</button>
          </div>
        </div>
      </div>

    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const customers = ref<any[]>([]);
const loading = ref(true);
const submitting = ref(false);
const editMode = ref(false);
const viewModal = ref(false);
const selected = ref<any>(null);
const formError = ref("");
const formSuccess = ref("");
const editUuid = ref("");

const form = ref({ name: "", email: "" });

const runtimeConfig = useRuntimeConfig();
const token = localStorage.getItem("_token");

const headers = {
  Authorization: `Bearer ${token}`,
  Accept: "application/json",
};

const fetchCustomers = async () => {
  loading.value = true;
  try {
    const data = await $fetch<any>("customers", { baseURL: runtimeConfig.public.apiBaseURL, headers });
    customers.value = data.data || data;
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
};

const handleSubmit = async () => {
  formError.value = "";
  formSuccess.value = "";
  if (!form.value.name || !form.value.email) {
    formError.value = "Please fill in all fields.";
    return;
  }
  submitting.value = true;
  try {
    if (editMode.value) {
      await $fetch(`customers/${editUuid.value}`, {
        baseURL: runtimeConfig.public.apiBaseURL,
        method: "PUT",
        headers,
        body: form.value,
      });
      formSuccess.value = "Customer updated successfully!";
    } else {
      await $fetch("customers", {
        baseURL: runtimeConfig.public.apiBaseURL,
        method: "POST",
        headers,
        body: form.value,
      });
      formSuccess.value = "Customer added successfully!";
    }
    form.value = { name: "", email: "" };
    editMode.value = false;
    editUuid.value = "";
    await fetchCustomers();
  } catch (e: any) {
    formError.value = e?.message || "Something went wrong.";
  } finally {
    submitting.value = false;
  }
};

const editCustomer = (customer: any) => {
  form.value = { name: customer.name, email: customer.email };
  editUuid.value = customer.uuid;
  editMode.value = true;
  viewModal.value = false;
};

const cancelEdit = () => {
  form.value = { name: "", email: "" };
  editMode.value = false;
  editUuid.value = "";
  formError.value = "";
  formSuccess.value = "";
};

const viewCustomer = (customer: any) => {
  selected.value = customer;
  viewModal.value = true;
};

const deleteCustomer = async (uuid: string) => {
  if (!confirm("Are you sure you want to delete this customer?")) return;
  try {
    await $fetch(`customers/${uuid}`, {
      baseURL: runtimeConfig.public.apiBaseURL,
      method: "DELETE",
      headers,
    });
    await fetchCustomers();
  } catch (e: any) {
    alert("Failed to delete customer.");
  }
};

onMounted(fetchCustomers);
</script>