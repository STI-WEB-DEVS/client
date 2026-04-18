<template>
  <NuxtLayout>
    <div v-if="customer" class="space-y-4">
      <h1 class="text-xl font-semibold">{{ customer.name }}</h1>
      <p class="text-gray-600">{{ customer.email }}</p>
    </div>
    <div v-else class="text-gray-500">Loading...</div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { customerService } from '~/api/customer/CustomerService'

const route = useRoute()
const customer = ref<any>(null)

onMounted(async () => {
  customer.value = await customerService.show(route.params.uuid as string)
})
</script>
