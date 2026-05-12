<template>
    <NuxtLayout>
      <div class="p-8 bg-gray-50 min-h-screen">
        <div class="max-w-6xl mx-auto">
          <h1 class="text-2xl font-bold text-[#2d4123] mb-8">Customer Management</h1>
  
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div class="lg:col-span-4">
              <div 
                v-if="statusMessage" 
                :class="[
                  'mb-4 p-3 rounded-md text-sm font-medium border transition-all',
                  isError ? 'bg-red-100 text-red-700 border-red-200' : 'bg-green-100 text-green-700 border-green-200'
                ]"
              >
                {{ statusMessage }}
              </div>
  
              <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 class="text-lg font-semibold text-gray-800 mb-6">
                  {{ isEditing ? 'Edit Customer' : 'Add New Customer' }}
                </h2>
  
                <form class="space-y-5" @submit.prevent="handleSubmit">
                  <div>
                    <label class="block text-sm font-medium text-gray-700">Customer Name</label>
                    <input v-model="customerName" type="text" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm ring-1 ring-gray-300 py-2 px-3 focus:ring-2 focus:ring-[#8fa386] sm:text-sm" />
                  </div>
  
                  <div>
                    <label class="block text-sm font-medium text-gray-700">Email address</label>
                    <input v-model="customerEmail" type="email" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm ring-1 ring-gray-300 py-2 px-3 focus:ring-2 focus:ring-[#8fa386] sm:text-sm" />
                  </div>
  
                  <div class="pt-2 flex flex-col gap-3">
                    <button type="submit" :disabled="isSubmitting" class="w-full bg-[#8fa386] text-white py-2 rounded-md font-semibold hover:bg-[#7a8d72] disabled:opacity-50">
                      {{ isSubmitting ? 'Saving...' : (isEditing ? 'Update' : 'Add Customer') }}
                    </button>
                    <button v-if="isEditing" @click="resetForm" type="button" class="w-full bg-gray-100 text-gray-600 py-2 rounded-md hover:bg-gray-200">
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
  
            <div class="lg:col-span-8">
              <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th class="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Customer</th>
                      <th class="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Email</th>
                      <th class="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-100 bg-white">
                    <tr v-for="customer in customers" :key="customer.uuid" class="hover:bg-gray-50 transition-colors">
                      <td class="px-6 py-4 text-sm text-gray-900 font-medium">{{ customer.name }}</td>
                      <td class="px-6 py-4 text-sm text-gray-600">{{ customer.email }}</td>
                      <td class="px-6 py-4 text-right text-sm font-medium space-x-3">
                        <button @click="viewCustomer(customer.uuid)" class="text-[#8fa386] hover:text-[#2d4123]">View</button>
                        <button @click="editCustomer(customer)" class="text-indigo-600 hover:text-indigo-900">Edit</button>
                        <button @click="handleDelete(customer)" class="text-red-600 hover:text-red-900">Delete</button>
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
  import { ref, onMounted } from 'vue';
  import { customerService } from '~/api/customer/CustomerService';
  
  const customers = ref<any[]>([]);
  const customerName = ref("");
  const customerEmail = ref("");
  const isEditing = ref(false);
  const editingUuid = ref<string | null>(null);
  const isSubmitting = ref(false);
  
  // Notification States
  const statusMessage = ref("");
  const isError = ref(false);
  
  const setNotification = (msg: string, error = false) => {
    statusMessage.value = msg;
    isError.value = error;
    setTimeout(() => {
      statusMessage.value = "";
      isError.value = false;
    }, 4000);
  };
  
  const fetchCustomers = async () => {
    try {
      const res = await customerService.list();
      customers.value = res.data || res;
    } catch (err) {
      console.error("Fetch error", err);
    }
  };
  
  const viewCustomer = (uuid: string) => {
    if (!uuid) return alert("Customer UUID missing");
    // NAVIGATE TO ROOT AS PER YOUR PREFERENCE
    navigateTo(`/${uuid}`);
  };
  
  const handleDelete = async (customer: any) => {
    if (!confirm(`Are you sure you want to delete ${customer.name}?`)) return;
    try {
      await customerService.delete(customer.uuid);
      await fetchCustomers();
      setNotification("Customer deleted successfully.");
    } catch (err) {
      setNotification("Could not delete. Customer might be in use.", true);
    }
  };
  
  const handleSubmit = async () => {
    // 1. Check for Duplicate Email locally to prevent extra API calls
    const isDuplicate = customers.value.some(c => 
      c.email.toLowerCase() === customerEmail.value.toLowerCase() && c.uuid !== editingUuid.value
    );
  
    if (isDuplicate) {
      setNotification("A customer with this email already exists.", true);
      return;
    }
  
    isSubmitting.value = true;
    try {
      const payload = { name: customerName.value, email: customerEmail.value };
      
      if (isEditing.value && editingUuid.value) {
        await customerService.update(editingUuid.value, payload);
        setNotification("Customer updated successfully!");
      } else {
        await customerService.create(payload);
        setNotification("Customer created successfully!");
      }
      
      await fetchCustomers();
      resetForm();
    } catch (err: any) {
      const errorMsg = err?.response?.data?.message || "Operation failed.";
      setNotification(errorMsg, true);
    } finally {
      isSubmitting.value = false;
    }
  };
  
  const editCustomer = (customer: any) => {
    isEditing.value = true;
    editingUuid.value = customer.uuid;
    customerName.value = customer.name;
    customerEmail.value = customer.email;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const resetForm = () => {
    customerName.value = "";
    customerEmail.value = "";
    isEditing.value = false;
    editingUuid.value = null;
  };
  
  onMounted(fetchCustomers);
  </script>