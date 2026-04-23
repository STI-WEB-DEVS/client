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
          @click="$emit('close')"
        />

        <div class="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
          <div class="flex items-start justify-between gap-4">
            <h2 class="text-lg font-semibold text-gray-900">Edit Customer</h2>
            <button
              type="button"
              class="rounded-md p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
              @click="$emit('close')"
            >
              ✕
            </button>
          </div>

          <form @submit.prevent="handleSubmit" class="mt-6 space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Name</label>
              <input
                v-model="name"
                type="text"
                class="mt-2 w-full rounded-xl border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 shadow-sm focus:border-gray-900 focus:outline-none"
                placeholder="Customer name"
                required
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Email</label>
              <input
                v-model="email"
                type="email"
                class="mt-2 w-full rounded-xl border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 shadow-sm focus:border-gray-900 focus:outline-none"
                placeholder="customer@example.com"
                required
              />
            </div>


            <div v-if="error" class="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {{ error.message ?? error }}
            </div>

            <div class="flex items-center justify-end gap-4">
              <button
                type="button"
                class="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                @click="$emit('close')"
              >
                Cancel
              </button>
              <button
                type="submit"
                :disabled="saving"
                class="inline-flex items-center justify-center rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400"
              >
                {{ saving ? 'Saving...' : 'Save Changes' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { customerService } from '~/api/customer/CustomerService';

const props = defineProps<{
  open: boolean;
  customer: any;
}>();

const emit = defineEmits<{
  close: [];
  updated: [];
}>();

const name = ref('');
const email = ref('');
const saving = ref(false);
const error = ref<any>(null);

watch(() => props.customer, (newCustomer) => {
  if (newCustomer) {
    name.value = newCustomer.name || '';
    email.value = newCustomer.email || '';
  }
}, { immediate: true });

const handleSubmit = async () => {
  error.value = null;
  saving.value = true;

  try {
    await customerService.update(props.customer.uuid, {
      name: name.value,
      email: email.value,
    });
    emit('updated');
    emit('close');
  } catch (err: any) {
    error.value = err;
  } finally {
    saving.value = false;
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>