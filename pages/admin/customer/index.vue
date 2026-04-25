<template>
    <div class="space-y-6">
      <PageHeader
        title="Customers"
        description="Displaying customer records from your API."
        button-text="Create Customer"
        :show-button="true"
        :icon="PlusIcon"
        @action="handleCreate"
      />

      <div v-if="pending" class="flex justify-center py-16">
        <div class="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900"></div>
      </div>

      <div v-else-if="error" class="rounded-xl border border-red-200 bg-red-50 p-4">
        <p class="text-sm text-red-700">{{ error.message }}</p>
      </div>

      <div v-else>
        <BaseTable
          :headers="[
            { label: 'ID', key: 'id', class: 'font-medium text-gray-900' },
            { label: 'Name', key: 'name' },
            { label: 'Email', key: 'email' },
            { label: 'Created At', key: 'created_at' },
            { label: 'Actions', key: 'actions', align: 'right' }
          ]"
          :items="customers?.data || []"
          :meta="customers?.meta"
          resource-name="customers"
          empty-message="No customers found."
        >
          <template #cell(created_at)="{ value }">
            {{ value ? new Date(value).toLocaleString() : 'N/A' }}
          </template>

          <template #cell(actions)="{ item }">
            <div class="flex items-center justify-end gap-2">
              <button type="button" @click="handleView(item)"
                class="inline-flex items-center gap-2 rounded-md border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
                <EyeIcon class="h-4 w-4" />
                <span>View</span>
              </button>

              <button type="button" @click="handleEdit(item)"
                class="inline-flex items-center gap-2 rounded-md border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
                <PencilSquareIcon class="h-4 w-4" />
                <span>Edit</span>
              </button>

              <button type="button" @click="handleDelete(item)"
                class="inline-flex items-center gap-2 rounded-md border border-red-200 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50">
                <TrashIcon class="h-4 w-4" />
                <span>Delete</span>
              </button>
            </div>
          </template>
        </BaseTable>
      </div>

      <BaseModal :open="isModalOpen" title="Customer" :fields="[
        { key: 'name', label: 'Name', placeholder: 'John Doe' },
        { key: 'email', label: 'Email', type: 'email', placeholder: 'john@example.com' }
      ]" :initial-data="selectedCustomer" :pending="isSaving" @close="closeModal" @save="handleSave" />

      <FeedbackModal :open="isFeedbackModalOpen" :message="feedbackMessage" @close="closeFeedbackModal" />

      <FeedbackModal :open="isDeleteModalOpen" title="Confirm Delete"
        :message="`Are you sure you want to delete ${customerToDelete?.name}?`" show-cancel
        @close="isDeleteModalOpen = false" @confirm="confirmDelete" />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import {
  PlusIcon,
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/vue/24/outline';
import { customerService } from '~/api/customer/CustomerService';
import BaseModal from '~/components/BaseModal.vue';

const router = useRouter();

const customers = ref<any>(null);
const pending = ref(true);
const error = ref<any>(null);

const isFeedbackModalOpen = ref(false);
const feedbackMessage = ref('');

const isModalOpen = ref(false);
const isSaving = ref(false);
const selectedCustomer = ref<any>(null);

const isDeleteModalOpen = ref(false);
const customerToDelete = ref<any>(null);

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

onMounted(() => {
  fetchCustomers();
});

const openFeedbackModal = (message: string) => {
  feedbackMessage.value = message;
  isFeedbackModalOpen.value = true;
};

const closeFeedbackModal = () => {
  isFeedbackModalOpen.value = false;
  feedbackMessage.value = '';
};

const closeModal = () => {
  isModalOpen.value = false;
  selectedCustomer.value = null;
};

const handleCreate = () => {
  selectedCustomer.value = null;
  isModalOpen.value = true;
};

const handleEdit = (customer: any) => {
  selectedCustomer.value = customer;
  isModalOpen.value = true;
};

const handleSave = async (formData: any) => {
  isSaving.value = true;
  try {
    if (selectedCustomer.value) {
      await customerService.update(selectedCustomer.value.uuid, formData);
    } else {
      await customerService.create(formData);
    }
    await fetchCustomers();
    closeModal();
    openFeedbackModal(`Customer ${selectedCustomer.value ? 'updated' : 'created'} successfully`);
  } catch (err: any) {
    console.error('Failed to save customer:', err);
    openFeedbackModal('Failed to save customer.');
  } finally {
    isSaving.value = false;
  }
};

const handleView = (customer: any) => {
  router.push(`/admin/customer/${customer.uuid}`);
};

const handleDelete = (customer: any) => {
  customerToDelete.value = customer;
  isDeleteModalOpen.value = true;
};

const confirmDelete = async () => {
  if (!customerToDelete.value) return;

  try {
    await customerService.delete(customerToDelete.value.uuid);
    await fetchCustomers();
    isDeleteModalOpen.value = false;
    openFeedbackModal('Customer deleted successfully');
  } catch (err: any) {
    console.error('Failed to delete customer:', err);
    openFeedbackModal('Failed to delete customer.');
  } finally {
    customerToDelete.value = null;
  }
};
</script>