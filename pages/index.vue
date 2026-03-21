<template><div></div></template>
<script setup lang="ts">
definePageMeta({ layout: false, middleware: 'auth' })
// Always redirect root → login (middleware handles auth check)
navigateTo('/login')
</script>
