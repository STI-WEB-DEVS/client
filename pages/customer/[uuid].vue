<template>
  <NuxtLayout>
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-xl font-semibold tracking-tight text-gray-900">
            View Customer
          </h1>
          <p class="mt-1 text-sm text-gray-500">
            Dedicated customer page using the UUID from the route.
          </p>
        </div>
        <button 
          @click="$router.back()" 
          class="text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          ← Back
        </button>
      </div>

      <div v-if="pending" class="flex justify-center py-12">
        <div class="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900"></div>
      </div>

      <div v-else-if="error" class="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
        {{ error }}
      </div>

      <div v-else-if="customer" class="space-y-6">
        <div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <p class="text-sm text-gray-500">Customer UUID</p>
          <p class="mt-2 break-all text-base font-medium text-gray-900">
            {{ customer.uuid }}
          </p>
        </div>

        <div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <p class="text-sm text-gray-500">Customer Name</p>
          <p class="mt-2 text-base font-medium text-gray-900">
            {{ customer.name }}
          </p>
        </div>

        <div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <p class="text-sm text-gray-500">Customer Email</p>
          <p class="mt-2 text-base font-medium text-gray-900">
            {{ customer.email }}
          </p>
        </div>
      </div>
        <div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <p class="text-sm text-gray-500">Created at</p>
          <p class="mt-2 text-base font-medium text-gray-900">
            {{ customer.created_at }}
          </p>
        </div>
        <div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <p class="text-sm text-gray-500">Updated at</p>
          <p class="mt-2 text-base font-medium text-gray-900">
            {{ customer.updated_at }}
          </p>
        </div>
      
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { customerService } from '~/api/Customer/CustomerService';

const route = useRoute();
const uuid = String(route.params.uuid ?? '');

// State
const customer = ref<any>(null);
const pending = ref(true);
const error = ref<string | null>(null);

onMounted(async () => {
  if (!uuid) return;

  try {
    pending.value = true;
    const response = await customerService.show(uuid);
    
    // Assign response based on your API structure (usually response.data)
    customer.value = response.data || response;
  } catch (err: any) {
    console.error("Fetch error:", err);
    error.value = "Failed to load customer details.";
  } finally {
    pending.value = false;
  }
});
</script>