<template>
  <NuxtLayout>
    <div class="mx-auto max-w-md">
      <div class="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 class="text-2xl font-bold">API Login</h1>
        <p class="text-sm text-slate-600 mt-1">Sign in with the seeded test account to obtain an API token for CRUD.</p>
      </div>

      <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <form @submit.prevent="submit">
          <div class="mb-4">
            <label class="mb-1 block text-sm font-medium">Email</label>
            <input v-model="email" type="email" required placeholder="admin@example.com" class="w-full rounded-md border px-3 py-2" />
          </div>

          <div class="mb-4">
            <label class="mb-1 block text-sm font-medium">Password</label>
            <input v-model="password" type="password" required placeholder="password" class="w-full rounded-md border px-3 py-2" />
          </div>

          <div class="flex items-center gap-3">
            <button class="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white" :disabled="loading">{{ loading ? 'Signing in...' : 'Sign in' }}</button>
            <div v-if="token" class="text-sm text-emerald-700">Token saved to localStorage.</div>
          </div>
        </form>
        <div v-if="error" class="mt-4 text-sm text-rose-600">{{ error }}</div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const email = ref('test@sti.com')
const password = ref('test123')
const loading = ref(false)
const error = ref('')
const token = ref('')
const authToken = useCookie<string | null>('_token')
const runtimeConfig = useRuntimeConfig()

const submit = async () => {
  loading.value = true
  error.value = ''
  try {
    const res: any = await $fetch('/login', {
      baseURL: runtimeConfig.public.apiBaseURL,
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: {
        email: email.value,
        password: password.value,
      },
    })
    const t = res?.token || res?.data?.token
    if (t) {
      localStorage.setItem('_token', t)
      authToken.value = t
      token.value = t
      await navigateTo('/products')
    } else {
      error.value = 'No token returned from server.'
    }
  } catch (e: any) {
    error.value = e?.message || 'Login failed'
  } finally {
    loading.value = false
  }
}
</script>
