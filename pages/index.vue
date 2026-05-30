<script setup lang="ts">
// Tells Nuxt to completely bypass the default admin layout for this route
definePageMeta({
  layout: false
})
</script>

<template>
  <main class="h-screen w-screen bg-gray-100 flex items-center justify-center">
    <Login />
  </main>
</template>