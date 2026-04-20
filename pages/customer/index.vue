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
                  ID
                </th>
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
                v-for="(customer, index) in [...(customers?.data || [])].reverse()"
                :key="customer.id"
                class="transition hover:bg-gray-50"
              >
                <td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                  {{ index + 1 }}
                </td>
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
                <td colspan="4" class="px-6 py-10 text-center text-sm text-gray-500">
                  No customers found.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="border-t border-gray-200 bg-gray-50 px-6 py-4">
          <p class="text-sm text-gray-500">
            Showing
            <span class="font-medium text-gray-900">{{ customers?.meta?.from ?? 0 }}</span>
            to
            <span class="font-medium text-gray-900">{{ customers?.meta?.to ?? 0 }}</span>
            of
            <span class="font-medium text-gray-900">{{ customers?.meta?.total ?? 0 }}</span>
            customers
          </p>
        </div>
      </div>

      <!-- Create Customer Modal -->
      <div v-if="showCreateModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div class="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
          <div class="mb-4 flex items-center justify-between">
            <h2 class="text-lg font-semibold text-gray-900">Create Customer</h2>
            <button @click="showCreateModal = false" class="text-gray-400 hover:text-gray-600">
              <XMarkIcon class="h-5 w-5" />
            </button>
          </div>
          <form @submit.prevent="submitCreate">
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700">Name</label>
              <input 
                v-model="createForm.name" 
                type="text" 
                required 
                class="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-gray-500 focus:ring-gray-500" 
              />
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700">Email</label>
              <input 
                v-model="createForm.email" 
                type="email" 
                required 
                class="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-gray-500 focus:ring-gray-500" 
              />
            </div>

            <div class="flex justify-end gap-3">
              <button
                type="button"
                @click="showCreateModal = false"
                class="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                :disabled="isSubmitting"
                class="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
              >
                {{ isSubmitting ? 'Creating...' : 'Create' }}
              </button>
            </div>
          </form>
        </div>
      </div>

      <FeedbackModal
        :open="isFeedbackModalOpen"
        :message="feedbackMessage"
        :type="feedbackType"
        @close="closeFeedbackModal"
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
  XMarkIcon,
} from '@heroicons/vue/24/outline';
import { customerService } from '~/api/customer/CustomerService';

const router = useRouter();

const customers = ref<any>(null);
const pending = ref(true);
const error = ref<any>(null);

const isFeedbackModalOpen = ref(false);
const feedbackMessage = ref('');
const feedbackType = ref<'success' | 'error' | 'info'>('info');

const showCreateModal = ref(false);
const createForm = ref({
  name: '',
  email: ''
});
const isSubmitting = ref(false);

const refreshCustomers = async () => {
  try {
    customers.value = await customerService.list();
  } catch (err: any) {
    console.error('Failed to refresh customers', err);
  }
};

onMounted(async () => {
  pending.value = true;
  error.value = null;

  try {
    customers.value = await customerService.list();
  } catch (err: any) {
    error.value = err;
  } finally {
    pending.value = false;
  }
});

const openFeedbackModal = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
  feedbackMessage.value = message;
  feedbackType.value = type;
  isFeedbackModalOpen.value = true;
};

const closeFeedbackModal = () => {
  isFeedbackModalOpen.value = false;
  feedbackMessage.value = '';
};

const handleCreate = () => {
  createForm.value = {
    name: '',
    email: ''
  };
  showCreateModal.value = true;
};

const submitCreate = async () => {
  isSubmitting.value = true;
  try {
    await customerService.create(createForm.value);
    showCreateModal.value = false;
    openFeedbackModal('Customer created successfully!', 'success');
    await refreshCustomers();
  } catch (err: any) {
    openFeedbackModal(err.message || 'Failed to create customer', 'error');
  } finally {
    isSubmitting.value = false;
  }
};

const handleView = (customer: any) => {
  router.push(`/customer/${customer.uuid}`);
};

const handleEdit = (customer: any) => {
  router.push(`/customer/${customer.uuid}?mode=edit`);
};

const handleDelete = async (customer: any) => {
  if (confirm(`Are you sure you want to delete "${customer.name}"?`)) {
    try {
      await customerService.delete(customer.uuid);
      openFeedbackModal('Customer deleted successfully!', 'success');
      await refreshCustomers();
    } catch (err: any) {
      openFeedbackModal(err.message || 'Failed to delete customer', 'error');
    }
  }
};
</script>
