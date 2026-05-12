<template>
  <div class="min-h-full bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow-sm border-b border-gray-200">
      <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold tracking-tight text-gray-900">Customers</h1>
          <p class="mt-0.5 text-sm text-gray-500">Manage your customer directory</p>
        </div>
        <button
          @click="openCreateModal"
          class="flex items-center gap-2 rounded-md bg-[#543923] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#402911] focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-[#543923] transition-colors"
        >
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add Customer
        </button>
      </div>
    </div>

    <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">

      <!-- Global Alert -->
      <transition name="fade">
        <div v-if="alert.message" :class="[
          'mb-6 rounded-md p-4 flex items-start gap-3',
          alert.type === 'success' ? 'bg-green-50' : 'bg-red-50'
        ]">
          <svg v-if="alert.type === 'success'" class="h-5 w-5 text-green-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          <svg v-else class="h-5 w-5 text-red-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
          </svg>
          <p :class="['text-sm font-medium', alert.type === 'success' ? 'text-green-800' : 'text-red-800']">
            {{ alert.message }}
          </p>
        </div>
      </transition>

      <!-- Loading State -->
      <div v-if="isLoadingList" class="flex items-center justify-center py-24">
        <div class="flex flex-col items-center gap-3">
          <svg class="h-8 w-8 animate-spin text-[#543923]" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
          <p class="text-sm text-gray-500">Loading customers...</p>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else-if="!isLoadingList && customers.length === 0" class="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-white py-20">
        <svg class="h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
        </svg>
        <p class="mt-4 text-base font-semibold text-gray-900">No customers yet</p>
        <p class="mt-1 text-sm text-gray-500">Get started by adding your first customer.</p>
        <button
          @click="openCreateModal"
          class="mt-6 rounded-md bg-[#543923] px-4 py-2 text-sm font-semibold text-white hover:bg-[#402911] transition-colors"
        >
          Add Customer
        </button>
      </div>

      <!-- Customers Table -->
      <div v-else class="overflow-hidden rounded-lg bg-white shadow ring-1 ring-black/5">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="py-3.5 pl-6 pr-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                #
              </th>
              <th class="px-3 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                Name
              </th>
              <th class="px-3 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                Email
              </th>
              <th class="py-3.5 pl-3 pr-6 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 bg-white">
            <tr
              v-for="(customer, index) in customers"
              :key="customer.uuid"
              class="hover:bg-gray-50 transition-colors"
            >
              <td class="whitespace-nowrap py-4 pl-6 pr-3 text-sm text-gray-400">
                {{ index + 1 }}
              </td>
              <td class="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900">
                {{ customer.name }}
              </td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-700">
                <span class="inline-flex items-center gap-1.5">
                  <svg class="h-3.5 w-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                  {{ customer.email }}
                </span>
              </td>
              <td class="whitespace-nowrap py-4 pl-3 pr-6 text-right text-sm">
                <div class="flex items-center justify-end gap-2">
                  <button
                    @click="openEditModal(customer)"
                    class="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium text-[#543923] ring-1 ring-inset ring-[#543923]/30 hover:bg-[#543923]/5 transition-colors"
                  >
                    <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125" />
                    </svg>
                    Edit
                  </button>
                  <button
                    @click="confirmDelete(customer)"
                    class="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium text-red-600 ring-1 ring-inset ring-red-300 hover:bg-red-50 transition-colors"
                  >
                    <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Create / Edit Modal -->
    <transition name="modal">
      <div v-if="modal.open" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" @click="closeModal" />

        <!-- Panel -->
        <div class="relative z-10 w-full max-w-md rounded-xl bg-white shadow-2xl ring-1 ring-black/10">
          <div class="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
            <h3 class="text-base font-semibold text-gray-900">
              {{ modal.mode === 'create' ? 'Add New Customer' : 'Edit Customer' }}
            </h3>
            <button @click="closeModal" class="rounded-md p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form class="px-6 py-6 space-y-5" @submit.prevent="handleSubmit">
            <!-- Form Error -->
            <div v-if="modal.error" class="rounded-md bg-red-50 p-3">
              <p class="text-sm font-medium text-red-800">{{ modal.error }}</p>
            </div>

            <!-- Name Field -->
            <div>
              <label for="customer-name" class="block text-sm font-medium text-gray-900">
                Full Name
              </label>
              <div class="mt-2">
                <input
                  v-model="modal.form.name"
                  type="text"
                  id="customer-name"
                  placeholder="e.g. Juan dela Cruz"
                  required
                  class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#543923] sm:text-sm/6"
                />
              </div>
            </div>

            <!-- Email Field -->
            <div>
              <label for="customer-email" class="block text-sm font-medium text-gray-900">
                Email Address
              </label>
              <div class="mt-2">
                <input
                  v-model="modal.form.email"
                  type="email"
                  id="customer-email"
                  placeholder="e.g. juan@example.com"
                  required
                  class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#543923] sm:text-sm/6"
                />
              </div>
            </div>

            <!-- Actions -->
            <div class="flex gap-3 pt-1">
              <button
                type="button"
                @click="closeModal"
                class="flex-1 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                :disabled="modal.isLoading"
                class="flex-1 flex justify-center items-center gap-2 rounded-md bg-[#543923] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#402911] focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-[#543923] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <svg v-if="modal.isLoading" class="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                <span>{{ modal.isLoading ? 'Saving...' : (modal.mode === 'create' ? 'Create Customer' : 'Save Changes') }}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </transition>

    <!-- Delete Confirm Modal -->
    <transition name="modal">
      <div v-if="deleteModal.open" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" @click="deleteModal.open = false" />
        <div class="relative z-10 w-full max-w-sm rounded-xl bg-white shadow-2xl ring-1 ring-black/10 p-6">
          <div class="flex items-start gap-4">
            <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100">
              <svg class="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
              </svg>
            </div>
            <div>
              <h3 class="text-base font-semibold text-gray-900">Delete Customer</h3>
              <p class="mt-1 text-sm text-gray-500">
                Are you sure you want to delete <span class="font-semibold text-gray-800">{{ deleteModal.customer?.name }}</span>? This action cannot be undone.
              </p>
            </div>
          </div>
          <div class="mt-6 flex gap-3">
            <button
              @click="deleteModal.open = false"
              class="flex-1 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              @click="handleDelete"
              :disabled="deleteModal.isLoading"
              class="flex-1 flex justify-center items-center gap-2 rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <svg v-if="deleteModal.isLoading" class="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              <span>{{ deleteModal.isLoading ? 'Deleting...' : 'Delete' }}</span>
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { customerService } from "~/api/customer/CustomerService";

