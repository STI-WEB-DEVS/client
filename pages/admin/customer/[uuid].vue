<template>
  <NuxtLayout>
    <div class="space-y-6">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 class="text-xl font-semibold tracking-tight text-gray-900">Customer Details</h1>
          <p class="mt-1 text-sm text-gray-500">Viewing customer information.</p>
        </div>
        <div class="flex gap-2">
          <NuxtLink :to="`/customer/${uuid}/edit`" class="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700">
            <PencilSquareIcon class="h-4 w-4" />
            Edit Customer
          </NuxtLink>
          <NuxtLink to="/customer" class="inline-flex items-center gap-2 rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            Back to List
          </NuxtLink>
        </div>
      </div>

      <div v-if="pending" class="flex justify-center py-16">
        <div class="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900"></div>
      </div>

      <div v-else class="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div class="px-6 py-5 border-b border-gray-200 bg-gray-50">
          <h3 class="text-lg font-medium text-gray-900">Customer Information</h3>
        </div>
        <div class="px-6 py-5 space-y-4">
          <div class="grid grid-cols-3 gap-4">
            <div class="font-medium text-gray-500">ID:</div>
            <div class="col-span-2 text-gray-900">{{ customer?.id }}</div>
          </div>
          <div class="grid grid-cols-3 gap-4">
            <div class="font-medium text-gray-500">UUID:</div>
            <div class="col-span-2 text-gray-900 font-mono text-sm break-all">{{ customer?.uuid }}</div>
          </div>
          <div class="grid grid-cols-3 gap-4">
            <div class="font-medium text-gray-500">Name:</div>
            <div class="col-span-2 text-gray-900 font-semibold">{{ customer?.name }}</div>
          </div>
          <div class="grid grid-cols-3 gap-4">
            <div class="font-medium text-gray-500">Email:</div>
            <div class="col-span-2 text-gray-900">{{ customer?.email }}</div>
          </div>
          <div class="grid grid-cols-3 gap-4">
            <div class="font-medium text-gray-500">Created At:</div>
            <div class="col-span-2 text-gray-900">{{ formatDate(customer?.created_at) }}</div>
          </div>
          <div class="grid grid-cols-3 gap-4">
            <div class="font-medium text-gray-500">Updated At:</div>
            <div class="col-span-2 text-gray-900">{{ formatDate(customer?.updated_at) }}</div>
          </div>
        </div>
      </div>

      <FeedbackModal :open="isFeedbackModalOpen" :message="feedbackMessage" @close="closeFeedbackModal" />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { PencilSquareIcon } from '@heroicons/vue/24/outline'
import { customerService } from '~/api/customer/CustomerService'

definePageMeta({
  middleware: 'auth'
})

const route = useRoute()
const uuid = route.params.uuid

const customer = ref(null)
const pending = ref(true)
const isFeedbackModalOpen = ref(false)
const feedbackMessage = ref('')

const formatDate = (date: string) => {
  if (!date) return 'N/A'
  return new Date(date).toLocaleString()
}

const fetchCustomer = async () => {
  pending.value = true
  try {
    const response = await customerService.show(uuid)
    customer.value = response
  } catch (error: any) {
    console.error('Error fetching customer:', error)
    feedbackMessage.value = error.message || 'Failed to load customer'
    isFeedbackModalOpen.value = true
  } finally {
    pending.value = false
  }
}

const closeFeedbackModal = () => {
  isFeedbackModalOpen.value = false
}

onMounted(() => {
  const token = localStorage.getItem('_token');
  if (!token) {
    navigateTo('/');
  } else {
    fetchCustomer();
  }
})
</script>