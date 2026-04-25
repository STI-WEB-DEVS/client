<template>
    <div class="space-y-6">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 class="text-xl font-semibold tracking-tight text-gray-900">Customers</h1>
          <p class="mt-1 text-sm text-gray-500">
            Displaying customer records from your API.
          </p>
        </div>

        <button
          type="button"
          @click="handleCreate"
          class="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          <PlusIcon class="h-4 w-4" />
          <span>Create Customer</span>
        </button>
      </div>

      <div v-if="pending" class="flex justify-center py-16">
        <div class="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900"></div>
      </div>

      <div v-else-if="error" class="rounded-xl border border-red-200 bg-red-50 p-4">
        <p class="text-sm text-red-700">{{ error.message }}</p>
      </div>

      <div v-else class="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">ID</th>
                <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Name</th>
                <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Email</th>
                <th class="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">Actions</th>
              </tr>
            </thead>

            <tbody class="divide-y divide-gray-100 bg-white">
              <tr v-for="customer in customers?.data" :key="customer.id" class="transition hover:bg-gray-50">
                <td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">{{ customer.id }}</td>
                <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-700">{{ customer.name }}</td>
                <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{{ customer.email }}</td>
                <td class="whitespace-nowrap px-6 py-4">
                  <div class="flex items-center justify-end gap-2">
                    <button @click="handleView(customer)" class="inline-flex items-center gap-2 rounded-md border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
                      <EyeIcon class="h-4 w-4" />
                      <span>View</span>
                    </button>
                    <button @click="handleEdit(customer)" class="inline-flex items-center gap-2 rounded-md border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
                      <PencilSquareIcon class="h-4 w-4" />
                    </button>
                    <button @click="handleDelete(customer)" class="inline-flex items-center gap-2 rounded-md border border-red-200 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50">
                      <TrashIcon class="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <CustomerModal
        :open="isModalOpen"
        :loading="isSaving"
        :customer="selectedCustomer"
        @close="isModalOpen = false"
        @submit="handleFormSubmit"
      />
``
      <DeleteModal
        :open="isDeleteModalOpen"
        :loading="isSaving"
        :title="customerToDelete?.name || 'this customer'"
        @close="isDeleteModalOpen = false"
        @confirm="confirmDelete"
      />  

      <FeedbackModal :open="isFeedbackModalOpen" :message="feedbackMessage" @close="closeFeedbackModal" />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { PlusIcon, EyeIcon, PencilSquareIcon, TrashIcon } from '@heroicons/vue/24/outline';
import { customerService } from '~/api/customer/CustomerService';

const router = useRouter();

// State
const customers = ref<any>(null);
const pending = ref(true);
const error = ref<any>(null);
const isSaving = ref(false);

// Unified Modal State
const isModalOpen = ref(false);
const selectedCustomer = ref<any>(null);

// Delete State
const isDeleteModalOpen = ref(false);
const customerToDelete = ref<any>(null);

// Feedback State
const isFeedbackModalOpen = ref(false);
const feedbackMessage = ref('');

const fetchCustomers = async () => {
  pending.value = true;
  try {
    customers.value = await customerService.list();
  } catch (err: any) {
    error.value = err;
  } finally {
    pending.value = false;
  }
};

onMounted(fetchCustomers);

const handleCreate = () => {
  selectedCustomer.value = null; // null triggers "Create" mode in the component
  isModalOpen.value = true;
};

const handleEdit = (customer: any) => {
  selectedCustomer.value = customer; // presence of data triggers "Edit" mode
  isModalOpen.value = true;
};

const handleFormSubmit = async (formData: any) => {
  isSaving.value = true;
  try {
    if (selectedCustomer.value) {
      await customerService.update(selectedCustomer.value.uuid, formData);
      openFeedbackModal('Customer updated successfully!');
    } else {
      await customerService.create(formData);
      openFeedbackModal('Customer created successfully!');
    }
    isModalOpen.value = false;
    await fetchCustomers();
  } catch (err: any) {
    alert('Error: ' + err.message);
  } finally {
    isSaving.value = false;
  }
};

const handleDelete = (customer: any) => {
  customerToDelete.value = customer;
  isDeleteModalOpen.value = true;
};

const confirmDelete = async () => {
  if (!customerToDelete.value) return;
  isSaving.value = true;
  try {
    await customerService.delete(customerToDelete.value.uuid);
    isDeleteModalOpen.value = false;
    customerToDelete.value = null;
    await fetchCustomers();
    openFeedbackModal('Customer deleted successfully!');
  } catch (err: any) {
    alert('Error: ' + err.message);
  } finally {
    isSaving.value = false;
  }
};

// HELPERS
const openFeedbackModal = (message: string) => {
  feedbackMessage.value = message;
  isFeedbackModalOpen.value = true;
};

const closeFeedbackModal = () => {
  isFeedbackModalOpen.value = false;
  feedbackMessage.value = '';
};

const handleView = (customer: any) => {
  router.push(`/customer/${customer.uuid}`);
};
</script>