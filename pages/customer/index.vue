<template>
  <NuxtLayout>
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
                <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Name
                </th>
                <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Email
                </th>
                <th class="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody class="divide-y divide-gray-100 bg-white">
              <tr
                v-for="customer in customers?.data"
                :key="customer.id"
                class="transition hover:bg-gray-50"
              >
                <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-700">
                  {{ customer.name }}
                </td>
                <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {{ customer.email }}
                </td>
                <td class="whitespace-nowrap px-6 py-4">
                  <div class="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      @click="handleView(customer)"
                      class="inline-flex items-center gap-2 rounded-md border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      <EyeIcon class="h-4 w-4" />
                      <span>View</span>
                    </button>

                    <button
                      type="button"
                      @click="handleEdit(customer)"
                      class="inline-flex items-center gap-2 rounded-md border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      <PencilSquareIcon class="h-4 w-4" />
                      <span>Edit</span>
                    </button>

                    <button
                      type="button"
                      @click="handleDelete(customer)"
                      class="inline-flex items-center gap-2 rounded-md border border-red-200 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50"
                    >
                      <TrashIcon class="h-4 w-4" />
                      <span>Delete</span>
                    </button>
                  </div>
                </td>
              </tr>

              <tr v-if="!customers?.data?.length">
                <td colspan="3" class="px-6 py-10 text-center text-sm text-gray-500">
                  No customers found.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>

      <FeedbackModal
        :open="isFeedbackModalOpen"
        :title="feedbackTitle"
        :message="feedbackMessage"
        :tone="feedbackTone"
        @close="closeFeedbackModal"
      />

      <CustomerFormModal
        :open="isFormModalOpen"
        :mode="formMode"
        :name="form.name"
        :email="form.email"
        :error="formError"
        :is-submitting="isSubmitting"
        @close="closeFormModal"
        @submit="submitCustomerForm"
        @update:name="form.name = $event"
        @update:email="form.email = $event"
      />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import {
  PlusIcon,
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/vue/24/outline';
import { customerService } from '~/api/customer/CustomerService';

const router = useRouter();

type Customer = {
  id: number;
  uuid: string;
  name: string;
  email: string;
};

const customers = ref<any>(null);
const pending = ref(true);
const error = ref<any>(null);
const isSubmitting = ref(false);
const isFormModalOpen = ref(false);
const formMode = ref<'create' | 'edit'>('create');
const selectedCustomerUuid = ref('');
const formError = ref('');
const form = ref({
  name: '',
  email: '',
});

const isFeedbackModalOpen = ref(false);
const feedbackTitle = ref('Feedback');
const feedbackMessage = ref('');
const feedbackTone = ref<'neutral' | 'success' | 'error'>('neutral');

const fetchCustomers = async () => {
  pending.value = true;
  error.value = null;

  try {
    customers.value = await customerService.list();
  } catch (err: any) {
    error.value = err;
  } finally {
    pending.value = false;
  }
};

onMounted(fetchCustomers);

const openFeedbackModal = (
  title: string,
  message: string,
  tone: 'neutral' | 'success' | 'error' = 'neutral',
) => {
  feedbackTitle.value = title;
  feedbackMessage.value = message;
  feedbackTone.value = tone;
  isFeedbackModalOpen.value = true;
};

const closeFeedbackModal = () => {
  isFeedbackModalOpen.value = false;
  feedbackTitle.value = 'Feedback';
  feedbackMessage.value = '';
  feedbackTone.value = 'neutral';
};

const openCreateModal = () => {
  formMode.value = 'create';
  selectedCustomerUuid.value = '';
  form.value = { name: '', email: '' };
  formError.value = '';
  isFormModalOpen.value = true;
};

const openEditModal = (customer: Customer) => {
  formMode.value = 'edit';
  selectedCustomerUuid.value = customer.uuid;
  form.value = {
    name: customer.name,
    email: customer.email,
  };
  formError.value = '';
  isFormModalOpen.value = true;
};

const closeFormModal = () => {
  isFormModalOpen.value = false;
  formError.value = '';
};

const submitCustomerForm = async () => {
  isSubmitting.value = true;
  formError.value = '';

  try {
    if (formMode.value === 'create') {
      await customerService.create(form.value);
      openFeedbackModal('Success', 'Customer created successfully.', 'success');
    } else {
      await customerService.update(selectedCustomerUuid.value, form.value);
      openFeedbackModal('Success', 'Customer updated successfully.', 'success');
    }

    closeFormModal();
    await fetchCustomers();
  } catch (err: any) {
    formError.value = err?.message || 'Unable to save customer.';
  } finally {
    isSubmitting.value = false;
  }
};

const handleCreate = () => {
  openCreateModal();
};

const handleView = (customer: Customer) => {
  router.push(`/customer/${customer.uuid}`);
};

const handleEdit = (customer: Customer) => {
  openEditModal(customer);
};

const handleDelete = async (customer: Customer) => {
  const confirmed = window.confirm(`Delete customer "${customer.name}"?`);

  if (!confirmed) {
    return;
  }

  try {
    await customerService.delete(customer.uuid);
    openFeedbackModal('Success', 'Customer deleted successfully.', 'success');
    await fetchCustomers();
  } catch (err: any) {
    openFeedbackModal('Delete failed', err?.message || 'Unable to delete customer.', 'error');
  }
};
</script>
