<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import FeedbackModal from '~/components/FeedbackModal.vue'
import { customerService } from '~/api/customer/CustomerService'

const props = defineProps<{ 
  open: boolean; 
  mode: 'create' | 'edit' | 'delete';
  uuid?: string;
  customerName?: string;
}>()

const emit = defineEmits(['close', 'success'])

const form = ref({ name: '', email: '' })
const loading = ref(false)

// UI config
const config = computed(() => ({
  title:
    props.mode === 'delete'
      ? 'Delete Customer'
      : props.mode === 'edit'
      ? 'Edit Customer'
      : 'Create New Customer',

  description:
    props.mode === 'delete'
      ? 'This action cannot be undone.'
      : props.mode === 'edit'
      ? 'Update the details for this record.'
      : 'Enter the customer details below.',

  variant: (props.mode === 'delete' ? 'danger' : 'default') as
    | 'danger'
    | 'default',

  submitLabel:
    props.mode === 'delete'
      ? 'Delete'
      : props.mode === 'edit'
      ? 'Update Customer'
      : 'Save Customer'
}))

// Load edit data
watch(
  () => props.open,
  async (isOpen) => {
    if (isOpen && props.mode === 'edit' && props.uuid) {
      try {
        const res = await customerService.show(props.uuid)
        const data = res.data ?? res
        form.value = { name: data.name, email: data.email }
      } catch (err) {
        console.error('Failed to fetch customer:', err)
      }
    }

    if (!isOpen) {
      form.value = { name: '', email: '' }
    }
  }
)

const handleSubmit = async () => {
  loading.value = true
  try {
    if (props.mode === 'create') {
      await customerService.create(form.value)
    } else if (props.mode === 'edit') {
      await customerService.update(props.uuid!, form.value)
    } else if (props.mode === 'delete') {
      await customerService.delete(props.uuid!)
    }

    emit('success')
    emit('close')
  } catch (err) {
    console.error('Operation failed:', err)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <FeedbackModal
    :open="open"
    :title="config.title"
    :variant="config.variant"
    hide-footer
    @close="emit('close')"
  >
    <!-- Description -->
    <div class="mb-6">
      <p class="text-sm text-gray-500">
        {{ config.description }}
      </p>
    </div>

    <!-- Delete confirmation -->
    <div v-if="mode === 'delete'" class="mb-6">
      <p class="text-sm text-gray-600">
        Are you sure you want to delete
        <span class="font-semibold text-gray-900">
          "{{ customerName }}"
        </span>
        ?
      </p>
    </div>

    <!-- Form -->
    <form
      v-else
      id="customer-form"
      @submit.prevent="handleSubmit"
      class="space-y-5"
    >
      <div>
        <label class="block text-sm font-medium text-gray-700">
          Full Name
        </label>
        <input
          v-model="form.name"
          type="text"
          required
          placeholder="John Doe"
          class="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 transition"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">
          Email Address
        </label>
        <input
          v-model="form.email"
          type="email"
          required
          placeholder="john@example.com"
          class="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 transition"
        />
      </div>
    </form>

    <!-- Actions -->
    <div class="mt-8 flex items-center justify-between">
      <!-- Cancel -->
      <button
        type="button"
        @click="emit('close')"
        class="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
      >
        Cancel
      </button>

      <!-- Delete -->
      <button
        v-if="mode === 'delete'"
        type="button"
        @click="handleSubmit"
        :disabled="loading"
        class="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-6 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50 transition"
      >
        {{ loading ? 'Deleting...' : 'Delete Customer' }}
      </button>

      <!-- Save / Update -->
      <button
        v-else
        form="customer-form"
        type="submit"
        :disabled="loading"
        class="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-6 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50 transition"
      >
        {{ loading ? 'Saving...' : config.submitLabel }}
      </button>
    </div>
  </FeedbackModal>
</template>