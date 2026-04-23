<template>
  <NuxtLayout>
    <div class="space-y-6">
      <div>
        <h1 class="text-xl font-semibold tracking-tight text-gray-900">Edit Customer</h1>
        <p class="mt-1 text-sm text-gray-500">Update customer details and save your changes.</p>
      </div>

      <form @submit.prevent="handleSubmit" class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div v-if="pending" class="text-sm text-gray-500">Loading customer…</div>

        <div v-else class="grid gap-6">
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

          <div class="flex items-center justify-between gap-4">
            <button
              type="button"
              class="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              @click="router.push('/customer')"
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
        </div>
      </form>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { customerService } from '~/api/customer/CustomerService';

const route = useRoute();
const router = useRouter();
const uuid = computed(() => String(route.params.uuid ?? ''));

const name = ref('');
const email = ref('');
const pending = ref(true);
const saving = ref(false);
const error = ref<any>(null);

const loadCustomer = async () => {
  pending.value = true;
  error.value = null;

  try {
    const response: any = await customerService.show(uuid.value);
    const customer = response?.data ?? response;
    name.value = customer.name;
    email.value = customer.email;
  } catch (err: any) {
    error.value = err;
  } finally {
    pending.value = false;
  }
};

onMounted(loadCustomer);

const handleSubmit = async () => {
  error.value = null;
  saving.value = true;

  try {
    await customerService.update(uuid.value, {
      name: name.value,
      email: email.value,
    });
    router.push('/customer');
  } catch (err: any) {
    error.value = err;
  } finally {
    saving.value = false;
  }
};
</script>
