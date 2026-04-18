<template>
  <teleport to="body">
    <transition name="fade">
      <div
        v-if="open"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
      >
        <div
          class="absolute inset-0 bg-black/30 backdrop-blur-sm"
          @click="handleCancel"
        />

        <div
          class="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
        >
          <div class="flex items-start justify-between gap-4">
            <div>
              <h2 class="text-lg font-semibold text-gray-900">
                {{ customer ? 'Edit Customer' : 'Create Customer' }}
              </h2>
              <p class="mt-1 text-sm text-gray-600">
                Fill in the details below to save the customer record.
              </p>
            </div>

            <button
              type="button"
              class="rounded-md p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
              @click="handleClose"
            >
              ✕
            </button>
          </div>

          <form @submit.prevent="handleSubmit" class="mt-6 space-y-4">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                v-model="form.name"
                type="text"
                id="name"
                required
                placeholder="John Doe"
                class="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                v-model="form.email"
                type="email"
                id="email"
                required
                placeholder="john@example.com"
                class="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div class="mt-6 flex justify-end gap-3">
              <button
                type="button"
                class="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                @click="handleClose"
              >
                Cancel
              </button>
              <button
                type="submit"
                :disabled="loading"
                class="inline-flex items-center justify-center rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800 disabled:opacity-50"
              >
                {{ loading ? 'Saving...' : 'Save Customer' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </transition>
  </teleport>

</template>
<script setup lang="ts">
import { reactive, watch } from 'vue';

const props = defineProps<{
  open: boolean;
  loading?: boolean;
  customer?: { name: string; email: string } | null; 
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'submit', data: { name: string; email: string }): void;
}>();

const form = reactive({
  name: '',
  email: ''
});

// Watch for modal opening and customer data changes
watch(
  () => [props.open, props.customer], 
  ([isOpen, newCustomer]) => {
    if (isOpen) {
      if (newCustomer) {
        // Mode: Edit - fill with existing data
        form.name = (newCustomer as any).name || '';
        form.email = (newCustomer as any).email || '';
      } else {
        // Mode: Create - clear the form
        form.name = '';
        form.email = '';
      }
    }
  }, 
  { immediate: true }
);

// Function to handle closing (used by X and Cancel buttons)
const handleClose = () => {
  emit('close');
};

const handleSubmit = () => {
  emit('submit', { ...form });
};
</script>