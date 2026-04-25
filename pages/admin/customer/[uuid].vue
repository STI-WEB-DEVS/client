<template>
  <NuxtLayout>
    <div class="space-y-6">
      <div>
        <h1 class="text-xl font-semibold tracking-tight text-gray-900">
          View Customer
        </h1>
        <p class="mt-1 text-sm text-gray-500">
          Dedicated customer page using the UUID from the route.
        </p>
      </div>

      <div v-if="pending" class="flex justify-center py-16">
        <div class="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900"></div>
      </div>

      <div v-else-if="error" class="rounded-xl border border-red-200 bg-red-50 p-4">
        <p class="text-sm text-red-700">{{ error.message }}</p>
      </div>

      <div v-else class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <p class="text-sm text-gray-500">Customer UUID</p>
        <p class="mt-2 break-all text-base font-medium text-gray-900">
          {{ uuid }}
        </p>

        <div class="mt-6 grid gap-4 sm:grid-cols-2">
          <div>
            <p class="text-sm text-gray-500">Name</p>
            <p class="mt-1 text-gray-900">{{ customer?.name ?? '-' }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-500">Email</p>
            <p class="mt-1 text-gray-900">{{ customer?.email ?? '-' }}</p>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { customerService } from '~/api/customer/CustomerService';

const route = useRoute();

const uuid = computed(() => String(route.params.uuid ?? ''));

const customer = ref<any>(null);
const pending = ref(true);
const error = ref<any>(null);

onMounted(async () => {
  pending.value = true;
  error.value = null;

  try {
    customer.value = await customerService.show(uuid.value);
    customer.value = customer.value?.data ?? customer.value;
  } catch (err: any) {
    error.value = err;
  } finally {
    pending.value = false;
  }
});
</script>
