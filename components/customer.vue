<template>
  <div class="min-h-screen bg-[#F7F6F3] px-4 py-12 font-serif">
    <div class="w-full max-w-2xl mx-auto">

      <!-- Header -->
      <div class="flex items-center justify-between mb-8">
        <div class="flex items-center gap-4">
          <div class="flex items-center justify-center border-2 w-11 h-11 border-stone-900">
            <span class="text-xl font-normal leading-none tracking-tight text-stone-900">C</span>
          </div>
          <div>
            <h1 class="text-lg font-normal tracking-tight text-stone-900">Customers</h1>
            <p class="font-sans text-sm text-stone-400">Manage your customer registry</p>
          </div>
        </div>
        <button
          @click="showCreateModal = true"
          class="px-5 py-2.5 bg-stone-900 text-[#F7F6F3] text-xs font-sans font-medium uppercase tracking-widest rounded-sm hover:bg-stone-700 transition-colors"
        >
          + Add customer
        </button>
      </div>

      <!-- Customer list panel -->
      <div class="bg-white border border-stone-200 rounded-sm">

        <!-- Search -->
        <div class="px-6 py-4 border-b border-stone-200 flex items-center gap-3">
          <svg class="w-3.5 h-3.5 text-stone-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search by name or email…"
            class="flex-1 text-sm font-sans text-stone-900 bg-transparent outline-none placeholder:text-stone-300"
          />
        </div>

        <!-- Loading -->
        <div v-if="isLoading" class="px-6 py-10 text-center font-sans text-sm text-stone-400">
          Loading…
        </div>

        <!-- Empty -->
        <div v-else-if="filteredCustomers.length === 0" class="px-6 py-10 text-center font-sans text-sm text-stone-400">
          No customers found.
        </div>

        <!-- List -->
        <table v-else class="w-full">
          <thead>
            <tr class="border-b border-stone-100">
              <th class="px-6 py-3 text-left text-[11px] font-sans font-medium text-stone-400 uppercase tracking-widest">Name</th>
              <th class="px-6 py-3 text-left text-[11px] font-sans font-medium text-stone-400 uppercase tracking-widest">Email</th>
              <th class="px-6 py-3 text-right text-[11px] font-sans font-medium text-stone-400 uppercase tracking-widest">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="customer in filteredCustomers"
              :key="customer.id"
              class="border-b border-stone-100 last:border-0 hover:bg-stone-50 transition-colors group"
            >
              <td class="px-6 py-3.5 font-sans text-sm text-stone-900">{{ customer.name }}</td>
              <td class="px-6 py-3.5 font-sans text-sm text-stone-400">{{ customer.email }}</td>
              <td class="px-6 py-3.5 text-right">
                <div class="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    @click="openEdit(customer)"
                    class="font-sans text-xs text-stone-400 border-b border-transparent hover:text-stone-900 hover:border-stone-400 transition-colors"
                  >Edit</button>
                  <span class="text-stone-200">|</span>
                  <button
                    @click="openDelete(customer)"
                    class="font-sans text-xs text-stone-400 border-b border-transparent hover:text-red-500 hover:border-red-300 transition-colors"
                  >Remove</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p class="mt-4 font-sans text-xs text-stone-300 text-center">
        {{ customers.length }} total {{ customers.length === 1 ? 'customer' : 'customers' }}
      </p>
    </div>


    <!-- ── Create Modal ── -->
    <Transition name="fade">
      <div
        v-if="showCreateModal"
        class="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/40 backdrop-blur-[2px] px-4"
        @click.self="showCreateModal = false"
      >
        <div class="w-full max-w-md px-10 py-10 bg-white border border-stone-200 rounded-sm shadow-xl">

          <div class="flex items-center justify-between mb-6">
            <div>
              <h2 class="text-lg font-normal tracking-tight text-stone-900">New customer</h2>
              <p class="font-sans text-sm text-stone-400 mt-0.5">Fill in the details below.</p>
            </div>
            <button @click="showCreateModal = false" class="font-sans text-sm text-stone-300 hover:text-stone-600 transition-colors">✕</button>
          </div>

          <div class="mb-6 border-t border-stone-200"></div>

          <form @submit.prevent="handleCreate" class="space-y-5">
            <div>
              <label class="block text-[11px] font-sans font-medium text-stone-400 uppercase tracking-widest mb-1.5">
                Full Name <span class="text-stone-900">*</span>
              </label>
              <input
                v-model="createForm.name"
                type="text"
                placeholder="Jane Doe"
                required
                class="w-full px-3 py-2.5 text-sm font-sans text-stone-900 bg-stone-50 border border-stone-300 rounded-sm outline-none focus:border-stone-900 focus:bg-white transition-colors placeholder:text-stone-300"
              />
            </div>

            <div>
              <label class="block text-[11px] font-sans font-medium text-stone-400 uppercase tracking-widest mb-1.5">
                Email <span class="text-stone-900">*</span>
              </label>
              <input
                v-model="createForm.email"
                type="email"
                placeholder="jane@example.com"
                required
                class="w-full px-3 py-2.5 text-sm font-sans text-stone-900 bg-stone-50 border border-stone-300 rounded-sm outline-none focus:border-stone-900 focus:bg-white transition-colors placeholder:text-stone-300"
              />
            </div>

            <p v-if="createError" class="font-sans text-xs text-red-400">{{ createError }}</p>

            <div class="flex items-center gap-3 pt-1">
              <button
                type="button"
                @click="showCreateModal = false"
                class="flex-1 py-2.5 border border-stone-200 text-xs font-sans font-medium text-stone-400 uppercase tracking-widest rounded-sm hover:border-stone-400 hover:text-stone-700 transition-colors"
              >Cancel</button>
              <button
                type="submit"
                :disabled="isSubmitting"
                class="flex-1 py-2.5 bg-stone-900 text-[#F7F6F3] text-xs font-sans font-medium uppercase tracking-widest rounded-sm hover:bg-stone-700 transition-colors disabled:opacity-50"
              >{{ isSubmitting ? 'Saving…' : 'Create customer' }}</button>
            </div>
          </form>
        </div>
      </div>
    </Transition>


    <!-- ── Edit Modal ── -->
    <Transition name="fade">
      <div
        v-if="showEditModal"
        class="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/40 backdrop-blur-[2px] px-4"
        @click.self="showEditModal = false"
      >
        <div class="w-full max-w-md px-10 py-10 bg-white border border-stone-200 rounded-sm shadow-xl">

          <div class="flex items-center justify-between mb-6">
            <div>
              <h2 class="text-lg font-normal tracking-tight text-stone-900">Edit customer</h2>
              <p class="font-sans text-sm text-stone-400 mt-0.5">Update the details below.</p>
            </div>
            <button @click="showEditModal = false" class="font-sans text-sm text-stone-300 hover:text-stone-600 transition-colors">✕</button>
          </div>

          <div class="mb-6 border-t border-stone-200"></div>

          <form @submit.prevent="handleUpdate" class="space-y-5">
            <div>
              <label class="block text-[11px] font-sans font-medium text-stone-400 uppercase tracking-widest mb-1.5">
                Full Name <span class="text-stone-900">*</span>
              </label>
              <input
                v-model="editForm.name"
                type="text"
                placeholder="Jane Doe"
                required
                class="w-full px-3 py-2.5 text-sm font-sans text-stone-900 bg-stone-50 border border-stone-300 rounded-sm outline-none focus:border-stone-900 focus:bg-white transition-colors placeholder:text-stone-300"
              />
            </div>

            <div>
              <label class="block text-[11px] font-sans font-medium text-stone-400 uppercase tracking-widest mb-1.5">
                Email <span class="text-stone-900">*</span>
              </label>
              <input
                v-model="editForm.email"
                type="email"
                placeholder="jane@example.com"
                required
                class="w-full px-3 py-2.5 text-sm font-sans text-stone-900 bg-stone-50 border border-stone-300 rounded-sm outline-none focus:border-stone-900 focus:bg-white transition-colors placeholder:text-stone-300"
              />
            </div>

            <p v-if="editError" class="font-sans text-xs text-red-400">{{ editError }}</p>

            <div class="flex items-center gap-3 pt-1">
              <button
                type="button"
                @click="showEditModal = false"
                class="flex-1 py-2.5 border border-stone-200 text-xs font-sans font-medium text-stone-400 uppercase tracking-widest rounded-sm hover:border-stone-400 hover:text-stone-700 transition-colors"
              >Cancel</button>
              <button
                type="submit"
                :disabled="isSubmitting"
                class="flex-1 py-2.5 bg-stone-900 text-[#F7F6F3] text-xs font-sans font-medium uppercase tracking-widest rounded-sm hover:bg-stone-700 transition-colors disabled:opacity-50"
              >{{ isSubmitting ? 'Saving…' : 'Save changes' }}</button>
            </div>
          </form>
        </div>
      </div>
    </Transition>


    <!-- ── Delete Modal ── -->
    <Transition name="fade">
      <div
        v-if="showDeleteModal"
        class="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/40 backdrop-blur-[2px] px-4"
        @click.self="showDeleteModal = false"
      >
        <div class="w-full max-w-sm px-10 py-10 bg-white border border-stone-200 rounded-sm shadow-xl">
          <h2 class="text-lg font-normal tracking-tight text-stone-900 mb-1">Remove customer?</h2>
          <p class="font-sans text-sm text-stone-400 mb-6">
            <strong class="text-stone-600 font-medium">{{ selectedCustomer?.name }}</strong> will be permanently removed.
            This cannot be undone.
          </p>
          <div class="border-t border-stone-200 mb-6"></div>
          <p v-if="deleteError" class="font-sans text-xs text-red-400 mb-4">{{ deleteError }}</p>
          <div class="flex items-center gap-3">
            <button
              @click="showDeleteModal = false"
              class="flex-1 py-2.5 border border-stone-200 text-xs font-sans font-medium text-stone-400 uppercase tracking-widest rounded-sm hover:border-stone-400 hover:text-stone-700 transition-colors"
            >Cancel</button>
            <button
              @click="handleDelete"
              :disabled="isSubmitting"
              class="flex-1 py-2.5 bg-red-500 text-white text-xs font-sans font-medium uppercase tracking-widest rounded-sm hover:bg-red-600 transition-colors disabled:opacity-50"
            >{{ isSubmitting ? 'Removing…' : 'Yes, remove' }}</button>
          </div>
        </div>
      </div>
    </Transition>

  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active  { transition: opacity 0.2s ease; }
