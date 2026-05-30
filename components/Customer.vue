<template>
  <div class="p-8 max-w-7xl mx-auto">
    <div class="sm:flex sm:items-center sm:justify-between mb-8">
      <div>
        <h1 class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Customers
        </h1>
        <p class="mt-2 text-sm text-gray-500">
          A list of all the customers in your account including their name, and email.
        </p>
      </div>
      <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        <button 
          v-if="!showForm"
          @click="openCreateForm" 
          type="button" 
          class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add Customer
        </button>
      </div>
    </div>

    <div v-if="isLoading" class="flex justify-center py-12">
      <p class="text-sm text-gray-500">Loading data...</p>
    </div>

    <div v-else-if="showForm" class="bg-white shadow sm:rounded-lg p-6 max-w-2xl mx-auto">
      <h2 class="text-lg font-medium text-gray-900 mb-6">
        {{ isEditing ? 'Edit Customer' : 'Create New Customer' }}
      </h2>
      
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div class="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
          <div class="sm:col-span-2">
            <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Full Name</label>
            <div class="mt-2">
              <input v-model="form.name" type="text" id="name" required class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div class="sm:col-span-2">
            <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email Address</label>
            <div class="mt-2">
              <input v-model="form.email" type="email" id="email" required class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div>
            <label for="phone" class="block text-sm font-medium leading-6 text-gray-900">Phone Number</label>
            <div class="mt-2">
              <input v-model="form.phone" type="text" id="phone" class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

         
        </div>

        <div class="mt-6 flex items-center justify-end gap-x-6">
          <button @click="cancelForm" type="button" class="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-700">Cancel</button>
          <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            {{ isEditing ? 'Update' : 'Save' }}
          </button>
        </div>
      </form>
    </div>

    <div v-else class="mt-8 flow-root">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-300">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Name</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Email</th>
                  <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span class="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-if="customers.length === 0">
                  <td colspan="4" class="py-8 text-center text-sm text-gray-500">No customers found.</td>
                </tr>
                <tr v-for="customer in customers" :key="customer.uuid">
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{{ customer.name }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ customer.email }}</td>
                  <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <button @click="openEditForm(customer)" class="text-indigo-600 hover:text-indigo-900 mr-4">Edit</button>
                    <button @click="handleDelete(customer.uuid!)" class="text-red-600 hover:text-red-900">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>  
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
// 1. Correctly import the single instance
import { customerService } from '~/api/customer/CustomerService'; 

// 2. Updated to use 'uuid' instead of 'id'
interface Customer {
  uuid?: string; 
  name: string;
  email: string;
  phone: string;
}

// State
const customers = ref<Customer[]>([]);
const isLoading = ref(true);
const showForm = ref(false);
const isEditing = ref(false);

// Form State
const defaultForm = { name: '', email: '', phone: '' };
const form = reactive<Customer>({ ...defaultForm });

// --- READ: Fetch Data ---
const fetchCustomers = async () => {
  isLoading.value = true;
  try {
    // 3. Changed to .list()
    const response = await customerService.list(); 
    customers.value = response.data || response; 
  } catch (error) {
    console.error("Failed to fetch customers:", error);
  } finally {
    isLoading.value = false;
  }
};

// --- CREATE / UPDATE: Handle Form Submission ---
const handleSubmit = async () => {
  isLoading.value = true;
  try {
    // 4. Changed to .update() and .create(), checking for uuid
    if (isEditing.value && form.uuid) {
      await customerService.update(form.uuid, form);
    } else {
      await customerService.create(form);
    }
    await fetchCustomers(); 
    cancelForm(); 
  } catch (error) {
    console.error("Failed to save customer:", error);
    isLoading.value = false;
  }
};

// --- DELETE: Handle Removal ---
// 5. Parameter changed to string for uuid
const handleDelete = async (uuid: string) => {
  if (!confirm("Are you sure you want to delete this customer?")) return;
  
  isLoading.value = true;
  try {
    // 6. Changed to .delete()
    await customerService.delete(uuid);
    await fetchCustomers();
  } catch (error) {
    console.error("Failed to delete customer:", error);
    isLoading.value = false;
  }
};

// --- Form UI Controls ---
const openCreateForm = () => {
  Object.assign(form, defaultForm);
  // Ensure we clear out any existing uuid when creating new
  delete form.uuid; 
  isEditing.value = false;
  showForm.value = true;
};

const openEditForm = (customer: Customer) => {
  Object.assign(form, customer);
  isEditing.value = true;
  showForm.value = true;
};

const cancelForm = () => {
  showForm.value = false;
  Object.assign(form, defaultForm);
  delete form.uuid;
  isEditing.value = false;
};

// Initialize
onMounted(() => {
  fetchCustomers();
});
</script>