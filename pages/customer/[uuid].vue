<template>
  <NuxtLayout>
    <div class="space-y-6">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 class="text-xl font-semibold tracking-tight text-gray-900">View Customer</h1>
          <p class="mt-1 text-sm text-gray-500">Customer details loaded from the API.</p>
        </div>

        <button
          type="button"
          class="inline-flex items-center justify-center rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
          @click="handleEdit"
        >
          Edit Customer
        </button>
      </div>

      <div v-if="pending" class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div class="text-sm text-gray-500">Loading customer...</div>
      </div>

      <div v-else-if="error" class="rounded-xl border border-red-200 bg-red-50 p-4">
        <p class="text-sm text-red-700">{{ error.message ?? error }}</p>
      </div>

      <div v-else class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <p class="text-sm text-gray-500">Customer UUID</p>
        <p class="mt-2 break-all text-base font-medium text-gray-900">{{ customer.uuid }}</p>

        <div class="mt-6 grid gap-4 sm:grid-cols-2">
          <div>
            <p class="text-sm text-gray-500">Name</p>
            <p class="mt-2 text-base font-medium text-gray-900">{{ customer.name }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-500">Email</p>
            <p class="mt-2 text-base font-medium text-gray-900">{{ customer.email }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-500">Phone</p>
            <p class="mt-2 text-base font-medium text-gray-900">{{ customer.phone || 'N/A' }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-500">Address</p>
            <p class="mt-2 text-base font-medium text-gray-900">{{ customer.address || 'N/A' }}</p>
          </div>
        </div>
      </div>
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
const customer = ref<any>(null);
const pending = ref(true);
const error = ref<any>(null);

const loadCustomer = async () => {
  pending.value = true;
  error.value = null;

  try {
    customer.value = await customerService.show(uuid.value);
  } catch (err: any) {
    error.value = err;
  } finally {
    pending.value = false;
  }
};

onMounted(loadCustomer);

const handleEdit = () => {
  router.push(`/customer/${uuid.value}/edit`);
};
</script>