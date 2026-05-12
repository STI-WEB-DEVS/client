<template>
  <NuxtLayout>
    <div class="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <p class="text-xs font-semibold uppercase tracking-widest text-amber-600">Customer Management</p>
      <h1 class="mt-2 text-3xl font-bold text-slate-900">Customers</h1>
      <p class="mt-2 text-sm text-slate-600">Create, update, and remove customer records without changing the app shell.</p>
    </div>

    <div class="grid grid-cols-1 gap-6 xl:grid-cols-3">
      <div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm xl:col-span-2">
        <div class="border-b border-slate-100 bg-slate-50 px-6 py-4">
          <h2 class="text-lg font-semibold text-slate-900">Customer Records</h2>
          <p class="mt-1 text-xs text-slate-500">Pulled from the `/api/customers` endpoint.</p>
        </div>

        <div v-if="message" class="mx-6 mt-6 rounded-xl border px-4 py-3 text-sm" :class="messageClass">
          {{ message }}
        </div>

        <div class="overflow-x-auto px-6 py-6">
          <table class="min-w-full divide-y divide-slate-200">
            <thead>
              <tr class="text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                <th class="pb-3 pr-4">Name</th>
                <th class="pb-3 pr-4">Email</th>
                <th class="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr v-for="customer in customers" :key="customer.uuid" class="align-top">
                <td class="py-4 pr-4">
                  <p class="font-semibold text-slate-900">{{ customer.name }}</p>
                  <p class="mt-1 text-xs text-slate-500">{{ customer.uuid }}</p>
                </td>
                <td class="py-4 pr-4 text-sm text-slate-600">{{ customer.email }}</td>
                <td class="py-4 text-right">
                    <div class="inline-flex items-center gap-2">
                      <NuxtLink :to="`/customers/${customer.uuid}`" class="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
                        View
                      </NuxtLink>
                      <button class="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50" @click="startEdit(customer)">
                        Edit
                      </button>
                      <button class="rounded-lg border border-rose-200 px-3 py-1.5 text-sm font-medium text-rose-700 transition hover:bg-rose-50" @click="promptDelete(customer)">
                        Delete
                      </button>
                    </div>
                </td>
              </tr>
              <tr v-if="!customers.length">
                <td colspan="3" class="py-10 text-center text-sm text-slate-500">No customers found.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div class="border-b border-slate-100 bg-slate-50 px-6 py-4">
          <h2 class="text-lg font-semibold text-slate-900">{{ editingUuid ? 'Edit Customer' : 'New Customer' }}</h2>
          <p class="mt-1 text-xs text-slate-500">Use the existing customer form component.</p>
        </div>

        <div class="space-y-6 px-6 py-6">
          <CustomerForm v-model="form" :disabled="saving" />

          <div class="flex items-center gap-3">
            <button class="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60" :disabled="saving" @click="saveCustomer">
              {{ saving ? 'Saving...' : editingUuid ? 'Update Customer' : 'Create Customer' }}
            </button>
            <button v-if="editingUuid" class="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50" :disabled="saving" @click="resetForm">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
  <ConfirmModal v-model="showDeleteModal" title="Delete customer?" :message="deletingTarget ? `Delete ${deletingTarget.name}?` : 'Delete?'" @confirm="confirmDelete" />
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import CustomerForm from '~/components/CustomerForm.vue'
import ConfirmModal from '~/components/ConfirmModal.vue'
import { customerService } from '~/api/customers/CustomerService'

type CustomerRecord = {
  uuid: string
  name: string
  email: string
}

type CustomerFormState = {
  name: string
  email: string
}

const customers = ref<CustomerRecord[]>([])
const form = ref<CustomerFormState>({ name: '', email: '' })
const editingUuid = ref<string | null>(null)
const saving = ref(false)
const message = ref('')
const messageTone = ref<'success' | 'error' | ''>('')

const messageClass = computed(() =>
  messageTone.value === 'success'
    ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
    : 'border-rose-200 bg-rose-50 text-rose-800',
)

const extractRows = (response: any): CustomerRecord[] => {
  if (Array.isArray(response?.data)) {
    return response.data
  }

  if (Array.isArray(response)) {
    return response
  }

  return []
}

const setFeedback = (text: string, tone: 'success' | 'error') => {
  message.value = text
  messageTone.value = tone
}

const clearFeedback = () => {
  message.value = ''
  messageTone.value = ''
}

const loadCustomers = async () => {
  try {
    const response = await customerService.list()
    customers.value = extractRows(response)
  } catch (error: any) {
    setFeedback(error?.message || 'Failed to load customers.', 'error')
  }
}

const resetForm = () => {
  editingUuid.value = null
  form.value = { name: '', email: '' }
}

const startEdit = (customer: CustomerRecord) => {
  clearFeedback()
  editingUuid.value = customer.uuid
  form.value = {
    name: customer.name,
    email: customer.email,
  }
}

const saveCustomer = async () => {
  saving.value = true
  clearFeedback()

  try {
    if (editingUuid.value) {
      await customerService.update(editingUuid.value, form.value)
      setFeedback('Customer updated successfully.', 'success')
    } else {
      await customerService.create(form.value)
      setFeedback('Customer created successfully.', 'success')
    }

    await loadCustomers()
    resetForm()
  } catch (error: any) {
    setFeedback(error?.message || 'Unable to save customer.', 'error')
  } finally {
    saving.value = false
  }
}

// modal-based delete flow
const showDeleteModal = ref(false)
const deletingTarget = ref<CustomerRecord | null>(null)

const promptDelete = (customer: CustomerRecord) => {
  deletingTarget.value = customer
  showDeleteModal.value = true
}

const confirmDelete = async () => {
  if (!deletingTarget.value) return
  saving.value = true
  clearFeedback()

  try {
    await customerService.delete(deletingTarget.value.uuid)
    setFeedback('Customer deleted successfully.', 'success')

    if (editingUuid.value === deletingTarget.value.uuid) {
      resetForm()
    }

    await loadCustomers()
  } catch (error: any) {
    setFeedback(error?.message || 'Unable to delete customer.', 'error')
  } finally {
    saving.value = false
    deletingTarget.value = null
  }
}

onMounted(loadCustomers)

</script>