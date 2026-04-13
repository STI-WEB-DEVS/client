<template>
  <div class="flex min-h-screen items-center justify-center bg-white px-4">
    <div class="w-full max-w-[320px]">
      <h2 class="mb-8 text-center text-sm font-semibold text-gray-900">Sign in to your account</h2>

      <form class="space-y-4" @submit.prevent="handleSubmit">
        <div>
          <label for="email" class="mb-1 block text-[11px] text-gray-600">Email address</label>
          <input
            id="email"
            v-model="email"
            type="email"
            autocomplete="email"
            required
            class="block w-full rounded border border-gray-300 px-2 py-1 text-[11px] text-gray-900 outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label for="password" class="mb-1 block text-[11px] text-gray-600">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            autocomplete="current-password"
            required
            class="block w-full rounded border border-gray-300 px-2 py-1 text-[11px] text-gray-900 outline-none focus:border-indigo-500"
          />
        </div>

        <div class="flex items-center justify-between text-[10px] text-gray-500">
          <label class="inline-flex items-center gap-1">
            <input id="remember-me" type="checkbox" class="size-3 border-gray-300" />
            <span>Remember me</span>
          </label>
          <a href="#" class="text-indigo-500 hover:text-indigo-600">Forgot password?</a>
        </div>

        <p v-if="error" class="text-[11px] text-red-600">{{ error }}</p>

        <button
          type="submit"
          :disabled="isLoading"
          class="w-full rounded bg-indigo-600 py-1 text-[11px] font-medium text-white hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {{ isLoading ? 'Signing in...' : 'Sign in' }}
        </button>
      </form>

      <p class="mt-8 text-center text-[10px] text-gray-400">
        Not a member?
        <a href="#" class="text-indigo-500 hover:text-indigo-600">Register here</a>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseService from '~/api/BaseService'

const email = ref('')
const password = ref('')
const error = ref('')
const isLoading = ref(false)

const baseService = new BaseService()
const { setToken, updateUser } = useAuth()

const handleSubmit = async () => {
  error.value = ''
  isLoading.value = true

  try {
    const response = await baseService.request('/auth/login', 'POST', {
      email: email.value,
      password: password.value,
    })

    setToken(response.token, response.user)

    updateUser({ role: 'customer' })

    await navigateTo('/dashboard')
  } catch (err: any) {
    error.value = err.message || 'Login failed. Please try again.'
  } finally {
    isLoading.value = false
  }
}
</script>
