<template>
  <div class="min-h-screen" style="background-color: #f5f0e8;">

    <!-- Header -->
    <div class="px-8 py-5 flex items-center justify-between" style="background-color: #1C3028;">
      <div class="flex items-center gap-4">
        <NuxtLink to="/customer/shop" class="flex items-center gap-2 text-sm font-semibold hover:opacity-80 transition-opacity" style="color: #C9A96E; font-family: sans-serif;">
          ← Back to Shop
        </NuxtLink>
      </div>
      <span style="font-family: Georgia, serif; font-size: 1.4rem; color: white; letter-spacing: 0.05em;">
        Servor<span style="color: #C9A96E;">a</span>
      </span>
      <div class="flex items-center gap-4" style="font-family: sans-serif;">
        <NuxtLink to="/product/products" class="text-xs opacity-60 hover:opacity-100 transition-opacity" style="color: white;">Products</NuxtLink>
        <NuxtLink to="/order/orders" class="text-xs opacity-60 hover:opacity-100 transition-opacity" style="color: white;">Orders</NuxtLink>
      </div>
    </div>

    <div class="max-w-3xl mx-auto px-6 py-10 space-y-6">

      <!-- Form -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 class="text-lg font-bold mb-5" style="color: #1C3028; font-family: Georgia, serif;">
          {{ editing ? 'Edit Customer' : 'Add Customer' }}
        </h2>
        <div class="space-y-4">
          <div>
            <label class="block text-xs font-semibold uppercase tracking-widest mb-1.5" style="color: #1C3028; font-family: sans-serif;">Customer Name</label>
            <input v-model="form.name" type="text" placeholder="Enter name"
              class="block w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:border-[#1C3028] transition-colors" />
          </div>
          <div>
            <label class="block text-xs font-semibold uppercase tracking-widest mb-1.5" style="color: #1C3028; font-family: sans-serif;">Email</label>
            <input v-model="form.email" type="email" placeholder="Enter email"
              class="block w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:border-[#1C3028] transition-colors" />
          </div>
          <p v-if="formError" class="text-xs text-red-500" style="font-family: sans-serif;">{{ formError }}</p>
          <p v-if="formSuccess" class="text-xs text-green-600 font-semibold" style="font-family: sans-serif;">{{ formSuccess }}</p>
          <div class="flex gap-3 pt-1">
            <button @click="submitForm" :disabled="submitting"
              class="px-6 py-2.5 rounded-xl text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50 transition-opacity"
              style="background-color: #1C3028; font-family: sans-serif;">
              {{ submitting ? 'Saving...' : (editing ? 'Update Customer' : 'Add Customer') }}
            </button>
            <button v-if="editing" @click="cancelEdit"
              class="px-6 py-2.5 rounded-xl text-sm font-semibold border border-gray-200 hover:bg-gray-50 transition-colors"
              style="font-family: sans-serif;">
              Cancel
            </button>
          </div>
        </div>
      </div>

      <!-- List -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-bold" style="color: #1C3028; font-family: Georgia, serif;">Customers</h2>
          <span class="text-xs text-gray-400" style="font-family: sans-serif;">{{ customers.length }} item(s)</span>
        </div>

        <div v-if="loading" class="text-sm text-gray-400 py-6 text-center" style="font-family: sans-serif;">Loading...</div>
        <div v-else-if="customers.length === 0" class="text-sm text-gray-400 py-6 text-center" style="font-family: sans-serif;">No customers yet.</div>

        <div v-else class="divide-y divide-gray-100">
          <div v-for="c in customers" :key="c.uuid" class="py-3.5 flex items-center justify-between">
            <div>
              <p class="font-semibold text-gray-800 text-sm" style="font-family: sans-serif;">{{ c.name }}</p>
              <p class="text-xs text-gray-400 mt-0.5" style="font-family: sans-serif;">{{ c.email }}</p>
            </div>
            <div class="flex items-center gap-4 text-xs font-semibold" style="font-family: sans-serif;">
              <button @click="viewCustomer(c)" class="hover:opacity-70 transition-opacity" style="color: #1C3028;">View</button>
              <button @click="editCustomer(c)" class="hover:opacity-70 transition-opacity" style="color: #C9A96E;">Edit</button>
              <button @click="deleteCustomer(c.uuid)" class="hover:opacity-70 transition-opacity" style="color: #EF4444;">Delete</button>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- View Modal -->
    <div v-if="viewing" class="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4">
      <div class="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
        <div class="flex items-center justify-between mb-5">
          <h3 class="font-bold text-lg" style="color: #1C3028; font-family: Georgia, serif;">Customer Details</h3>
          <button @click="viewing = null" class="text-gray-300 hover:text-gray-500 text-2xl leading-none transition-colors">×</button>
        </div>
        <div class="space-y-4 text-sm" style="font-family: sans-serif;">
          <div>
            <p class="text-xs text-gray-400 uppercase tracking-widest mb-1">Customer Name</p>
            <p class="font-semibold text-gray-800">{{ viewing.name }}</p>
          </div>
          <div>
            <p class="text-xs text-gray-400 uppercase tracking-widest mb-1">Email</p>
            <p class="font-semibold text-gray-800">{{ viewing.email }}</p>
          </div>
          <div>
            <p class="text-xs text-gray-400 uppercase tracking-widest mb-1">UUID</p>
            <p class="text-gray-400 text-xs break-all">{{ viewing.uuid }}</p>
          </div>
        </div>
        <div class="flex gap-3 mt-6">
          <button @click="editCustomer(viewing); viewing = null"
            class="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition-opacity"
            style="background-color: #C9A96E; font-family: sans-serif;">Edit</button>
          <button @click="viewing = null"
            class="flex-1 py-2.5 rounded-xl text-sm font-semibold border border-gray-200 hover:bg-gray-50 transition-colors"
            style="font-family: sans-serif;">Close</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { customerService } from '~/api/customer/CustomerService';

