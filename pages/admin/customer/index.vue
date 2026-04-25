<template>
    <div class="space-y-6">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 class="text-xl font-semibold tracking-tight text-gray-900">Customers</h1>
          <p class="mt-1 text-sm text-gray-500">Displaying customer records from your API.</p>
        </div>

        <button @click="openModal('create')" class="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800">
          <PlusIcon class="h-4 w-4" />
          <span>Create Customer</span>
        </button>
      </div>

      <div v-if="pending" class="flex justify-center py-16">
        <div class="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900"></div>
      </div>

      <div v-else class="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-500">Name</th>
              <th class="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-500">Email</th>
              <th class="px-6 py-4 text-right text-xs font-semibold uppercase text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 bg-white">
            <tr v-for="customer in customers?.data" :key="customer.uuid" class="hover:bg-gray-50">
              <td class="px-6 py-4 text-sm text-gray-700">{{ customer.name }}</td>
              <td class="px-6 py-4 text-sm text-gray-500">{{ customer.email }}</td>
              <td class="px-6 py-4 text-right space-x-2">
                <button 
                @click="router.push(`/admin/customer/${customer.uuid}`)" 
                class="inline-flex items-center gap-2 rounded-md border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <EyeIcon class="h-4 w-4" />
                <span>View</span>
              </button>

              <button 
                @click="openModal('edit', customer)" 
                class="inline-flex items-center gap-2 rounded-md border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <PencilSquareIcon class="h-4 w-4" />
                <span>Edit</span>
              </button>

              <button 
                @click="openModal('delete', customer)" 
                class="inline-flex items-center gap-2 rounded-md border border-red-200 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50"
              >
                <TrashIcon class="h-4 w-4" />
                <span>Delete</span>
              </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <CustomerModal
        :open="modal.show"
        :mode="modal.mode"
        :uuid="modal.selected?.uuid"
        :customer-name="modal.selected?.name"
        @close="modal.show = false"
        @success="fetchCustomers"
      />
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { PlusIcon, EyeIcon, PencilSquareIcon, TrashIcon } from '@heroicons/vue/24/outline';
import { customerService } from '~/api/customer/CustomerService';
import CustomerModal from '~/components/Customer/CustomerModal.vue';

const router = useRouter();
const customers = ref<any>(null);
const pending = ref(true);

// Replaces 6 separate refs with 1 reactive object
const modal = reactive({
  show: false,
  mode: 'create' as 'create' | 'edit' | 'delete',
  selected: null as any
});

const fetchCustomers = async () => {
  pending.value = true;
  try { customers.value = await customerService.list(); } 
  catch (err) { console.error(err); } 
  finally { pending.value = false; }
};

const openModal = (mode: 'create' | 'edit' | 'delete', customer: any = null) => {
  modal.mode = mode;
  modal.selected = customer;
  modal.show = true;
};

onMounted(fetchCustomers);
</script>