<template>
  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
    <div class="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
      <h2 class="text-sm font-semibold text-gray-900 mb-6">
        {{ editingCustomer ? 'Edit Customer' : 'Add Customer' }}
      </h2>
      <form class="space-y-6" method="POST" @submit.prevent="handleSubmit">
        <div>
          <label for="name" class="block text-sm/6 font-medium text-gray-900">Customer Name</label>
          <div class="mt-2">
            <input type="text" id="name" v-model="name"
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
          </div>
        </div>

        <div>
          <label for="email" class="block text-sm/6 font-medium text-gray-900">Email</label>
          <div class="mt-2">
            <input type="email" id="email" v-model="email"
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
          </div>
        </div>

        <div class="flex gap-3">
          <button type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            {{ editingCustomer ? 'Update Customer' : 'Add Customer' }}
          </button>
          <button v-if="editingCustomer" type="button" @click="cancelEdit"
            class="flex w-full justify-center rounded-md bg-gray-100 px-3 py-1.5 text-sm/6 font-semibold text-gray-700 shadow-sm hover:bg-gray-200">
            Cancel
          </button>
        </div>
      </form>
    </div>

    <!-- Error Message -->
    <div v-if="error" class="mt-4 px-4 py-3 bg-red-50 border border-red-200 rounded-md">
      <p class="text-sm text-red-600">{{ error }}</p>
    </div>

    <!-- Customer List -->
    <div class="mt-8 bg-white shadow sm:rounded-lg">
      <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <h2 class="text-sm font-semibold text-gray-900">Customers</h2>
        <span class="text-xs text-gray-500">{{ customers.length }} item(s)</span>
      </div>

      <!-- Loading -->
      <div v-if="isLoadingList" class="px-6 py-8 text-center text-sm text-gray-500">
        Loading customers...
      </div>

      <!-- Empty -->
      <div v-else-if="customers.length === 0" class="px-6 py-8 text-center text-sm text-gray-500">
        No customers found.
      </div>

      <!-- List -->
      <ul v-else class="divide-y divide-gray-200">
        <li v-for="customer in customers" :key="customer.uuid"
          class="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition">
          <div>
            <p class="text-sm font-medium text-gray-900">{{ customer.name }}</p>
            <p class="text-xs text-gray-500 mt-0.5">{{ customer.email }}</p>
          </div>
          <div class="flex items-center gap-3">
            <!-- Edit Button -->
            <button @click="startEdit(customer)"
              class="text-xs text-indigo-600 hover:text-indigo-800 font-medium">
              Edit
            </button>
            <!-- Delete Button -->
            <button @click="handleDelete(customer.uuid)"
              :disabled="deletingUuid === customer.uuid"
              class="text-xs text-red-500 hover:text-red-700 font-medium disabled:opacity-50">
              {{ deletingUuid === customer.uuid ? 'Deleting...' : 'Delete' }}
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
});

import { ref, onMounted } from "vue";
import { customerService } from "~/api/customer/CustomerService";

const name = ref("");
const email = ref("");
const error = ref("");
const isLoading = ref(false);
const isLoadingList = ref(false);
const deletingUuid = ref<string | null>(null);
const editingCustomer = ref<any | null>(null);
const customers = ref<any[]>([]);

const fetchCustomers = async () => {
  isLoadingList.value = true;
  try {
    const response = await customerService.list();
    customers.value = response?.data ?? response ?? [];
  } catch (err: any) {
    console.error("Failed to fetch customers:", err?.message);
  } finally {
    isLoadingList.value = false;
  }
};

const startEdit = (customer: any) => {
  editingCustomer.value = customer;
  name.value = customer.name;
  email.value = customer.email;
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const cancelEdit = () => {
  editingCustomer.value = null;
  name.value = "";
  email.value = "";
  error.value = "";
};

const handleSubmit = async () => {
  error.value = "";
  isLoading.value = true;

  try {
    if (editingCustomer.value) {
      // Update
      await customerService.update(editingCustomer.value.uuid, {
        name: name.value,
        email: email.value,
      });
      cancelEdit();
    } else {
      // Create
      await customerService.create({ name: name.value, email: email.value });
      name.value = "";
      email.value = "";
    }
    await fetchCustomers();
  } catch (err: any) {
    error.value = err?.message || "Something went wrong.";
  } finally {
    isLoading.value = false;
  }
};

const handleDelete = async (uuid: string) => {
  if (!confirm("Are you sure you want to delete this customer?")) return;

  deletingUuid.value = uuid;
  try {
    await customerService.delete(uuid);
    await fetchCustomers();
  } catch (err: any) {
    error.value = err?.message || "Failed to delete customer.";
  } finally {
    deletingUuid.value = null;
  }
};

onMounted(fetchCustomers);
</script>