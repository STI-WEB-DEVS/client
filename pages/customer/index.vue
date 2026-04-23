<template>
  <NuxtLayout>
    <div class="space-y-6">
      <PageHeader 
        title="Customers" 
        description="Displaying customer records from your API."
        entity-name="Customer"
        :show-create-button="true"
        @create="openCreateModal"
      />

      <div v-if="pending" class="flex justify-center py-16">
        <div class="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900"></div>
      </div>

      <CustomerTable 
        v-else
        :customers="customers"
        :meta="meta"
        @edit="openEditModal"
        @delete="deleteCustomer"
      />

      <!-- Create/Edit Modal -->
      <div v-if="showModal" class="fixed inset-0 z-50 overflow-y-auto">
        <div class="flex min-h-screen items-center justify-center p-4">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75" @click="closeModal"></div>
          <div class="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 class="text-lg font-semibold mb-4">{{ isEditing ? 'Edit Customer' : 'Create Customer' }}</h3>
            <CustomerForm 
              :initial-data="form" 
              :is-edit="isEditing"
              @submit="saveCustomer"
              @cancel="closeModal"
            />
          </div>
        </div>
      </div>

      <DeleteModal 
        :show="showDeleteModal"
        item-type="Customer"
        :item-name="customerToDelete?.name"
        @close="showDeleteModal = false"
        @confirm="confirmDelete"
      />

      <FeedbackModal :open="isFeedbackModalOpen" :message="feedbackMessage" @close="closeFeedbackModal" />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { customerService } from '~/api/customer/CustomerService'
import PageHeader from '~/components/PageHeader.vue'
import CustomerTable from '~/components/CustomerTable.vue'
import CustomerForm from '~/components/CustomerForm.vue'
import DeleteModal from '~/components/DeleteModal.vue'

definePageMeta({
  middleware: 'auth'
})

const customers = ref([])
const meta = ref({})
const pending = ref(true)
const showModal = ref(false)
const showDeleteModal = ref(false)
const isEditing = ref(false)
const editingUuid = ref(null)
const customerToDelete = ref(null)
const form = ref({ name: '', email: '' })
const isFeedbackModalOpen = ref(false)
const feedbackMessage = ref('')

const fetchCustomers = async () => {
  pending.value = true
  try {
    const response = await customerService.list()
    customers.value = response.data || []
    meta.value = response.meta || {}
  } catch (error: any) {
    console.error('Error fetching customers:', error)
  } finally {
    pending.value = false
  }
}

const openCreateModal = () => {
  isEditing.value = false
  editingUuid.value = null
  form.value = { name: '', email: '' }
  showModal.value = true
}

const openEditModal = (customer: any) => {
  isEditing.value = true
  editingUuid.value = customer.uuid
  form.value = { name: customer.name, email: customer.email }
  showModal.value = true
}

const saveCustomer = async (data: any) => {
  try {
    if (isEditing.value) {
      await customerService.update(editingUuid.value, data)
      feedbackMessage.value = 'Customer updated successfully!'
    } else {
      await customerService.create(data)
      feedbackMessage.value = 'Customer created successfully!'
    }
    closeModal()
    await fetchCustomers()
    isFeedbackModalOpen.value = true
    setTimeout(() => { isFeedbackModalOpen.value = false }, 3000)
  } catch (error: any) {
    feedbackMessage.value = error.message || 'Error saving customer'
    isFeedbackModalOpen.value = true
  }
}

const deleteCustomer = (customer: any) => {
  customerToDelete.value = customer
  showDeleteModal.value = true
}

const confirmDelete = async () => {
  try {
    await customerService.delete(customerToDelete.value.uuid)
    feedbackMessage.value = 'Customer deleted successfully!'
    showDeleteModal.value = false
    await fetchCustomers()
    isFeedbackModalOpen.value = true
    setTimeout(() => { isFeedbackModalOpen.value = false }, 3000)
  } catch (error: any) {
    feedbackMessage.value = error.message || 'Error deleting customer'
    isFeedbackModalOpen.value = true
  }
}

const closeModal = () => {
  showModal.value = false
  form.value = { name: '', email: '' }
  editingUuid.value = null
  isEditing.value = false
}

const closeFeedbackModal = () => {
  isFeedbackModalOpen.value = false
}

onMounted(() => {
  fetchCustomers()
})
</script>