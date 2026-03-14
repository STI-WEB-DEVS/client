<template>
  <main class="min-h-screen login-bg flex items-center justify-center p-4">
    <!-- Background decorative elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-1/4 -right-1/4 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl"></div>
      <div class="absolute -bottom-1/4 -left-1/4 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl"></div>
    </div>

    <div class="relative w-full max-w-md">
      <!-- Logo card -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center size-16 rounded-2xl bg-amber-500/20 border border-amber-500/30 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="size-9 text-amber-400">
            <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
          </svg>
        </div>
        <h1 class="text-3xl font-extrabold text-white tracking-tight">TailorTrack</h1>
        <p class="text-slate-400 text-sm mt-1">Business Management System</p>
      </div>

      <!-- Login card -->
      <div class="login-card rounded-2xl p-8 shadow-2xl">
        <div class="mb-6">
          <h2 class="text-xl font-bold text-white">Sign in</h2>
          <p class="text-slate-400 text-sm mt-1">Access your tailoring dashboard</p>
        </div>

        <form class="space-y-5" @submit.prevent="handleSubmit">
          <div>
            <label for="email" class="block text-sm font-medium text-slate-300 mb-1.5">Email address</label>
            <input
              v-model="email"
              type="email" id="email" name="email" autocomplete="email" required
              placeholder="admin@tailortrack.com"
              class="input-field"
            />
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-slate-300 mb-1.5">Password</label>
            <input
              v-model="password"
              type="password" id="password" name="password" autocomplete="current-password" required
              placeholder="••••••••"
              class="input-field"
            />
          </div>

          <div class="flex items-center justify-between">
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" class="rounded border-slate-600 bg-slate-700 text-amber-500 focus:ring-amber-500 size-4" />
              <span class="text-sm text-slate-400">Remember me</span>
            </label>
            <a href="#" class="text-sm text-amber-400 hover:text-amber-300 font-medium transition-colors">Forgot password?</a>
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="btn-primary w-full"
          >
            <span v-if="!loading">Sign in to Dashboard</span>
            <span v-else class="flex items-center justify-center gap-2">
              <svg class="animate-spin size-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
              </svg>
              Signing in…
            </span>
          </button>
        </form>

        <div class="mt-6 pt-6 border-t border-slate-700/50 text-center">
          <p class="text-xs text-slate-500">
            Cloud-Based Subscription Tailoring Business Management System
          </p>
          <p class="text-xs text-slate-600 mt-1">© 2026 TailorTrack. All rights reserved.</p>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const loading = ref(false)

const handleSubmit = async () => {
  loading.value = true
  await new Promise(r => setTimeout(r, 800))
  await navigateTo('/dashboard')
  loading.value = false
}
</script>

<style scoped>
.login-bg {
  background: linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%);
  min-height: 100vh;
  position: relative;
}
.login-card {
  background: rgba(30, 41, 59, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
}
.input-field {
  display: block;
  width: 100%;
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 0.625rem;
  padding: 0.625rem 0.875rem;
  color: #fff;
  font-size: 0.875rem;
  transition: border-color 0.15s, box-shadow 0.15s;
  outline: none;
}
.input-field::placeholder { color: rgba(148,163,184,0.5); }
.input-field:focus {
  border-color: #F59E0B;
  box-shadow: 0 0 0 3px rgba(245,158,11,0.15);
}
.btn-primary {
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #F59E0B, #D97706);
  color: #0F172A;
  font-weight: 700;
  font-size: 0.9rem;
  padding: 0.75rem 1.25rem;
  border-radius: 0.625rem;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  letter-spacing: 0.01em;
}
.btn-primary:hover:not(:disabled) {
  background: linear-gradient(135deg, #FCD34D, #F59E0B);
  box-shadow: 0 4px 20px rgba(245,158,11,0.4);
  transform: translateY(-1px);
}
.btn-primary:disabled { opacity: 0.7; cursor: not-allowed; }
</style>