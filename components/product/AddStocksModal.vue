<script setup lang="ts">
import { ref } from 'vue'
import FeedbackModal from '~/components/FeedbackModal.vue'

const props = defineProps<{
  open: boolean
  productName?: string
  currentStocks?: number
}>()

const emit = defineEmits(['close', 'confirm'])

const quantity = ref(0)

const handleSubmit = () => {
  if (quantity.value <= 0) return
  emit('confirm', quantity.value)
  quantity.value = 0
}

const handleClose = () => {
  quantity.value = 0
  emit('close')
}
</script>

<template>
  <FeedbackModal
    :open="open"
    title="Add Stocks"
    variant="default"
    hide-footer
    @close="handleClose"
  >
    <p class="text-sm text-gray-600 mb-5">
      Adding stocks to <span class="font-medium text-gray-900">"{{ productName }}"</span>.
      Current stocks: <span class="font-semibold text-gray-900">{{ currentStocks ?? 0 }}</span>
    </p>

    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Quantity to Add *</label>
      <input
        v-model.number="quantity"
        type="number"
        step="1"
        min="1"
        placeholder="e.g. 50"
        class="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition"
      />
      <p v-if="quantity > 0" class="mt-2 text-xs text-gray-500">
        New total: <span class="font-semibold text-gray-800">{{ (currentStocks ?? 0) + quantity }}</span>
      </p>
    </div>

    <div class="mt-8 flex justify-end gap-3">
      <button
        type="button"
        @click="handleClose"
        class="px-5 py-2.5 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
      >
        Cancel
      </button>
      <button
        type="button"
        @click="handleSubmit"
        :disabled="quantity <= 0"
        class="px-6 py-2.5 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 disabled:opacity-50 transition"
      >
        Add Stocks
      </button>
    </div>
  </FeedbackModal>
</template>