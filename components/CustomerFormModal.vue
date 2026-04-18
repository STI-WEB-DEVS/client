<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div class="absolute inset-0 bg-gray-900/50 backdrop-blur-sm" @click="$emit('close')"></div>

    <div class="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
      <div class="flex items-center justify-between border-b border-gray-100 pb-4">
        <h3 class="text-lg font-semibold text-gray-900">
          {{ customer ? 'Edit Customer' : 'Create New Customer' }}
        </h3>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-500">
          <span class="sr-only">Close</span>
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="mt-6 space-y-5">
        <div>
          <label class="block text-sm font-medium text-gray-700">Full Name</label>
          <input 
            v-model="form.name" 
            type="text" 
            required 
            placeholder="John Doe"
            class="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 text-sm"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Email Address</label>
          <input 
            v-model="form.email" 
            type="email" 
            required 
            placeholder="john@example.com"
            class="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 text-sm"
          />
        </div>

        <div class="mt-8 flex justify-end gap-3">
          <button 
            type="button" 
            @click="$emit('close')"
            class="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            :disabled="loading"
            class="inline-flex items-center justify-center rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
          >
            <span v-if="loading" class="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white"></span>
            {{ customer ? 'Update Customer' : 'Create Customer' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch, ref } from 'vue';
import { customerService } from '~/api/customer/CustomerService';

const props = defineProps<{
  isOpen: boolean;
  customer: any | null; // null means create mode, object means edit mode
}>();

const emit = defineEmits(['close', 'success']);
const loading = ref(false);

const form = reactive({
  name: '',
  email: ''
});

// Sync form data when the customer prop changes or modal opens
watch(() => props.isOpen, (val) => {
  if (val) {
    form.name = props.customer?.name || '';
    form.email = props.customer?.email || '';
  }
});

const handleSubmit = async () => {
  loading.value = true;
  try {
    if (props.customer) {
      // Logic for Update
      await customerService.update(props.customer.uuid, { ...form });
    } else {
      // Logic for Create
      await customerService.create({ ...form });
    }
    emit('success'); // Refresh parent list
    emit('close');
  } catch (error: any) {
    alert(error.message || 'Failed to save customer');
  } finally {
    loading.value = false;
  }
};
</script>