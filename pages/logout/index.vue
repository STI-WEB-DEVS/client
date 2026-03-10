<template>
  <div>Logging out...</div>
</template>
 
<script setup>
definePageMeta({
  layout: false
})
 
onMounted(async () => {
  await navigateTo('/', { replace: true })
})
</script>