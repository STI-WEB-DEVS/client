<template>
  <NuxtLayout>
    <div class="mx-auto max-w-2xl space-y-6">
      <!-- Header -->
      <div class="flex items-center gap-4">
        <button
          @click="router.push('/customer')"
          class="rounded-lg border border-gray-200 p-2 transition hover:bg-gray-50"
        >
          <ArrowLeftIcon class="h-5 w-5 text-gray-500" />
        </button>
        <div>
          <h1 class="text-xl font-semibold tracking-tight text-gray-900">
            {{ pageTitle }}
          </h1>
          <p class="mt-1 text-sm text-gray-500">{{ pageSubtitle }}</p>
        </div>
      </div>

      <!-- Loading spinner -->
      <div v-if="loading && !isCreate" class="flex justify-center py-16">
        <div class="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900"></div>
      </div>

      <!-- Read-only view mode -->
      <div v-else-if="isViewMode && customer" class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <p class="text-sm font-medium text-gray-500">UUID</p>
        <p class="mt-1 text-sm text-gray-900 font-mono bg-gray-50 rounded-lg px-4 py-2">{{ customer.uuid }}</p>

        <p class="text-sm font-medium text-gray-500 mt-4">Name</p>
        <p class="mt-1 text-sm text-gray-900">{{ customer.name }}</p>

        <p class="text-sm font-medium text-gray-500 mt-4">Email</p>
        <p class="mt-1 text-sm text-gray-900">{{ customer.email }}</p>
      </div>

      <!-- Create / Edit form -->
      <EntityForm
        v-else
        :entityName="'Customer'"
        :fields="fields"
        :service="customerService"
        :initialData="customer"
        :isEdit="!isCreate"
        :uuid="uuid"
        @success="handleSuccess"
        @error="handleError"
      />

      <!-- Feedback modal -->
      <FeedbackModal
        :open="!!feedbackMessage"
        :message="feedbackMessage"
        :type="feedbackType"
        @close="feedbackMessage = ''"
      />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeftIcon } from '@heroicons/vue/24/outline'
import { customerService } from '~/api/customer/CustomerService'
import EntityForm from '~/components/EntityForm.vue'
import FeedbackModal from '~/components/FeedbackModal.vue' // modal version

const route = useRoute()
const router = useRouter()

const uuid = computed(() => String(route.params.uuid ?? ''))
const isCreate = computed(() => uuid.value === 'create')
const isViewMode = computed(() => route.query.mode === 'view')

const pageTitle = computed(() => {
  if (isCreate.value) return 'Create Customer'
  if (isViewMode.value) return 'Customer Details'
  return 'Edit Customer'
})

const pageSubtitle = computed(() => {
  if (isCreate.value) return 'Fill in the information below to add a new customer.'
  if (isViewMode.value) return `Viewing customer: ${uuid.value}`
  return `Editing customer: ${uuid.value}`
})

const customer = ref<any>(null)
const loading = ref(false)

const fields = [
  { name: 'name', label: 'Full Name', placeholder: 'e.g. John Doe', required: true },
  { name: 'email', label: 'Email Address', type: 'email', placeholder: 'john@example.com', required: true },
]

const feedbackMessage = ref('')
const feedbackType = ref<'success' | 'error'>('success')

onMounted(async () => {
  if (!isCreate.value) {
    loading.value = true
    try {
      const response = await customerService.show(uuid.value)
      customer.value = response.data || response
    } catch (err) {
      feedbackMessage.value = 'Failed to fetch customer'
      feedbackType.value = 'error'
    } finally {
      loading.value = false
    }
  }
})

const handleSuccess = () => {
  feedbackMessage.value = isCreate.value
    ? 'Customer created successfully!'
    : 'Customer updated successfully!'
  feedbackType.value = 'success'
  setTimeout(() => {
    feedbackMessage.value = '' // auto-close modal
    router.push('/customer')
  }, 1500)
}

const handleError = (err: any) => {
  feedbackMessage.value = err?.message || 'Error saving customer.'
  feedbackType.value = 'error'
}
</script>
