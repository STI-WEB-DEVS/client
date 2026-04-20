<template>
  <NuxtLayout>
    <div class="space-y-6">
      <div v-if="pending" class="flex justify-center py-16">
        <div class="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900"></div>
      </div>

      <div v-else-if="error" class="rounded-xl border border-red-200 bg-red-50 p-4">
        <p class="text-sm text-red-700">{{ error.message }}</p>
      </div>

      <div v-else-if="customerData" class="space-y-6">
        <button @click="goBack" class="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
          <ArrowLeftIcon class="h-4 w-4" />
          Back to Customers
        </button>

        <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 class="text-xl font-semibold tracking-tight text-gray-900">
              {{ isEditMode ? 'Edit Customer' : 'View Customer' }}
            </h1>
          </div>
          <div class="flex gap-2">
            <button 
              v-if="!isEditMode"
              @click="isEditMode = true" 
              class="inline-flex items-center gap-2 rounded-md border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <PencilSquareIcon class="h-4 w-4" />
              Edit
            </button>
            <button 
              @click="handleDelete" 
              class="inline-flex items-center gap-2 rounded-md border border-red-200 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50"
            >
              <TrashIcon class="h-4 w-4" />
              Delete
            </button>
          </div>
        </div>

        <!-- View Mode -->
        <div v-if="!isEditMode" class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div class="space-y-4">
            <div>
              <p class="text-xs font-medium uppercase tracking-wider text-gray-500">ID</p>
              <p class="mt-1 text-sm text-gray-900">{{ customerData.id }}</p>
            </div>
            <div>
              <p class="text-xs font-medium uppercase tracking-wider text-gray-500">Name</p>
              <p class="mt-1 text-base font-medium text-gray-900">{{ customerData.name }}</p>
            </div>
            <div>
              <p class="text-xs font-medium uppercase tracking-wider text-gray-500">Email</p>
              <p class="mt-1 text-sm text-gray-900">{{ customerData.email }}</p>
            </div>
            <div v-if="customerData.created_at">
              <p class="text-xs font-medium uppercase tracking-wider text-gray-500">Created At</p>
              <p class="mt-1 text-sm text-gray-900">{{ new Date(customerData.created_at).toLocaleString() }}</p>
            </div>
          </div>
        </div>

        <!-- Edit Mode -->
        <div v-else class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <form @submit.prevent="submitUpdate">
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700">Name</label>
              <input 
                v-model="editForm.name" 
                type="text" 
                required 
                class="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-gray-500 focus:ring-gray-500" 
              />
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700">Email</label>
              <input 
                v-model="editForm.email" 
                type="email" 
                required 
                class="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-gray-500 focus:ring-gray-500" 
              />
            </div>
            <div class="flex justify-end gap-3">
              <button
                type="button"
                @click="cancelEdit"
                class="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                :disabled="isSubmitting"
                class="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
              >
                {{ isSubmitting ? 'Saving...' : 'Save Changes' }}
              </button>
            </div>
          </form>
        </div>

        <FeedbackModal 
          :open="showFeedback" 
          :message="feedbackMessage" 
          :type="feedbackType"
          @close="handleFeedbackClose" 
        />
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {
  PencilSquareIcon,
  TrashIcon,
  ArrowLeftIcon,
} from '@heroicons/vue/24/outline';
import { customerService } from '~/api/customer/CustomerService';

const route = useRoute();
const router = useRouter();
const uuid = computed(() => String(route.params.uuid ?? ''));

const customerData = ref(null);
const pending = ref(true);
const error = ref(null);

// Check if coming from edit button
const isEditMode = ref(route.query.mode === 'edit');
const isSubmitting = ref(false);

const showFeedback = ref(false);
const feedbackMessage = ref('');
const feedbackType = ref('info');

const editForm = reactive({
  name: '',
  email: ''
});

onMounted(async () => {
  pending.value = true;
  error.value = null;

  try {
    const response = await customerService.show(uuid.value);
    customerData.value = response.data;
    // Initialize edit form with existing data
    editForm.name = response.data.name || '';
    editForm.email = response.data.email || '';

  } catch (err: any) {
    error.value = err;
  } finally {
    pending.value = false;
  }
});

const cancelEdit = () => {
  // Reset form to original data
  if (customerData.value) {
    editForm.name = customerData.value.name || '';
    editForm.email = customerData.value.email || '';
  }
  isEditMode.value = false;
};

const submitUpdate = async () => {
  isSubmitting.value = true;
  try {
    await customerService.update(uuid.value, {
      name: editForm.name,
      email: editForm.email
    });
    // Refresh data
    const response = await customerService.show(uuid.value);
    customerData.value = response.data;
    isEditMode.value = false;
    feedbackMessage.value = 'Customer updated successfully!';
    feedbackType.value = 'success';
    showFeedback.value = true;
  } catch (err: any) {
    feedbackMessage.value = err.message || 'Failed to update customer';
    feedbackType.value = 'error';
    showFeedback.value = true;
  } finally {
    isSubmitting.value = false;
  }
};

const handleDelete = async () => {
  if (confirm(`Are you sure you want to delete "${customerData.value?.name}"?`)) {
    try {
      await customerService.delete(uuid.value);
      feedbackMessage.value = 'Customer deleted successfully!';
      feedbackType.value = 'success';
      showFeedback.value = true;
      setTimeout(() => router.push('/customer'), 1500);
    } catch (err: any) {
      feedbackMessage.value = err.message || 'Failed to delete customer';
      feedbackType.value = 'error';
      showFeedback.value = true;
    }
  }
};

const handleFeedbackClose = () => {
  showFeedback.value = false;
  // If deleted successfully and modal is closed, already redirected
};

const goBack = () => {
  router.push('/customer');
};
</script>