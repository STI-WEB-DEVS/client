<template>

  <div>
    <div class="md:flex md:items-center md:justify-between mb-8">
      <div class="min-w-0 flex-1">
        <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          {{ isAdding ? 'Register New Customer' : 'Customers' }}
        </h2>
      </div>
      <div class="mt-4 flex md:ml-4 md:mt-0 gap-3">
        <button v-if="isAdding || selectedCustomers.length > 0" type="button" @click="resetState"
          class="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 transition">
          ← Back
        </button>

        <button v-if="selectedCustomers.length > 0 && !isAdding" type="button" @click="deleteSelected"
          class="inline-flex items-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 transition">
          Delete Selected ({{ selectedCustomers.length }})
        </button>

        <button v-if="!isAdding" type="button" @click="isAdding = true"
          class="inline-flex items-center rounded-md bg-green-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-800 transition">
          + Add Customer
        </button>
      </div>
    </div>

    <div v-if="isAdding" class="bg-white shadow sm:rounded-lg border border-gray-200">
      <div class="px-4 py-5 sm:p-6">
        <div class="grid grid-cols-6 gap-6">
          <div class="col-span-6 sm:col-span-3">
            <label class="block text-sm font-medium text-gray-700">Full Name</label>
            <input v-model="newCustomer.name" type="text" placeholder="John Doe"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm border p-2 outline-none">
          </div>

          <div class="col-span-6 sm:col-span-3">
            <label class="block text-sm font-medium text-gray-700">Email Address</label>
            <input v-model="newCustomer.email" type="email" placeholder="john@example.com"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm border p-2 outline-none">
          </div>

          <div class="col-span-6 sm:col-span-2">
            <label class="block text-sm font-medium text-gray-700">Status</label>
            <select v-model="newCustomer.status"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm border p-2 outline-none">
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
        <div class="mt-6 flex items-center justify-end gap-x-4 border-t pt-4">
          <button @click="resetState" type="button"
            class="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
          <button @click="saveCustomer" type="button"
            class="rounded-md bg-green-900 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-800 transition">Save
            Customer</button>
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
                  <th scope="col" class="relative px-7 sm:w-12 sm:px-6">
                    <input type="checkbox"
                      class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-green-900 focus:ring-green-900"
                      :checked="isAllSelected" @change="toggleSelectAll" />
                  </th>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                    Customer Name</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Email</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6 text-right text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-for="customer in customers" :key="customer.id"
                  :class="[selectedCustomers.includes(customer.id) && 'bg-green-50']">
                  <td class="relative px-7 sm:w-12 sm:px-6">
                    <input type="checkbox"
                      class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-green-900 focus:ring-green-900"
                      :value="customer.id" v-model="selectedCustomers" />
                  </td>
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{{
                    customer.name }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ customer.email }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm">
                    <span
                      :class="[customer.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800', 'inline-flex items-center rounded-full px-2 py-1 text-xs font-medium']">
                      {{ customer.status }}
                    </span>
                  </td>
                  <td class="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <button @click="deleteSingle(customer.id)" class="text-red-600 hover:text-red-900">Remove</button>
                  </td>
                </tr>
                <tr v-if="customers.length === 0">
                  <td colspan="5" class="py-10 text-center text-gray-400">No customers registered yet.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// UI State
const isAdding = ref(false)
const selectedCustomers = ref([])

// Data State
const customers = ref([
  { id: 1, name: 'Alice Johnson', email: 'alice@company.com', status: 'Active' },
  { id: 2, name: 'Bob Smith', email: 'bob.s@provider.net', status: 'Inactive' },
  { id: 3, name: 'Charlie Davis', email: 'charlie@web.com', status: 'Active' },
])

const newCustomer = ref({
  name: '',
  email: '',
  status: 'Active'
})

// Selection Logic
const isAllSelected = computed(() => {
  return customers.value.length > 0 && selectedCustomers.value.length === customers.value.length
})

function toggleSelectAll() {
  if (isAllSelected.value) {
    selectedCustomers.value = []
  } else {
    selectedCustomers.value = customers.value.map((c) => c.id)
  }
}

// Actions
function resetState() {
  isAdding.value = false
  selectedCustomers.value = []
  newCustomer.value = { name: '', email: '', status: 'Active' }
}

function saveCustomer() {
  if (!newCustomer.value.name || !newCustomer.value.email) {
    return alert('Please fill in both name and email.')
  }

  customers.value.push({
    id: Date.now(),
    ...newCustomer.value
  })
  resetState()
}

function deleteSingle(id) {
  if (confirm('Remove this customer?')) {
    customers.value = customers.value.filter(c => c.id !== id)
    selectedCustomers.value = selectedCustomers.value.filter(cid => cid !== id)
  }
}

function deleteSelected() {
  if (confirm(`Remove ${selectedCustomers.value.length} selected customers?`)) {
    customers.value = customers.value.filter(c => !selectedCustomers.value.includes(c.id))
    selectedCustomers.value = []
  }
}
</script>