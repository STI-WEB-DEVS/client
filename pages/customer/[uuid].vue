<template>
  <NuxtLayout>
    <div class="space-y-6">
      <h1 class="text-xl font-semibold">Edit Customer</h1>
      <CustomerForm mode="update" :uuid="uuid" :initialData="customer" />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { customerService } from '~/api/customer/CustomerService'
import CustomerForm from '~/components/CustomerForm.vue'

const route = useRoute()
const uuid = route.params.uuid as string
const customer = ref<any>(null)

onMounted(async () => {
  customer.value = await customerService.show(uuid)
})
</script>