// ── Types ─────────────────────────────────────────────────────────────────────
interface Customer {
  uuid: string;
  name: string;
  email: string;
}

// ── State ─────────────────────────────────────────────────────────────────────
const customers     = ref<Customer[]>([]);
const isLoadingList = ref(false);

const alert = reactive({ message: "", type: "success" as "success" | "error" });

const modal = reactive({
  open:      false,
  mode:      "create" as "create" | "edit",
  isLoading: false,
  error:     "",
  editUuid:  null as string | null,
  form:      { name: "", email: "" },
});

const deleteModal = reactive({
  open:      false,
  isLoading: false,
  customer:  null as Customer | null,
});

// ── Helpers ───────────────────────────────────────────────────────────────────
const showAlert = (message: string, type: "success" | "error" = "success") => {
  alert.message = message;
  alert.type    = type;
  setTimeout(() => (alert.message = ""), 4000);
};

const unwrapList = (res: any): Customer[] => {
  if (Array.isArray(res))             return res;
  if (Array.isArray(res?.data))       return res.data;
  if (Array.isArray(res?.data?.data)) return res.data.data;
  return [];
};

// ── CRUD ──────────────────────────────────────────────────────────────────────
const fetchCustomers = async () => {
  isLoadingList.value = true;
  try {
    const res = await customerService.list();
    customers.value = unwrapList(res);
  } catch {
    showAlert("Failed to load customers.", "error");
  } finally {
    isLoadingList.value = false;
  }
};

const openCreateModal = () => {
  modal.mode     = "create";
  modal.editUuid = null;
  modal.form     = { name: "", email: "" };
  modal.error    = "";
  modal.open     = true;
};

const openEditModal = (customer: Customer) => {
  modal.mode     = "edit";
  modal.editUuid = customer.uuid;
  modal.form     = { name: customer.name, email: customer.email };
  modal.error    = "";
  modal.open     = true;
};

const closeModal = () => {
  modal.open = false;
};

const handleSubmit = async () => {
  modal.error     = "";
  modal.isLoading = true;
  const payload   = { name: modal.form.name, email: modal.form.email };

  try {
    if (modal.mode === "create") {
      await customerService.create(payload);
      showAlert("Customer created successfully.");
    } else {
      await customerService.update(String(modal.editUuid!), payload);
      showAlert("Customer updated successfully.");
    }
    closeModal();
    await fetchCustomers();
  } catch (err: any) {
    modal.error = err?.message || "Something went wrong. Please try again.";
  } finally {
    modal.isLoading = false;
  }
};

const confirmDelete = (customer: Customer) => {
  deleteModal.customer = customer;
  deleteModal.open     = true;
};

const handleDelete = async () => {
  if (!deleteModal.customer) return;
  deleteModal.isLoading = true;
  try {
    await customerService.delete(String(deleteModal.customer.uuid));
    showAlert("Customer deleted successfully.");
    deleteModal.open = false;
    await fetchCustomers();
  } catch {
    showAlert("Failed to delete customer.", "error");
    deleteModal.open = false;
  } finally {
    deleteModal.isLoading = false;
  }
};

onMounted(fetchCustomers);
</script>

<style scoped>
/* Modal transition */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

/* Alert fade */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>