.fade-enter-from,
.fade-leave-to      { opacity: 0; }
</style>






























<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { customerService } from "~/api/customer/CustomerService";

interface Customer {    
  id: number | string;
  name: string;
  email: string;
}

// ── State ──────────────────────────────────────────
const customers    = ref<Customer[]>([]);
const isLoading    = ref(false);
const isSubmitting = ref(false);
const searchQuery  = ref("");

const showCreateModal = ref(false);
const showEditModal   = ref(false);
const showDeleteModal = ref(false);
const selectedCustomer = ref<Customer | null>(null);

const createForm = ref({ name: "", email: "" });
const editForm   = ref({ name: "", email: "" });

const createError = ref("");
const editError   = ref("");
const deleteError = ref("");

// ── Computed ───────────────────────────────────────
const filteredCustomers = computed(() => {
  if (!searchQuery.value) return customers.value;
  const q = searchQuery.value.toLowerCase();
  return customers.value.filter(
    (c) => c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q)
  );
});

// ── Helpers ────────────────────────────────────────
const openEdit = (customer: Customer) => {
  selectedCustomer.value = customer;
  editForm.value = { name: customer.name, email: customer.email };
  editError.value = "";
  showEditModal.value = true;
};

const openDelete = (customer: Customer) => {
  selectedCustomer.value = customer;
  deleteError.value = "";
  showDeleteModal.value = true;
};

