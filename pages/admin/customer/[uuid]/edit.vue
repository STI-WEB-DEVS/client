<template>
    <div v-if="customer" class="max-w-lg mx-auto space-y-6">
      <h1 class="text-xl font-semibold">Edit Customer</h1>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <input v-model="customer.name" type="text" class="w-full border rounded p-2" />
        <input v-model="customer.email" type="email" class="w-full border rounded p-2" />
        <button type="submit" class="bg-indigo-600 text-white px-4 py-2 rounded">Update</button>
      </form>
    </div>
    <div v-else class="text-gray-500">Loading...</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { customerService } from '~/api/customer/CustomerService'

const route = useRoute()
const router = useRouter()
const customer = ref<any>(null)

onMounted(async () => {
  customer.value = await customerService.show(route.params.uuid as string)
})

const handleSubmit = async () => {
  await customerService.update(route.params.uuid as string, customer.value)
  router.push('/admin/customer') // back to list
}
</script>
