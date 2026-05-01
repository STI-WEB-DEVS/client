<template>
  <div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
    <h3 class="text-base font-semibold text-gray-900">Order Summary</h3>

    <div class="mt-4 space-y-3 text-sm text-gray-600">
      <div class="flex justify-between">
        <span>Items ({{ itemCount }})</span>
        <span>₱{{ totalPrice.toFixed(2) }}</span>
      </div>
      <div class="flex justify-between">
        <span>Shipping</span>
        <span class="text-green-600">Free</span>
      </div>
      <div class="border-t border-gray-200 pt-3 flex justify-between font-bold text-gray-900 text-base">
        <span>Total</span>
        <span>₱{{ totalPrice.toFixed(2) }}</span>
      </div>
    </div>

    <!-- Primary action -->
    <button
      v-if="primaryLabel"
      type="button"
      :disabled="disabled"
      @click="$emit('primary-action')"
      class="mt-6 w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {{ primaryLabel }}
    </button>

    <!-- Secondary action -->
    <NuxtLink
      v-if="secondaryLabel && secondaryTo"
      :to="secondaryTo"
      class="mt-3 block w-full rounded-lg border border-gray-300 px-5 py-3 text-center text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
    >
      {{ secondaryLabel }}
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  itemCount: number
  totalPrice: number
  primaryLabel?: string
  secondaryLabel?: string
  secondaryTo?: string
  disabled?: boolean
}>()

defineEmits<{
  'primary-action': []
}>()
</script>