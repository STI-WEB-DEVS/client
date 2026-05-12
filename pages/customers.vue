<template>
  <NuxtLayout>
    <div class="p-8 bg-gray-50 min-h-screen">
      <div class="max-w-6xl mx-auto">
        <h1 class="text-2xl font-bold text-[#2d4123] mb-8">Customer Management</h1>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <!-- LEFT: Management Form -->
          <div class="lg:col-span-4">
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 class="text-lg font-semibold text-gray-800 mb-6">
                {{ isEditing ? 'Edit Customer' : 'Add New Customer' }}
              </h2>

              <form class="space-y-5" @submit.prevent="handleSubmit">
                <div>
                  <label for="name" class="block text-sm font-medium text-gray-700">Customer Name</label>
                  <div class="mt-1">
                    <input 
                      v-model="customerName"
                      type="text" 
                      id="name" 
                      placeholder="Enter full name"
                      required 
                      class="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#8fa386] sm:text-sm" 
                    />
                  </div>
                </div>

                <div>
                  <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
                  <div class="mt-1">
                    <input 
                      v-model="customerEmail"
                      type="email" 
                      id="email" 
                      placeholder="hiker@example.com"
                      required 
                      class="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#8fa386] sm:text-sm" 
                    />
                  </div>
                </div>

                <div class="pt-2 flex flex-col gap-3">
                  <button 
                    type="submit" 
                    class="flex w-full justify-center rounded-md bg-[#8fa386] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#7a8d72] transition-colors"
                  >
                    {{ isEditing ? 'Update Customer' : 'Add Customer' }}
                  </button>

                  <button 
                    v-if="isEditing"
                    @click="resetForm"
                    type="button" 
                    class="flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>

          <!-- RIGHT: Customer Table -->
          <div class="lg:col-span-8">
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Customer</th>
                    <th class="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Email</th>
                    <th class="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100 bg-white">
                  <tr v-for="customer in customers" :key="customer.id" class="hover:bg-gray-50 transition-colors">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm font-medium text-gray-900">{{ customer.name }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-600">{{ customer.email }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button @click="editCustomer(customer)" class="text-indigo-600 hover:text-indigo-900 mr-4">Edit</button>
                      <button @click="deleteCustomer(customer.id)" class="text-red-600 hover:text-red-900">Delete</button>
                    </td>
                  </tr>
                  <tr v-if="customers.length === 0">
                    <td colspan="3" class="px-6 py-10 text-center text-gray-400 italic">No customers found.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Customer Data Types
interface Customer {
  id: number;
  name: string;
  email: string;
}

// State
const customerName = ref('');
const customerEmail = ref('');
const isEditing = ref(false);
const editingId = ref<number | null>(null);

// Local "Database"
const customers = ref<Customer[]>([
  { id: 1, name: 'Kristine Smith', email: 'kristine@example.com' },
  { id: 2, name: 'Juan Dela Cruz', email: 'juan@hiking.ph' },
]);

// Handlers
const handleSubmit = () => {
  if (isEditing.value && editingId.value !== null) {
    // UPDATE
    const index = customers.value.findIndex(c => c.id === editingId.value);
    if (index !== -1) {
      customers.value[index] = {
        id: editingId.value,
        name: customerName.value,
        email: customerEmail.value
      };
    }
  } else {
    // CREATE
    const newCustomer: Customer = {
      id: Date.now(),
      name: customerName.value,
      email: customerEmail.value
    };
    customers.value.push(newCustomer);
  }
  resetForm();
};

const editCustomer = (customer: Customer) => {
  isEditing.value = true;
  editingId.value = customer.id;
  customerName.value = customer.name;
  customerEmail.value = customer.email;
};

const deleteCustomer = (id: number) => {
  customers.value = customers.value.filter(c => c.id !== id);
};

const resetForm = () => {
  customerName.value = '';
  customerEmail.value = '';
  isEditing.value = false;
  editingId.value = null;
};
</script>