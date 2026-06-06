<template>
  <div class="min-h-screen bg-slate-50 p-6 md:p-10">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="flex items-start justify-between mb-10">
        <div>
          <h1 class="text-3xl font-bold text-slate-900 tracking-tight">Customers</h1>
          <p class="mt-1 text-sm text-slate-500">Manage your customer accounts.</p>
        </div>
        <button
          v-if="!showForm && !showView"
          @click="openCreateForm"
          type="button"
          class="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-blue-500 active:scale-95 transition-all duration-150"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add Customer
        </button>
      </div>

      <!-- Loading -->
      <div v-if="isLoading" class="flex flex-col items-center justify-center py-24 gap-3">
        <div class="w-8 h-8 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin"></div>
        <p class="text-sm text-slate-400">Loading customers...</p>
      </div>

      <!-- View -->
      <div v-else-if="showView" class="max-w-lg mx-auto">
        <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div class="bg-slate-700 px-6 py-4">
            <h2 class="text-base font-semibold text-white">View Customer</h2>
            <p class="text-xs text-slate-300 mt-0.5">Customer details (read-only).</p>
          </div>

          <div class="p-6 space-y-5">
            <!-- Full Name -->
            <div>
              <label class="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <div class="block w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900">
                {{ viewCustomer.name }}
              </div>
            </div>

            <!-- Email -->
            <div>
              <label class="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div class="block w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900">
                {{ viewCustomer.email }}
              </div>
            </div>

            <!-- Actions -->
            <div class="flex items-center justify-end gap-3 pt-2">
              <button
                @click="closeView"
                type="button"
                class="px-4 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all"
              >
                Close
              </button>
              <button
                @click="switchToEdit"
                type="button"
                class="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-500 active:scale-95 transition-all shadow-sm"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
                </svg>
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Form (Create / Edit) -->
      <div v-else-if="showForm" class="max-w-lg mx-auto">
        <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div class="bg-blue-600 px-6 py-4">
            <h2 class="text-base font-semibold text-white">
              {{ isEditing ? 'Edit Customer' : 'New Customer' }}
            </h2>
            <p class="text-xs text-blue-100 mt-0.5">
              {{ isEditing ? 'Update the customer details below.' : 'Fill in the details to add a new customer.' }}
            </p>
          </div>

          <form @submit.prevent="handleSubmit" class="p-6 space-y-5">
            <!-- Full Name -->
            <div>
              <label for="name" class="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                Full Name <span class="text-red-500">*</span>
              </label>
              <input
                v-model="form.name"
                type="text"
                id="name"
                required
                placeholder="e.g. Juan dela Cruz"
                class="block w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all"
              />
            </div>

            <!-- Email -->
            <div>
              <label for="email" class="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                Email Address <span class="text-red-500">*</span>
              </label>
              <input
                v-model="form.email"
                type="email"
                id="email"
                required
                placeholder="e.g. juan@email.com"
                class="block w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all"
              />
            </div>

            <!-- Actions -->
            <div class="flex items-center justify-end gap-3 pt-2">
              <button
                @click="cancelForm"
                type="button"
                class="px-4 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                :disabled="isLoading"
                class="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-500 active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
              >
                <svg v-if="isLoading" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
                {{ isEditing ? 'Update Customer' : 'Save Customer' }}
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Table -->
      <div v-else>
        <div v-if="customers.length === 0" class="flex flex-col items-center justify-center py-24 gap-3 text-center">
          <div class="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center mb-2">
            <svg class="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
            </svg>
          </div>
          <p class="text-sm font-semibold text-slate-700">No customers yet</p>
          <p class="text-xs text-slate-400">Click "Add Customer" to get started.</p>
        </div>

        <div v-else class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <table class="min-w-full divide-y divide-slate-100">
            <thead>
              <tr class="bg-slate-50">
                <th class="py-3.5 pl-6 pr-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Customer</th>
                <th class="px-3 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Email</th>
                <th class="py-3.5 pl-3 pr-6 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr
                v-for="customer in customers"
                :key="customer.uuid"
                class="group hover:bg-slate-50 transition-colors"
              >
                <td class="whitespace-nowrap py-4 pl-6 pr-3">
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <span class="text-blue-700 text-xs font-bold uppercase">{{ customer.name.charAt(0) }}</span>
                    </div>
                    <span class="text-sm font-medium text-slate-900">{{ customer.name }}</span>
                  </div>
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-slate-500">{{ customer.email }}</td>
                <td class="whitespace-nowrap py-4 pl-3 pr-6 text-right">
                  <div class="flex items-center justify-end gap-2">
                    <button
                      @click="openView(customer)"
                      class="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                    >
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.641 0-8.573-3.007-9.964-7.178z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      View
                    </button>
                    <button
                      @click="openEditForm(customer)"
                      class="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                    >
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
                      </svg>
                      Edit
                    </button>
                    <button
                      @click="handleDelete(customer.uuid!)"
                      class="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                    >
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <div class="px-6 py-3 border-t border-slate-100 bg-slate-50">
            <p class="text-xs text-slate-400">{{ customers.length }} customer{{ customers.length !== 1 ? 's' : '' }} total</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { customerService } from '~/api/customer/CustomerService';

interface Customer {
  uuid?: string;
  name: string;
  email: string;
}

const customers = ref<Customer[]>([]);
const isLoading = ref(true);
const showForm = ref(false);
const showView = ref(false);
const isEditing = ref(false);

const defaultForm = { name: '', email: '' };
const form = reactive<Customer>({ ...defaultForm });
const viewCustomer = ref<Customer>({ name: '', email: '' });

const fetchCustomers = async () => {
  isLoading.value = true;
  try {
    const response = await customerService.list();
    customers.value = response.data || response;
  } catch (error) {
    console.error('Failed to fetch customers:', error);
  } finally {
    isLoading.value = false;
  }
};

const handleSubmit = async () => {
  isLoading.value = true;
  try {
    if (isEditing.value && form.uuid) {
      await customerService.update(form.uuid, form);
    } else {
      await customerService.create(form);
    }
    await fetchCustomers();
    cancelForm();
  } catch (error) {
    console.error('Failed to save customer:', error);
  } finally {
    isLoading.value = false;
  }
};

const handleDelete = async (uuid: string) => {
  if (!confirm('Are you sure you want to delete this customer?')) return;

  isLoading.value = true;
  try {
    await customerService.delete(uuid);
    await fetchCustomers();
  } catch (error) {
    console.error('Failed to delete customer:', error);
  } finally {
    isLoading.value = false;
  }
};

const openCreateForm = () => {
  Object.assign(form, defaultForm);
  delete form.uuid;
  isEditing.value = false;
  showForm.value = true;
};

const openEditForm = (customer: Customer) => {
  Object.assign(form, customer);
  isEditing.value = true;
  showForm.value = true;
  showView.value = false;
};

const openView = (customer: Customer) => {
  viewCustomer.value = { ...customer };
  showView.value = true;
  showForm.value = false;
};

const closeView = () => {
  showView.value = false;
  viewCustomer.value = { name: '', email: '' };
};

const switchToEdit = () => {
  openEditForm(viewCustomer.value);
};

const cancelForm = () => {
  showForm.value = false;
  Object.assign(form, defaultForm);
  delete form.uuid;
  isEditing.value = false;
};

onMounted(() => {
  fetchCustomers();
});
</script>