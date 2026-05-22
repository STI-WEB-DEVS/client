<template>
  <div
    v-if="modelValue"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
  >
    <div class="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-xl">
      <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-2xl text-green-600">
        ✓
      </div>

      <h3 class="mt-4 text-xl font-bold">
        Order Placed Successfully
      </h3>

      <p class="mt-2 text-sm text-gray-600">
        Your order has been created successfully.
      </p>

      <button
        @click="$emit('view-orders')"
        class="mt-6 w-full rounded-md bg-indigo-600 px-4 py-3 text-sm font-semibold text-white"
      >
        View Orders
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  modelValue: Boolean,
});
</script>