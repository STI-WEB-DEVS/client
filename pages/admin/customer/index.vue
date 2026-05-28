<template>
  <div class="p-8 bg-gray-50 min-h-screen">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Customer List</h1>
          <p class="text-sm text-gray-500">Manage names and email addresses.</p>
        </div>
        <button 
          @click="toggleForm"
          class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition font-medium shadow-sm"
        >
          {{ showCreateForm ? 'Cancel' : 'Add Customer' }}
        </button>
      </div>

      <!-- Compact Form (Name & Email Only) -->
      <div v-if="showCreateForm" class="bg-white p-6 rounded-xl shadow-sm mb-8 border border-gray-200">
        <h2 class="text-lg font-semibold mb-4 text-gray-800">{{ editingUuid ? 'Update' : 'New' }} Customer</h2>
        <form @submit.prevent="handleSave" class="flex flex-col md:flex-row items-end gap-4">
          
          <div class="flex-1 w-full">
            <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input v-model="form.name" type="text" placeholder="John Doe" class="border border-gray-300 p-2 rounded-md w-full focus:ring-2 focus:ring-green-500 outline-none" required />
          </div>

          <div class="flex-1 w-full">
            <label class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input v-model="form.email" type="email" placeholder="john@example.com" class="border border-gray-300 p-2 rounded-md w-full focus:ring-2 focus:ring-green-500 outline-none" required />
          </div>

          <button type="submit" :disabled="loading" class="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50 font-bold transition h-[42px]">
            {{ loading ? '...' : (editingUuid ? 'Update' : 'Save') }}
          </button>
        </form>
      </div>

      <!-- Customer Table -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table class="w-full text-left">
          <thead class="bg-gray-50 border-b border-gray-200">
            <tr>
              <th class="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Name</th>
              <th class="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Email</th>
              <th class="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="customer in customers" :key="customer.uuid" class="hover:bg-gray-50 transition">
              <td class="px-6 py-4 font-medium text-gray-900">{{ customer.name }}</td>
              <td class="px-6 py-4 text-gray-600">{{ customer.email }}</td>
              <td class="px-6 py-4 text-right space-x-4">
                <button @click="editCustomer(customer)" class="text-indigo-600 hover:text-indigo-900 font-semibold text-sm">Edit</button>
                <button @click="deleteCustomer(customer.uuid)" class="text-red-600 hover:text-red-900 font-semibold text-sm">Delete</button>
              </td>
            </tr>
            <tr v-if="customers.length === 0 && !loading">
              <td colspan="3" class="px-6 py-10 text-center text-gray-400">No customers found.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' });
import { ref, onMounted } from 'vue';
import { customerService } from '~/api/customer/CustomerService';

const customers = ref<any[]>([]);
const loading = ref(false);
const showCreateForm = ref(false);
const editingUuid = ref<string | null>(null);

const form = ref({
  name: '',
  email: ''
});

const fetchCustomers = async () => {
  loading.value = true;
  try {
    const response = await customerService.list();
    customers.value = response?.data || response || [];
  } catch (error) {
    console.error('Failed to load:', error);
  } finally {
    loading.value = false;
  }
};

const handleSave = async () => {
  loading.value = true;
  try {
    if (editingUuid.value) {
      await customerService.update(editingUuid.value, form.value);
    } else {
      await customerService.create(form.value);
    }
    resetForm();
    await fetchCustomers();
  } catch (error: any) {
    alert(error?.message || 'Action failed');
  } finally {
    loading.value = false;
  }
};

const editCustomer = (customer: any) => {
  editingUuid.value = customer.uuid;
  form.value = { 
    name: customer.name, 
    email: customer.email 
  };
  showCreateForm.value = true;
};

const deleteCustomer = async (uuid: string) => {
  if (!confirm('Delete customer?')) return;
  try {
    await customerService.delete(uuid);
    await fetchCustomers();
  } catch (error) {
    alert('Delete failed');
  }
};

const toggleForm = () => {
  showCreateForm.value ? resetForm() : (showCreateForm.value = true);
};

const resetForm = () => {
  form.value = { name: '', email: '' };
  editingUuid.value = null;
  showCreateForm.value = false;
};

onMounted(fetchCustomers);
</script>