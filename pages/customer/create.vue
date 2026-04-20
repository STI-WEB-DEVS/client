<template>
  <NuxtLayout>
    <div class="max-w-lg mx-auto space-y-6">
      <h1 class="text-xl font-semibold">Create Customer</h1>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <input v-model="name" type="text" placeholder="Name" class="w-full border rounded p-2" />
        <input v-model="email" type="email" placeholder="Email" class="w-full border rounded p-2" />
        <button type="submit" class="bg-indigo-600 text-white px-4 py-2 rounded">Save</button>
      </form>

      <!-- Feedback -->
      <Feedback v-if="feedbackMessage" :message="feedbackMessage" :type="feedbackType" />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { customerService } from '~/api/customer/CustomerService'
import Feedback from '~/components/Feedback.vue'

const router = useRouter()
const name = ref('')
const email = ref('')

const feedbackMessage = ref('')
const feedbackType = ref<'success' | 'error'>('success')

const handleSubmit = async () => {
  try {
    await customerService.create({ name: name.value, email: email.value })
    feedbackMessage.value = 'Customer created successfully!'
    feedbackType.value = 'success'
    setTimeout(() => router.push('/customer'), 1500)
  } catch (err: any) {
    feedbackMessage.value = err.message || 'Error creating customer.'
    feedbackType.value = 'error'
  }
}
</script>
