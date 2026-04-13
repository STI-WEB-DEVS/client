<template>
  <NuxtLayout>
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-base font-semibold text-gray-900">Customers</h1>
        <p class="mt-2 text-sm text-gray-700">A list of all customers retrieved from your Laravel backend.</p>
      </div>
    </div>

    <div v-if="pending" class="mt-8 flex justify-center">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
    </div>

    <div v-else-if="error" class="mt-8 rounded-md bg-red-50 p-4">
      <div class="flex">
        <div class="ml-3">
          <h3 class="text-sm font-medium text-red-800">Error loading customers</h3>
          <div class="mt-2 text-sm text-red-700">
            {{ error.message }}
          </div>
        </div>
      </div>
    </div>

    <div v-else class="mt-8 flow-root">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-300">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Name</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Email</th>
                 
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-for="customer in customers" :key="customer.id">
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                    {{ customer.name }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ customer.email }}
                  </td>
                </tr>
                <tr v-if="customers?.length === 0">
                  <td colspan="4" class="py-10 text-center text-sm text-gray-500">
                    No customers found.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { CustomerService } from '~/api/Customer/CustomerService';

const customerService = new CustomerService();

// useAsyncData is great here because it works with Nuxt's SSR
// The 'customers' key helps with caching
const { data: customers, pending, error } = await useAsyncData('customers', () => 
    customerService.getCustomers()
);
</script>