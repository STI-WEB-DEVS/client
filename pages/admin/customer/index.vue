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
                v-for="(customer, index) in customers?.data"
                :key="customer.uuid"
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

      <div v-if="isModalOpen" class="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50" @click="isModalOpen = false">
        <div @click.stop class="bg-white p-6 rounded-lg max-w-xl w-full mx-4 max-h-[90vh] overflow-y-auto relative">
          <button @click="isModalOpen = false" class="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
            <XMarkIcon class="h-6 w-6" />
          </button>
          <h2 class="text-lg font-medium mb-4">{{ mode === 'create' ? 'Create Customer' : 'Update Customer' }}</h2>
          <CustomerForm :mode="mode" :customer="selectedCustomer" @submitted="handleSubmitted" @cancel="isModalOpen = false" />
        </div>
      </div>

      <FeedbackModal
        :open="isFeedbackModalOpen"
        :message="feedbackMessage"
        @close="closeFeedbackModal"
      />
    </div>
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
import CustomerForm from '~/components/CustomerForm.vue';

const router = useRouter();

const customers = ref<any>(null);
const pending = ref(true);
const error = ref<any>(null);

const isFeedbackModalOpen = ref(false);
const feedbackMessage = ref('');

const selectedCustomer = ref<any>(null);
const mode = ref<'create' | 'update'>('create');
const isModalOpen = ref(false);
const isLoading = ref(false);

const syncCustomerMetaWithTable = () => {
  if (!customers.value?.meta || !customers.value?.data) return;

  const currentCount = customers.value.data.length;
  customers.value.meta.total = currentCount;
  customers.value.meta.to = currentCount;
  customers.value.meta.from = currentCount > 0 ? 1 : 0;
};

const fetchCustomers = async () => {
  pending.value = true;
  error.value = null;

  try {
    customers.value = await customerService.list();
    if (customers.value?.data) {
      customers.value.data.reverse();
    }
  } catch (err: any) {
    error.value = err;
  } finally {
    pending.value = false;
  }
};

onMounted(fetchCustomers);

const openFeedbackModal = (message: string) => {
  feedbackMessage.value = message;
  isFeedbackModalOpen.value = true;
};

const closeFeedbackModal = () => {
  isFeedbackModalOpen.value = false;
  feedbackMessage.value = '';
};

const handleCreate = () => {
  mode.value = 'create';
  selectedCustomer.value = null;
  isModalOpen.value = true;
};

const handleView = (customer: any) => {
  router.push(`/customer/${customer.uuid}`);
};

const handleEdit = (customer: any) => {
  mode.value = 'update';
  // Always get fresh data from the current array state
  const currentCustomer = customers.value.data.find(c => c.uuid === customer.uuid);
  selectedCustomer.value = currentCustomer || customer;
  isModalOpen.value = true;
};

const handleDelete = async (customer: any) => {
  if (!confirm(`Are you sure you want to delete "${customer.name}"?`)) return;

  const index = customers.value.data.findIndex(c => c.uuid === customer.uuid);
  if (index > -1) customers.value.data.splice(index, 1);

  try {
    await customerService.delete(customer.uuid);
    syncCustomerMetaWithTable();
    openFeedbackModal(`Customer "${customer.name}" deleted successfully.`);
  } catch (err: any) {
    // Revert if error
    if (index > -1) customers.value.data.splice(index, 0, customer);
    syncCustomerMetaWithTable();
    openFeedbackModal(`Failed to delete customer: ${err.message}`);
  }
};

const handleSubmitted = (data: {success: boolean, message: string, item?: any, action: string}) => {
  openFeedbackModal(data.message);
  if (data.success) {
    if (data.action === 'create' && data.item) {
      customers.value.data.push(data.item);
      syncCustomerMetaWithTable();
    } else if (data.action === 'update' && data.item) {
      const index = customers.value.data.findIndex(c => c.uuid === data.item.uuid);
      if (index > -1) {
        customers.value.data[index] = data.item;
        // Update selectedCustomer reference if it's the same item being edited
        if (selectedCustomer.value && selectedCustomer.value.uuid === data.item.uuid) {
          selectedCustomer.value = data.item;
        }
      }
    }
  }
  isModalOpen.value = false;
};
</script>
