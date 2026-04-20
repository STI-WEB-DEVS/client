<template>
  <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
    <div class="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
      <h2 class="text-lg font-semibold text-gray-900">
        {{ isEditMode ? 'Edit Customer' : 'Create New Customer' }}
      </h2>
      <p class="mb-6 text-sm text-gray-500">
        {{ isEditMode ? 'Update the details for this record.' : 'Enter the customer details below.' }}
      </p>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            v-model="form.name"
            type="text"
            required
            placeholder="John Doe"
            class="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Email Address</label>
          <input
            v-model="form.email"
            type="email"
            required
            placeholder="john@example.com"
            class="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
          />
        </div>

        <div class="mt-6 flex justify-end gap-3">
          <button
            type="button"
            @click="$emit('close')"
            class="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            :disabled="loading"
            class="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800 disabled:opacity-50"
          >
            <span v-if="loading">Saving...</span>
            <span v-else>{{ isEditMode ? 'Update Customer' : 'Save Customer' }}</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';

const props = defineProps<{
  open: boolean;
  loading: boolean;
  customer: any | null; 
}>();

const emit = defineEmits(['close', 'submit']);

const form = ref({
  name: '',
  email: ''
});

const isEditMode = computed(() => !!props.customer);

watch(() => props.customer, (newCustomer) => {
  if (newCustomer) {
    form.value = { 
      name: newCustomer.name, 
      email: newCustomer.email 
    };
  } else {
    form.value = { name: '', email: '' };
  }
}, { immediate: true });

const handleSubmit = () => {
  emit('submit', { ...form.value });
};
</script>