const customers = ref<any[]>([]);
const loading = ref(true);
const submitting = ref(false);
const formError = ref('');
const formSuccess = ref('');
const editing = ref<any>(null);
const viewing = ref<any>(null);
const form = ref({ name: '', email: '' });

onMounted(async () => { await loadCustomers(); });

async function loadCustomers() {
  loading.value = true;
  try {
    const res = await customerService.list();
    customers.value = res.data ?? res;
  } catch (e: any) { console.error(e); }
  finally { loading.value = false; }
}

async function submitForm() {
  formError.value = '';
  formSuccess.value = '';
  if (!form.value.name || !form.value.email) {
    formError.value = 'Name and email are required.';
    return;
  }
  submitting.value = true;
  try {
    if (editing.value) {
      await customerService.update(editing.value.uuid, form.value);
      formSuccess.value = 'Customer updated!';
    } else {
      await customerService.create(form.value);
      formSuccess.value = 'Customer added!';
    }
    form.value = { name: '', email: '' };
    editing.value = null;
    await loadCustomers();
    setTimeout(() => formSuccess.value = '', 3000);
  } catch (e: any) {
    formError.value = e?.message || 'Something went wrong.';
  } finally { submitting.value = false; }
}

function editCustomer(c: any) {
  editing.value = c;
  form.value = { name: c.name, email: c.email };
  formError.value = '';
  formSuccess.value = '';
}

function cancelEdit() {
  editing.value = null;
  form.value = { name: '', email: '' };
  formError.value = '';
  formSuccess.value = '';
}

function viewCustomer(c: any) { viewing.value = c; }

async function deleteCustomer(uuid: string) {
  if (!confirm('Delete this customer?')) return;
  try {
    await customerService.delete(uuid);
    await loadCustomers();
  } catch (e: any) { alert(e?.message || 'Failed to delete.'); }
}
</script>