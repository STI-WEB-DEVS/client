<template>
  <NuxtLayout>
    <div class="mx-auto max-w-2xl space-y-6">
      <div class="flex items-center gap-4">
        <button
          @click="router.back()"
          class="rounded-lg border border-gray-200 p-2 transition hover:bg-gray-50"
        >
          <ArrowLeftIcon class="h-5 w-5 text-gray-500" />
        </button>
        <div>
          <h1 class="text-xl font-semibold tracking-tight text-gray-900">
            {{ isCreate ? 'Create Customer' : 'Customer Details' }}
          </h1>
          <p class="mt-1 text-sm text-gray-500">
            {{ isCreate ? 'Fill in the information below to add a new customer.' : `Managing customer: ${uuid}` }}
          </p>
        </div>
      </div>

      <div v-if="loading && !isCreate" class="flex justify-center py-16">
        <div class="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900"></div>
      </div>

      <EntityForm
        v-else
        entityName="Customer"
        :fields="fields"
        :service="customerService"
        :initialData="customer"
        :isEdit="!isCreate"
        :uuid="uuid"
        @success="handleSuccess"
      />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ArrowLeftIcon } from '@heroicons/vue/24/outline';
import { customerService } from '~/api/customer/CustomerService';
import EntityForm from '~/components/EntityForm.vue';

const route = useRoute();
const router = useRouter();

// UUID extraction pattern as per instruction 7
const uuid = computed(() => String(route.params.uuid ?? ''));
const isCreate = computed(() => uuid.value === 'create');

const customer = ref<any>(null);
const loading = ref(false);

const fields = [
  { name: 'name', label: 'Full Name', placeholder: 'e.g. John Doe', required: true },
  { name: 'email', label: 'Email Address', type: 'email', placeholder: 'john@example.com', required: true },
];

onMounted(async () => {
  if (!isCreate.value) {
    loading.value = true;
    try {
      const response = await customerService.show(uuid.value);
      customer.value = response.data || response;
    } catch (err) {
      console.error('Failed to fetch customer', err);
    } finally {
      loading.value = false;
    }
  }
});

const handleSuccess = () => {
  if (isCreate.value) {
    router.push('/customer');
  }
};
</script>