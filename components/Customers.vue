<template>
  <div class="px-4 sm:px-6 lg:px-8 py-8">
    <!-- Header -->
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-base font-semibold text-gray-900">Customers</h1>
        <p class="mt-2 text-sm text-gray-700">Click any row to view full customer details.</p>
      </div>
      <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        <button 
          @click="openEditModal()"
          type="button" 
          class="block rounded-md bg-[#6D4C41] px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-[#5d4037]"
        >
          Add Customer
        </button>
      </div>
    </div>

    <!-- Table -->
    <div class="mt-8 flow-root">
      <div class="overflow-x-auto shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
        <table class="min-w-full divide-y divide-gray-300">
          <thead class="bg-gray-50">
            <tr>
              <th class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Name</th>
              <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Email</th>
              <th class="relative py-3.5 pl-3 pr-4 text-right sm:pr-6">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 bg-white">
            <tr v-if="isLoading">
               <td colspan="3" class="py-10 text-center text-sm text-gray-500">Loading customers...</td>
            </tr>
            <tr 
              v-for="customer in customers" 
              :key="customer.uuid"
              @click="handleViewDetails(customer.uuid)"
              class="hover:bg-gray-50 cursor-pointer transition-colors group"
            >
              <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                {{ customer.name }}
              </td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {{ customer.email }}
              </td>
              <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium" @click.stop>
                <button @click="openEditModal(customer)" class="text-[#6D4C41] hover:text-[#5d4037] mr-4">Edit</button>
                <button @click="handleDelete(customer.uuid)" class="text-red-600 hover:text-red-900">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- VIEW DETAILS SLIDE-OVER -->
    <div v-if="isViewOpen" class="relative z-50">
      <div class="fixed inset-0 bg-gray-500/75 transition-opacity" @click="isViewOpen = false"></div>
      <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <div class="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out">
              <div class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div class="bg-[#6D4C41] px-4 py-6 sm:px-6">
                  <div class="flex items-center justify-between">
                    <h2 class="text-base font-semibold leading-6 text-white">Customer Profile</h2>
                    <button @click="isViewOpen = false" class="text-white hover:text-gray-200">✕</button>
                  </div>
                </div>
                <div class="relative flex-1 px-4 py-6 sm:px-6">
                  <div v-if="selectedCustomer" class="space-y-6">
                    <div>
                      <h3 class="text-sm font-medium text-gray-500">Full Name</h3>
                      <p class="mt-1 text-lg text-gray-900">{{ selectedCustomer.name }}</p>
                    </div>
                    <div>
                      <h3 class="text-sm font-medium text-gray-500">Email Address</h3>
                      <p class="mt-1 text-lg text-gray-900">{{ selectedCustomer.email }}</p>
                    </div>
                    <div class="pt-4 border-t border-gray-100">
                      <h3 class="text-sm font-medium text-gray-500">Customer UUID</h3>
                      <p class="mt-1 text-xs font-mono text-gray-400">{{ selectedCustomer.uuid }}</p>
                    </div>
                  </div>
                  <div v-else class="flex justify-center py-12">
                    <p class="text-gray-500">Loading details...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- EDIT/ADD MODAL -->
    <div v-if="isEditModalOpen" class="relative z-50">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75" @click="isEditModalOpen = false"></div>
      <div class="fixed inset-0 z-10 flex items-center justify-center p-4">
        <div class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl sm:w-full sm:max-w-lg sm:p-6">
          <form @submit.prevent="submitForm">
            <h3 class="text-lg font-semibold text-gray-900">{{ editingUuid ? 'Edit Customer' : 'New Customer' }}</h3>
            <div class="mt-4 space-y-4">
              <input v-model="form.name" placeholder="Name" required class="block w-full rounded-md border-0 px-1.5 py-1.5 ring-1 ring-gray-300 focus:ring-2 focus:ring-[#6D4C41]" />
              <input v-model="form.email" placeholder="Email" required type="email" class="block w-full rounded-md border-0 px-1.5 py-1.5 ring-1 ring-gray-300 focus:ring-2 focus:ring-[#6D4C41]" />
            </div>
            <div class="mt-6 flex justify-end gap-3">
              <button @click="isEditModalOpen = false" type="button" class="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300">Cancel</button>
              <button type="submit" class="rounded-md bg-[#6D4C41] px-3 py-2 text-sm font-semibold text-white">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { customerService } from '~/api/customer/CustomerService';

// Data Lists
const customers = ref<any[]>([]);
const isLoading = ref(false);

// View Detail State
const isViewOpen = ref(false);
const selectedCustomer = ref<any>(null);

// Edit/Add State
const isEditModalOpen = ref(false);
const editingUuid = ref<string | null>(null);
const form = ref({ name: '', email: '' });

// 1. Fetch List
const loadData = async () => {
  isLoading.value = true;
  try {
    const res = await customerService.list();
    customers.value = res.data || res;
  } catch (e) {
    console.error("Fetch failed", e);
  } finally {
    isLoading.value = false;
  }
};

// 2. View Individual Customer
const handleViewDetails = async (uuid: string) => {
  isViewOpen.value = true;
  selectedCustomer.value = null; // Reset loader
  try {
    const res = await customerService.show(uuid);
    selectedCustomer.value = res.data || res;
  } catch (e) {
    isViewOpen.value = false;
    alert("Could not load details");
  }
};

// 3. Open Edit/Add Modal
const openEditModal = (customer: any = null) => {
  if (customer) {
    editingUuid.value = customer.uuid;
    form.value = { name: customer.name, email: customer.email };
  } else {
    editingUuid.value = null;
    form.value = { name: '', email: '' };
  }
  isEditModalOpen.value = true;
};

// 4. Create or Update
const submitForm = async () => {
  try {
    if (editingUuid.value) {
      await customerService.update(editingUuid.value, form.value);
    } else {
      await customerService.create(form.value);
    }
    isEditModalOpen.value = false;
    loadData();
  } catch (e) {
    alert("Error saving data");
  }
};

// 5. Delete
const handleDelete = async (uuid: string) => {
  if (!confirm("Are you sure?")) return;
  try {
    await customerService.delete(uuid);
    loadData();
  } catch (e) {
    alert("Error deleting");
  }
};

onMounted(loadData);
</script>