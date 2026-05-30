<template>
  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
    <div class="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
      <h2 class="text-sm font-semibold text-gray-900 mb-6">
        {{ editingCustomer ? 'Edit Customer' : 'Add Customer' }}
      </h2>
      <form class="space-y-6" method="POST" @submit.prevent="handleSubmit">
        <div>
          <label for="name" class="block text-sm/6 font-medium text-gray-900">Customer Name</label>
          <div class="mt-2">
            <input type="text" id="name" v-model="name"
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
          </div>
        </div>

        <div>
          <label for="email" class="block text-sm/6 font-medium text-gray-900">Email</label>
          <div class="mt-2">
            <input type="email" id="email" v-model="email"
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
          </div>
        </div>

        <div class="flex gap-3">
          <button type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            {{ editingCustomer ? 'Update Customer' : 'Add Customer' }}
          </button>
          <button v-if="editingCustomer" type="button" @click="cancelEdit"
            class="flex w-full justify-center rounded-md bg-gray-100 px-3 py-1.5 text-sm/6 font-semibold text-gray-700 shadow-sm hover:bg-gray-200">
            Cancel
          </button>
        </div>
      </form>
    </div>

    <!-- Error Message -->
    <div v-if="error" class="mt-4 px-4 py-3 bg-red-50 border border-red-200 rounded-md">
      <p class="text-sm text-red-600">{{ error }}</p>
    </div>

    <!-- Customer List -->
    <div class="mt-8 bg-white shadow sm:rounded-lg">
      <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <h2 class="text-sm font-semibold text-gray-900">Customers</h2>
        <span class="text-xs text-gray-500">{{ customers.length }} item(s)</span>
      </div>

      <!-- Loading -->
      <div v-if="isLoadingList" class="px-6 py-8 text-center text-sm text-gray-500">
        Loading customers...
      </div>

      <!-- Empty -->
      <div v-else-if="customers.length === 0" class="px-6 py-8 text-center text-sm text-gray-500">
        No customers found.
      </div>

      <!-- List -->
      <ul v-else class="divide-y divide-gray-200">
        <li v-for="customer in customers" :key="customer.uuid"
          class="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition">
          <div>
            <p class="text-sm font-medium text-gray-900">{{ customer.name }}</p>
            <p class="text-xs text-gray-500 mt-0.5">{{ customer.email }}</p>
          </div>
          <div class="flex items-center gap-3">
            <button @click="openModal(customer)"
              class="text-xs text-gray-500 hover:text-gray-700 font-medium">
              View
            </button>
            <!-- Edit Button -->
            <button @click="startEdit(customer)"
              class="text-xs text-indigo-600 hover:text-indigo-800 font-medium">
              Edit
            </button>
            <!-- Delete Button -->
            <button @click="handleDelete(customer.uuid)"
              :disabled="deletingUuid === customer.uuid"
              class="text-xs text-red-500 hover:text-red-700 font-medium disabled:opacity-50">
              {{ deletingUuid === customer.uuid ? 'Deleting...' : 'Delete' }}
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>

  <Teleport to="body">
    <Transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="viewingCustomer" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-gray-900/60" @click="closeModal" />

        <!-- Panel -->
        <Transition
          enter-active-class="transition ease-out duration-200"
          enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="transition ease-in duration-150"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95"
        >
          <div v-if="viewingCustomer" class="relative w-full max-w-sm bg-white rounded-xl shadow-xl px-6 py-6">
            <!-- Header -->
            <div class="flex items-center justify-between mb-5">
              <h3 class="text-sm font-semibold text-gray-900">Customer Details</h3>
              <button @click="closeModal" class="text-gray-400 hover:text-gray-600 transition">
                <svg xmlns="http://www.w3.org/2000/svg" class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M18 6 6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>

            <!-- Details -->
            <dl class="space-y-4">
              <div class="flex flex-col gap-0.5">
                <dt class="text-xs font-medium text-gray-500">Customer Name</dt>
                <dd class="text-sm text-gray-900">{{ viewingCustomer.name }}</dd>
              </div>
              <div class="flex flex-col gap-0.5">
                <dt class="text-xs font-medium text-gray-500">Email</dt>
                <dd class="text-sm text-gray-900">{{ viewingCustomer.email }}</dd>
              </div>
              <div class="flex flex-col gap-0.5">
                <dt class="text-xs font-medium text-gray-500">UUID</dt>
                <dd class="text-xs text-gray-400 break-all font-mono">{{ viewingCustomer.uuid }}</dd>
              </div>
              <!-- Add more fields here as needed -->
            </dl>

            <!-- Footer -->
            <div class="mt-6 flex gap-3">
              <button @click="startEdit(viewingCustomer); closeModal()"
                class="flex-1 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500">
                Edit
              </button>
              <button @click="closeModal"
                class="flex-1 justify-center rounded-md bg-gray-100 px-3 py-1.5 text-sm/6 font-semibold text-gray-700 shadow-sm hover:bg-gray-200">
                Close
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
});

import { useCustomer } from "~/composables/customer/customer";

const { 
  name,
  email,
  error,
  customers,
  isLoadingList,
  viewingCustomer,
  editingCustomer,
  deletingUuid,
  fetchCustomers,
  handleSubmit,
  handleDelete,
  openModal,
  closeModal,
  startEdit,
  cancelEdit,
} = useCustomer();

onMounted(fetchCustomers);

</script>