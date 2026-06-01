<template>
  <NuxtLayout>
    <div class="py-6">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 flex justify-between items-center">
        <h1 class="text-2xl font-semibold text-gray-900">Customer Management</h1>
        <button 
          @click="showAddModal = true" 
          class="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add Customer
        </button>
      </div>

      <div class="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 mt-8">
        <div class="overflow-hidden bg-white shadow sm:rounded-lg border border-gray-200">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Name</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Email</th>
                <th scope="col" class="relative px-6 py-3">
                  <span class="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">
              <tr v-for="customer in customers" :key="customer.id" class="hover:bg-gray-50">
                <td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">{{ customer.name }}</td>
                <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{{ customer.email }}</td>
                <td class="whitespace-nowrap px-6 py-4 text-right text-sm font-medium space-x-4">
                  <button @click="viewDetails(customer)" class="text-indigo-600 hover:text-indigo-900">View</button>
                  <button @click="confirmDelete(customer.id)" class="text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div v-if="showAddModal" class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div class="fixed inset-0 z-10 overflow-y-auto">
          <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <h3 class="text-base font-semibold leading-6 text-gray-900">Add New Customer</h3>
                <div class="mt-4 space-y-4">
                  <input v-model="newCustomer.name" placeholder="Full Name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  <input v-model="newCustomer.email" type="email" placeholder="Email Address" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
              </div>
              <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button @click="addCustomer" type="button" class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto">Save</button>
                <button @click="showAddModal = false" type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="showViewModal" class="relative z-10" role="dialog" aria-modal="true">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div class="fixed inset-0 z-10 overflow-y-auto">
          <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div class="flex justify-between items-start">
                  <h3 class="text-lg font-semibold leading-6 text-gray-900">Customer Details</h3>
                  <button @click="showViewModal = false" class="text-gray-400 hover:text-gray-500 text-2xl">&times;</button>
                </div>
                <div class="mt-6 border-t border-gray-100">
                  <dl class="divide-y divide-gray-100">
                    <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt class="text-sm font-medium leading-6 text-gray-900">Full name</dt>
                      <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ selectedCustomer?.name }}</dd>
                    </div>
                    <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt class="text-sm font-medium leading-6 text-gray-900">Email address</dt>
                      <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ selectedCustomer?.email }}</dd>
                    </div>
                    <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt class="text-sm font-medium leading-6 text-gray-900">Customer ID</dt>
                      <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">#{{ selectedCustomer?.id }}</dd>
                    </div>
                  </dl>
                </div>
              </div>
              <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button @click="showViewModal = false" type="button" class="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:w-auto">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import CustomerService from '@/api/customer/CustomerService';

interface Customer {
  id: number | string;
  uuid?: string;
  name: string;
  email: string;
  role?: string;
  created_at?: string;
  updated_at?: string;
}

const showAddModal = ref(false);
const showViewModal = ref(false);
const selectedCustomer = ref<Customer | null>(null);

const customers = ref<Customer[]>([]); 
const newCustomer = ref({ name: '', email: '' });

const fetchCustomers = async () => {
  try {
    const response = await CustomerService.getAll();
    customers.value = (response && typeof response === 'object' && 'data' in response) 
      ? (response.data as Customer[]) 
      : (response as Customer[]); 
  } catch (error) {
    console.error("Failed to fetch customers:", error);
  }
};

onMounted(() => {
  fetchCustomers();
});

// View Details
const viewDetails = (customer: Customer) => {
  selectedCustomer.value = customer;
  showViewModal.value = true;
};

// Add Customer to Backend
const addCustomer = async () => {
  if (newCustomer.value.name && newCustomer.value.email) {
    try {
      const response = await CustomerService.create(newCustomer.value);
      console.log('Customer created successfully:', response);
      
      // Refresh list and reset form
      await fetchCustomers();
      newCustomer.value = { name: '', email: '' };
      showAddModal.value = false;
      alert('Customer added successfully!');
    } catch (error: any) {
      console.error('Error adding customer:', error);
      
      // Extract error message
      const errorMessage = error?.data?.message 
        || error?.message 
        || error?.response?.data?.message
        || 'Unknown error occurred';
      
      alert(`Error adding customer: ${errorMessage}`);
    }
  } else {
    alert('Please fill in all fields');
  }
};

// Delete from Backend
const confirmDelete = async (id: number | string) => {
  if (!id) {
    alert("Error: Customer ID is undefined. Check your table binding.");
    return;
  }

  if (confirm("Are you sure you want to delete this customer?")) {
    try {
      // Use "as number" to reassure TypeScript that the runtime value fits your service method parameter
      await CustomerService.deleteCustomer(id as number);

      await fetchCustomers(); // Refresh the UI list
    } catch (error: any) {
      console.error("Delete failed for ID " + id, error);
      alert("Backend Error: " + (error.message || "Failed to execute delete action."));
    }
  }
};
</script>