// ── CRUD handlers — wire these to your service ─────
const handleCreate = async () => {
  isSubmitting.value = true;
  createError.value  = "";
  try {
    const created = await customerService.create(createForm.value);
    customers.value.push(created);
    createForm.value  = { name: "", email: "" };
    showCreateModal.value = false;
  } catch (err: any) {
    createError.value = err?.message || "Failed to create customer.";
  } finally {
    isSubmitting.value = false;
  }
};

const handleUpdate = async () => {
  if (!selectedCustomer.value) return;
  isSubmitting.value = true;
  editError.value    = "";
  try {
    // const updated = await customerService.update(selectedCustomer.value.id, editForm.value);
    // const idx = customers.value.findIndex((c) => c.id === updated.id);
    // if (idx !== -1) customers.value.splice(idx, 1, updated);
    showEditModal.value = false;
  } catch (err: any) {
    editError.value = err?.message || "Failed to update customer.";
  } finally {
    isSubmitting.value = false;
  }
};

const handleDelete = async () => {
  if (!selectedCustomer.value) return;
  isSubmitting.value = true;
  deleteError.value  = "";
  try {
    // await customerService.delete(selectedCustomer.value.id);
    // customers.value = customers.value.filter((c) => c.id !== selectedCustomer.value!.id);
    showDeleteModal.value = false;
  } catch (err: any) {
    deleteError.value = err?.message || "Failed to remove customer.";
  } finally {
    isSubmitting.value = false;
  }
};

//── Fetch on mount ─────────────────────────────────
onMounted(async () => {
  isLoading.value = true;
  try {
    customers.value = await customerService.list();
  } catch (err: any) {
    // handle error
  } finally {
    isLoading.value = false;
  }
});