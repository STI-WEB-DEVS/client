<script setup lang="ts">
definePageMeta({
  layout: "customer",
});

const uuid = computed(() => {
  if (!process.client) return "";
  return (localStorage.getItem("uuid") || "").trim();
});
</script>

<template>
  <div class="rounded-lg border border-gray-200 bg-white p-6">
    <h1 class="text-2xl font-bold text-gray-900">Account</h1>
    <p class="mt-2 text-sm text-gray-600">
      Customer UUID: <span class="font-mono">{{ uuid || "—" }}</span>
    </p>
  </div>
</template>
