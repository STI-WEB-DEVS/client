<template>
  <div class="rounded-lg shadow p-6 bg-[#e6e5ce] flex items-center gap-x-4">
    <div class="bg-[#2d4123] text-white p-3 rounded-full text-xl">
      {{ icon }}
    </div>
    <div>
      <p class="text-sm font-medium text-gray-700">{{ title }}</p>
      <p class="text-2xl font-bold">{{ value }}</p>
      <p :class="positive ? 'text-green-600' : 'text-red-600'" class="text-sm font-semibold">
        {{ change }}
      </p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  value: String,
  change: String,
  icon: String,
  positive: { type: Boolean, default: true }
})
</script>
