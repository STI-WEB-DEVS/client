<template>
  <NuxtLayout>
    <div class="max-w-lg mx-auto space-y-6">
      <h1 class="text-xl font-semibold">Create Customer</h1>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <input v-model="name" type="text" placeholder="Name" class="w-full border rounded p-2" />
        <input v-model="email" type="email" placeholder="Email" class="w-full border rounded p-2" />
        <button type="submit" class="bg-indigo-600 text-white px-4 py-2 rounded">Save</button>
      </form>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { customerService } from '~/api/customer/CustomerService'

const router = useRouter()
const name = ref('')
const email = ref('')

const handleSubmit = async () => {
  await customerService.create({ name: name.value, email: email.value })
  router.push('/customer') // back to list
}
</script>
