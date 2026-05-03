<template>
  <div>
    <h1>Dashboard</h1>
    <p class="mt-2 text-gray-600">Welcome to the admin dashboard.</p>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default',
  role: 'admin'
})
</script>