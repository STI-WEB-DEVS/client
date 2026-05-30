<template>
  <div>
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Customer List</h1>
        <p class="text-sm/6 text-gray-500">Manage names and email addresses.</p>
      </div>
      <button
        @click="toggleForm"
        class="px-3 py-1.5 bg-green-600 text-white rounded-md text-sm/6 font-semibold shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
      >
        {{ showCreateForm ? 'Cancel' : 'Add Customer' }}
      </button>
    </div>

    <!-- Form -->
    <div v-if="showCreateForm" class="bg-white px-6 py-8 rounded-xl shadow-sm mb-8 border border-gray-200">
      <h2 class="text-base/7 font-semibold text-gray-900 mb-6">
        {{ editingUuid ? 'Update' : 'New' }} Customer
      </h2>
      <form @submit.prevent="handleSave" class="flex flex-col md:flex-row items-end gap-4">

        <div class="flex-1 w-full">
          <label class="block text-sm/6 font-medium text-gray-900 mb-2">Full Name</label>
          <input
            v-model="form.name"
            type="text"
            placeholder="John Doe"
            required
            class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"
          />
        </div>

        <div class="flex-1 w-full">
          <label class="block text-sm/6 font-medium text-gray-900 mb-2">Email Address</label>
          <input
            v-model="form.email"
            type="email"
            placeholder="john@example.com"
            required
            class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"
          />
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="px-4 py-1.5 bg-green-600 text-white rounded-md text-sm/6 font-semibold shadow-sm hover:bg-green-500 disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 h-[34px]"
        >
          {{ loading ? '...' : (editingUuid ? 'Update' : 'Save') }}
        </button>
      </form>
    </div>

    <!-- Table -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <table class="w-full text-left">
        <thead class="border-b border-gray-200">
          <tr>
            <th class="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
            <th class="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
            <th class="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr v-for="customer in customers" :key="customer.uuid" class="hover:bg-gray-50 transition">
            <td class="px-6 py-4 text-sm/6 font-medium text-gray-900">{{ customer.name }}</td>
            <td class="px-6 py-4 text-sm/6 text-gray-500">{{ customer.email }}</td>
            <td class="px-6 py-4 text-right space-x-4">
              <button @click="editCustomer(customer)" class="text-sm/6 font-semibold text-green-600 hover:text-green-500">
                Edit
              </button>
              <button @click="deleteCustomer(customer.uuid)" class="text-sm/6 font-semibold text-red-600 hover:text-red-500">
                Delete
              </button>
            </td>
          </tr>
          <tr v-if="customers.length === 0 && !loading">
            <td colspan="3" class="px-6 py-10 text-center text-sm/6 text-gray-400">No customers found.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
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