<template>
    <div class="space-y-6">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 class="text-xl font-semibold tracking-tight text-gray-900">Customers</h1>
          <p class="mt-1 text-sm text-gray-500">
            Displaying customer records from your API.
          </p>
        </div>

        <button
          type="button"
          @click="handleCreate"
          class="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          <PlusIcon class="h-4 w-4" />
          <span>Create Customer</span>
        </button>
      </div>

      <!-- Loading -->
      <div v-if="pending" class="flex justify-center py-16">
        <div class="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900"></div>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="rounded-xl border border-red-200 bg-red-50 p-4">
        <p class="text-sm text-red-700">{{ error.message }}</p>
      </div>

      <!-- Table -->
      <div v-else class="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">ID</th>
                <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Name</th>
                <th class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Email</th>
                <th class="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 bg-white">
              <tr v-for="customer in customers?.data" :key="customer.id" class="transition hover:bg-gray-50">
                <td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">{{ customer.id }}</td>
                <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-700">{{ customer.name }}</td>
                <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{{ customer.email }}</td>
                <td class="whitespace-nowrap px-6 py-4">
                  <div class="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      @click="handleView(customer)"
                      class="inline-flex items-center gap-2 rounded-md border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      <EyeIcon class="h-4 w-4" />
                      <span>View</span>
                    </button>
                    <button
                      type="button"
                      @click="handleEdit(customer)"
                      class="inline-flex items-center gap-2 rounded-md border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      <PencilSquareIcon class="h-4 w-4" />
                      <span>Edit</span>
                    </button>
                    <button
                      type="button"
                      @click="handleDelete(customer)"
                      class="inline-flex items-center gap-2 rounded-md border border-red-200 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50"
                    >
                      <TrashIcon class="h-4 w-4" />
                      <span>Delete</span>
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="!customers?.data?.length">
                <td colspan="4" class="px-6 py-10 text-center text-sm text-gray-500">No customers found.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="border-t border-gray-200 bg-gray-50 px-6 py-4">
          <p class="text-sm text-gray-500">
            Showing
            <span class="font-medium text-gray-900">{{ customers?.meta?.from ?? 0 }}</span>
            to
            <span class="font-medium text-gray-900">{{ customers?.meta?.to ?? 0 }}</span>
            of
            <span class="font-medium text-gray-900">{{ customers?.meta?.total ?? 0 }}</span>
            customers
          </p>
        </div>
      </div>

      <!-- Modals -->
      <CustomerCreateModal
        :open="isCreateModalOpen"
        @close="isCreateModalOpen=false"
        @created="onCreated"
      />
      <CustomerEditModal
        :open="isEditModalOpen"
        :customer="selectedCustomer"
        @close="isEditModalOpen=false"
        @updated="onUpdated"
      />
      <CustomerDeleteModal
        :open="isDeleteModalOpen"
        :customer="selectedCustomer"
        @close="isDeleteModalOpen=false"
        @deleted="onDeleted"
      />

      <!-- Feedback Modal -->
      <FeedbackModal
        :open="isFeedbackModalOpen"
        :message="feedbackMessage"
        @close="closeFeedbackModal"
      />
    </div>
</template>

<script setup lang="ts">
import CustomerCreateModal from '~/components/CustomerCreateModal.vue'
import CustomerEditModal from '~/components/CustomerEditModal.vue'
import CustomerDeleteModal from '~/components/CustomerDeleteModal.vue'
import FeedbackModal from '~/components/FeedbackModal.vue'

import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {
  PlusIcon,
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/vue/24/outline'
import { customerService } from '~/api/customer/CustomerService'

const router = useRouter()

const customers = ref<any>(null)
const pending = ref(true)
const error = ref<any>(null)

const isCreateModalOpen = ref(false)
const isEditModalOpen = ref(false)
const isDeleteModalOpen = ref(false)
const selectedCustomer = ref<any>(null)

// Feedback modal state
const isFeedbackModalOpen = ref(false)
const feedbackMessage = ref('')

onMounted(async () => {
  await refreshList()
})

const refreshList = async () => {
  pending.value = true
  error.value = null
  try {
    customers.value = await customerService.list()
  } catch (err: any) {
    error.value = err
  } finally {
    pending.value = false
  }
}

const handleCreate = () => {
  isCreateModalOpen.value = true
}

const handleView = (customer: any) => {
  router.push(`/customer/${customer.uuid}`)
}

const handleEdit = (customer: any) => {
  selectedCustomer.value = customer
  isEditModalOpen.value = true
}

const handleDelete = (customer: any) => {
  selectedCustomer.value = customer
  isDeleteModalOpen.value = true
}

// Feedback modal helpers
const openFeedbackModal = (message: string) => {
  feedbackMessage.value = message
  isFeedbackModalOpen.value = true
}

const closeFeedbackModal = () => {
  isFeedbackModalOpen.value = false
  feedbackMessage.value = ''
}

// CRUD event handlers from modals
const onCreated = async () => {
  await refreshList()
  openFeedbackModal('Customer created successfully!')
}

const onUpdated = async () => {
  await refreshList()
  openFeedbackModal('Customer updated successfully!')
}

const onDeleted = async () => {
  await refreshList()
  openFeedbackModal('Customer deleted successfully!')
}
</script>
